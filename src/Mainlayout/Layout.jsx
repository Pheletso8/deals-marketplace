import { Outlet } from "react-router-dom"
import Navigation from "../Components/Navigation";
import Footer from "../Components/Footer";

export default function Layout() {
  return (
    <div>
      <Navigation />
      <main className="mt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}