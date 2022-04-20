declare namespace TMap {
  interface LatLngData {
    lat: number;
    lng: number;
  }

  class LatLng {
    lat: number;
    lng: number;
    /**
     * 构造一个地理坐标对象
     * @param lat 纬度
     * @param lng 经度
     * @param noAutofix 是否自动修正
     */
    constructor(lat: number, lng: number, noAutofix?: boolean);
    /**
     * 移动当前经纬度坐标得到新的坐标
     * @param east 移动经度，向右为正值
     * @param north 移动维度，向上为正值
     */
    offset(east: number, north: number): LatLng;
    /**
     * 当前经纬度和传入经纬度或者经纬度数组连线之间的地面距离，单位为米
     * @param lnglat 对比目标
     */
    distance(lnglat: LatLng | LatLng[]): number;
    /**
     * 获取经度值
     */
    getLng(): number;
    /**
     * 获取纬度值
     */
    getLat(): number;
    /**
     * 判断当前坐标对象与传入坐标对象是否相等
     * @param lnglat 判断目标
     */
    equals(lnglat: LatLng): boolean;
    /**
     * 以字符串的形式返回
     */
    toString(): string;

    // internal
    add(lnglat: LatLng, noAutofix?: boolean): LatLng;
    subtract(lnglat: LatLng, noAutofix?: boolean): LatLng;
    divideBy(num: number, noAutofix?: boolean): LatLng;
    multiplyBy(num: number, noAutofix?: boolean): LatLng;
  }

  class LatLngBounds {
    constructor(sw: LatLng, ne: LatLng);
    /**
     * 获取该范围的中心点坐标。
     */
    getCenter(): LatLng;
    /**
     * 获取该范围的东北角坐标。
     */
    getNorthEast(): LatLng;
    /**
     * 获取该范围的西南角坐标。
     */
    getSouthWest(): LatLng;
    /**
     * 扩展该范围边界，以包含指定的坐标点。
     * @param latlng 坐标点
     */
    extend(latlng: LatLng): this;
    /**
     * 扩展该范围边界，以包含指定的一个矩形范围。
     * @param other 另一矩形范围
     */
    union(other: LatLngBounds): this;
    /**
     * 比较两个矩形范围是否完全相等。
     * @param other 另一矩形范围
     */
    equals(other: LatLngBounds): boolean;
    /**
     * 判断该范围是否与另一矩形范围相交。
     * @param other 另一矩形范围
     */
    intersects(other: LatLngBounds): boolean;
    /**
     * 判断该范围是否为空。
     */
    isEmpty(): boolean;
    /**
     * 判断指定的坐标是否在这个范围内。
     * @param latlng 坐标点
     */
    contains(latlng: LatLng): boolean;
    /**
     * 转换为字符串表示。
     */
    toString(): string;
  }
}
