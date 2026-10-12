/* ============================================================
   chess-board.js — Reusable Interactive Chess Board Engine
   ============================================================ */

'use strict';

// Unicode chess pieces
const PIECES = {
  wK: '♔', wQ: '♕', wR: '♖', wB: '♗', wN: '♘', wP: '♙',
  bK: '♚', bQ: '♛', bR: '♜', bB: '♝', bN: '♞', bP: '♟'
};

// Standard starting position (rank 8 → rank 1, file a → h)
const INIT_POSITION = [
  ['bR','bN','bB','bQ','bK','bB','bN','bR'],
  ['bP','bP','bP','bP','bP','bP','bP','bP'],
  [null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null],
  ['wP','wP','wP','wP','wP','wP','wP','wP'],
  ['wR','wN','wB','wQ','wK','wB','wN','wR']
];

/* ----
   Render a static chess board into a DOM element.
   pos: 8×8 array (rank 8 first), size: pixel size per square
   ---- */
function renderBoard(container, pos, size = 52, highlights = {}) {
  container.innerHTML = '';
  const board = document.createElement('div');
  board.className = 'chess-board';
  board.style.width = (size * 8) + 'px';
  board.style.fontSize = Math.floor(size * 0.62) + 'px';

  for (let rank = 0; rank < 8; rank++) {
    for (let file = 0; file < 8; file++) {
      const sq = document.createElement('div');
      sq.style.width = size + 'px';
      sq.style.height = size + 'px';
      sq.className = 'sq ' + ((rank + file) % 2 === 0 ? 'light' : 'dark');
      sq.dataset.rank = rank;
      sq.dataset.file = file;

      const key = rankFileToKey(rank, file);
      if (highlights.from === key) sq.classList.add('highlight-from');
      if (highlights.to === key)   sq.classList.add('highlight-to');

      const piece = pos[rank][file];
      if (piece) {
        const span = document.createElement('span');
        span.className = 'piece ' + (piece[0] === 'w' ? 'white' : 'black');
        span.textContent = PIECES[piece];
        sq.appendChild(span);
      }
      board.appendChild(sq);
    }
  }
  container.appendChild(board);
}

function rankFileToKey(rank, file) {
  return String.fromCharCode(97 + file) + (8 - rank);
}

function keyToRankFile(key) {
  return { file: key.charCodeAt(0) - 97, rank: 8 - parseInt(key[1]) };
}

/* ----
   Apply a list of moves (simplified algebraic) to a position clone.
   Each move: { from: 'e2', to: 'e4', promo: null }
   Returns new position array.
   ---- */
function applyMove(pos, move) {
  const p = deepClonePos(pos);
  const from = keyToRankFile(move.from);
  const to   = keyToRankFile(move.to);
  p[to.rank][to.file] = move.promo || p[from.rank][from.file];
  p[from.rank][from.file] = null;
  // Handle castling
  if (move.castle) {
    if (move.castle === 'K') { p[7][5] = 'wR'; p[7][7] = null; }
    if (move.castle === 'Q') { p[7][3] = 'wR'; p[7][0] = null; }
    if (move.castle === 'k') { p[0][5] = 'bR'; p[0][7] = null; }
    if (move.castle === 'q') { p[0][3] = 'bR'; p[0][0] = null; }
  }
  return p;
}

function deepClonePos(pos) {
  return pos.map(row => [...row]);
}

/* ----
   Build positions array from a moves sequence.
   moves: [{ from, to, san, annotation, castle }]
   ---- */
function buildPositions(moves) {
  const positions = [deepClonePos(INIT_POSITION)];
  let cur = deepClonePos(INIT_POSITION);
  for (const mv of moves) {
    cur = applyMove(cur, mv);
    positions.push(deepClonePos(cur));
  }
  return positions;
}

/* ============================================================
   InteractiveBoard — full-featured board widget
   ============================================================ */
class InteractiveBoard {
  constructor({ boardEl, movesEl, annotationEl, progressEl, size = 60, moves = [], onStepChange }) {
    this.boardEl      = boardEl;
    this.movesEl      = movesEl;
    this.annotationEl = annotationEl;
    this.progressEl   = progressEl;
    this.size         = size;
    this.moves        = moves;
    this.positions    = buildPositions(moves);
    this.currentStep  = 0;
    this.autoPlay     = null;
    this.onStepChange = onStepChange || null;
    this._renderBoard();
    this._renderMoveList();
    this._updateAnnotation();
  }

