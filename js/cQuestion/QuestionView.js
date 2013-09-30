/**
 *
 * 视图
 * Created by went on 13-9-30.
 * qq:307013476
 */
this.cQuestion = this.cQuestion||{};
(function(){

    /**
     *
     * @param autoInit 自动初始化
     * @constructor
     */
    var QuestionView = function(autoInit){
        if(autoInit == undefined)
            autoInit = true;
        if(autoInit){
            this.init();
        }
    };
    var p = QuestionView.prototype;
    cQuestion.QuestionView = QuestionView;
    cQuestion.QV = QuestionView;

    p.init = function(){
      track();
        var questionManager;
        cQuestion.AM.init();
        cQuestion.AM.loader.on("complete",function(e){
            initView();
            initManager();
            //var playParam = {loop:-1,completeCallBack:musicCallBack};
            cQuestion.AM.loader.off("progress",prgressHandler);
            var s = cQuestion.SM.play("bgSound");

        },null,true);
        cQuestion.AM.loader.on("error",function(e){
            alert("加载失败:" + e.item.src + "可能要在服务器环境下测试。。。")
        });
        cQuestion.AM.loader.on("progress",prgressHandler);

        function prgressHandler(e){
            var pre = (e.progress/e.total);

            $("#progree").attr("value",pre);
        }
        function musicCallBack(){
            trace("musicCompleted");
        }
        var initView = function(){
            $("#tips").hide();
            $("#closeTips").click(function(){
                $("#tips").hide();
                questionManager.play();
            });

        };

        var initManager = function(){
            questionManager = new cQuestion.QustionManager($("#question"));
            var questions = cQuestion.AM.getQuestions();

            questionManager.setQuestions(questions) ;
            questionManager.start();
            updateTime();

            questionManager.on("complete",managerEventHandler);
            questionManager.on("tick",managerEventHandler);
            questionManager.on("questionChange",managerEventHandler);
            questionManager.on("rest",managerEventHandler);
            questionManager.on("showTips",managerEventHandler);
            //ddd


            function updateScore(){
                $("#totalScore").html(questionManager.totalScore);
            }

            function updateTime(){
                $("#time").html(questionManager.currentTime);
            }

            /**
             * mamager事件监听
             * @param e
             */
            function managerEventHandler(e){
                var eventType = e.type;
                switch(eventType){
                    case "complete":
                        $("#question").html("完成了");
                        $("#time").hide();
                        updateScore();
                        break;
                    case "tick":
                        updateTime();
                        break;
                    case "questionChange":
                        updateTime();
                        updateScore();
                        break;
                    case "rest":
                        $("#question").html("休息时间");
                        updateTime();
                        updateScore();
                        break;
                    case "showTips":
                        trace(questionManager);
                        $("#tipsContent").html(questionManager.getCurrentQuestion().tips);
                        $("#tips").show();
                        $("#tipsContent a").each(function(i,val){
                            $(val).click(function(e){
                                e.preventDefault();
                                cQuestion.SM.play(val.href)
                            });

                        });
                        break;
                }
            }
        };
    };


}());
