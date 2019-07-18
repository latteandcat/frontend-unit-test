import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Actions from '@/components/vuex/actions'
import Getters from '@/components/vuex/getters'
import { expect } from 'chai'

describe('vuex test', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  describe('actions.vue', () => {
    let actions
    let store
    let mutations
    let state
    // 我们使用 beforeEach 来确认我们在每项测试之前已经拥有一个干净的 store。
    beforeEach(() => {
      state = {
        msg: ''
      }
      mutations = {
        SET_MSG: (state, msg) => {
          state.msg = msg
        }
      }
      actions = {
        actionClick ({ commit }) {
          commit('SET_MSG', 'test:init')
        },
        actionInput ({ commit }, value) {
          commit('SET_MSG', 'test:' + value)
        }
      }
      store = new Vuex.Store({
        state,
        mutations,
        actions
      })
    })
    it('dispatches "actionInput" when input event value is "falao"', () => {
      const wrapper = shallowMount(Actions, { store, localVue })
      const input = wrapper.find('input')
      input.element.value = 'falao'
      input.trigger('input')
      expect(wrapper.find('h2').text()).equal('test:falao')
    })

    it('dispatch "actionClick" when button is clicked', () => {
      const wrapper = shallowMount(Actions, { store, localVue })
      wrapper.find('button').trigger('click')
      expect(wrapper.find('h2').text()).equal('test:init')
    })
  })
  describe('getters.vue', () => {
    let getters
    let store
    beforeEach(() => {
      getters = {
        clicks: () => 2,
        inputValue: () => 'input'
      }
      store = new Vuex.Store({
        getters
      })
    })
    it('Renders "store.getters.inputValue" in first p tag', () => {
      const wrapper = shallowMount(Getters, { store, localVue })
      const p = wrapper.find('p')
      expect(p.text()).to.be.equal(getters.inputValue())
    })

    it('Renders "store.getters.clicks" in second p tag', () => {
      const wrapper = shallowMount(Getters, { store, localVue })
      const p = wrapper.findAll('p').at(1)
      expect(p.text()).to.be.equal(getters.clicks().toString())
    })
  })
})
