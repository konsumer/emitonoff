var expect = require('chai').expect;
var emitonoff = require('..');

describe('emitonoff', function(){
	it('should allow creation without an object', function(){
		var kitty = emitonoff();
		expect(kitty).to.be.ok();
	});

	it('should handle subscriptions', function(done){
		var kitty = emitonoff();
		kitty.on('purr', done);
		kitty.emit('purr');
	});

	it('should handle subscriptions with an existing object', function(done){
		var kitty = {
			purr:function(){
				this.emit('purr');
			}
		};
		emitonoff(kitty);
		kitty.on('purr', done);
		kitty.purr();
	});
}); 