<template>
    <div>
        <div class="topbar bg-black p-y-2 p-x-3 d-flex ai-center">
            <img src="../assets/logo.png" alt="" height="30" />
            <div class="p-x-2 flex-1">
                <div class="text-white">王者荣耀</div>
                <div class="text-grey-1 fs-sm">团队成就更多</div>
            </div>
            <button type="button" class="btn bg-primary">立即下载</button>
        </div>
        <div class="bg-primary p-t-3 p-b-2">
            <div class="nav nav-inverse jc-around p-b-1">
                <div class="nav-item active">
                    <router-link class="nav-link" tag="div" to="/">首页</router-link>
                </div>
                <div class="nav-item">
                    <router-link class="nav-link" tag="div" to="/">攻略中心</router-link>
                </div>
                <div class="nav-item">
                    <router-link class="nav-link" tag="div" to="/">赛事中心</router-link>
                </div>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: "Main",
};
</script>

<style lang="scss" scoped>
.topbar{
    position: sticky;
    top:0;
    z-index: 999;
}
    
</style>
