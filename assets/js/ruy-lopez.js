window.addEventListener('load',function(){
var CB=window.ChessBoard;if(!CB)return;
var I=CB.InteractiveBoard,rB=CB.renderBoard,IP=CB.INIT_POSITION,dC=CB.deepClonePos,aM=CB.applyMove;
var V={
main:[
{from:''e2'',to:''e4'',san:''e4'',annotation:''Gerakan pembuka paling populer. Menguasai pusat.''},
{from:''e7'',to:''e5'',san:''e5'',annotation:''Respons simetris. Hitam juga mengklaim pusat.''},
{from:''g1'',to:''f3'',san:''Nf3'',annotation:''Kuda ke kotak aktif, menyerang bidak e5 hitam.''},
{from:''b8'',to:''c6'',san:''Nc6'',annotation:''Kuda keluar mempertahankan bidak e5.''},
{from:''f1'',to:''b5'',san:''Bb5'',annotation:''Inilah Ruy Lopez! Gajah menyerang kuda c6 penjaga e5.''},
{from:''a7'',to:''a6'',san:''a6'',annotation:''Morphy Defense. Hitam menantang gajah!''},
{from:''b5'',to:''a4'',san:''Ba4'',annotation:''Gajah mundur ke a4, masih menekan.''},
{from:''g8'',to:''f6'',san:''Nf6'',annotation:''Kuda hitam menyerang bidak e4 putih.''},
{from:''e1'',to:''g1'',san:''O-O'',castle:''K'',annotation:''Putih rokade - raja aman, benteng aktif.''},
{from:''f8'',to:''e7'',san:''Be7'',annotation:''Hitam bersiap rokade.''}
],
closed:[
{from:''e2'',to:''e4'',san:''e4'',annotation:''e4.''},
{from:''e7'',to:''e5'',san:''e5'',annotation:''e5.''},
{from:''g1'',to:''f3'',san:''Nf3'',annotation:''Nf3.''},
{from:''b8'',to:''c6'',san:''Nc6'',annotation:''Nc6.''},
{from:''f1'',to:''b5'',san:''Bb5'',annotation:''Ruy Lopez.''},
{from:''a7'',to:''a6'',san:''a6'',annotation:''Morphy Defense.''},
{from:''b5'',to:''a4'',san:''Ba4'',annotation:''Gajah mundur.''},
{from:''g8'',to:''f6'',san:''Nf6'',annotation:''Kuda aktif.''},
{from:''e1'',to:''g1'',san:''O-O'',castle:''K'',annotation:''Putih rokade.''},
{from:''f8'',to:''e7'',san:''Be7'',annotation:''Hitam bersiap rokade.''},
{from:''f1'',to:''e1'',san:''Re1'',annotation:''Benteng aktif di kolom e.''},
{from:''b7'',to:''b5'',san:''b5'',annotation:''Hitam mendorong b5 mengusir gajah a4.''},
{from:''a4'',to:''b3'',san:''Bb3'',annotation:''Gajah mundur ke b3.''},
{from:''d7'',to:''d6'',san:''d6'',annotation:''Closed Variation! Struktur solid.''},
{from:''c2'',to:''c3'',san:''c3'',annotation:''Bersiap mendorong d4.''},
{from:''e8'',to:''g8'',san:''O-O'',castle:''k'',annotation:''Hitam rokade.''}
],
open:[
{from:''e2'',to:''e4'',san:''e4'',annotation:''e4.''},
{from:''e7'',to:''e5'',san:''e5'',annotation:''e5.''},
{from:''g1'',to:''f3'',san:''Nf3'',annotation:''Nf3.''},
{from:''b8'',to:''c6'',san:''Nc6'',annotation:''Nc6.''},
{from:''f1'',to:''b5'',san:''Bb5'',annotation:''Ruy Lopez.''},
{from:''a7'',to:''a6'',san:''a6'',annotation:''a6.''},
{from:''b5'',to:''a4'',san:''Ba4'',annotation:''Ba4.''},
{from:''g8'',to:''f6'',san:''Nf6'',annotation:''Nf6.''},
{from:''e1'',to:''g1'',san:''O-O'',castle:''K'',annotation:''O-O.''},
{from:''f6'',to:''e4'',san:''Nxe4'',annotation:''Open Variation! Hitam memakan e4.''},
{from:''d2'',to:''d4'',san:''d4'',annotation:''Putih membuka pusat.''},
{from:''b7'',to:''b5'',san:''b5'',annotation:''Hitam mengusir gajah.''},
{from:''a4'',to:''b3'',san:''Bb3'',annotation:''Gajah ke b3.''},
{from:''d7'',to:''d5'',san:''d5'',annotation:''Hitam membangun pusat kuat!''}
],
berlin:[
{from:''e2'',to:''e4'',san:''e4'',annotation:''e4.''},
{from:''e7'',to:''e5'',san:''e5'',annotation:''e5.''},
{from:''g1'',to:''f3'',san:''Nf3'',annotation:''Nf3.''},
{from:''b8'',to:''c6'',san:''Nc6'',annotation:''Nc6.''},
{from:''f1'',to:''b5'',san:''Bb5'',annotation:''Bb5 Ruy Lopez.''},
{from:''g8'',to:''f6'',san:''Nf6'',annotation:''Berlin Defense! Langsung menyerang e4.''},
{from:''e1'',to:''g1'',san:''O-O'',castle:''K'',annotation:''Putih rokade.''},
{from:''f6'',to:''e4'',san:''Nxe4'',annotation:''Hitam memakan e4!''},
{from:''d2'',to:''d4'',san:''d4'',annotation:''Putih membuka pusat.''},
{from:''e4'',to:''d6'',san:''Nd6'',annotation:''Kuda mundur ke d6 - posisi khas Berlin.''},
{from:''b5'',to:''c6'',san:''Bxc6'',annotation:''Putih menukar gajah dengan kuda.''},
{from:''d7'',to:''c6'',san:''dxc6'',annotation:''Hitam mengambil kembali.''},
{from:''d4'',to:''e5'',san:''dxe5'',annotation:''Putih memakan e5.''},
{from:''d6'',to:''f5'',san:''Nf5'',annotation:''Kuda aktif kembali - Berlin solid.''}
]};
function sz(){if(window.innerWidth<480)return 38;if(window.innerWidth<768)return 46;if(window.innerWidth<1200)return 54;return 62;}
var h=document.getElementById('heroRuyBoard');if(h){var hp=dC(IP);var hm=[{from:'e2',to:'e4'},{from:'e7',to:'e5'},{from:'g1',to:'f3'},{from:'b8',to:'c6'},{from:'f1',to:'b5'}];for(var i=0;i<hm.length;i++)hp=aM(hp,hm[i]);rB(h,hp,sz(),{from:'f1',to:'b5'});}
var av='main',brd=new I({boardEl:document.getElementById('mainBoard'),movesEl:document.getElementById('moveList'),annotationEl:document.getElementById('moveAnnotation'),progressEl:document.getElementById('progressFill'),size:sz(),moves:V[av],onStepChange:function(s){var c=document.getElementById('moveCounter');if(c)c.textContent=s+' / '+V[av].length;}});
var ctr=document.getElementById('moveCounter');if(ctr)ctr.textContent='0 / '+V[av].length;
var bR=document.getElementById('btnReset'),bP=document.getElementById('btnPrev'),bN=document.getElementById('btnNext'),bE=document.getElementById('btnEnd'),bPl=document.getElementById('btnPlay');
if(bR)bR.onclick=function(){brd.reset();};if(bP)bP.onclick=function(){brd.prev();};if(bN)bN.onclick=function(){brd.next();};if(bE)bE.onclick=function(){brd.end();};
if(bPl){bPl.onclick=function(){if(brd.isPlaying()){brd.stopAutoPlay();bPl.textContent='\u25B6 Play';bPl.classList.remove('active');}else{if(brd.currentStep===V[av].length)brd.reset();brd.startAutoPlay(1600);bPl.textContent='\u23F8 Pause';bPl.classList.add('active');brd._onAutoPlayEnd=function(){bPl.textContent='\u25B6 Play';bPl.classList.remove('active');};}};}
document.querySelectorAll('.var-tab').forEach(function(t){t.onclick=function(){document.querySelectorAll('.var-tab').forEach(function(x){x.classList.remove('active');});t.classList.add('active');av=t.dataset.var;brd.stopAutoPlay();if(bPl){bPl.textContent='\u25B6 Play';bPl.classList.remove('active');}brd.loadMoves(V[av]);var c=document.getElementById('moveCounter');if(c)c.textContent='0 / '+V[av].length;};})
document.addEventListener('keydown',function(e){if(e.key==='ArrowRight')brd.next();if(e.key==='ArrowLeft')brd.prev();if(e.key===' '){e.preventDefault();if(bPl)bPl.click();}});
});
