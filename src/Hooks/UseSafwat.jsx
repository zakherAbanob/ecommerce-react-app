//* useSafwat==> it is a custom hook with a specific function which return the response of Products from API
//* enjoy using Safwat Hook ^_^

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useSafwat() {
  function getRecentProducts() {
    // make return axios to return the response in the hook useSafwat
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  let responseObject = useQuery({
    queryKey: ["recentProducts"],
    queryFn: getRecentProducts,
    refetchInterval: 5000,

    // staleTime: 5000,
    // retry: 5,
    // retryDelay: 3000,
  });
  return responseObject; // return the object
}
