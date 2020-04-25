<style lang="scss" scoped>
  .vid {
    width: 100%;
  }
</style>

<template>
   <video class="vid" controls>
    <source :src="item.src" type="video/mp4">
  </video>
</template>

<script>
  import crypto from 'crypto';

  export default {
    name: 'VID',
    props: ['item', 'path', 'data', 'page'],
    data() {
      return {
        editing: false
      }
    },
    components: {
      //Carousel,
      //Slide
    },
    methods: {
      makeHashId: function(obj) {
        return crypto.createHash('md5').update(JSON.stringify(obj)).digest('hex')
      },

      change: function (event) {
        if (this.editing) {
          this.item.text = this.$refs[this.path.join('.')].value
          this.updatePage(this.page)
        }
        this.editing = !this.editing
      }
    }

  }
</script>
