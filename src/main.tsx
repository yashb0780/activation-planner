import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/inter";
import "./index.css";
import App from "./App";
import { datasets } from "./data";
import { readPref, writePref } from "./state";

// Picks which customer the tracker shows. The switch only appears when a
// private demo file exists; the public build has one dataset and no switch.
function Root() {
  const ids = datasets.map((d) => d.id);
  const [id, setId] = useState(() => readPref("activation-tracker:dataset", ids[0]!, ids));
  const data = datasets.find((d) => d.id === id) ?? datasets[0]!;
  const switcher =
    datasets.length > 1 ? (
      <select
        aria-label="Example"
        value={data.id}
        onChange={(e) => {
          setId(e.target.value);
          writePref("activation-tracker:dataset", e.target.value);
        }}
        className="max-w-44 shrink-0 truncate rounded-md border border-line bg-panel px-2 py-0.5 text-xs text-muted transition-colors hover:border-line-strong"
      >
        {datasets.map((d) => (
          <option key={d.id} value={d.id}>
            {d.label}
          </option>
        ))}
      </select>
    ) : null;
  return <App key={data.id} data={data} switcher={switcher} />;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
