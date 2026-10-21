// ===================================================================
// VideoScript AI Studio - Core Frontend Logic (Multi-Image & Multi-Video)
// ===================================================================

let state = {
  images: [], // Array of { id, imageBase64, mimeType, name }
  generatedData: null,
  activeTab: 'generator',
  activeResultSubTab: 'scenes',
  selectedVideoIndex: 0,
  activeVideoModel: 'veo3', // 'veo3', 'grok', 'muse', 'seedance'
  apiConfig: {
    apiKey: '',
    model: 'gpt-6-luna',
    customModel: '',
    protocol: 'auto', // 'auto', 'responses', 'messages'
    maxTokens: 16000,
    apiUrl: 'https://opencode.ai/zen/go/v1'
  }
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  loadSavedApiConfig();
  setupDropzone();
  setupGlobalPaste();
  loadSampleVideoAnalysis();
  loadBackgroundThemes();
  loadBagShapes();
});

// Fill the clear-bag shape selector from the server
async function loadBagShapes() {
  const sel = document.getElementById('selBagShape');
  if (!sel) return;
  try {
    const res = await fetch('/api/bag-shapes');
    if (!res.ok) return;
    const shapes = await res.json();
    shapes.forEach(s => {
      const opt = document.createElement('option');
      opt.value = s.id;
      opt.textContent = s.name_vi.charAt(0).toUpperCase() + s.name_vi.slice(1);
      sel.appendChild(opt);
    });
  } catch (err) {
    console.warn('Không tải được danh sách kiểu túi:', err);
  }
}

// Render all background themes from the server pool into the selector
const BG_TAG_LABELS = { food: 'Đồ ăn', beverage: 'Đồ uống', tea: 'Trà/Thảo mộc', sweets: 'Bánh kẹo', dried: 'Đồ khô', sauce: 'Sốt/Gia vị', beauty: 'Mỹ phẩm', tech: 'Công nghệ', home: 'Gia dụng', fashion: 'Thời trang', generic: 'Đa năng' };
const DEFAULT_BG_ID = 'scandi_oak';

async function loadBackgroundThemes() {
  const container = document.getElementById('bgPoolCards');
  if (!container) return;
  try {
    const res = await fetch('/api/backgrounds');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const themes = await res.json();
    container.innerHTML = themes.map(t => `
      <label class="bg-option-card${t.id === DEFAULT_BG_ID ? ' active' : ''}" id="bgCard_${t.id}">
        <input type="radio" name="bgChoice" value="${t.id}"${t.id === DEFAULT_BG_ID ? ' checked' : ''} onchange="handleBgChange(this)">
        <div class="bg-card-body">
          <div class="bg-icon">${t.icon}</div>
          <div class="bg-info">
            <span class="bg-name">${escapeHTML(t.theme_name)}</span>
            <span class="bg-desc">${escapeHTML(t.environment_setting)} · <i>${t.tags.map(tag => BG_TAG_LABELS[tag] || tag).join(', ')}</i></span>
          </div>
        </div>
      </label>`).join('');
  } catch (err) {
    console.warn('Không tải được danh sách background:', err);
    container.innerHTML = `<p class="field-hint" style="color:#f87171;">⚠️ Không tải được danh sách background (${escapeHTML(err.message)}). Hãy khởi động lại server (Ctrl + C rồi node server.js) và tải lại trang.</p>`;
  }
  // Fall back to Auto if nothing is selected (e.g. API failed)
  if (!document.querySelector('input[name="bgChoice"]:checked')) {
    const auto = document.querySelector('input[name="bgChoice"][value="auto"]');
    if (auto) { auto.checked = true; handleBgChange(auto); }
  }
}

// ===================================================================
// Tab Navigation
// ===================================================================
function switchTab(tabId) {
  state.activeTab = tabId;
  const tabBtnGen = document.getElementById('tabBtnGenerator');
  const tabBtnAna = document.getElementById('tabBtnAnalysis');
  const viewGen = document.getElementById('tabGenerator');
  const viewAna = document.getElementById('tabAnalysis');

  if (tabId === 'generator') {
    tabBtnGen.classList.add('active');
    tabBtnAna.classList.remove('active');
    viewGen.style.display = 'block';
    viewAna.style.display = 'none';
  } else {
    tabBtnGen.classList.remove('active');
    tabBtnAna.classList.add('active');
    viewGen.style.display = 'none';
    viewAna.style.display = 'block';
  }
}

function switchResultSubTab(subTabId) {
  state.activeResultSubTab = subTabId;
  const tabScenes = document.getElementById('tabResScenes');
  const tabVideo = document.getElementById('tabResVideo');
  const subtabScenes = document.getElementById('subtabScenes');
  const subtabVideo = document.getElementById('subtabVideo');

  if (subTabId === 'scenes') {
    tabScenes.classList.add('active');
    tabVideo.classList.remove('active');
    subtabScenes.style.display = 'block';
    subtabVideo.style.display = 'none';
  } else {
    tabScenes.classList.remove('active');
    tabVideo.classList.add('active');
    subtabScenes.style.display = 'none';
    subtabVideo.style.display = 'block';
  }
}

// ===================================================================
// Multi-Image Upload, Drag-Drop & Paste Handling
// ===================================================================
function triggerFileInput() {
  document.getElementById('imageInput').click();
}

function handleFileSelect(event) {
  const files = Array.from(event.target.files || []);
  if (files.length > 0) {
    addFilesToState(files);
  }
  // Reset input value so same files can be selected again if needed
  event.target.value = '';
}

function setupDropzone() {
  const dropzone = document.getElementById('dropzone');

  ['dragenter', 'dragover'].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropzone.classList.add('dragover');
    });
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropzone.classList.remove('dragover');
    });
  });

  dropzone.addEventListener('drop', (e) => {
    const files = Array.from(e.dataTransfer.files || []);
    const imgFiles = files.filter(f => f.type.startsWith('image/'));
    if (imgFiles.length > 0) {
      addFilesToState(imgFiles);
    }
  });
}

// Global Ctrl+V paste support for appending images
function setupGlobalPaste() {
  document.addEventListener('paste', (e) => {
    const items = (e.clipboardData || e.originalEvent.clipboardData).items;
    for (let index in items) {
      const item = items[index];
      if (item.kind === 'file' && item.type.startsWith('image/')) {
        const blob = item.getAsFile();
        addFilesToState([blob], 'Dán từ clipboard');
        showToast("Đã dán thêm 1 ảnh sản phẩm từ clipboard!");
        break;
      }
    }
  });
}

function addFilesToState(files, defaultName = 'Ảnh sản phẩm') {
  let pending = files.length;
  files.forEach(file => {
    if (!file.type.startsWith('image/')) {
      pending--;
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      state.images.push({
        id: 'img_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
        imageBase64: e.target.result,
        mimeType: file.type || 'image/jpeg',
        name: file.name || defaultName
      });
      pending--;
      if (pending <= 0) {
        renderImagesGrid();
        showToast(`Đã nạp ${state.images.length} ảnh tham chiếu của sản phẩm!`);
      }
    };
    reader.readAsDataURL(file);
  });
}

