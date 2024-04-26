import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Header } from "./components/header/header";
import { Toolbar } from "./components/toolbar/toolbar";

export default function Page() {
  return (
    <div className="h-screen p-8 space-y-6">
      <Header />
      <Toolbar />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="text-xs">
              <TableHead>ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-sm">
            <TableRow>
              <TableCell>1785</TableCell>
              <TableCell>Send order to client</TableCell>
              <TableCell>Completed</TableCell>
              <TableCell>High</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>8782</TableCell>
              <TableCell>We need to bypass the neural TCP card!</TableCell>
              <TableCell>Pending</TableCell>
              <TableCell>Medium</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
