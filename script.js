const modal = document.querySelector('#modal');
const content = document.querySelector('#modal-content');
const projectData = {
  agent: { title: '酒店价格一致性异常检测 Agentic Workflow', subtitle: '个人项目 · Python / LangGraph / SerpApi / Streamlit', duties: [['数据层', ['接入多平台实时报价', '三级状态与自动重试']], ['判断层', ['LLM 处理房型语义匹配', '规则代码判定价格劣势']], ['报告生成', ['两轮 LLM 反思修订', '自动输出结构化 PPT 大纲']], ['全流程设计', ['独立完成架构与选型', '以真实业务规则为边界']]], results: [['端到端验证', '完成批量查询到 AI 预筛的全流程'], ['可追溯判断', '业务规则不依赖语言模型的不确定性'], ['减少人工步骤', '单个 case 不再逐页手动比价']] },
  trip: { title: '携程 Trip.com', subtitle: '海外酒店运营支持实习生', background: 'Trip.com 存在酒店房源相较于 Booking、Agoda 等 OTA 平台价格偏高的风险，影响平台价格竞争力，需要专项人力核实并推动酒店方修正。作为该业务首批实习生，负责独立建立价格排查工作机制，并产出案例分析与谈判支撑材料，服务 APAC 区域运营团队与酒店集团的价格谈判。', duties: [['跨平台价格核实流程', ['独自设计跨平台价格核实流程与飞书多维表格记录模板，与 mentor 共同完善为部门标准化 SOP', '建立案例数据库，按"酒店+入住日期"登记 case']], ['高风险酒店排查', ['每周对 40 家高风险酒店，逐一对比 Trip.com 与官网、Booking、Agoda、Expedia、美团、飞猪等 6 个平台同房型价格', '累计识别 90+起 Trip.com 较其他 OTA 平台的价格劣势']], ['谈判分析报告', ['每周产出分析报告，拆解劣势最严重的酒店集团、国家、OTA 平台分布，并附具体 case 作为佐证', '支撑 APAC 区域运营与酒店集团的谈判会议，必要时现场展示具体 case']]], highlights: [['7+', '酒店集团完成价格修正', '围绕异常价格完成集团侧沟通与跟进'], ['34+', '酒店完成价格修正', '完成跨平台数据核实，3个月内实现全平台统一价'], ['90+', '跨平台价格劣势识别数', '建立案例数据库沉淀标准流程']] },
  dew: { title: '得物', subtitle: '电商运营实习生', duties: [['商家质量分层模型', ['针对运动户外类目商家质量参差、资源分配不够聚焦的问题，对 200+ 商家入驻数据进行统计分析', '参与搭建基于月度 GMV 与在售 SKU 数的商家质量分层模型（高潜/稳定/低活跃），协助团队按分层结果针对性投入资源']], ['头部商家年度复盘', ['参与为头部企业商家制定年度复盘与流量扶持计划，负责数据部分（品牌月度销售趋势、人群分布、营销投入占比分析）', '协助从类目策略、产品定位、经营策略、销售目标四方面输出针对性建议；累计参与完成 12 份年度复盘报告']], ['校园用户增长漏斗', ['参与得物×上海大学会展周活动执行，负责流程对接与现场互动环节，对新增校园用户链路进行漏斗分析（注册→下单→复购）', '通过窗口函数计算留存率，新增用户 7 日留存率 37%']], ['大学生用户深度访谈', ['面向 20-25 岁大学生用户开展 20 场深度访谈，梳理消费痛点（功能性、价格敏感、场景需求）', '撰写 4 份用户画像报告并在团队内共享，为商家选品优先级判断及营销文案方向提供参考']]], highlights: [['17%', '稳定/低活跃商家升级为高潜商家的概率提升', '基于月度 GMV 与在售 SKU 数搭建分层模型，针对性投入资源后的转化效果'], ['12份', '完成年度复盘报告', '覆盖品牌月度销售趋势、人群分布、营销投入占比分析，支撑头部商家经营决策'], ['37%', '新增用户 7 日留存率', '得物×上海大学会展周活动，完成注册→下单→复购全链路漏斗分析'], ['4份', '用户画像报告产出', '基于 20 场大学生深度访谈梳理消费痛点，为商家选品与营销文案方向提供参考']] },
  hema: { title: '盒马', subtitle: '产品实习生', background: '2023 年 3 月，盒马启动 1+6+n 回迁项目，HR 产品团队和技术团队需要在现有的 HR 产品基础上进行更新迭代。', duties: [['员工痛点访谈', ['依据访谈模板对 30 名员工开展深度访谈，收集 HR 产品痛点与建议', '归类整理反馈，形成结构化问题清单并参与需求讨论']], ['北森系统竞品拆解', ['负责“入职流程”模块竞品对照，对北森系统功能点截图记录整理', '梳理页面结构与核心功能点，为盒马 HR 系统设计提供参考']], ['PRD字段与交互文档', ['通过 Demo 模拟记录用户操作路径，撰写字段说明与交互逻辑文档', '记录权限路径异常等问题并提出解决方案，协助完成 PRD 撰写']]], resultStyle: 'qualitative', highlights: [['30名员工', '完成深度访谈与痛点归类', ''], ['北森', '完整梳理竞品页面与功能点', ''], ['PRD文档', '完成字段规则与交互逻辑文档', '']] },
  dew1: { title: '招商数据分析', subtitle: '得物 · 电商运营实习生', duties: [['数据统计', ['分析 200+ 商家入驻路径', '拆解入驻、上架、提报率']], ['商家分层', ['参与 GMV 与 SKU 分层建模', '识别高潜、稳定、低活跃商家']], ['运营支持', ['提供招商优先级依据', '支撑针对性商家运营']]], results: [['200+', '商家路径完成数据统计'], ['17%', '稳定与低活跃升级为高潜的概率提升'], ['分层模型', '以 GMV 与 SKU 为核心变量']] },
  dew2: { title: '商家留存与校园拉新', subtitle: '得物 · 电商运营实习生', duties: [['商家复盘', ['分析销售趋势与人群分布', '参与年度流量扶持计划']], ['用户增长', ['梳理注册到复购的漏斗', '使用窗口函数计算留存']], ['协同执行', ['参与上海大学会展周活动', '负责流程对接与互动环节']]], results: [['12 份', '年度复盘报告'], ['37%', '新增用户 7 日留存率'], ['完整链路', '注册、下单、复购漏斗分析']] },
  dew3: { title: '用户调研', subtitle: '得物 · 电商运营实习生', duties: [['访谈设计', ['面向 20-25 岁大学生', '完成深度访谈与记录']], ['洞察整理', ['梳理功能、价格、场景痛点', '形成可使用的用户画像']], ['业务应用', ['支持选品优先级判断', '支持营销文案方向']]], results: [['20 场', '大学生用户深度访谈'], ['4 份', '用户画像报告'], ['团队共享', '调研结论进入运营决策讨论']] },
  hema1: { title: 'HR 产品用户调研', subtitle: '盒马 · 产品实习生', duties: [['用户访谈', ['对 30 名员工开展访谈', '收集产品使用痛点']], ['问题整理', ['对反馈归类与结构化', '形成问题清单']], ['需求讨论', ['参与后续讨论会议', '支持优化方向制定']]], results: [['30 名', '编制内员工深度访谈'], ['结构化清单', '完整归类产品反馈'], ['需求支持', '问题进入需求讨论流程']] },
  hema2: { title: '竞品分析与需求验证', subtitle: '盒马 · 产品实习生', duties: [['竞品调研', ['对入职流程模块做竞品对照', '梳理页面结构与功能点']], ['PRD 撰写', ['记录 Demo 操作路径', '输出字段规则和交互逻辑']], ['问题验证', ['发现权限路径异常', '提出解决方案']]], results: [['入职流程', '完成模块竞品功能拆解'], ['字段规则', '协助完成 PRD 章节'], ['需求验证', '记录并推动解决操作问题']] }
};
function escapeHtml(value) { return value.replace(/[&<>"']/g, char => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;' })[char]); }
function openModal(key) { const p = projectData[key]; if (!p) return; const isTripAccordion = ['trip', 'dew', 'hema'].includes(key); const duties = p.duties.map(d => isTripAccordion ? `<article class="responsibility trip-accordion-item"><button class="trip-accordion-trigger" type="button" aria-expanded="false"><span class="trip-accordion-icon" aria-hidden="true">✦</span><span>${escapeHtml(d[0])}</span><i class="trip-accordion-chevron" aria-hidden="true"></i></button><div class="trip-accordion-panel" aria-hidden="true"><ul>${d[1].map(x => `<li>${escapeHtml(x)}</li>`).join('')}</ul></div></article>` : `<article class="responsibility"><h3>${escapeHtml(d[0])}</h3><ul>${d[1].map(x => `<li>${escapeHtml(x)}</li>`).join('')}</ul></article>`).join(''); const dutyGridClass = isTripAccordion ? 'responsibility-grid trip-accordion-grid' : key === 'dew' && p.duties.length === 4 ? 'responsibility-grid is-four-up' : 'responsibility-grid'; const highlights = p.highlights ? `<div class="modal-highlight-grid${p.highlights.length === 4 ? ' is-four-up' : ''}">${p.highlights.map(h => `<article class="modal-highlight${p.resultStyle ? ` is-${p.resultStyle}` : ''}"><b>${escapeHtml(h[0])}</b><h4>${escapeHtml(h[1])}</h4>${h[2] ? `<p>${escapeHtml(h[2])}</p>` : ''}</article>`).join('')}</div>` : `<div class="result-grid">${p.results.map(r => `<article class="result"><b>${escapeHtml(r[0])}</b><span>${escapeHtml(r[1])}</span></article>`).join('')}</div>`; const background = p.background ? `<p class="modal-background">${escapeHtml(p.background)}</p>` : ''; content.innerHTML = `<div class="modal-heading"><h2 id="modal-title">${escapeHtml(p.title)}</h2><p>${escapeHtml(p.subtitle)}</p>${background}</div><h3 class="modal-section-title">核心职责 / CORE RESPONSIBILITIES</h3><div class="${dutyGridClass}">${duties}</div><h3 class="modal-section-title">核心成果 / CORE RESULTS</h3>${highlights}`; if (isTripAccordion) { content.querySelectorAll('.trip-accordion-trigger').forEach(trigger => trigger.addEventListener('click', () => { const activeItem = trigger.closest('.trip-accordion-item'); const shouldOpen = !activeItem.classList.contains('is-open'); content.querySelectorAll('.trip-accordion-item').forEach(item => { const isActive = shouldOpen && item === activeItem; item.classList.toggle('is-open', isActive); item.querySelector('.trip-accordion-trigger').setAttribute('aria-expanded', String(isActive)); item.querySelector('.trip-accordion-panel').setAttribute('aria-hidden', String(!isActive)); }); })); } modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; }
function closeModal() { modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; }
document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => openModal(button.dataset.project)));
document.querySelectorAll('[data-close]').forEach(button => button.addEventListener('click', closeModal));
const imageLightbox = document.querySelector('#image-lightbox');
const imageLightboxImage = document.querySelector('#image-lightbox-image');
const imageSlides = [...document.querySelectorAll('[data-lightbox-src]')];
let activeLightboxIndex = 0;
let lightboxRenderRequest = 0;
imageSlides.forEach(slide => {
  const preload = new Image();
  preload.src = slide.dataset.lightboxSrc;
});
const renderImageLightbox = () => {
  const slide = imageSlides[activeLightboxIndex];
  if (!slide || !imageLightboxImage) return;
  const request = ++lightboxRenderRequest;
  const source = slide.dataset.lightboxSrc;
  const alt = slide.querySelector('img')?.alt || slide.getAttribute('aria-label') || '项目截图';
  const pendingImage = new Image();
  let hasApplied = false;
  imageLightboxImage.classList.add('is-switching');
  const applyImage = () => {
    if (hasApplied || request !== lightboxRenderRequest) return;
    hasApplied = true;
    window.setTimeout(() => {
      if (request !== lightboxRenderRequest) return;
      imageLightboxImage.src = source;
      imageLightboxImage.alt = alt;
      requestAnimationFrame(() => requestAnimationFrame(() => imageLightboxImage.classList.remove('is-switching')));
    }, 180);
  };
  pendingImage.addEventListener('load', applyImage, { once: true });
  pendingImage.addEventListener('error', applyImage, { once: true });
  pendingImage.src = source;
  if (pendingImage.complete) applyImage();
};
const openImageLightbox = slide => {
  if (!imageLightbox || !imageLightboxImage) return;
  activeLightboxIndex = Math.max(0, imageSlides.indexOf(slide));
  renderImageLightbox();
  imageLightbox.classList.add('open');
  imageLightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};
const closeImageLightbox = () => {
  if (!imageLightbox) return;
  imageLightbox.classList.remove('open');
  imageLightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};
imageSlides.forEach(slide => {
  slide.addEventListener('click', () => openImageLightbox(slide));
  slide.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openImageLightbox(slide); }
  });
});
document.querySelectorAll('[data-lightbox-close]').forEach(button => button.addEventListener('click', closeImageLightbox));
document.querySelector('[data-lightbox-prev]')?.addEventListener('click', () => { activeLightboxIndex = (activeLightboxIndex - 1 + imageSlides.length) % imageSlides.length; renderImageLightbox(); });
document.querySelector('[data-lightbox-next]')?.addEventListener('click', () => { activeLightboxIndex = (activeLightboxIndex + 1) % imageSlides.length; renderImageLightbox(); });
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') { closeModal(); closeImageLightbox(); }
  if (!imageLightbox?.classList.contains('open')) return;
  if (event.key === 'ArrowLeft') { activeLightboxIndex = (activeLightboxIndex - 1 + imageSlides.length) % imageSlides.length; renderImageLightbox(); }
  if (event.key === 'ArrowRight') { activeLightboxIndex = (activeLightboxIndex + 1) % imageSlides.length; renderImageLightbox(); }
});
const navLinks = [...document.querySelectorAll('.nav-link')]; const sections = [...new Set(navLinks.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean))];
const navObserver = new IntersectionObserver(entries => { const activeEntry = entries.filter(entry => entry.isIntersecting).sort((a,b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top))[0]; if (!activeEntry) return; navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${activeEntry.target.id}`)); }, { rootMargin: '-18% 0px -68% 0px', threshold: 0 }); sections.forEach(section => navObserver.observe(section));
const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), { threshold: .14 }); document.querySelectorAll('.reveal').forEach(item => observer.observe(item));
const toast = document.querySelector('#toast'); document.querySelectorAll('[data-coming-soon]').forEach(button => button.addEventListener('click', () => { toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 1800); }));

document.querySelectorAll('[data-carousel]').forEach(carousel => {
  const track = carousel.querySelector('.creator-carousel-track');
  const slides = [...carousel.querySelectorAll('.creator-carousel-slide')];
  const dots = [...carousel.querySelectorAll('[data-carousel-dot]')];
  const count = carousel.querySelector('[data-carousel-count]');
  const previous = carousel.querySelector('[data-carousel-prev]');
  const next = carousel.querySelector('[data-carousel-next]');
  let index = 0;
  if (!track || !slides.length) return;
  const render = () => {
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((dot, dotIndex) => {
      const active = dotIndex === index;
      dot.classList.toggle('is-active', active);
      dot.setAttribute('aria-current', active ? 'true' : 'false');
    });
    if (count) count.textContent = `${String(index + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
  };
  previous?.addEventListener('click', () => { index = (index - 1 + slides.length) % slides.length; render(); });
  next?.addEventListener('click', () => { index = (index + 1) % slides.length; render(); });
  dots.forEach(dot => dot.addEventListener('click', () => { index = Number(dot.dataset.carouselDot); render(); }));
  render();
});

const flowObserver = new IntersectionObserver(entries => entries.forEach(entry => {
  if (!entry.isIntersecting) return;
  entry.target.classList.add('is-flow-active');
  flowObserver.unobserve(entry.target);
}), { threshold: .35 });
document.querySelectorAll('[data-flow]').forEach(flow => flowObserver.observe(flow));
