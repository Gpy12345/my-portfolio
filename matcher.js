(() => {
  const input = document.querySelector('#matcher-jd');
  const submit = document.querySelector('[data-matcher-submit]');
  const counter = document.querySelector('[data-matcher-counter]');
  const status = document.querySelector('[data-matcher-status]');
  const result = document.querySelector('[data-matcher-result]');
  const summary = document.querySelector('[data-matcher-summary]');
  const points = document.querySelector('[data-matcher-points]');
  const maxLength = 5000;

  if (!input || !submit || !counter || !status || !result || !summary || !points) return;

  const setStatus = (message, type = '') => {
    status.textContent = message;
    status.className = `matcher-status${type ? ` is-${type}` : ''}`;
  };

  const updateCounter = () => {
    counter.textContent = `${input.value.length} / ${maxLength}`;
  };

  const showResult = data => {
    summary.textContent = data.summary;
    points.replaceChildren(...data.matches.map(point => {
      const item = document.createElement('li');
      item.textContent = point;
      return item;
    }));
    result.hidden = false;
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
      showResult(data);
      setStatus('匹配完成。', 'success');
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
