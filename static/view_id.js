$(document).ready(function() {
    let hall = halls.find(h => h.id === parseInt(id));
    console.log(hall);
    $(".heading").html(`<h3>${hall.name}</h3>`);
    $(".rating").append(`${hall.rating}`);
    $(".header-image").html(`<img src="${hall.image}" alt="${hall.name}" 
        class="view-img">`);
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

})