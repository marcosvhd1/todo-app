import { ToggleTheme } from "@/components/ui/toggle-theme";

export function Header() {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight">
          Welcome back!
        </h2>
        <p className="text-muted-foreground">
          Here&apos;s a list of your tasks!
        </p>
      </div>
      <ToggleTheme />
    </div>
  );
}
