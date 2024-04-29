import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface DataTablePaginationProps {
  totalData: number;
  dataPerPage: number;
}

export function DataTablePagination({
  totalData,
  dataPerPage,
}: DataTablePaginationProps) {
  const pageNumbers = [];

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = searchParams.get("page") ?? "1";

  for (let i = 1; i <= Math.ceil(totalData / dataPerPage); i++) {
    pageNumbers.push(i);
  }

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value === "") params.delete(name);
      else params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleNextPage = () => {
    if (Number(page) < pageNumbers.length) {
      router.push(
        pathname +
          "?" +
          createQueryString("page", (Number(page) + 1).toString())
      );
    }
  };

  const handlePrevPage = () => {
    if (Number(page) > 1) {
      router.push(
        pathname +
          "?" +
          createQueryString("page", (Number(page) - 1).toString())
      );
    }
  };

  return (
    <div className="flex justify-between items-center pt-5">
      <Label>Count: {`${totalData}`}</Label>
      <div className="text-nowrap">
        <Label>
          Page {page} of {pageNumbers.length}
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          disabled={Number(page) === 1}
        >
          <ChevronLeftIcon className="h-4 w-4" onClick={handlePrevPage} />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          disabled={Number(page) === pageNumbers.length}
        >
          <ChevronRightIcon className="h-4 w-4" onClick={handleNextPage} />
        </Button>
      </div>
    </div>
  );
}
