//引入所需请求
import * as shop from '../services/shop';
import {tokenLogin} from '../services/user';
import {userLogin,getClassify,myding,getShopList,gonggao,myteam,reward,indexlist,selectcity,factory,ruzhi,shangjin,news,newsxq,Storedelivery,mingxi,storelist} from '../services/shop';
import {  Toast } from 'antd-mobile';
import { routerRedux } from 'dva/router';
var queryString = require('querystring');
export default {

  //空间对象名称，很重要！
  namespace: 'shop',
  //state 对象，大部分数据存储的位置
  state: {
    userInfo:{}, //用户详情信息
    areaInfo:[],//选择城市
    factoryInfo:[],//工厂详情
    infoList:[],//工厂信息
    tixianList:[],//提现记录
    teamList:[],//团队
    transList:[],//转账记录
    injob:{},//入职
    ruzhilist:[], //入职记录
    monlist:[],//雅虎赏金
    newinfo:[],//新闻公告
    newxqlist:[],//新闻详情
    Userin:[],//用户基本信息
    mineList:[], //我的
    lunboInfo:[],//首页轮播
    fenleiinfo:[],//首页分类
    zproinfo:[],//首页-指定消费产品
    storeInfo:[],//首页-门店列表
    offinfo:[],//线下门店
    teamInfo:[],//我的团队
    gongList:[],//系统公告
    gList:[],//鲜果超市
    supinInfo:[],//速聘经理
    yahuInfo:[],//雅虎经理
    classifyList:[],
    tixainInfo:[],//提现
    goodsList:[],
    shopinfo:[],//超市详情
    shoproinfo:[],//超市详情商品
    rewardList:[],//奖金明细
    danList:[],//我的订单
    
    // 分页信息，与php对接写法可固定为此写法,部分数据可能不会用到
    pagination:{
      current_page:0,
      last_page:1,
      per_page:0,
      total:0,
      hasMore:false
    }
  },

  //加载组件前执行的请求
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        // if(location.pathname === '/Personal'){
        //   dispatch({
        //     type:'getmineList'
        //   });
        // }
        if(location.pathname === '/Personaldata'){
          dispatch({
            type: 'mine',
            payload:""
          })
        }
        else if(location.pathname === '/'){
          dispatch({
            type: 'getlunbo',
            payload:""
          })
          // dispatch({
          //   type: 'fenlei',
          //   payload:""
          // })
          dispatch({
            type: 'newsp',
            payload:""
          })
          dispatch({
            type: 'zhidingpro',
            payload:""
          })
          // dispatch({
          //   type: 'storelist',
          //   payload:{page: 1,size:12}
          // })
        }if(location.pathname === '/Orderimm'){
          dispatch({
            type:'getmineList'
          });
        }
        else if(location.pathname === '/Details'){
          if(location.search!=""){
            const parse=queryString.parse(location.search.replace("?",""));  // 将一个字符串反序列化为一个对象
            dispatch({
              type: 'factorydetail',
              payload:parse
            })
          }else{
            dispatch({
              type: 'factorydetail',
              payload:{}
            })
          }              
        }
      
        else if(location.pathname === '/Myorder'){
           
          //我的订单
          if(location.search!=""){
            var parse=queryString.parse(location.search.replace("?",""));  // 将一个字符串反序列化为一个对象
            var d=parse.index-1
            dispatch({
              type: 'dingdan',
              payload:{page:1,status:d}
            })
          }else{
            dispatch({
              type: 'dingdan',
              payload:{page:1}
            })
          }
        }else if(location.pathname === '/Incomedetail'){
          //奖金明细
          dispatch({
            type: 'jiangjin', 
            payload:{page: 1}
          })
        }else if(location.pathname === '/Myteam'){
          //我的团队
          dispatch({
            type: 'team',
            payload:{page: 1,type:0}
          })
        }else if(location.pathname === '/News'){
          //系统公告
          dispatch({
            type: 'gong',
            payload:{page: 1,size:12}
          })
        }
        // else if(location.pathname === '/Fenlei'){
        //   //鲜果超市
        //   if(location.search!=""){
        //     const parse=queryString.parse(location.search.replace("?",""));  // 将一个字符串反序列化为一个对象
        //     dispatch({
        //       type: 'gshop',
        //       payload:{page:1,id:parse.id}
        //     })
        //   }else{
        //     dispatch({
        //       type: 'gshop',
        //       payload:{}
        //     })
        //   } 
        // }
        else if(location.pathname === '/Choosestore'){
          //鲜果超市
          dispatch({
            type: 'gshop',
            payload:{page: 1}
          })
        }
       
      })
    }
  },
  
  //远程请求信息
  effects: {
    // 用户信息
  
    *getmineList({ payload }, {call, put}) {
      const data = yield call(shop.mine,payload);
      console.log(data,'@@@@111')
      if (data.code==1) {
        // console.log(data,"&&&&&&&&&&&&&&&&")
        yield put({
          type: 'getUser',
          payload:{mineList: data.data} 
        })
      }else{
        Toast.fail(data.msg, 2);
      }
    },
 //提现记录

//我的订单
*dingdan({ payload}, {call, put ,select}) {
  let List = yield select(state => state.shop.danList);
  // console.log(payload,'payload')
  if(!payload||payload.page==1){
    List=[];
    yield put({
      type: 'getUser',
      payload: {danList:List}
    })
  }
  // 发送请求
  const data = yield call(myding,payload);
  if (data.code==1) {

    let {current_page,last_page,per_page,total}=data.data;
   
    let danList=List.concat(data.data.data);
 
    yield put({
      type: 'updateList',
      payload: {
        danList,
        pagination:{current_page,last_page,per_page,total}
      }
    })
  }
},
 //鲜果超市
 *gshop({ payload}, {call, put ,select}) {

  let List = yield select(state => state.shop.gList);
  console.log(payload,'xxxxxxxxxxxx')
  if(!payload||payload.page==1){
    List=[];
    yield put({
      type: 'getUser',
      payload: {
        gList:List,
        // lng,
        // lat,
        }
    })
  }
  console.log(payload,'xxxx2222')
  // 发送请求
  const data = yield call(storelist,payload);
  console.log(data.data,'xxx99999999')
  if (data.code==1) {
    let {current_page,last_page,per_page,total}=data.data;
    console.log(data.data,'@@@@@@@1')
    console.log(List,'1111111111111111')
    let gList=List.concat(data.data);
    // console.log(gList,'2222222222222222')
    yield put({
      type: 'updateList',
      payload: {
        gList,
        pagination:{current_page,last_page,per_page,total}
      }
    })
  }
},
 //奖金明细
 *jiangjin({ payload}, {call, put ,select}) {
  let List = yield select(state => state.shop.rewardList);
  console.log(payload,'xxxxxxxxxxxx')
  if(!payload||payload.page==1){
    List=[];
    yield put({
      type: 'getUser',
      payload: {rewardList:List}
    })
  }
  // 发送请求
  const data = yield call(reward,payload);
  // console.log(data.data.data,'xxx33333333333336')
  if (data.code==1) {
    let {current_page,last_page,per_page,total}=data.data;
    let rewardList=List.concat(data.data.data);
    // console.log(rewardList,'rewardList')
    
 
    yield put({
      type: 'updateList',
      payload: {
        rewardList,
        pagination:{current_page,last_page,per_page,total}
      }
    })
  }
},

//我的团队
*team({ payload}, {call, put ,select}) {
  let Lists = yield select(state => state.shop.teamList);
  console.log("椰树======",payload)
  if(!payload||payload.page==1 ||payload.page<1){
    Lists=[];
    yield put({
      type: 'getUser',
      payload: {teamList:Lists}
    })
  }
  // 发送请求
  const data = yield call(myteam,payload);
  // console.log(data.data,'xxx99999999')
  if (data.code==1) {
    let {current_page,last_page,per_page,total}=data.data;
    console.log(data.data,'@@@@@@@1')
    console.log(Lists,'1111111111111111')
    let teamList=Lists.concat(data.data.data);
    console.log("总数居====",teamList);
    yield put({
      type: 'updateList',
      payload: {
        teamList,
        pagination:{current_page,last_page,per_page,total}
      }
    })
  }
},
 //系统公告
 *gong({ payload}, {call, put ,select}) {
  let List = yield select(state => state.shop.gongList);
  // console.log(payload,'xxxxxxxxxxxx')
  if(!payload||payload.page==1){
    List=[];
    yield put({
      type: 'getUser',
      payload: {gongList:List}
    })
  }
  // 发送请求
  const data = yield call(gonggao,payload);
  console.log(data.data.data,'xxx333333333333')
  if (data.code==1) {
    let {current_page,last_page,per_page,total}=data.data;
    let gongList=List.concat(data.data.data);
    // console.log(teamList,'2222222222222222')
    yield put({
      type: 'updateList',
      payload: {
        gongList,
        pagination:{current_page,last_page,per_page,total}
      }
    })
  }
},
    //首页-轮播
    *getlunbo({ payload }, {call, put}) {
      const data = yield call(shop.lunbo,payload);    
      if (data.code==1) {
        yield put({
          type: 'getUser',
          payload:{lunboInfo: data.data} 
        })
        
      }else{
        Toast.fail(data.msg, 2);
      }
    },
    //首页-分类
    // *fenlei({ payload }, {call, put}) {
    //   const data = yield call(shop.fenlei,payload);
    //   console.log(data,'@@@@111789789789')
    //   if (data.code==1) {
    //     console.log(data,"&&&&&&&&&&&&&&&&")
    //     yield put({
    //       type: 'getUser',
    //       payload:{fenleiinfo: data.data} 
          
          
    //     })
        
    //   }else{
    //     Toast.fail(data.msg, 2);
    //   }
    // },
        //首页-新闻公告
        *newsp({ payload }, {call, put}) {
          const data = yield call(shop.xwgg,payload);
          console.log(data,'@@@@111')
          if (data.code==1) {
            console.log(data,"&&&&&&&&&&&&&&&&")
            yield put({
              type: 'getUser',
              payload:{newinfo: data.data} 
              
              
            })
            
          }else{
            Toast.fail(data.msg, 2);
          }
        },
        //首页-指定产品
        *zhidingpro({ payload }, {call, put}) {
          const data = yield call(shop.zhiding,payload);
          console.log(data,'@@@@111')
          if (data.code==1) {
            console.log(data,"&&&&&&&&&&&&&&&&")
            yield put({
              type: 'getUser',
              payload:{zproinfo: data.data} 
              
              
            })
            
          }else{
            Toast.fail(data.msg, 2);
          }
        },
    *factorydetail({ payload }, {call, put}) {
      const data = yield call(shop.factorydetail,payload);
      console.log(data,'@@@@1115656565656')
      if (data.code==1) {
        console.log(data,"&&&&&&&&&&&&&&&&123")
        yield put({
          type: 'getUser',
          payload:{factoryInfo: data.data} 
        })
      }else{
        Toast.fail(data.msg, 2);
      }
    },
    //首页-门店列表
    // *storelist({ payload}, {call, put ,select}) {
    //   let List = yield select(state => state.shop.storeInfo);
    //   if(!payload||payload.page==1){
    //     List=[];
    //     yield put({
    //       type: 'getUser',
    //       payload: {storeInfo:List}
    //     })
    //   }
    //   // 发送请求
    //   const data = yield call(storelist,payload);
    //   // console.log(data.data,'ppppppppppppp')
    //   if (data.code==1) {
    //     let {current_page,last_page,per_page,total}=data.data;
    //     let storeInfo=List.concat(data.data.data);
    //     yield put({
    //       type: 'updateList',
    //       payload: {
    //         storeInfo,
    //         pagination:{current_page,last_page,per_page,total}
    //       }
    //     })
    //   }
    // },
    //雅虎赏金
    *shangjin({ payload}, {call, put ,select}) {
      let List = yield select(state => state.shop.monlist);
      if(!payload||payload.page==1){
        List=[];
        yield put({
          type: 'getUser',
          payload: {monlist:List}
        })
      }
      // 发送请求
      const data = yield call(shangjin,payload);
      if (data.code==1) {
        let {current_page,last_page,per_page,total}=data.data;
        let monlist=List.concat(data.data.data);
        yield put({
          type: 'updateList',
          payload: {
            monlist,
            pagination:{current_page,last_page,per_page,total}
          }
        })
      }
    },

      //公告详情
      *newsxq({ payload }, {call, put}) {
        const data = yield call(shop.newsxq,payload);
        console.log(data,'@@@@1115656565656')
        if (data.code==1) {
          console.log(data,"&&&&&&&&&&&&&&&&123")
          yield put({
            type: 'getUser',
            payload:{newxqlist: data.data} 
          })
        }else{
          Toast.fail(data.msg, 2);
        }
      },
      //线下门店
      *off({ payload }, {call, put}) {
        const data = yield call(shop.offline,payload);
        console.log(data,'@@@@111')
        if (data.code==1) {
          yield put({
            type: 'getUser',
            payload:{offinfo: data.data} 
            // console.log(userInfo,'********')
          })
        }else{
          Toast.fail(data.msg, 2);
        }
      },





    // 获取商城商品列表列表和详情
    *getShopList({ payload}, {call, put ,select}) {
      // 获取上面state的元数据,写法固定
      let List = yield select(state => state.shop.shopList);
      // 如果是首次进入页面或其他原因,原始列表设为空,写法固定
      if(!payload||payload.page==1){
        List=[];
        yield put({
          type: 'getUser',
          payload: {shopList:List,shopDetail:{}}
        })
      }
      // 发送请求
      const data = yield call(getShopList,payload?payload:{});
      // 新的分页信息,参数名为thinkphp分页自带,和php对接可直接使用.
      let {current_page,last_page,per_page,total}=data.data;
      if (data.code==1) {
        // 新数据和老数据拼接,从而达成无缝翻页的效果
        let shopList=List.concat(data.data.data);

        // 调用下面的更新方法,写法固定
        yield put({
          type: 'updateList',
          payload: {
            shopList,
            pagination:{current_page,last_page,per_page,total}
          }
        })
      }
    }
    
    
  },

  //reducer 改变数据的唯一途径
  reducers: {

    // 基本使用
    getUser(state, action) {
      return { ...state, ...action.payload };
    },

    // 更新列表，通用
    // 更新列表，通用
    updateList(state,action){
      const {pagination} = action.payload;
      // 判断当前页面是否是最后一页,从而判断是否还有更多,以控制页面是否继续加载,
      if(pagination.current_page<pagination.last_page){
        action.payload.pagination.hasMore=true
      }else{
        action.payload.pagination.hasMore=false
      }
      return {...state,...action.payload}
    },


    
  }
  
};
