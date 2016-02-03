/*
takes an array of objects in the form of:
{
	name_of_input: {
		// options
		minLength:  number   OPTIONAL,
		setRequired: boolean   OPTIONAL - SETS THE INPUT TO 'REQUIRED'
	},
}

minNum  =  for number inputs, this indicates what the value must be greater than. Defaults to 0
				-> looks for - number > minNum = true

minChar = for text inputs, indicates the minimum number of characters
maxChar = maximum number of characters
setRequired = manually set an input to 'required'

onInvalid = takes a custom function -- what happens client-side when the input is invalid
onValid = takes a custom function -- what happens client-side upon valid entry

*/
(function($) {
	$.fn.validate = function(inputs){
		var c={},
			h={},
			m={},
			to_validate,
			item;
		c.valid_class = 'is-valid';
		c.invalid_class = 'is-invalid';
    	c.number_error = "Must be greater than ";
    	c.email_error = "Must have a valid email address";
    	c.password_error = "Invalid characters in password";
    	c.phone_error = "Invalid phone number"
		// If no array is entered, it automatically makes one from the inputs on the page
		if(inputs){
			to_validate=inputs;
		}
		else{
			var input_hash={};
			for(var i = 0; i < $('input').length; i++){
				input_hash[$($('input')[i]).attr('name')] = {};
			}
			to_validate = input_hash;
		}
		console.log(to_validate);

		h.show_invalid=function(el, message){
			var type = el.attr('type'),
    			message = message || '';
    		$('#'+type+'-message').remove();
			if(to_validate[el.attr('name')]['onInvalid']){
				el.removeClass(c.valid_class);
				to_validate[el.attr('name')]['onInvalid'](el);
			}
			else{
    			el.removeClass(c.valid_class).addClass(c.invalid_class);
    			el.after('<div id="'+type+'-message" class="error-msg">'+ message + '</div>');
			}
    		to_validate[el.attr('name')]['valid']=false;
    	}
    	h.show_valid=function(el){
    		var type = el.attr('type');
    		$('#'+type+'-message').remove();
    		if(to_validate[el.attr('name')]['onValid']){
    			to_validate[el.attr('name')]['onValid'](el);
    		}
    		el.removeClass(c.invalid_class).addClass(c.valid_class);
    		to_validate[el.attr('name')]['valid']=true;
    	}
    	h.reset_if_not_required=function(el){
    		if(!el.attr('required') && el.val().length == 0){
    			el.next('#'+el.attr('type')+'-message').remove();
    			el.removeClass(c.invalid_class);
    		}
    	}

		//default input type checks
		h.check_email = function(el){
			var pattern = el.attr('pattern') ? new RegExp(el.attr('pattern')) :  new RegExp('.+@.+\\..+','gi');
			console.log(pattern);
			if(el.val().length > 0 && el.val().match(pattern)){ h.show_valid(el); }
			else{ h.show_invalid(el,c.email_error); }
		}
		h.check_number = function(el, minNum){
			var minNum = minNum || 0;
			if(parseInt(el.val()) != NaN && el.val() > minNum){ h.show_valid(el); }
			else{ h.show_invalid(el,c.number_error+minNum); }
		}
		h.check_password = function(el){
			if(el.val().length == 0 || el.val().match(/\<|\>/)){ 
				el.val().match(/\<|\>/) ? h.show_invalid(el,c.password_error) : h.show_invalid(el, 'No characters entered');
			}
			else{ h.show_valid(el); }
		}
		h.check_phone = function(el, minNum){
			var pattern = el.attr('pattern') ? new RegExp(el.attr('pattern')) : new RegExp('^[\\d\-\(\)\\s]+$'),
				minNum = minNum || 0;
				console.log(minNum);
			if(el.val().length > 0 && el.val().match(pattern)){ 
				el.val().length <= minNum ? h.show_invalid(el, 'Must be more than '+minNum+' digits') : h.show_valid(el); 
			}
			else{ 
				el.val().length == 0 ? h.show_invalid(el,'Must enter a phone number') : h.show_invalid(el, c.phone_error); 
			}
		}

		// options to check for -
		h.minLength = function(el){
			if(el.val().length >= item.minLength){ /*good*/ }
			else{ /*bad*/ }
		}
		h.set_required = function(el){
			el.prop('required',true);
		}

		// loops through each input and applies the proper validation
		m.init=function(){

			$.each(to_validate, function(input){
				if(to_validate[input]['setRequired']){ h.set_required($('input[name="'+input+'"]')); }
				$('input[name="'+input+'"]').on('keyup',function(){
					var $el=$(this),
						input_type = $el.attr('type') || 'text';
					switch(input_type){
						case 'email' : h.check_email($el); break;
						case 'number' : h.check_number($el, to_validate[input]['minNum']); break;
						case 'password' : h.check_password($el); break;
						case 'tel' : h.check_phone($el, to_validate[input]['minNum']);
					}
				}).on('focusout',function(){
					var $el = $(this);
					h.reset_if_not_required($el);
				});
			});
		}
		m.init();	
	}
}(jQuery));

$('body').validate({
		number_field:{
			minNum: 2,
			onValid: function(el){
				alert('Custom onValid triggered, wooooh!');
			}
		},
		email:{
			setRequired: true,
			onInvalid: function(el){
				$('.custom-err').remove();
				el.after('<div class="custom-err">Custom onInvalid() triggered</div>');
				el.addClass('is-invalid');
			},
			onValid: function(el){
				$('.custom-err').remove();
				el.after('<div class="custom-err">Custom onValid() triggered YAY!</div>');
			}
		},
		user_phone: {
			minNum: 7,
		},
		user_pass: {},
	});