import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from "./styles/Myorder.less";
import MyNavBar from "../components/MyNavBar";
import MyTabBar from "../components/TabBar";
import * as Shop from '../services/shop';
import { Tabs, Button,Stepper ,List ,WhiteSpace} from 'antd-mobile';
import icon01 from '../assets/images/cm.png';
import InfiniteScroll from 'react-infinite-scroller';
import v03 from '../assets/images/pp.png';
import v04 from '../assets/images/pp3.png';
import { APIHost } from '../utils/fetch';
var queryString = require('querystring');
@connect(state => ({ shop: state.shop }))
export default class Myorder extends Component {
        state = {
            val: 0,
            checked:1,
            status:'',
        }   
    componentWillMount(){
        const {dispatch,location}=this.props;
        const parse=queryString.parse(location.search.replace('?',''));
        console.log(parse.index,"var queryString = require('querystring');")
        this.setState({number:parseFloat(parse.index)});
    }
    
    //加载更多的方法,写法固定,只需替换变量名
    loadFunc(e){
        const {dispatch,shop}=this.props;
        // let hasMore=shop.pagination.hasMore; // 是否加载更多 ture/false
        let page = shop.pagination.current_page * 1 + 1;
        dispatch({
        type:"shop/dingdan",     //方法
        payload:{       //参数
            is_hot:true,
            page
        }
        })
    }
    details(item){
        const{dispatch}=this.props;
        dispatch(routerRedux.push('/Orderinfo?id='+item))
    }

    async getGoodsListOfClass(item,index){

        const {history,dispatch,shop}=this.props;
        var status=item.title=='全部'?'':item.title=='未支付'?0:item.title=='已支付'?1:item.title=='已完成'?2:''

        const type=index;
        this.setState({status:status})
        dispatch({
            type: "shop/getUser",     //方法
            payload: {       //参数
                infoList: [],
                pagination: {
                    current_page: 0,
                    last_page: 1,
                    per_page: 0,
                    total: 0,
                    hasMore: false,
                    stasus:status
                }
            }
        })
        const page = 1;
        dispatch({
            type: "shop/dingdan",     //方法
            payload: {       //参数
                page,
                status:status  
            }
        })        
    }
    
    
    render(){
        const {status,page}=this.state;
        const comeon=this.state.number;
        const {history,dispatch,shop}=this.props;
        let hasMore=shop.pagination.hasMore; // 是否加载更多 ture/false      
        const daninfo=shop.danList;
        console.log(daninfo,'daninfo')
        const navBarProps = {
            leftVisible:true,
            leftFunc(){
                history.push('/Personal')
              },
           
            titleName:"我的订单",
            rightContent:"",
            rightFunc(){
            }
        }
        const tabs = [
            { title: '全部' },
            { title: '未支付' },
            { title: '已支付' },
            { title: '已完成' },
        ];
        return(
            <div className={styles.App}>
            <style>
                    {`
                    .am-tabs-default-bar-tab-active{
                        color:rgba(255,168,0,1);
                    }
                    .am-whitespace.am-whitespace-md{
                        height:0;
                    }
                    .am-tabs-pane-wrap{
                        background: #fff;
                    }
                    .am-button{
                        width: 1.53rem;
                        height: 0.5rem;
                        line-height: 0.5rem;
                        color:#A1A1A0;
                        font-size: 0.24rem;
                        border:1px solid rgba(191,191,191,1)
                        border-radius:0.06rem;
                    }
                    
                    `}
                </style>
            {/*头部导航栏*/}
            <MyNavBar {...navBarProps}/>
                <div className={styles.tabbar}>
                    {/* <WhiteSpace /> */}
                    <div style={{ height: 'auto' }}>
                    
                    <Tabs tabs={tabs}
                        initialPage={comeon}   
                        onChange={(tab, index) => { this.getGoodsListOfClass(tab,index) }}
                        onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                    >
                    <InfiniteScroll
                    pageStart={0}
                    initialLoad={false}
                    loadMore={(e)=>this.loadFunc(e)}
                    hasMore={hasMore}
                    threshold={100}
                    loader={<div className="loader" style={{fontSize:".28rem",lineHeight:".86rem",textAlign:"center",marginBottom:".3rem"}} key={0}>加载中
                    ...</div>}
                    >
                        <div>
                            <div className={styles.box}>
                                {
                                    daninfo?daninfo.map((item,index)=>{
                                         return(
                                            <dl onClick={()=>this.details(item.id)}> 
                                                <dt>
                                                    <img src={APIHost+item.mer_logo} />
                                                </dt>
                                                <dd>
                                                    <div style={{display:'flex'}}>
                                                        <p className={styles.name}>{item.mer_name}</p>
                                                        <p className={styles.zt}>
                                                        {
                                                            item.ord_status==0?'订单未付款':item.ord_status==1?'已支付':item.ord_status==2?'已完成':item.ord_status==3?'已取消':''
                                                        }
                                                        
                                                        </p>
                                                    </div>
                                                    
                                                    <h5>{item.ord_add_time}</h5>
                                                    
                                                    <div style={{marginTop:'0.44rem'}}>
                                                        <p className={styles.id}>共{item.ord_num}件商品</p>
                                                        <p className={styles.num}>￥{item.ord_money}</p>
                                                    </div>
                                                    
                                                </dd>
                                                <div style={{clear:'both'}}></div>
                                            </dl>
                                         )
                                    }):''
                                }
                                
                                <div style={{clear:'both'}}></div>
                            </div>
                        </div>
                        </InfiniteScroll>
                    </Tabs>
                   
                    </div>
                </div>
            </div>
        )
    }
}