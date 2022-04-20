/// <reference path="./point.d.ts" />
/// <reference path="./latLng.d.ts" />
declare namespace TMap {
  namespace geometry {
    /**
     * 计算传入路径的距离之和(单位：米)。
     * @param path
     */
    function computeDistance(path: LatLng[]): number;
    /**
     * 终点计算，根据起点、朝向和距离计算终点。（或根据线段的起点、终点、距离计算，会沿着起点指向终点的方向，从终点再前进指定的距离，单位：米）正北方向为0度，顺时针为正。
     * @param start 起点
     * @param heading 朝向 或者 终点
     * @param distance 距离
     */
    function computeDestination(
      start: LatLng,
      heading: number | LatLng,
      distance: number
    ): LatLng;
    /**
     * 计算点到直线的最短距离（单位：米）。
     * @param point 点
     * @param line 直线
     */
    function computeDistanceToLine(point: LatLng, line: LatLng[]): number;
    /**
     * 计算两点之间的航向，
     * @param start
     * @param end
     * @param thumb 默认为true，即为恒向线航向。设置为false为大圆航向，即最短路径的航向(与正北的夹角，顺时针为正，单位：度）
     */
    function computeHeading(
      start: LatLng,
      end: LatLng,
      thumb?: boolean
    ): number;
    /**
     * 计算多边形面积（只支持简单多边形，即一维数组，单位：平方米）。
     * @param path 一维数组
     */
    function computeArea(path: LatLng[]): number;
    /**
     * 计算多边形的形心（只支持简单多边形， 即一维数组）。
     * @param path
     */
    function computeCentroid(path: LatLng[]): LatLng;
    /**
     * 计算输入点的包围矩形。
     * @param coords
     */
    function computeBoundingRectangle(coords: LatLng[]): LatLngBounds;
    /**
     * 判断点是否在线段上
     * @param point 点
     * @param segment 线段
     * @param tolerance 单位为米
     */
    function isPointOnSegment(
      point: LatLng,
      segment: LatLng[],
      tolerance: number
    ): boolean;
    /**
     * 判断点是否在多边形内（只支持简单多边形， 即一维数组，在多边形边上认定为不在多边形内）。
     * @param point 点
     * @param polygon 多边形
     */
    function isPointInPolygon(point: LatLng, polygon: LatLng[]): boolean;
    /**
     * 判断线段是否与线段相交。
     */
    function isSegmentIntersect(
      segment: LatLng[],
      anotherSegment: LatLng[]
    ): boolean;
    /**
     * 判断折线是否自相交。
     * @param polyline
     */
    function isSelfIntersect(polyline: LatLng[]): boolean;
    /**
     * 判断多边形是否与多边形相交（只支持简单多边形， 即一维数组）。
     * @param polygon
     * @param anotherPolygon
     */
    function isPolygonIntersect(
      polygon: LatLng[],
      anotherPolygon: LatLng[]
    ): boolean;
  }
}
