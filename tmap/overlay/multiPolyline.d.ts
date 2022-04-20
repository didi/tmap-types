/// <reference path="../point.d.ts" />
/// <reference path="geometryOverlay.d.ts" />
declare namespace TMap {
  interface ArrowOptions {
    width?: number; // 箭头图标宽度
    height?: number; // 高度
    space?: number; // 箭头图标之间的孔隙长度，单位为px，默认为50，最大支持255
  }
  interface PolylineStyleOptions {
    color?: string; // 线填充色
    width?: number; // 折线宽度，正整数，单位为像素
    borderWidth?: number; // 边线宽度，非负整数，默认为0
    borderColor?: string; //	边线颜色
    lineCap?: "butt" | "round" | "square"; // 线端头方式，可选为butt，round，square，默认为butt。
    dashArray: number[]; //虚线展示方式，[0, 0]为实线，[10, 10]表示十个像素的实线和十个像素的空白
    showArrow?: boolean; //	是否沿线路方向显示箭头，默认为false。
    arrowOptions?: ArrowOptions; // 箭头显示配置，仅在showArrow为true时有效。
  }
  interface PolylineStyle extends PolylineStyleOptions {}
  class PolylineStyle {
    constructor(options?: PolylineStyleOptions);
  }
  interface MultiPolylineStyleHash {
    [key: string]: PolylineStyle;
  }
  interface PolylineGeometry<T = any> extends Geometry<T> {
    /**
     * 多边形的位置信息，可以传入[latLng1, latLng2, latLng3, latLng5, latLng1]这种简单多边形；也可以传入带洞多边形
     */
    paths: LatLng[] | LatLng[][];
    rainbowPaths: { path: LatLng[]; color: string; borderColor: string }[];
    /**
     * 多边形的图层内绘制顺序。
     */
    rank?: number;
  }
  interface MultiPolylineOptions extends GeometryOverlayOptions {
    zIndex?: number; // 图层绘制顺序
    styles?: MultiPolylineStyleHash; //	多边形的相关样式。
    geometries?: PolylineGeometry[]; //	多边形数据数组。
  }

  class MultiPolyline extends GeometryOverlay {
    /**
     * 折线
     * @param options 选项
     */
    constructor(options: MultiPolylineOptions);
    /**
     * 设置图层绘制顺序
     * @param zIndex 顺序
     */
    setZIndex(zIndex: number): this;
    /**
     * 更新多边形数据，如果参数为null或undefined不会做任何处理。
     * @param geometries 多边形数据
     */
    setGeometries(geometries: PolylineGeometry[]): this;
    updateGeometries(geometries: PolylineGeometry[]): this;
    add(geometries: PolylineGeometry[]): this;

    /**
     * 设置MultiPolygon图层相关样式信息，如果参数为null或undefined不会做任何处理。
     * @param map 图层样式
     */
    setStyles(styles: MultiPolylineStyleHash): this;
  }
}
