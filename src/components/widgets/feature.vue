<style lang="scss" scoped>
</style>

<template>
  <div>
    <h5>{{ item.title }}</h5>
    <div class="text" v-if="item.text !== undefined">
      {{ item.text }}
    </div>
    <div class="text text-formatted" v-html="item.formatted" v-if="item.formatted !== undefined"></div>
  </div>
</template>

<script>
  import crypto from 'crypto';

  export default {
    name: 'Feature',
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
