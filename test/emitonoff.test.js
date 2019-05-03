/* global jest, describe, test, expect */

var emitonoff = require('..')

describe('emitonoff', () => {
  test('should allow creation without an object', () => {
    var kitty = emitonoff()
    expect(kitty).toBeDefined()
  })

  test('should handle subscriptions', () => {
    var kitty = emitonoff()
    const tester = jest.fn()
    kitty.on('purr', tester)
    kitty.emit('purr')
    expect(tester).toHaveBeenCalledTimes(1)
  })

  test('should handle subscriptions with an existing object', () => {
    var kitty = {
      purr: payload => kitty.emit('purr', payload)
    }
    emitonoff(kitty)
    const tester = jest.fn()
    kitty.on('purr', tester)
    kitty.purr()
    expect(tester).toHaveBeenCalledTimes(1)
  })

  test('should allow user to unsubscribe', () => {
    var kitty = {
      purr: payload => kitty.emit('purr', payload)
    }
    emitonoff(kitty)
    var tester = jest.fn()
    kitty.on('purr', tester)
    kitty.off('purr', tester)
    kitty.purr()
    expect(tester).toHaveBeenCalledTimes(0)
  })

  test('should emit nothing when paused', () => {
    var kitty = {
      purr: payload => kitty.emit('purr', payload)
    }
    emitonoff(kitty)
    var tester = jest.fn()
    kitty.on('purr', tester)
    kitty.pause()
    kitty.purr()
    expect(tester).toHaveBeenCalledTimes(0)
  })

  test('should emit when resumed', () => {
    var kitty = {
      purr: payload => kitty.emit('purr', payload)
    }
    emitonoff(kitty)
    var tester = jest.fn()
    kitty.on('purr', tester)
    kitty.pause()
    kitty.purr()
    expect(tester).toHaveBeenCalledTimes(0)
    kitty.resume()
    expect(tester).toHaveBeenCalledTimes(1)
  })

  test('should handle payloads', () => {
    var kitty = {
      purr: payload => kitty.emit('purr', payload)
    }
    emitonoff(kitty)
    var tester = jest.fn(payload => {
      expect(payload).toEqual('hello kitty')
    })
    kitty.on('purr', tester)
    kitty.purr('hello kitty')
    expect(tester).toHaveBeenCalledTimes(1)
  })
})
