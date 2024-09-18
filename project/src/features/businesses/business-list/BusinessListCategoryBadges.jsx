import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";

const BusinessListCategoryBadges = ({
  BASE_URL,
  businessId,
  handleBadgeClick,
}) => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      setError(null);
      try {
        // get categories for a business
        const response = await fetch(
          `${BASE_URL}/businesses/${businessId}/categories`,
        );

        const json = await response.json();

        setCategories(json.categories);
      } catch (error) {
        setError("Unable to load categories");
      }
      setIsLoading(false);
    })();
  }, []);


  if (error)
    return <p className="mt-2 text-center text-destructive">{error}</p>;

  return categories.map((category) => (
    // MAKE THESE VARIOUS COLORS w/ avatar component
    <Badge
      key={category.id}
      className="cursor-pointer drop-shadow-md"
      onClick={() => handleBadgeClick(category.categoryName)}
    >
      <span className="h-fit leading-5 tracking-wide">
        {category.categoryName}
      </span>
    </Badge>
  ));
};

export default BusinessListCategoryBadges;
