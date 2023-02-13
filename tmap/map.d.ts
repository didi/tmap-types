/// <reference path="latLng.d.ts" />
/// <reference path="control.d.ts" />
/// <reference path="point.d.ts" />
/// <reference path="./overlay/geometryOverlay.d.ts" />

declare namespace TMap {
  interface Offset {
    x: number;
    y: number;
  }
  interface BaseMap {
    type: string;
  }
  interface EaseOptions {
    /**
     * 缓动动画时长，单位为ms，默认为500。
     */
    duration: number;
  }
  type ViewMode = '2D' | '3D';
  interface FitBoundsOptions {
    /**
     * 仅传入一个数字则统一各方向的边距
     * 不可为负数
     */
    padding:
      | number
      | { top: number; bottom: number; left: number; right: number };
    /**
     * 调整视野时的最小缩放等级，默认值且最小值为地图的最小缩放等级
     */
    minZoom: number;
    /**
     * 调整视野时的最大缩放等级，默认值且最大值为地图的最大缩放等级
     */
    maxZoom: number;
    /**
     * 缓动配置，可设置地图视野变化过程的动画效果
     */
    ease: EaseOptions;
  }
  type VectorBaseMapType = 'vector';
  interface VectorBaseMap extends BaseMap {
    type: VectorBaseMapType;
    /**
     * 矢量底图要素类型，通过控制features可以控制矢量底图中不同类型要素的显示与否，目前支持道路及底面（base）、建筑物（building3d）、建筑物平面(building2d)、poi文字（point）、道路文字（label）；若features为非数组则默认为全部显示，若features为空数组不显示任何地物
     */
    features: string[];
  }
  type SatelliteBaseMapType = 'satellite';
  interface SatelliteBaseMap extends BaseMap {
    type: SatelliteBaseMapType;
    /**
     * 卫星图要素类型，目前支持卫星影像图（base）、路网图（road）；若features为非数组则默认为全部显示，若features为空数组不显示任何地物
     */
    features: string[];
  }
  type TrafficBaseMapType = 'traffic';
  interface TrafficBaseMap extends BaseMap {
    type: TrafficBaseMapType;
  }
  interface MapOptions {
    /**
     * 地图中心点经纬度。
     */
    center?: TMap.LatLng;
    /**
     * 地图缩放级别，支持3～20。
     */
    zoom?: number;
    /**
     * 地图最小缩放级别，默认为3。
     */
    minZoom?: number;
    /**
     * 地图最大缩放级别，默认为20。
     */
    maxZoom?: number;
    /**
     * 地图在水平面上的旋转角度，顺时针方向为正，默认为0。
     */
    rotation?: number;
    /**
     * 地图俯仰角度，取值范围为0~80，默认为0。
     */
    pitch?: number;
    /**
     * 地图显示比例，默认为1。
     */
    scale?: number;
    /**
     * 地图中心与容器的偏移量，Object的格式为 {x:number, y:number}（右方下方为正，单位为像素）。
     */
    offset?: Offset;
    /**
     * 是否支持拖拽移动地图，默认为true。
     */
    draggable?: boolean;
    /**
     * 是否支持鼠标滚轮缩放地图，默认为true。
     */
    scrollable?: boolean;
    /**
     * 是否支持双击缩放地图，默认为true
     */
    doubleClickZoom?: boolean;
    /**
     * 地图边界，设置后拖拽、缩放等操作无法将地图移动至边界外，默认为null
     */
    boundary?: LatLngBounds;
    /**
     * 地图样式ID，有效值为”style[编号]”，与key绑定，详见个性化地图配置页面
     */
    mapStyleId?: string;
    /**
     * 地图底图，BaseMap目前只支持矢量底图 （VectorBaseMap） 、卫星底图 （SatelliteBaseMap） 、路况底图 （TrafficBaseMap） ，可以使用数组形式实现多种底图叠加。默认为 VectorBaseMap ，如果传入null地图不显示任何地物
     */
    baseMap?: BaseMap | BaseMap[];
    /**
     * 地图视图模式，支持2D和3D，默认为3D。2D模式下不可对地图进行拖拽旋转，pitch和rotation始终保持为0。
     */
    viewMode?: ViewMode;
    /**
     * 是否显示地图上的控件，默认true。
     */
    showControl?: boolean;
  }
  type MapEventName =
    | 'click'
    | 'dblclick'
    | 'mousedown'
    | 'mouseup'
    | 'mousemove'
    | 'touchstart'
    | 'touchmove'
    | 'touchend';

