/// <reference path="../latLng.d.ts" />

declare namespace TMap {
  interface Poi {
    /** POI（地点）唯一标识 */
    id: string;
    /** POI（地点）名称 */
    title: string;
    /** 地址 */
    address: string;
    /** 电话 */
    tel: string;
    /** POI分类 */
    category: string;
    /** POI类型，值说明：0:普通POI / 1:公交车站 / 2:地铁站 / 3:公交线路 / 4:行政区划 */
    type: number;
    /** 坐标 */
    location: TMap.LatLng;
    /** 距离，单位： 米，在周边搜索、城市范围搜索传入定位点时返回 */
    _distance?: number;
    /** 行政区划信息 */
    ad_info: {
      /** 行政区划代码，详见：[行政区划代码说明](https://lbs.qq.com/service/webService/webServiceGuide/webServiceDistrict#6) */
      adcode: number;
      /** 省 */
      province: string;
      /** 市 */
      city: string;
      /** 区 */
      district: string;
    };
  }

  interface SearchResult {
    /**
     * 状态码，0为正常，其它为异常
     * 详细请参阅 [状态码说明](https://lbs.qq.com/service/webService/webServiceGuide/status)
     */
    status: number;
    /** 状态说明 */
    message: string;
    /**
     * 本次搜索结果总数，另外本服务限制最多返回200条数据(data)，
     * 翻页（pageIndex）超过搜索结果总数 或 最大200条限制时，将返回最后一页数据
     */
    count: number;
    /** 搜索结果POI数组，每项为一个POI对象 */
    data: Poi[];
  }

  namespace service {
    class Search {
      constructor(options?: {
        /** 每页条目数，最大限制为20条，默认为10条 */
        pageSize: number;
      });
      /**
       * 搜索某地区 `cityName` 附近符合给定关键字的地点
       *
       * 搜索完成后resolve状态下返回 `SearchResult`，reject状态下返回ErrorResult
       */
      searchRegion(params: {
        /** 搜索关键字 */
        keyword: string;
        /** 检索城市名称， 如北京市，同时支持adcode（行政区划代码，可精确到区县级），如130681 */
        cityName: string;
        /**
         * 当前范围无结果时，是否自动扩大范围，取值：
         *
         * false：不扩大
         *
         * true [默认]：自动扩大范围（依次按照按1公里、2公里、5公里，最大到全城市范围搜索）
         */
        autoExtend?: boolean;
        /** 当 `keyword` 使用酒店、超市等泛分类关键词时，这类场景大多倾向于搜索附近，传入此经纬度，搜索结果会优先就近地点，体验更优 */
        referenceLocation?: string;
        /** 筛选条件 */
        filter?: string;
        /** 第x页，默认第1页 */
        pageIndex?: number;
        /**
         * 签名校验
         *
         * 开启 WebServiceAPI 签名校验的必传参数，只需要传入生成的SK字符串即可，不需要进行MD5加密操作
         */
        servicesk?: string;
      }): Promise<SearchResult>;
    }
  }
}