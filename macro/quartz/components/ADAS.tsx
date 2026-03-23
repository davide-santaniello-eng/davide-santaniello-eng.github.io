import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
// @ts-ignore
import script from "./scripts/adas.inline"

const ADAS: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  return (
    <div class={`adas-simulator ${displayClass ?? ""}`} style={{ width: '100%' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .adas-container { display: flex; gap: 1.5rem; flex-wrap: wrap; margin: 1.5rem 0; padding: 1rem; background: var(--lightgray); border-radius: 12px; border: 1px solid var(--gray); }
        .controls { flex: 1; min-width: 280px; max-height: 900px; overflow-y: auto; padding-right: 10px; }
        .charts-column { flex: 2; display: flex; flex-direction: column; gap: 1rem; min-width: 400px; }
        .chart-wrapper { background: #ffffff; padding: 1rem; border-radius: 8px; height: 350px; border: 1px solid var(--gray); position: relative; margin-bottom: 0.5rem; }
        .chart-title { font-size: 0.85rem; font-weight: bold; text-align: center; margin-bottom: 0.3rem; color: #333; }
        .input-group-title { font-weight: bold; margin: 0.8rem 0 0.4rem 0; color: var(--secondary); border-bottom: 1px solid var(--gray); font-size: 0.8rem; text-transform: uppercase; }
        .input-item { margin-bottom: 0.5rem; }
        .input-item label { display: block; font-size: 0.7rem; margin-bottom: 1px; color: #333; }
        .input-row { display: flex; align-items: center; gap: 8px; }
        .input-row input[type="range"] { flex: 1; }
        .input-row input[type="number"] { width: 50px; font-size: 0.65rem; border: 1px solid #ccc; border-radius: 3px; }
        .results-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-top: 0.8rem; }
        .res-box { background: var(--highlight); padding: 6px; border-radius: 4px; text-align: center; border: 1px solid #ddd; }
        .res-box div { font-size: 0.6rem; color: #666; }
        .res-box strong { font-size: 0.85rem; color: var(--secondary); }
        .action-btn { width: 100%; margin-top: 10px; padding: 8px; background: var(--secondary); color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 0.75rem; font-weight: bold; }
      `}} />

      <div class="adas-container">
        <div class="controls">
          <div class="input-group-title">Lato Domanda (AD)</div>
          <div class="input-item">
            <label>M (Moneta) / G (Spesa)</label>
            <input type="range" id="adas-m-r" min="500" max="3000" value="1500" />
            <input type="number" id="adas-m-v" value="1500" style={{display:'none'}}/>
          </div>

          <div class="input-group-title">Mercato del Lavoro</div>
          <div class="input-item">
            <label>μ (Mark-up imprese)</label>
            <div class="input-row">
              <input type="range" id="adas-mu-r" min="0.05" max="0.8" step="0.05" value="0.2" />
              <input type="number" id="adas-mu-v" value="0.2" />
            </div>
          </div>
          <div class="input-item">
            <label>z (Protezioni/Sussidi)</label>
            <div class="input-row">
              <input type="range" id="adas-z-r" min="0.1" max="1" step="0.05" value="0.5" />
              <input type="number" id="adas-z-v" value="0.5" />
            </div>
          </div>

          <div class="input-group-title">Aspettative & Struttura</div>
          <div class="input-item">
            <label>Pe (Prezzi Attesi)</label>
            <div class="input-row">
              <input type="range" id="adas-pe-r" min="0.5" max="3" step="0.1" value="1" />
              <input type="number" id="adas-pe-v" value="1" />
            </div>
          </div>
          <div class="input-item">
            <label>L (Forza Lavoro)</label>
            <input type="range" id="adas-l-r" min="3000" max="6000" step="100" value="5000" />
            <input type="number" id="adas-l-v" value="5000" style={{display:'none'}}/>
          </div>

          <div class="results-grid">
            <div class="res-box"><div>Reddito Y*</div><strong id="res-y">-</strong></div>
            <div class="res-box"><div>Prezzi P</div><strong id="res-p">-</strong></div>
            <div class="res-box"><div>Disocc. u</div><strong id="res-u">-</strong></div>
            <div class="res-box"><div>u Naturale</div><strong id="res-un">-</strong></div>
          </div>

          <button id="adas-btn-adjust" class="action-btn">🔄 Aggiustamento Lungo Periodo</button>
        </div>

        <div class="charts-column">
          <div class="chart-wrapper">
            <div class="chart-title">1. Equilibrio AD-AS</div>
            <canvas id="canv-adas"></canvas>
          </div>
          <div class="chart-wrapper">
            <div class="chart-title">2. Mercato del Lavoro (WS-PS)</div>
            <canvas id="canv-labor"></canvas>
          </div>
          <div class="chart-wrapper">
            <div class="chart-title">3. Curva di Phillips</div>
            <canvas id="canv-phillips"></canvas>
          </div>
        </div>
      </div>
    </div>
  )
}

ADAS.afterDOMLoaded = script

export default (() => ADAS) satisfies QuartzComponentConstructor

