module.exports = function (grunt) {
  grunt.initConfig({
    connect: {
      server: {
        options: {
          port: 8000,
          keepalive: true
        }
      }
    },
    concat: {
    },
    less: {
      css: {
        files: { 'css/blueos.css': 'less/*.less' }
      }
    },
    watch: {
      css: {
        files: 'less/*.less',
        tasks: ['less']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  // grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
};
