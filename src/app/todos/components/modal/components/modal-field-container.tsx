import { Label } from "@/components/ui/label";
import { ReactNode } from "react";

interface ModalFieldContainerProps {
  title: string;
  children: ReactNode;
}

export function ModalFieldContainer({
  title,
  children,
}: ModalFieldContainerProps) {
  return (
    <div className="w-full space-y-1">
      <Label>{title}</Label>
      {children}
    </div>
  );
}
