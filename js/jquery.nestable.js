///Aman: Note this script is customized and should not be replaced with default downloaded copy from GithUB

/*!
 * Nestable jQuery Plugin - Copyright (c) 2012 David Bushell - http://dbushell.com/
 * Dual-licensed under the BSD or MIT licenses
 */
;(function($, window, document, undefined)
{
    var hasTouch = 'ontouchstart' in document;

    /**
     * Detect CSS pointer-events property
     * events are normally disabled on the dragging element to avoid conflicts
     * https://github.com/ausi/Feature-detection-technique-for-pointer-events/blob/master/modernizr-pointerevents.js
     */
    var hasPointerEvents = (function()
    {
        var el    = document.createElement('div'),
            docEl = document.documentElement;
        if (!('pointerEvents' in el.style)) {
            return false;
        }
        el.style.pointerEvents = 'auto';
        el.style.pointerEvents = 'x';
        docEl.appendChild(el);
        var supports = window.getComputedStyle && window.getComputedStyle(el, '').pointerEvents === 'auto';
        docEl.removeChild(el);
        return !!supports;
    })();

    var defaults = {
            listNodeName      : 'ol',
            itemNodeName      : 'li',
            rootClass         : 'dd',
            listClass         : 'dd-list',
            itemClass         : 'dd-item',
            dragClass         : 'dd-dragel',
            handleClass       : 'dd-handle',
            collapsedClass    : 'dd-collapsed',
            placeClass        : 'dd-placeholder',
            noDragClass       : 'dd-nodrag',
            emptyClass        : 'dd-empty',
            expandBtnHTML     : '<button data-action="expand" type="button">Expand</button>',
            collapseBtnHTML   : '<button data-action="collapse" type="button">Collapse</button>',
            group             : 0,
            maxDepth          : 5,
            threshold         : 20,
            noChildrenClass   : 'dd-nochildren',
            scroll: true,
            scrollSensitivity: 1,
            scrollSpeed: 5,
            scrollTriggers: {
                top: 40,
                left: 40,
                right: -40,
                bottom: -40
            },
            removeRowButton   : '<a title="Remove Row" class="removeButton pull-right" data-action="removeRow">X</a>'
        };

    function Plugin(element, options)
    {
        this.w  = $(document);
        this.el = $(element);
        this.options = $.extend({}, defaults, options);
        this.init();
    }

    Plugin.prototype = {

        init: function()
        {
            var list = this;

            list.reset();

            list.el.data('nestable-group', this.options.group);

            list.placeEl = $('<div class="' + list.options.placeClass + '"/>');

            $.each(this.el.find(list.options.itemNodeName), function(k, el) {
                list.setParent($(el));
            });

            list.el.on('click', 'button', function(e) {
                if (list.dragEl) {
                    return;
                }
                var target = $(e.currentTarget),
                    action = target.data('action'),
                    item   = target.parent(list.options.itemNodeName);
                if (action === 'collapse') {
                    list.collapseItem(item);
                }
                if (action === 'expand') {
                    list.expandItem(item);
                }
            });

            list.el.on('click', 'a', function(e) {
                if (list.dragEl) {
                    return;
                }
                var target = $(e.currentTarget),
                    action = target.data('action'),
                    item   = target.parent().parent(list.options.itemNodeName);

                if (action === 'addRowAbove') {
                    list.addRowAbove(list,item);
                }
                if (action === 'addRowBelow') {
                    list.addRowBelow(list,item);
                }
                if (action === 'removeRow') {
                    var imParent=item.parents('li:eq(0)')
                    item.remove();
                //Aman
                        imParent.removeClass('dd-collapsed');
                        imParent.children('[data-action]').remove();
                        imParent.children('ol').remove();
                       
                    list.el.trigger('change');
                }
            });

            var onStartEvent = function(e)
            {
                var handle = $(e.target);
                if (!handle.hasClass(list.options.handleClass)) {
                    if (handle.closest('.' + list.options.noDragClass).length) {
                        return;
                    }
                    handle = handle.closest('.' + list.options.handleClass);
                }

                if (!handle.length || list.dragEl) {
                    return;
                }

                list.isTouch = /^touch/.test(e.type);
                if (list.isTouch && e.touches.length !== 1) {
                    return;
                }

                e.preventDefault();
                list.dragStart(e.touches ? e.touches[0] : e);
            };

            var onMoveEvent = function(e)
            {
                if (list.dragEl) {
                    e.preventDefault();
                    list.dragMove(e.touches ? e.touches[0] : e);
                }
            };

            var onEndEvent = function(e)
            {
                if (list.dragEl) {
                    e.preventDefault();
                    list.dragStop(e.touches ? e.touches[0] : e);
                }
            };

            if (hasTouch) {
                list.el[0].addEventListener('touchstart', onStartEvent, false);
                window.addEventListener('touchmove', onMoveEvent, false);
                window.addEventListener('touchend', onEndEvent, false);
                window.addEventListener('touchcancel', onEndEvent, false);
            }

            list.el.on('mousedown', onStartEvent);
            list.w.on('mousemove', onMoveEvent);
            list.w.on('mouseup', onEndEvent);

        },

        serialize: function()
        {
            var data,
                depth = 0,
                list  = this;
                step  = function(level, depth)
                {
                    var array = [ ],
                        items = level.children(list.options.itemNodeName);
                    items.each(function()
                    {
                        var li   = $(this),
                            item = $.extend({}, li.data()),
                            sub  = li.children(list.options.listNodeName);
                        if (sub.length) {
                            item.children = step(sub, depth + 1);
                        }
                        array.push(item);
                    });
                    return array;
                };
            data = step(list.el.find(list.options.listNodeName).first(), depth);
            return data;
        },

        serialise: function()
        {
            return this.serialize();
        },

        reset: function()
        {
            this.mouse = {
                offsetX   : 0,
                offsetY   : 0,
                startX    : 0,
                startY    : 0,
                lastX     : 0,
                lastY     : 0,
                nowX      : 0,
                nowY      : 0,
                distX     : 0,
                distY     : 0,
                dirAx     : 0,
                dirX      : 0,
                dirY      : 0,
                lastDirX  : 0,
                lastDirY  : 0,
                distAxX   : 0,
                distAxY   : 0
            };
            this.isTouch    = false;
            this.moving     = false;
            this.dragEl     = null;
            this.dragRootEl = null;
            this.dragDepth  = 0;
            this.hasNewRoot = false;
            this.pointEl    = null;
        },

        expandItem: function(li)
        {
            li.removeClass(this.options.collapsedClass);
            li.children('[data-action="expand"]').hide();
            li.children('[data-action="collapse"]').show();
            li.children(this.options.listNodeName).show();
        },

        collapseItem: function(li)
        {
            var lists = li.children(this.options.listNodeName);
            if (lists.length) {
                li.addClass(this.options.collapsedClass);
                li.children('[data-action="collapse"]').hide();
                li.children('[data-action="expand"]').show();
                li.children(this.options.listNodeName).hide();
            }
        },

        expandAll: function()
        {
            var list = this;
            list.el.find(list.options.itemNodeName).each(function() {
                list.expandItem($(this));
            });
        },

        collapseAll: function()
        {
            var list = this;
            list.el.find(list.options.itemNodeName).each(function() {
                list.collapseItem($(this));
            });
        },

        setParent: function(li)
        {
            if (li.children(this.options.listNodeName).length) {
                li.prepend($(this.options.expandBtnHTML));
                li.prepend($(this.options.collapseBtnHTML));
            }
            li.children('[data-action="expand"]').hide();
        },

        unsetParent: function(li)
        {
            li.removeClass(this.options.collapsedClass);
            li.children('[data-action]').remove();
            li.children(this.options.listNodeName).remove();
        },

        dragStart: function(e)
        {
            var mouse    = this.mouse,
                target   = $(e.target),
                dragItem = target.closest(this.options.itemNodeName);

            this.placeEl.css('height', dragItem.height());

            mouse.offsetX = e.offsetX !== undefined ? e.offsetX : e.pageX - target.offset().left;
            mouse.offsetY = e.offsetY !== undefined ? e.offsetY : e.pageY - target.offset().top;
            mouse.startX = mouse.lastX = e.pageX;
            mouse.startY = mouse.lastY = e.pageY;

            this.dragRootEl = this.el;

            this.dragEl = $(document.createElement(this.options.listNodeName)).addClass(this.options.listClass + ' ' + this.options.dragClass);
            this.dragEl.css('width', dragItem.width());

            dragItem.after(this.placeEl);
            dragItem[0].parentNode.removeChild(dragItem[0]);
            dragItem.appendTo(this.dragEl);

            $(document.body).append(this.dragEl);
            this.dragEl.css({
                'left' : e.pageX - mouse.offsetX,
                'top'  : e.pageY - mouse.offsetY
            });
            // total depth of dragging item
            var i, depth,
                items = this.dragEl.find(this.options.itemNodeName);
            for (i = 0; i < items.length; i++) {
                depth = $(items[i]).parents(this.options.listNodeName).length;
                if (depth > this.dragDepth) {
                    this.dragDepth = depth;
                }
            }
        },

        dragStop: function(e)
        {
            var el = this.dragEl.children(this.options.itemNodeName).first();
            el[0].parentNode.removeChild(el[0]);
            this.placeEl.replaceWith(el);

            this.dragEl.remove();
            this.el.trigger('change');
            if (this.hasNewRoot) {
                this.dragRootEl.trigger('change');
            }
            this.reset();
        },

        dragMove: function(e)
        {
            var list, parent, prev, next, depth,
                opt   = this.options,
                mouse = this.mouse;

            this.dragEl.css({
                'left' : e.pageX - mouse.offsetX,
                'top'  : e.pageY - mouse.offsetY
            });

            // mouse position last events
            mouse.lastX = mouse.nowX;
            mouse.lastY = mouse.nowY;
            // mouse position this events
            mouse.nowX  = e.pageX;
            mouse.nowY  = e.pageY;
            // distance mouse moved between events
            mouse.distX = mouse.nowX - mouse.lastX;
            mouse.distY = mouse.nowY - mouse.lastY;
            // direction mouse was moving
            mouse.lastDirX = mouse.dirX;
            mouse.lastDirY = mouse.dirY;
            // direction mouse is now moving (on both axis)
            mouse.dirX = mouse.distX === 0 ? 0 : mouse.distX > 0 ? 1 : -1;
            mouse.dirY = mouse.distY === 0 ? 0 : mouse.distY > 0 ? 1 : -1;
            // axis mouse is now moving on
            var newAx   = Math.abs(mouse.distX) > Math.abs(mouse.distY) ? 1 : 0;

            // do nothing on first move
            if (!mouse.moving) {
                mouse.dirAx  = newAx;
                mouse.moving = true;
                return;
            }

            // do scrolling if enable
            if (opt.scroll) {
                if (typeof window.jQuery.fn.scrollParent !== 'undefined') {
                    var scrolled = false;
                    var scrollParent = this.el.scrollParent()[0];
                    if (scrollParent !== document && scrollParent.tagName !== 'HTML') {
                        if ((opt.scrollTriggers.bottom + scrollParent.offsetHeight) - e.pageY < opt.scrollSensitivity)
                            scrollParent.scrollTop = scrolled = scrollParent.scrollTop + opt.scrollSpeed;
                        else if (e.pageY - opt.scrollTriggers.top < opt.scrollSensitivity)
                            scrollParent.scrollTop = scrolled = scrollParent.scrollTop - opt.scrollSpeed;

                        if ((opt.scrollTriggers.right + scrollParent.offsetWidth) - e.pageX < opt.scrollSensitivity)
                            scrollParent.scrollLeft = scrolled = scrollParent.scrollLeft + opt.scrollSpeed;
                        else if (e.pageX - opt.scrollTriggers.left < opt.scrollSensitivity)
                            scrollParent.scrollLeft = scrolled = scrollParent.scrollLeft - opt.scrollSpeed;
                    } else {
                        if (e.pageY - $(document).scrollTop() < opt.scrollSensitivity)
                            scrolled = $(document).scrollTop($(document).scrollTop() - opt.scrollSpeed);
                        else if ($(window).height() - (e.pageY - $(document).scrollTop()) < opt.scrollSensitivity)
                            scrolled = $(document).scrollTop($(document).scrollTop() + opt.scrollSpeed);

                        if (e.pageX - $(document).scrollLeft() < opt.scrollSensitivity)
                            scrolled = $(document).scrollLeft($(document).scrollLeft() - opt.scrollSpeed);
                        else if ($(window).width() - (e.pageX - $(document).scrollLeft()) < opt.scrollSensitivity)
                            scrolled = $(document).scrollLeft($(document).scrollLeft() + opt.scrollSpeed);
                    }
                } else {
                    console.warn('To use scrolling you need to have scrollParent() function, check documentation for more information');
                }
            }

            if (this.scrollTimer) {
                clearTimeout(this.scrollTimer);
            }

            if (opt.scroll && scrolled) {
                this.scrollTimer = setTimeout(function() {
                    $(window).trigger(e);
                }, 10);
            }

            // calc distance moved on this axis (and direction)
            if (mouse.dirAx !== newAx) {
                mouse.distAxX = 0;
                mouse.distAxY = 0;
            } else {
                mouse.distAxX += Math.abs(mouse.distX);
                if (mouse.dirX !== 0 && mouse.dirX !== mouse.lastDirX) {
                    mouse.distAxX = 0;
                }
                mouse.distAxY += Math.abs(mouse.distY);
                if (mouse.dirY !== 0 && mouse.dirY !== mouse.lastDirY) {
                    mouse.distAxY = 0;
                }
            }
            mouse.dirAx = newAx;

            /**
             * move horizontal
             */
            if (mouse.dirAx && mouse.distAxX >= opt.threshold) {
                // reset move distance on x-axis for new phase
                mouse.distAxX = 0;
                prev = this.placeEl.prev(opt.itemNodeName);
                // increase horizontal level if previous sibling exists and is not collapsed
                if (mouse.distX > 0 && prev.length && !prev.hasClass(opt.collapsedClass) && !prev.hasClass(opt.noChildrenClass)) {
                    // cannot increase level when item above is collapsed
                    list = prev.find(opt.listNodeName).last();
                    // check if depth limit has reached
                    depth = this.placeEl.parents(opt.listNodeName).length;
                    if (depth + this.dragDepth <= opt.maxDepth) {
                        // create new sub-level if one doesn't exist
                        if (!list.length) {
                            list = $('<' + opt.listNodeName + '/>').addClass(opt.listClass);
                            list.append(this.placeEl);
                            prev.append(list);
                            this.setParent(prev);
                        } else {
                            // else append to next level up
                            list = prev.children(opt.listNodeName).last();
                            list.append(this.placeEl);
                        }
                    }
                }
                // decrease horizontal level
                if (mouse.distX < 0) {
                    // we can't decrease a level if an item preceeds the current one
                    next = this.placeEl.next(opt.itemNodeName);
                    if (!next.length) {
                        parent = this.placeEl.parent();
                        this.placeEl.closest(opt.itemNodeName).after(this.placeEl);
                        if (!parent.children().length) {
                            this.unsetParent(parent.parent());
                        }
                    }
                }
            }

            var isEmpty = false;

            // find list item under cursor
            if (!hasPointerEvents) {
                this.dragEl[0].style.visibility = 'hidden';
            }
            this.pointEl = $(document.elementFromPoint(e.pageX - document.body.scrollLeft, e.pageY - (window.pageYOffset || document.documentElement.scrollTop)));
            if (!hasPointerEvents) {
                this.dragEl[0].style.visibility = 'visible';
            }
            if (this.pointEl.hasClass(opt.handleClass)) {
                this.pointEl = this.pointEl.parent(opt.itemNodeName);
            }
            if (this.pointEl.hasClass(opt.emptyClass)) {
                isEmpty = true;
            }
            else if (!this.pointEl.length || !this.pointEl.hasClass(opt.itemClass)) {
                return;
            }

            // find parent list of item under cursor
            var pointElRoot = this.pointEl.closest('.' + opt.rootClass),
                isNewRoot   = this.dragRootEl.data('nestable-id') !== pointElRoot.data('nestable-id');

            /**
             * move vertical
             */
            if (!mouse.dirAx || isNewRoot || isEmpty) {
                // check if groups match if dragging over new root
                if (isNewRoot && opt.group !== pointElRoot.data('nestable-group')) {
                    return;
                }
                // check depth limit
                depth = this.dragDepth - 1 + this.pointEl.parents(opt.listNodeName).length;
                if (depth > opt.maxDepth) {
                    return;
                }
                var before = e.pageY < (this.pointEl.offset().top + this.pointEl.height() / 2);
                    parent = this.placeEl.parent();
                // if empty create new list to replace empty placeholder
                if (isEmpty) {
                    list = $(document.createElement(opt.listNodeName)).addClass(opt.listClass);
                    list.append(this.placeEl);
                    this.pointEl.replaceWith(list);
                }
                else if (before) {
                    this.pointEl.before(this.placeEl);
                }
                else {
                    this.pointEl.after(this.placeEl);
                }
                if (!parent.children().length) {
                    this.unsetParent(parent.parent());
                }
                if (!this.dragRootEl.find(opt.itemNodeName).length) {
                    this.dragRootEl.append('<div class="' + opt.emptyClass + '"/>');
                }
                // parent root list has changed
                if (isNewRoot) {
                    this.dragRootEl = pointElRoot;
                    this.hasNewRoot = this.el[0] !== this.dragRootEl[0];
                }
            }
        },

        addRowAbove: function(list,item) {
            var nestableList = list.el.attr("id");
            var idValue = parseInt($("#"+nestableList+" ol > li").length) + 1;

            var rowHtml = '<li class="dd-item dd3-item" data-id="'+idValue+'">'+
                            '<div class="dd-handle dd3-handle">&nbsp;</div>'+
                            '<div class="dd3-content">'+
                                 '<span>Step<span>'+
            '<span id="stepid">'+1+'</span>'+
          '<a title="Remove Row" class="removeButton pull-right" data-action="removeRow">X</a>'+
                            '</div>'+
                          '</li>';
            rowHtml = $(rowHtml);
            
            $(rowHtml).insertBefore(item);
            list.el.trigger('change');
        },

        addRowBelow: function(list,item) {
            var nestableList = list.el.attr("id");
            var idValue = parseInt($("#"+nestableList+" ol > li").length) + 1;

             var rowHtml = '<li class="dd-item dd3-item" data-id="'+idValue+'">'+
                            '<div class="dd-handle dd3-handle">&nbsp;</div>'+
                            '<div class="dd3-content">'+
                                 '<span>Step<span>'+
            '<span id="stepid">'+idValue+'</span>'+
          '<a title="Remove Row" class="removeButton pull-right" data-action="removeRow">X</a>'+
                            '</div>'+
                          '</li>';
            rowHtml = $(rowHtml);

            $(rowHtml).insertAfter(item);
            list.el.trigger('change');
        },

        serializeText: function() {
            var data,
                depth = 0,
                list  = this;
                step  = function(level, depth)
                {
                    var array = [ ],
                        items = level.children(list.options.itemNodeName);
                    items.each(function()
                    {
                        var li   = $(this),
                            item = {},
                            sub  = li.children(list.options.listNodeName);
                        item["text"] = li.children(".dd3-content").children(".inputField").val();
                        /*item["text"] = */
                        if (sub.length) {
                            item.children = step(sub, depth + 1);
                        }
                        array.push(item);
                    });
                    return array;
                };
            data = step(list.el.find(list.options.listNodeName).first(), depth);
            return data;
        },

        serializeWithText: function() {
            var data,
                depth = 0,
                list  = this;
                step  = function(level, depth)
                {
                    var array = [ ],
                        items = level.children(list.options.itemNodeName);
                    items.each(function()
                    {
                        var li   = $(this),
                            item = $.extend({}, li.data()),
                            sub  = li.children(list.options.listNodeName);
                        item["text"] = li.children(".dd3-content").children(".inputField").val();
                        /*item["text"] = */
                        if (sub.length) {
                            item.children = step(sub, depth + 1);
                        }
                        array.push(item);
                    });
                    return array;
                };
            data = step(list.el.find(list.options.listNodeName).first(), depth);
            return data;
        }

    };

    $.fn.nestable = function(params)
    {
        var lists  = this,
            retval = this;

        lists.each(function()
        {
            var plugin = $(this).data("nestable");

            if (!plugin) {
                $(this).data("nestable", new Plugin(this, params));
                $(this).data("nestable-id", new Date().getTime());
            } else {
                if (typeof params === 'string' && typeof plugin[params] === 'function') {
                    retval = plugin[params]();
                }
            }
        });

        return retval || lists;
    };

})(window.jQuery || window.Zepto, window, document);

















