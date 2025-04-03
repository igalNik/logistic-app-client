export enum DisplayMode {
  Icons = 'icons',
  Full = 'full',
}
export interface SideNavItemData {
  id: string;
  text: string;
  iconName: string;
  navTo: string;
}
export interface SideNavSectionData {
  id: string;
  title: string;
  items: SideNavItemData[];
}
