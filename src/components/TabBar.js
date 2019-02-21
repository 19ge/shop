/*
 * @Author: 杜梦 
 * @Date: 2018-07-02 17:17:46 
 * @Last Modified by: 杜梦
 * @Last Modified time: 2018-07-02 18:13:21
 */
import React from 'react';
import PropTypes from 'prop-types';
import styles from "./styles/tabBar.less";
import {loggedIn, loginOut, APIHost} from '../utils/fetch';

// 图标资源
import Tab3 from "../assets/images/tab3.png";
import Tab31 from "../assets/images/tab31.png"
import Tab2 from "../assets/images/tab2.png";
import Tab21 from "../assets/images/tab21.png";
import Tab1 from "../assets/images/tab1.png";
import Tab11 from "../assets/images/tab11.png";
import Tab41 from "../assets/images/tab41.png";
import Tab4 from "../assets/images/tab4.png";
import Tab5 from "../assets/images/tab5.png";
import Tab51 from "../assets/images/tab51.png";

// 子项可增删,样式自适应
// selectedTabBar:活动的tab,string
// history ,传入history用于点击跳转
const MyTabBar=({selectedTabBar,history}) =>{
    return(
        <div className={styles.tabBarBox}>
        <style>
            {
                `
                .tabel_nav{
                    position: fixed;
                    width: 100%;
                    right: 0;
                    left: 0;
                    display: flex;
                    z-index:100;
                }
                `
            }
        </style>
         {/* <div  className="tabel_nav" style={{position:'fixed'}}> */}
            <div className={styles.tabBarItem} onClick={()=>history.push('/')}>
                    <img src={selectedTabBar=='shop'?Tab11:Tab1}></img>
                    <span className={selectedTabBar=='shop'?styles.textActive:""}>首页</span>
                </div>

                <div className={styles.tabBarItem} onClick={()=>history.push('/Super')}>
                    <img src={selectedTabBar=='trading'?Tab21:Tab2}></img>
                    <span className={selectedTabBar=='trading'?styles.textActive:""}>斑玛鲜超市</span>
                </div>
                <div className={styles.tabBarItem}  onClick={()=>{
                        if(loggedIn() && loggedIn().username){
                                    history.push('/Shopcar')
                                    }
                                    else if(window.confirm("请您先登录"))
                                        {
                                            history.push('/Login')  
                                        }else
                                        {
                                            
                                            
                                        }
                                    
                                }
                            }
                        >
                    <img src={selectedTabBar=='car'?Tab31:Tab3}></img>
                    <span className={selectedTabBar=='car'?styles.textActive:""}>购物车</span>
                </div>
                <div className={styles.tabBarItem} onClick={()=>{
                    if(loggedIn() && loggedIn().username){
                                history.push('/Myteam')
                                }
                                else{
                                    if(window.confirm("请您先登录"))
                                    {
                                        history.push('/Login')
                                        
                                    }else
                                    {
                                        
                                        
                                    }
                                }
                            }
                        }
                >
                    <img src={selectedTabBar=='team'?Tab41:Tab4}></img>
                    <span className={selectedTabBar=='team'?styles.textActive:""}>团队</span>
                </div>
                <div className={styles.tabBarItem}  onClick={()=>{
                        if(loggedIn() && loggedIn().username){
                                    history.push('/Personal')
                                    }
                                    else{
                                        if(window.confirm("请您先登录"))
                                        {
                                            history.push('/Login')
                                            
                                        }else
                                        {
                                            
                                            
                                        }
                                    }
                                }
                            }
                        >
                    <img src={selectedTabBar=='mine'?Tab51:Tab5}></img>
                    <span className={selectedTabBar=='mine'?styles.textActive:""}>我的</span>
                </div>
          </div> 
        // </div>
    )
}
MyTabBar.propTypes = {
    
}
export default MyTabBar