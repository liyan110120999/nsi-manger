<template>
  <div class="wrapper">
     正在开发中...

  </div>
</template>

<script>

  export default {
    components: {

    },
    data() {
      return {
        count:1
      }
    },
    methods: {
      timer: function () {
        if (this.count > 0) {
          console.log("1111")
        }
      }
    },
    mounted() {
      this.$nextTick(function () {
          // setInterval(this.timer, 1000);
      })

    },
    created() {

    },


  }
</script>

<style>

</style>
