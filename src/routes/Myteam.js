import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from "./styles/Myteam.less";
import MyNavBar from "../components/MyNavBar";
import MyTabBar from "../components/TabBar";
import * as Shop from '../services/shop';
import { Tabs, Button,Stepper ,List ,WhiteSpace} from 'antd-mobile';
import icon01 from '../assets/images/t.png';
import v03 from '../assets/images/yy.png';
import InfiniteScroll from 'react-infinite-scroller';
import { APIHost } from '../utils/fetch';
import { Item } from '_antd-mobile@2.2.6@antd-mobile/lib/tab-bar';
@connect(state => ({ shop: state.shop }))
export default class Myteam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTabBar: "team",
            val: 0,
            checked:1,
            data:'',
            type:'', 
           
        }   
    }
    // componentWillMount(){
       
    // }
    componentDidMount(){
        
    }
    loadFunc(e){
        console.log(9)
        const {type}=this.state;
        const {dispatch,shop}=this.props;
        let page = shop.pagination.current_page * 1 + 1;
        dispatch({
            type:"shop/team",     //方法
            payload:{       //参数
                page,
                type:type?type:0
            }
        })
    }
    teamxq(id,index){
        const { dispatch } = this.props;
        dispatch(routerRedux.push('/Teamdetail?id='+id));
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
                    hasMore: false,
                    type:type
                }
            }
        })
        const page = 1;
        dispatch({
            type: "shop/team",     //方法
            payload: {       //参数
                page,
                type:type    
            }
        })        
    } 
      //加载更多的方法,写法固定,只需替换变量名
    
    render(){
        const {history,dispatch,shop}=this.props;
        const teaminfo=shop.teamList;
        let hasMore=shop.pagination.hasMore; // 是否加载更多 ture/false
        const navBarProps = {
            leftVisible:false,
            leftFunc(){
                history.go(-1)
              },
           
            titleName:"我的团队",
            rightContent:"",
            rightFunc(){
            }
        }
        const tabBarProps = {
            selectedTabBar: this.state.selectedTabBar,
            history
        }
        const tabs = [
            { title: '我的直推' },
            { title: '我的团队' },
          ];
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
            {/*底部标签栏*/}
            <MyTabBar {...tabBarProps}/>
                <div className={styles.tabbar}>
                    <WhiteSpace />
                    <div style={{ height: 'auto' }}>
                    
                    <Tabs tabs={tabs}
                        initalPage={'t1'}
                        onChange={(tab, index) => { this.getGoodsListOfClass(tab,index) }}
                    >   
                    <InfiniteScroll
                    pageStart={0}
                    initialLoad={false}
                    loadMore={(e)=>this.loadFunc(e)}
                    hasMore={hasMore}
                    threshold={100}
                    loader={<div className="loader" style={{fontSize:".28rem",lineHeight:".86rem",textAlign:"center",marginBottom:".3rem"}} key={0}>加载中
                    ...</div>}
                    >
                        <div style={{paddingBottom:'0.7rem'}}>
                            {
                                teaminfo.length>0?teaminfo.map((item,index)=>{
                                    return(
                                            <div onClick={()=>this.teamxq(item.id,index)} className={styles.box}>
                                                <dl>
                                                    <dt>
                                                        <img src={APIHost+item.us_head_pic} />
                                                    </dt>
                                                    <dd>
                                                        <p className={styles.name}>{item.us_account}</p>
                                                        <p className={styles.id}>ID:{item.us_vip_account}</p>
                                                    </dd>
                                                    <div style={{clear:'both'}}></div>
                                                </dl>
                                                <div className={styles.time}>
                                                    <p>{item.us_level}</p>
                                                    <p className={styles.time2}>{item.us_add_time}</p>
                                                </div>
                                            </div>
                                    )
                                }):''
                            }
                        </div>
                          </InfiniteScroll>
                    </Tabs>
                  
                    </div>
                </div>
            </div>
        )
    }
}