import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { createRoot } from "react-dom/client";
import "dayjs/locale/ru";

import { App } from "@app/ui/App";

import "./index.css";

dayjs.extend(utc);

createRoot(document.getElementById("root")!).render(<App />);
