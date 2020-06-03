var register = function (Handlebars) {
    var helpers = {
        inc: function (value, options) {
            return parseInt(value) + 1;
        },
        foo: function (var1, var2) {
            return var1+var2;
        },
        for: function(from, to, incr, block) {
            var accum = '';
            for(var i = from; i < to; i += incr)
                accum += block.fn(i);
            return accum;
        },
        ifCond: function(v1, v2, options) {
            if(v1 === v2) {
              return options.fn(this);
            }
            return options.inverse(this);
        },
    };

    if (Handlebars && typeof Handlebars.registerHelper === "function") {
        for (var prop in helpers) {
            Handlebars.registerHelper(prop, helpers[prop]);
        }
    } else {
        return helpers;
    }

};

module.exports.register = register;
module.exports.helpers = register(null);