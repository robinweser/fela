# Right to Left Rendering

In a right-to-left, top-to-bottom script (commonly abbreviated RTL), writing starts from the right of the page and continues to the left. This can be contrasted against left-to-right writing systems, where writing starts from the left of the page and continues to the right.

Arabic, Hebrew, Persian, and Urdu Sindhi are the most widespread RTL writing systems in modern times.


## How RTL works in HTML

You can control the direction of text in the rendered HTML using the `dir` attribute. The default value is `ltr`

```html
<div>
  <div dir="rtl">I'm right to left مرحباً بالعالم</div>
  <div dir="ltr">I'm left to right مرحباً بالعالم</div>
</div>
```

Looking at the English sentence, it will appear as if it's simply right aligned. But the directional flow of the content has actually changed. This becomes more evident with a table element.

```html
<table border="1">
  <tbody>
    <tr>
      <td>First Cell</td>
      <td>Second Cell</td>
    </tr>
  </tbody>
</table>
<table border="1" dir="rtl">
  <tbody>
    <tr>
      <td>First Cell</td>
      <td>Second Cell</td>
    </tr>
  </tbody>
</table>
```


### Setting direction for an entire page

If you're building an entire page in an RTL language you'll most likely want to **set the `dir` attribute only once, on a top level `<div>`**.

In contrast, setting `dir` on the `<body>` or `<html>` element will change the position of the scrollbars in SOME browsers (IE, Opera), which may seem technically correct, but is actually [not expected](https://ux.stackexchange.com/questions/24437/scrollbars-in-right-to-left-layout) by most RTL reading users.


```html
<body>
  <div dir="rtl">
    My page goes in here!
  </div>
</body>
```

### Dealing with unknown direction like user input

Sometimes you don't know beforehand what direction you want to render. HTML5 added an [auto value](https://www.w3.org/International/questions/qa-html-dir#unknowndirection) to the `dir` attribute to help with that. The auto value tells the browser to look at the first strongly typed character in the element and work out from that what the base direction of the element should be. This is supported in most [but not all browsers](https://www.w3.org/International/tests/repo/results/the-dir-attribute-auto) (yes, you correctly guessed which one).

**Beware**: Some input values, like an e-mail address will still be expected to be written left-to-right, even if the language spoken is right-to-left.


### Dealing with numbers

Here's another edge case: Although Arabic text is written right-to-left, numbers are written the [same way as in left-to-right languages](http://www.i18nguy.com/MiddleEastUI.html#arabicdigits). So the number 321 (three hundred and twenty one) is written ٣٢١ ("321", not "123").

Take care if you format numbers and insert spacing, like in a phone number. As shown here:


```html
<div dir="ltr">
  Phone: 0703 123 456 789
</div>
<div dir="rtl">
  0703 123 456 789 مرحباً بالعالم
</div>
<div dir="rtl">
  <span dir="ltr">0703 123 456 789</span> مرحباً بالعالم
</div>
<div dir="rtl">
  مرحباً بالعالم <span dir="ltr">0703 123 456 789</span>
</div>
```

Notice how one of the phone numbers have been scrambled? A `<span dir="ltr">` is used here to display the formatted number correctly.


## How RTL works in CSS

Dealing with direction in HTML was fairly trivial. Now, how do we make sure our CSS layouts are bi-directional. Unfortunately, it gets a little trickier.

To illustrate, let's say I want to apply a margin **after** an element, like the following:

```html
<div style={{ display: 'flex', background: 'pink' }}>
  <div style={{ marginRight: '10px', background: 'aqua' }}>Box 1</div>
  <div style={{ background: 'red' }}>Box 2</div>
</div>
```

Ok, looks good. Now if we change the direction of the HTML element:

```html
<div dir="rtl" style={{ display: 'flex', background: 'pink' }}>
  <div style={{ marginRight: '10px', background: 'aqua' }}>Box 1</div>
  <div style={{ background: 'red' }}>Box 2</div>
</div>
```

Oh no! The margin is no longer "after" the element, but before. This is because values like _left_ and _right_ become **ambiguous** in a bi-directional context.


## How to write CSS in a bi-directional world?

So how do we fix this? There are essentially two solutions to the problem:

1. Replacing/overwriting everything that is "left" to be "right"
2. Using CSS Logical Properties

Let's take a closer look:

### 1. Replacing left with right and vice versa

It may seem like a joke, but the easiest way to deal with this is simply by swapping all directional values with each other. Change `margin-right` to `margin-left` etc.
Then using a CSS selector like `div[dir=rtl]` you can apply styles in the right context. This works, but does not scale very well.

Replacing all directional CSS properties manually will make you want to quit your job sooner than later. The good news is that some clever people have figured out that this process can be completely automated. There are a range of tools, including a [PostCSS RTL Plugin](https://www.npmjs.com/package/postcss-rtl), that will do this job for you. This will allow you to create one LTR and one RTL CSS file. This works surprisingly well.

### 2. Using CSS Logical Properties

In the past, CSS has [tied itself to physical dimensions and directions](https://www.smashingmagazine.com/2018/03/understanding-logical-properties-values/), physically mapping the placement of elements to the left, right and top and bottom.

CSS Logical Properties, do not. You could theoretically [replace all non-logical values](https://css-tricks.com/css-logical-properties/) with logical ones in your CSS, and it should then work in a bi-directional context without any further modification.

Instead of `margin-right` we'll use `margin-inline-end` to fix our previous example:

```html
<div dir="rtl" style={{ display: 'flex', background: 'pink' }}>
  <div style={{ marginInlineEnd: '10px', background: 'aqua' }}>Box 1</div>
  <div style={{ background: 'red' }}>Box 2</div>
</div>
```

The main drawbacks (as of now) with CSS Logical Properties is [lacking browser support](https://caniuse.com/#search=CSS%20Logical%20Properties), and that you would have to forbid any use of non-logical properties like `left`, or everything will start to break down quickly.


## How RTL works in Fela

In Fela you can use the "PostCSS replacement strategy". It's all automated via a the [fela-plugin-rtl](https://github.com/rofrischmann/fela/tree/master/packages/fela-plugin-rtl), so you shouldn't have to think about it too much.

To render your page in RTL you have to do two things.

1. Set `dir=rtl` to the top level surrounding HTML element
2. Configure the direction to RTL in a theme and pass it to a `<ThemeProvider>`
  
Here's a contrived example on how this is achieved:

```jsx
<ThemeProvider
  theme={{ direction: isRtl ? "rtl" : "ltr" }}}
>
  <div dir={isRtl ? "rtl" : "ltr">
    <App />
  </div>
</ThemeProvider>
```

Only want to render part of a page in RTL? No problem. You can use multiple theme providers, and even nest them.


## Recommended Reading:

Want to dive deeper into RTL, here are some external articles that dive deeper into the subject:

- [User Interfaces For Right-To-Left Languages](http://www.i18nguy.com/MiddleEastUI.html)
- [Structural markup and right-to-left text in HTML](https://www.w3.org/International/questions/qa-html-dir)
- [Understanding Logical Properties And Values](https://www.smashingmagazine.com/2018/03/understanding-logical-properties-values/)
