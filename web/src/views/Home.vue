<template>
    <div class="home">
        <swiper ref="mySwiper" :options="swiperOptions">
            <swiper-slide><img class="w-100" src="../assets/images/f6f003b0972e00469ed2345f3b49d10b.jpeg" alt=""/></swiper-slide>
            <swiper-slide><img class="w-100" src="../assets/images/b4906f97448327141e2c75ed5bad39da.jpeg" alt=""/></swiper-slide>
            <swiper-slide><img class="w-100" src="../assets/images/922fe009ec9e234dae40efe6f10cd83b.jpeg" alt=""/></swiper-slide>
            <div class="pagination-home" slot="pagination"></div>
        </swiper>
        <div class="nav-icons bg-white m-t-3 text-center p-t-4">
            <div class="d-flex flex-wrap ">
                <div class="nav-item m-b-4" v-for="n in 10" :key="n">
                    <i class="sprite sprite-news m-b-1"></i>
                    <div class="fs-sm text-grey">爆料站</div>
                </div>
            </div>
            <div class="bg-light p-y-2 fs-sm">
                <i class="sprite sprite-arrow m-r-2"></i>
                <span>收起</span>
            </div>
        </div>

        <m-list-card icon="Menu" title="新闻资讯" :categories="newsCats">
            <template v-slot:items="{ category }">
                <div class="p-y-2" v-for="(item, index) in category.newsList" :key="index">
                    <span>[{{item.categoryName}}]</span>
                    <span>{{item.title}}</span>
                    <span>{{item.date}}</span>
                </div>
            </template>
        </m-list-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            swiperOptions: {
                pagination: {
                    el: ".pagination-home",
                },
            },
            newsCats: [
                {
                    name: "热门",
                    newsList: new Array(5).fill({}).map(() => ({
                        categoryName: "新闻资讯",
                        title: "8月26日七夕“为爱向前冲”活动维护完成公告",
                        date: "08/27",
                    })),
                },
                {
                    name: "公告",
                    newsList: new Array(5).fill({}).map(() => ({
                        categoryName: "新闻资讯",
                        title: "8月26日七夕“为爱向前冲”活动维护完成公告",
                        date: "08/27",
                    })),
                },
                {
                    name: "热门",
                    newsList: new Array(5).fill({}).map(() => ({
                        categoryName: "新闻资讯",
                        title: "8月26日七夕“为爱向前冲”活动维护完成公告",
                        date: "08/27",
                    })),
                },
                {
                    name: "热门",
                    newsList: new Array(5).fill({}).map(() => ({
                        categoryName: "新闻资讯",
                        title: "8月26日七夕“为爱向前冲”活动维护完成公告",
                        date: "08/27",
                    })),
                },
                {
                    name: "热门",
                    newsList: new Array(5).fill({}).map(() => ({
                        categoryName: "新闻资讯",
                        title: "8月26日七夕“为爱向前冲”活动维护完成公告",
                        date: "08/27",
                    })),
                },
            ],
        };
    },
};
</script>

<style lang="scss">
@import "../assets/scss/_variables.scss";
.nav-icons {
    // border-top: 1px solid $border-color;
    // border-bottom: 1px solid $border-color;
    .nav-item {
        width: 25%;
        border-right: 1px solid $border-color;
        &:nth-child(4n) {
            border: none;
        }
    }
}
</style>
