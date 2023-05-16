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

  type AuthContextType = {
    isAuthenticated: boolean;
    user: IUser | null;
    login: (...args: any[]) => void;
    loading: boolean;
    logout: () => void;
  };
}
