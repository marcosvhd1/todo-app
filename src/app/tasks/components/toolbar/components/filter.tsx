import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { PlusCircleIcon } from "lucide-react";

interface FilterProps {
  title: string;
}

export function Filter({ title }: FilterProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircleIcon className="mr-2 h-4 w-4" />
          {title}
        </Button>
      </PopoverTrigger>
    </Popover>
  );
}
