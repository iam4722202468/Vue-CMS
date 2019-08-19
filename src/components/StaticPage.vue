<template>
  <div class="page">
    <div class="page-menu hide-small">
      <b-button
        squared
        variant="outline-dark"
        class="menu-item"
        v-on:keyup.enter="scrollToAnchor"
        tabindex=0
        v-on:click="scrollToAnchor"
        :anchor="item.title"
        v-for="item in pageData.page">
        {{ item.title }}
      </b-button>
      <!--<RenderTags :pageId="pageId" />-->
    </div>
    <div class="flex-body">
      <div class="page-body">
        <b-jumbotron
          bg-variant="light" text-variant="dark" border-variant="success"
          :fluid=true
          :header="pageData.title" :lead="pageData.desc">
          <hr v-if="pageData.links !== undefined">
          <b-button v-for="link in pageData.links" style="margin-right:10px;" variant="success" :href="link.url">{{link.text}}</b-button>
        </b-jumbotron>

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

        document.getElementById("navbar-title").innerHTML =
          `${this.pageData.title}`;
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
