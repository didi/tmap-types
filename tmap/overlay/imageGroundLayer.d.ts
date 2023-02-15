/// <reference path="../map.d.ts" />
/// <reference path="../latLng.d.ts" />

declare namespace TMap {
  interface ImageGroundLayerOptions {
    /** 图片覆盖的经纬度范围 */
    bounds: TMap.LatLngBounds;
    /** 图片url或base64，如果图片为url格式，图片服务器必须允许跨域访问 */
    src: string;
    /** 展示图层的地图对象 */
    map?: TMap.Map;
    /** 最小缩放层级，当地图缩放层级小于该值时该图层不显示，默认为3 */
    minZoom?: number;
    /** 最大缩放层级，当地图缩放层级大于该值时该图层不显示，默认为20 */
    maxZoom?: number;
    /** 是否可见，默认为true */
    visible?: boolean;
    /** 图层绘制顺序，默认为1 */
    zIndex?: number;
    /** 图层透明度，默认为1 */
    opacity?: number;
  }

  class ImageGroundLayer {
    constructor(options: ImageGroundLayerOptions);
    /** 设置展示图层的地图对象。 */
    setMap(map: Map): this;
    /** 设置展示图层的地理范围。 */
    setBounds(bounds: LatLngBounds): this;
    /** 设置图层是否可见。 */
    setVisible(visible: Boolean): this;
    /** 设置图层绘制顺序。 */
    setZIndex(zIndex: Number): this;
    /** 设置图层透明度。 */
    setOpacity(opacity: Number): this;
    /** 更新图层资源路径，相同的url不会被更新。 */
    setSrc(src: String): this;
    /** 获取地图对象，若无返回null。 */
    getMap(): Map;
    /** 获取展示图层的地理范围。 */
    getBounds(): LatLngBounds;
  }
}
