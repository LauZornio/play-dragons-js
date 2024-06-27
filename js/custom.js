//VARIABILI GLOBALI
let xp = 0; // Punti esperienza
let health = 100; // Punti vita
let gold = 50; // Monete d'oro
let currentWeapon = 0; // Indice array dell'arma corrente
let fighting; // Indice array del mostro corrente
let monsterHealth; // Punti vita del mostro
let inventory = ["bastone"]; // Inventario dell'utente

//SELEZIONE DEGLI ELEMENTI DEL DOM
//btn (controls)
const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
//sezione del testo (text)
const text = document.querySelector("#text");
//stato del giocatore (stats)
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
//sezione del combattimento (monsterStats)
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

//ARRAY: ARMI DEL GIOCATORE
const weapons = [
  { name: 'bastone', power: 5 },
  { name: 'pugnale', power: 30 },
  { name: 'martello', power: 50 },
  { name: 'spada', power: 100 }
];

//DEFINIZIONI DEI MOSTRI
const monsters = [
  {
    name: "Melma",
    level: 2,
    health: 15
  },
  {
    name: "Bestia Zannuta",
    level: 8,
    health: 60
  },
  {
    name: "Drago",
    level: 20,
    health: 300
  }
]

//LOCATIONS DEL GIOCO
//diversi ambienti in cui il giocatore può trovarsi nel gioco.
//ogni location ha un nome, un array dei btn, un array delle funzioni che i btn richiamano, una descrizione text della location in cui è il giocatore.
//Esempio prima location:
  //name: piazza cittadina con descrizione text che spiega al giocatore a che punto si è con il gioco
  //tre diversi bottoni con tre diversi testi e con tre diverse funzioni:
    //btn[0] --> Vai al negozio con funzione goStore
    //btn[1] --> Vai alla grotta con funzione goCava
    //btn[2] --> Vai Sconfiggi il drago con funzione fightDragon
const locations = [
  {
    name: "piazza cittadina",
    "button text": ["Vai al negozio", "Vai alla grotta", "Sconfiggi il drago"],
    "button functions": [goStore, goCave, fightDragon],
    text: "Sei nella piazza della città. </br> Vedi un cartello che dice \"Negozio\" e un cartello che porta alla \"Grotta\"."
  },
  {
    name: "negozio",
    "button text": ["Compra 10 health (10 gold)", "Compra arma (30 gold)", "Vai piazza cittadina"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "Sei entrato al negozio. Cosa vuoi comprare?"
  },
  {
    name: "grotta",
    "button text": ["Combatti melma", "Combatti bestia zannuta", "Vai piazza cittadina"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "Sei entrato nella grotta. Vedi alcuni mostri. Cosa vuoi fare?"
  },
  {
    name: "fight",
    "button text": ["Attacca", "Schiva", "Scappa"],
    "button functions": [attack, dodge, goTown],
    text: "Stai combattendo un mostro."
  },
  {
    name: "kill monster",
    "button text": ["Vai piazza cittadina", "Vai piazza cittadina", "Vai piazza cittadina"],
    "button functions": [goTown, goTown, easterEgg],
    text: 'Il mostro urla "Arg!" mentre muore. \n'
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "&#x2620; Sei morto. &#x2620; </br> Vuoi provare di nuovo?"
  },
  { 
    name: "win", 
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"], 
    "button functions": [restart, restart, restart], 
    text: "Hai sconfitto il drago! VINCI LA PARTITA! &#x1F389;" 
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Vai piazza cittadina?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "Trovi un gioco segreto. </br>Scegli un numero sopra. </br>Verranno scelti casualmente dieci numeri tra 0 e 10. </br>Se il numero scelto corrisponde a uno dei numeri casuali, vinci!"
  }
];

// INIZIALIZZAZIONE DEI BUTTON
// Quando il gioco inizia, i bottoni vengono inizializzati per indirizzare il giocatore alle prime tre funzioni:
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

//FUNZIONE DI AGGIORNAMENTO
//responsabile dell'aggiornamento dell'interfaccia utente in base alla location corrente del giocatore
//la funzione update, a cui passare un array, viene richiamata nel gioco
function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerHTML = location.text;
}

//FUNZIONE DI NAVIGAZIONE
//La funzione goTown richiama la funzione update passando l'array locations con indice 0, per richiamare la location piazza cittadina.
//in questo modo, il layout del gioco si modifica con tutte le info della piazza cittadina
function goTown() {
  update(locations[0]); // Aggiorna alla location "piazza cittadina"
}

function goStore() {
  update(locations[1]); // Aggiorna alla location "negozio"
}

function goCave() {
  update(locations[2]); // Aggiorna alla location "grotta"
}

//FUNZIONI DI ACQUISTO E VENDITA
//acquisto punti vita e armi, e vendita armi
//funzioni attive nel momento in cui si entra nel negozio con goStore

//acquisto di PUNTI VITA
//controllo che il giocatore abbia almento 10 gold
  //se può comprarli: la variabile globale gold si riduce di 10, mentre la variabile globale health aumenta di 10
  //successivamente, cambia il testo nel DOM inerente al gold e all'health
  //Se non c'è abbastanza oro, viene solo comunicato al giocatore che non può comprare
function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
    text.innerText = "Hai comprato 10 di salute. Vuoi comprare altro?";
  } else {
    text.innerText = "Non hai abbastanza oro per comprare i punti vita.";
  }
}

