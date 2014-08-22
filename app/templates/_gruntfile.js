module.exports = function(grunt) {
  grunt.initConfig({
    less: {
      development: {
        options: {
          compress: false,
          yuicompress: false,
          optimization: 2
        },
        files: {
          // target.css file: source.less file
          "template/styles/main.css": "source/less/main.less"
        }
      }
    },
    uglify: {
      my_target: {
        options: {
          mangle: false
        },
        files: {
          'template/js/main.min.js': ['source/js/*.js']
        }
      }
    },
    watch: {
      styles: {
        files: ['source/less/**/*.less'], // which files to watch
        tasks: ['less','uglify'],
        options: {
          nospawn: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');


  grunt.registerTask('default', ['watch', 'less', 'uglify']);
};