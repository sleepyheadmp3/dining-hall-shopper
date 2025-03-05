$(document).ready(function() {
    console.log(matches)
    $("#results").empty();
    if (matches == null || matches.length == 0) {
        $("#results").html("No results found.");
    }
    // displays list of matches
    for (let i = 0; i < matches.length; i++) {
        let hallLink = $("<a>").attr("href", "/view/" +
            matches[i].id).text(matches[i].name);
        $("#results").append("<div class='row'>").append(hallLink);
    }
})