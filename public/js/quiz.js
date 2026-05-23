// ── State ──────────────────────────────────────────────────────────────────
const answers = {};
const flags = {};

const TOTAL_STEPS = 15;

function getNextStep(current) {
  switch (current) {
    case 1: return answers.s1 === 'none' ? 3 : 2;
    case 8: return answers.s8 === 'male' ? 10 : 9;
    case 11: return flags.hasAllergy ? 12 : 13;
    case 13: return flags.hasCondition ? 14 : 15;
    case 15: return flags.hasExtra ? 16 : 'result';
    case 16: return 'result';
    default: return current + 1;
  }
}

function getPrevStep(current) {
  switch (current) {
    case 3: return answers.s1 === 'none' ? 1 : 2;
    case 10: return answers.s8 === 'male' ? 8 : 9;
    case 13: return flags.hasAllergy ? 12 : 11;
    case 15: return flags.hasCondition ? 14 : 13;
    case 16: return 15;
    case 'result': return flags.hasExtra ? 16 : 15;
    default: return current - 1;
  }
}

let currentStep = 1;

function updateProgress() {
  const bar = document.getElementById('segProgress');
  if (!bar) return;
  const stepIndex = currentStep === 'result' ? TOTAL_STEPS : Math.min(currentStep, TOTAL_STEPS);
  bar.innerHTML = '';
  const w = Math.floor(560 / TOTAL_STEPS);
  for (let i = 1; i <= TOTAL_STEPS; i++) {
    const seg = document.createElement('div');
    seg.style.width = w + 'px';
    seg.className = 'seg' + (i < stepIndex ? ' filled' : i === stepIndex ? ' partial' : '');
    bar.appendChild(seg);
  }
}

