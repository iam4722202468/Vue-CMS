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
    <div class="new-widget" v-if="admin">
      <b-button variant="outline-primary">New widget +</b-button>
    </div>
    <div class="widget" :style="item.style">
      <div class="container0" v-if="item.type == 'container'">
        <div style="display: grid; flex-basis: 0;" v-bind:style="{ 'flex-grow': subItem.width || 1 }" v-for="subItem in item.contents" v-bind:key="makeHashId(subItem)">
          <RenderWidget :editing="editing" :path="path" :data="data" :page="page" :item="subItem" />
        </div>
      </div>

      <div class="container0" v-if="item.type == 'container-vert'">
        <div v-for="subItem in item.contents" v-bind:key="makeHashId(subItem)">
          <RenderWidget :editing="editing" :path="path" :data="data" :page="page" :item="subItem" />
        </div>
      </div>

      <FormattedText ref="el" :editing="editing" :path="path" :data="data" :page="page" :item="item" v-if="item.type == 'formatted-text'"/>

      <Tab ref="el" :path="path" :data="data" :page="page" :item="item" v-if="item.type == 'tab'">
        <b-tab v-for="subItem in item.contents" :title="subItem.title" v-bind:key="makeHashId(subItem)">
          <b-card-text v-for="subSubItem in subItem.contents" v-bind:key="makeHashId(subSubItem)">
            <RenderWidget :editing="editing" :path="path" :data="data" :page="page" :item="subSubItem" />
          </b-card-text>
        </b-tab>
      </Tab>

      <BR ref="el" :editing="editing" :path="path" :data="data" :page="page" :item="item" v-if="item.type == 'br'"/>
      <Text_ ref="el" :editing="editing" :path="path" :data="data" :page="page" :item="item" v-if="item.type == 'text'"/>
      <IMG ref="el" :editing="editing" :path="path" :data="data" :page="page" :item="item" v-if="item.type == 'img'"/>

      <VID ref="el" :editing="editing" :path="path" :data="data" :page="page" :item="item" v-if="item.type == 'vid'" style="height: 100%"/>
      <Code ref="el" :editing="editing" :path="path" :data="data" :page="page" :item="item" v-if="item.type == 'code'"/>
      <Divider ref="el" :editing="editing" :path="path" :data="data" :page="page" :item="item" v-if="item.type == 'divider'"/>

      <Carousel ref="el" :editing="editing" :path="path" :data="data" :page="page" :item="item" v-if="item.type == 'carousel'"/>
      <Masthead ref="el" :editing="editing" :path="path" :data="data" :page="page" class="masthead" :item="item" v-if="item.type == 'masthead'"/>
      <Feature ref="el" :editing="editing" :path="path" :data="data" :page="page" :item="item" v-if="item.type == 'feature'"/>

      <Card ref="el" :editing="editing" :path="path" :data="data" :page="page" :item="item" v-if="item.type == 'card'"/>
      <CardGroup ref="el" :editing="editing" :path="path" :data="data" :page="page" :item="item" v-if="item.type == 'card-group'"/>
      <BJumbotron ref="el" :editing="editing" :path="path" :data="data" :page="page" :item="item" v-if="item.type == 'jumbotron'"/>

      <div class="new-widget" v-if="editing && admin" v-on:click="change" :item="item">
        <b-button variant="outline-success">Save changes</b-button>
      </div>
      <div class="new-widget" v-if="!editing && admin" v-on:click="change" :item="item">
        <b-button variant="outline-danger">Edit this widget</b-button>
      </div>
    </div>
    <div class="new-widget" v-if="admin">
      <b-button variant="outline-primary">New widget +</b-button>
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
      admin: true,
      editing: false
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

    getObject: function(path, page) {
      let reducePath = path.slice().reverse()
      let currObj = page

      while (reducePath.length > 0) {
        if (currObj.body) {
          currObj = currObj.body[reducePath.pop()]
        } else if (currObj.contents) {
          currObj = currObj.contents[reducePath.pop()]
        } else {
          currObj = currObj[reducePath.pop()]
        }

      }
      return currObj;
    },

    change: function (event) {
      if (this.editing) {
        const newData = this.$refs.el.getUpdateData();
        const followedPath = this.getObject(this.path, this.page.page, newData);

        Object.assign(followedPath, newData);
        console.log(this.page)
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

  .new-widget {
    padding-bottom: 5px;
    padding-top: 5px;
  }

</style>
