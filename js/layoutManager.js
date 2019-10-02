$(function(){
    function getContent(selector) {
        var $el = $(selector);
        var html = $el.html();
        $el.remove();
        return html;
    }

var baseLayoutConfig = {
                  settings: {
                      hasHeaders: true,
                      constrainDragToContainer: true,
                      reorderEnabled: true,
                      selectionEnabled: false,
                      popoutWholeStack: false,
                      blockedPopoutsThrowError: true,
                      closePopoutsOnUnload: true,
                      showPopoutIcon: false,
                      showMaximiseIcon: true,
                      showCloseIcon: true
                  },
                  dimensions: {
                      borderWidth: 2,
                      minItemHeight: 10,
                      minItemWidth: 10,
                      headerHeight: 20,
                      dragProxyWidth: 300,
                      dragProxyHeight: 200
                  },
                  labels: {
                      close: 'close',
                      maximise: 'maximize',
                      minimise: 'minimize',
                      popout: 'open in new window'
                  },
                  content: [{
                      type: 'column',
                      content: [{
                              type: 'component',
                              height: 4,
                              id: 'layoutTopCol',
                              header: {
                                  show: false,
                                  maximize: false,
                                  minimize: 'minimize',
                                  popout: false,
                                  close: 'Close',
                                  frozen: true
                              },
                              componentName: 'appHeader',
                              componentState: {
                                  html: getContent('#topHeader'),
                                  text: 'Header'
                              }
                          },
                          {
                              type: 'column',
                              content: [{
                                  type: 'row',
                                  width: 20,
                                  id: 'layoutMiddleRow',
                                  content: [{
                                          type: 'column',
                                          width: 20,
                                          content: [{
                                                  type: 'component',
                                                  height: 3,
                                                  id: 'TreeManagerLabelContr',
                                                  header: {
                                                      show: false,
                                                      maximize: false,
                                                      popout: false,
                                                      close: 'Close',
                                                      frozen: true
                                                  },
                                                  componentName: 'TreeMgrLbl',
                                                  componentState: {
                                                      html: getContent('#TreeManagerLabel'),
                                                      text: 'Object Manager'
                                                  }
                                              },
                                              {
                                                  type: 'component',
                                                  componentName: 'objTreeComp',
                                                  id: 'LayOutObjTree',
                                                  componentState: {
                                                      html: getContent('#objTreeOuterDiv')
                                                  },
                                                  title: 'Object Tree'
                                              },
                                              {
                                                  type: 'component',
                                                  componentName: 'objPropComp',
                                                  id: 'LayOutObjProp',
                                                  componentState: {
                                                      text: 'Object Properties',
                                                      html: getContent('#layoutObjPropDiv')
                                                  },
                                                  title: 'Object Properties'
                                              }
                                          ]
                                      },
                                      {
                                          type: 'component',
                                          id: 'LayOutTestMgr',
                                          componentName: 'TestMgrComp',

                                          header: {
                                              show: true,
                                              maximize: false,
                                              minimize: 'minimize',
                                              popout: false,
                                              close: 'Close',
                                              frozen: false
                                          },
                                          componentState: {
                                              text: 'Test Manager',
                                              html: getContent('#layoutTestMgrDiv')
                                          },
                                          title: 'Test Manager'
                                      },
                                      /* {
                                                  type: 'component',
                                                  componentName: 'appHelp',
                                                  header: {
                                                      show: true,
                                                      maximize: false,
                                                      minimize: 'minimize',
                                                      popout: false,
                                                      close: 'close',
                                                      frozen: false
                                                  },
                                                  id: 'LayOutHelp',
                                                  isHidden: true,
                                                  width: 18,
                                                  title: 'Help',
                                                  componentState: {
                                                      text: 'Help',
                                                  }
                                              }*/
                                  ]
                              }]
                          },
                          {
                              type: 'component',
                              height: 2,
                              id: 'LayOutFooter',
                              cssClass: 'lyoutfttr',
                              componentName: 'appFooter',
                              header: {
                                  show: false,
                                  maximize: false,
                                  minimize: 'minimize',
                                  popout: false,
                                  close: 'close',
                                  frozen: false
                              },
                              componentState: {
                                  html: getContent('#layoutFooterDiv')
                              }
                          }
                      ]
                  }]

              };


///This Set the base Layout

var baseLayout = new GoldenLayout(baseLayoutConfig);
baseLayout.registerComponent('BaseLayout', function(container, state) {
//container.getElement().html('<h5>' + state.text + '<\/h5>');
});

baseLayout.registerComponent('appHeader', function(container, componentState) {
//container.getElement().html('<iframe width="100%" height="100%" src="mainMenu.html" ><\/iframe>');
container.getElement().html(componentState.html);

});

baseLayout.registerComponent('appFooter', function(container,componentState) {
//var c = function() { return Math.floor( Math.random() * 255 ).toString( 16 ); }
//container.getElement().css( 'background-color', '#' + c() + c() + c() );
    container.getElement().css( 'background-color', '#1E90FF' )
    container.getElement().html(componentState.html);

//var toggleButton = $( '<button>toggle row/column<\/button>' )//.click( toggleRowColumn );
//container.getElement().append( toggleButton );
});
baseLayout.registerComponent('objTreeComp', function(container, componentState) {
    container.getElement().html(componentState.html);
});

baseLayout.registerComponent('objPropComp', function(container, componentState) {
    container.getElement().html(componentState.html);
});

baseLayout.registerComponent('TestMgrComp', function(container, componentState) {
 container.getElement().html(componentState.html);
    //container.getElement().html('<iframe  id="Testframe" width="100%" height="100%" src="TestManager.html" ><\/iframe>');
});


baseLayout.registerComponent('TreeMgrLbl', function(container, componentState) {
container.getElement().html(componentState.html);
});

baseLayout.registerComponent('appHelp', function(container, state) {
//container.getElement().hide();
//container.hide();
container.getElement().html('<h5>' + state.text + '<\/h5>')
});


baseLayout.init();


//Initalize App Help
$('#showAppHelp').on('click',function showHelpWindow(){

          var appHelpConfig ={
            type: 'component',
            componentName: 'appHelp',
            header: {
                show: true,
                maximize: false,
                minimize: 'minimize',
                popout: false,
                close: 'close',
                frozen: false
            },
            id: 'LayOutHelp',
            isHidden: false,
            width: 15,
            title: 'Help',
            componentState: {
                text: 'Help',
            }
        }
            if (baseLayout.root.contentItems[0].contentItems[1].contentItems[0].contentItems.length< 3){
                  baseLayout.root.contentItems[0].contentItems[1].contentItems[0].addChild(appHelpConfig);
            }

} )


//Add Tab for test

$('#AddTestIcon').on('click',function showHelpWindow(){

                          var appHelpConfig ={
                          type: 'component',
                          componentName: 'TestMgrComp',
                          header: {
                              show: true,
                              maximize: false,
                              minimize: 'minimize',
                              popout: false,
                              close: 'close',
                              frozen: false
                          },

                          isHidden: false,
                          width: 18,
                          title: 'untitled',
                          componentState: {
                              text: 'Test',
                              html: getContent('#layoutTestMgrDiv')
                              
                          }
                      }
                          //if (baseLayout.root.contentItems[0].contentItems[1].contentItems[0].contentItems.length< 3){
                                  baseLayout.root.contentItems[0].contentItems[1].contentItems[0].contentItems[1].addChild(appHelpConfig);
                          //}

              } )


})