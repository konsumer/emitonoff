var EmitOnOff = module.exports = function(thing){
  if (!thing) thing = {};

  thing.subs = [];

  /**
   * Sub of pubsub
   * @param  {String}   name name of event
   * @param  {Function} cb   your callback
   */
  thing.on = function(name, cb){
    thing.subs[name] = thing.subs[name] || [];
    thing.subs[name].push(cb);
  };

  /**
   * remove sub of pubsub
   * @param  {String}   name name of event
   * @param  {Function} cb   your callback
   */
  thing.off = function(name, cb){
    if (!thing.subs[name]) return;
    for (var i in thing.subs[name]){
      if (thing.subs[name][i] === cb){
        thing.subs[name].splice(i);
        break;
      }
    }
  };

  /**
   * Pub of pubsub
   * @param  {String}   name name of event
   * @param  {Mixed}    data the data to publish
   */
  thing.emit = function(name){
    if (!thing.subs[name]) return;
    var args = Array.prototype.slice.call(arguments, 1);
    for (var i in thing.subs[name]){
      thing.subs[name][i].apply(thing, args);
    }
  };

  return thing;
};