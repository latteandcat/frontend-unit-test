import YesNoComponent from '@/components/YesNoComponent'
import quantity from '@/components/quantity'
import { mount } from '@vue/test-utils'
import { expect } from 'chai'// 导入要使用的断言集

describe('dom event tests', function () {
  describe('click event tests', function () {
    it('Click on yes button', () => {
      const wrapper = mount(YesNoComponent)
      wrapper.find('button.yes').trigger('click')
      expect(wrapper.find('p').text()).contains('yes')
    })
    it('Click on no button', () => {
      const wrapper = mount(YesNoComponent)
      wrapper.find('button.no').trigger('click')
      expect(wrapper.find('p').text()).contains('no')
    })
  })
  describe('key event tests', function () {
    it('Quantity is zero by default', () => {
      const wrapper = mount(quantity)
      expect(wrapper.vm.quantity).to.be.equal(0)
    })

    it('Up arrow key increments quantity by 1', () => {
      const wrapper = mount(quantity)
      wrapper.trigger('keydown.up')
      expect(wrapper.vm.quantity).to.be.equal(1)
    })

    it('Down arrow key decrements quantity by 1', () => {
      const wrapper = mount(quantity)
      wrapper.vm.quantity = 5
      wrapper.trigger('keydown.down')
      expect(wrapper.vm.quantity).to.be.equal(4)
    })

    it('Escape sets quantity to 0', () => {
      const wrapper = mount(quantity)
      wrapper.vm.quantity = 5
      wrapper.trigger('keydown.esc')
      expect(wrapper.vm.quantity).to.be.equal(0)
    })

    it('Magic character "a" sets quantity to 13', () => {
      const wrapper = mount(quantity)
      wrapper.trigger('keydown', {
        key: 'a'
      })
      expect(wrapper.vm.quantity).to.be.equal(13)
    })
  })
})
