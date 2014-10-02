'use strict';

describe('Service: sound', function () {

  var sound;

  beforeEach(module('fetApp'));
  beforeEach(module('mock.midi'));

  beforeEach(function () {
    module(function ($provide, MIDI) {
      $provide.constant('MIDI', MIDI);
    });
  });

  beforeEach(inject(function(_sound_) {
    sound = _sound_;
  }));

  it('calculates the time required to play chords', function () {
    expect(sound.playChords([[], [], [], []], 1/4, 0, 100)).toBe(4 * 0.6);
    expect(sound.playChords([[], [], [], []], 1/2, 0, 100)).toBe(8 * 0.6);
  });

  it('calculates the time required to play chords with delay', function () {
    expect(sound.playChords([[], [], [], []], 1/4, 50, 100)).toBe(50 + 4 * 0.6);
    expect(sound.playChords([[], [], [], []], 1/2, 70, 100)).toBe(70 + 8 * 0.6);
  });

});
