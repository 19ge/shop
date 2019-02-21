import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import * as Shop from '../services/shop';
// 登出方法,当前服务器网址
import { loggedIn, loginOut, APIHost } from '../utils/fetch';
// 本页样式
// import styles from "./styles/IndstexPage.less";
import styles from "./styles/Choosestore.less";
import "video-react/dist/video-react.css"; // import css
// 引入ANTD组件
import { Button, Toast, Modal,Icon } from 'antd-mobile';
import { SearchBar, Tabs,InputItem,List } from 'antd-mobile';

// TabBar,引入底部标签栏组件
import MyTabBar from "../components/TabBar";
// navVbar,引入头部导航栏组件
import MyNavBar from "../components/MyNavBar";
// 本页可能用的请求
import * as fetch from '../services/shop';
// 商品列表组件
import GoodItem from '../components/GooodItem';
// 无限滚动组件
import InfiniteScroll from 'react-infinite-scroller';
// 临时商品图
import p02 from '../assets/images/p02.png';
import p01 from '../assets/images/p01.png';
import p03 from '../assets/images/p03.png';
import icon01 from '../assets/images/icon01.png';
import icon02 from '../assets/images/icon02.png';
import icon03 from '../assets/images/icon03.png';
import icon04 from '../assets/images/icon04.png';
import icon05 from '../assets/images/icon05.png';
import icon06 from '../assets/images/icon06.png';
import icon07 from '../assets/images/icon07.png';
import icon08 from '../assets/images/icon08.png';
import icon09 from '../assets/images/v.png';
import v01 from '../assets/images/v01.png';
import v03 from '../assets/images/v03.png';
import v04 from '../assets/images/v04.png';
import v02 from '../assets/images/v02.png';
import v05 from '../assets/images/v05.png';
import v06 from '../assets/images/v06.png';
import v07 from '../assets/images/v07.png';
import s01 from '../assets/images/s01.png';
var no_props=1
// 设置alert,非必要,可直接使用Modal.alert,效果相同
const alert = Modal.alert;
// 把model 传入props
@connect(state => ({ shop: state.shop }))
export default class Choosestore extends Component {

