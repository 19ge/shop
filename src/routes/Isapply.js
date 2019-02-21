import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import MyNavBar from "../components/MyNavBar";
import styles from "./styles/Isapply.less";
import { List, InputItem, WhiteSpace,TextareaItem  } from 'antd-mobile';
import { ImagePicker, WingBlank, Button,Toast } from 'antd-mobile';
import { TabBar } from 'antd-mobile';
import * as Shop from '../services/shop';
import icon01 from '../assets/images/add.png';
import icon02 from '../assets/images/dui.png';
import icon03 from '../assets/images/dui2.png';
import { APIHost } from '../utils/fetch';


@connect(state => ({ shop: state.shop }))
export default class Isapply extends Component {
    
    state = {
        
        imgUrlc:'',
        imgUrlc2:'',
        imgUrlc3:'',
        imgUrlc4:'',
        data:'',
        zimg:'',
        fimg:'',
        zhizhao:'',
        p:'',
        sname:'',
        tel:'',
        pname:'',
        address:'',
        jiehshao:'',
        multiple: false,
    }
    async componentDidMount(){
        const result=await Shop.isdian();
        const data=result.data;
        const v=[{data:data.apply_card_front}]

        this.setState({
            data:data,
            imgUrlc:v,
            imgUrlc2:v,
            imgUrlc3:v,
            imgUrlc4:v,
        })
        // console.log(result,'result')
    }
    render(){
        const {data}=this.state;
        const {history}=this.props;
        const navBarProps = {
            leftVisible: true,
            leftFunc() {
                history.push('/Personal')
            },
            titleName: "代理商申请信息",
            rightContent: "",
            rightFunc() {
                
            }
        };
        
        return(
            <div className={styles.App}>
              <style>
                  {
                    `
                    .am-list{
                        margin-bottom: 0.18rem;
                    }
                    .am-list-item .am-input-label,.am-textarea-label{
                        color: #464646;
                        font-size: 0.26rem;
                    }
                    .am-list-item .am-input-control{
                        font-size: 0.24rem;
                    }
                    .am-textarea-control textarea{
                        font-size:0.24rem;
                    }
                    .am-flexbox-item{
                        width:2.75rem;
                        height:1.62rem;
                        
                    }
                    .am-flexbox .am-flexbox-item{
                        min-width:2.75rem;
                    }
                    .imgc{
                        position: relative;
                        top: -0.6rem;
                        text-align: center;
                        color:#A9A9A9;
                        font-size:0.2rem;
                    }
                    .am-image-picker-list .am-image-picker-upload-btn:after{
                        width: 0.86rem;
                        height: 0.02rem;
                    }
                    .am-image-picker-list .am-image-picker-upload-btn:before, .am-image-picker-list .am-image-picker-upload-btn:after{
                        top: 42%;
                        background-color: #B1B1B1;
                    }
                    .am-image-picker{
                        width:2.75rem;    
                    }
                    .kuang{
                        display: flex;
                        justify-content: space-between;
                        padding-left: 0.44rem;
                        padding-right: 0.44rem;
                        
                        
                        
                    }
                    .kuangs{
                        position: relative;
                    }
                    .kuang p{
                        position: absolute;
                        color: #A9A9A9;
                        width: 2.75rem;
                        text-align: center;
                       
                        bottom: 0.2rem;
                        font-size:0.2rem;
                    }
                    .renzheng{
                        margin-bottom:0.2rem;
                        font-size: 0.28rem;
                        color:#444343;
                    }
                    .left{
                        width:2.75rem;
                        height:1.62rem;
                    }
                    .left img{
                        width:100%;
                        height:100%;
                    }
                    .box{
                        padding-left: 0.26rem;
                        padding-top:0.2rem;
                    }
                    .box-content{
                        margin-bottom:0.6rem;
                    }
                    html:not([data-scale]) .am-list-body:after{
                        height:0
                    }
                    
                    `
                  }
              </style>
            {/*头部导航栏*/}
            <MyNavBar {...navBarProps}/>
            <div className={styles.content}>
                <List>
                    <InputItem 
                        placeholder="请填写你的店铺名称"
                        ref={el => this.autoFocusInst = el}
                        value={data. apply_name}
                    >店铺名称：</InputItem>
                </List>
                <List>
                    <InputItem 
                        placeholder="请输入你的手机号"
                        ref={el => this.autoFocusInst = el}
                        value={data. apply_tel}
                    ><span style={{letterSpacing:'0.1rem'}}>手机号:</span></InputItem>
                    <InputItem
                       
                        placeholder="请输入法人姓名"
                        ref={el => this.inputRef = el}
                        value={data. apply_person}
                    ><span style={{letterSpacing:'0.16rem'}}>姓 名:</span></InputItem>
                     <TextareaItem
                        title="详细地址："
                        placeholder="请填写商铺详细地址"
                        data-seed="logId"
                        ref={el => this.autoFocusInst = el}
                        value={data. apply_addr}
                        autoHeight
                    />
                </List>
                <List>
                     <TextareaItem
                        title="说 明："
                        placeholder="简单描述一下"
                        data-seed="logId"
                        ref={el => this.autoFocusInst = el}
                        autoHeight
                        value={data. apply_note}
                    />
                </List>
                <div className='box'>
                    <div className='box-content'>
                        <p className='renzheng'>身份认证</p>
                        <div className='kuang'>
                            <div className='kuangs'>
                                <div className='left'>
                                    <img src={APIHost+data.apply_card_front} />
                                </div>
                                <p>身份证正面</p>
                            </div>
                            <div className='kuangs'>
                                <div className='left'>
                                    <img src={APIHost+data.apply_card_back} />
                                </div>
                                <p>身份证背面</p>
                            </div>
                            
                        </div>
                    </div>
                    <div className='box-content'>
                        
                        <p className='renzheng'>店铺认证</p>
                        <div className='kuang'>
                            <div className='kuangs'>
                                <div className='left'>
                                    <img src={APIHost+data.apply_trad} />
                                </div>
                                <p>营业执照</p>
                            </div>
                            <div className='kuangs'>
                                <div className='left'>
                                    <img src={APIHost+data.apply_ying} />
                                </div>
                                <p>代理商和身份证正面同框照</p>
                            </div>  
                        </div>
                    
                        
                         
                    </div>            
                </div>
              
             </div>
            </div>
        )
    }
}