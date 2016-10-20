

var model = {
  watchlistItems: [],
  browseItems: []
}


var api = {
  root: "https://api.themoviedb.org/3",
  token: "d3835890b87a64cf3fb6549d7bcecda3"
}


/**
 * Makes an AJAX request to themoviedb.org, asking for some movies
 * if successful, updates the model.browseItems appropriately, and then invokes
 * the callback function that was passed in
 */
function discoverMovies(callback) {
	$.ajax({
		url: api.root + "/discover/movie",
		data: {
			api_key: api.token,
		},
		success: function(response) {
			console.log("We got a response from The Movie DB!");
			console.log(response);

			model.browseItems = response.results;
			// invoke the callback function that was passed in.
			callback();
		}
	});

}


/**
 * re-renders the page with new content, based on the current state of the model
 */
function render() {
    $('#section-watchlist ul').empty();
    $('#section-browse ul').empty();

  // TODO 6
  // for each movie on the user's watchlist, insert a list item into the <ul> in the watchlist section
    model.watchlistItems.forEach(function(movie){
        var itemView = $("<li></li>").text(movie.original_title);
  	    $("#section-watchlist ul").append(itemView);;
    });
    model.browseItems.forEach(function(movie){
        //$('#section-browse ul').append('<li> + movie.title + </li>');
        var title = $('<p></p>').text(movie.original_title);
        var itemView = $("<li></li>").append(title)
        $("#section-browse ul").append(itemView);

        var button = $("<button></button>").text("Add to Watchlist").click(function() {
            model.watchlistItems.push(movie);
            render();
        });
        itemView.append(button);
    });


}


// When the HTML document is ready, we call the discoverMovies function,
// and pass the render function as its callback
$(document).ready(function() {
  discoverMovies(render);
});
