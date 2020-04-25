<template>
  <div class="page">
    <div class="flex-body">
      <div class="page-body">
        <div :id="pageEntry.title" class="scroll-item" v-for="pageEntry in pageData.page">
          <h2>{{ pageEntry.title }}</h2>
          <RenderWidgets :data="pageEntry.body"></RenderWidgets>
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
  name: 'HomePage',
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
      visibility: hidden;
      width: 0px;
    }
  }

  .hide-medium {
    @media only screen and (max-width: 1300px) {
      visibility: hidden;
      width: 0px;
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
