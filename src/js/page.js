/*global window $*/
(function (window) {
    'use strict';

    var Page = function () {
    };
    Page.prototype.load = function (mustSucceed) {
        var def = $.Deferred();
        window.setTimeout(function () {
            if (mustSucceed) {
                def.resolve('loaded');
            } else {
                def.reject();
            }
        }, 600);
        return def.promise();
    };
    Page.prototype.click = function (mustSucceed) {
        var def = $.Deferred();
        window.setTimeout(function () {
            if (mustSucceed) {
                def.resolve('clicked');
            } else {
                def.reject();
            }
        }, 300);
        return def.promise();
    };
    Page.prototype.forever = function () {
        var def = $.Deferred();
        return def.promise();
    };

    window.Page = Page;
})(window);
