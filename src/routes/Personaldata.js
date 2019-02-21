import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import MyNavBar from "../components/MyNavBar";
import * as Shop from "../services/shop";
import { List, InputItem,ImagePicker, DatePicker,Picker, Toast } from 'antd-mobile';
import {APIHost,loggedIn} from "../utils/fetch";
import { Icon, Grid} from 'antd-mobile';
import styles from "./styles/Personaldata.less";
import { list } from 'postcss';
import mine02 from '../assets/images/mine02.png';
@connect(state => ({ shop: state.shop }))



export default class Personaldata extends Component {
  
    //入职记录
    btnruzhi(){		
		const{dispatch}=this.props;
		dispatch(routerRedux.push('/Presentrecord'));
    }
     //登录密码
     btnlogin(){		
		const{dispatch}=this.props;
		dispatch(routerRedux.push('/Loginpsw'));
    }
    //退出
    btnback(){
        const{dispatch}=this.props;
        dispatch(routerRedux.push('/Personal'));
    }
    state = {
        // type: 'money',
        files: [],
        multiple: true,
        //学历  弹框 数据
        data: [],
        cols: 1,
        pickerValue: [],
        asyncValue: [],
        sex: [],   //性别
        edu: [],  //学历
        visible: false,
        disabled:true,
        text:"编辑",
        ok_text:false,
        headimg:"",      //头像
        username:"",     //姓名
        idcard:"",      //身份证号
       
        birthday:[],    //生日
        bankcard:"",    //银行卡号
        bankperson:"",// 持卡人姓名
        bankname:"",//银行卡姓名
        alipay:"",      //支付宝账号
        wechat:"",      //微信账号
        imgUrl:"",
        date:''
      }

      UNSAFE_componentWillMount(){
        const { dispatch } = this.props;
        const user = loggedIn();
        if(!user){
          dispatch(routerRedux.push('/login'));
        }
      }
        UNSAFE_componentWillReceiveProps(props){
        const {shop}=props;
        const data=shop.userInfo;
        console.log(data,shop.userInfo,'***')
        if(data.us_head_pic){
          this.setState({
            headimg:data.us_head_pic,
          
          })
        }
      }
      componentDidMount(){
        const {shop}=this.props;
        const data=shop.userInfo;
        console.log(data,'信息？')
        if(data.us_head_pic){
          this.setState({
            headimg:data.us_head_pic,
            
          })
        }
      }
    //姓名
    inputName(val){
        this.setState({
            name:val
        })
    }
    //身份证号
    inputCard(val){
        this.setState({
            idcard:val
        })
    }
    //银行卡号
    inputBank(val){
        this.setState({
            bankcard:val
        })
    }
    //持卡人姓名
    Bankperson(val){
        this.setState({
            bankperson:val
        })
    }
    //银行名称
    Bankname(val){
        this.setState({
            bankname:val
        })
    }
    //支付宝账号
    inputAlipay(val){
        this.setState({
            bankname:val
        })
    }
    //微信账号
    inputWechat(val){
        this.setState({
            wechat:val
        })
    }
     //编辑信息
     get_input(v){
        if(v==false){
          this.setState({
              disabled:false,
              text:"完成",
              ok_text:true
          })
        }else{
          this.agent()
        }

    }
    //提交更改
    async agent(){
        //时间戳转换
        var date = new Date(this.state.date);  
        let da=date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(); 
        const {dispatch}=this.props;
        let img=this.state.headimg;  //头像
        let name=this.state.name?this.state.name:this.refs.name.state.placeholder; //姓名
        let idcard=this.state.idcard?this.state.idcard:this.refs.idcard.state.placeholder;//身份证号
        console.log(idcard,"ppppppppppppppppppp")
        // let idcard=this.state.idcard   //身份证号
        console.log(da,this.refs.xxx.props.extra,'birthday')
        let birthday= "";
        if(this.state.date == ""){
            birthday = this.refs.xxx.props.extra?this.refs.xxx.props.extra:"";
        }else{
            birthday=da?da:this.refs.xxx.props.extra;   //生日
        }
        if(birthday == ""){
            Toast.offline("请先选择生日", 2);
            return;
        }
        let sex=this.state.sex.length>0?this.state.sex:this.refs.xx.props.extra;   //性别
        console.log(sex,this.state.sex,this.refs.xx.props.extra,'对不对？')
        let edu=this.state.edu.length>0?this.state.edu:this.refs.xl.props.extra;  //学历
        let bank=this.state.bankcard?this.state.bankcard:this.refs.bankcard.state.placeholder;   //银行卡号
        let bankperson=this.state.bankperson?this.state.bankperson:this.refs.bankperson.state.placeholder;//持卡人姓名
        let bankname=this.state.bankname?this.state.bankname:this.refs.bankname.state.placeholder;//持卡人姓名
        let alipay=this.state.alipay?this.state.alipay:this.refs.alipay.state.placeholder;   //支付宝账号
        let wechat=this.state.wechat?this.state.wechat:this.refs.wechat.state.placeholder;   //微信
        console.log(sex,this.state.sex,'9999999999')
        const result =await Shop.Agentuser({
            us_head_pic:img,
            us_real_name:name,
            us_card_id:idcard,
            us_birthday:birthday,
            us_sex:sex,
            us_edu:edu,
            us_bank_number:bank,
            us_bank_person:bankperson,
            us_bank:bankname,
            us_alipay:alipay,
            us_wechat:wechat
        });
   
        if(result.code===1){
            Toast.success(result.msg,1,await function(){
                dispatch(routerRedux.push('/Personal'))
            });
        }else{
            Toast.offline(result.msg,1);
        }
    }
      //学历  弹框 函数
      onClick = () => {
        setTimeout(() => {
          this.setState({
          });
        }, 120);
      };
      getSel() {
        const value = this.state.pickerValue;
        if (!value) {
          return '';
        }      
      }
      
    
    
