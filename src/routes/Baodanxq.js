import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from "./styles/Baodanxq.less";
import MyNavBar from "../components/MyNavBar";
import MyTabBar from "../components/TabBar";
import * as Shop from '../services/shop';
import { Tabs, Button,InputItem ,List ,TextareaItem, Toast } from 'antd-mobile';
import icon01 from '../assets/images/cm.png';
import v03 from '../assets/images/pp.png';
import v04 from '../assets/images/pp3.png';
var queryString = require('querystring');
@connect(state => ({ shop: state.shop }))
export default class Baodanxq extends Component {
    state={
        data:'',
        status:'',
        res:'',
        valid:''
    }
    async componentDidMount(){
        const {location}=this.props;
        const parse=queryString.parse(location.search.replace("?",""));
        const id=parse.id;
        const res=await Shop.chosto();
        const result=await Shop.baodan({id:id,mer_id:res.data[0].id});
       
        console.log(res.data[0].id,'sssssssssssss999')
        this.setState({status:this.state.data.ord_status,data:result.data,res:res.data})
    }
    //支付
    pay(){
        const {location}=this.props;
        const parse=queryString.parse(location.search.replace("?",""));
        const id=parse.id;
         const {dispatch}=this.props;
        dispatch(routerRedux.push('/Zhifu?id='+id+'&&type='+2))
    }
    //取消订单
    async cancel(){
        // const _this=this;
        const {status}=this.state;
        const {location}=this.props;
        const parse=queryString.parse(location.search.replace("?",""));
        const id=parse.id;
        if(window.confirm('您确定要取消订单吗？')){
            Shop.quxiao({id:id}).then((result)=>{
                if(result.code==1){
                    Toast.success(result.msg,2,()=>{
                        const {dispatch}=this.props;
                        dispatch(routerRedux.push('/Mybaodan'));
                    });
                }else{
                    Toast.offline(result.msg,2)
                }
               
            })
            
        }
    }
    onChanges(v){
        const valid=v.target.value;
        this.setState({valid:valid})    
    }
    //确认收货
    async shou(){
        const {location}=this.props;
        const {valid,res,data}=this.state;
        const parse=queryString.parse(location.search.replace("?",""));
        const id=parse.id;
            Shop.bshouhuo({id:id,mer_id:valid?valid:res[0].id}).then((result)=>{
                if(result.code==0){
                    Toast.offline(result.msg,2)
                    
                }else{
                    Toast.success(result.msg,2);
                    const {dispatch}=this.props;
                    dispatch(routerRedux.push('/Mybaodan'))

                   
                }
    
            })
        
        const result4=await Shop.baodan({id:id});
        this.setState({data:result4.data,});
        
    }
    render(){
        const {history}=this.props;
        const {data,status,res}=this.state;
        const navBarProps = {
            leftVisible: true,
            leftFunc() {
                history.go(-1)
            },
            titleName: "报单详情",
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
                        value={data.addr_name}
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
                        value={data.bao_add_time}
                        disabled
                    ><span>下单时间:</span></InputItem>
                    <InputItem
                        value={data.bao_pay_time}
                        disabled
                        
                    ><span>支付时间:</span></InputItem>
                    <InputItem
                        value={data.bao_finish_time}
                        disabled
                    ><span>完成时间：</span></InputItem>
                    
                </div>
                <div className={styles.proinfo}>
                    <h5>商品信息</h5>       
                    <div className={styles.proname}>
                        <p>{data.prod_name}</p>
                        <div className={styles.jiaqian}>    
                            <span className={styles.num}>x{data.bao_number}</span>
                            <span>￥{data.prod_price}</span>
                        </div>
                    </div>
                </div>
                {
                    data.bao_status==1?<div className={styles.seletc}>
                    <p>选择店铺</p>
                    <select onChange={(v) => this.onChanges(v)}>
                    {
                        res?res.map((item,index)=>{
                            return(
                                <option key={index} value={item.id}>{item.mer_name}</option>
                            )
                            
                        }):''
                    }
                    </select>
                </div>:''
                }
                {
                    data.bao_status==2?<div className={styles.seletc}><p >提货门店</p><p style={{paddingLeft:'0.3rem'}}>{data.mer_name}</p></div>:''
                }
                
                
                <div>
                    {   
                        
                        data.bao_status==0?<div className={styles.conbottom}><Button onClick={()=>this.cancel()}>取消订单</Button>
                            <Button onClick={()=>this.pay()}>支付</Button></div>:data.bao_status==1?<div className={styles.conbottom}><Button onClick={()=>this.shou()} style={{background:'#C48D37',color:'#ffffff',margin:'auto'}}>确认收货</Button>
                           </div>:''
                       
                       
                    }
                </div>
            </div>
            
                
            </div>
        )
    }
}