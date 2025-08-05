;(function($, window, undefined) {

	"use strict";

	jQuery(document).ready(function ($) {
        


		$(document).on('scroll', function () {
		    // if the scroll distance is greater than 100px
		    if ($(window).scrollTop() > 100) {
		      // do something
		    	$('.site-header').addClass('scrolled-header');
		    }
		    else {
		    	$('.site-header').removeClass('scrolled-header');
		    }
		});
		






		// Animation on scroll 
		new WOW().init();


		

		

      	// filter functions
		var filterFns = {
		    // show if number is greater than 50
		    numberGreaterThan50: function() {
		      var number = $(this).find('.number').text();
		      return parseInt( number, 10 ) > 50;
		    },
		    // show if name ends with -ium
		    ium: function() {
		      var name = $(this).find('.name').text();
		      return name.match( /ium$/ );
		    }
		};

      	// bind filter button click
      	$('#projects-filter').on( 'click', 'a', function() {
		    var filterValue = $( this ).attr('data-filter');
		    // use filterFn if matches value
		    filterValue = filterFns[ filterValue ] || filterValue;
		    portfolioGrid.isotope({ filter: filterValue });
		    return false;
		});

      	// change is-checked class on buttons
		$('#projects-filter').each( function( i, buttonGroup ) {
	    	var $buttonGroup = $( buttonGroup );
	    	$buttonGroup.on( 'click', 'a', function() {
	      		$buttonGroup.find('.active').removeClass('active');
	      		$( this ).addClass('active');
	    	});
	  	});


		
		// Submenu Show/Hide
        // $('nav.main-navigation ul > li, nav.main-navigation ul > li > ul > li').hover(function () {
        //     $(this).children('ul').stop(true, true).slideDown(200);
        // }, function () {
        //     $(this).children('ul').stop(true, true).slideUp(200);
        // });
$('nav.responsive-menu ul li > a.has-submenu').on('click', function(e) {
  e.preventDefault();
  var $submenu = $(this).next('.sub-menu');
  $('.sub-menu').not($submenu).slideUp(); // Close others
  $submenu.stop(true, true).slideToggle(200);
  $(this).toggleClass('submenu-open');
});

		
		$('nav.main-navigation > ul > li').each(function(){
			$(this).find('.has-submenu').append('<i class="fa fa-angle-down"></i>');
		});


        // Blog Masonry
        var blogIsotope=function(){
            var imgLoad = imagesLoaded($('.blog-isotope'));
		   
            imgLoad.on('done',function(){

                $('.blog-isotope').isotope({
                    "itemSelector": ".blog-post",
                });
               
            })
           
           imgLoad.on('fail',function(){

                $('.blog-isotope').isotope({
                    "itemSelector": ".blog-post",
                });

           })  
           
        }
                   
        blogIsotope();



        // Flickr Images
        $('.flickr-images').jflickrfeed({
			limit: 6 ,
			qstrings: {id: '56174287@N02'},
			itemTemplate: '<li class="small-thumb"><a href="{{link}}" title="{{title}}"><img src="{{image_s}}" alt="{{title}}" /></a></li>'
		});



		// Off Canvas Navigation
		var offcanvas_open = false;
		var offcanvas_from_left = false;

		function offcanvas_right() {
			
			$(".sidebar-menu-container").addClass("slide-from-left");
			$(".sidebar-menu-container").addClass("sidebar-menu-open");		
			
			offcanvas_open = true;
			offcanvas_from_left = true;
			
			$(".sidebar-menu").addClass("open");
			$("body").addClass("offcanvas_open offcanvas_from_left");

			$(".nano").nanoScroller();
			
		}

		function offcanvas_close() {
			if (offcanvas_open === true) {
					
				$(".sidebar-menu-container").removeClass("slide-from-left");
				$(".sidebar-menu-container").removeClass("sidebar-menu-open");
				
				offcanvas_open = false;
				offcanvas_from_left = false;
				
				//$('#sidebar-menu-container').css('max-height', 'inherit');
				$(".sidebar-menu").removeClass("open");
				$("body").removeClass("offcanvas_open offcanvas_from_left");

			}
		}
       $("#sidebar-close-btn").on("click", function () {
  offcanvas_close();
});


		$(".side-menu-button").on('click', function() {
			offcanvas_right();
		});

		$("#sidebar-menu-container").on("click", ".sidebar-menu-overlay", function(e) {
			offcanvas_close();
		});

		$(".sidebar-menu-overlay").swipe({
			swipeLeft:function(event, direction, distance, duration, fingerCount) {
				offcanvas_close();
			},
			swipeRight:function(event, direction, distance, duration, fingerCount) {
				offcanvas_close();
			},
			tap:function(event, direction, distance, duration, fingerCount) {
				offcanvas_close();
			},
			threshold:0
		});
//lightbox//pagination

const portfolioImages = document.querySelectorAll('.portfolio .item img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const galleryContainer = document.getElementById('lightboxGallery');

let currentIndex = 0;

const imageSources = Array.from(portfolioImages).map(img => ({
  src: img.src,
  caption: img.alt || img.dataset.caption || ''
}));

// Show lightbox
function showLightbox(index) {
  
  currentIndex = index;
  updateLightbox();
  lightbox.style.display = 'flex';
}

// Update lightbox content
function updateLightbox() {
  lightboxImg.src = imageSources[currentIndex].src;
  lightboxCaption.textContent = imageSources[currentIndex].caption;
  updateGallery();
}

// Navigate images
function navigate(direction) {
  currentIndex = (currentIndex + direction + imageSources.length) % imageSources.length;
  updateLightbox();
}

// Close lightbox
function closeLightbox() {
  lightbox.style.display = 'none';
}

// Go to selected slide
function goToSlide(index) {
  currentIndex = index;
  updateLightbox();
}

// Render thumbnail gallery
function updateGallery() {
  galleryContainer.innerHTML = '';
  imageSources.forEach((img, i) => {
    const thumb = document.createElement('img');
    thumb.src = img.src;
    thumb.alt = img.caption;
    thumb.className = i === currentIndex ? 'active' : '';
    thumb.onclick = () => goToSlide(i);
    galleryContainer.appendChild(thumb);
  });
}

// Scroll thumbnails in carousel
function scrollThumbnails(direction) {
  const scrollAmount = 140 * 3; // thumbnail width + margin * 3
  galleryContainer.scrollBy({
    left: direction * scrollAmount,
    behavior: 'smooth'
  });
}

// Event listeners
portfolioImages.forEach((img, index) => {
  img.addEventListener('click', () => showLightbox(index));
});

document.addEventListener('keydown', e => {
  if (lightbox.style.display === 'flex') {
    if (e.key === 'ArrowLeft') navigate(-1);
    else if (e.key === 'ArrowRight') navigate(1);
    else if (e.key === 'Escape') closeLightbox();
  }
});

// Expose functions for inline HTML
window.navigate = navigate;
window.closeLightbox = closeLightbox;
window.scrollThumbnails = scrollThumbnails;





		// Mobile navigation
		$(".responsive-menu .menu-item-has-children").append('<div class="show-submenu"><i class="fa fa-chevron-circle-down"></i></div>');

	    $(".responsive-menu").on("click", ".show-submenu", function(e) {
			e.stopPropagation();
			
			$(this).parent().toggleClass("current")
							.children(".sub-menu").toggleClass("open");
							
			$(this).html($(this).html() == '<i class="fa fa-chevron-circle-down"></i>' ? '<i class="fa fa-chevron-circle-up"></i>' : '<i class="fa fa-chevron-circle-down"></i>');
			$(".nano").nanoScroller();
		});

		$(".responsive-menu").on("click", "a", function(e) {
			if( ($(this).attr('href') === "#") || ($(this).attr('href') === "") ) {
				$(this).parent().children(".show-submenu").trigger("click");
				return false;
			} else {
				offcanvas_close();
			}
		});

		//pagination
		

		// revolution slider
		$('.fullwidthbanner').revolution({
        	delay:6000,
        	startwidth:1170,
        	startheight:680,
        	onHoverStop: "off",
        	hideTimerBar: "on",
            thumbWidth: 100,
            thumbHeight: 50,
            thumbAmount: 3,
            hideThumbs: 200,
            navigationType: "bullet",
            navigationArrows: "verticalcentered",
            navigationStyle: "preview4",
            touchenabled: "on",
            navOffsetHorizontal: 0,
            navOffsetVertical: 20,
            stopAtSlide: -1,
            stopAfterLoops: -1,
            hideCaptionAtLimit: 0,
            hideAllCaptionAtLilmit: 0,
            hideSliderAtLimit: 0,
            hideThumbsOnMobile:"on",
         	hideNavDelayOnMobile:1500,
         	hideBulletsOnMobile:"on",
         	hideArrowsOnMobile:"on",
         	hideThumbsUnderResoluition:0,
            fullWidth: "on",
            shadow: 0
      	});



		//  go to top
      	var offset = 300,
		//browser window scroll (in pixels) after which the "back to top" link opacity is reduced
		offset_opacity = 1200,
		//duration of the top scrolling animation (in ms)
		scroll_top_duration = 700,
		//grab the "back to top" link
		$back_to_top = $('.go-top');

		//hide or show the "back to top" link
		$(window).on('scroll', function(){
			( $(this).scrollTop() > offset ) ? $back_to_top.addClass('go-top-visible') : $back_to_top.removeClass('go-top-visible go-top-fade-out');
			if( $(this).scrollTop() > offset_opacity ) { 
				$back_to_top.addClass('go-top-fade-out');
			}
		});

		//smooth scroll to top
		$back_to_top.on('click', function(event){
			event.preventDefault();
			$('body,html').animate({
				scrollTop: 0 ,
			 	}, scroll_top_duration
			);
		});

		
		


	});


//HOTSPOT
//HOTSPOT
$('.hotspot').on('mouseenter touchstart touchend', function (e) {
  e.stopPropagation();

  var $popup = $('#hotspotPopup');
  var $this = $(this);

  var title = $this.data('text');
  var subtext = $this.data('subtext') || '';

  $popup.html(`
    <div class="popup-title">${title}</div>
    <div class="popup-subtext">${subtext}</div>
  `).css({ display: 'block', visibility: 'hidden' });

  // Force reflow
  var dummy = $popup[0].offsetHeight;
  var popupWidth = $popup.outerWidth();

  var offsetTop = $this.position().top;
  var offsetLeft = $this.position().left - popupWidth - 10;

  // Prevent popup going off screen left
  if (offsetLeft < 0) {
    offsetLeft = $this.position().left + 20;
  }

  $popup.css({
    top: offsetTop + 'px',
    left: offsetLeft + 'px',
    transform: 'translateY(-50%)',
    display: 'block',
    visibility: 'visible'
  });
});

$(document).on('touchstart mouseleave click', function (e) {
  if (!$(e.target).closest('.hotspot, #hotspotPopup').length) {
    $('#hotspotPopup').hide();
  }
});

$('.hotspot').on('mouseleave touchend', function () {
  $('#hotspotPopup').hide();
});



// === Infinite horizontal scroll for logo carousel ===
document.querySelectorAll('.horizontal-scroll').forEach(scrollContainer => {
  const track = scrollContainer.querySelector('.slider-track');
  if (!track) return;

  // Clone all items inside slider-track to create seamless loop
  const items = Array.from(track.children);
  items.forEach(item => {
    const clone = item.cloneNode(true);
    track.appendChild(clone);
  });

  let scrollSpeed = parseFloat(scrollContainer.dataset.scrollSpeed) || 0.5; 
  let scrollPos = 0;

  function scrollLoop() {
    scrollPos += scrollSpeed;
    scrollContainer.scrollLeft = scrollPos;

   
    if (scrollPos >= track.scrollWidth / 2) {
      scrollPos = 0;
      scrollContainer.scrollLeft = 0;
    }

    requestAnimationFrame(scrollLoop);
  }

  scrollLoop();
});
 //document.addEventListener('contextmenu', function (e) {
   // e.preventDefault();
  //});


})(jQuery, window);
