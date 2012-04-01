define([
  "jquery",
  "underscore",
  "backbone"
],

function($, _, Backbone) {

  var Self = Backbone.View.extend({
    className: 'post',
    template: _.template($('#post-template').html()),

    events: {
      'click': 'stopPropagation'
    },

    initialize: function() {
      $('#lightbox').click(_.bind(this.hide, this));
      $(document).on('keydown.lightbox', _.bind(this.onKeyDown, this));
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },

    show: function() {
      $('#lightbox').append(this.render().$el).show();
      $('body').css('overflow', 'hidden');
    },

    hide: function() {
      this.remove();
      $('#lightbox').hide();
      $('body').css('overflow', '');
      $('#lightbox').off();
      $(document).off('.lightbox');
    },

    onKeyDown: function(e) {
      if (e.keyCode == 27) this.hide();
    },

    stopPropagation: function(e) {
      e.stopPropagation();
    }
  });

  return Self;
});