    // 构造函数
    constructor(props) {
        super(props);
        this.state = {
            value: '',   
            prod_name:"",
            id:'1'    
        };
    }
    //加载更多的方法,写法固定,只需替换变量名
    loadFunc(e){
        const {dispatch,shop}=this.props;
        let hasMore=shop.pagination.hasMore; // 是否加载更多 ture/false
        let page = shop.pagination.current_page * 1 + 1;
        dispatch({
        type:"shop/gshop",     //方法
        payload:{       //参数
            is_hot:true,
            // size:12,
            page
        }
        })
    }
    //详情
    btnxq(id) {
        const { dispatch } = this.props;
        dispatch(routerRedux.push('/Details?id=' + id));
    }
          //搜索框
   async searchFunc(value) {
   
    //你要执行的方法
    const { dispatch, shop } = this.props;
    console.log(value)
    if(value==""){
        return Toast.offline("请输入内容",1.5)
    }
    this.setState({
        prod_name: value
    })
    dispatch({
        type: "shop/getUser",     //方法
        payload: {       //参数
            gList: [],
            pagination: {
                current_page: 0,
                last_page: 1,
                per_page: 0,
                total: 0,
                hasMore: false
            }
        }
    })
    const { selectedValue,index } = this.state;
    const page = 1;
    dispatch({
        type: "shop/gshop",     //方法
        payload: {              //参数
            page,
            cate_id: value,//地域    
        }
    })
    
   
}
   
    
    render() {
        const { history, dispatch, shop } = this.props;
        const slist=shop.gList;
        console.log(slist,'slist')
       
        // 列表是否有下一页
        let hasMore = shop.pagination.hasMore; // 是否加载更多 ture/false
        return (
            <div>
                {/* 样式 */}
                <style>
                    {`
                        .am-search{
                            height:0.6rem;
                            width: 6rem;
                            padding: 0;

                        }
                       
                        .am-search-input input[type="search"]{
                            height:0.6rem;
                        }
                        .am-list-item.am-input-item{
                            width:100%;
                        }
                        .am-list-item img{
                            width:0.26rem;
                            height:0.31rem;
                        }
                       
                        .am-search-input input[type="search"]{
                            font-size:0.3rem !important;
                            
                            border-radius:0.24rem !important;
                        }
                        .am-list-item .am-input-label.am-input-label-5{
                            width:0.3rem;
                        }
                        .am-search-input{
                            background:rgba(0,0,0,0.3);
                            border-radius: 0.3rem;
                        }
                        .am-list-item .am-list-line-multiple .am-list-content{
                            font-size:0.36rem;
                            color:#1A1A19
                        }
                        .am-list-arrow-horizontal{
                            color:#201F1F
                        }
                        .my-list{
                            border-bottom:2px solid #E5E5E5;
                        }
                        .am-input-control{
                            width:6.05rem;
                            height: 0.6rem;
                            line-height:0.6rem;
                            border-radius:0.3rem;
                            background:#A5A5A5;
                            margin-left:0.15rem;
                            margin-right: 0.7rem;
                        }
                        .am-list-item .am-input-control input{
                            text-align: center;
                            color:#000000;
                            font-size:0.28rem;
                        }
                        .am-list-item .am-list-line{
                            padding-right:0;
                        }
                        .am-list-item .am-input-control input::-webkit-input-placeholder{
                            color:rgba(0,0,0,0.6);
                        }
                        .am-search-input .am-search-synthetic-ph-placeholder{
                            // color:red;
                            color:rgba(0,0,0,0.6);
                        }
                        //取消搜索图标
                        .am-search-input .am-search-synthetic-ph-icon{
                            display:none;
                        }
                        .am-search-cancel{
                            display: none;
                        }
                        .am-search-input .am-search-synthetic-ph-icon{
                            display:none;
                        }
                        .am-icon-md {
                            width: 0.64rem;
                            height: 0.64rem;
                        }
        
                    `}
                </style>
                <div className={styles.main}>
                    {/* 头部搜索 */}
                    <div className={styles.top}>
                        {/* <div className={styles.topleft}>
                            <InputItem  onKeyDown={(val) => this.searchFunc(val)} placeholder="店铺搜索"><Icon type="left" className="left" onClick={ ()=>history.go(-1)} /></InputItem>
                            <div style={{paddingTop:'0.28rem',position: 'absolute',right: '1.07rem'}}> 
                                
                            </div>
                        </div> */}
                        <Icon type="left" className="left" onClick={ ()=>history.go(-1)} />
                        <SearchBar onSubmit={(val) => this.searchFunc(val)} placeholder="店铺搜索"  />
                        <img style={{width:'0.32rem',height:'0.32rem'}} src={s01} />
                    </div> 
                    <InfiniteScroll
                    pageStart={0}
                    loadMore={(e)=>this.loadFunc(e)}
                    hasMore={hasMore}
                    threshold={100}
                    loader={<div className="loader" style={{fontSize:".28rem",lineHeight:".86rem",textAlign:"center",marginBottom:".3rem"}} key={0}>加载中
                    ...</div>}
                    >
                    {
                        slist?slist.map((item,index)=>{
                            return(
                                <div className={styles.tuijian}>
                        <div className={styles.vipcon2}>
                            <dl>
                                <dt>
                                    <img src={APIHost+item.mer_logo} />
                                </dt>
                                <dd>
                                    <h5>{item.mer_name}</h5>
                                    <div className={styles.divbox}>
                                        <div className={styles.xing}>
                                            <img src={v03} />
                                            <img src={v03} />
                                            <img src={v03} />
                                            <img src={v03} />
                                            <img src={v04} />
                                            <span>月销{item.sale}笔</span>
                                        </div>
                                        <div className={styles.cut}>
                                            <img src={v02} />
                                            <span>在线支付满50减10，满100减20</span>
                                        </div>
                                        <div className={styles.cut}>
                                            <img src={v05} />
                                            <span>会员</span>
                                        </div>
                                    </div>
                                </dd>
                            </dl>         
                        </div>
                        <div style={{clear:'both'}}></div>
                        <div className={styles.product}>
                            {
                                item.prod?item.prod.map((item,index)=>{
                                    return(
                                        <dl>
                                            <dt>
                                                <img src={APIHost+item.prod_pic} />
                                            </dt>
                                            <dd>
                                                <p>{item.prod_name}</p>
                                                <span>￥{item.prod_price}</span>
                                                <s>￥{item.prod_price_yuan}</s>
                                            </dd>
                                        </dl>
                                    )
                                }):""
                            }
                        </div> 
                    </div>
                            )
                        }):''
                    }
                    </InfiniteScroll>
                </div>
            </div>
        )
    }
}
