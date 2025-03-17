function displayEntry() {
    console.log(hall);
    $(".heading").html(`<h2>${hall.name}</h2>`);
    $(".rating").html(toStar(hall.rating));
    $(".header-image").html(`<img src="${hall.image}" alt="${hall.name}" 
        class="view-img img-fluid">`);
    $(".description").html(`<p>${hall.desc}</p>`);
    $("#location").append(`${hall.location}`);

    // lists / array items
    let containersList = "<ul>";
    hall.containers.forEach(function(container) {
        containersList += `<li>${container}</li>`;
    });
    containersList += "</ul>";
    $("#containers").append(containersList);

    let fruitList = "<ul>";
    hall.fruit.forEach(function(fruit) {
        fruitList += `<li>${fruit}</li>`;
    });
    fruitList += "</ul>";
    $("#fruit").append(fruitList);

    let condimentsList = "<ul>";
    hall.condiments.forEach(function(condiment) {
        condimentsList += `<li>${condiment}</li>`;
    });
    condimentsList += "</ul>";
    $("#condiments").append(condimentsList);

    let packagedList = "<ul>";
    hall.packaged.forEach(function(packaged) {
        packagedList += `<li>${packaged}</li>`;
    });
    packagedList += "</ul>";
    $("#packaged").append(packagedList);

    let unpackagedList = "<ul>";
    hall.unpackaged.forEach(function(unpackaged) {
        unpackagedList += `<li>${unpackaged}</li>`;
    });
    unpackagedList += "</ul>";
    $("#unpackaged").append(unpackagedList);
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

$(document).ready(function() {
    displayEntry();
    $(".edit-btn").click(function() {
        window.location.href = "/edit/" + id;
    });

})