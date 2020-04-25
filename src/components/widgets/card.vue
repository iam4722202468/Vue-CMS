
<style lang="scss" scoped>
</style>

<template>
  <a
    :href="item.url"
    style="color: inherit; text-decoration: inherit;"
  >
    <b-card
      :title="item.title"
      :img-src="item.src"
      img-top
      footer-tag="footer"
    >
      <b-card-text>
        {{ item.text }}
      </b-card-text>

      <b-button v-if="item.href !== undefined" :href="item.href" variant="success" v-bind:key="makeHashId(item)">{{item.button}}</b-button>

      <template v-if="item.footer" v-slot:footer>
        <em>{{ item.footer }}</em>
      </template>
    </b-card>
  </a>
</template>

<script>
  import crypto from 'crypto';

  export default {
    name: 'Card',
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
