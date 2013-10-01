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
            $("#questionContent").on('cycle-after', function( event, opts ) {
                var allNum = opts.slideNum;
                for(var i = 0;i<allNum-1;i++)
                {
                    $("#questionContent").cycle("remove",i);
                }
                console.log(allNum);
                console.log(opts);
            });
            $("#tips").hide();
            $("#closeTips").click(function(){
                $("#tips").hide();
                questionManager.play();
            });

        };

        var showQuestionContent = function(str,rmoveAfter){
            var  qc = $("#questionContent");
            var content = $("<div></div>");
            content.css({'border-style':'solid', 'border-width':'5px','position':'absolute'});
            content.append(str);
            qc.cycle("add",content);
            qc.cycle("next");
        };

        var initManager = function(){
            questionManager = new cQuestion.QustionManager($("#questionContent"));
            questionManager.on("complete",managerEventHandler);
            questionManager.on("tick",managerEventHandler);
            questionManager.on("questionChange",managerEventHandler);
            questionManager.on("rest",managerEventHandler);
            questionManager.on("showTips",managerEventHandler);
            questionManager.on("showQuestion",managerEventHandler);
            var questions = cQuestion.AM.getQuestions();

            questionManager.setQuestions(questions) ;
            questionManager.start();
            updateTime();


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
                        showQuestionContent("完成了");
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
                        showQuestionContent("休息时间");
                        updateTime();
                        updateScore();
                        break;
                    case "showTips":
                        trace(questionManager);
                        $("#tipsContent").html(questionManager.getCurrentQuestion().tips);
                        $("#tips").show();
                        $("#tipsContent a").each(function(i,val){
                            var sound = $(val).data("sound");
                            if(sound){
                                $(val).click(function(e){
                                    e.preventDefault();
                                    cQuestion.SM.play(sound)
                                });
                            }


                        });
                        break;
                    case "showQuestion":
                        var templete = cQuestion.AM.getTemplete(e.data.template);
                        if(!templete){
                            alert("没找到对应模版:"+question.template);
                            return;
                        }
                        showQuestionContent(templete);
                        break;
                }
            }
        };
    };


}());
