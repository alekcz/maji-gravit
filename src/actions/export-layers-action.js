//GravitDesigner is the global variable that contains all Gravit Designer classes and functions to be used on your plugin
var GObject = GravitDesigner.framework.core.GObject;
var GAction = GravitDesigner.GAction;

//require works on plugins, just require any js file that you created using the
//relative path
var ExportDialog = require('./export-layers-action/exportdialog.js');

/**
 * Action for export page layers to png/svg
 * @class ExportLayersAction
 * @extends GAction
 * @constructor
 */
function ExportLayersAction() {
};
//GObject.inherit is used to inherit code from other js class
GObject.inherit(ExportLayersAction, GAction);

/**
 * @override
 */
ExportLayersAction.prototype.getId = function () {
    //id of the action, can be used to trigger actions without user interaction
    return 'export.layers';
};

/**
 * @override
 */
ExportLayersAction.prototype.getTitle = function () {
    return 'Export Layers';
};

/**
 * @override
 */
ExportLayersAction.prototype.getCategory = function () {
    //the menu category the action will be placed on
    return 'Export';
};

/**
 * @override
 */
ExportLayersAction.prototype.getGroup = function () {
    //the group inside a category. If two actions have same category but
    //different group, a separator will be placed between them
    return 'action';
};

/**
 * @override
 */
ExportLayersAction.prototype.getShortcut = function () {
    return null;
};

/**
 * @override
 */
ExportLayersAction.prototype.isEnabled = function () {
    return gDesigner.getActiveDocument() !== null;
};

/**
 * @override
 */
ExportLayersAction.prototype.execute = function () {
    //when the action is executed, open the export dialog we created
    new ExportDialog().open();
};

module.exports = ExportLayersAction;
