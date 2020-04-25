<style lang="scss" scoped>
  .img {
    width: 100%;
  }
</style>

<template>
  <img class="img" :src="item.src" />
</template>

<script>
  import crypto from 'crypto';

  export default {
    name: 'IMG',
    props: ['item', 'path', 'data', 'page'],
    data() {
      return {
        editing: false
      }
    },
    components: {
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
