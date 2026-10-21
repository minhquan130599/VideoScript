const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { jsonrepair } = require('jsonrepair');
require('dotenv').config();

const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;

// ---------------------------------------------------------------------------
// Security for public exposure (e.g. cloudflared tunnel)
// - Requests coming through a proxy/tunnel need the APP_PASSWORD (HTTP Basic auth)
// - Direct access from this machine (localhost, no proxy headers) stays open
// - The upstream API host must be in ALLOWED_API_HOSTS (prevents key theft & SSRF)
// ---------------------------------------------------------------------------
const APP_PASSWORD = (process.env.APP_PASSWORD || '').trim();
const ALLOWED_API_HOSTS = (process.env.ALLOWED_API_HOSTS || 'opencode.ai')
  .split(',').map(h => h.trim().toLowerCase()).filter(Boolean);
const LOOPBACK = new Set(['127.0.0.1', '::1', '::ffff:127.0.0.1']);

const isProxied = (req) => Boolean(req.headers['cf-ray'] || req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for']);
const isLocalDirect = (req) => !isProxied(req) && LOOPBACK.has(req.socket.remoteAddress);
const clientIp = (req) => String(req.headers['cf-connecting-ip'] || req.socket.remoteAddress || 'unknown');
const safeEqual = (a, b) => {
  const ba = Buffer.from(String(a)), bb = Buffer.from(String(b));
  return ba.length === bb.length && crypto.timingSafeEqual(ba, bb);
};

// Simple in-memory fixed-window rate limiter
function makeLimiter(max, windowMs) {
  const hits = new Map();
  return (key) => {
    const now = Date.now();
    const entry = hits.get(key);
    if (!entry || now - entry.start > windowMs) {
      hits.set(key, { start: now, count: 1 });
      return true;
    }
    entry.count += 1;
    return entry.count <= max;
  };
}
const failedLoginLimiter = makeLimiter(10, 15 * 60 * 1000); // 10 wrong passwords / 15 min / IP
const generateLimiter = makeLimiter(15, 10 * 60 * 1000);    // 15 generations / 10 min / IP

app.use((req, res, next) => {
  if (isLocalDirect(req)) return next();
  if (!APP_PASSWORD) {
    return res.status(403).send('Truy cập từ bên ngoài đang bị chặn vì chưa đặt APP_PASSWORD. Hãy đặt biến môi trường APP_PASSWORD rồi khởi động lại server.');
  }
  const ip = clientIp(req);
  const [scheme, encoded] = String(req.headers.authorization || '').split(' ');
  if (scheme === 'Basic' && encoded) {
    const decoded = Buffer.from(encoded, 'base64').toString('utf8');
    const password = decoded.slice(decoded.indexOf(':') + 1);
    if (safeEqual(password, APP_PASSWORD)) return next();
    if (!failedLoginLimiter(ip)) return res.status(429).send('Sai mật khẩu quá nhiều lần. Thử lại sau 15 phút.');
  }
  res.set('WWW-Authenticate', 'Basic realm="VideoScript Studio", charset="UTF-8"');
  return res.status(401).send('Cần đăng nhập để sử dụng VideoScript Studio.');
});

// Returns an error message if the upstream API URL is not allowed, otherwise null
function checkApiHost(urlStr) {
  let u;
  try { u = new URL(urlStr); } catch { return 'Base URL không hợp lệ.'; }
  const host = u.hostname.toLowerCase();
  const allowed = ALLOWED_API_HOSTS.some(h => host === h || host.endsWith(`.${h}`));
  if (!allowed) {
    return `Base URL "${host}" chưa nằm trong danh sách cho phép (${ALLOWED_API_HOSTS.join(', ')}). Thêm host này vào biến môi trường ALLOWED_API_HOSTS rồi khởi động lại server.`;
  }
  if (u.protocol !== 'https:' && host !== 'localhost') return 'Base URL phải dùng https.';
  return null;
}

// Middleware
app.use(cors());
app.use(express.json({ limit: '60mb' }));
app.use(express.urlencoded({ extended: true, limit: '60mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// Detailed Analysis Data of IMG_8804.MP4
const VIDEO_ANALYSIS = {
  video_info: {
    filename: "IMG_8804.MP4",
    path: "C:\\Users\\QUAN\\Downloads\\IMG_8804.MP4",
    resolution: "720 x 1280 (Tỷ lệ 9:16 Dọc - Vertical TikTok/Reels)",
    duration: "14.93 giây (~15s)",
    fps: "24.04 fps",
    audio: "AAC Stereo 44.1kHz (Âm thanh thực tế ASMR: bóc thùng, xé gói, rót nước sôi, đảo trộn mì)",
    subject: "Mì ăn liền Indomie Mi Goreng Rasa Ayam Penyet (Mì xào gà cay)"
  },
  viral_formula: {
    hook_concept: "Unboxing Abundance (Đập hộp bùng nổ số lượng)",
    pacing: "Nhịp điệu nhanh, dứt khoát, kích thích dopamine qua từng thao tác 2-3s",
    lighting_style: "Ánh sáng tự nhiên ấm áp (Warm Golden Hour Sunlight) rọi xiên qua rèm lá sách (Venetian Blinds), tạo vệt sọc bóng đổ mềm cinematic",
    color_palette: ["#B87333 (Gỗ ấm)", "#D9381E (Đỏ Indomie)", "#F4C430 (Vàng sợi mì & lòng đỏ)", "#2E8B57 (Xanh lá cây cảnh)"],
    key_success_factors: [
      "Bắt đầu bằng hành động mở thùng carton niêm phong tạo sự tò mò ngay giây đầu tiên (Hook 0-2s).",
      "Thùng carton mở ra ngập tràn hàng chục gói sản phẩm xếp ngay ngắn tạo cảm giác dư dả, thích mắt (Abundance visual).",
      "Quá trình biến đổi từ vắt mì khô thành món mì xào bóng bẩy hấp dẫn (Transformation sensory payoff).",
      "Thành phẩm cuối cùng (Hero shot) đỉnh cao với trứng ốp la lòng đào và viên thịt rim, thôi thúc người xem bình luận và đặt mua."
    ]
  },
  scenes_breakdown: [
    {
      time: "00:00 - 00:02",
      frame_img: "/sample_frames/frame_01.jpg",
      title: "Cảnh 1: The Anticipation Hook (Mở Thùng Niêm Phong)",
      camera: "Góc nghiêng 45 độ, cận cảnh trung bình (Medium Close-Up)",
      action: "Thùng carton màu nâu kraft dán băng dính niêm phong đặt trên bàn gỗ ấm cúng. Bàn tay nhẹ nhàng mở nắp thùng.",
      lighting_environment: "Ánh nắng xiên qua rèm cửa, chậu cây trầu bà xanh mướt, cuốn sách nghệ thuật 'L'AME SOEUR'.",
      sound_fx: "Tiếng rẹt rẹt mở nắp thùng carton chân thực (Cardboard ASMR)."
    },
    {
      time: "00:02 - 00:04",
      frame_img: "/sample_frames/frame_03.jpg",
      title: "Cảnh 2: The Abundance Reveal (Thùng Carton Ngập Tràn Sản Phẩm)",
      camera: "Góc nhìn thẳng từ trên xuống chếch nhẹ (High-Angle / Top-Down)",
      action: "Thùng carton mở tung hé lộ đầy ắp các gói mì Indomie xếp ngay ngắn. Một gói mì được rút nổi bật lên hướng về camera.",
      lighting_environment: "Màu đỏ - vàng - xanh của bao bì nổi bật trên nền giấy carton nâu mộc mạc.",
      sound_fx: "Tiếng sột soạt túi bóng bao bì khi được nhấc lên."
    },
    {
      time: "00:04 - 00:07",
      frame_img: "/sample_frames/frame_05.jpg",
      title: "Cảnh 3: Unpack & Bowl Placement (Bóc Vắt Mì Vào Bát Sứ)",
      camera: "Cận cảnh bàn tay (Hand Close-Up)",
      action: "Xé bao bì gói mì dứt khoát, thả vắt mì vàng giòn vào chiếc tô sứ màu kem viền vỏ sò có hoa văn xinh xắn.",
      lighting_environment: "Nền bàn gỗ ấm áp, ánh sáng studio mềm tôn lên màu vàng tươi của sợi mì.",
      sound_fx: "Tiếng 'cốp' nhẹ vui tai khi vắt mì chạm đáy tô sứ."
    },
    {
      time: "00:07 - 00:10",
      frame_img: "/sample_frames/frame_08.jpg",
      title: "Cảnh 4: Boiling Water Action (Rót Nước Sôi Sùng Sục)",
      camera: "Góc nhìn 60 độ tập trung vào dòng nước (Action Macro Shot)",
      action: "Bình siêu tốc inox rót dòng nước sôi nóng hổi trực tiếp lên vắt mì, bốc khói mờ ảo đầy mê hoặc.",
      lighting_environment: "Hơi nước bốc lên bắt ánh sáng ngược (backlit steam), tạo hiệu ứng ngon mắt.",
      sound_fx: "Tiếng nước sôi xèo xèo và tiếng rót róc rách đầy thư giãn."
    },
    {
      time: "00:10 - 00:12",
      frame_img: "/sample_frames/frame_11.jpg",
      title: "Cảnh 5: Seasoning & Sauce Drizzle (Rắc Bột Gia Vị & Xốt Tương)",
      camera: "Cực cận cảnh (Extreme Close-Up Macro)",
      action: "Bàn tay rắc gói bột gia vị thơm lừng lên mì, rưới dòng xốt tương đen kecap manis và dầu ớt đỏ bóng bẩy theo đường ziczac.",
      lighting_environment: "Độ bóng của dầu ớt và tương đen phản chiếu ánh sáng lấp lánh.",
      sound_fx: "Tiếng rắc bột nhẹ nhàng và giọt xốt đặc rơi tí tách."
    },
    {
      time: "00:12 - 00:14",
      frame_img: "/sample_frames/frame_14.jpg",
      title: "Cảnh 6: Chopstick Mixing ASMR (Đảo Trộn Sợi Mì Óng Mượt)",
      camera: "Cận cảnh chuyển động (Motion Close-Up)",
      action: "Đôi đũa màu hồng đảo đều mì với gia vị, sợi mì ngấm đều nước xốt chuyển sang màu vàng nâu óng ánh hấp dẫn.",
      lighting_environment: "Từng sợi mì bóng bẩy cuộn tròn dưới ánh sáng ấm cúng.",
      sound_fx: "Tiếng đảo mì ẩm ướt, xì xụp cực kích thích thính giác."
    },
    {
      time: "00:14 - 00:15",
      frame_img: "/sample_frames/frame_16.jpg",
      title: "Cảnh 7: The Grand Hero Shot (Thành Phẩm Đỉnh Cao Mê Mẩn)",
      camera: "Góc quay tĩnh tuyệt đẹp (Hero Glamour Shot)",
      action: "Tô mì hoàn thiện với quả trứng ốp la lòng đỏ sóng sánh ở giữa, rắc ớt bột, bao quanh bởi 5 viên thịt rim vàng nâu bóng mịn, bốc khói nhẹ.",
      lighting_environment: "Toàn bộ bàn gỗ nắng sớm với chậu cây xanh, cuốn sách nghệ thuật làm nền mờ ảo (bokeh xịn).",
      sound_fx: "Âm thanh kết thúc êm dịu, thỏa mãn giác quan tối đa."
    }
  ]
};

// API: Get Analysis of IMG_8804.MP4
app.get('/api/sample-video-analysis', (req, res) => {
  res.json(VIDEO_ANALYSIS);
});

// API: Get Sample Results for Instant Demo
const { SAMPLE_NOODLES_DATA, SAMPLE_SAUCE_DATA } = require('./sample_data');

app.get('/api/sample-results', (req, res) => {
  const type = (req.query.type || 'noodles').toLowerCase();
  const data = type === 'sauce' ? SAMPLE_SAUCE_DATA : SAMPLE_NOODLES_DATA;
  res.json({
    success: true,
    source: "sample_demo",
    type: type,
    model: "gpt-6-luna",
    protocol_used: "responses",
    images_analyzed: 3,
    data: data
  });
});

// Background style descriptions for prompt building
const BACKGROUND_STYLES = {
  auto: "an aesthetic, hyper-realistic commercial environment dynamically tailored to complement this specific product category (e.g. for food: a warm sunlit gourmet dining table; for skincare: a luxury polished marble and glass spa vanity; for tech: a sleek minimalist dark desk with subtle ambient rim lighting; for beverages: a sun-drenched refreshing terrace)",
  scandinavian_wood: "a cozy Scandinavian wooden desk, warm golden hour sunlight streaming through venetian blinds casting soft striped shadows, aesthetic green potted houseplants (pothos), decorative art coffee-table books, warm hygge atmosphere, shallow depth of field",
  luxury_marble: "a high-end luxury studio countertop made of polished Italian Carrara white marble with subtle gray and gold veining, brushed champagne gold accents, soft diffused commercial beauty lighting, elegant subtle reflections, clean minimal aesthetic",
  minimalist_pastel: "a chic minimalist studio with soft pastel matte geometric pedestals (powder pink, sage green, creamy beige), soft even daylight studio illumination, clean shadows, serene modern aesthetic",
  cyberpunk_neon: "a dark futuristic cyberpunk studio, matte black carbon surface, vibrant cyan and electric violet neon rim lights, moody dramatic contrast, subtle atmospheric haze and holographic reflections",
  japandi_zen: "a Japandi wabi-sabi setting, natural light oak wood table, raw textured ceramic pottery, delicate dried ikebana branch, soft diffused paper lantern morning light, organic tranquil atmosphere",
  tropical_summer: "a sun-drenched tropical outdoor resort, light beige limestone ledge, gentle shimmering pool water caustic reflections, exotic palm leaf sun shadows, bright azure blue and warm sunlight ambiance",
  urban_industrial: "an industrial modern loft, polished concrete countertop, raw exposed weathered brick wall, matte black steel details, warm tungsten spotlight creating dramatic moody rim lighting",
  ethereal_silk: "a dreamy ethereal studio, flowing champagne ivory silk satin drapery fabric with soft luxurious folds, soft romantic glow, light mist floating, cinematic premium commercial lighting"
};

const {
  BACKGROUND_POOL, buildCreativePlan, findThemeById, recordUsage,
  productKeyFromImages, getProductProfile, getProductUsedThemes, saveProductProfile
} = require('./creative_pools');

// Clear bag shapes for the "replace packaging" option
const CLEAR_BAG_SHAPES = {
  stand_up_zip: { vi: 'túi zip đứng, đáy tròn có nếp gấp', en: 'a stand-up zipper pouch with a rounded gusseted bottom' },
  flat_bottom: { vi: 'túi đáy vuông dạng hộp, 4 cạnh thẳng, miệng zip', en: 'a flat-bottom box pouch with a square base, four straight side gussets and a press-zip top' },
  pillow: { vi: 'túi gối hàn mép răng cưa trên và dưới', en: 'a heat-sealed pillow bag with crimped seals at the top and bottom' },
  flat_three_side: { vi: 'túi zip dẹt hàn 3 cạnh, đặt nằm', en: 'a flat three-side-sealed zip bag laid flat' },
  twist_tie_gift: { vi: 'túi quà buộc nơ ruy băng ở miệng', en: 'a clear gift bag gathered and tied at the top with a ribbon bow' },
  spout_pouch: { vi: 'túi đứng có vòi rót nắp vặn (hợp chất lỏng/sốt)', en: 'a stand-up pouch with a screw-cap spout (suited to liquids and sauces)' },
  tall_tin_tie: { vi: 'túi cao dáng hẹp, miệng gấp kẹp thiếc', en: 'a tall narrow bag with a folded top closed by a tin tie' }
};

// API: Clear bag shapes for the packaging option UI
app.get('/api/bag-shapes', (req, res) => {
  res.json(Object.entries(CLEAR_BAG_SHAPES).map(([id, s]) => ({ id, name_vi: s.vi })));
});

// API: Background themes for the selector UI
app.get('/api/backgrounds', (req, res) => {
  res.json(BACKGROUND_POOL.map(({ id, icon, tags, theme_name, surface_material, environment_setting }) =>
    ({ id, icon, tags, theme_name, surface_material, environment_setting })));
});

// Helper: Determine API Protocol (responses vs messages)
function resolveProtocol(protocol, model) {
  if (protocol === 'responses' || protocol === 'messages') {
    return protocol;
  }
  const m = (model || '').toLowerCase();
  if (m.includes('claude') || m.includes('haiku')) {
    return 'messages';
  }
  return 'responses'; // Default to responses for GPT and others
}

// Helper: Normalize Base URL and determine full endpoint
function buildEndpointUrl(baseUrl, protocol) {
  let clean = (baseUrl || 'https://opencode.ai/zen/go/v1').trim();
  clean = clean.replace(/\/+$/, '');

  if (clean.endsWith('/responses') || clean.endsWith('/messages') || clean.endsWith('/chat/completions')) {
    return clean;
  }

  if (protocol === 'messages') {
    return `${clean}/messages`;
  } else {
    return `${clean}/responses`;
  }
}

// OpenCode Go Generation Endpoint
const generateHandler = async (req, res) => {
  try {
    if (!isLocalDirect(req) && !generateLimiter(clientIp(req))) {
      return res.status(429).json({ success: false, error: 'Bạn đã tạo quá nhiều lần trong 10 phút. Vui lòng thử lại sau.' });
    }

    const {
      images = [], // Array of { imageBase64, mimeType }
      imageBase64,  // Fallback single image
      mimeType = 'image/jpeg',
      // The server's own key is only used for requests made directly on this machine
      apiKey = isLocalDirect(req) ? (process.env.OPENCODE_API_KEY || '') : '',
      model = 'gpt-6-luna',
      baseUrl = 'https://opencode.ai/zen/go/v1',
      protocol = 'auto', // 'auto', 'responses', 'messages'
      maxTokens = 16000, // User configurable token limit
      backgroundOption = 'scandinavian_wood',
      customBackground = '',
      videoDuration = 15,
      numScenes = 5,
      numVideos = 3, // Number of distinct video variations (e.g. 1 to 5)
      aspectRatio = '9:16',
      additionalPrompt = '',
      promptLanguage = 'en', // 'en' | 'vi' — language of image & video prompts
      packagingOverride = null, // { enabled: true, shape: 'random' | key of CLEAR_BAG_SHAPES }
      museClipSeconds = 10, // longest part of the final Muse video taken from one generation (3-10s)
      museMode = 'block', // 'block': one Muse generation per 10s block; 'shot': one generation per scene
      museImageSource = 'scenes', // 'scenes': generated scene images are first frames; 'product': only real product photos are attached as references
      outputProfile = 'full', // 'full': every platform's prompts; 'lean': only what AutoCreateVideo uses (GPT image + Grok video prompts)
      parallelVideos = true // write each video in its own model call, all at once
    } = req.body;

    // Normalize images array
    let imagesList = [];
    if (Array.isArray(images) && images.length > 0) {
      imagesList = images.filter(img => img && img.imageBase64);
    } else if (imageBase64) {
      imagesList = [{ imageBase64, mimeType }];
    }

    if (imagesList.length === 0) {
      return res.status(400).json({ success: false, error: "Vui lòng tải lên ít nhất một ảnh sản phẩm để hệ thống phân tích." });
    }

    const cleanApiKey = (apiKey || '').trim();
    if (!cleanApiKey || cleanApiKey.length < 5) {
      return res.status(401).json({
        success: false,
        error: "Vui lòng nhập OpenCode Go API Key trong mục 'Cấu hình API' ở góc trên bên phải để bắt đầu xử lý."
      });
    }

    const cleanNumVideos = Math.max(1, Math.min(10, parseInt(numVideos) || 3));
    const tokenLimit = Math.max(2000, Math.min(64000, parseInt(maxTokens) || 16000));

    const effectiveProtocol = resolveProtocol(protocol, model);
    const targetEndpoint = buildEndpointUrl(baseUrl, effectiveProtocol);
    const hostError = checkApiHost(targetEndpoint);
    if (hostError) {
      return res.status(400).json({ success: false, error: hostError });
    }

    // One model call with the product images + system prompt. Returns { content, truncated } or { error }.
    const callModel = async (system, userText, maxTok = tokenLimit) => {
      let response;
      if (effectiveProtocol === 'messages') {
        // Anthropic Messages Protocol (/messages)
        const messageContent = imagesList.map((img) => {
          let raw = img.imageBase64;
          if (raw.includes(';base64,')) raw = raw.split(';base64,')[1];
          return { type: "image", source: { type: "base64", media_type: img.mimeType || 'image/jpeg', data: raw } };
        });
        messageContent.push({ type: "text", text: userText });

        response = await fetch(targetEndpoint, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${cleanApiKey}`,
            'x-api-key': cleanApiKey,
            'anthropic-version': '2023-06-01',
            'Content-Type': 'application/json',
            'x-opencode-session': `videoscript-${Date.now()}`
          },
          body: JSON.stringify({
            model: model,
            max_tokens: maxTok,
            system: system,
            messages: [{ role: "user", content: messageContent }]
          }),
          redirect: 'error' // never follow redirects with the API key to another host
        });
      } else {
        // OpenAI Responses Protocol (/responses)
        const inputContent = [{ type: "input_text", text: userText }];
        imagesList.forEach((img) => {
          let raw = img.imageBase64;
          if (raw.includes(';base64,')) raw = raw.split(';base64,')[1];
          inputContent.push({ type: "input_image", image_url: `data:${img.mimeType || 'image/jpeg'};base64,${raw}` });
        });

        response = await fetch(targetEndpoint, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${cleanApiKey}`,
            'Content-Type': 'application/json',
            'x-opencode-session': `videoscript-${Date.now()}`
          },
          body: JSON.stringify({
            model: model,
            instructions: system,
            input: [{ role: "user", content: inputContent }],
            max_output_tokens: maxTok
          }),
          redirect: 'error' // never follow redirects with the API key to another host
        });
      }

      if (!response.ok) {
        const errText = await response.text();
        console.error(`[OpenCode Go Error] Status: ${response.status}`, errText);
        return { error: { status: response.status, text: errText } };
      }

      const data = await response.json();

      // Extract content according to protocol response formats
      let content = "";
      if (data.output_text) {
        content = data.output_text;
      } else if (data.content && Array.isArray(data.content)) {
        content = data.content.filter(c => c.type === 'text').map(c => c.text).join('\n');
      } else if (data.output && Array.isArray(data.output)) {
        for (const item of data.output) {
          if (item.content && Array.isArray(item.content)) {
            for (const c of item.content) {
              if (c.text) content += c.text;
            }
          } else if (item.text) {
            content += item.text;
          }
        }
      } else if (data.choices?.[0]?.message?.content) {
        content = data.choices[0].message.content;
      } else if (typeof data.response === 'string') {
        content = data.response;
      }

      const truncated = data.stop_reason === 'max_tokens' || data.status === 'incomplete' ||
        Boolean(data.incomplete_details) || data.choices?.[0]?.finish_reason === 'length';
      return { content: content || '', truncated };
    };

    // Parse model JSON, repairing truncated output when possible. Returns null if unrecoverable.
    const parseModelJson = (text) => {
      const cleaned = String(text || '').replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();
      try {
        return JSON.parse(cleaned);
      } catch (parseErr) {
        console.log(`[JSON Parse Notice] Standard parse failed (${parseErr.message}). Attempting jsonrepair...`);
        try {
          return JSON.parse(jsonrepair(cleaned));
        } catch {
          const match = cleaned.match(/\{[\s\S]*/);
          try { return match ? JSON.parse(jsonrepair(match[0])) : null; } catch { return null; }
        }
      }
    };

    // ---------------------------------------------------------------------------
    // Product profile: backgrounds tailored to THIS product (18 per batch), generated once
    // per product and rotated across runs; a new batch is added when nearly all were used.
    // ---------------------------------------------------------------------------
    const PROFILE_BATCH = 18;
    const productKey = productKeyFromImages(imagesList);
    let productProfile = getProductProfile(productKey);
    const usedForProduct = getProductUsedThemes(productKey);
    const freshProfileCount = productProfile
      ? productProfile.backgrounds.filter(b => !usedForProduct.includes(b.id)).length : 0;

    if (!productProfile || productProfile.backgrounds.length < 15 || freshProfileCount < cleanNumVideos) {
      const avoidNames = (productProfile?.backgrounds || []).map(b => b.theme_name);
      const profileSystem = `You are a commercial art director for short product videos. Look at the product photos, read the label word by word, and plan backgrounds for this exact product.
Return ONLY valid JSON (no markdown):
{"product_name":"...","category":"...","intended_use":"...","main_ingredient_or_dish":"...","backgrounds":[{"family":"...","theme_name":"Tên tiếng Việt (English name)","surface_material":"Tiếng Việt (English)","environment_setting":"Tiếng Việt","lighting_style":"Tiếng Việt","prompt_descriptor":"one English sentence: surface, environment, props, lighting, time of day"}]}
Rules:
- Exactly ${PROFILE_BATCH} backgrounds. Each is a believable place where THIS product is really used, cooked, served, eaten, gifted or shown, consistent with its intended use and main ingredient (e.g. a fried-chicken sauce → kitchens, dining tables, picnics, parties with chicken dishes; never a spa or an office printer room).
- Spread them across at least 8 different families from: home_kitchen, family_meal, outdoor_garden_picnic, street_food_market, restaurant_pro_kitchen, vietnam_regional_place, festive_occasion, travel_camping, work_school_break, cozy_seasonal_mood, premium_studio_hero, friends_gathering. At most 3 per family; put the family id in "family".
- All different from each other: no two share the same surface material, the same place type or the same lighting. Mix indoor and outdoor and different times of day (morning, noon, golden hour, evening, night).
- Props must suit the product and its main ingredient.
- Avoid supermarket or retail shelves, and include at most ONE grill/barbecue setting (only if grilling truly fits the product).`;
      const profileUser = `Analyze the product in these ${imagesList.length} photo(s) and return the JSON.` +
        (avoidNames.length ? `\nThese backgrounds already exist for this product — create ${PROFILE_BATCH} NEW ones that differ from all of them:\n- ${avoidNames.join('\n- ')}` : '');

      const profileRes = await callModel(profileSystem, profileUser, 8000);
      const prof = profileRes.content ? parseModelJson(profileRes.content) : null;
      if (prof && Array.isArray(prof.backgrounds) && prof.backgrounds.length) {
        productProfile = saveProductProfile(productKey, prof, prof.backgrounds);
        console.log(`[Product Profile] ${productProfile.product_name || productKey}: ${productProfile.backgrounds.length} tailored backgrounds`);
      } else {
        console.warn(`[Product Profile] Could not build tailored backgrounds${profileRes.error ? ` (HTTP ${profileRes.error.status})` : ''}; falling back to the shared pool.`);
      }
    }

    // Build a randomized creative plan: fresh backgrounds, distinct unboxing hooks, story structures & camera styles
    const plan = buildCreativePlan({
      imagesList,
      numVideos: cleanNumVideos,
      backgroundOption,
      customBackground,
      presetDescriptor: BACKGROUND_STYLES[backgroundOption],
      productBackgrounds: productProfile?.backgrounds
    });
    const cleanDuration = Math.max(5, Math.min(60, parseInt(videoDuration) || 15));
    const cleanNumScenes = Math.max(3, Math.min(10, parseInt(numScenes) || 5));
    const isVi = promptLanguage === 'vi';
    const ANTI_COLLAGE_PREFIX = isVi
      ? 'Một bức ảnh quảng cáo sản phẩm duy nhất, độc lập (KHÔNG ghép ảnh, KHÔNG chia đôi khung hình, KHÔNG lưới nhiều ô).'
      : 'A single standalone, individual commercial product photograph (NOT a collage, NOT a split screen, NOT a multi-panel grid).';
    // Generated images/videos must never contain scannable codes; codes on the real packaging are removed.
    const NO_CODES_IMAGE_RULE = isVi
      ? 'Tuyệt đối không tự tạo mã QR, mã vạch, tem hay mã quét ở bất kỳ đâu (bao bì, thùng, đạo cụ, nền). Nếu bao bì trong ảnh tham chiếu có mã QR hoặc mã vạch thì xoá đi, để vùng đó trơn cùng màu bao bì; giữ nguyên toàn bộ phần còn lại của bao bì.'
      : 'Never generate a QR code, barcode, stamp or any scannable code anywhere (packaging, box, props, background). If the packaging in the reference photo has a QR code or barcode, remove it and leave that area plain in the packaging color; keep the rest of the packaging exactly the same.';
    const NO_CODES_VIDEO_RULE = isVi
      ? 'Không chữ hay phụ đề trên màn hình, không mã QR, không mã vạch; nếu bao bì trong ảnh có mã QR hoặc mã vạch thì xoá đi, giữ nguyên phần còn lại của bao bì.'
      : 'No on-screen text or subtitles, no QR codes, no barcodes; if the packaging in the images shows a QR code or barcode, remove it and keep the rest of the packaging unchanged.';
    // No recognizable people: only hands/arms or people framed so their face is never shown.
    const NO_FACE_IMAGE_RULE = isVi
      ? 'Không dùng người mẫu lộ mặt: chỉ xuất hiện bàn tay, cánh tay hoặc người bị cắt khung từ cổ trở xuống / quay lưng / ngoài vùng lấy nét; tuyệt đối không thấy khuôn mặt người trong bất kỳ ảnh nào.'
      : 'No models with visible faces: show only hands, arms, or people cropped below the chin / seen from behind / out of focus; no human face may be visible in any image.';
    const NO_FACE_VIDEO_RULE = isVi
      ? 'Không dùng người mẫu lộ mặt: chỉ quay bàn tay, cánh tay hoặc người bị cắt khung từ cổ trở xuống / quay lưng; không khuôn mặt người nào xuất hiện trong suốt video.'
      : 'No models with visible faces: film only hands, arms, or people cropped below the chin / seen from behind; no human face appears at any point in the video.';
    const ANTI_COLLAGE_MARKER = isVi ? 'không ghép ảnh' : 'not a collage';

    // Optional packaging replacement: same contents, new clear bag of a different shape
    const shapeKeys = Object.keys(CLEAR_BAG_SHAPES);
    const bagEnabled = Boolean(packagingOverride && packagingOverride.enabled);
    const bagKey = bagEnabled
      ? (CLEAR_BAG_SHAPES[packagingOverride.shape] ? packagingOverride.shape : shapeKeys[crypto.randomInt(shapeKeys.length)])
      : null;
    const bag = bagKey ? CLEAR_BAG_SHAPES[bagKey] : null;
    const packagingRule = bag
      ? `PACKAGING REPLACEMENT (user option — overrides every "keep the packaging" instruction): do NOT reproduce the reference packaging. Keep the exact CONTENTS seen in the reference (same ingredients, colors, sizes, proportions, layering), but show them in a NEW crystal-clear transparent plastic bag: ${bag.en}. It must be clearly a different shape from the reference bag (if the reference already has this shape, change size/proportions and closure noticeably). Label: one simple cream rectangular sticker with the product name in clean dark lettering — no copied artwork, illustrations or logo from the reference. Use this SAME new bag in every scene, inside the hook carton and in the hook reveal image.`
      : `PACKAGING: keep the real packaging exactly as in the reference photos (shape, colors, logo, label text).`;
    const packagingLineVideo = bag
      ? (isVi
        ? `Sản phẩm: giữ đúng phần ruột như @Image1, nhưng đựng trong túi nhựa trong suốt mới (${bag.vi}), nhãn sticker kem đơn giản ghi tên sản phẩm.`
        : `Product: keep the contents exactly as in @Image1, but packed in a new clear plastic bag (${bag.en}) with a simple cream sticker label showing the product name.`)
      : (isVi
        ? 'Tham chiếu sản phẩm: @Image1 — giữ nguyên bao bì, logo, màu sắc và chữ trên bao bì đúng như ảnh tham chiếu.'
        : 'Product reference: @Image1 — keep the packaging, logo, colors and text exactly as in the reference image.');

    // Video format header shared by all video prompts (duration + aspect ratio must always be explicit)
    const ORIENTATION = isVi
      ? ({ '9:16': 'dọc', '16:9': 'ngang', '1:1': 'vuông' }[aspectRatio] || '')
      : ({ '9:16': 'vertical', '16:9': 'horizontal', '1:1': 'square' }[aspectRatio] || '');
    const formatLine = (seconds) => isVi
      ? `Định dạng: video ${seconds} giây, khung ${ORIENTATION} ${aspectRatio}`
      : `Format: ${seconds}-second video, ${ORIENTATION} ${aspectRatio} aspect ratio`;
    // Veo 3 renders at most 8 seconds per generation, so longer videos are split into pasteable clips
    const VEO_MAX_CLIP = 8;
    const veoClipCount = Math.ceil(cleanDuration / VEO_MAX_CLIP);

    const candidatesGuide = plan.backgroundCandidates.map((t, i) =>
      `${i + 1}. id="${t.id}" [fits: ${t.tags.join(', ')}] ${t.theme_name} — surface: ${t.surface_material}; environment: ${t.environment_setting}; lighting: ${t.lighting_style}; EN: "${t.prompt_descriptor}"`
    ).join('\n');

    const forcedGuide = plan.forcedFirst
      ? `VIDEO 1 MUST use this user-chosen background (theme_id "${plan.forcedFirst.id}"): "${plan.forcedFirst.prompt_descriptor}". Videos 2..${cleanNumVideos} pick from the candidate list.`
      : `All videos pick from the candidate list.`;

    const perVideoDirectionGuide = Array.from({ length: cleanNumVideos }, (_, i) => {
      const hook = plan.hooks[i];
      const story = plan.stories[i];
      const cam = plan.cameras[i];
      return `[VIDEO ${i + 1}]
- HOOK VARIANT (Scene 1 / Shot 1, hook_id "${hook.id}"): ${hook.prompt_en} (the box is the LARGE rectangular carton described in the hook rules; the opening itself is slow and continuous).
- STORY STRUCTURE for the remaining scenes: ${story.name_vi} — ${story.guide_en}.
- CAMERA & EDIT STYLE: ${cam.name_vi} — ${cam.guide_en}.`;
    }).join('\n\n');

    // The unboxing hook needs more time than other shots to open smoothly (about 1/3 of the video, 4-6s)
    const hookLen = Math.max(2, Math.round(Math.min(6, Math.max(4, cleanDuration / 3), cleanDuration - (cleanNumScenes - 1) * 1.5)));
    const fmt = (sec) => {
      const s = Math.round(sec);
      return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
    };

    // Muse renders 10s per generation, so the video is cut into 10s blocks (the last one
    // may be shorter) and scene boundaries are aligned to those blocks: every block holds
    // whole scenes, block 1 starts with the unboxing hook. The same timing is used for all
    // platforms' prompts, so the Grok/Seedance shot list splits cleanly into Muse clips.
    // Lean output skips prompts for platforms the caller does not use; every content
    // rule (analysis, hook, scenes, GPT image prompts, Grok shot list) stays the same.
    const lean = outputProfile === 'lean';
    const MUSE_GEN_SECONDS = 10; // what one Muse video generation renders
    const MUSE_MAX_CLIP = Math.max(3, Math.min(MUSE_GEN_SECONDS, Number(museClipSeconds) || MUSE_GEN_SECONDS));
    const MUSE_BLOCK = Math.max(hookLen + 2, MUSE_MAX_CLIP);
    const blockLens = [];
    for (let t = 0; t < cleanDuration - 1e-6; t += MUSE_BLOCK) blockLens.push(Math.min(MUSE_BLOCK, cleanDuration - t));
    const sceneCounts = (() => {
      const avail = blockLens.map((b, i) => (i === 0 ? b - hookLen : b));
      const counts = avail.map(() => 0);
      let left = cleanNumScenes - 1;
      // Every block with room gets at least one scene, then the rest follow available time.
      avail.forEach((a, i) => { if (left > 0 && a >= 2) { counts[i] = 1; left--; } });
      while (left > 0) {
        let best = -1;
        let bestRoom = -Infinity;
        avail.forEach((a, i) => {
          if (a < 2) return;
          const room = a / (counts[i] + 1);
          if (room > bestRoom) { bestRoom = room; best = i; }
        });
        if (best < 0) break;
        counts[best]++;
        left--;
      }
      counts[counts.length - 1] += left; // nothing had room (very short video)
      return { avail, counts };
    })();
    // Integer seconds inside each block, longer shots first.
    const sceneSecs = [hookLen];
    let museClips = [];
    blockLens.forEach((len, b) => {
      const n = sceneCounts.counts[b];
      const room = sceneCounts.avail[b];
      const scenes = b === 0 ? [1] : [];
      const secs = b === 0 ? [hookLen] : [];
      if (n > 0) {
        const base = Math.floor(room / n);
        let extra = room - base * n;
        for (let j = 0; j < n; j++) {
          const sec = base + (extra >= 1 ? 1 : extra > 0 ? extra : 0);
          extra = Math.max(0, extra - 1);
          sceneSecs.push(sec);
          scenes.push(sceneSecs.length);
          secs.push(sec);
        }
      } else if (b > 0 && sceneSecs.length) {
        // No scene left for this block: the previous scene runs on (rare, very few scenes).
        sceneSecs[sceneSecs.length - 1] += len;
        scenes.push(sceneSecs.length);
        secs.push(len);
      }
      museClips.push({ scenes, sceneSeconds: secs, seconds: len, start: b * MUSE_BLOCK });
    });
    const sceneStarts = sceneSecs.map((_, i) => sceneSecs.slice(0, i).reduce((a, b) => a + b, 0));
    const shotSlots = sceneSecs.map((sec, i) => `${fmt(sceneStarts[i])} - ${fmt(sceneStarts[i] + sec)}`).join(', ');
    // Shot mode: every scene is its own generation starting from its own scene image,
    // which keeps the product closest to the images (costs one generation per scene).
    if (museMode === 'shot' && cleanNumScenes > 1) {
      museClips = sceneSecs.map((sec, i) => ({ scenes: [i + 1], sceneSeconds: [sec], seconds: sec, start: sceneStarts[i] }));
    }
    const museClipCount = museClips.length;
    // Attachment order used by the image step: 1A, 1B, 2, 3, ... (scene 1 owns images 1-2).
    const sceneImages = (scene) => (scene === 1 ? [1, 2] : [scene + 1]);
    const sceneImageLabels = (scene) => (scene === 1 ? ['1A', '1B'] : [String(scene)]);
    const secText = (s) => String(Math.round(s * 10) / 10).replace('.', isVi ? ',' : '.');
    const museClipGuide = museClips.map((c, i) =>
      `CLIP ${i + 1}: scenes ${c.scenes.join(', ')} (${secText(c.seconds)}s of the final video)`).join('; ');

    // Wraps the model's per-clip content with fixed generation + editing instructions.
    // Fixed "this is exactly what the product looks like" line, from product_analysis.
    const productLockLine = (analysis, forVideo) => {
      const look = String(analysis?.visual_identity || '').trim();
      if (!look) return '';
      const avoid = [].concat(analysis?.not_to_confuse_with || []).map(String).filter(Boolean).join(', ');
      return isVi
        ? `Sản phẩm phải giữ y hệt ${forVideo ? 'trong mọi khung hình, kể cả khi mở túi, cầm trên tay hay bày ra đĩa' : 'trong mọi ảnh'}: ${look}${avoid ? ` Tuyệt đối không biến thành: ${avoid}.` : ''}`
        : `The product must look exactly the same ${forVideo ? 'in every frame, including when opened, held or served' : 'in every image'}: ${look}${avoid ? ` It must never turn into: ${avoid}.` : ''}`;
    };

    // 'full' = use the whole generation, 'speed' = speed it up evenly (<=30% shorter),
    // 'trim' = the action fits in the first part and the tail is cut.
    const clipFitMode = (seconds) => (seconds >= MUSE_GEN_SECONDS - 0.05 ? 'full' : 'trim');
    const MOTION_RULE = isVi
      ? 'Chuyển động: trong mỗi cảnh chậm, mượt, đúng tốc độ thật, máy quay ổn định; giữa các cảnh cắt thẳng. Mọi thay đổi đều do bàn tay làm thấy rõ (mở bao bì rồi mới lấy sản phẩm ra; cho vào nồi, chảo, bát rồi mới thấy sản phẩm nằm trong đó). Không vật nào tự xuất hiện, biến mất, nhân bản hay dịch chuyển tức thời; số lượng sản phẩm giữ đúng như đã lấy ra; sản phẩm và đồ ăn giữ nguyên hình dạng, không méo, không biến hình.'
      : 'Motion: within each shot slow, smooth, real-speed with a steady camera; straight cuts between shots. Every change is visibly caused by the hands (open the packaging before the product comes out; put it into the pot, pan or bowl before it is shown inside). Nothing appears, vanishes, duplicates or teleports; the number of pieces stays exactly what was taken out; product and food keep their shape with no warping or morphing.';

    // Muse prompt built from the Grok shot list ("0-5s: ...", "5-8s: ..."), which Muse
    // follows well: the shots are split at the 10s blocks, each block is one 10s Muse
    // generation with its shots re-timed from 0, and the last (shorter) block is trimmed.
    const parseSeconds = (txt) => {
      const t = String(txt).replace(',', '.');
      if (t.includes(':')) {
        const [m, sec] = t.split(':');
        return Number(m) * 60 + Number(sec);
      }
      return Number(t);
    };
    const SHOT_LINE_RE = /^\[?\s*(\d{1,2}(?::\d{2})?(?:[.,]\d+)?)\s*(?:s|giây)?\s*[-–—]\s*(\d{1,2}(?::\d{2})?(?:[.,]\d+)?)\s*(?:s|giây|sec)?\s*\]?\s*[:：]\s*(.+)$/i;
    const relText = (sec) => String(Math.round(sec * 10) / 10).replace('.', isVi ? ',' : '.');
    const fromProduct = museImageSource === 'product';
    // No-image mode: the only attachments are real product photos, used as identity references.
    const PRODUCT_REF_RULE = isVi
      ? 'Các ảnh đính kèm là ảnh chụp sản phẩm THẬT (không phải khung hình của cảnh): dùng chúng làm ảnh tham chiếu sản phẩm cho mọi clip để bao bì, nhãn, màu sắc, hình dạng và phần bên trong giống y hệt ảnh; bỏ qua nền, chữ và giao diện điện thoại trong ảnh.'
      : 'The attached images are photos of the REAL product (not scene frames): use them as the product reference in every clip so the packaging, label, colors, shape and contents match exactly; ignore their backgrounds, text and phone UI.';

    const museHookText = (analysis, hookVariant) => {
      const name = String(analysis?.product_name || (isVi ? 'sản phẩm' : 'the product')).trim();
      // The assigned (slow, single-box) variant keeps hooks varied between videos;
      // the closing sentence pins the pace.
      if (hookVariant) {
        return isVi
          ? `Một thùng carton kraft lớn duy nhất chứa nhiều ${name}, nằm yên giữa khung hình từ đầu đến cuối; băng keo dán dọc theo khe giữa hai nắp, mọi thao tác rạch hoặc bóc băng keo đều đi dọc theo khe đó từ đầu này sang đầu kia thùng, không cắt ngang. ${hookVariant.description_vi} Sản phẩm nhấc lên là ${name}, nhãn hướng về máy và giữ yên. Không cắt cảnh trong đoạn này; mọi chuyển động chậm, đều và liền mạch.`
          : `A single large kraft carton holding many units of ${name} stays still in the center of the frame throughout; the tape runs along the seam between the two lid flaps and any slitting or peeling moves along that seam from one end of the box to the other, never across it. ${hookVariant.prompt_en}. The unit lifted is ${name}, label facing the camera, held still. No cuts in this shot; every motion is slow, even and continuous.`;
      }
      return isVi
        ? `Cận trung, máy quay đứng yên rồi tiến rất chậm. Một thùng carton kraft lớn duy nhất nằm sẵn giữa khung hình, đường băng keo dán dọc khe giữa hai nắp đã được rạch sẵn theo đúng khe đó. Hai tay từ từ mở hai nắp thùng sang hai bên trong một chuyển động liền mạch, lộ ra nhiều ${name} xếp đứng ngay ngắn bên trong; sau đó một tay nhấc thẳng một ${name} lên trước ống kính, nhãn hướng về máy và giữ yên. Không cắt cảnh trong đoạn này, mọi chuyển động chậm và đều.`
        : `Medium close-up, the camera holds still then pushes in very slowly. A single large kraft carton already rests in the center of the frame, the tape along the seam between its two lid flaps already slit along that seam. Both hands slowly fold the two lid flaps out to the sides in one continuous motion, revealing many ${name} packed upright in neat rows; then one hand lifts one ${name} straight up toward the lens, label facing the camera, and holds it still. No cuts in this shot; every motion is slow and even.`;
    };

    const buildMuseFromGrok = (grokText, analysis, hookVariant) => {
      const lines = String(grokText || '').split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
      const shots = [];
      const head = [];
      const tail = [];
      lines.forEach((line) => {
        const m = line.match(SHOT_LINE_RE);
        if (m) {
          shots.push({ start: parseSeconds(m[1]), end: parseSeconds(m[2]), text: m[3].trim() });
        } else if (/^(Định dạng|Format)\s*:/i.test(line)) {
          // replaced by our own format line
        } else if (shots.length) {
          tail.push(line);
        } else {
          head.push(line);
        }
      });
      const lastEnd = shots.length ? shots[shots.length - 1].end : 0;
      if (shots.length < 2 || shots[0].start > 0.5 || Math.abs(lastEnd - cleanDuration) > 1.5) return null;
      // The model's hook line tends to stack an entrance, tape peeling, four flaps and a
      // fast cut into a few seconds, which video models render as a jump. Muse gets a
      // fixed, simple unboxing instead (closed box -> two flaps open -> lift one unit).
      shots[0] = { ...shots[0], text: museHookText(analysis, hookVariant) };

      const lock = productLockLine(analysis, true);
      const formatHead = `${formatLine(cleanDuration)}.`;
      const style = isVi
        ? `Phong cách quảng cáo chân thực, khung ${ORIENTATION} ${aspectRatio}.`
        : `Photorealistic commercial style, ${ORIENTATION} ${aspectRatio} frame.`;
      const rules = [fromProduct ? PRODUCT_REF_RULE : '', lock, ...tail, MOTION_RULE, NO_CODES_VIDEO_RULE, NO_FACE_VIDEO_RULE, style].filter(Boolean);

      if (museClips.length === 1) {
        const body = shots.map((s) => `${relText(s.start)}-${relText(s.end)}s: ${s.text}`);
        return [
          formatHead,
          fromProduct
            ? (isVi
              ? `${PRODUCT_REF_RULE} Gửi nguyên văn mô tả dưới đây cho công cụ tạo video, không tự thêm cảnh, đạo cụ, người hay hành động khác.`
              : `${PRODUCT_REF_RULE} Give the video tool the description below verbatim; do not add scenes, props, people or actions.`)
            : (isVi
              ? 'Dùng các ảnh đính kèm theo đúng thứ tự làm tham chiếu cho từng cảnh, ảnh số 1 là khung hình đầu. Gửi nguyên văn mô tả dưới đây cho công cụ tạo video, không tự thêm cảnh, đạo cụ, người hay hành động khác.'
              : 'Use the attached images in order as the reference for each shot; image 1 is the first frame. Give the video tool the description below verbatim; do not add scenes, props, people or actions.'),
          [...head, ...body].join('\n'),
          ...rules,
        ].join('\n\n');
      }

      const clipBlocks = museClips.map((c, i) => {
        const from = c.start;
        const to = c.start + c.seconds;
        const own = shots.filter((s) => s.start >= from - 0.25 && s.start < to - 0.25);
        if (!own.length) return null;
        const images = c.scenes.flatMap(sceneImages);
        const labels = c.scenes.flatMap(sceneImageLabels);
        const full = clipFitMode(c.seconds) === 'full';
        const isLast = i === museClips.length - 1;
        // End frame only when an image shows this clip's end state at the same spot:
        // a hook-only clip ends like image 1B, the last clip on the final hero image.
        const hookOnly = c.scenes.length === 1 && c.scenes[0] === 1;
        const endImage = hookOnly ? 2 : (isLast ? images[images.length - 1] : null);
        const endLabel = hookOnly ? '1B' : labels[labels.length - 1];
        const heroAnchor = endImage && endImage !== images[0]
          ? (isVi
            ? ` Nếu công cụ cho phép đặt khung hình cuối, dùng ảnh số ${endImage} (Ảnh ${endLabel}) làm khung cuối.`
            : ` If the tool accepts an end frame, use image ${endImage} (Image ${endLabel}) as the end frame.`)
          : '';
        const timing = full
          ? (isVi ? `Tạo 1 lần ${MUSE_GEN_SECONDS} giây, dùng trọn cả clip.` : `One ${MUSE_GEN_SECONDS}-second generation, used in full.`)
          : (isVi
            ? `Tạo 1 lần ${MUSE_GEN_SECONDS} giây: các cảnh dưới đây diễn ra đúng trong ${relText(c.seconds)} giây đầu, phần còn lại giữ yên khung cuối (sẽ bỏ khi ghép).`
            : `One ${MUSE_GEN_SECONDS}-second generation: the shots below happen in the first ${relText(c.seconds)} seconds, the rest holds the last frame (dropped when joining).`);
        const title = fromProduct
          ? (isVi
            ? `Clip ${i + 1} — giây ${relText(from)}–${relText(to)} của video (cảnh ${c.scenes.join(', ')}): gửi kèm toàn bộ ảnh sản phẩm làm ảnh tham chiếu sản phẩm (không phải khung hình). ${timing}`
            : `Clip ${i + 1} — seconds ${relText(from)}–${relText(to)} of the video (scenes ${c.scenes.join(', ')}): attach all product photos as product references (not frames). ${timing}`)
          : isVi
          ? `Clip ${i + 1} — giây ${relText(from)}–${relText(to)} của video (cảnh ${c.scenes.join(', ')}): ảnh đính kèm số ${images[0]} là khung hình đầu, ảnh số ${images.join(', ')} (Ảnh ${labels.join(', ')}) là tham chiếu cho các cảnh của clip.${heroAnchor} ${timing}`
          : `Clip ${i + 1} — seconds ${relText(from)}–${relText(to)} of the video (scenes ${c.scenes.join(', ')}): attached image ${images[0]} is the first frame, images ${images.join(', ')} (Image ${labels.join(', ')}) are the references for this clip's shots.${heroAnchor} ${timing}`;
        const body = own.map((s) => `${relText(s.start - from)}-${relText(Math.min(s.end, to) - from)}s: ${s.text}`);
        return [title, ...head, ...body].join('\n');
      });
      if (clipBlocks.some((b) => !b)) return null;

      const trimList = museClips.map((c, i) => (clipFitMode(c.seconds) === 'full'
        ? (isVi ? `clip ${i + 1} dùng trọn ${MUSE_GEN_SECONDS} giây` : `clip ${i + 1}: all ${MUSE_GEN_SECONDS} seconds`)
        : (isVi ? `clip ${i + 1} lấy ${relText(c.seconds)} giây đầu` : `clip ${i + 1}: first ${relText(c.seconds)} seconds`))).join('; ');
      const intro = isVi
        ? `Công cụ tạo video chỉ ra tối đa ${MUSE_GEN_SECONDS} giây mỗi lần, nên hãy tạo đúng ${museClips.length} clip theo thứ tự dưới đây rồi ghép thành 1 video. Với mỗi clip, gửi cho công cụ tạo video ${fromProduct ? 'các ảnh sản phẩm đính kèm làm ảnh tham chiếu' : 'đúng ảnh khung đầu đã chỉ định'} và NGUYÊN VĂN phần mô tả của clip đó (các dòng sản phẩm, bối cảnh và các cảnh có mốc giây), kèm các quy tắc ở cuối; không tự thêm cảnh, đạo cụ, người hay hành động khác, không gộp hoặc đổi thứ tự clip.`
        : `The video tool renders at most ${MUSE_GEN_SECONDS} seconds per generation, so create exactly ${museClips.length} clips in the order below and join them into one video. For each clip, give the video tool ${fromProduct ? 'the attached product photos as references' : 'exactly the specified first-frame image'} and that clip's description VERBATIM (product, setting and timed shot lines) plus the rules at the end; do not add scenes, props, people or actions, and do not merge or reorder clips.`;
      const edit = isVi
        ? `Ghép: ${trimList}; nối theo thứ tự bằng cắt thẳng (không hiệu ứng chuyển cảnh, không tăng tốc) thành 1 video duy nhất dài đúng ${cleanDuration} giây, khung ${ORIENTATION} ${aspectRatio}, rồi gửi file video cuối cùng. Chỉ tạo đúng ${museClips.length} clip, không tạo thêm clip nào khác.`
        : `Edit: ${trimList}; join them in order with straight cuts (no transition effects, no speed change) into ONE video exactly ${cleanDuration} seconds long, ${ORIENTATION} ${aspectRatio}, then send the final video file. Create exactly ${museClips.length} clips, no extra clips.`;
      return [formatHead, intro, ...clipBlocks, edit, ...rules].join('\n\n');
    };

    const buildMuseVideoPrompt = (raw, analysis) => {
      const lock = productLockLine(analysis, true);
      const body = String(raw || '')
        .replace(/^\s*(Định dạng|Format)\s*:[^\n]*\n?/i, '')
        .trim();
      const parts = body.split(/\bCLIP\s*(\d+)\s*[:.\-–—]\s*/i);
      const sections = {};
      for (let i = 1; i < parts.length; i += 2) sections[Number(parts[i])] = parts[i + 1].trim();
      const formatHead = `${formatLine(cleanDuration)}.`;
      const style = isVi
        ? `Phong cách quảng cáo chân thực, khung ${ORIENTATION} ${aspectRatio}.`
        : `Photorealistic commercial style, ${ORIENTATION} ${aspectRatio} frame.`;

      if (museClipCount === 1) {
        const parsed = Object.keys(sections).sort((a, b) => a - b).map((k) => sections[k]).filter(Boolean);
        const content = parsed.length ? parsed.join(' ') : body;
        return [
          formatHead,
          isVi
            ? 'Dùng các ảnh đính kèm theo đúng thứ tự làm tham chiếu cho từng cảnh, ảnh số 1 là khung hình đầu. Dùng nguyên văn mô tả dưới đây cho công cụ tạo video, không tự thêm cảnh, đạo cụ, người hay hành động khác.'
            : 'Use the attached images in order as the reference for each scene; image 1 is the first frame. Give the video tool the description below verbatim; do not add scenes, props, people or actions.',
          fromProduct ? PRODUCT_REF_RULE : '',
          lock,
          content,
          MOTION_RULE,
          NO_CODES_VIDEO_RULE,
          NO_FACE_VIDEO_RULE,
          style,
        ].filter(Boolean).join('\n\n');
      }

      const allParsed = museClips.every((_, i) => sections[i + 1]);
      const totalImages = cleanNumScenes + 1;
      const clipLines = museClips.map((c, i) => {
        const images = c.scenes.flatMap(sceneImages);
        const labels = c.scenes.flatMap(sceneImageLabels);
        const keep = secText(c.seconds);
        const fullClip = c.seconds >= MUSE_GEN_SECONDS - 0.05;
        const content = allParsed ? sections[i + 1] : '';
        // End frame only when we have an image of this clip's end state at the SAME spot:
        // the hook ends on image 1B, the last clip on the final hero image. Using the next
        // clip's image (another spot) would force the model to morph between places.
        const isHookOnly = c.scenes.length === 1 && c.scenes[0] === 1;
        const isLast = i === museClips.length - 1;
        const lastFrame = isHookOnly ? 2 : (isLast ? totalImages : null);
        const lastLabel = isHookOnly ? '1B' : sceneImageLabels(cleanNumScenes).slice(-1)[0];
        const anchor = lastFrame && lastFrame !== images[0]
          ? (isVi
            ? ` Nếu công cụ cho phép đặt khung hình cuối, dùng ảnh số ${lastFrame} (Ảnh ${lastLabel}) làm khung cuối để sản phẩm không bị biến dạng giữa clip.`
            : ` If the tool accepts an end frame, use image ${lastFrame} (Image ${lastLabel}) as the end frame so the product cannot drift mid-clip.`)
          : '';
        const mode = clipFitMode(c.seconds);
        const timing = mode === 'full'
          ? (isVi ? `Clip dài ${MUSE_GEN_SECONDS} giây, dùng trọn cả clip.` : `The clip is ${MUSE_GEN_SECONDS} seconds and is used in full.`)
          : mode === 'speed'
            ? (isVi
              ? `Nếu công cụ cho phép chọn thời lượng thì tạo clip dài ${keep} giây; nếu không, tạo ${MUSE_GEN_SECONDS} giây với nhịp hành động chậm rãi trải đều cả clip (sẽ tăng tốc đều khi ghép, không cắt bỏ hành động).`
              : `If the tool lets you choose the length, make this clip ${keep} seconds; otherwise make it ${MUSE_GEN_SECONDS} seconds with slow, evenly paced action across the whole clip (it is sped up evenly when joining, no action is cut).`)
            : (isVi
              ? `Nếu công cụ cho phép chọn thời lượng thì tạo clip dài ${keep} giây; nếu không, tạo ${MUSE_GEN_SECONDS} giây, toàn bộ hành động xong trong ${keep} giây đầu, phần còn lại giữ yên khung cuối.`
              : `If the tool lets you choose the length, make this clip ${keep} seconds; otherwise make it ${MUSE_GEN_SECONDS} seconds with all the action finished in the first ${keep} seconds and the rest holding the last frame still.`);
        const take = isVi
          ? 'Đây là MỘT cảnh quay liền mạch ở một chỗ: không cắt cảnh, không đổi bối cảnh, không chuyển cảnh bên trong clip.'
          : 'This is ONE continuous take at one spot: no cuts, no change of setting, no transitions inside the clip.';
        // Pace inside a clip that holds the hook plus the next scene(s): the unboxing
        // keeps its script length (~5-6s of the final video), the rest follows at the same spot.
        const hookShare = c.scenes[0] === 1 && c.scenes.length > 1
          ? Math.round((c.sceneSeconds[0] / c.sceneSeconds.reduce((a, b) => a + b, 0)) * 100)
          : 0;
        const pacing = hookShare
          ? (isVi
            ? ` Nhịp: mở thùng và nhấc sản phẩm lên chiếm khoảng ${hookShare}% đầu clip (≈ ${secText(c.sceneSeconds[0])} giây trong video cuối), phần còn lại là cảnh ${c.scenes.slice(1).join(', ')} ngay tại chỗ đó.`
            : ` Pace: opening the box and lifting the product takes about the first ${hookShare}% of the clip (≈ ${secText(c.sceneSeconds[0])} seconds of the final video); the rest is scene ${c.scenes.slice(1).join(', ')} at the same spot.`)
          : '';
        return isVi
          ? `Clip ${i + 1} — cảnh ${c.scenes.join(', ')}: dùng ảnh đính kèm số ${images.join(', ')} (Ảnh ${labels.join(', ')}) làm tham chiếu, ảnh số ${images[0]} là khung hình đầu.${anchor} ${take}${pacing} ${timing}${content ? ` Nội dung: ${content}` : ''}`
          : `Clip ${i + 1} — scenes ${c.scenes.join(', ')}: use attached images ${images.join(', ')} (Image ${labels.join(', ')}) as reference, image ${images[0]} is the first frame.${anchor} ${take}${pacing} ${timing}${content ? ` Content: ${content}` : ''}`;
      });
      // Fit each 10s generation to its slot: speed it up when little is removed
      // (cutting mid-action is what makes joins stutter), trim when a lot is removed.
      const trimList = museClips.map((c, i) => {
        const mode = clipFitMode(c.seconds);
        const factor = String(Math.round((MUSE_GEN_SECONDS / c.seconds) * 100) / 100).replace('.', isVi ? ',' : '.');
        if (mode === 'full') return isVi ? `clip ${i + 1} giữ nguyên ${MUSE_GEN_SECONDS} giây` : `clip ${i + 1}: keep all ${MUSE_GEN_SECONDS} seconds`;
        if (mode === 'speed') return isVi
          ? `clip ${i + 1} tăng tốc đều ×${factor} còn ${secText(c.seconds)} giây (nếu clip đã đúng ${secText(c.seconds)} giây thì giữ nguyên)`
          : `clip ${i + 1}: speed up evenly ×${factor} to ${secText(c.seconds)} seconds (keep as is if it is already ${secText(c.seconds)} seconds)`;
        return isVi ? `clip ${i + 1} lấy ${secText(c.seconds)} giây đầu` : `clip ${i + 1}: first ${secText(c.seconds)} seconds`;
      }).join('; ');
      const intro = isVi
        ? `Công cụ tạo video chỉ ra tối đa ${MUSE_GEN_SECONDS} giây mỗi lần, nên hãy tạo đúng ${museClipCount} clip theo thứ tự dưới đây rồi ghép thành 1 video. Với mỗi clip, gửi cho công cụ tạo video đúng ảnh khung đầu đã chỉ định và dùng NGUYÊN VĂN phần "Nội dung" của clip đó làm mô tả (kèm dòng giữ sản phẩm và quy tắc chuyển động bên dưới); không tự thêm cảnh, đạo cụ, người hay hành động khác, không gộp hoặc đổi thứ tự clip.`
        : `The video tool renders at most ${MUSE_GEN_SECONDS} seconds per generation, so create exactly ${museClipCount} clips in the order below and join them into one video. For each clip, give the video tool exactly the specified first-frame image and use that clip's "Content" VERBATIM as its description (plus the product line and motion rules below); do not add scenes, props, people or actions, and do not merge or reorder clips.`;
      const fallback = allParsed ? '' : (isVi ? `Nội dung toàn video (chia theo các cảnh ở trên): ${body}` : `Full video content (split by the scenes above): ${body}`);
      const edit = isVi
        ? `Ghép: ${trimList}; nối theo thứ tự bằng cắt thẳng (không hiệu ứng chuyển cảnh) thành 1 video duy nhất dài đúng ${cleanDuration} giây, khung ${ORIENTATION} ${aspectRatio}, rồi gửi file video cuối cùng. Chỉ tạo đúng ${museClipCount} clip, không tạo thêm clip nào khác.`
        : `Edit: ${trimList}; join them in order with straight cuts (no transition effects) into ONE video exactly ${cleanDuration} seconds long, ${ORIENTATION} ${aspectRatio}, then send the final video file. Create exactly ${museClipCount} clips, no extra clips.`;
      return [formatHead, intro, fromProduct ? PRODUCT_REF_RULE : '', lock, ...clipLines, fallback, edit, MOTION_RULE, NO_CODES_VIDEO_RULE, NO_FACE_VIDEO_RULE, style].filter(Boolean).join('\n\n');
    };

    const systemPrompt = `You are a senior short-form commercial director (TikTok/Reels/Shorts) and an expert prompt engineer for image models (GPT Image / DALL-E 3, Gemini Imagen, Muse, Midjourney) and video models (Google Veo 3, Grok Imagine Video, Muse Video, ByteDance Seedance 2.0).

INPUT: ${imagesList.length} reference photo(s) of ONE real product. Cross-check all photos to get the exact product name, brand, packaging shape, colors, typography and textures. Never invent a different brand.
${packagingRule}

=== 0. PRODUCT USAGE ANALYSIS — DO THIS FIRST, IT DRIVES EVERY SCRIPT ===
- Read the label text word by word. Decide: what the product IS, its labeled PURPOSE, the MAIN INGREDIENT or DISH it is made for, and the real usage steps.
- When the name states a dish or ingredient, EVERY video must use the product for exactly that. Examples: "Sốt Gà Chiên Nước Mắm" = fish-sauce glaze for FRIED CHICKEN → every video cooks chicken; "Set nấu chè long nhãn hạt sen tuyết yến" = a kit for longan–lotus seed–snow fungus sweet soup → every video cooks that chè from the kit's ingredients.
- Variety between videos comes from the format/cut (wings, drumsticks, boneless thighs, popcorn chicken; hot vs iced chè, family pot vs single bowl), serving context, story and camera — NEVER from swapping the main ingredient (no fish, beef or shrimp for a chicken sauce; no other dessert for a chè kit).
- Clear packaging that shows the contents → show those exact contents being used (e.g. pour the kit's longan, lotus seeds and snow fungus into the pot).
- Fill product_analysis.intended_use, main_ingredient_or_dish, usage_steps and wrong_uses_to_avoid, and obey them.
- PRODUCT LOOK LOCK — image/video models drift to a similar-looking product when the text is vague (e.g. whole dried sweet potatoes turning into thin jerky slices). Fill product_analysis.visual_identity with ONE precise ${isVi ? 'Vietnamese' : 'English'} sentence describing exactly what the reference photos show: the packaging (type, transparency, closure, label or no label) AND the contents (whole / sliced / pieces / powder / liquid, shape, size in cm, color, surface finish, roughly how many per pack). Describe shape with concrete, unambiguous words a painter could follow — thickness and cross-section (flat / thin / curled / round), edges (irregular, torn, crinkled), how pieces sit (piled loosely, stacked, standing) — and avoid vague words such as "strips / dải / thanh" that models turn into round sausage-like sticks. Base it on the photos where the product is clearest. Fill product_analysis.not_to_confuse_with with 2-4 similar-looking things it must never become. Reuse the same visual_identity wording whenever the contents appear in image prompts and video prompts — especially in actions that open, pour, cut, hold or plate the product.

OUTPUT: exactly ${cleanNumVideos} video scripts, each ${cleanDuration}s, ${aspectRatio}, ${cleanNumScenes} scenes/shots (shot slots: ${shotSlots}). Run seed: ${plan.runSeed} (use it as a creativity seed — do not reuse stock ideas from previous runs).

${plan.assignedThemes ? `=== 1. BACKGROUND (assigned per video, designed for this product — MANDATORY) ===
Each video uses exactly the background assigned to it below. Keep its surface, environment and lighting; you may add props that fit the product and its main ingredient. Put the given id in background_applied.theme_id.
${plan.assignedThemes.map((t, i) => `[VIDEO ${i + 1}] id="${t.id}" ${t.theme_name} — surface: ${t.surface_material}; environment: ${t.environment_setting}; lighting: ${t.lighting_style}; EN: "${t.prompt_descriptor}"`).join('\n')}
${productProfile ? `PRE-ANALYSIS from a dedicated step (stay consistent): product "${productProfile.product_name}", intended use: ${productProfile.intended_use}; main ingredient/dish: ${productProfile.main_ingredient_or_dish}.` : ''}` : `=== 1. BACKGROUND SELECTION (per product category) ===
First decide the product category. Then pick ${cleanNumVideos} DIFFERENT backgrounds from the randomized candidate list below whose [fits] tags suit this product (e.g. skincare must NOT get a street-food counter; noodles must NOT get a spa bathroom). Specific tags beat broad ones: herbal/health tea → "tea", candy/cakes/snacks → "sweets", dried fish/squid/nuts/dried fruit → "dried", cooking sauces/marinades/seasonings → "sauce"; only fall back to broad "food"/"beverage" when no specific candidate fits. Prefer candidates earlier in the list when several fit. You may adapt props/details so they make sense for this product, but keep the core surface/environment/lighting of the chosen candidate. Return its id in background_applied.theme_id.
${forcedGuide}

CANDIDATES (randomized for this run):
${candidatesGuide}`}

=== 2. PER-VIDEO CREATIVE DIRECTION (assigned randomly — follow it) ===
${perVideoDirectionGuide}

=== 3. HOOK RULES (Scene 1 = first ${hookLen}s of every video — longer than the other shots on purpose) ===
- THE BOX: a LARGE rectangular brown kraft corrugated shipping carton, clearly wider than tall (about 60 x 40 x 30 cm, roughly 3-4 times the product's width), sealed with ONE strip of tape running lengthwise along the center seam where the two long lid flaps meet. TAPE DIRECTION: any cutting, slitting or peeling moves ALONG that tape line from one end of the box to the other (parallel to the seam) — never across the box or perpendicular to the tape. Inside, MANY units of the product are packed upright in neat rows (abundance). Never a small box that only fits one unit. Describe the box size explicitly in every hook prompt (image and video).
- ORDER IS FIXED: closed box → tape slit/peeled → the two lid flaps folded open → rows of product revealed → one unit lifted out to camera and held. The video must never start with the product already out of the box.
- ONE BOX THAT STAYS STILL: exactly one carton, already resting at its spot from the first frame (the hook image shows it there). The box never drops, slides, flies, spins, is carried or stacked, and no extra people (couriers, feet, bodies) appear — video models render those as jumps.
- SMOOTHNESS (the hook is only ${hookLen}s): at most THREE slow beats — (1) the variant's tiny intro gesture (≤1s: slit, tap, peek, press…), (2) both hands fold the two flaps open in ONE continuous motion while the camera slowly pushes in, (3) one hand (or both) lifts one unit straight up toward the lens and holds it still. No snapping, popping or springing flaps, no rapid repeated pulls, no cut inside the hook. Use words like "slowly", "smoothly", "in one continuous motion".
- Use exactly the hook variant assigned to that video, staged on that video's surface/environment. Hooks must look different between videos (tool, gesture, camera angle).

=== 4. SCENES 2..${cleanNumScenes} — NO REPETITION, NO FILLER, CONTINUITY ===
- Follow the assigned story structure. Show real usage of the product (cooking/eating for food, mixing/pouring for drinks, applying for cosmetics, operating for gadgets, wearing for fashion...).
- Every scene must be a MEANINGFUL new step that moves the story (preparing, using, transforming, tasting, result). NO filler shots such as "a hand rotates the glass", "a hand turns the label toward camera", "a hand sets the product down" — only the final hero shot may be a product-display shot.
- Within one video: every scene is a NEW action, NEW framing and NEW camera move. The story must progress (start → middle → payoff). Never two scenes of the same action.
- CAUSE → EFFECT, NOTHING APPEARS FROM NOWHERE: every state change is shown being caused by the hands (a pack is torn/peeled open before anything comes out; food is placed in the pan before it is in the pan). Objects never appear, vanish, duplicate or teleport.
- QUANTITY CONTINUITY: the number of pieces always matches what came out of the opened pack(s) per visual_identity (e.g. one pack of 3 cakes → at most 3 cakes in the pan and on the plate). Never show a big stack or a full pan unless the story visibly opened enough packs.
- CONTINUITY: keep ONE time of day and ONE lighting setup for the whole video (no morning → noon → sunset changes). Object states carry over between shots: once a lid is opened it stays open, liquid levels and food states only progress forward, props stay where they were placed.
- Across videos: no shared recipe/use-case, key ingredients, props or action sequence. Each video is a different idea, not the same idea in a different room.
- The last scene is a payoff/hero shot with the product packaging clearly visible.

=== 5. IMAGE PROMPTS (one per scene) ===
- ONE standalone photograph per prompt — never a collage, grid, split screen or storyboard.
- START-FRAME RULE: users feed these images to image-to-video models as the FIRST frame of each shot, so each image shows the state at the START of that scene's action, not its end. Scene 1 image = the LARGE closed tape-sealed carton on the surface with hands just touching the tape (product NOT visible yet). Scene 2+ = the moment right before that scene's action begins. Only the final hero scene shows the finished result.
- EXTRA HOOK IMAGE "hook_reveal_image" (NOT a scene, NOT counted in the ${cleanNumScenes} scenes, no timeline entry): it shows the END of the hook so nobody confuses the story — the SAME large carton from scene 1, now open with all four flaps folded outward, MANY units of the product visible packed upright in neat rows inside, one hand lifting one unit up out of the box with its front label facing the camera. Same surface, setting, lighting and camera side as the scene 1 image. ${lean ? 'Provide image_prompt_gpt and negative_prompt for it like a scene.' : 'Provide image_prompt_gpt / gemini / muse / midjourney for it like a scene.'}
- The scene images of one video must share the same lighting/time of day and consistent object states (see continuity rules).
- NO QR CODES / BARCODES: never generate a QR code, barcode, scannable code, stamp or tracking label anywhere (packaging, box, props, background). If the reference packaging has a QR code or barcode, the generated product must show that area as plain, clean packaging of the same color — keep everything else on the packaging exactly the same. State this in every image prompt and put "QR code, barcode" in every negative_prompt.
- NO VISIBLE FACES (images AND all video prompts): never show a model's or any person's face. Use only hands, arms, or people cropped below the chin, seen from behind or far out of focus. Scenes about sharing/eating with friends or family show only hands, arms and shoulders around the table. Never describe facial expressions, smiles or eye contact. Put "visible face, face, portrait" in every negative_prompt.
- image_prompt_gpt: rich ${isVi ? 'Vietnamese' : 'English'} (3-4 sentences), starts with "${ANTI_COLLAGE_PREFIX}", includes lens, that video's surface, lighting, and exact packaging details (or the replacement clear bag when the packaging option is on).
${lean ? '- Only image_prompt_gpt is needed (no gemini / muse / midjourney variants).' : `- image_prompt_gemini: hyper-real commercial photo phrasing. image_prompt_muse: premium commercial render phrasing. image_prompt_midjourney: ALWAYS in English (Midjourney does not understand Vietnamese well), ends with "--ar ${aspectRatio} --v 6.1 --style raw".`}

=== 6. VIDEO PROMPTS — MULTI-SHOT, NEVER ONE LOOPING SHOT ===
Video models repeat one action for the whole clip when the prompt describes a single continuous camera path. Therefore EVERY video prompt must be written as a sequence of ${cleanNumScenes} timestamped shots with HARD CUTS, each with: shot size + camera move + one concrete physical action + what changes. Use simple concrete verbs; avoid stacks of adjectives.

${lean ? '' : `a) video_prompt_seedance (ByteDance Seedance 2.0 — the most important one). Use EXACTLY this layout, in ${isVi ? 'Vietnamese' : 'English'}, under ~1800 characters:
${isVi ? `"Video quảng cáo sản phẩm nhiều cảnh, ${cleanDuration} giây, khung ${ORIENTATION} ${aspectRatio}, ${cleanNumScenes} cảnh cắt dứt khoát (hard cut), vật lý chân thực, có âm thanh gốc.
${packagingLineVideo}
Bối cảnh: <một dòng: bề mặt, không gian, ánh sáng của video này>.
Cảnh 1 (0-Xs): <cỡ cảnh>, <chuyển động máy quay>. <hành động hook>. Âm thanh: <tiếng động>.
Cảnh 2 (X-Ys): Cắt sang <cỡ cảnh>, <chuyển động máy quay>. <hành động mới>. Âm thanh: <tiếng động>.
... (mỗi cảnh một dòng tới Cảnh ${cleanNumScenes})
Quy tắc: mỗi cảnh là một hành động và khung hình khác nhau, không lặp chuyển động, không lặp vòng, không chữ hay phụ đề trên màn hình, bàn tay đúng giải phẫu, nhận diện thương hiệu sản phẩm nhất quán."` : `"Multi-shot ${cleanDuration}-second product commercial, ${ORIENTATION} ${aspectRatio}, ${cleanNumScenes} shots with hard cuts, realistic physics, native audio.
${packagingLineVideo}
Setting: <one line: surface, environment, lighting of this video>.
Shot 1 (0-Xs): <shot size>, <camera move>. <hook action>. SFX: <sound>.
Shot 2 (X-Ys): Cut to <shot size>, <camera move>. <new action>. SFX: <sound>.
... (one line per shot up to Shot ${cleanNumScenes})
Rules: every shot shows a different action and framing, no repeated motion, no looping, no on-screen text or subtitles, hands anatomically correct, product branding stays consistent."`}
`}SHOT DETAIL STANDARD (applies to EVERY video prompt): each shot must be described so a video model cannot misread it — 2-3 sentences covering: (1) framing + camera move, (2) exactly what is in frame (hands, product with its real packaging shape/color/material, props, food/texture state), (3) the one physical action from start to end and the visible result (e.g. "the flap folds back and the pouch is lifted until its front label faces the lens"), (4) light/texture detail. Name the product consistently by the same short description in every shot.

${lean ? '' : `b) video_prompt_veo3 (Google Veo 3). Veo 3 renders at most ${VEO_MAX_CLIP}s per generation, so ${veoClipCount > 1 ? `split the ${cleanDuration}s video into ${veoClipCount} self-contained clips, each pasteable on its own, labelled "${isVi ? 'CLIP' : 'CLIP'} 1 (00:00-00:0${VEO_MAX_CLIP})", "CLIP 2 (...)" etc. Distribute the ${cleanNumScenes} shots across the clips; every clip is ${VEO_MAX_CLIP} seconds (if ${cleanDuration}s is not a multiple of ${VEO_MAX_CLIP}, the last clip ends on a held hero shot of the product), repeats the Format/Product/Setting lines, restarts its beat timestamps at [00:00], and opens exactly where the previous clip ended` : `write one clip`}. Layout of each clip:
"${formatLine('<clip seconds>')}, ${isVi ? 'ảnh chân thực kiểu quảng cáo, có âm thanh gốc' : 'photorealistic commercial, native audio'}.
${isVi ? 'Sản phẩm' : 'Product'}: <name + exact packaging description>.
${isVi ? 'Bối cảnh' : 'Setting'}: <surface, environment, lighting>.
[00:00-00:0${hookLen}] <hook shot detail per the hook rules>. ${isVi ? 'Âm thanh' : 'Audio'}: <SFX + ambience>.
[00:0${hookLen}-...] <next shot, following the shot slots above>
${isVi ? 'Phong cách' : 'Style'}: <lens, depth of field, color grade>. ${isVi ? 'Không chữ, không phụ đề trên màn hình.' : 'No on-screen text or subtitles.'}"
`}c) video_prompt_grok (Grok Imagine Video): energetic, fast cuts. Layout:
"${formatLine(cleanDuration)}, ${isVi ? 'quảng cáo năng động, cắt cảnh nhanh' : 'high-energy commercial, fast cuts'}.
${isVi ? 'Sản phẩm' : 'Product'}: <name + packaging>. ${isVi ? 'Bối cảnh' : 'Setting'}: <one line>.
0-${hookLen}s: <hook shot detail per the hook rules — the opening itself stays smooth, energy comes from the cut right after>.
${hookLen}-...s: <shot detail per the standard, punchy verbs> (one line per shot following the shot slots above, until ${cleanDuration}s)
${isVi ? 'Không chữ trên màn hình, sản phẩm luôn đúng bao bì.' : 'No on-screen text, product packaging stays accurate.'}"
${lean ? '' : `d) video_prompt_muse (Muse Video): Muse renders at most ${MUSE_MAX_CLIP}s per generation, so this video is made from ${museClipCount} separate generation${museClipCount > 1 ? 's that are trimmed and joined afterwards' : ''}. The server adds the format line, image mapping and editing instructions itself — you write ONLY the content. Write exactly ${museClipCount} paragraph${museClipCount > 1 ? 's' : ''}, each starting with its label "CLIP 1:"${museClipCount > 1 ? ', "CLIP 2:" …' : ''}, following this plan: ${museClipGuide}. Each clip is rendered by an image-to-video model as ONE continuous take starting from that clip's first scene image, so write it as one continuous shot — never a sequence of cuts or locations. Each paragraph is plain prose, present tense, 4-6 sentences (max ~700 characters), and must stand alone because each clip is generated separately: (1) the product and its real packaging + contents using the visual_identity wording, and the spot in a few words; (2) the exact START state, matching the clip's first scene image (where the hands, pack and food are); (3) one or two simple, slow physical actions in a natural order with the visible cause → effect (e.g. "one hand pinches the top seam and peels the pack open, then tips the three cakes onto the plate"); (4) the exact END state, matching the first scene image of the next clip (or the final hero image), with the same number of pieces; (5) one simple steady camera move (slow push-in, gentle pan or locked-off close-up). Keep motion slow, smooth and real-speed; hands hold things firmly; food keeps its shape (no morphing). Muse misreads shot lists and technical notation: NO timestamps, NO "Shot 1", NO "SFX", NO brackets, NO cut words, NO jargon like hard cut / rack focus / wok hei, NO durations (the server adds them).
e) video_prompt_sedan: copy of video_prompt_seedance (backward compatibility).
- timeline: exactly ${cleanNumScenes} entries matching the shots (time_range, shot_name, action in Vietnamese, camera_motion, audio_cue).

`}=== 7. LANGUAGE ===
${lean ? 'title_vi, concept_vibe, description_vi: Vietnamese.' : 'title_vi, concept_vibe, description_vi, timeline.action: Vietnamese.'}
PROMPT LANGUAGE = ${isVi ? 'VIETNAMESE' : 'ENGLISH'}: write ${lean ? 'image_prompt_gpt, negative_prompt and video_prompt_grok' : 'image_prompt_gpt, image_prompt_gemini, image_prompt_muse, negative_prompt, ALL video prompts (seedance, veo3, grok, muse, sedan) and timeline camera_motion/audio_cue'} in ${isVi ? 'natural, precise Vietnamese with full diacritics (keep technical camera terms like "close-up", "macro", "slow motion", "35mm" when clearer)' : 'English'}. image_prompt_midjourney is always English.

Return ONLY valid JSON (no markdown fences) with this schema:
{
  "product_analysis": { "product_name": "...", "category": "...", "brand_and_packaging": "...", "key_colors": ["..."], "materials_and_textures": "...", "target_vibe": "...", "intended_use": "...", "main_ingredient_or_dish": "...", "usage_steps": ["..."], "wrong_uses_to_avoid": ["..."], "visual_identity": "...", "not_to_confuse_with": ["..."] },
  "total_videos": ${cleanNumVideos},
  "videos": [
    {
      "video_id": 1,
      "title_vi": "Kịch Bản 1: ...",
      "concept_vibe": "...",
      "hook_variant": { "hook_id": "...", "name_vi": "..." },
      "story_structure": "...",
      "background_applied": { "theme_id": "...", "theme_name": "...", "surface_material": "...", "environment_setting": "...", "lighting_style": "..." },
      "scenes": [
        {
          "scene_number": 1,
          "badge": "HOOK",
          "title_vi": "Cảnh 1: ...",
          "description_vi": "...",
          "camera_angle": "...",
          "lighting": "...",
          "image_prompt_gpt": "...",
${lean ? '' : `          "image_prompt_gemini": "...",
          "image_prompt_muse": "...",
          "image_prompt_midjourney": "...",
`}          "negative_prompt": "collage, grid, multi-panel, split screen, storyboard, distorted text, deformed hands, extra fingers, low resolution"
        }
      ],
      "hook_reveal_image": {
        "title_vi": "Cảnh 1B: Mở Thùng Thấy Sản Phẩm",
        "description_vi": "...",
        "camera_angle": "...",
        "image_prompt_gpt": "...",
${lean ? '' : `        "image_prompt_gemini": "...",
        "image_prompt_muse": "...",
        "image_prompt_midjourney": "...",
`}        "negative_prompt": "..."
      },
      "video_prompt": {
        "duration_seconds": ${cleanDuration},
        "aspect_ratio": "${aspectRatio}",
        "camera_direction": "...",
${lean ? '        "video_prompt_grok": "..."' : `        "sound_design_asmr": "...",
        "video_prompt_seedance": "...",
        "video_prompt_veo3": "...",
        "video_prompt_grok": "...",
        "video_prompt_muse": "...",
        "video_prompt_sedan": "...",
        "timeline": [ { "time_range": "00:00 - 00:03", "shot_name": "Shot 1: ...", "action": "...", "camera_motion": "...", "audio_cue": "..." } ]`}
      }
    }
  ]
}`;

    const userPromptText = `Here are ${imagesList.length} reference photo(s) of the product. FIRST read the label and work out what the product is for and which main ingredient/dish it is made for (section 0) — every script must use it exactly for that purpose, with the same main ingredient in all videos.${bag ? ` Replace the packaging with the new clear bag described (${bag.en}).` : ''} Then generate ${cleanNumVideos} clearly different ${cleanDuration}s commercial scripts following the assigned hook variant, story structure and camera style for each video, ${plan.assignedThemes ? 'each using the background assigned to it in section 1.' : "with backgrounds chosen from this run's candidate list to fit the product category."}
Each video prompt must be multi-shot (${cleanNumScenes} shots, hard cuts, a new action every shot) — never a single continuous shot repeating the same motion.
Write all image & video prompts in ${isVi ? 'Vietnamese (Midjourney prompt stays English)' : 'English'}.
Additional notes from user: ${additionalPrompt || 'None'}.
Return strictly valid JSON.`;

    console.log(`[OpenCode Go] Protocol: ${effectiveProtocol} | Endpoint: ${targetEndpoint} | Model: ${model} | Images: ${imagesList.length} | Videos: ${cleanNumVideos} | MaxTokens: ${tokenLimit}`);

    // A video is usable only if it has scenes and video prompts; a truncated response
    // usually leaves the last video half-written, so it is dropped and regenerated.
    const isCompleteVideo = (v) => v && Array.isArray(v.scenes) && v.scenes.length >= 2 &&
      v.video_prompt && (v.video_prompt.video_prompt_seedance || v.video_prompt.video_prompt_veo3 || v.video_prompt.video_prompt_grok);

    // Distinct usage angles keep separately-written videos from repeating one idea.
    const USAGE_ANGLES = [
      'the most classic, signature way to use it',
      'a different dish or serving format than the classic one',
      'a quick everyday or on-the-go way',
      'a family or sharing occasion',
      'a creative twist that still uses the same main ingredient/dish',
    ];
    const ordinal = (n) => ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth'][n - 1] || `${n}th`;
    const oneVideoText = (k) => `${userPromptText}

SEPARATE-CALL REQUEST: the ${cleanNumVideos} videos are written in ${cleanNumVideos} separate calls at the same time, so you only write your own video. Write ONLY VIDEO ${k} of ${cleanNumVideos}, following [VIDEO ${k}] in the per-video creative direction (its hook variant, story structure and camera style)${plan.assignedThemes ? ` and the background assigned to VIDEO ${k} in section 1` : `, using the ${ordinal(k)} best-fitting background from the candidate list (the other videos take the other ones)`}. To stay clearly different from the other videos, VIDEO ${k} uses usage angle ${k} of ${cleanNumVideos}: ${USAGE_ANGLES[(k - 1) % USAGE_ANGLES.length]} — still the same main ingredient/dish from section 0. All other rules apply in full. Return the same JSON schema with "videos" containing exactly ONE complete video (video_id ${k}) and the full product_analysis.`;

    let parsedResult = null;
    if (parallelVideos && cleanNumVideos > 1) {
      // One call per video, all at once: each answer is ~1/N as long, so the wait is about
      // one video's worth and no answer runs out of output tokens.
      console.log(`[OpenCode Go] Writing ${cleanNumVideos} videos in parallel calls...`);
      const slots = new Array(cleanNumVideos).fill(null);
      const analyses = new Array(cleanNumVideos).fill(null);
      let lastError = null;
      const writeSlot = async (k) => {
        const r = await callModel(systemPrompt, oneVideoText(k));
        if (r.error) { lastError = r.error; console.warn(`[OpenCode Go] Video ${k} failed: HTTP ${r.error.status}`); return; }
        const parsed = parseModelJson(r.content);
        const video = (parsed?.videos || []).find(isCompleteVideo);
        if (!video) { console.warn(`[OpenCode Go] Video ${k}: no complete video in the answer${r.truncated ? ' (hit max tokens)' : ''}`); return; }
        video._slot = k - 1;
        slots[k - 1] = video;
        if (parsed.product_analysis) analyses[k - 1] = parsed.product_analysis;
      };
      await Promise.all(slots.map((_, i) => writeSlot(i + 1)));
      for (let k = 1; k <= cleanNumVideos; k++) {
        if (!slots[k - 1]) await writeSlot(k); // one retry per missing video
      }
      if (slots.every((v) => !v) && lastError) {
        return res.status(lastError.status).json({
          success: false,
          error: `OpenCode Go API (${effectiveProtocol} @ ${targetEndpoint}) báo lỗi ${lastError.status}: ${String(lastError.text || '').slice(0, 400)}`,
          endpoint: targetEndpoint,
          model: model
        });
      }
      // Video 1's analysis is the reference (all calls read the same photos).
      parsedResult = { product_analysis: analyses.find(Boolean) || null, videos: slots.filter(Boolean) };
    } else {
      const first = await callModel(systemPrompt, userPromptText);
      if (first.error) {
        // STRICT REQUIREMENT: DO NOT RETURN FALLBACK SCRIPT ON ERROR!
        return res.status(first.error.status).json({
          success: false,
          error: `OpenCode Go API (${effectiveProtocol} @ ${targetEndpoint}) báo lỗi ${first.error.status}: ${first.error.text.slice(0, 400)}`,
          endpoint: targetEndpoint,
          model: model
        });
      }
      if (!first.content.trim()) {
        return res.status(500).json({
          success: false,
          error: "Mô hình OpenCode Go không trả về nội dung nào. Vui lòng kiểm tra lại quota hoặc chọn model khác."
        });
      }

      parsedResult = parseModelJson(first.content);
      if (!parsedResult || typeof parsedResult !== 'object') {
        // Usually the multi-video answer ran out of output tokens. Never invent a fallback
        // script: start empty and let the one-video-per-call top-up below write each video.
        console.warn(`[OpenCode Go] First response is not valid JSON${first.truncated ? ' (hit max tokens)' : ''}; generating videos one per call. Tail: ${first.content.slice(-200)}`);
        parsedResult = { videos: [] };
      }

      const firstCount = Array.isArray(parsedResult.videos) ? parsedResult.videos.length : 0;
      parsedResult.videos = (Array.isArray(parsedResult.videos) ? parsedResult.videos : [])
        .filter(isCompleteVideo).slice(0, cleanNumVideos);
      if (first.truncated || parsedResult.videos.length < cleanNumVideos) {
        console.log(`[OpenCode Go] First response: ${firstCount} video(s), ${parsedResult.videos.length} complete${first.truncated ? ' (hit max tokens)' : ''}. Topping up to ${cleanNumVideos}...`);
      }

      // Top up missing videos one per call, so each call fits within the output token limit
      let topUpAttempts = 0;
      while (parsedResult.videos.length < cleanNumVideos && topUpAttempts < cleanNumVideos + 1) {
        topUpAttempts++;
        const k = parsedResult.videos.length + 1;
        const doneList = parsedResult.videos.map((v, i) =>
          `- Video ${i + 1}: "${v.title_vi || ''}" | background id: ${v.background_applied?.theme_id || 'n/a'} | idea: ${v.concept_vibe || ''}`
        ).join('\n') || '- (none yet)';
        const topUpText = `${userPromptText}

CONTINUATION REQUEST: these video(s) are already written:
${doneList}
Now write ONLY VIDEO ${k}, following [VIDEO ${k}] in the per-video creative direction. ${plan.assignedThemes ? `Use the background assigned to VIDEO ${k} in section 1` : `Use a DIFFERENT background id`} and a different variation of the same main ingredient/use than the videos above. Return the same JSON schema with "videos" containing exactly ONE complete video (video_id ${k}); repeat product_analysis.`;

        const more = await callModel(systemPrompt, topUpText);
        if (more.error) {
          console.warn(`[OpenCode Go] Top-up for video ${k} failed: HTTP ${more.error.status}`);
          break;
        }
        const extra = parseModelJson(more.content);
        const extraVideo = (extra?.videos || []).find(isCompleteVideo);
        if (extraVideo) {
          parsedResult.videos.push(extraVideo);
          if (!parsedResult.product_analysis && extra.product_analysis) parsedResult.product_analysis = extra.product_analysis;
        }
      }

    }

    parsedResult.videos.forEach((v, i) => { v.video_id = i + 1; });
    parsedResult.total_videos = parsedResult.videos.length;
    if (parsedResult.videos.length === 0) {
      return res.status(500).json({
        success: false,
        error: `Mô hình không trả về được video hoàn chỉnh nào. Hãy tăng 'Max Output Tokens' (ví dụ 32000) hoặc giảm số cảnh.`
      });
    }
    const countWarning = parsedResult.videos.length < cleanNumVideos
      ? `Chỉ tạo được ${parsedResult.videos.length}/${cleanNumVideos} video. Hãy tăng 'Max Output Tokens' hoặc thử lại.`
      : null;

    // Normalize backward compatibility for scene image prompts and video model prompts
    const usedThemeIds = [];
    const usedHookIds = [];
    const resolveThemeId = (id) => id && (findThemeById(id) || (plan.forcedFirst?.id === id ? plan.forcedFirst : null));
    // Tags of the valid pool themes the LLM picked tell us which category fits this product
    const fittingTags = new Set((parsedResult.videos || [])
      .flatMap(v => resolveThemeId(v.background_applied?.theme_id)?.tags || []));
    if (parsedResult.videos && Array.isArray(parsedResult.videos)) {
      parsedResult.videos.forEach((v, listIdx) => {
        const vIdx = Number.isInteger(v._slot) ? v._slot : listIdx;
        delete v._slot;
        // Resolve the background the LLM picked; if invalid or already used by another video,
        // fall back to an unused candidate of the same category (by tags)
        // Product-specific backgrounds were assigned per video before the call: always use them
        let baseTheme = plan.assignedThemes?.[vIdx] || resolveThemeId(v.background_applied?.theme_id);
        if (!plan.assignedThemes?.[vIdx] && baseTheme && usedThemeIds.includes(baseTheme.id)) baseTheme = null;
        if (!baseTheme && vIdx === 0 && plan.forcedFirst) baseTheme = plan.forcedFirst;
        if (!baseTheme) {
          const unused = plan.backgroundCandidates.filter(t => !usedThemeIds.includes(t.id));
          const BROAD_TAGS = ['food', 'beverage', 'generic'];
          const score = t => t.tags.reduce((sum, tag) => sum + (fittingTags.has(tag) ? (BROAD_TAGS.includes(tag) ? 1 : 3) : 0), 0);
          baseTheme = unused.reduce((best, t) => (score(t) > score(best) ? t : best), unused[0]) || plan.backgroundCandidates[0];
        }
        // Assigned backgrounds are authoritative; otherwise the model's wording wins
        const ba = plan.assignedThemes?.[vIdx] ? {} : (v.background_applied || {});
        v.background_applied = {
          theme_id: baseTheme.id,
          theme_name: ba.theme_name || baseTheme.theme_name,
          surface_material: ba.surface_material || baseTheme.surface_material,
          environment_setting: ba.environment_setting || baseTheme.environment_setting,
          lighting_style: ba.lighting_style || baseTheme.lighting_style
        };
        usedThemeIds.push(baseTheme.id);

        // Hook variant assigned to this video
        const hook = plan.hooks[vIdx] || plan.hooks[0];
        v.hook_variant = { hook_id: hook.id, name_vi: hook.name_vi, ...(v.hook_variant || {}) };
        usedHookIds.push(v.hook_variant.hook_id || hook.id);
        if (!v.story_structure) v.story_structure = plan.stories[vIdx]?.name_vi;

        const theme = v.background_applied;
        // Setting text in the prompt language: English prompts use the pool's English descriptor,
        // Vietnamese prompts use the Vietnamese fields (trailing punctuation trimmed to avoid ".;")
        const trimPunct = (t) => String(t || '').trim().replace(/[\s.;,]+$/, '');
        const settingText = (!isVi && baseTheme.prompt_descriptor)
          ? trimPunct(baseTheme.prompt_descriptor)
          : [theme.surface_material, theme.environment_setting, theme.lighting_style].map(trimPunct).filter(Boolean).join('; ');
        const productName = parsedResult.product_analysis?.product_name || (isVi ? 'sản phẩm' : 'the product');

        // Normalize scene image prompts
        if (v.scenes && Array.isArray(v.scenes)) {
          v.scenes.forEach(s => {
            const isFirstScene = s.scene_number === 1;

            const convertToHandsUnboxing = (prompt) => {
              if (!prompt || typeof prompt !== 'string') return prompt;
              let res = prompt;
              res = res.replace(/showing an open (?:brown )?kraft (?:corrugated )?(?:cardboard )?(?:delivery )?carton box/gi,
                'showing clean hands actively unfolding the top flaps of a closed tape-sealed brown kraft corrugated delivery carton box to reveal multiple units of the product neatly packed inside');
              res = res.replace(/an open (?:brown )?kraft (?:corrugated )?(?:cardboard )?(?:delivery )?carton(?: box)?/gi,
                'a closed tape-sealed brown kraft delivery carton box actively opened by clean hands to reveal packed product units inside');
              res = res.replace(/open brown kraft carton/gi, 'closed kraft carton being opened by hands');
              res = res.replace(/open kraft carton/gi, 'closed kraft carton being opened by hands');
              return res;
            };

            if (isFirstScene) {
              if (!s.image_prompt_gpt || s.image_prompt_gpt.length < 40) {
                s.image_prompt_gpt = isVi
                  ? `${ANTI_COLLAGE_PREFIX} Khung hình mở đầu: một thùng carton kraft nâu hình chữ nhật CỠ LỚN (khoảng 60 x 40 x 30 cm, rộng hơn cao), còn đóng kín, một dải băng keo dán dọc mép nắp, đặt chắc trên mặt bàn; hai bàn tay vừa chạm vào đầu dải băng keo, chuẩn bị mở. Bên trong chứa nhiều ${productName} (chưa nhìn thấy). Bối cảnh: ${settingText}. Ảnh chân thực, nét căng, ống kính 35mm, xoá phông mềm.`
                  : `${ANTI_COLLAGE_PREFIX} Opening frame: a LARGE rectangular brown kraft shipping carton (about 60 x 40 x 30 cm, wider than tall), still closed with a strip of tape along the top seam, resting firmly on the surface; two hands are just touching the end of the tape, about to open it. It holds many units of ${productName} (not visible yet). Setting: ${settingText}. Photorealistic, sharp focus, 35mm lens, soft background bokeh.`;
              } else {
                s.image_prompt_gpt = convertToHandsUnboxing(s.image_prompt_gpt);
              }

              if (s.image_prompt_gemini) s.image_prompt_gemini = convertToHandsUnboxing(s.image_prompt_gemini);
              if (s.image_prompt_muse) s.image_prompt_muse = convertToHandsUnboxing(s.image_prompt_muse);
              if (s.image_prompt_midjourney) s.image_prompt_midjourney = convertToHandsUnboxing(s.image_prompt_midjourney);

              if (s.title_vi) {
                s.title_vi = s.title_vi.replace(/thùng carton mở/gi, 'Tay Mở Thùng Carton');
              }
              if (s.description_vi) {
                s.description_vi = s.description_vi.replace(/thùng carton (?:kraft )?mở tung/gi, 'thùng carton đóng kín được bàn tay mở bung nắp thùng');
                s.description_vi = s.description_vi.replace(/thùng carton (?:kraft )?mở toang/gi, 'thùng carton đóng kín được bàn tay mở nắp thùng');
              }
            } else {
              if (!s.image_prompt_gpt || s.image_prompt_gpt.length < 40) {
                s.image_prompt_gpt = isVi
                  ? `${ANTI_COLLAGE_PREFIX} ${trimPunct(s.description_vi || (s.title_vi || 'Cảnh sản phẩm').replace(/^Cảnh \d+:\s*/i, ''))}. Bối cảnh: ${settingText}. Ảnh quảng cáo chân thực, ống kính 85mm f/1.8, xoá phông nhẹ.`
                  : `${ANTI_COLLAGE_PREFIX} A single coherent shot showing ${trimPunct(s.description_vi || (s.title_vi || 'commercial product action').replace(/^Cảnh \d+:\s*/i, ''))}. Setting: ${settingText}. Photorealistic commercial photography, 85mm f/1.8 lens, shallow depth of field.`;
              }
            }

            // Ensure anti-collage prefix is present
            if (!s.image_prompt_gpt.toLowerCase().includes(ANTI_COLLAGE_MARKER)) {
              s.image_prompt_gpt = `${ANTI_COLLAGE_PREFIX} ${s.image_prompt_gpt}`;
            }

            if (!s.image_prompt_gemini) {
              s.image_prompt_gemini = s.image_prompt || s.image_prompt_gpt;
            }
            if (!s.image_prompt_muse) {
              s.image_prompt_muse = s.image_prompt || s.image_prompt_gpt;
            }
            if (!s.image_prompt_midjourney) {
              s.image_prompt_midjourney = s.image_prompt || `${s.image_prompt_gpt} --ar ${aspectRatio} --v 6.1 --style raw`;
            }
            if (!s.image_prompt) {
              s.image_prompt = s.image_prompt_gpt;
            }
          });
        }

        // Extra hook image 1B (opened box with product visible) — not counted as a scene
        const hr = (v.hook_reveal_image && typeof v.hook_reveal_image === 'object') ? v.hook_reveal_image : {};
        const revealFallbackGpt = isVi
          ? `${ANTI_COLLAGE_PREFIX} Cùng thùng carton kraft nâu hình chữ nhật CỠ LỚN ở ảnh mở đầu, giờ đã mở, bốn nắp gập ra ngoài; bên trong xếp thẳng hàng rất nhiều ${productName}; một bàn tay đang nhấc một sản phẩm lên khỏi thùng, mặt nhãn hướng thẳng vào máy ảnh. Bối cảnh: ${settingText}. Cùng góc máy và ánh sáng với ảnh mở đầu, ảnh chân thực, ống kính 35mm, xoá phông mềm.`
          : `${ANTI_COLLAGE_PREFIX} The same LARGE rectangular brown kraft carton from the opening frame, now open with all four flaps folded outward; many units of ${productName} are packed upright in neat rows inside; one hand is lifting one unit up out of the box with its front label facing the camera. Setting: ${settingText}. Same camera angle and lighting as the opening frame, photorealistic, 35mm lens, soft background bokeh.`;
        v.hook_reveal_image = {
          title_vi: hr.title_vi || 'Cảnh 1B: Mở Thùng Thấy Sản Phẩm',
          description_vi: hr.description_vi || 'Thùng đã mở, bốn nắp gập ra ngoài, lộ nhiều sản phẩm xếp hàng bên trong; một tay nhấc một sản phẩm lên, mặt nhãn hướng về máy quay.',
          camera_angle: hr.camera_angle || '',
          lighting: hr.lighting || '',
          image_prompt_gpt: (hr.image_prompt_gpt && hr.image_prompt_gpt.length >= 40) ? hr.image_prompt_gpt : revealFallbackGpt,
          negative_prompt: hr.negative_prompt || 'closed box, empty box, small box, collage, grid, split screen, distorted label, deformed hands'
        };
        if (!v.hook_reveal_image.image_prompt_gpt.toLowerCase().includes(ANTI_COLLAGE_MARKER)) {
          v.hook_reveal_image.image_prompt_gpt = `${ANTI_COLLAGE_PREFIX} ${v.hook_reveal_image.image_prompt_gpt}`;
        }
        v.hook_reveal_image.image_prompt_gemini = hr.image_prompt_gemini || v.hook_reveal_image.image_prompt_gpt;
        v.hook_reveal_image.image_prompt_muse = hr.image_prompt_muse || v.hook_reveal_image.image_prompt_gpt;
        v.hook_reveal_image.image_prompt_midjourney = hr.image_prompt_midjourney ||
          `Large open brown kraft shipping carton, four flaps folded outward, many units of ${productName} packed upright in rows inside, one hand lifting one unit out with label facing camera, ${baseTheme.prompt_descriptor || settingText}, photorealistic commercial photography --ar ${aspectRatio} --v 6.1 --style raw`;

        // Paste-ready master prompt for ChatGPT: one short header + one clean prompt per image.
        // The anti-collage sentence lives once in the header, so it is stripped from each scene prompt.
        if (v.scenes && v.scenes.length > 0) {
          const stripAntiCollage = (txt) => String(txt || '')
            .replace(/^\s*A single standalone, individual commercial product photograph \(NOT a collage[^)]*\)\.?\s*/i, '')
            .replace(/^\s*Một bức ảnh quảng cáo sản phẩm duy nhất, độc lập \(KHÔNG ghép ảnh[^)]*\)\.?\s*/i, '')
            .trim();
          const n = v.scenes.length + 1; // scenes + extra hook image 1B
          const orientation = isVi
            ? ({ '9:16': 'dọc 9:16', '16:9': 'ngang 16:9', '1:1': 'vuông 1:1' }[aspectRatio] || aspectRatio)
            : ({ '9:16': 'vertical 9:16', '16:9': 'horizontal 16:9', '1:1': 'square 1:1' }[aspectRatio] || aspectRatio);
          const setting = settingText;

          // Every scene/hook negative prompt must exclude generated codes.
          [...v.scenes, v.hook_reveal_image].forEach((item) => {
            if (item && !/qr/i.test(item.negative_prompt || '')) {
              item.negative_prompt = [item.negative_prompt, 'QR code, barcode'].filter(Boolean).join(', ');
            }
            if (item && !/visible face/i.test(item.negative_prompt || '')) {
              item.negative_prompt = [item.negative_prompt, 'visible face, face, portrait'].filter(Boolean).join(', ');
            }
          });

          const imageLock = productLockLine(parsedResult.product_analysis, false);
          const imageLockText = imageLock ? String.fromCharCode(10) + imageLock : '';

          let gptMaster = isVi
            ? `Hãy tạo đủ ${n} ảnh quảng cáo sản phẩm theo danh sách dưới đây, xuất ra ${n} ảnh riêng biệt (${n} file ảnh độc lập, không gộp chung vào một ảnh).
Mỗi ảnh là một bức ảnh đơn khung ${orientation}, chân thực như chụp thật — không ghép ảnh, không chia khung, không chèn chữ. ${bag ? `Giữ đúng phần ruột sản phẩm như ảnh tham chiếu tôi gửi kèm, nhưng thay bao bì bằng ${bag.vi} trong suốt, dán nhãn sticker kem đơn giản ghi tên sản phẩm (không sao chép hình vẽ, logo của bao bì cũ).` : `Giữ đúng bao bì, màu sắc và chữ trên sản phẩm như ảnh tham chiếu tôi gửi kèm. Khi tạo từng ảnh, hãy đưa ảnh sản phẩm thật tôi gửi kèm vào công cụ tạo ảnh làm ảnh tham chiếu (không vẽ lại sản phẩm chỉ từ mô tả chữ): hình dạng, kích thước, màu và phần sản phẩm bên trong phải giống ảnh thật; nếu mô tả chữ khác ảnh thì làm theo ảnh.`}
${NO_CODES_IMAGE_RULE}
${NO_FACE_IMAGE_RULE}${imageLockText}
Bối cảnh chung cho cả ${n} ảnh: ${setting}.\n\n`
            : `Create all ${n} commercial product photos from the list below as ${n} separate images (${n} individual image files, not combined into one picture).
Each image is a single ${orientation} photo, photorealistic — no collage, no split frames, no added text. ${bag ? `Keep the product contents exactly as in the reference photo I attach, but replace the packaging with ${bag.en} in clear plastic, with a simple cream sticker label showing the product name (do not copy the old artwork or logo).` : `Keep the packaging, colors and printed text exactly as in the reference photo I attach. When generating each image, pass the real product photos I attach to the image tool as reference images (do not redraw the product from the text alone): shape, size, color and the contents must match the real photos; if the text differs from the photos, follow the photos.`}
${NO_CODES_IMAGE_RULE}
${NO_FACE_IMAGE_RULE}${imageLockText}
Shared setting for all ${n} images: ${setting}.\n\n`;

          // Numbering: 1A (closed box), 1B (opened box, extra), then 2..N for the remaining scenes
          const label = isVi ? 'Ảnh' : 'Image';
          v.scenes.forEach((s, i) => {
            if (i === 0) {
              // 1A / 1B are the first and last frame of the Muse unboxing shot: keep them to
              // one box, same framing, so the video only has to open two flaps between them.
              const hookFrame = isVi
                ? 'Chỉ có MỘT thùng carton kraft lớn duy nhất ở giữa khung hình, cùng góc máy và khung hình giữa ảnh 1A và 1B.'
                : 'Only ONE large kraft carton in the center of the frame, same camera angle and framing in images 1A and 1B.';
              gptMaster += `${label} 1A ${isVi ? '(thùng còn đóng)' : '(closed box)'}: ${stripAntiCollage(s.image_prompt_gpt)} ${isVi ? 'Thùng đóng kín, một dải băng keo dán dọc theo khe giữa hai nắp (từ đầu này sang đầu kia thùng), hai tay đặt trên nắp.' : 'The box is closed with one strip of tape running along the seam between the two lid flaps (end to end), both hands resting on the lid.'} ${hookFrame}\n\n`;
              gptMaster += `${label} 1B ${isVi ? '(mở thùng, thấy sản phẩm bên trong)' : '(box opened, product visible inside)'}: ${stripAntiCollage(v.hook_reveal_image.image_prompt_gpt)} ${isVi ? 'Hai nắp thùng đã mở sang hai bên, một tay nhấc một sản phẩm lên trước ống kính, nhãn hướng về máy.' : 'The two lid flaps are folded out, one hand lifts one unit toward the lens, label facing the camera.'} ${hookFrame}\n\n`;
            } else {
              gptMaster += `${label} ${s.scene_number || i + 1}: ${stripAntiCollage(s.image_prompt_gpt)}\n\n`;
            }
          });
          v.master_image_prompt_gpt = gptMaster.trim();
        }

        // Normalize video prompts for Veo 3, Grok, Muse, Sedan
        if (v.video_prompt) {
          const vp = v.video_prompt;
          const fallbackPrompt = vp.master_ai_video_prompt || vp.video_prompt_veo3_grok || vp.video_prompt_muse_sedan || '';

          const sanitizeVideoPrompt = (txt) => {
            if (!txt || typeof txt !== 'string') return txt;
            let res = txt;
            res = res.replace(/start(?:s)? on an open kraft carton packed with/gi,
              'Start on a closed, tape-sealed kraft carton box; clean hands smoothly pull open the top flaps to dramatically reveal');
            res = res.replace(/start(?:s)? on an open (?:brown )?kraft (?:corrugated )?(?:cardboard )?(?:delivery )?carton(?: box)?/gi,
              'Start on a closed, tape-sealed brown kraft delivery carton box, where clean hands smoothly unfold the flaps open to reveal the product packages inside');
            res = res.replace(/starting (?:with|on) an open (?:brown )?kraft (?:cardboard )?carton/gi,
              'starting on a closed, tape-sealed kraft carton box where clean hands open the flaps to reveal the product packages inside');
            res = res.replace(/orbit around an open kraft carton/gi,
              'orbit starting on a closed, sealed kraft carton box as clean hands smoothly open the flaps to reveal the packed products inside');
            res = res.replace(/dolly(?:-and-orbit)? zoom (?:into|onto) an open kraft carton/gi,
              'dolly zoom onto a closed, sealed kraft delivery carton as clean hands peel open the top flaps to reveal');
            res = res.replace(/revealing an? open kraft carton/gi,
              'revealing a closed kraft carton as clean hands pull open the flaps to show');
            res = res.replace(/reveal an? open kraft carton/gi,
              'reveal a closed kraft carton as clean hands pull open the flaps to show');
            res = res.replace(/thùng carton (?:kraft )?mở tung/gi,
              'thùng carton đóng kín được bàn tay mở bung nắp thùng');
            res = res.replace(/thùng carton (?:kraft )?mở toang/gi,
              'thùng carton đóng kín được bàn tay mở nắp thùng');
            return res;
          };

          if (!vp.video_prompt_veo3) {
            vp.video_prompt_veo3 = vp.video_prompt_veo3_grok || fallbackPrompt;
          }
          if (!vp.video_prompt_grok) {
            vp.video_prompt_grok = vp.video_prompt_veo3_grok || fallbackPrompt;
          }
          if (!vp.video_prompt_muse) {
            vp.video_prompt_muse = vp.video_prompt_muse_sedan || fallbackPrompt;
          }
          if (!vp.video_prompt_seedance) {
            vp.video_prompt_seedance = vp.video_prompt_sedan || vp.video_prompt_muse_sedan || fallbackPrompt;
          }
          if (!vp.video_prompt_sedan) {
            vp.video_prompt_sedan = vp.video_prompt_seedance;
          }
          if (!vp.master_ai_video_prompt) {
            vp.master_ai_video_prompt = vp.video_prompt_veo3 || vp.video_prompt_grok || fallbackPrompt;
          }

          vp.video_prompt_veo3 = sanitizeVideoPrompt(vp.video_prompt_veo3);
          vp.video_prompt_grok = sanitizeVideoPrompt(vp.video_prompt_grok);
          vp.video_prompt_muse = sanitizeVideoPrompt(vp.video_prompt_muse);
          vp.video_prompt_sedan = sanitizeVideoPrompt(vp.video_prompt_sedan);
          vp.video_prompt_seedance = sanitizeVideoPrompt(vp.video_prompt_seedance);

          // Guarantee duration + aspect ratio are stated in every video prompt
          const ensureFormat = (txt) => {
            if (!txt || typeof txt !== 'string') return txt;
            const hasRatio = txt.includes(aspectRatio);
            const hasDuration = new RegExp(`\\b${cleanDuration}\\s*(s\\b|sec|giây|-second)`, 'i').test(txt) || /CLIP\s*1/i.test(txt);
            return (hasRatio && hasDuration) ? txt : `${formatLine(cleanDuration)}.\n${txt}`;
          };
          ['video_prompt_veo3', 'video_prompt_grok', 'video_prompt_seedance', 'video_prompt_sedan']
            .forEach(key => { vp[key] = ensureFormat(vp[key]); });
          // The Muse prompt carries its own format line, clip plan and editing steps.
          // Prefer the Grok shot list split into 10s Muse generations; fall back to the model's own Muse paragraphs.
          vp.video_prompt_muse = buildMuseFromGrok(vp.video_prompt_grok, parsedResult.product_analysis, hook)
            || buildMuseVideoPrompt(vp.video_prompt_muse, parsedResult.product_analysis);
          vp.muse_clip_plan = museClips.map((c, i) => ({ clip: i + 1, scenes: c.scenes, seconds: Math.round(c.seconds * 10) / 10 }));
          vp.duration_seconds = cleanDuration;
          vp.aspect_ratio = aspectRatio;
          vp.master_ai_video_prompt = sanitizeVideoPrompt(vp.master_ai_video_prompt);

          if (vp.timeline && Array.isArray(vp.timeline) && vp.timeline[0]) {
            if (vp.timeline[0].action) {
              vp.timeline[0].action = sanitizeVideoPrompt(vp.timeline[0].action);
              if (!/thùng|carton/i.test(vp.timeline[0].action)) {
                vp.timeline[0].action = hook.description_vi;
              }
            }
          }
        }
      });
    }

    if (usedThemeIds.length) recordUsage(plan.productKey, usedThemeIds, usedHookIds);

    parsedResult.prompt_language = isVi ? 'vi' : 'en';
    parsedResult.packaging_override = bag ? { shape: bagKey, name_vi: bag.vi } : null;
    parsedResult.product_backgrounds = plan.assignedThemes && productProfile
      ? { total: productProfile.backgrounds.length, used_before: usedForProduct.filter(id => productProfile.backgrounds.some(b => b.id === id)).length }
      : null;

    return res.json({
      success: true,
      source: "opencode_go",
      protocol_used: effectiveProtocol,
      endpoint: targetEndpoint,
      images_analyzed: imagesList.length,
      model: model,
      ...(countWarning ? { warning: countWarning } : {}),
      data: parsedResult
    });

  } catch (error) {
    console.error("[Server Error]", error);
    // STRICT REQUIREMENT: Return error, NEVER return fallback script on error!
    return res.status(500).json({
      success: false,
      error: `Lỗi máy chủ trong quá trình xử lý: ${error.message || error}`
    });
  }
};

