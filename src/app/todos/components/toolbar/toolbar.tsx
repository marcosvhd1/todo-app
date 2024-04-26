"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { Filter } from "./components/filter";

interface ToolbarProps {
  title: string;
  status: string;
  priority: string;
}

export function Toolbar() {
  const form = useForm<ToolbarProps>();

  const handleFilter = (data: ToolbarProps) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={form.handleSubmit(handleFilter)}
      className="flex items-center space-x-4"
    >
      <Input placeholder="Filter tasks..." {...form.register("title")} />
      <Filter title="Status" />
      <Filter title="Priority" />
      <Button type="submit">
        <Search className="size-4 mr-2" />
        Filtrar
      </Button>
    </form>
  );
}
