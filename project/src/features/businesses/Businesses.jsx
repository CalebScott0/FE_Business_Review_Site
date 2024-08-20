import { useParams } from "react-router-dom";
import { useGetBusinessesByCategoryQuery } from "./businessSlice";

const Businesses = () => {
  // grab category name form url
  const { category } = useParams();

  console.log(category);
  const {
    data = {},
    error,
    isLoading,
  } = useGetBusinessesByCategoryQuery(category);
  if (data.businesses) {
    console.log(data.businesses);
  }
  return (
    <>
      <p>Businesses by category page</p>;
    </>
  );
};
export default Businesses;
