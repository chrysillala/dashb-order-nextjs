export {};

declare global {
  interface IOrder {
    TrackingNumber?: string;
    ConsigneeAddress: string;
    ConsigneeName: string;
    ConsigneeNumber: string;
    ConsigneeCity: string;
    ConsigneeProvince: string;
    ConsigneePostalCode: string;
    ConsigneeCountry: string;
    PaymentType: string;
    Weight: number;
    Height: number;
    Width: number;
    Length: number;
  }

  interface IUser {
    username: string;
  }

  interface ICredentials {
    username: string;
    password: string;
  }

  type GlobalContextType = {
    orderList: IOrder[];
    fetchOrders: () => void;
    createOrder: (...args: any[]) => void;
    formLoading: boolean;
    isFormOpen: boolean;
    handleAddFormClick: () => void;
    page: number;
    rowsPerPage: number;
    changePage: (...args: any[]) => void;
    changeRowsPerPage: (...args: any[]) => void;
  };

  type AuthContextType = {
    isAuthenticated: boolean;
    user: IUser | null;
    login: (...args: any[]) => void;
    loading: boolean;
    logout: () => void;
  };
}
