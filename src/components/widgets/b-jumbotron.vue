
<style lang="scss" scoped>
</style>

<template>
  <b-jumbotron
    v-if="item.type == 'jumbotron'"
    :header="item.title" :lead="item.subtitle">
    <p>{{ item.text }}</p>
    <b-button v-for="link in item.links" v-bind:key="makeHashId(item)" style="margin-right: 10px;" variant="success" :href="link.url">{{link.title}}</b-button>
  </b-jumbotron>
</template>

<script>
  import crypto from 'crypto';

  export default {
    name: 'Jumbotron',
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
