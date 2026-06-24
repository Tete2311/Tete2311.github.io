/* =========================================================
   Calculadora Pro — lógica de la aplicación (sin dependencias)
   ========================================================= */

/* ---------------------------------------------------------
   1. Evaluador seguro de expresiones (tokenizer + parser)
   No usa eval(): tokeniza y evalúa con descenso recursivo.
   --------------------------------------------------------- */

const DEG = { enabled: true }; // modo grados activado por defecto

const CONSTANTS = {
  pi: Math.PI,
  e: Math.E,
};

function factorial(n) {
  if (n < 0) throw new Error("El factorial no admite negativos");
  if (!Number.isInteger(n)) throw new Error("El factorial requiere un entero");
  if (n > 170) throw new Error("Número demasiado grande");
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}

const toRad = (x) => (DEG.enabled ? (x * Math.PI) / 180 : x);
const fromRad = (x) => (DEG.enabled ? (x * 180) / Math.PI : x);

const FUNCTIONS = {
  sin: (x) => Math.sin(toRad(x)),
  cos: (x) => Math.cos(toRad(x)),
  tan: (x) => Math.tan(toRad(x)),
  asin: (x) => fromRad(Math.asin(x)),
  acos: (x) => fromRad(Math.acos(x)),
  atan: (x) => fromRad(Math.atan(x)),
  sinh: Math.sinh,
  cosh: Math.cosh,
  tanh: Math.tanh,
  ln: Math.log,
  log: Math.log,
  log10: Math.log10,
  log2: Math.log2,
  exp: Math.exp,
  sqrt: Math.sqrt,
  cbrt: Math.cbrt,
  abs: Math.abs,
  floor: Math.floor,
  ceil: Math.ceil,
  round: Math.round,
  factorial: factorial,
};

// --- Tokenizer ---
function tokenize(input) {
  const tokens = [];
  let i = 0;
  const isDigit = (c) => c >= "0" && c <= "9";
  const isAlpha = (c) => /[a-zA-Z]/.test(c);

  while (i < input.length) {
    const c = input[i];
    if (c === " " || c === "\t") { i++; continue; }

    if (isDigit(c) || (c === "." && isDigit(input[i + 1]))) {
      let num = "";
      while (i < input.length && (isDigit(input[i]) || input[i] === ".")) num += input[i++];
      tokens.push({ type: "num", value: parseFloat(num) });
      continue;
    }

    if (isAlpha(c)) {
      let name = "";
      while (i < input.length && /[a-zA-Z0-9_]/.test(input[i])) name += input[i++];
      // operador textual "mod"
      if (name === "mod") tokens.push({ type: "op", value: "%" });
      else if (name in CONSTANTS) tokens.push({ type: "num", value: CONSTANTS[name] });
      else if (name in FUNCTIONS) tokens.push({ type: "func", value: name });
      else throw new Error(`Símbolo desconocido: ${name}`);
      continue;
    }

    // operador de división entera "//"
    if (c === "/" && input[i + 1] === "/") { tokens.push({ type: "op", value: "//" }); i += 2; continue; }

    if ("+-*/^%".includes(c)) { tokens.push({ type: "op", value: c }); i++; continue; }
    if (c === "(") { tokens.push({ type: "lparen" }); i++; continue; }
    if (c === ")") { tokens.push({ type: "rparen" }); i++; continue; }
    if (c === ",") { tokens.push({ type: "comma" }); i++; continue; }

    throw new Error(`Carácter no permitido: ${c}`);
  }
  return tokens;
}

