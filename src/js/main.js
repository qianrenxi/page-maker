if(typeof require == "function"){
    var jQuery = require("jquery");
}

Component = function() {

};

PageEditor = function(opts) {
    PageEditor = function(opts){
    };

    return PageEditor;
};

(function($, w){
    $.fn.handler = function(opts){
        
        //$(this).each(_handler);
        return _handler(this);

        function _handler(el){
            me = $(el);
            console.log(
                "width: " + me.width() + "\n" +
                "height:" + me.height() + "\n" +
                "innerWidth: " + me.innerWidth() + "\n" +
                "innderHeight: " + me.innerHeight() + "\n" +
                "outerWidth: " + me.outerWidth() + "\n" +
                "outerHeight: " +me.outerHeight()
            );

            var h = $("<div>").css({
                width: me.outerWidth() + 4 + "px",
                height: me.outerHeight() + 4 + "px",
                top: me.offset().top - 2 + "px",
                left: me.offset().left - 2 + "px",
                background: 'rgba(60,60,60, .2)',
                border: '1px dashed #009',
                position: 'absolute',
                padding: '2px'
            });
            return h;
        }
    }
})(jQuery, window);

/**
 * 1. 鼠标经过效果，鼠标经过的顶层元素outline虚线高亮，表示当前可选定该元素，鼠标效果为move，表示该元素可移动
 * 2. 鼠标按下(非单击)效果，鼠标按下后元素状态设置为focus状态，outline虚线高亮，focus状态的元素可resize，再次单击可编辑元素内容
 * 3. 单击效果，元素当前处于非focus状态，更新状态为focus状态，若是，则更新元素状态为内容可编辑状态
 * 4. 鼠标按下移动效果，拖动元素
 * 5. 鼠标释放，拖放结束
 * 6. 可编辑元素，输入内容限制，不能输入富文本内容，输入内容结束后，内容校验、过滤和格式化
 */

/**
 * 1. 元素接口定义，布局元素、容器元素、文本元素、媒体元素、表单元素、小工具
 * 2. handler-cover和实体元素的属性和操作上的双向同步问题
 * 3. 不同元素的属性、样式、事件编辑
 * 4. 实体元素结构、元素属性、元素样式、事件处理持久化问题
 * 5. 数据化组件、自定义模板
 * 6. 页面编辑静态化和数据化组件及模板动态切换之间的矛盾问题解决，即如何将编辑的静态页面和类CMS系统整合的问题
 */

(function($, w){
    var css = $("<link>").prop("rel", "stylesheet").prop("href", "http://localhost:3000/css/main.css");

    var btn = $("<a>").text("Primary Button").addClass("btn btn-primary").prop("href", "javascript:void(0);");

    var ed = $("iframe#pm-page-container").contents();
    var hc = $("#pm-handles-cover");

    ed.find("head").append(css);
    ed.find("body").addClass("editable");
    ed.find("body").append("<h1 contenteditable='plaintext-only'>This is a demo page.</h1>");
    ed.find("body").append(btn);

    w.setTimeout(function(){
        $(ed).ready(function(){
            var btn = ed.find("body").find("a");
            var hb = btn.handler().appendTo(hc);

            btn.bind("dblclick", function() {
                $(this).prop("contenteditable", 'plaintext-only');
            });

            btn.on("keydown", function(e){
                //var me = $(e);
                console.log(e);
                /*hb.css({
                    width: me.outerWidth() + 4 + "px",
                    height: me.outerHeight() + 4 + "px"
                });*/
            });
        });
    }, 1000);

    //hc.append(btn.css("background", "#444"));


})(jQuery, window);