import {
  get,
  post
} from '@/api/http'

//商城 发票管理  /Invoice/del.do
export const getInvoiceDel = p => get('/Invoice/del.do', p)
//学校库  学校列表
export const getSchoolLibrary = p => get('/new/school/list.do', p)
// //学校库  添加列表
// export const getSchoolAdd = p => post('/new/school/insert.do', p)


//学校库 添加学校
export const getSchoolAdd = p => post('/manager/new/school/insert.do', p)
//学校库  详情
export const getDetails = p => get('/new/school/detail.do', p)
//学校库  编辑
export const getSchoolUpdate = p => post('/manager/new/school/update.do', p)
//添加学校列表  学校名去重
export const getSchoolCheck = p => get('/school/check_valid.do', p)
//学校库 删除
export const getSchoolDelete = p => get('/manager/new/school/delete.do', p)
//学校库 申请访校接口
export const getApplySchool = p => get('/visit/manager/school/list.do', p)
//学校库  图片logo上传
export const getupolad = p => post('/new/school/upload_logo.do', p)


//活动管理 活动列表 活动类型
export const getvislist = p => post('/activity/vis_list.do', p)
//活动管理 vis 已交费
export const getvisorder = p => post('/activity/vis_orderList.do', p)
//活动管理 展商列表
export const getExhibitorList = p => post('/manager/exhibitor/list.do', p)
//活动管理 展商详情
export const getExhibitorDetail = p => post('/manager/exhibitor/detail.do', p)
