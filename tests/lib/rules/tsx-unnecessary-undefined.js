/**
 * @fileoverview &#34;or&#34; undefined type declarations in typescript don&#39;t pass, since all types are &#34;or&#34; undefined
 * @author Maya
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/tsx-unnecessary-undefined"),
  RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("tsx-unnecessary-undefined", rule, {
  valid: [
    {
      parser: "typescript-eslint-parser",
      code: "type Star = { Moon: string; }"
    },
    {
      parser: "typescript-eslint-parser",
      code: "type Star = { Moon: string | undefined; }"
    },
    {
      parser: "typescript-eslint-parser",
      code: "type Star = { Moon?: string; }"
    },
    {
      parser: "typescript-eslint-parser",
      code: "type Star = { Venus: Planet; }"
    },
    {
      parser: "typescript-eslint-parser",
      code: "type Star = string;"
    },
    {
      parser: "typescript-eslint-parser",
      code: "type Star = { Moon: string; Sun: Moon; }"
    },
    {
      parser: "typescript-eslint-parser",
      code: "type Star = { Moon: string; Sun: Moon | undefined; }"
    },
    {
      parser: "typescript-eslint-parser",
      code: "type Star = { Moon: undefined | string; Sun: Moon | undefined; }"
    }
  ],

  invalid: [
    {
      parser: "typescript-eslint-parser",
      code: "type Star = { Moon?: string | undefined; };",
      errors: [
        {
          message: "Optional types already are optionally undefined"
        }
      ],
      output: "type Star = { Moon?: string; };"
    },
    {
      parser: "typescript-eslint-parser",
      code: "type Star = { Moon?: string | undefined; Sun: string; };",
      errors: [
        {
          message: "Optional types already are optionally undefined"
        }
      ],
      output: "type Star = { Moon?: string; Sun: string; };"
    },
    {
      parser: "typescript-eslint-parser",
      code: "type Star = { Moon?: string; Sun?: string | undefined; };",
      errors: [
        {
          message: "Optional types already are optionally undefined"
        }
      ],
      output: "type Star = { Moon?: string; Sun?: string; };"
    },
    {
      parser: "typescript-eslint-parser",
      code:
        "type Star = { Moon?: string | undefined; Sun?: string | undefined; };",
      errors: [
        {
          message: "Optional types already are optionally undefined"
        },
        {
          message: "Optional types already are optionally undefined"
        }
      ],
      output: "type Star = { Moon?: string; Sun?: string; };"
    },
    {
      parser: "typescript-eslint-parser",
      code: "type Star = { Moon?: undefined | string; };",
      errors: [
        {
          message: "Optional types already are optionally undefined"
        }
      ],
      output: "type Star = { Moon?: string; };"
    },
    {
      parser: "typescript-eslint-parser",
      code: "type Star = { Moon?: undefined                    | string; };",
      errors: [
        {
          message: "Optional types already are optionally undefined"
        }
      ],
      output: "type Star = { Moon?: string; };"
    },
    {
      parser: "typescript-eslint-parser",
      code: `
            type Star = { Moon?:
                | undefined
                | string
            };`,
      errors: [
        {
          message: "Optional types already are optionally undefined"
        }
      ],
      output: `
            type Star = { Moon?:
                | string
            };`
    }
  ]
});
