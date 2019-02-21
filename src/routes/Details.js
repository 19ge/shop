import React, {Component} from 'react';
import {connect} from 'dva';
import { Button, Modal,Carousel, Toast, WingBlank} from 'antd-mobile';
import {loggedIn, loginOut, APIHost} from '../utils/fetch';
import * as fetch from '../services/shop';
import * as Shop from '../services/shop';
import {routerRedux} from 'dva/router';
import styles from "./styles/Details.less";
import back  from '../assets/images/back.png';
import xq  from '../assets/images/xq.png';

// import {login} from '../utils/fetch';
var queryString = require('querystring');
@connect(state => ({shop: state.shop}))
export default class Details extends Component { 
    state={
        plist:'',
        data:'',
        imgHeight: 10.5+"rem",
    }
    async componentDidMount(){
        const {location}=this.props;
        const parse=queryString.parse(location.search.replace("?",""))
        const result=await Shop.product({id:parse.id});

        this.setState({plist:result.data.logo,data:result.data})
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
        const {plist,data}=this.state;
        const {history}=this.props;
        let value=data.prod_describe?data.prod_describe:"";
        const html=this.htmlspecialchars_decode(value,APIHost);
        return(
            <div className={styles.App}>
                 {/* 样式 */}
                 <style>
                    {`
                    .am-wingblank.am-wingblank-lg{
                        margin:0;
                        height:10.2rem;
                    }
                    .slider-frame,.am-carousel,.slider-list{
                        height:10.2rem !important;
                   }
                    `}
                </style>
                <div className={styles.contentop} >
                    <div className={styles.contimg}>
                        {/* <img src={xq} /> */}
                        <WingBlank>
                        <Carousel
                        autoplay={true}
                        infinite
                        beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                        afterChange={index => console.log('slide to', index)}
                        >
                        { plist?plist.map((item,index) => (
                            <div
                            key={index}
                            style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                            >
                            <img
                                src={APIHost+item}
                                alt=""
                                style={{ width: '100%', verticalAlign: 'top',height:'10.2rem' }}
                            />
                            </div>
                        )):""
                        }
                        </Carousel>
                    </WingBlank>
                    </div>
                    <div className={styles.back}>
                        <img src={back} onClick={()=>history.go(-1)} />  
                    </div>   
                </div>
                <div className={styles.conbot}>
                    <h5>{data.prod_name}</h5>
                    <p>累计销售<span>{data.prod_sales}</span>份</p>
                    <label>{data.prod_price}元/份/包/瓶/桶/袋/个/...</label>
                </div>
                <div className={styles.bottom}>商品详情
                </div>
                <div  dangerouslySetInnerHTML={{
                        __html: html
                        }}>

                </div>
                
            </div>
        )
    }
}