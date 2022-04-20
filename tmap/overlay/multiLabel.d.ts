/// <reference path="geometryOverlay.d.ts" />
/// <reference path="../map.d.ts" />

declare namespace TMap {
  // LabelStyle配置参数。
  interface LabelStyleOptions {
    color?: string; // 颜色属性，支持rgb()，rgba()，#RRGGBB等形式，默认为rgba(0,0,0,1)。
    size?: number; // 文字大小属性，默认为14。
    offset?: Object; // 文字偏移属性单位为像素，以PointGeometry的位置点所对应屏幕位置为原点，x轴向右为正向左为负，y轴向下为正向上为负，默认为{x:0, y:0}。
    angle?: number; // 文字旋转属性，单位为度，以PointGeometry的位置点所对应屏幕位置为原点，逆时针为正，默认为0。
    alignment?: string; // 文字水平对齐属性，默认为center，可选值为left（文字左侧与位置锚点对齐）、right（文字右侧与位置锚点对齐）、center（文字水平中心与位置锚点对齐）。
    verticalAlignment?: string; // 文字垂直对齐属性，默认为middle，可选值为top（文字顶部与位置点对齐）、bottom（文字底部与位置点对齐）、middle（文字垂直中心与位置点对齐）。
  }

  interface LabelStyle extends LabelStyleOptions {}
  class LabelStyle {
    constructor(options?: LabelStyleOptions);
  }

  interface MultiLabelStyleHash {
    [key: string]: LabelStyle;
  }
  interface LabelGeometry<T = any> extends Geometry<T> {
    position: LatLng | LatLngData; // 标注点位置。
    content: string; // 标注文本。
    rank: number; // 当开启文本碰撞时，值越大碰撞优先级越高。关闭碰撞时，表示标注文本的图层内绘制顺序。
  }

  interface MultiLabelOptions {
    id: string; // 图层id，若没有会自动分配一个
    map: TMap.Map; // 显示文本标注图层的底图
    styles?: MultiLabelStyleHash; // 文本标注的相关样式
    geometries?: LabelGeometry[]; // 文本标注数据数组
    enableCollision?: boolean; // 是否开启图层内部的文本标注碰撞
  }

  class MultiLabel extends GeometryOverlay {
    /**
     * 多圆的参数对象
     * @param options 选项
     */
    constructor(options: MultiLabelOptions);
    /**
     * 更新多文本标注数据，如果参数为null或undefined不会做任何处理
     * @param geometries 图形数据
     */
    setGeometries(geometries: LabelGeometry[]): this;
    /**
     * 获取多文本标注数据
     * @param geometries 图形数据
     */
    getGeometries(geometries: LabelGeometry[]): this;
    /**
     * 根据多文本数据id来获取点数据
     * @param id 数据 id
     */
    getGeometryById(id: string): LabelGeometry;
    /**
     * 更新多文本数据，如果geometry的id存在于集合中，会更新对id的数据，
     * 如果之前不存在于集合中，会作为新的文本标注添加到集合中；如果参数为null或undefined不会做任何处理。
     * @param geometries 图形数据
     */
    updateGeometries(geometries: LabelGeometry[]): this;
    /**
     * 设置MultiLabel图层相关样式信息，如果参数为null或undefined不会做任何处理
     * @param styles 图层样式
     */
    setStyles(styles: MultiLabelStyleHash): this;
    /**
     * 获取图层相关样式信息
     * @param styles 图层样式
     */
    getStyles(styles: MultiLabelStyleHash): this;
    /**
     * 向图层中添加文本，如果geometry的id已经存在集合中，则该geometry不会被重复添加，
     * 如果geometry没有id或者id不存在于集合中会被添加到集合，没有id的geometry会被赋予一个唯一id；
     * 如果要添加到集合中的文本存在重复id，这些文本会被重新分配id；
     * 如果参数为null或undefined不会做任何处理。
     * @param geometries 图形数据
     */
    add(geometries: LabelGeometry[]): this;
    /**
     * 移除指定id的圆，如果参数为null或undefined不会做任何处理
     * @param ids 图形数据 id 数组
     */
    aremove(ids: string[]): this;
  }
}