// --- Parser (precedencia: +- < */% // < ^ < unario < función/paréntesis) ---
function parseExpression(tokens) {
  let pos = 0;
  const peek = () => tokens[pos];
  const next = () => tokens[pos++];

  function parseAddSub() {
    let left = parseMulDiv();
    while (peek() && peek().type === "op" && (peek().value === "+" || peek().value === "-")) {
      const op = next().value;
      const right = parseMulDiv();
      left = op === "+" ? left + right : left - right;
    }
    return left;
  }

  function parseMulDiv() {
    let left = parseUnary();
    while (peek() && peek().type === "op" && ["*", "/", "%", "//"].includes(peek().value)) {
      const op = next().value;
      const right = parseUnary();
      if (op === "*") left = left * right;
      else if (op === "/") { if (right === 0) throw new Error("División por cero"); left = left / right; }
      else if (op === "%") { if (right === 0) throw new Error("Módulo por cero"); left = left % right; }
      else if (op === "//") { if (right === 0) throw new Error("División por cero"); left = Math.floor(left / right); }
    }
    return left;
  }

  // El unario menos tiene menor prioridad que '^' (así -2^2 = -(2^2) = -4)
  function parseUnary() {
    if (peek() && peek().type === "op" && (peek().value === "+" || peek().value === "-")) {
      const op = next().value;
      const operand = parseUnary();
      return op === "-" ? -operand : operand;
    }
    return parsePower();
  }

  function parsePower() {
    const left = parsePrimary();
    if (peek() && peek().type === "op" && peek().value === "^") {
      next();
      const right = parseUnary(); // permite 2^-3 y asociatividad a la derecha
      return Math.pow(left, right);
    }
    return left;
  }

  function parsePrimary() {
    const t = peek();
    if (!t) throw new Error("Expresión incompleta");

    if (t.type === "num") { next(); return t.value; }

    if (t.type === "func") {
      next();
      if (!peek() || peek().type !== "lparen") throw new Error(`Falta '(' tras ${t.value}`);
      next(); // (
      const arg = parseAddSub();
      if (!peek() || peek().type !== "rparen") throw new Error("Falta ')'");
      next(); // )
      return FUNCTIONS[t.value](arg);
    }

    if (t.type === "lparen") {
      next();
      const val = parseAddSub();
      if (!peek() || peek().type !== "rparen") throw new Error("Falta ')'");
      next();
      return val;
    }

    throw new Error("Token inesperado");
  }

  const result = parseAddSub();
  if (pos < tokens.length) throw new Error("Expresión inválida");
  return result;
}

function evaluate(expr) {
  if (!expr || !expr.trim()) return null;
  const tokens = tokenize(expr);
  if (tokens.length === 0) return null;
  const value = parseExpression(tokens);
  if (typeof value !== "number" || Number.isNaN(value)) throw new Error("Resultado no válido");
  if (!Number.isFinite(value)) throw new Error("Resultado infinito");
  return value;
}

// Formatea números evitando ruido de coma flotante
function formatNumber(n) {
  if (typeof n !== "number") return String(n);
  if (Number.isInteger(n)) return n.toString();
  const rounded = parseFloat(n.toPrecision(12));
  return rounded.toString();
}

/* ---------------------------------------------------------
   2. Estado de la calculadora (display, memoria, ANS)
   --------------------------------------------------------- */
const state = {
  ans: 0,
  memory: 0,
  hasMemory: false,
  history: JSON.parse(localStorage.getItem("calc-history") || "[]"),
};

const els = {
  main: document.getElementById("display-main"),
  preview: document.getElementById("display-preview"),
  histLine: document.getElementById("display-history"),
  memIndicator: document.getElementById("mem-indicator"),
  historyList: document.getElementById("history-list"),
  degToggle: document.getElementById("deg-toggle"),
  sciKeys: document.getElementById("keys-scientific"),
};

// Sustituye símbolos visuales por sintaxis válida al insertar
function insertText(text) {
  const el = els.main;
  const start = el.selectionStart ?? el.value.length;
  const end = el.selectionEnd ?? el.value.length;
  el.value = el.value.slice(0, start) + text + el.value.slice(end);
  const caret = start + text.length;
  el.setSelectionRange(caret, caret);
  el.focus();
  updatePreview();
}

