import { createRoot } from "react-dom/client";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { App } from "@app/ui/App";

import "dayjs/locale/ru";

import "./index.css";

dayjs.extend(utc);

createRoot(document.getElementById("root")!).render(<App />);
