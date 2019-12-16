import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import websiteIndex from '@/pages/website/index'
import createNews from '@/pages/website/createNews'
import activity from '@/pages/website/activity'
import banner from '@/pages/website/banner'
import home from '@/pages/home/home'
import distributionIndex from '@/pages/distribution/index'
import distributionBill from '@/pages/distribution/bill'
import Login from '@/pages/login'
import advert from '@/pages/website/advert'
import eventActivity from '@/pages/website/eventActivity'
import datum from '@/pages/website/datum'
import member from '@/pages/website/member'
import visAct from '@/pages/website/visAct'
import goods from '@/pages/mall/goods'
import createGoods from '@/pages/mall/createGoods.vue'
import bill from '@/pages/mall/bill.vue'
import mallAdvert from '@/pages/mall/goodsIndex.vue'
import invoice from '@/pages/mall/invoice.vue'
import invoiceAdd from '@/pages/mall/invoiceAdd.vue'
import caiwu from '@/pages/distribution/caiwu.vue'
import billBanner from '@/pages/mall/banner.vue'

import sikuschoolList from '@/pages/siku/schoolExamine/schoolList.vue'
import schoolAdd from '@/pages/siku/schoolExamine/schoolAdd.vue'
import schoolAlter from '@/pages/siku/schoolExamine/schoolAlter.vue'
import schoolManage from '@/pages/siku/schoolExamine/schoolManage.vue'
import lianxi from '@/pages/siku/lianxi.vue'
import sikuEliteList from '@/pages/siku/sikuEliteExamine/sikuEliteList.vue'
import sikuEliteManage from '@/pages/siku/sikuEliteExamine/sikuEliteManage.vue'
import sikuEliteDetail from '@/pages/siku/sikuEliteExamine/sikuEliteDetail.vue'
import sikuCompanyList from '@/pages/siku/sikuCompanyExamine/sikuCompanyList.vue'
import ApplySchool from '@/pages/siku/ApplySchool.vue'

import educationUserList from '@/pages/education/educationUserList.vue'

import visList from '@/pages/vis/visList.vue'
import visPaid from '@/pages/vis/visPaid.vue'
import ExhibitionList from '@/pages/vis/ExhibitionList.vue'
import ExhibitionDetails from '@/pages/vis/ExhibitionDetails.vue'
import ExhibitionAdd from '@/pages/vis/ExhibitionAdd.vue'
import GiveTicketList from '@/pages/vis/GiveTicketList.vue'
import OfflinePayment from '@/pages/vis/OfflinePayment.vue'
import prizeDrawAdd from '@/pages/vis/prizeDrawAdd.vue'
import prizeDrawList from '@/pages/vis/prizeDrawList.vue'
import TestInterface from '@/pages/other/TestInterface.vue'
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'websiteIndex',
      component: index,
      children: [{
	　　　　  path: '/',
	 　　　   component: home
	　　  },{
	　　　　  path: '/home',
	 　　　   component: home
	　　  },{
	　　　　 path: '/website',
	 　　　  component: websiteIndex,
	　　  },{
	　　　　 path: '/website/index',
	 　　　  component: websiteIndex
	　　  },{
	　　　　 path: '/website/createnews',
	 　　　  component: createNews
	　　  },{
	　　　　 path: '/website/activity',
	 　　　  component: activity
	　　  },{
	　　　　path: '/website/banner',
	 　　　 component: banner
	　　  },{
	　　　　path: '/website/eventActivity',
	 　　　 component: eventActivity
	　　  },{
	　　　　path: '/website/advert',
	 　　　 component: advert
	　　  },{
	　　　　path: '/website/member',
	 　　　 component: member
	　　  },{
	　　　　path: '/website/datum',
	 　　　 component: datum
	　　  },{
	　　　　path: '/distribution/bill',
	 　　　 component: distributionBill,
	　　  },{
	　　　　path: '/distribution/index',
	 　　　 component: distributionIndex,
	　　  },{
			    path: '/website/visAct',
	 　　　  component: visAct,
		    },{
			    path: '/mall/goods',
	 　　　 component: goods,
		    },{
			    path: '/mall/creategoods/:id',
	 　　　  component: createGoods,
		    },{
			    path: '/mall/bill',
	 　　　  component: bill,
		    },{
			    path: '/mall/advert',
          component: mallAdvert,
		    },{
		    	path: '/mall/invoice',
	 　　　 component: invoice,
        }, {
          path: '/mall/invoiceAdd',
          component: invoiceAdd,
        },{
			    path: '/mall/banner',
	 　　　 component: billBanner,
		    },{
		   	  path: '/distribution/caiwu',
	 　　　 component: caiwu,
		    }, {
		      path: '/siku/schoolList',
		      component: sikuschoolList,
		    }, {
		      path: '/siku/schoolManage',
		      component: schoolManage,
		    }, {
		      path: '/siku/schooAdd',
			  component: schoolAdd,
			//   name:"schoolAdd"
		    }, {
		      path: '/siku/lianxi',
		      component: lianxi,
		      //   name:"lianxi"
		    }, {
		      path: '/siku/sikuEliteList',
		      component: sikuEliteList,
		      //   name:"sikuEliteList"
		    }, {
		      path: '/siku/sikuEliteManage',
		      component: sikuEliteManage,
		      //   name:"sikuEliteList"
		    }, {
		      path: '/siku/sikuEliteDetail',
		      component: sikuEliteDetail,
		    }, {
		      path: '/siku/sikuCompanyList',
		      component: sikuCompanyList,
		    }, {
		      path: '/siku/schoolAlter',
		      component: schoolAlter,
		    }, {
		      path: '/siku/ApplySchool',
		      component: ApplySchool,
		    }, {
		      path: '/vis/visList',
		      component: visList,
		      //   name:"visList"
		    }, {
		      path: '/vis/visPaid',
		      component: visPaid,
		      //   name:"visPaid"
        }, {
          path: '/vis/ExhibitionList',
          component:ExhibitionList,
        }, {
          path: '/vis/ExhibitionDetails',
          component: ExhibitionDetails,
          //   name:"visPaid"
        }, {
          path: '/vis/ExhibitionAdd',
          component: ExhibitionAdd,
          //   name:"visPaid"
        }, {
          path: '/vis/GiveTicketList',
          component: GiveTicketList
        }, {
          path: '/vis/OfflinePayment',
          component: OfflinePayment
        }, {
          path: '/vis/prizeDrawAdd',
          component: prizeDrawAdd
        }, {
          path: '/vis/prizeDrawList',
          component: prizeDrawList
        }, {
          path: '/education/educationUserList',
          component: educationUserList
        }, {
          path: '/Other/TestInterface',
          component: TestInterface
        }
	　 ]
    },
    {
    	path: '/login',
	    name: 'Login',
	    component: Login,
    }
  ]
})
