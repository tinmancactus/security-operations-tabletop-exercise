// Game State
const state = {
  tokens: 12,
  timeRemaining: 3600,
  timerRunning: false,
  timerInterval: null,
  unlockedEvidence: [1, 2, 3, 4],
  openedEnvelopes: [],
  activityLog: [],
  priyaEscalated: false,
  priyaEscalationCount: 0
};

// Initialize
function init() {
  renderTokens();
  renderEvidenceList();
  renderEnvelopes();
  renderEscalationActions();
}

function startGame() {
  document.getElementById('startScreen').classList.add('hidden');
  addLog('Session started');
  init();
}

// Timer Functions
function toggleTimer() {
  if (state.timerRunning) {
    pauseTimer();
  } else {
    startTimer();
  }
}

function startTimer() {
  state.timerRunning = true;
  document.getElementById('timerBtn').textContent = 'Pause';
  state.timerInterval = setInterval(tick, 1000);
  addLog('Timer started');
}

function pauseTimer() {
  state.timerRunning = false;
  document.getElementById('timerBtn').textContent = 'Resume';
  clearInterval(state.timerInterval);
  addLog('Timer paused');
}

function resetTimer() {
  pauseTimer();
  state.timeRemaining = 3600;
  updateTimerDisplay();
  document.getElementById('timerBtn').textContent = 'Start';
  addLog('Timer reset');
}

function tick() {
  state.timeRemaining--;
  updateTimerDisplay();
  checkTimedEnvelopes();

  if (state.timeRemaining <= 0) {
    pauseTimer();
    showNotification('Time\'s up! Session 1 complete.', 'danger');
  }
}

function updateTimerDisplay() {
  const minutes = Math.floor(state.timeRemaining / 60);
  const seconds = state.timeRemaining % 60;
  const display = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  const timerEl = document.getElementById('timer');
  timerEl.textContent = display;

  timerEl.classList.remove('warning', 'danger');
  if (state.timeRemaining <= 300) {
    timerEl.classList.add('danger');
  } else if (state.timeRemaining <= 1200) {
    timerEl.classList.add('warning');
  }
}

function checkTimedEnvelopes() {
  Object.entries(envelopes).forEach(([id, env]) => {
    if (env.type === 'timed' && !state.openedEnvelopes.includes(id)) {
      if (state.timeRemaining <= env.triggerTime) {
        autoOpenEnvelope(id);
      }
    }
  });
}

// Token Functions
function renderTokens() {
  const display = document.getElementById('tokensDisplay');
  display.innerHTML = '';
  for (let i = 0; i < 12; i++) {
    const token = document.createElement('div');
    token.className = 'token' + (i >= state.tokens ? ' spent' : '');
    display.appendChild(token);
  }
  document.getElementById('tokenCount').textContent = state.tokens;
}

function spendTokens(amount, action) {
  if (state.tokens >= amount) {
    state.tokens -= amount;
    renderTokens();
    addLog(`Spent ${amount} token(s): ${action}`);
    return true;
  } else {
    showNotification(`Not enough tokens! Need ${amount}, have ${state.tokens}`, 'warning');
    return false;
  }
}

// Evidence Functions
function renderEvidenceList() {
  const list = document.getElementById('evidenceList');
  list.innerHTML = '';

  Object.entries(evidenceCards).forEach(([id, card]) => {
    const numId = parseInt(id);
    const isUnlocked = state.unlockedEvidence.includes(numId);

    const item = document.createElement('div');
    item.className = 'sidebar-item' + (!isUnlocked ? ' locked' : ' unlocked');
    item.innerHTML = `
      <div class="sidebar-item-title">#${id}: ${card.title}</div>
      <div class="sidebar-item-meta">${card.meta}</div>
      <span class="sidebar-item-cost ${card.cost === 0 ? 'free' : ''}">${card.cost === 0 ? 'FREE' : card.cost + ' tokens'}</span>
    `;

    if (isUnlocked) {
      item.onclick = () => showEvidence(numId);
    } else {
      item.onclick = () => promptUnlock(numId);
    }

    list.appendChild(item);
  });
}

function showEvidence(id) {
  const card = evidenceCards[id];
  document.getElementById('contentTitle').textContent = `Evidence Card #${id}: ${card.title}`;
  document.getElementById('contentBody').innerHTML = `
    <div class="content-card">
      <pre>${card.content}</pre>
    </div>
  `;

  document.querySelectorAll('.sidebar-item').forEach((el, i) => {
    el.classList.toggle('active', i === id - 1);
  });
}

