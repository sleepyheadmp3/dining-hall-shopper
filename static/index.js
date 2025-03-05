function displayThree(topHalls) {
    // places images in columns
    for (let i = 0; i < topHalls.length; i++) {
        let hall = halls.find(h => h.id === topHalls[i]);
        let newCol = $("<div class='col-4'>")
        let hallLink = $("<a>").attr("href", "/view/" + hall.id);
        $(newCol).append((hallLink).append($("<img>").attr("src", hall.image)
            .attr("alt", hall.name).addClass("home-image")));
        $(".home-images").append(newCol)
    }
    // places names under images in columns
    for (let i = 0; i < topHalls.length; i++) {
        let hall = halls.find(h => h.id === topHalls[i]);
        let newCol = $("<div class='col-4'>")
        $(newCol).append($("<a>").attr("href", "/view/" + hall.id).text(hall.name));
        $(".home-text").append(newCol)
    }
}

// when page loads, display top 3 dining halls
$(document).ready(function(){
    displayThree([1, 3, 5]); // change here to customize!!



})