$(document).ready(function () {

    var topics = ["The Office", "Parks and Recreation", "American Horror Story", "Shameless", "Mr. Robot"];

    $("#buttons-view").on("click", ".gif-button", getGifInfo);
    $("#gif-view").on("click", ".gif", playPause);

    function getGifInfo() {
        var gif = $(this).attr("data-name");
        var QueryURL = "https://api.giphy.com/v1/gifs/search?api_key=ilH3dpq8Ub4A64fnXqYToNczQ6CpfUCI&q=" + gif + "&limit=10&offset=0&rating=G&lang=en";

        $.ajax({
            url: QueryURL,
            method: "GET"
        }).then(function (response) {
            console.log(QueryURL);
            console.log(response);

            var results = response.data;
            
            for (var i = 0; i < results.length; i++) {
            
            var imageUrl = results[i].images.fixed_height.url;
            var stillUrl = results[i].images.fixed_height_still.url;
            var gifLoad = $("<img>");
            var rating = $("<p>");
            var gifDiv = $("<div>");
            
            gifLoad.attr("src", stillUrl);
            gifLoad.attr("data-still", stillUrl);
            gifLoad.attr("data-animate", imageUrl);
            gifLoad.attr("data-state", "still");
            gifLoad.attr("class", "gif");
            rating.attr("class", "rating");
            rating.text("Rating: " + results[i].rating);
            gifDiv.prepend(rating);
            gifDiv.append(gifLoad);
            $("#gif-view").prepend(gifDiv);
        };
    });
};

    function renderButtons() {
        $("#buttons-view").empty();

        for (var i = 0; i < topics.length; i++) {
            var button = $("<button>");
            button.addClass("gif-button");
            button.attr("data-name", topics[i]);
            button.text(topics[i]);
            $("#buttons-view").append(button);
        }
    }

    $("#add-gif").on("click", function (event) {
        event.preventDefault();
        var gifSearch = $("#search-input").val().trim();
        topics.push(gifSearch);
        renderButtons();
    });

    function playPause(){
        var state = $(this).attr("data-state");

        if (state === "still"){
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    };


    renderButtons();
});