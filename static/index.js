function displayThree(topHalls) {
    // places images in columns
    for (let i = 0; i < topHalls.length; i++) {
        let hall = halls.find(h => parseInt(h.id) === topHalls[i]);
        let newCol = $("<div class='col-4'>")
        let hallLink = $("<a>").attr("href", "/view/" + hall.id);
        $(newCol).append((hallLink).append($("<img>").attr("src", hall.image)
            .attr("alt", hall.name).addClass("home-image")));
        $(".home-images").append(newCol)
    }
    // places names under images in columns
    for (let i = 0; i < topHalls.length; i++) {
        let hall = halls.find(h => parseInt(h.id) === topHalls[i]);
        let newCol = $("<div class='col-4'>")
        $(newCol).append($("<a>").attr("href", "/view/" + hall.id)
            .text(hall.name))
            .append($("<div>").html(toStar(hall.rating)));
        $(".home-text").append(newCol)
    }
}

function toStar(rating) {
    let stars = "";
    // adds full stars
    for (let i = 1; i <= parseInt(rating); i++) {
        stars += '<span class="star full">&#9733;</span>';
    }
    // adds empty stars
    for (let i = Math.ceil(rating); i < 5; i++) {
        stars += '<span class="star empty">&#9734;</span>';
    }
    return stars;
}

// when page loads, display top 3 dining halls
$(document).ready(function(){
    displayThree([1, 3, 2]); // change here to customize!!
})