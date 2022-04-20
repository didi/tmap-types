/// <reference path="../map.d.ts" />
/// <reference path="geometryOverlay.d.ts" />
declare namespace TMap {
  interface DOMOverlayOptions {
    map: TMap.Map;
  }

  class DOMOverlay extends GeometryOverlay {
    /**
     * 多圆的参数对象
     * @param options 选项
     */
    constructor(options?: DOMOverlayOptions);

    /**
     * 实现这个接口来定义构造阶段的初始化过程，此方法在构造函数中被调用，接收构造函数的options参数作为输入
     */
    onInit(options: DOMOverlayOptions): void;
    /**
     * 实现这个接口来定义销毁阶段的资源释放过程，此方法在destroy函数中被调用
     */
    onDestroy(): void;
    /**
     * 实现这个接口来创建自定义的DOM元素，此方法在构造函数中被调用（在初始化过程之后）
     */
    createDOM(): HTMLElement;
    /**
     * 实现这个接口来更新DOM元素的内容及样式，此方法在地图发生平移、缩放等变化时被调用
     */
    updateDOM(): void;
  }
}
