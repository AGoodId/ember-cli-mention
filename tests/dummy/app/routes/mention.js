import Ember from 'ember';

const User = Ember.Object.extend({});

export default Ember.Route.extend({
  model() {
    var users = Ember.A([]);
    for(var i = 0; i < 10; i++) {
      users.pushObject(
        User.create({username: "User" + i, email: "user"+i+"@test.xyz"})
      );
    }
    return users;
  }
});
