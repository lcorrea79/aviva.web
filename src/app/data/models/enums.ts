export enum PaymentMode {
  Cash,
  Card,
  Transfer
}

export const PaymentModeTypeMap = {
  [PaymentMode.Cash]: 'Cash',
  [PaymentMode.Card]: 'Card',
  [PaymentMode.Transfer]: 'Transfer'
};
 

export enum OrderStatus {
  None,
  Pending,
  Paid,
  Cancelled
}

export const OrderStatusMap = {
  [OrderStatus.None]: 'None',
  [OrderStatus.Pending]: 'Pending',
  [OrderStatus.Paid]: 'Paid',
   [OrderStatus.Cancelled]: 'Cancelled'
};

export enum Theme {
  Light,
  Dark
}
export const ThemeMap = {
  [Theme.Light]: 'light',
  [Theme.Dark]: 'dark'
};

export enum Sidebar {
  Close,
  Open
}

export const SidebarMap = {
  [Sidebar.Close]: 'sm-hover',
  [Sidebar.Open]: 'sm-hover-active'
};