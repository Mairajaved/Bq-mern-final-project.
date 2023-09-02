import "./Card.css";
import { BsBuildingFillCheck } from "react-icons/bs";
import { BiCategoryAlt } from "react-icons/bi";
import {
  MdOutlineProductionQuantityLimits,
  MdFavoriteBorder,
} from "react-icons/md";

export default function CustomCard({ brands, categories, products, orders }) {
  const cardVal = [
    {
      Name: "Products",
      Quantity: products,
      Icon: <MdOutlineProductionQuantityLimits />,
      CardColor: "item item--1",
      CardText: "text text--1",
    },
    {
      Name: "Category",
      Quantity: categories,
      Icon: <BiCategoryAlt />,
      CardColor: "item item--2",
      CardText: "text text--2",
    },
    {
      Name: "Brands",
      Quantity: brands,
      Icon: <BsBuildingFillCheck />,
      CardColor: "item item--3",
      CardText: "text text--3",
    },
    {
      Name: "Orders",
      Quantity: orders,
      Icon: <MdFavoriteBorder />,
      CardColor: "item item--4",
      CardText: "text text--4",
    },
  ];

  return (
    <div>
      <div className="cardCustom">
        {cardVal.map((val, key) => (
          <div className={val.CardColor} key={key}>
            <span>{val.Icon}</span>
            {/* <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"></path><path fill="rgba(149,149,255,1)" d="M17 15.245v6.872a.5.5 0 0 1-.757.429L12 20l-4.243 2.546a.5.5 0 0 1-.757-.43v-6.87a8 8 0 1 1 10 0zm-8 1.173v3.05l3-1.8 3 1.8v-3.05A7.978 7.978 0 0 1 12 17a7.978 7.978 0 0 1-3-.582zM12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"></path></svg> */}
            <span className="quantity"> {val.Quantity}</span>
            <span className={val.CardText}> {val.Name} </span>
          </div>
        ))}
        {/* <div className="item item--1">
                    <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"></path><path fill="rgba(149,149,255,1)" d="M17 15.245v6.872a.5.5 0 0 1-.757.429L12 20l-4.243 2.546a.5.5 0 0 1-.757-.43v-6.87a8 8 0 1 1 10 0zm-8 1.173v3.05l3-1.8 3 1.8v-3.05A7.978 7.978 0 0 1 12 17a7.978 7.978 0 0 1-3-.582zM12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"></path></svg>
                    <span className="quantity"> {products}</span>
                    <span className="text text--1"> Icons </span>
                </div>
                <div className="item item--3">
                    <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"></path><path fill="rgba(66,193,110,1)" d="M20.083 15.2l1.202.721a.5.5 0 0 1 0 .858l-8.77 5.262a1 1 0 0 1-1.03 0l-8.77-5.262a.5.5 0 0 1 0-.858l1.202-.721L12 20.05l8.083-4.85zm0-4.7l1.202.721a.5.5 0 0 1 0 .858L12 17.65l-9.285-5.571a.5.5 0 0 1 0-.858l1.202-.721L12 15.35l8.083-4.85zm-7.569-9.191l8.771 5.262a.5.5 0 0 1 0 .858L12 13 2.715 7.429a.5.5 0 0 1 0-.858l8.77-5.262a1 1 0 0 1 1.03 0zM12 3.332L5.887 7 12 10.668 18.113 7 12 3.332z"></path></svg>
                    <span className="quantity"> {brands} </span>
                    <span className="text text--3"> Components </span>
                </div>
                <div className="item item--4">
                    <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"></path><path fill="rgba(220,91,183,1)" d="M12 20h8v2h-8C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10a9.956 9.956 0 0 1-2 6h-2.708A8 8 0 1 0 12 20zm0-10a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm-4 4a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm8 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm-4 4a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"></path></svg>
                    <span className="quantity"> {categories} </span>
                    <span className="text text--4"> Animations </span>
                </div> */}
      </div>
    </div>
  );
}
