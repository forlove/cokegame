/**
 * Top100 排行榜
 * */

//{"code": 0, "message": "success","data": [{"id":"1", "head":"http://t0.qlogo.cn/mbloghead/ab69767c57b9fdd6783a/100", "nick":"jim", "score":"3339", "level":"1"},{"id":"2", "head":"http://t0.qlogo.cn/mbloghead/ab69767c57b9fdd6783a/100", "nick":"Lucy", "score":"3239", "level":"1"}]}

cokeGame.GameTopInfo = function(parentName)
{
    //要放到哪个容器
    this.parentName = parentName;
    //排行榜信息集合
    this.topInfoList = [];
};

cokeGame.GameTopInfo.prototype.setGameTopInfo = function(topInfo)
{
    if(topInfo.code == cokeGameErrorCode.success)
    {
        //成功
        var i = 0;
        var len = topInfo.data.length;
        var htmlStr = "<div class='gameTop100UL'><ul>";
        var obj = null;
        for(i = 0; i < len; i++)
        {
            obj = topInfo.data[i];
            htmlStr += '<li><img src="' + obj.head + '" />' +
                '<span>昵称"' + obj.nick + '"</span>' +
                '<span>分数"' + obj.score + '"</span>' +
                '<span>等级"' + obj.level + '"</span></li>';
            this.topInfoList.push(topInfo.data[i]);
            obj = null;
        }
        htmlStr += "</ul></div>";
        $(this.parentName).html(htmlStr);
    }
    else
    {
        //失败
        $(this.parentName).html(topInfo.message);
    }
};

cokeGame.GameTopInfo.prototype.getGameTopInfo = function()
{
    return this.topInfoList;
}