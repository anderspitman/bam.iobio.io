<style type="text/css">

  .file-select-button-bar {
    width: 100%;
  }

  .button-column {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .file-button {
    border: none;
    border-radius: 4px;
    width: 315px;
    background: #2d8fc1;
    margin-top: 2rem;
    padding: 1rem 2rem;
    color: #fff;
    font-size:24px;
    cursor: pointer;
    font-weight: 300;
    text-align: center;
  }
  .file-input {
    visibility: hidden;
  }

  .arrow_box {
    margin-top:20px;
    width:500px;
    position: relative;
    background: #ffffff;
    border: 2px solid #2d8fc1;
    border-radius: 4px;
  }
  .arrow_box:after, .arrow_box:before {
    bottom: 100%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }
  .arrow_box:after {
    border-color: rgba(255, 255, 255, 0);
    border-bottom-color: #ffffff;
    border-width: 20px;
    left: 50%;
    margin-left: -20px;
  }
  .arrow_box:before {
    border-color: rgba(45, 143, 193, 0);
    border-bottom-color: #2d8fc1;
    border-width: 23px;
    left: 50%;
    margin-left: -23px;
  }
  .arrow_box input {
    width: 412px;
    margin: 8px;
    color: #2d8fc1;
    font: 300 22px quicksand;
  }
  .arrow_box button { font:300 28px quicksand;}

</style>

<template>
  <div class='file-select-button-bar'>
    <div class='button-column'>
      <button class="file-button" @click="launchDemoData" >launch with demo data</button>
      <div class="file" @click="showUrl=false">
        <input type="file" name="files[]" id="file"  multiple @change="processBamFile" />
        <label class="file-button" for="file" >local bam/cram file</label>
      </div>
      <button class="file-button" @click="displayBamUrlBox()">remote bam/cram url</button>
      <div v-if="showUrl" id='bam-url' class="arrow_box">
        <input id="url-input" placeholder="BAM/CRAM URL" v-model="selectedBamURL"></input>
        <input id="bai-url-input" placeholder="BAI/CRAI URL (optional)" v-model="selectedBaiURL"></input>
        <button id="bam-url-go-button" @click="openBamURL">Go</button>
      </div>
      <button class="file-button" @click="displayGemDriveBox()">load from GemDrive</button>
      <div v-if="showGemDriveBox" class="arrow_box">
        <input id="gemdrive-input" placeholder="GemDrive address" v-model="gemDriveUri"></input>
        <button id="gemdrive-go-button" @click="launchGemDrive()">Go</button>
      </div>
    </div>
  </div>
</template>

<script>

import { createHoster } from 'fibridge-host';

export default {
  name: 'file-select-button-bar',
  data() {
    return {
      selectedBamURL: '',
      selectedBaiURL: '',
      gemDriveUri: localStorage.getItem('gemDriveUri'),
      showUrl: false,
      showGemDriveBox: false,
      demoFileURL: 'http://s3.amazonaws.com/iobio/NA12878/NA12878.autsome.bam',
    }
  },
  methods: {

    displayBamUrlBox: function() {
      this.showGemDriveBox = false;
      this.showUrl = true;
    },

    displayGemDriveBox: function() {
      this.showUrl = false;
      this.showGemDriveBox = true;
    },

    launchDemoData : function () {
      this.$router.push({
        name: 'alignment-page',
        query: Object.assign({
          bam: this.demoFileURL
        }, this.$route.query),
      });
    },

    launchGemDrive: function() {
      if (this.gemDriveUri.length === 0) {
        alert('Please enter a valid GemDrive address');
        return;
      }

      localStorage.setItem('gemDriveUri', this.gemDriveUri);

      const driveUri = this.gemDriveUri.startsWith('http') ? this.gemDriveUri : 'https://' + this.gemDriveUri;
      window.remfsAuthClient.authorize({
        driveUri,
        redirectUri: window.location.origin + '/',
        perms: [
          {
            type: 'file',
            perm: 'read',
            //path: '/genome/small.bam',
            hint: "BAM file",
          },
          {
            type: 'file',
            perm: 'read',
            //path: '/genome/small.bam.bai',
            hint: "BAM index file (*.bai)",
          },
        ],
        state: driveUri,
      });
    },

    openBamURL : function() {
      if (!validURL(this.selectedBamURL)) {
        alert('Please enter a valid bam/cram url, including http:// or https:// in front');
        return;
      }
      this.$router.push({
        name: 'alignment-page',
        query: Object.assign({
          bam: this.selectedBamURL,
          bai: this.selectedBaiURL,
          // NOTE: This is an ugly hack to force a re-route in Vue. If only the
          // params change, re-route doesn't happen, so we have to manually
          // ensure the query changes.
          forceRoute: true,
        }, this.$route.query),
      });
    },

    processBamFile: function(event){
      let self = this;

      if (event.target.files.length != 2) {
        alert('Must select both a .bam and .bai file.');
        // return;
      }

      const file0 = event.target.files[0];
      const file1 = event.target.files[1];

      let bamFile;
      let baiFile;

      if (validBam(file0.name) && validIndex(file1.name)) {
        bamFile = file0;
        baiFile = file1;
      } else if (validBam(file1.name) && validIndex(file0.name)) {
        bamFile = file1;
        baiFile = file0;
      } else {
        alert('Must select both a .bam/.cram and .bai/.crai file.');
        return;
      }

      const proxyAddress = 'lf-proxy.iobio.io';
      const port = 443;
      const secure = true;

      const protocol = secure ? 'https:' : 'http:';

      // TODO: shouldn't this be going out of scope and eventually garbage
      // collected, which could lead to race conditions?
      createHoster({ proxyAddress, port, secure }).then((hoster) => {

        const bamPath = '/' + bamFile.name;
        hoster.hostFile({ path: bamPath, file: bamFile });
        const baiPath = '/' + baiFile.name;
        hoster.hostFile({ path: baiPath, file: baiFile });

        const portStr = hoster.getPortStr();
        const baseUrl = `${protocol}//${proxyAddress}${portStr}`;
        this.selectedBamURL = `${baseUrl}${hoster.getHostedPath(bamPath)}`;
        this.selectedBaiURL = `${baseUrl}${hoster.getHostedPath(baiPath)}`;

        self.$router.push({
          name: 'alignment-page',
          params: {
            bam: this.selectedBamURL,
            bai: this.selectedBaiURL,
          },
        });
      });
    }
  }
}

function validBam(filename) {
  const extension = /[^.]+$/.exec(filename)[0];
  return extension === 'bam' || extension === 'cram';
}

function validIndex(filename) {
  const extension = /[^.]+$/.exec(filename)[0];
  return extension === 'bai' || extension === 'crai';
}

// TODO: If we want to get serious about validating URLS we should probably use
// a library. It's notoriously difficult to get right. This just
// verifies the string has the necessary bits so our UI doesn't choke.
function validURL(url) {
  const regex = /(http|https):\/\/.+\/.+/;
  return regex.test(url);
}


</script>
