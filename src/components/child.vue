<template>
  <div>
    <h2>{{msg}}</h2>
    <p>{{text}}</p>
  </div>
</template>

<script>
export default {
  name: 'child',
  data () {
    return {
      text: 'thankyou'
    }
  },
  props: [
    'msg'
  ]
}
</script>
