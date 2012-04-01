define([
  "jquery",
  "use!libs/jquery.imagesloaded",
  "backbone",
  "collections/feed",
  "views/pin"
],

function($, jqImagesLoaded, Backbone, Feed, PinView) {

  var Self = Backbone.View.extend({
    className: 'feed',
    postTemplate: _.template($('#pin-template').html()),

    initialize: function() {
      this.collection = new Feed();
      this.collection.bind('reset', this.render, this);

      this.columnWidth = PinView.getWidth();

      this.$el.appendTo('body');
      $(window).resize(_.bind(this.doLayout, this));
    },

    getNumColumns: function() {
      return Math.floor(this.$el.width() / this.columnWidth);
    },

    minIndex: function(list) {
      var minValue = Number.MAX_VALUE;
      var minIndex = null;
      _(list).each(function(value, index) {
        if (value < minValue) {
          minIndex = index;
          minValue = value;
        }
      });
      return minIndex;
    },

    doLayout: function() {
      var numColumns = this.getNumColumns();
      if (numColumns === this.lastNumColumns) return;

      var tops = [];
      _(numColumns).times(function() {
        tops.push(0);
      })

      // Add each item to the current shortest column
      _(this.views).each(function(view) {
        var curColumn = this.minIndex(tops);
        var top = tops[curColumn];
        view.$el
          .css("top", top)
          .css("left", curColumn * this.columnWidth);

        tops[curColumn] = top + view.$el.outerHeight(true);
      }, this);

      this.lastNumColumns = numColumns;
    },

    render: function() {
      this.$el.empty();
      this.views = [];

      this.collection.each(function(post) {
        var view = new PinView({model: post});
        view.render();
        this.views.push(view);
      }, this);

      var els = $(_(this.views).pluck('el'));
      els.imagesLoaded().done(_.bind(function() {
        els.appendTo(this.$el);
        this.lastNumColumns = null;
        this.doLayout();
      }, this));
    }
  });

  return Self;
});
