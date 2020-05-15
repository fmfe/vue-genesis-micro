<template>
    <div>
        <p v-if="$route.query.tab !== 'new'">我是首页</p>
        <p v-else>首页最新内容</p>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: 'home'
})
</script>