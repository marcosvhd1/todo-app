import { ModalFieldContainer } from "@/app/todos/components/toolbar/modal/components/modal-field-container";
import { FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Todo } from "@prisma/client";
import { useFormContext } from "react-hook-form";

export function ModalContent() {
  const form = useFormContext<Todo>();

  return (
    <div className="flex flex-col justify-center items-start gap-4 py-6">
      <ModalFieldContainer title="Title">
        <Input placeholder="Title of your todo" {...form.register("title")} />
      </ModalFieldContainer>
      <ModalFieldContainer title="Status">
        <FormField
          name="status"
          control={form.control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in progress">In Progress</SelectItem>
                <SelectItem value="canceled">Canceled</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </ModalFieldContainer>
      <ModalFieldContainer title="Priority">
        <FormField
          name="priority"
          control={form.control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </ModalFieldContainer>
    </div>
  );
}
