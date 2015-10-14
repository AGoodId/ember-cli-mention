import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../../tests/helpers/start-app';

const LETTER_U = {keyCode: 85};
const AT = {keyCode: 64};

module('Acceptance | mention input', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

test('visiting /', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');
  });
});

test('textarea is visible', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(find('textarea#mention').length, 1);
  });
});

test('typeahead should not be visible after the component is rendered /', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(find('.typeahead').length, 0);
  });
});

test('typeahead should be visible after writing @', function(assert) {
  visit('/');

  find('#mention').focus();
  fillIn('#mention', '@u');
  triggerEvent("#mention", "keyup", AT);
  triggerEvent("#mention", "keyup", LETTER_U);
  andThen(function() {
    assert.equal(find('#mention').val(), '@u');
    assert.equal(find('.typeahead').length, 1);
    assert.equal(find('.typeahead').is(':visible'), true);
  });
});

test('typeahead should complete after writing @ and pressing a choice', function(assert) {
  // Todo make this test "actually" work? I can't figure out why it's not working as it should
  visit('/');

  find('#mention').focus();
  fillIn('#mention', '@u');
  triggerEvent("#mention", "keyup", AT);
  triggerEvent("#mention", "keyup", LETTER_U);
  triggerEvent(".typeahead li[data-value='User2']", "mouseenter");
  click('.typeahead li[data-value="User2"]');
  andThen(function() {
    assert.equal(find('#mention').val(), '@User2@u');
  });

  triggerEvent(".typeahead li[data-value='User4']", "mouseenter");
  click('.typeahead li[data-value="User4"]');
  andThen(function() {
    assert.equal(find('#mention').val(), '@User4@u');
  });
});