function showStep(step) {
  document.querySelectorAll('.step').forEach(el => el.classList.remove('active'));
  const target = document.querySelector(`.step[data-step="${step}"]`);
  if (target) target.classList.add('active');
  currentStep = step;
  updateProgress();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goNext() {
  const next = getNextStep(currentStep);
  showStep(next);
  if (next === 'result') showResult();
}

function goBack() {
  showStep(getPrevStep(currentStep));
}

function selectImg(card, stepKey) {
  card.closest('.img-grid').querySelectorAll('.img-card').forEach(c => c.classList.remove('selected'));
  card.classList.add('selected');
  answers[stepKey] = card.dataset.value;
  const btn = document.getElementById('next1');
  if (btn) btn.disabled = false;
}

function selectSingle(card, stepNum) {
  card.closest('.options-list').querySelectorAll('.opt-card').forEach(c => c.classList.remove('selected'));
  card.classList.add('selected');
  answers['s' + stepNum] = card.dataset.value;
  const btn = document.getElementById('next' + stepNum);
  if (btn) btn.disabled = false;
  if (stepNum === 9) {
    const warn = document.getElementById('pregnancyWarning');
    if (warn) warn.classList.toggle('visible', ['pregnant','breastfeeding','trying'].includes(card.dataset.value));
  }
}

function selectMulti(card, stepNum) {
  card.closest('.options-list').querySelectorAll('[data-value="none"]').forEach(c => c.classList.remove('selected'));
  card.classList.toggle('selected');
  const selected = [...card.closest('.options-list').querySelectorAll('.opt-card.selected')].map(c => c.dataset.value);
  answers['s' + stepNum] = selected;
  const btn = document.getElementById('next' + stepNum);
  if (btn) btn.disabled = selected.length === 0;
}

function selectMultiNone(card, stepNum) {
  card.closest('.options-list').querySelectorAll('.opt-card').forEach(c => c.classList.remove('selected'));
  card.classList.add('selected');
  answers['s' + stepNum] = ['none'];
  const btn = document.getElementById('next' + stepNum);
  if (btn) btn.disabled = false;
}

function selectGoal(card) {
  card.classList.toggle('selected');
  answers.goals = [...document.querySelectorAll('.goal-card.selected')].map(c => c.dataset.value);
}

function setFlag(key, val) { flags[key] = val; }

function checkTextarea(id, btnId) {
  const btn = document.getElementById(btnId);
  if (btn) btn.disabled = document.getElementById(id).value.trim().length === 0;
}

function showResult() {
  showStep('result');
  const acne = answers.s1 || 'none';
  const skinType = answers.s3 || 'combination';
  const sensitivity = answers.s4 || 'normal';
  const goals = answers.goals || [];
  const pregnancy = answers.s9;

  const acneLabels = { mild:'Mild Acne', moderate:'Moderate Acne', severe:'Severe Acne', none:'Clear Skin' };
  const skinLabels = { very_dry:'Very Dry', often_dry:'Dry', combination:'Combination', often_oily:'Oily', very_oily:'Very Oily' };

  document.getElementById('resultTitle').textContent =
    `Your Skin Profile: ${skinLabels[skinType] || 'Combination'} & ${acneLabels[acne] || 'Clear'}`;

  let desc = `Based on your answers, you have ${(skinLabels[skinType]||'combination').toLowerCase()} skin`;
  if (acne !== 'none') desc += ` with ${(acneLabels[acne]||'').toLowerCase()}`;
  if (sensitivity === 'sensitive') desc += ', and your skin is easily irritated';
  desc += '. Here\'s your personalised skincare routine:';
  document.getElementById('resultDesc').textContent = desc;

  const tagEl = document.getElementById('resultTags');
  tagEl.innerHTML = '';
  [skinLabels[skinType], sensitivity === 'sensitive' ? 'Sensitive' : null, ...goals.map(g => g.replace(/_/g,' '))]
    .filter(Boolean).forEach(t => {
      const span = document.createElement('span');
      span.className = 'result-tag';
      span.textContent = t;
      tagEl.appendChild(span);
    });

  const isDry = ['very_dry','often_dry'].includes(skinType);
  const isOily = ['often_oily','very_oily'].includes(skinType);
  const isSensitive = sensitivity === 'sensitive';
  const isPregnant = ['pregnant','breastfeeding','trying'].includes(pregnancy);
  const routine = [];

  if (isOily || acne === 'moderate' || acne === 'severe')
    routine.push({ name: 'CeraVe Foaming Cleanser', desc: 'Removes excess oil and impurities without stripping the skin barrier. Ideal for oily and acne-prone skin.' });
  else if (isDry || isSensitive)
    routine.push({ name: 'CeraVe Hydrating Cleanser', desc: "Gently cleanses while maintaining the skin's natural moisture barrier. Perfect for dry or sensitive skin." });
  else
    routine.push({ name: 'Uriage Hyséac Cleansing Gel', desc: 'Purifies combination skin while respecting its natural balance.' });

  if ((acne === 'severe' || acne === 'moderate' || acne === 'mild') && !isPregnant)
    routine.push({ name: 'La Roche-Posay Effaclar Duo(+)', desc: 'Targets blemishes, unclogs pores, and fades post-acne marks. Dermatologist recommended.' });
  else if (goals.includes('dark_spots') || goals.includes('texture'))
    routine.push({ name: 'Uriage Bariéderm-Cica Daily Serum', desc: 'Repairs the skin barrier and visibly improves skin texture and tone.' });

  if (isSensitive || goals.includes('rosacea') || isPregnant)
    routine.push({ name: 'La Roche-Posay Cicaplast Baume B5+', desc: 'Soothes and repairs sensitive or irritated skin. Safe during pregnancy.' });

  if (isDry || goals.includes('firmness') || goals.includes('glow'))
    routine.push({ name: 'CeraVe Daily Moisturizing Lotion', desc: 'Replenishes ceramides and hyaluronic acid for long-lasting hydration. Restores the skin barrier.' });
  else if (!isOily)
    routine.push({ name: 'Uriage Eau Thermale Water Cream', desc: '24-hour hydration with thermal water minerals. Boosts radiance and plumps the skin.' });

  if (isOily || acne !== 'none')
    routine.push({ name: 'La Roche-Posay Anthelios UVMune SPF50+', desc: 'Invisible, ultra-lightweight sun protection. Essential to prevent UV-induced breakouts and dark spots.' });
  else
    routine.push({ name: 'CeraVe AM Moisturising Lotion SPF50', desc: 'Moisturises and protects in one step. Daily sun protection prevents ageing and pigmentation.' });

  const routineEl = document.getElementById('routineList');
  routineEl.innerHTML = '';
  routine.forEach((item, i) => {
    routineEl.innerHTML += `<div class="result-item">
      <div class="result-num">${i + 1}</div>
      <div class="result-item-text"><strong>${item.name}</strong><span>${item.desc}</span></div>
    </div>`;
  });
}

function restartQuiz() {
  Object.keys(answers).forEach(k => delete answers[k]);
  Object.keys(flags).forEach(k => delete flags[k]);
  document.querySelectorAll('.opt-card.selected, .img-card.selected, .goal-card.selected').forEach(el => el.classList.remove('selected'));
  document.querySelectorAll('.btn-continue[id]').forEach(btn => { btn.disabled = true; });
  document.querySelectorAll('textarea').forEach(t => t.value = '');
  document.querySelectorAll('.warning-box').forEach(w => w.classList.remove('visible'));
  showStep(1);
}

updateProgress();