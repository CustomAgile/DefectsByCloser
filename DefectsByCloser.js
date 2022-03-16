/*
 Copyright (c) 2002-2011  Rally Software Development Corp. All rights reserved.
 DefectsByCloser.js
 */
function DefectsByCloser(rallyDataSource) {
    var releaseDiv, tableDiv;
    var releaseDropdown;
    var table;
    var wait = null;

    // private method the builds the table of defects and associated info
    function showResults(results) {
        if (wait) {
            wait.hide();
            wait = null;
        }
        if (results.defects.length === 0) {
            tableDiv.innerHTML = "No Closed defects associated with the selected release were found";
            return;
        }

        var config =
        {   'columnKeys'   : ['FormattedID' , 'Name',  'ClosedDate',  'Revision Number',    'ClosedBy' ] ,
            'columnHeaders': ['Formatted ID', 'Name',  'Date Closed', 'Revision<br>Number', 'Closed By'] ,
            'columnWidths' : ['80px',         '360px', '150px',       '60px',               '120px'    ]
        };
        table = new rally.sdk.ui.Table(config);
        table.addRows(results.defects);

        var linkConfig = null;
        var defectLink = null;

        var cd = null; // for defect.ClosedDate formatting
        var i, j, defect;

        for (i = 0; i < results.defects.length; i++) {
            defect = results.defects[i];
            //create link to defect
            linkConfig = {item: {FormattedID: defect.FormattedID, "_ref" : defect._ref}};
            defectLink = new rally.sdk.ui.basic.Link(linkConfig);
            table.setCell(i, 0, defectLink.renderToHtml());

            //only parse revisions of defects that have been closed
            if (defect.ClosedDate !== null) {
                cd = '' + defect.ClosedDate;
                cd = cd.replace(/T/, " ").replace(/\.\d+Z$/, " UTC");
                table.setCell(i, 2, cd);
                for (j = 0; j < defect.RevisionHistory.Revisions.length; j++) {
                    var revision = defect.RevisionHistory.Revisions[j];
                    if (revision.Description.search("CLOSED DATE added") !== -1) {
                        table.setCell(i, 3, '' + revision.RevisionNumber);
                        table.setCell(i, 4, '' + revision.User._refObjectName);
                        break;  //only show the most recent result if defect was reopened/reclosed
                    }
                }
            }
        }

        table.display(tableDiv);
    }

    //private method to query for defects when release selection changes
    function runMainQuery(sender, eventArgs) {
        if (table) {
            table.destroy();
            table = null;
        }

        tableDiv.innerHTML = "";

        var release = releaseDropdown.getSelectedName();
        var queryCriteria = '((Release.Name = "' + release + '") AND (State = "Closed"))';
        var queryConfig =
        {
            key   : "defects",
            type  : "Defect",
            fetch : "ObjectID,FormattedID,Name,ClosedDate,RevisionHistory,Revisions,RevisionNumber,Description,User",
            order : "FormattedID",
            query : queryCriteria
        };

        wait = new rally.sdk.ui.basic.Wait({});
        wait.display('wait');

        rallyDataSource.findAll(queryConfig, showResults);
    }

    //private method to start building controls on page
    //page consists of a dropdown to select the release and the table to hold the query results
    function initPage() {
        releaseDiv = document.getElementById('release');
        tableDiv = document.getElementById('table');
        var rdConfig = {label    : "Select a release: ",
            showLabel: true,
            labelPosition: "before"
        };
        releaseDropdown = new rally.sdk.ui.ReleaseDropdown(rdConfig, rallyDataSource);
        releaseDropdown.display(releaseDiv, runMainQuery);
    }

    // only public method
    this.display = function() {
        rally.sdk.ui.AppHeader.setHelpTopic("232");
        rally.sdk.ui.AppHeader.showPageTools(true);

        initPage();
    };
}