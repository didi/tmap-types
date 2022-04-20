/// <reference path="../overlay/geometryOverlay.d.ts" />
/// <reference path="../map.d.ts" />
declare namespace TMap {
  namespace tools {
    namespace constants {
      enum EDITOR_ACTION {
        INTERACT,
        DRAW,
      }
    }
    type GeometryChangeEvent = "draw_complete" | "adjust_complete";

    interface EditableOverlay<T extends GeometryOverlay> {
      id: string; //	标识，默认为图层id
      name?: string; //	在控件下拉列表中显示的图层名称
      overlay: T; //	几何图层，支持MultiMarker/MultiPolyline/MultiPolygon/MultiCircle
      drawingStyleId?: string; //	绘制图形的样式id，对应图层styles样式表中的id，默认为default
      selectedStyleId: string; //	选中图形的样式id，对应图层styles样式表中的id，若不设置则使用默认样式
    }
    interface GeometryEditorOptions<T extends GeometryOverlay> {
      map: Map; //编辑几何图形的地图对象
      overlayList: EditableOverlay<T>[]; //	用于编辑的几何图层
      activeOverlayId: string; //	处于编辑状态的图层id，编辑状态下的图层可以新增图形、选中图形进行修改和删除
      actionMode: constants.EDITOR_ACTION; //	编辑器的操作状态
      snappable: boolean; //	是否开启吸附功能，默认为false
      selectable: boolean; //	是否开启点选功能，默认为false，开启后可以点选图形进行修改和删除操作
    }
    class GeometryEditor<T extends GeometryOverlay> {
      constructor(options: GeometryEditorOptions<T>);
      setMap(map: null | Map): this; //	设置地图对象，若为null则移除编辑器
      setActiveOverlay(id: string): this; //	设置指定图层处于编辑状态
      setActionMode(mode: constants.EDITOR_ACTION): this; //	设置编辑器的操作状态
      getMap(): Map;
      getActiveOverlay(): EditableOverlay<T>; //	获取处于编辑状态的图层
      getActionMode(): constants.EDITOR_ACTION; //	获取编辑器的操作状态
      getSelectedList(): Geometry[]; //获取已选中的几何图形数组，Geometry可能是PointGeometry/PolylineGeometry/PolygonGeometry/CircleGeometry等
      addOverlay(overlay: EditableOverlay<T>): this; //	添加用于编辑的几何图层
      removeOverlay(id: string): this; //	删除用于编辑的几何图层
      getOverlayList(): EditableOverlay<T>[]; //	获取图层列表
      setSnappable(snappable: boolean): this; //	开启或关闭吸附功能，吸附功能开启时绘制或编辑图形会自动吸附到临近的点或线段上
      setSelectable(selectable: boolean): this; //	开启或关闭点选功能，点选功能开启时用户可点击图形进行单选和多选，选中图形后会自动将其所属图层设置为编辑状态
      select(idList: string[]): this; // 选中属于激活状态的图层内的几何图形，若传入空数组则清空
      stop(): this; // 停止绘制或编辑过程
      split(): this; //	拆分已选中多边形，用户可绘制拆分线进行拆分，若无选中图形则无效
      union(): this; //	合并已选中多边形，若无选中图形则无效
      delete(): this; //删除已选中图形
      destroy(): this; //	销毁编辑器
      on(eventName: string, listener: Function): void;
      off(eventName: string, listener: Function): void;
      on(eventName: GeometryChangeEvent, listener: (g: Geometry) => void): void;
      off(
        eventName: GeometryChangeEvent,
        listener: (g: Geometry) => void
      ): void;
    }
  }
}
