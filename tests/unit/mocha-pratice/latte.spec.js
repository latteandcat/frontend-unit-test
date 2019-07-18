import { expect, assert } from 'chai'
function delayReturn () {
  setTimeout(() => {
    return 1
  }, 10000)
}
function add () {
  return Array.prototype.slice.call(arguments).reduce(function (prev, curr) {
    return prev + curr
  }, 0)
}

describe('mocha练习', () => {
  before(function () {
    console.info('   在mocha练习的所有测试之前运行')
  })
  after(function () {
    console.info('   在mocha练习的所有测试之后运行')
  })
  /* beforeEach(function () {
    console.info('在这个区块内的每个测试运行之前运行')
  })
  afterEach(function () {
    console.info('在这个区块内的每个测试之后运行')
  }) */
  describe('异步测试练习', () => {
    it('回调函数', function (done) {
      done()
    })
    it.skip('回调函数的错误示例', function (done) {
      done(Error('错误示例'))
    })
    it('Promise', function () {
      return new Promise(function (resolve) {
        expect('test').to.be.a('string')
        resolve()
      })
    })
    it('async/await', async function () {
      await delayReturn()
      expect('ok').to.be.equal('ok')
    })
  })
  describe('hook', function () {
    beforeEach('some description', function () {
      console.info('      beforeEach:some description(提供了描述信息)')
    })
    it('钩子的描述信息测试', function () {
      expect('ok').to.be.equal('ok')
    })
  })
  describe('测试配置', function () {
    it('this test is pending')
    it.skip('this test is skipped')
  })
  describe('add() 动态生成测试用例', function () {
    var tests = [
      { args: [1, 2], expected: 3 },
      { args: [1, 2, 3], expected: 6 },
      { args: [1, 2, 3, 4], expected: 10 }
    ]
    tests.forEach(function (test) {
      it('correctly adds ' + test.args.length + ' args', function () {
        var res = add.apply(null, test.args)
        assert.equal(res, test.expected)
      })
    })
  })
})
