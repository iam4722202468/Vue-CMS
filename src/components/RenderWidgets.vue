<style lang="scss">
@import '../assets/highlight.scss';

.flex {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
}

.widget-padding {
  margin-top: 10px;
  margin-bottom: 10px;

  margin-left: 1px;
  margin-right: 1px;

  @media only screen and (min-width: 550px) {
    margin-left: 20px;
    margin-right: 20px;
  }
}
</style>

<template>
  <div>
    <div class="flex" v-for="row,rowIndex in data">
      <div style="display: grid; flex-basis: 0; width: 100%;"v-bind:style="{ 'flex-grow': item.width || 1 }"  v-for="item, itemIndex in row">
        <RenderWidget class="widget-padding" style="display:grid" :page="page" :data="data" :item="item" :path="[dataIndex, rowIndex, itemIndex]" />
      </div>
    </div>
  </div>
</template>

<script>
import RenderWidget from '@/components/RenderWidget.vue'

export default {
  name: 'RenderWidgets',
  props: ['data', 'dataIndex', 'page'],
  components: {
    RenderWidget
  },
}
</script>


