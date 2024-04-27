import { DataTable } from "./components/data-table/data-table";
import { Header } from "./components/header/header";
import { Toolbar } from "./components/toolbar/toolbar";

export default function Page() {
  return (
    <div className="h-screen p-8 space-y-6">
      <Header />
      <Toolbar />
      <DataTable />
    </div>
  );
}
