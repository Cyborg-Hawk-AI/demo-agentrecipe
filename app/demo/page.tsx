import DemoApp from "@/components/demo/DemoApp";
import { ToastProvider } from "@/components/Toast";

export const metadata = {
  title: "Live Demo — AgentRecipe",
  description: "Interactive demo of the AgentRecipe template library platform.",
};

export default function DemoPage() {
  return (
    <ToastProvider>
      <DemoApp />
    </ToastProvider>
  );
}
