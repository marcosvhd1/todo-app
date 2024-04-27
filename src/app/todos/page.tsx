import { DataTable } from "@/app/todos/components/data-table/data-table";
import { Header } from "@/app/todos/components/header/header";
import { Toolbar } from "@/app/todos/components/toolbar/toolbar";

export default function Page() {
  return (
    <div className="p-8 space-y-6">
      <Header />
      <Toolbar />
      <DataTable />
    </div>
  );
}
