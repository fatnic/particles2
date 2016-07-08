var Colours = {


    /*
        Convers an object with properties r,b,g,(alpha) to an rgb/rgba string
    */
    obj2rgba: function(o) {
        var colours = [];
        colours[0] = o.r;
        colours[1] = o.g;
        colours[2] = o.b;
        var colour_list = colours.join();
        if ('a' in o) {
            return 'rgba(' + colour_list + ',' + (o.a).toFixed(2) + ')';
        } else {
            return 'rgb(' + colour_list + ')';
        }
    },

};
