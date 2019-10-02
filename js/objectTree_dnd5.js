"use strict";
//Load Default Tree Object
$(document).ready(function() {
    addRootNode();

    //Display Selected Node Data
    displayNodeData();

    //Initalize Tables used in OR Manager
    //Table to Recieve Object Proerties from SPY
    $('#ObjectPropTable').DataTable({
        "bPaginate": false,
        "bLengthChange": false,
        "bFilter": false,
        "bInfo": false,
        "bAutoWidth": false,
        "language": {
            "emptyTable": "No Object Properties to Display"
        }
    });
    //Table to display object Properties used for identification
    var orUsdPrTb = $('#ObjectUsedPropDtlsTable').DataTable({
        "bPaginate": false,
        "bLengthChange": false,
        "bFilter": false,
        "bInfo": false,
        "autoWidth": true,
        "language": {
            "emptyTable": "No Idenfication Properties selected"
        },
        columns: [{
                width: '20%'
            },
            {
                width: '65%'
            },
            {
                width: '15%'
            }
        ]
    });
    //Table to display object Properties un used for identification
    var orUnUsdPrTb = $('#ObjectUnusedPropDtlsTable').DataTable({
        "bPaginate": false,
        "bLengthChange": false,
        "bFilter": false,
        "bInfo": false,
        "autoWidth": true,
        "language": {
            "emptyTable": "Select Object Node or Add Properties"
        },
        columns: [{
                width: '20%'
            },
            {
                width: '65%'
            },
            {
                width: '15%'
            }
        ]
    });


    var tblr,
        tbrow,
        tbrowData;
    //Move Selected Objected Properties from unUsed to used proerties Table
    $("#ObjectUnusedPropDtlsTable").on('change', "input[type='checkbox']", function() {
        if ($(this).is(':checked')) {
            $(this).attr('checked', 'checked');
            tblr = $(this).closest('tr');
            tbrow = orUnUsdPrTb.row(tblr);
            tbrowData = [];
            tblr.find('td').each(function(i, td) {
                tbrowData.push($(td).html());
            });
            tbrow.remove().draw();
            orUsdPrTb.row.add(tbrowData).draw();
        }
    });
    //Move Selected Objected Properties from Used to UnUsed proerties Table
    $('#ObjectUsedPropDtlsTable').on('click', 'input[type=checkbox]', function() {
        if ($(this).not(':checked')) {
            $(this).removeAttr('checked', 'checked');
            tblr = $(this).closest('tr');
            tbrow = orUsdPrTb.row(tblr);
            tbrowData = [];
            tblr.find('td').each(function(i, td) {
                tbrowData.push($(td).html());
            });
            tbrow.remove().draw();
            orUnUsdPrTb.row.add(tbrowData).draw();
        }
    });

    //Event handlers For Tree Filter
    $("#search").keyup(function(e) {
        var n,

            //  tree = $("#objTree").fancytree("getTree"),
            tree = $.ui.fancytree.getTree();
        var args = "autoApply autoExpand fuzzy hideExpanders highlight leavesOnly nodata".split(" "),
            opts = {},
            filterFunc = $("#branchMode").is(":checked") ? tree.filterBranches : tree.filterNodes,
            match = $(this).val();

        $.each(args, function(i, o) {
            opts[o] = $("#" + o).is(":checked");
        });
        opts.mode = $("#hideMode").is(":checked") ? "hide" : "dimm";

        if (e && e.which === $.ui.keyCode.ESCAPE || $.trim(match) === "") {
            $("button#btnResetSearch").click();
            return;
        }
        if ($("#regex").is(":checked")) {
            // Pass function to perform match
            n = filterFunc.call(tree, function(node) {
                return new RegExp(match, "i").test(node.title);
            }, opts);
        } else {
            // Pass a string to perform case insensitive matching
            n = filterFunc.call(tree, match, opts);
        }
        $("button#btnResetSearch").attr("disabled", false);
        $("span#matches").text("(" + n + " matches)");
    }).focus();

    $("button#btnResetSearch").click(function(e) {
        var fTree = $.ui.fancytree.getTree();
        $("input[id=search]").val("");
        $("span#matches").text("");
        fTree.clearFilter();
    }).attr("disabled", true);


    /*$('#openselect').addEventListener("change", doOpen, false);*/

    //document.getElementById("openselect").addEventListener("change", doOpen, false);

});

