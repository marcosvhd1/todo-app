import { DataTable } from "@/app/todos/components/data-table/data-table";
import { Header } from "@/app/todos/components/header/header";
import { Toolbar } from "@/app/todos/components/toolbar/toolbar";

export default function Page() {
  return (
    <div className="h-screen grid grid-rows-[5rem_13rem_1fr] sm:grid-rows-[5rem_5rem_1fr] p-6">
      <Header />
      <Toolbar />
      <DataTable />
    </div>
  );
}
