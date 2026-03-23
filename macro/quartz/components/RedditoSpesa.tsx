import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
// @ts-ignore
import script from "./scripts/reddito-spesa.inline"

const RedditoSpesa: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  return (
    <div class={`reddito-spesa-simulator ${displayClass ?? ""}`} style={{ width: '100%' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .simulator-container { display: flex; gap: 2rem; flex-wrap: wrap; margin-top: 1rem; padding: 1.5rem; background: var(--lightgray); border-radius: 8px; border: 1px solid var(--gray); }
        .controls { flex: 1; min-width: 300px; }
        .chart-area { flex: 2; min-width: 400px; background: #ffffff; padding: 1rem; border-radius: 6px; height: 400px; border: 1px solid var(--gray); }
        .input-item { margin-bottom: 1rem; }
        .input-item label { display: block; font-weight: bold; margin-bottom: 0.2rem; font-size: 0.9rem; color: #333; }
        .input-row { display: flex; align-items: center; gap: 10px; }
        .input-row input[type="range"] { flex: 1; }
        .input-row input[type="number"] { width: 70px; }
        .result-box { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 1.5rem; }
        .result-item { background: var(--highlight); padding: 0.8rem; border-radius: 4px; text-align: center; border: 1px solid #ddd; }
        .result-value { display: block; font-size: 1.2rem; color: var(--secondary); font-weight: bold; }
        .result-label { font-size: 0.8rem; color: var(--darkgray); }
      `}} />

      <div class="simulator-container">
        <div class="controls">
          <div class="input-item">
            <label>C₀ (Consumo autonomo)</label>
            <div class="input-row">
              <input type="range" id="c0-range" min="0" max="500" value="100" />
              <input type="number" id="c0" value="100" />
            </div>
          </div>
          <div class="input-item">
            <label>c (Propensione marg. consumo)</label>
            <div class="input-row">
              <input type="range" id="c-range" min="0" max="1" step="0.01" value="0.8" />
              <input type="number" id="c" value="0.8" step="0.01" />
            </div>
          </div>
          <div class="input-item">
            <label>I₀ (Investimento)</label>
            <div class="input-row">
              <input type="range" id="i0-range" min="0" max="500" value="50" />
              <input type="number" id="i0" value="50" />
            </div>
          </div>
          <div class="input-item">
            <label>G₀ (Spesa pubblica)</label>
            <div class="input-row">
              <input type="range" id="g0-range" min="0" max="500" value="100" />
              <input type="number" id="g0" value="100" />
            </div>
          </div>
          <div class="input-item">
            <label>T₀ (Tasse fisse)</label>
            <div class="input-row">
              <input type="range" id="t0-range" min="0" max="200" value="20" />
              <input type="number" id="t0" value="20" />
            </div>
          </div>
          <div class="input-item">
            <label>t (Aliquota fiscale)</label>
            <div class="input-row">
              <input type="range" id="t-range" min="0" max="0.5" step="0.01" value="0.2" />
              <input type="number" id="t" value="0.2" step="0.01" />
            </div>
          </div>
          <div class="result-box">
            <div class="result-item"><span class="result-label">Reddito Equil. (Y*)</span><span class="result-value" id="y-star">-</span></div>
            <div class="result-item"><span class="result-label">Moltiplicatore (m)</span><span class="result-value" id="multiplier">-</span></div>
          </div>
        </div>
        <div class="chart-area">
          <canvas id="redditoSpesaChart"></canvas>
        </div>
      </div>
    </div>
  )
}

RedditoSpesa.afterDOMLoaded = script

export default (() => RedditoSpesa) satisfies QuartzComponentConstructor

