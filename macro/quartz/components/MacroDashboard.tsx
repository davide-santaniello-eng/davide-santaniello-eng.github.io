import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
// @ts-ignore
import script from "./scripts/macro-dashboard.inline"

const MacroDashboard: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  return (
    <div class={`macro-dashboard ${displayClass ?? ""}`} style={{ width: '100%' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .dash-main { display: flex; flex-direction: column; gap: 1rem; margin: 1.5rem 0; padding: 1.5rem; background: var(--lightgray); border-radius: 12px; border: 1px solid var(--gray); font-family: var(--bodyFont); }
        .dash-grid { display: grid; grid-template-columns: 350px 1fr; gap: 1.5rem; }
        .dash-controls { display: flex; flex-direction: column; gap: 1rem; max-height: 850px; overflow-y: auto; padding-right: 10px; }
        .control-section { background: white; padding: 1rem; border-radius: 8px; border: 1px solid #ddd; }
        .section-title { font-size: 0.8rem; font-weight: bold; text-transform: uppercase; color: var(--secondary); margin-bottom: 0.8rem; border-bottom: 1px solid #eee; padding-bottom: 4px; display: flex; align-items: center; gap: 5px; }
        
        .dash-input-item { margin-bottom: 0.8rem; }
        .dash-input-item label { display: block; font-size: 0.7rem; font-weight: bold; margin-bottom: 2px; color: #444; }
        .dash-input-row { display: flex; align-items: center; gap: 10px; }
        .dash-input-row input[type="range"] { flex: 1; accent-color: var(--secondary); }
        .dash-input-row input[type="number"] { width: 50px; font-size: 0.7rem; border: 1px solid #ccc; border-radius: 3px; padding: 2px; }
        
        .dash-charts { display: flex; flex-direction: column; gap: 1rem; }
        .dash-chart-wrapper { background: #ffffff; padding: 0.8rem; border-radius: 8px; height: 380px; border: 1px solid #ddd; position: relative; }
        .dash-chart-title { font-size: 0.9rem; font-weight: bold; text-align: center; margin-bottom: 0.5rem; color: #333; }
        
        .dash-results { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 1rem; }
        .dash-results-mf { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
        .dash-res-box { background: var(--highlight); padding: 8px; border-radius: 4px; text-align: center; border: 1px solid #ddd; }
        .dash-res-box div { font-size: 0.6rem; color: #666; text-transform: uppercase; }
        .dash-res-box strong { font-size: 0.9rem; color: var(--secondary); }

        .regime-toggle { width: 100%; padding: 8px; border-radius: 6px; border: 1px solid var(--secondary); background: white; font-weight: bold; color: var(--secondary); margin-bottom: 1rem; cursor: pointer; }
        
        @media (max-width: 900px) {
          .dash-grid { grid-template-columns: 1fr; }
          .dash-controls { max-height: none; }
        }
      `}} />

      <div class="dash-main">
        <div class="dash-results">
          <div class="dash-res-box"><div>Produzione (Y)</div><strong id="dash-out-y">-</strong></div>
          <div class="dash-res-box"><div>Tasso Int. (i)</div><strong id="dash-out-i">-</strong></div>
          <div class="dash-res-box"><div>Prezzi (P)</div><strong id="dash-out-p">-</strong></div>
          <div class="dash-res-box"><div>Tasso Nat. (Yn)</div><strong id="dash-out-yn">-</strong></div>
        </div>

        <div class="dash-grid">
          <aside class="dash-controls">
            <div class="control-section">
              <div class="section-title">🌍 Regime ed Estero</div>
              <div class="dash-input-item">
                <label>Regime Economico</label>
                <select id="dash-regime" class="regime-toggle">
                  <option value="closed">Economia Chiusa</option>
                  <option value="fixed">Cambi FISSI (Mundell-Fleming)</option>
                  <option value="flex">Cambi FLESSIBILI (Mundell-Fleming)</option>
                </select>
              </div>
              <div class="dash-input-item" id="dash-istar-container" style="display:none;">
                <label>Tasso Estero i* (%)</label>
                <div class="dash-input-row">
                  <input type="range" id="dash-istar-r" min="0.5" max="10" step="0.5" value="4" />
                  <input type="number" id="dash-istar-v" value="4" />
                </div>
              </div>
              <div class="dash-input-item" id="dash-exch-container" style="display:none;">
                <label>Sensibilità Cambio (v)</label>
                <div class="dash-input-row">
                  <input type="range" id="dash-v-r" min="100" max="5000" step="100" value="1000" />
                  <input type="number" id="dash-v-v" value="1000" />
                </div>
              </div>
            </div>

            <div class="control-section">
              <div class="section-title">📊 Risultati Cambio</div>
              <div class="dash-results-mf">
                 <div class="dash-res-box"><div>Cambio Nominale (E)</div><strong id="dash-out-e">-</strong></div>
                 <div class="dash-res-box"><div>Cambio Reale (ε)</div><strong id="dash-out-er">-</strong></div>
              </div>
            </div>

            <div class="control-section">
              <div class="section-title">🏛️ Politiche (Shocks)</div>
              <div class="dash-input-item">
                <label>Spesa Pubblica (G)</label>
                <div class="dash-input-row">
                  <input type="range" id="dash-g-r" min="0" max="800" value="250" />
                  <input type="number" id="dash-g-v" value="250" />
                </div>
              </div>
              <div class="dash-input-item">
                <label>Offerta Moneta (M)</label>
                <div class="dash-input-row">
                  <input type="range" id="dash-m-r" min="100" max="3000" value="800" />
                  <input type="number" id="dash-m-v" value="800" />
                </div>
              </div>
              <div class="dash-input-item">
                <label>Prezzi (P) - Solo Breve Periodo</label>
                <div class="dash-input-row">
                  <input type="range" id="dash-p-r" min="0.1" max="5" step="0.1" value="1" />
                  <input type="number" id="dash-p-v" value="1" />
                </div>
              </div>
            </div>

            <div class="control-section">
              <div class="section-title">📈 Parametri IS (Domanda)</div>
              <div class="dash-input-item">
                <label>Propensione Consumo (c)</label>
                <div class="dash-input-row">
                  <input type="range" id="dash-c-r" min="0.1" max="0.95" step="0.05" value="0.8" />
                  <input type="number" id="dash-c-v" value="0.8" />
                </div>
              </div>
              <div class="dash-input-item">
                <label>Aliquota Fiscale (t)</label>
                <div class="dash-input-row">
                  <input type="range" id="dash-t-r" min="0" max="0.5" step="0.05" value="0.2" />
                  <input type="number" id="dash-t-v" value="0.2" />
                </div>
              </div>
              <div class="dash-input-item">
                <label>Sensibilità Investimenti (b)</label>
                <div class="dash-input-row">
                  <input type="range" id="dash-b-r" min="500" max="8000" step="100" value="2000" />
                  <input type="number" id="dash-b-v" value="2000" />
                </div>
              </div>
            </div>

            <div class="control-section">
              <div class="section-title">💰 Parametri LM (Moneta)</div>
              <div class="dash-input-item">
                <label>Sensibilità Reddito (k)</label>
                <div class="dash-input-row">
                  <input type="range" id="dash-k-r" min="0.1" max="1.5" step="0.1" value="0.5" />
                  <input type="number" id="dash-k-v" value="0.5" />
                </div>
              </div>
              <div class="dash-input-item">
                <label>Sensibilità Tasso (h)</label>
                <div class="dash-input-row">
                  <input type="range" id="dash-h-r" min="500" max="10000" step="500" value="5000" />
                  <input type="number" id="dash-h-v" value="5000" />
                </div>
              </div>
            </div>

            <div class="control-section">
              <div class="section-title">🏭 Parametri AS (Offerta)</div>
              <div class="dash-input-item">
                <label>Prezzi Attesi (Pe)</label>
                <div class="dash-input-row">
                  <input type="range" id="dash-pe-r" min="0.1" max="5" step="0.1" value="1" />
                  <input type="number" id="dash-pe-v" value="1" />
                </div>
              </div>
              <div class="dash-input-item">
                <label>Markup (μ)</label>
                <div class="dash-input-row">
                  <input type="range" id="dash-mu-r" min="0" max="0.6" step="0.05" value="0.2" />
                  <input type="number" id="dash-mu-v" value="0.2" />
                </div>
              </div>
              <div class="dash-input-item">
                <label>Forza Lavoro (L)</label>
                <div class="dash-input-row">
                  <input type="range" id="dash-l-r" min="1000" max="8000" step="100" value="5000" />
                  <input type="number" id="dash-l-v" value="5000" />
                </div>
              </div>
            </div>
          </aside>

          <main class="dash-charts">
            <div class="dash-chart-wrapper">
              <div class="dash-chart-title">Modello IS-LM-BP (Breve Periodo)</div>
              <canvas id="dash-islm-canvas"></canvas>
            </div>
            <div class="dash-chart-wrapper">
              <div class="dash-chart-title">Modello AD-AS (Medio Periodo)</div>
              <canvas id="dash-adas-canvas"></canvas>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

MacroDashboard.afterDOMLoaded = script

export default (() => MacroDashboard) satisfies QuartzComponentConstructor
