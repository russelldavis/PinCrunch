define([
  "jquery",
  "backbone",
  "views/feed"
],

function($, Backbone, Photos) {

  var Self = Backbone.Router.extend({
    routes: {
      "": "feed",
      "feed": "feed"
    },

    views: {},

    getView: function(name) {
      var view = this.views[name];
      if (!view) {
        view = this.views[name] = new (require("views/" + name))();
      }
      return view;
    },

    feed: function(page) {
      this.getView("feed").collection.fetch();
    }
  });

  var router = new Self();
  // Start history *after* instantiating router to process initial route
  Backbone.history.start();
  return router;

});
