// Set the require.js configuration for your application.
require.config({
  // Initialize the application with the main application file
  deps: ["router"],
  urlArgs: "v=" + (new Date()).getTime(), // cache busting, for dev only

  paths: {
    // JavaScript folders
    libs: "../assets/js/libs",
    plugins: "../assets/js/plugins",

    // Libraries
    jquery: "../assets/js/libs/jquery",
    underscore: "../assets/js/libs/underscore",
    backbone: "../assets/js/libs/backbone",
    use: "../assets/js/plugins/use"
  },
  
  use: {
    "libs/jquery.imagesloaded": {
      deps: ["jquery"],
      attach: function() {
        return $.fn.imagesLoaded;
      }
    }
  }

});
