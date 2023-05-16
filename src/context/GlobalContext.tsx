import React, {
  createContext,
  useContext,
  useState,
  FC,
  ReactNode,
} from "react";
import request from "@/utils/request";
import storage from "@/utils/storage";

interface Props {
  children: ReactNode;
}

const GlobalContext = createContext<GlobalContextType | null>(null);

const GlobalProvider: FC<Props> = ({ children }) => {
  const [orderList, setOrderList] = useState<IOrder[]>([]);
  const [isorderListLoading, setIsorderListLoading] = useState<boolean>(true);

  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [formLoading, setFormLoading] = useState<boolean>(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2);

  const [errorMsg, setErrorMsg] = useState<string>("");

  const fetchOrders = async () => {
    setIsorderListLoading(true);
    try {
      const { data } = await request({
        method: "GET",
        url: "/orders",
      });

      setOrderList(data ?? []);
      setIsorderListLoading(false);
    } catch (error: any) {
      setErrorMsg(error?.message || "Error: Cannot fetch orders");
      setIsorderListLoading(false);
    }
  };

  const createOrder = async (data: IOrder) => {
    setFormLoading(true);

    try {
      const response = await request({
        method: "POST",
        url: "/orders",
        data,
      });

      setFormLoading(false);
    } catch (error: any) {
      setFormLoading(false);
      setErrorMsg(error?.message || "Error: Cannot create order");
    }
  };

  const handleAddFormClick = () => {
    setIsFormOpen(!isFormOpen);
  };

  const changePage = (newPage: number) => {
    setPage(newPage);
  };

  const changeRowsPerPage = (value: any) => {
    setRowsPerPage(parseInt(value, 10));
    setPage(0);
  };

  const value = {
    orderList,
    fetchOrders,
    createOrder,
    formLoading,
    isFormOpen,
    handleAddFormClick,
    page,
    rowsPerPage,
    changePage,
    changeRowsPerPage,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

function useGlobal() {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobal must be used within a GlobalProvider");
  }
  return context as GlobalContextType;
}

export { GlobalProvider, useGlobal };
