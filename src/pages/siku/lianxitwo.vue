<template>
    <div class="lianxitwo">
      <div class="box">
        <div class="lximg">
          <i class="el-icon-rank"></i>
        </div>
        <ul>
          <li>1111111111</li>
          <li>2222222222</li>
          <li>3333333333</li>
        </ul>
        <button>提交</button>
      </div>
    </div>
</template>

<script>
export default {
  name: 'lianxitwo',
  data () {
    return {

    }
  },
  methods: {
  }
}
</script>

<style lang="scss">
  .box{
    .lximg{
      position: relative;
      border: 1px solid #cccccc;
      height: 130px;
      font-size: 50px;
      i{
        position: absolute;
        top: 50%;
        left: 50%;

      }
    }
    width: 200px;
    height: 240px;
    border: 2px solid #cccccc;
  }

</style>
