/**
 * 检查是否登陆
 * @returns {Boolean} 用户是否登陆,已登录为true
 */
function QQIsLogin() {
    return false;
}
/**
 * QQ注销
 * */
function QQLogout() {
}
/**
 * 登陆用户的qq号
 * @returns {int}
 */
function QQGetNum() {
    return 1838384433;
}
/**
 * QQ登录方法
 * @param {function} loginCallback 登录后会执行回调函数，不会自动刷新当前页
 * @returns {unresolved}
 * */
function QQLoginWithCallback(loginCallback) {
}
/**
 * 获取g_tk参数
 * @returns {int}
 * */
function getGtk() {
    return '53552758';
}
/**
 * qq提醒
 * */
function QQRemind(){
}

//code explain
//    'success' => 0 //操作成功
//    , 'weiboUnavailable' => 2 //没有开通微博
//    , 'noLogin' => 101//用户未登录.
//    , 'wrongParam' => 201 //参数错误
//    , 'tooLongParam' => 204 //参数过长(一般为分享内容过长)
//    , 'notAuthed' => 205 //未授权
//    , 'tooFrequent' => 300 //频次错误,太过频繁
//    , 'overLimit' => 301 //超过一天限制
//    , 'sysError' => 401//系统错误
//    , 'dataUnexpected' => 402//数据异常
//    , 'unknownError' => 900//未知错误

//级别对应关系 
//  伪『可口可乐』粉          ->1 level
//  准『可口可乐』粉          ->2 level
//  菜鸟级『可口可乐』粉->3 level
//  专家级『可口可乐』范->4 level
//  达人级『可口可乐』范->5 level
//  发烧级『可口可乐』范->6 level
//  骨灰级『可口可乐』狂->7 level
//  大神级『可口可乐』狂->8 level

