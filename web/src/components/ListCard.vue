<template>
    <m-card :icon="icon" :title="title">
        <div class="nav jc-between">
            <div class="nav-item" :class="{ active: active === index }" v-for="(category, index) in categories" :key="index">
                <div class="nav-link" @click="active = index">{{ category.name }}</div>
            </div>
        </div>
        <div class="p-t-2">
            <swiper>
                <swiper-slide v-for="(category, index) in categories" :key="index">
                    <slot name="items" :category="category"></slot>
                </swiper-slide>
            </swiper>
        </div>
    </m-card>
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
        categories: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            active: 0,
        };
    },
};
</script>

<style lang="" scoped></style>
