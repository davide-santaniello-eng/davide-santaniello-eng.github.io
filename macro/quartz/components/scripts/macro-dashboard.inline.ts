// @ts-ignore
import Chart from "chart.js/auto"

async function init() {
  const islmCanvas = document.getElementById('dash-islm-canvas') as HTMLCanvasElement
  const adasCanvas = document.getElementById('dash-adas-canvas') as HTMLCanvasElement
  if (!islmCanvas || !adasCanvas) return

  let islmChart: any = null
  let adasChart: any = null

  const colors = {
    is: '#2b6cb0',
    lm: '#e53e3e',
    bp: '#38a169',
    ad: '#2b6cb0',
    as: '#e53e3e',
    lras: '#4a5568',
    point: '#2d3748'
  }

  function bind(id: string, cb: () => void) {
    const r = document.getElementById('dash-' + id + '-r') as HTMLInputElement
    const v = document.getElementById('dash-' + id + '-v') as HTMLInputElement
    if (r && v) {
      r.oninput = () => { v.value = r.value; cb(); }
      v.oninput = () => { r.value = v.value; cb(); }
    }
  }

  const regimeSelect = document.getElementById('dash-regime') as HTMLSelectElement
  const istarContainer = document.getElementById('dash-istar-container')
  const exchContainer = document.getElementById('dash-exch-container')
  
  if (regimeSelect) {
    regimeSelect.onchange = () => {
      const isClosed = regimeSelect.value === 'closed'
      if (istarContainer) istarContainer.style.display = isClosed ? 'none' : 'block'
      if (exchContainer) exchContainer.style.display = isClosed ? 'none' : 'block'
      update()
    }
  }

  function update() {
    const getVal = (id: string) => {
      const el = document.getElementById('dash-' + id + '-v') as HTMLInputElement
      return el ? parseFloat(el.value) || 0 : 0
    }
    const regime = regimeSelect ? regimeSelect.value : 'closed'
    
    // Parametri Base (Shocks)
    let G = getVal('g')
    let M = getVal('m')
    let P = getVal('p')
    const istar = getVal('istar') / 100
    const vSens = getVal('v') // Sensibilità NX al cambio

    // Parametri Strutturali IS-LM
    const c0 = 200, i0 = 150
    const c = getVal('c')
    const t = getVal('t')
    const b = getVal('b')
    const k = getVal('k')
    const h = getVal('h')

    // Parametri AS (Mercato del Lavoro)
    const Pe = getVal('pe')
    const mu = getVal('mu')
    const L = getVal('l')
    const z = 0.5 

    const alpha = 1 - c * (1 - t)
    let A = c0 + i0 + G
    
    // Variabili Mundell-Fleming
    let E = 1.0 // Cambio Nominale
    let epsilon = 1.0 // Cambio Reale
    const Pstar = 1.0 // Prezzi esteri costanti

    // Calcolo equilibrio iniziale IS-LM Chiusa
    let ms = M / P
    let yStar = (A + (b * ms) / h) / (alpha + (b * k) / h)
    let iStar = (k * yStar - ms) / h

    // AGGIUSTAMENTI MUNDELL-FLEMING
    if (regime === 'fixed') {
      // Cambio fisso a E=1. i deve essere istar. M si aggiusta.
      iStar = istar
      E = 1.0
      // IS in economia aperta: Y = (A - b*i + v*E) / alpha
      yStar = (A - b * istar + vSens * E) / alpha
      ms = k * yStar - h * istar 
      M = ms * P 
    } else if (regime === 'flex') {
      // Cambio flessibile. i deve essere istar. M è data. Y determinata dalla LM.
      iStar = istar
      yStar = (ms + h * istar) / k
      // Ricaviamo E dalla IS: E = (alpha*Y - A + b*i) / v
      E = (alpha * yStar - A + b * istar) / vSens
      if (E < 0.1) E = 0.1 // Floor tecnico
    }
    
    epsilon = (E * P) / Pstar

    // Calcolo Reddito Naturale Yn
    const un = Math.max(0.02, 1 - (1 / (z * (1 + mu))))
    const Yn = L * (1 - un)

    // Update UI
    const outY = document.getElementById('dash-out-y')
    const outI = document.getElementById('dash-out-i')
    const outP = document.getElementById('dash-out-p')
    const outYN = document.getElementById('dash-out-yn')
    const outE = document.getElementById('dash-out-e')
    const outER = document.getElementById('dash-out-er')
    
    if (outY) outY.innerText = Math.round(yStar).toString()
    if (outI) outI.innerText = (iStar * 100).toFixed(2) + "%"
    if (outP) outP.innerText = P.toFixed(2)
    if (outYN) outYN.innerText = Math.round(Yn).toString()
    
    if (regime !== 'closed') {
      if (outE) outE.innerText = E.toFixed(3)
      if (outER) outER.innerText = epsilon.toFixed(3)
    } else {
      if (outE) outE.innerText = "N/A"
      if (outER) outER.innerText = "N/A"
    }

    // Grafico 1: IS-LM-BP
    const isData = [], lmData = [], bpData = []
    const xRange = 8000
    for (let x = 0; x <= xRange; x += 500) {
      // IS include l'effetto del cambio se in economia aperta
      const currentA = (regime === 'closed') ? A : (A + vSens * E)
      isData.push({ x: x, y: (currentA - alpha * x) / b })
      lmData.push({ x: x, y: (k * x - ms) / h })
      bpData.push({ x: x, y: istar })
    }

    // Grafico 2: AD-AS-LRAS
    const adData = [], asData = [], lrasData = []
    // Pendenza AD corretta per moltiplicatore economia aperta
    let adFactor = M * (1/k) * 2
    if (regime === 'fixed') adFactor *= 1.8
    if (regime === 'flex') adFactor *= 2.5
    
    for (let x = 500; x <= xRange; x += 250) {
      adData.push({ x: x, y: adFactor / (x/1000) / 1000 })
      asData.push({ x: x, y: Pe * (1 + mu) * z * (x / L) })
    }
    lrasData.push({ x: Yn, y: 0 }, { x: Yn, y: 5 })

    const commonOptions = {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 0 },
      plugins: { legend: { labels: { boxWidth: 10, font: { size: 9 } } } }
    }

    if (islmChart) {
      islmChart.data.datasets[0].data = isData
      islmChart.data.datasets[1].data = lmData
      islmChart.data.datasets[2].data = (regime !== 'closed' ? bpData : [])
      islmChart.data.datasets[3].data = [{ x: yStar, y: iStar }]
      islmChart.update('none')
    } else {
      islmChart = new Chart(islmCanvas, {
        type: 'line',
        data: {
          datasets: [
            { label: 'IS', data: isData, borderColor: colors.is, borderWidth: 2, pointRadius: 0 },
            { label: 'LM', data: lmData, borderColor: colors.lm, borderWidth: 2, pointRadius: 0 },
            { label: 'BP (i*)', data: bpData, borderColor: colors.bp, borderDash: [5, 5], borderWidth: 1, pointRadius: 0 },
            { label: 'Equilibrio', data: [{ x: yStar, y: iStar }], backgroundColor: colors.point, pointRadius: 5, type: 'scatter' }
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

    if (adasChart) {
      adasChart.data.datasets[0].data = adData
      adasChart.data.datasets[1].data = asData
      adasChart.data.datasets[2].data = lrasData
      adasChart.data.datasets[3].data = [{ x: yStar, y: P }]
      adasChart.update('none')
    } else {
      adasChart = new Chart(adasCanvas, {
        type: 'line',
        data: {
          datasets: [
            { label: 'AD', data: adData, borderColor: colors.ad, borderWidth: 2, pointRadius: 0 },
            { label: 'AS', data: asData, borderColor: colors.as, borderWidth: 2, pointRadius: 0 },
            { label: 'LRAS (Yn)', data: lrasData, borderColor: colors.lras, borderDash: [5, 5], borderWidth: 1, pointRadius: 0 },
            { label: 'Equilibrio', data: [{ x: yStar, y: P }], backgroundColor: colors.point, pointRadius: 5, type: 'scatter' }
          ]
        },
        options: {
          ...commonOptions,
          scales: {
            x: { type: 'linear', min: 0, max: xRange, title: { display: true, text: 'Produzione Y' } },
            y: { min: 0, max: 5, title: { display: true, text: 'Prezzi P' } }
          }
        }
      })
    }
  }

  ;['g', 'm', 'p', 'istar', 'v', 'c', 't', 'b', 'k', 'h', 'pe', 'mu', 'l'].forEach(id => bind(id, update));
  update();
}

document.addEventListener("nav", init)
init()