//奖章对应关系
//  快狠准强        ->1  medal
//  慢工细活        ->2  medal
//  小强精神        ->3  medal
//  步步惊心        ->4  medal
//  满分全能        ->5  medal
//  我行我秀        ->6  medal
//  大满贯             ->7  medal
var qqApiiii = {};
var qqApi = {
    version: 'v1.0',
    defaultOption: {async: true, type: 'GET', dataType: 'json'},
    init: function(jq) {
        this.jq = jq;
        this.jq.ajaxSetup({data: {g_tk: getGtk()}});
        this.env = 'dev';
    },
    devSimulateData: {
        'default/getUserInfo': {"code": 0, "message": "success", "data": {"nick":"jim", "head":"http://t0.qlogo.cn/mbloghead/ab69767c57b9fdd6783a/100", "topScore":"1000", "level":"1", "secAdmit":"0", "gender":"female"}} //secAdmit,第二关是否可以开启，0没开启，1表示开启,gender分male或者female
        , 'default/startQuest': {"code": 0, "message": "success","data": {"id":"1"}}
        , 'default/share': {"code": 0, "message": "success"}
        , 'default/saveQuestRes': {"code": 0, "message": "success","data": {"topScoreThis":"990", "topScoreMax":"1000", "avarTime":"30", "accuracy":"40", "errorRate":"60", "ranking":"500", "medal":["1","2"]}}
        , 'default/getUserTotalScore': {"code": 0, "message": "success","data": {"level":"1", "lastFirstScore":"990", "topScoreMax":"1000", "avarTime":"30", "accuracy":"40", "errorRate":"60", "rankBest":"333", "medal":["1","2"]}}
        , 'default/getTop100': {"code": 0, "message": "success","data": [{"id":"1", "head":"http://t0.qlogo.cn/mbloghead/ab69767c57b9fdd6783a/100", "nick":"jim", "score":"3339", "level":"1"},{"id":"2", "head":"http://t0.qlogo.cn/mbloghead/ab69767c57b9fdd6783a/100", "nick":"Lucy", "score":"3239", "level":"1"}]} 
        , 'default/getFriendsRank': {"code": 0, "message": "success","data": [{"id":"1", "head":"http://t0.qlogo.cn/mbloghead/ab69767c57b9fdd6783a/100", "nick":"jim", "score":"3339", "level":"1",  "medal":["1","2"]},{"id":"2", "head":"http://t0.qlogo.cn/mbloghead/ab69767c57b9fdd6783a/100", "nick":"Lucy", "score":"3239", "level":"1", "medal":["3","4"]}]} 
    },
    /* 用于测试接口,参数以此为例  */
    test: function() {
        qqApi.getUserInfo(console.log, {async: false});
        qqApi.startQuest(console.log, {async: false});
        qqApi.share('img url', 'content', console.log);
        qqApi.saveQuestRes('990', '30', '5', '3', '7', '13', '1', '33333333333idkikidkeikdi', console.log, {async: false});
        qqApi.getUserTotalScore(console.log, {async: false});
        qqApi.getTop100(console.log, {async: false});
        qqApi.getFriendsRank(console.log, {async: false});
    },
    ajax: function(url, requestData, fn, option) {
        option = this.jq.extend(this.defaultOption, option);
        requestData = this.jq.extend(option.data, requestData);
        var dataTmp = null;
        this.jq.ajax({
            url: url,
            async: option.async, 
            data: requestData, 
            dataType: option.dataType, 
            type: option.type, 
            success: function(response, textStatus, jqXHR) {
                console.log("ajax:success");
                if (qqApi.env === 'dev') {
                    response = qqApi.devSimulateData[url];
                }
                dataTmp = response;
                if (typeof(fn) === 'function') {
                    fn(response);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                dataTmp = qqApi.devSimulateData[url];
                console.log("dataTmp:" + dataTmp)
                fn(qqApi.devSimulateData[url]);
            }
        });
        return dataTmp;
    },
    
    /**
     * 获取用户信息（头像，昵称，级别，最佳记录）（用户已登录）
     * @param {type} fn 回调函数fn(data) data为服务器返回的json数据,code为0表示正确，非0表有误（以下所有fn都是相同的不在重复描述）
     * @param {type} option  {async: true, type: 'GET', dataType: 'json'} 是否异步,请求类型GET/POST,数据类型可不传（以下option都是相同）
     * @returns {json} 服务器返回的json数据,只有在非异步时才有返回值,异步请求返回null
     * */
    getUserInfo: function(fn, option) {
        //alert(fn);
        option = qqApi.jq.extend({type: 'POST'}, option);
        return this.ajax('default/getUserInfo', {}, fn, option);
    },
    /**
     * 开始答案时调用（用户已登录）
     * @param {type} fn 
     * @param {type} option
     * @returns {unresolved}
     */
    startQuest: function(fn, option){
        option = qqApi.jq.extend({type: 'POST'}, option);
        return this.ajax('default/startQuest', {}, fn, option);
    },
    /**
     * 结束答题时调用（用户已登录）
     * @param {int} topScore 本次答题分数
     * @param {int} avarTime 平均答题时间
     * @param {int} rightNum 答题正确数
     * @param {int} wrongNum 答题错误数
     * @param {int} jumpNum 跳过题的数量
     * @param {int} shareTimes 分享次数
     * @param {int} id 本地答题id，可从接口startQuest返回参数中获得
     * @param {string} md5 id+topScore+shareTimes私钥的md5值，id是startQuest函数返回的id，私钥暂时约定为icoke201309241456
     * @param {type} fn
     * @param {json} option 
     * @returns {unresolved}
     * */
    saveQuestRes: function(topScore, avarTime, rightNum, wrongNum, jumpNum, shareTimes, id, md5, fn, option) {
        option = qqApi.jq.extend({type: 'POST'}, option);
        return this.ajax('default/saveQuestRes', {topScore: topScore,avarTime: avarTime,rightNum: rightNum,wrongNum: wrongNum,jumpNum: jumpNum,shareTimes: shareTimes,md5: md5}, fn, option);
    },
    /**
     * 分享qzone与微博（用户已登录）
     * @param {string} imgUrl 分享图片
     * @param {string} content 分享文案
     * @param {type} fn 
     * @param {type} option
     * @returns {unresolved}
     */
    share: function(imgUrl, content, fn, option) {
       option = qqApi.jq.extend({type: 'POST'},option);
       return this.ajax('default/share', {imgUrl: imgUrl,content: content}, fn, option);
    },
    /**
     * 获取用户个人的所有信息（级别，最近得分，最高得分，平均答题时间，正确率，错误率，全国排名，奖章）
     * @param {type} fn 
     * @param {type} option
     * @returns {unresolved}
     */
    getUserTotalScore: function(fn, option) {
        option = qqApi.jq.extend({type: 'POST'},option);
        return this.ajax('default/getUserTotalScore', {}, fn, option);
    },
    /**
     * 获取得分前100名的数据
     * @param {type} fn
     * @param {type} option
     * @returns {unresolved}
     */
    getTop100: function (fn, option){
        option = qqApi.jq.extend({type: 'POST'},option);
        return this.ajax('default/getTop100', {}, fn, option);
    },
    /**
     * 获取好友排名
     * @param {type} fn 
     * @param {type} option
     * @returns {unresolved}
     * */
    getFriendsRank: function(fn, option) {
        option = qqApi.jq.extend({type: 'POST'}, option);
        return this.ajax('default/getFriendsRank', {}, fn, option);
    }
};

$(function() {
    qqApi.init(jQuery);//jq191 jquery的别名,用于防止冲突,默认为$
});