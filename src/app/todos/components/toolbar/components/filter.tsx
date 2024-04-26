import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { PlusCircleIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";

interface FilterProps {
  title: string;
}

export function Filter({ title }: FilterProps) {
  const form = useFormContext();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <PlusCircleIcon className="size-4 mr-2" />
          {title}
        </Button>
      </PopoverTrigger>
    </Popover>
  );
}
