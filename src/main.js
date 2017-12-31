var CountSelectionAction = require('./actions/count-selection-action');
var ExportLayersAction = require('./actions/export-layers-action');

// This is the main entry point to your plugin called by the designer when he is ready
module.exports = {
    init: function (gravit) {
    	//we can push new actions to gravit.actions! This actions will be added to the taskbar
        //gravit.actions.push(new CountSelectionAction());
        gravit.actions.push(new ExportLayersAction());
    },
    start: function () {
        //on start, we can add custom css files, like the css for the export dialog
        var link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('type', 'text/css');
        link.setAttribute('href', process.cwd() + '/src/actions/export-layers-action/exportdialog.css');
        document.getElementsByTagName('head')[0].appendChild(link);
    }
};
