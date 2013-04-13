/*global describe it expect window $ beforeEach runs waitsFor*/

var start = function (fn) {
    'use strict';
    return fn();
};

var itEventually = function (desc, func) {
    'use strict';
    it(desc, function () {
        var eventually = new $.Deferred();
        runs(function () {
            func(eventually);
        });
        waitsFor(function () {
            return eventually.state() !== 'pending';
        }, 'it to be eventually resolved or rejected');
        runs(function () {
            expect(eventually.state()).toBe('resolved');
        });
    });
};

describe('Page', function () {
    'use strict';
    var page;
    beforeEach(function () {
        page = new window.Page();
    });

    // ToDo: log individual steps as passing
    itEventually('loads and navigates correctly', function (eventually) {
        start(function () {
            return page.load(true);
        }).then(function (loadResult) {
            expect(loadResult).toBe('loaded');
            return page.click(true);
        }).then(function (clickResult) {
            expect(clickResult).toBe('clicked');
        }).done(function () {
            eventually.resolve();
        }).fail(function () {
            eventually.reject();
        });
    });

    itEventually('cannot load', function (eventually) {
        start(function () {
            return page.load(false);
        }).done(function () {
            // ToDo: improve this
            expect('expected it to fail').toBeNull();
        }).fail(function () {
            eventually.resolve();
        });
    });

    itEventually('fails when promise is being rejected', function (eventually) {
        start(function () {
            return page.load(/*true*/false);
        }).then(function (loadResult) {
            expect(loadResult).toBe('loaded');
            return page.click(true);
        }).then(function (clickResult) {
            expect(clickResult).toBe('clicked');
        }).done(function () {
            eventually.resolve();
        }).fail(function () {
            eventually.reject();
        });
    });

    itEventually('fails when promise stays pending', function (eventually) {
        start(function () {
            return page.forever();
        }).done(function () {
            eventually.resolve();
        }).fail(function () {
            eventually.reject();
        });
    });
});