var updateOutput = function(e)
        {
            var list   = e.length ? e : $(e.target),
                output = list.data('output');
            if (window.JSON) {
                output.val(window.JSON.stringify(list.nestable('serialize')));//, null, 2));
            } else {
                output.val('JSON browser support required for this demo.');
            }
        };

        // activate Nestable for list 1
     


        $('#nestable-menu').on('click', function(e)
        {
            var target = $(e.target),
                action = target.data('action');
            if (action === 'expand-all') {
                $('.dd').nestable('expandAll');
            }
            if (action === 'collapse-all') {
                $('.dd').nestable('collapseAll');
            }
        });

        /* -- My Code - Nalin Sajwan -- */

        var updateOutputCustom = function(e) {
            var list   = e.length ? e : $(e.target),
                output = list.data('output');
            
            if (window.JSON) {
                output.val(window.JSON.stringify(list.nestable('serializeText')));//, null, 2));

                //Use code below instead of above to get id'z with text inputs

                /*output.val(window.JSON.stringify(list.nestable('serializeWithText')));*/
            } else {
                output.val('JSON browser support required for this demo.');
            }
        };

        $('#nestable').nestable().on('change', function() {
            updateOutputCustom($('#nestable').data('output', $('#nestable-output')));

            $('.inputField').off();

            $('.inputField').on('focusout',function() {
                $('#nestable').trigger("change");
            });
        });

        // output initial serialised data
        updateOutputCustom($('#nestable').data('output', $('#nestable-output')));

        var addNewRow =  function(nestableId) {

            var list = $(nestableId).nestable();
            
            var idValue = parseInt($(nestableId+' ol > li').length) + 1;

            

            var rowHtml = '<li class="dd-item dd3-item" data-id="'+idValue+'">'+
                            '<div class="dd-handle dd3-handle">&nbsp;</div>'+
                            '<div class="dd3-content">'+
                                 '<span>Step<span>'+
            '<span id="stepid">'+idValue+'</span>'+
          '<a title="Remove Row" class="removeButton pull-right" data-action="removeRow">X</a>'+
                            '</div>'+
                          '</li>';

            rowHtml = $(rowHtml);

            $(nestableId+" > ol").append(rowHtml);
            $(nestableId).trigger("change");
        };

        $('#nestable-menu').on('click', function(e) {
            var target = $(e.target),
                action = target.data('action');
            if (action === 'expand-all') {
                $('#nestable').nestable('expandAll');
            }
            if (action === 'collapse-all') {
                $('#nestable').nestable('collapseAll');
            }
            if (action === 'add-new-row') {
                addNewRow('#nestable');
            }
        });






