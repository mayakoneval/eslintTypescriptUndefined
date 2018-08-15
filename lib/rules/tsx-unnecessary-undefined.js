/**
 * @fileoverview "or" undefined type declarations in typescript don't pass, since all types are "or" undefined
 * @author Maya
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const ERROR_MSG_NO_UNDEFINED =
  "Optional types already are optionally undefined";
module.exports = {
  meta: {
    docs: {
      description:
        '"or" undefined type declarations in typescript don\'t pass, since all types are "or" undefined',
      category: "Fill me in",
      recommended: false
    },
    fixable: null, //"code", // or "code" or "whitespace"
    schema: [
      // fill in your schema
    ]
  },

  create: function(context) {
    // variables should be defined here

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    // any helper functions should go here or else delete this section

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      // failure means TSPropertySignature has optional set to true, and there exists a TSUndefinedKeyword
      TSPropertySignature: function(node) {
        if (node.optional === true) {
          const typeAnnotation =
            node.typeAnnotation && node.typeAnnotation.typeAnnotation;
          if (
            typeAnnotation &&
            typeAnnotation.types &&
            typeAnnotation.types.find(
              type => type.type === "TSUndefinedKeyword"
            )
          ) {
            const undefinedType = typeAnnotation.types.find(
              type => type.type === "TSUndefinedKeyword"
            );
            context.report({
              node: node,
              message: ERROR_MSG_NO_UNDEFINED
              //   fix: function(fixer) {
              //     return fixer.remove(undefinedType);
              //   }
            });
          }
        }
      }
    };
  }
};
