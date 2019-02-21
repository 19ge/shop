import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from "./styles/Choiceshop.less";
import * as Shop from '../services/shop';
import icon01 from '../assets/images/b.png';
import icon09 from '../assets/images/v.png';
import { Tabs, WhiteSpace,Stepper ,List,TextareaItem } from 'antd-mobile';
import {loggedIn, loginOut, APIHost} from '../utils/fetch';
import v01 from '../assets/images/tt.png';
import v03 from '../assets/images/bg.png';
import v04 from '../assets/images/v04.png';
import v02 from '../assets/images/v02.png';
import v05 from '../assets/images/v05.png';
import v06 from '../assets/images/v06.png';
import v07 from '../assets/images/v07.png';
import s01 from '../assets/images/s01.png';
// import { APIHost } from '../utils/fetch';
var queryString = require('querystring');

@connect(state => ({ shop: state.shop }))
export default class Choiceshop extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          checked:1,
          list:[],
          id:[],
          AAA:'',
          DATA:'',
          BBB:'',
          tt:'',
          hhui:'',
          ii:'',
          tling:'',
          arr:[],
          d:''
        };
    }
    async componentDidMount(){
        const {location} = this.props;
        const parse=queryString.parse(location.search.replace("?",""));
        const data = await Shop.shopmess({mer_id:parse.id});
        const d=data.data[0]?data.data[0]:''
       
        this.setState({DATA:data.data[1],d:d})
        const aaa=await Shop.shopro({cate_id:this.state.DATA[0].id,mer_id:parse.id});
        
        const list =aaa.data;
        list.map((item)=>{
            item.cart_num=0;
            this.state.arr.map((itm,index)=>{
               if(itm.prod_id === item.id){
                    item.cart_num = itm.cart_num;
                }
            });
        })
        this.setState({
            AAA:list,
        })
        
    }
   
    onChange = (val,index,item) => {    
        item.cart_num=val;
        var allData = this.state.AAA;
        allData[index].cart_num = val;
        this.setState({AAA: allData});
       
        var tt = 0;
        var hhui = 0;
        console.log(item.id);
        this.state.arr.map((itm,index)=>{
            
            if(itm.prod_id === item.id){
                this.state.arr.splice(index,1);
            }
        });
        console.log(this.state.arr);
        const  brr = { 
            'prod_id':item.id,
            'cart_num' : item.cart_num,
            'prod_price_yuan' : item.prod_price_yuan,
            'prod_price' : item.prod_price,
        }; 
        this.state.arr.push(brr);
        this.state.arr.map((itm)=>{
            tt += itm.cart_num*itm.prod_price_yuan;
            hhui += itm.cart_num*itm.prod_price;
        });
      
        this.setState({
            tt:tt.toFixed(1),
            hhui:hhui.toFixed(1)
        })
        if(tt==0&&hhui==0){
            this.setState({ checked:1,});
        }else{
            this.setState({ checked:0,});
        }       
    }
    async getGoodsListOfClass(item,index){
        const {location} = this.props;
        const parse=queryString.parse(location.search.replace("?",""));
        const aaa=await Shop.shopro({cate_id:item.id,mer_id:parse.id});
        const list =aaa.data;
        list.map((item)=>{
            item.cart_num=0;
            this.state.arr.map((itm)=>{
               if(itm.prod_id === item.id){
                    item.cart_num = itm.cart_num;
                }
            });  
        })
        this.setState({
            AAA:list,
        })
    }

      //立即下单
    async order(){
        if(alert('网上商城正在开发测试中 开发完毕择日上线，届时广大会员可以通过网上商城直接购物，并实现送货上门的优质服务，敬请期待。')){
           
        }
        return false
        
        const {arr}=this.state;
        const {location,dispatch} = this.props;
        const parse=queryString.parse(location.search.replace("?",""));
        var a=[];
        var y={mer_id:parse.id,arr};
        a.push(y);
        const data = await Shop.xiadan({arr:a,type:0}); 
        if(loggedIn() && loggedIn().username){
            dispatch(routerRedux.push('/Orderimm?id='+data.id))
            }
            else{
                if(window.confirm("请您先登录"))
                {
                
                    dispatch(routerRedux.push('/Login'))
                    
                }else
                {
                        
                }
            }
          
    }
      //商品详情
    spxq(id){
        const {dispatch}=this.props;
        dispatch(routerRedux.push('/Details?id='+id))
    }
    //加入购物车
    async shopcar(){
        // alert('网上商城正在开发测试中 开发完毕择日上线，届时广大会员可以通过网上商城直接购物，并实现送货上门的优质服务，敬请期待。')
        // return false;
        const crr=this.state.arr;
        const {dispatch,location}=this.props;
        const parse=queryString.parse(location.search.replace("?",""));
        const result=await Shop.addshop({mer_id:parse.id,crr});
        if(loggedIn() && loggedIn().username){
            dispatch(routerRedux.push('/Shopcar'))
            }
            else{
                if(window.confirm("请您先登录"))
                {
                
                    dispatch(routerRedux.push('/Login'))
                    
                }else
                {
                    
                    
                }
            }
        
    }   
    render(){
        const {DATA,d}=this.state;
        //const ling=this.state;
        const dataInfo = this.state.AAA;
        console.log(dataInfo,'cyl789')
        const displayblock={
            display:'block'
        }
        const displaynone={
            display:'none'
        }
        const checked=this.state.checked;
        const {history,dispatch,shop}=this.props;
        let tabs = [];
        DATA?DATA.map(function(item){
            console.log(item,'ppppppppppppppp')
            const id=item.id;
            item.title = item.cate_name;
            tabs.push(item);
        }):''
        
        return(
            <div className={styles.App}>
                <style>
                        {`
                        .am-tabs-default-bar-tab{
                            color:#827F7F;
                            border-bottom:1px solid #CDCDCD;
                        }
                        .am-tabs-tab-bar-wrap{
                            width:1.6rem;
                        }
                        .am-tabs-default-bar-left{
                            background-color:#F0F0F0 !important;
                        }
                        .am-tabs-default-bar-tab-active{
                            color:#2B2929;
                            background:rgba(255,255,255,1);
                        }
                        .am-stepper{
                            height: 0.5rem;
                            min-height: 0.5rem;
                        }
                        .leixing{
                            padding-left:0.22rem;
                            width: 100%;
                            height:0.5rem;
                            line-height:0.5rem;
                            background: #EBEBEB;
                        }
                        .title{
                            color:#201F1F;
                            font-size:0.26rem;
                        }
                        .content{
                            width:3rem; 
                            color:#827F7F;
                            font-size:0.24rem;
                            padding-left:0.15rem;
                        }
                        .am-list-item,.am-list-item .am-list-line{
                            width:2rem;
                            display: inherit;
                        }
                        .am-stepper-handler{
                            width:0.39rem;
                            height: 0.39rem;
                            line-height: 0.39rem;
                            border-radius:50% !important;
                        }
                        .am-icon-xxs{
                            width: 0.2rem;
                            height: 0.3rem;  
                        }
                        .am-stepper-handler-down {
                            background:rgba(255,222,158,1);
                        }
                        .am-stepper-handler-up {
                            background:rgba(255,168,0,1);
                        }
                        .am-list-item{
                            min-height:auto;
                            position: relative;
                            top: 0.74rem;
                            float:right;
                        }
                        .am-stepper-input{
                            margin-top:-0.18rem;
                        }
                        .am-list-item .am-list-line .am-list-extra{
                            padding:0;
                        }
                        .am-icon-plus{
                            color:white;
                        }
                        .am-icon-minus{
                            color:#3C3C3C;
                        }
                        .am-stepper-handler-down-disabled, .am-stepper-handler-up-disabled{
                            opacity:0.1;
                        }
                        .bgimg{
                            position: absolute;
                            top: 0;
                            left: 0;
                        }
                        .bgimg img{
                            width:7.5rem;
                        }
                        .am-whitespace.am-whitespace-md{
                            height:0;
                        }
                        .tabel_nav{
                            position: fixed;
                            width: 100%;
                            right: 0;
                            left: 0;
                            display: flex;
                        }
                        `}
                        
                    </style>

                <div className={styles.top}>
                    <div className="bgimg">
                        <img src={APIHost+d.mer_pic} />
                    </div>
                    <img className={styles.back} src={icon01} onClick={ ()=>history.go(-1)} />
                    <div className={styles.tuijian}>
                        <div className={styles.vipcon2}>  
                            <dl>
                                <dt>
                                    <img src={APIHost+d.mer_logo} />
                                </dt>
                                <dd>
                                    <h5>{d.mer_name}</h5>
                                </dd>
                            </dl>         
                            <div className={styles.address2}>
                                超市地址：<span>{d.mer_address}</span><span>{d.mer_addr_detail}</span>
                            </div>
                           
                        </div>
                        <div style={{clear:'both'}}></div>
                    </div>
                </div>
                <div className={styles.middle} >
                    <WhiteSpace />
                    <Tabs tabs={tabs}
                    initalPage={'t2'}
                    tabBarPosition="left"
                    tabDirection="vertical"
                    onChange={(tab, index) => { this.getGoodsListOfClass(tab,index) }}
                    >
                       
                        <div style={{ display: 'flex',flexDirection: 'column' , backgroundColor: '#fff' }}>
                            <p className='leixing'>
                                {/* <span className='title'>热销榜</span> */}
                                {/* <span className='content'>大家好才是真的好</span> */}
                            </p>
                            {
                                this.state.AAA?this.state.AAA.map((item,index)=>{
                                   
                                    return(
                                    <dl>
                                        <dt onClick={()=>this.spxq(item.id)}>
                                            <img src={APIHost+item.prod_pic} />
                                        </dt>
                                        <dd>
                                            <div className={styles.jieshao}>
                                                <h5>{item.prod_name}</h5>
                                                <p>零售价<label>￥<span>{item.prod_price_yuan}</span></label></p>
                                                <p>会员价<label>￥<span>{item.prod_price}</span></label></p>
                                            </div>
                                            <List.Item
                                            wrap
                                            extra={
                                                <Stepper
                                                style={{ width: '100%', minWidth: '100px' }}
                                                showNumber
                                                max={100}
                                                min={0}
                                                defaultValue={item.cart_num}
                                                value={item.cart_num}
                                                onChange={(value)=>{this.onChange(value,index,item)}}
                                                />
                                            }
                                            >
                                            </List.Item>
                                            <div style={{clear:'both'}}></div>
                                        </dd>
                                        <div style={{clear:'both'}}></div>
                                    </dl>
                                    )
                                    
                                }):''
                            }
                        </div>
                    </Tabs>
                    <WhiteSpace />
                </div>
                {/* <div style={{position:'static'}}></div> */}
                <div style={checked==1?displayblock:displaynone} className={styles.bottom} >
                    <div className={styles.dingdan}>共计￥0元</div>
                    <div className={styles.xiadan}>下单</div>
                    <div style={{clear:'both'}}></div>
                </div>
                <div style={{clear:'both'}}></div>
                <div style={checked==1?displaynone:displayblock} className={styles.bottom}>
                    {/* <div className="tabel_nav" style={{position:'fixed'}}> */}
                        <div className={styles.dingdan2}>
                            <p>零售价共计￥<span>{this.state.tt}</span>元</p>
                            <p>会员价共计￥<span>{this.state.hhui}</span>元</p>
                        </div>
                        <div className={styles.addcar} onClick={()=>this.shopcar()}>加入购物车</div>
                        <div style={{backgroundColor:'#C28E3C'}} className={styles.xiadan} onClick={()=>this.order()}>立即下单</div>
                        <div style={{clear:'both'}}></div>
                    </div>
                </div>
            // </div>
        )
    }
}