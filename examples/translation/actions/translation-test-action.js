var GObject = GravitDesigner.framework.core.GObject;
var GAction = GravitDesigner.GAction;
var GLocaleKey = GravitDesigner.framework.core.GLocaleKey;

/**
 * A sample that translates the action title
 * @class TranslationTestAction
 * @extends GAction
 * @constructor
 */
function TranslationTestAction() {
};
//GObject.inherit() is a function to implement interfaces in Gravit Designer.
//I.E., here we are implementing GAction interface to our new TranslationTestAction.
GObject.inherit(TranslationTestAction, GAction);

/**
 * @override
 */
TranslationTestAction.prototype.getId = function () {
    return 'translation.test';
};

/**
 * @override
 */
TranslationTestAction.prototype.getTitle = function () {
    //here, we use the value registered on i18n file to translate the title
    //make sure to use the same class and key
    return new GLocaleKey(TranslationTestAction, "title");
};

/**
 * @override
 */
TranslationTestAction.prototype.getCategory = function () {
    return 'starter-plugin';
};

/**
 * @override
 */
TranslationTestAction.prototype.getGroup = function () {
    return 'view';
};

/**
 * @override
 */
TranslationTestAction.prototype.getShortcut = function () {
    return null;
};

/**
 * @override
 */
TranslationTestAction.prototype.isEnabled = function () {
    return gDesigner.getActiveDocument() !== null;
};

/**
 * @override
 */
TranslationTestAction.prototype.execute = function () {
   //do nothing
};

module.exports = TranslationTestAction;
