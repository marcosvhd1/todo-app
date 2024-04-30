import { ModalFieldContainer } from "@/app/todos/components/modal/components/modal-field-container";
import { priorities, statuses } from "@/app/todos/data/data";
import { FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useFormContext } from "react-hook-form";
import { Todo } from "../../../../../../prisma/generated/client";

export function ModalContent() {
  const form = useFormContext<Todo>();

  return (
    <div className="flex flex-col justify-center items-start gap-4 py-6">
      <ModalFieldContainer title="Title">
        <Input
          placeholder="Title of your todo"
          defaultValue={form.getValues("title")}
          {...form.register("title")}
        />
      </ModalFieldContainer>
      <ModalFieldContainer title="Status">
        <FormField
          name="status"
          control={form.control}
          defaultValue={form.getValues("status") ?? "pending"}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => {
                  return (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          )}
        />
      </ModalFieldContainer>
      <ModalFieldContainer title="Priority">
        <FormField
          name="priority"
          control={form.control}
          defaultValue={form.getValues("priority") ?? "low"}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {priorities.map((priority) => {
                  return (
                    <SelectItem key={priority.value} value={priority.value}>
                      {priority.label}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          )}
        />
      </ModalFieldContainer>
    </div>
  );
}