//serach rendernode

/*function addObjPropToTreeNode () {
		$("#objTree").fancytree({
			renderNode: function(event, data) {
				var node = data.node;
					var $span = $(node.span);
                    $span.attr('obj-prop', '222');
     //               alert( $span.attr('obj-prop'));

			}
		});
}*/

/*init: function (event, data) {
//data.node.render();
//show_edit_node_fnc(data.node.key);
//currentNodeToEdit = data.node;
id = data.node.data.id;
filesof = data.node.data.filesof;
//list_files( filesof , id ) ; // Call to another JS function
renderNode:addObjPropToTreeNode ()
},*/



function changeText(stext) {
    $("#objTreeDetails").text(stext);
}



//Display Selected Node's Data
function displayNodeData() {

    $("#objTree").fancytree({
        activate: function(event, data) {

            //Empty Form Data
            $('#objPropFormID').empty();
            // A node was activated: display its title:
            //var node = data.node;
            //Call function to update Object Properties
            //changeText(data.node.title);
            $("#objTreeDetails").text(data.node.title);

            //Initialise both uased and unused properties tables
            var ObjUsedPrpDtlTbl = $('#ObjectUsedPropDtlsTable').DataTable();
            var ObjectUnusedPropDtlsTable = $('#ObjectUnusedPropDtlsTable').DataTable();
            ObjUsedPrpDtlTbl.clear();
            ObjUsedPrpDtlTbl.draw();
            ObjectUnusedPropDtlsTable.clear();
            ObjectUnusedPropDtlsTable.draw();
            //console.log(data.node.data.objProp);
            if (typeof(data.node.data.objProp) !== "undefined") {
                var sFormObjs = (data.node.data.objProp).split(':R:');

                for (var m = 0; m < sFormObjs.length; m++) {
                    //  var newElem = $('<input />', {id:'name' + newNum, name:'name' + newNum}).appendTo(somewhere);
                    var sFormPropName = sFormObjs[m].split(':C:')[0];
                    var sFormPropVal = sFormObjs[m].split(':C:')[1];
                    var sIDUsed;
                    var chkBxElem
                    //alert(sFormObjs[m].split(':C:').length)
                    var inputElm = '';
                    inputElm += '<input type="' + 'text' + '" value="' + sFormPropVal + '" />';

                    if (sFormObjs[m].split(':C:').length == 3) {
                        sIDUsed = sFormObjs[m].split(':C:')[2];
                        if (sIDUsed == 'true') {
                            chkBxElem = '<input type="checkbox" checked/>'
                            ObjUsedPrpDtlTbl.row.add([sFormPropName, inputElm, chkBxElem]).draw();
                        } else {
                            chkBxElem = '<input type="checkbox" />'
                            ObjectUnusedPropDtlsTable.row.add([sFormPropName, inputElm, chkBxElem]).draw();
                        }
                    } else {
                        chkBxElem = '<input type="checkbox"/>'
                        ObjectUnusedPropDtlsTable.row.add([sFormPropName, inputElm, chkBxElem]).draw();
                    }



                }
                //Clear Table
                var ObjTbl = $('#ObjectPropTable').DataTable();
                ObjTbl.clear();
                ObjTbl.draw();
            }
            //alert ($node.attr('obj-prop'));
            //addObjPropToTreeNode ();
        }
        /*    ,
            beforeSelect: function(event, data){
              // A node is about to be selected: prevent this for folders:
              if( data.node.isFolder() ){
                return false;
              }
            }*/
    });
}




