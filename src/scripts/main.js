var PageEditor = require("./page-editor/page-editor");
require("./style-setting");

(function($){
    var pe = new PageEditor();
    //pe.foo();
    //console.log(pe);

    var css = $("<link>").prop("rel", "stylesheet").prop("href", "http://localhost:3000/css/main.css");
    pe.docContainer.contents().find("head").append(css);

    $(".pec").click(function(){
        var me = $(this);
        var pecName = me.data("pecName");
        pe.addElement(pecName);
    });
})(jQuery);
