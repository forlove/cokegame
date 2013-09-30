/**
 * Created by went on 13-9-28.
 * qq:307013476
 */
this.cQuestion = this.cQuestion||{};
(function(){
    /**
     * 这是一个模板基类
     * 每个模板中应该都有这个类的子类
     * @param question
     * @param dispatcher
     * @param parentId
     * @constructor
     */
    var QuestionRenderBase = function(question,parentId){
        this.initialize(question,parentId);
    };

    cQuestion.QuestionRenderBase = QuestionRenderBase;
    cQuestion.QRB = QuestionRenderBase

    var p = utils.extendsClass(QuestionRenderBase,createjs.EventDispatcher);

    /**
     * 模板移除时记得销毁
     *
     * 如果在模版中增加了事件监听 dispose时候要消除事件引用
     * 主要是消除dispater的事件
     */
    p.dispose = function(){
        this.question = null;
        this.parentId = null;
    };

    /**
     * 取 父类中的jquery对象 通过 className
     * @param className
     * @returns {*|jQuery|HTMLElement}
     * @private
     */
    p._$ = function(className){
        var parentSelect = "#" + this.parentId;
        return $(parentSelect).find("."+ className);
    }


    /**
     * 初始化
     * @param question
     * @param dispatcher
     * @param parentId
     */
    p.initialize = function(question,parentId){
        this.question = question;
        this.parentId = parentId;
    };




    p.question = null;
    p.parentId = "";

}());
