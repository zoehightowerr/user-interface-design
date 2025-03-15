/*ZOE HIGHTOWER*/
$(document).ready(function() {
    $.each(favorites, function(i, id) {
        
        const band = data.find(band => band.id === id);

        if (band) {
            const favoriteItem = $('<div class="favorite-item"></div>');

            favoriteItem.append(`
                <a href="/view/${id}">
                    <h3>${band.name}</h3>
                </a>
            `);
            favoriteItem.append(`<img src="${band.image}" alt="${band.name}" />`);

            $('#favorite-items').append(favoriteItem);
        }
    });
});
