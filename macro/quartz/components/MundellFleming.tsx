import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
// @ts-ignore
import script from "./scripts/mundell-fleming.inline"

const MundellFleming: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  return (
    <div class={`mf-simulator ${displayClass ?? ""}`} style={{ width: '100%' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .mf-section { margin: 2rem 0; padding: 1.5rem; background: var(--lightgray); border-radius: 12px; border: 1px solid var(--gray); font-family: var(--bodyFont); }
        .mf-section-title { font-size: 1.2rem; font-weight: bold; margin-bottom: 1.5rem; color: var(--secondary); border-bottom: 2px solid var(--tertiary); padding-bottom: 8px; }
        .mf-container { display: grid; grid-template-columns: 320px 1fr; gap: 1.5rem; }
        .controls { display: flex; flex-direction: column; gap: 1rem; max-height: 700px; overflow-y: auto; padding-right: 10px; }
        .control-group { background: white; padding: 0.8rem; border-radius: 8px; border: 1px solid #ddd; }
        .group-title { font-size: 0.7rem; font-weight: bold; text-transform: uppercase; color: #666; margin-bottom: 0.5rem; border-bottom: 1px solid #eee; }
        
        .input-item { margin-bottom: 0.6rem; }
        .input-item label { display: block; font-size: 0.7rem; color: #333; margin-bottom: 2px; }
        .input-row { display: flex; align-items: center; gap: 8px; }
        .input-row input[type="range"] { flex: 1; accent-color: var(--secondary); }
        .input-row input[type="number"] { width: 45px; font-size: 0.7rem; border: 1px solid #ccc; }
        
        .charts-column { flex: 1; min-width: 400px; }
        .chart-wrapper { background: #ffffff; padding: 1rem; border-radius: 8px; height: 450px; border: 1px solid var(--gray); }
        
        .results-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 10px; }
        .res-box { background: var(--highlight); padding: 8px; border-radius: 4px; text-align: center; border: 1px solid #ddd; }
        .res-box div { font-size: 0.6rem; color: #666; text-transform: uppercase; }
        .res-box strong { font-size: 0.9rem; color: var(--secondary); }
        
        @media (max-width: 900px) { .mf-container { grid-template-columns: 1fr; } .controls { max-height: none; } }
      `}} />

      {/* 1. CAMBI FLESSIBILI */}
      <div class="mf-section">
        <div class="mf-section-title">📊 1. Cambi Flessibili (M esogena, E endogeno)</div>
        <div class="mf-container">
          <div class="controls">
            <div class="control-group">
              <div class="group-title">Shocks e Target</div>
              <div class="input-item">
                <label>Spesa Pubblica (G)</label>
                <div class="input-row"><input type="range" id="mff-g-r" min="0" max="800" value="250" /><input type="number" id="mff-g-v" value="250" /></div>
              </div>
              <div class="input-item">
                <label>Offerta Moneta (M)</label>
                <div class="input-row"><input type="range" id="mff-m-r" min="100" max="3000" value="800" /><input type="number" id="mff-m-v" value="800" /></div>
              </div>
              <div class="input-item">
                <label>Tasso Estero i* (%)</label>
                <div class="input-row"><input type="range" id="mff-i-r" min="0.5" max="10" step="0.5" value="4" /><input type="number" id="mff-i-v" value="4" /></div>
              </div>
            </div>

            <div class="control-group">
              <div class="group-title">Parametri Strutturali</div>
              <div class="input-item"><label>Sensibilità Cambio (v)</label><div class="input-row"><input type="range" id="mff-v-r" min="100" max="5000" step="100" value="1000" /><input type="number" id="mff-v-v" value="1000" /></div></div>
              <div class="input-item"><label>Propensione Consumo (c)</label><div class="input-row"><input type="range" id="mff-c-r" min="0.1" max="0.9" step="0.05" value="0.8" /><input type="number" id="mff-c-v" value="0.8" /></div></div>
              <div class="input-item"><label>Sensibilità Invest. (b)</label><div class="input-row"><input type="range" id="mff-b-r" min="500" max="8000" step="100" value="2000" /><input type="number" id="mff-b-v" value="2000" /></div></div>
            </div>

            <div class="results-grid">
              <div class="res-box"><div>Reddito Y*</div><strong id="mff-out-y">-</strong></div>
              <div class="res-box"><div>Cambio E</div><strong id="mff-out-e" style="color:#e53e3e">-</strong></div>
            </div>
          </div>
          <div class="charts-column">
            <div class="chart-wrapper"><canvas id="mff-canvas"></canvas></div>
          </div>
        </div>
      </div>

      {/* 2. CAMBI FISSI */}
      <div class="mf-section">
        <div class="mf-section-title">⚓ 2. Cambi Fissi (E esogeno, M endogena)</div>
        <div class="mf-container">
          <div class="controls">
            <div class="control-group">
              <div class="group-title">Shocks e Target</div>
              <div class="input-item">
                <label>Spesa Pubblica (G)</label>
                <div class="input-row"><input type="range" id="mfx-g-r" min="0" max="800" value="250" /><input type="number" id="mfx-g-v" value="250" /></div>
              </div>
              <div class="input-item">
                <label>Cambio Target (E)</label>
                <div class="input-row"><input type="range" id="mfx-e-r" min="0.1" max="5" step="0.1" value="1" /><input type="number" id="mfx-e-v" value="1" /></div>
              </div>
              <div class="input-item">
                <label>Tasso Estero i* (%)</label>
                <div class="input-row"><input type="range" id="mfx-i-r" min="0.5" max="10" step="0.5" value="4" /><input type="number" id="mfx-i-v" value="4" /></div>
              </div>
            </div>

            <div class="control-group">
              <div class="group-title">Parametri Strutturali</div>
              <div class="input-item"><label>Sensibilità Cambio (v)</label><div class="input-row"><input type="range" id="mfx-v-r" min="100" max="5000" step="100" value="1000" /><input type="number" id="mfx-v-v" value="1000" /></div></div>
              <div class="input-item"><label>Propensione Consumo (c)</label><div class="input-row"><input type="range" id="mfx-c-r" min="0.1" max="0.9" step="0.05" value="0.8" /><input type="number" id="mfx-c-v" value="0.8" /></div></div>
              <div class="input-item"><label>Sensibilità Moneta (h)</label><div class="input-row"><input type="range" id="mfx-h-r" min="500" max="10000" step="500" value="5000" /><input type="number" id="mfx-h-v" value="5000" /></div></div>
            </div>

            <div class="results-grid">
              <div class="res-box"><div>Reddito Y*</div><strong id="mfx-out-y">-</strong></div>
              <div class="res-box"><div>Moneta Finale M</div><strong id="mfx-out-m" style="color:#38a169">-</strong></div>
            </div>
          </div>
          <div class="charts-column">
            <div class="chart-wrapper"><canvas id="mfx-canvas"></canvas></div>
          </div>
        </div>
      </div>
    </div>
  )
}

MundellFleming.afterDOMLoaded = script

export default (() => MundellFleming) satisfies QuartzComponentConstructor
