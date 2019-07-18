<template>
  <div>
    <h2>{{ msg }}</h2>
    <input type="text" v-model="inputValue" @input="onInputChange()" />
    <button @click="onButtonClick()">Click</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      inputValue: ''
    }
  },
  computed: {
    msg () {
      return this.$store.state.msg
    }
  },
  methods: {
    ...mapActions(['actionClick', 'actionInput']),
    onInputChange () {
      this.$store.dispatch('actionInput', this.inputValue)
    },
    onButtonClick () {
      this.$store.dispatch('actionClick')
    }
  }
}
</script>
