Organizer.EventsCollection = Backbone.Collection.extend({
  model: Organizer.Event,

  //где берем массив
  //url: '/events'
  localStorage: new Backbone.LocalStorage('events'),
  nextPosition: function() {
    if(_.isUndefined(this.length) || this.length === 0){
      return 1
    }
    return this.last().get('position') + 1;
  },

  comparator: function (event) {
      return event.get('position')
    }

  //reverse order
/*  comparator: function (event1, event2) {
    return event1.get('position') < event2.get('position') ? 1 : -1 ;
  }

  */

});
