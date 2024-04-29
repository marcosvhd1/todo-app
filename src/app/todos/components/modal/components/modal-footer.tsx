import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Ban, Check } from "lucide-react";

export function ModalFooter() {
  return (
    <AlertDialogFooter>
      <AlertDialogCancel>
        <Ban className="size-4 mr-2" />
        Cancel
      </AlertDialogCancel>
      <AlertDialogAction type="submit">
        <Check className="size-4 mr-2" />
        Submit
      </AlertDialogAction>
    </AlertDialogFooter>
  );
}
