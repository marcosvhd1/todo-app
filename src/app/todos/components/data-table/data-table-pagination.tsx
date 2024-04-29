import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface DataTablePaginationProps {
  totalData: number;
  currentPage: number;
  dataPerPage: number;
  setCurrentPage: (value: number) => void;
  setDataPerPage: (value: number) => void;
}

export function DataTablePagination({
  totalData,
  currentPage,
  setCurrentPage,
  dataPerPage,
  setDataPerPage,
}: DataTablePaginationProps) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalData / dataPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleNextPage = () => {
    if (currentPage < pageNumbers.length) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleChangeDataPerPage = (value: string) => {
    setDataPerPage(Number(value));
    setCurrentPage(1);
  };

  return (
    <div className="flex justify-between items-center pt-5">
      <div className="flex items-center text-nowrap space-x-3">
        <Label>Data per page</Label>
        <Select
          onValueChange={(value) => handleChangeDataPerPage(value)}
          defaultValue={`${dataPerPage}`}
        >
          <SelectTrigger className="w-16">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="text-nowrap">
        <Label>
          Page {currentPage} of {pageNumbers.length}
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          disabled={currentPage === 1}
        >
          <ChevronLeftIcon className="h-4 w-4" onClick={handlePrevPage} />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          disabled={currentPage === pageNumbers.length}
        >
          <ChevronRightIcon className="h-4 w-4" onClick={handleNextPage} />
        </Button>
      </div>
    </div>
  );
}
