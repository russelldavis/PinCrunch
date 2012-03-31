define([
  "jquery",
  "backbone",
  "models/post"
],

function($, Backbone, Post) {

  var Self = Backbone.Collection.extend({
    model: Post,

    feedUrl: "http://feeds.feedburner.com/TechCrunch/",

    parse: function(result) {
      return result.feed.entries;
    },

    sync: function(method, model, options) {
      if (method == 'read') {
        var feed = new google.feeds.Feed(this.feedUrl);
        feed.includeHistoricalEntries();
        feed.setNumEntries((options && options.numEntries) || 30);

        feed.load(function(result) {
          if (result.error) {
            options.error(model, result);
          } else {
            options.success(result);
          }
        });
      } else {
        throw new Error("Unsupported method: " + method);
      }
    }

  });

  return Self;
});
