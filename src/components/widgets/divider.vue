<style lang="scss" scoped>
  .hr {
    border: 0;
    height: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    margin-bottom: 0px;
    margin-top: 0px;
  }
</style>

<template>
  <hr class="hr" />
</template>

<script>
  import crypto from 'crypto';

  export default {
    name: 'Divider',
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
