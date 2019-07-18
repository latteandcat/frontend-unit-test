<template>
  <div>
    <p>{{status}}</p>
    <button class="yes" @click="callYes">Yes</button>
    <button class="no" @click="callNo">No</button>
  </div>
</template>

<script>
export default {
  name: 'YesNoComponent',
  data () {
    return {
      status: ''
    }
  },
  methods: {
    callYes () {
      this.status = 'yes'
    },
    callNo () {
      this.status = 'no'
    }
  }
}
</script>
