<img alt="Alexandrovich Stroganoff" title="totally random picture of Alexandrovich Stroganoff, age 15" src="https://raw.githubusercontent.com/konsumer/emitonoff/master/dist/stroganoff.png" align="right" valign="middle" />

[![npm version](https://badge.fury.io/js/emitonoff.svg)](http://badge.fury.io/js/emitonoff)
[![Build Status](https://travis-ci.org/konsumer/emitonoff.svg?branch=master)](https://travis-ci.org/konsumer/emitonoff)
[![Code Climate](https://codeclimate.com/github/konsumer/emitonoff/badges/gpa.svg)](https://codeclimate.com/github/konsumer/emitonoff)

This is a simple, extremely lightweight, zero-dependency event/pubsub system for node or the browser.

It gives your objects these really basic functions:

- `emit` - publish an event
- `on` - subscribe to an event
- `off` - unsubscribe an event

It's pronounced like ["stroganoff"](http://dictionary.cambridge.org/us/pronunciation/british/stroganoff), but "emit" instead of "stroge".

## usage

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

## browser support

I haven't done too much browser-testing, but it should work on any browser that can `Array.slice` (all of them in the last 15 years.) If you need it to work on a particular old browser, file a bug and I will add support (or tell you t find a `Array.slice` polyfill.)

It works in IE5.5.
