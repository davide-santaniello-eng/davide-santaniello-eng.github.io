---
title: Modello AD-AS
---

Il modello **AD-AS** (Domanda Aggregata - Offerta Aggregata) rimuove l'ipotesi di prezzi fissi che caratterizza il modello IS-LM, estendendo l'analisi al **medio periodo**. In questo orizzonte temporale, i prezzi e i salari sono flessibili e la produzione tende a ritornare al suo livello potenziale o "naturale" ($Y_n$).

### 1. La Domanda Aggregata (AD)

La curva di Domanda Aggregata (AD) si ricava direttamente dal modello IS-LM. Essa descrive gli effetti delle variazioni del livello generale dei prezzi ($P$) sul livello di produzione ($Y$) che garantisce l'equilibrio simultaneo nel mercato dei beni e in quello della moneta.

Quando i prezzi aumentano (da $P_0$ a $P_1$), l'offerta reale di moneta ($M/P$) diminuisce. Nel modello IS-LM, questo equivale a una contrazione monetaria: la curva LM si sposta verso l'alto/sinistra. Il tasso di interesse sale, riducendo gli investimenti e, per effetto del moltiplicatore, la produzione di equilibrio.
Pertanto, **esiste una relazione inversa tra $P$ e $Y$**, che spiega la pendenza negativa della curva AD:
$$Y = Y \left( \frac{M}{P}, G, T \right)$$

> [!info] Traslazioni della curva AD
> Qualsiasi politica economica che sposta la curva IS o la curva LM a parità di prezzi provocherà uno spostamento della curva AD.
> *   Una politica fiscale espansiva (aumento di $G$) o monetaria espansiva (aumento di $M$) sposta la AD verso destra.

### 2. L'Offerta Aggregata (AS) e il Mercato del Lavoro

La curva di Offerta Aggregata (AS) poggia sulle fondamenta del mercato del lavoro e sulla determinazione di prezzi e salari. L'equilibrio nel mercato del lavoro è dato dall'incrocio tra l'equazione dei salari e l'equazione dei prezzi.

*   **Equazione dei Salari (WS - Wage Setting):** $W = P^e F(u, z)$. I salari nominali dipendono positivamente dai prezzi attesi ($P^e$), negativamente dal tasso di disoccupazione ($u$) e positivamente da fattori istituzionali ($z$, come sussidi o potere sindacale).
*   **Equazione dei Prezzi (PS - Price Setting):** $P = (1+\mu)W$. Le imprese fissano i prezzi applicando un mark-up ($\mu$) sul costo del lavoro.

Sostituendo il salario reale $W/P$ nella WS si ottiene la curva AS. Esprimendo la disoccupazione in termini di produzione ($u = 1 - Y/L$), la relazione AS mostra come il livello dei prezzi effettivo dipenda dai prezzi attesi e dal livello di produzione:
$$P = P^e (1+\mu) F\left(1 - \frac{Y}{L}, z\right)$$

> [!info] Proprietà della curva AS
> *   **Pendenza positiva:** Quando $Y$ aumenta, l'occupazione sale e la disoccupazione scende. Il maggior potere contrattuale dei lavoratori spinge al rialzo i salari nominali. Le imprese, a loro volta, trasferiscono i maggiori costi sui prezzi. Quindi, se $Y$ sale, $P$ sale.
> *   **Traslazioni:** La curva AS passa per il punto in cui $Y = Y_n$ (produzione naturale) e $P = P^e$. Quando i prezzi attesi $P^e$ cambiano, la curva AS si sposta verticalmente.

### 3. L'Equilibrio e l'Aggiustamento di Medio Periodo

L'equilibrio di breve periodo si trova all'intersezione tra la curva AD e la curva AS. Tuttavia, nel breve periodo la produzione $Y$ può discostarsi dalla produzione naturale $Y_n$, e i prezzi effettivi $P$ possono discostarsi dai prezzi attesi $P^e$.

Se l'economia si trova in un **boom** ($Y > Y_n$), i prezzi effettivi superano quelli attesi ($P > P^e$). I lavoratori, accorgendosi che il loro potere d'acquisto è diminuito, rivedono al rialzo le loro aspettative sui prezzi ($P^e$ aumenta) e chiedono salari maggiori in fase di rinnovo contrattuale.
L'aumento dei salari porta le imprese ad alzare i prezzi. Graficamente, **la curva AS si sposta progressivamente verso l'alto**.
Lungo la curva AD, l'aumento continuo dei prezzi riduce l'offerta reale di moneta, fa salire i tassi di interesse e riduce la domanda.
L'aggiustamento termina solo nel lungo periodo, quando la AS si sposta fino al punto in cui **la produzione torna al livello naturale ($Y = Y_n$)** e i prezzi attesi coincidono con i prezzi effettivi.

### 4. La Curva di Phillips
Questa dinamica di aggiustamento è strettamente legata alla Curva di Phillips, che traduce la curva AS in tassi di variazione (inflazione). La curva di Phillips originaria mostra il trade-off tra inflazione ($\pi$) e disoccupazione ($u$). Nella sua formulazione moderna (con aspettative), l'equazione è:
$$\pi_t = \pi^e_t + (\mu + z) - \alpha u_t$$
Nel lungo periodo, quando le aspettative sono corrette ($\pi_t = \pi^e_t$), la disoccupazione si stabilizza al suo **tasso naturale (NAIRU)**, confermando l'assenza di un trade-off stabile nel lungo periodo.

---
<!-- Il simulatore AD-AS apparirà qui sotto -->
