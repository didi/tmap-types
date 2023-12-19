/// <reference path="../point.d.ts" />
/// <reference path="../map.d.ts" />
/// <reference path="../latLng.d.ts" />

declare namespace TMap {
  interface Geometry<T = unknown> {
    /**
     * 图形数据的标志信息，不可重复，若id重复后面的id会被重新分配一个新id，若没有会随机生成一个。
     */
    id: string;
    /**
     * 样式id
     */
    styleId: string;
    /**
     * 多边形的属性数据。
     */
    properties?: T;
  }
  interface GeometryOverlayOptions {
    id: string;
    map: Map;
    styles?: unknown;
    geometries?: Geometry[];
  }
  interface GeometryOverlayEvent<T extends Geometry> {
    /**
     * 事件发生时的图形数据信息，不同图层中该值所属对象规范不同
     */
    geometry: T;
    /**
     * 事件发生时的经纬度坐标。
     */
    latLng: LatLng;
    /**
     * 事件发生时的屏幕位置，返回格式。
     */
    point: { x: number; y: number };
    /**
     * 事件类型。
     */
    type: string;
    /**
     * 事件的目标对象。
     */
    target: Record<string, unknown>;
    /**
     * 浏览器原生的事件对象。
     */
    originalEvent: MouseEvent | TouchEvent;
  }

  type GeometryOverlayEventListener<T extends Geometry> = (
    event: GeometryOverlayEvent<T>
  ) => void;
  type GeometryOverlayMovingEventListener = (event: {
    [key: string]: { angle: number; passedLatLngs: LatLng[] };
  }) => void;
  type GeometryEventName =
    | "click"
    | "dblclick"
    | "mousedown"
    | "mouseup"
    | "mousemove"
    | "hover"
    | "touchstart"
    | "touchmove"
    | "touchend"
    | "closeclick";
  type GeometryOverlayMovingEventName = "moving";
  type GeometryOverlayAnimateEventName =
    | "move_ended"
    | "move_stopped"
    | "move_paused"
    | "move_resumed";
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  class GeometryOverlay {
    /**
     * 设置地图对象，如果map为null意味着将多多边形同时从地图中移除。
     * @param map 地图实例
     */

    constructor(options: GeometryOverlayOptions);
    id: string;
    setMap(map: null | Map): this;

    /**
     * 设置图层是否可见。
     */
    setVisible(visible: boolean): this;

    getVisible(): boolean;

    /**
     * 添加listener到eventName事件的监听器数组中。
     * @param eventName 事件名称
     * @param listener 事件监听函数
     */
    on(eventName: string, listener: Function): this;

    on<T extends Geometry>(
      eventName: GeometryEventName,
      listener: GeometryOverlayEventListener<T>
    ): this;

    on(
      eventName: GeometryOverlayMovingEventName,
      listener: GeometryOverlayMovingEventListener
    ): this;

    on(eventName: GeometryOverlayAnimateEventName, listener: () => void): this;

    /**
     * 移除事件绑定
     * @param eventName 事件名称
     * @param listener 事件监听函数
     */

    off(eventName: string, listener: Function): this;

    off<T extends Geometry>(
      eventName: GeometryEventName,
      listener: GeometryOverlayEventListener<T>
    ): this;

    off(
      eventName: GeometryOverlayMovingEventName,
      listener: GeometryOverlayMovingEventListener
    ): this;

    off(eventName: GeometryOverlayAnimateEventName, listener: () => void): this;
  }
}
