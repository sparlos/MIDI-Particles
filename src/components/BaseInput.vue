<template>
  <div class="input">
    <div class="input__text">
      <div class="input__title">{{title}}</div>
      <div class="input__subtitle">{{subtitle}}</div>
    </div>
    <div class="input__form">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseInput",
  props: {
    title: String,
    subtitle: String
  }
};
</script>

<style scoped lang='scss'>
.input {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  flex: 0 1 100%;
  margin: 10px 0;

  &:nth-child(1) {
    margin-top: 0;
  }

  &__text {
    width: 300px;
  }

  &__title {
    font-size: 22px;
  }

  &__subtitle {
    font-size: 16px;
    margin-top: 5px;
    color: rgba(0, 0, 0, 0.5);
  }

  &__form {
    margin-left: 80px;
  }
}
</style>