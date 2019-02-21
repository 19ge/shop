import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Modal, List, Button, WhiteSpace, WingBlank,Toast } from 'antd-mobile';
import MyNavBar from "../components/MyNavBar";
import {loggedIn, loginOut, APIHost} from '../utils/fetch';
import * as Shop from '../services/shop';
import styles from "./styles/Baodanlist.less";
import mine1 from '../assets/images/v01.png';
@connect(state => ({ shop: state.shop }))

export default class Baodanlist extends Component {
    state={
        data:'',
    }
    async componentDidMount(){
        const result=await Shop.mylist();
        this.setState({data:result.data});
        
    }
    baodan(id){
        const {dispatch}=this.props;
        
        // const {data}=this.state;
        // const id=data.
        dispatch(routerRedux.push('/Details2?id='+id))
    }
    render(){
        const {data}=this.state;
        const {history}=this.props;
        const navBarProps = {
            leftVisible: true,
            leftFunc() {
                history.go(-1)
            },
            titleName: "报单列表",
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
                {
                    data?data.map((item,index)=>{
                         return(
                            <dl onClick={()=>this.baodan(item.id)}>
                                <dt>
                                    <img src={APIHost+item.prod_pic} />
                                </dt>
                                <dd>
                                    <h5>{item.prod_name}</h5>
                                    <p>￥{item.prod_price}</p>
                                </dd>
                            </dl>
                         )
                    }):""
                }
                    
                </div>
            </div>
        )
    }
}