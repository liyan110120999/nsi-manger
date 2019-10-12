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
import caiwu from '@/pages/distribution/caiwu.vue'
import billBanner from '@/pages/mall/banner.vue'
import sikuschool from '@/pages/siku/school.vue'
import schoolAdd from '@/pages/siku/schoolAdd.vue'
import lianxi from '@/pages/siku/lianxi.vue'
import lianxitwo from '@/pages/siku/lianxitwo.vue'
import visList from '@/pages/vis/visList.vue'
import schoolAlter from '@/pages/siku/schoolAlter.vue'
import ApplySchool from '@/pages/siku/ApplySchool.vue'
import visPaid from '@/pages/vis/visPaid.vue'
import ExhibitionList from '@/pages/vis/ExhibitionList.vue'
import ExhibitionDetails from '@/pages/vis/ExhibitionDetails.vue'
import ExhibitionAdd from '@/pages/vis/ExhibitionAdd.vue'
import GiveTicketList from '@/pages/vis/GiveTicketList.vue'
import OfflinePayment from '@/pages/vis/OfflinePayment.vue'
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
		    },{
			    path: '/mall/banner',
	 　　　 component: billBanner,
		    },{
		   	  path: '/distribution/caiwu',
	 　　　 component: caiwu,
		    }, {
		      path: '/siku/school',
		      component: sikuschool,
		    }, {
		      path: '/siku/schooAdd',
			  component: schoolAdd,
			//   name:"schoolAdd"
		    }, {
		      path: '/siku/lianxi',
		      component: lianxi,
		      //   name:"lianxi"
		    }, {
		      path: '/siku/lianxitwo',
		      component: lianxitwo,
		      //   name:"lianxitwo"
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