function renderImagesGrid() {
  const empty = document.getElementById('dropzoneEmpty');
  const preview = document.getElementById('dropzonePreview');
  const countLabel = document.getElementById('multiCountLabel');
  const grid = document.getElementById('imagesThumbGrid');

  const count = state.images.length;
  if (count === 0) {
    empty.style.display = 'flex';
    preview.style.display = 'none';
    grid.innerHTML = '';
    return;
  }

  empty.style.display = 'none';
  preview.style.display = 'flex';
  countLabel.innerText = `Đã chọn: ${count} ảnh tham chiếu của sản phẩm`;
  grid.innerHTML = '';

  state.images.forEach((img, idx) => {
    const isCover = idx === 0;
    const card = document.createElement('div');
    card.className = 'thumb-card';
    card.innerHTML = `
      <img src="${img.imageBase64}" alt="${escapeHTML(img.name)}">
      <span class="thumb-badge ${isCover ? 'cover' : ''}">${isCover ? '★ Ảnh chính' : `#${idx + 1}`}</span>
      <button type="button" class="btn-thumb-remove" onclick="removeImage(${idx})" title="Xóa ảnh này">✕</button>
    `;
    grid.appendChild(card);
  });

  // Add "+" tile at the end of grid
  const addTile = document.createElement('div');
  addTile.className = 'btn-thumb-add-tile';
  addTile.onclick = triggerFileInput;
  addTile.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
    <span>Thêm ảnh</span>
  `;
  grid.appendChild(addTile);
}

function removeImage(index) {
  state.images.splice(index, 1);
  renderImagesGrid();
  showToast("Đã xóa 1 ảnh.");
}

function clearAllImages() {
  state.images = [];
  document.getElementById('imageInput').value = '';
  renderImagesGrid();
  showToast("Đã xóa toàn bộ ảnh.");
}

// Quick Sample: Load single sample image
async function loadSampleImage(url, name) {
  try {
    showToast(`Đang nạp ảnh mẫu: ${name}...`);
    const response = await fetch(url);
    const blob = await response.blob();
    const reader = new FileReader();
    reader.onload = (e) => {
      state.images = [{
        id: 'img_' + Date.now(),
        imageBase64: e.target.result,
        mimeType: blob.type || 'image/jpeg',
        name: name
      }];
      renderImagesGrid();
      showToast(`Đã nạp thành công ảnh mẫu ${name}!`);
    };
    reader.readAsDataURL(blob);
  } catch (err) {
    console.error("Error loading sample image:", err);
    showToast("Không thể nạp ảnh mẫu, vui lòng tải ảnh thủ công.");
  }
}

// Quick Sample: Load multi-sample bundle (Noodles vs Sauce)
async function loadMultiSampleImages(productType = 'noodles') {
  try {
    const isSauce = productType === 'sauce';
    showToast(isSauce ? "Đang nạp bộ 3 ảnh tham chiếu Sốt Gà Chiên (Hũ sốt, cánh gà rán, thìa múc sốt)..." : "Đang nạp bộ 3 ảnh tham chiếu mì Indomie (Bao bì, vắt mì, đĩa thành phẩm)...");
    
    const samples = isSauce ? [
      { url: '/sample_sauce/sauce_01.jpg', name: 'Hũ Sốt Gà Chiên Nước Mắm' },
      { url: '/sample_sauce/sauce_02.jpg', name: 'Cánh gà chiên sốt caramel' },
      { url: '/sample_sauce/sauce_03.jpg', name: 'Thìa múc sốt sánh đặc óng ả' }
    ] : [
      { url: '/sample_frames/frame_03.jpg', name: 'Gói mì bao bì ngoài' },
      { url: '/sample_frames/frame_05.jpg', name: 'Vắt mì bên trong bát sứ' },
      { url: '/sample_frames/frame_16.jpg', name: 'Thành phẩm tô mì hoàn chỉnh' }
    ];

    state.images = [];
    for (const s of samples) {
      const res = await fetch(s.url);
      const blob = await res.blob();
      await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          state.images.push({
            id: 'img_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
            imageBase64: e.target.result,
            mimeType: blob.type || 'image/jpeg',
            name: s.name
          });
          resolve();
        };
        reader.readAsDataURL(blob);
      });
    }

    renderImagesGrid();
    showToast(isSauce ? "Đã nạp bộ 3 ảnh tham chiếu Sốt Gà Chiên Nước Mắm!" : "Đã nạp thành công bộ 3 ảnh tham chiếu mì Indomie!", "success");
  } catch (err) {
    console.error("Error loading multi-sample images:", err);
    showToast("Lỗi khi nạp ảnh mẫu.");
  }
}

// Quick Sample: Load full demo results (Master GPT prompt & Multi-model video/image prompts)
async function loadSampleResultsDemo(productType = 'noodles') {
  try {
    const isSauce = productType === 'sauce';
    showToast(isSauce ? "Đang nạp kịch bản mẫu Sốt Gà Chiên (3 món nấu thực tế với sốt)..." : "Đang nạp kịch bản mẫu Mì Indomie (3 công thức nấu khác biệt)...");
    await loadMultiSampleImages(productType);
    const res = await fetch(`/api/sample-results?type=${productType}`);
    if (!res.ok) throw new Error("Không thể tải kết quả mẫu.");
    const sampleJson = await res.json();
    state.generatedData = sampleJson.data;
    state.selectedVideoIndex = 0;
    renderResults(sampleJson);
    showToast(isSauce ? "Đã hiển thị mẫu Sốt Gà Chiên (Cánh gà chiên, BBQ than hồng, Bò lúc lắc chảo lửa)!" : "Đã hiển thị mẫu Mì Indomie (Trộn lòng đào, Xào hải sản wok-hei, Lẩu phô mai lava)!", "success");
  } catch (err) {
    console.error("Error loading sample results demo:", err);
    showToast("Lỗi khi nạp kết quả mẫu.");
  }
}

// ===================================================================
// Background & Parameter Controls
// ===================================================================
function handleBgChange(radioInput) {
  // Remove .active class from all cards
  const allCards = document.querySelectorAll('.bg-option-card');
  allCards.forEach(c => c.classList.remove('active'));

  // Add .active to the parent card of selected input
  if (radioInput && radioInput.closest('.bg-option-card')) {
    radioInput.closest('.bg-option-card').classList.add('active');
  }

  // Toggle custom textarea if value is 'custom'
  toggleCustomBgInput(radioInput.value === 'custom');
}

function toggleCustomBgInput(isCustom) {
  const wrap = document.getElementById('customBgWrap');
  if (wrap) {
    wrap.style.display = isCustom ? 'flex' : 'none';
  }
}

