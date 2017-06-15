// safe code IIFE wrapper
(function(global, $) {

  var Greetr = function(firstName, lastName, language) {
    // Greetr will return a newly initialized object,
    // using a function constructor to generate the obj.
    return new Greetr.init(firstName, lastName, language);
  }

  /* not exposed to outside world */
  // internal setup features (-> in a given Greetr obj's closure)
  var supportedLangs = ['en', 'es'];
  // data
  var greetings = {
    en: 'Hello',
    es: 'Hola'
  };
  var formalGreetings = {
    en: 'Greetings',
    es: 'Saludos'
  };
  // analytics - logging
  var logMessages = {
    en: 'Logged in',
    es: 'Incio sesion'
  }

  // initialize prototype
  // can cleanly put props and methods on here
  // one giant object literal with Alllll the methods defined on it
  /* exposed to outside world */
  Greetr.prototype = {
    // adding properties and methods in object-literal syntax
    fullName: function() {
      return this.firstName + ' ' + this.lastName;
    },
    validate: function() {
      if (supportedLangs.indexOf(this.language) === -1) {
        throw "Invalid language";
      }
    },
    greeting: function() {
      return greetings[this.language] + ' ' + this.firstName + '!';
    },
    formalGreeting: function() {
      return formalGreetings[this.language] + ' ' + this.fullName();
    },
    // Chainable Methods
    greet: function(formal) {
      var msg;
      // if undefined or null it will be coerced to 'false'
      if (formal) {
        msg = this.formalGreeting();
      } else {
        msg = this.greeting();
      }
      if (console) {
        console.log(msg);
      }
      // 'this' refers to the calling object at execution time
      // makes the method chainable
      return this;
    },
    log: function() {
      if (console) {
        console.log(logMessages[this.language] + ': ' + this.fullName());
      }
      return this;
    },
    setLang: function(lang) {
      this.language = lang;
      this.validate();
      return this;
    },
    // jQuery method:
    // accepts selector, whether formal greeting
    // sets up greeting itself
    // updates whatever value's there
    // plus validations, plus chainable
    HTMLGreeting: function(selector, formal) {
      if (!$) {
        throw 'jQuery not loaded';
      }
      if (!selector) {
        throw 'Missing jQuery selector';
      }
      var msg;
      if (formal) {
        msg = this.formalGreeting();
      } else {
        msg = this.greeting();
      }
      $(selector).html(msg);
      return this;
    }

  };

  // function constructor:
  // builds an object and gives it 3 properties
  Greetr.init = function(firstName, lastName, language) {
    var self = this;
    // initialize properties, add sensible defaults
    self.firstName = firstName || '';
    self.lastName = lastName || '';
    self.language = language || 'en';

    self.validate();
  }

  // point .prototype prop of Greetr.init function
  // to Greetr.prototype --
  // i.e., "Any object created with this function
  // should actually point here for its prototype chain"
  Greetr.init.prototype = Greetr.prototype;

  // expose Greetr to the outside world
  // by attaching it to the global object
  global.Greetr = global.G$ = Greetr;

}(window, jQuery));
