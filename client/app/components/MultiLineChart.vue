<template>
  <div class='multiline-chart' ref='container'>
    <svg class='multiline-chart__svg'>
      <g v-for="(points, i) in allPoints" :key="ids[i]"
        :transform="computeWidth(i)">
        <line-segment
          color="SteelBlue"
          :width='widths[i]'
          :height='height'
          :index="i"
          :points="allPoints[i]"
          :xAccessFunc='xAccessFunc'
          :yAccessFunc='yAccessFunc'
          :domain='domains[i]'
          :range='ranges[i]'
          :selected="ids[i] === selectedId"/>
      </g>
    </svg>
  </div>
</template>

<script>

import LineSegment from './LineSegment.vue'

export default {
  props: [
    'xAccessFunc', 'yAccessFunc', 'ids', 'selectedId', 'offsets',
    'domains', 'ranges', 'totalLength', 'allPoints',
  ],
  data: function() {
    return {
      width: 0,
      height: 0,
    };
  },
  components: {
    LineSegment,
  },
  computed: {
    widths: function() {
      const widths = [];
      let totalWidth = 0;
      for (let i = 0; i < this.ids.length; i++) {
        const domain = this.domains[i];
        const length = domain.max - domain.min;
        const width = (length / this.totalLength) * this.width;
        totalWidth += width;
        widths.push(width);
      }

      console.log("Total width: " + totalWidth);
      return widths;
    },
  },
  mounted: function() {
    const dim = this.$refs.container.getBoundingClientRect();
    this.width = dim.width;
    this.height = dim.height;
    console.log(dim);
  },
  methods: {
    computeWidth: function(i) {
      const offsetRatio = this.offsets[i] / this.totalLength;
      const pixelOffset = offsetRatio * this.width + (i * 5);
      return 'translate(' + pixelOffset + ', 0)';
    },
  },
}

</script>

<style>
.multiline-chart {
  height: 100%;
}

/* TODO: seems like this should be necessary, but the SVG appears to be
filling its space, possible because its children have sizes that are explicitly
set

.multiline-chart__svg {
  width: 100%;
  height: 100%;
}

*/
</style>
