import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
// @ts-ignore
import script from "./scripts/islm.inline"

const ISLM: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  return (
    <div class={`islm-simulator ${displayClass ?? ""}`} style={{ width: '100%' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .simulator-container { display: flex; gap: 1.5rem; flex-wrap: wrap; margin: 1.5rem 0; padding: 1.5rem; background: var(--lightgray); border-radius: 8px; border: 1px solid var(--gray); }
        .controls { flex: 1; min-width: 300px; max-height: 800px; overflow-y: auto; padding-right: 10px; }
        .charts-column { flex: 2; display: flex; flex-direction: column; gap: 1.5rem; min-width: 400px; }
        .chart-wrapper { background: #ffffff; padding: 1rem; border-radius: 6px; height: 350px; border: 1px solid var(--gray); position: relative; }
        .chart-title { font-size: 0.95rem; font-weight: bold; text-align: center; margin-bottom: 0.5rem; color: #333; }
        .input-group-title { font-weight: bold; margin: 1rem 0 0.5rem 0; color: var(--secondary); border-bottom: 1px solid var(--gray); font-size: 0.85rem; text-transform: uppercase; }
        .input-item { margin-bottom: 0.8rem; }
        .input-item label { display: block; font-weight: normal; margin-bottom: 0.1rem; font-size: 0.8rem; color: #333; }
        .input-row { display: flex; align-items: center; gap: 10px; }
        .input-row input[type="range"] { flex: 1; }
        .input-row input[type="number"] { width: 60px; font-size: 0.75rem; border: 1px solid #ccc; border-radius: 3px; }
        .result-box { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 1rem; }
        .result-item { background: var(--highlight); padding: 0.6rem; border-radius: 4px; text-align: center; border: 1px solid #ddd; }
        .result-item div { font-size: 0.7rem; color: #666; }
        .result-item strong { font-size: 1rem; color: var(--secondary); }
        .multiplier-info { grid-column: span 2; font-size: 0.75rem; color: #555; background: #eee; padding: 5px; border-radius: 4px; margin-top: 5px; text-align: center; }
      `}} />

      <div class="simulator-container">
        <div class="controls">
          <div class="input-group-title">Mercato dei Beni (IS)</div>
          <div class="input-item">
            <label>C₀ (Consumo autonomo)</label>
            <div class="input-row">
              <input type="range" id="is-c0-r" min="0" max="500" value="200" />
              <input type="number" id="is-c0-v" value="200" />
            </div>
          </div>
          <div class="input-item">
            <label>c (Propensione al consumo)</label>
            <div class="input-row">
              <input type="range" id="is-c-r" min="0.1" max="0.99" step="0.01" value="0.8" />
              <input type="number" id="is-c-v" value="0.8" step="0.01" />
            </div>
          </div>
          <div class="input-item">
            <label>I₀ (Investimento autonomo)</label>
            <div class="input-row">
              <input type="range" id="is-i0-r" min="0" max="500" value="150" />
              <input type="number" id="is-i0-v" value="150" />
            </div>
          </div>
          <div class="input-item">
            <label>G (Spesa pubblica)</label>
            <div class="input-row">
              <input type="range" id="is-g-r" min="0" max="500" value="150" />
              <input type="number" id="is-g-v" value="150" />
            </div>
          </div>
          
          <div class="input-group-title">Mercato della Moneta (LM)</div>
          <div class="input-item">
            <label>H (Base Monetaria)</label>
            <div class="input-row">
              <input type="range" id="lm-h-base-r" min="100" max="1000" value="500" />
              <input type="number" id="lm-h-base-v" value="500" />
            </div>
          </div>
          <div class="input-item">
            <label>cr (Rapp. Circolante/Depositi)</label>
            <div class="input-row">
              <input type="range" id="lm-cr-r" min="0" max="1" step="0.01" value="0.2" />
              <input type="number" id="lm-cr-v" value="0.2" step="0.01" />
            </div>
          </div>
          <div class="input-item">
            <label>rr (Rapp. Riserve/Depositi)</label>
            <div class="input-row">
              <input type="range" id="lm-rr-r" min="0.01" max="0.5" step="0.01" value="0.1" />
              <input type="number" id="lm-rr-v" value="0.1" step="0.01" />
            </div>
          </div>
          <div class="input-item">
            <label>P (Livello dei Prezzi)</label>
            <div class="input-row">
              <input type="range" id="lm-p-r" min="1" max="5" step="0.1" value="1" />
              <input type="number" id="lm-p-v" value="1" step="0.1" />
            </div>
          </div>
          
          <div class="input-group-title">Parametri Comportamentali</div>
          <div class="input-item">
            <label>k (Domanda moneta transattiva)</label>
            <div class="input-row">
              <input type="range" id="lm-k-r" min="0.1" max="1" step="0.01" value="0.5" />
              <input type="number" id="lm-k-v" value="0.5" step="0.01" />
            </div>
          </div>
          <div class="input-item">
            <label>h (Sensibilità i domanda moneta)</label>
            <div class="input-row">
              <input type="range" id="lm-h-sens-r" min="500" max="10000" value="5000" />
              <input type="number" id="lm-h-sens-v" value="5000" />
            </div>
          </div>

          <div class="result-box">
            <div class="result-item"><div>Reddito Y*</div><strong id="out-y">-</strong></div>
            <div class="result-item"><div>Tasso i*</div><strong id="out-i">-</strong></div>
            <div class="multiplier-info">
              m: <span id="out-m-val">-</span> | M/P: <span id="out-ms-real">-</span>
            </div>
          </div>
        </div>

        <div class="charts-column">
          <div class="chart-wrapper">
            <div class="chart-title">Equilibrio IS-LM</div>
            <canvas id="canvas-islm"></canvas>
          </div>
          <div class="chart-wrapper">
            <div class="chart-title">Mercato della Moneta</div>
            <canvas id="canvas-money"></canvas>
          </div>
        </div>
      </div>
    </div>
  )
}

ISLM.afterDOMLoaded = script

export default (() => ISLM) satisfies QuartzComponentConstructor
