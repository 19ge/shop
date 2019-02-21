import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Modal, List, Button, WhiteSpace, WingBlank,Toast } from 'antd-mobile';
import MyTabBar from "../components/TabBar";
import {loggedIn, loginOut, APIHost} from '../utils/fetch';
import * as Shop from '../services/shop';
import JsBarcode from 'jsbarcode';
import styles from "./styles/Personal.less";
import mine1 from '../assets/images/mine.png';
import mine01 from '../assets/images/t.png';
import mine02 from '../assets/images/pb.png';
import mine03 from '../assets/images/t1.png';
import mine04 from '../assets/images/t2.png';
import mine05 from '../assets/images/t3.png';
import mine06 from '../assets/images/x1.png';
import mine07 from '../assets/images/x2.png';
import mine08 from '../assets/images/x3.png';
import mine09 from '../assets/images/x4.png';
import gift from '../assets/images/x5.png';
import x6 from '../assets/images/x6.png';
import x7 from '../assets/images/x7.png';
import x8 from '../assets/images/xx.png';
import x9 from '../assets/images/dd.png';

@connect(state => ({ shop: state.shop }))





export default class Personal extends Component {
       
     // 构造函数
     constructor(props) {
        
        super(props);
        this.state = {
            selectedTabBar: "mine",
            value: props.barCode, //由父组件传入用来生成条形码的字符串“barCode”  ,
            mineInfo:'',
            check:0,
        }
        
    }
    async componentDidMount() {
        const result=await Shop.mine();
        this.setState({mineInfo:result.data,value:result.data.us_vip_account})
         if(result.data.us_is_vip==1){
             // 调用 JsBarcode方法生成条形码
            JsBarcode(this.barcode, this.state.value, {
                // format: "CODE39",
                displayValue: false,
                width: 1.5,
                height: 50,
                margin: 0,
                
            });
         }else{
             
         }
　　
        
    }
    UNSAFE_componentWillMount(){
        const { dispatch } = this.props;
        const user = loggedIn();
        console.log(user,'qqqqqqq')
        if(!user){
          dispatch(routerRedux.push('/login'));
        }
    }
    //雅虎赏金
    btnReward(){		
		const{dispatch}=this.props;
		dispatch(routerRedux.push('/Reward'));
    }
  

     //退出登录
    btnout(){
        const {dispatch}=this.props;
        loginOut()
       dispatch(
         routerRedux.push('/login')
       )
   }
   //邀请新用户
   newperson(){
    const{dispatch,shop}=this.props;
    const {mineInfo}=this.state;
    // const mineInfo=shop.mineList;
    // console.log(mineInfo,'ssssssssssssssssss')
    // const level=mineInfo.us_level;
    const usevip=mineInfo.us_vip_account;
    if(mineInfo.us_level){
        dispatch(routerRedux.push('/Newuser?vip='+usevip));
    }else{
        Toast.offline('您还不是贵宾用户',2)
    }
   }

    //代理商申请
    async agent(){
        const result=await Shop.isdian();
        const{dispatch}=this.props;
        
        if(result.code==1){
            dispatch(routerRedux.push('/Isapply'));
        }else{
            dispatch(routerRedux.push('/Agent'));
        }
        
    }
    //我的钱包
    wallet(){
        const{dispatch}=this.props;
        dispatch(routerRedux.push('/Mywallet'));
    }
    //报单列表
    baodanlist(){
        const{dispatch}=this.props;
        dispatch(routerRedux.push('/Baodanlist'));
    }
    //我的报单
    baodan(){
        const{dispatch}=this.props;
        dispatch(routerRedux.push('/Mybaodan'));
    }
    //提现
    tixain(){
        const{dispatch}=this.props;
        dispatch(routerRedux.push('/Cash'));
    }
    //提现
    mingxi(){
        const{dispatch}=this.props;
        dispatch(routerRedux.push('/Incomedetail'));
    }
     //收货地址
     shouhuo(){
        const{dispatch}=this.props;
        dispatch(routerRedux.push('/Guanliaddress'));
    }
    //收货地址
    shezhi(){
        const{dispatch}=this.props;
        dispatch(routerRedux.push('/Shezhi'));
    }
  
