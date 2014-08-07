'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var BrahmaLandingGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      this.bowerInstall();
      this.installDependencies({ skipInstall: true });
    });
  },

  askFor: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the BrahmaLanding generator!'));

    var prompts = [
    {
      type: 'input',
      name: 'projectName',
      message: 'What is the codename of this project?',
      default: 'project_name'
    },
    {
      type: 'confirm',
      name: 'brahmaLocal',
      message: 'Use Brahma.js local server (Morulus only)',
      default: false
    },
    {
      type: 'checkbox',
      message: 'Wanna install some stuff?',
      name: 'features',
      choices: [
          {
              name: 'jQuery',
              value: 'includeJquery'
          },

          {
              name: 'AngularJs',
              value: 'includeAngular'
          },
          {
              name: 'Modernizr',
              value: 'includeModernizr'
          },
          {
              name: 'jQuery.placeholder',
              value: 'includejQueryPlaceholder'
          },
          {
              name: 'jQuery.cookie',
              value: 'includejQueryCookie'
          }
      ]
    }
    ];

    this.prompt(prompts, function (props) {
        var features = props.features;

        function hasFeature (feat) {
            return features.indexOf(feat) !== -1;
        }

        this.projectName = props.projectName;
        this.brahmaUrl = props.brahmaLocal ? 'http://brahmajs.local/' : 'http://brahmajs.com/';
        this.includeJquery = hasFeature('includeJquery');
        this.includeModernizr = hasFeature('includeModernizr');
        this.includeAngular = hasFeature('includeAngular');
        this.includejQueryPlaceholder = (hasFeature('includejQueryPlaceholder') && !this.includeAngular); // Not with Angular
        this.includejQueryCookie = hasFeature('includejQueryCookie');

        this.dependencies = {};
        var brahmaPaths = {};

        if ( this.includeJquery ) {
            this.dependencies["jquery"] = "latest";
            brahmaPaths["jquery"] = 'template/vendors/jquery/dist/jquery.min.js';
        }

        if ( this.includeAngular ) {
            this.dependencies["angularjs"] = "latest";
             brahmaPaths["angularjs"] = 'template/vendors/angularjs/angular.min.js';
        }

        if ( this.includeModernizr ) {
            this.dependencies["modernizr"] = "latest";
             brahmaPaths["modernizr"] = 'template/vendors/modernizr/modernizr.js';
        }

        if ( this.includejQueryPlaceholder) { // not with angular
            this.dependencies["jquery.placeholder"] = "latest";
            brahmaPaths["jquery.placeholder"] = 'template/vendors/jquery.placeholder/jquery.placeholder.min.js';
        }

        if ( this.includejQueryCookie) {
            this.dependencies["jquery-cookie"] = "latest";
           brahmaPaths["jquery-cookie"] = 'template/vendors/jquery-cookie/jquery.cookie.js'; 
        }
        
        // Creater Brahma require list
        var brahmaRequire = [];
        
        for (var d in this.dependencies) {
          brahmaRequire.push(d);

        };
        this.brahmaRequire = JSON.stringify(brahmaRequire);
        this.brahmaPaths = JSON.stringify(brahmaPaths);

      done();
    }.bind(this));
  },

  app: function () {
    this.mkdir('');
    this.mkdir('screens');
    this.mkdir('template');
    this.mkdir('template/styles');
    this.mkdir('template/images');
    this.mkdir('template/js');
    this.mkdir('template/vendor');

    // Copy less prototype



    this.template('_package.json', 'package.json');
    this.template('_bower.json', 'bower.json');
    this.copy('_bowerrc', '.bowerrc');
    this.copy('_gruntfile.js', 'gruntfile.js');

    this.copy('_functions.less', 'template/styles/functions.less');
    this.copy('_main.less', 'template/styles/main.less');
    this.copy('_main.css', 'template/styles/main.css');
    this.copy('_main.js', 'template/js/main.js');
    this.template('_build.html', 'build.html')
  }
});

module.exports = BrahmaLandingGenerator;
