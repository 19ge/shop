import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from "./styles/Modifyinfo.less";
import * as Shop from '../services/shop';
import MyNavBar from "../components/MyNavBar";
import icon01 from '../assets/images/tx2.png';
import icon09 from '../assets/images/v.png';
import { Tabs, Icon,InputItem ,List,Toast ,Button,Stepper, Range } from 'antd-mobile';
import { APIHost } from '../utils/fetch';
@connect(state => ({ shop: state.shop }))
export default class Modifyinfo extends Component {
    state={
        disabled:true,
        headimg:'',
        data:'',
        jname:'',
        name:'',
        idcard:''
    }

    edit(){
        this.setState({
            disabled:false
        })
    }
    // edit2(){
    //     this.setState({
    //         disabled:false
    //     })
    // }
    async componentDidMount(){
        const result=await Shop.userLogins();
        console.log(result.data,'userLogin');
        const data=result.data;
        
        if(data.us_head_pic){
            this.setState({
              headimg:data.us_head_pic,
              
            })
        }
        this.setState({
            data:result.data,
        })
    }
    //修改头像
    async getLocalImg(e){
        var formData = new FormData();
        formData.append("Filename", e.target.files[0].name);
        formData.append("img",e.target.files[0]);
        Toast.loading("正在上传头像", 0);
        const result =await Shop.uploadImgs(formData);
        Toast.hide();
        if(result.code ===1){
        this.setState({
            headimg:result.data
        })
            Toast.success('上传成功!',1);
        }else{
            Toast.offline("上传失败请重新尝试",1);
        }
    }
      //账号
    jname(val){
        this.setState({
            jname:val
        })
    }
      //姓名
      name(val){
        this.setState({
            name:val
        })
    }
   
    //身份证号
    idcard(val){
        this.setState({
            idcard:val
        })
    }
     //更改手机号
    tel(){
        const {dispatch}=this.props;
        dispatch(routerRedux.push('/Changetel'))
    }
        //提交更改
        async agent(){ 
            //时间戳转换
            // var date = new Date(this.state.date);  
            // let da=date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(); 
            const {dispatch}=this.props;
            let img=this.state.headimg;  //头像
            let jname=this.state.jname?this.state.jname:this.refs.jname.state.placeholder; //账号
            let name=this.state.name?this.state.name:this.refs.name.state.placeholder; //姓名
            let idcard=this.state.idcard?this.state.idcard:this.refs.idcard.state.placeholder;//身份证号
            const result=await Shop.preserve({
                us_head_pic:img,
                us_account:jname,
                us_real_name:name,
                us_card_id:idcard,
            });
             if(result.code===1){
                Toast.success(result.msg,1,await function(){
                    dispatch(routerRedux.push('/Shezhi'))
                });
            }else{
                Toast.offline(result.msg,1);
            }
        }
    render(){
        const {history,dispatch,shopData}=this.props;
        const {disabled,headimg,data}=this.state;
        const Item = List.Item;
        const Brief = Item.Brief;             
        return(
            <div className={styles.App}>
            <style>
            {`
            .my-list{
                margin-bottom:0.3rem;
               
            }
            .am-icon-md{
                margin-left:0.3rem;
            }
            .am-list-item .am-list-line .am-list-content{
                color:#343434;
                font-size:0.3rem;
            }
            .am-list-item img{
                width:0.92rem;
                height:0.92rem;
            }
            .am-list-item .am-input-control input{
                text-align: right;
            }
            .am-list-body{
                // display:flex;
                line-height: 0.88rem;
            }
            .dianji{
                position: absolute;
                top: 0.02rem;
                right: 0.35rem;
                font-size: 0.2rem;
            }
            .am-list-item .am-input-label{
                font-size:0.28rem;
            }
            .am-list-item .am-list-line .am-list-content{
                font-size:0.28rem;
            }
            .labe input{
                display:none;
            }
            `}
            </style>
            {/*头部导航栏*/}
                {/* <MyNavBar {...navBarProps}/> */}
                <div className={styles.top}>
                    <Icon type="left" className="left" onClick={ ()=>history.go(-1)} />
                    <div className={styles.center}>个人资料修改</div>
                    <div className={styles.right} onClick={()=>this.agent()}>保存</div>
                </div>
                <List className="my-list">
                    <Item arrow="horizontal" multipleLine>
                        <label  htmlFor="img" className="labe">
                            <input type="file" onChange={this.getLocalImg.bind(this)} accept="image/*" id="img"/>
                            <img ref="headImg" src={APIHost+headimg} style={{width:'.8rem',height:'.8rem',borderRadius:"50"}} alt=""/>
                        </label>
                    </Item>
                </List>
                <List className="my-list">
                    <InputItem
                    clear
                    placeholder={data.us_account}
                    onChange={(val)=>this.jname(val)}
                    ref="jname"
                    >账号</InputItem>
                </List>
                <List className="my-list">
                    <InputItem
                        clear
                        ref="name"
                        placeholder={data.us_real_name}
                        onChange={(val)=>this.name(val)}
                        // disabled
                        >姓名</InputItem>
                    <InputItem
                        clear
                        value={data.us_tel}
                        // ref="jname"
                        // disabled
                        onClick={()=>this.tel()}
                        
                        >手机号</InputItem>
                        <InputItem
                        clear
                        ref="idcard"
                        placeholder={data.us_card_id}
                        onChange={(val)=>this.idcard(val)}
                      
                        >身份证号</InputItem>
                        <InputItem
                        clear
                        // ref="name"
                        // placeholder={data.us_real_name}
                        // onChange={(val)=>this.name(val)}
                        onClick={()=>history.push('/Bankcard')}
                        // disabled
                        >银行卡</InputItem>
                </List>
            </div>
        )
    }
}