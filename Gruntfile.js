module.exports = function (grunt) {
  grunt.initConfig({
    connect: {
      server: {
        options: {
          port: 8000,
          keepalive: true
        }
      },
      doc: {
        options: {
          port: 8081,
          keepalive: true,
          base: 'doc/'
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
      },
      doc: {
        files: ['doc/template/*.tmpl', 'doc/tutor/*.md', 'doc/tutor/*.json'],
        tasks: ['jsdoc']
      }
    },
    jsdoc: {
      dist: {
        src: ['js/**/*.js', 'lib/bower-ferret/ferret.js'],
        options: {
          dest: 'doc',
          tutorials: 'doc/tutor',
          configure: 'conf.json'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-jsdoc');
};
