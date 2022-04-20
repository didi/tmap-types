/// <reference path="../map.d.ts" />
/// <reference path="../point.d.ts" />
/// <reference path="geometryOverlay.d.ts" />
/// <reference path="../latLng.d.ts" />

declare namespace TMap {
  interface InfoWindowOptions {
    map: TMap.Map; // （必需）显示信息窗的地图。
    position: LatLng; // （必需）信息窗的经纬度坐标。
    content: string; // 信息窗显示内容，默认为空字符串。
    zIndex: number; // 信息窗的z-index值，默认为0。
    offset: Object; // 信息窗相对于position对应像素坐标的偏移量，x方向向右偏移为正值，y方向向下偏移为正值，默认为{x:0, y:0}。
  }

  class InfoWindow extends GeometryOverlay {
    /**
     * 多圆的参数对象
     * @param options 选项
     */
    constructor(options: InfoWindowOptions);

    /**
     * 设置经纬度位置。
     */
    setPosition(position: LatLng): this;
    /**
     * 设置信息窗显示内容。
     */
    setContent(content: string): this;
    /**
     * 设置信息窗口所在的map对象，传入null则代表将infoWindow从Map中移除。
     */
    setMap(map: Map): this;
    /**
     * 获取信息窗口所在的map对象。
     */
    getMap(): Map;
    /**
     * 打开信息窗口。
     */
    open(): this;
    /**
     * 关闭信息窗口。
     */
    close(): this;
    destroy(): this; // 销毁信息窗。
    // closeclick	none	点击信息窗的关闭按钮时会触发此事件。  // 事件👽
    // on<T extends Geometry>(
    //   eventName: "closeclick",
    //   listener: GeometryOverlayEventListener<T>
    // ): this;
  }
}
