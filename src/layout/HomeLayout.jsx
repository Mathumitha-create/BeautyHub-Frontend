import Header from "../Components/Header";
import Footer from "../Components/footer";
import home from "../assets/home.jpg.png";
import { useLocation } from "react-router";

const HomeLayout = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <>
      <Header />
      {isHomePage && (
        <section className="w-full overflow-hidden">
          <img
            src={home}
            alt="Beauty Hub Banner"
            className="w-full h-80 object-cover"
          />
        </section>
      )}
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
};
export default HomeLayout;
