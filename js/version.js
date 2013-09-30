/**
 * 版本控制
 * Created by went on 13-9-28.
 * qq:307013476
 */
(function(){
    var Version = 0.1;
    var oldBuildPath = createjs.AbstractLoader.prototype.buildPath;
    /**
     * 重写buildPath 实现版本控制
     * @param src
     * @param _basePath
     * @param data
     * @returns {string}
     */
    createjs.AbstractLoader.prototype.buildPath = function(src, _basePath, data){
        if(data == undefined){
            data = {};
        }
        data["v"] = Version;
        return oldBuildPath.call(this,src,_basePath,data)
    };
}());


