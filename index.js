function losTab() {
  let tab = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  for (let i = 0; i < 20; ++i) {
    a = Math.floor(Math.random() * 9);
    b = Math.floor(Math.random() * 9);
    let t = tab[a];
    tab[a] = tab[b];
    tab[b] = t;
  }
  return tab;
}

function szarosc(i, j) {
  if ([0, 1, 2, 6, 7, 8].includes(i) && [3, 4, 5].includes(j)) return true;

  if ([3, 4, 5].includes(i) && [0, 1, 2, 6, 7, 8].includes(j)) return true;

  return false;
}

function czyPoziom(board, i, j, v) {
  for (let ii = 0; ii < 9; ++ii) {
    if (board[i][ii] == v) return false;
  }
  return true;
}

function czyPion(board, i, j, v) {
  for (let ii = 0; ii < 9; ++ii) {
    if (board[ii][j] == v) return false;
  }
  return true;
}

function czyKwadrat(board, i, j, v) {
  let ti = Math.floor(i / 3) * 3;
  let tj = Math.floor(j / 3) * 3;
  for (let ii = 0; ii < 9; ++ii) {
    if (board[ti + Math.floor(ii / 3)][tj + (ii % 3)] == v) return false;
  }
  return true;
}

function ustaw(board, i, j) {
  if (board[i][j] != 0) {
    if (i == 8 && j == 8) return true;
    let ni = i;
    let nj = j + 1;
    if (nj == 9) {
      nj = nj - 9;
      ++ni;
    }
    return ustaw(board, ni, nj);
  }
  let pom = losTab();
  for (let ii = 0; ii < 9; ++ii) {
    if (
      czyPoziom(board, i, j, pom[ii]) &&
      czyPion(board, i, j, pom[ii]) &&
      czyKwadrat(board, i, j, pom[ii])
    ) {
      board[i][j] = pom[ii];
      let nj = j + 1;
      let ni = i;
      if (nj == 9) {
        nj = nj - 9;
        ++ni;
      }
      if (ustaw(board, ni, nj)) return true;
      board[i][j] = 0;
    }
  }
  return false;
}

function ustawWszystkie() {
  let board = [];
  let temp = "";
  for (let i = 0; i < 9; ++i) {
    board[i] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  }
  for (let j = 0; j < 3; ++j) {
    let pom = losTab();
    for (let i = 0; i < 9; ++i) {
      board[j * 3 + Math.floor(i / 3)][j * 3 + (i % 3)] = pom[i];
    }
  }
  ustaw(board, 0, 0);
  return board;
}

function czyPoprawne(board) {
  for (let ii = 0; ii < 9; ++ii) {
    for (let iii = 0; iii < 9; ++iii) {
      if (board[ii][iii] == 0) return false;
    }
  }
  return true;
}

function change(i, j) {
  czycsKolory();
  let idZmienianego = "" + i + j;
  let elemZmieniany = document.getElementById("" + idZmienianego);

  if (
    elemZmieniany.value == "" &&
    !elemZmieniany.classList.contains("mistake")
  ) {
    kolory();
    return;
  }

  if (elemZmieniany.value == "") {
    kolory();
    elemZmieniany.classList.remove("mistake");
    return;
  }

  if ("123456789".includes(elemZmieniany.value) && elemZmieniany.value != "") {
    let idPor;
    let elPor;
    //POZIOMO
    for (let x = 0; x < 9; ++x) {
      idPor = "" + i + x;
      elPor = document.getElementById(idPor);
      if (idZmienianego != idPor && elPor.value == elemZmieniany.value) {
        elPor.classList.add("mistake");
        if (!elemZmieniany.classList.contains("mistake"))
          elemZmieniany.classList.add("mistake");
      }
    }
    //PIONOWO
    for (let x = 0; x < 9; ++x) {
      idPor = "" + x + j;
      elPor = document.getElementById(idPor);
      if (idZmienianego != idPor && elPor.value == elemZmieniany.value) {
        elPor.classList.add("mistake");
        if (!elemZmieniany.classList.contains("mistake"))
          elemZmieniany.classList.add("mistake");
      }
    }
    //KWADRAT
    let pi = Math.floor(i / 3) * 3;
    let pj = Math.floor(j / 3) * 3;
    for (let x = 0; x < 9; ++x) {
      idPor = "" + (pi + Math.floor(x / 3)) + (pj + (x % 3));
      elPor = document.getElementById(idPor);
      if (idZmienianego != idPor && elPor.value == elemZmieniany.value) {
        elPor.classList.add("mistake");
        if (!elemZmieniany.classList.contains("mistake"))
          elemZmieniany.classList.add("mistake");
      }
    }
    kolory();
    win();
    return;
  }
  kolory();
  if (!elemZmieniany.classList.contains("mistake"))
    elemZmieniany.classList.add("mistake");
}

