/*global window $*/
(function (window) {
    'use strict';

    var Page = function () {
    };
    Page.prototype.load = function (mustSucceed) {
        var def = $.Deferred();
        // ToDo: slowness
        if (mustSucceed) {
            def.resolve('loaded');
        }
        return def.promise();
    };
    Page.prototype.click = function (mustSucceed) {
        var def = $.Deferred();
        // ToDo: slowness
        if (mustSucceed) {
            def.resolve('clicked');
        }
        return def.promise();
    };

    window.Page = Page;
})(window);
