module.exports = {
    init: function (gravit) {},
    start: function () {
    	$.get(process.cwd() + "/src/template.html", function(data) {
	    	$($('.file-section .toolbar-button')[0]).after(data);
	  	});
    }
};
