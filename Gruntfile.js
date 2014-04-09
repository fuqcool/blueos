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
    },
    jsdoc: {
      dist: {
        src: ['js/**/*.js', 'lib/bower-ferret/ferret.js'],
        options: {
          dest: 'doc',
          tutorials: 'doc/tutor'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  // grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-jsdoc');
};
