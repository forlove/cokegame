/**
 * Created by went on 13-9-28.
 * qq:307013476
 */
this.cQuestion = this.cQuestion || {};
(function(){
    /**
     * 一个拼图游戏
     * @param stage
     * @constructor
     */
   var MosaicGame = function(stage){
       this.initialize();
       this.stage = stage;
       stage.enableMouseOver(10);
       //stage.mouseMoveOutside = true;
       createjs.Ticker.addEventListener("tick", this._tickHandler.bind(this));
   };
   var p = utils.extendsClass(MosaicGame,createjs.EventDispatcher);
   var s = MosaicGame;
    /**
     * 判定范围
     * @type {number}
     */
    s.RATE = 5;
    cQuestion.MosaicGame = MosaicGame;


    /**
     *
     * @param param
     * 格式如下
     * {"bg":"assets/bg.jpg","imags":[{"src":"assets/s1.png","x":0,"y":0,"tx":179,"ty":22},
     *                   {"src":"assets/s1.png","x":0,"y":0,"tx":100,"ty":10}]}
     *
     */
    p.initGame = function(param){
        this._gameData = this._parseGameData(param);
        this._initBg();
        this._initImages();
    };

    /**
     * 是否更新
     * @type {boolean}
     * @private
     */
    p._update = false;

    /**
     * render
     * @param event
     * @private
     */
    p._tickHandler = function(event){
        if (this._update) {
            this._update = false; // only update once
            this.stage.update(event);
        }
    };



    /**
     * 当前完成数
     * @type {number}
     * @private
     */
    p._currentCompeteNum = 0;

    /**
     * 解析函数
     * @param param
     * @returns {*}
     * @private
     */
    p._parseGameData = function(param){
        return param;
    };


    p._gameData = null;
    p.stage = null;

    /**
     * 初始化背景
     * @private
     */
    p._initBg = function(){
        var image = this._getImage(this._gameData.bg);
        if(!image){
            return;
        }
        var bitMap = new createjs.Bitmap(image);
        this.stage.addChild(bitMap);
        this._update = true;
        this._tickHandler();

    };

    /**
     *
     * @param imageOrUrl
     * @returns {*}
     * @private
     */
    p._getImage = function(imageOrUrl){
        var image = null;
        if(typeof imageOrUrl == "string"){
            var image = new Image();
            image.src = imageOrUrl;
        }else if(imageOrUrl instanceof Image){
            image = imageOrUrl;
        }
        return image
    }


    /**
     * 初始化图片
     * @private
     */
    p._initImages = function(){
        var images = this._gameData.imags;
        var len = images.length;
        for(var i=0;i<len;i++){
            var imageData = images[i];
            var image = this._getImage(imageData.src);
            if(!image){
                break;
            }
            var bitmap = new createjs.Bitmap(image);
            this.stage.addChild(bitmap);
            bitmap.x = imageData.x;
            bitmap.y = imageData.y;
            bitmap.cursor = "pointer";

            bitmap.on("mousedown", this._imagesMouseEventHandler.bind(this));
            bitmap.on("pressmove", this._imagesMouseEventHandler.bind(this));
            bitmap.on("rollover", this._imagesMouseEventHandler.bind(this));
            bitmap.on("rollout", this._imagesMouseEventHandler.bind(this));
            bitmap.on("pressup", this._imagesMouseEventHandler.bind(this));
            bitmap.imageData = imageData;
        }
        this._update = true;
        this._tickHandler();
    };
    /**
     * move
     * @param evt
     * @private
     */
    p._imagesMouseEventHandler = function(evt){
        var eventType = evt.type;
        var target = evt.target;
        switch(eventType){
            case "mousedown":
                target.parent.addChild(target);
                target.offset = {x:target.x-evt.stageX, y:target.y-evt.stageY};
                break;
            case "rollover":

                break;
            case "pressmove":
                target.x = evt.stageX+ target.offset.x;
                target.y = evt.stageY+ target.offset.y;
                break;
            case "rollover":
                break;
            case "rollout":
                break;
            case "pressup":
                var imageData = target.imageData;
                if((Math.abs(target.x-imageData.tx) < cQuestion.MosaicGame.RATE) && (Math.abs(target.y-imageData.ty) < cQuestion.MosaicGame.RATE)){
                    target.mouseEnabled = false;
                    target.cursor = null;
                    target.x = imageData.tx;
                    target.y = imageData.ty;
                    this._currentCompeteNum++;
                    if(this._currentCompeteNum >= this._gameData.imags.length){
                        this.dispatchEvent("complete");
                        trace("完成了");
                    }
                }
                break;
        }
        this._update = true;
    };
}());
