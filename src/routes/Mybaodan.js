import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Modal, List, Button, WhiteSpace, WingBlank,Toast } from 'antd-mobile';
import MyNavBar from "../components/MyNavBar";
import {loggedIn, loginOut, APIHost} from '../utils/fetch';
import * as Shop from '../services/shop';
import styles from "./styles/Mybaodan.less";
import mine1 from '../assets/images/v01.png';
@connect(state => ({ shop: state.shop }))

export default class Mybaodan extends Component {
    state={
        data:'',
    }
    async componentDidMount(){
        const result=await Shop.mybao();
        this.setState({data:result.data})
    }
    bdxq(id){
        const{dispatch}=this.props;
        dispatch(routerRedux.push('/Baodanxq?id='+id));
    }
    render(){
        const {data}=this.state;
        const {history}=this.props;
        const navBarProps = {
            leftVisible: true,
            leftFunc() {
                history.push('/Personal')
            },
            titleName: "我的报单",
            rightContent: "",
            rightFunc() {
                
            }
        }
        return(
            
            <div className={styles.App}>
            {/*头部导航栏*/}
            <MyNavBar {...navBarProps}/>
                <div className={styles.height}></div>
                <div className={styles.content}>
                    <div className={styles.list}>
                    {
                        data?data.map((item,index)=>{
                            return(
                                <div>
                                    <dl onClick={()=>this.bdxq(item.id)}>
                                        <dt>
                                            <img src={APIHost+item.prod_pic} />
                                        </dt>
                                        <dd>
                                            <h5>{item.prod_name}</h5>
                                            <p>{item.bao_status==0?'待付款':item.bao_status==1?'已付款':item.bao_status==3?'已取消':item.bao_status==2?'已收货':''}</p>
                                        </dd>
                                    </dl>
                                    <div className={styles.fukuan}>
                                        <p>实付款：<span>￥{item.prod_price}</span></p>
                                    </div>
                                </div>   
                            )
                        }):""
                    }
                        
                    </div>
                    
                </div>
            </div>
        )
    }
}