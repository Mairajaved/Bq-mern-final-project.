import HeroImage from "../../images/hero.jpg";
import Footer from "./Footer";
import UserNav from "../Components/UserNav";
import UserCards from "../Components/UserCards";
import Brands from "../Pages/Brands";
import Category from "./Category";

export default function Home() {
  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${HeroImage})`,
          height: "100vh",
          backgroundSize: "cover",
        }}
      >
        <UserNav />
        {/* <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            minHeight: "100vh",
          }}
        >
          <h2
            className="text-white center"
            style={{
              fontSize: "2.5rem",
              textAlign: "left",
              paddingLeft: "150px",
            }}
          >
            Welcome to Rabis Café! 🍰🍩☕
          </h2>
          <p
            className="text-white"
            style={{
              fontSize: "1.2rem",
              textAlign: "center",
              paddingLeft: "150px",
            }}
          >
            Indulge in our delightful cakes and pastries. A taste of heaven in
            every bite. 🌟🧁🍪
          </p>
        </div> */}
      </div>

      <Brands />
      <Category />
      <Footer />
    </div>
  );
}
