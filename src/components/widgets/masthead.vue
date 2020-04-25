<style lang="scss" scoped>
  .masthead > div {
    height: 40vh;
    width: 100%;
    text-align: center;
    color: white;
  }

  .masthead--text {
    line-height: 40vh;
    font-size: 30px;
  }
</style>

<template>
  <div v-bind:style="{ 'background-image': 'url(' + item.src + ')'}"><div class="masthead--text">{{ item.text }}</div></div>
</template>

<script>
  import crypto from 'crypto';

  export default {
    name: 'Masthead',
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
