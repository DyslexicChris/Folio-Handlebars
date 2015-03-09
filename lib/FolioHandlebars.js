var Handlebars = require('handlebars');
var fs = require('fs');

module.exports = FolioHandlebars;

/**
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
 *
 * @param viewName
 * @param model
 * @returns {String}
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
 *
 * @param name
 * @param path
 */
FolioHandlebars.prototype.registerPartial = function (name, path) {
    'use strict';

    var partialSource = fs.readFileSync(path, {
        encoding: this.templateEncoding
    });

    this.handlebars.registerPartial(name, partialSource);
};

/**
 *
 * @param path
 * @param options
 */
FolioHandlebars.prototype.registerTemplate = function (path, options) {
    'use strict';

    var templateSource = fs.readFileSync(path, {
        encoding: this.templateEncoding
    });

    if (templateSource) {
        this.templates[path] = this.handlebars.compile(templateSource, options);
    }
};

