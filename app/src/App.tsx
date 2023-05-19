import { Outlet } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { PropsWithChildren } from "react";

export function App() {
  return (
    <Layout>
      <Navbar />
      <Outlet />
    </Layout>
  );
}

function Layout({ children }: PropsWithChildren) {
  return <div className="max-w-7xl my-0 mx-auto bg-gray-100 min-h-screen">{children}</div>;
}
