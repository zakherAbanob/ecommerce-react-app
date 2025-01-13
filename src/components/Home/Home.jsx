import React, { useEffect, useState } from "react";
import RecentProducts from "../RecentProducts/RecentProducts";
import useOnline from "../../Hooks/UseOnline";
import { Helmet } from "react-helmet";
import CategorySlider from "../CategorySlider/CategorySlider";

export default function Home() {
  let isOnline = useOnline();
  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="FreshCart| Home Page" />
        <meta name="keyWord" content="E-commerce, FreshCart" />
      </Helmet>

      <CategorySlider />
      <RecentProducts />
    </>
  );
}