function updatePreview() {
  const expr = els.main.value;
  if (!expr.trim()) { els.preview.textContent = ""; els.preview.classList.remove("error"); return; }
  try {
    const result = evaluate(expr.replace(/ANS/g, `(${state.ans})`));
    els.preview.textContent = result === null ? "" : "= " + formatNumber(result);
    els.preview.classList.remove("error");
  } catch (e) {
    els.preview.textContent = "";
    els.preview.classList.remove("error");
  }
}

function computeResult() {
  const expr = els.main.value;
  if (!expr.trim()) return;
  try {
    const result = evaluate(expr.replace(/ANS/g, `(${state.ans})`));
    if (result === null) return;
    const formatted = formatNumber(result);
    addHistory(expr, formatted);
    state.ans = result;
    els.histLine.textContent = expr + " =";
    els.main.value = formatted;
    els.preview.textContent = "";
    els.preview.classList.remove("error");
    els.main.setSelectionRange(formatted.length, formatted.length);
  } catch (e) {
    els.preview.textContent = "⚠ " + e.message;
    els.preview.classList.add("error");
  }
}

function clearAll() {
  els.main.value = "";
  els.preview.textContent = "";
  els.histLine.textContent = "";
  els.preview.classList.remove("error");
  els.main.focus();
}

function backspace() {
  const el = els.main;
  const start = el.selectionStart ?? el.value.length;
  const end = el.selectionEnd ?? el.value.length;
  if (start === end && start > 0) {
    el.value = el.value.slice(0, start - 1) + el.value.slice(end);
    el.setSelectionRange(start - 1, start - 1);
  } else {
    el.value = el.value.slice(0, start) + el.value.slice(end);
    el.setSelectionRange(start, start);
  }
  el.focus();
  updatePreview();
}

/* ---------------------------------------------------------
   3. Memoria
   --------------------------------------------------------- */
function memoryAction(op) {
  switch (op) {
    case "MC": state.memory = 0; state.hasMemory = false; break;
    case "MR": if (state.hasMemory) insertText(formatNumber(state.memory)); break;
    case "M+":
    case "M-": {
      let val = 0;
      try { val = evaluate(els.main.value.replace(/ANS/g, `(${state.ans})`)) ?? 0; } catch { val = 0; }
      state.memory += op === "M+" ? val : -val;
      state.hasMemory = true;
      break;
    }
  }
  els.memIndicator.classList.toggle("active", state.hasMemory);
}

/* ---------------------------------------------------------
   4. Historial
   --------------------------------------------------------- */
function addHistory(expr, result) {
  state.history.unshift({ expr, result });
  if (state.history.length > 50) state.history.pop();
  localStorage.setItem("calc-history", JSON.stringify(state.history));
  renderHistory();
}

function renderHistory() {
  if (state.history.length === 0) {
    els.historyList.innerHTML = '<li class="history-empty">Aún no hay cálculos.</li>';
    return;
  }
  els.historyList.innerHTML = "";
  state.history.forEach((item) => {
    const li = document.createElement("li");
    li.className = "history-item";
    li.innerHTML = `<div class="h-expr">${escapeHtml(item.expr)}</div><div class="h-res">${escapeHtml(item.result)}</div>`;
    li.addEventListener("click", () => {
      insertText(item.result);
    });
    els.historyList.appendChild(li);
  });
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

/* ---------------------------------------------------------
   5. Eventos de teclado físico y botones
   --------------------------------------------------------- */
function flash(btn) {
  if (!btn) return;
  btn.classList.add("press-flash");
  setTimeout(() => btn.classList.remove("press-flash"), 250);
}

document.querySelectorAll(".key, .mem-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    flash(btn);
    if (btn.dataset.mem) { memoryAction(btn.dataset.mem); return; }
    if (btn.dataset.insert !== undefined) { insertText(btn.dataset.insert); return; }
    const action = btn.dataset.action;
    if (action === "equals") computeResult();
    else if (action === "clear") clearAll();
    else if (action === "backspace") backspace();
    else if (action === "square") { insertText("^2"); }
    else if (action === "ans") insertText("ANS");
    else if (action === "toggle-deg") toggleDeg();
  });
});

