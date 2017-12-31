var GPage = GravitDesigner.framework.core.GPage;
var GElement = GravitDesigner.framework.core.GElement;
var GExporter = GravitDesigner.GExporter;

var SVG = 0;
var PNG = 1;

var ACTIVE_PAGE = 0;
var ALL_PAGES = 1;

class ExportDialog {
    constructor() {
        var formatDiv = $('<div/>')
            .append($('<div/>')
                .append($('<span/>')
                    .text('Format')))
            .append($('<select/>')
                .attr('data-property', 'format')
                .append($('<option/>')
                    .text('SVG')
                    .data('option', SVG))
                .append($('<option/>')
                    .text('PNG')
                    .data('option', PNG)));
        
        var pagesDiv = $('<div/>')
            .append($('<div/>')
                .append($('<span/>')
                    .text('Pages')))
            .append($('<select/>')
                .attr('data-property', 'pages')
                .append($('<option/>')
                    .text('Current page')
                    .data('option', ACTIVE_PAGE))
                .append($('<option/>')
                    .text('All pages')
                    .data('option', ALL_PAGES)));
        
        this._dialog = $('<div></div>')
            .append(formatDiv)
            .append(pagesDiv);

        //gDialog is a jquery plugin that allows creating of ready-to-use dialogs
        this._dialog.gDialog({
            //custom class for the dialog, useful to custom css
            className: 'g-export-layers-dialog',
            //the buttons available on the dialog
            buttons: [
                $('<button>Cancel</button>').on('click', () => this.close()),
                $('<button>Export</button>').on('click', () => {
                    this._exportLayers();
                    this.close();
                })
            ]
        });
    }
    
    _exportLayers() {
        //use simple jquery to get values of selectors
        var format = this._dialog.find('[data-property="format"]').find('option:selected').data('option');
        var page = this._dialog.find('[data-property="pages"]').find('option:selected').data('option');
        
        var pages = [];
        
        //scene is the object that contains all pages, elements, etc of a document
        //we can retrieve the current document using global variable gDesigner like below
        var scene = gDesigner.getActiveDocument().getScene();
        
        if (page === ACTIVE_PAGE) {
            //if only exporting active page, we can just get the active page of the document scene
            pages.push(scene.getActivePage());
        } else {
            //if exporting all pages, we can iterate through the scene children and 
            //add the ones that are instance of GPage
            for (var child = scene.getLastChild(); child !== null; child = child.getPrevious()) {
                if (child instanceof GPage) {
                    pages.push(child);
                }
            }
        }
        
        //here we define the format that the layers will be exported
        var settings = {'format': format === SVG ? 'svg' : 'png'};
        
        //let's use GExporter class to generate the exportable layers and pages of our selection
        //pages contains all pages that must be exported
        //settings contains the format that the layers should be exported
        //true will set the exporter to export all children of the element being exported
        var exportables = GExporter.generateExportables(pages, settings, true);
        
        //finally, export the pages. Also provides the storage used to save the exported files (necessary for cross-platform exporting)
        GExporter.export(exportables, gDesigner.getActiveDocument().getStorage() || gDesigner.getDefaultStorage(), gDesigner.getActiveDocument().getTitle());
    }

    open() {
        //open the current dialog. True allows the user to close the dialog by clicking somewhere else on the screen
        this._dialog.gDialog('open', true);
    }

    close() {
        //closes the dialog
        this._dialog.gDialog('close');
    }
};

module.exports = ExportDialog;

