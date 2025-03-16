function resizeInput(inField) {
    let tempSpan = $("<span>").css({
        visibility: "hidden",
        whiteSpace: "nowrap",
        font: inField.css("font")
    }).text(inField.val() || inField.attr("placeholder"));

    $("body").append(tempSpan);
    inField.css("width", tempSpan.outerWidth() + 10 + "px"); // Add some padding
    tempSpan.remove();
}

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

    // checks if float input on rating field
    const ratingInput = parseFloat($("#r").val());
    if (isNaN(ratingInput) || ratingInput < 0 || ratingInput > 5) {
        formDiv.eq(1).append($("<span>").addClass("error")
            .text("Please enter valid numerical input from 0 to 5."))
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

function updateEntry() {
    let entry = {
        "id": id,
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
        url: `/update_entry/${id}`,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(entry),
        success: function (result) {
            console.log("Successfully updated.");
            console.log(result);
            window.location.href = "/view/" + id;
        },
        error: function (request, status, error) {
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
}

$(document).ready(function() {
    // prepopulates fields wth existing values
    const inputs = $(".input-field");
    const keys = ["name", "rating", "image", "desc", "location", "containers",
        "fruit", "condiments", "unpackaged", "packaged"]
    for (let i = 0; i < 10; i++) {
        let value = dining_hall[keys[i]];
        if (Array.isArray(value)) {
            value = value.join(", ");
        }
        inputs[i].value = value;
        resizeInput($(inputs[i]));
    }

    $("#submit-edit").on("click", function (event) {
        event.preventDefault();
        $(".error").remove();
        if (isValid()) {
            updateEntry();
        }
    })

    $("#dialog").dialog({
        autoOpen: false,
        modal: true,
        buttons: {
            "Yes": function() {
                $(this).dialog("close");
                window.location.href = "/view/" + id;
            },
            "No, continue editing": function() {
                $(this).dialog("close");
            }
        }
    });
    $("#discard").on("click", function (event) {
        event.preventDefault();
        $("#dialog").dialog("open");
    })
})