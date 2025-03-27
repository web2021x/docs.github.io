import axios from "axios";
import TileLayer from "ol/layer/Tile";
import WMTS from "ol/source/WMTS";
import WMTSTileGrid from "ol/tilegrid/WMTS";
import {getTopLeft, getWidth} from "ol/extent";
import {get as getProjection} from "ol/proj";
import XYZ from "ol/source/XYZ";
//请求public文件下静态资源
export function jsonDataGet(url) {
    return new Promise((resolve, reject) => {
        // if(localStorage.getItem(url)){
        //   resolve(JSON.parse(localStorage.getItem(url)));
        // }else{
        axios.request({
            url: url,//直接填写json文件在public下的路径即可
            method: 'get',
        }).then(res => {
            // localStorage.setItem(url,JSON.stringify(res.data))//存在local里，避免多次请求
            resolve(res.data);
        });
        // }
    });
}

//获取地图底图逻辑
export  function baseLayerGet () {
    let staticLayer1 = "";
    let staticLayer2 = "";
    // if (true) {
    //     //省厅交通一张图
    //     const projection = getProjection("EPSG:4326");
    //     const projectionExtent = projection.getExtent();
    //     const size = getWidth(projectionExtent) / 256;
    //     const resolutions = new Array(14);
    //     const matrixIds = new Array(1);
    //     for (let z = 0; z < 14; ++z) {
    //         resolutions[z] = size / Math.pow(2, z);
    //         matrixIds[z] = z;
    //     }
    //     staticLayer1 = new TileLayer({
    //         source: new WMTS({
    //             url: 'https://sdi.zjzwfw.gov.cn/services/wmts/emap/default/oss?token=sy-53e7fd3d-620a-4b42-931e-4b0bcf44ed28',
    //             matrixSet: "c",
    //             format: "tiles",
    //             projection: projection,
    //             tileGrid: new WMTSTileGrid({
    //                 origin: getTopLeft(projectionExtent),
    //                 resolutions: resolutions,
    //                 matrixIds: matrixIds,
    //             }),
    //             style: "default",
    //         }),
    //     });
    //     staticLayer2 = new TileLayer({
    //         source: new WMTS({
    //             url: 'https://sdi.zjzwfw.gov.cn/services/wmts/emap_lab/default/oss?token=sy-53e7fd3d-620a-4b42-931e-4b0bcf44ed28',
    //             matrixSet: "c",
    //             format: "tiles",
    //             projection: projection,
    //             tileGrid: new WMTSTileGrid({
    //                 origin: getTopLeft(projectionExtent),
    //                 resolutions: resolutions,
    //                 matrixIds: matrixIds,
    //             }),
    //             style: "default",
    //         }),
    //     });
    //
    // } else {
    staticLayer1 = new TileLayer({
        title: "天地图矢量图层",
        source: new XYZ({
            url: "http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=1d109683f4d84198e37a38c442d68311",
        })
    });
    staticLayer2 = new TileLayer({
        title: "天地图矢量注记图层",
        source: new XYZ({
            url: "http://t0.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=1d109683f4d84198e37a38c442d68311",
        })
    });

    // }
    return [staticLayer1,staticLayer2]
}
//拷贝数据
export function dataCopy(obj) {
    return JSON.parse(JSON.stringify(obj))
}
//获取当前日期  yy-mm-dd   hh-mf-ss
export function getNowFormatDate () {
    //获取当前时间并打印
    let yy = new Date().getFullYear();
    let mm = new Date().getMonth() + 1;
    mm = mm < 10 ? "0" + mm : mm;
    let dd =
        new Date().getDate() < 10
            ? "0" + new Date().getDate()
            : new Date().getDate();
    let hh = new Date().getHours();
    let mf =
        new Date().getMinutes() < 10
            ? "0" + new Date().getMinutes()
            : new Date().getMinutes();
    let ss =
        new Date().getSeconds() < 10
            ? "0" + new Date().getSeconds()
            : new Date().getSeconds();
    var gettime = yy + "-" + mm + "-" + dd + " " + hh + ":" + mf + ":" + ss;
    return gettime;
};
//获取时间差
export function difference (beginTime, endTime) {
    //获取时间差
    var dateBegin = new Date(beginTime);
    var dateEnd = new Date(endTime);
    var dateDiff = dateEnd.getTime() - dateBegin.getTime(); //时间差的毫秒数
    return dateDiff;
};


