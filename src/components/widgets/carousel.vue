<style lang="scss" scoped>
  .carousel {
    outline: 1px solid black;
  }
</style>

<template>
  <div>
    <b-carousel
      v-model="slide"
      :interval="item.interval || 7000"
      controls
      fade
      indicators
      background="#ababab"
      style="text-shadow: 1px 1px 2px #333; text-color: blue;"
    >
      <b-carousel-slide
        v-for="subItem in item.contents"
        :key="makeHashId(subItem)"
        :caption="subItem.caption"
        :img-src="subItem.src"
      >
        <h3>{{ subItem.text }}</h3>
      </b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
  import crypto from 'crypto';

  export default {
    name: 'Carousel',
    props: ['item', 'path', 'data', 'page'],
    data() {
      return {
        slide: 0,
        editing: false
      }
    },
    components: {
    },
    methods: {
      makeHashId: function(obj) {
        return crypto.createHash('md5').update(JSON.stringify(obj)).digest('hex')
      },
      mapToImg: function(data) {
        return { ...data, type: "img" }
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
