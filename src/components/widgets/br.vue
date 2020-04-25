<style lang="scss" scoped>
  .br {
    padding-top:10px;
    padding-bottom:10px;
  }
</style>

<template>
  <div class="br">
    <br>
  </div>
</template>

<script>
  import crypto from 'crypto';

  export default {
    name: 'BR',
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
