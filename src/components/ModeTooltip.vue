<template>
  <div class="tooltip">
    <div class="tooltip__title">Transform Mode Enabled!</div>
    <div class="tooltip__line">
      <strong>
        Left/right arrow keys
      </strong>
      - decrease/increase keyboard width
    </div>
    <div class="tooltip__line">
      <strong>
        Down/up arrow keys
      </strong>
      - decrease/increase keyboard height
    </div>
    <div class="tooltip__line tooltip__line--leave">
      Press {{transformMode}} to leave transform mode.
    </div>
    <div class="tooltip__line tooltip__line--info">
      current height: {{height}}px
    </div>
    <div class="tooltip__line tooltip__line--info">
      current width: {{width}}%
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "ModeTooltip",
  computed: {
    ...mapState("keyboard", ["width", "height"]),
    ...mapState("shortcuts", ["transformMode"])
  },
  methods: {
    ...mapActions("keyboard", ["changeWidth", "changeHeight", "setState"]),
    setListeners() {
      document.addEventListener("keydown", this.setShortcuts);
    },
    setShortcuts(e) {
      switch (e.key) {
        case "ArrowLeft":
          this.changeKeyboardWidth(this.width - 1);
          break;

        case "ArrowRight":
          this.changeKeyboardWidth(this.width + 1);
          break;

        case "ArrowUp":
          this.changeKeyboardHeight(this.height + 1);
          break;

        case "ArrowDown":
          this.changeKeyboardHeight(this.height - 1);
          break;

        default:
          break;
      }
    },
    changeKeyboardWidth(amount) {
      if (amount <= 0 || amount > 100) return;
      this.$emit("resize");
      this.changeWidth({
        width: amount
      });
    },
    changeKeyboardHeight(amount) {
      if (amount <= 1 || amount >= 500) return;
      this.$emit("resize");
      this.changeHeight({
        height: amount
      });
    }
  },
  mounted() {
    this.setListeners();
    this.setState({
      disabled: true
    });
  },
  beforeDestroy() {
    document.removeEventListener("keydown", this.setShortcuts);
    this.$emit("onLoad");
    this.setState({
      disabled: false
    });
  }
};
</script>

<style scoped lang='scss'>
$background-color: rgb(47,47,47);
$radius: 3px;
$color-highlight: #a1c2fa;

.tooltip {
  display: flex;
  flex-wrap: wrap;
  position: absolute;
  top: 30px;
  right: 30px;
  width: 400px;
  border-radius: $radius;
  background-color: $background-color;
  color: white;
  font-size: 16px;
  padding: 25px;
  box-sizing: border-box;
  line-height: 25px;

  &__title {
    flex: 0 1 100%;
    font-size: 22px;
    color: $color-highlight;
    margin-bottom: 10px;
  }

  &__line {
    flex: 0 1 100%;
    margin-top: 10px;

    &--leave {
      color: $color-highlight;
      font-weight: bold;
    }

    &--info {
      margin-top: 20px;
      font-weight: bold;
      font-size: 14px;
      flex: 0 1 50%;
    }
  }
}
</style>