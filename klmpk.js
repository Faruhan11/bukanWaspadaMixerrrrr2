const semua = ["AGATHA CHELSEA OLIVIA",
  "ALYAA RIZKITA RAHMANIA",
  "ALYSSA SHAFIRA DYANNISA",
  "ARINI RETNO HANIFAH",
  "ASMA NI'MATUZZAIDAH",
  "ASYILA NASYWADHIYA FEBRIYANI",
  "AULIA GHISKA PUTRI RISANI",
  "AULIA NURFADILAH",
  "AYLA KANYAWIRIANDA",
  "AZZAHRA VIDYA APSARI",
  "BINTANG BILQISTHISYAH",
  "CUT DZAKIRA AFINA DEVI",
  "NURRAHAYU MUTIARA PRIANSIH",
  "DINA AUFA FADILAH",
  "ERDYA FAIZA RACHMA FATHIHA SALSABILA",
  "INDRA FAWWAZ ABDUL HADI",
  "FELISHA PUTRI VIRGIA SALSABILA",
  "FIE ANDITTA GREFANNI",
  "FIRDA RIFALINA GHERAYA NABILAULIA",
  "HANIYYAH GINA RAHMANI",
  "HILMA ROBBANIY",
  "INTAN NAZILATUL HIKMAH",
  "IRENE ANGELINA OCTAVIA NADEAK",
  "JYESTHA SEKAR RAMADHANI",
  "KINANTI MEURAH RAHMAN",
  "KUNTUM KHALILA ARLI",
  "KYLA IDZAH PANE",
  "KYLA RAIZKINA KHAIRANY",
  "LUTHFI PUTRA NURROHMAN",
  "MARTHANISA SAFIA DANDELINA",
  "MEIDYNA KARIMA HERMAQIYA",
  "MEISYA NUR ANJANI",
  "MUHAMMAD WAHYU DWI RAHARJO",
  "NAIDA ALYA KIBTHIAH",
  "NASWA FABIA SALSABILLAH",
  "NESSA LESTARI PASTIKA HARVYANA",
  "REVANYA SHASIHZULQIA TAFTAZANI",
  "REYHATUSSYA'DIYAH BUDIMAN",
  "ROSMINDA ROHMATILLAH",
  "SALMA KHAIRUNNISA",
  "TAQIYYATUL ADHWAA YURIKA SAHLA"];
var skip = [];


function kejumlah_kelompok(jumlah_orang) {
  return Math.floor(semua.length/jumlah_orang);
}

function randint(n) {
  return Math.floor(Math.random() * n);
}

function array2d(n) {
  var hasil = [];
  for (var i=0;i<n;i++) {
    hasil.push([]);
  }
  return hasil;
}

function kelompokan(list,orang,forward=true) {
  orang = orang.slice()
  var len = orang.length;
  for (var i=0;i<len;i++) {
    var id = randint(orang.length);
    var nama = orang[id];
    if (skip.includes(nama)) {
      orang.splice(id,1);
      i--;
      len--;
      continue;
    }
    
    var kelompok = i%list.length;
    if(!forward) {
      kelompok = list.length-kelompok-1
    }
    list[kelompok].push(nama);
    orang.splice(id, 1);
  }
  return list;
}

function acak(jumlah_kelompok) {
  var list = array2d(jumlah_kelompok);
  return kelompokan(list,semua);
}

function kebaris2(hasil) {
  var teks = [];
  for (var kelompok in hasil) {
    kelompok++;
    teks.push("*KELOMPOK " + kelompok + "*");
    for (var nama of hasil[kelompok-1]) {
      teks.push(nama);
    }
    teks.push("")
  }
  return teks;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

var jumlah = document.getElementById("jumlah");
var tipe = document.getElementById("tipe");
var nodehasil = document.getElementById("hasil");
var mode = document.getElementById("custom-toggle");
var rolled = false;
var sound = document.getElementById("sound");
var sfx = document.getElementById("sfx");

async function animasi(hasil) {
  for (var i=0; i<hasil.length; i++) {
    await sleep(5);
    if(hasil[i].length==0 || hasil[i][0]=="*") {
      nodehasil.innerHTML = hasil.slice(0,i+1).join("\n")
  nodehasil.style.cssText = 'height:' + nodehasil.scrollHeight + 'px'
      continue;
    }
    for (var j=0; j<10; j++) {
      var str = hasil.slice(0,i);
      str.push(semua[randint(semua.length)]);
      nodehasil.innerHTML = str.join("\n");
  nodehasil.style.cssText = 'height:' + nodehasil.scrollHeight + 'px';
      await sleep(5*j);
    }
    sound.pause();
    sound.currentTime = 0;
    nodehasil.innerHTML = hasil.slice(0,i+1).join("\n");
  }
  //copy(hasil.join("\n"));
  //nodehasil.innerHTML = hasil.join("\n")+"\nSudah dicopy ke clipboard\nJika belum ada, Silahkan copy sendiri";
  //nodehasil.style.cssText = 'height:' + nodehasil.scrollHeight + 'px';
}
function mulai(e) {
  e.innerHTML = "Sudah mulai, ulah mencet deui";
  if(rolled) {return;}
  rolled = true;
  var hasil = "ffff";
  var jumlah_kelompok = jumlah.value;
  if (tipe.value=="orang") {
    jumlah_kelompok = kejumlah_kelompok(jumlah_kelompok);
  }
  hasil = kebaris2(acak(jumlah_kelompok));
  animasi(hasil);
}

var list = document.getElementById("GrupSiswa");
for (var nama of semua) {
  list.innerHTML += "<button type='button' class='nama include'>"+nama+"</button>"
}
for (var e of list.children) {
  e.addEventListener("click", toggle);
}

var teksmode = document.getElementById("teks_mode");

function toggle() {
  sfx.play()
  this.classList.toggle("include");
  var index = skip.indexOf(this.innerHTML);
if (index == -1) {
  skip.push(this.innerHTML);
} else {
  skip.splice(index, 1);
}
}

function copy(txt) {
  sfx.play()
  navigator.clipboard.writeText(txt);
  nodehasil.select();
	document.execCommand("copy");
	window.getSelection().removeAllRanges();
}

function exclude(e) {
  sfx.play();
  e.classList.toggle("include");
  list.classList.toggle("sembunyikan");
}
