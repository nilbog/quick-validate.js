# Quick-Validate.js

### Description
*Quick-Validate.js* is a lightweight client-side validation plugin used for giving basic real-time feedback to user inputs.

Using input *name* attributes as keys in a JSON-esque block, inputs get passed into the plugin to create real-time validations.

### Usage
When the plugin is called without any parameters, it automatically pulls in all of the inputs from the form and runs the default validations.

Therefore, if your markup has:
```
<input type='email' name='user_email'/>
<input type='password' name='user_password'/>
<input type='tel' name='user_telephone'/>
```
Calling `$('body').validate()` is the same as:
```
$('body').validate({
	user_email: {},
	user_password: {},
	user_telephone: {},
})
```

But if you only want certain inputs to have the validations, you must specify in the call. It will only perform the validations on the inputs passed in.
```
$('body').validate({
	user_email:{},
})
```

### Additional Options
*In addition to the default validations (proper email formatting, etc), there are some key/values you can add to each input name key to add further validations*

##### What Are They?
KEY | VALUE TYPE | PURPOSE
--- | --- | --- |
minNum | Number | Minimum number value (if number input) / Minimum character length (if text-based input)