module.exports = {
    options: {

        maxerr: 50, // Maximum error before stopping

        // Enforcing

        // в JSCS более точная настройка
        // curly: true,          // Require {} for every new block or scope

        // bitwise: true,        // Prohibit bitwise operators (&, |, ^, etc.)
        // plusplus: false,      // Prohibit use of `++` & `--`

        // strict: true,         // Requires all functions run in ES5 Strict Mode

        // camelCase: true,         // Identifiers must be in camelCase

        // caseindent: true,        // If keywords case and default should be indented
        eqeqeq: true,            // Require triple equals (===) for comparison
        forin: true,             // Require filtering for..in loops with obj.hasOwnProperty()
        immed: true,             // Require immediate invocations to be wrapped in parens e.g. `(function () { } ());`
        indent: 4,               // Number of spaces to use for indentation
        latedef: true,           // Require variables/functions to be defined before being used
        maxdepth: 4,             // Max depth of nested blocks (within functions)
        maxlen: 130,             // Max number of characters per line
        maxparams: 4,            // Max number of formal params allowed per function
        maxstatements: false,    // Max number statements per function
        maxcomplexity: false,    // Max cyclomatic complexity per function
        newcap: true,            // Require capitalization of all constructor functions e.g. `new F()`
        noarg: true,             // Prohibit use of `arguments.caller` and `arguments.callee`
        noempty: true,           // Prohibit use of empty blocks
        nonew: true,             // Prohibit use of constructors for side-effects (without assignment)
        quotmark: 'single',      // Quotation mark consistency
        trailing: true,          // Prohibit trailing whitespaces
        undef: true,             // Require all non-global variables to be declared (prevents global leaks)
        unused: true,            // Require all defined variables be used

        // Relaxing
        asi: false,              // Tolerate Automatic Semicolon Insertion (no semicolons)
        boss: false,             // Tolerate assignments where comparisons would be expected
        debug: false,            // Allow debugger statements e.g. browser breakpoints.
        eqnull: false,           // Tolerate use of `== null`
        es5: false,              // Allow ES5 syntax (ex: getters and setters)
        esnext: false,           // Allow ES.next (ES6) syntax (ex: `const`)
        moz: false,              // Allow Mozilla specific syntax (extends and overrides esnext features)
        evil: false,             // Tolerate use of `eval` and `new Function()`
        expr: true,              // Tolerate `ExpressionStatement` as Programs
        funcscope: false,        // Tolerate defining variables inside control statements
        globalstrict: false,     // Allow global use strict (also enables 'strict')
        iterator: false,         // Tolerate using the `__iterator__` property
        lastsemic: false,        // Tolerate omitting a semicolon for the last statement of a 1-line block
        laxbreak: true,          // Tolerate possibly unsafe line breakings
        laxcomma: false,         // Tolerate comma-first style coding
        loopfunc: false,         // Tolerate functions being defined in loops
        multistr: false,         // Tolerate multi-line strings
        proto: false,            // Tolerate using the `__proto__` property
        scripturl: false,        // Tolerate script-targeted URLs
        smarttabs: false,        // Tolerate mixed tabs/spaces when used for alignment
        shadow: false,           // Allows re-define variables later in code e.g. `var x=1; x=2;`
        sub: false,              // Tolerate using `[]` notation when it can still be expressed in dot notation
        supernew: true,          // Tolerate `new function () { ... };` and `new Object;`
        validthis: false,        // Tolerate using this in a non-constructor function

        // Environments
        devel: false,             // Development/debugging (alert, confirm, etc)
        nonstandard: false,      // Widely adopted globals (escape, unescape, etc)

        // Custom Globals
        globals: {}              // additional predefined global variables

    },

    groups: {
        client: {
            options: {
                browser: true,
                debug: false,
                devel: false,
                jquery: true,
                predef: ['angular', '_'],
                sub: true
            },
            includes: [
                'static/**/*.js'
            ]
        }
    }
};
