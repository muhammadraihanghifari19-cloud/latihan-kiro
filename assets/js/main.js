/* ============================================================
   main.js — Home page logic
   ============================================================ */
'use strict';

// ---- Navbar scroll effect ----
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  });
}

// ---- Hamburger menu ----
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
}

// ---- Floating pieces animation ----
const floatingPieces = document.getElementById('floatingPieces');
if (floatingPieces) {
  const symbols = ['♟','♜','♝','♞','♛','♔','♗','♘'];
  for (let i = 0; i < 20; i++) {
    const el = document.createElement('div');
    el.className = 'fp';
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    el.style.left = Math.random() * 100 + '%';
    el.style.animationDelay = (Math.random() * 20) + 's';
    el.style.animationDuration = (14 + Math.random() * 14) + 's';
    el.style.fontSize = (1.5 + Math.random() * 2.5) + 'rem';
    floatingPieces.appendChild(el);
  }
}

// ---- Hero board (animated demo) ----
const heroBoard = document.getElementById('heroBoard');
if (heroBoard && window.ChessBoard) {
  const { InteractiveBoard } = window.ChessBoard;
  const heroMoves = [
    { from: 'e2', to: 'e4', san: 'e4',  annotation: 'Gerakan pembuka klasik.' },
    { from: 'e7', to: 'e5', san: 'e5',  annotation: 'Hitam meniru dan mengklaim pusat.' },
    { from: 'g1', to: 'f3', san: 'Nf3', annotation: 'Kuda menyerang bidak e5.' },
    { from: 'b8', to: 'c6', san: 'Nc6', annotation: 'Kuda mempertahankan bidak e5.' },
    { from: 'f1', to: 'c4', san: 'Bc4', annotation: 'Italian Game — gajah mengincar f7!' },
    { from: 'f8', to: 'c5', san: 'Bc5', annotation: 'Hitam mengembangkan gajah dengan simetris.' },
  ];
  const iBoard = new InteractiveBoard({
    boardEl: heroBoard,
    size: window.innerWidth < 768 ? 44 : 58,
    moves: heroMoves,
  });
  iBoard.goTo(6);
}

// ---- Preview boards on cards ----
if (window.ChessBoard) {
  const { renderPreviewBoard } = window.ChessBoard;
  const sqSz = window.innerWidth < 480 ? 24 : 29;

  // Ruy Lopez: 1.e4 e5 2.Nf3 Nc6 3.Bb5
  renderPreviewBoard('previewRuy', [
    { from: 'e2', to: 'e4', san: 'e4' },
    { from: 'e7', to: 'e5', san: 'e5' },
    { from: 'g1', to: 'f3', san: 'Nf3' },
    { from: 'b8', to: 'c6', san: 'Nc6' },
    { from: 'f1', to: 'b5', san: 'Bb5' },
  ], sqSz);

  // Italian Game: 1.e4 e5 2.Nf3 Nc6 3.Bc4
  renderPreviewBoard('previewItalian', [
    { from: 'e2', to: 'e4', san: 'e4' },
    { from: 'e7', to: 'e5', san: 'e5' },
    { from: 'g1', to: 'f3', san: 'Nf3' },
    { from: 'b8', to: 'c6', san: 'Nc6' },
    { from: 'f1', to: 'c4', san: 'Bc4' },
  ], sqSz);

  // Queen's Gambit: 1.d4 d5 2.c4
  renderPreviewBoard('previewQueens', [
    { from: 'd2', to: 'd4', san: 'd4' },
    { from: 'd7', to: 'd5', san: 'd5' },
    { from: 'c2', to: 'c4', san: 'c4' },
  ], sqSz);
}

// ---- Intersection Observer for AOS-like animations ----
const aosEls = document.querySelectorAll('[data-aos], .about-card');
if (aosEls.length) {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => entry.target.classList.add('visible'), parseInt(delay));
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  aosEls.forEach(el => obs.observe(el));
}
