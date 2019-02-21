import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import * as Shop from '../services/shop';
// 登出方法,当前服务器网址
import { loggedIn, loginOut, APIHost } from '../utils/fetch';
// 本页样式
// import styles from "./styles/IndstexPage.less";
import styles from "./styles/Super.less";
// 引入ANTD组件
import { Button, Toast, Modal,Icon ,PullToRefresh} from 'antd-mobile';
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
import icon01 from '../assets/images/x.png';
import v01 from '../assets/images/v01.png';
import v03 from '../assets/images/v03.png';
import v04 from '../assets/images/v04.png';
import v02 from '../assets/images/v02.png';
import v05 from '../assets/images/v05.png';
import v06 from '../assets/images/v06.png';
import v07 from '../assets/images/v07.png';
import s01 from '../assets/images/s2.png';
// import { BMap } from 'BMap';
var no_props=1
// 设置alert,非必要,可直接使用Modal.alert,效果相同
const alert = Modal.alert;
var queryString = require('querystring');
// 把model 传入props
@connect(state => ({ shop: state.shop }))
export default class Super extends Component {

    // 构造函数
    constructor(props) {
        super(props);
        this.state = {
            selectedTabBar: "trading",
            value: '店铺搜索',      
            DATA: [],
            infos: '',
            gong: '',
            selectedValue: 0,  
            prod_name:'', 
            lng:0,
            lat:0,
            cityName:'',  
            dianlist:[],  
            height: document.documentElement.clientHeight,
            page: 1,
            total: 0,    
            refreshing: false,     
        };
    }
    //详情
   
    async componentDidMount(){
        const {dispatch,shop,location}=this.props;
        const _this=this;
        var BMap = window.BMap;
        // 百度地图API功能
        var map = new BMap.Map("allmap");
        var point = new BMap.Point(116.331398,39.897445);
        map.centerAndZoom(point,12);

        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function(r){
           
            if(this.getStatus() == "0"){    
                var addComp = r.address;
                var mk = new BMap.Marker(r.point);
                console.log(mk,1111)
                map.addOverlay(mk);
                map.panTo(r.point);
                let cityName=addComp.city;
                console.log(r.point.lng+','+r.point.lat);
               
                _this.setState({
                    lng:r.point.lng,
                    lat:r.point.lat,
                    cityName,  
                })
              
                const parse=queryString.parse(location.search.replace("?",""));  // 将一个字符串反序列化为一个对象
                const mer_id=parse.id;
                const value=parse.value;
                const value2=parse.value2;
                Shop.storelist({lng:r.point.lng,lat:r.point.lat,page:_this.state.page,cate_id:mer_id,mer_keyword:value,prod_keyword:value2}).then((result)=>{
                    if (result.code === 1) {
                        if (result.data.data.length < 1) {
                        } else {
                            _this.setState({ dianlist:result.data.data, page: result.data.current_page, total: result.data.total })
                        }
                      } else {
                        Toast.offline(result.msg, 2); return;
                      }
                })
            }else {
                alert('failed'+this.getStatus());
            }  
        },{enableHighAccuracy: false})
     
    }

   //搜索框
    async searchFunc(value) {
        const { dispatch, shop } = this.props;
        const {lng,lat}=this.state;
        console.log(value)
        if(value==""){
            return Toast.offline("请输入内容",1.5)
        }
        Shop.storelist({mer_keyword:value,lng:lng,lat:lat}).then((result)=>{
            this.setState({dianlist:result.data.data})
        })
    }  
    slist(id){
        const {dispatch}=this.props;
        dispatch(routerRedux.push('/Choiceshop?id='+id))
    } 
