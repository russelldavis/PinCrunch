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
  });

  return Self;
});
