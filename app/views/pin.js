define([
  "jquery",
  "backbone",
  "views/post",
  "models/post"
],

function($, Backbone, PostView, Post) {

  var Self = Backbone.View.extend({
    className: 'pin',
    tagName: 'figure',

    template: _.template($('#pin-template').html()),

    events: {
      'click': 'onClick'
    },

    onClick: function() {
      var postView = new PostView({model: this.model});
      postView.show();
    },

    render: function() {
      this.$el.html(this.template({
        imageUrl: this.model.getImage(),
        title: this.model.get("title")
      }));
      return this;
    }
  },
  {
    getWidth: function() {
      var sizingEl = new Self({model: new Post()}).render().$el;
      sizingEl.appendTo($('body'));
      var width = sizingEl.outerWidth(true);
      sizingEl.remove();
      return width;
    }
  });

  return Self;
});
