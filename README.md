# Quick-Validate.js

### Description
*Quick-Validate.js* is a lightweight client-side validation plugin used for giving basic real-time feedback to user inputs.

Using input *name* attributes as keys in a JSON-esque block, inputs get passed into the plugin to create real-time validations.

When the plugin is called without any parameters, it automatically pulls in all of the inputs from the form and runs the default validations

### Usage
If your markup has:
```
<input type='email' name='user_email'/>
<input type='password' name='user_password'/>
<input type='tel' name='user_telephone'/>
```
calling:
`$('body').validate()`
is the same as:
```
$('body').validate({
	user_email: {},
	user_password: {},
	user_telephone: {},
})