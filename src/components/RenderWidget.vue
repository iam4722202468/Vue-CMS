<style lang="scss" scoped>
.widget {
  border: 1px solid black;
  min-width: 300px;
}

.carousel {
  outline: 1px solid black;
}

.code {
  overflow: scroll;
  max-width: 100%;
}

.text {
  padding-top:10px;
  padding-bottom:10px;

  padding-left: 5px;
  padding-right: 5px;

  @media only screen and (min-width: 550px) {
    padding-left: 10px;
    padding-right: 10px;
  }
}

.formatted-text {
  padding-top:10px;
  padding-bottom:10px;

  padding-left: 5px;
  padding-right: 5px;

  @media only screen and (min-width: 550px) {
    padding-left: 10px;
    padding-right: 10px;
  }
}

.img {
  width: 100%;
}

.container0 {
  display: flex;
  flex-wrap: wrap;
}

.hr {
  border: 0;
  height: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  margin-bottom: 0px;
  margin-top: 0px;
}

.masthead > div {
  height: 40vh;
  width: 100%;
  text-align: center;
  color: white;

  .masthead--text {
    line-height: 40vh;
    font-size: 30px;
  }
}
</style>


<template>
  <div>
    <div>
      New widget +
    </div>
    <div class="widget" :style="item.style">
      <div class="text" v-if="item.type == 'br'">
        <br>
      </div>
      <div class="text" v-if="item.type == 'text'">
        <div v-if="!editing">
          {{ item.text }}
        </div>
        <div v-if="editing">
          <textarea :ref="path.join('.')" rows="4" cols="50">{{ item.text }}</textarea>
        </div>
      </div>
      <div class="formatted-text" v-html="item.text" v-if="item.type == 'formatted-text'">
      </div>
      <div v-if="item.type == 'img'" style="height: 100%">
        <img class="img" :src="item.src" />
      </div>
      <div class="container0" v-if="item.type == 'container'">
        <div style="display: grid; flex-basis: 0;" v-bind:style="{ 'flex-grow': subItem.width || 1 }" v-for="subItem in item.contents">
          <RenderWidget :item="subItem" />
        </div>
      </div>
      <div v-if="item.type == 'code'">
        <pre v-highlightjs="item.code"><code :class="item.language"></code></pre>
      </div>
      <div v-if="item.type == 'divider'">
        <hr class="hr" />
      </div>
      <div class="carousel" v-if="item.type == 'carousel'">
        <carousel :loop="true" :autoplay="true" :autoplayTimeout="7000" :perPage="1">
          <slide v-for="subItem in item.contents">
            <RenderWidget style="padding: 0px" :item="subItem" />
          </slide>
        </carousel>
      </div>
      <div class="masthead" v-if="item.type == 'masthead'">
        <div v-bind:style="{ 'background-image': 'url(' + item.src + ')'}"><div class="masthead--text">{{ item.text }}</div></div>
      </div>
      <div class="feature text" v-if="item.type == 'feature'">
        <h5>{{ item.title }}</h5>
        <div class="text" v-if="item.text !== undefined">
          {{ item.text }}
        </div>
        <div class="text text-formatted" v-html="item.formatted" v-if="item.formatted !== undefined"></div>
      </div>

      <b-card no-body v-if="item.type == 'tab'">
        <b-tabs pills card vertical>
          <b-tab v-for="subItem in item.contents" :title="subItem.title">
            <b-card-text v-for="subSubItem in subItem.contents">
              <RenderWidget :item="subSubItem" />
            </b-card-text>
          </b-tab>
        </b-tabs>
        </b-tabs>
      </b-card>

      <b-card
        v-if="item.type == 'card'"
        :title="item.title"
        :img-src="item.src"
        img-top
      >
        <b-card-text>
          {{ item.text }}
        </b-card-text>

        <b-button v-if="item.href !== undefined" :href="item.href" variant="success">{{item.button}}</b-button>
      </b-card>

      <b-carousel
        v-if="item.type == 'b-carousel'"
        v-model="slide"
        :interval="7000"
        controls
        fade
        indicators
        background="#ababab"
        style="text-shadow: 1px 1px 2px #333; text-color: blue;"
        @sliding-start="onSlideStart"
        @sliding-end="onSlideEnd"
      >
        <b-carousel-slide
          v-for="subItem in item.contents"
          :caption="subItem.caption"
          :img-src="subItem.src"
        >
          <h1>{{ subItem.text }}</h1>
        </b-carousel-slide>
      </b-carousel>

      <b-jumbotron
        v-if="item.type == 'jumbotron'"
        :header="item.title" :lead="item.subtitle">
        <p>{{ item.text }}</p>
        <b-button v-for="link in item.links" style="margin-right: 10px;" variant="success" :href="link.url">{{link.title}}</b-button>
      </b-jumbotron>
      <div v-if="editing" v-on:click="change" :item="item">
        Save changes
      </div>
      <div v-if="!editing" v-on:click="change" :item="item">
        Edit this widget
      </div>
    </div>
    <div>
      New widget +
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { Carousel, Slide } from 'vue-carousel';

export default {
  name: 'RenderWidget',
  props: ['item', 'path', 'data', 'page'],
  data() {
    return {
      editing: false
    }
  },
  components: {
    Carousel,
    Slide
  },
  methods: {
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
