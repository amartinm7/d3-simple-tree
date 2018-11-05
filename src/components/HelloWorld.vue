<template>
    <div>

    </div>
</template>

<script>
  const d3 = require('d3')

  export default {
    name: 'HelloWorld',
    props: {
      msg: String
    },
    data() {
      return {
        treeData: [
          {
            "name": "Top Level",
            "parent": "null",
            "value": 10,
            "type": "black",
            "level": "red",
            "children": [
              {
                "name": "Level 2: A",
                "parent": "Top Level",
                "value": 15,
                "type": "grey",
                "level": "red",
                "children": [
                  {
                    "name": "Son of A",
                    "parent": "Level 2: A",
                    "value": 5,
                    "type": "steelblue",
                    "level": "orange"
                  },
                  {
                    "name": "Daughter of A",
                    "parent": "Level 2: A",
                    "value": 8,
                    "type": "steelblue",
                    "level": "red"
                  }
                ]
              },
              {
                "name": "Level 2: B",
                "parent": "Top Level",
                "value": 10,
                "type": "grey",
                "level": "green"
              }
            ]
          }
        ],
        margin: {top: 20, right: 120, bottom: 20, left: 120},
      }
    },
    computed: {
      width: function () {
        return 960 - this.margin.right - this.margin.left
      },
      height: function () {
        return 500 - this.margin.top - this.margin.bottom
      },
      root: function () {
        return this.treeData[0]
      }

    },
    watch: {},
    methods: {
      update: function (tree, root, diagonal, svg) {
        let i = 0
        // Compute the new tree layout.
        const nodes = tree.nodes(root).reverse()
        const links = tree.links(nodes)

        // Normalize for fixed-depth.
        nodes.forEach(function(d) { d.y = d.depth * 180; })

        // Declare the nodes…
        const node = svg.selectAll("g.node").data(nodes, function(d) { return d.id || (d.id = ++i) })

        // Enter the nodes.
        const nodeEnter = node.enter().append("g")
          .attr("class", "node")
          .attr("transform", function(d) {
            return "translate(" + d.y + "," + d.x + ")" })

        nodeEnter.append("circle")
          .attr("r", function(d) { return d.value })
          .style("stroke", function(d) { return d.type })
          .style("fill", function(d) { return d.level })

        nodeEnter.append("text")
          .attr("x", function(d) {
            return d.children || d._children ?
              (d.value + 4) * -1 : d.value + 4 })
          .attr("dy", ".35em")
          .attr("text-anchor", function(d) {
            return d.children || d._children ? "end" : "start" })
          .text(function(d) { return d.name })
          .style("fill-opacity", 1)

        // Declare the links…
        const link = svg.selectAll("path.link")
          .data(links, function(d) { return d.target.id })

        // Enter the links.
        link.enter().insert("path", "g")
          .attr("class", "link")
          .style("stroke", function(d) { return d.target.level })
          .attr("d", diagonal)
      },
    },
    mounted: function () {
      const tree = d3.layout.tree().size([this.height, this.width])
      const diagonal = d3.svg.diagonal().projection(function(d) { return [d.y, d.x] })
      const svg = d3.select('body').append("svg:svg")
        .attr("width", this.width + this.margin.right + this.margin.left)
        .attr("height", this.height + this.margin.top + this.margin.bottom)
        .append("g")
        .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")")
      this.update(tree, this.root, diagonal, svg)
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .node circle {
        fill: #fff;
        stroke: steelblue;
        stroke-width: 3px;
    }

    .node text { font: 12px sans-serif; }

    .link {
        fill: none;
        stroke: #ccc;
        stroke-width: 2px;
    }
</style>
