<style module lang="scss">
  .bootstrap-css {
    @import url("https://netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap-glyphicons.css");
    @font-face {
      font-family: 'Glyphicons Halflings';
    }
    .glyphicon {
      position: relative;
      top: 1px;
      display: inline-block;
      font-family: 'Glyphicons Halflings';
      font-style: normal;
      font-weight: normal;
      line-height: 1;

      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    .glyphicon-info-sign:before {
      content: "\e086";
    }
  }
</style>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Quicksand:300');

  body {
    font-family: Quicksand;
    font-weight: 300;
    width: 100% ;
  }

  .panel > .title {
    font-size: 30px
  }

  .file-name {
    margin-bottom: -20px;
    padding: 0px 0px 0px 22px;
    font-size: 20px;
    color: rgb(110,110,110);
    margin-top: -16px;
  }

  .panel {
    margin: 20px;
    padding: 5px;
    border: 1px solid rgb(230,230,230);
    border-radius: 2pt;
    text-align: center;
  }

  .panel#piechooser {
    -webkit-flex: 1 1 250px;
    flex: 1 1 250px;
    -webkit-order: 1;
    order: 1;
    height: 100%;
    position:relative;
    width: 250px;
  }

  section {
    margin: 0px;
    padding: 0px;
    display: -webkit-flex;
    display:         flex;
    display: -ms-flexbox;
    -webkit-flex-flow: row;
    flex-flow: row;
  }

  section#top {
    min-height: 225px;
    height: 250px;
  }

  section#middle {
    margin-top: 25px;
    min-height: 600px;
  }

  svg { width: 100%;}

  #percents {
    margin-right: 20px;
    -webkit-flex: 1 1 auto;
    flex: 1 1 auto;
    -webkit-order: 1;
    order: 1;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: row;
    flex-direction: row;
    -webkit-flex-wrap: wrap;
    flex-wrap: wrap;
    flex-flow: row wrap;
    width: 40%;
  }

  #percents .percent {
    height: 220px;
  }

  #distributions {
    -webkit-flex: 2 1 auto;
    flex: 2 1 auto;
    -webkit-order: 2;
    order: 2;
    display: -webkit-flex;
    /*                display: flex;*/
    -webkit-flex-direction: row;
    flex-direction: row;
    -webkit-flex-wrap: wrap;
    flex-wrap: wrap;
    width: 60%;
  }

  #distributions .distribution {-webkit-flex: 1 1 100%; flex: 1 1 100%; height:220px; position:relative; /*padding: 0px 15px 0px 15px*/}

  /* Make clicks pass-through */
  #nprogress {
    pointer-events: none;
    -webkit-pointer-events: none;
  }

  #nprogress .bar {
    background: red;

    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;

    width: 100%;
    height: 2px;
  }

  /* Fancy blur effect */
  #nprogress .peg {
    display: block;
    position: absolute;
    right: 0px;
    width: 100px;
    height: 100%;
    box-shadow: 0 0 10px #29d, 0 0 5px #29d;
    opacity: 1.0;

    -webkit-transform: rotate(3deg) translate(0px, -4px);
    -moz-transform: rotate(3deg) translate(0px, -4px);
    -ms-transform: rotate(3deg) translate(0px, -4px);
    -o-transform: rotate(3deg) translate(0px, -4px);
    transform: rotate(3deg) translate(0px, -4px);
  }

  /* Remove these to get rid of the spinner */
  #nprogress .spinner {
    display: block;
    position: fixed;
    z-index: 100;
    top: 15px;
    right: 15px;
  }

  #nprogress .spinner-icon {
    width: 14px;
    height: 14px;

    border:  solid 2px transparent;
    border-top-color:  #fff;
    border-left-color: #fff;
    border-radius: 10px;

    -webkit-animation: nprogress-spinner 400ms linear infinite;
    -moz-animation:    nprogress-spinner 400ms linear infinite;
    -ms-animation:     nprogress-spinner 400ms linear infinite;
    -o-animation:      nprogress-spinner 400ms linear infinite;
    animation:         nprogress-spinner 400ms linear infinite;
  }


  .iobio-multi-line.line-panel text { fill: black; }
  .iobio-multi-line.button-panel text { fill: white; }
  .iobio-multi-line #iobio-button-all { display: none; }
  .iobio-axis line,.iobio-axis path{fill:none;stroke:#000;shape-rendering:crispEdges}
  .iobio-tooltip{position:fixed;top:0;text-align:center;z-index:20;color:#fff;padding:4px 6px;font:11px arial;background:#505050;border:0;border-radius:4px;pointer-events:none}
  .iobio-brush .extent{stroke:#000;fill-opacity:.125;shape-rendering:crispEdges}
  .iobio-gene .cds,.iobio-gene .utr{fill:#2d8fc1;stroke:#2d8fc1}.iobio-gene .reference{stroke:#969696}
  .iobio-gene .name{font-size:10px;fill:#787878}
  .iobio-gene .arrow{stroke:#969696;fill:none}
  .iobio-gene .iobio-axis line,.iobio-gene .iobio-axis path{fill:none;stroke:#d2d2d2;stroke-width:2px;shape-rendering:crispEdges}
  .iobio-gene .iobio-axis line{stroke-width:4px}
  .iobio-gene .iobio-axis text{font-size:11px;fill:#828282}
  .iobio-multi-line #back-ctrl:hover,.iobio-multi-line .button rect:hover{cursor:pointer}
  .iobio-multi-line .tick text{font-size:10px}.iobio-multi-line .button rect{height:20px}
  .iobio-multi-line .button text{font-size:10px;pointer-events:none}
  .iobio-multi-line #back-ctrl{font-size:15px;fill:#1E7DB3}
  path.link{fill:none;stroke:#ccc;stroke-width:1.5px}
  .above-variant{stroke:red;fill:none}
  .below-variant{stroke:#00f;fill:none}
  .reference{fill:gray}

  .samplingLoader {
    font-size:14px;
    color:#2687BE;
    position:absolute;
    width:100%;
    margin-top: 70px;
    margin-left:-6px;
    display:none;
  }
  .samplingLoader img {
    height:9px;
  }

  .chart-chooser {
    /*                font-size: 16px;*/
    color: rgb(180,180,180);
    font-weight: 400;
    /*                text-align: right;*/
  }

  .chart-chooser .selected {color:#2d8fc1; border-bottom: 1px solid #2d8fc1}
  .chart-chooser span { margin: 0px 5px 0px 5px; padding-bottom: 1px; cursor:pointer;}

  .checkbox {
    cursor:pointer;
    padding-left: 18px;
  }
  .checkbox:checked, .checkbox.checked .icons{
    color: #267FAD;
  }

  @-webkit-keyframes nprogress-spinner {
    0%   { -webkit-transform: rotate(0deg);   transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); transform: rotate(360deg); }
  }
  @-moz-keyframes nprogress-spinner {
    0%   { -moz-transform: rotate(0deg);   transform: rotate(0deg); }
    100% { -moz-transform: rotate(360deg); transform: rotate(360deg); }
  }
  @-o-keyframes nprogress-spinner {
    0%   { -o-transform: rotate(0deg);   transform: rotate(0deg); }
    100% { -o-transform: rotate(360deg); transform: rotate(360deg); }
  }
  @-ms-keyframes nprogress-spinner {
    0%   { -ms-transform: rotate(0deg);   transform: rotate(0deg); }
    100% { -ms-transform: rotate(360deg); transform: rotate(360deg); }
  }
  @keyframes nprogress-spinner {
    0%   { transform: rotate(0deg);   transform: rotate(0deg); }
    100% { transform: rotate(360deg); transform: rotate(360deg); }
  }

</style>

<template>
  <div class="$style.bootstrap-css">

      <!--
    <section id="top">

      <reads-sampled-box @sampleMore="sampleMore" :totalReads="totalReads"></reads-sampled-box>

    </section>
      -->

    <section id="middle">
      
      <div id="distributions" >

        <div id="read-coverage-distribution" class="distribution panel"
          v-tooltip.top-center="{content: clinTooltip.median_coverage.content, show: clinTooltip.median_coverage.show, trigger: 'manual'}">
          Read Coverage Distribution
          <div class="samplingLoader">Sampling <img src="../../../images/loading_dots.gif"/></div>
          <stacked-histogram :data="readCoverageData"
                             :y-tick-formatter="function(d) { return d*100 + '%'}"
                             :x-tick-formatter="function(d) { return d + 'X'}"
                             :tooltip-formatter="readCoverageTooltipFormatter"
                             x-axis-label="Read Coverage"
                             y-axis-label="% Total Reads">

          </stacked-histogram>
        </div>

      </div>
    </section>

  </div>
</template>

<script>

  import ReadsSampledBox from "../partials/ReadsSampledBox.vue";
  import HelpButton from "../partials/HelpButton.vue";
  import ReadCoverageBox from "../partials/ReadCoverageBox.vue";

  import PieChooserChart from "../viz/PieChooserChart.vue";

  import DonutChart from "../viz/DonutChart.vue";
  import PercentChartBox from "../partials/PercentChartBox.vue";
  import StackedHistogram from "../viz/StackedHistogram.vue";

  import Vue from 'vue';

  import { Bam } from '../../../js/bam.iobio.js/bam.iobio.js';

  export default {
    name: 'bam-view',

    components: {
      StackedHistogram,
      PercentChartBox,
      DonutChart,
      PieChooserChart,
      ReadCoverageBox,
      HelpButton,
      ReadsSampledBox
    },

    props: {
      selectedBamURL: '',
      selectedBaiURL: '',
      region: null,
      sampling: '',
      backendSource: String,
    },

    data() {
      return {
        showFullURL: false,

        // default sampling values
        binNumber: 20,
        binSize: 40000,
        sampleMultiplier: 1,
        sampleMultiplierLimit: 4,
        totalReads: 0,

        exomeSampling: false,
        draw: false,

        sampleStats: {},

        readDepthConversionRatio: 0,

        bam: {},
        bed: {},

        readDepthChartData: [],
        references: [],

        selectedSeqId: 'all',
        coverageBrushRange: {},

        // Percent Chart Data
        mappedReadsData: [],
        forwardStrandsData: [],
        properPairsData: [],
        singletonsData: [],
        bothMatesData: [],
        duplicatesData: [],

        // Histogram Chart Data
        readOutliers: false,
        readCoverageData: [],
        lengthData: [],
        qualityData: [],

        lengthXAxisLabel: 'Fragment Length',
        qualityXAxisLabel: 'Mapping Quality',

        clinIobioUrls: ["http://localhost:4030", "http://clin.iobio.io"],
        clinIobioUrl: null,

        clinTooltip: {
          genome_wide_coverage: {show: false, content: ''},
          median_coverage:      {show: false, content: ''},
          mapped_reads:         {show: false, content: ''},
          duplicate_rate:       {show: false, content: ''}
        },

        // this is used to achieve a "natural sort". see
        // https://stackoverflow.com/a/38641281/943814
        sorter: new Intl.Collator(undefined, {
          numeric: true,
          sensitivity: 'base'
        }),

        coverageMean: 0,
      }
    },

    methods: {

      goSampling: function (options) {
        // add default options
        options = $.extend({
          exomeSampling: this.exomeSampling, //'checked' == $("#depth-distribution input").attr("checked"),
          bed: this.bed,
          onEnd: function () {
            NProgress.done();
          }
        }, options);

        // turn on sampling message and off svg
        $("section#middle svg").css("display", "none");
        $(".iobio-bar-1.iobio-barViewer").css("display", "none");
        $(".samplingLoader").css("display", "block");

        this.totalReads = 0;

        NProgress.start();
        NProgress.set(0);

        // update selected stats
        this.bam.sampleStats(function (data, error) {
          // turn off sampling message
          $(".samplingLoader").css("display", "none");
          $(".iobio-bar-1").css("display", "block");
          $("section#middle svg").css("display", "block");

          if ( error!=undefined && error!='' ){
            alert(error);
            NProgress.done();
          } else {

            this.sampleStats = data;
            let freqs = 0;
            let coverageMean = 0;
            for (const coverage in data.coverage_hist) {
              const freq = data.coverage_hist[coverage];
              coverageMean += (coverage * freq);
            }
            this.coverageMean = Math.floor(coverageMean);

            // update progress bar
            if (options.start != null && options.end != null) {
              var length = options.end - options.start;
              var percentDone = Math.max(Math.round(((this.sampleStats.last_read_position - options.start) / length) * 100) / 100, 0);
            } else {
              var length = this.bam.header.sq.reduce(function (prev, curr) {
                if (prev) return prev;
                if (curr.name == options.sequenceNames[0]) return curr;
              }, false).end;
              var percentDone = Math.round((this.sampleStats.last_read_position / length) * 100) / 100;
            }

            if (NProgress.status < percentDone) NProgress.set(percentDone);

            // update charts
            this.updatePercentCharts();
            this.totalReads = this.sampleStats.total_reads;
            this.updateHistogramCharts(undefined, "sampleBar");
          }
        }.bind(this), options);
      },

      updatePercentCharts: function () {

        var unmappedReads, mappedReads;
        var stats = this.sampleStats;

        if (this.selectedSeqId == 'all') {
          if (this.bam.readDepth[Object.keys(this.bam.readDepth)[0]].depths.mapped != undefined) {
            mappedReads = unmappedReads = 0;
            for (var id  in this.bam.readDepth) {
              mappedReads += this.bam.readDepth[id].depths.mapped;
              unmappedReads += this.bam.readDepth[id].depths.unmapped;
            }
            unmappedReads = this.bam.n_no_coor;
          }
        } else {
          if (this.bam.readDepth[this.selectedSeqId] === undefined) {
            return;
          }
          mappedReads = this.bam.readDepth[this.selectedSeqId].depths.mapped;
          unmappedReads = this.bam.readDepth[this.selectedSeqId].depths.unmapped;
        }

        var showMappedDataFromIndex = false;
        // TODO: Deal with brush
        var brushRange = undefined;// window.readDepthChart.brush().extent();
        if ((brushRange == undefined || brushRange.toString() == '0,0') && mappedReads != undefined && unmappedReads != undefined) {
          showMappedDataFromIndex = true;
          d3.select("#mapped_reads").selectAll('path')
            .attr('fill', function (d, i) {
              return i == 0 ? 'rgb(9,176,135)' : 'rgba(9,176,135,0.5)'
            });
          d3.select('.percent .from-index').style('visibility', 'visible');
        } else {
          d3.select('.percent .from-index').style('visibility', 'hidden');
        }

        //update percent charts
        var keys = ['mapped_reads', "proper_pairs", "forward_strands", "singletons", "both_mates_mapped", "duplicates"]

        keys.forEach(function (key, i) {
          var stat = stats[key];
          if (key == 'mapped_reads' && showMappedDataFromIndex) {
            var data = [mappedReads, unmappedReads];
          } else {
            if (stats['total_reads'] == 0)
              var data = [0, 100];
            else
              var data = [stat, stats['total_reads'] - stat];
          }
          if (key == 'mapped_reads') {
            this.mappedReadsData = data;
          } else if (key == 'forward_strands') {
            this.forwardStrandsData = data;
          } else if (key == 'proper_pairs') {
            this.properPairsData = data;
          } else if (key == 'singletons') {
            this.singletonsData = data;
          } else if (key == 'both_mates_mapped') {
            this.bothMatesData = data;
          } else if (key == 'duplicates') {
            this.duplicatesData = data;
          }

        }.bind(this));
      },

      updateHistogramCharts: function (otherMinMax, klass) {
        var histograms = this.sampleStats;

        // check if coverage is zero
        if (Object.keys(histograms.coverage_hist).length == 0) histograms.coverage_hist[0] = '1.0';

        // update read coverage histogram
        var d = Object.keys(histograms.coverage_hist).filter(function (i) {
          return histograms.coverage_hist[i] != "0"
        }).map(function (k) {
          return [+k, +histograms.coverage_hist[k]]
        });
        this.readCoverageData = d;

        // update length histograms
        this.updateLengthHistograms();

        // update map quality distribution
        if ($("#mapping-quality-distribution .selected").attr("data-id") == "mapq_hist")
          var d = Object.keys(histograms.mapq_hist).map(function (k) {
            return [+k, +histograms.mapq_hist[k]]
          });
        else
          var d = Object.keys(histograms.baseq_hist).map(function (k) {
            return [+k, +histograms.baseq_hist[k]]
          });
        this.qualityData = d;
      },

      toggleChart: function (chartData) {
        var elem = event.target;

        if ($(elem).hasClass("selected")) return;

        // toggle selected
        var pair = [elem, $(elem).siblings()[0]];
        $(pair).toggleClass('selected');

        // redraw chart
        var dataId = elem.getAttribute("data-id");

        var h = this.sampleStats[dataId];
        var d = Object.keys(h).map(function (k) {
          return [+k, +h[k]]
        });
        var chartDiv = $(elem).parent().parent().parent();

        if (chartDiv.find(".selected").attr("data-id") == "frag_hist") {
          if (!this.readOutliers) d = iobio.viz.layout.outlier()(d);
        }

        var axisTitle = elem.getAttribute("x-axis-label");
        if ( chartData == 'lengthData') {
          this.lengthXAxisLabel = axisTitle;
        } else if ( chartData == 'qualityData'){
          this.qualityXAxisLabel = axisTitle;
        }

        this[chartData] = d;
      },

      updateLengthHistograms: function () {

        var histograms = this.sampleStats;

        if ($("#length-distribution .selected").attr("data-id") == "frag_hist")
          var d = Object.keys(histograms.frag_hist).filter(function (i) {
            return histograms.frag_hist[i] != "0"
          }).map(function (k) {
            return [+k, +histograms.frag_hist[k]]
          });
        else
          var d = Object.keys(histograms.length_hist).map(function (k) {
            return [+k, +histograms.length_hist[k]]
          });

        // remove outliers if outliers checkbox isn't explicity checked
        if (!this.readOutliers) d = iobio.viz.layout.outlier()(d);
        this.lengthData = d;

      },

      sampleMore: function () {
        if (this.sampleMultiplier >= this.sampleMultiplierLimit) {
          alert("You've reached the sampling limit");
          return;
        }
        this.sampleMultiplier += 1;
        var options = {
          sampling: this.sampling,
          sequenceNames: this.getSelectedSeqIds(),
          binNumber: this.binNumber + parseInt(this.binNumber / 4 * this.sampleMultiplier),
          binSize: this.binSize + parseInt(this.binSize / 4 * this.sampleMultiplier)
        }
        if ( this.coverageBrushRange && !(this.coverageBrushRange.start == 0 && this.coverageBrushRange.end == 0)){
          options.start = this.coverageBrushRange.start;
          options.end = this.coverageBrushRange.end;
        }
        this.goSampling(options);
      },

      getSelectedSeqIds: function () {
        if (this.selectedSeqId == 'all') {
          return Object.keys(this.bam.readDepth)
            .filter(function (key) {
              if (filterRef(key))
                return false
              if (this.bam.readDepth[key].depths.length > 0)
                return true
            }.bind(this))
        } else
          return [this.selectedSeqId];
      },

      seqSelected: function (event) {
        this.setSelectedSeq(event.target.value);
      },

      setSelectedSeq: function (selected, start, end) {
        this.selectedSeqId = selected;

        var seqDataIds = this.getSelectedSeqIds();

        $("#reference-select").val(this.selectedSeqId);

        // reset brush
        this.resetBrush();
        this.$emit('region-change', { chr: selected, start, end });

        // start sampling
        if (start != undefined && end != undefined) {
          this.goSampling({sampling: this.sampling, sequenceNames: seqDataIds, 'start': start, 'end': end});
          this.draw = false; // force re-draw so brush region is set correctly
          setTimeout(function () {
            this.setBrush(start, end)
            this.draw = true;
          }.bind(this), 200);
        } else {
          this.goSampling({sampling: this.sampling, sequenceNames: seqDataIds});
        }
      },

      removeBedFile: function () {
        $("#remove-bedfile-button").css('visibility', 'hidden');
        $("#default-bedfile-button").css('visibility', 'visible');
        $("#add-bedfile-button").css('visibility', 'visible');
        this.bed = undefined;
        this.goSampling({sampling: this.sampling, sequenceNames: this.getSelectedSeqIds()});
      },

      addDefaultBedFile: function () {
        // clear brush on read coverage chart
        this.resetBrush();

        // hide add bed / show remove bed buttons
        $("#add-bedfile-button").css('visibility', 'hidden');
        $("#default-bedfile-button").css('visibility', 'hidden');
        $("#remove-bedfile-button").css('visibility', 'visible');

        // turn on sampling message and off svg
        // turn it on here b\c the bed file is so big it takes a while to download
        $("section#middle svg").css("display", "none");
        $(".iobio-bar-1").css("display", "none");
        $(".samplingLoader").css("display", "block");

        fetch('/data/20130108.exome.targets.bed')
        .then(response => response.text())
        .then(bed => {
          const defaultBed = bed.replace(/chr/g, '');
          this.bed = defaultBed;
          this.goSampling({sampling: this.sampling, sequenceNames: this.getSelectedSeqIds()});
        });
      },

      openBedFile: function (file) {
        // clear brush on read coverage chart
        this.resetBrush();

        // hide add bed / show remove bed buttons
        $("#add-bedfile-button").css('visibility', 'hidden');
        $("#default-bedfile-button").css('visibility', 'hidden');
        $("#remove-bedfile-button").css('visibility', 'visible')

        // read bed file and store
        var reader = new FileReader();
        reader.onload = function (theFile) {
          this.bed = this.result;
          this.goSampling({sampling: this.sampling, sequenceNames: this.getSelectedSeqIds()});
        }.bind(this)
        reader.readAsText(file)
      },

      goBam: function (region) {
        $("#selectData").css("display", "none");
        $("#showData").css("visibility", "visible");

        let refIndex = 0;

        // get read depth
        this.bam.estimateBaiReadDepth((name, index, ref) => {
          },
          function doneCallback() {

          var start = region ? region.start : undefined;
          var end = region ? region.end : undefined;

          this.bam.getHeader().then(() => {
            // Set selected seq & region
            if (!region || (region && region.chr == 'all'))
              this.setSelectedSeq('all', start, end);
            else
              this.setSelectedSeq(region.chr, start, end);
          });

        }.bind(this),
        (err) => {
          this.$emit('error');
        })
      },

      sortReferenceSelect: function() {
        var options = $("#reference-select option").filter(function(_, o) { return o.value != 'all' }).detach();
        var values = options.map(function(_, o) { return o.value }).get();
        values.sort(this.sorter.compare);
        values.forEach(value=> {
          $('#reference-select')
            .append($("<option></option>")
              .attr("value", value)
              .text(value));
        })
      },

      setBrush: function (start, end) {
        this.coverageBrushRange.start = start; this.coverageBrushRange.end = end;
      },

      resetBrush: function () {
        this.setBrush(0, 0);
      },

      load: function() {
        this.bed = undefined;

        if ( this.selectedBamURL && this.selectedBamURL != '' ) {
          // Props should be set by query params
          this.bam = new Bam(this.backendSource, this.selectedBamURL, {
            bai: this.selectedBaiURL
          });

          this.goBam(this.region);
        }
      },

      readCoverageTooltipFormatter: function(d) {
        return d[0] + ',' + precisionRound(d[1]*100,2) + '%';
      },

      receiveClinMessage: function(event) {
        let self = this;
        // Do we trust the sender of this message?
        if (this.clinIobioUrls.indexOf(event.origin) == -1) {
          return;
        }
        this.clinIobioUrl = event.origin;

        var clinObject = JSON.parse(event.data);

        if (clinObject.type == 'show-tooltip') {
          self.clinTooltip[clinObject.task.key].show = true;
          self.clinTooltip[clinObject.task.key].content = clinObject.task.tooltip;
        } else if (clinObject.type == 'hide-tooltip') {
          self.clinTooltip[clinObject.task.key].show = false;
        }

      }
    },

    created: function () {
      this.load();
    },

    mounted: function() {
      let self = this;
      window.addEventListener("message", self.receiveClinMessage, false);
    },

    watch: {
      readOutliers: function() {
        this.updateLengthHistograms();
      },
    },
  }


  function precisionRound(number, precision) {
    var factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
  }

  const validRefs = {};
  for (let i = 1; i <= 22; i++) {
    validRefs[i] = true;
    validRefs['chr' + i] = true;
  }
  validRefs['X'] = true;
  validRefs['Y'] = true;

  function filterRef(ref) {
    return validRefs[ref] === undefined;
  }

</script>
