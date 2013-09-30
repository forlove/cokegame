// JavaScript Document
/*
 * 
 */
cokeGame.loginInfo = new cokeGame.GameloginInfo("#gameloginInfo");
var cokeGameApi = {
	checkLogin:function()
	{
		//QQ登录接口检测
		var isLogin = QQIsLogin();
		if(isLogin)
		{
			//登录了 该干嘛 干嘛
			
		}
		else
		{
			//你妹 还没登录啊
			//alert("没登录");
			//qqApi.getUserInfo(console.log, {async: false});
            qqApi.getUserInfo(getUserInfoBack);
		}
	},
    exitLogin:function()
    {
        QQLogout();
        cokeGame.loginInfo.QQlogout();
    },
    getTop100:function()
    {
        cokeGame.gameTopInfo = cokeGame.gameTopInfo||new cokeGame.GameTopInfo("#gameTop100");
        qqApi.getTop100(getTop100Back);
    },
    getUserTotalScore:function()
    {
        cokeGame.gameUserTotalScoreInfo = cokeGame.gameUserTotalScoreInfo||new cokeGame.GameUserTotalScoreInfo("#gameUserTotalScore");
        qqApi.getUserTotalScore(getUserTotalScore);
    },
    getFriendsRank:function()
    {
        cokeGame.gameFriendsRankInfo = cokeGame.gameFriendsRankInfo||new cokeGame.GameFriendsRankInfo("#gameFriendsRank");
        qqApi.getFriendsRank(getFriendsRank);
    },
    startQuestion:function(fn)
    {
        qqApi.startQuest(fn,{async: false});
    },
    startShare:function(imgUrl, content, fn) {
        qqApi.share(imgUrl, content, fn, {async: false});
    },
    startSaveQuestRes: function(topScore, avarTime, rightNum, wrongNum, jumpNum, shareTimes, id, md5, fn) {
        qqApi.saveQuestRes('990', '30', '5', '3', '7', '13', '1', '33333333333idkikidkeikdi', fn, {async: false});
    },
}
/**
 * 获取用户登录信息回调
 * */
function getUserInfoBack(data)
{
    trace("getUserInfoBack:" + cokeGame.loginInfo);
    cokeGame.loginInfo.setUseInfoBack(data);
}
/**
 * 获取前100排行榜数据回调
 * */
function getTop100Back(data)
{
    trace("getTop100Back:" + cokeGame.gameTopInfo);
    cokeGame.gameTopInfo.setGameTopInfo(data);
}
/**
 * 获取用户个人的所有信息（级别，最近得分，最高得分，平均答题时间，正确率，错误率，全国排名，奖章）
 * */
function getUserTotalScore(data)
{
    trace("getUserTotalScore:" + cokeGame.gameUserTotalScoreInfo);
    cokeGame.gameUserTotalScoreInfo.setUserTotalScore(data);
}
/**
 * 获取好友排名
 * */
function getFriendsRank(data)
{
    trace("getFriendsRank:" + cokeGame.gameFriendsRankInfo);
    cokeGame.gameFriendsRankInfo.setFriendsRankInfo(data);
}
$(function(){
	$("#box").click(function(){
		$(this).overlay({
		   closeOnClick: true
		  });	 
	});
    $("#gameTop100").click(function(){
        cokeGameApi.getTop100();
    });
    $("#gameUserTotalScore").click(function(){
        cokeGameApi.getUserTotalScore();
    });
    $("#gameFriendsRank").click(function(){
        cokeGameApi.getFriendsRank();
    });
    //检测是否登录了
	cokeGameApi.checkLogin();
});
