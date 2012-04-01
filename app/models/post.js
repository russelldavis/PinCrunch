define([
  "jquery",
  "backbone"
],

function($, Backbone) {

  var Self = Backbone.Model.extend({
    getImage: function() {
      var mediaGroups = this.get("mediaGroups");
      // Most image urls from Techcrunch support the w param for server-side scaling.
      // Replacing the default value with 192 for a larger image that looks nicer in the UI
      return mediaGroups && mediaGroups[0].contents[0].url.replace(/w=\d+/, "w=192");
    }
  });

  return Self;
});
