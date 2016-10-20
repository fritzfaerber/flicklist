

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
    $('#section-watchlist ul').innerHTML = '';
    $('#section-browse ul').empty();

  // TODO 6
  // for each movie on the user's watchlist, insert a list item into the <ul> in the watchlist section
    model.watchlistItems.forEach(function(movie){
        $('#section-watchlist ul').append('<li>' + movie + '</li>');
    });
    model.browseItems.forEach(function(movie){
        //$('#section-browse ul').append('<li> + movie.title + </li>');
        var button = $('<button> Add to Watch List</button>');
        button.click(function(){
            model.watchlistItems.push(movie);
            render();
        });
        var listItem = $('<li><span>' + movie.title + '</span></li>');
        listItem.append(button);
        $('#section-browse ul').append(listItem);

  // for each movie on the current browse list,
        
		// TODO 3
		// insert a list item into the <ul> in the browse section

		// TODO 4
		// the list item should include a button that says "Add to Watchlist"

		// TODO 5
		// when the button is clicked, this movie should be added to the model's watchlist and render() should be called again
  });

}


// When the HTML document is ready, we call the discoverMovies function,
// and pass the render function as its callback
$(document).ready(function() {
  discoverMovies(render);
});
