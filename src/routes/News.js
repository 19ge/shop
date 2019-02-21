import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from "./styles/News.less";
import * as Shop from '../services/shop';
import MyNavBar from "../components/MyNavBar";
import icon01 from '../assets/images/b.png';
import InfiniteScroll from 'react-infinite-scroller';

@connect(state => ({ shop: state.shop }))

export default class News extends Component {
    // async componentDidMount(){
    //     const result=await Shop.gonggao();
    //     console.log(result.data,'result')
    // }
        //加载更多的方法,写法固定,只需替换变量名
        loadFunc(e){
            const {dispatch,shop}=this.props;
            let hasMore=shop.pagination.hasMore; // 是否加载更多 ture/false
        let page = shop.pagination.current_page * 1 + 1;
            dispatch({
            type:"shop/tixianjl",     //方法
            payload:{       //参数
                is_hot:true,
                // size:12,
                page
            }
            })
        }
    render(){
        const {history,dispatch,shop}=this.props;
        let hasMore=shop.pagination.hasMore; // 是否加载更多 ture/false
        const navBarProps = {
            leftVisible:true,
            leftFunc(){
                history.go(-1)
              },
           
            titleName:"系统公告",
            rightContent:"",
            rightFunc(){
            }
        }
        const ginfo=shop.gongList;
        // console.log(ginfo,'ginfo')
        return(
            <div className={styles.App}>
                <style>
                    {`
                    .am-navbar{
                        background:#fff !important;
                    }
                    `}
                </style>
                {/*头部导航栏*/}
                <MyNavBar {...navBarProps}/>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={(e)=>this.loadFunc(e)}
                    hasMore={hasMore}
                    threshold={100}
                    loader={<div className="loader" style={{fontSize:".28rem",lineHeight:".86rem",textAlign:"center",marginBottom:".3rem"}} key={0}>加载中
                    ...</div>}
                    >
                    <div className={styles.content}>
                        {
                            ginfo?ginfo.map((item,index)=>{
                                return(
                                        <div onClick={()=>history.push('/Newsdetail?id='+item.id)} className={styles.card}>
                                            <div className={styles.title}>
                                                {/* <div className={styles.radio}></div> */}
                                                <h5>{item.me_title}</h5>
                                            </div>
                                            <div className={styles.time}>{item.me_add_time}</div>
                                            <p>{item.me_introduction}</p>
                                        </div>
                                )
                            }):''
                        }
                        
                    </div>
                </InfiniteScroll>
            </div>
        )
    }
}