// JavaScript Document
/**

*/

cokeGame.GameloginInfo = function(parentName){

    //要放到哪个容器
    this.parentName = parentName;
    //头像地址
    this.head = "";
    //等级
    this.level = "1";
    //昵称
    this.nick = "test";
    //第二关是否可以开启，0没开启，1表示开启  默认是0
    this.secAdmit = "0";
    //最佳记录
    this.topScore = "0";
    //性别 gender分male或者female
    this.gender = "female";
};
/**
 * 是否开启了第二关
 * */
cokeGame.GameloginInfo.prototype.isSecAdmit = function() {
  return this.secAdmit == "1";
};
/**
 * 设置用户信息
 * */
cokeGame.GameloginInfo.prototype.setUseInfoBack = function(userInfo){
    //console.log("userInfo:" + userInfo);
    //console.log("level:" + this.level)
    if(userInfo.code == cokeGameErrorCode.success)
    {
        //成功了
        this.head = userInfo.data.head;
        this.level = userInfo.data.level;
        this.nick = userInfo.data.nick;
        this.secAdmit = userInfo.data.secAdmit;
        this.topScore = userInfo.data.topScore;
        this.gender = userInfo.data.gender;
        $(this.parentName).html('' +
            '<div><img src="'+this.head+'"></div>' +
            '<div class="GameloginInfoUL"><ul>' +
            '<li>昵称："'+this.nick+'"</li>' +
            '<li>性别："'+this.gender+'"</li>' +
            '<li>等级："'+this.level+'"</li>' +
            '<li>最高分："'+this.topScore+'"</li>' +
            '</ul></div>' +
            '<div><a href="javascript:void(0);" onclick="cokeGameApi.exitLogin()">退出登录</a></div>'
        );
    }
    else
    {
        //数据有问题 打印日志
        $(this.parentName).html(userInfo.message);
    }
};
/**
 * QQ登出
 * */
cokeGame.GameloginInfo.prototype.QQlogout = function()
{
    $(this.parentName).html('<div id="GameloginInfo"><a href="javascript:void(0);" onclick="cokeGameApi.checkLogin()">登录</a></div>');
};
