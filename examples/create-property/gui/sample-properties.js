var _core = GravitDesigner.framework.core;
var GRectangle = _core.GRectangle;
var GStylable = _core.GStylable;
var GRGBColor = _core.GRGBColor;
var GElement = _core.GElement;
var GObject = _core.GObject;
var GProperties = GravitDesigner.GProperties;

/**
 * A sample properties panel
 * @class GProperties
 * @extends GEventTarget
 * @constructor
 */
function GSampleProperties() {
};
GObject.inherit(GSampleProperties, GProperties);

/**
 * @type {JQuery}
 * @private
 */
GSampleProperties.prototype._panel = null;

/**
 * @type {JQuery}
 * @private
 */
GSampleProperties.prototype._toolbar = null;

/**
 * Called to initialize the properties panel
 * @param {JQuery} panel the panel to init on
 * @param {JQuery} toolbar the optional toolbar to init on
 */
GSampleProperties.prototype.init = function (panel, toolbar) {
    this._toolbar = toolbar.addClass('sample-properties-toolbar');
    this._panel = panel.addClass('sample-properties-panel');

    //add a title to the toolbar
    $('<label></label>')
        .text('Sample properties panel')
        .appendTo(this._toolbar);

    //use the gPropertyRow plugin to easily create a elements row
    $('<div></div>')
      .gPropertyRow({
          columns: [
              {
                  width: '50%',
                  content: $('<button/>')
                    .addClass('add-rectangle')
                    .html('Add rectangle')
                    .on('click', function() {
                        this._addRectangle();
                    }.bind(this))
              },
              {
                  width: '50%',
                  content: $('<button/>')
                    .addClass('select-all')
                    .html('Select all')
                    .on('click', function() {
                        this._selectAll();
                    }.bind(this))
              }
          ]
      })
      .appendTo(this._panel);

    $('<div></div>')
      .gPropertyRow({
          columns: [
              {
                  width: '50%',//size of the content
                  content: $('<button/>')
                    .addClass('clear-selection')
                    .html('Clear selection')
                    .on('click', function() {
                        this._clearSelection();
                    }.bind(this))
              },
              {
                  width: '50%',
                  content: $('<button/>')
                    .addClass('delete-all')
                    .html('Delete Selection')
                    .on('click', function() {
                        this._deleteSelection();
                    }.bind(this))
              }
          ]
      })
      .appendTo(this._panel);
};

/**
 * First check done whether the properties are available or not
 * @param {Boolean} transformMode whether transform mode is set or not
 * @return {Boolean} true if properties are available false if not
 */
GSampleProperties.prototype.isAvailable = function (transformMode) {
    //only use the property panel if there is one active document
    return !!gDesigner.getActiveDocument();
};

/**
 * Called to update
 * @param {GDocument} document the document to work on, this may be null
 * when the document got released
 * @param {Array<GElement>} elements array of elements, may be null or empty
 * @return {Boolean} true if this properties panel is available, false if not
 */
GSampleProperties.prototype.update = function (document, elements) {
    var selection = gDesigner.getActiveDocument().getEditor().getSelection();
    var hasSelection = selection && selection.length > 0;

    //example to disable buttons depending on the selection
    this._panel.find('.clear-selection').prop('disabled', !hasSelection);
    this._panel.find('.delete-all').prop('disabled', !hasSelection);

    return true;
};

/**
 * Create a new rectangle, paint it and add it to the current page
 */
GSampleProperties.prototype._addRectangle = function() {
    //instantiate a new rectangle using the GRectangle class of the framework
    //it will be added in the position x: 0, y:0, with width: 50, height: 50
    var rectangle = new GRectangle(0, 0, 50, 50);

    //elements by default are created without fill, so lets add one FillPaintLayer from GStylable
    rectangle.getPaintLayers().appendChild(new GStylable.FillPaintLayer(new GRGBColor([235,235,235]), 1.0));

    //finally, lets add the new element to the active page
    gDesigner.getActiveDocument().getEditor().getScene().getActivePage().appendChild(rectangle);
};

/**
 * Select all elements on the page
 */
GSampleProperties.prototype._selectAll = function() {
    var newSelection = [];

    //iterate through the elements
    gDesigner.getActiveDocument().getEditor().getScene().getActivePage().acceptChildren(function (node) {
        //the FullLocked flag means that the element cannot be selected
        if (!node.hasFlag(GElement.Flag.FullLocked)) {
            //add the element to new selection
            newSelection.push(node);
        }
    }, false, true);

    //update the selection
    gDesigner.getActiveDocument().getEditor().updateSelection(false, newSelection);
};

/**
 * Clear selection
 */
GSampleProperties.prototype._clearSelection = function() {
    //to clear the selection, we can update it using a empty array
    gDesigner.getActiveDocument().getEditor().updateSelection(false, []);
};

/**
 * Delete selection
 */
GSampleProperties.prototype._deleteSelection = function() {
    //delete selection
    gDesigner.getActiveDocument().getEditor().deleteSelection();
};

/** @override */
GSampleProperties.prototype.toString = function () {
    return "[Object GSampleProperties]";
};

module.exports = GSampleProperties;
