import Ember from 'ember';
import layout from '../templates/components/mention-input';

export default Ember.Component.extend({
  layout: layout,
  didInsertElement() {
    Ember.$('#mention').mention({
      delimiter: this.get('delimiter') || '@',
      users: this.get('users')
    });
  }
});
