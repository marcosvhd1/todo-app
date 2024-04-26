import { Content } from "./components/content/content";
import { Header } from "./components/header/header";
import { Toolbar } from "./components/toolbar/toolbar";

export default function Page() {
  return (
    <div className="h-screen p-8 space-y-6">
      <Header />
      <Toolbar />
      <Content />
    </div>
  );
}
