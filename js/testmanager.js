$(document).ready(function() {

    
    
        //load Step Generator's Default div as DropZone
        DisplayDropZone()
    
/*         function refreshStepGenAccordian() {
            //collapse and Exapnd First Accordian
            var height = $('#stepRaisedPanel').height() + 22
            height = height + 'px'
            $(".accordion")[0].nextElementSibling.style.maxHeight = height;
        } */
    
        //Refersh Tab
        //refreshStepGenAccordian();
    
        function DisplayDropZone() {
            var template = $('#dropZoneTemplate').html();
            $('#StepObjectDropCntnr').append(template);
            //refreshStepGenAccordian();
        }
    
    
        $(".draggable-element").draggable({
            cancel: true,
            stack: ".draggable-element",
            helper: "clone",
            revert: "true",
            iframeFix: true,
    
            // snap: ".drop-zone"
            start: function(event, ui) {
    
                $(".ui-draggable").not(ui.helper.css("z-index", "1"))
                    .css("z-index", "0");
            },
    
            stop: function(event, ui) {
                //  $(this).css("z-index","auto");
            }
    
        });
    
        //Activate dropzone div as droppable
        initalizeDropZone();
    
        function initalizeDropZone() {
    
            $('.drop-zone').droppable({
                //accept: '.draggable-element,.fancytree-title',
                hoverClass: 'drop-zone-hover',
                drop: function(event, ui) {
                    var $clone = ui.helper.clone();
    
    
                    switch ($clone.text()) {
                        case 'Object Interaction':
                            alert($clone.text())
                            break;
                        case 'Call Test':
                            alert($clone.text())
                            break;
                        case 'Variable':
                             setVaribaleSelector("Add","" ,"Integer","","")
                            break;
                        case 'Condition':
                        setConditionalSelector("Add","" ,"Integer","","")
                            break;
                        case 'Loop':
                            alert($clone.text())
                            break;
                        case 'Switch':
                            alert($clone.text())
                            break;
                        case 'Compare':
                            alert($clone.text())
                            break;
                        case 'Assert':
                            alert($clone.text())
                            break;
                        case 'Wait':
                            alert($clone.text())
                            break;
                        case 'Sync':
                            alert($clone.text())
                            break;
                        default:
                            // var sourceNode = $(ui.helper).data("ftSourceNode");
                            // alert("Dropped source node " + sourceNode);
                            setObjActnSelector($(ui.helper))
    
                    }
    
                }
            });
    
    
        }
    
    
        var jsoObj = {
            "root": {
                "libraryType": "Web",
                "ObjectType": [{
                        "#text": "link",
                        "class": {
                            "-name": "verifyLink",
                            "method": [{
                                    "-description": "Clicks a given link",
                                    "-name": "Click"
                                },
                                {
                                    "-description": "Verifies URL",
                                    "-name": "verify",
                                    "parameter": {
                                        "-description": "Provide expected URL",
                                        "-type": "string",
                                        "-name": "url"
                                    }
                                },
                                {
                                    "-description": "Verifies the text displayed",
                                    "-name": "verifyLinkText",
                                    "parameter": {
                                        "-description": "Provide text displayed for a link",
                                        "-type": "string",
                                        "-name": "urlText"
                                    }
                                }
                            ]
                        }
                    },
                    {
                        "#text": "Input Text",
                        "class": {
                            "-name": "verifyInputBox",
                            "method": [{
                                    "-description": "Verifies correct value is present in input box",
                                    "-name": "verify",
                                    "parameter": {
                                        "-description": "Provide Text to be present in input box",
                                        "-type": "string",
                                        "-name": "text"
                                    }
                                },
                                {
                                    "-description": "Verifies the text type of input box",
                                    "-name": "verifyTextType",
                                    "parameter": {
                                        "-description": "Provide Text type of the text present in input box",
                                        "-type": "string",
                                        "-name": "textType",
                                        "-validValues": "int;string;date"
                                    }
                                }
                            ]
                        }
                    },
                    {
                        "#text": "common",
                        "class": {
                            "-name": "commonClass",
                            "method": [{
                                    "-description": "Verifies correct value is present in input box",
                                    "-name": "commonMethod1",
                                    "parameter": {
                                        "-description": "Provide Text to be present in input box",
                                        "-type": "string",
                                        "-name": "text"
                                    }
                                },
                                {
                                    "-description": "Verifies the text type of input box",
                                    "-name": "commonMethod2",
                                    "parameter": {
                                        "-description": "Provide Text type of the text present in input box",
                                        "-type": "string",
                                        "-name": "textType",
                                        "-validValues": "int;string;date"
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        }



        var RefJSON=[
            {
              "javaClass": "com.atom.web.InputBox",
              "objectType": "InputBox",
              "operations": [
                {
                  "name": "inputText",
                  "description": "Keys the provided text into InputBox object",
                  "params": [
                    {
                      "type": "java.lang.String",
                      "name": "InputText",
                      "description": "text to input",
                      "default_value": null,
                      "values": null
                    }
                  ]
                }
              ]
            },
            {
              "javaClass": "com.atom.web.Link",
              "objectType": "Link",
              "operations": [
                {
                  "name": "verify",
                  "description": "Verifies URL",
                  "params": [
                    {
                      "type": "java.lang.String",
                      "name": "LinkText",
                      "description": "Provide expected URL",
                      "default_value": "def1",
                      "values": "def1,def2,def3"
                    }
                  ]
                },
                {
                  "name": "click",
                  "description": "Click Link",
                  "params": null
                },
                {
                  "name": "verifyLink",
                  "description": "method with two parameters",
                  "params": [
                      
                    {
                      "type": "java.lang.String",
                      "name": "LinkName",
                      "description": "param1 details",
                      "default_value": null,
                      "values": null
                    },
                    {
                      "type": "boolean",
                      "name": "Verify",
                      "description": "param2 details",
                      "default_value": "true",
                      "values": "true,false"
                    }
                  ]
                }
              ]
            }
          ]
    
    
    
    
        function setObjActnSelector(obj) {
    
            var sourceNode = $(obj).data("ftSourceNode");
            var tree = $("#objTree").fancytree("getTree");
            var objnode = tree.getNodeByKey(sourceNode.key)
    
            var ObjectName = objnode
            var ObjectType = ObjectName.parent
            var pageName = ObjectType.parent
    
            if (pageName == null) {
                pageName = ''
            } else {
                pageName = pageName.title
            }
    
            if (ObjectName == null) {
                ObjectName = ''
                ObjectType = ''
            } else {
                ObjectName = ObjectName.title
                ObjectType = ObjectType.title
            }
    
            //Remove Drop Zone Div before adding Action Selector div
            $('#dropZoneDiv').remove();
            var divHtml = loadStepSelector(pageName, ObjectName, ObjectType);
            $('#StepObjectDropCntnr').html(divHtml);
            //initialize dropdown
            $('#selActnDrpDwn').dropdown({});
            //Get Methods/Action to populate action dropdown
            //Methods=getMethodsForObjectType(jsoObj, "Web", ObjectType)            
            Methods=getMethodsForObjectType(RefJSON, ObjectType)
            var $menu =  $('#selActnDrpDwn').find('.menu');
            //append new option to menu
            var ClassName=Methods.javaClass;
            for(var i=0;i<Methods.operations.length;i++) {
            
            var colors=['pink','grey','red','orange', 'yellow','olive','green','teal','blue','violet', 'purple','pink', 'brown', 'grey','black']
            var color = colors[Math.floor(Math.random() * colors.length)];

               $menu.append('<div class="item" mthdClss='+ClassName+' data-value='+ClassName+'><div class="ui '+color+' empty circular label"></div>'+Methods.operations[i].name+'</div>');
            }
            //reinitialize drop down
/* 
            $('#selActnDrpDwn').dropdown({
                onChange: function (value, text, $selectedItem) {
                  console.log(value);
                },
                forceSelection: false, 
                selectOnKeydown: false, 
                showOnFocus: false,
                on: "hover" 
              }); */

             //Based on selected action get parameters
          $("#selActnDrpDwn").dropdown({
            onChange: function (val,data,choice) {
                $('#actionParamForm').empty();
                var selclss=val;
                var tmplToUse;
                var selmthd=$('#selActnDrpDwn').dropdown('get text');
                paraMeters=getMethodParmaters(RefJSON,selclss, selmthd)
                var $ParamPlaceHldr=$('#actionParamContainer');
                var NoParametersTempl='<div class="ui circular icon button" data-tooltip="No parameters required for this action" data-inverted=""><i class="circular green big checkmark icon"></i></div>'
                var formTempl='<form class="ui  form"><div class="ui form" id="actionParamForm"></div></form>'
                $ParamPlaceHldr.append(formTempl);

                if (paraMeters==null){
                    $('#actionParamForm').append(NoParametersTempl);

                }else{
                    for(var i=0;i<paraMeters.length;i++) {
                        var Param=paraMeters[i].name;
                        var ParamDesc=paraMeters[i].description;
                        var ParamDflt=paraMeters[i].default_value
                        var ParamType=paraMeters[i].type
                        var ParamApplValues=paraMeters[i].values  ///Applicable Values
                        if (ParamApplValues==null){
                            var InputParameterTempl='<div class="inline field"><label>'+Param+'</label><div class="ui mini icon button" data-tooltip="'+ParamDesc+' "data-inverted=""><i class="circle help icon"></i> </div><div class="ui mini icon input"><input type="text" placeholder="Enter Parameter Value..."></i></div></div>'
                            $('#actionParamForm').append(InputParameterTempl); 
                            
                        } else {
                            var DropParameterTempl= '<div class="inline field"><label>'+Param+'</label><div class="ui mini icon button" data-tooltip="'+ParamDesc+'" data-inverted=""><i class="circle help icon"></i></div><div class="ui mini selection dropdown parameters" style="height:20px !important><input type="hidden" name="parameter"><i class="dropdown icon"></i><div class="text"></div><div class="menu"></div></div></div>'
                            $('#actionParamForm').append(DropParameterTempl); 
                            $('.ui.dropdown').dropdown();
                            var $menu =  $('#actionParamForm').find('.menu');
                            var avilValue = ParamApplValues.split(',');
                            for (var k=0;k<avilValue.length;k++){
                                $menu.append('<div class="item"  data-value='+avilValue[k]+'>'+avilValue[k]+'</div>');
                            }
                        }
                    }
                }
                            
               // refreshStepGenAccordian();
            }
        })
            //optional, set new value as selected option
           // $('#selActnDrpDwn').dropdown('set selected',['Fall']);
            //refreshStepGenAccordian();
    
            //Add Object to Step BUtton Handlers
            $('#addButton_Object').on('click',function(){
                //Get the selected method
                $("#selActnDrpDwn").dropdown('get text');
                //Get all Parameter Properties
alert("button clicked");
            })

            //Add Object to Step--Cancel Handler
            $('#CancelActionGen_Object').on('click', function() {
                $('#StepGenContainer').remove();
                DisplayDropZone()
                initalizeDropZone();
            })


    
        }

        //Based on selected action get parameter
    
    
        //Set the Object Selector HTML based on obect dropped        
        function loadStepSelector(pageName, objName, ObjType) {
            var targetContainer = $(".target-output"),
                templateDefined = $(".target-output").data("template-chosen"),
                template = $("#StepGenerator_Regular").html();
            var PageName = pageName
            var PageIcon = "../images/page.png"
            var ObjType = ObjType
            var ObjIcon = getObjectImage(ObjType)
            var ObjName = objName
            var ObjNameIcon = "../images/box.png"
            var objType = {
                "pageName": PageName,
                "pageIcon": PageIcon,
                "ObjType": ObjType,
                "ObjIcon": ObjIcon,
                "ObjName": ObjName,
                "ObjNameIcon": ObjNameIcon
            }
    
            var html = Mustache.to_html(template, objType);
            return html
        }
    

/*         function getMethodsForObjectType(extarctedJSON, LibraryType, ObjectType){
            var jsoObj = JSON.stringify(extarctedJSON)
            var parsedObj = JSON.parse(jsoObj)
            var root=parsedObj.root
            var retrunJSONObj=''
            var rtrnArr = [];
            
            if (root.libraryType==LibraryType){
                for (var i = 0; i < root.ObjectType.length; i++) { 
                    var ObjType=root.ObjectType[i]
                    if (ObjType["#text"].toUpperCase()==ObjectType.toUpperCase()){
                        for (var j=0;j <ObjType.class.method.length;j++){
                            var className=ObjType.class["-name"]
                            var method=ObjType.class.method[j]
                                rtrnArr.push(className+'::'+method["-name"])
                        }
                        break;
                    }
                }
            }
         return rtrnArr
        } */


        function getMethodsForObjectType(extarctedJSON, ObjectType){

            switch(ObjectType) {
                case "Input Text":
                ObjectType="InputBox"
                    break;
                case "Link":
                ObjectType="Link"
                    break;
            }


            for (var i = 0; i < extarctedJSON.length; i++) { 
                if (extarctedJSON[i].objectType==ObjectType){
                    return extarctedJSON[i];
                    break
                }
            }
        }


        function getMethodParmaters(extarctedJSON,fromClass,forMethod ){
            for(var i=0;i<extarctedJSON.length;i++) {
                if (extarctedJSON[i].javaClass==fromClass){
                    var Methods=extarctedJSON[i]
                    for(var j=0;i<Methods.operations.length;j++) {
                        if (Methods.operations[j].name==forMethod){
                            return Methods.operations[j].params
                            break;
                        }
                    }
                }
            }
        }
    
    
        function getObjectImage(obj) {
            var imagePath = "../images/"
            var imageToUse
            switch (obj) {
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
                    imageToUse = 'box.png'
                    break;
                case 'Input Text':
                    if (obj.search('Input')) {
                        imageToUse = 'edit.png'
                    } else {
                        imageToUse = 'input.png'
                    }
                    break;
                default:
                        imageToUse = 'customDoc1.gif'
                   
            }
            imageToUse = imagePath + imageToUse
    
            return imageToUse
    
        }
    
    
    

///Handle Variables
  //Mode can be Add or Update
        function setVaribaleSelector(Mode,Name,Type,Value,description){
                 //Remove Drop Zone Div before adding Action Selector div
                 
                        $('#dropZoneDiv').remove();
                        var varName=Name;
                        var varType=Type;
                        var varVal=Value;
                        var varDesc=description;
                        var varBttnId;
                        if (Mode=='Add'){
                            varBttnId="AddVarStep"
                        }else{
                            varBttnId="UpdtVarStep"
                        }
                        var divHtml = loadVariableSelector(Mode,varName,varType,varVal,varDesc,varBttnId);
                        $('#StepObjectDropCntnr').html(divHtml);
                        //Set the Variable Type
                        $('#varStepDropDown').dropdown('set selected', varType);
                        //In Case of Update Add another parameter to the button to store Orignal Variable Name
                        if (Mode=='Update'){
                              $('#UpdtVarStep').attr('origVarName',varName);
                        }
            
             }
            
            //Set the Object Selector HTML to variable      
            function loadVariableSelector(Mode,Name,Type,Value,description,BttnID) {
                var targetContainer = $(".target-output"),
                    templateDefined = $(".target-output").data("template-chosen"),
                    template = $("#StepGenerator_Variable").html();
                var varDesc = {
                    "VARNAME": Name,
                    "VARVAL": Value,
                    "VARDESC": description,
                    "VarBttnNM":Mode,
                    "VarBttnID":BttnID
                }
            
                var html = Mustache.to_html(template, varDesc);
                return html
            }

///Varibale Form Validator
            $('#variableForm')
            .form({
              fields: {
                name: {
                  identifier: 'var-name',
                  rules: [
                    {
                      type   : 'empty',
                      prompt : 'Please enter variable name'
                    }
                  ]
                }
              }
            })

        //  Cancel Varibale Acttion  
        $(document).on('click','#CancelVariable',function(){
            $('#VariableGenContainer').remove();
            DisplayDropZone();
            initalizeDropZone();
        });

        //Add Varibale to Test Varibale List
        $(document).on('click','#AddVarStep',function(){
        
            var stepVarType=$('#varStepDropDown').dropdown('get value');
            var stepVarName=$('#varStepName').val();
            var stepVarValue=$('#varStepValue').val();
            var stepVarDesc=$('#varStepDesc').val();
           
            if (stepVarValue==""){
                var StepText="Create Variable {" +stepVarName+"} of type {"+stepVarType+"}";
            } else{
                var StepText="Create Variable {" +stepVarName+"} of type {"+stepVarType+"} with value {"+stepVarValue+"}";
            }

  
        //   addStep('yes','#2185d0', StepText,'Some OR','Some OBject','Some Method','Some Parameters');
            $('#variableList').append( '<button class="ui mini circular icon button varButton '+stepVarType+'" stepValue="'+stepVarValue+'" stepDesc="'+stepVarDesc+'">'+stepVarName+'<i class="close icon"></i></button>')
          
            //initlaize Close button for the newly added varibale
            $('.close').on('click',function(){
                $(this).closest('button').remove();
              })

            //Reset back to drop zone
            $('#VariableGenContainer').remove();
            DisplayDropZone();
            initalizeDropZone();
              
        });


        //Update Varibale in Test Varibale List
        $(document).on('click','#UpdtVarStep',function(){
            
                var stepVarType=$('#varStepDropDown').dropdown('get value');
                var stepVarName=$('#varStepName').val();
                var stepVarValue=$('#varStepValue').val();
                var stepVarDesc=$('#varStepDesc').val();
                

                var findVar=$('#UpdtVarStep').attr('origVarName');
               // var VariblTpUpdt=$('#variableList :button:contains(Value '+stepVarName+')');
                for(x=0;x<$('#variableList :button').length;x++){
                    if ($('#variableList :button')[x].textContent==findVar){
                        var foundVaribl= $('#variableList :button')[x];
                        $(foundVaribl).attr("stepdesc",stepVarDesc);
                        $(foundVaribl).attr('stepvalue',stepVarValue);
                        $('#variableList :button')[x].childNodes[0].nodeValue=stepVarName;
                      // $(foundVaribl).html( stepVarName+'<i class="close icon"></i>');
                     if (stepVarType=='Integer'){
                        if ( $(foundVaribl).hasClass('Integer')==true){
                            //Do nothing
                        }else{
                            $(foundVaribl).removeClass( "String" );
                            $(foundVaribl).addClass( "Integer" )
                        }
                     }else{
                        $(foundVaribl).removeClass( "Integer" );
                        $(foundVaribl).addClass( "String" )
                     }
                    }
                }
                  //Reset back to Drop zone
                  $('#VariableGenContainer').remove();
                  DisplayDropZone();
                  initalizeDropZone();
            });


  
         //Repopulate Varibale Generator Container
        $(document).on('click','.varButton',function(){               
                var VarName=$(this).text();
                var VarDesc=$(this).attr('stepdesc');
                var VarValue=$(this).attr('stepvalue');
                if ($(this).hasClass('Integer')==true){
                    VarType='Integer';
                }else{
                    VarType='String';
                }
                   // tmpArr.push=([VarType,VarName,VarDesc,VarValue])
                    setVaribaleSelector("Update",VarName,VarType,VarValue,VarDesc)
            
        })




        //populate Variable selector on 
        function getVaribaleList(){
            var varList=[];
            for(var x=0;x<$('#variableList :button').length;x++){
               
                  var  VarType
                    var foundVaribl= $('#variableList :button')[x];
                    var VarName=$(foundVaribl).text();
                   var VarDesc= $(foundVaribl).attr("stepdesc");
                   var VarValue= $(foundVaribl).attr('stepvalue');
                  // $(foundVaribl).html( stepVarName+'<i class="close icon"></i>');
                    if ( $(foundVaribl).hasClass('Integer')==true){
                        VarType="Integer"
                    }else{
                        VarType="String"
                    }
                    varList[x]=([VarType,VarName,VarDesc,VarValue])
            }
           return varList;
            
        }

//Handle Conditional Statements
///Handle Variables
  //Mode can be Add or Update
  function setConditionalSelector(Mode,Name,Type,Value,description){
    //Remove Drop Zone Div before adding Action Selector div
    
           $('#dropZoneDiv').remove();
           var varName=Name;
           var varType=Type;
           var varVal=Value;
           var varDesc=description;
           var varBttnId;
           if (Mode=='Add'){
               varBttnId="AddCondStep"
           }else{
               varBttnId="UpdtCondStep"
           }
           var divHtml = loadCondSelector(Mode,varName,varType,varVal,varDesc,varBttnId);
           var VarToUse=getVaribaleList()
           $('#StepObjectDropCntnr').html(divHtml);
           $('#ConditionTab .item').tab();
           $('#IfVarDropDown').dropdown();
           var y=VarToUse.length;
           for(var x=0;x<y;x++){
            $('#IfVarDropDown .menu').append('<div class="item"  data-value='+VarToUse[x][1]+'>'+VarToUse[x][1]+'</div>');
           }
           $('#IfVarDropDown').dropdown('refresh');



           $('#IfOprtrDropDown').dropdown('set selected', 'lessThan');
           $('#IfRghtVarDropDown').dropdown();
           var y=VarToUse.length;
           for(var x=0;x<y;x++){
            $('#IfRghtVarDropDown .menu').append('<div class="item"  data-value='+VarToUse[x][1]+'>'+VarToUse[x][1]+'</div>');
           }
           $('#IfVarDropDown').dropdown('refresh');

           $('#ElseIfVarDropDown').dropdown();
           $('#ElseIfOprtrDropDown').dropdown('set selected', 'lessThan');
           $('#ElseIfRghtVarDropDown').dropdown();
           

}

//Set the Object Selector HTML to variable      
function loadCondSelector(Mode,leftSideVariable,operator,RightSideVariable,description,BttnID) {
   var targetContainer = $(".target-output"),
       templateDefined = $(".target-output").data("template-chosen"),
       template = $("#ConditionalStatement").html();
   var varDesc = {
       "CondDESC": description,
       "CondBttnID":'CondBttn'+Mode,
       "CondBttnNM":Mode
   }

   var html = Mustache.to_html(template, varDesc);
   return html
}

//Conditional Add Button Handler
$(document).on('click','#CondBttnAdd',function(){
    $('#CondStatementGenContainer').remove();
    DisplayDropZone();
    initalizeDropZone();
});

//Conditional Cancel Button
$(document).on('click','#CondtnlCancel',function(){
    $('#CondStatementGenContainer').remove();
    DisplayDropZone();
    initalizeDropZone();
});



    
    })