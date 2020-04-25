<style lang="scss" scoped>
  .code {
    overflow: scroll;
    max-width: 100%;
  }
</style>

<template>
  <pre v-highlightjs="item.code" class="code"><code :class="item.language"></code></pre>
</template>

<script>
  import crypto from 'crypto';

  export default {
    name: 'Code',
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
