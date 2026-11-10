# Compagno di Frosthaven

App web installabile (PWA) per giocare a **Frosthaven**: segue le fasi del round, l'ordine di iniziativa, i personaggi, i mostri con le loro statistiche, i mazzi dei modificatori, il mazzo dei bottini, la Fase dell'Avamposto e i promemoria delle regole. Tutto in italiano.

Funziona anche senza connessione dopo la prima apertura. I dati della partita restano salvati sul dispositivo.

## Contenuto

| File | A cosa serve |
| --- | --- |
| `index.html` | L'app completa (grafica, logica e dati in un solo file) |
| `manifest.webmanifest` | Nome, colori e icone per installarla come app |
| `sw.js` | Service worker: salva l'app per usarla offline |
| `icon-*.png`, `apple-touch-icon.png`, `favicon-32.png` | Icone dell'app (Android, iPhone, browser) |
| `vercel.json` | Impostazioni di pubblicazione per Vercel |
| `LICENSE` | Licenza AGPL-3.0 |

Non serve nessuna installazione né compilazione: sono file statici.

## 1. Crea la repository su GitHub

**Dal sito (senza programmi):**

1. Vai su [github.com/new](https://github.com/new), scegli un nome (per esempio `compagno-frosthaven`) e premi **Create repository**.
2. Nella pagina della repository vuota premi **uploading an existing file**.
3. Trascina dentro **tutti i file** di questa cartella: stanno tutti allo stesso livello, senza sottocartelle. Il file `.gitignore` è facoltativo.
4. Premi **Commit changes**.

**Dal terminale (se usi git):**

```bash
cd compagno-frosthaven
git init
git add .
git commit -m "Prima versione"
git branch -M main
git remote add origin https://github.com/TUO-UTENTE/compagno-frosthaven.git
git push -u origin main
```

## 2. Pubblica su Vercel

1. Accedi a [vercel.com](https://vercel.com) con il tuo account GitHub.
2. Premi **Add New… → Project** e importa la repository `compagno-frosthaven`.
3. Lascia **Framework Preset: Other**, senza comando di build e con la cartella principale `./`.
4. Premi **Deploy**. Dopo pochi secondi ricevi un indirizzo come `compagno-frosthaven.vercel.app`.

Da quel momento ogni modifica caricata su GitHub viene pubblicata da sola.

## 3. Installa l'app sul telefono

- **iPhone / iPad (Safari):** apri l'indirizzo, tocca **Condividi → Aggiungi alla schermata Home**.
- **Android (Chrome):** apri l'indirizzo, tocca il menu **⋮ → Installa app** (oppure il banner che compare).
- **Computer (Chrome o Edge):** clicca l'icona di installazione nella barra degli indirizzi.

## Portare la partita in corso nella nuova app

I dati restano nel browser in cui usi l'app, quindi la versione su Vercel parte vuota.
Per spostare una partita: nella vecchia app apri **Salvataggi → Esporta**, copia il testo, poi nella nuova app incollalo in **Salvataggi** e premi **Importa**.

## Aggiornare l'app

1. Sostituisci `index.html` nella repository con la nuova versione.
2. In `sw.js` aumenta il numero di versione (`const VERSIONE = 'v2';`, poi `'v3'` e così via).
3. Carica le modifiche: Vercel ripubblica da solo. Sul telefono la nuova versione arriva alla riapertura dell'app (a volte serve chiuderla e riaprirla due volte).

## Crediti e licenza

- Le statistiche dei mostri, gli elenchi degli scenari e i punti ferita delle classi vengono dal progetto open source [X-haven Assistant](https://github.com/Tarmslitaren/FrosthavenAssistant) di Tarmslitaren, distribuito con licenza **GNU AGPL-3.0**. Per questo anche questa app è distribuita con la stessa licenza (vedi `LICENSE`): se la pubblichi, il codice deve restare disponibile, per esempio tenendo pubblica la repository.
- I riassunti delle regole sono basati sul regolamento italiano di Frosthaven; i numeri di pagina rimandano al manuale.
- *Frosthaven* e le sue illustrazioni sono di Cephalofair Games. Questa è un'app non ufficiale, creata da appassionati e senza legami con l'editore.
