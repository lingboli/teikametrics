

/* ========================================================================
 * Bootstrap: tab.js v3.0.3
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    this.element = $(element)
  }

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var previous = $ul.find('.active:last a')[0]
    var e        = $.Event('show.bs.tab', {
      relatedTarget: previous
    })

    $this.trigger(e)

    if (e.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.parent('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $this.trigger({
        type: 'shown.bs.tab'
      , relatedTarget: previous
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && $active.hasClass('fade')

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
        .removeClass('active')

      element.addClass('active')

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu')) {
        element.closest('li.dropdown').addClass('active')
      }

      callback && callback()
    }

    transition ?
      $active
        .one($.support.transition.end, next)
        .emulateTransitionEnd(150) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  var old = $.fn.tab

  $.fn.tab = function ( option ) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  $(document).on('click.bs.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
    e.preventDefault()
    $(this).tab('show')
  })

}(jQuery);

(function($){
    'use strict';
// custom masonry type gallery plugin
$.fn.customGallery = function(options) {
	return this.each(function() {

		var	$gridContainer	= $(this),
		padding = ($gridContainer.hasClass('portfolio-with-padding-yes') || $gridContainer.hasClass('gallery-with-padding-yes'))? 5 : 0 ;

		var getColNum = function() {
		   var w = $gridContainer.width(), 
		   columnNum = $gridContainer.data('columns');
		   if(!columnNum){
			   columnNum = 5 ;
		   }
		   
		       if( w <= 1024 ) { columnNum = 4;}
		       if( w <= 800 ) { columnNum = 3;}
		       if( w <= 500 ) { columnNum = 2;}
		 
		 return columnNum;
	    
		};
		
		var getColWidth = function() {
		     var w 	= $gridContainer.width(), 
			 columnNum 	= getColNum(), 
			 colWidth 	= Math.floor(w/columnNum);
            return colWidth;	 
	    };
		
      var setImageSize = function() {
		     var colWidth = getColWidth();
	           // Set width of each column
			  $gridContainer.find('.gallery-item , .portfolio-item').each(function(){ 
					var $column = $(this).find('.image'),
					$columnphoto = $column.find('img');
					if ($column.hasClass('large')) {
						$columnphoto.css({
							'width'		 : ((colWidth*2) - padding ) + 'px',
							'min-height' : ( ((colWidth*2) * 0.680 )  ) + 'px',
						   });
					  }
					  
					 else if ($column.hasClass('long')) {
						$columnphoto.css({
							'width'		 : ((colWidth) - padding ) + 'px',
							'min-height' : ((colWidth) *  1.37) + 'px'
						   });
					  }
					  
					 else if ($column.hasClass('wide')) {
						$columnphoto.css({
							'width'		 : ((colWidth*2) - padding) + 'px',
							'min-height' : (((colWidth*2)  *  0.342 ) -  padding ) + 'px'
						   });
					  }  
					  
					   else {
						$columnphoto.css( { 
							'width'  	 : ( colWidth - padding) + 'px',
							'min-height' : ( ( colWidth * 0.685 ) -  padding + 1 ) + 'px'
							});
					    }
				});		 
	      };
		  
	  var isotopeInit = function() {
		  var colWidth = getColWidth();
	      $gridContainer.isotope({
			  resizeable : false ,
			 masonry: {
				columnWidth: colWidth
				}, 
		    itemSelector : '.gallery-item , .portfolio-item',
		    layoutMode : 'masonry' 
	     });
	  };
		  
	setImageSize();
	isotopeInit();
	
	$(window).on("debouncedresize",function(){ setImageSize();isotopeInit();});	  

	});
}

// custom fancy border plugin 

$.fn.fancyBorder = function(options) {
	return this.each(function() {
	    var $gridContainer = $(this);
        var init = function() {
		
		 var topPosition = 0,
		 		 totalRows = 0,
		   currentRowStart = 0,
		        currentDen = 4,
			    currentRow = -1,
				currentCell = 1 ,
			   windowWidth = $(window).width(),
				      rows = [],
				   tallest =  [],
				   $cells  =  $gridContainer.find('[class*="span"]'),
				 firstCell = $($cells[0]);
		
	    if ( $cells.length < 1 ) {
		    return false;
		}
		
	   if(firstCell.hasClass('spanone_fifth')  ) {  currentDen = 5 ; }
	      else if (firstCell.hasClass('span2') ) {  currentDen = 6 ; } 
	      else if (firstCell.hasClass('span3') ) {  currentDen = 4 ; } 
	      else if (firstCell.hasClass('span4') ) {  currentDen = 3 ; }
	       else if (firstCell.hasClass('span6')) {  currentDen = 2 ; } 
 
        if( windowWidth < 800 ) {
	         if( firstCell.hasClass('span6') || firstCell.hasClass('span4') ) 
			 {
	           currentDen = 1 ;	 
	         }
			 else
			 {
			   currentDen = 2 ;	 
			 }
		}
		 
	  
	   $cells.each(function() {
		    var $this = $(this),
			currentHeight = $this.children().outerHeight(true) + 2;
          
	        if (currentCell % currentDen == true) {
						currentRow++;
						tallest[currentRow] = currentHeight;
						rows.push([]);
						rows[currentRow].push($this);
				} else {					
						if (currentRow < 0) {
							currentRow = 0;
							rows.push([]);
						}
						rows[currentRow].push($this);
						tallest[currentRow] = (tallest[currentRow] < currentHeight) ? (currentHeight) : (tallest[currentRow]);
                   }
					
			currentCell++;	
		});
		
			var totalRows = rows.length ,
			            i = 0 ,
						j = 0 ;
			
			for (i = 0; i < totalRows; i++) {

					var inCurrentRow = rows[i].length;
						
					for (j = 0; j < inCurrentRow; j++) {
                        
					rows[i][j].css("height", tallest[i]);
					
					 if ( j == 0) {
							rows[i][j].addClass("border-left");
						} else {
							rows[i][j].removeClass("border-left");
						}
						
						if ( i == totalRows - 1) {
							rows[i][j].addClass("bottom-row");
								rows[i][j].addClass("border-bottom-none");
						} else {
							rows[i][j].removeClass("bottom-row");
							rows[i][j].removeClass("border-bottom-none");
						}
						
					if ( i == 0) {
							rows[i][j].addClass("top-row");
						} else {
							rows[i][j].removeClass("top-row");
						}	
					 if ( j == currentDen - 1 ) {
							rows[i][j].addClass("border-right-none");
						} else {
							rows[i][j].removeClass("border-right-none");
						}
						if ( j == inCurrentRow - 1) {
							rows[i][j].addClass("border-right");
						} else {
							rows[i][j].removeClass("border-right");
						}
			  
		
					}
				}	   	     
	  
		}
	  
	  init();
	   
	  $(window).on("debouncedresize", function() { // ! needs to be !changed
		    init();
	   });
     });
   }


 $(document).ready(function($){

     //superb menu ( Main Navigation Menu { header })
    $("#main_menu").supersubs({
	        minWidth:    19,   // minimum width of sub-menus in em units 
			maxWidth:    27,   // maximum width of sub-menus in em units 
			extraWidth:  1     // extra width can ensure lines don't sometimes turn over 
			         }).superfish({
			 delay:  100,
			 autoArrows: false ,
			 speed: 'fast',
		 	 dropShadows : false ,
			 hoverClass : 'hover' ,
			 animation:   {opacity:'show'}
		});
	
	    //mobile toggle menu
		$(".toggle-menu").click(function(e) {
			e.preventDefault();
			$("body").toggleClass('expanded');
		});
		
       //mobile menu events
	   $('#mobile_navigation ul.mobile_menu  li').each(function(){
		   if($(this).hasClass('current-menu-parent') || $(this).hasClass('current-menu-item')){
			   $(this).parent().find(' > li ').removeClass('active').find( ' > ul').hide();
			   $(this).addClass('active').find( ' > ul').show();
		   }
	   });
	   
	  $('#mobile_navigation ul.mobile_menu  li:has(">ul") > a').click(function(e){
		 e.preventDefault();
		 $(this).parent().parent().find(' > li').removeClass('active').find(' > ul').slideUp(200);
		 $(this).parent().addClass('active');	
         $(this).parent().find('> ul').stop(true,true).slideDown(200);
	  });	
	  
	  $(window).on("debouncedresize",function(){ if( $(window).width() > 800 && !($(window).width() > 768 &&  $(window).width() < 980 ) ){ $("body").removeClass('expanded');}});
	  
	  //sticky Nav
	   $(window).scroll(function() {  
	     var scrollTop = $(window).scrollTop(),			 
		  headerHeight = $('#main_navigation').height();
	      if(scrollTop > ( headerHeight + 150)) {
		     	$('#header').addClass('sticky');
		     } else {
		     	$('#header').removeClass('sticky');
		  }});
		  
		  
	  // Vertically center Titlebar style2 content
	  if($('#titlebar.style2').length > 0 ) {
	   var titleHeight = (( $('#titlebar.style2 .container > .row-fluid').height() / 2 ) - ( $('#titlebar.style2 .container > .row-fluid .titlebar-content').height() / 2 ) - 15 );

	   $('#titlebar.style2  .titlebar-content').css('top',titleHeight+"px");
        //add scroll event 
	    $(window).scroll(function() {
		     var scrollTop = $(window).scrollTop(); 
               // sticky titlebar text
			  $('#titlebar.style2 .container .titlebar-content').css({ 
			   'opacity' : 1-(scrollTop/600),
			   'top' : (scrollTop*0.8) + titleHeight + "px"
		     });
		});
	  }
	  
	  
	  //fit videos
	  $('.video').fitVids();
	   
	 
	 
		
	
     
	//Automatic text placeholder
	 $('input[type=text] , textarea , input[type=email] ').each(function() {
		var default_value = this.value;
		$(this).focus(function(){
		   if(this.value == default_value) {
		           this.value = '';
		   }
		});
		$(this).blur(function(){
		       if(this.value == '') {
		               this.value = default_value;
		       }
		});
	});	
	
   
	//set fancy border on layout style2 and style3 except portfolios
    $('.row-fluid.style3').append(' <div class="border-top-extra"></div> \
	                                     <div class="border-top-left-extra"></div> \
										 <div class="border-top-right-extra"></div> \
										 <div class="border-bottom-extra"></div> \
										 <div class="border-bottom-left-extra"></div>')
					.find('[class*="span"]').last().append('<div class="border-bottom-right-extra"></div>');
	
     $('.row-fluid.style2:not(.portfolio-items) , .row-fluid.style3:not(.portfolio-items)').fancyBorder();
	
	 //portfolio tabs
	   $('.portfolio-tabs > ul > li >  a').on('click',function(e){
		e.preventDefault();
		var selector = $(this).attr('data-filter');
		$('.portfolio-items.filterable-items').isotope({ filter: selector });
		$(this).parents('ul').find('li').removeClass('active');
		$(this).parent().addClass('active');
	});	
	
		
	//verically center
	function verticalCenter() {
		
		$('.full-width-alternate > .container > .row-fluid > .row-fluid').each(function(index, element) {
	         var Instance = $(this) ,
		           Height = 0 ,
		      windowWidth = $(window).width(); 
				
           Instance.find(' > [class*="span6"]').each(function(){
				  Height =  $(this).outerHeight() > Height ? $(this).outerHeight() : Height ;
			 });

		   Instance.find(' > [class*="span6"]').each(function() {
		     var marginTop  = windowWidth > 800 ? ( Height / 2 ) -  ( $(this).outerHeight() / 2 ) + 'px' : '40px' ;	 
			 $(this).css('margin-top',marginTop);   
		   });
        });
	}
		
   $(window).load(function() {
	    verticalCenter();
   });
   
    $(window).on('debouncedresize' , function() {
	    verticalCenter();
   });
	  
	  
	 //////////////////////////// ALL SHORTCODES ///////////////////////////////////// 
	  
	 //animation boxes 
	 $('.animated-box').each(function(i)
		{
			var element = $(this);
            setTimeout(function()
		
			{
				element.waypoint(function(direction)
				{
				var animatebox = $(this),
				effect = animatebox.attr('data-effect');
				 if (!animatebox.hasClass('animated')) {
					animatebox.addClass("animated "+ effect);
				}
				
				}, { offset: '80%' , triggerOnce: true} );

			},i*100)
		});	
		
	//easy pie chart setup
    $('.chart-shortcode').each(function(){
		$(this).easyPieChart({
						animate: 1000,
						lineCap: 'square',
						lineWidth: $(this).attr('data-linewidth'),
				           size : $(this).attr('data-size'),
						barColor: $(this).attr('data-barcolor'),
						trackColor: $(this).attr('data-trackcolor'),
						scaleColor: 'transparent'
					});
	   });
	
	//easy pie chart run
	$('.chart-shortcode').each(function(){
		var element = $(this);
             setTimeout(function(){
				element.waypoint(function(direction)
				{
				if (!$(this).hasClass('animated')) {
					$(this).addClass('animated');
					var animatePercentage = parseInt($(this).attr('data-animatepercent'), 10);
					$(this).data('easyPieChart').update(animatePercentage);
				}}, { offset: 'bottom-in-view' , triggerOnce: true} );
              },100);	
	 });
	
	
	//skill bars
	$('.progress').each(function()
		{
		  var element = $(this);
            setTimeout(function()
	        {
			  element.waypoint(function(direction)
				{
				var progressBar = $(this),
				progressValue = progressBar.find('.bar').attr('data-value');
				 if (!progressBar.hasClass('animated')) {
					progressBar.addClass('animated');
					
					progressBar.parent().find('strong').animate({
						opacity: 1
					}, 300 );
					progressBar.find('.bar').animate({
						width: progressValue + "%"
					}, 600 );
				  } 
			     }, { offset: 'bottom-in-view' , triggerOnce: true} );
               },100)
		 });
		 
		  		 
	//tooltip
	 $('.tooltips').tooltip({ selector: "a[class=tooltip]" });
	 	
	
  //Full Width Content Carousel
    function carouselUpdate(e, opts, slideOpts, currSlide, isAfter ){
	   $('.carousel-content').css('display','none');
	   $('.carousel-content:eq('+ ( $(currSlide).index() - 1 ) + ')').fadeIn("slow");

	}
	
	function carouselInit( e, opts, slideOpts, currSlide, isAfter ) {
		 $('.carousel-content').css('display','none');
	     $('.carousel-content:eq('+ ( $(currSlide).index()  ) + ')').fadeIn("slow");

		}
	
	$('.full-width-carousel').each(function(){
		var carouselInstance = $(this),
			 nextCarousel = carouselInstance.find('.carousel-next'),
			 prevCarousel = carouselInstance.find('.carousel-prev'),
			 pagination   = carouselInstance.find('.pagination');
		
		carouselInstance.on( 'cycle-bootstrap', function( event, opts ) {
			
         opts.container.on( 'cycle-update-view-before', carouselUpdate );
         opts.container.one( 'cycle-update-view-after', carouselInit );

    // your event handler code here
    // argument opts is the slideshow's option hash
});	
	   	 
	 carouselInstance.find('.carousel-images').cycle({ 
               fx: 'scrollHorz', 
            speed:  300 ,
          timeout:  0 ,
		  easing : 'easeInOutQuart',
		   pager : pagination ,
			next : nextCarousel ,
			prev : prevCarousel 
           
         });
	});
	
	
	//flex slider
	
	 $('.flexslider').each(function(){
		 var flexInstance = $(this),
		      effect = flexInstance.attr("data-effect") ? flexInstance.attr("data-effect") : "slide",
		    autoplay = flexInstance.attr("data-autoplay") ? flexInstance.attr("data-autoplay") : false ,
		  pagination = flexInstance.attr("data-pagination") ? flexInstance.attr("data-pagination") : true,
		   direction = flexInstance.attr("data-directionnav") ? flexInstance.attr("data-directionnav") : true ;
		 
		  flexInstance.flexslider({
     		  animation : effect,
	    	  slideshow : autoplay,                //Boolean: Animate slider automatically
			  controlNav: pagination,               //Boolean: Create navigation for paging control of each clide? Note: Leave true for manualControls usage
              directionNav: direction ,
		      flexeasing : "easeInOutQuart" });
		
		 });
		 
		 
   //carousel all ( post , clients , portfolio)
   $('.carousel-items:not(.clients)').each(function() {
	   var carouselInstance = $(this),
		       nextCarousel = carouselInstance.parent().parent().find('.carousel-next'),
		       prevCarousel = carouselInstance.parent().parent().find('.carousel-prev'),
		    carouselColumns = parseInt(carouselInstance.attr("data-columns"), 10),
				colWidth = (carouselInstance.attr('data-full-width') == 'yes') ? 453 : 353 ,
			       autoplay = carouselInstance.attr("data-autoplay") == 'yes' ? true : false;
	
		carouselInstance.imagesLoaded(function () {
			carouselInstance.carouFredSel({
				circular: false,
				responsive : true ,
		        items       : {
					width : colWidth ,
				    visible     : {
			            min         : 1 ,
			            max         : carouselColumns
			        }
			    },
				   swipe       : {
			        onTouch     : true,
			        onMouse         : true,
			        options      : {
			        	excludedElements: "button, input, select, textarea, .noSwipe"	
			        }},
		        scroll: {
			    	easing			: "easeOutQuart",
					duration		: 1000
			    },
				 auto    : {
			    	play: autoplay
			    },
				prev : {	
							button			: prevCarousel,
							key				: "left"
						},
				next : { 
							button			: nextCarousel,
							key				: "right"
						},
				onCreate : function() {	
				     $(this).animate( {'opacity' : '1'});
	                 var $ht = $(this).children().first().outerHeight(true);
					 carouselInstance.parent().css( {'height' : $ht+"px"});
		              }
					});
				});
				
				$(window).on("debouncedresize", function(){
			       var $ht = carouselInstance.children().first().outerHeight(true) ;
		           carouselInstance.parent().css( {'height' : $ht+"px"});
				 });	
				 	 
		
             });
			 
			 
		//Clients Carousel	 
		 $('.clients').each(function() {
	   var carouselInstance = $(this),
		       nextCarousel = carouselInstance.parent().parent().find('.carousel-next'),
		       prevCarousel = carouselInstance.parent().parent().find('.carousel-prev'),
		    carouselColumns = parseInt(carouselInstance.attr("data-columns"), 10),
			       autoplay = carouselInstance.attr("data-autoplay") == 'yes' ? true : false;
	
		carouselInstance.imagesLoaded(function () {
			carouselInstance.carouFredSel({
				circular: true ,
				responsive : true ,
		        items       : {
					width : 153 ,
				    visible     : {
			            min         : 1 ,
			            max         : carouselColumns
			        }
			    },
				   swipe       : {
			        onTouch     : true,
			        onMouse         : true,
			        options      : {
			        	excludedElements: "button, input, select, textarea, .noSwipe"	
			        }},
		        scroll: {
			    	easing			: "easeOutQuart",
					duration		: 1000
			    },
				 auto    : {
			    	play: autoplay
			    },
				prev : {	
							button			: prevCarousel,
							key				: "left"
						},
				next : { 
							button			: nextCarousel,
							key				: "right"
						},
				onCreate : function() {	
				     $(this).animate( {'opacity' : '1'});
	                 var $ht = $(this).children().first().outerHeight(true) + 1 ;
		             $(this).parent().css( {'height' : $ht+"px"});
					  }
					});
				});
				
				$(window).on("debouncedresize", function(){
			       var $ht = carouselInstance.children().first().outerHeight(true) ;
		           carouselInstance.parent().css( {'height' : $ht+"px"});
				 });	
				 	 	
				
             });	 
			 
	
	 
     //Accordions
     $('.accordion').each(function(){
	    var acc = $(this).attr("rel") * 2;
	    $(this).find('.accordion-inner:nth-child(' + acc + ')').show();
	     $(this).find('.accordion-inner:nth-child(' + acc + ')').prev().addClass("active");
	});

	$('.accordion .accordion-title').click(function() {
	    if($(this).next().is(':hidden')) {
	        $(this).parent().find('.accordion-title').removeClass('active').next().slideUp(200);
	        $(this).toggleClass('active').next().slideDown(200);
	    }
	    return false;
	});
	
	//toggle
	if( $(".toggle .toggle-title").hasClass('active') ){
		$(".toggle .toggle-title.active").closest('.toggle').find('.toggle-inner').show();
	}
	
	$(".toggle .toggle-title").click(function(e){
		e.preventDefault();
		if( $(this).hasClass('active') ){
			$(this).removeClass("active").closest('.toggle').find('.toggle-inner').slideUp(200);
		}
		else{
			$(this).addClass("active").closest('.toggle').find('.toggle-inner').slideDown(200);
		}
	});
	

    //alert messages
	$(".alert .close").click(function(){
		$(this).parent().animate({'opacity' : '0'}, 300).slideUp(300);
		return false;
	});	
	
	
	//tabs
	$('.tabset').tabset();
	$('.tabset .tabs').each(function() {
		var tabWidth = $(this).width();
	    var tabItems = $(this).find('li').size();
	    var tabLastItem = $(this).find('li:not(:last)');
	    var tabLastItemSize = $(this).find('li:not(:last)').size();

		if(tabItems%2 == 0) {
			var itemWidth = Math.ceil(tabWidth/tabItems)-1;
		} else {
			var itemWidth = Math.ceil(tabWidth/tabItems);
		}

	    $(this).css({'width': tabWidth +'px'});
	    $(this).find('li').css({'width': itemWidth +'px'});
	});
	
	//isotope fixed bug for Full width Portfolios
	var portfolioContainer =  $('.section.full-width .portfolio .portfolio-items.portfolio-style2:not(".portfolio-with-padding-yes") , .section.full-width .portfolio .portfolio-items.portfolio-style3:not(".portfolio-with-padding-yes")');
	
	function setPortfolios() {
		portfolioContainer.each(function(){
		   var  windowWidth = $(window).width() ,
		          columns = $(this).data('columns') > 1 ? $(this).data('columns') : 4 ;
				  
				if( windowWidth <= 800 )  {
					if( columns = 4 ) { columns = 2;}
					             else { columns = 1; }
				 }
				 
				if(windowWidth <= 500)  { columns = 1;}
				
           var portfolioWidth =  Math.floor ( windowWidth / 4 ) ;
	
       $(this).find(' > .portfolio-item').each(function () { 
				jQuery(this).css( { 
					width : portfolioWidth + 'px' 
				});
	        });
	    });
		
	}
	
	if(portfolioContainer.length > 0) {
		setPortfolios();
		$(window).bind('resize',function(){setPortfolios();portfolioContainer.isotope('reLayout');});
       }
	
 });



 $(window).load(function() {
		
  //portfolio and gallery masonary layout
  $('.gallery , .portfolio .portfolio-items.portfolio-style4:not(.carousel-items)').customGallery();

   //custom portfolio layout
   $('.portfolio .portfolio-items:not(.carousel-items,.portfolio-style4)').isotope({
	          resizable : true , // Enable normal resizing
	         layoutMode : 'customfitRows', //Set owin custom layout moder to maintian fancy border
		   itemSelector : '.portfolio-item',
		animationEngine : 'best-available',
	  	animationOptions: {
	     	duration: 200,
	     	easing: 'easeInOutQuad',
	     	queue: false
	   	} 
	  });	


  //counter title
  $('.counter-title').waypoint(function() {
			$(this).find('> span > span').each(function() {
				var percentage = $(this).data('percentage');
				$(this).countTo({from: 0, to: percentage, speed: 900});
			});
		}, {
			triggerOnce: true,
			offset: '100%'
		});
   
   
	
	//Set the content height and sidebar height equals
  $('.section-with-sidebar > .container > .row-fluid').imagesLoaded(function(){
		var sidebar = $(this).find(' > .sidebar') ,
		    content = $(this).find(' > .content') ,
			height = 0;
		if( content.outerHeight() > height ){ height = content.outerHeight() }	
		if( sidebar.outerHeight() > height ){ height = sidebar.outerHeight() }	
		sidebar.css("height",height+"px");
		content.css("height",height+"px");	
	
});	
 });
//  $('.portfolio .portfolio-items:not(.carousel-items)').infinitescroll({
//		    navSelector  : "div.pagination", 
//		    nextSelector : "a.pagination-next , .loadmore",  
//		    itemSelector : "div.portfolio-item",          
//		    errorCallback: function() {
//		    	$('.portfolio .portfolio-items:not(.carousel-items)').isotope('reLayout');
//		    }
//		}, function(posts) {
//			if($().isotope) {
//				$(posts).css('position', 'relative').css('top', 'auto').css('left', 'auto');
//				$('.portfolio .portfolio-items:not(.carousel-items)').isotope('appended', $(posts));
//				$('.portfolio .portfolio-items:not(.carousel-items)').isotope('reLayout');
//			}
//		});
// end functions all

$(function() {
	
$('.animated').appear();
                $(document.body).on('appear', '.animate-from-left', function() {
                    jQuery(this).each(function() {
                        jQuery(this).delay(150).animate({opacity: 1, left: "0px"}, 1000);
                    });
                });
                $(document.body).on('appear', '.animate-from-right', function() {
                    jQuery(this).each(function() {
                        jQuery(this).delay(150).animate({opacity: 1, right: "0px"}, 1000);
                    });
                });
                $(document.body).on('appear', '.animate-from-top', function() {
                    jQuery(this).each(function() {
                        jQuery(this).delay(150).animate({opacity: 1, top: "0px"}, 1000);
                    });
                });
                
                

                $(document.body).on('appear', '.animate-from-bottom', function() {
                    jQuery(this).each(function() {
                        jQuery(this).delay(150).animate({opacity: 1, bottom: "0px"}, 1000);
                    });
                });       

    });

}(jQuery))