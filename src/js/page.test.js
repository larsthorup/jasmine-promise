/*global describe it expect window $ beforeEach runs waitsFor*/

var start = function (fn) {
    'use strict';
    return fn();
};

var itEventually = function (desc, func) {
    'use strict';
    it(desc, function () {
        var done = new $.Deferred();
        runs(function () {
            func(done);
        });
        waitsFor(function () {
            return done.state() !== 'pending';
        });
        runs(function () {
            expect(done.state()).toBe('resolved');
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
    // ToDo: improve error message when timed out
    itEventually('loads and navigates correctly', function (done) {
        start(function () {
            return page.load(true);
        }).then(function (loadResult) {
            expect(loadResult).toBe('loaded');
            return page.click(true);
        }).then(function (clickResult) {
            expect(clickResult).toBe('clicked');
        }).done(function () {
            done.resolve();
        }).fail(function () {
            done.reject();
        });
    });

    itEventually('expected to fail', function (done) {
        start(function () {
            return page.load(/*true*/false);
        }).then(function (loadResult) {
            expect(loadResult).toBe('loaded');
            return page.click(true);
        }).then(function (clickResult) {
            expect(clickResult).toBe('clicked');
        }).done(function () {
            done.resolve();
        }).fail(function () {
            done.reject();
        });
    });

    itEventually('correctly fails to load', function (done) {
        start(function () {
            return page.load(false);
        }).done(function () {
            expect('expected it to fail').toBeNull();
        }).fail(function () {
            done.resolve();
        });
    });

});