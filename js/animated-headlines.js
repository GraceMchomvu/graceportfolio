jQuery(document).ready(function($){
	"use strict";
	var animationDelay 			= 3000,
		barAnimationDelay 		= 3800,
		barWaiting 				= barAnimationDelay - 3000,
		lettersDelay 			= 50,
		typeLettersDelay 		= 150,
		selectionDuration 		= 500,
		typeAnimationDelay 		= selectionDuration + 800,
		revealDuration 			= 600,
		revealAnimationDelay 	= 1500;
	
	function measureWordWidth($word){
		var $clone = $word.clone()
			.removeClass('is-hidden')
			.addClass('is-visible')
			.css({
				position: 'absolute',
				left: '-9999px',
				top: '0',
				visibility: 'hidden',
				display: 'inline-block',
				whiteSpace: 'nowrap',
				opacity: 1
			})
			.appendTo($word.parent());
		var width = Math.ceil($clone[0].getBoundingClientRect().width);
		$clone.remove();
		return width;
	}

	function sizeClipWrapper(headline){
		var $wrapper = headline.find('.cd-words-wrapper');
		var width = 0;
		$wrapper.find('b').each(function(){
			var wordWidth = measureWordWidth($(this));
			if(wordWidth > width){ width = wordWidth; }
		});
		// Extra room for the clip caret + font metrics
		var finalWidth = Math.ceil(width) + 24;
		$wrapper.css({
			width: finalWidth,
			minWidth: finalWidth
		});
		$wrapper.data('max-width', finalWidth);
		return finalWidth;
	}

	function startHeadlines(){
		initHeadline();
	}

	if(document.fonts && document.fonts.ready){
		document.fonts.ready.then(startHeadlines);
	}else{
		$(window).on('load', startHeadlines);
		setTimeout(startHeadlines, 400);
	}

	$(window).on('resize', function(){
		$('.cd-headline.clip').each(function(){
			sizeClipWrapper($(this));
		});
	});

	function initHeadline() {
		singleLetters($('.cd-headline.letters').find('b'));
		animateHeadline($('.cd-headline'));
	}

	function singleLetters($words) {
		$words.each(function(){
			var word 		= $(this),
				letters 	= word.text().split(''),
				selected 	= word.hasClass('is-visible');
			for (var i in letters) {
				if(word.parents('.rotate-2').length > 0) {letters[i] = '<em>' + letters[i] + '</em>';}
				letters[i] 	= (selected) ? '<i class="in">' + letters[i] + '</i>': '<i>' + letters[i] + '</i>';
			}
		    var newLetters 	= letters.join('');
		    word.html(newLetters).css('opacity', 1);
		});
	}

	function animateHeadline($headlines) {
		var duration = animationDelay;
		$headlines.each(function(){
			var headline = $(this);
			
			if(headline.hasClass('loading-bar')) {
				duration = barAnimationDelay;
				setTimeout(function(){ headline.find('.cd-words-wrapper').addClass('is-loading'); }, barWaiting);
			} else if (headline.hasClass('clip')){
				sizeClipWrapper(headline);
			} else if (!headline.hasClass('type') ) {
				var words = headline.find('.cd-words-wrapper b'),
					width = 0;
				words.each(function(){
					var wordWidth = $(this).width();
				    if (wordWidth > width) {width = wordWidth;}
				});
				headline.find('.cd-words-wrapper').css('width', width);
			}

			setTimeout(function(){ hideWord( headline.find('.is-visible').eq(0) ); }, duration);
		});
	}

	function hideWord($word) {
		var nextWord = takeNext($word);
		
		if($word.parents('.cd-headline').hasClass('type')) {
			var parentSpan = $word.parent('.cd-words-wrapper');
			parentSpan.addClass('selected').removeClass('waiting');	
			setTimeout(function(){ 
				parentSpan.removeClass('selected'); 
				$word.removeClass('is-visible').addClass('is-hidden').children('i').removeClass('in').addClass('out');
			}, selectionDuration);
			setTimeout(function(){ showWord(nextWord, typeLettersDelay); }, typeAnimationDelay);
		
		} else if($word.parents('.cd-headline').hasClass('letters')) {
			var bool = ($word.children('i').length >= nextWord.children('i').length) ? true : false;
			hideLetter($word.find('i').eq(0), $word, bool, lettersDelay);
			showLetter(nextWord.find('i').eq(0), nextWord, bool, lettersDelay);

		}  else if($word.parents('.cd-headline').hasClass('clip')) {
			$word.parents('.cd-words-wrapper').animate({ width : '2px' }, revealDuration, function(){
				switchWord($word, nextWord);
				showWord(nextWord);
			});

		} else if ($word.parents('.cd-headline').hasClass('loading-bar')){
			$word.parents('.cd-words-wrapper').removeClass('is-loading');
			switchWord($word, nextWord);
			setTimeout(function(){ hideWord(nextWord); }, barAnimationDelay);
			setTimeout(function(){ $word.parents('.cd-words-wrapper').addClass('is-loading'); }, barWaiting);

		} else {
			switchWord($word, nextWord);
			setTimeout(function(){ hideWord(nextWord); }, animationDelay);
		}
	}

	function showWord($word, $duration) {
		if($word.parents('.cd-headline').hasClass('type')) {
			showLetter($word.find('i').eq(0), $word, false, $duration);
			$word.addClass('is-visible').removeClass('is-hidden');

		}  else if($word.parents('.cd-headline').hasClass('clip')) {
			var measured = measureWordWidth($word) + 24;
			var maxWidth = $word.parents('.cd-words-wrapper').data('max-width') || measured;
			var revealWidth = Math.max(measured, maxWidth);
			$word.parents('.cd-words-wrapper').animate({ 'width' : revealWidth }, revealDuration, function(){ 
				setTimeout(function(){ hideWord($word); }, revealAnimationDelay); 
			});
		}
	}

	function hideLetter($letter, $word, $bool, $duration) {
		$letter.removeClass('in').addClass('out');
		
		if(!$letter.is(':last-child')) {
		 	setTimeout(function(){ hideLetter($letter.next(), $word, $bool, $duration); }, $duration);  
		} else if($bool) { 
		 	setTimeout(function(){ hideWord(takeNext($word)); }, animationDelay);
		}

		if($letter.is(':last-child') && $('html').hasClass('no-csstransitions')) {
			var nextWord = takeNext($word);
			switchWord($word, nextWord);
		} 
	}

	function showLetter($letter, $word, $bool, $duration) {
		$letter.addClass('in').removeClass('out');
		
		if(!$letter.is(':last-child')) { 
			setTimeout(function(){ showLetter($letter.next(), $word, $bool, $duration); }, $duration); 
		} else { 
			if($word.parents('.cd-headline').hasClass('type')) { setTimeout(function(){ $word.parents('.cd-words-wrapper').addClass('waiting'); }, 200);}
			if(!$bool) { setTimeout(function(){ hideWord($word); }, animationDelay); }
		}
	}

	function takeNext($word) {
		return (!$word.is(':last-child')) ? $word.next() : $word.parent().children().eq(0);
	}

	function switchWord($oldWord, $newWord) {
		$oldWord.removeClass('is-visible').addClass('is-hidden');
		$newWord.removeClass('is-hidden').addClass('is-visible');
	}
});
