import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import MyNavBar from "../components/MyNavBar";
import styles from "./styles/Agent.less";
import { List, InputItem, WhiteSpace,TextareaItem  } from 'antd-mobile';
import { ImagePicker, WingBlank, Button,Toast } from 'antd-mobile';
import { TabBar } from 'antd-mobile';
import * as Shop from '../services/shop';
import icon01 from '../assets/images/add.png';
import icon02 from '../assets/images/dui.png';
import icon03 from '../assets/images/dui2.png';
@connect(state => ({ shop: state.shop }))
export default class Agent extends Component {
    
    state = {
        files1: [],
        files2: [],
        files3: [],
        files4: [],
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
        imgUrlc:'',
        imgUrlc2:'',
        imgUrlc3:'',
        imgUrlc4:'',
        t1:'',
        t2:'',
        t3:'',
        t4:'',
    }
    //店铺名称
    inputname(val){
        this.setState({
            sname:val
        })
    }
    //手机号
    inputel(val){
        this.setState({
            tel:val
        })
    }
    //姓名
    inputpname(val){
        this.setState({
            pname:val
        })
    }
    //地址
    inputaddress(val){
        this.setState({
            address:val
        })
    }
    //地址
    inputsm(val){
        this.setState({
            jiehshao:val
        })
    }

