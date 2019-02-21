import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import MyNavBar from "../components/MyNavBar";
import styles from "./styles/Lijixiadan.less";
import {TextareaItem,List,Accordion, Toast} from 'antd-mobile';
import { TabBar } from 'antd-mobile';
import * as Shop from '../services/shop';
import icon01 from '../assets/images/edit.png';
import icon02 from '../assets/images/dui.png';
import icon03 from '../assets/images/dui2.png';
import icon04 from '../assets/images/h.png';
import icon05 from '../assets/images/k.png';
import { APIHost } from '../utils/fetch';
import { Item } from '_antd-mobile@2.2.6@antd-mobile/lib/tab-bar';
var queryString = require('querystring');
@connect(state => ({ shop: state.shop }))
export default class Lijixiadan extends Component {
    state={
        selectedTab: '2',
        selectedTab2: '4',
        hidden: false,
        disabled:true,
        status:1,
        data:'',
        data2:'',
        shoplis:'',
        lprice:'' , //零售价
        hprice:'',//会员价
        selectedValue:'',
        yi_id:''

    }
    async componentDidMount(){
        const {location} = this.props;
        const parse=queryString.parse(location.search.replace("?",""));
        // const result=await Shop.sureorder({id:parse.id});
        // const shoplis=result.data;
        const result=await Shop.product({id:parse.id});
        const result2=await Shop.addxq();
        
        this.setState({data:result2.data?result2.data:'',data2:result.data});
        // {
        //     var lprice=0;
        //     var hprice=0;
        //     shoplis?shoplis.map((item,index)=>{
        //         item.yi_id=item.yi[0].id  
        //         item.arr?item.arr.map((item,index)=>{
        //             lprice+=item.prod.prod_price*item.cart_num;
        //             hprice+=item.prod.prod_price_yuan*item.cart_num;
        //             this.setState({
        //                 lprice:lprice,
        //                 hprice:hprice,

        //             })
        //         }):''
        //     }):''
        //     console.log(shoplis,'sssssssssssssss')
        // }
       
    }
    btnedit(){
        // this.setState({
        //     disabled:false
        // })
        const {location} = this.props;
        const parse=queryString.parse(location.search.replace("?",""));
        const id=parse.id;
        const {dispatch}=this.props;
        dispatch(routerRedux.push('/Guanliaddress'));
    }
    btnkai(){
        
        const {status}=this.state;
        if(status==1){
            this.setState({
                status:0
            })
        }else{
            this.setState({
                status:1
            })
        }  
    }
    //select  
    onChanges(v,mrid) {
        // console.log(v.target, '999999999999999666666')
        const { dispatch, shop } = this.props;
        const {selectedValue,shoplis} = this.state
        const number=v.target.value*1;
        // shoplis.map((item,index)=>{
        //     if(item.mer_id==mrid){
        //         item.yi_id=number;
        //     }
        // })

        // console.log(number,'selectedValue');

        // this.setState({shoplis:shoplis});
        // console.log(this.state.selectedValue,'selectedValue555555555555');
        
    }
    //确认下单
    async btnxiadan(){
        const {selectedValue,data2,data}=this.state;
        // shoplis.map((item,index)=>{
        //     item.yi_id=selectedValue
        // })
        const prodid=data2.id;
        const addrid=data.id;
        const result3=await Shop.queren({prod_id:prodid,addr_id:addrid})
        const id=result3.id;
        const {dispatch}=this.props; 
        if(result3.code==0){
            Toast.offline(result3.msg,2)
        }else{
            dispatch(routerRedux.push('/Zhifu?id='+id+'&&type='+2))
        }
        
    }
    render(){
        const {history,shop}=this.props;
        const {status,data,shoplis,data2,hprice}=this.state;
        console.log(shoplis,'shoplis')
        const navBarProps = {
            leftVisible: true,
            leftFunc() {
                history.go(-1)
            },
            titleName: "提交订单",
            rightContent: "",
            rightFunc() {
                
            }
        }

        const disabled=this.state.disabled;
        const displayblock={
            display:'block'
        }
        const displaynone={
            display:'none'
        }
        const value=shop.mineList;
        // console.log(value,'vvvvvvvvvvvvvv')

        return(
            <div className={styles.App}>
                <style>
                        {`
                        .am-navbar{
                            background: #E2E2E2 !important;
                        }
                        .am-list-item{
                            padding-left: 0;
                            min-height: 0.55rem;
                        }
                        .am-textarea-control{
                            padding:0;
                        }
                        .am-textarea-control textarea{
                            font-size:0.24rem;
                            color:#1B1A18;
                            line-height: 0.3rem;
                        }
                        .am-tab-bar-bar{
                            height:1.82rem;
                            flex-direction:column;
                        }
                        .am-tab-bar-tab{
                            border-bottom: 1px solid #E8E8E8;
                        }
                        .am-tab-bar-tab,.am-tab-bar-bar .am-tab-bar-tab{
                            height:0.91rem;
                           
                        }
                        .am-tabs{
                            flex-direction:column;
                        }
                        .am-tab-bar-bar .am-tab-bar-tab{
                            flex-direction:row;
                        }
                        .am-tab-bar-bar .am-tab-bar-tab-icon{
                            position: absolute;
                            right: 0.27rem;
                        }
                        .am-tab-bar-bar .am-tab-bar-tab-title{
                            position: absolute;
                            left: 0.27rem;
                            color:#2F2E2C;
                            font-size:0.26rem;
                        }
                        .kuaidi{
                            font-size:0.22rem;
                            color:#FF6464;
                            padding-top: 0.13rem;
                            padding-left: 0.24rem;
                        }
                        select{
                            width: 100%;
                            height: 0.9rem;
                            font-size: 0.3rem;
                            padding-left: 0.25rem;
                        }
                        .am-list-item,.am-textarea-control textarea:disabled{
                            background: transparent;
                        }
                        `}
                    </style>
             {/*头部导航栏*/}
                <MyNavBar {...navBarProps}/>
                <div className={styles.shdz}>
                    <div className={styles.top}>
                        <h5>收货地址</h5>
                        <img src={icon01} onClick={()=>this.btnedit()}/>
                    </div>
                    <div style={{clear:'both'}}></div>
                    <div className={styles.address}>
                        <TextareaItem
                            placeholder={data.addr_stree}
                            data-seed="logId"
                            ref={el => this.autoFocusInst = el}
                            autoHeight
                            disabled={disabled}
                        />
                    </div>
                </div>
                <div className={styles.spdz}>
                    {/* <div className={styles.proaddress}>
                        <div className={styles.name}>商铺信息</div>
                    </div> */}
                    <dl>
                        <dt>
                            <img src={APIHost+data2.prod_pic} />
                        </dt>
                        <dd>
                            <h5>{data2.prod_name}</h5>
                            <p>￥{data2.prod_price}</p>
                        </dd>
                    </dl>
                    <div style={{height:'0.2rem',background:'white'}}></div>
                    
                </div>
                <div className={styles.bottom}>
                    <div className={styles.money}>
                        <p>   
                            <div>实际支付<span>{data2.prod_price}</span>￥</div>   
                        </p>
                        
                    </div>
                    <div className={styles.xiadan} onClick={()=>this.btnxiadan()}>确认下单</div>
                </div>
                
             
            </div>
        )
    }
}