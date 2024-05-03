const Handlebars = require('handlebars');

Handlebars.registerHelper('arrayIncludes', function(array, value) {
  return array.includes(value);
});

module.exports = Handlebars;