      //身份证正面
      getLocalImgc(e) {
        // Toast.info("加载中...")
        if(!e.target.files[0]){
        return
        }
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0])
        reader.onload = function (e) {
            this.setState({
                    imgUrlc: e.target.result,
                    
            })
            Shop.uploadImg({img:this.state.imgUrlc}).then((result)=>{
                if(result.code===1){
                    Toast.success(result.msg,1,()=>{
                        this.setState({t1:result.data})
                        // const {dispatch}=this.props;
                    //   dispatch(routerRedux.push('/member'))
                    });
                }else{
                    Toast.offline(result.msg,1)
                }
            });
           
           
            return this.result
        }.bind(this)
    }
     //身份证背面
     getLocalImgc2(e) {
        // Toast.info("加载中...")
        if(!e.target.files[0]){
        return
        }
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0])
        reader.onload = function (e) {
            this.setState({
                    imgUrlc2: e.target.result,
                    
            })
            Shop.uploadImg({img:this.state.imgUrlc2}).then((result)=>{
                if(result.code===1){
                    Toast.success(result.msg,1,()=>{
                        this.setState({t2:result.data})
                    //   dispatch(routerRedux.push('/member'))
                    });
                }else{
                    Toast.offline(result.msg,1)
                }
            })
            return this.result;
        }.bind(this)
    }
     //营业执照
     getLocalImgc3(e) {
        // Toast.info("加载中...")
        if(!e.target.files[0]){
        return
        }
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0])
        reader.onload = function (e) {
            this.setState({
                    imgUrlc3: e.target.result,
                    
            })
            Shop.uploadImg({img:this.state.imgUrlc3}).then((result)=>{
                if(result.code===1){
                    Toast.success(result.msg,1,()=>{
                        this.setState({t3:result.data})
                    //   dispatch(routerRedux.push('/member'))
                    });
                }else{
                    Toast.offline(result.msg,1)
                }
            })
            return this.result
        }.bind(this)
    }
       //营业执照
       getLocalImgc4(e) {
        // Toast.info("加载中...")
        if(!e.target.files[0]){
        return
        }
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0])
        reader.onload = function (e) {
            this.setState({
                    imgUrlc4: e.target.result,
                    
            })
            Shop.uploadImg({img:this.state.imgUrlc4}).then((result)=>{
                if(result.code===1){
                    Toast.success(result.msg,1,()=>{
                        this.setState({t4:result.data})
                    //   dispatch(routerRedux.push('/member'))
                    });
                }else{
                    Toast.offline(result.msg,1)
                }
            })
            return this.result
        }.bind(this)
    }
        //提交
        async btnsubmit(){
            // const {dispatch}=this.props;
            let sname=this.state.sname;   //店铺名称
            let tel=this.state.tel;   //  手机号码
            let pname=this.state.pname;   //  姓名
            let address=this.state.address;//地址
            let jiehshao=this.state.jiehshao;//说明
            let zimg=this.state.t1;   //身份证正面
            let fimg=this.state.t2;   //身份证正面
            let zhizhao=this.state.t3;  //营业执照
            let p=this.state.t4 ;//大头照
    
            let data = {
                "apply_name" :sname,  //店铺名称
                "apply_tel" :tel,  //手机号码
                "apply_person" :pname, //姓名
                "apply_addr" :address,//地址
                "apply_note" :jiehshao,//说明
                "apply_card_front":zimg,      //身份证正面
                "apply_card_back":fimg,   //身份证反面
                "apply_trad":zhizhao,// 营业执照
                "apply_ying" :p , //大头照 
            }
            if(sname===""){
                Toast.offline("请输入店铺名称", 2);
                return;
            }
            if(tel===""){
                Toast.offline("请输入手机号码", 2);
                return;
            }
            // if(tel===""){
            //     Toast.offline("请输入手机号码", 2);
            //     return;
            // }
            const result=await Shop.agent(data);
            if(result.code===1){
          
                Toast.success('申请成功 !!!', 1,()=>{
                    const {dispatch}=this.props;
                    dispatch(routerRedux.push('/Isapply'))
                });
                
            }else{
                Toast.fail(result.msg, 2);
            }
        }
    render(){
        const {files1,files2,files3,files4}=this.state;
        const {history}=this.props;
        const navBarProps = {
            leftVisible: true,
            leftFunc() {
                history.go(-1)
            },
            titleName: "代理商申请",
            rightContent: "",
            rightFunc() {
                
            }
        }
        
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
                        font-size: 0.3rem;
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
                        top: -0.4rem;
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
                    .am-image-picker-list{
                        padding:0;
                        margin-bottom:0;
                    }
                    .renzheng{
                        margin-bottom:0.2rem;
                        font-size: 0.28rem;
                        color:#444343;
                    }
                    .box{
                        padding-left:0.26rem;
                    }
                    .btn{
                        margin-top:1rem;
                        width: 100%
                    }
                    .am-button{
                        background: #D4AB6A;
                        color:#fff;
                    }
                    #imgURlb{
                        display:none
                    }
                    .fengmianDiv{
                        width: 2.75rem;
                        height: 1.62rem;
                    }
                    .fengmianDiv img{
                        width:100%;
                        height:100%;
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
                        clear
                        placeholder="请填写你的店铺名称"
                        ref={el => this.autoFocusInst = el}
                        onChange={this.inputname.bind(this)}
                    >店铺名称：</InputItem>
                </List>
                <List>
                    <InputItem 
                        clear
                        type='number'
                        maxLength='11'
                        placeholder="请输入你的手机号"
                        ref={el => this.autoFocusInst = el}
                        onChange={this.inputel.bind(this)}
                    ><span style={{letterSpacing:'0.1rem'}}>手机号:</span></InputItem>
                    <InputItem
                        clear
                        placeholder="请输入法人姓名"
                        ref={el => this.inputRef = el}
                        onChange={this.inputpname.bind(this)}
                    ><span style={{letterSpacing:'0.16rem'}}>姓 名:</span></InputItem>
                     <TextareaItem
                        title="详细地址："
                        placeholder="请填写商铺详细地址"
                        data-seed="logId"
                        ref={el => this.autoFocusInst = el}
                        onChange={this.inputaddress.bind(this)}
                        autoHeight
                    />
                </List>
                <List>
                     <TextareaItem
                        title="说 明："
                        placeholder="简单描述一下"
                        data-seed="logId"
                        ref={el => this.autoFocusInst = el}
                        onChange={this.inputsm.bind(this)}
                        autoHeight
                    />
                </List>
                <div className='box'>
                    <div style={{marginBottom:'0.3rem'}}>
                        <p className='renzheng'>身份认证</p>
                        <div className='kuang'>
                            <label className="fengmianDiv">
                                <input id="imgURlb" name="from" ref="files" type="file" onChange={(e) => this.getLocalImgc(e)} accept="image/jpeg,image/x-png,image/gif" />
                                < img className="id_cardb" ref="cover" name="enter_imgsPath" src={this.state.imgUrlc ? this.state.imgUrlc : icon01} />
                                <div className='imgc'>身份证正面</div> 
                            </label>
                            <label className="fengmianDiv">
                                <input id="imgURlb" name="from" ref="files" type="file" onChange={(e) => this.getLocalImgc2(e)} accept="image/jpeg,image/x-png,image/gif" />
                                < img className="id_cardb" ref="cover" name="enter_imgsPath" src={this.state.imgUrlc2 ? this.state.imgUrlc2 : icon01} />
                                <div className='imgc'>身份证背面</div>    
                               
                            </label>
                           
                        </div>
                    </div>
                    <div style={{marginBottom:'0.3rem'}}>
                        <p className='renzheng'>店铺认证</p>
                        <div className='kuang'>
                            <label className="fengmianDiv">
                                <input id="imgURlb" name="from" ref="files" type="file" onChange={(e) => this.getLocalImgc3(e)} accept="image/jpeg,image/x-png,image/gif" />
                                < img className="id_cardb" ref="cover" name="enter_imgsPath" src={this.state.imgUrlc3 ? this.state.imgUrlc3 : icon01} />
                                <div className='imgc'>营业执照</div>
                               
                            </label>
                            <label className="fengmianDiv">
                                <input id="imgURlb" name="from" ref="files" type="file" onChange={(e) => this.getLocalImgc4(e)} accept="image/jpeg,image/x-png,image/gif" />
                                < img className="id_cardb" ref="cover" name="enter_imgsPath" src={this.state.imgUrlc4 ? this.state.imgUrlc4 : icon01} />
                                <div className='imgc'>代理商和身份证正面同框照</div>
                               
                            </label>
                           
                        </div>
                    </div>            
                </div>
                <div className={styles.tishi}>
                    <h5>温馨提示：</h5>
                    <p>1、为保证您的入驻顺利，请保证信息清晰可见</p>
                    <p>2、此证件信息只作为个人入驻申请验证，请放心上传</p>
                </div>
                <div className='btn' onClick={()=>this.btnsubmit()}>
                    <Button>提 交</Button>
                </div>
             </div>
            </div>
        )
    }
}