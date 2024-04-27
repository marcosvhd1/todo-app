"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Filter } from "./components/filter";

interface ToolbarProps {
  title: string;
  status: string;
  priority: string;
}

export function Toolbar() {
  const form = useForm<ToolbarProps>();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  form.setValue("title", searchParams.get("title") ?? "");

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value === "") params.delete(name);
      else params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleFilter = async (data: ToolbarProps) => {
    router.push(pathname + "?" + createQueryString("title", data.title));
  };

  return (
    <form onSubmit={form.handleSubmit(handleFilter)} className="flex space-x-5">
      <Input placeholder="Filter tasks..." {...form.register("title")} />
      <Filter title="Status" />
      <Filter title="Priority" />
      <Button type="submit">
        <Search className="size-4 mr-2" />
        Search
      </Button>
    </form>
  );
}
