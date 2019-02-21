import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic';
function RouterConfig({ history,app }) {
  // 首页
  const IndexPage = dynamic({
    app,
    models: () => [
      import('./models/shop'),
    ],
    component: () => import('./routes/IndexPage'),
  });
  //详情页
  const Details = dynamic({
    app,
    models: () => [
      import('./models/shop'),
    ],
    component: () => import('./routes/Details'),
  });
  //银行卡
  const Bankcard = dynamic({
    app,
    models: () => [
      import('./models/shop'),
    ],
    component: () => import('./routes/Bankcard'),
  });
   //详情页2
   const Details2 = dynamic({
    app,
    models: () => [
      import('./models/shop'),
    ],
    component: () => import('./routes/Details2'),
  });
    //选择店铺
    const Choosestore = dynamic({
      app,
      models: () => [
        import('./models/shop'),
      ],
      component: () => import('./routes/Choosestore'),
    });
     //分类
     const Fenlei = dynamic({
      app,
      models: () => [
        import('./models/shop'),
      ],
      component: () => import('./routes/Fenlei'),
    });
    //支付
    const Zhifu = dynamic({
      app,
      models: () => [
        import('./models/shop'),
      ],
      component: () => import('./routes/Zhifu'),
    });
  // 鲜果超市
  const Super = dynamic({
    app,
    models: () => [
      import('./models/shop'),
    ],
    component: () => import('./routes/Super'),
  });
  // 选择店铺-选择商品
  const Choiceshop = dynamic({
    app,
    models: () => [
      import('./models/shop'),
    ],
    component: () => import('./routes/Choiceshop'),
  });
   // 选择店铺-立即下单
   const Orderimm = dynamic({
    app,
    models: () => [
      import('./models/shop'),
    ],
    component: () => import('./routes/Orderimm'),
  });
  // 下单-选择收货地址
  const Receivingaddress = dynamic({
    app,
    models: () => [
      import('./models/shop'),
    ],
    component: () => import('./routes/Receivingaddress'),
  });
   //编辑收货地址
   const Editaddress = dynamic({
    app,
    models: () => [
      import('./models/shop'),
    ],
    component: () => import('./routes/Editaddress'),
  });
  // 购物车
  const Shopcar = dynamic({
    app,
    models: () => [
      import('./models/shop'),
    ],
    component: () => import('./routes/Shopcar'),
  });
  // 我的团队
  const Myteam = dynamic({
    app,
    models: () => [
      import('./models/shop'),
    ],
    component: () => import('./routes/Myteam'),
  });
  // 我的团队-详情
  const Teamdetail = dynamic({
    app,
    models: () => [
      import('./models/shop'),
    ],
    component: () => import('./routes/Teamdetail'),
  });
    //个人中心
    const Personal = dynamic({
    app,
    models: () => [
      import('./models/shop'),
    ],
    component: () => import('./routes/Personal'),
  });
   //个人中心-邀请新用户
   const Newuser = dynamic({
    app,
    models: () => [
      import('./models/shop'),
    ],
    component: () => import('./routes/Newuser'),
  });
    //个人中心-代理商申请
    const Agent = dynamic({
      app,
      models: () => [
        import('./models/shop'),
      ],
      component: () => import('./routes/Agent'),
    });
     //个人中心-钱包
     const Mywallet = dynamic({
      app,
      models: () => [
        import('./models/shop'),
      ],
      component: () => import('./routes/Mywallet'),
    });
     //个人中心-提现申请
     const Cash = dynamic({
      app,
      models: () => [
        import('./models/shop'),
      ],
      component: () => import('./routes/Cash'),
    });
    //报单详情
  const Baodanlist = dynamic({
    app,
    models: () => [
      import('./models/shop'),
    ],
    component: () => import('./routes/Baodanlist'),
  });
     //个人中心-提现明细
     const Tixiandetail = dynamic({
      app,
      models: () => [
        import('./models/shop'),
      ],
      component: () => import('./routes/Tixiandetail'),
    });
     //个人中心-奖金明细
     const Incomedetail = dynamic({
      app,
      models: () => [
        import('./models/shop'),
      ],
      component: () => import('./routes/Incomedetail'),
    });
     //个人中心-收货地址
   const Guanliaddress = dynamic({
    app,
    models: () => [
      import('./models/shop'),
    ],
    component: () => import('./routes/Guanliaddress'),
  });
     //个人中心-添加收货地址
     const Adddizhi = dynamic({
      app,
      models: () => [
        import('./models/shop'),
      ],
      component: () => import('./routes/Adddizhi'),
    });
     //个人中心-设置
     const Shezhi = dynamic({
      app,
      models: () => [
        import('./models/shop'),
      ],
      component: () => import('./routes/Shezhi'),
    });
     //个人中心-个人资料修改
     const Modifyinfo = dynamic({
      app,
      models: () => [
        import('./models/shop'),
      ],
      component: () => import('./routes/Modifyinfo'),
    });
     //个人中心-更换手机号
     const Changetel = dynamic({
      app,
      models: () => [
        import('./models/shop'),
      ],
      component: () => import('./routes/Changetel'),
    });
    //关于我们
    const Aboutus = dynamic({
      app,
      models: () => [
        import('./models/shop'),
      ],
      component: () => import('./routes/Aboutus'),
    });
    //切换账号
    const Switchzh = dynamic({
      app,
      models: () => [
        import('./models/shop'),
      ],
      component: () => import('./routes/Switchzh'),
    });
    //我的订单
    const Myorder = dynamic({
      app,
      models: () => [
        import('./models/shop'),
      ],
      component: () => import('./routes/Myorder'),
    });
    //订单详情
    const Orderinfo = dynamic({
      app,
      models: () => [
        import('./models/shop'),
      ],
      component: () => import('./routes/Orderinfo'),
    });
     //消息中心
     const News = dynamic({
      app,
      models: () => [
        import('./models/shop'),
      ],
      component: () => import('./routes/News'),
    });
      //消息中心-详情
      const Newsdetail = dynamic({
        app,
        models: () => [
          import('./models/shop'),
        ],
        component: () => import('./routes/Newsdetail'),
      });
      //已申请-信息
      const Isapply = dynamic({
        app,
        models: () => [
          import('./models/shop'),
        ],
        component: () => import('./routes/Isapply'),
      });

 

   //个人中心-个人资料
   const Personaldata = dynamic({
    app,
    models: () => [
      import('./models/shop'),
    ],
    component: () => import('./routes/Personaldata'),
  });
    
  // 我的团队-个人信息-登录密码
  const Loginpsw = dynamic({
    app,
    models: () => [
      import('./models/shop'),
    ],
    component: () => import('./routes/Loginpsw'),
  });

 
  // 登录
  const Login = dynamic({
    app,
    models: () => [
      import('./models/shop'),
    ],
    component: () => import('./routes/Login'),
  });
  // 忘记密码
  const Forgetpsw = dynamic({
    app,
    models: () => [
      import('./models/shop'),
    ],
    component: () => import('./routes/Forgetpsw'),
  });
  // 立即注册
  const Res = dynamic({
    app,
    models: () => [
      import('./models/shop'),
    ],
    component: () => import('./routes/Res'),
  });
   //完善信息
   const Resbc = dynamic({
    app,
    models: () => [
      import('./models/shop'),
    ],
    component: () => import('./routes/Resbc'),
  });
   //我的报单
   const Mybaodan = dynamic({
    app,
    models: () => [
      import('./models/shop'),
    ],
    component: () => import('./routes/Mybaodan'),
  });
   //立即下单
   const Lijixiadan = dynamic({
    app,
    models: () => [
      import('./models/shop'),
    ],
    component: () => import('./routes/Lijixiadan'),
  });
     //报单详情
     const Baodanxq = dynamic({
      app,
      models: () => [
        import('./models/shop'),
      ],
      component: () => import('./routes/Baodanxq'),
    });
   //vip账号
   const Vipacc = dynamic({
    app,
    models: () => [
      import('./models/shop'),
    ],
    component: () => import('./routes/Vipacc'),
  });
  


  
  
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/Details" exact component={Details} />
        <Route path="/Details2" exact component={Details2} />
        <Route path="/Super" exact component={Super} />
        <Route path="/Personal" exact component={Personal} />
        <Route path="/Personaldata" exact component={Personaldata} />
        <Route path="/Loginpsw" exact component={Loginpsw} />   
        <Route path="/Login" exact component={Login} />
        <Route path="/Forgetpsw" exact component={Forgetpsw} />
        <Route path="/Res" exact component={Res} />
        <Route path="/Resbc" exact component={Resbc} />
        <Route path="/Choosestore" exact component={Choosestore} />
        <Route path="/Fenlei" exact component={Fenlei} />
        <Route path="/Choiceshop" exact component={Choiceshop} />
        <Route path="/Orderimm" exact component={Orderimm} />
        <Route path="/Receivingaddress" exact component={Receivingaddress} />
        <Route path="/Shopcar" exact component={Shopcar} />
        <Route path="/Myteam" exact component={Myteam} /> 
        <Route path="/Teamdetail" exact component={Teamdetail} />
        <Route path="/Newuser" exact component={Newuser} />
        <Route path="/Editaddress" exact component={Editaddress} />  
        <Route path="/Agent" exact component={Agent} /> 
        <Route path="/Mywallet" exact component={Mywallet} />
        <Route path="/Cash" exact component={Cash} />
        <Route path="/Tixiandetail" exact component={Tixiandetail} />
        <Route path="/Incomedetail" exact component={Incomedetail} />    
        <Route path="/Guanliaddress" exact component={Guanliaddress} />
        <Route path="/Adddizhi" exact component={Adddizhi} />  
        <Route path="/Shezhi" exact component={Shezhi} />
        <Route path="/Modifyinfo" exact component={Modifyinfo} />
        <Route path="/Changetel" exact component={Changetel} />  
        <Route path="/Aboutus" exact component={Aboutus} />  
        <Route path="/Switchzh" exact component={Switchzh} />  
        <Route path="/Myorder" exact component={Myorder} />
        <Route path="/Orderinfo" exact component={Orderinfo} /> 
        <Route path="/News" exact component={News} />   
        <Route path="/Newsdetail" exact component={Newsdetail} /> 
        <Route path="/Isapply" exact component={Isapply} />  
        <Route path="/Zhifu" exact component={Zhifu} />
        <Route path="/Baodanlist" exact component={Baodanlist} />
        <Route path="/Mybaodan" exact component={Mybaodan} />
        <Route path="/Lijixiadan" exact component={Lijixiadan} /> 
        <Route path="/Baodanxq" exact component={Baodanxq} />  
        <Route path="/Bankcard" exact component={Bankcard} />
        <Route path="/Vipacc" exact component={Vipacc} />          
      </Switch>
    </Router>
  );
}

export default RouterConfig;
