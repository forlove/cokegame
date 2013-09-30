/**
 * Created with JetBrains WebStorm.
 * User: went
 * Date: 13-9-27
 * Time: 上午9:37
 *  To change this template use File | Settings | File Templates.
 */

this.cQuestion = this.cQuestion||{};
(function(){
    /**
     * 试题
     * @constructor
     */
    var Question = function(){
    };
    cQuestion.Question = Question;
    var p = Question.prototype;

    /*
     * 标题
     */
    p.title;

    /*
    *内容 json
    * 比如[{a:xxx},{b:xxx}]
    */
    p.content;

    /*
    * 题目类型
    * 见Const.QUESTION_TYPE
     */
    p.questionType = QUESTION_TYPE.SINGLE_CHOICE;

    /**
     * 问题模板
     * @type {string}
     */
    p.template = "";

    p.answer = null;

    /**
     * 解析自json
     * @param json
     */
    p.parseFormJson = function(json){
        this.title = json.title;
        this.content = json.content;
        this.answer = json.answer;
        this.questionType = json.type;
        this.template = json.templete;

    }

    /**
     * 这个答案是对的吗
     * @param answer
     * @returns {boolean}
     */
    p.answerIsRight = function(answer){
        return answer == this.answer;
    }


}());
