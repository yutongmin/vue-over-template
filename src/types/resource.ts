/*
 * @Author: wuyefan
 * @Date: 2022-10-20 20:39:00
 * @Last Modified by: wuyefan
 * @Last Modified time: 2022-10-21 15:40:05
 */
export interface Resource {
  /**
   * 菜单名称
   */
  title?: string;
  /**
   * 路由地址
   */
  href?: string;

  /**
   * 编码
   */
  code?: string;

  /**
   * 菜单图片
   */
  icon?: string;

  /**
   * 菜单图片是静态图片还是上传 1是静态 2是上传
   */
  iconType?: string;

  /**
   * 是否父节点
   */
  isParent: boolean;

  /**
   * 菜单ID
   */
  id?: string;

  /**
   * 菜单父id
   */
  pid?: string;

  /**
   * 组件名称
   */
  component?: string;

  /**
   * 子菜单集合
   */
  children?: Resource[];
}
