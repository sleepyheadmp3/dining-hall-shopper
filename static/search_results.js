// creates rows for each search result
function displayResults() {
    let queryL = query.toLowerCase();
    let resultC = $("<div>").addClass("result-container");
    for (let i = 0; i < matches.length; i++) {
        // styles name if matching text in name
        let styledName = matches[i].name;
        let nameL = styledName.toLowerCase();
        if (nameL.includes(queryL)) {
            let start = nameL.indexOf(queryL);
            let end = start + queryL.length;
            styledName =
                styledName.slice(0, start) +
                "<span class='match-txt'>" + styledName.slice(start, end) +
                "</span>" + styledName.slice(end);
        }
        let hallLink = $("<a>")
            .attr("href", "/view/" + matches[i].id)
            .append(styledName)
            .addClass("result-name")

        // formats item style and spacing
        let resultI = $("<div>").addClass("result");
        matches[i].items.forEach((item, index) => {
            let itemL = item.toLowerCase();
            // adds style to matching text in the item
            let start = itemL.indexOf(queryL);
            let end = start + queryL.length;
            let boldedItem =
                item.slice(0, start) +
                "<span class='match-txt'>" + item.slice(start, end) + "</span>" +
                item.slice(end);
            resultI.append($("<span>").html(boldedItem).addClass("item"));

            if (index < matches[i].items.length - 1) {
                resultI.append($("<span>").text(", "));
            }
        });
        resultC.append(hallLink).append(resultI).append($("<br>"));
    }
    // displays list of matches
    $("#results").append(resultC);
}


$(document).ready(function() {
    console.log(matches)
    $("#results").empty();
    let searchMessage = $("<div>").addClass("search-message");
    if (matches == null || matches.length == 0) {
        $(searchMessage).append("No results found.");
    }
    else {
        $(searchMessage).append(matches.length + " results found:");
    }
    $(".heading").append(searchMessage)
    displayResults();
})