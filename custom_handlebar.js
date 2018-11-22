/*
 * Tristan Hilbert
 * 11/21/2018
 * Custom Handlebar Helper Function for Calendar Templating
 * 
 */

//TODO
//timeIndex time

module.exports.getTimeIndex = function(args){
    // console.log("==get Time Index is called!");
    // console.log("==args: ", args);
    var output = "";
    for(var i = 0; i < args.length; i ++){
        if (args[i].substring(args[i].length - 2, args[i].length) == "AM")
            output += "<li><span class=\"time-text AM\">"
        else
            output += "<li><span class=\"time-text PM\">"
        output += args[i].substring(0, args[i].length - 2) + "</span></li>"
    }

    return output;
}


//TODO 
//dayCol day @index
module.exports.getDayColumn = function(args){
    // console.log("==get Time Index is called!");
    // console.log("==args: ", args);
    var output = "";
    for(var i = 0; i < args.length; i ++){
        output += "<div class=\"day-column "
        output += args[i] + " col\">"
        for(var j = 0; j < 24; j ++){
            output += "<div class=\"grid-box "
            output += args[i] + "\" id=\"" + i + "-" + j + "\"";
            output += "></div>";
        }              
        output += "</div>";
    }
    return output;
}

module.exports.attach_custom_handles = function(handlebar){
    handlebar.registerHelper("timeIndex", module.exports.getTimeIndex);
    handlebar.registerHelper("dayCol", module.exports.getDayColumn);
}