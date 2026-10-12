window.addEventListener('load',function(){
var CB=window.ChessBoard;if(!CB)return;
var I=CB.InteractiveBoard,rB=CB.renderBoard,IP=CB.INIT_POSITION,dC=CB.deepClonePos,aM=CB.applyMove;
var V={
main:[
{from:''e2'',to:''e4'',san:''e4'',annotation:''Putih membuka dengan e4 - menguasai pusat.''},
{from:''e7'',to:''e5'',san:''e5'',annotation:''Respons simetris terkuat. Hitam juga mengklaim pusat.''},
{from:''g1'',to:''f3'',san:''Nf3'',annotation:''Kuda menyerang bidak e5 hitam sekaligus berkembang.''},
{from:''b8'',to:''c6'',san:''Nc6'',annotation:''Kuda hitam mempertahankan bidak e5. Gerakan terkuat.''},
{from:''f1'',to:''c4'',san:''Bc4'',annotation:''Italian Game! Gajah di c4 mengincar kotak f7 yang lemah.''},
{from:''f8'',to:''c5'',san:''Bc5'',annotation:''Hitam simetris - gajah ke diagonal aktif. Giuoco Piano!''},
{from:''c2'',to:''c3'',san:''c3'',annotation:''Putih bersiap mendorong d4 untuk pusat lebih kuat.''},
{from:''g8'',to:''f6'',san:''Nf6'',annotation:''Kuda hitam menyerang bidak e4 sambil berkembang.''},
{from:''d2'',to:''d3'',san:''d3'',annotation:''Pianissimo - putih bermain tenang dan solid.''},
{from:''d7'',to:''d6'',san:''d6'',annotation:''Hitam solid, memperkuat pusat.''}
],
giuoco:[
{from:''e2'',to:''e4'',san:''e4'',annotation:''e4.''},
{from:''e7'',to:''e5'',san:''e5'',annotation:''e5.''},
{from:''g1'',to:''f3'',san:''Nf3'',annotation:''Nf3.''},
{from:''b8'',to:''c6'',san:''Nc6'',annotation:''Nc6.''},
{from:''f1'',to:''c4'',san:''Bc4'',annotation:''Italian Game.''},
{from:''f8'',to:''c5'',san:''Bc5'',annotation:''Giuoco Piano - gajah simetris.''},
{from:''c2'',to:''c3'',san:''c3'',annotation:''Bersiap mendorong d4.''},
{from:''g8'',to:''f6'',san:''Nf6'',annotation:''Kuda aktif menyerang e4.''},
{from:''d2'',to:''d4'',san:''d4'',annotation:''Giuoco Piano! Pusat dibuka - permainan taktis.''},
{from:''e5'',to:''d4'',san:''exd4'',annotation:''Hitam memakan d4 - pilihan umum.''},
{from:''c3'',to:''d4'',san:''cxd4'',annotation:''Putih ambil kembali - gajah c5 terancam.''},
{from:''c5'',to:''b4'',san:''Bb4+'',annotation:''Skak! Gajah hitam pindah ke tempat aman.''},
{from:''c1'',to:''d2'',san:''Bd2'',annotation:''Putih memblok skak - pertukaran gajah terjadi.''}
],
pianissimo:[
{from:''e2'',to:''e4'',san:''e4'',annotation:''e4.''},
{from:''e7'',to:''e5'',san:''e5'',annotation:''e5.''},
{from:''g1'',to:''f3'',san:''Nf3'',annotation:''Nf3.''},
{from:''b8'',to:''c6'',san:''Nc6'',annotation:''Nc6.''},
{from:''f1'',to:''c4'',san:''Bc4'',annotation:''Italian Game.''},
{from:''f8'',to:''c5'',san:''Bc5'',annotation:''Bc5 simetris.''},
{from:''d2'',to:''d3'',san:''d3'',annotation:''Giuoco Pianissimo - sangat tenang dan solid.''},
{from:''g8'',to:''f6'',san:''Nf6'',annotation:''Kuda hitam aktif.''},
{from:''c2'',to:''c3'',san:''c3'',annotation:''Bersiap d4 di waktu yang tepat.''},
{from:''d7'',to:''d6'',san:''d6'',annotation:''Hitam solid - posisi Pianissimo khas.''},
{from:''b1'',to:''d2'',san:''Nbd2'',annotation:''Kuda kedua berkembang ke d2.''},
{from:''e8'',to:''g8'',san:''O-O'',castle:''k'',annotation:''Hitam rokade - raja aman.''},
{from:''e1'',to:''g1'',san:''O-O'',castle:''K'',annotation:''Putih rokade - posisi seimbang.''}
],
fried_liver:[
{from:''e2'',to:''e4'',san:''e4'',annotation:''e4.''},
{from:''e7'',to:''e5'',san:''e5'',annotation:''e5.''},
{from:''g1'',to:''f3'',san:''Nf3'',annotation:''Nf3.''},
{from:''b8'',to:''c6'',san:''Nc6'',annotation:''Nc6.''},
{from:''f1'',to:''c4'',san:''Bc4'',annotation:''Italian Game - gajah mengincar f7.''},
{from:''g8'',to:''f6'',san:''Nf6'',annotation:''Two Knights Defense - hitam melawan aktif!''},
{from:''f3'',to:''g5'',san:''Ng5'',annotation:''Putih langsung menyerang f7! Ng5 mengancam Nxf7.''},
{from:''d7'',to:''d5'',san:''d5'',annotation:''Satu-satunya respons terbaik! Hitam lawan di pusat.''},
{from:''e4'',to:''d5'',san:''exd5'',annotation:''Putih memakan bidak d5.''},
{from:''f6'',to:''d5'',san:''Nxd5'',annotation:''Kuda hitam ambil kembali - tapi f7 kini hanya dijaga raja!''},
{from:''c4'',to:''f7'',san:''Nxf7!'',annotation:''FRIED LIVER ATTACK! Pengorbanan kuda spektakuler di f7!''},
{from:''e8'',to:''f7'',san:''Kxf7'',annotation:''Raja terpaksa ambil kuda - terbuka di tengah papan!''},
{from:''d1'',to:''f3'',san:''Qf3+'',annotation:''Skak dengan ratu! Raja hitam dalam bahaya besar.''}
]};
function sz(){if(window.innerWidth<480)return 38;if(window.innerWidth<768)return 46;if(window.innerWidth<1200)return 54;return 62;}
var h=document.getElementById('heroItalianBoard');if(h){var hp=dC(IP);var hm=[{from:'e2',to:'e4'},{from:'e7',to:'e5'},{from:'g1',to:'f3'},{from:'b8',to:'c6'},{from:'f1',to:'c4'}];for(var i=0;i<hm.length;i++)hp=aM(hp,hm[i]);rB(h,hp,sz(),{from:'f1',to:'c4'});}
var av='main',brd=new I({boardEl:document.getElementById('mainBoard'),movesEl:document.getElementById('moveList'),annotationEl:document.getElementById('moveAnnotation'),progressEl:document.getElementById('progressFill'),size:sz(),moves:V[av],onStepChange:function(s){var c=document.getElementById('moveCounter');if(c)c.textContent=s+' / '+V[av].length;}});
var ctr=document.getElementById('moveCounter');if(ctr)ctr.textContent='0 / '+V[av].length;
var bR=document.getElementById('btnReset'),bP=document.getElementById('btnPrev'),bN=document.getElementById('btnNext'),bE=document.getElementById('btnEnd'),bPl=document.getElementById('btnPlay');
if(bR)bR.onclick=function(){brd.reset();};if(bP)bP.onclick=function(){brd.prev();};if(bN)bN.onclick=function(){brd.next();};if(bE)bE.onclick=function(){brd.end();};
if(bPl){bPl.onclick=function(){if(brd.isPlaying()){brd.stopAutoPlay();bPl.textContent='\u25B6 Play';bPl.classList.remove('active');}else{if(brd.currentStep===V[av].length)brd.reset();brd.startAutoPlay(1600);bPl.textContent='\u23F8 Pause';bPl.classList.add('active');brd._onAutoPlayEnd=function(){bPl.textContent='\u25B6 Play';bPl.classList.remove('active');};}};}
document.querySelectorAll('.var-tab').forEach(function(t){t.onclick=function(){document.querySelectorAll('.var-tab').forEach(function(x){x.classList.remove('active');});t.classList.add('active');av=t.dataset.var;brd.stopAutoPlay();if(bPl){bPl.textContent='\u25B6 Play';bPl.classList.remove('active');}brd.loadMoves(V[av]);var c=document.getElementById('moveCounter');if(c)c.textContent='0 / '+V[av].length;};})
document.addEventListener('keydown',function(e){if(e.key==='ArrowRight')brd.next();if(e.key==='ArrowLeft')brd.prev();if(e.key===' '){e.preventDefault();if(bPl)bPl.click();}});
});
