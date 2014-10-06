'use strict';

describe('Controller: SetCtrl', function () {

  beforeEach(module('fetApp'));
  beforeEach(module('mock.midi'));

  beforeEach(function () {
    module(function ($provide, MIDI) {
      $provide.constant('MIDI', MIDI);
    });
  });

  var SetCtrl,
    scope,
    settings,
    set;

  beforeEach(inject(function ($controller, $rootScope, _settings_, _set_) {
    scope = $rootScope.$new();
    SetCtrl = $controller('SetCtrl', {
      $scope: scope
    });
    settings = _settings_;
    set = _set_;
  }));

  it("can select notes", function() {
    scope.selectNote(3);
    expect(scope.selectedNotes).toEqual([3]);
  });

  it("clears selected notes", function() {
    scope.selectNote(3);
    scope.clearSelectedNotes();
    expect(scope.selectedNotes).toEqual([]);
  });

  it("submits answer after selecting the right number of notes", function() {
    for (var j = 0; j < settings.harmonicNotes; j++)
      scope.selectNote(3);
    expect(scope.stats.completedQuestions).toBe(1);
  });

  it("submits the right notes", function() {
    for (var i = 0; i < settings.harmonicNotes; i++)
      scope.selectNote(set.question.degrees[i]);
    expect(scope.stats.currentScore).toBe(1);
  });

  it("moves to finished state after asking all questions", inject(function ($state) {
    spyOn($state, 'go');
    for (var i = 0; i < settings.questionCount; i++)
      for (var j = 0; j < settings.harmonicNotes; j++)
        scope.selectNote(3);
    expect($state.go).toHaveBeenCalledWith('finished');
  }));

});
