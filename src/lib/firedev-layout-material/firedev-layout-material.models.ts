export interface FiredevLayoutMaterialVariables {
  footerSize?: string;
  headerSize: string;
  leftPanelSize: string;
  leftPanelMobileSize: string;
}

export const variables: FiredevLayoutMaterialVariables = {
  headerSize: '80px',
  footerSize: '50px',
  leftPanelSize: '250px',
  leftPanelMobileSize: '50px',
};



export interface MenuItem {
  name: string;
  href?: string;
  action?: (any?) => void;
  isActive?: (any?) => boolean;
  leftMenu?: LeftMenuGroupItem[];
}

export interface LeftMenuGroupItem {
  name: string;
  description?: string;
  href?: string;
  action?: (any) => void;
  subitems: MenuItem[];
}

export interface Menu {
  top: { items: MenuItem[]; };
}

