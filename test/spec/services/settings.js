'use strict';


describe('Service: settings', function () {

  beforeEach(module('fetApp'));

  beforeEach(function() {
    jasmine.addMatchers({
      toBeValidMode: function() {
        return {
          compare: function(m) {
            return {
              pass: _.contains(_.range(1,8), m)
            };
          }
        };
      }
    });
  });

  var settings;
  beforeEach(inject(function (_settings_) {
    settings = _settings_;
  }));

  it('starts in the first mode', function () {
    expect(settings.getMode()).toBe(1);
  });

  it('loops modes on increment', function () {
    for (var i = 0; i < 7; i++)
      settings.nextMode();
    expect(settings.getMode()).toBe(1);
  });

  it('loops modes on decrement', function () {
    settings.prevMode();
    expect(settings.getMode()).toBe(7);
  });

  it('increments modes inside valid range', function () {
    for (var i = 0; i < 15; i++) {
      expect(settings.getMode()).toBeValidMode();
      settings.nextMode();
    }
  });

  it('decrements modes inside valid range', function () {
    for (var i = 0; i < 15; i++) {
      expect(settings.getMode()).toBeValidMode();
      settings.prevMode();
    }
  });

});
