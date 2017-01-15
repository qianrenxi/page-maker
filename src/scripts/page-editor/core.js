var Element = require('./element');
var pecs = require('./pecs-config');
//console.log(pecs);

var PageEditor = function (_options) {
    var options = {
        selector: ".page-editor",
        docSelector: ".page-editor > iframe.pe-doc-container",
        layoutSelector: ".page-editor > .pe-layout-container"
    };
    this.options = options = $.extend(options, _options);

    this.editor = $(options.selector);
    this.docContainer = $(options.docSelector);
    this.layoutContainer = $(options.layoutSelector);

    this.elRoot = new Element();
    this.docRoot = this.docContainer.contents().find("body");
    this.layoutRoot = this.layoutContainer;

    this.docRoot.addClass("editable");

    var _pe = this;
    var layoutRoot = $(options.layoutSelector);

    layoutRoot.on('click', function(e) {
        _pe._selectedElement = null;
        $(".pe-element").removeClass("pec-selected");
        e.stopPropagation();
    });

    layoutRoot.on('click', '.pe-element', function (e) {
        var me = $(this);
        _pe._selectedElement = me;
        $(".pe-element").removeClass("pec-selected");
        me.addClass("pec-selected");
        e.stopPropagation();
    });

    layoutRoot.on('click', '.pe-element > .pe-handler .pe-action-delete', function (e) {
        var me = $(this),
            pec = me.parent().parent(),
            el = pec.data("pe");

        el.remove();
        
        refreshRangeOnRemove(pec);

        if(pec.parent().hasClass("pe-element")){
            if(pec.siblings(".pe-element").length == 0){
                el.parent().addClass("pec-empty");
                pec.parent().addClass("pec-empty");
            }
        }

        pec.remove();
        _pe._selectedElement = null;

        e.stopPropagation();
    });

    function refreshRangeOnRemove(el){
        el.siblings(".pe-element").each(function(index, sibling){
            sibling = $(sibling);
            _pe.refreshRange(sibling);
            if(sibling.parent() && sibling.parent().hasClass("pe-element")){
                _pe.refreshRange(sibling.parent());

                if(sibling.parent().siblings(".pe-element").length > 0){
                    refreshRangeOnRemove(sibling.parent());
                }
            }
        });
    }

    layoutRoot.on('mouseover', '.pe-element', function (e) {
        var me = $(this);
        //console.log(me);
        _pe.refreshRange(me);
        me.css('outline', 'dashed 1px #0f0');
        e.stopPropagation();
    });

    layoutRoot.on('mouseout', '.pe-element', function (e) {
        var me = $(this);
        me.css('outline', '');
        e.stopPropagation();
    });
}

PageEditor.prototype.selectedElement = function () {
    return this._selectedElement;
}

PageEditor.prototype.addElement = function (pecName) {
    var pecOpt = pecs[pecName];
    var pec = $(pecOpt.template).addClass("pe-element").addClass(pecOpt.cssClass);

    pec.appendTo(this.selectedElement() ? this.selectedElement().data("pe") : this.docRoot);
    pec.parent().removeClass("pec-empty");
    //console.log(pec.outerHeight());
    this.addToLayout(pec);
};

PageEditor.prototype.addToLayout = function (el, layoutParent) {
    var pec = $(el);
    var lc = $("<div>").addClass("pe-element");
    lc.data("pe", el);
    lc.append(this.getHandler());
    lc.appendTo(layoutParent || this.selectedElement() || this.layoutRoot);
    lc.parent().removeClass("pec-empty");
    this.refreshRange(lc);

    if(pec.children(".pe-element").length > 0){
        var _pe = this;
        pec.children(".pe-element").each(function(i, c){
            _pe.addToLayout(c, lc);
        });
    }

    if (lc.parent().hasClass("pe-element")) {
        this.refreshRange(lc.parent());
    }
};

/**
 * getRangeOfParent
 * @param element: the doc container element.
 */
PageEditor.prototype.getRange = function(element){
    var el = $(element),
        parent = el.parent();
    var range = {
        width: el.outerWidth(),
        height: el.outerHeight(),
        left: (el.offset().left - parent.offset().left),
        top: (el.offset().top - parent.offset().top)
    };
    return range;
};

/**
 * @param element: the layout container element.
 */
PageEditor.prototype.refreshRange = function(element){
    var lel = $(element),
        del = lel.data("pe");
    var range = this.getRange(del);
    //console.log(range);
    lel.css({
        width: range.width + "px",
        height: range.height + "px",
        left: range.left + "px",
        top: range.top + "px"
    });
    //lel.siblings().each(this.refreshRange);
    //this.refreshRange(lel.parent());
};

PageEditor.prototype.getHandler = function () {
    var handler = $("<div>").addClass("pe-handler");

    //添加默认操作
    handler.append($("<a href='javascript:void(0)'></a>")
        .addClass("pe-action-delete")
        .append($("<i>").addClass("fa fa-window-close fa-lg")));

    return handler;
};

module.exports = PageEditor;