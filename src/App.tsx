// App.tsx
import { Route, Routes } from "react-router-dom";
import "./App.css";
import DefaultLayout from "./layouts/DefaultLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import { routes } from "./pages/Routes/routes";
import PageTitle from "./components/ui/pagetitle";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <DefaultLayout>
      <Toaster />
      <Routes>
        {routes.map(({ path, title, element, isProtected }) => (
          <Route
            key={path}
            path={path}
            element={
              isProtected ? (
                <ProtectedRoute
                  element={
                    <>
                      <PageTitle title={title} />
                      {element}
                    </>
                  }
                />
              ) : (
                <>
                  <PageTitle title={title} />
                  {element}
                </>
              )
            }
          />
        ))}
      </Routes>
    </DefaultLayout>
  );
}

export default App;