function promptUnlock(id) {
  const card = evidenceCards[id];

  if (card.requires) {
    const hasReq = card.requires.some(r => state.unlockedEvidence.includes(r));
    if (!hasReq) {
      showNotification(`Requires Evidence Card #${card.requires.join(' or #')} first`, 'warning');
      return;
    }
  }

  showModal(
    `Unlock Evidence Card #${id}?`,
    `<p><strong>${card.title}</strong></p>
     <p style="color: var(--text-muted); margin-top: 0.5rem;">${card.meta}</p>
     <p style="margin-top: 1rem;">This will cost <strong>${card.cost} token(s)</strong>.</p>
     <p style="margin-top: 0.5rem;">You have <strong>${state.tokens}</strong> tokens remaining.</p>`,
    [
      { text: 'Cancel', class: 'btn-secondary', action: closeModal },
      { text: `Spend ${card.cost} Tokens`, class: 'btn-primary', action: () => unlockEvidence(id) }
    ]
  );
}

function unlockEvidence(id) {
  const card = evidenceCards[id];
  if (spendTokens(card.cost, `Unlocked #${id}: ${card.title}`)) {
    state.unlockedEvidence.push(id);
    renderEvidenceList();
    closeModal();
    showEvidence(id);
  }
}

// Envelope Functions
function renderEnvelopes() {
  const timedContainer = document.getElementById('timedEnvelopes');
  const decisionContainer = document.getElementById('decisionEnvelopes');
  timedContainer.innerHTML = '';
  decisionContainer.innerHTML = '';

  Object.entries(envelopes).forEach(([id, env]) => {
    const isOpened = state.openedEnvelopes.includes(id);
    const container = env.type === 'timed' ? timedContainer : decisionContainer;

    const el = document.createElement('div');
    el.className = 'envelope' + (isOpened ? ' opened' : '');
    el.innerHTML = `
      <div class="envelope-header">
        <span class="envelope-label">${id}</span>
        <span class="envelope-status">${isOpened ? 'OPENED' : 'SEALED'}</span>
      </div>
      <div class="envelope-trigger">${env.trigger}</div>
    `;

    if (!isOpened && env.type === 'decision') {
      el.onclick = () => confirmOpenEnvelope(id);
    } else if (isOpened) {
      el.onclick = () => showEnvelopeContent(id);
    }

    container.appendChild(el);
  });
}

function confirmOpenEnvelope(id) {
  const env = envelopes[id];
  showModal(
    `Open ${id}?`,
    `<p>You are about to: <strong>${env.trigger}</strong></p>
     <p style="margin-top: 1rem; color: var(--warning);">This action cannot be undone.</p>`,
    [
      { text: 'Cancel', class: 'btn-secondary', action: closeModal },
      { text: 'Open Envelope', class: 'btn-warning', action: () => openEnvelope(id) }
    ]
  );
}

function openEnvelope(id) {
  state.openedEnvelopes.push(id);
  addLog(`Opened envelope: ${id}`);
  renderEnvelopes();
  closeModal();
  showEnvelopeContent(id);
}

function autoOpenEnvelope(id) {
  state.openedEnvelopes.push(id);
  addLog(`⏰ Timed envelope opened: ${id}`);
  renderEnvelopes();
  showNotification(`Envelope ${id} has opened! Click to view.`, 'warning');
  showEnvelopeContent(id);
}

function showEnvelopeContent(id) {
  const env = envelopes[id];
  document.getElementById('contentTitle').textContent = `${id}: ${env.title}`;
  document.getElementById('contentBody').innerHTML = `
    <div class="content-card">
      <pre>${env.content}</pre>
    </div>
  `;
}

// Escalation Actions
function renderEscalationActions() {
  const container = document.getElementById('escalationActions');
  const isFirstEscalation = state.priyaEscalationCount === 0;
  const cost = isFirstEscalation ? 2 : 0;
  const costText = isFirstEscalation ? '2 tokens' : 'FREE follow-up';
  const desc = isFirstEscalation ? 'Requires Self-Assessment' : 'Follow-up escalation (free)';
  
  container.innerHTML = `
    <button class="action-btn" onclick="showPriyaEscalation()">
      <div class="action-btn-title">
        <span>Escalate to Priya (SOC Manager)</span>
        <span>${costText}</span>
      </div>
      <div class="action-btn-desc">${desc}</div>
    </button>
  `;
}

