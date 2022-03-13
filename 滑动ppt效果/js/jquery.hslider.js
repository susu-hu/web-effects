// Developed by CodeInn.co
// Released under MIT License (https://opensource.org/licenses/MIT)
//
//The MIT License (MIT)
//Copyright (c) 2016 CodeInn.co
//Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated 
//documentation files (the "Software"), to deal in the Software without restriction, including without limitation 
//the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, 
//and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//
//The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES 
//OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE 
//LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR 
//IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


(function($) {

	var defaults = {
		// AUTO
		navBar: false,
		auto: false,
		pause: 5000

	};

	$.fn.hslider = function(options) {

		if (this.length === 0) {
			return this;
		}


		// if there are more than one elements being used
		if (this.length > 1) {
			this.each(function() {
				$(this).hslider(options);
			});
			return this;
		}


		var settings = {};
		if ($(thisSlider).data('hslider')) {
			return;
		} // if already initialized, return
		settings = $.extend({}, defaults, options); //merge the default settings and the specified settings



		var thisSlider = this;
		var leftX = 0,
			windowWidth = 0,
			galleryWidth = 0,
			galleryWidthSpace = 0,
			$responsiveHeight = 0;
		var nextChildNum, prevChildNum, resizeTimer, windowWidthTimer;
		var autoInterval;
		var windowWidthAddedPadding = 1;

		var $container = thisSlider;
		//var $imageContainer = $container.find( 'img' ).parent().addClass( 'hsldr-image-container' );

		var $imageContainer;
		$imageContainer = $container.find('figure');
		if ($imageContainer.length > 0) {
			$imageContainer.addClass('hsldr-image-container');
			$imageContainer.wrapAll("<div class='hsldr-gallery-container'></div>");
		} else {
			$imageContainer = $container.find('li');
			if ($imageContainer.length > 0) {
				$imageContainer.addClass('hsldr-image-container');
				$imageContainer.closest('ul').wrapAll("<div class='hsldr-gallery-container'></div>");
			}

		}

		//var $imageContainer = $container.find( 'figure, li' ).addClass( 'hsldr-image-container' );		
		//$imageContainer.wrapAll( "<div class='hsldr-gallery-container'></div>" );

		var $galleryContainer = $container.find('.hsldr-gallery-container');
		var $allImages = $imageContainer.find('img');
		var $figcaption = $imageContainer.find('figcaption, .caption');

		if ($figcaption.length > 0) {
			$figcaption.parent().append('<span class="info"></span>');
		}

		var $allInfo = $container.find('.info');

		var $imageNumber = $allImages.length;
		var $imageWidths = Array.apply(null, Array($imageNumber)).map(Number.prototype.valueOf,
		0); // initialize to all zeros
		var $activeIndex = 0; // current active image index	



		if (settings.navBar) {

			$container.addClass("hsldr-has-nav-bar");
			var $dotString = '<div class="hsldr-nav-region"></div>';
			$dotString += '<div class="hsldr-nav-marker"></div>';

			$container.append('<div class="hsldr-nav-wrapper">' + $dotString + '</div>');
			// store pointers to all the dot elements
			var $allNavDots = $container.find('.hsldr-nav-marker');
			var $allNavDotsWrapper = $container.find('.hsldr-nav-wrapper');
			var $navRegion = $container.find('.hsldr-nav-region');
		}



		$container.append(
			'<div class="hsldr-navigation"><a href="#" class="hsldr-prev"></a><a href="#" class="hsldr-next"></a></div>'
			);
		var $nextButton = $container.find('.hsldr-next');
		var $prevButton = $container.find('.hsldr-prev');





		var computeCacheImageWidths =
	function() { // computes the current image widths and stores as a n array so that it can be retrieved fast later
			var loopCounter = 0;
			$imageContainer.each(function() {
				$imageWidths[loopCounter] = Math.floor($(this).width());
			 loopCounter++;
			});
		}


		var compSetWidths = function() {
			windowWidth = $(window).width();

			$responsiveHeight = windowWidth / 1.7;

			if (windowWidth < 600 * 1.7) {
				$container.css('max-height', ($responsiveHeight + 30) + 'px');
				$allImages.css('max-height', $responsiveHeight + 'px');
			} else {
				$container.css('max-height', '630px');
				$allImages.css('max-height', '600px');
			}

			windowWidth += windowWidthAddedPadding;

			/* Add up image widths to determine the gallery container width */
			computeCacheImageWidths();
			galleryWidth = 0;
			for (var i = 0; i < $imageWidths.length; i++) {
				galleryWidth += $imageWidths[i];
			}

			// Set gallery container width
			galleryWidthSpace = galleryWidth + 4;
			$galleryContainer.width(galleryWidthSpace);
		}


		var discourageWhiteSpace =
	function() { // try to remove the white space on either sides by adjusting the leftX. If white space is not avoidable, center the gallery.
			//if galleryWidth is smaller than windowWidth, jsut center the gallery
			if (galleryWidth <= windowWidth) {
				leftX = (galleryWidth - windowWidth) / 2;
			} else if (leftX <= 0) { // white space on left side
				leftX = 0;
			} else if ((galleryWidth - leftX) <= windowWidth) { // white space on right side
				leftX = galleryWidth - windowWidth;
			}

			if (settings.navBar) {
				updateVisibleDots();
			}
		}


		var updateVisibleDots = function() {

			// find which of the images are visible
			var startIndex = 0;
			var endIndex = 0;
			var widthSum = 0;
			var isStartSet = false;
			var isEndSet = false;
			for (var i = 0; i < $imageWidths.length; i++) {
				widthSum += $imageWidths[i];

				if (!isStartSet) {
					if (widthSum > leftX) {
						startIndex = i;
						isStartSet = true;
					}
				}

				if (!isEndSet) {
					if (widthSum > (leftX + windowWidth)) {
						endIndex = i;
						isEndSet = true;
					}
				}

			}

			if (!isStartSet) startIndex = 0;
			if (!isEndSet) endIndex = ($imageWidths.length - 1);

			if (startIndex < 0) startIndex = 0;
			if (startIndex > ($imageWidths.length - 1)) startIndex = ($imageWidths.length - 1);

			if (endIndex < 0) endIndex = 0;
			if (endIndex > ($imageWidths.length - 1)) endIndex = ($imageWidths.length - 1);

			if (endIndex < startIndex) endIndex = startIndex;




			var bgWidth = (windowWidth / 450) * 200;
			if (bgWidth > 200) bgWidth = 200;

			var barWidth = (windowWidth / galleryWidth) * bgWidth;
			var barLeft = leftX * (bgWidth - barWidth) / (galleryWidth - windowWidth);
			if (barLeft > (bgWidth - barWidth)) barLeft = (bgWidth - barWidth);

			bgWidth = Math.floor(bgWidth);
			barWidth = Math.floor(barWidth);
			if (barWidth > bgWidth) barWidth = bgWidth;
			if (barWidth < 1) barWidth = 1;
			barLeft = Math.floor(barLeft);
			if (barLeft < 0) barLeft = 0;


			$allNavDots.css({
				'width': bgWidth + 'px'
			});

			$navRegion.animate({
				left: barLeft,
				width: barWidth
			});


		}


		var makeCentral = function() {

			// all previous images total width	
			console.log('calling makeCentral');
			var prevImgWidth = 0;
			for (var i = 0; i < $activeIndex; i++) {
				prevImgWidth += $imageWidths[i];
			}

			leftX = (prevImgWidth + $imageWidths[$activeIndex] / 2) - windowWidth / 2;
			discourageWhiteSpace();
			$galleryContainer.css('left', -leftX + 'px');



			//position the caption 'i' icon properly
			var thisImageWidth;
			var hiddenWidth;
			for (var i = 0; i < $imageWidths.length; i++) {
				thisImageWidth = $imageWidths[i];
				hiddenWidth = (thisImageWidth - windowWidth) / 2;
				if (hiddenWidth < 0) hiddenWidth = 0;

				var $curInfo = $allImages.eq(i).closest('.hsldr-image-container').children('.info');
				$curInfo.css('right', (Math.ceil(hiddenWidth) + 10) + 'px');


			}


		}


		$(window).on('resize', function(e) {
			$galleryContainer.width('99999px');

			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(function() {

				// Run code here, resizing has "stopped"
				compSetWidths();
				makeCentral();

			}, 250);


			// if scroll bar hides due to resize, the old window width becomes incorrect 
			clearTimeout(windowWidthTimer);
			windowWidthTimer = setTimeout(function() {
				windowWidth = $(window).width() + windowWidthAddedPadding;
				makeCentral();
			}, 1000); // the delay shoudld be sufficiently bigger than the one use above		

		});


		var showNextSlide = function() {

			if ((leftX == (galleryWidth - windowWidth)) || ($activeIndex == $imageNumber -
				1)) { // no images left. the expression inside the if clause should be identical to the one in discourageWhiteSpace() 
				//scroll to the begining
				$activeIndex = 0;
				$(thisSlider).find('.active-slide').removeClass('active-slide');
				$(thisSlider).find('.hsldr-image-container:first-child').addClass('active-slide');
				makeCentral();

			} else {

				//fidn the image just past the center point
				var targetValue = leftX + windowWidth / 2;
				var curSum = 0;
				var childNUm = 0;
				var curWidth = 0;
				for (var i = 0; i < $imageWidths.length; i++) {
					curWidth = $imageWidths[i];
					curSum += curWidth;

					if (curSum >= targetValue) {
						break; // break out of the loop
					}

					childNUm++;
				}

				// if subtracting half the width of the cur child is past the middle, then cur image otherwise next image
				if ((curSum - curWidth / 2) >= (targetValue + 5)) { // number 5 to avoid any ambiguity
					nextChildNum = childNUm;
				} else {
					nextChildNum = childNUm + 1;
				}

				// remove old active slide and add new active slide
				$activeIndex = nextChildNum;
				$(thisSlider).find('.active-slide').removeClass('active-slide');
				$galleryContainer.children('.hsldr-image-container').eq(nextChildNum).addClass(
					'active-slide');

				makeCentral();

			}


		}




		var showPrevSlide = function() {



			if ((leftX == 0) || ($activeIndex == 0)) { // no images left.
				$activeIndex = $imageNumber - 1;
				$(thisSlider).find('.active-slide').removeClass('active-slide');
				$(thisSlider).find('.hsldr-image-container:last-child').addClass('active-slide');
				makeCentral();

			} else {

				//find the image just before the center point
				var targetValue = leftX + windowWidth / 2;
				var curSum = 0;
				var childNUm = 0;
				var curWidth = 0;
				for (var i = 0; i < $imageWidths.length; i++) {
					curWidth = $imageWidths[i];
					curSum += curWidth;

					if (curSum >= targetValue) {
						break; // break out of the loop
					}

					childNUm++;
				}

				// if subtracting half the width of the cur child is past the middle, then cur image otherwise next image
				if ((curSum - curWidth / 2) >= (targetValue - 5)) { // number 5 to avoid any ambiguity
					prevChildNum = childNUm - 1;
				} else {
					prevChildNum = childNUm;
				}


				// remove old active slide and add new active slide
				$activeIndex = prevChildNum;
				$(thisSlider).find('.active-slide').removeClass('active-slide');
				$galleryContainer.children('.hsldr-image-container').eq(prevChildNum).addClass(
					'active-slide');

				makeCentral();

			}


		}




		var initSlider = function() {

			$galleryContainer.imagesLoaded(function() {
				compSetWidths();
				$container.addClass('fade-in');
				makeCentral();
			});


			$imageContainer.on('click', '.info', function() {
				$(this).parent().toggleClass('showcaption').siblings().removeClass('showcaption');
			});


			// NEXT button
			$nextButton.on('click', function(e) {

				e.preventDefault();
				abortSlideTimer(); // disable auto play if navigation buttons are pressed

				showNextSlide();

			});


			// Previous button
			$prevButton.on('click', function(e) {

				e.preventDefault();
				abortSlideTimer(); // disable auto play if navigation buttons are pressed

				showPrevSlide();

			});


			if (settings.auto) {
				var delayVal = settings.delay;
				if (delayVal < 1000) delayVal = 1000;
				var autoInterval = setInterval(showNextSlide, delayVal);
			}



			var abortSlideTimer = function() {
				clearInterval(autoInterval);
			}


			// if scroll bar hides due to resize, the old window width becomes incorrect 
			clearTimeout(windowWidthTimer);
			windowWidthTimer = setTimeout(function() {
				windowWidth = $(window).width() + windowWidthAddedPadding;
			}, 1000); // the delay shoudld be sufficiently bigger than the one use above	


		};

		initSlider();



		$(thisSlider).data('hslider', this); // store for later use
		return this;

	};

}(jQuery));
