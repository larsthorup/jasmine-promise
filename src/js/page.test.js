/*global describe it expect window $ beforeEach runs waitsFor*/

var start = function (fn) {
    'use strict';
    return fn();
};

describe('Page', function () {
    'use strict';
    var page;
    var done;
    beforeEach(function () {
        page = new window.Page();
        done = new $.Deferred();
    });

    // ToDo: log individual steps as passing
    // ToDo: improve error message when timed out
    it('loads and navigates correctly', function () {
        runs(function () {
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
        waitsFor(function () {
            return done.state() !== 'pending';
        });
        runs(function () {
            expect(done.state()).toBe('resolved');
        });
    });

    it('expected to fail', function () {
        runs(function () {
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
        waitsFor(function () {
            return done.state() !== 'pending';
        });
        runs(function () {
            expect(done.state()).toBe('resolved');
        });
    });

    it('correctly fails to load', function () {
        runs(function () {
            start(function () {
                return page.load(false);
            }).done(function () {
                expect('expected it to fail').toBeNull();
            }).fail(function () {
                done.resolve();
            });
        });
        waitsFor(function () {
            return done.state() !== 'pending';
        });
        runs(function () {
            expect(done.state()).toBe('resolved');
        });
    });

});