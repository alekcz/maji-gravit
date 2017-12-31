//GravitDesigner is the global variable that contains all Gravit Designer classes and functions to be used on your plugin
var GObject = GravitDesigner.framework.core.GObject;
var GAction = GravitDesigner.GAction;

/**
 * Action for counting the number of selected elements
 * @class CountSelectionAction
 * @extends GAction
 * @constructor
 */
function CountSelectionAction() {
};
//GObject.inherit() is a function to implement interfaces in Gravit Designer.
//I.E., here we are implementing GAction interface to our new GCountSelectionAction.
GObject.inherit(CountSelectionAction, GAction);

/**
 * @override
 */
CountSelectionAction.prototype.getId = function () {
    return 'selection.count';
};

/**
 * @override
 */
CountSelectionAction.prototype.getTitle = function () {
    return 'Count Selection';
};

/**
 * @override
 */
CountSelectionAction.prototype.getCategory = function () {
    return 'starter-plugin';
};

/**
 * @override
 */
CountSelectionAction.prototype.getGroup = function () {
    return 'view';
};

/**
 * @override
 */
CountSelectionAction.prototype.getShortcut = function () {
    return null;
};

/**
 * @override
 */
CountSelectionAction.prototype.isEnabled = function () {
    return gDesigner.getActiveDocument() !== null;
};

/**
 * @override
 */
CountSelectionAction.prototype.execute = function () {
    //gDesigner is a global variable that controls pretty much everything inside Gravit Designer.
    //Here, we are using it to return the editor of our currently active document
    var editor = gDesigner.getActiveDocument().getEditor();
    var selection = editor.getSelection();

    if (selection && selection.length) {
        alert(selection.length + ' elements selected.');
    } else {
        alert('Nothing selected.');
    }
};

module.exports = CountSelectionAction;
