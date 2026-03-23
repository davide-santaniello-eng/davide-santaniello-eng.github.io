---
title: Modello Mundell-Fleming
---

Il modello di **Mundell-Fleming** estende l'analisi IS-LM a un'**economia aperta**, tenendo conto degli scambi internazionali di beni (import/export) e della mobilità dei capitali finanziari. Sviluppato negli anni '60, il modello mostra come l'efficacia delle politiche macroeconomiche dipenda in modo cruciale dal regime di tassi di cambio adottato (fissi o flessibili).

### La Curva IS in Economia Aperta

In un'economia aperta, la domanda aggregata deve includere le **Esportazioni Nette ($NX$)**, ovvero la differenza tra esportazioni ($X$) e importazioni ($Q$).
$$AD = C + I + G + NX$$

Le esportazioni nette dipendono dal reddito nazionale ($Y$, che aumenta le importazioni), dal reddito estero ($Y^*$, che aumenta le esportazioni) e dal **tasso di cambio reale ($e$)**, che misura la competitività dei beni nazionali:
$$NX = NX(Y, Y^*, e)$$

Un **deprezzamento** della valuta nazionale (aumento di $e$) rende i nostri beni più economici all'estero, migliorando $NX$ e spostando la curva IS verso destra.

### I Flussi di Capitale e la Curva BP (Bilancia dei Pagamenti)

Il conto della Bilancia dei Pagamenti ($BP$) somma il saldo delle partite correnti ($NX$) e il saldo dei movimenti di capitale ($CF$):
$$BP = NX + CF$$

I flussi di capitale ($CF$) dipendono dal differenziale tra il tasso di interesse interno ($i$) e il tasso di interesse internazionale ($i^*$):
$$CF = CF(i - i^*)$$

Se vi è **perfetta mobilità dei capitali**, gli investitori sposteranno istantaneamente capitali verso il Paese che offre il rendimento maggiore. Affinché la bilancia dei pagamenti sia in equilibrio ($BP = 0$), il tasso di interesse interno deve eguagliare quello mondiale:
$$i = i^*$$

In questo caso estremo (ma realistico per i mercati finanziari odierni), la curva BP è una **retta orizzontale** al livello $i^*$.
Se $i > i^*$, si verifica un afflusso massiccio di capitali dall'estero ($BP > 0$).
Se $i < i^*$, si verifica un deflusso massiccio di capitali verso l'estero ($BP < 0$).

> [!abstract] L'intuizione di Mundell: Canada vs USA
> L'intuizione fondamentale nacque osservando l'economia canadese negli anni '60. Con una perfetta mobilità dei capitali, una politica monetaria espansiva in USA abbassava i tassi provocando un deflusso di capitali verso il Canada, apprezzandone la valuta e peggiorandone la competitività. In un mondo globalizzato, il tasso di cambio diventa il principale canale di trasmissione della politica economica.

---

## 1. Regime di Cambi Flessibili

Nel regime di cambi flessibili, la Banca Centrale non interviene sul mercato valutario. Il tasso di cambio si adegua per mantenere costantemente in equilibrio la bilancia dei pagamenti ($BP = 0$).

*   **Variazione del Tasso di Cambio:** Se $i > i^*$, l'afflusso di capitali aumenta la domanda della valuta nazionale, facendola **apprezzare**. L'apprezzamento riduce la competitività, le esportazioni nette scendono e la curva **IS si sposta verso sinistra**.
*   **Politica Monetaria:** È **massimamente efficace**. Un'espansione monetaria (LM a destra) abbassa i tassi ($i < i^*$). I capitali defluiscono, la valuta si **deprezza**, le esportazioni nette salgono e la IS si sposta a destra, amplificando l'effetto sul reddito.
*   **Politica Fiscale:** È **inefficace** (spiazzamento totale o *crowding out internazionale*). Un'espansione fiscale (IS a destra) fa salire i tassi ($i > i^*$). I capitali affluiscono, la valuta si **apprezza**, le esportazioni nette crollano e la IS viene "spinta" indietro alla posizione originaria. La produzione non cambia.

<!-- Il simulatore per cambi flessibili apparirà qui -->

---

## 2. Regime di Cambi Fissi

Nel regime di cambi fissi, la Banca Centrale si impegna a mantenere il tasso di cambio a un livello prestabilito (parità). Deve quindi intervenire acquistando o vendendo valuta estera in cambio di valuta nazionale ogniqualvolta vi sia uno squilibrio nella $BP$.

*   **Variazione dell'Offerta di Moneta:** Se $i > i^*$, l'afflusso di capitali crea pressione per un apprezzamento. Per evitarlo, la Banca Centrale deve vendere valuta nazionale (aumentando la moneta in circolazione). **L'offerta di moneta ($M$) diventa endogena**, la curva **LM si sposta**.
*   **Politica Fiscale:** È **massimamente efficace**. Un'espansione fiscale (IS a destra) fa salire $i > i^*$. L'afflusso di capitali costringe la Banca Centrale ad aumentare l'offerta di moneta (LM a destra). I tassi tornano a $i^*$ senza alcuno spiazzamento degli investimenti.
*   **Politica Monetaria:** È **inefficace** (non può essere perseguita). Se la Banca Centrale tenta un'espansione monetaria (LM a destra), $i$ scende sotto $i^*$. I capitali fuggono all'estero, creando pressione per un deprezzamento. Per mantenere il cambio fisso, la Banca Centrale deve acquistare la propria valuta, riducendo l'offerta di moneta e riportando la LM alla posizione di partenza.

<!-- Il simulatore per cambi fissi apparirà qui -->
