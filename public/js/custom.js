$(function() {
  //keyup is an AJAX function takes what is typed on the keyboard as it is typed
  $('#search').keyup(function() {

    var search_term = $(this).val();
    //posting to the api search route
    $.ajax({
      method: 'POST',
      url: '/api/search',
      data: {
        search_term
      },
      dataType: 'json',
      success: function(json) { //searcing
        var data = json.hits.hits.map(function(hit) {
          return hit;
        });
        //for loop over the search query to display results html copied from the origional search route with removed EJS tags
        $('#searchResults').empty();
        for (var i = 0; i < data.length; i++) {
          var html = "";
          html += '<div class="col-md-4  wow animated bounceIn">'
          html += '<a href="/product/' + data[i]._source._id + '">';
          html += '<div class="thumbnail">';
          html += '<img src="' + data[i]._source.image + '">';
          html += '<div class="caption">';
          html += '<h3>' +  data[i]._source.name  + '</h3>';
          html += '<p>' +  data[i]._source.category.name  + '</h3>';
          html += '<p>$' +  data[i]._source.price  + '</p>';
          html += '</div></div></a></div>';

          $('#searchResults').append(html);
        }
      },
      //console leg any errors
      error: function(error) {
        console.log(err);
      }
    });
  });
})
