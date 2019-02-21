import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from "./styles/Incomedetail.less";
import MyNavBar from "../components/MyNavBar";
import MyTabBar from "../components/TabBar";
import * as Shop from '../services/shop';
import { Tabs, Button,Stepper ,Toast ,WhiteSpace,PullToRefresh} from 'antd-mobile';
import InfiniteScroll from 'react-infinite-scroller';
import icon01 from '../assets/images/t.png';
import * as fetch from '../services/shop';
import v03 from '../assets/images/yy.png';
@connect(state => ({ shop: state.shop }))
export default class Incomedetail extends Component {
    
        state = {
            selectedTabBar: "team",
            val: 0,
            checked:1,
            data:'',
            m1:'',
            m0:'',
            rewardinfo:'', 
            type:'', 
            data:''
           
        }   
        async componentDidMount(){
            const result=await Shop.rname();
            this.setState({data:result.data})
        }
   
    

    async getGoodsListOfClass(item,index){
        const {history,dispatch,shop}=this.props;
        const type=index;
        this.setState({type:type})
        dispatch({
            type: "shop/getUser",     //方法
            payload: {       //参数
                infoList: [],
                pagination: {
                    current_page: 0,
                    last_page: 1,
                    per_page: 0,
                    total: 0,
                    hasMore: false
                }
            }
        })
        const page = 1;
        dispatch({
            type: "shop/jiangjin",     //方法
            payload: {       //参数
                page,
                type:type
                
            }
        })        
    }  
    //加载更多的方法,写法固定,只需替换变量名
    loadFunc(e){
        const {type}=this.state;
        const {dispatch,shop}=this.props;
        let page = shop.pagination.current_page * 1 + 1;
        dispatch({
        type:"shop/jiangjin",     //方法
        payload:{       //参数
            page,
            type:type
        }
        })
    }  
    render(){
        const {history,dispatch,shop}=this.props;
        const {data}=this.state;
        const navBarProps = {
            leftVisible:true,
            leftFunc(){
                history.go(-1)
              },
           
            titleName:"奖金明细",
            rightContent:"",
            rightFunc(){
            }
        }
       
        const tabs = [
            { title: '推荐奖' },
            { title: '分红奖' },
            { title: '提成' },
            { title: '其它' },

        ];
        let hasMore=shop.pagination.hasMore; // 是否加载更多 ture/false
        const {a,b}=shop.pagination;
        const rewardinfo=shop.rewardList;
        return(
            <div className={styles.App}>
                <style>
                    {`
                    .am-tabs-default-bar-tab-active{
                        color:rgba(255,168,0,1);
                    }
                    .am-whitespace.am-whitespace-md{
                        height:0;
                    }
                    .am-tabs-pane-wrap{
                        background: #fff;
                    }
                    
                    `}
                </style>
            {/*头部导航栏*/}
            <MyNavBar {...navBarProps}/>
                <div className={styles.tabbar}>
                    <WhiteSpace />
                    <div style={{ height: 'auto' }}>
                    <InfiniteScroll
                    pageStart={0}
                    initialLoad={false}
                    loadMore={(e)=>this.loadFunc(e)}
                    hasMore={hasMore}
                    threshold={100}
                    loader={<div className="loader" style={{fontSize:".28rem",lineHeight:".86rem",textAlign:"center",marginBottom:".3rem"}} key={0}>加载中
                    ...</div>}
                    >
                    <Tabs tabs={tabs}
                        initalPage={'t2'}
                        onChange={(tab, index) => { this.getGoodsListOfClass(tab,index) }}
                    >   
                  
                        <div>
                            {
                           rewardinfo?rewardinfo.map((item,index)=>{
                                    return(
                                            <div className={styles.box}>
                                                <dl>
                                                    <dd>
                                                        <p className={styles.name}>{data.us_account}</p>
                                                        <p className={styles.id}>ID:{data.us_vip_account}</p>
                                                    </dd>
                                                    <div style={{clear:'both'}}></div>
                                                </dl>
                                                <div className={styles.time}>
                                                    <p>{item.wal_num}</p>
                                                    <p className={styles.time2}>{item.wal_add_time}</p>
                                                </div>
                                            </div>
                                    )
                                }):''
                            }
                        </div>
                    </Tabs>
                    </InfiniteScroll>
                    </div>
                </div>
            </div>
        )
    }
}