  type MapOtherEventName =
    | 'idle'
    | 'tilesloaded'
    | 'dragstart'
    | 'drag'
    | 'dragend'
    | 'panstart'
    | 'pan'
    | 'panend'
    | 'rotatestart'
    | 'rotate'
    | 'rotateend'
    | 'pitchstart'
    | 'pitch'
    | 'pitchend'
    | 'zoom'
    | 'resize'
    | 'center_changed'
    | 'bounds_changed'
    | 'scale_changed'
    | 'control_added'
    | 'control_removed';

  interface POIInfo {
    coord: Offset;
    bounds: [number, number, number, number];
    isIndoor: boolean;
    name: string;
    latLng: LatLng;
  }

  interface MapEvent {
    /**
     * 事件发生时的经纬度坐标。
     */
    latLng: LatLng;
    /**
     * 事件发生时的屏幕位置，返回{x:number, y:number}格式
     */
    point: Offset;
    /**
     * 事件类型
     */
    type: string;
    target: Object; //	事件的目标对象。
    poi?: POIInfo; //	事件触发位置的poi信息，当触发位置没有poi点时值为null（仅支持click事件）
    originalEvent: MouseEvent | TouchEvent; //	浏览器原生的事件对象。
  }
  type MapEventListener = (e: MapEvent) => void;

  class Map {
    constructor(container: string | HTMLElement, opts?: MapOptions);
    setCenter(center: LatLng): this;
    setZoom(zoom: number): this;
    setRotation(rotation: number): this;
    setPitch(pitch: number): this;
    setScale(scale: number): this;
    setOffset(offset: Offset): this;
    setDraggable(draggable: boolean): this;
    setScrollable(scrollable: boolean): this;
    setDoubleClickZoom(doubleClickZoom: boolean): this;
    setBoundary(boundary: LatLngBounds): this;
    setViewMode(viewMode: ViewMode): this;
    setBaseMap(baseMap: BaseMap | BaseMap[]): this;
    setMapStyleId(mapStyleId: string): this;
    panTo(latLng: LatLng, opts: EaseOptions): this;
    zoomTo(zoom: number, opts: EaseOptions): this;
    rotateTo(rotation: number, opts: EaseOptions): this;
    pitchTo(pitch: number, opts: EaseOptions): this;
    easeTo(
      mapStatus: {
        center: LatLng;
        zoom: number;
        rotation: number;
        pitch: number;
      },
      opts: EaseOptions
    ): this;
    fitBounds(bounds: LatLngBounds, options: FitBoundsOptions): this;
    getCenter(): LatLng;
    getZoom(): number;
    getRotation(): number;
    getPitch(): number;
    getBounds(): LatLngBounds;
    getScale(): number;
    getOffset(): Offset;
    getDraggable(): boolean;
    getScrollable(): boolean;
    getDoubleClickZoom(): boolean;
    getBoundary(): LatLngBounds;
    addControl(control: Control): this;
    removeControl(id: constants.DEFAULT_CONTROL_ID): this;
    getControl(id: constants.DEFAULT_CONTROL_ID): Control;
    getViewMode(): ViewMode;
    getBaseMap(): BaseMap | BaseMap[];
    // getIndoorManager(): IndoorManager;
    /**
     * 销毁地图
     */
    destroy(): GeometryOverlay;
    getLayer(id: string): GeometryOverlay;
    /**
     * 经纬度坐标转换为容器像素坐标，容器像素坐标系以地图容器左上角点为原点
     * @param latLng 经纬度坐标
     */
    projectToContainer(latLng: LatLng): Point;
    /**
     * 容器像素坐标转换为经纬度坐标
     * @param offset 像素坐标
     */
    unprojectFromContainer(pixel: Point): LatLng;
    on(eventName: string, listener: Function): this;
    on(eventName: MapEventName, listener: MapEventListener): this;
    on(eventName: MapOtherEventName, listener: () => void): this;

    /**
     * 移除事件绑定
     * @param eventName 事件名称
     * @param listener 事件监听函数
     */
    off(eventName: string, listener: Function): this;
    off(eventName: MapEventName, listener: MapEventListener): this;
    off(eventName: MapOtherEventName, listener: () => void): this;
  }
}
