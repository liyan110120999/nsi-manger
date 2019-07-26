import {
  get,
  post
} from '@/api/http'

//学校库  学校列表
export const getSchoolLibrary = p => get('/new/school/list.do', p)
//学校库  添加列表
export const getSchoolAdd = p => post('/new/school/insert.do', p)
//学校库  详情
export const getDetails = p => get('/new/school/detail.do', p)
//学校库  编辑
export const getSchoolUpdate = p => post('/manager/new/school/update.do', p)
//学校库 删除
export const getSchoolDelete = p => get('/manager/new/school/delete.do', p)
//活动管理 活动列表
export const getvislist = p => post('/activity/vis_list.do', p)
