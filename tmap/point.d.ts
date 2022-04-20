declare namespace TMap {
  class Point {
    constructor(x: number, y: number);
    getX(): number;
    getY(): number;
    equals(other: Point): boolean;
    /**
     * 创建一个坐标值相同的点
     */
    clone(): Point;
    toString(): string;
  }
}
