/**
 * 获取好友排名
 * */

//{"code": 0, "message": "success","data": [{"id":"1", "head":"http://t0.qlogo.cn/mbloghead/ab69767c57b9fdd6783a/100", "nick":"jim", "score":"3339", "level":"1",  "medal":["1","2"]},{"id":"2", "head":"http://t0.qlogo.cn/mbloghead/ab69767c57b9fdd6783a/100", "nick":"Lucy", "score":"3239", "level":"1", "medal":["3","4"]}]}

cokeGame.GameFriendsRankInfo = function(parentName)
{
    this.parentName = parentName;
    this.friendRankList = [];
};

cokeGame.GameFriendsRankInfo.prototype.setFriendsRankInfo = function(FriendsRankInfo)
{
    if(FriendsRankInfo.code == cokeGameErrorCode.success)
    {
        //成功
        this.friendRankList = FriendsRankInfo.data;
        var i;
        var len =  this.friendRankList.length;
        var obj = null;
        var j;
        var medalLen = 0;

        var htmlStr = "<div class='FriendsRankInfoUL'><ul>";
        for(i = 0; i < len; i++)
        {
            obj = this.friendRankList[i];
            htmlStr += '<li><img src="' + obj.head + '" />' +
                '<span>昵称："' + obj.nick + '"</span>' +
                '<span>分数："' + obj.score + '"</span>' +
                '<span>等级："' + obj.level + '"</span>';

            medalLen = obj.medal.length;
            htmlStr += "<span>奖章：";
            for(j = 0; j < medalLen; j++)
            {
                htmlStr += obj.medal[j];
                if(j < (medalLen-1))
                {
                    htmlStr += ",";
                }
            }
            htmlStr += '</span></li>';
        }
        htmlStr += "</ul></div>";
        $(this.parentName).html(htmlStr);
    }
    else
    {
        //失败
        $(this.parentName).html(FriendsRankInfo.message);
    }
};
