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
    describe('outer', function () {
        var page;
        var eventually;
        describe('before', function () {
            page = new window.Page();
        });
        it('when loading the page', function () { // ToDo: describe
            eventually = page.load(true);
        });
        describe('waiting', function () {
            waitsFor(function () {
                return eventually.state() !== 'pending';
            });
        });
        it('should be loaded', function () {
            eventually.done(function (loadResult) {
                expect(loadResult).toBe('loaded');
            });
        });
        it('when clicking the link', function () {  // ToDo: describe
            eventually = page.click(true);
        });
        describe('waiting', function () {
            waitsFor(function () {
                return eventually.state() !== 'pending';
            });
        });
        it('should be clicked', function () {
            eventually.done(function (clickResult) {
                expect(clickResult).toBe('clicked');
            });
        });
    });
});

describe('Page phase 1', function () {
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
            eventually.reject();
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