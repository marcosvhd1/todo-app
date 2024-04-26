import { Input } from "@/components/ui/input";
import { Filter } from "./components/filter";

export function Toolbar() {
  return (
    <div className="flex space-x-2">
      <Input placeholder="Filter tasks..." className="h-8" />
      <Filter title="Status" />
      <Filter title="Priority" />
    </div>
  );
}
