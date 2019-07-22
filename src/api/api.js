import {
  get,
  post
} from '@/api/http'

//学校库  学校列表
export const getSchoolLibrary = p => get('/new/school/list.do', p)
//学校库  添加列表
export const getSchoolAdd = p => post('/new/school/insert.do', p)
//学校库 详情
export const getDetails = p => get('/new/school/detail.do', p)
