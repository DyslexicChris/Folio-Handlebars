# FolioHandlebars
Folio.js handlebars render engine

[![npm version](https://img.shields.io/npm/v/folio-handlebars.svg?style=flat)](https://www.npmjs.com/package/folio-handlebars)
[![Build Status](https://travis-ci.org/DyslexicChris/Folio-Handlebars.svg?branch=master)](https://travis-ci.org/DyslexicChris/Folio-Handlebars)
[![Dependency Status](https://david-dm.org/DyslexicChris/Folio-Handlebars.svg)](https://david-dm.org/DyslexicChris/Folio-Handlebars)
[![devDependency Status](https://david-dm.org/DyslexicChris/Folio-Handlebars/dev-status.svg)](https://david-dm.org/DyslexicChris/Folio-Handlebars#info=devDependencies)
[![Code Climate](https://codeclimate.com/github/DyslexicChris/Folio-Handlebars/badges/gpa.svg)](https://codeclimate.com/github/DyslexicChris/Folio-Handlebars)

## Install

The best way to add Folio-Handlebars to your folio.js project is to use ```npm```.

```bash
npm install folio-handlebars --save
```

## Example Usage
```javascript
// Require folio.js
var Folio = require('folio.js');
var FolioHandlebars = require('folio-handlebars');

// Create a new folio.js application
var myApp = new Folio();

// Create Folio-Handlebars instance
var folioHandlebars = new FolioHandlebars();

// Set as render engine
myApp.setRenderEngine(folioHandlebars);

// Register templates
folioHandlebars.registerTemplate('HelloWorld', __dirname + '/templates/helloWorld.html');

// Register Partials
folioHandlebars.registerPartial('MyPartial', __dirname + '/templates/partials/MyPartial.html');

// Set up route
myApp.get('/hello-world').handler(function(request, response) {

    var myModel = {
    	type: 'cupboard'
    };

    // Render the 'HelloWorld' view with a given model
    response.render('HelloWorld', myModel);
});

// Start the server, and have it listen for requests on port 3000.
myapp.start(3000);
```

## API
### registerTemplate(viewName, path, options)

Name     | Type   | Attribues | Description
---------|--------|-----------|------------
viewName | String |           | The name of the view that will be referenced when rendering
path     | String |           | The absolute path to the template on disk
options  | Object | Optional  | Options that should be passed to handlebars when compiling the template

Registers a template with handlebars.

### registerPartial(name, path)

Name     | Type   | Description
---------|--------|------------
name     | String | The name of the partial as used by referencing templates
path     | String | The absolute path to the partial on disk

Registers a partial with handlebars.

### render(viewName, model) -> {String}

Name     | Type   | Description
---------|--------|------------
viewName | String | The view's name to render as registered previously
model    | Object | The model to be passed to the template when rendering

Render a view with a model. This method should not be called directly, but via the response object. See above example.

## License
FolioHandlebars is licensed under the MIT license.

