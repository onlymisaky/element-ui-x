<template>
  <el-button
    class="elx-button"
    v-on="$listeners"
    v-bind="$attrs">
    <slot />
  </el-button>
</template>

<script>
export default {
  name: 'ElxButton',
};
</script>

<style lang="scss" scoped>
.elx-button {
  color: #409eff;
}
</style>
