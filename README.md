# 🐉 Cacciatore di Draghi

Benvenuti a **Cacciatore di Draghi**, un entusiasmante gioco di ruolo in cui devi sconfiggere mostri per guadagnare esperienza e oro, e infine affrontare un drago per vincere la partita! 🏆

Questo progetto di base in JavaScript, PURAMENTE DIDATTICO, permette di creare un gioco di ruolo, scritturale, imparando a gestire variazioni di DOM e utilizzare gli array.

Questo è il terzo esercizio del corso di freecodecamp.org (https://www.freecodecamp.org/), nello specifico https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures-v8/

Lezione: Learn Basic JavaScript by Building a Role Playing Game

## Descrizione del Gioco

Nel gioco, il giocatore inizia con:
- 100 punti vita ❤️
- 50 monete d'oro 💰
- 0 punti esperienza ⭐

Il giocatore può esplorare diverse location e compiere azioni come acquistare armi, guadagnare salute, e combattere mostri. Il gioco termina con la vittoria se riesci a sconfiggere il drago finale. 

Come Giocare:

1. **Vai al negozio** 🏪: Compra armi e punti vita per prepararti alle battaglie.
2. **Vai alla grotta** 🕳️: Combatti mostri per guadagnare esperienza e oro.
3. **Sconfiggi il drago** 🐉: Affronta il drago finale per vincere la partita!

## 💻 Apprendimeto JS

1. **document.querySelector()** metodo per selezionare il primo elemento che corrisponde a un selettore CSS specificato all'interno del documento.

       var elemento = document.querySelector('div .miaClasse');

2. **.innerText** proprietà dell'elemento, che consente di modificare il contenuto testuale di un elemento.

    Differenza tra

    **.innerText**: gestisce solo il testo, non considera i tag HTML. Es: paragrafo.innerText = "Testo cambiato!";

    **.innerHTML**: può gestire e includere tag HTML. Es: paragrafo.innerHTML = "Ciao, mondo!";

3. **oggetti** creazione e gestione di oggetti JS con proprietà.

       const cat = {};

       const cat = {
          name: "Whiskers",
          "Number of legs": 4
       };

       ARRAY DI OGGETTI
        const locations = [
          {
            name: "town square",
            "button text": ["Go to store", "Go to cave", "Fight dragon"],
            "button functions": [goStore, goCave, fightDragon],
            text: "You are in the town square. You see a sign that says \"Store\"."
          },
          {
            name: "store",
            "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
            "button functions": [buyHealth, buyWeapon, goTown],
            text: "You enter the store."
          },
          {
            name: "cave",
            "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
            "button functions": [fightSlime, fightBeast, goTown],
            text: "You enter the cave. You see some monsters."
          }
        ];

4. **Modificare lo style** di un elemento

       const paragraph = document.querySelector('p');
       paragraph.style.display = 'block';

5. **molto altro ancora**: tutto trascritto nell'esercizio stesso.


## Licenza

Questo progetto è distribuito sotto la licenza MIT. Vedi il file [LICENSE](LICENSE) per maggiori dettagli.
