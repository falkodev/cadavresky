'use strict';

exports.config = {
  paths: {
    'public': 'web',
    'watched': ['app/Resources']
  },
  files: {
     javascripts: {
       joinTo: {
         'js/app.js': /^app/,
         'js/vendor.js': /^(?!app)/,
       }
     },
    stylesheets: {
      joinTo: 'css/style.css'
    }
  },
  conventions: {
    ignored: [
      /\/_/, // File beginning by "_" like _settings.scss
      // Brunch does include all Bower components by default, we blacklist unneeded ones.
      //'bower_components/foundation/'
    ],
    assets: /^app\/Resources\/assets/
  },
  plugins: {

    babel: {
      pattern: /\.(js|jsx)$/
    },
    sass: {
      allowCache: true
    },
    uglify: {
      mangle: true,
      compress: {
        global_defs: {
          DEBUG: false
        }
      }
    },
    cleancss: {
      keepSpecialComments: 0,
      removeEmpty: true
    }
  }
};
