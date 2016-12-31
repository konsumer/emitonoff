<img alt="Alexandrovich Stroganoff" title="totally random picture of Alexandrovich Stroganoff, age 15" src="https://raw.githubusercontent.com/konsumer/emitonoff/master/dist/stroganoff.png" align="right" valign="middle" />

[![npm version](https://badge.fury.io/js/emitonoff.svg)](http://badge.fury.io/js/emitonoff)
[![Build Status](https://travis-ci.org/konsumer/emitonoff.svg?branch=master)](https://travis-ci.org/konsumer/emitonoff)
[![Code Climate](https://codeclimate.com/github/konsumer/emitonoff/badges/gpa.svg)](https://codeclimate.com/github/konsumer/emitonoff)

This is a simple, extremely lightweight, zero-dependency event/pubsub system for node or the browser.

It's pronounced like ["stroganoff"](http://dictionary.cambridge.org/us/pronunciation/british/stroganoff), but "emit" instead of "stroge".

It gives your objects these really basic functions:

- `emit` - publish an event
- `on` - subscribe to an event
- `off` - unsubscribe an event

Also available:

- `_pause` - queue incoming `emit()` while you are waiting for something (sometimes needed for testing)
- `_resume` - run all the paused queue and process `emit()` normally, again

## install

### nodejs/webpack/browserify

```
npm install --save emitonoff
```

### bower

```
bower install --save emitonoff
```

then, in your code:

```javascript
var emitonoff = require('emitonoff');
```

### requirejs

Put `dist/emitonoff.js` in your require path, then you can do this:

```javascript
define(['emitonoff'], function(emitonoff){
    // do stuff
});
```

### plain browser global

You can use a CDN:

```html
<script src="https://rawgit.com/konsumer/emitonoff/master/dist/emitonoff.min.js"></script>
```

or alternately use one of the files in `dist/`, locally.

## usage details

```javascript
var kitty = {
    purr: function(){
        this.emit('purr');
    },
    
    eat: function(food){
        this.emit('ate', food);
    } 
};

emitonoff(kitty);

function showAte(food){
    console.log('The kitty was hungry, so it ate', food);
}

function showPurred(){
    console.log('the kitty purred.')
}

kitty.on('ate', showAte);
kitty.on('purr', showPurred);

kitty.eat('kibble');
kitty.eat('mouse');
kitty.off('ate', showAte);
kitty.eat('tail');
kitty.purr();
```

You can also use it without an object, like this:

```javascript
var kitty = emitonoff();

function showAte(food){
    console.log('The kitty was hungry, so it ate', food);
}

function showPurred(){
    console.log('the kitty purred.')
}

kitty.on('ate', showAte);
kitty.on('purr', showPurred);

kitty.emit('ate', 'kibbles');
kitty.emit('ate', 'bits');
kitty.emit('purr');
```

### react

You can also use it with react (as a simpler alternative to flux, redux, thunk, etc.)

Basically, you just need a store/proxy. Here is mine (put this in a file called `EmitOnOff.js`):

```js
import React from 'react'

export default class EmitOnOff extends React.Component {
  constructor (props) {
    super(props)
    this.update = this.update.bind(this)
  }
  update () {
    this.forceUpdate()
  }
  componentDidMount () {
    this.props.state.on('render', this.update)
  }
  componentWillUnmount () {
    this.props.state.off('render', this.update)
  }
  render () {
    return React.cloneElement(this.props.children)
  }
}
```

And now, whenever your store emits a `render` message, it re-renders!

Here is an example:

```js
import React from 'react'
import ReactDOM from 'react-dom'
import emitonoff from 'emitonoff'

import EmitOnOff from './EmitOnOff'

// this could also be exported from a seperate file for sharing with other code
const state = emitonoff({counter:0})

const App = (props) => (
  <div className='App'>APP {state.counter}</div>
)

ReactDOM.render(<EmitOnOff state={state}><App /></EmitOnOff>, document.getElementById('root'))

// async re-renders
setInterval(() => {
  state.counter = state.counter + 1
  state.emit('render')
}, 1000)
```

## browser support

I haven't done too much browser-testing, but it should work on any browser that can `Array.slice` (all of them in the last 15 years.) If you need it to work on a particular old browser, file a bug and I will add support (or tell you t find a `Array.slice` polyfill.)

It works in IE5.5.
