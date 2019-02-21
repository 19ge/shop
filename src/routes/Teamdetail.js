import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from "./styles/Teamdetail.less";
import MyNavBar from "../components/MyNavBar";
import * as Shop from '../services/shop';
import { Tabs, Button,Stepper ,List ,WhiteSpace} from 'antd-mobile';
import icon01 from '../assets/images/t.png';
import v03 from '../assets/images/yy.png';
import { APIHost } from '../utils/fetch';
var queryString = require('querystring');
@connect(state => ({ shop: state.shop }))
export default class Teamdetail extends Component {
    state={
        data:'',
    }
    async componentDidMount(){
        const {location}=this.props;
        const parse=queryString.parse(location.search.replace("?",""));
        const result=await Shop.youinfo({id:parse.id});
        
        this.setState({
            data:result.data,
        })
        // console.log(result.data,'resultdata')

    }
    render(){
        const {history,dispatch,shopData}=this.props;
        const {data}=this.state;
        // const {dispatch}=this.props;
        const navBarProps = {
            leftVisible:true,
            leftFunc(){
                history.push('/Myteam')
            },
           
            titleName:"好友详情",
            rightContent:"",
            rightFunc(){
            }
        }
        return(
            <div className={styles.App}>
            {/*头部导航栏*/}
            <MyNavBar {...navBarProps}/>
                <div className={styles.content}>
                    <div className={styles.touxiang}>
                        <img src={APIHost+data.us_head_pic} />
                    </div>
                    <div className={styles.message}>
                        <div className={styles.conone}>
                            <p>账户</p>
                            <p>{data.us_account}</p>
                        </div>
                        {/* <div className={styles.conone}>
                            <p>姓名</p>
                            <p>{data.us_real_name}</p>
                        </div> */}
                        <div className={styles.conone}>
                            <p>身份证</p>
                            <p>{data.us_card_id}</p>
                        </div>
                        <div className={styles.conone}>
                            <p>手机号</p>
                            <p>{data.us_tel}</p>
                        </div>
                    </div>         
                </div>
            </div>
        )
    }
}