//This Function get the Current value of Object and save it back to object
function saveObjChangesUI() {
    var opUsedTable = $("#ObjectUsedPropDtlsTable").DataTable();
    var opunUsedTable = $("#ObjectUnusedPropDtlsTable").DataTable();
    var opUsedTbldata = opUsedTable
        .rows()
        .data();
    var opUnUsedTbldata = opunUsedTable
        .rows()
        .data();

    var newDtStr
    var oName
    var oVal
    var oUsed
    newDtStr = ""
    //Extract Properties from Used Table
    for (var i = 0; i < opUsedTbldata.length; i++) {
        oName = opUsedTbldata.cell(i, 0).data();
        oVal = opUsedTbldata.cell(i, 1).nodes().to$().find('input').val()
        oUsed = opUsedTbldata.cell(i, 2).nodes().to$().find('input:checkbox').is(':checked')
        if (opUsedTbldata.cell(i, 2).nodes().to$().find('input:checkbox').is(':checked')) {
            oUsed = true;
        } else {
            oUsed = false;
        }

        if (newDtStr == "") {
            newDtStr = oName + ":C:" + oVal + ":C:" + oUsed
        } else {
            newDtStr = newDtStr + ":R:" + oName + ":C:" + oVal + ":C:" + oUsed
        }
    }

    //Extract Properties from Unsed  Table
    for (var i = 0; i < opUnUsedTbldata.length; i++) {
        oName = opUnUsedTbldata.cell(i, 0).data();
        oVal = opUnUsedTbldata.cell(i, 1).nodes().to$().find('input').val()
        oUsed = opUnUsedTbldata.cell(i, 2).nodes().to$().find('input:checkbox').is(':checked')
        if (opUnUsedTbldata.cell(i, 2).nodes().to$().find('input:checkbox').is(':checked')) {
            oUsed = true;
        } else {
            oUsed = false;
        }

        if (newDtStr == "") {
            newDtStr = oName + ":C:" + oVal + ":C:" + oUsed
        } else {
            newDtStr = newDtStr + ":R:" + oName + ":C:" + oVal + ":C:" + oUsed
        }
    }

    var old = $("#objTree").fancytree('getActiveNode').data.objProp;
    $("#objTree").fancytree('getActiveNode').data.objProp = newDtStr
    //console.log(old)
    // console.log(newDtStr);

}


//Add Application Name as Root Node
function addRootNode() {


    var tree = $("#objTree");
    var source = [
        // {title: "AppName", folder: true, expanded: false, children: [{title: "Button",folder: true, expanded: false, children: [{title: "ABC",}]}]}
        {
            title: "AppName",
            folder: true,
            expanded: false
        }
    ];

    var options = {
        checkbox: true,
        //extensions: ["edit","dnd"],
        extensions: ["edit", "dnd", "filter"],
        source: source,
        icon: "../images/page.png",
        edit: {
            // Available options with their default:
            adjustWidthOfs: 4, // null: don't adjust input size to content
            inputCss: {
                minWidth: "3em"
            },
            triggerStart: ["f2", "dblclick", "shift+click", "mac+enter"],
            beforeEdit: $.noop, // Return false to prevent edit mode
            edit: $.noop, // Editor was opened (available as data.input)
            beforeClose: $.noop, // Return false to prevent cancel/save (data.input is available)
            save: $.noop, // Save data.input.val() or return false to keep editor open
            close: $.noop, // Editor was removed
        },
         dnd: {
            preventVoidMoves: true,
            preventRecursiveMoves: true,
            draggable: { // modify default jQuery draggable options
                zIndex: 1000,
                scroll: false,
               // containment: "body",
                revert: "invalid",
                appendTo:"body",
               //appendTo: document.getElementById('<identifier for Iframe>').contentWindow
             //  appendTo:$("#Testframe").contents()
              },
            autoExpandMS: 400,
            dragStart: function(node, data) {
                console.log('Drag start >>', node, data, this);
                return true;
            },
            dragEnter: function(node, data) {
                console.log('Drag enter >>', node, data, this);
                // return ["before", "after"];
                return true;
            },
            dragDrop: function(node, data) {
                console.log('Drag drop >>', node, data, this);
                data.otherNode.moveTo(node, data.hitMode);
            } 
        }
        ,
        filter: {
            autoApply: true, // Re-apply last filter if lazy data is loaded
            autoExpand: false, // Expand all branches that contain matches while filtered
            counter: true, // Show a badge with number of matching child nodes near parent icons
            fuzzy: false, // Match single characters in order, e.g. 'fb' will match 'FooBar'
            hideExpandedCounter: true, // Hide counter badge if parent is expanded
            hideExpanders: false, // Hide expanders if all child nodes are hidden by filter
            highlight: true, // Highlight matches by wrapping inside <mark> tags
            leavesOnly: false, // Match end nodes only
            nodata: true, // Display a 'no data' status node if result is empty
            mode: "dimm" // Grayout unmatched nodes (pass "hide" to remove unmatched node instead)
        },
        /*
                     contextMenu: {
        				menu: {
        					"cut": { "name": "Cut", "icon": "cut" },
        					"copy": { "name": "Copy", "icon": "copy" },
        					"paste": { "name": "Paste", "icon": "paste" },
        					"delete": { "name": "Delete", "icon": "delete", "disabled": true },
        				},
        			},*/
    };

    tree.fancytree(options);
}




