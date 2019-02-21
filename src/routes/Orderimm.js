import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import MyNavBar from "../components/MyNavBar";
import styles from "./styles/Orderimm.less";
import {TextareaItem,List,Radio, Toast} from 'antd-mobile';
import { TabBar } from 'antd-mobile';
import * as Shop from '../services/shop';
import icon01 from '../assets/images/edit.png';
import icon02 from '../assets/images/dui.png';
import icon03 from '../assets/images/dui2.png';
import icon04 from '../assets/images/h.png';
import icon05 from '../assets/images/k.png';
// import { ConnectableObservable } from 'rx';
var queryString = require('querystring');
@connect(state => ({ shop: state.shop }))
export default class Orderimm extends Component {
    state={
        selectedTab: '2',
        selectedTab2: '4',
        hidden: false,
        disabled:true,
        status:1,
        data:'',
        shoplis:'',
        lprice:'' , //零售价
        hprice:'',//会员价
        selectedValue:'',
        yi_id:'',
        num:'',
        shoplis:'',
        yf:'',
        mm:'',
        qq:'',
        info:'',
        value:1,
        val:'',
        datas:[]

    }
    async componentDidMount(){
        const {location} = this.props;
        const parse=queryString.parse(location.search.replace("?",""));
        const result=await Shop.sureorder({id:parse.id});
        const result2=await Shop.addxq();
        const shoplis=result.data?result.data:'';
        console.log(shoplis.length,'shoplis')
        this.setState({shoplis:result.data,data:result2.data?result2.data:'',
        yf:0,value:0
       });
        {
            var lprice=0;
            var hprice=0;
            shoplis?shoplis.map((item,index)=>{
                item.yi_id=0; 
                item.youf=0;
                item.zi_ti=0;
                item.arr?item.arr.map((item,index)=>{
                    lprice+=item.prod_price*item.cart_num;
                    hprice+=item.prod_price_yuan*item.cart_num;
                   
                }):''
            }):''
            
        }
        
        var datas = [
            { value: 0, label: '到店自取',id:0 },
            { value: 1, label: '送货上门',id:1 },
        ];
        this.setState({
            shoplis:shoplis,
            lprice:lprice,
            hprice:hprice,
            datas:datas
        })
       
    }
    btnedit(){
        const {location} = this.props;
        const parse=queryString.parse(location.search.replace("?",""));
        const id=parse.id;
        const {dispatch}=this.props;
        dispatch(routerRedux.push('/Guanliaddress?id='+id));
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
    //选择驿站  
    onChanges(v,mrid) {
        const {shoplis,}=this.state;
        const val=v.target.value;
        this.setState({val:val})
        shoplis.map((itm,ind)=>{
            if(itm.mer_id==mrid){
                itm.yi_id= val
                itm.yi.map((ii,inc)=>{
                    if(ii.id==val){                    
                        itm.youf= ii.send_num
                    }     
                })  
            }
        })
        this.setState({shoplis:shoplis})
        // const {shoplis} = this.state;
        // this.setState({shoplis:shoplis});
        var ll=0;
        var hh=0;
        shoplis?shoplis.map((itm,index)=>{
            ll+=itm.youf,
            hh+=itm.youf,
            itm.arr?itm.arr.map((item,index)=>{
                ll+=item.prod_price*item.cart_num,
                hh+=item.prod_price_yuan*item.cart_num
              
            }):''   
        }):''
        this.setState({
            lprice:ll,
            hprice:hh,

        });
    }
    //确认下单
    async btnxiadan(){
        const {shoplis,yf,data}=this.state; 
        const addrid=data.id;
        const result3=await Shop.queorder({shoplis,addr_id:addrid})
        const id=result3.id;
        if(result3.code==0){
            Toast.offline(result3.msg,2)
        }else{
            Toast.success(result3.msg,2);
            const {dispatch}=this.props; 
            dispatch(routerRedux.push('/Zhifu?id='+id+'&&type='+1))
        }
       
    }
    //单选框
    onChange = (value,mrid,id) => {
        const {shoplis}=this.state;
        shoplis.map((itm,ind)=>{
            if(itm.mer_id==mrid){
                itm.zi_ti=value;
            }
        })  
        this.setState({shoplis:shoplis})  
    };
    render(){
        const RadioItem = Radio.RadioItem;
        const {history,shop}=this.props;
        const {data,shoplis,lprice,hprice,val,datas}=this.state;
        console.log(datas,'datas')
        const navBarProps = {
            leftVisible: true,
            leftFunc() {
                history.go(-1)
            },
            titleName: "立即下单",
            rightContent: "",
            rightFunc() {
                
            }
        }
        const disabled=this.state.disabled;
        const values=shop.mineList;
       
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
                            appearance:none;
                            -moz-appearance:none;
                            -webkit-appearance:none;
                            
                        }
                        select::-ms-expand { display: none; }
                        .youfei{
                            padding-left: 0.25rem;
                            font-size: 0.3rem;
                            height: 0.5rem;
                            line-height: 0.5rem;
                            color: red;
                        }
                        .am-list-item,.am-textarea-control textarea:disabled{
                            background-color: transparent;
                        }
                        textarea{
                            height:0.3rem;
                        }
                        .am-list-item .am-list-line .am-list-content{
                            padding-left: 0.3rem;
                        }
                        `}
                    </style>
             {/*头部导航栏*/}
                <MyNavBar {...navBarProps}/>
                <div className={styles.shdz}  onClick={()=>this.btnedit()}>
                    <div className={styles.top}>
                        <h5>收货地址</h5>
                        <img src={icon01} />
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
                    <div className={styles.proaddress}>
                        <div className={styles.name}>商铺信息</div>
                    </div>
                    { 
                        shoplis?shoplis.map((item,index)=>{
                         
                            const names=item.mer;
                            const oplist=item.yi;
                            const priceArr=item.arr;
                            const mrid=item.mer_id;

                            // const pricel=priceArr.prod_price;
                            // const hprice=priceArr.prod_price_yuan;
                            return(
                                <div key={index} className={styles.shoplist} onClick={()=>this.btnkai()}>
                                    <h5>{names.mer_name}</h5>
                                    <div className={styles.way}>请选择提货方式</div>
                                    <select className={styles.xiala} 
                                    onChange={(v) => this.onChanges(v,mrid,item,index)}
                                    >
                                        {
                                            oplist?oplist.map((itm,indexa)=>{   
                                                return(   
                                                    <option key={indexa} value={itm.id}>{itm.sta_name}</option>
                                                )
                                            }):''
                                        }
                                    </select>
                                    <div className='youfei'>邮费：
                                    {item.youf}
                                    
                                    </div>                                
                                    {/* {
                                        status==1?<img src={icon04} />:<img src={icon05} />
                                    }   */}
                                    {
                                        item.yi_id!=0?<List>
                                        {
                                            datas.map(i => (
                                                <RadioItem key={i.value} checked={item.zi_ti === i.value} onChange={() => this.onChange(i.value,mrid,i.id)}>
                                                    {i.label}
                                                </RadioItem>
                                                ))
                                        }
                                        </List>:''
                                    }
                                     
                                </div>
                            )
                        }):''

                    }
                </div>
                <div className={styles.bottom}>
                    <div className={styles.money}>
                        <p>
                            {
                                values.us_level>=1?<div>会员支付￥<span>{lprice}</span></div>:<div>/ 零售价<span>{hprice}</span>￥</div>
                            }
                        </p>
                    </div>
                    <div className={styles.xiadan} onClick={()=>this.btnxiadan()}>确认下单</div>
                </div> 
            </div>
        )
    }
}