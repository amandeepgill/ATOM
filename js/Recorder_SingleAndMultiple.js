
(function(document) {

setUp();
     //Create jQuery Alias to aviod conflict with preloaded libraries
    var jq = jQuery.noConflict();

//setUp();
function setUp() {



    window.WebSocket = window.WebSocket || window.MozWebSocket;
    // if browser doesn't support WebSocket, just show
    // some notification and exit
    if (!window.WebSocket) {
        content.html($('<p>', {
            text: 'Sorry, but your browser doesn\'t support WebSocket.'
        }));
        return;
    }

    // Change Url to local host http://localhost:4444
    var connection = new WebSocket('ws://S22F0j8:8080', 'echo-protocol');
    connection.onopen = function() {
        // first we want users to enter their names
        connection.send("Connected with Spy!!!!");
    };

    // Send message to App Server
    function sendMessage() {
        // Construct a msg object containing the data the server needs to process the message from the chat client.
        var msg = {
            type: "message",
            text: document.getElementById("text").value,
            id: clientID,
            date: Date.now()
        };
    }

    var spymode = "single"
    //var spymode="multiple"
    var spyModeOptn = "show"
    //Main call
    switch (spymode) {
        case "single":

            var style = document.createElement('style');
            style.type = 'text/css';
            var toolTipCSS = '.ATOMSpyToolTip { color: #fff;width: auto;padding:10px;display:none;border-radius:5px;position:absolute !important;background-color:#000; } ';
            //var buttonCSS='.spyRectbttn {display: inline-block;-webkit-box-sizing: content-box;-moz-box-sizing: content-box;box-sizing: content-box;width: 0.75em;height: 0.75em;position: relative;border: none;-webkit-border-radius: 1em;border-radius: 1em;font: normal 18px/normal Arial, Helvetica, sans-serif;color: rgba(0,0,0,1);-o-text-overflow: clip;text-overflow: clip;background: #000000;}.spyRectbttn::before {display: inline-block;-webkit-box-sizing: content-box;-moz-box-sizing: content-box;box-sizing: content-box;width: 0.45em;height: 0.1em;position: absolute;content: "";top: 0.33em;left: 0.155em;border: none;font: normal 100%/normal Arial, Helvetica, sans-serif;color: rgba(0,0,0,1);-o-text-overflow: clip;text-overflow: clip;background: #ffffff;text-shadow: none;-webkit-transform: rotateZ(45deg)   ;transform: rotateZ(45deg)   ;}.spyRectbttn::after {display: inline-block;-webkit-box-sizing: content-box;-moz-box-sizing: content-box;box-sizing: content-box;width: 0.45em;height: 0.1em;position: absolute;content: "";top: 0.33em;left: 0em;border: none;font: normal 100%/normal Arial, Helvetica, sans-serif;color: rgba(0,0,0,1);-o-text-overflow: clip;text-overflow: clip;background: #ffffff;text-shadow: none;-webkit-transform: rotateZ(-45deg)   ;transform: rotateZ(-45deg)   ;}';
            var buttonCSS=''
            style.innerHTML =toolTipCSS+buttonCSS
            document.getElementsByTagName('head')[0].appendChild(style);
            //function Call
            singleSelect(spyModeOptn);
            break;
        case "multiple":
            multiSelect();
            break;
    }
}



function singleSelect(Option) {
//This is default start, To Restart after escape use restartSpy function which uses shift & Esc
//Key combination
      if (document.addEventListener) {
        document.addEventListener("mouseover", inspectorMouseOver, true);
        document.addEventListener("mouseout", inspectorMouseOut, true);
        document.addEventListener("click", inspectorOnClick, true);
        document.addEventListener("keydown", inspectorCancel, true);
    } else if (document.attachEvent) {
        document.attachEvent("mouseover", inspectorMouseOver);
        document.attachEvent("mouseout", inspectorMouseOut);
        document.attachEvent("click", inspectorOnClick);
        document.attachEvent("keydown", inspectorCancel);
    }
}


//Function to perform multiple selectionso
function multiSelect() {

    function getPos(e) {
        x = e.clientX;
        y = e.clientY;
        cursor = "Your Mouse Position Is : " + x + " and " + y;
        document.getElementById("displayArea").innerHTML = cursor
    }

    function stopTracking() {
        document.getElementById("displayArea").innerHTML = "";
    }


    var div = document.createElement("div");
    div.setAttribute("id", "canvas");
    div.style.position = "fixed";
    div.style.top = 0;
    div.style.right = 0;
    div.style.bottom = 0;
    div.style.left = 0;
    div.style.width = "100%"
    //div.style.height="100%";
    div.style.height = "100%";
    //div.style.border="3px solid ";
    //div.style.zIndex="99999999 !important";
    div.style.zIndex = "99999999";
    //div.style.pointerEvents="visiblePainted";
    document.body.appendChild(div);

    initDraw(document.getElementById('canvas'));


    //Set Class Property of Child Rectangles

    function initDraw(canvas) {
        var mouse = {
            x: 0,
            y: 0,
            startX: 0,
            startY: 0
        };

        function setMousePosition(e) {
            var ev = e || window.event; //Moz || IE
            if (ev.pageX) { //Moz
                mouse.x = ev.pageX + window.pageXOffset;
                mouse.y = ev.pageY + window.pageYOffset;
            } else if (ev.clientX) { //IE
                mouse.x = ev.clientX + document.body.scrollLeft;
                mouse.y = ev.clientY + document.body.scrollTop;
            }
        };

        var element = null;
        canvas.onmousemove = function(e) {
            setMousePosition(e);
            if (element !== null) {
                element.style.width = Math.abs(mouse.x - mouse.startX) + 'px';
                element.style.height = Math.abs(mouse.y - mouse.startY) + 'px';
                element.style.left = (mouse.x - mouse.startX < 0) ? mouse.x + 'px' : mouse.startX + 'px';
                element.style.top = (mouse.y - mouse.startY < 0) ? mouse.y + 'px' : mouse.startY + 'px';
            }
        }

        canvas.onclick = function(e) {
            if (element !== null) {
                element = null;
                canvas.style.cursor = "default";

                createRect();
                //alert(bndRect.clientX)

                //console.log("finsihed.");
            } else {
                if (document.getElementById("spyRect") == null) {
                    // console.log("begun.");
                    mouse.startX = mouse.x;
                    mouse.startY = mouse.y;
                    element = document.createElement('div');
                    element.setAttribute("id", "spyRect")
                    element.className = 'rectangle'
                    element.style.left = mouse.x + 'px';
                    element.style.top = mouse.y + 'px';
                    element.style.border = "2px solid black";
                    element.style.position = "absolute";
                    element.style.zIndex = "99999999";
                    // element.style.pointerEvents="none";
                    canvas.appendChild(element);
                    canvas.style.cursor = "crosshair";


                    //getElementsUnderneath();
                    /*                element.onmouseup=function(e){
                                    oBndRect=document.getElementById("spyRect");
                                        if (oBndRect!=null){
                                            alert(oBndRect.getBoundingClientRect())
                                        }
                                    }
                    */
                }

            }
        }

        //On Esc Key Press Remove Rectangle
        document.onkeydown = function(evt) {
            evt = evt || window.event;
            if (evt.keyCode == 27) {
                //alert('Esc key pressed.');
                var RectElements = document.getElementsByClassName('rectangle');
                // var RectElements = document.getElementById('spyRect');
                while (RectElements.length > 0) RectElements[0].removeNode();
                //Remove Child Rectangles
                RemoveRect();
            }
            ///Handle Delete Event
            if (evt.keyCode == 46) {

                //RemoveSelectedRect();
            }
        };



    } //function initDraw(canvas) {

    //Get All elements under the Bounding Rectangle
    //document.getElementById("canvas").onclick=
    function getElementsUnderneath() {
        oBndRect = document.getElementById("spyRect");
        if (oBndRect != null) {
            alert(oBndRect.getBoundingClientRect())
        }
    }

    //Function create rectangles for elemnts
    function createRect() {
        oBndRect = document.getElementById("spyRect");
        if (oBndRect != null) {
            var bndRect = oBndRect.getBoundingClientRect();
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
                scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            x1 = bndRect.top;
            y1 = bndRect.left;
            x2 = bndRect.bottom;
            y2 = bndRect.right;
            var all = document.getElementsByTagName("*");
            for (var i = 0, max = all.length; i < max; i++) {
                // Do something with the element here
                var ele = all[i];

                var r = ele.getBoundingClientRect();

                var x = r.top;
                var y = r.left;
                var w = ele.offsetWidth;
                var h = ele.offsetHeight;

                // createRect(x,y,w,h)


                if (x >= x1 &&
                    y >= y1 &&
                    x + w <= x2 &&
                    y + h <= y2) {
                    // this element fits inside the selection rectangle
                    if (window.getComputedStyle(ele).display != 'none') {
                        if (window.getComputedStyle(ele).visibility != 'hidden') {
                            if (ele.getBoundingClientRect().width > 0) {
                                ele.classList.add("spyChildRect");
                                // ele.className += "spyChildRect";
                                ele.style.outline = '2px solid #f00';

                                ele.addEventListener("keydown", RemoveSelectedRect);
                            }
                        }
                    }

                    // elements.push(ele.get(0));
                }
            };

        }
    }






    //Function create rectangles for elemnts
    function RemoveRect() {
        var chldRect = document.getElementsByClassName('spyChildRect');
        while (chldRect.length > 0) {
            if (typeof chldRect[0] != "undefined") {
                if (chldRect[0].classList.contains('spyChildRect')) {
                    chldRect[0].style.outline = ''
                    chldRect[0].classList.remove('spyChildRect');
                }
            }
        }
    };
    //RemoveRect();
} //function multiSelect(){


//Function add button
function createButton(bttnId,bttnTop,bttnRight,bttnText){
/*    var button = document.createElement("Button");
     button.setAttribute("id", bttnId)
    button.innerHTML = bttnText;
    button.style = "top:0;right:0;position:absolute;z-index: 9999"
    document.body.appendChild(button);*/


    var input = jq('<input type="button" value='+bttnText+' />');
    jq(input).attr('id', bttnId);
    jq(input).addClass('spyRectbttn');
     jq(input).css({ top: bttnTop, left: bttnRight, position:'absolute' });
    jq(input).appendTo(jq("body"));

}


function removeButton(bttnID)
{
    //jq("#"+bttnID).remove();
    jq(".spyRectbttn").remove();
    //spyRectbttn
}
/**
 * Get full CSS path of any element
 *
 * Returns a jQuery-style CSS path, with IDs, classes and ':nth-child' pseudo-selectors.
 *
 * Can either build a full CSS path, from 'html' all the way to ':nth-child()', or a
 * more optimised short path, stopping at the first parent with a specific ID,
 * eg. "#content .top p" instead of "html body #main #content .top p:nth-child(3)"
 */
function cssPath(el) {
    var fullPath = 0, // Set to 1 to build ultra-specific full CSS-path, or 0 for optimised selector
        useNthChild = 0, // Set to 1 to use ":nth-child()" pseudo-selectors to match the given element
        cssPathStr = '',
        testPath = '',
        parents = [],
        parentSelectors = [],
        tagName,
        cssId,
        cssClass,
        tagSelector,
        vagueMatch,
        nth,
        i,
        c;

    // Go up the list of parent nodes and build unique identifier for each:
    while (el) {
        vagueMatch = 0;

        // Get the node's HTML tag name in lowercase:
        tagName = el.nodeName.toLowerCase();

        // Get node's ID attribute, adding a '#':
        cssId = (el.id) ? ('#' + el.id) : false;

        // Get node's CSS classes, replacing spaces with '.':
        cssClass = (el.className) ? ('.' + el.className.replace(/\s+/g, ".")) : '';

        // Build a unique identifier for this parent node:
        if (cssId) {
            // Matched by ID:
            tagSelector = tagName + cssId + cssClass;
        } else if (cssClass) {
            // Matched by class (will be checked for multiples afterwards):
            tagSelector = tagName + cssClass;
        } else {
            // Couldn't match by ID or class, so use ":nth-child()" instead:
            vagueMatch = 1;
            tagSelector = tagName;
        }

        // Add this full tag selector to the parentSelectors array:
        parentSelectors.unshift(tagSelector)

        // If doing short/optimised CSS paths and this element has an ID, stop here:
        if (cssId && !fullPath)
            break;

        // Go up to the next parent node:
        el = el.parentNode !== document ? el.parentNode : false;

    } // endwhile


    // Build the CSS path string from the parent tag selectors:
    for (i = 0; i < parentSelectors.length; i++) {
        cssPathStr += ' ' + parentSelectors[i]; // + ' ' + cssPathStr;

        // If using ":nth-child()" selectors and this selector has no ID / isn't the html or body tag:
        if (useNthChild && !parentSelectors[i].match(/#/) && !parentSelectors[i].match(/^(html|body)$/)) {

            // If there's no CSS class, or if the semi-complete CSS selector path matches multiple elements:
            if (!parentSelectors[i].match(/\./) || $(cssPathStr).length > 1) {

                // Count element's previous siblings for ":nth-child" pseudo-selector:
                for (nth = 1, c = el; c.previousElementSibling; c = c.previousElementSibling, nth++);

                // Append ":nth-child()" to CSS path:
                cssPathStr += ":nth-child(" + nth + ")";
            }
        }

    }

    // Return trimmed full CSS path:
    return cssPathStr.replace(/^[ \t]+|[ \t]+$/, '');
}

/**
 * MouseOver action for all elements on the page:
 */
function inspectorMouseOver(e) {
    // NB: this doesn't work in IE (needs fix):
    var element = e.target;

    if (window.getComputedStyle(element).display != 'none') {
                            if (window.getComputedStyle(element).visibility != 'hidden') {
                                if (element.getBoundingClientRect().width > 0) {
                                    // Set outline:
                                    element.style.outline = '2px solid #f00';

                                    // Set last selected element so it can be 'deselected' on cancel.
                                     //Attach Even to process delete
                                if (jq(element).get(0).tagName !='BODY'){
										removeButton("spyRectbttn-1");
                                         createButton('spyRectbttn-1',element.getBoundingClientRect().top,element.getBoundingClientRect().right,'X')
                                }


                                    last = element;
//var $this = $(element);
                                    jq(element).hover(function(){
                                        //var title = jq(this).attr('title');
                                        var title = jq(element).get(0).tagName;
                                        jq(this).data('tipText', title).removeAttr('title');
                                        var elementHeight = jq(this).height();
                                        var offsetWidth = 10;
                                        var offsetHeight = 10;
                                        //Get the tool tip container width adn height
                                       // var toolTipWidth = jq(".ATOMSpyToolTip").width();
                                       // var toolTipHeight = jq(".ATOMSpyToolTip").height();
                                        var toolTipWidth =40;
                                        var toolTipHeight = 40;
                                        //Get the HTML document width and height
                                        var documentWidth = jq(document).width();
                                        var documentHeight = jq(document).height();

                                        //Set top and bottom position of the tool tip
                                    var top = jq(this).offset().top;
                                    if (top + toolTipHeight > documentHeight) {
                                            // flip the tool tip position to the top of the object
                                            // so it won't go out of the current Html document height
                                            // and show up in the correct place
                                            top = documentHeight - toolTipHeight - offsetHeight - (2 * elementHeight);
                                        }
                                                        //set  the left and right position of the tool tip
                                    var left = jq(this).offset().left + offsetWidth;

                                    if (left + toolTipWidth > documentWidth) {
                                        // shift the tool tip position to the left of the object
                                        // so it won't go out of width of current HTML document width
                                        // and show up in the correct place
                                        left = documentWidth - toolTipWidth - (2 * offsetWidth);
                                    }
                                    jq('.ATOMSpyToolTip').css({ 'top': top, 'left': left })
                                        jq('<p class="ATOMSpyToolTip"></p>')
                                         .text(title)
                                        .appendTo('body')
                                        .fadeIn('slow');
                                    }, function() {
                                        jq(this).attr('title', jq(this).data('tipText'));
                                        jq('.ATOMSpyToolTip').remove();
                                        //Remove BUtton
                                        removeButton("spyRectbttn-1");
                                    }).mousemove(function(e) {
                                        var mousex = e.pageX + 2;
                                       var mousey = e.pageY + 2;
                                       jq('.ATOMSpyToolTip')
                                        .css({ top: mousey, left: mousex })
                                    });



                                }
                            }
    }
}









//FUnction Rectangle under Mouse Postion
function RemoveSelectedRect(evt) {
    //   $(window).click(function(e) {
    setTimeout(function() {
        alert(evt.type, window.getSelection().getRangeAt(0).startOffset);
    }, 0);

    var x = e.clientX,
        y = e.clientY,
        elementMouseIsOver = document.elementFromPoint(x, y);

    alert(elementMouseIsOver);
    //  });

}


/**
 * Click action for hovered element
 */
function inspectorOnClick(e) {
    e.preventDefault();

    // These are the default actions (the XPath code might be a bit janky)
    // Really, these could do anything:
    console.log(cssPath(e.target));
    /* console.log( getXPath(e.target).join('/') ); */

    return false;
}

/**
 * Function to cancel inspector:
 */
function inspectorCancel(e) {
    // Unbind inspector mouse and click events:
    if (e === null && event.keyCode === 27) { // IE (won't work yet):
        document.detachEvent("mouseover", inspectorMouseOver);
        document.detachEvent("mouseout", inspectorMouseOut);
        document.detachEvent("click", inspectorOnClick);
        document.detachEvent("keydown", inspectorCancel);
        last.style.outlineStyle = 'none';
         jq('.ATOMSpyToolTip').remove();

    } else if (e.which === 27) { // Better browsers:
        document.removeEventListener("mouseover", inspectorMouseOver, true);
        document.removeEventListener("mouseout", inspectorMouseOut, true);
        document.removeEventListener("click", inspectorOnClick, true);
        document.removeEventListener("keydown", inspectorCancel, true);
        // Remove outline on last-selected element:
        last.style.outline = 'none';
        jq('.ATOMSpyToolTip').remove();
    }
}
/**
 * MouseOut event action for all elements
 */
function inspectorMouseOut(e) {
    // Remove outline from element:
    e.target.style.outline = '';
    jq('.ATOMSpyToolTip').remove();
}



function onExit() {
    //Close WebSocket Connection
}
	
})(document);
