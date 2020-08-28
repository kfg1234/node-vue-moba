<template>
    <div class="card bg-white p-3 m-t-3">
        <div class="card-header d-flex ai-center p-b-3">
            <i class="fs-md iconfont" :class="'icon-' + icon"></i>
            <div class="fs-xl flex-1 p-x-2">{{ title }}</div>
            <i class="iconfont icon-menu"></i>
        </div>
        <div class="card-body p-t-3">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "",
    props: {
        title: {
            type: String,
            required: true,
        },
        icon: {
            type: String,
            required: true,
        },
    },
    data() {
        return {};
    },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables.scss";
.card {
    .card-header {
        border-bottom: 1px solid $border-color;
    }
}
</style>
