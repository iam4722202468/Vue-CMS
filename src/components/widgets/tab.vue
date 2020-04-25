<style lang="scss" scoped>
</style>

<template>
  <b-card no-body>
    <b-tabs pills card vertical>
      <slot></slot>
    </b-tabs>
  </b-card>
</template>

<script>
  import crypto from 'crypto';

  export default {
    name: 'Tab',
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
