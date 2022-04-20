/// <reference path="geometryOverlay.d.ts" />
/// <reference path="../map.d.ts" />
declare namespace TMap {
  // CircleStyle配置参数。
  interface CircleStyleOptions {
    color?: string; //	面填充色，支持rgb()，rgba()，#RRGGBB等形式。
    showBorder?: boolean; //	是否显示边线，默认为false。
    borderColor?: string; //	边线颜色，支持rgb()，rgba()，#RRGGBB等形式，默认为#3777FF，showBorder为true时有效。
    borderWidth?: number; //	边线宽度，正整数，单位为像素，指的是地图pitch为0时的屏幕像素大小，如果pitch不为0，实际绘制出来的线宽度与屏幕像素会存在一定误差，默认为2，showBorder为true时有效
  }

  interface CircleStyle extends CircleStyleOptions {}
  class CircleStyle {
    constructor(options?: CircleStyleOptions);
  }

  interface ExtrudablePolygonStyle {
    color: string; //	线填充色，支持rgb()，rgba()，#RRGGBB等形式。
    extrudeHeight: number; //	多边形拔起高度，默认为1，单位米。
    showBorder: boolean; //是否显示拔起面块的边线，拔起面块的边线不支持设置宽度，永远为1像素宽度。
    borderColor: string; //	边线颜色，支持rgb()，rgba()，#RRGGBB等形式，showBorder为true时有效。
  }
  interface MultiCircleStyleHash {
    [key: string]: CircleStyle;
  }
  interface CircleGeometry<T = any> extends Geometry<T> {
    center: LatLng | LatLngData; //	圆的中心点位置
    radius: number; //	圆的半径，正数，单位为米
  }

  interface MultiCircleOptions {
    id: string; // 	图层id，若没有会自动分配一个
    map: TMap.Map; // 	显示多圆图层的底图
    zIndex?: number; // 	图层绘制顺序
    styles?: MultiCircleStyleHash; // 	圆的相关样式
    geometries?: CircleGeometry[]; // 	圆数据数组
  }

  class MultiCircle extends GeometryOverlay {
    /**
     * 多圆的参数对象
     * @param options 选项
     */
    constructor(options: MultiCircleOptions);
    /**
     * 设置图层绘制顺序
     * @param zIndex 顺序
     */
    setZIndex(zIndex: number): this;
    /**
     * 更新多圆数据，如果参数为null或undefined不会做任何处理
     * @param geometries 图形数据
     */
    setGeometries(geometries: CircleGeometry[]): this;
    /**
     * 获取多圆数据
     * @param geometries 图形数据
     */
    getGeometries(geometries: CircleGeometry[]): this;
    /**
     *根据多圆数据id来获取点数据(geometries: CircleGeometry[]): this;
     * @param id 圆数据 id
     */
    getGeometryById(id: string): CircleGeometry;
    /**
     * 更新多圆数据，如果geometry的id存在于集合中，会更新对id的数据，
     * 如果之前不存在于集合中，会作为新的圆添加到集合中；如果参数为null或undefined不会做任何处理
     * @param geometries 图形数据
     */
    updateGeometries(geometries: CircleGeometry[]): this;
    /**
     * 设置MultiCircle图层相关样式信息，如果参数为null或undefined不会做任何处理
     * @param styles 图层样式
     */
    setStyles(styles: MultiCircleStyleHash): this;
    /**
     * 获取图层相关样式信息
     * @param styles 图层样式
     */
    getStyles(styles: MultiCircleStyleHash): this;
    /**
     * 向图层中添加圆，如果geometry的id已经存在集合中，则该geometry不会被重复添加，如果geometry没有id或者id不存在于集合中会被添加到集合，没有id的geometry会被赋予一个唯一id；如果要添加到集合中的多边形存在重复id，这些多边形会被重新分配id；如果参数为null或undefined不会做任何处理
     * @param geometries 图形数据
     */
    add(geometries: CircleGeometry[]): this;
    /**
     * 移除指定id的圆，如果参数为null或undefined不会做任何处理
     * @param ids 图形数据 id 数组
     */
    aremove(ids: string[]): this;
  }
}
