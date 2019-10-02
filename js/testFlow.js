//Test Flow

$(document).ready(function() {
        $('.dd').nestable({
            scroll: true,
            onDragStart: function (l, e) {
                
            }
        });

    //Set Step container as scrollable
      $('#StepCOntainer').slimScroll({
            height: '340px'
        });

        $('.dd').on('change', function() {
            //alert(1)

            $("#nestable .stepid").each(function(i) {
                var humanNum = i + 1;
                $(this).html('Step:'+humanNum + "");
                $(".dd").attr("data-id", humanNum);
                //$("#nestable-output").val($(".dd").attr("data-id"))
                });


        });

        $(".dd").on("click", 'a', function(e) {
            var list = this;
            if (list.dragEl) {
                return;
            }
            var target = $(e.currentTarget),
                action = target.data('action'),
                item   = target.parents('li:eq(0)')

            if (action === 'removeRow') {
             //   item.remove();
                $("#nestable").trigger("change");
              // list.e.trigger('change');
               //$("#nestable").trigger("change");
              // item.el.trigger('change')
             // $(".dd").trigger('change')
              $('#nestable').trigger("change");
///setparent
///unsetparent
              if (item.children.length>0){

              }
            }
        });

        $("#nestable-menu").on("click", function(e) {
            var target = $(e.target),
            action = target.data("action");
            if (action === "expand-all") {
            $(".dd").nestable("expandAll");
            }
            if (action === "collapse-all") {
            $(".dd").nestable("collapseAll");
            }
            if (action === 'removeRow') {
                item.remove();
                //$("#nestable").trigger("change");
                item.el.trigger('change')
            }
            if (action === "Serialize") {
                    $("#nestable .stepid").each(function(i) {
                var humanNum = i + 1;
                $(this).html(humanNum + "");
                    $(".dd").attr("data-id",humanNum);
                    //$("#nestable-output").val($(".dd").attr("data-id"))
            });
            $("#nestable-output").val(window.JSON.stringify($("#nestable").nestable('serialize')))
            $("#nestable-output1").val(window.JSON.stringify($("#nestable").nestable('toArray')))
            }
            
            if (action === "add-new-row") {
                addStep('yes','cyan', 'Click Link','Some OR','Some OBject','Some Method','Some Parameters');
                addStep('No','yellow','Enter Text','Some OR','Some OBject','Some Method','Some Parameters');
            }
        if (action === "removeRow") {
            abc=1
        }
        });
        
    })

    function addStep(stepChildren,stepColor,stepText,OR,Object,action,method,parameters){
        //stepChildren values are yes or no
        if (stepChildren=='yes'){
            stepChildren=''
        }else{
            stepChildren='dd-nochildren'
        }
        var nestableId='#nestable';
        var list = $(nestableId).nestable();
        var idValue = parseInt($(nestableId+' ol > li').length) + 1;
        //dd-nochildren
        var rowHtml = '<li class="dd-item dd3-item '+stepChildren+'" data-id="'+idValue+'">'+
                        '<div class="dd-handle dd3-handle" data-id="'+idValue+'"></div>'+
                        '<div class="dd3-content">'+
                         '<div class="dd3-step" style="background:'+stepColor+'">'+
                                '<span class="stepid">Step'+idValue+'</span>'+
                           '</div>'+
                          '<span style="margin-left:40px">'+stepText+'</span>'+
                            '<a title="Remove Row" class="removeButton pull-right" data-action="removeRow">X</a>'+
                        '</div>'+
                    '</li>';
        rowHtml = $(rowHtml);
        $(nestableId+" > ol").append(rowHtml);
        $(nestableId).trigger("change");

    }