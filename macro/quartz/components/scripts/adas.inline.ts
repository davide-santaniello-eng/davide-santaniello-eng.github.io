// @ts-ignore
import Chart from "chart.js/auto"

async function init() {
  const c1 = document.getElementById('canv-adas') as HTMLCanvasElement
  const c2 = document.getElementById('canv-labor') as HTMLCanvasElement
  const c3 = document.getElementById('canv-phillips') as HTMLCanvasElement
  if (!c1 || !c2 || !c3) return

  let chADAS: any = null
  let chLabor: any = null
  let chPhillips: any = null

  function bind(id: string, cb: () => void) {
    const r = document.getElementById('adas-' + id + '-r') as HTMLInputElement
    const v = document.getElementById('adas-' + id + '-v') as HTMLInputElement
    if (r && v) {
      r.oninput = () => { v.value = r.value; cb(); }
      v.oninput = () => { r.value = v.value; cb(); }
    } else if (r) {
      r.oninput = cb
    }
  }

  function update() {
    const getValR = (id: string) => {
      const el = document.getElementById('adas-' + id + '-r') as HTMLInputElement
      return el ? parseFloat(el.value) || 0 : 0
    }
    const getValV = (id: string) => {
      const el = document.getElementById('adas-' + id + '-v') as HTMLInputElement
      return el ? parseFloat(el.value) || 0 : 0
    }
    
    const M = getValR('m')
    const mu = getValV('mu')
    const z = getValV('z')
    const Pe = getValV('pe')
    const L = getValR('l')

    const realWagePS = 1 / (1 + mu)
    const un = Math.max(0.02, 1 - (1 / (z * (1 + mu))))
    const Yn = L * (1 - un)

    const adFactor = M * 2.5
    const yStar = Math.sqrt((adFactor * L) / (Pe * (1 + mu) * z))
    const pStar = adFactor / yStar
    const uStar = 1 - (yStar / L)

    const resY = document.getElementById('res-y')
    const resP = document.getElementById('res-p')
    const resU = document.getElementById('res-u')
    const resUN = document.getElementById('res-un')

    if (resY) resY.innerText = Math.round(yStar).toString()
    if (resP) resP.innerText = pStar.toFixed(2)
    if (resU) resU.innerText = (uStar * 100).toFixed(1) + "%"
    if (resUN) resUN.innerText = (un * 100).toFixed(1) + "%"

    const adD = [], asD = [], lrasD = []
    for (let x = 500; x <= 6000; x += 250) {
      adD.push({ x: x, y: adFactor / x })
      asD.push({ x: x, y: Pe * (1 + mu) * z * (x / L) })
    }
    lrasD.push({ x: Yn, y: 0 }, { x: Yn, y: 4 })

    const wsD = [], psD = [], pcD = []
    for (let u = 0; u <= 0.25; u += 0.01) {
      wsD.push({ x: u, y: z * (1 - u) })
      psD.push({ x: u, y: realWagePS })
      pcD.push({ x: u, y: (mu + z - 5 * u) })
    }

    const commonOptions = {
      responsive: true,
      maintainAspectRatio: false,
      layout: { padding: { bottom: 25, left: 10, right: 10, top: 10 } },
      plugins: { legend: { labels: { boxWidth: 12, font: { size: 10 } } } }
    }

    if (chADAS) {
      chADAS.data.datasets[0].data = adD
      chADAS.data.datasets[1].data = asD
      chADAS.data.datasets[2].data = lrasD
      chADAS.update('none')
    } else {
      chADAS = new Chart(c1, {
        type: 'line',
        data: {
          datasets: [
            { label: 'AD', data: adD, borderColor: '#2b6cb0', borderWidth: 2, pointRadius: 0 },
            { label: 'AS', data: asD, borderColor: '#e53e3e', borderWidth: 2, pointRadius: 0 },
            { label: 'LRAS', data: lrasD, borderColor: '#333', borderDash: [5, 5], pointRadius: 0 }
          ]
        },
        options: {
          ...commonOptions,
          scales: {
            x: { type: 'linear', min: 0, max: 6000, title: { display: true, text: 'Produzione Y' } },
            y: { min: 0, max: 4, title: { display: true, text: 'Prezzi P' } }
          }
        }
      })
    }

    if (chLabor) {
      chLabor.data.datasets[0].data = wsD
      chLabor.data.datasets[1].data = psD
      chLabor.update('none')
    } else {
      chLabor = new Chart(c2, {
        type: 'line',
        data: {
          datasets: [
            { label: 'WS', data: wsD, borderColor: '#805ad5', borderWidth: 2, pointRadius: 0 },
            { label: 'PS', data: psD, borderColor: '#38a169', borderWidth: 2, pointRadius: 0 }
          ]
        },
        options: {
          ...commonOptions,
          scales: {
            x: { type: 'linear', min: 0, max: 0.25, title: { display: true, text: 'u' } },
            y: { min: 0, max: 1, title: { display: true, text: 'W/P' } }
          }
        }
      })
    }

    if (chPhillips) {
      chPhillips.data.datasets[0].data = pcD
      chPhillips.update('none')
    } else {
      chPhillips = new Chart(c3, {
        type: 'line',
        data: {
          datasets: [
            { label: 'Curva Phillips', data: pcD, borderColor: '#d69e2e', borderWidth: 2, pointRadius: 0 },
            { label: 'Equilibrio (u_n)', data: [{ x: un, y: -1 }, { x: un, y: 1 }], borderColor: '#ccc', borderDash: [2, 2], pointRadius: 0 }
          ]
        },
        options: {
          ...commonOptions,
          scales: {
            x: { type: 'linear', min: 0, max: 0.25, title: { display: true, text: 'u' } },
            y: { min: -0.5, max: 1, title: { display: true, text: 'Inflazione' } }
          }
        }
      })
    }
  }

  const adjustBtn = document.getElementById('adas-btn-adjust')
  if (adjustBtn) {
    adjustBtn.onclick = () => {
      const resP = document.getElementById('res-p')
      if (resP) {
        const pActual = parseFloat(resP.innerText)
        const pe_in = document.getElementById('adas-pe-r') as HTMLInputElement
        const pe_v = document.getElementById('adas-pe-v') as HTMLInputElement
        if (pe_in && pe_v) {
          pe_in.value = pActual.toString()
          pe_v.value = pActual.toFixed(2)
          update()
        }
      }
    }
  }

  ;['m', 'mu', 'z', 'pe', 'l'].forEach(id => bind(id, update));
  update();
}

document.addEventListener("nav", init)
init()

