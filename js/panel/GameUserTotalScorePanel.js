
/**
 * 获取用户个人的所有信息（级别，最近得分，最高得分，平均答题时间，正确率，错误率，全国排名，奖章）
 * */

//{"code": 0, "message": "success","data": {"level":"1", "lastFirstScore":"990", "topScoreMax":"1000", "avarTime":"30", "accuracy":"40", "errorRate":"60", "rankBest":"333", "medal":["1","2"]}}
cokeGame.GameUserTotalScoreInfo = function(parentName)
{
    //要装载的容器
    this.parentName = parentName;
    this.level = "0";
    this.lastFirstScore = "0";
    this.topScoreMax = "0";
    this.avarTime = "0";
    this.accuracy = "0";
    this.errorRate = "0";
    this.rankBest = "0";
    this.medal = [];
};

cokeGame.GameUserTotalScoreInfo.prototype.setUserTotalScore = function(UserTotalScore)
{
    if(UserTotalScore.code == cokeGameErrorCode.success)
    {
        //成功
        this.level = UserTotalScore.data.level;
        this.lastFirstScore = UserTotalScore.data.lastFirstScore;
        this.topScoreMax = UserTotalScore.data.topScoreMax;
        this.avarTime = UserTotalScore.data.avarTime;
        this.accuracy = UserTotalScore.data.accuracy;
        this.errorRate = UserTotalScore.data.errorRate;
        this.rankBest = UserTotalScore.data.rankBest;
        this.medal = UserTotalScore.data.medal;
        trace(UserTotalScore.data.medal);
        var htmlStr = "";
        htmlStr = '<div><ul>' +
            '<li>等级："' + this.level + '"</li>' +
            '<li>最近得分："' + this.lastFirstScore + '"</li>' +
            '<li>最高得分："' + this.topScoreMax + '"</li>' +
            '<li>平均答题时间："' + this.avarTime + '"</li>' +
            '<li>正确率："' + this.accuracy + '"</li>' +
            '<li>错误率："' + this.errorRate + '"</li>' +
            '<li>全国排名："' + this.rankBest + '"</li>';
        var i;
        var len = this.medal.length;
        htmlStr += "<li>奖章：";
        for(i = 0; i < len; i++)
        {
            htmlStr += this.medal[i];
            if(i < (len-1))
            {
                htmlStr += ",";
            }
        }
        htmlStr += "</li>";
        htmlStr += '</ul></div>';

        $(this.parentName).html(htmlStr);
    }
    else
    {
        //失败
        $(this.parentName).html(UserTotalScore.message);
    }
};