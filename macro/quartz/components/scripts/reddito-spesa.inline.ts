// @ts-ignore
import Chart from "chart.js/auto"

async function init() {
  const canvas = document.getElementById('redditoSpesaChart') as HTMLCanvasElement
  if (!canvas) return

  let chart: any = null

  function syncInputs(id: string) {
    const r = document.getElementById(id + '-range') as HTMLInputElement
    const n = document.getElementById(id) as HTMLInputElement
    if (r && n) {
      r.oninput = () => { n.value = r.value; calc(); }
      n.oninput = () => { r.value = n.value; calc(); }
    }
  }

  function calc() {
    const getVal = (id: string) => {
      const el = document.getElementById(id) as HTMLInputElement
      return el ? parseFloat(el.value) || 0 : 0
    }
    const c0 = getVal('c0'), c = getVal('c')
    const i0 = getVal('i0'), g0 = getVal('g0')
    const t0 = getVal('t0'), t = getVal('t')

    const A = c0 - c * t0 + i0 + g0, slope = c * (1 - t), m = 1 / (1 - slope), yStar = m * A
    
    const yStarEl = document.getElementById('y-star')
    const multEl = document.getElementById('multiplier')
    if (yStarEl) yStarEl.innerText = Math.round(yStar).toString()
    if (multEl) multEl.innerText = m.toFixed(2)

    const xMax = Math.max(yStar * 1.5, 500), adD = [], bisD = []
    for (let i = 0; i <= 10; i++) {
      const x = (xMax / 10) * i
      adD.push({ x: x, y: A + slope * x })
      bisD.push({ x: x, y: x })
    }

    if (chart) {
      chart.data.datasets[0].data = adD
      chart.data.datasets[1].data = bisD
      chart.update('none')
    } else {
      chart = new Chart(canvas, {
        type: 'line',
        data: {
          datasets: [
            { label: 'Domanda AD', data: adD, borderColor: '#4bc0c0', pointRadius: 0, tension: 0 },
            { label: 'Y = AD', data: bisD, borderColor: '#ff6384', borderDash: [5, 5], pointRadius: 0, tension: 0 }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          layout: { padding: { bottom: 30, left: 10, right: 10, top: 10 } },
          scales: {
            x: { type: 'linear', position: 'bottom', title: { display: true, text: 'Reddito Y' } },
            y: { title: { display: true, text: 'Domanda AD' } }
          }
        }
      })
    }
  }

  ;['c0', 'c', 'i0', 'g0', 't0', 't'].forEach(syncInputs);
  calc();
}

document.addEventListener("nav", init)
init()

