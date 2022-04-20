/// <reference path="multiMarker.d.ts" />
/// <reference path="geometryOverlay.d.ts" />
/// <reference path="../map.d.ts" />
declare namespace TMap {
  interface MarkerClusterOptions {
    id: string;
    map: Map;
    /**
     * 是否启用默认的聚合样式;
     * 默认样式是聚合点的数量量在1-10,11-100,101-1000的样式图标;
     * 默认为true; 如果用户想实现更加炫酷的聚合效果，可以关闭默认样式，
     * 使用getClusters获取到聚合簇数据后通过继承DOMOverlay来实现自定义聚合样式
     */
    enableDefaultStyle?: boolean;
    /**
     * 形成聚合簇的最小个数;默认为2
     */
    minimumClusterSize?: number;
    geometries?: PointGeometry[];
    /**
     * 点击已经聚合的标记点时是否实现聚合分离;
     * 默认为true; 但只对默认样式启用，自定义样式需要开发者监听相应元素的点击事件后使用Map.fitBounds方法实现
     */
    zoomOnClick?: boolean;
    /**
     * 聚合算法的可聚合距离，即距离小于该值的点会聚合至一起，默认为60，
     * 以像素为单位，指的是地图pitch为0时的屏幕像素大小
     */
    gridSize?: number;
    /**
     * 每个聚和簇的中心是否应该是聚类中所有标记的平均值,默认为false
     */
    averageCenter?: boolean;
    /**
     * 采用聚合策略的最大缩放级别，若地图缩放级别大于该值，则不进行聚合。默认为20
     */
    maxZoom?: number;
  }

  interface ClusterInfo {
    center: LatLng; //	聚合簇的位置点
    geometries: PointGeometry[]; //	该聚合簇内的点标记数据数组
    bounds: LatLngBounds; //	聚合簇的边界范围
  }

  type ClusterClickEvent = 'click';
  type ClusterChangeEvent = 'cluster_changed';

  class MarkerCluster {
    /**
     * 多边形
     * @param options 选项
     */
    constructor(options: MarkerClusterOptions);
    /**
     * 设置地图对象，如果map为null意味着将多多边形同时从地图中移除。
     * @param map 地图实例
     */
    setMap(map: null | Map): this;
    /**
     * 更新多边形数据，如果参数为null或undefined不会做任何处理。
     * @param geometries 多边形数据
     */
    setGeometries(geometries: PointGeometry[]): this;
    updateGeometries(geometries: PointGeometry[]): this;
    add(geometries: PointGeometry[]): this;

    /**
     * 获取当前地图视野范围内，聚合后的聚合簇数据；
     * 聚合是异步操作，可以绑定cluster_changed事件获取每次地图上最新的聚合簇
     */
    getClusters(): ClusterInfo[];
    /**
     * 移除指定id的标注点，如果参数为null或undefined不会做任何处理
     * @param ids
     */
    remove(ids: string[]): this;
    on(e: ClusterClickEvent, listener: (obj: Object) => void): this;
    on(e: ClusterChangeEvent, listener: () => void): this;
    off(e: ClusterClickEvent, listener: (obj: Object) => void): this;
    off(e: ClusterChangeEvent, listener: () => void): this;
  }
}