  _renderBoard() {
    const pos = this.positions[this.currentStep];
    const highlights = this.currentStep > 0
      ? { from: this.moves[this.currentStep - 1].from, to: this.moves[this.currentStep - 1].to }
      : {};
    renderBoard(this.boardEl, pos, this.size, highlights);
    // Animate the last piece
    if (this.currentStep > 0) {
      const toKey = this.moves[this.currentStep - 1].to;
      const { rank, file } = keyToRankFile(toKey);
      const idx = rank * 8 + file;
      const squares = this.boardEl.querySelectorAll('.sq');
      if (squares[idx]) {
        const pieceEl = squares[idx].querySelector('.piece');
        if (pieceEl) {
          pieceEl.classList.add('animated');
          setTimeout(() => pieceEl.classList.remove('animated'), 400);
        }
      }
    }
    if (this.progressEl) {
      const pct = this.moves.length ? (this.currentStep / this.moves.length) * 100 : 0;
      this.progressEl.style.width = pct + '%';
    }
    if (this.onStepChange) this.onStepChange(this.currentStep);
  }

  _renderMoveList() {
    if (!this.movesEl) return;
    this.movesEl.innerHTML = '';
    for (let i = 0; i < this.moves.length; i += 2) {
      const numEl = document.createElement('span');
      numEl.className = 'move-num';
      numEl.textContent = (Math.floor(i / 2) + 1) + '.';
      this.movesEl.appendChild(numEl);

      const wBtn = document.createElement('button');
      wBtn.className = 'move-btn' + (this.currentStep === i + 1 ? ' active' : '');
      wBtn.textContent = this.moves[i].san;
      wBtn.dataset.step = i + 1;
      wBtn.addEventListener('click', () => this.goTo(parseInt(wBtn.dataset.step)));
      this.movesEl.appendChild(wBtn);

      if (i + 1 < this.moves.length) {
        const bBtn = document.createElement('button');
        bBtn.className = 'move-btn' + (this.currentStep === i + 2 ? ' active' : '');
        bBtn.textContent = this.moves[i + 1].san;
        bBtn.dataset.step = i + 2;
        bBtn.addEventListener('click', () => this.goTo(parseInt(bBtn.dataset.step)));
        this.movesEl.appendChild(bBtn);
      } else {
        // empty cell
        const empty = document.createElement('span');
        this.movesEl.appendChild(empty);
      }
    }
  }

  _updateAnnotation() {
    if (!this.annotationEl) return;
    if (this.currentStep === 0) {
      this.annotationEl.innerHTML = '<strong>Posisi awal.</strong> Klik tombol ▶ atau pilih gerakan di daftar untuk memulai.';
    } else {
      const mv = this.moves[this.currentStep - 1];
      const mover = (this.currentStep % 2 === 1) ? '⬜ Putih' : '⬛ Hitam';
      this.annotationEl.innerHTML = `<strong>${mover}: ${mv.san}</strong> — ${mv.annotation || ''}`;
    }
  }

  _updateMoveBtns() {
    if (!this.movesEl) return;
    this.movesEl.querySelectorAll('.move-btn').forEach(btn => {
      const step = parseInt(btn.dataset.step);
      btn.classList.toggle('active', step === this.currentStep);
    });
  }

  goTo(step) {
    if (step < 0 || step > this.moves.length) return;
    this.currentStep = step;
    this._renderBoard();
    this._updateMoveBtns();
    this._updateAnnotation();
    this._scrollActiveMoveIntoView();
  }

  next() { if (this.currentStep < this.moves.length) this.goTo(this.currentStep + 1); }
  prev() { if (this.currentStep > 0) this.goTo(this.currentStep - 1); }
  reset() { this.goTo(0); }
  end()   { this.goTo(this.moves.length); }

  startAutoPlay(interval = 1800) {
    this.stopAutoPlay();
    this.autoPlay = setInterval(() => {
      if (this.currentStep < this.moves.length) {
        this.next();
      } else {
        this.stopAutoPlay();
        if (this._onAutoPlayEnd) this._onAutoPlayEnd();
      }
    }, interval);
  }

  stopAutoPlay() {
    if (this.autoPlay) { clearInterval(this.autoPlay); this.autoPlay = null; }
  }

  isPlaying() { return this.autoPlay !== null; }

  _scrollActiveMoveIntoView() {
    if (!this.movesEl) return;
    const active = this.movesEl.querySelector('.move-btn.active');
    if (active) active.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }

  // Rebuild with new moves set (for variation switching)
  loadMoves(moves) {
    this.stopAutoPlay();
    this.moves = moves;
    this.positions = buildPositions(moves);
    this.currentStep = 0;
    this._renderBoard();
    this._renderMoveList();
    this._updateAnnotation();
  }
}

/* ============================================================
   Mini preview board (static, for cards)
   ============================================================ */
function renderPreviewBoard(containerId, moves, sqSize = 28) {
  const el = document.getElementById(containerId);
  if (!el) return;
  let pos = deepClonePos(INIT_POSITION);
  for (const mv of moves) pos = applyMove(pos, mv);
  const highlights = moves.length > 0
    ? { from: moves[moves.length - 1].from, to: moves[moves.length - 1].to }
    : {};
  renderBoard(el, pos, sqSize, highlights);
}

/* export to global */
window.ChessBoard = { InteractiveBoard, renderBoard, renderPreviewBoard, INIT_POSITION, deepClonePos, applyMove, buildPositions, PIECES };
