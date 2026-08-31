(() => {
  const input = document.querySelector('#matcher-jd');
  const submit = document.querySelector('[data-matcher-submit]');
  const counter = document.querySelector('[data-matcher-counter]');
  const status = document.querySelector('[data-matcher-status]');
  const result = document.querySelector('[data-matcher-result]');
  const summary = document.querySelector('[data-matcher-summary]');
  const points = document.querySelector('[data-matcher-points]');
  const overall = document.querySelector('[data-matcher-overall]');
  const scoreReport = document.querySelector('[data-matcher-score-report]');
  const scoreValues = Object.fromEntries(['skills', 'experience', 'industry'].map(key => [key, document.querySelector(`[data-matcher-score="${key}"]`)]));
  const scoreBars = Object.fromEntries(['skills', 'experience', 'industry'].map(key => [key, document.querySelector(`[data-matcher-bar="${key}"]`)]));
  const maxLength = 5000;

  if (!input || !submit || !counter || !status || !result || !summary || !points || !overall || !scoreReport) return;

  const setStatus = (message, type = '') => {
    status.textContent = message;
    status.className = `matcher-status${type ? ` is-${type}` : ''}`;
  };

  const updateCounter = () => {
    counter.textContent = `${input.value.length} / ${maxLength}`;
  };

  const scoreValue = value => Math.max(0, Math.min(100, Math.round(Number(value) || 0)));

  const showResult = data => {
    const isValidJd = data.is_valid_jd === true;
    const scores = data && typeof data.scores === 'object' ? data.scores : {};
    const dimensionValues = Object.fromEntries(['skills', 'experience', 'industry'].map(key => [key, scoreValue(scores[key])]));
    const total = scoreValue(data.overall ?? Math.round(Object.values(dimensionValues).reduce((sum, value) => sum + value, 0) / 3));
    scoreReport.hidden = !isValidJd;
    if (isValidJd) {
      overall.textContent = total;
      Object.entries(dimensionValues).forEach(([key, value]) => {
        scoreValues[key].textContent = value;
        scoreBars[key].style.width = `${value}%`;
        scoreBars[key].parentElement.setAttribute('aria-valuenow', String(value));
      });
    }
    summary.textContent = typeof data.summary === 'string' && data.summary.trim()
      ? data.summary.trim()
      : isValidJd ? '暂未生成契合度说明。' : '这看起来不是一段有效的岗位描述，请粘贴完整的招聘 JD 后再试。';
    const keyPoints = Array.isArray(data.key_points) ? data.key_points.filter(point => typeof point === 'string' && point.trim()).slice(0, 5) : [];
    points.replaceChildren(...(keyPoints.length ? keyPoints : ['暂无明显匹配点。']).map((point, index) => {
      const item = document.createElement('li');
      item.textContent = point;
      item.classList.toggle('is-empty', !keyPoints.length && index === 0);
      return item;
    }));
    result.hidden = false;
    return isValidJd;
  };

  input.addEventListener('input', updateCounter);
  submit.addEventListener('click', async () => {
    const jd = input.value.trim();
    if (!jd) {
      result.hidden = true;
      setStatus('请先粘贴岗位描述，再开始匹配。', 'error');
      input.focus();
      return;
    }
    if (jd.length > maxLength) {
      result.hidden = true;
      setStatus('岗位描述超过 5000 字符，请精简后再试。', 'error');
      return;
    }

    result.hidden = true;
    submit.disabled = true;
    submit.setAttribute('aria-busy', 'true');
    setStatus('正在理解岗位需求并生成匹配解读…', 'loading');
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 25000);

    try {
      const response = await fetch('/api/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jd }),
        signal: controller.signal
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || '暂时无法完成匹配，请稍后再试。');
      const isValidJd = showResult(data);
      setStatus(isValidJd ? '匹配完成。' : '请粘贴真实、完整的岗位 JD 后再试。', isValidJd ? 'success' : 'error');
    } catch (error) {
      const message = error.name === 'AbortError'
        ? '匹配请求超时，请稍后再试。'
        : window.location.protocol === 'file:'
          ? '当前为本地预览。部署到 Vercel 并配置 API Key 后即可使用匹配功能。'
          : error instanceof TypeError
            ? '网络连接或匹配服务暂时不可用，请稍后再试。'
            : (error.message || '暂时无法完成匹配，请稍后再试。');
      setStatus(message, 'error');
    } finally {
      window.clearTimeout(timeout);
      submit.disabled = false;
      submit.removeAttribute('aria-busy');
    }
  });

  updateCounter();
})();
