
 window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero-container');
    const scrollPos = window.scrollY;
    const maxScroll = window.innerHeight;

    const scrollProgress = Math.min(scrollPos / maxScroll, 1);

    let newSize = 100 + (scrollProgress * 80);
    
    hero.style.backgroundSize = newSize + '%';
    
    hero.style.transition = 'none';ero.style.backgroundSize = newSize + '%';
    
    hero.style.transition = 'background-size 0.1s ease-out';
 });

 function validatesignup() {
    let Fname=document.getElementById('Fname').value;
    let Fnameregex=/^[a-zA-Z\s]+$/;
    if (!Fnameregex.test(Fname)) {
        alert("First Name should be more than 3 characters, can only contain letters and spaces!");
        return false;
    }

    let Lname=document.getElementById('Lname').value;
    let Lnameregex=/^[a-zA-Z\s]+$/;
    if (!Lnameregex.test(Lname)) {
        alert("Last Name should be more than 3 characters, can only contain letters and spaces!");
        return false;
    }

    let email=document.getElementById('Email').value;
    let emailregex=/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
    if (!emailregex.test(email)) {
        alert("Please enter a valid email address!");
        return false;
    }

    let password=document.getElementById('Password').value;
    let passwordregex=/^(?=.[A-Z])(?=.\d).{8,}$/;
    if (!passwordregex.test(password)) {
        alert("Password must be at least 8 characters long and include uppercase and atleast one number");
        return false;
    }

    let confirmPassword=document.getElementById('Confirm_Password').value;
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return false;
    }
    alert("Account created successfully!");
    return false;
 }

 function validateLogin(){

    let email=document.getElementById('Login_Email').value;
    let emailregex=/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
    if (!emailregex.test(email)) {
        alert("Please enter a valid email address!");
        return false;
    }
   
        let password=document.getElementById('Login_Password').value;
        if(password.length < 8) {
            alert("Password must be at least 8 characters long!");
            return false;
        }
        else if(password.length===0) {
            alert("Please enter your password!");
            return false;
        }
        alert("Logged in successfully!");
    return false;
 }


 window.addEventListener('scroll', () => {
  const brand = document.querySelector('.footer-brand h1');
  const triggerBottom = window.innerHeight / 5 * 4;
  const brandTop = brand.getBoundingClientRect().top;

  if(brandTop < triggerBottom) {
    brand.style.transform = "translateY(0)";
    brand.style.opacity = "1";
  }
});
 