function updateVideosLabel(val) {
  document.getElementById('valVideos').innerText = `${val} video khác nhau`;
}

function updateDurationLabel(val) {
  document.getElementById('valDuration').innerText = `${val} giây`;
}

function updateScenesLabel(val) {
  document.getElementById('valScenes').innerText = `${val} cảnh`;
}

// ===================================================================
// Generation Trigger & API Call
// ===================================================================
async function startGeneration() {
  if (state.images.length === 0) {
    showToast("Vui lòng tải lên ít nhất một ảnh sản phẩm trước khi phân tích!", "warning");
    document.getElementById('dropzone').scrollIntoView({ behavior: 'smooth' });
    return;
  }

  // Collect form parameters
  const bgOptionRadio = document.querySelector('input[name="bgChoice"]:checked');
  const backgroundOption = bgOptionRadio ? bgOptionRadio.value : 'auto';
  const customBackground = document.getElementById('customBgText').value || '';

  const numVideos = parseInt(document.getElementById('sliderVideos').value) || 3;
  const videoDuration = parseInt(document.getElementById('sliderDuration').value) || 15;
  const numScenes = parseInt(document.getElementById('sliderScenes').value) || 5;

  const ratioRadio = document.querySelector('input[name="aspectRatio"]:checked');
  const aspectRatio = ratioRadio ? ratioRadio.value : '9:16';

  const langRadio = document.querySelector('input[name="promptLanguage"]:checked');
  const promptLanguage = langRadio ? langRadio.value : 'en';

  const bagChk = document.getElementById('chkBagOverride');
  const packagingOverride = bagChk && bagChk.checked
    ? { enabled: true, shape: document.getElementById('selBagShape')?.value || 'random' }
    : null;

  const extraNotes = document.getElementById('extraNotes').value || '';

  // Determine active model
  let effectiveModel = state.apiConfig.model;
  if (effectiveModel === 'custom' && state.apiConfig.customModel.trim()) {
    effectiveModel = state.apiConfig.customModel.trim();
  }

  // Show loading state
  showLoadingState(numVideos, state.images.length);

  try {
    const payload = {
      images: state.images.map(img => ({
        imageBase64: img.imageBase64,
        mimeType: img.mimeType
      })),
      apiKey: state.apiConfig.apiKey,
      model: effectiveModel,
      baseUrl: state.apiConfig.apiUrl,
      protocol: state.apiConfig.protocol,
      maxTokens: state.apiConfig.maxTokens || 16000,
      backgroundOption,
      customBackground,
      videoDuration,
      numScenes,
      numVideos,
      aspectRatio,
      promptLanguage,
      packagingOverride,
      additionalPrompt: extraNotes
    };

    // Start a background job, then poll — avoids the ~100s request limit of Cloudflare tunnels
    const startRes = await fetch('/api/generate-job', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const started = await readJsonSafe(startRes);
    if (!startRes.ok || !started.jobId) {
      showErrorState(started.error || `Không khởi tạo được tiến trình (HTTP ${startRes.status})`, started);
      return;
    }

    let job;
    for (;;) {
      await new Promise(r => setTimeout(r, 3000));
      const pollRes = await fetch(`/api/jobs/${started.jobId}`);
      job = await readJsonSafe(pollRes);
      if (!pollRes.ok || job.error) {
        showErrorState(job.error || `Lỗi khi kiểm tra tiến trình (HTTP ${pollRes.status})`, job);
        return;
      }
      if (job.done) break;
    }

    const result = job.result || {};
    if (job.status >= 400 || !result.success || result.error) {
      const errMsg = result.error || `Lỗi máy chủ HTTP ${job.status}`;
      showErrorState(errMsg, result);
      return;
    }

    state.generatedData = result.data;
    state.selectedVideoIndex = 0;

    // Render results
    renderResults(result);

    if (result.notice) {
      showToast(result.notice, "info");
    } else if (result.warning) {
      showToast(result.warning, "warning");
    } else {
      showToast(`Đã phân tích ${state.images.length} ảnh tham chiếu & sinh ${numVideos} video thành công!`, "success");
    }

  } catch (err) {
    console.error("Generation Error:", err);
    showErrorState(err.message || "Không thể kết nối đến máy chủ xử lý.");
  }
}

// Loading UI handling
let loadingInterval = null;
function showLoadingState(numVideos = 3, imageCount = 1) {
  document.getElementById('resultsEmpty').style.display = 'none';
  document.getElementById('resultsContent').style.display = 'none';
  document.getElementById('resultsError').style.display = 'none';
  document.getElementById('resultsLoading').style.display = 'flex';

  const statusText = document.getElementById('loadingStatusText');
  const messages = [
    `AI đang đối chiếu & phân tích ${imageCount} góc chụp của sản phẩm qua OpenCode Go...`,
    `Đang thiết kế ${numVideos} video với Cảnh 1 bắt buộc: Tay mở thùng carton hé lộ sản phẩm...`,
    `Đang thay thế hoàn toàn bối cảnh và tạo các kịch bản hành động không trùng lặp...`,
    `Đang tính toán chuyển động máy quay và âm thanh ASMR cho từng kịch bản...`,
    `Đang tối ưu prompts Midjourney v6.1 & kịch bản video 15s cho Runway/Kling...`
  ];

  let msgIndex = 0;
  statusText.innerText = messages[0];
  loadingInterval = setInterval(() => {
    msgIndex = (msgIndex + 1) % messages.length;
    statusText.innerText = messages[msgIndex];
  }, 2200);
}

function hideLoadingState(hasResults = true) {
  if (loadingInterval) clearInterval(loadingInterval);
  document.getElementById('resultsLoading').style.display = 'none';
  if (hasResults) {
    document.getElementById('resultsContent').style.display = 'block';
    document.getElementById('resultsError').style.display = 'none';
    document.getElementById('resultsEmpty').style.display = 'none';
  } else {
    document.getElementById('resultsContent').style.display = 'none';
    document.getElementById('resultsEmpty').style.display = 'flex';
  }
}

// Error state display: STRICT REQUIREMENT - NO FALLBACK SCRIPTS ALLOWED ON ERROR
function showErrorState(errorMsg, details = null) {
  if (loadingInterval) clearInterval(loadingInterval);
  document.getElementById('resultsLoading').style.display = 'none';
  document.getElementById('resultsContent').style.display = 'none';
  document.getElementById('resultsEmpty').style.display = 'none';

  const errorCard = document.getElementById('resultsError');
  const errorMsgEl = document.getElementById('resultsErrorMsg');
  const errorCodeBlock = document.getElementById('resultsErrorCodeBlock');

  errorMsgEl.innerText = errorMsg;

  let detailsHtml = `<div><b>Thông báo từ hệ thống:</b> ${escapeHTML(errorMsg)}</div>`;
  if (details) {
    if (details.endpoint) {
      detailsHtml += `<div style="margin-top:4px;"><b>Endpoint đã gọi:</b> <code>${escapeHTML(details.endpoint)}</code></div>`;
    }
    if (details.model) {
      detailsHtml += `<div style="margin-top:2px;"><b>Model:</b> <code>${escapeHTML(details.model)}</code></div>`;
    }
    if (details.raw_sample) {
      detailsHtml += `<div style="margin-top:4px; font-size:0.75rem; color:#f87171;"><b>Dữ liệu thô bị ngắt quãng:</b> <code>${escapeHTML(details.raw_sample)}</code></div>`;
    }
  }

  errorCodeBlock.innerHTML = detailsHtml;
  errorCard.style.display = 'block';
  errorCard.scrollIntoView({ behavior: 'smooth' });

  showToast(`Lỗi: ${errorMsg}`, "error");
}

// ===================================================================
// Render Results UI (Multi-Video Supported)
// ===================================================================
function renderResults(result) {
  hideLoadingState(true);
  const data = result.data;
  const videos = data.videos || [];
  const totalVideos = videos.length;
  const imagesAnalyzed = result.images_analyzed || state.images.length || 1;

  // 1. Top Summary Card
  const analysis = data.product_analysis || {};
  document.getElementById('resProductName').innerText = analysis.product_name || "Sản Phẩm Thương Mại";
  document.getElementById('resProductVibe').innerText = `${analysis.category || 'Tiêu dùng'} • ${analysis.target_vibe || 'Hấp dẫn, hiện đại'}`;
  
  const modelUsed = result.model || state.apiConfig.model;
  const protocolUsed = result.protocol_used || (modelUsed.includes('claude') ? 'messages' : 'responses');
  const isRealAI = result.source === 'opencode_go';
  
  const modelBadgeEl = document.getElementById('resModelBadge');
  if (isRealAI) {
    modelBadgeEl.innerHTML = `✅ Dữ Liệu Thực Từ OpenCode Go (${modelUsed} • /${protocolUsed})`;
    modelBadgeEl.className = 'summary-badge ai-real';
  } else if (result.source === 'sample_demo') {
    const isSauce = result.type === 'sauce';
    modelBadgeEl.innerHTML = `✨ Kịch Bản Mẫu Sáng Tạo (${isSauce ? '🍗 Sốt Gà Chiên: 3 Món Nấu Thực Tế' : '🍜 Mì Indomie: 3 Công Thức Độc Đáo'})`;
    modelBadgeEl.className = 'summary-badge ai-real';
  } else {
    modelBadgeEl.innerHTML = `⚠️ Dữ Liệu Dự Phòng Offline (Fallback Simulation)`;
    modelBadgeEl.className = 'summary-badge ai-fallback';
  }

  document.getElementById('resBgBadge').innerText = `Background: ${data.background_applied?.theme_name || 'Đã áp dụng'}`;
  document.getElementById('resVideosCountBadge').innerText = `${totalVideos} Video (${imagesAnalyzed} Ảnh tham chiếu)`;

  // Tags & colors
  const tagsContainer = document.getElementById('resProductTags');
  tagsContainer.innerHTML = '';

  if (analysis.key_colors && Array.isArray(analysis.key_colors)) {
    analysis.key_colors.forEach(colStr => {
      const match = colStr.match(/#[0-9a-fA-F]{3,6}/);
      const hex = match ? match[0] : '#7c4dff';
      const tag = document.createElement('div');
      tag.className = 'product-tag';
      tag.innerHTML = `<span class="color-dot" style="background:${hex}"></span> ${colStr}`;
      tagsContainer.appendChild(tag);
    });
  }

  if (analysis.materials_and_textures) {
    const matTag = document.createElement('div');
    matTag.className = 'product-tag';
    matTag.innerHTML = `💎 ${analysis.materials_and_textures}`;
    tagsContainer.appendChild(matTag);
  }

  // 2. Render Video Variations Selector Bar
  const videoTabsTrack = document.getElementById('videoTabsTrack');
  videoTabsTrack.innerHTML = '';

  videos.forEach((vid, vIdx) => {
    const tabBtn = document.createElement('button');
    tabBtn.type = 'button';
    tabBtn.className = `btn-video-tab ${vIdx === state.selectedVideoIndex ? 'active' : ''}`;
    // Short, elegant title on the tab button to prevent breaking layout
    const shortTheme = vid.title_vi ? vid.title_vi.split(':')[1]?.split('(')[0]?.trim() || `Bản ${vIdx + 1}` : `Bản ${vIdx + 1}`;
    tabBtn.innerHTML = `<span>🎬 Video ${vid.video_id || vIdx + 1}: ${escapeHTML(shortTheme)}</span>`;
    tabBtn.onclick = () => selectVideoVariation(vIdx);
    videoTabsTrack.appendChild(tabBtn);
  });

  // Display initial selected video
  displaySelectedVideo(state.selectedVideoIndex);

  // Scroll smoothly to results
  document.querySelector('.results-panel').scrollIntoView({ behavior: 'smooth' });
}

function selectVideoVariation(index) {
  state.selectedVideoIndex = index;
  
  // Update tabs active state
  const tabs = document.querySelectorAll('.btn-video-tab');
  tabs.forEach((tab, i) => {
    if (i === index) tab.classList.add('active');
    else tab.classList.remove('active');
  });

  displaySelectedVideo(index);
}

function displaySelectedVideo(index) {
  const videos = state.generatedData?.videos || [];
  const currentVideo = videos[index] || videos[0];
  if (!currentVideo) return;

  const bgInfo = currentVideo.background_applied || state.generatedData?.background_applied || {};
  const themeName = bgInfo.theme_name || 'Bối cảnh độc quyền';
  const surface = bgInfo.surface_material || '';
  const lighting = bgInfo.lighting_style || '';

  // Update Top Background Badge
  const resBgBadge = document.getElementById('resBgBadge');
  if (resBgBadge) {
    resBgBadge.innerText = `Bối cảnh: ${themeName}`;
  }

  // Update Concept highlight box with rich background & surface tags
  document.getElementById('currentVideoTitle').innerText = currentVideo.title_vi || `Kịch Bản ${index + 1}`;
  document.getElementById('currentVideoVibe').innerHTML = `
    <div style="margin-bottom: 6px; font-weight: 500;">✨ <b>Phong cách:</b> ${escapeHTML(currentVideo.concept_vibe || 'ASMR & Hero Commercial')}</div>
    <div class="concept-meta-tags">
      <span class="concept-tag bg-tag">🏷️ <b>Bối cảnh:</b> ${escapeHTML(themeName)}</span>
      ${currentVideo.hook_variant?.name_vi ? `<span class="concept-tag">📦 <b>Hook:</b> ${escapeHTML(currentVideo.hook_variant.name_vi)}</span>` : ''}
      ${currentVideo.story_structure ? `<span class="concept-tag">🎞️ <b>Kịch bản:</b> ${escapeHTML(currentVideo.story_structure)}</span>` : ''}
      ${state.generatedData?.product_analysis?.intended_use ? `<span class="concept-tag">🎯 <b>Công dụng:</b> ${escapeHTML(state.generatedData.product_analysis.intended_use)}</span>` : ''}
      ${state.generatedData?.packaging_override?.name_vi ? `<span class="concept-tag">🛍️ <b>Bao bì mới:</b> ${escapeHTML(state.generatedData.packaging_override.name_vi)}</span>` : ''}
      ${state.generatedData?.product_backgrounds ? `<span class="concept-tag">🧭 <b>Bộ bối cảnh riêng:</b> ${state.generatedData.product_backgrounds.total} bối cảnh cho sản phẩm này (đã dùng ${Math.min(state.generatedData.product_backgrounds.used_before + (state.generatedData.videos?.length || 0), state.generatedData.product_backgrounds.total)})</span>` : ''}
      ${surface ? `<span class="concept-tag surface-tag">🪵 <b>Bề mặt:</b> ${escapeHTML(surface)}</span>` : ''}
      ${lighting ? `<span class="concept-tag light-tag">💡 <b>Ánh sáng:</b> ${escapeHTML(lighting)}</span>` : ''}
    </div>
  `;

  // Render scenes for this video
  const scenesList = document.getElementById('scenesList');
  scenesList.innerHTML = '';
  const scenes = currentVideo.scenes || [];
  document.getElementById('sceneCountLabel').innerText = scenes.length;

  // Card list: scene 1 (closed box), extra hook image 1B (opened box, not a scene), then the other scenes
  const cardItems = [];
  scenes.forEach((scene, idx) => {
    const isFirstScene = scene.scene_number === 1;
    cardItems.push({
      scene, key: idx, isHook: isFirstScene,
      badge: isFirstScene
        ? `📦 CẢNH 1A (HOOK - THÙNG ĐÓNG): ${escapeHTML((currentVideo.hook_variant?.name_vi || 'Tay mở thùng').toUpperCase())}`
        : `✨ CẢNH ${scene.scene_number}: SÁNG TẠO ĐA DẠNG`
    });
    if (isFirstScene && currentVideo.hook_reveal_image) {
      cardItems.push({
        scene: currentVideo.hook_reveal_image, key: 'reveal', isHook: true,
        badge: '📦 CẢNH 1B (HOOK - MỞ THÙNG): ẢNH PHỤ, KHÔNG TÍNH VÀO SỐ CẢNH'
      });
    }
  });

  cardItems.forEach(({ scene, key, isHook, badge }) => {
    const idx = key;
    const keyArg = typeof key === 'string' ? `'${key}'` : key;
    const card = document.createElement('div');
    card.className = `scene-card ${isHook ? 'mandatory-hook' : ''}`;

    const defaultPrompt = scene.image_prompt_gpt || scene.image_prompt || '';

    card.innerHTML = `
      <div class="scene-card-top">
        <span class="scene-badge-pill ${isHook ? 'hook' : 'creative'}">
          ${badge}
        </span>
        <button class="btn-copy-sm" onclick="copyActiveScenePrompt(${index}, ${keyArg})">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          Sao Chép Prompt Này
        </button>
      </div>

      <h3 class="scene-title">${escapeHTML(scene.title_vi || `Cảnh ${scene.scene_number}`)}</h3>
      <p class="scene-desc-vi">${escapeHTML(scene.description_vi || '')}</p>

      <div class="scene-specs-row">
        <div class="spec-item"><b>Camera:</b> ${escapeHTML(scene.camera_angle || 'Standard')}</div>
        <div class="spec-item"><b>Ánh sáng:</b> ${escapeHTML(scene.lighting || lighting || 'Studio Warm')}</div>
      </div>

      <!-- Model Prompt Selector Tabs for Scene -->
      <div class="scene-model-tabs-wrap">
        <div class="scene-model-tabs">
          <button type="button" class="btn-model-tab active" data-model="gpt" onclick="switchSceneModelTab(${index}, ${keyArg}, 'gpt', this)">
            <span>🤖 GPT Tạo Ảnh (Single Shot)</span>
          </button>
          <button type="button" class="btn-model-tab" data-model="gemini" onclick="switchSceneModelTab(${index}, ${keyArg}, 'gemini', this)">
            <span>💎 Gemini (Imagen 3)</span>
          </button>
          <button type="button" class="btn-model-tab" data-model="muse" onclick="switchSceneModelTab(${index}, ${keyArg}, 'muse', this)">
            <span>🎨 Muse AI</span>
          </button>
          <button type="button" class="btn-model-tab" data-model="midjourney" onclick="switchSceneModelTab(${index}, ${keyArg}, 'midjourney', this)">
            <span>📸 Midjourney / Flux</span>
          </button>
        </div>

        <div class="anti-collage-pill" id="antiCollageBadge_${idx}">
          🛡️ Pure Single Standalone Shot • Tuyệt đối không vẽ storyboard • Không ghép ảnh
        </div>
      </div>

      <div class="prompt-box-wrap">
        <div class="prompt-code-box" id="scenePromptBox_${idx}" data-active-model="gpt">${escapeHTML(defaultPrompt)}</div>
        ${scene.negative_prompt ? `
          <div class="negative-prompt-box">
            <b>Negative:</b> ${escapeHTML(scene.negative_prompt)}
          </div>
        ` : ''}
      </div>
    `;

    scenesList.appendChild(card);
  });

  // Render Master GPT Prompt
  const gptMasterBox = document.getElementById('masterGptPromptText');
  if (gptMasterBox) {
    gptMasterBox.innerText = currentVideo.master_image_prompt_gpt || "N/A";
  }

  // Render Video Model Prompt
  updateActiveVideoModelPromptDisplay();

  // Render Timeline
  const videoObj = currentVideo.video_prompt || {};
  const timelineList = document.getElementById('videoTimelineList');
  timelineList.innerHTML = '';
  const timeline = videoObj.timeline || [];

  timeline.forEach((item, idx) => {
    const row = document.createElement('div');
    row.className = 'timeline-item';
    row.innerHTML = `
      <div class="timeline-time-badge">
        <span class="time-range">${escapeHTML(item.time_range || `Shot ${idx+1}`)}</span>
        <span class="shot-label">${escapeHTML(item.shot_name ? item.shot_name.split(':')[0] : `Shot ${idx+1}`)}</span>
      </div>
      <div class="timeline-details">
        <h4>${escapeHTML(item.shot_name || `Shot ${idx+1}`)}</h4>
        <p class="timeline-action">${escapeHTML(item.action || item.visual_action || '')}</p>
        <div class="timeline-meta">
          <span class="timeline-tag"><b>Camera:</b> ${escapeHTML(item.camera_motion || 'Smooth')}</span>
          <span class="timeline-tag"><b>Audio ASMR:</b> ${escapeHTML(item.audio_cue || item.sound_fx || 'Ambient')}</span>
        </div>
      </div>
    `;
    timelineList.appendChild(row);
  });
}

// Switch Image Model Tab for Scene
function switchSceneModelTab(videoIdx, sceneIdx, modelKey, btnEl) {
  const parentCard = btnEl.closest('.scene-card');
  parentCard.querySelectorAll('.btn-model-tab').forEach(b => b.classList.remove('active'));
  btnEl.classList.add('active');

  const currentVideo = state.generatedData?.videos?.[videoIdx];
  const scene = sceneIdx === 'reveal' ? currentVideo?.hook_reveal_image : currentVideo?.scenes?.[sceneIdx];
  if (!scene) return;

  const promptBox = document.getElementById(`scenePromptBox_${sceneIdx}`);
  const antiCollageBadge = document.getElementById(`antiCollageBadge_${sceneIdx}`);

  let promptText = "";
  if (modelKey === 'gpt') {
    promptText = scene.image_prompt_gpt || scene.image_prompt;
    if (antiCollageBadge) antiCollageBadge.style.display = 'inline-flex';
  } else if (modelKey === 'gemini') {
    promptText = scene.image_prompt_gemini || scene.image_prompt;
    if (antiCollageBadge) antiCollageBadge.style.display = 'none';
  } else if (modelKey === 'muse') {
    promptText = scene.image_prompt_muse || scene.image_prompt;
    if (antiCollageBadge) antiCollageBadge.style.display = 'none';
  } else if (modelKey === 'midjourney') {
    promptText = scene.image_prompt_midjourney || scene.image_prompt;
    if (antiCollageBadge) antiCollageBadge.style.display = 'none';
  }

  promptBox.innerText = promptText;
  promptBox.setAttribute('data-active-model', modelKey);
}

// Copy prompt for individual scene active model
function copyActiveScenePrompt(videoIdx, sceneIdx) {
  const promptBox = document.getElementById(`scenePromptBox_${sceneIdx}`);
  if (promptBox) {
    navigator.clipboard.writeText(promptBox.innerText);
    const activeModel = promptBox.getAttribute('data-active-model') || 'gpt';
    const names = {
      gpt: 'GPT Tạo Ảnh (DALL-E 3)',
      gemini: 'Gemini (Imagen 3)',
      muse: 'Muse AI',
      midjourney: 'Midjourney / Flux'
    };
    const sceneLabel = sceneIdx === 'reveal' ? '1B' : (sceneIdx === 0 ? '1A' : sceneIdx + 1);
    showToast(`Đã sao chép prompt Cảnh ${sceneLabel} (${names[activeModel] || activeModel.toUpperCase()})!`, "success");
  }
}

// Switch Video Model Tab (Veo 3 / Grok / Muse / Seedance)
function switchVideoModelPromptTab(modelKey) {
  state.activeVideoModel = modelKey;
  document.querySelectorAll('.btn-vmodel-tab').forEach(btn => {
    if (btn.getAttribute('data-vmodel') === modelKey) btn.classList.add('active');
    else btn.classList.remove('active');
  });
  updateActiveVideoModelPromptDisplay();
}

function updateActiveVideoModelPromptDisplay() {
  const videos = state.generatedData?.videos || [];
  const currentVideo = videos[state.selectedVideoIndex] || videos[0];
  if (!currentVideo || !currentVideo.video_prompt) return;

  const vp = currentVideo.video_prompt;
  let promptText = "";
  if (state.activeVideoModel === 'veo3') {
    promptText = vp.video_prompt_veo3 || vp.master_ai_video_prompt;
  } else if (state.activeVideoModel === 'grok') {
    promptText = vp.video_prompt_grok || vp.master_ai_video_prompt;
  } else if (state.activeVideoModel === 'muse') {
    promptText = vp.video_prompt_muse || vp.master_ai_video_prompt;
  } else if (state.activeVideoModel === 'seedance') {
    promptText = vp.video_prompt_seedance || vp.video_prompt_sedan || vp.master_ai_video_prompt;
  }

  const promptBox = document.getElementById('masterVideoPromptText');
  if (promptBox) {
    promptBox.innerText = promptText || "N/A";
  }
}

// Copy active video model prompt
function copyActiveVideoModelPrompt() {
  const el = document.getElementById('masterVideoPromptText');
  if (el) {
    navigator.clipboard.writeText(el.innerText);
    const modelNames = {
      veo3: 'Google Veo 3',
      grok: 'Grok Video',
      muse: 'Muse AI Video',
      seedance: 'Seedance 2.0'
    };
    showToast(`Đã copy prompt video tối ưu cho ${modelNames[state.activeVideoModel] || 'AI Video'}!`, "success");
  }
}

// Copy Master GPT Image Prompt (Anti-Collage)
function copyMasterGptPrompt() {
  const el = document.getElementById('masterGptPromptText');
  if (el) {
    navigator.clipboard.writeText(el.innerText);
    showToast("Đã copy Master Prompt Cho GPT (Chống ghép ảnh / Từng cảnh riêng biệt)!", "success");
  }
}

// Copy prompt for individual scene (backward compatibility)
function copyScenePrompt(videoIdx, sceneIdx) {
  copyActiveScenePrompt(videoIdx, sceneIdx);
}

// Parse a response as JSON; if the server/proxy returned HTML or text, turn it into a readable error
async function readJsonSafe(response) {
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch {
    const hints = {
      401: 'Phiên đăng nhập đã hết hạn — tải lại trang và nhập mật khẩu.',
      403: 'Server chặn truy cập từ bên ngoài (chưa đặt APP_PASSWORD).',
      413: 'Ảnh tải lên quá lớn — hãy giảm số lượng hoặc dung lượng ảnh.',
      502: 'Tunnel không kết nối được tới server — kiểm tra server và cloudflared còn chạy không.',
      524: 'Cloudflare ngắt kết nối do chờ quá lâu.'
    };
    const snippet = text.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 160);
    return { success: false, error: `HTTP ${response.status}: ${hints[response.status] || snippet || 'Phản hồi không hợp lệ từ server.'}` };
  }
}

// Scenes with the extra hook image 1B (opened box) inserted right after scene 1
function scenesWithReveal(video) {
  const scenes = (video && video.scenes) || [];
  if (!video || !video.hook_reveal_image || scenes.length === 0) return scenes;
  return [scenes[0], video.hook_reveal_image, ...scenes.slice(1)];
}

// Copy currently selected video prompts
function copyCurrentVideoPrompts() {
  const currentVideo = state.generatedData?.videos?.[state.selectedVideoIndex];
  if (!currentVideo) return;

  const bgInfo = currentVideo.background_applied || state.generatedData?.background_applied || {};

  let text = `=== ${currentVideo.title_vi.toUpperCase()} ===\n`;
  text += `Ý tưởng: ${currentVideo.concept_vibe}\n`;
  text += `Bối cảnh độc quyền: ${bgInfo.theme_name || ''}\n`;
  if (bgInfo.surface_material) text += `Bề mặt: ${bgInfo.surface_material}\n`;
  if (bgInfo.lighting_style) text += `Ánh sáng: ${bgInfo.lighting_style}\n\n`;

  text += `--- MASTER PROMPT TẠO ẢNH CHO GPT (TỪNG CẢNH RIÊNG BIỆT - CHỐNG GHÉP ẢNH) ---\n`;
  text += `${currentVideo.master_image_prompt_gpt || ''}\n\n`;

  text += `--- CÁC CẢNH ẢNH RIÊNG BIỆT ---\n\n`;
  scenesWithReveal(currentVideo).forEach(s => {
    text += `[${s.title_vi}]\n`;
    text += `Mô tả: ${s.description_vi}\n`;
    text += `Prompt GPT: ${s.image_prompt_gpt || s.image_prompt}\n`;
    text += `Prompt Gemini: ${s.image_prompt_gemini || s.image_prompt}\n`;
    text += `Prompt Muse: ${s.image_prompt_muse || s.image_prompt}\n`;
    text += `Prompt Midjourney: ${s.image_prompt_midjourney || s.image_prompt}\n`;
    if (s.negative_prompt) text += `Negative: ${s.negative_prompt}\n`;
    text += `\n`;
  });

  text += `--- PROMPTS VIDEO ĐA NỀN TẢNG (${currentVideo.video_prompt?.duration_seconds || 15}s) ---\n`;
  text += `[Google Veo 3]:\n${currentVideo.video_prompt?.video_prompt_veo3 || ''}\n\n`;
  text += `[Grok Video]:\n${currentVideo.video_prompt?.video_prompt_grok || ''}\n\n`;
  text += `[Muse Video]:\n${currentVideo.video_prompt?.video_prompt_muse || ''}\n\n`;
  text += `[Seedance 2.0]:\n${currentVideo.video_prompt?.video_prompt_seedance || currentVideo.video_prompt?.video_prompt_sedan || ''}\n`;

  navigator.clipboard.writeText(text);
  showToast(`Đã sao chép toàn bộ nội dung Video ${state.selectedVideoIndex + 1}!`, "success");
}

// Copy ALL Videos Prompts
function copyAllVideosPrompts() {
  if (!state.generatedData || !state.generatedData.videos) return;
  const videos = state.generatedData.videos;

  let text = `=====================================================\n`;
  text += `TỔNG HỢP ${videos.length} KỊCH BẢN VIDEO QUẢNG CÁO SẢN PHẨM\n`;
  text += `Sản phẩm: ${state.generatedData.product_analysis?.product_name}\n`;
  text += `=====================================================\n\n`;

  videos.forEach((vid, vIdx) => {
    const bgInfo = vid.background_applied || {};
    text += `\n*****************************************************\n`;
    text += `VIDEO ${vIdx + 1}: ${vid.title_vi}\n`;
    text += `Phong cách: ${vid.concept_vibe}\n`;
    text += `Bối cảnh độc quyền: ${bgInfo.theme_name || ''}\n`;
    if (bgInfo.surface_material) text += `Bề mặt: ${bgInfo.surface_material}\n`;
    if (bgInfo.lighting_style) text += `Ánh sáng: ${bgInfo.lighting_style}\n`;
    text += `*****************************************************\n\n`;

    text += `[MASTER PROMPT TẠO ẢNH CHO GPT]:\n${vid.master_image_prompt_gpt || ''}\n\n`;

    scenesWithReveal(vid).forEach(s => {
      text += `[${s.title_vi}]\n`;
      text += `GPT: ${s.image_prompt_gpt || s.image_prompt}\n\n`;
    });

    text += `[PROMPT VIDEO VEO 3]:\n${vid.video_prompt?.video_prompt_veo3 || ''}\n\n`;
    text += `[PROMPT VIDEO GROK]:\n${vid.video_prompt?.video_prompt_grok || ''}\n\n`;
    text += `[PROMPT VIDEO MUSE]:\n${vid.video_prompt?.video_prompt_muse || ''}\n\n`;
    text += `[PROMPT VIDEO SEEDANCE 2.0]:\n${vid.video_prompt?.video_prompt_seedance || vid.video_prompt?.video_prompt_sedan || ''}\n\n`;
  });

  navigator.clipboard.writeText(text);
  showToast(`Đã sao chép toàn bộ ${videos.length} kịch bản video vào clipboard!`, "success");
}

// Download JSON
function downloadJSON() {
  if (!state.generatedData) return;
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state.generatedData, null, 2));
  const dlAnchor = document.createElement('a');
  dlAnchor.setAttribute("href", dataStr);
  dlAnchor.setAttribute("download", `video_scripts_${Date.now()}.json`);
  dlAnchor.click();
}

