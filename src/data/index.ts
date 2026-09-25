import { dataset as acme } from "./acme";
import { dataset as coreweave } from "./coreweave";
import { dataset as halden } from "./halden";
import type { Dataset } from "../types";

// The examples the tracker can show. The first is the default on load.
// Private demos live in src/data/private-*.ts, which git ignores; each exports
// `dataset` and joins the switch when present.
const privates = import.meta.glob<Dataset>("./private-*.ts", { eager: true, import: "dataset" });

export const datasets: Dataset[] = [coreweave, halden, acme, ...Object.values(privates)];