//////Aman

            $("#nestable-menu").on("click", function(e) {
                var target = $(e.target),
                action = target.data("action");
                if (action === "expand-all") {
                $(".dd").nestable("expandAll");
                }
                if (action === "collapse-all") {
                $(".dd").nestable("collapseAll");
                }
                if (action === "Serialize") {
                        $("#nestable .stepid").each(function(i) {
                    var humanNum = i + 1;
                          console.log(humanNum)
                    $(this).html(humanNum + "");
                        $(".dd").attr("data-id",humanNum);
                        //$("#nestable-output").val($(".dd").attr("data-id"))
                });
                $("#nestable-output").val(window.JSON.stringify($("#nestable").nestable('serialize')))
                $("#nestable-output1").val(window.JSON.stringify($("#nestable").nestable('toArray')))
                }
                
                if (action === "Add") {
                var Ids=[];
                $("#nestable .dd-item").each(function(i) {
                    console.log($(this).attr("data-id"))
                        Ids.push(parseInt($(this).attr("data-id")));
                });
                if (Ids.length==0){
                    Ids.push(0)
                    //remove Empty Placeholder

                    $(".dd-empty").remove();
                }
                var maxid=Math.max.apply(null,Ids)+1
                    

                    var StepText="Click Link"
                    var nodeHtml='<li class="dd-item no-parent" data-id='+maxid+'><div class="dd-handle ">Step <span class="stepid">'+maxid+'</span><span class="Object-Desc">'+StepText+'<Help></span><button class="ui compact right floated icon button" style="padding:1px"><i class="red trash icon"></i></button></li>'
                    $("#nestable > ol").append(nodeHtml)
            }
            });