//acquisto ARMA
//si può acuistare in successione e rimane attiva solo l'arma più forte.
//PRIMO CONTROLLO: che ci siano armi da acquistare:
  //currentWeapon è l'indice dell'array weapons, che deve essere MINORE alla lunghezza -1 dell'array stesso. -1 perché length restituisce il numero degli elementi partendo da 1, mentre l'array parte da 0
  //Se non ci sono più armi da acquistare viene comunicato che il giocatore ha l'arma più potente e che che il button permette di vendere le altre armi per 15gold
//SECONDO CONTROLLO: il giocatore deve avere almeno 30gold
  //vengono aggiornate le variabili gold (-30gold) e incrementato l'indice dell'array waepons
  //il testo varia nel DOM: viene comunicato cosa il giocatore ha comprato e anche cosa hai accumulato nel tuo inventario delle armi (inventory all'inizio ha il bastone)

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++; //incremento dell'indice
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name; //nuova variabile con il nome della nuova arma (avendo incrementato l'indice)
      text.innerText = "Hai comprato " + newWeapon + ".";
      inventory.push(newWeapon); //metodo per aggiungere alla fine dell'array
      text.innerText += "\n Nel tuo inventario hai: " + inventory;
    } else {
      text.innerText = "Non hai abbastanza oro per comprare armi.";
    }
  } else {
    text.innerText = "Hai già l'arma più potente!";
    button2.innerText = "Vendi un'arma per 15 monete d'oro";
    button2.onclick = sellWeapon;
  }
}

//vendita ARMI
//si può vendere le armi, solo quando le si ha acquistate tutte. Inoltre, si possono vendere solo quelle meno potenti dell'ultima acquista. NON si può scegliere l'arma da vendere
//IMPORTANTE: questa funzione si attiva quando si ha l'arma più potente
//CONTROLLO: si possono vendere armi solo se ci sono più di 1, quindi una rimane sempre!
  //vengono aggiornate le variabili gold (+15gold), il testo del DOM
  //viene dichiarata una variabile a cui passare il nome dell'arma venduta
  //viene comunicato al giocatore quale arma hai venduto e cosa ti è rimasto nel tuo inventario armi
function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift(); //metodo per togliere l'arma
    text.innerText = "Hai venduto l'arma " + currentWeapon + ".";
    text.innerText += " Nel tuo inventario hai: " + inventory;
  } else {
    text.innerText = "Non vendere la tua unica arma!";
  }
}

//FUNZIONI DI COMBATTIMENTO
//funzioni per richiamare il mostro specifico
//queste funzioni sono disponibili quando si clicca "grotta"
function fightSlime() {
  fighting = 0; // Imposta il mostro attuale a "melma" è l'indice che verrà usato per prendere le info nell'array monster
  goFight();
}

function fightBeast() {
  fighting = 1; // Imposta il mostro attuale a "bestia zannuta"
  goFight();
}

function fightDragon() {
  fighting = 2; // Imposta il mostro attuale a "drago"
  goFight();
}

//funzione che imposta la LOCATION e il layout di gioco
//richiamo della funzione update
//style.display per variare il CSS e far apparire la sezione vitalità del mostro
//variazione del DOM text con le info del mostro: indice passato dalla funzione precedente
function goFight() {
  update(locations[3]); //location "fight" per combattere il mostro, variazione di testo DOM dei testi e delle funzioni inerenti di attacca, schiva, scappa
  monsterHealth = monsters[fighting].health; //impostare il valore variabile con i punti vita del mostro
  monsterStats.style.display = "block"; //compare la sezione dei punti vita/attacco del mostro
  monsterName.innerText = monsters[fighting].name; //variazione del DOM
  monsterHealthText.innerText = monsterHealth; //variazione del DOM
}


//funzione ATTACCO
//funzione richiamata quando si clicca il btn attacco
//modifica del DOM text con info del mostro e con l'arma con cui hai attaccato
//ogni attacco del giocatore
  //riduce l'health del giocatore in base alla funzione getMonsterAttackValue
  //può o meno beccare il mostro e dipende dal valore booleano della funzione isMonsterHit()
