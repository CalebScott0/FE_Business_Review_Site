import { useState } from "react";
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
import { useGetCategoriesQuery } from "./categoryslice";

const SearchCategories = ({ setCategory }) => {
  const { data = {}, error, isLoading } = useGetCategoriesQuery();

  const [open, setOpen] = useState(false);
  // value mapped to category.name
  const [value, setValue] = useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          x
          role="combobox"
          aria-expanded={open}
          className="w-72 justify-between"
        >
          {value
            ? data.categories.find(
                (category) => category.categoryName === value,
              )?.categoryName
            : "Select category..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-0">
        <Command>
          <CommandInput placeholder="Search category..." />
          <CommandList>
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup>
              {data.categories &&
                data.categories.map((category) => (
                  <CommandItem
                    className="cursor-pointer"
                    key={category.categoryId}
                    value={category.categoryName}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                      setCategory(category.categoryName);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === category.categoryName
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                    {category.categoryName}
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
export default SearchCategories;
