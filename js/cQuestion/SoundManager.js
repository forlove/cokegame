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
     * @returns {void|SoundInstance|*|c.play|SoundInstance.play|a.play}
     */
    s.play = function(src){
        return createjs.Sound.play(src);
    }

    cQuestion.SoundManager = SoundManager;
    cQuestion.SM = SoundManager;

}())