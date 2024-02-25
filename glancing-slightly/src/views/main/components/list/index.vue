<script setup>
import { ref } from 'vue'
import { getPostList } from '@/apis/post'
import item from './item.vue';

let query = {
  page: 1,
  size: 10
}

const postsList = ref([])

const getPostsData = async () => {
  const res = await getPostList(query)
  postsList.value = res.list
}

getPostsData()
</script>

<template>
  <div>
    <item v-for="postItem in postsList" :data="postItem" :key="item._id"></item>
  </div>
</template>
