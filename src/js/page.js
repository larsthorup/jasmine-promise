/*global window $*/
(function (window) {
    'use strict';

    var Page = function () {
    };
    Page.prototype.load = function (mustSucceed) {
        var def = $.Deferred();
        if (mustSucceed) {
            window.setTimeout(function () {
                def.resolve('loaded');
            }, 600);
        }
        return def.promise();
    };
    Page.prototype.click = function (mustSucceed) {
        var def = $.Deferred();
        if (mustSucceed) {
            window.setTimeout(function () {
                def.resolve('clicked');
            }, 300);
        }
        return def.promise();
    };

    window.Page = Page;
})(window);
