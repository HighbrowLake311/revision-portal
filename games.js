const gameArea = document.getElementById('game-area');
const gameMenu = document.getElementById('game-menu');

const games = [
  { id: 'quiz', name: 'Multiple Choice Quiz', func: startQuiz },
  { id: 'trueFalse', name: 'True or False', func: startTrueFalse },
  { id: 'match', name: 'Match the Terms', func: startMatch },
  { id: 'fillBlank', name: 'Fill in the Blank', func: startFillBlank },
  { id: 'binary', name: 'Binary Converter Challenge', func: startBinaryGame },
  { id: 'acronyms', name: 'Guess the Acronym', func: startAcronymGame },
  { id: 'sort', name: 'Sort the Process', func: startSortingGame },
  { id: 'datatypes', name: 'Data Type Classifier', func: startDataTypeGame }
];

// build buttons dynamically
games.forEach(g => {
  const btn = document.createElement('button');
  btn.textContent = g.name;
  btn.onclick = () => startGame(g.id);
  gameMenu.appendChild(btn);
});

function startGame(type) {
  gameArea.innerHTML = '';
  const g = games.find(g => g.id === type);
  if (g) g.func();
}

// === Multiple Choice Quiz ===
function startQuiz() {
  const questions = [
    { q: "What does CPU stand for?", options: ["Central Processing Unit", "Computer Power Unit", "Control Processing Unit"], answer: "Central Processing Unit" },
    { q: "Which of these is secondary storage?", options: ["RAM", "SSD", "Cache"], answer: "SSD" },
    { q: "What is an example of an input device?", options: ["Printer", "Mouse", "Monitor"], answer: "Mouse" }
  ];

  let index = 0, score = 0;
  render();

  function render() {
    if (index >= questions.length) return (gameArea.innerHTML = `<h3>You scored ${score}/${questions.length}</h3>`);
    const q = questions[index];
    const div = document.createElement('div');
    div.innerHTML = `<h3>${q.q}</h3>`;
    q.options.forEach(opt => {
      const btn = document.createElement('div');
      btn.classList.add('quiz-option');
      btn.textContent = opt;
      btn.onclick = () => {
        btn.classList.add(opt === q.answer ? 'correct' : 'incorrect');
        if (opt === q.answer) score++;
        setTimeout(() => { index++; render(); }, 700);
      };
      div.appendChild(btn);
    });
    gameArea.innerHTML = '';
    gameArea.appendChild(div);
  }
}

// === True or False ===
function startTrueFalse() {
  const statements = [
    { text: "RAM is non-volatile memory.", answer: false },
    { text: "A router connects multiple networks.", answer: true },
    { text: "Python is a compiled language.", answer: false }
  ];
  let i = 0, score = 0;
  render();

  function render() {
    if (i >= statements.length) return (gameArea.innerHTML = `<h3>You got ${score}/${statements.length}</h3>`);
    const s = statements[i];
    gameArea.innerHTML = `<h3>${s.text}</h3>
      <button id="trueBtn">True</button>
      <button id="falseBtn">False</button>`;
    document.getElementById('trueBtn').onclick = () => check(true);
    document.getElementById('falseBtn').onclick = () => check(false);
  }
  function check(ans) {
    if (ans === statements[i].answer) score++;
    i++; render();
  }
}

// === Match the Terms ===
function startMatch() {
  const terms = [
    { term: "RAM", def: "Temporary memory used by the CPU" },
    { term: "SSD", def: "Fast solid-state storage device" },
    { term: "Motherboard", def: "Main circuit board connecting components" }
  ];
  const defs = [...terms].sort(() => Math.random() - 0.5);
  gameArea.innerHTML = `<h3>Match each IT term to its definition</h3>`;
  terms.forEach((t, idx) => {
    const row = document.createElement('div');
    row.classList.add('match-pair');
    row.innerHTML = `<span>${t.term}</span>
      <select id="m-${idx}">
        <option value="">--Select--</option>
        ${defs.map(d => `<option>${d.def}</option>`).join('')}
      </select>`;
    gameArea.appendChild(row);
  });
  const btn = document.createElement('button');
  btn.textContent = 'Check Answers';
  btn.onclick = () => {
    let score = 0;
    terms.forEach((t, i) => {
      if (document.getElementById(`m-${i}`).value === t.def) score++;
    });
    alert(`You got ${score}/${terms.length}!`);
  };
  gameArea.appendChild(btn);
}

// === Fill in the Blank ===
function startFillBlank() {
  const items = [
    { q: "The ___ is responsible for processing instructions.", a: "CPU" },
    { q: "___ memory is lost when the computer is turned off.", a: "Volatile" },
    { q: "The main circuit board is the ___.", a: "Motherboard" }
  ];
  let index = 0, score = 0;
  render();

  function render() {
    if (index >= items.length)
      return (gameArea.innerHTML = `<h3>Score: ${score}/${items.length}</h3>`);
    const { q, a } = items[index];
    gameArea.innerHTML = `<h3>${q}</h3>
      <input type="text" id="ans" class="fill-input" placeholder="Your answer...">
      <button>Submit</button>`;
    gameArea.querySelector('button').onclick = () => {
      const input = document.getElementById('ans').value.trim();
      if (input.toLowerCase() === a.toLowerCase()) score++;
      index++;
      render();
    };
  }
}