	render(){
        const {history,dispatch,shop}=this.props;
        const {mineInfo}=this.state;
		const tabBarProps = {
            selectedTabBar: this.state.selectedTabBar,
            history
        }
        const Item = List.Item;
        // const mineInfo=shop.mineList;

        const level=mineInfo.level;
        const l=level?level:'';
        // console.log(mineInfo,'ppppppppp123')
		return(
			<div className={styles.App}>  
			{/* 样式 */}
                <style>
                    {`
                   .am-list-item .am-list-line .am-list-content{
                        color: #151413;
                        font-size: 0.28rem;
                    }
                    .am-list-item .am-list-line .am-list-extra{
                        color: #878581;
                        font-size: 0.26rem;
                    }
                    .am-list-item{
                        padding-left: 0rem;
                        margin-left: 0.3rem;
                        margin-right: 0.3rem;
                        border-bottom: 0.02rem solid #EAEAEA;
                        min-height:1rem;
                        height:1rem;
                    }
                    .am-list-item .am-list-line{
                        padding-right:0;
                    }
                    .am-list-item img{
                        width: 0.43rem;
                        height: 0.41rem;
                    }
                    .barcode-box{
                      
                    }
                    .barcode-box svg{
                        width:4.5rem;
                        height:1.6rem;
                    }
                    .tiao{
                        position: relative;
                        top: -0.6rem;
                    }
                    .num{
                        text-align: center;
                        font-size: 0.3rem;
                        font-weight: bold;
                    }
                    `}
                </style>
                {/*底部标签栏*/}
                <MyTabBar {...tabBarProps}/>
                <div className={styles.topimg}>
                    <dl>
                        <dt>
                            <img src={APIHost+mineInfo.us_head_pic} alt=""/>
                        </dt>
                        <dd>
                            <div className={styles.left}>
                                <p className={styles.name}>
                                    <span>{mineInfo.us_account}</span>
                                </p>
                                <p className={styles.jianjie}>{l}</p>
                            </div>
                            {/* <div className={styles.right}>
                                <img src={mine02} />
                            </div> */}
                        </dd>
                        <div style={{clear:'both'}}></div>
                    </dl>
                    <div className='tiao'>
                        <div className="barcode-box">
                            <svg
                                ref={(ref) => {
                                this.barcode = ref;
                                }}
                            />
                        </div>
                        <div className='num'>{mineInfo.us_vip_account}</div>
                    </div>
                    

                </div>
                <div className={styles.topimg2}>
                    <List className="my-list" onClick={()=>history.push('/Myorder')}>
                        <Item extra="查看全部订单" arrow="horizontal" onClick={() => {}}>全部订单</Item>
                    </List>
                    <div className={styles.notices}>
                        <dl onClick={()=>history.push('/Myorder?index='+1)}>
                            <dt>
                                <div>
                                    <img src={mine03} />
                                </div>  
                            </dt>
                            <dd>未支付</dd>
                        </dl>
                        <dl onClick={()=>history.push('/Myorder?index='+2)}>
                            <dt>
                                <div>
                                    <img src={mine04} />
                                </div>
                                
                            </dt>
                            <dd>已支付</dd>
                        </dl>
                        <dl onClick={()=>history.push('/Myorder?index='+3)}>
                            <dt>
                                <div>
                                    <img src={mine05} />
                                </div>
                                
                            </dt>
                            <dd>已完成</dd>
                        </dl>
                    </div>  
                </div>
                <div className={styles.conbox}>
                <List>
                    <Item
                    thumb={<img src={mine06} />}
                    arrow="horizontal"
                    onClick={() =>this.newperson()}
                    >邀请新用户</Item>
                    <Item
                    thumb={<img src={mine07} />}
                    onClick={() =>this.agent()}
                    arrow="horizontal"
                    >
                    申请联盟商家
                    </Item>
                    <Item
                    thumb={<img src={mine08} />}
                    onClick={() =>this.wallet() }
                    arrow="horizontal"
                    >
                    我的钱包
                    </Item>
                    <Item
                    thumb={<img src={x9} />}
                    onClick={() =>this.baodanlist() }
                    arrow="horizontal"
                    >
                    报单列表
                    </Item>
                    <Item
                    thumb={<img src={x8} />}
                    onClick={() =>this.baodan() }
                    arrow="horizontal"
                    >
                    我的报单
                    </Item>
                    <Item
                    thumb={<img src={mine09} />}
                    onClick={() =>this.tixain() }
                    arrow="horizontal"
                    >
                    提现
                    </Item>
                    <Item
                    thumb={<img src={gift} />}
                    onClick={() => this.mingxi()}
                    arrow="horizontal"
                    >
                    奖金明细
                    </Item>
                    <Item
                    thumb={<img src={x6} />}
                    onClick={() => this.shouhuo()}
                    arrow="horizontal"
                    >
                    收货地址
                    </Item>
                    <Item
                    thumb={<img src={x7} />}
                    onClick={() =>this.shezhi() }
                    arrow="horizontal"
                    >
                    设置
                    </Item>
                </List>
                </div>     
            </div>
			
		)
    }
}