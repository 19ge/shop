import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import * as Shop from '../services/shop';
// 登出方法,当前服务器网址
import { loggedIn, loginOut, APIHost } from '../utils/fetch';
// 本页样式
// import styles from "./styles/IndstexPage.less";
import styles from "./styles/IndexPage.less";
import "video-react/dist/video-react.css"; // import css
// 引入ANTD组件
import { Button, Toast, Modal, WingBlank,Carousel } from 'antd-mobile';
import { SearchBar, Tabs,InputItem,List,PullToRefresh} from 'antd-mobile';

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
import v08 from '../assets/images/sx.png';
import v09 from '../assets/images/cm.png';
// import { useAsPath } from '_tslint@5.11.0@tslint/lib/configuration';
// import { userInfo } from 'os';
// import { ConnectableObservable } from 'rx';
// import { BMap } from 'BMap';
// 设置alert,非必要,可直接使用Modal.alert,效果相同
const alert = Modal.alert;
// 把model 传入props
@connect(state => ({ shop: state.shop }))
export default class IndexPage extends Component {

    // 构造函数
    constructor(props) {
        super(props);
        this.state = {
            selectedTabBar: "shop",
            value: '',
            values: '',       
            imgHeight: 4.50+"rem",
            d:'',
            check:1,
            fenleilist:'',
            lng:0,
            lat:0,
            cityName:'',  
            dianlist:[],  
            height: document.documentElement.clientHeight,
            page: 1,
            total: 0,    
            refreshing: false, 
            vname:''
        };
    }
    async componentDidMount(){
        const result=await Shop.fenlei()
        this.setState({
            fenleilist:result.data
        })
        if(this.state.fenleilist.length>=7){
            this.setState({
                check:0,
                fenleilist: this.state.fenleilist.slice(0,7)
            })
        }else{
            this.setState({
                check:1,
                fenleilist: this.state.fenleilist
            })
        }

        //
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
                Shop.storelist({lng:r.point.lng,lat:r.point.lat,page:_this.state.page,mer_is_tui:1,}).then((result)=>{
                    if (result.code === 1) {
                        if (result.data.data.length < 1) {
                        } else {
                            _this.setState({ dianlist:result.data.data,vname:result.data.data[0].mer_name, page: result.data.current_page, total: result.data.total })
                        }
                    } else {
                        Toast.offline(result.msg, 2); return;
                    }
                })
            }else {
                alert('failed'+this.getStatus());
            }  
        },{enableHighAccuracy: false})
        //
    }
    getShopList() {
        const {location}=this.props;
        const { page ,lng,lat} = this.state;   // 页数
        let pageNum = page * 1 + 1;
        this.setState({ refreshing: true, isLoading: true });
        Shop.storelist({ page: pageNum,lng:lng,lat:lat,mer_is_tui:1}).then((result) => {
          console.log("###====",result);
          if (result.code === 1) {
            if (result.data.current_page >= result.data.last_page) {
              this.setState({ refreshing: false, isLoading: false, total: result.data.total });
            } else {
              var newArr = this.state.dianlist.concat(result.data.data);
              this.setState({ page: pageNum, dianlist: newArr, total: result.data.total, refreshing: false, isLoading: false });
            }
          }
        })
    }
    async xianshi(){
        const result=await Shop.fenlei()
        console.log(result.data,'this.state.fenleilist')
        this.setState({
            check:1,
            fenleilist:result.data
        })
    } 
    //详情
    btnxq(id) {
        const { dispatch } = this.props;
        dispatch(routerRedux.push('/Details?id=' + id));
    }
    //上边搜索框
    tiao(v){
        var evt = window.event || v; 
        if(evt.keyCode == 13){
            console.log(v.target.value,'ffffffffffffffff');
            const d=v.target.value;
            this.setState({d:d})
            const {dispatch}=this.props;
            dispatch(routerRedux.push('/Super?value='+d))
        }else{

        }
    }
    //点击搜索
    apples(){
        var dd=document.getElementById('input');
        var d=dd.value?dd.value:dd.placeholder; 
        const {dispatch}=this.props;
        dispatch(routerRedux.push('/Super?value='+d))
    }
    //下边
    sjia(v){
        var evt = window.event || v; 
        if(evt.keyCode == 13){
            const d=v.target.value;
            const {dispatch}=this.props;
            dispatch(routerRedux.push('/Super?value2='+d))
        }else{

        }
    }
    
    clear = () => {
        this.setState({ value: '' });
    };
    handleClick = () => {
        this.manualFocusInst.focus();
    };
    btntz(){
        const {dispatch}=this.props;
        dispatch(routerRedux.push('/Choiceshop'))
    }
    list(id){
        const {dispatch}=this.props;
        dispatch(routerRedux.push('/Choiceshop?id='+id))
    }
    //指定消费产品
    btnzd(id){
        const {dispatch}=this.props;
        dispatch(routerRedux.push('/Baodanlist'))
    }
    btnfenlei(id){
        const {dispatch}=this.props;
        dispatch(routerRedux.push('/Super?id='+id))
    }

    render() {
        const {history,dispatch,shop}=this.props;
        const tabBarProps = {
            selectedTabBar: this.state.selectedTabBar,
            history
        }
        // 列表是否有下一页
        let hasMore = shop.pagination.hasMore; // 是否加载更多 ture/false
        const lunlist=shop.lunboInfo;  
        const newlist=shop.newinfo;
        const zprolist=shop.zproinfo;
        const Item = List.Item;
        const displaynone={
			display:"none"
		}
		const displayblock={
			display:"block"
        }
        const {fenleilist,check,dianlist,vname}=this.state
        
        return (
            <div style={{width:'100%',height:'100%'}}>
                <div id="allmap" style={{display:'none'}}></div>
                {/* 样式 */}
                <style>
                    {`
                        * { touch-action: pan-y; }
                        .am-list-item.am-input-item{
                            padding-left:1.6rem;
                        }
                        .am-search-cancel{
                            color:#0187FC !important;
                        }
                        .am-list-item img{
                            width:0.26rem;
                            height:0.31rem;
                        }
                        
                        .am-search-input input[type="search"]{
                            text-align: center;
                            color:#4A4A4A
                        }
                        .am-list-item .am-input-label.am-input-label-5{
                            width:0.3rem;
                        }
                        .am-search-input{
                            background:rgba(26,26,26,0.3);
                            border-radius: 0.24rem;
                        }
                        .am-list-item .am-list-line{
                            padding-right:0.3rem;
                        }
                        .am-list-item .am-list-line-multiple .am-list-content{
                            font-size:0.36rem;
                            color:#1A1A19
                        }
                        .am-list-item .am-input-control input{
                            color:#4A4A4A;
                            font-size:0.36rem !important;
                        }
                        .am-list-arrow-horizontal{
                            color:#201F1F
                        }
                        .my-list{
                            border-bottom:2px solid #E5E5E5;
                        }
                        .topright .am-list-item.am-input-item{
                            padding-left:0;
                            background:rgba(26,26,26,0.3);
                            height:0.48rem;
                            min-height:0.48rem;
                            border-radius:0.24rem;
                            width:6.38rem;
                            margin:auto;
                           
                        }
                        .topright .am-list-item img{
                            width:0.28rem;
                            height:0.28rem;
                        }
                        .topright .am-list-item .am-input-control input{
                            
                            font-size:0.26rem !important;
                        }
                        .topright .am-list-item .am-input-label{
                             margin-left:2rem;
                        }

                        .am-list-item .am-input-control input::-webkit-input-placeholder {
                            color:#4A4A4A;
                            font-size:.3rem;
                            text-align:left;
                        }
                        .slider-frame,.slider-list{
                            height:4.33rem !important;
                            
                        }
                        .am-wingblank,.am-wingblank.am-wingblank-lg{
                            margin:0
                        }
                        .pp{
                           position:absolute;
                           top:1.5rem;
                           right:0.49rem;
                        }
                        // .am-pull-to-refresh am-pull-to-refresh-up{
                        //     height:auto !important;
                        // }
                    `}
                </style>
                {/*头部导航栏*/}
                {/* <MyNavBar {...navBarProps}/> */}
                {/*底部标签栏*/}
             
                <div className={styles.main}>
                    {/* 头部搜索 */}
                    <div style={{background:'#fff'}}>
                        <div className={styles.top}>
                            <div className={styles.topleft}>
                                <InputItem id='input' placeholder={vname} onKeyDown={(v)=>this.tiao(v)}><img onClick={()=>this.apples()} className={styles.iconp} src={p01} /></InputItem>
                                <div style={{paddingTop:'0.25rem',paddingRight:'0.8rem'}}> 
                                    <img src={p02} onClick={()=>this.apples()} />
                                </div>
                            </div>
                            <div className='topright'>
                                <InputItem  placeholder="连锁超市" onKeyDown={(v)=>this.sjia(v)}><img   className={styles.iconp} src={v08} /></InputItem>
                            </div>  
                        </div>
                        <div className={styles.bgimg}>
                        <WingBlank>
                            <Carousel
                            autoplay={true}
                            infinite
                            >
                            { lunlist?lunlist.map((item,index) => (
                                <div
                                key={index}
                                style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                                >
                                <img
                                    src={APIHost+item.shuff_pic}
                                    alt=""
                                    style={{ width: '100%', verticalAlign: 'top',height:'100%' }}
                                />
                                </div>
                            )):""
                            }
                            </Carousel>
                        </WingBlank>
                            {/* <img src={p03} /> */}
                        </div>
                        <div className={styles.item} style={{position:'relative'}}>
                            {
                                fenleilist.length>0?fenleilist.map((item,index)=>{
                                    return(
                                            <dl key={index} onClick={()=>this.btnfenlei(item.id)}>
                                                <dt>
                                                    <img src={APIHost+item.cate_pic} />
                                                </dt>
                                                <dd>{item.cate_name}</dd>
                                            </dl>
                                        )

                                }):''
                            }
                            <div style={{clear:'both'}}></div>
                            <div onClick={()=>this.xianshi()} style={check===1?displaynone:displayblock} className='pp' >
                                <dl style={{width:'100%',textAlign:'center'}}>
                                    <dt>  
                                        <img src={v09} style={{width:"0.9rem",height:'0.9rem',borderRadius:'50%'}} />
                                    </dt>
                                    <dd>更多</dd>
                                </dl>
                            </div>
                        </div>
                        
                    </div>
                    <div className={styles.notice} onClick={()=>history.push('/News')}>
                        <p className={styles.title} >系统公告</p>
                        <p className={styles.con}>{newlist.me_title}</p>
                    </div>
                    <div>
                        <List className="my-list">
                            <Item
                            arrow="horizontal"
                            multipleLine
                            onClick={() => {}}
                            platform="android"
                            >
                            贵宾会员特指定消费产品
                            </Item>
                        </List>
                        <div className={styles.vipcon}>
                            {
                                zprolist.length>0?zprolist.map((item,index)=>{
                                    // if(index === 0){
                                    //     var word ="购买本区产品即可成为贵宾会员"
                                    // }else{
                                    //     var word ="联盟商家"
                                    // }
                                    const id=item.mer_id;
                                    return(
                                        <div key={index} onClick={()=>this.btnzd(id)}>
                                            <div className={styles.vipimg}>
                                                <img src={APIHost+item.prod_pic}/>
                                            </div>
                                            <div className={styles.vipbox}>
                                                {/* <p>{word}</p> */}
                                            </div>
                                        </div>
                                    )
                                }):''
                            }
                        </div>
                    </div>
                    <div className={styles.tuijian}>
                        <List className="my-list">
                            <Item
                            arrow="horizontal"
                            multipleLine
                            onClick={() => {}}
                            platform="android"
                            >
                            每日推荐
                            </Item>
                        </List>
                        <PullToRefresh 
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
                                const id=item.id;
                                return(
                                    <div key={index} >
                                    <div className={styles.vipcon2} onClick={()=>this.list(id)}>
                                        <dl >
                                            <dt>
                                                <img src={APIHost+item.mer_logo} />
                                            </dt>
                                            <dd>
                                                <h5>{item.mer_name}</h5>
                                                <div className={styles.divbox}>
                                                    <div className={styles.xing}>
                                                        {/* <img src={v03} />
                                                        <img src={v03} />
                                                        <img src={v03} />
                                                        <img src={v03} />
                                                        <img src={v04} /> */}
                                                        <span>月销{item.sale}笔</span>
                                                    </div>
                                                    {/* <div className={styles.cut}>
                                                        <img src={v02} />
                                                        <span>在线支付满50减10，满100减20</span>
                                                    </div>
                                                    <div className={styles.cut}>
                                                        <img src={v05} />
                                                        <span>贵宾会员享受8.5折</span>
                                                    </div> */}
                                                </div>
                                            </dd>
                                        </dl>         
                                    </div>
                                    <div style={{clear:'both'}}></div>
                                    <div className={styles.product}>
                                        {
                                            item.prod?item.prod.map((item,index)=>{
                                                return(
                                                    <dl key={index} onClick={()=>this.list(id)}>
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
                                    <div style={{clear:'both'}}></div>
                                    <div style={{height:'0.1rem',background:'#E5E5E5'}}></div>
                                </div>
                                )

                            }):''
                        } 
                    </PullToRefresh> 
                    </div>         
                    {/* </InfiniteScroll> */}
                    {/*商品列表 自动刷新*/}
                    {/*无限滚动插件NPM地址,https://www.npmjs.com/package/react-infinite-scroller*/}
                </div>
                <div style={{overflow:'scroll',marginBottom:'1.1rem',textAlign:'center'}}></div>
                <MyTabBar {...tabBarProps} />
            </div>
        )
    }
}
