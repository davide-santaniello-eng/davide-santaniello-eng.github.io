// @ts-ignore
import Chart from "chart.js/auto"

async function init() {
  const canvF = document.getElementById('mff-canvas') as HTMLCanvasElement
  const canvX = document.getElementById('mfx-canvas') as HTMLCanvasElement
  
  let chartF: any = null
  let chartX: any = null

  const colors = { is: '#2b6cb0', lm: '#e53e3e', bp: '#38a169', text: '#333' }
  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    layout: { padding: { bottom: 30, left: 10, right: 10, top: 10 } },
    plugins: { legend: { labels: { boxWidth: 12, font: { size: 11 } } } }
  }

  function bind(id: string, cb: () => void) {
    const r = document.getElementById(id + '-r') as HTMLInputElement
    const v = document.getElementById(id + '-v') as HTMLInputElement
    if (r && v) {
      r.oninput = () => { v.value = r.value; cb(); }
      v.oninput = () => { r.value = v.value; cb(); }
    }
  }

  function drawF() {
    if (!canvF) return
    const getVal = (id: string) => {
      const el = document.getElementById(id) as HTMLInputElement
      return el ? parseFloat(el.value) || 0 : 0
    }
    
    // Parametri
    const G = getVal('mff-g-v')
    const M = getVal('mff-m-v')
    const istar = getVal('mff-i-v') / 100
    const vSens = getVal('mff-v-v')
    const c = getVal('mff-c-v')
    const b = getVal('mff-b-v')
    
    // Costanti
    const t = 0.2, k = 0.5, h = 5000, P = 1.0, c0 = 200, i0 = 150
    const alpha = 1 - c * (1 - t)
    const A_base = c0 + i0 + G
    
    // Equilibrio LM con i = istar
    const ms = M / P
    const yStar = (ms + h * istar) / k
    
    // Calcolo cambio E dalla IS: E = (alpha*Y - A_base + b*istar) / vSens
    const E = (alpha * yStar - A_base + b * istar) / vSens
    
    const outY = document.getElementById('mff-out-y')
    const outE = document.getElementById('mff-out-e')
    if (outY) outY.innerText = Math.round(yStar).toString()
    if (outE) outE.innerText = E.toFixed(3)

    const isData = [], lmData = [], bpData = []
    const xRange = 8000
    for (let x = 0; x <= xRange; x += 500) {
      isData.push({ x: x, y: (A_base + vSens * E - alpha * x) / b })
      lmData.push({ x: x, y: (k * x - ms) / h })
      bpData.push({ x: x, y: istar })
    }

    if (chartF) {
      chartF.data.datasets[0].data = isData
      chartF.data.datasets[1].data = lmData
      chartF.data.datasets[2].data = bpData
      chartF.update('none')
    } else {
      chartF = new Chart(canvF, {
        type: 'line',
        data: {
          datasets: [
            { label: 'IS (Aperta)', data: isData, borderColor: colors.is, borderWidth: 3, pointRadius: 0 },
            { label: 'LM', data: lmData, borderColor: colors.lm, borderWidth: 3, pointRadius: 0 },
            { label: 'BP (i*)', data: bpData, borderColor: colors.bp, borderWidth: 2, pointRadius: 0 }
          ]
        },
        options: {
          ...commonOptions,
          scales: {
            x: { type: 'linear', min: 0, max: xRange, title: { display: true, text: 'Reddito Y' } },
            y: { min: 0, max: 0.20, title: { display: true, text: 'Tasso i' } }
          }
        }
      })
    }
  }

  function drawX() {
    if (!canvX) return
    const getVal = (id: string) => {
      const el = document.getElementById(id) as HTMLInputElement
      return el ? parseFloat(el.value) || 0 : 0
    }
    
    // Parametri
    const G = getVal('mfx-g-v')
    const E_target = getVal('mfx-e-v')
    const istar = getVal('mfx-i-v') / 100
    const vSens = getVal('mfx-v-v')
    const c = getVal('mfx-c-v')
    const h = getVal('mfx-h-v')
    
    // Costanti
    const t = 0.2, b = 2000, k = 0.5, P = 1.0, c0 = 200, i0 = 150
    const alpha = 1 - c * (1 - t)
    const A_total = c0 + i0 + G + vSens * E_target
    
    // Equilibrio IS con i = istar
    const yStar = (A_total - b * istar) / alpha
    
    // Calcolo moneta necessaria ms dalla LM: ms = k*Y - h*istar
    const ms = k * yStar - h * istar
    const M_final = ms * P
    
    const outY = document.getElementById('mfx-out-y')
    const outM = document.getElementById('mfx-out-m')
    if (outY) outY.innerText = Math.round(yStar).toString()
    if (outM) outM.innerText = Math.round(M_final).toString()

    const isData = [], lmData = [], bpData = []
    const xRange = 8000
    for (let x = 0; x <= xRange; x += 500) {
      isData.push({ x: x, y: (A_total - alpha * x) / b })
      lmData.push({ x: x, y: (k * x - ms) / h })
      bpData.push({ x: x, y: istar })
    }

    if (chartX) {
      chartX.data.datasets[0].data = isData
      chartX.data.datasets[1].data = lmData
      chartX.data.datasets[2].data = bpData
      chartX.update('none')
    } else {
      chartX = new Chart(canvX, {
        type: 'line',
        data: {
          datasets: [
            { label: 'IS', data: isData, borderColor: colors.is, borderWidth: 3, pointRadius: 0 },
            { label: 'LM (Endogena)', data: lmData, borderColor: colors.lm, borderWidth: 3, pointRadius: 0 },
            { label: 'BP (i*)', data: bpData, borderColor: colors.bp, borderWidth: 2, pointRadius: 0 }
          ]
        },
        options: {
          ...commonOptions,
          scales: {
            x: { type: 'linear', min: 0, max: xRange, title: { display: true, text: 'Reddito Y' } },
            y: { min: 0, max: 0.20, title: { display: true, text: 'Tasso i' } }
          }
        }
      })
    }
  }

  // Bindings Flessibili
  ;['mff-g', 'mff-m', 'mff-i', 'mff-v', 'mff-c', 'mff-b'].forEach(id => bind(id, drawF));
  // Bindings Fissi
  ;['mfx-g', 'mfx-e', 'mfx-i', 'mfx-v', 'mfx-c', 'mfx-h'].forEach(id => bind(id, drawX));
  
  drawF();
  drawX();
}

document.addEventListener("nav", init)
init()
