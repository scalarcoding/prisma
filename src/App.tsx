import { Route, Routes } from "react-router-dom";
import "./App.css";
import DefaultLayout from "./layouts/DefaultLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import PageTitle from "./components/ui/pagetitle";
import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import OutstandingWR from "./pages/Orders/OutstandingWR";
import ProductsMaintenance from "./pages/ProductsMaintenance/ProductsMaintenance";
import ProductsDetail from "./pages/ProductsDetail/ProductsDetail";
import CreateWR from "./pages/CreateWr/CreateWR";

function App() {
  return (
    <DefaultLayout>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <PageTitle title="PRISMA | Home" />
              <Home />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <PageTitle title="PRISMA | Login" />
            </>
          }
        />
        <Route
          path="/products/:id"
          element={
            <>
              <PageTitle title="PRISMA | Products by Category" />
              <Products />
            </>
          }
        />
        <Route
          path="/products"
          element={
            <>
              <PageTitle title="PRISMA | Products" />
              <Products />
            </>
          }
        />

        <Route
          path="/product/detail/:id"
          element={
            <>
              <PageTitle title="PRISMA | Product Detail" />
              <ProductsDetail/>
            </>
          }
        />

        <Route
          path="/products/maintenance"
          element={
            <>
              <PageTitle title="PRISMA | Products" />
              <ProductsMaintenance />
            </>
          }
        />
         <Route
          path="/products/maintenance/:id"
          element={
            <>
              <PageTitle title="PRISMA | Products" />
              <ProductsMaintenance />
            </>
          }
        />

        <Route
          path="/outstandingwr"
          element={
            <>
              <PageTitle title="PRISMA | Outstanding WR" />
              <OutstandingWR />
            </>
          }
        />
        <Route
          path="/createwr"
          element={
            <>
              <PageTitle title="PRISMA | Create WR" />
              <CreateWR />
            </>
          }
        />

        <Route
          path="/carts"
          element={
            <>
              <PageTitle title="PRISMA | Carts" />
            </>
          }
        />

        <Route
          path="/checkout"
          element={
            <>
              <PageTitle title="PRISMA | Checkout" />
            </>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              element={
                <>
                  <PageTitle title="PRISMA | Checkout" />
                  <Dashboard />
                </>
              }
            ></ProtectedRoute>
          }
        ></Route>
      </Routes>
    </DefaultLayout>
  );
}

export default App;
