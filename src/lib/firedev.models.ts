export type FiredevModeSimple = 'view' | 'edit' | 'add';
export type FiredevModeUser = `user-${FiredevModeSimple}`
export type FiredevModeAdmin = `admin-${FiredevModeSimple}`
export type FiredevMode = FiredevModeAdmin | FiredevModeUser;
