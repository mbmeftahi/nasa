
var apod = {

  //Create a random date
  randomDate: function(start, end) {
  //
  let date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

  //Format the date
  let d = date.getDate();
  let m = date.getMonth() + 1; //In JS months start at 0
  let y = date.getFullYear();

  //Change the maonth and day strings so that they match the documented format.
  if(m < 10){
  m = '0'+m
  }

  if(d < 10){
  d = '0'+d
  }

  return `${y}-${m}-${d}`;
  },

  // application Constructor
  init: function(){
    // init function
    this.getRequest();
   // setInterval(this.getRequest, 60);
  },

  // Request function...
  getRequest: function(){
  
      var date = this.randomDate(new Date(1995, 5, 16), new Date());
      //var date = "2013-06-06";
      var url = "https://api.nasa.gov/planetary/apod?api_key=" + nasakey + "&date=" + date;

      $.ajax({
          url: url
      }).done(function(result){
          apod.buildDOM(result);
          console.log(result);        
      }).fail(function(result){
        console.log(result);
      });

  },

  buildDOM: function(result){
  // build dom object
  $("#apodTitle").text(result.title);
    if (result.media_type === 'video'){
      $("#apodImg").hide();
      $("#apodVideo > iframe").attr("src", result.url).show();
    } else {
      $("#apodVideo > iframe").hide();
      $("#apodImg").attr("src", result.url).attr('alt', result.title);
    } 
  $("#apodCopyright").text("Copyright: " + result.copyright);
  $("#apodDate").text("Date: " + result.date);
  $("#apodDesc").text(result.explanation);
  $("#apodurl").text(result.url);   
  },

};

apod.init();

document.getElementById('btnRandApod').addEventListener('click', function(){
  apod.getRequest();
},);