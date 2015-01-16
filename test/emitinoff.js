var expect = require('chai').expect;
var emitonoff = require('..');

describe('emitonoff', function(){
	it('should allow creation without an object', function(){
		var kitty = emitonoff();
		expect(kitty).to.be.ok();
	});

	it('should handle subscriptions', function(){
		var complete = false;
		var kitty = emitonoff();
		kitty.on('purr', function(){
			complete=true;
		});
		kitty.emit('purr');
		expect(complete).to.be.ok();
	});

	it('should handle subscriptions with an existing object', function(){
		var complete = false;
		var kitty = {
			purr: function(){
				this.emit('purr');
			}
		};
		
		emitonoff(kitty);
		
		kitty.on('purr', function(){
			complete=true;
		});
		
		kitty.purr();
		expect(complete).to.be.ok();
	});
}); 