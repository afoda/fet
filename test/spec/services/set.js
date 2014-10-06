'use strict';

describe('Service: set', function () {

  beforeEach(module('fetApp'));

  var set,
    settings;

  beforeEach(inject(function (_set_, _settings_) {
    set = _set_;
    set.resetExercise();
    settings = _settings_;
  }));

  it("starts on question 1", function () {
    expect(set.stats.currentQuestion).toBe(1);
  });

  it("moves to next question after answer is submitted", function () {
    set.submitAnswer([1,2,3]);
    expect(set.stats.currentQuestion).toBe(2);
  });

  it("keeps track of the current question", function () {
    for (var i = 0; i < settings.questionCount / 2; i++)
      set.submitAnswer([1,2,3]);
    expect(set.stats.currentQuestion).toBe(settings.questionCount/2 + 1);
  });

  it("does not setS finished state before all questions are answered", function () {
    for (var i = 0; i < settings.questionCount - 1; i++)
      set.submitAnswer([1,2,3]);
    expect(set.finished).toBe(false);
  });

  it("sets finished state after all questions are answered", function () {
    for (var i = 0; i < settings.questionCount; i++)
      set.submitAnswer([1,2,3]);
    expect(set.finished).toBe(true);
  });

  it("increments score on correct answer", function () {
    set.submitAnswer(set.question.degrees);
    expect(set.stats.currentScore).toBe(1);
  });

  it("starts with the right number of notes in the question", function () {
    expect(set.question.degrees.length).toBe(settings.harmonicNotes);
    expect(set.question.notes.length).toBe(settings.harmonicNotes);
  });

  it("starts with an appropriate key", function () {
    expect(set.root >= settings.keyLow && set.root <= settings.keyHigh).toBe(true);
  });

});