getShopList() {
    const {location}=this.props;
    const parse=queryString.parse(location.search.replace("?",""));  // 将一个字符串反序列化为一个对象
    const mer_id=parse.id;
    const { page ,lng,lat} = this.state;   // 页数
    let pageNum = page * 1 + 1;
    this.setState({ refreshing: true, isLoading: true });
    Shop.storelist({ page: pageNum,lng:lng,lat:lat,cate_id:mer_id }).then((result) => {
    //   console.log("###====",result);
      if (result.code === 1) {
        if (result.data.data.length < 1) {
          this.setState({ refreshing: false, isLoading: false, total: result.data.total });
        } else {
          var newArr = this.state.dianlist.concat(result.data.data);
          this.setState({ page: pageNum, dianlist: newArr, total: result.data.total, refreshing: false, isLoading: false });
        }
      }
    })
  }
    


    //加载更多的方法,写法固定,只需替换变量名
    
    render() {
      
      
        const { history, dispatch,shop} = this.props;
        const {cityName,dianlist}=this.state;
        console.log(this.state.lng,'***1')
        console.log(this.state.lat,'***2')
        
        // 列表是否有下一页
        let hasMore = shop.pagination.hasMore; // 是否加载更多 ture/false
   
        const Item = List.Item;
        const Brief = Item.Brief;
        const tabBarProps = {
            selectedTabBar: this.state.selectedTabBar,
            history
        }
        return (
            <div>
                <div id="allmap" style={{display:'none'}}></div>
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
                        .am-list-item .am-input-control input{
                            text-align: center;
                            color:#000000;
                            font-size:0.28rem;
                            height:100%;
                        }
                        .am-list-item .am-input-control input[value]{
                            color:rgba(0,0,0,0.6);
                        }
                        .am-list-item .am-list-line{
                            padding-right:0;
                        }
                        .am-list-item.am-input-item{
                            padding-left:0;
                            height:0.6rem;
                            min-height:0.6rem;
                        }
                        svg:not(:root){
                            margin-top:0.23rem;
                        }
                        .am-input-control{
                            width:7.02rem;
                            height:0.6rem; 
                            // margin-top:0.1rem;
                            margin:auto;
                            border-radius:0.3rem;
                            background:rgba(0,0,0,0.3);
                        } 
                        .am-search,.am-search-input{
                           
                            background:rgba(0,0,0,0.3);
                        }
                        .am-search-input{
                            background:rgba(0,0,0,0.3);
                        }
                        .search{
                            position: absolute;
                            top: 0.47rem;
                            left: 0.7rem;
                        }
                        .search img{
                            width: 0.4rem;
                            height: 0.4rem;
                        }
                        .am-search-input .am-search-synthetic-ph-icon{
                            display:none;
                        }
                        .am-search.am-search-start .am-search-input .am-search-synthetic-ph{
                            padding-left: 1.3rem;
                        }
                        .am-search.am-search-start .am-search-input input[type="search"]{
                            padding: 0 0.56rem 0 1rem;
                        }
                        .am-search-input .am-search-synthetic-ph-placeholder{
                           
                            color:rgba(0,0,0,0.6);
                        }
                        .am-search-input input[type="search"]{
                            height:0.6rem;
                            line-height:0.6rem;
                            
                        }
                        .am-search-input{
                            border-radius:0.3rem;
                        }       
        
                    `}
                </style>
                 {/*底部标签栏*/}
                 <MyTabBar {...tabBarProps} />
                <div className={styles.main}>
                    {/* 头部搜索 */}
                    <div className={styles.top}>
                            <SearchBar  onSubmit={(val) => this.searchFunc(val)} placeholder="店铺搜索" />
                            <div className='search'>
                                <img src={s01} />
                            </div>

                    </div>
                    <div className={styles.address}>
                        <p>当前位置：{cityName}</p>
                        <div style={{clear:'both'}}></div>
                    </div>
                    <PullToRefresh id="ListBox"
                        style={{
                        height: 'auto',
                        overflow: 'auto',
                        }}
                        indicator={{ deactivate: '上拉可以刷新' }}
                        direction="up"
                        refreshing={this.state.refreshing}
                        onRefresh={() => this.getShopList()}
                    >
                        {
                            dianlist?dianlist.map((item,index)=>{
                                const id=item.id
                                return(
                                    <div className={styles.tuijian} key={index}>
                            <div className={styles.vipcon2}>
                                <dl  onClick={()=>this.slist(id)}>
                                    <dt>
                                        <img src={APIHost+item.mer_logo} />
                                    </dt>
                                    <dd>
                                        <h5>{item.mer_name}</h5>
                                        <div className={styles.divbox}>
                                            <div className={styles.xing}>
                                                <span>月销966笔</span>
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
                                            <dl key={index} onClick={()=>this.slist(id)}>
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
                            }):""
                        }
                    </PullToRefresh>      
                </div>
            </div>
        )
    }
}
