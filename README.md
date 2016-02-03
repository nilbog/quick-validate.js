# Quick-Validate.js

### Description<a name='defaults'></a>
**_Quick-Validate.js_** is a jQuery-based lightweight *(2.5kb minified)* client-side validation plugin used for giving basic real-time feedback to user inputs.

Using input `name` attributes as keys in a JSON-esque block, inputs get passed into the plugin to create real-time validations.

#### Default Validations
Input Type | Checks For
--- | --- |
email | Proper email format `(/.+@.\..+/gi)`|
password | Does not contain `<` or `>` characters
tel | Only contains numbers and `-` symbols
number | Only contains numbers

## Usage
### Basic Usage
When the plugin is called without any parameters, it automatically pulls in all of the inputs from the page and runs the default validations.

Therefore, if your markup has:
```
<input type='email' name='user_email'/>
<input type='password' name='user_password'/>
<input type='tel' name='user_telephone'/>
```
Calling `$('body').quick_validate()` is the same as:
```
$('body').quick_validate({
	user_email: {},
	user_password: {},
	user_telephone: {},
})
```

But if you only want certain inputs to have the validations, you must specify in the call. It will only perform the validations on the inputs passed in.
```
$('body').quick_validate({
	user_email:{},
})
```

### Additional Options
In addition to the [default validations](#defaults), there are some key/values you can add to each input name key to add further validations or actions. *(More To Come Soon)*

##### What Are They?
Key | Value | Purpose
--- | --- | --- |
**minNum** | Number | Minimum number value (if number input) / Minimum character length (if text-based input)
**setRequired** | Boolean | Indicates whether to set a field as required *if it does not already have required specified*
**onInvalid** | Function | Overrides default function performed when input is invalid
**onValid** | Function | Overrides default function performed when input is valid

#### How to Use Them
```
$('body').quick_validate({
	user_email:{
		setRequired: true
	},
	user_password:{
		minNum: 7,
		onValid: function(){
			alert('yay!');
		}
	},
	user_tel: {},
})
```

## Other Information
+ The plugin will *always* add either an 'is-valid' or 'is-invalid' class to the input even if you've passed a custom onInvalid or onValid function
  + The class name can be modified via the `c.valid_class` and `c.invalid_class` variables in the JS
  + If you do not want this to happen, simply move `el.removeClass(c.invalid_class).addClass(c.valid_class);` and `el.removeClass(c.valid_class).addClass(c.invalid_class);` into their respective `else` statements
+ When an input is deemed valid or invalid, a key/value is created for that input in the master `to_validate` object:
```
{
	input_name : {
		valid: true/false
	}
}
```

#### Plans for future
+ Add more additional options
  + **maxNum** *(max character length or number value)*
  + **badChar** *(unwanted characters in the input)*
+ Stop form from submitting until all validations pass
  + *Chrome/Firefox have the built-in validations that prevent form submission, but this would allow other browsers as well*

## Support
I have only tested in Chrome so far, I plan to do more testing once I get some of the features more fleshed out 
