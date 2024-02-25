import request from '@/utils/request'

export const getPostList = (data) => {
  return request({
    url: '/rest/post',
    params: data
  })
}
