/// <reference path="geometryOverlay.d.ts" />
declare namespace TMap {
  interface PointGeometry<T = any> extends Geometry<T> {
    position: LatLng;
    rank?: number;
  }

  interface MarkerStyleOptions {
    width?: number; // 标注点图片的宽度，默认为34。
    height?: number; //	标注点图片的高度，默认为50。
    anchor?: { x: number; y: number }; // 标注点图片的锚点位置，默认为{ x: width/2, y: height }；锚点以图片左上角点为原点。
    src: string; // 标注点图片url或base64地址。
    faceTo?: "map" | "screen"; //	标注点图片的朝向，可取’map’（贴地）或’screen’（直立），默认为’screen’。
    rotate?: number; // 标注点图片的旋转角度，单位为度，非负数；以锚点为旋转原点，逆时针为正。
    opacity?: number; // 标注点图片的透明度，取值0-1。
  }
  interface MarkerStyle extends MarkerStyleOptions {}
  class MarkerStyle {
    constructor(options?: MarkerStyleOptions);
  }
  interface MultiMarkerStyleHash {
    [key: string]: MarkerStyle;
  }

  interface MultiMarkerOptions extends GeometryOverlayOptions {
    styles?: MultiMarkerStyleHash;
    geometries?: PointGeometry[];
  }
  interface MoveAlongParam {
    path: LatLng[];
    duration: number;
    speed: number;
  }
  interface MoveAlongParamSet {
    [key: string]: MoveAlongParam;
  }
  class MultiMarker extends GeometryOverlay {
    /**
     * 多边形
     * @param options 选项
     */
    constructor(options: MultiMarkerOptions);
    /**
     * 更新多边形数据，如果参数为null或undefined不会做任何处理。
     * @param geometries 多边形数据
     */
    setGeometries(geometries: PointGeometry[]): this;
    updateGeometries(geometries: PointGeometry[]): this;
    add(geometries: PointGeometry[]): this;

    /**
     * 设置MultiPolygon图层相关样式信息，如果参数为null或undefined不会做任何处理。
     * @param map 图层样式
     */
    setStyles(styles: MultiMarkerStyleHash): this;
    getStyles(): MultiMarkerStyleHash;
    /**
     * 指定id的标注点，沿着指定路径移动;每次新调用moveAlong时，尚未完成的动画会被取消，并触发move_stopped事件;options中如果设置autoRotation为true，对于faceTo为’map’的点标记，会根据路径方向自动改变点标记图片的旋转角度
     * @param param MoveAlongParamSet
     * @param options {autoRotation:boolean}
     */
    moveAlong(
      param: MoveAlongParamSet,
      options?: { autoRotation: boolean }
    ): this;

    stopMove(): this;
    pauseMove(): this;
    resumeMove(): this;
  }
}
