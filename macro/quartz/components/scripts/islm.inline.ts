// @ts-ignore
import Chart from "chart.js/auto"

async function init() {
  const islmCanvas = document.getElementById("canvas-islm") as HTMLCanvasElement
  const moneyCanvas = document.getElementById("canvas-money") as HTMLCanvasElement
  
  if (!islmCanvas || !moneyCanvas) return

  let islmChart: any = null
  let moneyChart: any = null

  function getColors() {
    const s = getComputedStyle(document.documentElement)
    return {
      is: s.getPropertyValue("--secondary").trim() || "#2b6cb0",
      lm: s.getPropertyValue("--tertiary").trim() || "#e53e3e",
      grid: s.getPropertyValue("--lightgray").trim() || "#eee"
    }
  }

  function setup(id: string) {
    const r = document.getElementById(id + "-r") as HTMLInputElement
    const v = document.getElementById(id + "-v") as HTMLInputElement
    if (r && v) {
      r.oninput = () => { v.value = r.value; update(); }
      v.oninput = () => { r.value = v.value; update(); }
    }
  }

  function update() {
    const getVal = (id: string) => {
      const el = document.getElementById(id) as HTMLInputElement
      return el ? parseFloat(el.value) || 0 : 0
    }
    const c0 = getVal("is-c0-v"), c = getVal("is-c-v"), i0 = getVal("is-i0-v"), g = getVal("is-g-v"), b = 2000;
    const H = getVal("lm-h-base-v"), cr = getVal("lm-cr-v"), rr = getVal("lm-rr-v"), P = getVal("lm-p-v"), k = getVal("lm-k-v"), h = getVal("lm-h-sens-v"), t = 0.2;
    
    const m_val = (1 + cr) / (cr + rr);
    const ms = (m_val * H) / P;
    const A = c0 + i0 + g, alpha = 1 - c * (1 - t);
    const yStar = (A + (b * ms) / h) / (alpha + (b * k) / h), iStar = (k * yStar - ms) / h;

    const outY = document.getElementById("out-y")
    const outI = document.getElementById("out-i")
    const outMV = document.getElementById("out-m-val")
    const outMS = document.getElementById("out-ms-real")
    
    if (outY) outY.innerText = Math.round(yStar).toString();
    if (outI) outI.innerText = (iStar * 100).toFixed(2) + "%";
    if (outMV) outMV.innerText = m_val.toFixed(2);
    if (outMS) outMS.innerText = Math.round(ms).toString();

    const colors = getColors();
    const commonOpt = { 
      responsive: true, maintainAspectRatio: false, 
      layout: { padding: { bottom: 25, left: 10, right: 10, top: 10 } },
      plugins: { legend: { labels: { boxWidth: 12, font: { size: 11 } } } } 
    };

    // ISLM
    const isData=[], lmData=[];
    for(let x=0; x<=6000; x+=500){
      isData.push({x:x, y:(A-alpha*x)/b});
      lmData.push({x:x, y:(k*x-ms)/h});
    }
    if(islmChart){
      islmChart.data.datasets[0].data=isData; islmChart.data.datasets[1].data=lmData; islmChart.update('none');
    } else {
      islmChart = new Chart(islmCanvas, { type:'line', data:{ datasets:[
        {label:'IS', data:isData, borderColor:colors.is, borderWidth:3, pointRadius:0},
        {label:'LM', data:lmData, borderColor:colors.lm, borderWidth:3, pointRadius:0}
      ]}, options:{ ...commonOpt, scales:{ x:{type:'linear', min:0, max:6000, title:{display:true, text:'Reddito Y'}}, y:{min:0, max:0.15} } } });
    }

    // Money
    const mdData=[], msData=[{x:ms, y:0}, {x:ms, y:0.15}];
    for(let m=0; m<=6000; m+=500) mdData.push({x:m, y:(k*yStar-m)/h});
    if(moneyChart){
      moneyChart.data.datasets[0].data=mdData; moneyChart.data.datasets[1].data=msData; moneyChart.update('none');
    } else {
      moneyChart = new Chart(moneyCanvas, { type:'line', data:{ datasets:[
        {label:'L (Domanda)', data:mdData, borderColor:colors.lm, borderWidth:3, pointRadius:0},
        {label:'M/P (Offerta)', data:msData, borderColor:colors.is, borderWidth:4, pointRadius:0}
      ]}, options:{ ...commonOpt, scales:{ x:{type:'linear', min:0, max:6000, title:{display:true, text:'Moneta M/P'}}, y:{min:0, max:0.15} } } });
    }
  }

  ["is-c0", "is-c", "is-i0", "is-g", "lm-h-base", "lm-cr", "lm-rr", "lm-p", "lm-k", "lm-h-sens"].forEach(setup);
  update();
}

document.addEventListener("nav", init)
init()

