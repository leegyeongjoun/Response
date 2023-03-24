$(window).resize(function(){
   
  
    var boxWidth = $('img').width();
    console.log(boxWidth)
    if(boxWidth < 1920){

        $('#main').height(boxWidth*0.5);
    }
});