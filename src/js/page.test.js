/*global describe it expect window $ beforeEach runs waitsFor*/
describe('Page', function () {
    'use strict';
    var page;
    var done;
    beforeEach(function () {
        page = new window.Page();
        done = new $.Deferred();
    });
    it('loads and navigates correctly', function () {
        runs(function () {
            page.load(true).then(function (loadResult) {
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
    });

    it('fails to load', function () {
        runs(function () {
            page.load(false).done(function () {
                expect('expected it to fail').toBeNull();
            }).fail(function () {
                done.resolve();
            });
        });
        waitsFor(function () {
            return done.state() !== 'pending';
        });
    });
});