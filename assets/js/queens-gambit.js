window.addEventListener('load',function(){
var CB=window.ChessBoard;if(!CB)return;
var I=CB.InteractiveBoard,rB=CB.renderBoard,IP=CB.INIT_POSITION,dC=CB.deepClonePos,aM=CB.applyMove;
var V={
main:[
{from:''d2'',to:''d4'',san:''d4'',annotation:''Putih membuka dengan d4 - Queen Pawn Opening, menguasai pusat.''},
{from:''d7'',to:''d5'',san:''d5'',annotation:''Hitam merespons simetris - mengklaim pusat dengan d5.''},
{from:''c2'',to:''c4'',san:''c4'',annotation:''Queens Gambit! Putih menawarkan bidak c4 untuk kontrol pusat superior.''},
{from:''e7'',to:''e6'',san:''e6'',annotation:''QGD - Hitam menolak gambit, mendukung d5 dengan e6.''},
{from:''b1'',to:''c3'',san:''Nc3'',annotation:''Kuda berkembang ke c3, mendukung d4 dan menguasai pusat.''},
{from:''g8'',to:''f6'',san:''Nf6'',annotation:''Kuda hitam berkembang, menyerang d5 potensial.''},
{from:''c1'',to:''g5'',san:''Bg5'',annotation:''Gajah aktif di g5! Mengancam mengikat kuda f6.''},
{from:''f8'',to:''e7'',san:''Be7'',annotation:''Hitam melepas ikatan - gajah ke e7.''},
{from:''e2'',to:''e3'',san:''e3'',annotation:''Putih solid - mendukung d4 dan membuka diagonal gajah f1.''},
{from:''e8'',to:''g8'',san:''O-O'',castle:''k'',annotation:''Hitam rokade - raja aman. Posisi QGD klasik yang solid.''},
{from:''f1'',to:''d3'',san:''Bd3'',annotation:''Gajah ke d3 - menekan h7 dan bersiap serangan sisi raja.''},
{from:''b8'',to:''d7'',san:''Nbd7'',annotation:''Kuda hitam ke d7 - mendukung pusat dan bersiap manuver.''}
],
accepted:[
{from:''d2'',to:''d4'',san:''d4'',annotation:''d4.''},
{from:''d7'',to:''d5'',san:''d5'',annotation:''d5.''},
{from:''c2'',to:''c4'',san:''c4'',annotation:''Queens Gambit ditawarkan.''},
{from:''d5'',to:''c4'',san:''dxc4'',annotation:''QGA - Queens Gambit Accepted! Hitam menerima gambit.''},
{from:''e2'',to:''e3'',san:''e3'',annotation:''Putih tidak buru-buru. Berkembang dulu.''},
{from:''g8'',to:''f6'',san:''Nf6'',annotation:''Hitam berkembang cepat.''},
{from:''f1'',to:''c4'',san:''Bxc4'',annotation:''Putih ambil kembali c4 - gajah aktif di diagonal e2-a6.''},
{from:''e7'',to:''e6'',san:''e6'',annotation:''Hitam membuka diagonal gajah.''},
{from:''g1'',to:''f3'',san:''Nf3'',annotation:''Kuda ke kotak ideal.''},
{from:''c7'',to:''c5'',san:''c5'',annotation:''Hitam melawan di pusat! Garis kunci QGA.''},
{from:''d4'',to:''c5'',san:''dxc5'',annotation:''Putih memakan c5 - pusat berubah, permainan terbuka.''},
{from:''f8'',to:''c5'',san:''Bxc5'',annotation:''Hitam ambil kembali dengan gajah aktif.''},
{from:''e1'',to:''g1'',san:''O-O'',castle:''K'',annotation:''Putih rokade - posisi seimbang.''}
],
declined:[
{from:''d2'',to:''d4'',san:''d4'',annotation:''d4.''},
{from:''d7'',to:''d5'',san:''d5'',annotation:''d5.''},
{from:''c2'',to:''c4'',san:''c4'',annotation:''Queens Gambit.''},
{from:''e7'',to:''e6'',san:''e6'',annotation:''QGD - Hitam menolak dengan e6.''},
{from:''b1'',to:''c3'',san:''Nc3'',annotation:''Kuda berkembang.''},
{from:''g8'',to:''f6'',san:''Nf6'',annotation:''Kuda hitam aktif.''},
{from:''g1'',to:''f3'',san:''Nf3'',annotation:''Kuda kedua berkembang.''},
{from:''f8'',to:''e7'',san:''Be7'',annotation:''Hitam berkembang solid.''},
{from:''c1'',to:''f4'',san:''Bf4'',annotation:''Gajah keluar - London System touch.''},
{from:''e8'',to:''g8'',san:''O-O'',castle:''k'',annotation:''Hitam rokade.''},
{from:''e2'',to:''e3'',san:''e3'',annotation:''Putih solid.''},
{from:''c7'',to:''c5'',san:''c5'',annotation:''Hitam melawan di pusat - variasi Tarrasch!''},
{from:''d4'',to:''c5'',san:''dxc5'',annotation:''Putih ambil c5.''},
{from:''f8'',to:''d8'',san:''Rfd8'',annotation:''Benteng hitam aktif di kolom d - tekanan balik kuat.''}
],
slav:[
{from:''d2'',to:''d4'',san:''d4'',annotation:''d4.''},
{from:''d7'',to:''d5'',san:''d5'',annotation:''d5.''},
{from:''c2'',to:''c4'',san:''c4'',annotation:''Queens Gambit.''},
{from:''c7'',to:''c6'',san:''c6'',annotation:''Slav Defense! Mendukung d5 dengan c6 - lebih aktif dari e6.''},
{from:''g1'',to:''f3'',san:''Nf3'',annotation:''Kuda berkembang.''},
{from:''g8'',to:''f6'',san:''Nf6'',annotation:''Kuda hitam aktif.''},
{from:''b1'',to:''c3'',san:''Nc3'',annotation:''Kuda kedua berkembang.''},
{from:''d5'',to:''c4'',san:''dxc4'',annotation:''Hitam ambil c4! Dalam Slav ini lebih solid karena c6 sudah siap.''},
{from:''e2'',to:''e3'',san:''e3'',annotation:''Putih bersiap ambil kembali bidaknya.''},
{from:''c8'',to:''f5'',san:''Bf5'',annotation:''Gajah hitam keluar sebelum terkunci! Keuntungan Slav Defense.''},
{from:''f1'',to:''c4'',san:''Bxc4'',annotation:''Putih mendapatkan kembali bidaknya.''},
{from:''e7'',to:''e6'',san:''e6'',annotation:''Hitam solid dengan e6 - struktur sempurna.''},
{from:''e1'',to:''g1'',san:''O-O'',castle:''K'',annotation:''Putih rokade. Posisi seimbang dan menarik untuk kedua pihak.''}
]};
function sz(){if(window.innerWidth<480)return 38;if(window.innerWidth<768)return 46;if(window.innerWidth<1200)return 54;return 62;}
var h=document.getElementById('heroQueensBoard');if(h){var hp=dC(IP);var hm=[{from:'d2',to:'d4'},{from:'d7',to:'d5'},{from:'c2',to:'c4'}];for(var i=0;i<hm.length;i++)hp=aM(hp,hm[i]);rB(h,hp,sz(),{from:'c2',to:'c4'});}
var av='main',brd=new I({boardEl:document.getElementById('mainBoard'),movesEl:document.getElementById('moveList'),annotationEl:document.getElementById('moveAnnotation'),progressEl:document.getElementById('progressFill'),size:sz(),moves:V[av],onStepChange:function(s){var c=document.getElementById('moveCounter');if(c)c.textContent=s+' / '+V[av].length;}});
var ctr=document.getElementById('moveCounter');if(ctr)ctr.textContent='0 / '+V[av].length;
var bR=document.getElementById('btnReset'),bP=document.getElementById('btnPrev'),bN=document.getElementById('btnNext'),bE=document.getElementById('btnEnd'),bPl=document.getElementById('btnPlay');
if(bR)bR.onclick=function(){brd.reset();};if(bP)bP.onclick=function(){brd.prev();};if(bN)bN.onclick=function(){brd.next();};if(bE)bE.onclick=function(){brd.end();};
if(bPl){bPl.onclick=function(){if(brd.isPlaying()){brd.stopAutoPlay();bPl.textContent='\u25B6 Play';bPl.classList.remove('active');}else{if(brd.currentStep===V[av].length)brd.reset();brd.startAutoPlay(1600);bPl.textContent='\u23F8 Pause';bPl.classList.add('active');brd._onAutoPlayEnd=function(){bPl.textContent='\u25B6 Play';bPl.classList.remove('active');};}};}
document.querySelectorAll('.var-tab').forEach(function(t){t.onclick=function(){document.querySelectorAll('.var-tab').forEach(function(x){x.classList.remove('active');});t.classList.add('active');av=t.dataset.var;brd.stopAutoPlay();if(bPl){bPl.textContent='\u25B6 Play';bPl.classList.remove('active');}brd.loadMoves(V[av]);var c=document.getElementById('moveCounter');if(c)c.textContent='0 / '+V[av].length;};})
document.addEventListener('keydown',function(e){if(e.key==='ArrowRight')brd.next();if(e.key==='ArrowLeft')brd.prev();if(e.key===' '){e.preventDefault();if(bPl)bPl.click();}});
});
