$(function() {
    "use strict";
    // for better performance - to avoid searching in DOM
    var content = $('#content');
    var messgsptr = '::';

    // if user is running mozilla then use it's built-in WebSocket
    window.WebSocket = window.WebSocket || window.MozWebSocket;
    // if browser doesn't support WebSocket, just show
    // some notification and exit
    if (!window.WebSocket) {
        content.html($('<p>', {
            text: 'Sorry, but your browser doesn\'t support WebSocket.'
        }));

        return;
    }
    // open connection
    var connection = new WebSocket('ws://localhost:8080', 'echo-protocol');
    connection.onopen = function() {};
    connection.onerror = function(error) {
        // just in there were some problems with connection...
        content.html($('<p>', {
            text: 'Sorry, but there\'s some problem with your ' +
                'connection or the server is down.'
        }));
    };
    // most important part - incoming messages
    connection.onmessage = function(message) {

        try {
            var json = JSON.parse(JSON.stringify(message.data));
        } catch (e) {
            console.log('Invalid JSON: ', message.data);
            return;
        }

        var cleanedMsg=JSON.parse(json).data.text
        if (cleanedMsg.search('&quot')>0){
            cleanedMsg=JSON.parse(cleanedMsg.replace(/&quot;/g,'"')) 
        }
          
        var msgid=cleanedMsg.id;
        var msgText=cleanedMsg.text;
        //Attempt to Add message only if Message type is matched else ignore
        if (msgid=='objInfo') {
         var sRsp=addObjectToTree(msgText);
         connection.send(sRsp);
        }

      
    };

    // Add message to the chat window
    /*
    function addMessage(message) {
        //content.prepend( '</span> :' + message );
         //var RecorderMssg=message;
         //Remove Extra Chracters from from front
         //RecorderMssg=RecorderMssg.substring(24,RecorderMssg.length);
         //Remove Extra Chracters from back
         //RecorderMssg=RecorderMssg.substring(0,RecorderMssg.length-7);
          //var RecorderMssgArr=RecorderMssg.split('TAB');
        //$('#ObjectPropTable').find("tr:gt(0)").remove();
        var ObjTbl = $('#ObjectPropTable').DataTable();
         ObjTbl.clear();
         ObjTbl.draw();
    	 var ValObj=JSON.parse(message.replace(/&quot;/g,'"'))[0]
    	 var keys = Object.keys(ValObj);
    	var tblPropNm
    	var tblpropVal
    		for (var j=0; j < keys.length; j++) {
    			 tblPropNm=keys[j]
    			 tblpropVal=ValObj[keys[j]]
    				if (typeof(tblpropVal) == 'undefined') {
    					tblpropVal=''
    				}
    			ObjTbl.row.add( [tblPropNm,tblpropVal],[3,4] ).draw()
    			 if((tblPropNm=='title')){
                    	$("#ObjectPropTable").find('caption').text('Page::'+tblpropVal);
                    }
    		}
    	 };
    */

    //Main Function to add new nodes to tree this function is mainly used
    //when message is recieved from SPY
    function addObjectToTree(JSONMessage) {
        var ReturnVal= 'UIResp::Object Added to Repository'
        var sObjectName
        var sPageName
        var skipArr = true
        var sObjProp
        var sObjType
        var sAddToTest = false
        var idPropsToUse

        //Parse Message to get key Data
        var ValObj = JSON.parse(JSONMessage.replace(/&quot;/g, '"'))[0]
        var keys = Object.keys(ValObj);
        var tblPropNm
        var tblpropVal

        for (var j = 0; j < keys.length; j++) {
            skipArr = false
            tblPropNm = keys[j]
            tblpropVal = ValObj[keys[j]]
            if (typeof(tblpropVal) == 'undefined') {
                tblpropVal = ''
            } else if ((tblPropNm == 'title')) {
                sPageName = tblpropVal;
                skipArr = true
            } else if ((tblPropNm == 'type')) {
                sObjType = tblpropVal;
                skipArr = true
            } else if ((tblPropNm == 'objectName')) {
                sObjectName = tblpropVal;
                skipArr = true
            } else if ((tblPropNm == 'addToTest')) {
                sAddToTest = tblpropVal;
                skipArr = false
            } else if ((tblPropNm == 'idProps')) {
                idPropsToUse = tblpropVal;
                skipArr = false
            }

            if (!skipArr) {
                //Push Data to Tree Data node for display and usage later
                if (j == 0) {
                    sObjProp = tblPropNm + ':C:' + tblpropVal;
                } else {
                    sObjProp = sObjProp + ':R:' + tblPropNm + ':C:' + tblpropVal;
                }

            }
        }


        var imagePath = "../images/"
        var imageToUse
        switch (sObjType) {
            case 'Link':
                imageToUse = "link.png"
                break;
            case 'Button':
                imageToUse = 'button.png'
                break;
            case 'Table':
                imageToUse = 'table.png'
                break;
            case 'Element':
                imageToUse = 'element.png'
                break;
            case 'List':
                imageToUse = 'customDoc1.gif'
                break;
            case 'Frame':
                imageToUse = 'customDoc1.gif'
                break;
            case 'File':
                imageToUse = 'customDoc1.gif'
                break;
            case 'Form':
                imageToUse = 'customDoc1.gif'
                break;
            case 'Element':
                imageToUse = 'object.png'
                break;
            default:
                if (sObjType.search('Input')) {
                    imageToUse = 'edit.png'
                } else {
                    imageToUse = 'input.png'
                }
        }
        imageToUse = imagePath + imageToUse

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
                icon: "../images/page.png",

                nodeTyp: 'Page',
            });
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
                icon: imageToUse,
                nodeTyp: 'ObjectType',
            });
        }

        //Add Object in Node if doesnot exist, Return
        var objByName=findNode(sObjectName,objTypRoot)
            if (objByName === false) {
                objTypRoot.addChildren({
                    title: sObjectName,
                    tooltip: sObjectName,
                    folder: true,
                    icon: "../images/box.png",
                    objProp: sObjProp,
                    nodeTyp: 'Object',
                });
            } else{
                ReturnVal='UIResp::Object Already Exist'
            
            
                //alert('UIResp::Object Already Exist')
            }


        // $("#objTree").fancytree("getTree").render(true,true);
        //Expand All nodes
        $("#objTree").fancytree("getTree").visit(function(node) {
            node.setExpanded();
            // node.setActive();
        });
        //Get Active node and add Object properties
        /*        var activeNode = $("#objTree").fancytree("getActiveNode");
                 if (activeNode !==null )
                {
                         $(activeNode.attr('obj-prop', sObjProp));
                        //var $span = $(activeNode.span);
                      //      $span.attr('obj-prop', sObjProp);
                       // alert( $span.attr('obj-prop'));
                       alert( $(activeNode.attr('obj-prop')) );
                }*/
                return ReturnVal
                 new Notification("Message Recieved from Spy", ReturnVal)



    }




});
