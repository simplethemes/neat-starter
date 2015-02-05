/*!
 * smpl Gruntfile
 * http://smpl.io
 * @author Casey Lee
 */

'use strict';

/**
 * Grunt module
 */
module.exports = function (grunt) {

  /**
   * Dynamically load npm tasks
   */
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  /**
   * Grunt config
   */
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    tag: {
      banner: '/*!\n' +
              ' * <%= pkg.name %>\n' +
              ' * <%= pkg.title %>\n' +
              ' * <%= pkg.url %>\n' +
              ' * @author <%= pkg.author %>\n' +
              ' * @version <%= pkg.version %>\n' +
              ' * Copyright <%= pkg.copyright %>. <%= pkg.license %> licensed.\n' +
              ' */\n'
    },

    /**
     * Set project info
     */
    project: {
      src: './'
    },
    sass: {
        dist: {
            options: {
                style: 'expanded', //nested, compact, compressed, expanded
                lineNumbers: true,
                banner: '<%= tag.banner %>'
            },
            files: {
                'css/style.css': 'sass/style.scss'
            }
        }
    },

    /**
     * Concatenate scripts
     * https://github.com/jsoverson/grunt-contrib-concat
     */

    concat: {
      dev: {
        src: [
        './js/modernizr.custom.js',
        './js/jquery.easing.min.js',
        //'./js/jquery.backstretch.min.js',
        //'./js/skrollr.min.js',
        './js/masterslider.js',
        './js/jquery.smooth-scroll.js',
        './js/jquery.waypoints.js',
        './js/waypoints.sticky.js',
        //'./js/waypoints.debug.js',
        //'./js/jquery.tooltipster.js',
        './js/jquery.magnific-popup.min.js',
        //'./js/mediaelement-and-player.js',
        './js/enquire.min.js',
        './js/scripts.js'
        ],
        dest: '../js/scripts.js'
      },
      //css: {
      //  src: 'src/css/*.css',
      //  dest: 'dest/css/concat.css'
      //}
    },


    /**
     * Uglify scripts
     * https://github.com/jsoverson/grunt-contrib-uglify
     */

    uglify: {
      options: {
        mangle: false
      },
      dev: {
        files: {
          '../js/scripts.min.js': ['../js/scripts.js']
        }
      }
    },
    /**
     * Runs tasks against changed watched files
     * https://github.com/gruntjs/grunt-contrib-watch
     * Watching development files and run concat/compile tasks
     * Livereload the browser once complete
     */
    watch: {
      sass: {
        options: {
          spawn: false,
        },
        files: './sass/{,*/}*.scss',
        tasks: ['sass:dist'],
      },
      concat: {
        options: {
          spawn: false,
        },
        files: './js/{,*/}*.js',
        tasks: ['concat:dev'],
      },
      uglify: {
        options: {
          spawn: false,
        },
        files: './js/{,*/}*.js',
        tasks: ['uglify:dev'],
      },
      livereload: {
        options: {
          spawn: false,
          livereload: true,
        },
        files: ['css/style.css','js/scripts.min.js','images/**','index.html'],
      }
    },
    // loader
    concurrent: {
        options: {
            logConcurrentOutput: true,
        },
        watch: [
            'watch:sass',
            'watch:concat',
            'watch:uglify',
            'watch:livereload',
        ],
    },


});

  /*
  -----------------
  default task
  -----------------
  */

  grunt.registerTask('default', [
    'concurrent'
  ]);


  /*
  -----------------
  build task
  -----------------
  */

grunt.registerTask('build', [
  'compass:dist',
  'concat:dev',
  'uglify:dev',
]);

grunt.registerTask('js', [
  'concat:dev',
  'uglify:dev',
]);

};
