(function () {
  const CSS = `
    .lb-wrap { position: relative; cursor: zoom-in; display: block; }
    .lb-btn {
      position: absolute; bottom: 10px; right: 10px; z-index: 10;
      display: flex; align-items: center; gap: 6px;
      padding: 7px 13px;
      background: rgba(40, 45, 50, 0.82); color: #fff;
      font-size: 12px; font-weight: 600; border-radius: 6px;
      letter-spacing: 0.02em;
      backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
      opacity: 0; transform: translateY(4px);
      transition: opacity 0.18s ease, transform 0.18s ease;
      pointer-events: none;
      font-family: 'Pretendard', -apple-system, sans-serif;
    }
    .lb-wrap:hover .lb-btn { opacity: 1; transform: translateY(0); }
    .lb-overlay {
      position: fixed; inset: 0; z-index: 9999;
      background: rgba(20, 20, 22, 0.92);
      display: flex; align-items: center; justify-content: center;
      padding: 24px;
      opacity: 0; transition: opacity 0.25s cubic-bezier(.4,0,.2,1);
      cursor: zoom-out;
    }
    .lb-overlay.lb-open { opacity: 1; }
    .lb-img-wrap {
      position: relative; max-width: 90vw; max-height: 90vh;
      transform: scale(0.94);
      transition: transform 0.25s cubic-bezier(.4,0,.2,1);
    }
    .lb-overlay.lb-open .lb-img-wrap { transform: scale(1); }
    .lb-img-wrap img {
      display: block; max-width: 90vw; max-height: 86vh;
      width: auto; height: auto; border-radius: 8px;
      box-shadow: 0 24px 80px rgba(0,0,0,0.5);
    }
    .lb-caption {
      margin-top: 14px; text-align: center;
      font-size: 13px; color: rgba(255,255,255,0.6);
      font-family: 'Pretendard', -apple-system, sans-serif;
      letter-spacing: -0.01em; line-height: 1.6;
    }
    .lb-close {
      position: absolute; top: -14px; right: -14px;
      width: 32px; height: 32px;
      background: rgba(255,255,255,0.12); border: none; border-radius: 50%;
      color: #fff; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      font-size: 16px; line-height: 1; transition: background 0.15s;
    }
    .lb-close:hover { background: rgba(255,255,255,0.22); }
  `;
  const style = document.createElement('style');
  style.textContent = CSS;
  document.head.appendChild(style);
  const overlay = document.createElement('div');
  overlay.className = 'lb-overlay';
  overlay.innerHTML = '<div class="lb-img-wrap"><button class="lb-close" aria-label="닫기">&#x2715;</button><img src="" alt=""><div class="lb-caption"></div></div>';
  document.body.appendChild(overlay);
  const lbImg = overlay.querySelector('img');
  const lbCaption = overlay.querySelector('.lb-caption');
  const lbClose = overlay.querySelector('.lb-close');
  function openLightbox(src, alt, caption) {
    lbImg.src = src; lbImg.alt = alt || ''; lbCaption.textContent = caption || '';
    document.body.style.overflow = 'hidden'; overlay.style.display = 'flex';
    requestAnimationFrame(() => { requestAnimationFrame(() => overlay.classList.add('lb-open')); });
  }
  function closeLightbox() {
    overlay.classList.remove('lb-open'); document.body.style.overflow = '';
    setTimeout(() => { overlay.style.display = 'none'; lbImg.src = ''; }, 260);
  }
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeLightbox(); });
  lbClose.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
  function initLightbox() {
    document.querySelectorAll('.evidence-image img').forEach((img) => {
      if (img.dataset.lb) return;
      img.dataset.lb = '1';
      const container = img.closest('.evidence-image');
      container.classList.add('lb-wrap');
      const btn = document.createElement('div');
      btn.className = 'lb-btn';
      btn.innerHTML = '<svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="5.5" cy="5.5" r="4" stroke="white" stroke-width="1.4"/><path d="M8.5 8.5L11.5 11.5" stroke="white" stroke-width="1.4" stroke-linecap="round"/><path d="M5.5 3.5v4M3.5 5.5h4" stroke="white" stroke-width="1.3" stroke-linecap="round"/></svg>크게 보기';
      container.appendChild(btn);
      const descEl = container.closest('.evidence-item')?.querySelector('.evidence-label');
      const caption = descEl ? descEl.textContent.trim() : '';
      container.addEventListener('click', () => { openLightbox(img.src, img.alt, caption); });
    });
  }
  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', initLightbox); } else { initLightbox(); }
})();
