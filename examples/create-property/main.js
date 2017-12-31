var GSampleProperties = require('./gui/sample-properties');

// This is the main entry point to your plugin called by the designer when he is ready
module.exports = {
    init: function (gravit) {
    	//we can push new properties to gravit.properties
        gravit.properties.push(new GSampleProperties());
    },
    start: function () {}
};
