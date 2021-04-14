/*！
*公用js
*date:2016-12-09
*author: chengang;
*/
var _rootPath = (function() {
    var path = location.pathname;

    if (path.indexOf('/') == 0) {
        path = path.substring(1);
    }

    return '/' + path.split('/')[0];
}());

// ★前端开发目录★，如 var _basePath = _rootPath + '/Project';这里的“Project”根据项目组放置本框架的目录进行更改，为访问路径第二层开始至pages;
var _basePath = _rootPath + '/jsscreen';


var SrcBoot = {
    // 获取资源全路径
    getPath: function(path) {
        // 全路径
        if (/^(http|https|ftp)/g.test(path)) {
            return path;
        }

        // 用于测试本地mockjs测试用例js，约定以_test最为前缀，debug为false时不在页面输出
        if (path.indexOf('_test') != -1 && !this.debug) {
            return false;
        }

        // 是否是相对路径
        var isRelative = path.indexOf('./') != -1 || path.indexOf('../') != -1;

        path = (isRelative ? '' : (_basePath + '/')) + path;

        return path;
    },

    // 获取路径的最后的文件扩展名
    getExt: function(path) {
        if (path.indexOf('?') != -1) {
            path = path.split('?')[0];
        }

        var dotPos = path.lastIndexOf('.'),
			ext = path.substring(dotPos + 1);

        return ext;
    },

    // 批量输出css|js
    output: function(arr) {
        var i = 0,
			len = arr.length,
			path,
			ext;

        for (; i < len; i++) {
            path = this.getPath(arr[i]);

            if (path === false) continue;

            ext = this.getExt(path);
            if (ext == 'js') {
                document.writeln('<script src="' + path + '"></sc' + 'ript>');
            } else {
                document.writeln('<link rel="stylesheet" href="' + path + '">');
            }
        }
    },

    // 这个debug是针对mock测试而言的
    debug: false
};

(function($) {
    if (!window.Util) {
        window.Util = {};
    }
    $.extend(Util, {
        /* 获取URL地址参数
         * prop:参数名
         */
        getUrlParams: function(prop) {
            var params = {},
                query = location.search.substring(1),
                arr = query.split('&'),
                rt;

            $.each(arr, function(i, item) {
                var tmp = item.split('='),
                    key = tmp[0],
                    val = tmp[1];

                if (typeof params[key] == 'undefined') {
                    params[key] = val;
                } else if (typeof params[key] == 'string') {
                    params[key] = [params[key], val];
                } else {
                    params[key].push(val);
                }
            });
            rt = prop ? params[prop] : params;
            return rt;
        },

        // 简单封装ajax
        ajax: function(options) {
            options = $.extend({}, {
                type: 'POST',
                dataType: 'json',
                dataFilter: function(data, type) {
                    if (type == 'json') {
                        data = JSON.parse(data);
                        data = data.custom || data;
                        if (typeof data == 'object') {
                            data = JSON.stringify(data);
                        }
                    }
                    return data;
                },
                error: Util._ajaxErr
            }, options);
            if (!SrcBoot.debug) {
                if (!/^(http|https|ftp)/g.test(options.url)) {
                    options.url = _rootPath + options.url;
                }
                if (options.data) {
                    options.data = {
                        params: JSON.stringify(options.data),
                        token: ""
                    };
                } else {
                    options.data = {
                        params: "",
                        token: ""
                    };
                }
            }
            return $.ajax(options).done(function(data) {
                var status = data.status;
                if (status) {
                    var code = parseInt(status.code),
                        text = status.text,
                        url = status.url;

                    if (code >= 300) {

                        if (options.fail) {
                            options.fail.call(this, text, status);

                        } else {
                            alert(text);
                        }
                    }
                }
            });
        },
        _ajaxErr: function(jqXHR, textStatus, errorThrown) {
            console.error('status: %s, error: %s', textStatus, errorThrown);
        }
    });
}(jQuery));