function klik(i, j) {
  let idZmienianego = "" + i + j;
  let elemZmieniany = document.getElementById(idZmienianego);
  if (!elemZmieniany.readOnly) czycsKolory();
  if (elemZmieniany.readOnly == false) {
    elemZmieniany.classList.remove("mistake");
    let idPor;
    let elPor;
    //POZIOMO
    for (let x = 0; x < 9; ++x) {
      idPor = "" + i + x;
      elPor = document.getElementById(idPor);
      if (idZmienianego != idPor && elPor.value == elemZmieniany.value) {
        elPor.classList.remove("mistake");
      }
    }
    //PIONOWO
    for (let x = 0; x < 9; ++x) {
      idPor = "" + x + j;
      elPor = document.getElementById(idPor);
      if (idZmienianego != idPor && elPor.value == elemZmieniany.value) {
        elPor.classList.remove("mistake");
      }
    }
    //KWADRAT
    let pi = Math.floor(i / 3) * 3;
    let pj = Math.floor(j / 3) * 3;
    for (let x = 0; x < 9; ++x) {
      idPor = "" + (pi + Math.floor(x / 3)) + (pj + (x % 3));
      elPor = document.getElementById(idPor);
      if (idZmienianego != idPor && elPor.value == elemZmieniany.value) {
        elPor.classList.remove("mistake");
      }
    }

    elemZmieniany.value = "";
    kolory();
  }
}

function losuj() {
  document.getElementById("title").innerText = "SUDOKU";
  board = ustawWszystkie();
  while (!czyPoprawne(board)) board = ustawWszystkie();
  let temp = "";
  let sheetEl = document.getElementById("sheet");
  //WYPISZ
  for (let i = 0; i < 9; ++i) {
    for (let j = 0; j < 9; ++j) {
      temp += "<input ";
      temp += "id=" + i + j + " ";
      temp += "autocomplete='off' ";
      temp += "onfocus='klik(" + i + "," + j + ")' ";
      temp += "onchange='change(" + i + "," + j + ")' ";
      if (Math.random() < 0.3) {
        temp += "value=" + board[i][j];
        temp += " readonly='True'";
      }
      if (szarosc(i, j)) temp += " class='szare'";
      temp += " >";
    }
  }
  sheetEl.innerHTML = temp;
  czyRozwiazane = false;
  naDziewiec();
  poczatkowyWynik = -4;
  win();
}

function naDziewiec() {
  let el;
  for (let i = 0; i < 9; ++i) {
    for (let j = 0; j < 9; ++j) {
      el = document.getElementById("" + i + j);
      if (i % 3 == 0) el.classList.add("btop");
      if (i % 3 == 2) el.classList.add("bbot");
      if (j % 3 == 0) el.classList.add("bleft");
      if (j % 3 == 2) el.classList.add("bright");
    }
  }
}

function pokaz() {
  if (!czyRozwiazane) {
    for (let i = 0; i < 9; ++i) {
      for (let j = 0; j < 9; ++j) {
        let el = document.getElementById("" + i + j);
        el.classList.remove("done");
        if (!el.readOnly && el.value == board[i][j]) el.classList.add("done");
        el.classList.remove("mistake");
        el.value = board[i][j];
      }
    }
    czyRozwiazane = true;
  }
}

