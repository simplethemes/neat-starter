# Neat Starter
Aims to ease the initial hassle of setting up new frontend development projects using bourbon/neat with a simple grunt workflow for minifying, concatenation and livereload.


This repo is intended to be forked and customized to fit your own needs.

 1. Download the repo and cd into the project.
 2. run `npm install` to pull down the node module dependencies.
 3. run `grunt` to get started.
 
### The Basics
 
Any changes made to JavaScript or SASS/SCSS files will fire the necessary grunt optimization tasks followed by a concurrent livereload.

### The JavaScript

To concatenate and minify your scripts, either add your js libraries to the `js/src` directory or via bower (in the order you want them concatenated) and then include those files in the `concat:dist > src` array. An example is shown below:

    concat: {
    	dist: {
    	//array of scripts to concat and minify
    	src: [
    	// via bower or manually via src
    	'bower_components/yourlib/dist/core.js',
    	'js/src/main.js',
    	],
    	dest: 'js/scripts.all.js'
      }
    },

When a change occurs, the above files are concatenated to `js/scripts.all.js` as well as minified to `js/scripts.min.js`.

### The SASS/CSS


When a SASS/SCSS file is changed, the `sass:watch` task is run which invokes `sass:dist`. This task compiles `sass/style.scss` to `style.css`. This also includes a proper WordPress banner file if you want to use your project in a WordPress theme. To customize breakpoints and other variables, look in `base/_variables.scss` and `base/_grid-settings.scss`.



#### Attribution and further reading:

* https://www.npmjs.com/
* http://gruntjs.com/
* http://livereload.com/
* http://bourbon.io/
* http://neat.bourbon.io/
* http://bitters.bourbon.io/
