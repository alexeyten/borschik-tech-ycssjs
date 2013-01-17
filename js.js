var base = require('borschik').getTech('js');

exports.Tech = base.Tech._inherit({

    File: exports.File = base.File._inherit({

        parseInclude: function(content) {

            if (Buffer.isBuffer(content)) content = content.toString('utf8');

            var re = /include\s*\(\s*["']([^"']+)["']\s*\)\s*;/g;
            var uniqStr = '\00borschik\00';
            var _this = this;

            var includes = [],
                texts = content
                    .replace(re, function(_, file) {

                        includes.push({
                            file: _this.pathTo(file),
                            type: 'comment'
                        });

                        return uniqStr;

                    })
                    .split(uniqStr);

            // zip texts and includes
            var res = [], t, i;
            while((t = texts.shift()) != null) {
                t && res.push(t);
                (i = includes.shift()) && res.push(i);
            }

            return res;

        }

    })
});
