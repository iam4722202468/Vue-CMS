<style lang="scss" scoped>
</style>

<template>
  <b-card-group columns>
      <Card v-for="subItem in item.contents" v-bind:key="makeHashId(subItem)" :item="subItem"/>
  </b-card-group>
</template>

<script>
  import Card from '@/components/widgets/card.vue';
  import crypto from 'crypto';

  export default {
    name: 'CardGroup',
    props: ['item', 'path', 'data', 'page'],
    data() {
      return {
        editing: false
      }
    },
    components: {
      Card
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
