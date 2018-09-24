// extending Thomas Down's original BAM js work

var Bam = Class.extend({

   init: function(bamUri, options) {
      this.bamUri = bamUri;
      this.ssl = true;
      this.options = options; // *** add options mapper ***
      if (this.options && this.options.bai)
         this.baiUri = this.options.bai;

      // set iobio servers
      this.iobio = {}

      this.iobio.samtools       = "nv-prod.iobio.io/samtools/";
      this.iobio.od_samtools    = "nv-prod.iobio.io/od_samtools/";
      this.iobio.bamReadDepther = "nv-prod.iobio.io/bamreaddepther/";
      this.iobio.bamstatsAlive  = "nv-prod.iobio.io/bamstatsalive/";

      this.hadError = false;

      this._startFetchingHeader();

      return this;
   },

   _getBamCmd: function(regions) {
      var me = this;
      var regArr = regions.map(function(d) { return d.name+ ":"+ d.start + '-' + d.end;});
      var regStr = JSON.stringify(regions.map(function(d) { return {start:d.start,end:d.end,chr:d.name};}));

      var args,
      samtools_service;
      if (this.baiUri) {
        // explciity set bai url
        samtools_service = this.iobio.od_samtools;
        args = ['view', '-b', '"'+this.bamUri+'"', regArr.join(' '), '"'+this.baiUri+'"'];
      } else {
        samtools_service = this.iobio.samtools;
        args = ['view', '-b', '"'+this.bamUri+'"', regArr.join(' ')];
      }
      var cmd = new iobio.cmd(
            samtools_service,
            args,
            { ssl:this.ssl, 'urlparams': {'encoding':'binary'} }
          )

      cmd = cmd.pipe(
              this.iobio.bamstatsAlive,
              ['-u', '500', '-k', '1', '-r', regStr],
              { ssl:this.ssl}
              // { ssl:this.ssl, urlparams: {cache:'stats.json', partialCache:true}}
            );


      if (window.lastCmd) {
        window.lastCmd.closeClient();
      }
      window.lastCmd = cmd;
      return cmd;
   },

   _mapToBedCoordinates: function(regions, bed) {

      var bedRegions = [];
      var currRef;

      var me = this;

      var a,
          a_i;

      regions.forEach(function(reg){
        if (currRef != reg.name) {
          currRef = reg.name;
          a = me._bedToCoordinateArray(reg.name, bed);
          a_i = 0;
          if (a.length == 0) {
            alert("Bed file doesn't have coordinates for reference: " + reg.name + ". Ignoring it");
            return null;
          }
        }

         for (a_i; a_i < a.length; a_i++) {
            if (a[a_i].end > reg.end)
               break;

            if (a[a_i].start >= reg.start)
               bedRegions.push( {name:reg.name, start:a[a_i].start, end:a[a_i].end})
         }
      })
      return bedRegions
   },

   _bedToCoordinateArray: function(ref, bed) {
      var me = this;
      var a = [];
      bed.split("\n").forEach(function(line){
        if (line[0] == '#' || line == "") return;

        var fields = line.split("\t");
        if (me._referenceMatchesBed(ref, fields[0])) {
           a.push({ chr:ref, start:parseInt(fields[1]), end:parseInt(fields[2]) });
        }
      });
      return a;
   },

   _referenceMatchesBed: function(ref, bedRef) {
      if (ref == bedRef) {
        return true;
      }
      // Try stripping chr from reference names and then comparing
      ref1 = ref.replace(/^chr?/,'');
      bedRef1 = bedRef.replace(/^chr?/,'');

      return (ref1 == bedRef1);
   },


   // *** bamtools functionality ***

   estimateBaiReadDepth: function(refCallback, doneCallback, baiErrCb) {
      var me = this, readDepth = {};
      me.readDepth = {};
      var numRefSamples = 12;

      // This needs to be in a function like this in order to capture the
      // value of refId. Otherwise it was a race condition since read depth
      // data sometimes starts coming in before the header arrives. This is
      // especially true when handling local files.
      function submitRef(refId) {
        me.getHeader().then(() => {
          const sqIndex = parseInt(refId);
          if (sqIndex < me.header.sq.length && me.header.sq[sqIndex]) {
            const name = me.header.sq[sqIndex].name;
            const sqLength = me.header.sq[sqIndex].end;
            me.header.sq[sqIndex].hasRecords = true;

            if ( me.readDepth[ name ] == undefined){
              me.readDepth[ name ] = {
                depths: readDepth[refId],
                sqLength,
              }

              refCallback(name, sqIndex, me.readDepth[name]);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        })
      }

      let currentSequence;
      const indexUrl = this.baiUri || this.getIndexUrl(this.bamUri);
      var cmd = new iobio.cmd(this.iobio.bamReadDepther, [ '-i', '"' + indexUrl + '"'], {ssl:this.ssl,})

      cmd.on('error', (e) => {
        if (!this.hadError) {
          alert("Error accessing the BAM index file. Please provide an " +
                "index file URL or ensure that " +
                `${this.bamUri + '.bai'} exists`);
          baiErrCb(e);
        }
        console.log(e);
      });
      cmd.on('data', function(data, options) {

        data = data.split('\n');

        for (var i=0; i < data.length; i++)  {
           if ( data[i][0] == '#' ) {

              if (currentSequence) {
                submitRef(currentSequence); 
              }

              var fields = data[i].substr(1).split("\t");
              currentSequence = fields[0]
              readDepth[currentSequence] = [];
              if (fields[1]) {
                readDepth[currentSequence].mapped = +fields[1];
                readDepth[currentSequence].unmapped = +fields[2];
              }
           }
           else if (data[i][0] == '*') {
             me.n_no_coor = +data[i].split("\t")[2];
           }
           else {
              if (data[i] != "") {
                 var d = data[i].split("\t");
                 readDepth[currentSequence].push({ pos:parseInt(d[0]), depth:parseInt(d[1]) });
              }
           }
        }

      }.bind(me));
      cmd.on('end', function() {

        // Get some random reference read depth data
        var seq = Object.keys(me.readDepth);

        if ( seq != undefined && seq.length > 0 ) {
          for (var count = 0; count < numRefSamples; count++) {
            var randSeqInd = Math.floor(Math.random() * seq.length);
            var randSeq = seq[randSeqInd];
            var readDepthLength = me.readDepth[randSeq].depths.length;
            var randBinNumber = Math.floor(Math.random() * readDepthLength);
            randBinNumber = randBinNumber == 0 ? 1 : randBinNumber;
            me.getReferenceStats(randSeq, randBinNumber);
          }
        }

        doneCallback();
      }.bind(me));
      cmd.run();

   },

   getIndexUrl: function(alignmentUrl) {
    var supported_filetypes = {
      'bam' : 'bai',
      'cram' : 'crai'
    }
    var filetype = alignmentUrl.split('.').slice(-1);
    return alignmentUrl + "." + supported_filetypes[filetype];
   },

   _startFetchingHeader: function() {
     this._headerPromise = new Promise((resolve, reject) => {

       var me = this;
       var rawHeader = ""
       var cmd = new iobio.cmd(this.iobio.samtools,['view', '-H', '"' + this.bamUri + '"'], {ssl:this.ssl,})

       cmd.on('error', (error) => {
         // only show the alert on the first error
         if (!this.hadError) {
           this.hadError = true;
           alert("Error downloading file. Please check the URL.")
           reject(error);
         }
         console.log(error);
       })
       cmd.on('data', function(data, options) {
          rawHeader += data;
       });
       cmd.on('end', function() {
          me.setHeader(rawHeader);
          resolve(me.header);
       });

       cmd.run();

       // need to make this work for URL bams
       // need to incorporate real promise framework throughout
     });
   },

   getHeader: function() {
     return this._headerPromise; 
   },

   setHeader: function(headerStr) {
      var header = { sq:[], toStr : headerStr };
      var lines = headerStr.split("\n");
      for ( var i=0; i<lines.length > 0; i++) {
         var fields = lines[i].split("\t");
         if (fields[0] == "@SQ") {
            var fHash = {};
            fields.forEach(function(field) {
              var values = field.split(':');
              fHash[ values[0] ] = values[1]
            })
            header.sq.push({
              name:fHash["SN"],
              end:1+parseInt(fHash["LN"]),
              hasRecords: false,
            });
         }
      }
      this.header = header;
   },

   sampleStats: function(callback, options) {
      var binSize = 10000;
      var binNumber = 20;
      if (options.sampling == 'low') {
        binSize = 5000;
        binNumber = 20;
      }
      if (options.sampling == 'verylow') {
        binSize = 2500;
        binNumber = 10;
      }
      // Prints some basic statistics from sampled input BAM file(s)
      options = $.extend({
         'binSize' : binSize, // defaults
         'binNumber' : binNumber,
         start : 1,
      },options);
      var me = this;

      function goSampling(SQs) {
        if (SQs.length == 0) {
          callback(undefined, "Make sure index file exists and is valid.")
        } else {
          var regions = [];
          var bedRegions;
          //for (var j=0; j < SQs.length; j++) {
          var sqStart = options.start;
          var length = SQs.length == 1 ? SQs[0].end - sqStart : null;
          if (length && length < options.binSize * options.binNumber) {
            SQs[0].start = sqStart;
            regions.push(SQs[0])
          } else {
            // create random reference coordinates
            var regions = [];
            for (var i = 0; i < options.binNumber; i++) {
              var seq = SQs[Math.floor(Math.random() * SQs.length)]; // randomly grab one seq
              length = seq.end - sqStart;
              var s = sqStart + parseInt(Math.random() * length);
              regions.push({
                'name': seq.name,
                'start': s,
                'end': s + options.binSize
              });
            }
            // sort by start value
            regions = regions.sort(function (a, b) {
              if (a.name == b.name)
                return ((a.start < b.start) ? -1 : ((a.start > b.start) ? 1 : 0));
              else
                return ((a.name < b.name) ? -1 : ((a.name > b.name) ? 1 : 0));
            });

            // map random region coordinates to bed coordinates
            if (options.bed != undefined)
              bedRegions = me._mapToBedCoordinates(regions, options.bed)
          }

          var r = bedRegions || regions;
          var cmd = me._getBamCmd(r)
          var buffer = "";

          cmd.on('error', function (err) {
            console.log(err);
          })


          cmd.on('queue', function (q) {
            console.log('queue = ' + q);
          })

          cmd.on('data', function (datas, options) {
            datas.split(';').forEach(function (data) {
              if (data == undefined || data == "\n") return;
              var success = true;
              try {
                var obj = JSON.parse(buffer + data)
              } catch (e) {
                success = false;
                buffer += data;
              }
              if (success) {
                buffer = "";
                callback(obj);
              }
            });
          });

          cmd.on('end', function () {
            if (options.onEnd != undefined)
              options.onEnd();
          });

          cmd.on('exit', function (code) {
          })

          cmd.run();

        }
      }

      if ( options.sequenceNames != undefined && options.sequenceNames.length == 1 && options.end != undefined) {
         goSampling([{name:options.sequenceNames[0], end:options.end}]);
      } else  if (options.sequenceNames != undefined){
         this.getHeader().then(function(header){
            var seqs = options.sequenceNames.map(function(sq) {
              return header.sq.find( function(d) { return (d.name == sq) })
            })

            goSampling( seqs );
         });
      } else {
         this.getHeader().then(function(header){
            goSampling(header.sq);
         });
      }
   },


  getReferenceStats: function(chr, binNumber) {
    var me = this;
    var binSize = 16384;

    var r =  {
      'name': chr,
      'start': binNumber + binNumber * binSize,
      'end': (binNumber + binNumber * binSize) + binSize
    };

    if(!me.referenceDepthData) me.referenceDepthData = [];

    var refDepthObject = {};
    refDepthObject.chr = chr;
    refDepthObject.binNumber = binNumber;

    var refDepthData = "";

    var cmd; //samtools depth -a -r [region] [bamfile]

    cmd = new iobio.cmd(this.iobio.samtools,
      ['depth', '-a', '-r', r.name + ":"+ r.start + '-' + r.end, '"' + this.bamUri + '"'],
      {ssl:this.ssl,});

    cmd.on('error', function(error) {
      console.log(error);
    })
    cmd.on('data', function(data, options) {
      refDepthData += data;
    });
    cmd.on('end', function() {
      if ( refDepthData != "" ) {
        var depthData = [];
        refDepthData.split('\n').forEach(function (line) {
          depthData.push(line.split('\t')[2]);
        });
        refDepthObject.data = refDepthData;
        refDepthObject.averageDepth = d3.mean(depthData);
        me.referenceDepthData.push(refDepthObject);
      }
    });

    cmd.run();

  },

});
