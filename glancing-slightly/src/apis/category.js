import request from '@/utils/request'

export const getCategory = () => {
  return request({
    url: '/rest/categories'
  })
}
