if (typeof require == "function") {
    var jQuery = require("jquery");
}

(function ($, w) {

    var pe = function (options) {
        var defaults = {
            container: "",
            cover: "",
            elementTag: "pe-element"
        };
        this.options = $.extend(defaults, options);
        options = this.options;

        this.container = $(options.container);
        this.body = this.container.find("body");
        this.cover = $(options.cover);
        this.focursElement = null;
        this.currCover = null;

        var _pe = this;
        /*$(this.body).on('click', "."+this.options.elementTag, function(e){
            var me = $(this);
            console.log(me);
            me.css("background", "#eee");
            _pe.focursElement = me;

            //e.preventDefault(); //终止事件
            e.stopPropagation();    //停止事件冒泡
        });*/
        $(this.cover).on('click', "." + this.options.elementTag, function (e) {
            var me = $(this);
            var el = me.data("el");
            el.css("background", "#eee");
            _pe.focursElement = el;
            _pe.currCover = me;
            e.stopPropagation();
        });
    };

    function _focurs(e) {
        var me = $(this);
        //me.addClass()
    }

    pe.prototype.getFocursElement = function () {
        return this.focursElement;
    };

    pe.prototype.addElement = function (element) {
        element = $(element);
        $(element).addClass(this.options.elementTag);
        var container = this.getFocursElement() || this.body;
        var cover = this.currCover || this.cover;
        $(element).appendTo(container);
        //$(element).appendTo(cover);

        w.setTimeout(function () {
            var h = _handler(element);
            h.children(".pec-handle").hide();
            h.appendTo(cover);

            h.hover(function (e) {
                var el = h.data("el");
                h.data("ec").css({
                    width: el.outerWidth() + "px",
                    height: el.outerHeight() + "px",
                    top: el.position().top + "px",
                    left: el.position().left + "px"
                });
                h.children(".pec-handle").show();
                h.data("ec").css("outline", "#00FF00 dashed 1px");
                e.stopPropagation();
            }, function (e) {
                h.children(".pec-handle").hide();
                h.data("ec").css("outline", "none");
                e.stopPropagation();
            });
        }, 500);
    };

    function _handler(el) {
        me = $(el);
        console.log(
            "width: " + me.width() + "\n" +
            "height:" + me.height() + "\n" +
            "innerWidth: " + me.innerWidth() + "\n" +
            "innderHeight: " + me.innerHeight() + "\n" +
            "outerWidth: " + me.outerWidth() + "\n" +
            "outerHeight: " + me.outerHeight() + "\n" +
            "offset: " + me.offset() + "\n" +
            "position:" + me.position()
        );
        console.log(me.offset());
        console.log(me.position());

        var c = $("<div>").css({
            position: 'absolute',
            top: me.position().top + "px",
            left: me.position().left + "px",
        });
        c.addClass("pe-element");

        var ec = $("<div>").css({
            width: me.outerWidth() + "px",
            height: me.outerHeight() + "px",

            //background: 'rgba(60,60,60, .2)',
            //border: '1px dashed #009',
            //position: 'absolute',
            padding: '0px'
        }).addClass("pe-ec");
        ec.appendTo(c);

        c.data("ec", ec);
        c.data("el", el);

        var h = $("<div> <a href='javascript:void(0);'><i class='fa fa-trash'></i></a></div>").css({
            width: '40px',
            height: '16px',
            top: '-16px',
            left: '0',
            background: '#ccc',
            position: 'absolute'
        }).addClass("pec-handle");
        h.appendTo(c);
        return c;
    }

    w.PageEditor = pe;
})(jQuery, window);