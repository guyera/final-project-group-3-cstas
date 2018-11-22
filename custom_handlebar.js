/*
 * Tristan Hilbert
 * 11/21/2018
 * Custom Handlebar Helper Function for Calendar Templating
 * 
 */

//TODO
//timeIndex time

function getTimeIndex(args){
    console.log("==get Time Index is called!");
    console.log("==args: ", args);
    var output = "<li><span class=\"time-text AM\">"
    output += args + "</span></li>\""

    return output;
}


//TODO 
//dayCol day @index
function getDayColumn(args){
    console.log("==get Time Index is called!");
    console.log("==args: ", args);
    var output = "<div class=\"day-column "
    output += args[0] + " col\">"
                        
    output += "</div>";
    return output;
}

 module.exports = {
    attach_custom_handles = function(handlebar){
        handlebar.registerHelper("timeIndex", getTimeIndex);
        handlebar.registerHelper("dayCol", getDayColumn);
    }
 };