function showPriyaEscalation() {
  const isFirstEscalation = state.priyaEscalationCount === 0;
  const cost = isFirstEscalation ? 2 : 0;
  
  if (state.tokens < cost) {
    showNotification('Not enough tokens! Need 2 tokens.', 'warning');
    return;
  }

  const assessmentHTML = `
    <div class="self-assessment">
      <h3>SELF-ASSESSMENT: ESCALATION TO PRIYA</h3>
      <p style="margin-bottom: 1rem; color: var(--text-muted);">
        Review your escalation message/reasoning. Check ALL that apply:
      </p>
      
      <div class="checkbox-item">
        <input type="checkbox" id="check1">
        <label for="check1">Names a specific user account of concern</label>
      </div>
      
      <div class="checkbox-item">
        <input type="checkbox" id="check2">
        <label for="check2">Includes Evidence Card #5 (Liam interview) OR #7 (Auth logs)</label>
      </div>
      
      <div class="checkbox-item">
        <input type="checkbox" id="check3">
        <label for="check3">Describes a timeline of events</label>
      </div>
      
      <div class="checkbox-item">
        <input type="checkbox" id="check4">
        <label for="check4">Proposes a specific next action OR asks a specific question</label>
      </div>
      
      <div class="checkbox-item">
        <input type="checkbox" id="check5">
        <label for="check5">Includes severity assessment (Low/Med/High) with justification</label>
      </div>
      
      <div class="assessment-result">
        <div class="assessment-count" id="assessmentCount">0 / 5</div>
        <div class="assessment-instruction">Check the boxes above, then submit</div>
      </div>
    </div>
    <p style="margin-top: 1rem; font-size: 0.875rem; color: var(--text-muted);">
      <strong>Be honest!</strong> This self-assessment determines Priya's response quality.
      The learning value comes from accurate reflection.
    </p>
  `;

  showModal(
    'Escalate to SOC Manager (2 tokens)',
    assessmentHTML,
    [
      { text: 'Cancel', class: 'btn-secondary', action: closeModal },
      { text: 'Submit Escalation', class: 'btn-primary', action: submitPriyaEscalation }
    ]
  );

  // Add checkbox listeners
  setTimeout(() => {
    document.querySelectorAll('.self-assessment input').forEach(cb => {
      cb.addEventListener('change', updateAssessmentCount);
    });
  }, 100);
}

function updateAssessmentCount() {
  const checked = document.querySelectorAll('.self-assessment input:checked').length;
  document.getElementById('assessmentCount').textContent = `${checked} / 5`;
}

function submitPriyaEscalation() {
  const checked = document.querySelectorAll('.self-assessment input:checked').length;
  const isFirstEscalation = state.priyaEscalationCount === 0;
  const cost = isFirstEscalation ? 2 : 0;
  
  if (cost > 0 && !spendTokens(cost, 'Escalated to Priya')) {
    return;
  }
  
  if (cost === 0) {
    addLog('Follow-up escalation to Priya (free)');
  }

  state.priyaEscalationCount++;
  state.priyaEscalated = true;
  renderEscalationActions();
  closeModal();

  let responseKey;
  if (checked >= 4) {
    responseKey = 'PRIYA-1A';
  } else if (checked >= 2) {
    responseKey = 'PRIYA-1B';
  } else {
    responseKey = 'PRIYA-1C';
  }

  const response = priyaResponses[responseKey];
  addLog(`Priya responded: ${response.title}`);

  document.getElementById('contentTitle').textContent = `Priya's Response: ${response.title}`;
  document.getElementById('contentBody').innerHTML = `
    <div class="content-card">
      <pre>${response.content}</pre>
    </div>
  `;
}

// Activity Log
function addLog(message) {
  const now = new Date();
  const time = now.toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  state.activityLog.unshift({ time, message });
  renderLog();
}

function renderLog() {
  const container = document.getElementById('activityLog');
  container.innerHTML = state.activityLog.slice(0, 15).map(entry => `
    <div class="log-entry">
      <span class="log-time">${entry.time}</span>
      <span class="log-action">${entry.message}</span>
    </div>
  `).join('');
}

// Modal Functions
function showModal(title, body, buttons) {
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalBody').innerHTML = body;
  
  const footer = document.getElementById('modalFooter');
  footer.innerHTML = '';
  buttons.forEach(btn => {
    const button = document.createElement('button');
    button.className = `btn ${btn.class}`;
    button.textContent = btn.text;
    button.onclick = btn.action;
    footer.appendChild(button);
  });

  document.getElementById('modalOverlay').classList.add('active');
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('active');
}

// Notification
function showNotification(message, type = '') {
  const el = document.getElementById('notification');
  el.textContent = message;
  el.className = 'notification active ' + type;
  
  setTimeout(() => {
    el.classList.remove('active');
  }, 3000);
}

// Close modal on overlay click
document.getElementById('modalOverlay').addEventListener('click', (e) => {
  if (e.target.id === 'modalOverlay') {
    closeModal();
  }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
  }
  if (e.key === ' ' && !document.getElementById('startScreen').classList.contains('hidden')) {
    e.preventDefault();
    startGame();
  }
});

// Initialize on load
init();