function deleteSelected() {
    var stree = $("#objTree").fancytree("getTree"),
        selNodes = stree.getSelectedNodes();

    selNodes.forEach(function(node) {
        while (node.hasChildren()) {
            node.getFirstChild().moveTo(node.parent, "child");
        }
        node.parent
        node.remove();
    });
}

function SaveTreeAsJSON() {
    var stree = $("#objTree").fancytree("getTree");
    var json = stree.toDict(true, function(dict) {

    });
    // Store in a globael variable
    return (JSON.stringify(json));
    //alert("CLIPBOARD = " + JSON.stringify(json));

    var doc = $.parseXML("<xml/>")
    var xml = doc.getElementsByTagName("xml")[0]
    var key, elem

    for (key in json) {
        if (json.hasOwnProperty(key)) {
            elem = doc.createElement(key)
            $(elem).text(json[key]);
            xml.appendChild(elem);
        }
    }
    //alert(xmlToString(xml));
}


function xmlToString(xmlData) {

    var xmlString;
    //IE
    if (window.ActiveXObject) {
        xmlString = xmlData.xml;
    }
    // code for Mozilla, Firefox, Opera, etc.
    else {
        xmlString = (new XMLSerializer()).serializeToString(xmlData);
    }
    return xmlString;
}

/*$('#openselect').addEventListener("change", doOpen, false);*/


/*function LoadFromJSON()
{
   $('#openselect').trigger('click');

}


function doOpen(evt) {
    var files = evt.target.files;
    var reader = new FileReader();
    reader.onload = function () {
 return reader.result;
        var readback = JSON.parse (reader.result);
        //alert (readback);
    };
    reader.readAsText(files[0]);

}*/

$('#openselect').on("change", function(e) {
    var file = e.target.files[0];
    // Only render plain text files
    if (!file.type === "text/plain")
        return;
    var reader = new FileReader();
    reader.onload = function(event) {
        alert(event.target.result);
    };
    reader.readAsText(file);
});

//This function bind/add event listner for change to
//hidden file input, on trigger of click on menu inturn performs
//click on hidden input and returns text from selcted file and calls
// function to generate tree from JSON
function LoadFromJSON() {

    //First bind before click is triggered
    $('#openselect').on("change", function(e) {
        var file = e.target.files[0];
        // Only render plain text files
        if (!file.type === "text/plain")
            return;
        var reader = new FileReader();
        reader.onload = function(event) {
            //alert(event.target.result);
            /*popultTreefrmJSON(event.target.result);*/
            popultTreefrmJSON(event.target.result);
        };
        reader.readAsText(file);
        //Unbind the click so that it won;t occur multiple times
        $('#openselect').unbind().trigger('click');
    });

    //Perform Click action
    $('#openselect').trigger('click');
}



//Generate Tree from JSON Data,, This and above addRootNode needs to be combined as any
//Change needs to be replecated in both
function popultTreefrmJSON(sJSONTxt) {
    var popTree = $("#objTree").fancytree("getTree");
    // $("#objTree").fancytree("destroy");


    popTree.reload([
        // JSON.parse(sJSONTxt)
        //Note Commenetd above will
        JSON.parse(sJSONTxt).children[0]
    ]).done(function() {
        // alert("reloaded");
    });
}



//Show Hide Tree Connectors
function toggleTreeConnector() {
    $(".fancytree-container").toggleClass("fancytree-connectors");
}

//Add New nodes from tree from UI
function addNewObjToTreefromUI() {

    //First Get Active  Node
    //var activeNode = $("#objTree").fancytree("getTree").getSelectedNodes();
    var activeNode = $("#objTree").fancytree("getActiveNode");
    if (activeNode) {
        alert("Currently active: " + activeNode.title);
        newObjectDialog()


        activeNode.addNode({
            title: "New Object",
            tooltip: "added",
            folder: true
        }, 'child')
    } else {
        alert("Please select a tree node  to add new child");
    }
}

