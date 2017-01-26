jQuery(document).ready(function($) {

  /* Sort table order ======================================= */
  	var order = ["GOOGLEPLACES", "FACEBOOK", "ENIRO", "FOURSQUARE", "YELP", "AROUNDME", "NAVMII", "TUPALO", "BROWNBOOKNET", "WHERETO", "TORGET", "INFOBEL", "CYLEX", "OPENDI"];

  $.each(order, function(){
  	$("table").append($("#" + this));
  });

  /* Append yext-scan query string to all links a[href] ======================================= */
  $("#main-order-cta, .add_to_cart")/*.not('.navbar-brand, .viewlink')*/.each(function(){
      var href = $(this).attr('href');

      if(href.indexOf('?') !== -1){
          // Query string exists, append current query string
          href += '&' + location.search.replace(/^\?/, '');
      }else{
          // No query string yet, add it
          href += location.search;
      }

      $(this).attr('href', href);
  });

	/* validate email ======================================= */
	$('#contact-form').submit(function() {
		var buttonCopy = $('#contact-form button').html(),
			errorMessage = $('#contact-form button').data('error-message'),
			sendingMessage = $('#contact-form button').data('sending-message'),
			okMessage = $('#contact-form button').data('ok-message'),
			hasError = false;
		$('#contact-form .error-message').remove();
		$('#contact-form .requiredField').each(function() {
			$(this).removeClass('inputError');
			if($.trim($(this).val()) === '') {
				var errorText = $(this).data('error-empty');
				$(this).parents('.controls').append('<span class="error-message" style="display:none;">'+errorText+'</span>').find('.error-message').fadeIn('fast');
				$(this).addClass('inputError');
				hasError = true;
			} else if($(this).is("input[type='email']") || $(this).attr('name')==='email') {
				var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
				if(!emailReg.test($.trim($(this).val()))) {
					var invalidEmail = $(this).data('error-invalid');
					$(this).parents('.controls').append('<span class="error-message" style="display:none;">'+invalidEmail+'</span>').find('.error-message').fadeIn('fast');
					$(this).addClass('inputError');
					hasError = true;
				}
			}
		});

		if(hasError) {
			$('#contact-form button').html(errorMessage).addClass('btn-error');

			setTimeout(function(){
				$('#contact-form button').removeClass('btn-error').html(buttonCopy);

			},3000);
		}
		else {
			$('#contact-form button').html(sendingMessage);

			var formInput = $(this).serialize();
			var link = $(this).attr('action');
			$.ajax({
				type: 'POST',
				url: link,
				data: formInput
			}).done(function(data) {

			  //$('#contact-form').trigger("reset");
				$('#contact-form').fadeToggle( "slow", "linear" );
			  $( this ).addClass( "done" );
			  $('#contact-form button').html(okMessage);
			  $('#alert-contact').show();



				// Results positive
			  setTimeout(function(){
					$('#contact-form button').html(buttonCopy);
				},4000);

				if(document.URL.indexOf("contact-me.php") >= 0){
					//alert('mail-skickat via php-formulär.');

				} else {

						// Set active URL location with form Input Parameters (string)
					  //var loc = window.location /*'http://narvarokollen.eniro.se/?'*/ + formInput;
						var forward = function(){
							$(location).attr('href', link + '?' + formInput);
						};
						setTimeout(forward,150);
				}
			})

			.fail(function() {
				$('#contact-form button').html('Ojdå, försök igen...').addClass('btn-error');
    			setTimeout(function(){
					$('#contact-form button').html(buttonCopy);
				},4000);
  			});

		}
		return false;
	});
});
