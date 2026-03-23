---
title: Modello IS-LM
---

Il modello **IS-LM** costituisce il nucleo dell'analisi macroeconomica di breve periodo. Sviluppato originariamente da John Hicks per formalizzare la *Teoria Generale* di Keynes, il modello studia l'equilibrio simultaneo in due mercati interdipendenti: il mercato dei beni (curva IS) e il mercato delle attività finanziarie o della moneta (curva LM). Nel breve periodo, il livello generale dei prezzi ($P$) è considerato fisso.

### La Curva IS (Investment-Savings)

La curva IS rappresenta tutte le combinazioni di tasso di interesse ($i$) e livello di reddito ($Y$) che garantiscono l'equilibrio nel **mercato dei beni**, ovvero dove la spesa aggregata programmata uguaglia la produzione ($Y = AD$).

Rispetto al modello Reddito-Spesa, la grande novità è che gli **investimenti ($I$) non sono più esogeni**, ma dipendono negativamente dal tasso di interesse. Le imprese investono meno se il costo del denaro (e quindi il costo di finanziamento) è più alto:
$$I = \bar{I} - b i$$
Dove $\bar{I}$ è l'investimento autonomo e $b > 0$ misura la sensibilità degli investimenti al tasso di interesse.

Inserendo questa funzione nella domanda aggregata ($AD = C + I + G$) e risolvendo per l'equilibrio, si ottiene l'equazione della curva IS:
$$Y = \alpha_G (\bar{A} - b i)$$
Dove:
*   $\bar{A}$ è la spesa autonoma totale ($C_0 + c TR + \bar{I} + G$).
*   $\alpha_G$ è il moltiplicatore keynesiano $\frac{1}{1-c(1-t)}$.

> [!info] Proprietà della curva IS
> *   **Pendenza negativa:** un tasso di interesse più basso stimola gli investimenti, facendo aumentare la domanda aggregata e, tramite il moltiplicatore, il reddito di equilibrio.
> *   **Traslazioni:** variazioni della spesa autonoma ($\Delta G$, $\Delta TR$, $\Delta T$) spostano la curva IS. Una **politica fiscale espansiva** (aumento di $G$ o riduzione di $t$) sposta la IS verso destra.

### La Curva LM (Liquidity-Money)

La curva LM mostra tutte le combinazioni di $i$ e $Y$ che garantiscono l'equilibrio nel **mercato della moneta**, dove l'offerta reale di moneta decisa dalla Banca Centrale uguaglia la domanda reale di moneta ($L$).

L'offerta di moneta in termini reali è considerata esogena: $M/P$.
La domanda di moneta ($L$) ha due moventi principali:
1.  **Movente transattivo e precauzionale:** dipendono positivamente dal reddito ($k Y$).
2.  **Movente speculativo:** dipende negativamente dal tasso di interesse ($-h i$), poiché un tasso di interesse alto rappresenta un elevato costo opportunità per chi detiene moneta infruttifera.

La funzione di domanda di moneta è:
$$L = k Y - h i$$

Uguagliando offerta e domanda ($\frac{M}{P} = k Y - h i$) e isolando il tasso di interesse, otteniamo l'equazione della curva LM:
$$i = \frac{1}{h} \left( k Y - \frac{M}{P} \right)$$

oppure, isolando Y:
$$Y = \frac{1}{k} \left( \frac{M}{P} + h i \right)$$

> [!info] Proprietà della curva LM
> *   **Pendenza positiva:** un aumento del reddito aumenta la domanda di moneta per transazioni. A parità di offerta di moneta, per ristabilire l'equilibrio gli individui vendono titoli, facendone abbassare il prezzo e salire il tasso di interesse.
> *   **Traslazioni:** variazioni nell'offerta nominale di moneta ($\Delta M$) o nel livello dei prezzi ($\Delta P$) spostano la curva. Una **politica monetaria espansiva** (aumento di $M$) sposta la LM verso destra/basso.

### L'Equilibrio simultaneo e le Politiche Economiche

L'incrocio tra la curva IS e la curva LM determina l'unico punto $(Y^*, i^*)$ in cui sia il mercato dei beni che quello della moneta sono in equilibrio.

*   **Politica Fiscale Espansiva (Aumento di $G$):** Sposta la IS a destra. Il reddito aumenta, ma l'aumento della domanda di moneta fa salire il tasso di interesse. L'aumento di $i$ disincentiva parzialmente gli investimenti privati, riducendo l'effetto espansivo sul reddito. Questo fenomeno è noto come **effetto spiazzamento** (crowding out).
*   **Politica Monetaria Espansiva (Aumento di $M$):** Sposta la LM verso il basso/destra. Il tasso di interesse scende, stimolando gli investimenti privati e facendo aumentare il reddito di equilibrio.

---
<!-- Il simulatore IS-LM apparirà qui sotto -->
