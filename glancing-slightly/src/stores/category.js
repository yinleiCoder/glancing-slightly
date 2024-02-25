import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { ALL_CATEGORY_ITEM } from '@/constants'
import { getCategory } from '@/apis/category'

export const useCategoryStore = defineStore('category', () => {
  const categories = ref([ALL_CATEGORY_ITEM])

  function setCategories(newCategories) {
    categories.value = [ALL_CATEGORY_ITEM, ...newCategories]
  }

  async function getCategories() {
    const data = await getCategory()
    setCategories(data)
  }

  return { categories, getCategories }
})
