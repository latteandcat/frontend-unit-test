/* eslint-disable no-unused-expressions */
import { mount, shallowMount } from '@vue/test-utils'// 从测试实用工具集中导入 `mount()` 方法
import Counter from '@/components/counter.vue'// 导入要测试的组件
import parent from '@/components/parent.vue'
import child from '@/components/child.vue'
import { expect } from 'chai'// 导入要使用的断言集

describe('Counter', () => {
  // 现在挂载组件，你便得到了这个包裹器
  const wrapper = mount(Counter)

  // 检查该组件渲染出来的 HTML 是否符合预期。
  it('renders the correct markup', () => {
    expect(wrapper.html()).contain('<span class="count">0</span>')
  })

  // 也便于检查已存在的元素
  it('has a button', () => {
    expect(wrapper.contains('button')).to.be.ok
  })

  // 模拟用户交互
  it('button click should increment the count', () => {
    expect(wrapper.vm.count).to.be.equal(0)
    const button = wrapper.find('button')// 定位按钮
    button.trigger('click')// 模拟点击
    expect(wrapper.vm.count).to.be.equal(1)
  })
})

// 从子组件触发事件
describe('ParentChild', () => {
  it("displays 'Emitted!' when custom event is emitted", () => {
    const wrapper = shallowMount(parent)
    wrapper.find(child).vm.$emit('custom')
    expect(wrapper.html()).contains('Emitted!')
    wrapper.find(child).vm.$emit('custom')
    expect(wrapper.find(child).emitted().custom.length).to.be.equal(2)// 断言事件触发了两次
  })
})

// 操作组件状态
describe('operate component status', () => {
  const wrapper = shallowMount(child)
  it('set props of child component', () => {
    wrapper.setProps({ msg: 'goodbye' })
    expect(wrapper.html()).contains('goodbye')
  })

  it('set data of child component', () => {
    expect(wrapper.html()).contains('thankyou')
    wrapper.setData({ text: 'welcome' })
    expect(wrapper.html()).contains('welcome')
  })

  it('mock prop of child component', () => {
    const mockwrapper = shallowMount(child, {
      propsData: {
        msg: 'mockvalue'
      }
    })
    expect(mockwrapper.html()).contains('mockvalue')
  })
})
