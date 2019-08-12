<template>
    <div class="demo-image__preview">
      000
      <el-image
        style="width: 100px; height: 100px"
        src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
        :preview-src-list="srcList">
      </el-image>
    </div>
</template>

<script>
export default {

  data() {
    return {
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      srcList: [
        'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      ]
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