app.post('/api/generate', generateHandler);

// ---------------------------------------------------------------------------
// Background jobs: Cloudflare tunnels cut requests after ~100s (HTTP 524), but a
// multi-video generation can take longer. The browser starts a job, then polls.
// ---------------------------------------------------------------------------
const JOB_TTL_MS = 30 * 60 * 1000;
const jobs = new Map();

app.post('/api/generate-job', (req, res) => {
  const jobId = crypto.randomBytes(16).toString('hex');
  const job = { done: false, status: 0, result: null, createdAt: Date.now() };
  jobs.set(jobId, job);

  // Capture what the normal handler would send
  const captureRes = {
    statusCode: 200,
    status(code) { this.statusCode = code; return this; },
    json(body) { job.status = this.statusCode; job.result = body; job.done = true; return this; }
  };
  generateHandler(req, captureRes).catch(err => {
    job.status = 500;
    job.result = { success: false, error: `Lỗi máy chủ: ${err.message || err}` };
    job.done = true;
  });

  res.json({ success: true, jobId });
});

app.get('/api/jobs/:id', (req, res) => {
  const job = jobs.get(req.params.id);
  if (!job) return res.status(404).json({ success: false, error: 'Không tìm thấy tiến trình (có thể server vừa khởi động lại). Vui lòng tạo lại.' });
  if (!job.done) return res.json({ done: false, elapsedSeconds: Math.round((Date.now() - job.createdAt) / 1000) });
  res.json({ done: true, status: job.status, result: job.result });
});

setInterval(() => {
  const now = Date.now();
  for (const [id, job] of jobs) if (now - job.createdAt > JOB_TTL_MS) jobs.delete(id);
}, 5 * 60 * 1000).unref();

// Start server
app.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(`🚀 VideoScript Studio is running!`);
  console.log(`🌐 Open in browser: http://localhost:${PORT}`);
  console.log(`=================================================`);
});
