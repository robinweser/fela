# fela-plugin-unit

Always writing length values as string with a value applied seems not like the JavaScript way to do it. You can also use mathematics to process number values. <br>
It is aware of unitless properties such as `lineHeight` and also adds units to multiple values inside an array.


```javascript
{
  width: 25,
  lineHeight: 1.4,
  height: '53'
}
```
would be transformed into:
```javascript
{
  width: '25px',
  lineHeight: 1.4,
  height: '53px'
}
```

### Configuration
By default it adds `px` to the value, but you may use units other than that.
```javascript
import unit from 'fela-plugin-unit'

const plugin = unit('em')
```
