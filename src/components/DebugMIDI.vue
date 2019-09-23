<template>
  <div class="debug">
    <div class="debug__title">MIDI LOG</div>
    <div class="debug__log">
      <textarea
        ref="log"
        :value="formattedLogData"
        name="debug"
        id="debug"
        cols="30"
        rows="9"
        placeholder="Press one key on your MIDI device repeatedly a few times..."
      ></textarea>
    </div>
    <div class="debug__buttons">
      <span>
        email me the log at:
        <a href="mailto:sparlingcreations@gmail.com">sparlingcreations@gmail.com</a>
      </span>
      <button @click="copyText">COPY LOG</button>
      <button @click="handleClose">CLOSE</button>
    </div>
  </div>
</template>

<script>
import DebugMessage from "../logic/DebugMessage";

export default {
  name: "DebugMIDI",
  data: () => ({
    access: null,
    logData: []
  }),
  computed: {
    formattedLogData() {
      let dataString = "";
      for (let message of this.logData) {
        dataString += message + "\n";
      }
      return dataString;
    }
  },
  methods: {
    handleClose() {
      this.$modal.hide("debug-midi");
    },
    copyText() {
      this.$refs.log.select();
      document.execCommand("copy");
      this.triggerContactToast();
    },
    createMidiIO() {
      navigator.requestMIDIAccess().then(access => {
        this.access = access;
        for (let input of access.inputs.values()) {
          input.onmidimessage = this.handleMidiMessage;
        }
      });
    },
    handleMidiMessage(message) {
      let messageObject = new DebugMessage(message);
      this.logData.push(messageObject.formattedString());
    },
    removeMidiIO() {
      for (let input of this.access.inputs.values()) {
        input.onmidimessage = () => {};
      }
      this.access.onstatechange = () => {};
    },
    triggerContactToast() {
      this.$toasted.show("Copied! Please email me with this log.", {
        duration: 3000,
        position: "top-center",
        action: [
          {
            text: "close",
            onClick: (e, toastObject) => {
              toastObject.goAway(0);
            }
          }
        ]
      });
    },
    openContactInfo() {
      window.open("http://sparlingcreations.com/contact");
    }
  },
  created() {
    this.createMidiIO();
  },
  beforeDestroy() {
    this.removeMidiIO();
  }
};
</script>

<style scoped lang='scss'>
.debug {
  padding: 20px;
  display: flex;
  flex-wrap: wrap;

  &__title {
    font-weight: 600;
    font-size: 20px;
    flex: 0 1 100%;
  }

  &__log {
    margin-top: 10px;
    flex: 0 1 100%;

    & textarea {
      width: calc(100% - 10px);
      padding: 5px;
      font-size: 14px;
      resize: none;
      overflow: scroll;
    }
  }

  &__buttons {
    flex: 0 1 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 10px;

    & span {
      flex: 0 1 50%;
    }
  }
}
</style>