import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from "./styles/Shopcar.less";
import MyNavBar from "../components/MyNavBar";
import MyTabBar from "../components/TabBar";
import * as Shop from '../services/shop';
import {loggedIn, loginOut, APIHost} from '../utils/fetch';
import { Tabs, Button,Stepper ,List ,WhiteSpace,Toast,Modal} from 'antd-mobile';
import icon01 from '../assets/images/c.png';
import v03 from '../assets/images/yy.png';
const alertModal = Modal.alert;
@connect(state => ({ shop: state.shop }))
export default class Shopcar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTabBar: "car",
           
            checked:1,
            tt:'',
            hhui:'',
            data:'',
            grr:[],
            AAA:'',
            mid:'',
            showModal: false
            
        }   
    }
    async componentDidMount(){
        const {dispatch}=this.props;
        const result=await Shop.shoplist();   
        const data=result.data;
        // console.log(data,'2')
        var ab = 0;
        var ac = 0;
        data.map((item)=>{
            const mid=item.mer_id;
            this.setState({mid:mid})
            item.arr.map((iten)=>{
                const brr = { 
                    'cart_id':iten.id,
                    'num' : iten.cart_num,
                    'prod_price_yuan' : iten.prod_price_yuan,
                    'prod_price' : iten.prod_price,
                }; 
                this.state.grr.push(brr);
                ab += iten.prod_price_yuan*iten.cart_num;
                ac += iten.prod_price*iten.cart_num;
            })    
        })
        this.setState({
            data:data,
            tt:ab,
            hhui:ac,
        })
        console.log(data,'resultdata')
    }
    
    onChange2(val,index,item,sid,e){
        // console.log(val,66666666666666)
        // var t=cccc()
        const dd=item.id;
        var allData = this.state.data;
        allData.cart_num = val;
        
       
        this.state.grr.map((itm,index)=>{
            if(itm.cart_id === item.id){
                 this.state.grr.splice(index,1);
            }
         });
        //  console.log("$$$$==",val);
            Shop.modifynum({id:sid,cart_num:val}).then((result2)=>{
                 
            })
            const  brr = { 
                'cart_id':item.id,
                'num' : val,
                'prod_price_yuan' : item.prod_price_yuan,
                'prod_price' : item.prod_price,
            }; 
            this.state.grr.push(brr);  
        // console.log(val,'55555555555')
        item.cart_num=val;
        allData.cart_num = val; 
        //更新grr里面的数量
        var tt = 0;
        var hhui = 0;   
        this.state.grr.map((itm)=>{
            tt += itm.num*itm.prod_price_yuan;
            hhui += itm.num*itm.prod_price;
        });
        this.setState({
            data: allData,
            tt: tt,
            hhui: hhui,
        });
        return;
    }
    //删除
    btndel(sid,){
        const {data,grr}=this.state;
        Shop.deleteshop({id:sid}).then((result)=>{
            if(result.code==1){
                Toast.success(result.msg,2,()=>{
                    
                    data.map((item,index)=>{
                        console.log(item.arr.length,'ppppppp88888')
                        console.log(item.arr,'ppppppp88888')
                        item.arr.map((itm,ind)=>{
                            if(itm.id==sid){
                                item.arr.splice(ind,1)
                            }
                        })
                        if(item.arr.length==0){
                            data.splice(index,2);
                            
                        }
                        
                    })
                    //删除商品
                    grr.map((item,iii)=>{
                        if(item.cart_id===sid){
                            grr.splice(iii,1)
                        }
                    }) 
        
                    let tt = 0;
                    let hhui = 0; 
                        
                    this.state.grr.map((itm)=>{
                        tt += itm.num*itm.prod_price_yuan;
                        hhui += itm.num*itm.prod_price;
                    });
                    this.setState({
                        data: data,
                        tt: tt,
                        hhui: hhui,
                    });
                    // console.log(data,'pppppppppp5555')

                })
            }else{
                Toast.offline(result.msg,2)
            }

        })
    }
    //结算
    async total(){  
        
        console.log(this.state.data,'xxxxxxxxxx');
        // return;
        var arr=this.state.data
       
        const result=await Shop.xiadan({type:1,arr})
        const {dispatch}=this.props;

        dispatch(routerRedux.push('/Orderimm?id='+result.id+'&&lprice='+this.state.tt+'&&hprice='+this.state.hhui))
    }
    render(){
        const {history,dispatch,shopData}=this.props;
        const {data}=this.state;
        console.log(this.state.AAA)
        const navBarProps = {
            leftVisible:false,
            leftFunc(){
                history.go(-1)
              },
           
            titleName:"购物车",
            rightContent:"",
            rightFunc(){
            }
        }
        const tabBarProps = {
            selectedTabBar: this.state.selectedTabBar,
            history
        }
        const _this = this;
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
                        top: 1rem;
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
                    .am-button{
                        width:2.73rem;
                        background:#D4AB6A;
                        border-radius:0.36rem;
                        height:0.72rem;
                        line-height: 0.72rem;
                        margin-top: 0.05rem;
                        float: right;
                        color: #fff;
                    }
                    .delete{
                        width: 1rem;
                        height: 0.5rem;
                        line-height: 0.5rem;
                        background: #D4AB6A;
                        color: white;
                        font-size: 0.25rem;
                        position: absolute;
                        right: 0;
                        border: 0;
                    }
                    
                    `}
                </style>
                { this.state.showModal?
                    "":""
                }
                {/*头部导航栏*/}
                <MyNavBar {...navBarProps}/>
                {/*底部标签栏*/}
                <MyTabBar {...tabBarProps}/>
                {
                    data?data.map((item,index)=>{
                       return(
                                <div key={index} className={styles.address}>
                                    <div className={styles.top}>
                                        <div className={styles.iconshop}>
                                            <img src={icon01} />   
                                            {/* <img src={APIHost+item.mer.mer_logo} />    */}

                                        </div>
                                        <p>{item.mer.mer_name}</p>
                                    </div>
                                    {
                                        item.arr?item.arr.map((item,index)=>{
                                            const sid=item.id;
                                            return(
                                                <dl key={index}>
                                                    <dt>
                                                        <img src={APIHost+item.prod_pic} />
                                                    </dt>
                                                    <dd>
                                                        <div className={styles.jieshao}>
                                                            <div style={{display:'flex'}}>
                                                                <h5>{item.prod_name}</h5>
                                                                <button className='delete' onClick={()=>this.btndel(sid)}>删除</button>
                                                            </div>
                                                            
                                                            <p>零售价<label>￥<span>{item.prod_price_yuan}</span></label></p>
                                                            <p>会员价<label>￥<span>{item.prod_price}</span></label></p>
                                                        </div>
                                                        <List.Item
                                                        style={{touchAction:'none'}}
                                                        wrap
                                                        extra={
                                                            <Stepper
                                                            style={{ width: '100%', minWidth: '100px' }}
                                                            showNumber
                                                            max={100}
                                                            min={1}
                                                            value={item.cart_num}
                                                            onChange={(value)=>{this.onChange2(value,index,item,sid)}}
                                                            />}
                                                        >
                                                        </List.Item>
                                                        <div style={{clear:'both'}}></div>
                                                    </dd>
                                                    <div style={{clear:'both'}}></div>
                                                </dl>
                                            )

                                        }):""
                                    }
                                </div>
                        )
                    }):''
                }
                
                <div className={styles.bottom}>
                    <div className={styles.bottop}>
                        <p>待支付<span>{this.state.tt}￥</span></p>
                    </div>
                    <div className={styles.bot}>
                        <p>会员待支付<span>{this.state.hhui}￥</span></p>
                        <Button onClick={()=>this.total()}>结算</Button>
                        <WhiteSpace />
                    </div>
                </div>
            </div>
        )
    }
}