var CountSelectionAction = require('./actions/count-selection-action');

// This is the main entry point to your plugin called by the designer when he is ready
module.exports = {
    init: function (gravit) {
    	//we can push new actions to gravit.actions! This actions will be added to the taskbar
        gravit.actions.push(new CountSelectionAction());
    },
    start: function () {}
};
