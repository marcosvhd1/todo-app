import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Ban, Check } from "lucide-react";
import { useFormContext } from "react-hook-form";

export function ModalFooter() {
  const { watch } = useFormContext();

  return (
    <AlertDialogFooter>
      <AlertDialogCancel>
        <Ban className="size-4 mr-2" />
        Cancel
      </AlertDialogCancel>
      <AlertDialogAction type="submit" disabled={!watch("title")}>
        <Check className="size-4 mr-2" />
        Submit
      </AlertDialogAction>
    </AlertDialogFooter>
  );
}
