<style lang="scss" scoped>
  .text {
    padding-top:10px;
    padding-bottom:10px;

    padding-left: 5px;
    padding-right: 5px;

    @media only screen and (min-width: 550px) {
      padding-left: 10px;
      padding-right: 10px;
    }
  }
</style>

<template>
  <div>
    {{ item.text }}

  <!--
    
  <div v-if="!editing">
    {{ item.text }}
  </div>
    <div v-else>
    <textarea :ref="path.join('.')" rows="4" cols="50">{{ item.text }}</textarea>
  </div>-->
  </div>
</template>

<script>
  import crypto from 'crypto';

  export default {
    name: 'Text_',
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