// === Binary Converter Challenge ===
function startBinaryGame() {
  let num = Math.floor(Math.random() * 64);
  gameArea.innerHTML = `<h3>Convert the number <strong>${num}</strong> to binary:</h3>
  <input id="binAns" class="fill-input" placeholder="e.g. 101010">
  <button>Submit</button>`;
  gameArea.querySelector('button').onclick = () => {
    const ans = document.getElementById('binAns').value.trim();
    const correct = num.toString(2);
    if (ans === correct) {
      alert("✅ Correct!");
    } else {
      alert(`❌ Incorrect. The correct answer is ${correct}.`);
    }
    startBinaryGame();
  };
}

// === Guess the Acronym ===
function startAcronymGame() {
  const acronyms = [
    { short: "CPU", full: "Central Processing Unit" },
    { short: "URL", full: "Uniform Resource Locator" },
    { short: "IP", full: "Internet Protocol" }
  ];
  const item = acronyms[Math.floor(Math.random() * acronyms.length)];
  gameArea.innerHTML = `<h3>What does <strong>${item.short}</strong> stand for?</h3>
  <input id="acr" class="fill-input" placeholder="Type your answer">
  <button>Check</button>`;
  gameArea.querySelector('button').onclick = () => {
    const input = document.getElementById('acr').value.trim().toLowerCase();
    if (input === item.full.toLowerCase()) {
      alert("✅ Correct!");
    } else {
      alert(`❌ Nope — it means "${item.full}".`);
    }
    startAcronymGame();
  };
}

// === Sorting Game ===
function startSortingGame() {
  const steps = [
    "Input data",
    "Process data",
    "Store data",
    "Output information"
  ];
  const shuffled = [...steps].sort(() => Math.random() - 0.5);
  gameArea.innerHTML = `<h3>Arrange the stages of data processing in the correct order</h3>`;
  const list = document.createElement('ul');
  list.id = 'sortable';
  shuffled.forEach(s => {
    const li = document.createElement('li');
    li.classList.add('drag-item');
    li.draggable = true;
    li.textContent = s;
    list.appendChild(li);
  });
  gameArea.appendChild(list);
  const btn = document.createElement('button');
  btn.textContent = 'Check Order';
  btn.onclick = () => {
    const items = [...document.querySelectorAll('.drag-item')].map(i => i.textContent);
    let correct = 0;
    items.forEach((v, i) => {
      if (v === steps[i]) correct++;
    });
    alert(`You got ${correct}/${steps.length} in the correct order!`);
  };
  gameArea.appendChild(btn);

  enableDrag();
}

function enableDrag() {
  const draggables = document.querySelectorAll('.drag-item');
  const container = document.getElementById('sortable');

  draggables.forEach(item => {
    item.addEventListener('dragstart', () => item.classList.add('dragging'));
    item.addEventListener('dragend', () => item.classList.remove('dragging'));
  });

  container.addEventListener('dragover', e => {
    e.preventDefault();
    const after = getDragAfter(container, e.clientY);
    const dragging = document.querySelector('.dragging');
    if (after == null) container.appendChild(dragging);
    else container.insertBefore(dragging, after);
  });

  function getDragAfter(container, y) {
    const els = [...container.querySelectorAll('.drag-item:not(.dragging)')];
    return els.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      return offset < 0 && offset > closest.offset ? { offset, element: child } : closest;
    }, { offset: Number.NEGATIVE_INFINITY }).element;
  }
}

// === Data Type Classifier ===
function startDataTypeGame() {
  const items = [
    { value: "42", type: "Integer" },
    { value: "'Hello'", type: "String" },
    { value: "True", type: "Boolean" },
    { value: "3.14", type: "Float" }
  ];
  const types = ["Integer", "Float", "String", "Boolean"];
  gameArea.innerHTML = `<h3>Match each value with its correct data type</h3>`;
  items.forEach((it, idx) => {
    const row = document.createElement('div');
    row.classList.add('match-pair');
    row.innerHTML = `
      <span>${it.value}</span>
      <select id="dt-${idx}">
        <option value="">--Select Type--</option>
        ${types.map(t => `<option>${t}</option>`).join('')}
      </select>`;
    gameArea.appendChild(row);
  });
  const btn = document.createElement('button');
  btn.textContent = 'Check Answers';
  btn.onclick = () => {
    let score = 0;
    items.forEach((it, idx) => {
      if (document.getElementById(`dt-${idx}`).value === it.type) score++;
    });
    alert(`You matched ${score}/${items.length} correctly!`);
  };
  gameArea.appendChild(btn);
}
