// function ScrollToDiv(e) {
//     console.log(e);
//     (document.getElementsByClassName(e)[0]).scrollIntoView(true);
// }

// function ScrollToDiv(e)
// {
//  $('html,body').animate(
//  {
//   scrollTop: $("."+e).offset().top
//  },
//  'slow');
// }

$(document).ready(function() {
  
    var scrollLink = $('.scroll');
    
    // Smooth scrolling
    scrollLink.click(function(e) {
      e.preventDefault();
      $('body,html').animate({
        scrollTop: $(this.hash).offset().top
      }, 1000 );
    });
    
    // Active link switching
    $(window).scroll(function() {
      var scrollbarLocation = $(this).scrollTop();
      
      scrollLink.each(function() {
        
        var sectionOffset = $(this.hash).offset().top - 20;
        
        if ( sectionOffset <= scrollbarLocation ) {
          $(this).parent().addClass('active');
          $(this).parent().siblings().removeClass('active');
        }
      })
      
    })
    
  });

