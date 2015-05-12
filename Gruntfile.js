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
              'Theme Name: <%= pkg.name %>\n' +
              'Theme URI: <%= pkg.url %>\n' +
              'Author: <%= pkg.author %>\n' +
              'Version <%= pkg.version %>\n' +
              'Text Domain: <%= pkg.textdomain %>\n' +
              'Copyright <%= pkg.copyright %>. <%= pkg.license %> licensed.\n' +
              ' */\n'
    },


    /**
     * Set project info
     */
    project: {
      src: './'
    },
    sass: {
        dev: {
            options: {
                style: 'expanded', //nested, compact, compressed, expanded
                lineNumbers: true,
                banner: '<%= tag.banner %>'
            },
            files: {
                'css/style.css': 'sass/style.scss'
            }
        },
        dist: {
            options: {
                style: 'compressed', //nested, compact, compressed, expanded
                lineNumbers: false,
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
        //array of scripts to minify and include
        src: [
        //'bower_components/formstone/dist/js/core.js',
        //'bower_components/formstone/dist/js/mediaquery.js',
        //'bower_components/formstone/dist/js/touch.js',
        //'bower_components/formstone/dist/js/swap.js',
        //'bower_components/formstone/dist/js/navigation.js',
        //'bower_components/formstone/dist/js/equalize.js',
        //'bower_components/formstone/dist/js/transition.js',
        //'bower_components/formstone/dist/js/background.js',
        //'bower_components/formstone/dist/js/carousel.js',
        //'bower_components/formstone/dist/js/tooltip.js',
        'js/src/main.js'
        ],
        dest: 'js/scripts.all.js'
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
          'js/scripts.min.js': ['js/scripts.all.js']
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
        files: 'sass/{,*/}*.scss',
        tasks: ['sass:dev'],
      },
      concat: {
        options: {
          spawn: false,
        },
        files: 'js/src/{,*/}*.js',
        tasks: ['concat:dev'],
      },
      uglify: {
        options: {
          spawn: false,
        },
        files: 'js/src/{,*/}*.js',
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
  'sass:dist',
  'concat:dev',
  'uglify:dev',
]);

grunt.registerTask('js', [
  'concat:dev',
  'uglify:dev',
]);


grunt.registerTask('css', [
  'sass:dist',
]);

};
