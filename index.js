/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-mention',
  included: function(app) {
    this._super.included(app);

    app.import('vendor/typeahead.js');
    app.import('vendor/mention.js');
  }
};