function toggleDeg() {
  DEG.enabled = !DEG.enabled;
  els.degToggle.textContent = DEG.enabled ? "DEG" : "RAD";
  els.degToggle.classList.toggle("active", !DEG.enabled);
  updatePreview();
}

els.main.addEventListener("input", updatePreview);
els.main.addEventListener("keydown", (e) => {
  if (e.key === "Enter") { e.preventDefault(); computeResult(); }
});

// Atajos globales cuando el foco no está en otro input
document.addEventListener("keydown", (e) => {
  const tag = document.activeElement.tagName;
  const inOtherInput = (tag === "INPUT" && document.activeElement !== els.main) || tag === "SELECT";
  if (inOtherInput) return;
  if (document.querySelector(".panel.active").id !== "panel-standard") return;
  if (e.key === "Escape") { clearAll(); }
});

/* ---------------------------------------------------------
   6. Tabs + modo científico
   --------------------------------------------------------- */
document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
    document.querySelectorAll(".panel").forEach((p) => p.classList.remove("active"));
    tab.classList.add("active");
    const target = tab.dataset.tab;
    if (target === "scientific") {
      document.getElementById("panel-standard").classList.add("active");
      els.sciKeys.classList.add("show");
    } else if (target === "standard") {
      document.getElementById("panel-standard").classList.add("active");
      els.sciKeys.classList.remove("show");
    } else {
      document.getElementById("panel-" + target).classList.add("active");
    }
  });
});

/* ---------------------------------------------------------
   7. Resolvedor de ecuaciones
   --------------------------------------------------------- */
function num(id) {
  const v = parseFloat(document.getElementById(id).value);
  return Number.isNaN(v) ? 0 : v;
}

document.getElementById("solve-linear").addEventListener("click", () => {
  const a = num("lin-a"), b = num("lin-b");
  const out = document.getElementById("lin-result");
  let msg;
  if (a === 0) {
    msg = b === 0 ? "Infinitas soluciones (0 = 0)." : "Sin solución (inconsistente).";
  } else {
    msg = "x = " + formatNumber(-b / a);
  }
  out.textContent = msg;
  out.classList.add("show");
});

document.getElementById("solve-quad").addEventListener("click", () => {
  const a = num("quad-a"), b = num("quad-b"), c = num("quad-c");
  const out = document.getElementById("quad-result");
  if (a === 0) {
    out.textContent = b === 0
      ? (c === 0 ? "Infinitas soluciones." : "Sin solución.")
      : "Lineal: x = " + formatNumber(-c / b);
    out.classList.add("show");
    return;
  }
  const disc = b * b - 4 * a * c;
  if (disc > 0) {
    const r = Math.sqrt(disc);
    out.textContent = `x₁ = ${formatNumber((-b + r) / (2 * a))}, x₂ = ${formatNumber((-b - r) / (2 * a))}`;
  } else if (disc === 0) {
    out.textContent = "x = " + formatNumber(-b / (2 * a)) + " (raíz doble)";
  } else {
    const re = formatNumber(-b / (2 * a));
    const im = formatNumber(Math.sqrt(-disc) / (2 * a));
    out.textContent = `x₁ = ${re} + ${im}i, x₂ = ${re} − ${im}i`;
  }
  out.classList.add("show");
});

/* ---------------------------------------------------------
   8. Conversor de unidades
   --------------------------------------------------------- */
