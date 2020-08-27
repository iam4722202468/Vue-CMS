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
      </b-button-->
      <div class="hide-small" style="margin: 10px; margin-bottom: -20px; margin-right: 0px;">
        <!--doughnut-chart :repoName="repoName" /-->
      </div>
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
      <b-button v-for="link in pageData.links" v-bind:key="makeHashId(link)" style="margin-right:10px;" variant="success" :href="link.url">{{link.text}}</b-button>
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
        <!--RepoStats v-if="gitCommitData" :data="gitCommitData" /-->
        <div style="margin: 10px; margin-bottom: -20px; margin-right: 0px;">
          <!--doughnut-chart style="padding-top: 50px" :repoName="repoName" /-->
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
  props: ['repoName'],
  data() {
    return {
      gitLanguageData: []
    };
  },
  beforeMount() {
    axios
      .get(`https://api.github.com/repos/${this.repoName}/languages`)
      .then((response) => {
        const totalBytes =
          Object.values(response.data)
            .reduce((byteSize, acc) => acc += parseInt(byteSize), 0);

        this.gitLanguageData = Object.keys(response.data).map((key) => ({
          title: key,
          bytes: response.data[key],
          percentage: parseInt(response.data[key])/totalBytes*100
        }));

        this.renderChart({
          labels: this.gitLanguageData.map(language => language.title ),
          datasets: [
            {
              backgroundColor: [
                '#003f5c',
                '#374c80',
                '#7a5195',
                '#bc5090',
                '#ef5675',
                '#ff764a',
                '#ffa600'
              ],
              data: this.gitLanguageData.map(language => language.bytes)
            }
          ]
        }, {responsive: true, maintainAspectRatio: false})
      });
  }
})

export default {
  name: 'Page',
  data() {
    return {
      tags: [],
      pageData: [],
      gitCommitData: [],
    };
  },
  props: ['repoName', 'pageId'],
  components: {
    RenderWidgets,
    RenderTags,
    RepoStats,
  },
  beforeMount() {
    const pageLoadPromise = [];
    
    if (this.repoName) {
      pageLoadPromise.push(axios
        .get(`https://api.github.com/repos/${this.repoName}/commits`)
        .then(response => {
          this.gitCommitData = response.data.slice(0,2);
        }));
    }

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
    @media only screen and (max-width: 991px) {
      visibility: hidden;
      width: 0px;
    }
  }

  .hide-medium {
    @media only screen and (max-width: 1300px) {
      visibility: hidden;
      width: 0px;
      display: none;
    }
  }

  .page-menu {
    text-align: center;
    padding-right: 2px;
    overflow-x: hidden;
    overflow-y: hidden;
  }

  .page-body {
    padding-right: 3%;
    padding-left: 3%;

    @media only screen and (max-width: 991px) {
      padding-right: 0%;
      padding-left: 0%;
    }

    @media only screen and (max-width: 550px) {
      padding-right: 0px;
      padding-left: 0px;
    }

    flex-grow: 5;
    overflow: auto;
    margin-bottom:2em;
  }

  .side-menu {
    width: 100%;
    max-width: 12%;
  }

  .display-3 {
    @media only screen and (max-width: 991px) {
      font-size: 2em;
    }

    @media only screen and (max-width: 550px) {
      padding-right: 20px;
      padding-left: 20px;
    }
  }

  .jumbotron {
    padding-bottom: 6em;
    padding-top: 6em;
    background-color: black;
    background-position: center
  }

  .jumbotron-title {
    margin-left: 0%;
    margin-right: 0%;

    @media only screen and (max-width: 991px) {
      text-align:center;
    }
  }

  .flex-body {
    @media only screen and (max-width: 991px) {
      padding-left: 0px;
      padding-right: 0px;
    }

    display: flex;
  }

  .flex-body > * {
    margin-left: 20px;
    margin-right: 20px;
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
