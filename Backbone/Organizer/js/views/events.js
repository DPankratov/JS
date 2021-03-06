Organizer.ShowEventView = Organizer.ItemView.extend({
  template: '#show-event-template'
});

Organizer.NewEventView = Organizer.ItemView.extend({
  //Подключение валидации к view
  initialize: function () {
    Backbone.Validation.bind(this);
  },

  //from the stickit
  bindings:{
    '[name=title]':{
      observe: 'title',
      setOptions: {
        validate: true
      }
    },
  '[name=description]': {
    observe: 'description',
    setOptions: {
      validate: true
      }
    }
  },
  model: new Organizer.Event(),

  tagName: 'form',
  events: {
    'submit': 'createEvent'
  },
  createEvent: function(e) {
    e.preventDefault();
    var title = this.$('#event_title').val();
    var description = this.$('#event_description').val();
    var that = this;

    this.model.set({
      title: title,
      description: description,
      position: Organizer.events.nextPosition()
    });
    if (this.model.isValid(true)) {
      //create saves and updates the collection
      Organizer.events.create(this.model.toJSON(),
    {
      success: function() {
        that.el.reset();
      }
    });
    }
  },
  template: '#event-form-template'
});

Organizer.EventView = Organizer.ItemView.extend({
  tagName: 'li',
  className: 'list-group-item',
  events: {
    'click .btn-danger': 'removeEvent'
  },
  removeEvent: function(e) {
    e.preventDefault();
    if(confirm('Are you sure?')) {
      this.model.destroy();
    }
  },
  template: '#event-template'
});

Organizer.EventsListView = Organizer.ListView.extend({
  tagName: 'ul',
  className: 'list-group',
  ItemView: Organizer.EventView
});

Organizer.EventsLayout = Organizer.Layout.extend({
  template: '#events-layout-template',
  regions: {
    eventsList: '#events-list',
    newEvent: '#new-event'
  },

  ready: function() {
    var newEventView = new Organizer.NewEventView();

    var eventsListView = new Organizer.EventsListView({
      collection: this.collection
      });

      this.eventsList.append(eventsListView.render().el);
      this.newEvent.append(newEventView.render().el);
  }
});

Organizer.ShowEventLayout = Organizer.Layout.extend({

  template: '#show-event-layout-template',
  regions: {
    event: '#event'
  },

  ready: function () {
    var eventView = new Organizer.ShowEventView({
      model: this.model
    });
    this.event.append(eventView.render().el);


  }
});
