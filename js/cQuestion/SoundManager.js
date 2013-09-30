/**
 * Created by went on 13-9-29.
 * qq:307013476
 */
this.cQuestion = this.cQuestion||{};
(function(){
    /**
     * 声音管理
     * @constructor
     */
    var SoundManager = function(){
        throw("SoundManager不能被实例化");
    }

    var p = utils.extendsClass(SoundManager,createjs.EventDispatcher);

    var s = SoundManager;

    /**
     * 播放音乐
     * @param src srcOrId
     * @param param
     * {
     *  loop:-1,
     *  completeCallBack = function;
     * }
     * @returns {void|SoundInstance|*|c.play|SoundInstance.play|a.play}
     */
    s.play = function(src,param){
        if(param){
            var loop = param.loop;
            if(loop == undefined){
                loop = 0;
            }
            var completeCallBack = param.completeCallBack;
        }
        var instance = createjs.Sound.play(src,createjs.Sound.INTERRUPT_ANY,0,0,loop);
        if(completeCallBack){
            trace(instance.on);
            instance.addEventListener("complete",completeCallBack)
        }
        return instance;
    }

    cQuestion.SoundManager = SoundManager;
    cQuestion.SM = SoundManager;

}())