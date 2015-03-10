var expect = require('chai').expect;
var assert = require('chai').assert;
var sinon = require('sinon');
var mockery = require('mockery');

describe('FolioHandlebars', function () {

    describe('On new', function () {

        beforeEach(function () {

            mockery.enable({
                warnOnReplace: false,
                useCleanCache: true
            });

            this.mockHandlebarsInstance = {};

            this.mockHandlebars = {
                create: sinon.stub()
            };

            this.mockHandlebars.create.returns(this.mockHandlebarsInstance);

            this.mockFs = {};

            mockery.registerAllowable('./lib/FolioHandlebars', true);
            mockery.registerAllowable('../../index.js', true);
            mockery.registerMock('handlebars', this.mockHandlebars);
            mockery.registerMock('fs', this.mockFs);

            var FolioHandlebars = require('../../index.js');
            this.folioHandlebars = new FolioHandlebars();

        });

        afterEach(function () {

            mockery.deregisterAll();
            mockery.disable();

        });

        it('Should not be undefined', function () {

            expect(this.folioHandlebars).to.not.be.undefined;

        });

        it('Should have a handlebars instance', function () {

            expect(this.folioHandlebars.handlebars).to.not.be.undefined;

        });

        it('Should have an empty template map', function () {

            expect(this.folioHandlebars.templates).to.deep.equal({});

        });

        it('Should have the default template encoding of utf8', function () {

            expect(this.folioHandlebars.templateEncoding).to.equal('utf8');

        });

        describe('registerTemplate(viewName, path, options)', function () {

            beforeEach(function () {

                this.viewName = 'MyView';
                this.templatePath = 'TemplatePath';
                this.templateSource = 'TemplateSource';
                this.templateOptions = {template: 'options'};
                this.readOptions = { encoding: this.folioHandlebars.templateEncoding };

                this.mockFs.readFileSync = sinon.stub();
                this.mockFs.readFileSync.withArgs(this.templatePath, this.readOptions).returns(this.templateSource);

                this.compiledTemplate = sinon.stub();
                this.mockHandlebarsInstance.compile = sinon.stub();
                this.mockHandlebarsInstance.compile.withArgs(this.templateSource, this.templateOptions).returns(this.compiledTemplate);

                this.folioHandlebars.registerTemplate(this.viewName, this.templatePath, this.templateOptions);

            });

            it('Should load the template from disk', function () {

                expect(this.mockFs.readFileSync.calledWith(this.templatePath, this.readOptions)).to.be.true;

            });

            it('Should compile the template using the handlebars instance', function () {

                expect(this.mockHandlebarsInstance.compile.calledWith(this.templateSource, this.templateOptions)).to.be.true;

            });

            it('Should cache the compiled template function in the templates map using the view name', function () {

                expect(this.folioHandlebars.templates).to.deep.equal({'MyView': this.compiledTemplate});

            });

        });

        describe('registerPartial(name, path)', function () {

            beforeEach(function () {

                this.partialName = 'MyPartial';
                this.partialPath = 'PartialPath';
                this.partialSource = 'PartialSource';

                this.readOptions = { encoding: this.folioHandlebars.templateEncoding };

                this.mockFs.readFileSync = sinon.stub();
                this.mockFs.readFileSync.withArgs(this.partialPath, this.readOptions).returns(this.partialSource);

                this.mockHandlebarsInstance.registerPartial = sinon.stub();

                this.folioHandlebars.registerPartial(this.partialName, this.partialPath);

            });

            it('Should load the partial from disk', function () {

                expect(this.mockFs.readFileSync.calledWith(this.partialPath, this.readOptions)).to.be.true;

            });

            it('Should register the partial with the handlebars instance', function () {

                expect(this.folioHandlebars.handlebars.registerPartial.calledWith(this.partialName, this.partialSource)).to.be.true;

            });

        });

        describe('render(viewName, model)', function () {

            beforeEach(function () {

                this.model = {property: 'value'};
                this.templateFunction = sinon.stub();
                this.templateFunction.withArgs(this.model).returns('Rendered View');
                this.folioHandlebars.templates['myView'] = this.templateFunction;

            });

            it('Should use the view\'s name to look up and call the template function with the given model, returning the rendered view', function () {

                expect(this.folioHandlebars.render('myView', this.model)).to.equal('Rendered View');

            });

        });

    });

});

