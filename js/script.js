//  ====================
//  swiper
//  ====================
jQuery(document).ready(function(){
  jQuery('.swiper-container').each(function () {
    var swiperThis = jQuery(this);
    var loopLength = swiperThis.data('slides-per-view');
    var divLength = jQuery(this).find("div.swiper-slide").length;
    var nextbtn = swiperThis.closest(".swiper-btns").find('.carousel__btn_next');
    var prevbtn = swiperThis.closest(".swiper-btns").find('.carousel__btn_prev');
    var sPagination = swiperThis.closest(".swiper-cpagination").find('.carousel__pagination');
    if (divLength >= loopLength) {
      var locoSwiper = new Swiper(swiperThis, {
        slidesPerView: swiperThis.data('slides-per-view'),
        observer: true,
        observeParents: true,
        spaceBetween: swiperThis.data("space-between"),
        loop: swiperThis.data("loop"),
        clickable: swiperThis.data("click"),
        centeredSlides: swiperThis.data("center-slide"),
        freeMode: swiperThis.data("free-mode"),
        effect: swiperThis.data("effect"),
        autoHeight: swiperThis.data("auto-height"),
        autoplay: swiperThis.data("auto-play"),
        pagination: {
          el: sPagination,
          clickable: true,
          dynamicBullets: swiperThis.data("dynamic-bullets"),
        },
        navigation: {
          nextEl: nextbtn,
          prevEl: prevbtn
        },
        scrollbar: {
          container: swiperThis,
          hide: true,
        },
        breakpoints: {
          // when window width is >= 320px
          320: {
            slidesPerView: swiperThis.data("spvxs"),
            spaceBetween: swiperThis.data("space-between"),
          },
          // when window width is >= 576px
          576: {
            slidesPerView: swiperThis.data("spvsm"),
            spaceBetween: swiperThis.data("space-between"),
          },
          // when window width is >= 768px
          768: {
            slidesPerView: swiperThis.data("spvmd"),
            spaceBetween: swiperThis.data("space-between"),
          },
          // when window width is >= 992px
          992: {
            slidesPerView: swiperThis.data("spvlg"),
            spaceBetween: swiperThis.data("space-between"),
          },
          1200:{
            slidesPerView: swiperThis.data("spvxl"),
            spaceBetween: swiperThis.data("space-between"),
          }
        }
      });
    }else{
      var locoSwiper = new Swiper(swiperThis, {
        slidesPerView: swiperThis.data("slides-per-view"),
        spaceBetween: swiperThis.data("space-between"),
        loop: false,
        clickable: swiperThis.data("click"),

        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.carousel__btn_next',
          prevEl: '.carousel__btn_prev',
        },
        scrollbar: {
          container: swiperThis,
          hide: true,
        },
        breakpoints: {
          // when window width is >= 320px
          320: {
            slidesPerView: swiperThis.data("spvxs"),
            spaceBetween: swiperThis.data("space-between"),
          },
          // when window width is >= 576px
          576: {
            slidesPerView: swiperThis.data("spvsm"),
            spaceBetween: swiperThis.data("space-between"),
          },
          // when window width is >= 768px
          768: {
            slidesPerView: swiperThis.data("spvmd"),
            spaceBetween: swiperThis.data("space-between"),
          },
          // when window width is >= 992px
          992: {
            slidesPerView: swiperThis.data("spvlg"),
            spaceBetween: swiperThis.data("space-between"),
          },
          1200: {
            slidesPerView: swiperThis.data("spvxl"),
            spaceBetween: swiperThis.data("space-between"),end
          }
        }
      });
    }
  });
});
// ===========================================
//   start portfolio gallary with pagination 
// ===========================================
$(document).ready( function() {

	var itemSelector = '.grid-item'; 

	var $container = $('#container').isotope({
		itemSelector: itemSelector,
		masonry: {
		  columnWidth: itemSelector,
		  isFitWidth: true
		}
	});

	//Ascending order
	var responsiveIsotope = [
		[480, 7],
		[720, 10]
	];

	var itemsPerPageDefault = 12;
	var itemsPerPage = defineItemsPerPage();
	var currentNumberPages = 1;
	var currentPage = 1;
	var currentFilter = '*';
	var filterAtribute = 'data-filter';
	var pageAtribute = 'data-page';
	var pagerClass = 'isotope-pager';

	function changeFilter(selector) {
		$container.isotope({
			filter: selector
		});
	}


	function goToPage(n) {
		currentPage = n;

		var selector = itemSelector;
			selector += ( currentFilter != '*' ) ? '['+filterAtribute+'="'+currentFilter+'"]' : '';
			selector += '['+pageAtribute+'="'+currentPage+'"]';

		changeFilter(selector);
	}

	function defineItemsPerPage() {
		var pages = itemsPerPageDefault;

		for( var i = 0; i < responsiveIsotope.length; i++ ) {
			if( $(window).width() <= responsiveIsotope[i][0] ) {
				pages = responsiveIsotope[i][1];
				break;
			}

			

		}

		return pages;
	}
	
	function setPagination() {

		var SettingsPagesOnItems = function(){

			var itemsLength = $container.children(itemSelector).length;
			
			var pages = Math.ceil(itemsLength / itemsPerPage);
			var item = 1;
			var page = 1;
			var selector = itemSelector;
				selector += ( currentFilter != '*' ) ? '['+filterAtribute+'="'+currentFilter+'"]' : '';
			
			$container.children(selector).each(function(){
				if( item > itemsPerPage ) {
					page++;
					item = 1;
				}
				$(this).attr(pageAtribute, page);
				item++;
			});

			currentNumberPages = page;

		}();

		var CreatePagers = function() {

			var $isotopePager = ( $('.'+pagerClass).length == 0 ) ? $('<div class="'+pagerClass+'"></div>') : $('.'+pagerClass);

			$isotopePager.html('');
			
			for( var i = 0; i < currentNumberPages; i++ ) {
				var $pager = $('<a href="javascript:void(0);" class="pager" '+pageAtribute+'="'+(i+1)+'"></a>');
					$pager.html(i+1);
					
					$pager.click(function(){
						var page = $(this).eq(0).attr(pageAtribute);
						goToPage(page);
					});

				$pager.appendTo($isotopePager);
			}

			$container.after($isotopePager);

		}();

	}

	setPagination();
	goToPage(1);

	//Adicionando Event de Click para as categorias
	$('.filters a').click(function(){
		var filter = $(this).attr(filterAtribute);
		currentFilter = filter;

		setPagination();
		goToPage(1);


	});

	//Evento Responsivo
	$(window).resize(function(){
		itemsPerPage = defineItemsPerPage();
		setPagination();
	});

	

});



 $(document).ready( function() {   

// filter items on button click
$('.filter-button-group').on( 'click', 'li', function() {
  var filterValue = $(this).attr('data-filter');
  $('.grid').isotope({ filter: filterValue });
  $('.filter-button-group li').removeClass('active');
  $(this).addClass('active');
});
    })
	
 $(document).ready( function() {   

// filter items on button click
$('.isotope-pager').on( 'click', 'a', function() {
  var filterValue = $(this).attr('data-page');

  $('.isotope-pager a').removeClass('active');
  $(this).addClass('active');
});
    })
	
$(document).ready(function(){
$('.popupimg').magnificPopup({
	type: 'image',
  mainClass: 'mfp-with-zoom', 
  gallery:{
			enabled:true
		},

  zoom: {
    enabled: true, 

    duration: 300, // duration of the effect, in milliseconds
    easing: 'ease-in-out', // CSS transition easing function

    opener: function(openerElement) {

      return openerElement.is('img') ? openerElement : openerElement.find('img');
  }
}

});

});

// ===========================================
//   end portfolio gallary with pagination 
// ===========================================
  
