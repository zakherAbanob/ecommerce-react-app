import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../Loading/Loading";
import HomeSlider from "../HomeSlider/HomeSlider";
import CategorySlider from "../CategorySlider/CategorySlider";

export default function Categories() {
  return (
    <>
      <div className="py-10">
        <HomeSlider />
        <CategorySlider />
      </div>
    </>
  );
}