const answers = {};
  const flags = { hasAllergy: false, hasCondition: false, hasExtra: false };
  let cur = 1;
 
  // Step flow: each step can declare its "next" dynamically
  // We define a flow function instead of a fixed array
 
  function setFlag(name, val) { flags[name] = val; }
 
  // ─── Progress bar ─────────────────────────────────────────────────────────
  const SEGS = 5;
  // Map steps to segments (approximate grouping)
  function segOfStep(s) {
    if (s <= 2)  return 1;
    if (s <= 5)  return 2;
    if (s <= 7)  return 3;
    if (s <= 11) return 4;
    return 5;
  }
 
  const segWrap = document.getElementById('segProgress');
  const widths = ['80px','80px','60px','80px','60px'];
  for (let i = 1; i <= SEGS; i++) {
    const s = document.createElement('div');
    s.className = 'seg'; s.id = 'seg' + i;
    s.style.width = widths[i-1];
    segWrap.appendChild(s);
  }
 
  function updateProgress() {
    const sec = segOfStep(cur);
    for (let i = 1; i <= SEGS; i++) {
      const el = document.getElementById('seg' + i);
      el.className = 'seg' + (i < sec ? ' filled' : i === sec ? ' partial' : '');
    }
  }
 
  // ─── Navigation ───────────────────────────────────────────────────────────
  const stepHistory = [1];
 
  function computeNext(from) {
    const acne = answers['s1'];
    const hasAcne = acne && acne !== 'none';
    const gender = answers['s8'];
    const isFemale = gender === 'female';
    const pregnancy = answers['s9'];
    const isPregnantOrBf = pregnancy === 'pregnant' || pregnancy === 'breastfeeding' || pregnancy === 'trying';
 
    if (from === 1) return hasAcne ? 2 : 3;
    if (from === 2) return 3;
    if (from === 3) return 4;
    if (from === 4) return 5;
    if (from === 5) return 6;
    if (from === 6) return 7;
    if (from === 7) return 8;
    if (from === 8) return isFemale ? 9 : 11;
    if (from === 9) return (isFemale && hasAcne) ? 10 : 11;
    if (from === 10) return 11;
    if (from === 11) return flags.hasAllergy ? 12 : 13;
    if (from === 12) return 13;
    if (from === 13) return flags.hasCondition ? 14 : 15;
    if (from === 14) return 15;
    if (from === 15) return flags.hasExtra ? 16 : 'result';
    if (from === 16) return 'result';
    return 'result';
  }
 
  function goNext() {
    // Special cases where Continue leads directly to result
    if (cur === 15 && !flags.hasExtra) { showResult(); return; }
    if (cur === 16) { showResult(); return; }
 
    const next = computeNext(cur);
    if (next === 'result') { showResult(); return; }
    stepHistory.push(next);
    cur = next;
    showStep(cur);
 
    // Update goals title based on acne
    if (cur === 5) updateGoalsTitle();
    // Show/hide pregnancy warning
    if (cur === 9) updatePregnancyWarning();
  }
 
  function goBack() {
    if (stepHistory.length <= 1) return;
    stepHistory.pop();
    cur = stepHistory[stepHistory.length - 1];
    showStep(cur);
  }
 
  function showStep(n) {
    document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
    const el = n === 'result'
      ? document.querySelector('[data-step="result"]')
      : document.querySelector('[data-step="' + n + '"]');
    if (el) el.classList.add('active');
    updateProgress();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
 
  // ─── Selection helpers ────────────────────────────────────────────────────
  function selectSingle(el, step) {
    el.closest('.options-list').querySelectorAll('.opt-card').forEach(b => b.classList.remove('selected'));
    el.classList.add('selected');
    answers['s' + step] = el.dataset.value;
    const btn = document.getElementById('next' + step);
    if (btn) btn.disabled = false;
  }
 
  function selectMulti(el, step) {
    el.classList.toggle('selected');
    // Remove "none" if another is selected
    const list = el.closest('.options-list');
    list.querySelector('[data-value="none"]')?.classList.remove('selected');
    commitMulti(list, step);
  }
 
  function selectMultiNone(el, step) {
    const list = el.closest('.options-list');
    list.querySelectorAll('.opt-card').forEach(b => b.classList.remove('selected'));
    el.classList.add('selected');
    commitMulti(list, step);
  }
 
  function commitMulti(list, step) {
    const sel = [...list.querySelectorAll('.opt-card.selected')].map(b => b.dataset.value);
    answers['s' + step] = sel;
    const btn = document.getElementById('next' + step);
    if (btn) btn.disabled = sel.length === 0;
  }
 
  function selectImg(el, key) {
    el.closest('.img-grid').querySelectorAll('.img-card').forEach(c => c.classList.remove('selected'));
    el.classList.add('selected');
    answers[key] = el.dataset.value;
    // Enable next button (step 1 uses next1)
    document.getElementById('next1').disabled = false;
  }
 
  function selectGoal(el) {
    el.classList.toggle('selected');
    const sel = [...document.querySelectorAll('.goal-card.selected')].map(c => c.dataset.value);
    answers['s5'] = sel;
    // Goals are optional — always enabled
  }
 
  function checkTextarea(id, btnId) {
    const val = document.getElementById(id).value.trim();
    answers[id] = val;
    document.getElementById(btnId).disabled = val.length === 0;
  }
 
  // ─── Smart UI updates ─────────────────────────────────────────────────────
  function updateGoalsTitle() {
    const acne = answers['s1'];
    const t = document.getElementById('goalsTitle');
    if (acne && acne !== 'none') {
      t.textContent = 'Got it! And what other goals can we help with?';
    } else {
      t.textContent = 'What are your main skin goals?';
    }
  }
 
  function updatePregnancyWarning() {
    // Will be shown after selection
  }
 
  // Watch pregnancy selection
  document.querySelectorAll('[data-step="9"] .opt-card').forEach(btn => {
    btn.addEventListener('click', () => {
      const val = answers['s9'];
      const warn = document.getElementById('pregnancyWarning');
      const acne = answers['s1'];
      if ((val === 'pregnant' || val === 'breastfeeding' || val === 'trying') && acne && acne !== 'none') {
        warn.classList.add('visible');
      } else {
        warn.classList.remove('visible');
      }
    });
  });
 
  // ─── Result ───────────────────────────────────────────────────────────────
  function showResult() {
    const acne = answers['s1'] || 'none';
    const skinType = answers['s3'] || '';
    const sensitivity = answers['s4'] || '';
    const goals = answers['s5'] || [];
    const gender = answers['s8'] || '';
    const pregnancy = answers['s9'] || '';
    const hormonal = answers['s10'] || '';
    const isSensitive = sensitivity === 'sensitive';
    const isOily = skinType === 'very_oily' || skinType === 'often_oily';
    const isDry = skinType === 'very_dry' || skinType === 'often_dry';
    const isPregnant = pregnancy === 'pregnant' || pregnancy === 'breastfeeding' || pregnancy === 'trying';
    const isHormonal = hormonal === 'yes' || hormonal === 'sometimes';
 
    const data = {
      mild: {
        title: 'Mild Acne Skin',
        desc: 'Your skin has occasional breakouts manageable with targeted, gentle actives and a consistent lightweight routine.',
        steps: () => {
          const s = [
            ['Gentle salicylic acid cleanser', 'Unclogs pores without stripping the barrier'],
            [isOily ? 'Niacinamide 10% + zinc serum' : 'Niacinamide 10% serum', 'Regulates oil & visibly reduces pore size'],
            [isDry ? 'Hydrating gel-cream moisturiser' : 'Oil-free gel moisturiser', 'Lightweight, non-comedogenic hydration'],
            ['SPF 50 broad-spectrum', 'Every morning — prevents post-acne marks darkening']
          ];
          if (isHormonal && !isPregnant) s.push(['Consider spearmint or zinc supplements', 'May help regulate hormonal acne naturally']);
          return s;
        }
      },
      moderate: {
        title: 'Moderate Acne Skin',
        desc: 'Your skin needs consistent attention with the right combination of exfoliants and barrier support.',
        steps: () => {
          const s = [
            [isPregnant ? 'Gentle azelaic acid cleanser' : 'Benzoyl peroxide cleanser (2.5%)', isPregnant ? 'Safe for pregnancy — reduces inflammation' : 'Targets acne-causing bacteria effectively'],
            ['Azelaic acid 15% serum', 'Reduces inflammation & fades dark spots'],
            [isDry ? 'Ceramide-rich moisturiser' : 'Barrier-repair moisturiser', 'Balances actives-induced dryness'],
            ['SPF 50 daily', 'Essential while using active ingredients']
          ];
          if (isSensitive) s.push(['Centella asiatica calming serum', 'Soothes reactive skin between treatments']);
          return s;
        }
      },
      severe: {
        title: 'Severe Acne Skin',
        desc: 'Your skin would benefit from a provider-guided approach with prescription-grade actives alongside a supportive routine.',
        steps: () => {
          const s = [
            ['Medicated cleanser', 'Prescription-grade — your provider will guide you'],
            [isPregnant ? 'Azelaic acid topical (Rx)' : 'Topical retinoid', isPregnant ? 'Safe alternative to retinoids during pregnancy' : 'Accelerates cell turnover & unclogs pores'],
            ['Rich ceramide moisturiser', 'Offsets retinoid-related dryness & tightness'],
            ['High-SPF daily sunscreen', 'Mandatory when using prescription actives']
          ];
          if (isHormonal && gender === 'female' && !isPregnant) s.push(['Hormonal treatment discussion', 'Talk to your provider about spironolactone or the pill']);
          return s;
        }
      },
      none: {
        title: 'Clear, Balanced Skin',
        desc: 'Your skin is in great shape. The goal is protection, maintenance, and building long-term resilience.',
        steps: () => [
          ['Gentle everyday cleanser', 'Morning & evening — keeps skin fresh without stripping'],
          [goals.includes('dark_spots') ? 'Vitamin C + niacinamide serum' : 'Vitamin C serum', 'Brightens, protects, and prevents future damage'],
          [isDry ? 'Rich barrier moisturiser' : 'Balanced moisturiser', 'Maintains your healthy barrier'],
          ['SPF 30–50', 'The single most powerful anti-aging step you can take']
        ]
      }
    };
 
    const d = data[acne] || data['none'];
    const steps = typeof d.steps === 'function' ? d.steps() : d.steps;
    document.getElementById('resultTitle').textContent = d.title;
    document.getElementById('resultDesc').textContent = d.desc;
 
    // Tags
    const tagMap = {
      sensitive: '🌸 Sensitive skin', very_oily: '💦 Very oily', often_oily: '💧 Often oily',
      very_dry: '🌵 Very dry', often_dry: '🪴 Often dry', combination: '🌿 Combination',
      female: '♀️ Female', male: '♂️ Male',
      pregnant: '🤰 Pregnant', breastfeeding: '🍼 Breastfeeding', trying: '🌱 TTC',
      clogged_pores: '🔍 Clogged pores', dark_spots: '🌑 Dark spots', firmness: '💪 Firmness',
      texture: '✨ Texture', glow: '🌟 Glow', rosacea: '🌺 Rosacea'
    };
    const tagKeys = [skinType, sensitivity === 'sensitive' ? 'sensitive' : null,
      ...(goals || []), pregnancy && pregnancy !== 'none' ? pregnancy : null].filter(Boolean);
    document.getElementById('resultTags').innerHTML = tagKeys.map(k =>
      tagMap[k] ? `<span class="result-tag">${tagMap[k]}</span>` : ''
    ).join('');
 
    document.getElementById('routineList').innerHTML = steps.map((s, i) => `
      <div class="result-item">
        <div class="result-num">${i+1}</div>
        <div class="result-item-text"><strong>${s[0]}</strong><span>${s[1]}</span></div>
      </div>
    `).join('');
 
    for (let i = 1; i <= SEGS; i++) document.getElementById('seg' + i).className = 'seg filled';
    showStep('result');
  }
 
  // ─── Restart ──────────────────────────────────────────────────────────────
  function restartQuiz() {
    cur = 1;
    for (const k in answers) delete answers[k];
    for (const k in flags) flags[k] = false;
    stepHistory.length = 0;
    stepHistory.push(1);
    document.querySelectorAll('.opt-card, .img-card, .goal-card').forEach(b => b.classList.remove('selected'));
    document.querySelectorAll('.btn-continue').forEach(b => {
      if (!['next5','next7'].includes(b.id)) b.disabled = true;
    });
    ['allergyText','conditionText','extraText'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
    document.getElementById('pregnancyWarning')?.classList.remove('visible');
    showStep(1);
  }
 
  // Step 5 and 7 continue buttons are always enabled (goals optional, intro no selection needed)
  document.getElementById('next5').disabled = false;
 
  updateProgress();