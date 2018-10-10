 module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Copy web assets from bower_components to more convenient directories.

        copy: {
            main: {
                files: [
                    // Vendor scripts.

                    {
                        expand: true,
                        cwd: 'bower_components/sass-bootstrap-glyphicons/fonts',
                        src: ['**/*.*'],
                        dest: '../giesenwebentwicklung/Resources/Public/Fonts/'
                    },

                    {
                      expand: true,
                      cwd: 'bower_components/slick-carousel/slick/fonts',
                      src: ['**/*.*'],
                      dest: '../giesenwebentwicklung/Resources/Public/Fonts/'
                    }


                ]
            }
        },


    concat: {
      options: {
        // Custom function to remove all export and import statements
        process: function (src) {
          return src.replace(/^(export|import).*/gm, '')
        }
      },
      bootstrap: {
        src: [
                    'bower_components/jquery/dist/jquery.min.js',
                    'bower_components/bootstrap/dist/js/bootstrap.min.js',
                    'bower_components/jquery.easing/js/jquery.easing.js',
                    'bower_components/cookieconsent/build/cookieconsent.min.js',
                    'bower_components/slick-carousel/slick/slick.js',
                    'scripts/giesen.js'
        ],
        dest: 'js/giesen.js'
      }
    },

    uglify: {
      options: {
        mangle: false
      },
      my_target: {
        files: {
          '../giesenwebentwicklung/Resources/Public/Js/giesen.min.js': ['js/giesen.js']
        }
      }
    },





       sass: {
            options: {
                includePaths: ['bower_components/bootstrap/scss/']
            },
            dist: {
                options: {
                    outputStyle: 'compressed'
                },
                files: {
                    '../giesenwebentwicklung/Resources/Public/Css/giesen.css': 'scss/giesen.scss',
                    '../giesenwebentwicklung/Resources/Public/Css/rte.css': 'scss/rte.scss'
                }
            }
        },









        // Watch these files and notify of changes.
        watch: {
            grunt: { files: ['Gruntfile.js'] },

            sass: {
                files: [
                    'scss/**/*.scss'
                ],
                tasks: ['sass']
            },

			js: {
				files: [
					'scripts/**/*.js'
				],
				tasks: ['concat','uglify']
			}


        }
    });

    // Load externally defined tasks.
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');


    // Establish tasks we can run from the terminal.
    grunt.registerTask('copie', ['copy']);
    grunt.registerTask('dist-js', ['concat', 'uglify']);
    grunt.registerTask('dist-css', ['sass']);
    grunt.registerTask('build', ['sass', 'copy']);
    grunt.registerTask('default', ['dist-js','dist-css', 'watch']);
}
