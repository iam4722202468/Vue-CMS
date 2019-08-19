<style lang="scss" scoped>

.flex {
  display: flex;
}

.tag {
  height: 25px;
  margin: 10px;
}

</style>

<template>
  <svg style="margin-left: 10px; margin-right: 2px; border: 1px solid black" width="270" height="220"></svg>
</template>


<script>
import * as d3 from 'd3';
import axios from 'axios';

function getFile(name) {
  if (name === 'Python')
    return '/icons/python/python-original.svg';
  else if (name === 'C')
    return '/icons/c/c-original.svg';
  else if (name === 'Vue')
    return '/icons/vuejs/vuejs-original.svg';
  else if (name === 'Vim')
    return '/icons/vim/vim-original.svg';
  else if (name === 'Nginx')
    return '/icons/nginx/nginx-original.svg';
  else if (name === 'Linux')
    return '/icons/linux/linux-original.svg';
  else if (name === 'Java')
    return '/icons/java/java-original.svg';
  else if (name === 'Go')
    return '/icons/go/go-original.svg';
  else if (name === 'Git')
    return '/icons/git/git-original.svg';
  else if (name === 'Gimp')
    return '/icons/gimp/gimp-original.svg';
  else if (name === 'Express')
    return '/icons/express/express-original.svg';
  else if (name === 'Debian')
    return '/icons/debian/debian-original.svg';
  else if (name === 'C#')
    return '/icons/csharp/csharp-original.svg';
  else if (name === 'Bootstrap')
    return '/icons/bootstrap/bootstrap-plain.svg';
  else if (name === 'C++')
    return '/icons/cplusplus/cplusplus-original.svg';
  else if (name === 'Node.js')
    return '/icons/nodejs/nodejs-original.svg';
  else if (name === 'HTML')
    return '/icons/html5/html5-original.svg';
  else if (name === 'Sass')
    return '/icons/sass/sass-original.svg';
  else if (name === 'Javascript')
    return '/icons/javascript/javascript-original.svg';
  else if (name === 'Github')
    return '/icons/github/github-original.svg';
  else if (name === 'JQuery')
    return '/icons/jquery/jquery-original.svg';
  else if (name === 'MongoDB')
    return '/icons/mongodb/mongodb-original.svg';
  else if (name === 'Yarn')
    return '/icons/yarn/yarn-original.svg';
  else if (name === 'Webpack')
    return '/icons/webpack/webpack-original.svg';
  else if (name === 'Babel')
    return '/icons/babel/babel-original.svg';
  else if (name === 'CSS3')
    return '/icons/css3/css3-original.svg';
  else
    console.log(`Missing ${name}`);
}

export default {
  name: 'RenderTags',
  props: ['pageId'],
  data() {
    return {
      tags: [],
    };
  },
  beforeMount() {
    axios
      .get('/api/getPage', { params: { pageId: this.pageId }})
      .then((response) => {
        this.tags = response.data.tags;
        var width = 270,
        height = 220,
        radius = 20;

        var m = 5; // number of distinct clusters

        var color = d3.scaleOrdinal(d3.schemeCategory10)
            .domain(d3.range(m));

        // The largest node for each cluster.
        var clusters = new Array(m);

        var nodes = this.tags.map(function(tag) {
          var i = Math.floor(Math.random() * m),
              r = Math.random() * radius/3 + radius*2/3,
              d = {cluster: i, radius: r, name: tag}
          if (!clusters[i] || (r > clusters[i].radius)) clusters[i] = d;
          return d;
        });

        var forceCollide = d3.forceCollide()
            .radius(function(d) { return d.radius + 2.5; })
            .iterations(1);

        var force = d3.forceSimulation()
            .nodes(nodes)
            .force("center", d3.forceCenter())
            .force("collide", forceCollide)
            .force("cluster", forceCluster)
            .force("x", d3.forceX().strength(.7))
            .force("y", d3.forceY().strength(.7))
            .on("tick", tick);

        var svg = d3.select(this.$el).append("svg")
            .attr("width", width)
            .attr("height", height)
          .append('g')
            .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

        var circle = svg.selectAll("image")
            .data(nodes)
          .enter()
            .append("svg:image")
            .attr("xlink:href",  function(d) { return getFile(d.name);})
            .attr("height", function(d) { return d.radius*2; })
            .attr("width", function(d) { return d.radius*2; });
        //    TODO: Update for v4
        //    .call(force.drag);

        function tick() {
          circle
              .attr("x", function(d) { return Math.min(width-radius*2, d.x); })
              .attr("y", function(d) { return Math.min(height-radius*2, d.y); });
        }

        function forceCluster(alpha) {
          for (var i = 0, n = nodes.length, node, cluster, k = alpha * 1; i < n; ++i) {
            node = nodes[i];
            cluster = clusters[node.cluster];
            node.vx -= (node.x - cluster.x) * k;
            node.vy -= (node.y - cluster.y) * k;
          }
        }

      })
  }
}
</script>
