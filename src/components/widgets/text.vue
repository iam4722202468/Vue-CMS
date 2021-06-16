<style lang="scss" scoped>
  .text {
    padding-top: 10px;
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
    <div class="text" v-if="!editing">
      {{ item.text }}
    </div>
    <div v-else>
      <textarea ref="textUpdate" rows="15" style="width: 100%;">{{ item.text }}</textarea>
    </div>
  </div>
</template>

<script>
  import crypto from 'crypto';

  export default {
    name: 'Text_',
    props: ['item', 'path', 'data', 'page', 'editing'],
    data() {
      return {
      }
    },
    components: {
    },
    methods: {
      makeHashId: function(obj) {
        return crypto.createHash('md5').update(JSON.stringify(obj)).digest('hex')
      },
      getUpdateData: function() {
        return {
          type: "text",
          text: this.$refs.textUpdate.value
        }
      }
    }

  }
</script>
