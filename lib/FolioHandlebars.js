var Handlebars = require('handlebars');
var fs = require('fs');

module.exports = FolioHandlebars;

/**
 * @classdesc Folio-Handlebars is a Handlebars based render engine for the folio.js framework.
 *
 * @example
 * var myFolioApp = new Folio();
 * var folioHandlebars = new FolioHandlebars();
 *
 * myFolioApp.setRenderEngine(folioHandlebars);
 *
 * @constructor
 */
function FolioHandlebars() {
    'use strict';

    this.handlebars = Handlebars.create();
    this.templates = {};
    this.templateEncoding = 'utf8';
}

/**
 * Render a view with a model. This method should not be called directly, but via the response object. See example.
 *
 * @example
 * function handleFunction(request, response) {
 *     response.render('MyView', myModel);
 * }
 *
 * @param viewName {String} The view's name to render as registered previously
 * @param model {Object} The model to be passed to the template when rendering
 * @returns {String} The rendered output from the template
 */
FolioHandlebars.prototype.render = function (viewName, model) {
    'use strict';

    var template = this.templates[viewName];
    var renderedView;

    if (template) {
        renderedView = template(model);
    }

    return renderedView;
};

/**
 * Registers a partial with handlebars.
 *
 * @example
 * folioHandlebars.registerPartial('MyPartial', __dirname + '/views/partials/myPartial.html');
 *
 * @param name {String} The name of the partial as used by referencing templates
 * @param path {String} The absolute path to the partial on disk
 */
FolioHandlebars.prototype.registerPartial = function (name, path) {
    'use strict';

    var partialSource = fs.readFileSync(path, {
        encoding: this.templateEncoding
    });

    this.handlebars.registerPartial(name, partialSource);
};

/**
 * Registers a template with handlebars.
 *
 * @example
 * folioHandlebars.registerTemplate('MyTemplate', __dirname + '/views/partials/myPartial.html');
 *
 * @param viewName {String} The name of the view that will be referenced when rendering
 * @param path {String} The absolute path to the template on disk
 * @param [options] {Object} Options that should be passed to handlebars when compiling the template
 */
FolioHandlebars.prototype.registerTemplate = function (viewName, path, options) {
    'use strict';

    var templateSource = fs.readFileSync(path, {
        encoding: this.templateEncoding
    });

    if (templateSource) {
        this.templates[viewName] = this.handlebars.compile(templateSource, options);
    }
};
