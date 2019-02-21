import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from "./styles/Modifyinfo.less";
import * as Shop from '../services/shop';
import MyNavBar from "../components/MyNavBar";
import icon01 from '../assets/images/tx2.png';
import icon09 from '../assets/images/v.png';
import { Tabs, Icon,InputItem ,List,Toast ,Button,Stepper, Range } from 'antd-mobile';
import { APIHost } from '../utils/fetch';
@connect(state => ({ shop: state.shop }))
export default class Vipacc extends Component {
    state={
        data:''
    }


    async componentDidMount(){
        const result=await Shop.vaccount();
        this.setState({data:result.data})
    }
   
    render(){
        const {history}=this.props;
        const navBarProps = {
            leftVisible:true,
            leftFunc(){
                history.go(-1)
              },
           
            titleName:"vip账号信息",
            rightContent:"",
           
        }   
        const {data}=this.state;  
        return(
            <div className={styles.App}>
            <style>
            {`
            .btn{
                width: 5.38rem;
                margin: auto;
                margin-top:0.86rem;
                margin-bottom:1.41rem;
            }
            .am-button{
                font-size:0.28rem;
                border-radius:0.4rem;
                background:rgba(212,171,106,1);
                color:#fff;
            }
            .am-list-item .am-input-label.am-input-label-5{
                width: 2.5rem;
            }
            `}
            </style>
            {/*头部导航栏*/}
                <MyNavBar {...navBarProps}/>
                <div className={styles.input}>
                            <InputItem
                                placeholder={data.us_vip_time}
                                clear
                                >成为vip时间</InputItem>
                            <InputItem
                                // type="number"
                                placeholder={data.us_vip_end}
                                clear
                               
                                >vip到期时间</InputItem>
                            <InputItem
                               
                                placeholder={data.us_vip_account}
                                clear
                                >vip编号名称</InputItem>                                   
                        </div>
                
            </div>
        )
    }
}