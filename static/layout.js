$(document).ready(function(){
    $("#search-bar").on("submit", function(event) {
        event.preventDefault();
        let query = $("input[name='q']").val();
        // if query is whitespace or null, does nothing
        if (!query.trim()) {
            console.log("Empty or whitespace query string");
            $(".form-control").val("").focus()
        }
        else {
            console.log("Query: " + query);
            window.location.href = "/search_results?query=" + encodeURIComponent(query);
        }
    });
})