// Download TXT
function downloadTXT() {
  if (!state.generatedData || !state.generatedData.videos) return;
  const videos = state.generatedData.videos;

  let text = `=== BỘ ${videos.length} KỊCH BẢN VIDEO QUẢNG CÁO AI ===\n`;
  text += `Sản phẩm: ${state.generatedData.product_analysis?.product_name}\n`;
  text += `=====================================================\n\n`;

  videos.forEach((vid, i) => {
    const bgInfo = vid.background_applied || {};
    text += `\n-----------------------------------------------------\n`;
    text += `KỊCH BẢN ${i + 1}: ${vid.title_vi}\n`;
    text += `Ý tưởng: ${vid.concept_vibe}\n`;
    text += `Bối cảnh độc quyền: ${bgInfo.theme_name || ''}\n`;
    if (bgInfo.surface_material) text += `Bề mặt: ${bgInfo.surface_material}\n`;
    if (bgInfo.lighting_style) text += `Ánh sáng: ${bgInfo.lighting_style}\n`;
    text += `-----------------------------------------------------\n\n`;

    scenesWithReveal(vid).forEach(s => {
      text += `[${s.title_vi}]\n`;
      text += `Mô tả: ${s.description_vi}\n`;
      text += `Prompt GPT: ${s.image_prompt_gpt || s.image_prompt}\n\n`;
    });

    text += `[MASTER VIDEO PROMPT]\n${vid.video_prompt?.master_ai_video_prompt}\n\n`;
  });

  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const dl = document.createElement('a');
  dl.href = url;
  dl.download = `video_scripts_${Date.now()}.txt`;
  dl.click();
}

