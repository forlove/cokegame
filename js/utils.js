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
    getImageSrc:function(str,arr){
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
     * 返回所有<a> 标签的href为音乐
     * @param str
     * @param arr
     */
    getSoundSrc:function(str,arr){
        if(arr == undefined){
            arr = [];
        }
        var parent = $("<div></div>");
        parent.append($(str));
        parent.find("a").each(function(i,val){
            var url = $(val).attr("href");
            if(utils.isSoundUrl(url)){
                if(arr.indexOf(url) == -1){
                    arr.push(url);
                }
            }
        })
        return arr;
    },

    /**
     * 是不是音乐
     * @param str
     * @returns {boolean}
     */
    isSoundUrl:function(str){
        var path = str.split(".");
        extension = path[path.length-1];
        switch(extension){
            case "wav":
            case "mp3":
            case "ogg":
                return true;
        }
        return false;
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
 * 打印堆栈
 */
var track = function(){
    try{throw(new Error("error"))}catch(e){
        var arr = e.stack.split("\n");
        arr.splice(0,1);
        console.log(arr.join("\n"));
    }
};

/**
 * 打印
 * 支持多数
 * trace("xxx","yyy","zzz");
 * @param str
 */
var trace = function(){
    var arr = [];
    var track;
    try{throw(new Error("error"))}catch(e){
        track = "(" +e.stack.split("\n")[1] + ")";
    }
    var len = arguments.length;
    for(var i = 0;i<len;i++){
        arr.push(arguments[i])
    }
    console.log(arr.join(",") +"\ntrack"+ track);
};

