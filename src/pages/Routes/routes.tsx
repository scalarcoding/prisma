import Login from "../Auth/Login/Login";
import Cart from "../Cart/Cart";
import CreatePO from "../CreatePo/CreatePo";
import CreateWR from "../CreateWr/CreateWR";
import Dashboard from "../Dashboard/Dashboard";
import Error403 from "../Error/Error403";
import Error404 from "../Error/Error404";
import GoodsReceive from "../GoodsReceive/GoodsReceive";
import GoodsReceiveManual from "../GoodsReceiveManual/GoodReceiveManual";
import Home from "../Home/Home";
import OrdersList from "../OrdersList/OrdersList";
import OutstandingWRTab from "../OrdersList/OutstandingWR/OutstandingWR";
import OrderConfirmed from "../OrderStatus/OrderConfirmed/OrderConfirmed";
import OrderStatus from "../OrderStatus/OrderStatus";
import GoodsIssue from "../PostingWR/GoodsIssue"; 
import Products from "../Products/Products";
import ProductsDetail from "../ProductsDetail/ProductsDetail";
import ProductsMaintenance from "../ProductsMaintenance/ProductsMaintenance";

export const routes = [
  {
    path: "/",
    title: "PRISMA | Home",
    element: <Home />,
    isIndexed:false,
  },
  {
    path: "/login",
    title: "PRISMA | Login",
    element: <Login></Login>,
    isIndexed:false,
  },
  {
    path: "/products/:id",
    title: "PRISMA | Products by Category",
    element: <Products />,
    description : "View Product By Category",
    shortcut : "PVPBBI",
    isIndexed:true,
  },
  {
    path: "/products",
    title: "PRISMA | Products",
    element: <Products />,
    description : "View All Products",
    shortcut : "PVPROD",
    isIndexed:true,
  },
  {
    path: "/product/detail/:id",
    title: "PRISMA | Product Detail",
    element: <ProductsDetail />,
    isIndexed:true,
  },
  {
    path: "/products/maintenance",
    title: "PRISMA | Products",
    element: <ProductsMaintenance />,
    description : "Product Maintenance",
    shortcut : "PRMNTC",
    isIndexed:true,
  },
  {
    path: "/products/maintenance/:id",
    title: "PRISMA | Products",
    element: <ProductsMaintenance />,
    description : "Product Maintenance By Reg Number",
    shortcut : "PRMTRG",
    isIndexed:true,
  },
  {
    path: "/outstandingwr",
    title: "PRISMA | Outstanding WR",
    element: <OutstandingWRTab />,
    description : "View Outstanding Warehouse Requisition (WR)",
    shortcut : "PVIOWR",
    isIndexed:true,
  },
  {
    path: "/create/wr",
    title: "PRISMA | Create WR",
    element: <CreateWR />,
    description : "Create Warehouse Requisition (WR)",
    shortcut : "PCRWRQ",
    isIndexed:true,
  },
  {
    path: "/create/po",
    title: "PRISMA | Create PO",
    element: <CreatePO />,
    description : "Create Purchase Order (PO)",
    shortcut : "PCPODR",
    isIndexed:true,
  },
  
  {
    path: "/cart",
    title: "PRISMA | Order Cart",
    element: <Cart />,
    description : "View Order Cart",
    shortcut : "PVIOCR",
    isIndexed:true,
  },
  {
    path: "/checkout",
    title: "PRISMA | Checkout",
    element: <></>,
  },
  {
    path: "/order/status",
    title: "PRISMA | Order Status",
    element: <OrderStatus />,
    description : "View Order Status (All Requisitions)",
    shortcut : "PVIORS",
    isIndexed:true,
  },
  {
    path: "/wr/:district/:wrNumber",
    title: "PRISMA | Warehouse Requisition Detail",
    element: <OrderConfirmed />,
    description : "View Warehouse Requisition Detail",
    isIndexed:false,
  },
  {
    path: "/order/receive",
    title: "PRISMA | Order Receive - Goods",
    element: <GoodsReceive />,
    isProtected: true,
    description : "Goods Receive",
    shortcut : "PORCGD",
    isIndexed:true,
  },
  {
    path: "/order/manualreceive",
    title: "PRISMA | Order Receive - Goods (Manual)",
    element: <GoodsReceiveManual />,
    isProtected: true,
    description : "Goods Receive (Manual)",
    shortcut : "PORCGM",
    isIndexed:true,
  },
  {
    path: "/order/list",
    title: "PRISMA | Order List",
    element: <OrdersList />,
     description : "View Order List (All Requisitions)",
    shortcut : "PVIORL",
    isIndexed:true,
  },
  {
    path: "/dashboard",
    title: "PRISMA | Dashboard",
    element: <Dashboard />,
    isProtected: true,
    description : "View Dashboard",
    shortcut : "PVIDBR",
    isIndexed:true,
  },
  {
    path: "/order/issue",
    title: "PRISMA | Goods Issue",
    element: <GoodsIssue />,
    isProtected: true,
    description : "Goods Issue",
    shortcut : "PGDISS",
    isIndexed:true,
  },
  
  {
    path: "/403",
    title: "PRISMA | Error 403",
    element: <Error403 />,
    isProtected: false,
    description : "XXXEXRXRXOXRXXXXX",
    shortcut : "PVIDBR",
    isIndexed:false,
  },
  {
    path: "/404",
    title: "PRISMA | Error 404",
    element: <Error404 />,
    isProtected: false,
    description : "XXXEXRXRXOXRXXXXX",
    shortcut : "PVIDBR",
    isIndexed:false,
  },
];