function copyTextById(elementId) {
  const el = document.getElementById(elementId);
  if (el) {
    navigator.clipboard.writeText(el.innerText);
    showToast("Đã sao chép nội dung!");
  }
}

// ===================================================================
// Reference Video Analysis Loader (IMG_8804.MP4)
// ===================================================================
async function loadSampleVideoAnalysis() {
  try {
    const res = await fetch('/api/sample-video-analysis');
    if (!res.ok) return;
    const data = await res.json();

    const container = document.getElementById('framesBreakdownContainer');
    if (!container) return;
    container.innerHTML = '';

    (data.scenes_breakdown || []).forEach(sc => {
      const card = document.createElement('div');
      card.className = 'frame-card-row';
      card.innerHTML = `
        <div class="frame-thumbnail-wrap">
          <img src="${sc.frame_img}" alt="${escapeHTML(sc.title)}" loading="lazy">
          <span class="frame-time-tag">${escapeHTML(sc.time)}</span>
        </div>
        <div class="frame-info">
          <h3>${escapeHTML(sc.title)}</h3>
          <p class="frame-action-text">${escapeHTML(sc.action)}</p>
          <div class="frame-specs-grid">
            <div class="frame-spec-box">
              <span>Góc máy & Tiêu cự</span>
              <strong>${escapeHTML(sc.camera)}</strong>
            </div>
            <div class="frame-spec-box">
              <span>Bối cảnh & Ánh sáng</span>
              <strong>${escapeHTML(sc.lighting_environment)}</strong>
            </div>
            <div class="frame-spec-box" style="grid-column: span 2;">
              <span>Âm thanh thực tế (ASMR)</span>
              <strong>🔊 ${escapeHTML(sc.sound_fx)}</strong>
            </div>
          </div>
        </div>
      `;
      container.appendChild(card);
    });

  } catch (err) {
    console.warn("Could not load sample video analysis:", err);
  }
}

