<template>
  <div class="page page-body">
    <pdf :src="pdfPath"
    style="width: 100%; 
    height: 100%; 
    margin-top: 2em;
    border: 1px solid black;
    "
    ></pdf>
  </div>
</template>

<script>
import axios from 'axios';
import RenderWidgets from '@/components/RenderWidgets.vue'
import RenderTags from '@/components/RenderTags.vue'
import RepoStats from '@/components/RepoStats.vue'

import Vue from 'vue';
import pdf from 'vue-pdf'

export default {
  name: 'PdfPage',
  data() {
    return {
      tags: [],
      pageData: []
    };
  },
  props: ['pdfPath'],
  components: {
    RenderWidgets,
    RenderTags,
    pdf
  },
  methods: {
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
    padding-right: 20%;
    padding-left: 20%;

    @media only screen and (max-width: 1200px) {
      padding-right: 5%;
      padding-left: 5%;
    }

    flex-grow: 5;
    margin-bottom:2em;
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
