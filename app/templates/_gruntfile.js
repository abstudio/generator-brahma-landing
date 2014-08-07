module.exports = function(grunt) {
     grunt.initConfig({

         less: {
             development: {
                 options: {
                     paths: ["template/styles/"]
                 },
                 files: {"main.css": "main.less"}
             },
             production: {
                 options: {
                     paths: ["template/styles/"]
                     cleancss: true
                 },
                 files: {"main.css": "main.less"}
             }
         }
     });
     grunt.loadNpmTasks('grunt-contrib-less');
     grunt.registerTask('default', ['less']);
 };