function newObjectDialog() {

    $("#dialog-form").dialog({
        autoOpen: false,
        height: 300,
        width: 350,
        modal: true,
        buttons: {
            "Create an account": function() {
                alert('create');
            },
            Cancel: function() {
                alert('close dialog');
                $(this).dialog("close");
            }
        }
    });

    $("#dialog-form").dialog("open");


}



/*
//Main Function to add new nodes to tree this function is mainly used
//when nodes are added from spy
function addObjectToTree() {
    var sObjectName
    var sPageName
    //Get Table Data
    var sObjProp
    var sObjType
    var opTable = $("#ObjectPropTable").DataTable();
    var opTbldata = opTable

        .rows()
        .data();

    for (var i = 0; i < opTbldata.length; i++) {
        if (i == 0) {
            sObjProp = opTbldata.cell(i, 0).data() + ':C:' + opTbldata.cell(i, 1).data();
            //Get Type of Object
            if (opTbldata.cell(i, 0).data() == 'type') {
                sObjType = opTbldata.cell(i, 1).data();
            } else if (opTbldata.cell(i, 0).data() == 'objectName') {
                sObjectName = opTbldata.cell(i, 1).data();
            } else if (opTbldata.cell(i, 0).data() == 'title') {
                sPageName = opTbldata.cell(i, 1).data();
            }
        } else {
            sObjProp = sObjProp + ":R:" + opTbldata.cell(i, 0).data() + ':C:' + opTbldata.cell(i, 1).data();
            //Get Type of Object
            if (opTbldata.cell(i, 0).data() == 'type') {
                sObjType = opTbldata.cell(i, 1).data();
            } else if (opTbldata.cell(i, 0).data() == 'objectName') {
                sObjectName = opTbldata.cell(i, 1).data();
            } else if (opTbldata.cell(i, 0).data() == 'title') {
                sPageName = opTbldata.cell(i, 1).data();
            }
        }
    }

    //var  sPageName=$("#ObjectPropTable").find('caption').text();
    var rootNode = $("#objTree").fancytree("getRootNode");
    //Check if Root is Present If not Create It
    if (rootNode.getFirstChild() == null) {
        addRootNode();
    }
    var pageRoot = findNode(sPageName, rootNode);
    //First Check if Page Node is Present if not create Page Node
    if (pageRoot === false) {
        pageRoot = rootNode.getFirstChild().addChildren({
            title: sPageName,
            tooltip: sPageName,
            folder: true,
            icon: "../images/customDoc1.gif",
            nodeTyp: 'Page',
        });
        // childNode.addChildren({
        //    title: "Document using a custom icon",
        //    icon: "customdoc1.gif"
        //});
    }
    //Create Object Type Node if not present under Page Node
    // if (pageRoot===false){
    var objTypRoot = findNode(sObjType, pageRoot);
    // }


    if (objTypRoot === false) {

        //objTypRoot = pageRoot.getFirstChild().addChildren({
        objTypRoot = pageRoot.addChildren({
            title: sObjType,
            tooltip: sObjType,
            folder: true,
            icon: "../images/customDoc1.gif",
            nodeTyp: 'ObjectType',
        });
    }

    //From ObjProp Get Object Type
    // if findNode(objTypRoot,objTypRoot)
    //Add Object to Type Under the Page
    //var pageRoot= findNode(sPageName,objTypRoot);
    objTypRoot.addChildren({
        title: sObjectName,
        tooltip: sObjectName,
        folder: true,
        icon: "../images/customDoc1.gif",
        objProp: sObjProp,
        nodeTyp: 'Object',
    });
    // $("#objTree").fancytree("getTree").render(true,true);
    //Expand All nodes
    $("#objTree").fancytree("getTree").visit(function(node) {
        node.setExpanded();
        // node.setActive();
    });

}
*/

//Return Page Root else False
function findNode(sNodeTitle, root) {
    if (root.findAll(sNodeTitle).length === 0) {
        return false;
    } else {
        return root.findAll(sNodeTitle)[0];
    }
}
