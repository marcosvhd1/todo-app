import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function Content() {
  return (
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
  );
}
