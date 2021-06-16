<template>
  <div class="page">
    <div class="page-menu hide-small">
      <!--b-button
        squared
        variant="outline-dark"
        class="menu-item"
        v-on:keyup.enter="scrollToAnchor"
        tabindex=0
        v-on:click="scrollToAnchor"
        :anchor="item.title"
        v-for="item in pageData.page"
        v-bind:key="makeHashId(item)">
        {{ item.title }}
      </b-button--!>
      <!--<RenderTags :pageId="pageId" />-->
    </div>
    <b-jumbotron
      :style="jumbotronTitleStyleGen(pageData.masthead['image'], pageData.masthead['background-color'], pageData.masthead['text-color'], pageData.masthead['stroke-color'])"
      border-variant="success"
      :fluid=true
      :header="pageData.title" :lead="pageData.desc"
      class="jumbotron-title"
      >
      <hr v-if="pageData.links !== undefined">
      <b-button v-for="link in pageData.links" v-bind:key="makeHashId(link)" style="margin-right:10px; -webkit-text-stroke: rgba(0,0,0,0)" variant="success" :href="link.url">{{link.text}}</b-button>
    </b-jumbotron>

    <div class="flex-body">
      <div class="hide-medium side-menu">
      </div>

      <div class="page-body">
        <div :id="pageEntry.title" class="scroll-item" v-for="pageEntry, pageEntryIndex in pageData.page">
          <h2>{{ pageEntry.title }}</h2>
          <RenderWidgets :data="pageEntry.body" :dataIndex="pageEntryIndex" :page="pageData"></RenderWidgets>
        </div>
      </div>

      <div class="hide-medium side-menu">
        <!--RepoStats v-if="gitCommitData" :data="gitCommitData">
        <div style="margin: 10px; margin-bottom: -20px; margin-right: 0px;">
          <doughnut-chart style="padding-top: 50px" :repoName="repoName" /-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import RenderWidgets from '@/components/RenderWidgets.vue'
import RenderTags from '@/components/RenderTags.vue'
import RepoStats from '@/components/RepoStats.vue'

import Vue from 'vue';
import VueCharts from 'vue-chartjs'
import { Doughnut } from 'vue-chartjs'
import crypto from 'crypto';

Vue.component('doughnut-chart', {
  extends: Doughnut,
  props: ['repoName']
})

export default {
  name: 'StaticPage',
  data() {
    return {
      tags: [],
      pageData: []
    };
  },
  props: ['pageId'],
  components: {
    RenderWidgets,
    RenderTags
  },
  beforeMount() {
    const pageLoadPromise = [];
    
    pageLoadPromise.push(axios
      .get('/api/getPage', { params: { pageId: this.pageId }})
      .then((response) => {
        this.pageData = response.data;
      })
    );

    Promise.all(pageLoadPromise)
      .then(() => {
        if (this.$route.query.anchor) {
          const decodedAnchor = decodeURI(this.$route.query.anchor);
          const el = document
            .getElementById(decodedAnchor);
          if (el) {
            setTimeout(() => el.scrollIntoView({behavior: 'auto', block: 'start', inline: 'nearest'}), 250);
          }
        }
      })
  },
  methods: {
    makeHashId: function(obj) {
      return crypto.createHash('md5').update(JSON.stringify(obj)).digest('hex')
    },

    jumbotronTitleStyleGen: function(titleURL, backgroundColor, textColor, strokeColor) {
      let addIn = {}

      if (strokeColor) {
        addIn['-webkit-text-stroke-width'] = '1px';
        addIn['-webkit-text-stroke-color'] = strokeColor;
      }

      if (titleURL) {
        return {
          'background-image': `url(${titleURL})`,
          'background-size': 'cover',
          'background-color': (backgroundColor || "#f8f9fa") + ' !important',
          'color': (textColor || "#f8f9fa") + ' !important',
          ...addIn
        }
      } else {
        return {
          'background-color': "#f8f9fa !important",
          'color': '#343a40 !important',
          ...addIn
        }
      }
    },

    scrollToAnchor(e) {
      const anchorId = e.target.getAttribute('anchor');

      const el = document
        .getElementById(anchorId);

      el.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
      this.$router.push({query: {anchor: encodeURI(anchorId)}});
    }
  }
}
</script>

<style lang="scss" scoped>
  .hide-small {
    @media only screen and (max-width: 992px) {
      display: none;
    }
  }

  .hide-medium {
    @media only screen and (max-width: 1300px) {
      display: none;
    }
  }

  .page-menu {
    width: 280px;
    position: fixed;
    text-align: center;
    padding-right: 2px;
    overflow-x: hidden;
    overflow-y: hidden;
  }

  .page-body {
    padding-right: 32%;
    padding-left: 3%;

    @media only screen and (max-width: 991px) {
      padding-right: 5%;
      padding-left: 5%;
    }

    @media only screen and (max-width: 550px) {
      padding-right: 20px;
      padding-left: 0px;
    }

    flex-grow: 5;
    overflow: auto;
    margin-bottom:2em;
  }

  .flex-body {
    padding-left: 280px;
    display: flex;

    @media only screen and (max-width: 991px) {
      padding-left: 0px;
    }
  }

  .flex-body > * {
    margin-left: 20px;
  }

  .page {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
  }

  .scroll-item:before {
    height: 3em;
    display: block;
    content: '';
  }

  .menu-item {
    display: block;
    font-family: Arial, Helvetica, sans-serif;
    cursor: pointer;
    width: 100%;
    font-size: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
  }
</style>
