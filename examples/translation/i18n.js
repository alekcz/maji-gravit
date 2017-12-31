var GLocaleLanguage = GravitDesigner.framework.core.GLocaleLanguage;
var GLocale = GravitDesigner.framework.core.GLocale;
var TranslationTestAction = require('./actions/translation-test-action.js');

var PORTUGUESE_LOCALE = GravitDesigner.framework.core.GLocale.getLocaleLanguage('Portuguese');

//register the values for translation. Always remember to register a value for GLocaleLanguage.English,
//as it is the default language and will be used if the locale selected doesnt exist
//If theres no English locale, the plugin loading will fail
GLocale.setValues(TranslationTestAction, GLocaleLanguage.English, ["title"], ["Translation Test"]);
GLocale.setValues(TranslationTestAction, PORTUGUESE_LOCALE, ["title"], ["Teste de Tradução"]);