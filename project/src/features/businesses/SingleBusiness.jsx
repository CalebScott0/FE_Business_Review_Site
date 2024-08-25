import { useParams } from "react-router-dom";

const SingleBusiness = () => {
  const { id } = useParams();
  console.log(id);
  return <p>Hi There!</p>;
};
export default SingleBusiness;
