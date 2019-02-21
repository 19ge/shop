import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from "./styles/Orderinfo.less";
import MyNavBar from "../components/MyNavBar";
import MyTabBar from "../components/TabBar";
import * as Shop from '../services/shop';
import { Tabs, Button,InputItem ,List ,TextareaItem, Toast } from 'antd-mobile';
import icon01 from '../assets/images/cm.png';
import v03 from '../assets/images/pp.png';
import v04 from '../assets/images/pp3.png';
var queryString = require('querystring');
@connect(state => ({ shop: state.shop }))
export default class Orderinfo extends Component {
    state={
        data:'',
        status:''
    }
    async componentDidMount(){
        const {location}=this.props;
        const parse=queryString.parse(location.search.replace("?",""));
        const id=parse.id;
        const result=await Shop.orderxq({id:id});
       
        this.setState({data:result.data})
        this.setState({status:this.state.data.ord_status})
    }
    //支付
    pay(){
        const {location}=this.props;
        const parse=queryString.parse(location.search.replace("?",""));
        const id=parse.id;
        const {dispatch}=this.props;
        dispatch(routerRedux.push('/Zhifu?id='+id+'&&type='+1))
    }
    //取消订单
    async cancel(){
        // const _this=this;
        const {status}=this.state;
        const {location}=this.props;
        const parse=queryString.parse(location.search.replace("?",""));
        const id=parse.id;
        
        if(window.confirm('您确定要取消订单吗？')){
            Shop.cancelorder({id:id}).then((result)=>{
                if(result.code==1){
                    Toast.success(result.msg,2,()=>{
                        const {dispatch}=this.props;
                        dispatch(routerRedux.push('/Myorder'));
                    });
                }else{
                    Toast.offline(result.msg,2)
                }
               
            })
            
        }
    }
    //确认收货
    shou(){
        const {location}=this.props;
        const parse=queryString.parse(location.search.replace("?",""));
        const id=parse.id;
        Shop.shouhuo({id:id}).then((result)=>{
            if(result.code==0){
                Toast.offline(result.msg,2)
            }else{
                Toast.success(result.msg,2,()=>{
                    const {dispatch}=this.props;
                    dispatch(routerRedux.push('/Myorder'))
                })
            }

        })
    }
    //删除订单
    del(){
        const {location}=this.props;
        const parse=queryString.parse(location.search.replace("?",""));
        const id=parse.id;
        Shop.delorder({id:id}).then((result)=>{
            if(result.code==0){
                Toast.offline(result.msg,2)
            }else{
                Toast.success(result.msg,2,()=>{
                    const {dispatch}=this.props;
                    dispatch(routerRedux.push('/Myorder'))
                })
            }

        })
    }
    //再来一单
    zai(){
        const {data}=this.state;
        const id=data.mer_id;
        const {dispatch}=this.props;
        dispatch(routerRedux.push('/Choiceshop?id='+id))
        
    }
    render(){
        const {history}=this.props;
        const {data,status}=this.state;
        const navBarProps = {
            leftVisible: true,
            leftFunc() {
                history.go(-1)
            },
            titleName: "订单详情",
            rightContent: "",
            rightFunc() {
                
            }
        }
        return(
            <div className={styles.App}>
            <style>
                {`
                .am-list-item .am-input-label{
                    font-size: 0.26rem;
                }
                .am-list-item .am-input-control{
                    font-size: 0.26rem;
                }
                .am-textarea-label{
                    font-size: 0.26rem;
                }
                .am-list-item.am-input-item{
                    height: 0.6rem;
                    padding-left: 0;
                }
                .am-textarea-control textarea{
                    font-size: 0.26rem;
                }
                .am-list-item{
                    min-height: 0.6rem;
                    padding-left: 0;
                }
                .am-list-item .am-input-label.am-input-label-5{
                    width:1.7rem;
                }
                .am-list-item .am-input-control input:disabled,.am-textarea-control textarea:disabled{
                    color:#2A2A2A;
                }
                .am-list-item.am-input-disabled .am-input-label,.am-textarea-disabled .am-textarea-label{
                    color:#6B6B6B;
                }
                .am-button{
                    width: 1.44rem;
                    line-height: 0.58rem;
                    height: 0.58rem;
                    font-size: 0.26rem;
                    color: #2A2A2A;
                    border-radius:0.06rem;
                }
                `}
            </style>
            {/*头部导航栏*/}
            <MyNavBar {...navBarProps}/>
            <div className={styles.content}>
                <div className={styles.userinfo}>
                    <h5>用户信息</h5>
                    <InputItem
                        value={data.mer_name}
                        disabled
                        
                    ><span style={{letterSpacing:'0.2rem'}}>姓 名:</span></InputItem>
                    <InputItem
                        value={data.addr_tel}
                        disabled
                    ><span style={{letterSpacing:'0.2rem'}}>电 话:</span></InputItem>
                    <TextareaItem
                        title="收货地址 ："
                        value={data.addr_stree}
                        data-seed="logId"
                        disabled
                        autoHeight
                    />
                    <TextareaItem
                        title="详细地址 ："
                        value={data.addr_detail}
                        data-seed="logId"
                        disabled
                        autoHeight
                    />
                </div>
                <div className={styles.userinfo}>
                    <h5>订单信息</h5>
                    <InputItem
                        value={data.ord_number}
                        disabled
                        
                    ><span>订单编号:</span></InputItem>
                    <InputItem
                        value={data.ord_add_time}
                        disabled
                    ><span>下单时间:</span></InputItem>
                    <InputItem
                        value="2018-12-12 12:56"
                        disabled
                        
                    ><span>支付时间:</span></InputItem>
                    <InputItem
                        value="2018-12-12 12:56"
                        disabled
                    ><span>完成时间：</span></InputItem>
                    
                </div>
                <div className={styles.proinfo}>
                    <h5>商品信息</h5>
                    {
                        data.det?data.det.map((item,index)=>{
                             return(
                                    <div className={styles.proname}>
                                        <p>{item.prod_name}</p>
                                        <div className={styles.jiaqian}>    
                                            <span className={styles.num}>x{item.det_num}</span>
                                            <span>￥{item.det_price}</span>
                                        </div>
                                    </div>
                             )
                        }):''
                    }
                    
                    {/* <div className={styles.promoney}>
                        <div className={styles.yunfei}>
                            <p>运费</p>
                            <p className={styles.nummon}>-￥0.00</p>
                        </div>
                        <div className={styles.yunfei}>
                            <p>零售价</p>
                            <p className={styles.nummon}>￥5000</p>
                        </div>
                        <div className={styles.yunfei}>
                            <p style={{color:'#FF0101'}}>会员价</p>
                            <p className={styles.nummon} style={{fontWeight:'bold'}}>￥4600</p>
                        </div>
                    </div>      */}
                </div>
                <div>
                    {      
                        status==0?<div className={styles.conbottom}><Button onClick={()=>this.cancel()}>取消订单</Button>
                        <Button onClick={()=>this.pay()}>支付</Button></div>:status==1?<div className={styles.conbottom}><Button onClick={()=>this.shou()} style={{background:'#C48D37',color:'#ffffff',margin:'auto'}}>确认收货</Button>
                        </div>:status==2?<div className={styles.conbottom}><Button onClick={()=>this.del()}>删除订单</Button><Button onClick={()=>this.zai()}>再来一单</Button>
                        </div>:''    
                    }
                </div>
                </div>
            
                
            </div>
        )
    }
}