$(document).ready(function(){
	// Retrieve stripe public key for permission to interact with stripe
	Stripe.setPublishableKey($('meta[name="stripe-key"]').attr('content'));
	
	// Watch for form submission
	$("#form-submit-btn").click(function(event) {
		event.preventDefault();
		$('input[type=submit]').prop('disabled', true); //disables button
		var error = false;

		// Grab values from input fields
		var ccNum = $('#card_number').val(),
			cvcNum = $('#card_code').val(),
			expMonth = $('#card_month').val(),
			expYear = $('#card_year').val();

		if (!error) {
			// Get Stripe token
			Stripe.createToken({
				number: ccNum,
				cvc: cvcNum,
				exp_month: expMonth,
				exp_year: expYear
			}, stripeResponseHandler);
		}
		return false;
	}); //form submission

	function stripeResponseHandler(status, response) {
		// Get a reference to the form
		var f = $("#new_user");

		// Get token form the response
		var token = response.id;

		// Add token to the form
		f.append('<input type="hidden" name="user[stripe_card_token]" value="' + token + '" />');

		//Submit the form
		f.get(0).submit();
	}
});