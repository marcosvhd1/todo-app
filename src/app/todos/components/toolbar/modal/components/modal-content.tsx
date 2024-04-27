import { Input } from "@/components/ui/input";
import { Todo } from "@prisma/client";
import { useFormContext } from "react-hook-form";
import { ModalFieldContainer } from "./modal-field-container";

export function ModalContent() {
  const form = useFormContext<Todo>();

  return (
    <div className="flex flex-col justify-center items-start gap-4 py-6">
      <ModalFieldContainer title="Title">
        <Input placeholder="Title of your todo" {...form.register("title")} />
      </ModalFieldContainer>
      <ModalFieldContainer title="Status">
        <Input />
      </ModalFieldContainer>
    </div>
  );
}
