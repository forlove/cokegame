/**
 * Created by went on 13-9-28.
 * qq:307013476
 */

var utils = {
    /**
     * 返回所有<img> 标签的src属性
     * @param str
     * @returns {Array}
     */
    getImageImgSrc:function(str,arr){
        var img=/<img\s.*?\s?src\s*=\s*['|"]?([^\s'"]+).*?>/ig;
        if(arr == undefined){
            arr = [];
        }
        while(result=img.exec(str)){
            for(var i=result.length-1;i;--i){
                var url = result[i];
                if(arr.indexOf(url) == -1){
                    arr.push(url);
                }
            }
        }
        return arr;
    },
    /**
     * 让classA 原型继承 classB
     * ClassB是父类
     * @param classA
     * @param classB
     * @returns {prototype}
     */
    extendsClass:function(classA,classB){
        var p = classA.prototype = new classB();
        p.constructor = classA;
        return p;
    }

}

/**
 * 打印
 * 支持多数
 * trace("xxx","yyy","zzz");
 * @param str
 */
var trace = function(){
    var len = arguments.length;
    var arr = [];
    for(var i = 0;i<len;i++){
        arr.push(arguments[i])
    }
    console.log(arr.join(","));
}