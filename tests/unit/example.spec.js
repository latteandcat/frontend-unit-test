import { expect, assert } from 'chai'
import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'
import math from '@/assets/math.js'
describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
    })
    expect(wrapper.text()).to.include(msg)
  })
})
describe('math.js', () => {
  it('renders a+b', () => {
    assert.equal(5, math.add(2, 3))
  })
})
describe('ES6 spec test', function () {
  it('es6 arrows feature ', function () {
    var add = (x, y) => x + y
    console.log(add(3, 1))
  })
})
