/**
 * Created with JetBrains WebStorm.
 * User: went
 * Date: 13-9-27
 * Time: 上午9:55
 *  To change this template use File | Settings | File Templates.
 */

this.cQuestion = this.cQuestion||{};
(function(){
    /**
     * 遊戲进程管理器
     * 继承自 createjs.EventDispatcher
     * 可以收发事件
     * @param param
     * {
     *
     *
     * }
     * @constructor
     */
    var QustionManager = function(param){
        this.divContent = param;
        this.initialize(param);
    };

    cQuestion.QustionManager = QustionManager;

    var p = utils.extendsClass(QustionManager,createjs.EventDispatcher);

    var s = QustionManager;

    s.REST_TIME = 5;

    //events
    /**
     *  complete: 表示答题完成
     *  tick: 表示时钟
     *  questionChange: 问题改变了
     *  rest:休息时间到了
     *
     */

    /**
     * 主容器
     * @type {jquery对象}
     */
    p.divContent = null;

    /**
    * 开始
     */
    p.start = function(){
        this.currentQuestionIndex = 0;
        this.showQuestion(this.currentQuestionIndex);
    };

    /**
    * 下一题
    * */
    p.nextQuestion = function(){
        this.pause();
        var nextIndex = this.currentQuestionIndex + 1;
        this.currentQuestionIndex++;
        if(this.currentQuestionIndex % 5 == 0 && !this._restTime){
            this._restTime = true;
            this.currentTime = QustionManager.REST_TIME;
            this.dispatchEvent("rest");
            this.play();
            cQuestion.AM.startPreLoad();
            return;
        }
        cQuestion.AM.stopPreLoad();
        this._restTime = false;
        this.currentTime = 30;
        this.currentQuestionIndex = nextIndex;
        if(this.currentQuestionIndex >= this.questions.length){
            this.dispatchEvent("complete");
            //题目做完了
            return;
        }
        this.showQuestion(this.currentQuestionIndex);
        this.dispatchEvent("questionChange");
        this.play();

    }

    /**
     * 显示试题
     * @param index
     */
    p.showQuestion = function(index){
        var question = this.questions[index];
        if(question){
            var param = {};
            var templete = cQuestion.AM.getTemplete(question.template);
            if(!templete){
                alert("没找到对应模版:"+question.template);
                return;
            }
            var divContentId = this.divContent.attr("id");
            var newMethod = "Templete1";
            this._renderContent(templete);
            if(this._renderBase){
                this._renderBase.off("result",this._renderEventHander);
                this._renderBase.off("skip",this._renderEventHander);
                this._renderBase.dispose();
            }
            this._renderBase = eval("new "+question.template+"(question,divContentId)");
            this._renderBase.on("result",this._renderEventHander,this,true);
            this._renderBase.on("skip",this._renderEventHander,this,true);

        }


    }


    p._renderBase = null;

    /**
     * 暂停当前计时
     */
    p.pause = function(){
        clearInterval(this._tickTimer);
    }

    /**
     * 开始计时
     */
    p.play = function(){
        this._tickTimer = setInterval(this._tickHandler.bind(this),1000)
    }

    /**
     * 刷新html
     * @param html
     * @private
     */
    p._renderContent = function(html){
        this.divContent.html(html);
    }

    /*
    *设置试题
     */
    p.setQuestions = function(val){
        this.questions = val;
        this.results = [];
        this.totalScore = 0;
        this.currentQuestionIndex = -1;
    }

     /**
     * 返回这个问题的结果 得分
     * @indexOrRuestion 索引或者question
     * @return
     * {
     *     score:100,
     *     result:{}
     *
     * }
     * */
    p.getResult = function(indexOrRuestion){
        var index = -1;
        if(typeof indexOrRuestion == "number"){
            index = indexOrRuestion;
        }else{
            index = this.questions.indexOf(indexOrRuestion);
        }

        return this.results[index];
    }

    /**
     * 初始化
     * @param param
     */
    p.initialize = function(param){
        this.play();

    };

    /**
     * 跳过当前问题
     */
    p.skipCurrentQuestion = function(){
        var result = {};
        result.score = 0;
        this.results[this.currentQuestionIndex] = result;
        this.nextQuestion();
    };

    /**
     * 休息时间
     * @type {boolean}
     * @private
     */
    p._restTime = false;


    /**
     * 时钟监听
     * @private
     */
    p._tickHandler = function(){
        this.currentTime--;
        if(this.currentTime == 0){
            this.skipCurrentQuestion();

        }
        this.dispatchEvent("tick");
    };

    /**
     * 接收来自render的事件
     * @param e
     * @private
     */
    p._renderEventHander = function(e){
        var eventType = e.type;
        switch(eventType){
            case "result":
                var result = {};
                result.answer = e.data;
                var question = this.questions[this.currentQuestionIndex];
                if(question.answerIsRight(e.data)){
                    result.score = this.currentTime;
                    this.totalScore += result.score;
                }else{
                    result.score = 0;
                }
                this.results[this.currentQuestionIndex] = result;
                this.nextQuestion();
                break;
            case "skip":
                this.skipCurrentQuestion();
                break;
        }

    }


    /**
     * 总分
     * @type {number}
     */
    p.totalScore = 0;

     /*
     * 所有问题
     * */
    p.questions = [];
    /*
    * 结果 格式如下
    * {
    *   answer:{},
    *   score:{}
    * }
    * */
    p.results = [];

    /*
    * 当前在正回答的问题索引
    * */
    p.currentQuestionIndex = -1;

    /**
     * 当前剩余时间
     * @type {number}
     */
    p.currentTime = 30;

    /**
     * 计时器引用
     * @type {null}
     * @private
     */
    p._tickTimer = null;



}());
