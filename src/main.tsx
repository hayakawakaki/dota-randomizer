import { createRoot } from "react-dom/client";
import App from "@/App.tsx";
import "@css/reset.css";
import "@css/typography.css";
import "@css/variables.css";
import "@css/default.css";
import "@css/utility.css";

createRoot(document.getElementById("root")!).render(<App />);
