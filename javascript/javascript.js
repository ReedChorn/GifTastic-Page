
        var gifInputLocalStorage = localStorage.getItem("gif-input")
        console.log(gifInputLocalStorage)
        
    // Create an initial gifCount variable
    var gifCount = 0;
    var gifListArray = [];


	//Function with AJAX call to GIPHY; Q parameterc for API link set to search term, limit 10 results
  //Create div with respective still and animate image sources with "data-state", "data-still" and "data-animate" attributes
 	function displayNetflixShow() {

	var x = $(this).data("search");
	console.log(x);

	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=dc6zaTOxFJmzC&limit=10";

	console.log(queryURL);

	$.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
        	var results = response.data;
        	console.log(results);
        	for (var i = 0; i < results.length; i++) {
        	
        	var showDiv = $("<div class='col-md-4'>");

        	var rating = results[i].rating;
        	var defaultAnimatedSrc = results[i].images.fixed_height.url;
        	var staticSrc = results[i].images.fixed_height_still.url;
        	var showImage = $("<img>");
        	var p = $("<p>").text("Rating: " + rating);

        	showImage.attr("src", staticSrc);
        	showImage.addClass("netflixGiphy");
        	showImage.attr("data-state", "still");
        	showImage.attr("data-still", staticSrc);
        	showImage.attr("data-animate", defaultAnimatedSrc);
        	showDiv.append(p);
        	showDiv.append(showImage);
        	$("#gifArea").prepend(showDiv);

        }
	});
}

    //  On Click event associated with the add-gif-input function
    $("#add-gif-input").on("click", function(event) {
      event.preventDefault();

      // Get the gif-input "value" from the textbox and store it a variable
      var gifStorage = $("#gif-input").val().trim();

      console.log(gifStorage)

      gifListArray.push(gifStorage) 

      console.log(gifListArray)
      
      localStorage.setItem("gif-input", gifListArray.toString())   

      $("#gif-input").val('');
        
      displayButtons();

      // Clear the textbox when done
      $("#gif-input").val("");

      // Add to the gifCount
      gifCount++;
    });

    function displayButtons() {
    $("#gif-inputs").empty();
    for (var i = 0; i < gifListArray.length; i++) {
      var a = $('<button class="btn btn-primary">');
      a.attr("id", "show");
      a.attr("data-search", gifListArray[i]);
      a.text(gifListArray[i]);
      $("#gif-inputs").append(a);
    }
  }

  displayButtons();

    //Click event on button with id of "show" executes displayNetflixShow function
  $(document).on("click", "#show", displayNetflixShow);

  //Click event on gifs with class of "netflixGiphy" executes pausePlayGifs function
  $(document).on("click", ".netflixGiphy", pausePlayGifs);

  //Function accesses "data-state" attribute and depending on status, changes image source to "data-animate" or "data-still"
  function pausePlayGifs() {
  	 var state = $(this).attr("data-state");
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
  }
}
