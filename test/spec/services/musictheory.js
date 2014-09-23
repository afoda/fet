'use strict';

describe('Service: musicTheory', function () {

  beforeEach(module('fetApp'));

  var musicTheory;
  beforeEach(inject(function (_musicTheory_) {
    musicTheory = _musicTheory_;
  }));

  it('calculates a diatonic octave for any mode', function () {
    expect(musicTheory.modeNotes(1, 1, 1, 12)).toEqual([[1,1], [3,2], [5,3], [6,4], [8,5], [10,6], [12,7]]);
    expect(musicTheory.modeNotes(2, 1, 1, 12)).toEqual([[1,1], [3,2], [4,3], [6,4], [8,5], [10,6], [11,7]]);
    expect(musicTheory.modeNotes(6, 1, 1, 12)).toEqual([[1,1], [3,2], [4,3], [6,4], [8,5], [9,6], [11,7]]);
  });

  it('calculates diatonic octaves at any root', function () {
    expect(musicTheory.modeNotes(1, 8, 8, 19)).toEqual([[8,1], [10,2], [12,3], [13,4], [15,5], [17,6], [19,7]]);
    expect(musicTheory.modeNotes(2, 21, 21, 32)).toEqual([[21,1], [23,2], [24,3], [26,4], [28,5], [30,6], [31,7]]);
    expect(musicTheory.modeNotes(3, 97, 97, 108)).toEqual([[97,1], [98,2], [100,3], [102,4], [104,5], [105,6], [107,7]]);
  });

  it('calculates diatonic octaves around the root', function () {
    expect(musicTheory.modeNotes(4, 13, 8, 19)).toEqual([[8,5], [10,6], [12,7], [13,1], [15,2], [17,3], [19,4]]);
    expect(musicTheory.modeNotes(3, 27, 21, 32)).toEqual([[22,5], [23,6], [25,7], [27,1], [28,2], [30,3], [32,4]]);
    expect(musicTheory.modeNotes(7, 101, 97, 108)).toEqual([[97,6], [99,7], [101,1], [102,2], [104,3], [106,4], [107,5]]);
  });

  it('calculates diatonic octaves away from the root', function () {
    expect(musicTheory.modeNotes(4, 1, 8, 19)).toEqual([[8,5], [10,6], [12,7], [13,1], [15,2], [17,3], [19,4]]);
    expect(musicTheory.modeNotes(3, 1, 21, 32)).toEqual([[22,5], [23,6], [25,7], [27,1], [28,2], [30,3], [32,4]]);
    expect(musicTheory.modeNotes(7, 1, 97, 108)).toEqual([[98,4], [99,5], [101,6], [103,7], [105,1], [106,2], [108,3]]);
  });

  it('calculates multiple octaves', function () {
    expect(musicTheory.modeNotes(5, 8, 5, 25)).toEqual([[5,6],[6,7],[8,1],[10,2],[12,3],[13,4],[15,5],[17,6],[18,7],[20,1],[22,2],[24,3],[25,4]]);
  });

  it('calculates triads in any mode', function () {
    expect(musicTheory.chord(5, 1, 1)).toEqual([5, 9, 12]);
    expect(musicTheory.chord(5, 1, 3)).toEqual([9, 12, 16]);
    expect(musicTheory.chord(5, 1, 7)).toEqual([16, 19, 22]);

    expect(musicTheory.chord(14, 2, 4)).toEqual([19, 23, 26]);
    expect(musicTheory.chord(14, 3, 7)).toEqual([24, 27, 31]);
    expect(musicTheory.chord(14, 7, 5)).toEqual([20, 24, 27]);
  });

  it('calculates major, minor, and dominant seventh chords', function () {
    expect(musicTheory.chord(1, 1, 1, true)).toEqual([1, 5, 8, 12]);
    expect(musicTheory.chord(1, 1, 2, true)).toEqual([3, 6, 10, 13]);
    expect(musicTheory.chord(1, 1, 5, true)).toEqual([8, 12, 15, 18]);

    expect(musicTheory.chord(1, 1, 1, true)).toEqual([1, 5, 8, 12]);
    expect(musicTheory.chord(1, 2, 1, true)).toEqual([1, 4, 8, 11]);
    expect(musicTheory.chord(1, 5, 1, true)).toEqual([1, 5, 8, 11]);

    expect(musicTheory.chord(1, 3, 6, true)).toEqual([9, 13, 16, 20]);
    expect(musicTheory.chord(1, 6, 4, true)).toEqual([6, 9, 13, 16]);
    expect(musicTheory.chord(1, 2, 3, true)).toEqual([4, 8, 11, 15]);
  });

  it('calculates seventh chords in any mode', function () {
    expect(musicTheory.chord(5, 1, 1, true)).toEqual([5, 9, 12, 16]);
    expect(musicTheory.chord(5, 1, 3, true)).toEqual([9, 12, 16, 19]);
    expect(musicTheory.chord(5, 1, 7, true)).toEqual([16, 19, 22, 26]);

    expect(musicTheory.chord(14, 2, 4, true)).toEqual([19, 23, 26, 29]);
    expect(musicTheory.chord(14, 3, 7, true)).toEqual([24, 27, 31, 34]);
    expect(musicTheory.chord(14, 6, 2, true)).toEqual([16, 19, 22, 26]);
  });

});
