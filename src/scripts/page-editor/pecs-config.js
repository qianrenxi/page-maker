var pecs = {
    section: {
        template: "<div></div>",
        cssClass: "pec-section pec-empty"
    },
    container: {
        template: "<div></div>",
        cssClass: "pec-container container pec-empty"
    },
    columns: {
        template: "<div class='row'><div class='col-sm-4 pe-element pec-empty'></div><div class='col-sm-4 pe-element pec-empty'></div><div class='col-sm-4 pe-element pec-empty'></div></div>",
        cssClass: "pec-columns"
    },
    grids: {
        template: "<div>grids...</div>",
        cssClass: "pec-grids pec-empty"
    },
    panel: {
        template: "<div class='card card-block'></div>",
        cssClass: "pec-panel pec-empty"
    },

    "div-block": {
        template: "<div></div>",
        cssClass: "pec-empty"
    },
    "link-block": {
        template: "<a href='#'><div class='pe-element pec-empty'></div></a>",
        cssClass: ""
    },
    "button": {
        template: "<button class='btn btn-primary'>Button</button>",
        cssClass: ""
    },

    "heading": {
        template: "<h3>Please entry heading text...</h3>",
        cssClass: ""
    },
    "paragraph": {
        template: "<p>Some browsers on some platforms have issues with animated icons resulting in a jittery wobbling effect. See issue #671 for examples and possible workarounds.</p>",
        cssClass: ""
    },
    "text-link": {
        template: "<a class='btn btn-link'>Link</a>",
        cssClass: ""
    },
    "image": {
        template: "<img src='...'/>",
        cssClass: "pec-empty"
    }
};

module.exports = pecs;