const CONVERSIONS = {
  length: {
    label: "Longitud",
    base: "m",
    units: {
      mm: { label: "Milímetros", factor: 0.001 },
      cm: { label: "Centímetros", factor: 0.01 },
      m: { label: "Metros", factor: 1 },
      km: { label: "Kilómetros", factor: 1000 },
      in: { label: "Pulgadas", factor: 0.0254 },
      ft: { label: "Pies", factor: 0.3048 },
      yd: { label: "Yardas", factor: 0.9144 },
      mi: { label: "Millas", factor: 1609.344 },
    },
  },
  weight: {
    label: "Peso",
    base: "g",
    units: {
      mg: { label: "Miligramos", factor: 0.001 },
      g: { label: "Gramos", factor: 1 },
      kg: { label: "Kilogramos", factor: 1000 },
      t: { label: "Toneladas", factor: 1e6 },
      lb: { label: "Libras", factor: 453.59237 },
      oz: { label: "Onzas", factor: 28.349523125 },
    },
  },
  speed: {
    label: "Velocidad",
    base: "m/s",
    units: {
      "m/s": { label: "Metros/segundo", factor: 1 },
      "km/h": { label: "Kilómetros/hora", factor: 1000 / 3600 },
      mph: { label: "Millas/hora", factor: 1609.344 / 3600 },
      kt: { label: "Nudos", factor: 1852 / 3600 },
    },
  },
  metric: {
    label: "Prefijos métricos",
    base: "(unidad)",
    units: {
      p: { label: "pico (p)", factor: 1e-12 },
      n: { label: "nano (n)", factor: 1e-9 },
      µ: { label: "micro (µ)", factor: 1e-6 },
      m: { label: "mili (m)", factor: 1e-3 },
      c: { label: "centi (c)", factor: 1e-2 },
      d: { label: "deci (d)", factor: 1e-1 },
      "1": { label: "unidad", factor: 1 },
      da: { label: "deca (da)", factor: 1e1 },
      h: { label: "hecto (h)", factor: 1e2 },
      k: { label: "kilo (k)", factor: 1e3 },
      M: { label: "mega (M)", factor: 1e6 },
      G: { label: "giga (G)", factor: 1e9 },
      T: { label: "tera (T)", factor: 1e12 },
    },
  },
};

let currentCat = "length";

function fillUnitSelects() {
  const cat = CONVERSIONS[currentCat];
  const from = document.getElementById("conv-from");
  const to = document.getElementById("conv-to");
  const keys = Object.keys(cat.units);
  const opts = keys.map((k) => `<option value="${k}">${cat.units[k].label}</option>`).join("");
  from.innerHTML = opts;
  to.innerHTML = opts;
  from.value = keys[0];
  to.value = keys[Math.min(1, keys.length - 1)];
  doConvert();
}

function doConvert() {
  const cat = CONVERSIONS[currentCat];
  const input = parseFloat(document.getElementById("conv-input").value);
  const from = document.getElementById("conv-from").value;
  const to = document.getElementById("conv-to").value;
  const out = document.getElementById("conv-output");
  const formula = document.getElementById("conv-formula");
  if (Number.isNaN(input)) { out.value = ""; formula.textContent = ""; return; }
  const result = (input * cat.units[from].factor) / cat.units[to].factor;
  out.value = formatNumber(parseFloat(result.toPrecision(10)));
  formula.textContent = `${formatNumber(input)} ${from} = ${out.value} ${to}`;
}

document.querySelectorAll(".conv-cat").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".conv-cat").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentCat = btn.dataset.cat;
    fillUnitSelects();
  });
});
["conv-input", "conv-from", "conv-to"].forEach((id) => {
  document.getElementById(id).addEventListener("input", doConvert);
});
document.getElementById("conv-swap").addEventListener("click", () => {
  const from = document.getElementById("conv-from");
  const to = document.getElementById("conv-to");
  const tmp = from.value; from.value = to.value; to.value = tmp;
  doConvert();
});

/* ---------------------------------------------------------
   9. Tema claro/oscuro
   --------------------------------------------------------- */
const themeToggle = document.getElementById("theme-toggle");
const savedTheme = localStorage.getItem("calc-theme");
if (savedTheme) document.body.setAttribute("data-theme", savedTheme);
themeToggle.addEventListener("click", () => {
  const current = document.body.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  document.body.setAttribute("data-theme", next);
  localStorage.setItem("calc-theme", next);
});

document.getElementById("clear-history").addEventListener("click", () => {
  state.history = [];
  localStorage.removeItem("calc-history");
  renderHistory();
});

/* ---------------------------------------------------------
   10. Init
   --------------------------------------------------------- */
renderHistory();
fillUnitSelects();
els.main.focus();
