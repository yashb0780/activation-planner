import { dataset as halden } from "./halden";
import type { Dataset } from "../types";

// The public example is always here. Private demos live in src/data/private-*.ts,
// which git ignores; each exports `dataset`. When none exist (as in the public
// build), this list holds only the public example and no switch is shown.
const privates = import.meta.glob<Dataset>("./private-*.ts", { eager: true, import: "dataset" });

export const datasets: Dataset[] = [halden, ...Object.values(privates)];
