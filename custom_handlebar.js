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
        if (args[i][time].substring(args[i][time].length - 2, args[i][time].length) == "AM")
            output += "<li><span class=\"time-text AM\">"
        else
            output += "<li><span class=\"time-text PM\">"
        output += args[i][time].substring(0, args[i][time].length - 2) + "</span></li>"
    }

    return output;
}



module.exports.attach_custom_handles = function(handlebar){
    handlebar.registerHelper("timeIndex", module.exports.getTimeIndex);
    handlebar.registerHelper("dayCol", module.exports.getDayColumn);
    handlebar.registerHelper("ifDay", function(day, check, out){
        if(check[day]){return String(out);}
        return "";
    });
}