import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from "./styles/Newsdetail.less";
import * as Shop from '../services/shop';
import MyNavBar from "../components/MyNavBar";
import icon01 from '../assets/images/b.png';
import {loggedIn, loginOut, APIHost} from '../utils/fetch';
var queryString = require('querystring');
@connect(state => ({ shop: state.shop }))
export default class Newsdetail extends Component {
    state={
        data:'',
    }
    async componentDidMount(){
        const {location} = this.props;
        const parse=queryString.parse(location.search.replace("?",""));
        const id=parse.id;
        const result=await Shop.xwgg({id:id});
        this.setState({
            data:result.data,
        })
        
        // console.log(result.data,'xwgg')
    }
    //处理富文本
    htmlspecialchars_decode(str, APIHost){
        str = str.replace(/&amp;/g, '&');
        str = str.replace(/&lt;/g, '<');
        str = str.replace(/&gt;/g, '>');
        str = str.replace(/&quot;/g, '"');
        str = str.replace(/&#039;/g, "'");
        str = str.replace(/\/ueditor/g,APIHost+'/ueditor' );
        return str;
    }
    render(){
        const {data}=this.state;
        const {history,dispatch,shopData}=this.props;
        let value=data.me_content?data.me_content:"";
        const html=this.htmlspecialchars_decode(value,APIHost);
        const navBarProps = {
            leftVisible:true,
            leftFunc(){
                history.go(-1)
              },
           
            titleName:"公告详情",
            rightContent:"",
            rightFunc(){
            }
        }
        return(
            <div className={styles.App}>
                <style>
                    {`
                    .am-navbar{
                        background:#fff !important;
                    }`}
                </style>
                {/*头部导航栏*/}
                <MyNavBar {...navBarProps}/>
                <div className={styles.content}>
                    <div className={styles.card}>
                        <div className={styles.title}>
                            <h5>{data.me_title}</h5>
                        </div>
                        <div className={styles.time}>{data.me_add_time}</div>
                        <p>
                            <div
                            dangerouslySetInnerHTML={{
                                __html: html
                                }}
                            >
                            </div>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}