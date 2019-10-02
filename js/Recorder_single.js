(function(document) {
//Create jQuery Alias to aviod conflict with preloaded libraries
var jq = jQuery.noConflict();

//window.onload = setUp;
setUp();
function setUp() {
    var spymode = "single"
    //var spymode="multiple"
    var spyModeOptn = "show"
    //Main call
    switch (spymode) {
        case "single":

            var style = document.createElement('style');
            style.type = 'text/css';
            var toolTipCSS = '#ATOMspyPopUpDiv {float: left;}.spypopup {padding: 10px;background-color:#C0C0C0;border-style: solid;border-color: black;border-radius: 5px; -moz-border-radius: 5px; -khtml-border-radius: 5px; -webkit-border-radius: 5px;margin-top: 5px;} .spyclosebttn{position:absolute;top:-12px;right: -12px;width:22px;height:22px;vertical-align:middle;display:table-cell;box-shadow: 0px 1px 3px #000;background-color: #000;border: 2px solid #FFF;border-radius: 22px;color: #FFF;text-align: center;font: 14px "Comic Sans MS",Monaco;} .close-thik:after {content: "X"} ';
            style.innerHTML = toolTipCSS
            document.getElementsByTagName('head')[0].appendChild(style);
            //function Call
            singleSelect(spyModeOptn);
            break;
        case "multiple":
            multiSelect();
            break;
    }
}


	window.WebSocket = window.WebSocket || window.MozWebSocket;
    // if browser doesn't support WebSocket, just show
    // some notification and exit
    if (!window.WebSocket) {
        Alert( 'Sorry, but your browser doesn\'t support WebSocket.')
        }


    // Change Url to local host http://localhost:4444
    var connection = new WebSocket('ws://localhost:8080', 'echo-protocol');
    connection.onopen = function() {
        // first we want users to enter their names
        connection.send("Connected with Spy!!!!");
    };

    // Send message to App Server
    function sendMessage() {
        // Construct a msg object containing the data the server needs to process the message from the chat client.

 /*        $(function() {
            $('input[type="text"]').on('blur' , function() {
                // Your code here
            });
          }); */  
        var msg = {
            type: "message",
            text: jq("#ATOMspyPopUpDiv").attr('obj-prop'),
            id: "objInfo",
            date: Date.now()
        };
	
        //connection.send(JSON.stringify(msg));
        //connection.send(jq("#ATOMspyPopUpDiv").attr('obj-prop'))
        connection.send(JSON.stringify(msg));

        connection.onmessage = function(msg){
            var uiRsp=JSON.parse(msg.data).data.text
           
            if (uiRsp.substring(0, 6)=='UIResp'){
                 var msgToShow=uiRsp.split('::')[1];
                 var msgtoShowtype
                 if (msgToShow.search("Already")>0) {
                 	msgtoShowtype="Error!!!"
                 } else {
                 	msgtoShowtype="Message"
                 }
                
                 showAlert(msgtoShowtype,msgToShow);
            }
           
       }
		
    }



function singleSelect(Option) {

    //Attach Spy ToolTip Panel
    attachSpyPanel();

    //Handle Click on Add button of Spy ToolTip Panel
    jq("#spySubmit").click(function() {

		removeSpyPanel();
		//Send Message to UI
		sendMessage();
		//jq("#ATOMspyPopUpDiv").attr('obj-prop')
        //showAlert("Message","Object Added to Repository");
    });

    //Attach Event listner on in and out from a given element	  
    if (document.addEventListener) {
        document.addEventListener("mouseover", spyMouseOver, true);
        document.addEventListener("mouseout", spyMouseOut, true);
    } else if (document.attachEvent) {
        document.attachEvent("mouseover", spyMouseOver, true);
        document.attachEvent("mouseout", spyMouseOut, true);
    }
}


function spyMouseOver(e) {
    var element = e.target;
    e.stopPropagation(); //Stop Propagation is not really Working as it too late by now


    if (window.getComputedStyle(element).display != 'none') {
        if (window.getComputedStyle(element).visibility != 'hidden') {
            if (element.getBoundingClientRect().width > 0) {
                if (!(jq(element).get(0).tagName == 'BODY')) {
                    if (!(jq(element).get(0).tagName == 'HTML')) {
                        if (!(jq(element).hasClass('ignrPopUp'))) {
                            //Get the tool tip container width adn height
                            var eleRect = jq(element).get(0).getBoundingClientRect();
							
							var doc = document.documentElement;
							var scrollOffSetLeft = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
							var scrollOffSetTop = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
							
                            var elementHeight = eleRect.height;
							//elementHeight=elementHeight-scrollOffSetTop
                            var elementWidth = eleRect.width;
							//elementWidth=elementWidth-scrollOffSetLeft
                            var elementleft = eleRect.left;
							
                            var elementRight = eleRect.right;
                            var elementTop = eleRect.top;
							//elementTop=elementTop-scrollOffSetTop
                            var elementBottom = eleRect.bottom;

                            var offsetWidth
                            if (elementWidth / jq(document).width() > 0.5) {
                                //alert(jq(document).width()/elementWidth);
                                offsetWidth = elementWidth / 2
                            } else {
                                offsetWidth = elementWidth;
                            }

                            var offsetHeight = 10;
                            var toolTipWidth = jq("#ATOMspyPopUpDiv").width();
                            var toolTipHeight = jq("#ATOMspyPopUpDiv").height();
                            //Get the HTML document width and height
                            var documentWidth = jq(document).width();
                            var documentHeight = jq(document).height();

                            //var top = jq(element).offset().top;
                            var top = elementTop
                            if (top + toolTipHeight > documentHeight) {
                                // flip the tool tip position to the top of the object
                                // so it won't go out of the current Html document height
                                // and show up in the correct place
                                top = documentHeight - toolTipHeight - offsetHeight - (2 * elementHeight);
                            } else if (elementWidth / jq(document).width() > 0.5) {
                                top = elementBottom;
                            }
							
							if (scrollOffSetTop>0) {
								top=top+scrollOffSetTop
							}
                            //set  the left and right position of the tool tip

                            var left = jq(element).offset().left + offsetWidth;

                            if (left + toolTipWidth > documentWidth) {
                                // shift the tool tip position to the left of the object
                                // so it won't go out of width of current HTML document width
                                // and show up in the correct place
                                left = documentWidth - toolTipWidth - (2 * offsetWidth);
                            }
							
							if (scrollOffSetLeft>0) {
								left=left+scrollOffSetLeft
							}


                            element.style.outline = '3px solid black';

                            //var top=element.getBoundingClientRect().top;
                            //var right=element.getBoundingClientRect().right;
                            var title = jq(element).get(0).tagName;
                            jq("#ATOMspyPopUpDiv").show();
                            var oBType = toCamelCase(getObjectType(element));
                            jq("#SpyObjTypeVal").text(' ' + oBType);
                            // jq("#ATOMspyPopUpDiv").css({ top: top, left: right, position:'absolute', 'zIndex': "99999999" });
                            jq("#ATOMspyPopUpDiv").css({
                                top: top,
                                left: left,
                                position: 'absolute',
                                'zIndex': "99999999"
                            });
							
							//Set Place Holder i.e. default
							jq("#objSpyObjName").attr("placeholder", "Object Name");
							//Set Object name
							var objValToSet=genObjName(element, oBType);
							if (objValToSet != ''){
								var tmpNm=genObjName(element, oBType)
								if (tmpNm.length >20){
									tmpNm=tmpNm.substring(0, 20); 
								}
								jq("#objSpyObjName").val(tmpNm);
							}
							

                            //Call to get properties
							
                            var rcvdProp = getDfltObjPrpties(element, oBType);

                            jq("#ATOMspyPopUpDiv").attr('obj-prop', JSON.stringify(rcvdProp));
                        }
                    }
                } //if (!(jq(element).get(0).tagName =='BODY'))
            }
        }
    }

} //function spyMouseOver(e


function attachSpyPanel() {
    jq('<div class="spypopup ignrPopUp" id="ATOMspyPopUpDiv" style="display: none;"><span id="SpyObjType" class="ignrPopUp"><strong class="ignrPopUp">Object Type:</strong></span><span id="SpyObjTypeVal" class="ignrPopUp"></span><br><a class="spyclosebttn ignrPopUp" id="spyCloseBtton" href="javascript:void(0)" >x</a><label class="ignrPopUp" for="ObjName"><strong class="ignrPopUp">Object Name:</strong></label><br><input class="ignrPopUp" type="text" name="objName" value="" id="objSpyObjName" placeholder="Object Name"><br><input class="ignrPopUp" type="checkbox" id="spyAddtoTstChkBx" name="addToTest" value="X" />Add to Test <br /><input class="ignrPopUp" type="submit" name="" value="Add" id="spySubmit"> </div>')
        .appendTo('body')
        .fadeIn('slow');
    jq("#ATOMspyPopUpDiv").hide();
	
	//Attach Delayed binding for Close Button
	jq('#spyCloseBtton').on("click", function(){
		jq("#ATOMspyPopUpDiv").hide();
	});
}


function showAlert(Header, Message) {
var sHeader, sMessage
sHeader=Header;
sMessage=Message;
	if (Header==''){
		 sHeader = "Object Added"
	}
	
	if (Message==''){
		 sMessage = "Hover over any object to continue..."
	}
    
    jq('<div class="spy-BoldPop ignrPopUp" id="spyAlert" style="font-family:sans-serif;margin: 0px auto;width: 240px;height: 90px;box-shadow: 1px 2px 8px 2px rgba(0,0,0,0.25);border-radius: 10px;border: 1px solid #888;zIndex:9999999999"><div class="spy-BoldContent ignrPopUp" style="width: 220px;text-align: center;float: left;padding: 10px;background-color: grey;border-radius: 10px 10px 0px 0px;"><h1 class="ignrPopUp" style="font-size: 20px;color: #FFF;padding: 0px;margin: 0px;font-weight: 300;">' + sHeader + '</h1></div><div class="spy-BoldBody ignrPopUp" style="width: 100%;margin: 10px auto; float: left;"><p class="ignrPopUp" style="padding: 5px;margin: 0px;font-size: 14px;text-align: center;color: #111;">' + sMessage + '</p></div>')
        .appendTo('body');
		

    setTimeout(function() {
        if (jq('#spyAlert').length > 0) {
            jq('#spyAlert').remove();
        }
    }, 1200)

}

function removeSpyPanel() {
    //jq(".ignrPopUp").detach();
    jq("#ATOMspyPopUpDiv").hide();
}




function spyMouseOut(e) {
    var element = e.target;
    e.stopPropagation();

    //jq("#ATOMspyPopUpDiv").hide();
    element.style.outline = ''
}



function getObjectType(object) {
    var title = jq(object).get(0).tagName.toLowerCase();
    switch (title) {
        case "a":
            return ('Link');
            break;
        case "button":
            return ('Button');
            break;
        case "caption":
        case "table":
        case "caption":
        case "tbody":
        case "th":
        case "tfoot":
        case "td":
        case "tr":
            return ('Table');
            break;
        case "div":
        case "dl":
            return ('Element');
            break;
        case "ul":
        case "li":
        case "ol":
        case "menu":
        case "menuitem":
        case "optgroup":
        case "select":
            return ('List');
            break;
        case "iframe":
            return ('Frame');
            break;
        case "fieldset":
        case "form":
            return ('Form');
            break;
        case "input":
            var inputType = jq(object).get(0).tagName.toLowerCase() === "input" ? jq(object).get(0).type.toLowerCase() : jq(object).get(0).tagName.toLowerCase();
            switch (inputType) {
                case "reset":
                case "submit":
                case "button":
                    return ("Button");
                    break;
                case "file":
                    return ("File");
                    break;
                default:
                    return ('Input ' + toCamelCase(inputType));
                    break;
            }
            break;
        default:
            return ('Element');
            break;
    }

}


//var htmlObjTypes = {};
//htmlObjTypes[]

props = Object.getOwnPropertyNames(window)
for (var idx in props) {
    if (props[idx].indexOf("HTML") == 0) {
        //do something here
        //console.log(props[idx]);
    }
}


//Get Default Object properties
function getDfltObjPrpties(obj, ObjType) {

    var objProps = [];

    var objRect = jq(obj).get(0).getBoundingClientRect()
    var obHeight = objRect.height;
    var objWidth = objRect.width;
    var objleft = objRect.left;
    var objRight = objRect.right;
    var objTop = objRect.top;
    var objBottom = objRect.bottom;
	var sAddtoTst=false
	
	if (jq('#spyAddtoTstChkBx').is(':checked')){
		sAddtoTst=true
	}

    var props = {
        'objName':jq('#SpyObjTypeVal').text(),
		'title': jq(document).find("title").text(),
		'type': toCamelCase(getObjectType(obj)),
		'name':jq(obj).attr('name'),
		'value':jq(obj).val(),
		'innerText': jq(obj).text(),
        'objectName': jq("#objSpyObjName").val(),
        'id': jq(obj).attr('id'),
        'xPATH': getXpath(obj),
        'css': getCssSelector(obj),
        'Class': jq(obj).attr('class'),
        'height': obHeight.toFixed(2),
        'width': objWidth.toFixed(2),
        'x': objleft,
        'y': objTop,
        'visible': jq(obj).is(":visible"),
		'addToTest':sAddtoTst,
		'idProps':'name;value',
		'href':jq(obj).attr("href"),
		'frame':checkIfinFrame(obj),
    }
    objProps.push(props);

	
    return objProps;
}





//Generate Object 
function genObjName(element, objType) {

var text = '';
var str=getVisibleText(element)
str=toCamelCase(str)
var arr = str.split(' ');
if (arr.length = 1){
	arr[0]=str;
	iWordCnt=arr[0].length
}
else if (arr.length > 1 && arr.length < 7){
	iWordCnt=3
}
else if (arr.length > 7 ){
	iWordCnt=5
}


for(i=0;i<arr.length;i++) {
    text += arr[i].substr(0,iWordCnt)
}    
    return (text);

};

//
function getVisibleText(element){

	var clone = jq(element).clone(true);

	clone.appendTo('body').find(':hidden').remove();

	var text = clone.text();

	clone.remove();
	//Remove newlines and whitespaces
	text=text.replace(/\r?\n?/g, '').trim();
	//Remove multiple splaces 
	text=text.replace(/ +(?= )/g,'');
	
	if (element.defaultValue=="Submit") {
	
		if (typeof text === 'undefined'){
		text='';
	}
	
	}
	

	if (text.trim()==''){
		text=jq(element).attr('name');
		if (typeof text === 'undefined'){
			text='';
		}
	}
	
	if (text.trim()==''){
		text=jq(element).val();
	}
	//Remove Special Chracters
	text=removeSpecialChars(text);
	//Remove Extra Spaces
	text=text.replace(/\s/g, '');
	//Remove newlines and whitespaces
	text=text.replace(/\r?\n?/g, '').trim();
	//Remove multiple splaces 
	text=text.replace(/ +(?= )/g,'');
	return(text);

}


//Remove Special Chracters
function removeSpecialChars(str) {
  return str.replace(/(?!\w|\s)./g, '')
    .replace(/\s+/g, ' ')
    .replace(/^(\s*)([\W\w]*)(\b\s*$)/g, '$2');
}

//Get X Path of select Object
function getXpath(element) {
    var xPath, element_sibling, siblingTagName, siblings, cnt, sibling_count;
    var ELEMENT_NODE = 1
    var elementTagName = element.tagName.toLowerCase();
    if (element.id != '') {
        return 'id("' + element.id + '")';
        // alternative : 
        // return '*[@id="' + element.id + '"]';
    } else if (element.name && document.getElementsByName(element.name).length === 1) {
        return '//' + elementTagName + '[@name="' + element.name + '"]';
    }
    if (element === document.body) {
        return '/html/' + elementTagName;
    }
    sibling_count = 0;
    siblings = element.parentNode.childNodes;
    siblings_length = siblings.length;
    for (cnt = 0; cnt < siblings_length; cnt++) {
        var element_sibling = siblings[cnt];
        if (element_sibling.nodeType !== ELEMENT_NODE) { // not ELEMENT_NODE
            continue;
        }
        if (element_sibling === element) {
            return getXpath(element.parentNode) + '/' + elementTagName + '[' + (sibling_count + 1) + ']';
        }
        if (element_sibling.nodeType === 1 && element_sibling.tagName.toLowerCase() === elementTagName) {
            sibling_count++;
        }
    }
    return xPath;
};

//Temp FrameCheck in place for now
function checkIfinFrame(element){
	if(element.ownerDocument !== document) {
		//return element.ownerDocument
		return "someiframe"  //For Testing
	}else{
		return ''
	}
}


function getCssSelector(element) {
    var ELEMENT_NODE = 1;
    if (!(element instanceof Element))
        return;
    var path = [];
    while (element.nodeType === ELEMENT_NODE) {
        var selector = element.nodeName.toLowerCase();
        if (element.id) {
            if (element.id.indexOf('-') > -1) {
                selector += '[id = "' + element.id + '"]';
            } else {
                selector += '#' + element.id;
            }
            path.unshift(selector);
            break;
        } else {
            var element_sibling = element;
            var sibling_cnt = 1;
            while (element_sibling = element_sibling.previousElementSibling) {
                if (element_sibling.nodeName.toLowerCase() == selector)
                    sibling_cnt++;
            }
            if (sibling_cnt != 1)
                selector += ':nth-of-type(' + sibling_cnt + ')';
        }
        path.unshift(selector);
        element = element.parentNode;
    }

    return path.join(' > ');
};


function toCamelCase(str) {
    var split = str.split(' ');

    //iterate through each of the "words" and capitalize them
    for (var i = 0, len = split.length; i < len; i++) {
        split[i] = split[i].charAt(0).toUpperCase() + split[i].slice(1);
    }
    return split.join(' ');
}


//onclick="closeToolTip()"


//function closeToolTip() {
 //   jq("#ATOMspyPopUpDiv").hide();
//}


function onExit() {
    //Close WebSocket Connection
}

	
})(document);
