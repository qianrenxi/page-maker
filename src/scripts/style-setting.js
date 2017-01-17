(function($){
    $(".style-setting .ss-control").on("change", function(e){
        var ctrl = $(this),
            name = ctrl.prop("name"),
            value = ctrl.val();
        console.log("ss-control change");
        var s = {};
        s[name] = value;
        $(".page-editor").trigger("styleSetting", [s]);
    });

    $(".style-setting .ss-text-align").on("click", '> button', function(e){
        var ctrl = $(this),
            value = ctrl.data("align");
        var s = {};
        s['text-align'] = value;
        $(".page-editor").trigger("styleSetting", [s]);
    });
})(jQuery);