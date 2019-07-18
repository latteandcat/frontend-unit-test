/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import { resolve } from 'q'
describe('bdd风格断言练习', function () {
  describe('.deep的练习', function () {
    var simpleObj = { foo: 'bar' }
    var deepObj = { pink: 'you', green: { tea: 'matcha' }, teas: [ 'chai', 'matcha', { tea: 'konacha' } ] }
    var deepCss = { '.link': { '[target]': 42 } }
    it('equal', function () {
      expect({ foo: 'bar' }).to.deep.equal(simpleObj)
    })
    // 此处.deep失效，换解决方案
    it('property', function () {
      expect(deepObj.green).to.have.property('tea', 'matcha')
      /* expect({ foo: { bar: { baz: 'quux' } } })
        .to.have.deep.property('foo.bar.baz', 'quux') */
    })
    it('双反斜杠进行转义', function () {
      expect(deepCss['.link']).to.have.property('[target]', 42)
      // expect(deepCss).to.have.deep.property('\\.link.\\[target\\]', 42)
    })
  })
  describe('.a和.an的练习', function () {
    it('类型断言', function () {
      expect('test').to.be.a('string')
      expect(null).to.be.a('null')
      expect(undefined).to.be.an('undefined')
      expect(new Error()).to.be.an('error')
      expect(new Promise(resolve)).to.be.a('promise')
      expect(new Float32Array()).to.be.a('float32array')
      expect(Symbol('haha')).to.be.a('symbol')
    })
  })
  describe('.include和.contains的练习', function () {
    it('.include', function () {
      expect([1, 2, 3]).to.include(2)
      expect('foobar').to.include('bar')
      expect({ foo: 'bar', hello: 'universe' }).to.include.keys('foo')
    })
    it('.contains', function () {
      expect([1, 2, 3]).to.contains(2)
      expect('foobar').to.contains('bar')
      expect({ foo: 'bar', hello: 'universe' }).to.contains.keys('foo')
    })
  })
  describe('.above和.below的练习', function () {
    it('.above', function () {
      expect(10).to.be.above(5)
      expect([1, 2, 3]).to.have.length.above(2)
    })
    it('.below', function () {
      expect(5).to.be.below(10)
      expect([1, 2, 3]).to.have.length.below(4)
    })
  })
  describe('.least和.most的练习', function () {
    it('.least', function () {
      expect(10).to.be.at.least(10)
      expect(12).to.be.at.least(10)
      expect([1, 2, 3]).to.have.length.of.at.least(3)
      expect([1, 2, 3, 4]).to.have.length.of.at.least(3)
    })
    it('.most', function () {
      expect(5).to.be.at.most(5)
      expect(2).to.be.at.most(5)
      expect([1, 2, 3]).to.have.length.of.at.most(3)
      expect([1, 2]).to.have.length.of.at.most(3)
    })
  })
  describe('.within的练习', function () {
    it('.within', function () {
      expect(7).to.be.within(5, 10)
      expect([1, 2, 3]).to.have.length.within(2, 4)
    })
  })
  describe('.instanceof的练习', function () {
    var Tea = function (name) { this.name = name }
    var Chai = new Tea('chai')
    it('.instanceof', function () {
      expect(Chai).to.be.an.instanceof(Tea)
      expect([1, 2, 3]).to.be.an.instanceof(Array)
    })
  })
  describe('.property的练习', function () {
    it('简单引用', function () {
      var obj = { foo: 'bar' }
      expect(obj).to.have.property('foo')
      expect(obj).to.have.property('foo', 'bar')
      expect(obj).to.have.property('foo')
        .that.is.a('string')
    })
    it.skip('深层引用', function () {
      var deepObj = {
        green: { tea: 'matcha' },
        teas: [ 'Chai', 'matcha', { tea: 'konacha' } ]
      }
      expect(deepObj).to.have.deep.property('green.tea', 'matcha')
      expect(deepObj).to.have.deep.property('teas[1]', 'matcha')
      expect(deepObj).to.have.deep.property('teas[2].tea', 'konacha')
    })
  })
  describe('.keys的练习', function () {
    it('结合any使用', function () {
      expect({ foo: 1, bar: 2, baz: 3 }).to.have.any.keys('foo', 'bar')
      expect({ foo: 1, bar: 2, baz: 3 }).to.contains.any.keys('foo', 'bar')
    })
    it('结合all使用', function () {
      expect({ foo: 1, bar: 2, baz: 3 }).to.have.all.keys('foo', 'bar', 'baz')
      expect({ foo: 1, bar: 2, baz: 3 }).to.contains.all.keys('foo', 'bar')
    })
    it('传入string', function () {
      expect({ foo: 1, bar: 2, baz: 3 }).to.have.any.keys('foo')
    })
    it('传入Array', function () {
      expect({ foo: 1, bar: 2, baz: 3 }).to.have.any.keys(['foo', 'bar', 'baz'])
    })
    it('传入Object', function () {
      expect({ foo: 1, bar: 2, baz: 3 }).to.have.any.keys({ bar: 2, foo: 1 })
    })
  })
  describe('.throw的练习', function () {
    it('.throw', function () {
      var err = new Error('this is a bad function')
      var fn = function () { throw err }
      expect(fn).to.throw(Error)
      expect(fn).to.throw(/bad function/)
      expect(fn).to.not.throw('good function')
      expect(fn).to.throw(Error, /bad function/)
      expect(fn).to.throw(err)
      /* expect(fn).to.throw(ReferenceError)
        .and.not.throw(/good function/) */
    })
  })
  describe('.itself的练习', function () {
    it('.itself配合respondTo断言', function () {
      function Foo () {}
      Foo.bar = function () {}
      Foo.prototype.baz = function () {}
      expect(Foo).itself.to.respondTo('bar')
      expect(Foo).itself.not.to.respondTo('baz')
    })
  })
  describe('.members的练习', function () {
    it('.members', function () {
      expect([1, 2, 3]).to.include.members([3, 2])
      expect([1, 2, 3]).to.not.include.members([3, 2, 8])
      expect([4, 2]).to.have.members([2, 4])
      expect([5, 2]).to.not.have.members([5, 2, 1])
      expect([{ id: 1 }]).to.deep.include.members([{ id: 1 }])
    })
  })
  describe('.oneOf的练习', function () {
    it('.oneOf', function () {
      expect('a').to.be.oneOf(['a', 'b', 'c'])
      expect(9).to.not.be.oneOf(['z'])
      // 严格相等，所以对象类的值必须为同一个引用才能被判定为相等
      var three = [3]
      expect([3]).to.not.be.oneOf([1, 2, [3]])
      expect(three).to.not.be.oneOf([1, 2, [3]])
      expect(three).to.be.oneOf([1, 2, three])
    })
  })
  describe('.change的练习', function () {
    it('.change', function () {
      var obj = { val: 10 }
      var fn = function () { obj.val += 3 }
      var noChangeFn = function () { return 'bar' + 'baz' }
      expect(fn).to.change(obj, 'val')
      expect(noChangeFn).to.not.change(obj, 'val')
    })
  })
  describe('.extensible、.sealed和.frozen的练习', function () {
    var nonExtensibleObject = Object.preventExtensions({})
    var sealedObject = Object.seal({})
    var frozenObject = Object.freeze({})
    it('.extensible', function () {
      expect({}).to.be.extensible
      expect(nonExtensibleObject).to.not.be.extensible
      expect(sealedObject).to.not.be.extensible
      expect(frozenObject).to.not.be.extensible
    })
    it('.sealed', function () {
      expect(sealedObject).to.be.sealed
      expect(frozenObject).to.be.sealed
      expect({}).to.not.be.sealed
    })
    it('.frozen', function () {
      expect(frozenObject).to.be.frozen
      expect({}).to.not.be.frozen
    })
  })
})
