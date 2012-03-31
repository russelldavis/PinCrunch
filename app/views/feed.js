define([
  "jquery",
  "backbone",
  "collections/feed",
  "views/pin"
],

function($, Backbone, Feed, PinView) {

  var Self = Backbone.View.extend({
    className: 'feed',
    postTemplate: _.template($('#pin-template').html()),

    initialize: function() {
      this.collection = new Feed();
      this.collection.bind('reset', this.render, this);

      this.columnWidth = PinView.getWidth();

      this.$el.appendTo('body');
      $(window).resize(_.bind(this.onResize, this));
    },

    getNumColumns: function() {
      return Math.floor(this.$el.width() / this.columnWidth);
    },

    onResize: function() {
      if (this.lastNumColumns && this.lastNumColumns != this.getNumColumns()) {
        this.render();
      }
    },

    minIndex: function(list) {
      var minValue = Number.MAX_VALUE;
      var minIndex = null;
      _.each(list, function(value, index) {
        if (value < minValue) {
          minIndex = index;
          minValue = value;
        }
      });
      return minIndex;
    },

    render: function() {
      this.$el.empty();

      var numColumns = this.getNumColumns();
      var tops = [];
      _(numColumns).times(function() {
        tops.push(0);
      })

      // Add each item to the current shortest column
      this.collection.each(function(post) {
        var curColumn = this.minIndex(tops);
        var top = tops[curColumn];
        var view = new PinView({model: post});
        view.render().$el
          .css("top", top)
          .css("left", curColumn * this.columnWidth)
          .appendTo(this.$el);
        tops[curColumn] = top + view.$el.outerHeight(true);
      }, this);

      this.lastNumColumns = numColumns;

      // TODO - Get rid of this hack. Detect when images finish loading.
      if (!this.didRender) {
        this.didRender = true;
        setTimeout(_.bind(this.render, this), 1000);
      }
    }
  });

  return Self;
});
