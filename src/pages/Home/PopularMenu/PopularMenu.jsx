import React, { useState, useEffect } from "react";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useMenu from "../../../hooks/useMenu";
import { Link } from "react-router-dom";

const PopularMenu = () => {
  const [menu] = useMenu();  // Fetching menu data using the custom hook
  const popular = menu.filter(item => item.category === 'popular');  // Filtering popular items

  return (
    <section className="pt-2 pb-8">
      <SectionTitle
        subHeading={"From 11.00am to 10.00pm"}
        heading={"Order Online"}
      />
      

      <div className="grid md:grid-cols-2 lg:grid-cols-3">
        {popular.map((item) => (  // Looping through the popular items
          <MenuItem key={item._id} item={item} />  // Rendering each MenuItem
        ))}
      </div>

      

<Link to="/menu"><button className="btn btn-neutral btn-outline text-center">
        View Full Menu
      </button></Link>
       
    </section>
  );
};

export default PopularMenu;
