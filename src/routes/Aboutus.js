import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from "./styles/Aboutus.less";
import {loggedIn, loginOut, APIHost} from '../utils/fetch';
import * as Shop from '../services/shop';
import MyNavBar from "../components/MyNavBar";
import icon01 from '../assets/images/b.png';
@connect(state => ({ shop: state.shop }))
export default class Aboutus extends Component {
    state={
        data:'',
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

    
    async componentDidMount(){
       const result=await Shop.aboutus();
       this.setState({
           data:result.data,
       });
       console.log(result.data,'result');
    }
    render(){
        const {data}=this.state;
        let value=data?data:"";
        const html=this.htmlspecialchars_decode(value,APIHost);
        const {history,dispatch,shopData}=this.props;
       
        const navBarProps = {
            leftVisible:true,
            leftFunc(){
                history.go(-1)
              },
           
            titleName:"关于我们",
            rightContent:"",
            rightFunc(){
            }
        }
        return(
            <div className={styles.App}>
                {/*头部导航栏*/}
                <MyNavBar {...navBarProps}/>
                <div className={styles.text}>
                    <p dangerouslySetInnerHTML={{
                        __html: `${html}`
                        }}
                    ></p>
                </div>
            </div>
        )
    }
}