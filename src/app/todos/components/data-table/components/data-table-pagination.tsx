import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface DataTablePaginationProps {
  totalData: number;
  limit: number;
}

export function DataTablePagination({
  totalData,
  limit,
}: DataTablePaginationProps) {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page")) ?? 1;
  const totalPages = Math.ceil(totalData / limit);

  const handleNextPage = () => {
    const params = new URLSearchParams(searchParams);

    if (page < totalPages) {
      params.set("page", (page + 1).toString());
      replace(`${pathname}?${params.toString()}`);
    }
  };

  const handlePrevPage = () => {
    const params = new URLSearchParams(searchParams);

    if (page > 1) {
      params.set("page", (page - 1).toString());
      replace(`${pathname}?${params.toString()}`);
    }
  };

  return (
    <div className="flex justify-between items-center pt-5">
      <Label>Count: {`${totalData}`}</Label>
      <div className="text-nowrap">
        <Label>
          Page {page.toString()} of {totalPages.toString()}
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="outline" className="h-8 w-8 p-0" disabled={page === 1}>
          <ChevronLeftIcon className="h-4 w-4" onClick={handlePrevPage} />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          disabled={page === totalPages}
        >
          <ChevronRightIcon className="h-4 w-4" onClick={handleNextPage} />
        </Button>
      </div>
    </div>
  );
}
