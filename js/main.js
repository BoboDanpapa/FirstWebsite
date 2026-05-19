// ── LANGUAGE SWITCHER ──
function setLang(lang, btn) {
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    document.querySelectorAll('[data-lang]').forEach(el => {
        const inline = ['SPAN','A','STRONG','EM','SMALL','B','I'].includes(el.tagName);
        el.style.display = el.getAttribute('data-lang') === lang
            ? (inline ? 'inline' : 'block') : 'none';
    });
    document.querySelectorAll('[data-nav-' + lang + ']').forEach(el => {
        el.textContent = el.getAttribute('data-nav-' + lang);
    });
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : lang === 'ja' ? 'ja' : 'en';
    localStorage.setItem('sk-lang', lang);
}

// ── INIT LANGUAGE ──
function initLang() {
    const saved = localStorage.getItem('sk-lang') || 'en';
    const btn = document.querySelector('.lang-btn[onclick*="' + saved + '"]');
    setLang(saved, btn);
}

// ── MODAL ──
function openModal(id) {
    document.getElementById(id).classList.add('open');
    document.body.style.overflow = 'hidden';
}
function closeModal(id) {
    document.getElementById(id).classList.remove('open');
    document.body.style.overflow = '';
}
function closeOut(e, id) {
    if (e.target === document.getElementById(id)) closeModal(id);
}

// ── FILTER ──
function filterActive(btn) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}

// ── FAVOURITE ──
function toggleFav(btn) {
    btn.textContent = btn.textContent.trim() === '🤍' ? '❤️' : '🤍';
}

// ── SCROLL TO ──
function scrollTo(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// ── SMOOTH NAV ──
function initSmoothNav() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const t = document.querySelector(a.getAttribute('href'));
            if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
        });
    });
}

// ── CURRENCY CONVERTER ──
const RATE = 110;
function convertJPY() {
    const v = parseFloat(document.getElementById('jpyInput').value);
    document.getElementById('sgdResult').textContent = isNaN(v) ? 'S$ —' : 'S$ ' + Math.round(v / RATE).toLocaleString();
}
function convertSGD() {
    const v = parseFloat(document.getElementById('sgdInput').value);
    document.getElementById('jpyResult').textContent = isNaN(v) ? '¥ —' : '¥ ' + Math.round(v * RATE).toLocaleString();
}

// ── ROI CALCULATOR ──
function calcROI() {
    const price = parseFloat(document.getElementById('roiPrice').value) || 0;
    const rent = parseFloat(document.getElementById('roiRent').value) || 0;
    const appr = parseFloat(document.getElementById('roiAppreciation').value) || 0;
    const years = parseFloat(document.getElementById('roiYears').value) || 0;
    const annualRent = rent * 12;
    const yieldPct = price > 0 ? ((annualRent / price) * 100).toFixed(2) : 0;
    const totalRent = annualRent * years;
    const futureVal = price * Math.pow(1 + appr / 100, years);
    if (document.getElementById('roiYield')) {
        document.getElementById('roiYield').textContent = yieldPct + '%';
        document.getElementById('roiTotal').textContent = '¥' + Math.round(totalRent / 1000000 * 10) / 10 + 'M';
        document.getElementById('roiValue').textContent = '¥' + Math.round(futureVal / 1000000) + 'M';
    }
}

// ── FAQ TOGGLE ──
function toggleFAQ(el) {
    const ans = el.nextElementSibling;
    const icon = el.querySelector('.faq-icon');
    const isOpen = ans.style.display === 'block';
    ans.style.display = isOpen ? 'none' : 'block';
    if (icon) { icon.textContent = isOpen ? '+' : '−'; icon.style.transform = isOpen ? 'rotate(0)' : 'rotate(45deg)'; }
}

// ── BOOKING TYPE ──
function setViewType(btn) {
    document.querySelectorAll('.type-btn').forEach(b => {
        b.style.background = 'var(--sky-pale)';
        b.style.borderColor = '#d0eaf8';
        b.style.color = 'var(--text-mid)';
    });
    btn.style.background = 'linear-gradient(135deg,var(--sky-dark),var(--sky-mid))';
    btn.style.borderColor = 'var(--sky-dark)';
    btn.style.color = '#fff';
}

// ── FORM SUBMIT ──
function submitBooking(btn) {
    btn.style.display = 'none';
    document.getElementById('bookingSuccess').style.display = 'block';
}
function submitContact(btn) {
    btn.style.display = 'none';
    document.getElementById('contactSuccess').style.display = 'block';
}

// ── ACTIVE NAV ──
function setActiveNav() {
    const page = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href') === page) a.classList.add('active');
    });
}

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
    initLang();
    initSmoothNav();
    setActiveNav();
    if (document.getElementById('roiPrice')) calcROI();
});