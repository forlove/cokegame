/**
 * 资源管理器
 * User: went
 * Date: 13-9-27
 * Time: 下午1:14
 *  To change this template use File | Settings | File Templates.
 */
this.cQuestion = this.cQuestion||{};
(function(){
    var AssetsManager = function(){
        throw("AssetsManager不能被实例化");
    };
    cQuestion.AssetsManager = AssetsManager;
    cQuestion.AM = AssetsManager;
    var a = AssetsManager;

    var TEMPLETE_ASSETS = [
        {src:"data/questionTemplete.render1",id:"questionTemplete.render1"},
        {src:"data/questionTemplete.render2",id:"questionTemplete.render2"},
        {src:"data/questionTemplete.render3",id:"questionTemplete.render3"}
    ];

    /**
     * 保存一些要预先加载的图片
     * 可能比较大的图片要先加载 好
     * @type {Array}
     */
    var DEFAULT_IMAGE_ASSETS = [
        "assets/bg.jpg","assets/s1.png"
    ];

    /**
     * 问题资源
     * @type {Array}
     */
    var QUESTIONS_ASSETS = [
        {src:"data/question.json",id:"questions"}
    ];

    var SOUND_ASSETS = [
        {src:"assets/sound.mp3|assets/sound.ogg",id:"bgSound"}
    ];

    var getDefaultManiFest = function(){
        return TEMPLETE_ASSETS.concat(QUESTIONS_ASSETS,DEFAULT_IMAGE_ASSETS,SOUND_ASSETS);
    };

    /**
     * 返回一个问题模板
     * @param questionType
     * @returns {*|HTMLImageElement|HTMLAudioElement|Object}
     */
    a.getTemplete = function(questionTemleteName){
        return this.loader.getResult(questionTemleteName);
    };

    /**
     * 获取问题列表
     * @param questions
     * @returns {Array}
     */
    a.getQuestions = function(questions){
        if(!questions){
            questions = "questions1"
        }
        var results = this.loader.getResult("questions");
        if(!results){
            return;
        }
        var arr = results[questions];
        var questions = [];
        var len = arr.length;
        for(var i=0;i<len;i++){
            var obj = arr[i];
            var q = new cQuestion.Question();
            q.parseFormJson(obj);
            questions.push(q);
            preLoadQuestionAssets(q);
        }
        /**
         * 预加载的资源
         * @param question
         */
        function preLoadQuestionAssets(question){
            var conents = question.content;
            initJsonContentAsset(conents);
        }

        function initJsonContentAsset(json){
            if(json instanceof Array){
                var len = json.length;
                for(var i=0;i<len;i++){
                    var childJson = json[i];
                    initJsonContentAsset(childJson);
                }
            }else if(json instanceof Object){
                for(var key in json){
                    var value = json[key];
                    if(typeof value == "string"){
                        var asset = cQuestion.AM.getResult(value);
                        if(asset){
                            json[key] = asset;
                        }
                    }else{
                        initJsonContentAsset(value)
                    }
                }
            }
        }
        this.stopPreLoad();
        this.preloadQuestions(questions);

        return questions;
    };


    a.loader = null;

    a.init = function(){
        this.loader = a.loader||new createjs.LoadQueue(false);

        this.loader.removeAll ();
        this.loader.setMaxConnections(5);
        this.loader.installPlugin(createjs.Sound);
        var maniFest = getDefaultManiFest();
        this.loader.loadManifest(maniFest);

    };

    /**
     * 得到加载的资源
     * @param idOrUrl
     * @param rawResult
     * @returns {*|HTMLImageElement|HTMLAudioElement|Object}
     */
    a.getResult = function(idOrUrl,rawResult){
        return this.loader.getResult(idOrUrl,rawResult);
    };

    /**
     * 预加载资源
     * @param question
     */
    a.preloadQuestions = function(question){
        var arr;
        if(question instanceof cQuestion.Question){
            arr = [question];
        }else if(question instanceof  Array){
            arr = question;
        }else{
            return;
        }
        var len = arr.length;
        var manifest = [];
        for(var i=0;i<len;i++){
            var q = arr[i];
            utils.getImageImgSrc(q.title,manifest);
            utils.getImageImgSrc(q.content,manifest);
        }
        this.loader.loadManifest(manifest,false)
    };

    /**
     * 停止后台加载
     */
    a.stopPreLoad = function(){
        this.loader.setPaused(true);
    };
    /**
     * 开启后台加载
     */
    a.startPreLoad = function(){
        this.loader.load();
    }





}());

