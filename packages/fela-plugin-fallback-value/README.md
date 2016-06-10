# fela-plugin-fallback-value

Sometimes you want to provide alternative values also know as *fallback values*. <br>
For example in Internet Explorer 8 there is no `rgba` compatibility for colors which means just passing *e.g. `color: rgba(0, 0, 0, 0.5)`* would not be applied correctly.
By passing an array of values you may provide fallback values.

```javascript
{
	box: {
		color: [ 'rgba(0, 0, 0, 0.5)', '#ccc']
		// This would outputcolor
		// color: 'rgba(0, 0, 0, 0.5);color:#ccc'
	}
}
```
which is similar to the following CSS code:
```CSS
.box {
	color: rgba(0, 0, 0, 0.5);
	color: #ccc
}
```
