<style lang="scss">
.repo-stats {
  top: 5rem;
}

.git-commit {
  display: flex;
  text-align: left;
  text-decoration: none;
  color: #495057;
  overflow: hidden;

  padding: 0.75rem 1.25rem;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.125);
  &:hover {
    color: #495057;
    text-decoration: none;
    background-color: #f8f9fa;
  }
}

.mb-1 {
  margin-bottom: 0.25rem !important;
}

.git-text {
  font-weight: 500;
  line-height: 1.2;
}
.git-image {
  border: 1px solid rgba(0, 0, 0, 0.125);
  height: 5em;
  float: left;
  margin: 20px;
  margin-left: 0;
}

.git-hash {
  line-height: 0.7em;
  font-size: 0.9em;
}
</style>

<template>
  <div>
      <div v-if="extended" class="repo-stats">
        <div v-for="item in data">
          <a target="_blank" :href="item['html_url']" class="git-commit">
            <img class="git-image" v-if="item['committer']" :src="item['committer']['avatar_url']" alt="User Icon">
            <div class="git-text">
              <small>{{ item['commit']['author']['date'] }}</small><br>
              <p class="mb-1">{{ item['commit']['message'] }}</p>
              <p class="mb-1 git-hash">{{ item['sha'] }}</p>
              <small>{{ item['commit']['author']['name'] }}</small><br>
              <small>{{ item['commit']['author']['email'] }}</small>
            </div>
          </a>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'RepoStats',
  props: ['data'],
  methods: {
    toggleCommitHistory(e) {
      this.extended = !this.extended;
    },
    closeDropdown(e) {
      this.extended = false;
    }
  },
  data() {
    return {
      extended: true,
    }
  },
}
</script>