function hint() {
  if (!czyRozwiazane) {
    let czyZapelnione = true;
    for (let i = 0; i < 9; ++i)
      for (let j = 0; j < 9; ++j)
        if (document.getElementById("" + i + j).value == "")
          czyZapelnione = false;
    console.log(czyZapelnione);
    if (czyZapelnione) return;

    czycsKolory();
    let zrobione = false;
    while (!zrobione) {
      let hintId = "";
      hintId += Math.floor(Math.random() * 9);
      hintId += Math.floor(Math.random() * 9);
      let el = document.getElementById(hintId);
      if (el.value == "") {
        el.value = board[parseInt(hintId[0])][parseInt(hintId[1])];
        el.classList.add("hint");
        el.readOnly = true;
        zrobione = true;
        change(parseInt(hintId[0]), parseInt(hintId[1]));
      }
    }
    kolory();
    win();
  }
}
function czycsKolory() {
  for (let i = 0; i < 9; ++i)
    for (let j = 0; j < 9; ++j)
      document.getElementById("" + i + j).classList.remove("done");
}

function kolorujWiersze(i, j) {
  console.log("" + i + j);
  let el = document.getElementById("" + i + j);
  let war = el.value;
  let res;

  if (j == 0) {
    if (war != "" && !el.classList.contains("mistake"))
      if (kolorujWiersze(i, j + 1)) el.classList.add("done");
    if (i < 8) kolorujWiersze(i + 1, j);
  } else {
    if (war == "" || el.classList.contains("mistake")) return false;
    if (j == 8) {
      el.classList.add("done");
      return true;
    }
    if (kolorujWiersze(i, j + 1)) {
      el.classList.add("done");
      return true;
    }
  }
}

function kolorujKolumny(i, j) {
  console.log("k" + "" + i + j);
  let el = document.getElementById("" + i + j);
  let war = el.value;
  let res;

  if (i == 0) {
    if (war != "" && !el.classList.contains("mistake"))
      if (kolorujKolumny(i + 1, j)) el.classList.add("done");
    if (j < 8) kolorujKolumny(i, j + 1);
  } else {
    if (war == "" || el.classList.contains("mistake")) return false;
    if (i == 8) {
      el.classList.add("done");
      return true;
    }
    if (kolorujKolumny(i + 1, j)) {
      el.classList.add("done");
      return true;
    }
  }
}

function kolory() {
  kolorujWiersze(0, 0);
  kolorujKolumny(0, 0);
}

function win() {
  let wynik = 0;
  let el;
  for (let i = 0; i < 9; ++i) {
    for (let j = 0; j < 9; ++j) {
      el = document.getElementById("" + i + j);
      if (el.classList.contains("mistake")) return false;
      if (el.value != "") wynik += parseInt(el.value);
    }
  }
  if (poczatkowyWynik < 0) poczatkowyWynik = wynik;
  let progres = (wynik - poczatkowyWynik) / 405;
  document.getElementById("tlo").style.opacity = progres;
  const wyb = 200 * (1 - progres);
  const nwyb = 200 + 55 * progres;
  document.getElementById("butLos").style.backgroundColor =
    "rgb(" + wyb + "," + nwyb + "," + nwyb + ")";
  document.getElementById("butRoz").style.backgroundColor =
    "rgb(" + nwyb + "," + wyb + "," + nwyb + ")";
  document.getElementById("butHin").style.backgroundColor =
    "rgb(" + nwyb + "," + nwyb + "," + wyb + ")";
  console.log(wynik);
  if (wynik != 405) return false;
  document.getElementById("title").innerText = "Gratulacje! :D";
  czyRozwiazane = true;
  return true;
}

let board = [];
let poczatkowyWynik = -4;
let czyRozwiazane = false;

losuj();
