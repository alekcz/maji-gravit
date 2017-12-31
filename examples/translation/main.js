//require the i18n file when starting the plugin to make it available
require('./i18n.js');

var TranslationTestAction = require('./actions/translation-test-action');

module.exports = {
    init: function (gravit) {
        //here, we try to get the constant for a locale. If it doesnt exist yet, a new one will be creted
        //I.E. if we use English instead of Portugues, it will return the English locale that already exists
        var locale = GravitDesigner.framework.core.GLocale.getLocaleLanguage('Portuguese');

        //add a new GSwitchLanguageAction with the new locale and the label it should have
        //this will automatically create a new language entry on Help/Translation menu
        gravit.actions.push(new GravitDesigner.actions.GSwitchLanguageAction(locale, "Português"));

        gravit.actions.push(new TranslationTestAction());
    },
    start: function () {}
};
