<template>
  <div>
    <child :msg="msg" @custom="onCustom"></child>
    <p v-if="emitted">Emitted!</p>
  </div>
</template>

<script>
import child from './child'
export default {
  name: 'parent',
  components: {
    child
  },
  data () {
    return {
      emitted: false,
      msg: 'hello'
    }
  },
  methods: {
    onCustom () {
      this.emitted = true
    }
  }
}
</script>