// ===================================================================
// API Configuration Modal & LocalStorage
// ===================================================================
function openApiModal() {
  document.getElementById('apiKeyInput').value = state.apiConfig.apiKey || '';
  document.getElementById('modelSelect').value = state.apiConfig.model || 'gpt-6-luna';
  document.getElementById('protocolSelect').value = state.apiConfig.protocol || 'auto';
  document.getElementById('apiUrlInput').value = state.apiConfig.apiUrl || 'https://opencode.ai/zen/go/v1';
  
  const tokens = state.apiConfig.maxTokens || 16000;
  document.getElementById('maxTokensInput').value = tokens;
  updateTokenBadge(tokens);
  syncTokenPresetButtons(tokens);

  if (state.apiConfig.model === 'custom') {
    document.getElementById('customModelWrap').style.display = 'flex';
    document.getElementById('customModelInput').value = state.apiConfig.customModel || '';
  } else {
    document.getElementById('customModelWrap').style.display = 'none';
  }

  document.getElementById('apiModal').style.display = 'flex';
}

function setTokenPreset(tokens) {
  const input = document.getElementById('maxTokensInput');
  if (input) {
    input.value = tokens;
  }
  updateTokenBadge(tokens);
  syncTokenPresetButtons(tokens);
}

function updateTokenBadge(val) {
  const badge = document.getElementById('tokenValBadge');
  if (badge) {
    const num = parseInt(val) || 16000;
    badge.innerText = `${num.toLocaleString()} Tokens`;
  }
  syncTokenPresetButtons(parseInt(val));
}

