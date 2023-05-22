import { Outlet } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { PropsWithChildren } from "react";

export function App() {
  return (
    <Layout>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </Layout>
  );
}

function Layout({ children }: PropsWithChildren) {
  return <div className="bg-gray-100 min-h-screen">{children}</div>;
}
