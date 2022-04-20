/// <reference path="geometryOverlay.d.ts" />
declare namespace TMap {
  interface PolygonStyleOptions {
    color?: string; //	面填充色，支持rgb()，rgba()，#RRGGBB等形式。
    showBorder?: boolean; //	是否显示边线，默认为false。
    borderColor?: string; //	边线颜色，支持rgb()，rgba()，#RRGGBB等形式，默认为#3777FF，showBorder为true时有效。
    borderWidth?: number; //	边线宽度，正整数，单位为像素，指的是地图pitch为0时的屏幕像素大小，如果pitch不为0，实际绘制出来的线宽度与屏幕像素会存在一定误差，默认为2，showBorder为true时有效
    borderDashArray?: number[]; //	边线虚线虚线展示方式，[0, 0]为实线，[10, 10]表示十个像素的实线和十个像素的空白（如此反复）组成的虚线，默认为[0, 0];这里的像素指的是地图pitch为0时的屏幕像素大小，如果pitch不为0，实际绘制出来的线宽度与屏幕像素会存在一定误差
  }
  interface PolygonStyle extends PolygonStyleOptions {}
  class PolygonStyle {
    constructor(options?: PolygonStyleOptions);
  }
  interface ExtrudablePolygonStyle {
    color: string; //	线填充色，支持rgb()，rgba()，#RRGGBB等形式。
    extrudeHeight: number; //	多边形拔起高度，默认为1，单位米。
    showBorder: boolean; //是否显示拔起面块的边线，拔起面块的边线不支持设置宽度，永远为1像素宽度。
    borderColor: string; //	边线颜色，支持rgb()，rgba()，#RRGGBB等形式，showBorder为true时有效。
  }
  interface MultiPolygonStyleHash {
    [key: string]: PolygonStyle | ExtrudablePolygonStyle;
  }
  interface PolygonGeometry<T = any> extends Geometry<T> {
    /**
     * 多边形的位置信息，可以传入[latLng1, latLng2, latLng3, latLng5, latLng1]这种简单多边形；也可以传入带洞多边形
     */
    paths:
      | LatLng[]
      | LatLng[][]
      | LatLng[][][]
      | { lat: number; lng: number }[];
    /**
     * 多边形的图层内绘制顺序。
     */
    rank?: number;
  }
  interface MultiPolygonOptions extends GeometryOverlayOptions {
    zIndex?: number; // 图层绘制顺序
    styles?: MultiPolygonStyleHash; //	多边形的相关样式。
    geometries?: PolygonGeometry[]; //	多边形数据数组。
  }

  class MultiPolygon extends GeometryOverlay {
    /**
     * 多边形
     * @param options 选项
     */
    constructor(options: MultiPolygonOptions);
    /**
     * 设置图层绘制顺序
     * @param zIndex 顺序
     */
    setZIndex(zIndex: number): this;
    /**
     * 更新多边形数据，如果参数为null或undefined不会做任何处理。
     * @param geometries 多边形数据
     */
    setGeometries(geometries: PolygonGeometry[]): this;
    updateGeometries(geometries: PolygonGeometry[]): this;
    add(geometries: PolygonGeometry[]): this;
    /**
     * 移除指定id的多边形，如果参数为null或undefined不会做任何处理。
     * @param ids geometry ids
     */
    remove(ids: string[]): this;
    getGeometries(): PolygonGeometry[];

    /**
     * 设置MultiPolygon图层相关样式信息，如果参数为null或undefined不会做任何处理。
     * @param map 图层样式
     */
    setStyles(styles: MultiPolygonStyleHash): this;
  }
}