function attack() {
  text.innerText = monsters[fighting].name + " ti attacca. \n"; //modifica del DOM text
  text.innerText += " Tu lo attacchi con il tuo " + weapons[currentWeapon].name + ".\n"; //modifica del DOM text
  let attackMonsterPointer = getMonsterAttackValue(monsters[fighting].level);//riduzione salute del giocatere vedi funzione a cui diamo il livello del mostro
  health -= attackMonsterPointer; 

  if (isMonsterHit()) {
    let attackGamerPointer = weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
    //riduce la vita del mostro con i punti power dell'arma + un valore random tra 0 e 1, moltiplicato per i punti esperienza del giocatore, arrotondato per difetto, +1   
    monsterHealth -= attackGamerPointer; 
    //modifica del DOM per punti vita dopo l'attacco
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;
    text.innerText += " Lo hai Colpito! ha perso " + attackGamerPointer + " punti vita! \n";
  } else {
    text.innerText += " Lo hai mancato.\n";
  }

  text.innerText += "Durante l'attacco, " +  monsters[fighting].name + " ti colpisce! Hai perso " + attackMonsterPointer + " punti vita!\n";
  
  //verifica dei punti vita
  //se la vita del giocatore è 0 o meno di 0, viene chiamata la funzione lose
  //se la il giocatore è vivo e il mostro è morto:
    //se l'indice di fighting è 2 (ovvero il drago), richiama la funzione winGame
    //altrimenti la funzione defeatMonster
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }

  // 10% di probabilità che l'arma si rompa se non è l'unica arma nell'inventario
  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += "Oh no! Durante questo attacco, " + inventory.pop() + " si è rotto!";
    currentWeapon--;
    //modifica del DOM text e viene tolto, con il metodo pop, l'arma utilizzata
    //indice da modificare
  }
}

//FUNZIONE ATTACCO DEL MOSTRO, a cui diamo il livello del mostro
function getMonsterAttackValue(level) {
  //costate hit prende la sottrazione tra
    //livello del mostro * 5
    //Math.random() ovvero un numero casuale compreso tra 0 e 1
      //moltiplicato per i punti XP del giocatore
      //arrotordato per difetto
  const hit = (level * 5) - (Math.floor(Math.random() * xp));

  //operatore ternario
  //se hit è maggiore di 0 allora restituisci il valore di hit, oppure 0
  return hit > 0 ? hit : 0;
}

//FUNZIONE BOOLEANA SE GIOCATORE HA COLPITO IL MOSTRO
// 80% di probabilità di colpire il mostro, o il 100% se la salute del giocatore è inferiore a 20
// ritorna true (colpito il mostro) se Math.random() da un valore superiore a 0.2 O se la salute del giocatore è inferiore a 20
function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}

//questa funzione è semplicemente per schivare l'attacco del mostro
//fine a se stessa, solo modifica al DOM del text
function dodge() {
  text.innerText = "Schivi l'attacco del " + monsters[fighting].name;
}

//FUNZIONE SCONFITTA DEL MOSTRO
//viene richiamata quando si sconfigge un mostro melma e bestia zannuta (NO per il drago)
//vengono aggiorante le variabili del giocatore:
  //gold: livello del mostro * 6.7, arrotondato per difetto
  //xp: aggiunta del livello del mostro
//poi viene richiamata la location 4, kill monster
function defeatMonster() {
  const earnGold = Math.floor(monsters[fighting].level * 6.7);
  const earnXP = monsters[fighting].level;
  gold += earnGold;
  xp += earnXP;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
  text.innerText += "\n Hai guadagnato punti esperienza " + earnXP + " e trovato " + earnGold + " monete d'oro";
}

//FUNZIONE DI FINE GIOCO
//funzione giocatore hai perso
//richiamo della locations 5: sei morto e puoi riniziare il gioco
function lose() {
  update(locations[5]);
}

//funzione giocatore hai vinto
//richiamo della locations 6: hai vinto e sconfitto il drago, puoi riniziare il gioco
function winGame() {
  update(locations[6]);
}

//funzione per riniziare il gioco quando hai perso o vinto l'intero gioco
//impostazioni iniziali del gioco con punti esperienza, vita e monete ripristinate
function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["bastone"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown(); //per richimare la location della piazza cittadina
}


//FUNZIONI PER GIOCO NASCOSCO
//il gioco nascosto compare quando si vince contro un mostro (NON il drago)
//è nascosto nel terzo bottone
function easterEgg() {
  update(locations[7]);
  //richiamo della location 7, nel quale puoi scegliere che numero vuoi
}

//funzioni richiamate in base al bottone premuto
function pickTwo() {
  pick(2);
}
function pickEight() {
  pick(8);
}

//
function pick(guess) {
  const numbers = []; //costante array
  
  //ciclo while per comporre un array di 10 numeri randomici
  //il ciclo continua fino a quando gli elementi dell'array non saranno 9 (indice 10)
  //con metodo push, vengono inseriti
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }

  text.innerText = "Hai scelto il numero" + guess + ". Ecco i numeri casuali:\n";

  //modificare il DOM per visaulizzare i numeri estratti
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }

  //verifica se il numero tra 2 e 8, compare nei numeri casuali
  //metodo .includes per vedere se effettivamente il numero compare nell'array numbers
  if (numbers.includes(guess)) {
    text.innerText += "Ben Fatto! Hai vinto 20 gold!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "Oh no! Hai perso 10 health!";
    health -= 10;
    healthText.innerText = health;
    
    //richiamo della funzione lose() se la tua vita arriva a zero
    if (health <= 0) {
      lose();
    }
  }
}