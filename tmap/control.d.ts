declare namespace TMap {
  namespace constants {
    enum CONTROL_POSITION {
      TOP_LEFT,
      TOP_CENTER,
      TOP_RIGHT,
      CENTER_LEFT,
      CENTER,
      CENTER_RIGHT,
      BOTTOM_LEFT,
      BOTTOM_CENTER,
      BOTTOM_RIGHT,
    }
    enum DEFAULT_CONTROL_ID {
      SCALE,
      ZOOM,
      ROTATION,
    }
  }
  class Control {
    /**
     * 设置控件的位置
     * @param position 设置控件的位置
     */
    setPosition(position: constants.CONTROL_POSITION): this;

    setClassName(className: string): this;
  }
}
