import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import * as Shop from '../services/shop';
// 登出方法,当前服务器网址
import { loggedIn, loginOut, APIHost } from '../utils/fetch';
// 本页样式
// import styles from "./styles/IndstexPage.less";
import styles from "./styles/fenlei.less";
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
import icon09 from '../assets/images/v.png';
import icon01 from '../assets/images/s.png';
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
export default class Fenlei extends Component {

    // 构造函数
    constructor(props) {
        super(props);
        this.state = {
            selectedTabBar: "shop",
            value: '',
            
            DATA: [],
            infos: '',
            gong: '',
            selectedValue: 0,
            checked:0,
            disabled:false,
           
            

        };
    }
    //加载更多的方法,写法固定,只需替换变量名
    loadFunc(e){
        const {dispatch,shop}=this.props;
        let hasMore=shop.pagination.hasMore; // 是否加载更多 ture/false
        let page=shop.pagination.page*1+1;
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

    get_input(v){
            this.setState({
                checked:1,
            })         
    }
      //搜索框
   async searchFunc(value) {
    // console.log(value,'输入的值')
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
    


    //加载更多的方法,写法固定,只需替换变量名
    
    render() {
        const { history, dispatch, shop } = this.props;
        const {checked}=this.state;
      
        const displaynone={
			display:"none"
		}
		const displayblock={
			display:"block"
		}
        // 列表是否有下一页
        let hasMore = shop.pagination.hasMore; // 是否加载更多 ture/false
        const flist=shop.gList;
        console.log(flist,'flist')

        return (
            <div>
                {/* 样式 */}
                <style>
                    {`
                        .am-list-item.am-input-item{
                            width:100%;
                        }
                       
                        .am-list-item .am-input-label.am-input-label-5{
                            width:0.3rem;
                        }
                        .am-list-item .am-list-line-multiple .am-list-content{
                            font-size:0.36rem;
                            color:#1A1A19
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
                        svg:not(:root){
                            margin-top:0.23rem;
                        }
                        .am-search{
                            width:6.2rem;
                            height:0.65rem; 
                            margin-top:0.1rem;
                        }
        
                    `}
                </style>
                <div className={styles.main}>
                    {/* 头部搜索 */}
                    <div className={styles.top}>
                        <div className={styles.topleft}>
                            <Icon type="left" className="left" onClick={ ()=>history.go(-1)} />
                            <div className={styles.disbox} style={checked===1?displayblock:displaynone}>
                                {/* <InputItem   placeholder="分类"></InputItem> */}
                                <SearchBar onSubmit={(val) => this.searchFunc(val)} placeholder="Search" maxLength={8} />
                            </div>
                            <p className={styles.p} style={checked===1?displaynone:displayblock} >分类</p>
                            <div className={styles.search} style={checked===1?displaynone:displayblock} onClick={this.get_input.bind(this,checked)}> 
                                <img style={{width:'0.36rem',height:'0.36rem'}} src={icon01} />
                            </div>
                        </div>
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
                        flist?flist.map((item,index)=>{
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
                                }):''
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