      //
    onChange = (files, type, index) => {
        console.log(files, type, index);
        this.setState({
          files,
        });
    }

//头像上传
    async getLocalImg(e){
        var formData = new FormData();
        formData.append("imgaaaa",e.target.files[0]);
        Toast.loading("正在上传头像", 0);
        const result =await Shop.uploadImg(formData);
        Toast.hide();    
        if(result.code == 1){    
            this.setState({
                headimg:result.data
            })
            Toast.success('上传成功!',1);
        }else{
            Toast.offline("上传失败请重新尝试",1);
        }
    }
    render(){  
        const { files,disabled,type ,text,ok_text} = this.state;
        const {history,dispatch,shopData,shop}=this.props;
        const data=shop.userInfo
        console.log(data.us_birthday,'11111')
        const Item = List.Item;
        const Brief = Item.Brief;
        const {headimg,birthday}=this.state;
      
        const navBarProps = {
            leftVisible:true,
            leftVisible:true,
            leftFunc(){
              history.go(-1)
            },
            titleName:"个人资料",
            rightContent:"完成",
           
        }      
        //学历弹框
          const seasons = [
            
            [
              {
                label: '男',
                value: '男',
              },
              {
                label: '女',
                value: '女',
              },
            ],
          ];
        const xueli = [
            
            [
                {
                    label: '高中',
                    value: '高中',
                },
                {
                    label: '大专',
                    value: '大专',
                },
                {
                    label: '本科',
                    value: '本科',
                },
                {
                    label: '研究生',
                    value: '研究生',
                },
            ],
        ];
        // 上传图片
        return(
            <div className={styles.App}>
                {/* 样式 */}
                <style>
                    {`
                    .rightContent{
                        font-weight:normal;
                    }
                    .am-list-item.am-input-item{
                        margin-right:0.23rem;
                        margin-left: 0.3rem;
                        position: relative;
                    }
                    .am-list-item .am-input-label{
                        font-size:0.28rem;
                    }
                    .am-list-i++tem .am-input-control .fake-input-container .fake-input{
                        font-size:0.26rem;
                    }
                    .am-list-item .am-list-line{
                        
                        {/* margin-right:0.22rem; */}
                    }
                    .am-list-item.am-input-disabled .am-input-label img{
                        width:0.7rem;
                        height:0.7rem;
                        position: absolute;
                        right: 0.3rem;
                        top:0.1rem;
                    }
                    .am-list-item.am-input-disabled .am-input-label{
                        color:#333333;
                    }
                    .listbot{
                        margin-top:0.3rem;
                    }
                    .am-list-item .am-list-line-multiple .am-list-content{
                       
                        font-size:0.26rem;
                    }
                    .am-list-item .am-list-line .am-list-content{
                        font-size:0.28rem;
                    }
                    .am-list-item .am-input-control input{
                        text-align:right;
                    }
                    .am-list-item .am-list-line .am-list-extra{
                        color:#666666;
                    }
                    .am-picker-popup-header-right,.am-picker-popup-header-left{
                        color:#0187FC;
                        font-size: 0.3rem;
                    }
                    .am-list-item{
                        margin-left:0.3rem;
                        margin-right: 0.23rem;
                    }
                    .touxiang{
                        margin-left:0.3rem;
                       
                        font-size:0.28rem;
                        margin-top: 0.25rem;
                        background: white;
                        height: 0.88rem;
                        line-height: 0.88rem;
                        margin-right: 0.23rem;
                    }
                    .am-list-body{
                        margin-left:0.3rem;
                        margin-right: 0.23rem;
                    }
                    .fengmianDiv input{ display:none;}
                    .fengmianDiv img{ 
                    width: 0.7rem;
                    height: 0.7rem;
                    border-radius: 50%;                                                        
                    border:1px #ccc dashed;
                    position: absolute;
                    right: 0.3rem;
                    margin-top: 0.1rem;
                    } 
                    .nav{
                        height:0.9rem;

                    }
                    .am-list .am-list-item{
                        margin-left:0
                    }
                    .am-icon-md{
                        margin-left: 0.3rem;
                    }
                    html:not([data-scale]) .am-list-body::before{
                        height:0;
                    }
                    .am-list-item .am-input-control input:disabled{
                        color:#666666
                    }
                   input::-moz-placeholder {
                        color: #f00;
                    }
                   

                    `}
                </style>
                {/*头部导航栏*/}
               
                {/* <MyNavBar {...navBarProps}/> */}
                {/* <Title {} /> */}
                <div className={styles.nav}>
                    <Icon type="left" className="left" onClick={ ()=>history.go(-1)} />
                    <span className={styles.center}>个人资料</span>
                    <span className={styles.right} onClick={this.get_input.bind(this,ok_text)}>{text}</span>
                </div>

                <List>   
                    <div className="touxiang">
                        <label>头像</label>
                        <label className="fengmianDiv">
                            <input id="imgURl" name="from" type="file" onChange = {this.getLocalImg.bind(this)}  accept="image/*"  disabled={disabled} />
                            <img className="id_card" ref="headIm"  src={APIHost+headimg} />
                        </label>
                    </div>                   
                    <InputItem
                    type={type}
                    placeholder={data.us_real_name}
                    disabled={disabled}
                    maxLength={10}
                    ref="name"
                    clear
                    onChange={(val)=>this.inputName(val)}
                    onBlur={(v) => { console.log('onBlur', v); }}
                    
                    >姓名</InputItem>
                    <InputItem
                        type={type}
                        placeholder={data.us_card_id}
                        disabled={disabled}
                        ref="idcard"
                        clear
                        onChange={(val)=>this.inputCard(val)}
                        onBlur={(v) => { console.log('onBlur', v); }}
                       
                    >身份证号</InputItem>
                    <InputItem
                        type={type}                       
                        placeholder={data.us_tel}
                        disabled
                        clear
                        onChange={(v) => { console.log('onChange', v); }}
                        onBlur={(v) => { console.log('onBlur', v); }}
                        
                    >手机号</InputItem>
                    
                    <DatePicker
                    mode="date"
                    minDate={new Date(1990, 8, 15, 10, 30, 0)}
                    title="选择日期"
                    extra={data.us_birthday}
                    disabled={disabled}
                    value={this.state.date}
                    ref='xxx'
                    onChange={date => this.setState({ date })}
                    >
                    <List.Item arrow="horizontal">生日</List.Item>
                    </DatePicker>  
                    <Picker
                    ref='xx'
                        data={seasons}
                        title="请选择"
                        cascade={false}
                        extra={data.us_sex}
                        disabled={disabled}
                        value={this.state.sex}
                        onChange={v => this.setState({ sex: v })}
                        >
                        <List.Item arrow="horizontal" >性别</List.Item>
                    </Picker>
                    <Picker
                    ref='xl'
                        data={xueli}
                        title="请选择"
                        cascade={false}
                        extra={data.us_edu}
                        
                        disabled={disabled}
                        value={this.state.edu}
                        onChange={v => this.setState({ edu: v })}
                        onOk={v => this.setState({ edu: v })}
                        >
                        <List.Item arrow="horizontal">学历</List.Item>
                    </Picker>
                    <InputItem
                        // type="bankCard"
                        placeholder={data.us_bank_number}
                        disabled={disabled}
                        clear
                        ref="bankcard"
                        onChange={(val)=>this.inputBank(val)}
                        onBlur={(v) => { console.log('onBlur', v); }}
                       
                    >银行卡</InputItem>
                    <InputItem
                        
                        
                        placeholder={data.us_bank_person}
                        disabled={disabled}
                        clear
                        ref="bankperson"
                        onChange={(val)=>this.Bankperson(val)}
                        onBlur={(v) => { console.log('onBlur', v); }}
                       
                    >持卡人姓名</InputItem>
                    <InputItem    
                        placeholder={data.us_bank}
                        disabled={disabled}
                        clear
                        ref="bankname"
                        onChange={(val)=>this.Bankname(val)}
                        onBlur={(v) => { console.log('onBlur', v); }}
                       
                    >银行名称</InputItem>
                    <InputItem
                        type={type}
                        placeholder={data.us_alipay}
                        disabled={disabled}
                        clear
                        onChange={(val)=>this.inputAlipay(val)}
                        ref="alipay"
                        onBlur={(v) => { console.log('onBlur', v); }}
                       
                    >支付宝账号</InputItem>
                    <InputItem
                        type={type}
                        placeholder={data.us_wechat}
                        disabled={disabled}
                        clear
                        onChange={(val)=>this.inputWechat(val)}
                        ref="wechat"
                        onBlur={(v) => { console.log('onBlur', v); }}
                        
                    >微信账号</InputItem>
                </List>
                <List>
                    <Item
                    arrow="horizontal"
                    multipleLine
                    onClick={() =>this.btnback()}
                    platform="android"
                    >
                    退出
                    </Item>
                </List>
                <div className="listbot">
                    <List>
                        <Item
                        style={{marginLeft:"0"}}
                        arrow="horizontal"
                        multipleLine
                        onClick={() => this.btnruzhi()}
                        platform="android"
                        >
                        入职记录
                        </Item>
                    </List>
                    <List>
                        <Item
                        arrow="horizontal"
                        multipleLine
                        onClick={() => this.btnlogin()}
                        platform="android"
                        >
                        登录密码
                        </Item>
                    </List>                  
                </div>                                    
            </div>
        )
    }
}