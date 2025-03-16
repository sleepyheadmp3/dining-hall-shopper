function isValid() {
    const inputs = $(".input-field");
    const formDiv = $(".form-group");
    // checks if empty input on required fields (first 6)
    for (let i = 0; i < 6; i++) {
        if (!inputs[i].value.trim()) {
            formDiv.eq(i).append($("<span>").addClass("error").text("Cannot be empty."));
            inputs[i].focus();
            return false;
        }
    }

    // checks if int input on rating field
    const ratingInput = parseInt($("#r").val());
    if (isNaN(ratingInput) || ratingInput < 0 || ratingInput > 5) {
        formDiv.eq(1).append($("<span>").addClass("error")
            .text("Please enter valid integer input from 0 to 5."))
            .focus();
        return false;
    }

    // checks if url input is valid
    const imgInput = $("#i").val();
    try {
        new URL(imgInput);
    } catch (error) {
        formDiv.eq(2).append($("<span>").addClass("error")
            .text("Please enter valid URL."))
            .focus();
        return false;
    }
    return true;
}

function saveEntry() {
    let entry = {
        "id": newID,
        "name": $("#hn").val(),
        "rating": $("#r").val(),
        "image": $("#i").val(),
        "desc": $("#d").val(),
        "location": $("#l").val(),
        "containers": $("#ct").val() ? $("#ct").val().split(",").map(item => item.trim()) : [],
        "fruit": $("#f").val() ? $("#f").val().split(",").map(item => item.trim()) : [],
        "condiments": $("#cm").val() ? $("#cm").val().split(",").map(item => item.trim()) : [],
        "unpackaged": $("#up").val() ? $("#up").val().split(",").map(item => item.trim()) : [],
        "packaged": $("#p").val() ? $("#p").val().split(",").map(item => item.trim()) : [],
    };

    $.ajax({
        type: "POST",
        url: "save_entry",
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(entry),
        success: function(){
            // displays success message
            const inputs = $(".input-field");
            let viewLink = $("<a>")
                .attr("href", "/view/" + newID)
                .text(" See it here!");
            let successMsg = $("<div>")
                .text("New item successfully created.")
                .append(viewLink);
            $("#success").append(successMsg);

            // clears all inputs and refocuses
            for (let i = 0; i < 10; i++) {
                inputs[i].value = "";
            }
            inputs[0].focus();
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
}

$(document).ready(function(){
    $("#add-hall").on("submit", function(event) {
        event.preventDefault();
        $(".error").remove();
        if (isValid()) {
            saveEntry();
        }
    });
})