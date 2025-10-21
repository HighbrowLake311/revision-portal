async function loadTopics() {
  const response = await fetch('data/topics.json');
  const topics = await response.json();
  displayTopics(topics);
  setupSearch(topics);
}

function displayTopics(topics) {
  const content = document.getElementById('content');
  content.innerHTML = '';

  topics.forEach(topic => {
    const card = document.createElement('div');
    card.className = 'topic';
    card.innerHTML = `
      <h2>${topic.title}</h2>
      <p class="unit"><strong>Unit:</strong> ${topic.unit}</p>
      <p>${topic.summary}</p>
      <ul>
        ${topic.keyPoints.map(p => `<li>${p}</li>`).join('')}
      </ul>
    `;
    content.appendChild(card);
  });
}

function setupSearch(topics) {
  const input = document.getElementById('search');
  input.addEventListener('input', () => {
    const term = input.value.toLowerCase();
    const filtered = topics.filter(t =>
      t.title.toLowerCase().includes(term) ||
      t.summary.toLowerCase().includes(term) ||
      t.keyPoints.some(p => p.toLowerCase().includes(term)) ||
      t.unit.toLowerCase().includes(term)
    );
    displayTopics(filtered);
  });
}

loadTopics();
