Organizer.Event = Backbone.Model.extend({

  /* old validation without plaguin
  initialize: function() {
    this.on('invalid', function(model, error) {
      $('#' + _.keys(error)[0]).parent().addClass('has-error');
    });
  },

  validate: function(attrs, options) {
    if (_.isEmpty(attrs.title)) {
      return {'event_title': "Title has to be present!"}
    }
  },

  */

  validation: {
    title: {
      required: true,
      msg: 'Oops, title has to present'
    },
    description: {
      required: true,
      msg: 'Oops, description has to present'
    }
  },

  defaults: {
    title: '',
    description: ''
  },

  localStorage: new Backbone.LocalStorage('events'),
  idAttribute: 'position'
});
