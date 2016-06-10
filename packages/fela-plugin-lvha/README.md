# fela-plugin-lvha

LVHA (sometimes known as LVHFA) stands for **L**ink **V**isited **H**over (**F**ocus) **A**ctive which are actually describe pseudo classes. Within CSS their order is relevant which means we always need to sort them correctly. This plugin **does** include the `:focus` pseudo class as well.

```javascript
{
  width: '25px',
  ':hover': {
    color: 'red'
  },
  ':visited': {
    color: 'gray'
  }
  ':link': {
    margin: 0
  }
}
```
would be transformed into:
```javascript
{
  width: '25px',
  ':link': {
    margin: 0
  },
  ':visited': {
    color: 'gray'
  },
  ':hover': {
    color: 'red'
  }
}
```