function syncTokenPresetButtons(tokens) {
  document.querySelectorAll('.btn-token-preset').forEach(btn => {
    const btnTokens = parseInt(btn.getAttribute('data-tokens'));
    if (btnTokens === tokens) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

function closeApiModal(e) {
  if (e && e.target !== e.currentTarget && e.target.className !== 'btn-modal-close') return;
  document.getElementById('apiModal').style.display = 'none';
}

function handleModelChange(val) {
  const customWrap = document.getElementById('customModelWrap');
  if (val === 'custom') {
    customWrap.style.display = 'flex';
  } else {
    customWrap.style.display = 'none';
  }

  // Suggest protocol according to model
  const protocolSelect = document.getElementById('protocolSelect');
  if (val.includes('claude')) {
    protocolSelect.value = 'messages';
  } else if (val.includes('gpt')) {
    protocolSelect.value = 'responses';
  } else {
    protocolSelect.value = 'auto';
  }
}

function togglePasswordVisibility(id) {
  const input = document.getElementById(id);
  input.type = input.type === 'password' ? 'text' : 'password';
}

function saveApiConfig() {
  const key = document.getElementById('apiKeyInput').value.trim();
  const model = document.getElementById('modelSelect').value;
  const customModel = document.getElementById('customModelInput').value.trim();
  const protocol = document.getElementById('protocolSelect').value || 'auto';
  const url = document.getElementById('apiUrlInput').value.trim() || 'https://opencode.ai/zen/go/v1';
  const maxTokens = parseInt(document.getElementById('maxTokensInput').value) || 16000;

  state.apiConfig = {
    apiKey: key,
    model: model,
    customModel: customModel,
    protocol: protocol,
    maxTokens: maxTokens,
    apiUrl: url
  };

  localStorage.setItem('opencode_api_config', JSON.stringify(state.apiConfig));
  updateApiStatusUI();
  document.getElementById('apiModal').style.display = 'none';
  showToast(`Đã lưu cấu hình API (Max Tokens: ${maxTokens.toLocaleString()})!`, "success");
}

function clearApiKey() {
  state.apiConfig.apiKey = '';
  document.getElementById('apiKeyInput').value = '';
  localStorage.removeItem('opencode_api_config');
  updateApiStatusUI();
  showToast("Đã xóa API Key.");
}

function loadSavedApiConfig() {
  try {
    const saved = localStorage.getItem('opencode_api_config');
    if (saved) {
      const parsed = JSON.parse(saved);
      state.apiConfig = {
        ...state.apiConfig,
        ...parsed
      };
      if (!state.apiConfig.apiUrl || state.apiConfig.apiUrl.includes('/chat/completions')) {
        state.apiConfig.apiUrl = 'https://opencode.ai/zen/go/v1';
      }
      if (!state.apiConfig.maxTokens) {
        state.apiConfig.maxTokens = 16000;
      }
    }
  } catch (e) {
    console.warn("Could not load saved API config:", e);
  }
  updateApiStatusUI();
}

function updateApiStatusUI() {
  const pill = document.getElementById('activeModelLabel');
  let label = "GPT-6 Luna (/responses)";
  if (state.apiConfig.model === 'claude-haiku-5-5') {
    label = "Claude Haiku 5.5 (/messages)";
  } else if (state.apiConfig.model === 'custom' && state.apiConfig.customModel) {
    label = `${state.apiConfig.customModel} (${state.apiConfig.protocol})`;
  }
  pill.innerText = label;
}

// ===================================================================
// Toast Notifications
// ===================================================================
function showToast(message, type = "info") {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = 'toast-msg';

  let icon = "✨";
  if (type === "warning") icon = "⚠️";
  if (type === "error") icon = "❌";
  if (type === "success") icon = "✅";

  toast.innerHTML = `<span>${icon}</span> <span>${escapeHTML(message)}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function escapeHTML(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
