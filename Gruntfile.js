module.exports = function (grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Listing Tasks
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    // Sass all the style things
    sass: {
      default: {
        files: {
          'dist/css/<%= pkg.name %>.css': 'src/stylesheets/<%= pkg.name %>.scss'
        },
        options: {
          sourceMap: true,
          outputStyle: 'expanded'
        },
      },
      minify: {
        files: {
          'dist/css/<%= pkg.name %>.min.css': 'src/stylesheets/<%= pkg.name %>.scss'
        },
        options: {
          sourceMap: true,
          outputStyle: 'compressed'
        },
      },
    },

    // Copies templates and assets from external modules and dirs
    copy: {

      uswds_assets: {
        expand: true,
        src: '**',
        cwd: 'node_modules/uswds/src',
        dest: 'src/lib/uswds'
      },

    },

    // Watches styles and specs for changes
    watch: {
      css: {
        files: ['src/stylesheets/*.scss'],
        tasks: ['sass','scsslint','postcss'],
        options: { nospawn: true }
      }
    },

    // Clear files and folders
		clean: {
			all: [ 'dist' ]
		},

    // Lint scss files
    scsslint: {
      allFiles: [
        'src/stylesheets/*.scss'
      ],
      options: {
        bundleExec: false,
        colorizeOutput: true,
        config: '.scss-lint.yml',
        force: true,
        reporterOutput: null
      },
    },

    // PostCSS, primarily to autoprefix
    postcss: {
      options: {
        map: {
          inline: false, // save all sourcemaps as separate files...
          annotation: 'dist/css' // ...to the specified directory
        },
        processors: [
          require('pixrem')(), // add fallbacks for rem units
          require('postcss-quantity-queries')(), // do things like .asdf:at-least(4) {} ; https://github.com/pascalduez/postcss-quantity-queries
          require('autoprefixer')({ browsers: 'last 2 versions' }), // add vendor prefixes
          // require('cssnano')() // minify the result
        ]
      },
      dist: {
        src: 'dist/css/*.css'
      }
    },

    // Live Reload and Browser Sync'ing
    browserSync: {
      dev: {
        files: {
          src : [
            '*.html',
            'dist/css/*.css',
            'dist/js/*.js'
          ]
        },
        options: {
          watchTask: true,
          server: './'
        }
      }
    },

  });

  // Register Tasks
  grunt.registerTask('default', ['build', 'browserSync', 'watch']);
  grunt.registerTask('build', ['clean', 'sass', 'postcss', 'lint']);
  grunt.registerTask('lint', 'scsslint');
  grunt.registerTask('test', 'default', function () { grunt.log.writeln('Test that the app runs');});

};
