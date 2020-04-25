<style lang="scss" scoped>
  .widget {
    min-width: 300px;
  }

  .container0 {
    display: flex;
    flex-wrap: wrap;
  }
</style>

<template>
  <div>
    <div v-if="admin">
      New widget +
    </div>
    <div class="widget" :style="item.style">

      <div class="container0" v-if="item.type == 'container'">
        <div style="display: grid; flex-basis: 0;" v-bind:style="{ 'flex-grow': subItem.width || 1 }" v-for="subItem in item.contents" v-bind:key="makeHashId(subItem)">
          <RenderWidget :item="subItem" />
        </div>
      </div>

      <div class="container0" v-if="item.type == 'container-vert'">
        <div v-for="subItem in item.contents" v-bind:key="makeHashId(subItem)">
          <RenderWidget :item="subItem" />
        </div>
      </div>

      <FormattedText :item="item" v-if="item.type == 'formatted-text'"/>

      <Tab :item="item" v-if="item.type == 'tab'">
        <b-tab v-for="subItem in item.contents" :title="subItem.title" v-bind:key="makeHashId(subItem)">
          <b-card-text v-for="subSubItem in subItem.contents" v-bind:key="makeHashId(subSubItem)">
            <RenderWidget :item="subSubItem" />
          </b-card-text>
        </b-tab>
      </Tab>

      <BR :item="item" v-if="item.type == 'br'"/>
      <Text_ :item="item" v-if="item.type == 'text'"/>
      <IMG :item="item" v-if="item.type == 'img'" style="height: 100%"/>

      <VID :item="item" v-if="item.type == 'vid'" style="height: 100%"/>
      <Code :item="item" v-if="item.type == 'code'"/>
      <Divider :item="item" v-if="item.type == 'divider'"/>

      <Carousel :item="item" v-if="item.type == 'carousel'"/>
      <Masthead class="masthead" :item="item" v-if="item.type == 'masthead'"/>
      <Feature :item="item" v-if="item.type == 'feature'"/>

      <Card :item="item" v-if="item.type == 'card'"/>
      <CardGroup :item="item" v-if="item.type == 'card-group'"/>
      <BJumbotron :item="item" v-if="item.type == 'jumbotron'"/>

      <div v-if="editing && admin" v-on:click="change" :item="item">
        Save changes
      </div>
      <div v-if="!editing && admin" v-on:click="change" :item="item">
        Edit this widget
      </div>
    </div>
    <div v-if="admin">
      New widget +
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import crypto from 'crypto';

import FormattedText from '@/components/widgets/formatted-text.vue';
import Tab from '@/components/widgets/tab.vue';

import BR from '@/components/widgets/br.vue';
import Text_ from '@/components/widgets/text.vue';
import IMG from '@/components/widgets/img.vue';

import VID from '@/components/widgets/vid.vue';
import Code from '@/components/widgets/code.vue';
import Divider from '@/components/widgets/divider.vue';

import Carousel from '@/components/widgets/carousel.vue';
import Masthead from '@/components/widgets/masthead.vue';
import Feature from '@/components/widgets/feature.vue';

import Card from '@/components/widgets/card.vue';
import CardGroup from '@/components/widgets/card-group.vue';
import BJumbotron from '@/components/widgets/b-jumbotron.vue';

export default {
  name: 'RenderWidget',
  props: ['item', 'path', 'data', 'page'],
  data() {
    return {
      editing: false,
      admin: false
    }
  },
  components: {
    FormattedText,
    Tab,

    BR,
    Text_,
    IMG,

    VID,
    Code,
    Divider,

    Carousel,
    Masthead,
    Feature,

    Card,
    CardGroup,
    BJumbotron
  },
  methods: {
    makeHashId: function(obj) {
      return crypto.createHash('md5').update(JSON.stringify(obj)).digest('hex')
    },

    updatePage: function(modified) {
      console.log(modified)
      axios.post('/api/updatePage', 
        modified
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
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

<style>
  .carousel-caption {
    background-color: rgba(0,0,0,0.5);
  }
</style>
