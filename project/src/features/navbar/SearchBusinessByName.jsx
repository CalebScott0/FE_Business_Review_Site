import { useEffect, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SearchBusinessByName = () => {
  const [businesses, setBusinesses] = useState([]);
  // const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      setError(false);
      setIsLoading(true);
      try {
        const res = await fetch(
          "https://api-business-review-site.onrender.com/api/businesses",
        );
        const json = await res.json();
        setBusinesses(json.businesses);
      } catch (error) {
        setError(true);
      }
      setIsLoading(false);
    })();
  }, []);

  // const findMatches = (wordToMatch, businesses) => {
  //   console.log(wordToMatch);
  //   return businesses.filter(({ name }) => {
  //     // global case insensitive search for match word in businesses array
  //     const regex = new RegExp(wordToMatch, "gi");
  //     return name.match(regex);
  //   });
  // };

  const handleBusinessClick = () => {
    const { name } = businesses.find((business) => business.id === value);
    navigate(`/business/${name}/${value}`);
  };

  // filter full business array on search value
  // const businessList = findMatches(searchValue, businesses);

  // value mapped to category.name
  return (
    <div className="flex space-x-0.5">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-72 justify-between"
          >
            {value
              ? businesses.find((business) => business.id === value)?.name
              : "Select a business by name..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-72 p-0">
          <Command>
            <CommandInput
              placeholder="Search business..."
              // onChangeCapture={(e) => {
              //   setSearchValue(e.currentTarget.value);
              // }}
            />
            <CommandList>
              {error && <CommandEmpty>No businesses found.</CommandEmpty>}
              {isLoading && (
                <p className="py-4 text-center">Loading businesses...</p>
              )}

              <CommandGroup>
                {/* show first 1000 businesses with no input */}
                {/* {searchValue.length === 0 && */}
                  {businesses.slice(0, 1000).map((business) => (
                    <CommandItem
                      className="cursor-pointer"
                      key={business.id}
                      value={business.id}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === business.id ? "opacity-100" : "opacity-0",
                        )}
                      />
                      {business.name}
                    </CommandItem>
                  ))}
                {/* filter on input */}
                {/*{searchValue.length > 0 && businessList.map((business) => (
                  <CommandItem
                    className="cursor-pointer"
                    key={business.id}
                    value={business.id}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === business.id ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {business.name}
                  </CommandItem>
                ))} */}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Button
        size="icon"
        variant="outline"
        // HIGHLIGHT OR SHOW MESSAGE IF NO CATEGORY SELECTED
        // Reset combobox on click
        onClick={() => {
          value && handleBusinessClick();
        }}
      >
        <Search />
      </Button>
    </div>
  );
};
export default SearchBusinessByName;
