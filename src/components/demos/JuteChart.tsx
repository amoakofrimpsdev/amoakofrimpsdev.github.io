"use client";

import { useState } from "react";

const results = [
  { model: "DenseNet201", precision: 0.959, recall: 0.947, f1: 0.947, auc: 0.9998 },
  { model: "VGG16", precision: 0.889, recall: 0.885, f1: 0.882, auc: 0.994 },
  { model: "ResNet50", precision: 0.442, recall: 0.442, f1: 0.41, auc: 0.873 },
  { model: "ResNet101", precision: 0.357, recall: 0.383, f1: 0.347, auc: 0.851 },
  { model: "EfficientNetB0", precision: 0.004, recall: 0.059, f1: 0.007, auc: 0.659 },
];

const metrics = [
  { id: "f1", label: "F1" },
  { id: "precision", label: "Precision" },
  { id: "recall", label: "Recall" },
  { id: "auc", label: "AUC" },
] as const;

type MetricId = (typeof metrics)[number]["id"];

export default function JuteChart() {
  const [metric, setMetric] = useState<MetricId>("f1");
  const best = Math.max(...results.map((r) => r[metric]));

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-3.5">
        <span className="label">Macro averaged, held out test set</span>
        <div role="group" aria-label="Metric" className="flex rounded-full border border-line p-0.5">
          {metrics.map((m) => (
            <button
              key={m.id}
              type="button"
              aria-pressed={metric === m.id}
              onClick={() => setMetric(m.id)}
              className={`rounded-full px-3 py-1.5 text-xs transition-colors ${
                metric === m.id ? "bg-ink text-bg" : "text-ink-2 hover:text-ink"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <ul className="space-y-4 px-5 py-6">
        {results.map((r) => {
          const value = r[metric];
          const top = value === best;
          return (
            <li key={r.model} className="grid grid-cols-[7.5rem_1fr_3.5rem] items-center gap-3 sm:grid-cols-[9rem_1fr_4rem]">
              <span className={`truncate text-sm ${top ? "font-medium text-ink" : "text-ink-2"}`}>{r.model}</span>
              <span className="h-7 overflow-hidden rounded-md bg-sunken">
                <span
                  className={`block h-full rounded-md transition-[width] duration-700 ease-out ${top ? "bg-accent" : "bg-line-2"}`}
                  style={{ width: `${Math.max(value * 100, 0.6)}%` }}
                />
              </span>
              <span className={`text-right font-mono text-[13px] tabular-nums ${top ? "text-accent-ink" : "text-ink-2"}`}>
                {value.toFixed(3)}
              </span>
            </li>
          );
        })}
      </ul>

      <p className="border-t border-line px-5 py-3.5 text-sm text-ink-2">
        Same data and same training settings for every row. Only the pretrained backbone changes.
      </p>
    </div>
  );
}
