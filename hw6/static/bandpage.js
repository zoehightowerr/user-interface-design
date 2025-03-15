/*ZOE HIGHTOWER*/
$(document).ready(function() {
    $('#name').text(band.name);

    $('#listeners').append(band["monthly listeners"]);

    $('#image').html('<img src="' + band.image + '">');

    $('#description').append(band.description);

    $.each(band["popular albums"], function(i, album){
        
        let current_album = $("<div class='album'></div>");
        
        let album_name = $("<div class= 'album_name'>" + album["album"] + "</div>");
       
        let album_cover = $("<img class='cover' src='" + album["cover"] + "' alt='" + album["album"] + " cover' />");
       
        current_album.append(album_name);
        current_album.append(album_cover);
        
        let list = $("<ul class=song_list></ul>");
        $.each(album["songs"], function(j, song){
            let item = $("<li>" + song + "</li>");
            list.append(item);
        });
        current_album.append(list);
    
        $("#album_container").append(current_album);
    });
    
    
    $.each(band["similar artists"], function(i, artistName){

        const artist = data.find(function(band) {
            return band.name === artistName;
        });
    
        if (artist) {
            var artistId = artist.id;
    
            var artistLink = $("<a></a>");
            artistLink.attr("href", "/view/" + artistId);
            artistLink.text(artistName);
            artistLink.addClass("artist-link");
            $("#similar_bands").append(artistLink);
        }
    });
    
    
    
    
    $.each(band["subgenres"], function(i, genre) {
        var genreLink = $("<a></a>");
        genreLink.attr("href", "/genres/" + genre.toLowerCase());
        genreLink.text(genre);
        genreLink.addClass("genre-link");
        $("#genres").append(genreLink);
    });
    

});
