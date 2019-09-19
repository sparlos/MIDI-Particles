<template>
  <div class="tooltip">
    current height: {{height}}
    current width: {{width}}%
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'ModeTooltip',
  computed: {
    ...mapState('keyboard', ['width', 'height'])
  },
  methods: {
    ...mapActions('keyboard', ['changeWidth', 'changeHeight']),
    setListeners() {
      document.addEventListener("keydown", this.setShortcuts);
    },
    setShortcuts(e) {
      switch (e.key) {
        case "ArrowLeft":
          this.changeKeyboardWidth(this.width-1);
          break;

        case "ArrowRight":
          this.changeKeyboardWidth(this.width+1);          
          break;

        case "ArrowUp":
          this.changeKeyboardHeight(this.height+1);          
          break;

        case "ArrowDown":
          this.changeKeyboardHeight(this.height-1);          
          break;
      
        default:
          break;
      }
    },
    changeKeyboardWidth(amount) {
      if(amount <= 0 || amount > 100) return;
      this.changeWidth({
        width: amount
      });
      
    },
    changeKeyboardHeight(amount) {
      if(amount <= 1 || amount >= 500) return;
      this.changeHeight({
        height: amount
      });
    }
  },
  mounted() {
    this.setListeners();
  },
  beforeDestroy() {
    document.removeEventListener("keydown", this.setShortcuts);
  }
}

</script>

<style scoped lang='scss'>
.tooltip {
  display: flex;
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 200px;
  background-color: red;
}
</style>