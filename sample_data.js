// sample_data.js - Rich, Creative, Diverse Multi-Video Presets for Instant Food (Noodles) & Cooking Sauces (Sốt Gà Chiên)

const SAMPLE_NOODLES_DATA = {
  product_analysis: {
    product_name: "Mì Xào Ăn Liền Indomie Mi Goreng (Ayam Penyet)",
    category: "Thực Phẩm Ăn Liền Tiện Lợi (Instant Noodles)",
    brand_and_packaging: "Bao bì dạng túi nilon bóng bẩy phối màu đỏ cờ, vàng nghệ và xanh lá cây đặc trưng, in hình tô mì kèm trứng ốp la",
    key_colors: ["#D9381E Đỏ Indomie", "#F4C430 Vàng rực bao bì", "#388E3C Xanh lá", "#5D4037 Nâu gỗ"],
    materials_and_textures: "Vắt mì khô vàng óng sần sùi, gia vị ớt bột cay nồng, xốt kecap manis đen đặc bóng bẩy, lòng đỏ trứng tan chảy",
    target_vibe: "Hấp dẫn vị giác, ngon miệng kích thích dopamine, năng động trẻ trung và ấm cúng"
  },
  total_videos: 3,
  videos: [
    {
      video_id: 1,
      title_vi: "Kịch Bản 1: Mì Khô Trộn Xốt Tương Trứng Lòng Đào (Bàn Gỗ Scandinavian Nắng Xiên)",
      concept_vibe: "Cozy Scandinavian Hygge & Sensory Dry-Mix Noodle",
      background_applied: {
        theme_name: "Gỗ Sồi Scandinavian Nắng Xiên (Scandinavian Wood)",
        surface_material: "Bàn gỗ sồi Bắc Âu sáng màu (Light Natural Oak Wood Table)",
        environment_setting: "Bàn làm việc phong cách Scandinavian, rèm lá sách venetian, chậu cây trầu bà xanh mát, sách nghệ thuật",
        lighting_style: "Nắng vàng sớm rọi xiên qua rèm lá sách (Warm Golden Hour Venetian Shadows)"
      },
      master_image_prompt_gpt: `[DIRECTIVE FOR CHATGPT / DALL-E 3: You are generating commercial hero photographs for an advertising campaign.
CRITICAL RULE: Each scene below MUST be generated as ONE SINGLE STANDALONE, INDIVIDUAL FULL-FRAME PHOTOGRAPH (9:16 vertical).
Strictly prohibited: Absolutely NO collages, NO multi-panel grids, NO comic strips, NO split screens, NO before/after split frames, NO storyboard panels. Every generation must be an independent single-frame photograph.
VIDEO THEME: Gỗ Sồi Scandinavian Nắng Xiên (Light Natural Oak Wood Table)
LIGHTING: Warm golden hour sunlight through venetian blinds]

=== CẢNH 1: TAY MỞ THÙNG CARTON (VIRAL HOOK BẮT BUỘC) ===
Mô tả tiếng Việt: Chiếc thùng carton nâu kraft đóng kín dán băng keo trên bàn gỗ sồi Bắc Âu, đôi tay nhẹ nhàng mở bung nắp thùng hé lộ hàng chục gói mì Indomie xếp khít khao dưới ánh nắng xiên rèm cửa.
Prompt cho ChatGPT / DALL-E 3: A single standalone, individual commercial product photograph (NOT a collage, NOT a split screen, NOT a multi-panel grid). A single coherent shot showing clean hands actively unfolding the top flaps of a closed tape-sealed brown kraft corrugated delivery carton box to reveal dozens of Indomie Mi Goreng instant noodle packs neatly and tightly arranged inside. The box rests on a Scandinavian warm light-oak wooden table. Warm golden hour sunlight streaming through venetian blinds creates soft striped shadows on the wooden surface. A lush green potted pothos houseplant and an aesthetic art book sit in the soft-focus background. Commercial product photography, 8k resolution, crisp textures, natural ambient depth of field.

=== CẢNH 2: BÓC GÓI MÌ VÀ CHẮT RÁO SỢI MÌ VÀNG GIÒN ===
Mô tả tiếng Việt: Đôi tay nhẹ nhàng xé vỏ bao bì gói mì, vắt mì đã được chần chín tới với từng sợi mì vàng óng, dai mướt vừa được chắt ráo nước trong rây inox đặt vào chiếc tô sứ màu kem viền vỏ sò.
Prompt cho ChatGPT / DALL-E 3: A single standalone, individual commercial product photograph (NOT a collage, NOT a split screen, NOT a multi-panel grid). A single coherent shot showing freshly parboiled, perfectly drained al-dente wavy golden noodles resting inside an elegant scallop-rimmed cream-white ceramic bowl on a warm light-oak wooden table. Delicately rising swirls of steam catch warm morning daylight. Macro food photography, shallow depth of field, sharp focus on the glistening texture of curly noodle strands.

=== CẢNH 3: RƯỚI XỐT TƯƠNG ĐEN KECAP MANIS & DẦU HÀNH BÓNG BẨY ===
Mô tả tiếng Việt: Dòng xốt tương đen kecap manis sánh kẹo và dầu hành ớt đỏ rực được rưới theo đường ziczac óng ả lên sợi mì, đũa gỗ nâng sợi mì đảo đều tạo màu nâu cánh gián mê hoặc.
Prompt cho ChatGPT / DALL-E 3: A single standalone, individual commercial product photograph (NOT a collage, NOT a split screen, NOT a multi-panel grid). A single coherent shot showing glossy dark sweet soy sauce (kecap manis) and golden shallot oil drizzling generously over noodles, while wooden chopsticks lift a bundle of glistening, savory glazed curly noodles, capturing rich specular highlights and saucy texture. Warm morning side light, ultra-sharp macro detail.

=== CẢNH 4: CHỌC VỠ LÒNG ĐỎ TRỨNG LÒNG ĐÀO SÓNG SÁNH ===
Mô tả tiếng Việt: Quả trứng chần lòng đào mềm mượt đặt giữa tô mì, đầu đũa chạm nhẹ làm lòng đỏ trứng vàng óng sóng sánh vỡ òa, chảy tràn quyện vào từng sợi mì đậm đà sốt.
Prompt cho ChatGPT / DALL-E 3: A single standalone, individual commercial product photograph (NOT a collage, NOT a split screen, NOT a multi-panel grid). A single coherent shot showing wooden chopsticks gently puncturing a pristine poached egg on top of savory glazed noodles, releasing a thick, glowing warm runny yellow yolk that drapes luxuriously over the noodles. Extreme macro food photography, appetizing creaminess, warm morning studio lighting.

=== CẢNH 5: THÀNH PHẨM TÔ MÌ TRỘN HOÀN HẢO NẮNG MAI (HERO SHOT) ===
Mô tả tiếng Việt: Tô mì trộn Indomie hoàn thiện tuyệt mỹ với lòng đào óng ánh, 5 viên thịt rim bóng bẩy, rắc hành lá xanh mát và ớt lát, bốc khói nhẹ trên bàn gỗ ngập tràn nắng mai.
Prompt cho ChatGPT / DALL-E 3: A single standalone, individual commercial hero glamour photograph (NOT a collage, NOT a split screen, NOT a multi-panel grid). A single complete hero shot of the finished Indomie Mi Goreng noodles in a beautiful scallop-rimmed ceramic bowl, topped with a glistening runny poached yolk at the center, surrounded by five glazed savory meatballs, fresh green scallions, and red chili slices. Gentle steam rises into the warm Scandinavian morning light. Cozy wooden dining ambiance with blurred green plant bokeh in background. 8k, photorealistic perfection.`,
      scenes: [
        {
          scene_number: 1,
          badge: "MANDATORY HOOK",
          title_vi: "Cảnh 1: The Unboxing Hook (Tay Mở Thùng Carton Hé Lộ Sản Phẩm)",
          description_vi: "Chiếc thùng carton nâu kraft đóng kín dán băng keo trên bàn gỗ sồi Bắc Âu, đôi tay nhẹ nhàng mở bung nắp thùng hé lộ hàng chục gói mì Indomie xếp khít khao dưới ánh nắng xiên rèm cửa.",
          camera_angle: "Góc nghiêng 45 độ, cận cảnh trung bình (Medium Close-Up 35mm)",
          lighting: "Ánh nắng vàng ấm áp rọi xiên qua rèm lá sách (Venetian Blinds), bóng đổ sọc mềm mại",
          image_prompt_gpt: "A single standalone, individual commercial product photograph (NOT a collage, NOT a split screen, NOT a multi-panel grid). A single coherent shot showing clean hands actively unfolding the top flaps of a closed tape-sealed brown kraft corrugated delivery carton box to reveal dozens of Indomie Mi Goreng instant noodle packs neatly and tightly arranged inside. The box rests on a Scandinavian warm light-oak wooden table. Warm golden hour sunlight streaming through venetian blinds creates soft striped shadows on the wooden surface. Commercial product photography, 8k resolution, crisp textures.",
          image_prompt_gemini: "Hyper-realistic commercial product photography of clean hands actively opening the top flaps of a closed kraft cardboard delivery box to reveal dozens of Indomie Mi Goreng noodles neatly stacked inside, resting on a Scandinavian wooden desk, warm golden hour sunlight streaming through venetian blinds with soft shadows, 8k resolution, natural depth of field.",
          image_prompt_muse: "Award-winning commercial product showcase, Octane render 8k of clean hands opening a closed sealed kraft cardboard box, dramatically revealing tightly packed colorful Indomie noodle packets on a warm Scandinavian light oak desk, cinematic directional sunlight, ray-traced reflections.",
          image_prompt_midjourney: "Commercial product photography, clean hands pulling open the flaps of a closed kraft cardboard delivery carton to reveal packed Indomie Mi Goreng ramen packets on Scandinavian wooden table, golden sunlight through venetian blinds, 85mm f/1.4 lens --ar 9:16 --v 6.1 --style raw",
          negative_prompt: "open box without hands, collage, grid, multi-panel, split screen, frame, storyboard, comic, distorted text, ugly hands, low resolution"
        },
        {
          scene_number: 2,
          badge: "RECIPE PREPARATION",
          title_vi: "Cảnh 2: Chắt Ráo Sợi Mì Vàng Óng Vào Tô Sứ",
          description_vi: "Đôi tay nhẹ nhàng xé vỏ bao bì gói mì, vắt mì đã được chần chín tới với từng sợi mì vàng óng, dai mướt vừa được chắt ráo nước trong rây inox đặt vào chiếc tô sứ màu kem viền vỏ sò.",
          camera_angle: "Cận cảnh bàn tay (Hand Close-Up 50mm)",
          lighting: "Ánh sáng studio ấm áp làm nổi bật độ bóng mướt của sợi mì",
          image_prompt_gpt: "A single standalone, individual commercial product photograph (NOT a collage, NOT a split screen, NOT a multi-panel grid). A single coherent shot showing freshly parboiled, perfectly drained al-dente wavy golden noodles resting inside an elegant scallop-rimmed cream-white ceramic bowl on a warm light-oak wooden table. Delicately rising swirls of steam catch warm morning daylight. Macro food photography, shallow depth of field, sharp focus on the glistening texture of curly noodle strands.",
          image_prompt_gemini: "Photorealistic macro commercial photography of freshly drained wavy instant noodles resting inside a cream-white scallop ceramic bowl on light oak wood table, soft steam, bright morning daylight.",
          image_prompt_muse: "Commercial food styling photograph, glistening parboiled ramen noodles inside a delicate ceramic bowl, Scandinavian aesthetic, 8k, Octane render.",
          image_prompt_midjourney: "Macro commercial food photography, freshly drained golden noodles placed in ceramic bowl, delicate steam rising, Scandinavian wooden surface, soft warm directional lighting --ar 9:16 --v 6.1 --style raw",
          negative_prompt: "collage, grid, multi-panel, split screen, raw dry brick, deformed fingers, blurry"
        },
        {
          scene_number: 3,
          badge: "SENSORY SAUCE DRIZZLE",
          title_vi: "Cảnh 3: Rưới Xốt Tương Đen & Đảo Trộn Mì Óng Ả",
          description_vi: "Dòng xốt tương đen kecap manis sánh kẹo và dầu hành ớt đỏ rực được rưới theo đường ziczac óng ả lên sợi mì, đũa gỗ nâng sợi mì đảo đều tạo màu nâu cánh gián mê hoặc.",
          camera_angle: "Góc 60 độ cận cảnh hành động (Action Macro Shot)",
          lighting: "Ánh sáng tôn vinh độ bóng mịn (Specular Highlights) của xốt tương",
          image_prompt_gpt: "A single standalone, individual commercial product photograph (NOT a collage, NOT a split screen, NOT a multi-panel grid). A single coherent shot showing glossy dark sweet soy sauce (kecap manis) and golden shallot oil drizzling generously over noodles, while wooden chopsticks lift a bundle of glistening, savory glazed curly noodles, capturing rich specular highlights and saucy texture. Warm morning side light, ultra-sharp macro detail.",
          image_prompt_gemini: "Hyper-realistic commercial food photography of thick sweet dark soy sauce drizzling onto ramen noodles, wooden chopsticks lifting saucy noodles with appetizing glossy highlights.",
          image_prompt_muse: "Sensory culinary action shot, dark thick soy sauce dripping over glistening noodles, warm directional sunbeams, appetizing glossy sheen, 8k resolution.",
          image_prompt_midjourney: "Commercial food photography, thick dark sweet soy sauce drizzling over golden noodles, chopsticks lifting glistening strands, warm golden hour reflections --ar 9:16 --v 6.1 --style raw",
          negative_prompt: "collage, grid, multi-panel, split screen, dull colors, plastic texture"
        },
        {
          scene_number: 4,
          badge: "SENSORY ASMR PAYOFF",
          title_vi: "Cảnh 4: Chọc Vỡ Lòng Đỏ Trứng Chần Tan Chảy",
          description_vi: "Quả trứng chần lòng đào mềm mượt đặt giữa tô mì, đầu đũa chạm nhẹ làm lòng đỏ trứng vàng óng sóng sánh vỡ òa, chảy tràn quyện vào từng sợi mì đậm đà sốt.",
          camera_angle: "Cực cận cảnh (Extreme Macro 100mm)",
          lighting: "Ánh sáng ngược rọi qua lòng đỏ trứng tạo hiệu ứng phát sáng ấm áp",
          image_prompt_gpt: "A single standalone, individual commercial product photograph (NOT a collage, NOT a split screen, NOT a multi-panel grid). A single coherent shot showing wooden chopsticks gently puncturing a pristine poached egg on top of savory glazed noodles, releasing a thick, glowing warm runny yellow yolk that drapes luxuriously over the noodles. Extreme macro food photography, appetizing creaminess, warm morning studio lighting.",
          image_prompt_gemini: "Photorealistic macro photography of runny egg yolk bursting and draping over glazed noodles, vibrant golden yolk, ultra-appetizing food commercial.",
          image_prompt_muse: "Commercial culinary macro shot, luscious golden poached egg yolk bursting open over saucy noodles, mouthwatering texture, Octane 8k render.",
          image_prompt_midjourney: "Extreme macro food commercial, chopsticks puncturing runny poached egg yolk flowing onto savory noodles, golden delicious glow, 100mm macro --ar 9:16 --v 6.1 --style raw",
          negative_prompt: "collage, grid, multi-panel, split screen, hard boiled egg, artificial yolk"
        },
        {
          scene_number: 5,
          badge: "HERO SHOT",
          title_vi: "Cảnh 5: The Grand Hero Shot (Tô Mì Trộn Đỉnh Cao Hoàn Hảo)",
          description_vi: "Tô mì trộn Indomie hoàn thiện tuyệt mỹ với lòng đào óng ánh, 5 viên thịt rim bóng bẩy, rắc hành lá xanh mát và ớt lát, bốc khói nhẹ trên bàn gỗ ngập tràn nắng mai.",
          camera_angle: "Góc quay tĩnh tuyệt đẹp (Hero Glamour Shot)",
          lighting: "Ánh nắng vàng sớm rọi xiên, hậu cảnh xóa phông mềm mại (Bokeh mịn màng)",
          image_prompt_gpt: "A single standalone, individual commercial hero glamour photograph (NOT a collage, NOT a split screen, NOT a multi-panel grid). A single complete hero shot of the finished Indomie Mi Goreng noodles in a beautiful scallop-rimmed ceramic bowl, topped with a glistening runny poached yolk at the center, surrounded by five glazed savory meatballs, fresh green scallions, and red chili slices. Gentle steam rises into the warm Scandinavian morning light. Cozy wooden dining ambiance with blurred green plant bokeh in background. 8k, photorealistic perfection.",
          image_prompt_gemini: "Hyper-realistic commercial food hero photography of a gourmet bowl of dry-mix Indomie noodles with runny yolk and savory glazed meatballs, sunlit Scandinavian wooden desk, 8k resolution.",
          image_prompt_muse: "Magazine cover commercial food hero shot, steaming bowl of dry-mix noodles with runny egg yolk, meatballs, Scandi lifestyle table setting, 8k resolution, photorealistic Octane render.",
          image_prompt_midjourney: "Commercial hero food photography, delicious plate of Indomie noodles with runny sunny egg and savory meatballs, soft morning sunbeams, shallow depth of field, 85mm lens --ar 9:16 --v 6.1 --style raw",
          negative_prompt: "collage, grid, multi-panel, split screen, fake looking food, dirty bowl"
        }
      ],
      video_prompt: {
        duration_seconds: 15,
        aspect_ratio: "9:16",
        camera_direction: "Nhịp điệu dứt khoát 2-3s mỗi shot, zoom macro mượt mà kết thúc bằng Hero shot tĩnh tuyệt đẹp",
        sound_design_asmr: "Tiếng bóc băng keo rẹt rẹt và mở nắp thùng carton giấy, tiếng xé bao bì, tiếng chắt nước sôi róc rách, tiếng đũa đảo xốt xì xụp và tiếng chọc vỡ lòng đào êm ái",
        video_prompt_veo3: "Cinematic commercial video 4K 60fps, [00:00 - 00:03] Slow-motion dolly zoom onto a closed, sealed kraft corrugated delivery carton box on a sunlit Scandinavian wooden desk, as clean hands smoothly peel open the top flaps to dramatically reveal dozens of Indomie Mi Goreng noodle packets packed inside. [00:03 - 00:07] Clean hands place steaming drained noodles into scallop bowl, followed by sweet dark kecap manis sauce drizzling generously. [00:07 - 00:11] Extreme macro of chopsticks puncturing a delicate poached egg, releasing glowing runny yolk over glistening noodles. [00:11 - 00:15] Glamorous static hero shot of steaming noodle bowl topped with runny yolk and glazed meatballs, warm sunlight streaming through venetian blinds.",
        video_prompt_grok: "High-energy commercial video ad, rapid dynamic tracking shots. Dynamic snap-zoom onto a closed sealed kraft delivery carton on wood table as hands rapidly pull open the flaps to reveal packed Indomie noodles. Fast-cut action of saucing drained noodles, chopsticks puncturing glowing runny egg yolk, concluding with high-impact hero beauty shot of noodles with meatballs in golden morning sun.",
        video_prompt_muse: "Ultra-smooth commercial video, fluid 60fps transitions. Macro unboxing starting on a closed sealed kraft carton on light oak desk, clean hands smoothly opening the flaps to reveal abundance of Indomie noodle packets, aesthetic soft pastel morning sunlight, mouthwatering saucing and runny yolk puncture ASMR, ending on hero plate with runny yolk.",
        video_prompt_sedan: "One coherent vertical commercial with a continuous, controlled dolly-and-orbit path across a Scandinavian warm light-oak wooden table. Start on a closed, sealed kraft delivery carton box, where clean hands smoothly pull open the top flaps to dramatically reveal identical packed Indomie noodle pouches; travel to one opened pouch, follow the drained noodles into the ceramic bowl, follow the drizzling sweet soy glaze, arc past chopsticks releasing runny egg yolk, and finish in an orbit around the steaming hero bowl and pouch. Keep green pothos softly blurred, sunlight stripes consistent, shadows stable, micro-motion realistic.",
        master_ai_video_prompt: "A cinematic 15-second commercial video starting on a closed kraft cardboard carton on a sunlit wooden desk where clean hands open the top flaps to dramatically reveal dozens of Indomie noodle packs. Smooth dynamic transitions show drained curly noodles, drizzling dark sweet soy sauce, chopsticks bursting a runny egg yolk, and ends on a glorious hero shot of glossy noodles with savory meatballs in warm Scandinavian morning light.",
        timeline: [
          { time_range: "00:00 - 00:03", shot_name: "Shot 1: The Delivery Carton Hook", action: "Bắt đầu với thùng carton đóng kín dán băng keo trên bàn gỗ sồi, đôi tay nhẹ nhàng mở nắp thùng hé lộ đầy ắp các gói mì Indomie xếp ngay ngắn dưới nắng mai.", camera_motion: "Dolly push-in chậm vào thùng carton khi bàn tay mở nắp", audio_cue: "Tiếng rẹt rẹt bóc băng keo và mở nắp thùng carton ASMR cực đã tai" },
          { time_range: "00:03 - 00:06", shot_name: "Shot 2: Drained Noodles Plating", action: "Sợi mì đã chần chín tới được chắt ráo nước trong rây inox đặt vào chiếc tô sứ viền sò xinh xắn.", camera_motion: "Cận cảnh bàn tay chuyển động dứt khoát", audio_cue: "Tiếng róc rách chắt nước và hơi nước bốc lên" },
          { time_range: "00:06 - 00:09", shot_name: "Shot 3: Sweet Soy Glaze Drizzle", action: "Rưới dòng xốt tương đen kecap manis sánh kẹo và dầu hành lên sợi mì tơi mướt.", camera_motion: "Macro góc 60 độ dõi theo dòng xốt", audio_cue: "Tiếng giọt xốt đặc rơi tí tách và đũa đảo mì xì xụp" },
          { time_range: "00:09 - 00:12", shot_name: "Shot 4: Runny Yolk Puncture", action: "Chọc vỡ lòng đỏ trứng lòng đào sóng sánh, lòng đỏ chảy tràn quyện lấy sợi mì.", camera_motion: "Extreme macro cận cảnh chọc trứng", audio_cue: "Tiếng vỡ òa êm dịu cực kích thích giác quan" },
          { time_range: "00:12 - 00:15", shot_name: "Shot 5: The Grand Hero Shot", action: "Tô mì hoàn thiện với trứng lòng đào tan chảy và 5 viên thịt rim thơm lừng.", camera_motion: "Góc quay tĩnh nghệ thuật, khói bốc nhẹ", audio_cue: "Âm thanh kết thúc êm dịu thỏa mãn" }
        ]
      }
    },
    {
      video_id: 2,
      title_vi: "Kịch Bản 2: Mì Xào Hải Sản Lửa Lớn Wok-Hei Chảo Nóng (Bàn Inox Quán Ăn Đêm)",
      concept_vibe: "High-Heat Fiery Seafood Stir-Fry & Roaring Wok-Hei Street Energy",
      background_applied: {
        theme_name: "Quán Ăn Đường Phố Sôi Động (Vibrant Street Market)",
        surface_material: "Mặt bàn kim loại inox sáng loáng (Gleaming Stainless Steel Street Food Table)",
        environment_setting: "Không gian phố ẩm thực đêm náo nhiệt, rổ gia vị tươi ớt hiểm và rau thơm, chảo xào bốc khói wok hei",
        lighting_style: "Ánh đèn lồng và biển hiệu neon đỏ - vàng phản chiếu rực rỡ (Vibrant Red & Golden Neon Reflections)"
      },
      master_image_prompt_gpt: `[DIRECTIVE FOR CHATGPT / DALL-E 3: You are generating commercial hero photographs for an advertising campaign.
CRITICAL RULE: Each scene below MUST be generated as ONE SINGLE STANDALONE, INDIVIDUAL FULL-FRAME PHOTOGRAPH (9:16 vertical).
Strictly prohibited: Absolutely NO collages, NO multi-panel grids, NO comic strips, NO split screens, NO before/after split frames, NO storyboard panels. Every generation must be an independent single-frame photograph.
VIDEO THEME: Quán Ăn Đường Phố Sôi Động (Gleaming Stainless Steel Street Food Table)
LIGHTING: Vibrant red and amber neon lanterns and glowing street food market reflections]

=== CẢNH 1: TAY MỞ THÙNG CARTON TRÊN BÀN INOX PHỐ ĐÊM (VIRAL HOOK BẮT BUỘC) ===
Mô tả tiếng Việt: Chiếc thùng carton kraft đóng kín dán băng dính trên mặt bàn kim loại inox sáng bóng của quán ăn đường phố đêm, đôi tay nhanh nhẹn mở bung nắp thùng hé lộ bên trong ngập tràn các gói mì Indomie, phản chiếu ánh đèn lồng đỏ rực và bảng hiệu neon vàng ấm.
Prompt cho ChatGPT / DALL-E 3: A single standalone, individual commercial product photograph (NOT a collage, NOT a split screen, NOT a multi-panel grid). A single coherent shot showing energetic hands actively unfolding the top flaps of a closed tape-sealed brown kraft corrugated delivery carton box to reveal dozens of vibrant Indomie Mi Goreng instant noodle packs tightly packed inside. The box rests on a gleaming stainless steel street food counter. The reflective stainless steel table captures dazzling reflections of red and golden neon signs and glowing lanterns. In the blurred background, an energetic night market street with colorful food stalls and ambient steam haze. Commercial street food photography, 8k resolution, crisp textures.

=== CẢNH 2: ÁP CHẢO TÔM MỰC TƯƠI LỬA WOK-HEI BÙNG CHÁY ===
Mô tả tiếng Việt: Tôm sú đỏ au bóc nõn và mực tươi khứa vảy rồng xèo xèo trong chảo wok bốc lửa ngùn ngụt (wok-hei), ngọn lửa cam rực bùng cháy liếm quanh mép chảo trên bếp gas công nghiệp.
Prompt cho ChatGPT / DALL-E 3: A single standalone, individual commercial product photograph (NOT a collage, NOT a split screen, NOT a multi-panel grid). A single coherent shot of large fresh tiger prawns and scored calamari rings searing vigorously inside a seasoned black carbon-steel wok. A dramatic burst of orange wok-hei flame leaps into the air around the edge of the wok, casting vivid firelight on sizzling seafood and glistening droplets of oil. Commercial action food photography, high shutter speed freezing flames and flying oil sparks.

=== CẢNH 3: THẢ MÌ VÀO CHẢO LỬA & XÓC CHẢO ĐIỆU NGHỆ ===
Mô tả tiếng Việt: Đôi tay đầu bếp thả sợi mì tơi vàng óng vào chảo wok cùng gia vị cay Indomie, tay lắc chảo nhịp nhàng hất mì và hải sản tung lên không trung giữa làn khói wok-hei nghi ngút.
Prompt cho ChatGPT / DALL-E 3: A single standalone, individual commercial product photograph (NOT a collage, NOT a split screen, NOT a multi-panel grid). A single coherent shot capturing dynamic wok-tossing action: golden bouncy noodles, bright red chili flakes, and sizzling succulent prawns airborne above the hot wok. Billowing plumes of fragrant wok-hei smoke and steam fill the frame, illuminated by warm street market lights and glowing neon signs. Dynamic motion blur in background with razor-sharp focus on the airborne noodles.

=== CẢNH 4: CẬN CẢNH SỢI MÌ XÀO ÓNG ÁNH BÁM CHẶT HẢI SẢN ===
Mô tả tiếng Việt: Cực cận cảnh từng sợi mì xào vàng nâu bóng bẩy ngấm đều gia vị xì dầu thơm lừng, cuốn quanh thân tôm sú đỏ au săn chắc và tỏi phi giòn rụm, ánh đèn neon phản chiếu lấp lánh.
Prompt cho ChatGPT / DALL-E 3: A single standalone, individual commercial product photograph (NOT a collage, NOT a split screen, NOT a multi-panel grid). A single coherent shot showing an extreme macro view of glossy stir-fried Indomie noodles wrapped tightly around a succulent grilled prawn. Rich caramelized sauce coats every curl of the noodles, speckled with toasted crispy garlic chips and sliced red chilies. Glistening specular neon highlights shine brightly on the food.

=== CẢNH 5: THÀNH PHẨM ĐĨA MÌ XÀO HẢI SẢN WOK-HEI BỐC KHÓI (HERO SHOT) ===
Mô tả tiếng Việt: Đĩa mì xào hải sản lửa lớn hoàn hảo trên khay inox phản chiếu ánh neon phố đêm, tôm sú đỏ au xếp quanh, mực nướng xém cạnh, rắc hành phi và ớt hiểm, bốc khói ngùn ngụt ngập tràn năng lượng đường phố.
Prompt cho ChatGPT / DALL-E 3: A single standalone, individual commercial hero glamour photograph (NOT a collage, NOT a split screen, NOT a multi-panel grid). A single complete hero shot of mouthwatering wok-hei seafood Indomie Mi Goreng served on an authentic stainless steel plate on the reflective street counter. Generously topped with plump charred tiger prawns, caramelized squid, crispy fried shallots, fresh scallions, and sliced bird's eye chilies. In the background, vibrant bokeh circles of red, yellow, and cyan neon street signs sparkle softly in the night air. 8k, ultra photorealistic.`,
      scenes: [
        {
          scene_number: 1,
          badge: "MANDATORY HOOK",
          title_vi: "Cảnh 1: Street Food Hook (Tay Mở Thùng Carton Trên Bàn Inox Chợ Đêm)",
          description_vi: "Chiếc thùng carton kraft đóng kín dán băng dính trên mặt bàn kim loại inox sáng bóng của quán ăn đường phố đêm, đôi tay nhanh nhẹn mở bung nắp thùng hé lộ bên trong ngập tràn các gói mì Indomie, phản chiếu ánh đèn lồng đỏ rực và bảng hiệu neon vàng ấm.",
          camera_angle: "Góc nghiêng 45 độ cận trung (Medium Close-Up 35mm)",
          lighting: "Ánh đèn neon đỏ - vàng phản chiếu lấp lánh trên bề mặt kim loại inox",
          image_prompt_gpt: "A single standalone, individual commercial product photograph (NOT a collage, NOT a split screen, NOT a multi-panel grid). A single coherent shot showing energetic hands actively unfolding the top flaps of a closed tape-sealed brown kraft corrugated delivery carton box to reveal dozens of vibrant Indomie Mi Goreng instant noodle packs tightly packed inside. The box rests on a gleaming stainless steel street food counter. The reflective stainless steel table captures dazzling reflections of red and golden neon signs and glowing lanterns. In the blurred background, an energetic night market street with colorful food stalls and ambient steam haze. Commercial street food photography, 8k resolution, crisp textures.",
          image_prompt_gemini: "Hyper-realistic commercial street food photography of clean hands actively opening the flaps of a closed brown kraft delivery box on a stainless steel counter to reveal Indomie ramen packets inside, vibrant neon reflections, night market atmosphere.",
          image_prompt_muse: "Commercial product photography, hands opening a closed sealed kraft cardboard delivery box packed with colorful instant ramen packets on reflective stainless steel table, night market neon lighting, 8k Octane render.",
          image_prompt_midjourney: "Commercial street food photography, hands unfolding flaps of a closed brown kraft carton on shiny stainless steel food counter to reveal Indomie noodle packets, glowing red and yellow neon lights reflections, night market bokeh --ar 9:16 --v 6.1 --style raw",
          negative_prompt: "open box without hands, collage, grid, multi-panel, split screen, low resolution, dirty artifacts"
        },
        {
          scene_number: 2,
          badge: "SEAFOOD SEARING ACTION",
          title_vi: "Cảnh 2: Áp Chảo Tôm Mực Tươi Lửa Wok-Hei Bùng Cháy",
          description_vi: "Tôm sú đỏ au bóc nõn và mực tươi khứa vảy rồng xèo xèo trong chảo wok bốc lửa ngùn ngụt (wok-hei), ngọn lửa cam rực bùng cháy liếm quanh mép chảo trên bếp gas công nghiệp.",
          camera_angle: "Góc nghiêng 30 độ bắt ngọn lửa (Flambé Action Shot)",
          lighting: "Ánh lửa bùng cháy rực rỡ từ chảo wok tạo tương phản kịch tính trên nền phố đêm",
          image_prompt_gpt: "A single standalone, individual commercial product photograph (NOT a collage, NOT a split screen, NOT a multi-panel grid). A single coherent shot of large fresh tiger prawns and scored calamari rings searing vigorously inside a seasoned black carbon-steel wok. A dramatic burst of orange wok-hei flame leaps into the air around the edge of the wok, casting vivid firelight on sizzling seafood and glistening droplets of oil. Commercial action food photography, high shutter speed freezing flames and flying oil sparks.",
          image_prompt_gemini: "Hyper-realistic commercial action shot of tiger prawns and squid searing in roaring wok flames, high shutter speed freezing fire and flying oil droplets, night street food vibe.",
          image_prompt_muse: "Dramatic street food culinary action, seafood searing in blazing wok flame, wok-hei steam, high contrast glowing embers and neon reflections, 8k resolution.",
          image_prompt_midjourney: "Commercial food action shot, jumbo shrimp and squid searing in fiery roaring wok flame, flying sparks, sizzling oil, night market neon background --ar 9:16 --v 6.1 --style raw",
          negative_prompt: "collage, grid, multi-panel, split screen, burnt food, blurry fire"
        },
        {
          scene_number: 3,
          badge: "WOK TOSS ASMR",
          title_vi: "Cảnh 3: Thả Mì Vào Chảo Lửa & Xóc Chảo Điệu Nghệ",
          description_vi: "Đôi tay đầu bếp thả sợi mì tơi vàng óng vào chảo wok cùng gia vị cay Indomie, tay lắc chảo nhịp nhàng hất mì và hải sản tung lên không trung giữa làn khói wok-hei nghi ngút.",
          camera_angle: "Góc ngang bắt chuyển động mì tung lên không trung (Airborne Wok Toss)",
          lighting: "Ánh sáng neon và khói wok-hei tạo vệt sáng chuyển động đầy mê hoặc",
          image_prompt_gpt: "A single standalone, individual commercial product photograph (NOT a collage, NOT a split screen, NOT a multi-panel grid). A single coherent shot capturing dynamic wok-tossing action: golden bouncy noodles, bright red chili flakes, and sizzling succulent prawns airborne above the hot wok. Billowing plumes of fragrant wok-hei smoke and steam fill the frame, illuminated by warm street market lights and glowing neon signs. Dynamic motion blur in background with razor-sharp focus on the airborne noodles.",
          image_prompt_gemini: "Photorealistic action photography of noodles and prawns tossed high in the air above a smoking wok, backlit aromatic steam, vibrant street market neon glow.",
          image_prompt_muse: "Sensory street culinary action shot, chef tossing savory noodles and prawns mid-air over hot wok, billowing steam plumes, Octane 8k render.",
          image_prompt_midjourney: "Commercial food action shot, airborne wok toss of noodles and juicy prawns, backlit steam, vibrant neon street signs bokeh, high shutter speed --ar 9:16 --v 6.1 --style raw",
          negative_prompt: "collage, grid, multi-panel, split screen, messy spill, distorted noodles"
        },
        {
          scene_number: 4,
          badge: "MACRO GLOSS",
          title_vi: "Cảnh 4: Cận Cảnh Sợi Mì Xào Óng Ánh Bám Chặt Hải Sản",
          description_vi: "Cực cận cảnh từng sợi mì xào vàng nâu bóng bẩy ngấm đều gia vị xì dầu thơm lừng, cuốn quanh thân tôm sú đỏ au săn chắc và tỏi phi giòn rụm, ánh đèn neon phản chiếu lấp lánh.",
          camera_angle: "Cực cận cảnh (Extreme Macro 100mm)",
          lighting: "Ánh sáng neon phản chiếu trên từng sợi mì óng ả và vỏ tôm đỏ rực",
          image_prompt_gpt: "A single standalone, individual commercial product photograph (NOT a collage, NOT a split screen, NOT a multi-panel grid). A single coherent shot showing an extreme macro view of glossy stir-fried Indomie noodles wrapped tightly around a succulent grilled prawn. Rich caramelized sauce coats every curl of the noodles, speckled with toasted crispy garlic chips and sliced red chilies. Glistening specular neon highlights shine brightly on the food.",
          image_prompt_gemini: "Macro commercial food photography of glossy stir-fried noodles curling around a grilled red prawn, crispy shallots, appetizing glistening sauce sheen, neon reflections.",
          image_prompt_muse: "Gourmet street food macro shot, succulent shrimp nestled in caramelized glossy noodles, crispy shallots, specular neon highlights, Octane 8k.",
          image_prompt_midjourney: "Extreme macro food commercial, noodles curled around charred prawn, rich glistening glaze, crispy garlic flakes, glowing neon reflections --ar 9:16 --v 6.1 --style raw",
          negative_prompt: "collage, grid, multi-panel, split screen, dull colors, plastic texture"
        },
        {
          scene_number: 5,
          badge: "HERO SHOT",
          title_vi: "Cảnh 5: Thành Phẩm Đĩa Mì Xào Hải Sản Wok-Hei Bốc Khói (Hero Shot)",
          description_vi: "Đĩa mì xào hải sản lửa lớn hoàn hảo trên khay inox phản chiếu ánh neon phố đêm, tôm sú đỏ au xếp quanh, mực nướng xém cạnh, rắc hành phi và ớt hiểm, bốc khói ngùn ngụt ngập tràn năng lượng đường phố.",
          camera_angle: "Góc quay tĩnh tuyệt đẹp (Hero Glamour Shot)",
          lighting: "Ánh đèn neon lung linh tạo hiệu ứng bokeh tròn xoe rực rỡ ở hậu cảnh",
          image_prompt_gpt: "A single standalone, individual commercial hero glamour photograph (NOT a collage, NOT a split screen, NOT a multi-panel grid). A single complete hero shot of mouthwatering wok-hei seafood Indomie Mi Goreng served on an authentic stainless steel plate on the reflective street counter. Generously topped with plump charred tiger prawns, caramelized squid, crispy fried shallots, fresh scallions, and sliced bird's eye chilies. In the background, vibrant bokeh circles of red, yellow, and cyan neon street signs sparkle softly in the night air. 8k, ultra photorealistic.",
          image_prompt_gemini: "Hyper-realistic commercial hero photography of street style seafood stir-fried noodles on stainless steel plate, charred prawns, calamari, crispy shallots, vibrant night market neon bokeh, 8k resolution.",
          image_prompt_muse: "Street food hero commercial shot, steaming plate of savory seafood wok-tossed noodles with plump prawns, stainless steel counter, vibrant neon city bokeh, Octane render 8k.",
          image_prompt_midjourney: "Commercial hero food photography, street-style seafood Indomie platter with charred prawns on reflective stainless steel counter, gorgeous vibrant neon bokeh background, 85mm f/1.4 lens --ar 9:16 --v 6.1 --style raw",
          negative_prompt: "collage, grid, multi-panel, split screen, low resolution, unappetizing"
        }
      ],
      video_prompt: {
        duration_seconds: 15,
        aspect_ratio: "9:16",
        camera_direction: "Nhịp điệu dồn dập, máy quay quét nhanh (whip pan), năng lượng đường phố bùng nổ",
        sound_design_asmr: "Tiếng bóc băng dính và mở nắp thùng carton dứt khoát, tiếng tôm mực xèo xèo trong chảo dầu sôi, tiếng lửa wok-hei bùng cháy phù phù và tiếng xóc chảo kim loại leng keng vang dội",
        video_prompt_veo3: "Cinematic commercial video 4K 60fps high energy, [00:00 - 00:03] Fast dynamic whip-pan zooming onto a closed, sealed kraft delivery carton on a reflective stainless steel street counter, as energetic hands quickly pull open the top flaps to dramatically reveal packed Indomie noodles under glowing red and amber neon reflections. [00:03 - 00:07] Fresh prawns and squid sear in a roaring fiery wok with leaping orange flames. [00:07 - 00:11] Chef tosses golden noodles and seafood high in the air through billowing fragrant wok-hei smoke. [00:11 - 00:15] Energetic static hero shot of mouthwatering wok-tossed seafood noodle platter on stainless steel tray, neon street market lights sparkling in background.",
        video_prompt_grok: "Ultra-fast dynamic commercial ad, night market street food vibe. High-energy snap zoom onto a closed sealed kraft carton on stainless steel counter as hands rapidly pull open the flaps to reveal packed Indomie noodles under neon lights. Fast-cut action of leaping wok flames, sizzling prawns, airborne noodle toss, ending on vibrant hero beauty shot with charred tiger prawns and crispy shallots.",
        video_prompt_muse: "Fluid 60fps street food commercial, vivid contrast. Unboxing sequence starting on a closed sealed kraft carton on stainless steel surface, hands rapidly unfolding flaps to reveal Indomie noodle packs under colorful neon reflections, sizzling sensory ASMR wok sear, mouthwatering airborne noodle toss, ending on tempting seafood hero plate.",
        video_prompt_sedan: "One coherent vertical commercial with a continuous, controlled dolly-and-orbit path across a gleaming stainless steel street food counter. Start on a closed, sealed kraft delivery carton box, where clean hands smoothly pull open the top flaps to dramatically reveal identical packed Indomie noodle pouches; travel to one opened pouch, follow the ingredients into a roaring wok with leaping orange wok-hei flames, follow the chef tossing noodles and succulent prawns airborne, and finish in an orbit around the steaming seafood platter and pouch. Keep neon lanterns softly blurred, metal reflections stable, fire physics realistic.",
        master_ai_video_prompt: "A high-energy 15-second street food commercial video starting on a closed kraft cardboard carton on a reflective stainless steel table under glowing neon lanterns, where energetic hands pull open the flaps to reveal packed Indomie noodle packs. Rapid dynamic transitions show roaring wok flames searing fresh prawns and calamari, tossing spicy noodles mid-air, and ends on a stunning street hero shot of wok-tossed seafood noodles with vibrant neon bokeh.",
        timeline: [
          { time_range: "00:00 - 00:03", shot_name: "Shot 1: Neon Stainless Steel Hook", action: "Thùng carton đóng kín dán băng dính trên bàn inox sáng bóng, đôi tay nhanh nhẹn mở nắp thùng hé lộ đầy ắp mì Indomie phản chiếu đèn neon phố đêm.", camera_motion: "Whip-pan nhanh lao thẳng vào thùng carton khi bàn tay mở nắp", audio_cue: "Tiếng bóc băng dính và mở nắp thùng carton ASMR năng động" },
          { time_range: "00:03 - 00:06", shot_name: "Shot 2: Seafood Wok-Hei Sear", action: "Tôm sú bóc nõn và mực khứa vảy rồng xèo xèo trong chảo wok bốc lửa ngùn ngụt.", camera_motion: "Cận cảnh góc nghiêng 30 độ bắt ngọn lửa bùng cháy", audio_cue: "Tiếng tôm mực xèo xèo và ngọn lửa bùng phù phù" },
          { time_range: "00:06 - 00:09", shot_name: "Shot 3: Dynamic Wok Toss", action: "Đầu bếp lắc chảo hất mì và hải sản tung lên không trung giữa làn khói thơm nức.", camera_motion: "Góc ngang bắt chuyển động tung chảo tốc độ cao", audio_cue: "Tiếng chảo kim loại leng keng và xóc mì xì xụp" },
          { time_range: "00:09 - 00:12", shot_name: "Shot 4: Macro Seafood Glaze", action: "Cực cận cảnh từng sợi mì xào bóng bẩy cuốn quanh thân tôm đỏ au và tỏi phi giòn rụm.", camera_motion: "Extreme macro cận cảnh sợi mì", audio_cue: "Tiếng giòn rụm của tỏi phi và hải sản săn chắc" },
          { time_range: "00:12 - 00:15", shot_name: "Shot 5: The Seafood Street Hero", action: "Đĩa mì xào hải sản lửa lớn bốc khói ngùn ngụt trên khay inox phản chiếu ánh neon phố đêm.", camera_motion: "Góc quay tĩnh nghệ thuật với neon bokeh", audio_cue: "Âm thanh sôi động đường phố thỏa mãn giác quan" }
        ]
      }
    },
    {
      video_id: 3,
      title_vi: "Kịch Bản 3: Nồi Lẩu Mì Kim Chi Phô Mai Lava Khò Lửa (Studio Terrazzo Tối Giản Hàn Quốc)",
      concept_vibe: "Korean Hotpot Comfort & Molten Cheese Lava Blowtorch ASMR",
      background_applied: {
        theme_name: "Studio Tối Giản Hàn Quốc / TikTok Aesthetic (Minimalist Terrazzo)",
        surface_material: "Bục đá mài Terrazzo màu kem be pastel (Matte Cream-Beige Terrazzo Pedestal)",
        environment_setting: "Studio tối giản thanh lịch, đĩa gốm sứ mộc mạc, bình hoa khô trang nhã phong cách vlog triệu view",
        lighting_style: "Ánh sáng ban ngày tản đều dịu mắt (Soft High-Key Diffused Studio Daylight), bóng đổ mềm mại"
      },
      master_image_prompt_gpt: `[DIRECTIVE FOR CHATGPT / DALL-E 3: You are generating commercial hero photographs for an advertising campaign.
CRITICAL RULE: Each scene below MUST be generated as ONE SINGLE STANDALONE, INDIVIDUAL FULL-FRAME PHOTOGRAPH (9:16 vertical).
Strictly prohibited: Absolutely NO collages, NO multi-panel grids, NO comic strips, NO split screens, NO before/after split frames, NO storyboard panels. Every generation must be an independent single-frame photograph.
VIDEO THEME: Studio Tối Giản Hàn Quốc / TikTok Aesthetic (Matte Cream-Beige Terrazzo Pedestal)
LIGHTING: Soft high-key diffused studio daylight with gentle organic shadows]

=== CẢNH 1: TAY MỞ THÙNG CARTON TRÊN BỤC TERRAZZO PASTEL (VIRAL HOOK BẮT BUỘC) ===
Mô tả tiếng Việt: Chiếc thùng carton kraft đóng kín dán băng keo trên bục đá mài Terrazzo màu kem be pastel, đôi tay thanh lịch mở tung nắp thùng hé lộ bên trong hàng chục gói mì Indomie xếp ngay ngắn dưới ánh sáng ban ngày dịu êm.
Prompt cho ChatGPT / DALL-E 3: A single standalone, individual commercial product photograph (NOT a collage, NOT a split screen, NOT a multi-panel grid). A single coherent shot showing elegant clean hands actively unfolding the top flaps of a closed tape-sealed brown kraft corrugated delivery carton box to reveal dozens of Indomie Mi Goreng noodle packs neatly arranged inside. The box rests on a chic matte cream-beige terrazzo pedestal. Soft diffused high-key daylight illuminates the clean scene. In the minimalist background, an organic ceramic vase with delicate dried floral branches in soft bokeh. Aesthetic Korean lifestyle commercial, 8k resolution.

=== CẢNH 2: NỒI ĐÁ KIM CHI SÔI SÙNG SỤC & THẢ MÌ VÀO NƯỚC DÙNG ===
Mô tả tiếng Việt: Chiếc nồi đá Hàn Quốc đen tuyền sôi ùng ục nước súp kim chi đỏ tươi, đôi tay bẻ đôi vắt mì Indomie thả vào làn nước súp sủi bọt ngập tràn xúc xích hun khói và nấm kim châm.
Prompt cho ChatGPT / DALL-E 3: A single standalone, individual commercial product photograph (NOT a collage, NOT a split screen, NOT a multi-panel grid). A single coherent shot showing hands snapping an instant noodle brick and placing it directly into a bubbling, simmering traditional black Korean stone pot (ttukbaegi) filled with rich crimson kimchi broth. Delicate enoki mushrooms and sliced cocktail sausages nestle around the noodles. Backlit steam rises delicately in soft studio morning daylight.

=== CẢNH 3: PHỦ ĐẦY LỚP PHÔ MAI MOZZARELLA SỢI TUYẾT TRẮNG ===
Mô tả tiếng Việt: Bàn tay rắc một lượng lớn phô mai Mozzarella bào sợi phủ ngập toàn bộ bề mặt mì và súp kim chi, lớp phô mai trắng mịn như tuyết bắt đầu mềm ra dưới hơi nóng bốc lên.
Prompt cho ChatGPT / DALL-E 3: A single standalone, individual commercial product photograph (NOT a collage, NOT a split screen, NOT a multi-panel grid). A single coherent shot showing an avalanche of pure white shredded mozzarella cheese generously cascading over the steaming noodles and spicy kimchi broth inside the stone pot. The cheese threads begin to melt and glisten softly from the steam. Macro food photography, clean high-key studio lighting.

=== CẢNH 4: ĐÈN KHÒ MINI THỔI LỬA NUNG CHẢY PHÔ MAI LAVA XÉM VÀNG ===
Mô tả tiếng Việt: Ngọn lửa xanh biếc từ đèn khò mini (blowtorch) khò trực tiếp lên phô mai, phô mai sủi bọt xèo xèo sôi ùng ục, tan chảy thành dòng dung nham lava và xém vàng nâu thơm ngậy mê đắm.
Prompt cho ChatGPT / DALL-E 3: A single standalone, individual commercial product photograph (NOT a collage, NOT a split screen, NOT a multi-panel grid). A single coherent shot of a sleek culinary blowtorch shooting a precise blue-and-orange flame directly onto the thick layer of mozzarella cheese inside the stone pot. The cheese bubbles vigorously, caramelizing into golden-brown toasted blisters and a rich molten lava texture. Sizzling cheese micro-bubbles caught in crisp detail.

=== CẢNH 5: KÉO SỢI PHÔ MAI LAVA DÀI BẤT TẬN (HERO SHOT) ===
Mô tả tiếng Việt: Đôi đũa gốm nhấc cụm mì kim chi lên cao kéo theo dải phô mai Mozzarella dai mịn óng ánh kéo dài bất tận, khói bốc nghi ngút, kích thích tột độ thị giác trên bục Terrazzo màu be.
Prompt cho ChatGPT / DALL-E 3: A single standalone, individual commercial hero glamour photograph (NOT a collage, NOT a split screen, NOT a multi-panel grid). A single complete hero shot showing minimalist ceramic chopsticks lifting a steaming bundle of spicy red noodles high above the black stone pot, creating an epic, unbroken stretch of molten, gooey mozzarella cheese pulling gracefully through the air. Plumes of delicate steam rise into the soft, bright Korean aesthetic studio daylight. Minimalist terrazzo pedestal surface, serene art book and vase in soft background bokeh. 8k, ultra-appetizing viral food shot.`,
      scenes: [
        {
          scene_number: 1,
          badge: "MANDATORY HOOK",
          title_vi: "Cảnh 1: Pastel Unboxing Hook (Tay Mở Thùng Carton Trên Bục Terrazzo)",
          description_vi: "Chiếc thùng carton kraft đóng kín dán băng keo trên bục đá mài Terrazzo màu kem be pastel, đôi tay thanh lịch mở tung nắp thùng hé lộ bên trong hàng chục gói mì Indomie xếp ngay ngắn dưới ánh sáng ban ngày dịu êm.",
          camera_angle: "Góc nghiêng 45 độ, cận trung (Medium Close-Up 35mm)",
          lighting: "Ánh sáng tự nhiên ban ngày tản đều dịu mắt (Soft High-Key Daylight)",
          image_prompt_gpt: "A single standalone, individual commercial product photograph (NOT a collage, NOT a split screen, NOT a multi-panel grid). A single coherent shot showing elegant clean hands actively unfolding the top flaps of a closed tape-sealed brown kraft corrugated delivery carton box to reveal dozens of Indomie Mi Goreng noodle packs neatly arranged inside. The box rests on a chic matte cream-beige terrazzo pedestal. Soft diffused high-key daylight illuminates the clean scene. In the minimalist background, an organic ceramic vase with delicate dried floral branches in soft bokeh. Aesthetic Korean lifestyle commercial, 8k resolution.",
          image_prompt_gemini: "Hyper-realistic commercial product photography of clean hands opening the flaps of a closed kraft delivery box on a matte terrazzo pedestal to reveal Indomie noodles, soft bright daylight, minimalist Korean aesthetic.",
          image_prompt_muse: "Commercial product showcase, clean hands opening a closed sealed kraft carton on cream terrazzo pedestal, soft daylight, aesthetic minimal studio, 8k Octane render.",
          image_prompt_midjourney: "Commercial product photography, hands unfolding flaps of a closed brown kraft carton on cream-beige terrazzo pedestal, packed Indomie noodles, soft high-key daylight, minimal aesthetic --ar 9:16 --v 6.1 --style raw",
          negative_prompt: "open box without hands, collage, grid, multi-panel, split screen, dark shadows, low resolution"
        },
        {
          scene_number: 2,
          badge: "KOREAN STONE POT PREP",
          title_vi: "Cảnh 2: Nồi Đá Kim Chi Sôi Sùng Sục & Thả Mì Vào Nước Dùng",
          description_vi: "Chiếc nồi đá Hàn Quốc đen tuyền sôi ùng ục nước súp kim chi đỏ tươi, đôi tay bẻ đôi vắt mì Indomie thả vào làn nước súp sủi bọt ngập tràn xúc xích hun khói và nấm kim châm.",
          camera_angle: "Cận cảnh bàn tay và nồi đá (Macro Action 50mm)",
          lighting: "Ánh sáng studio làm nổi bật màu đỏ rực của nước súp kim chi và hơi nước bốc lên",
          image_prompt_gpt: "A single standalone, individual commercial product photograph (NOT a collage, NOT a split screen, NOT a multi-panel grid). A single coherent shot showing hands snapping an instant noodle brick and placing it directly into a bubbling, simmering traditional black Korean stone pot (ttukbaegi) filled with rich crimson kimchi broth. Delicate enoki mushrooms and sliced cocktail sausages nestle around the noodles. Backlit steam rises delicately in soft studio morning daylight.",
          image_prompt_gemini: "Photorealistic macro photography of instant noodles placed into a bubbling red kimchi broth inside a Korean stone pot, sausage slices, enoki mushrooms, rising steam.",
          image_prompt_muse: "Commercial culinary food action shot, boiling spicy kimchi noodle stew in stone pot, bubbling broth, soft high-key daylight, 8k resolution.",
          image_prompt_midjourney: "Commercial food photography, hands dropping ramen noodles into bubbling red kimchi stone pot, steam rising, enoki mushrooms, soft natural light --ar 9:16 --v 6.1 --style raw",
          negative_prompt: "collage, grid, multi-panel, split screen, muddy soup, blurry action"
        },
        {
          scene_number: 3,
          badge: "CHEESE BLANKET ASMR",
          title_vi: "Cảnh 3: Phủ Đầy Lớp Phô Mai Mozzarella Sợi Tuyết Trắng",
          description_vi: "Bàn tay rắc một lượng lớn phô mai Mozzarella bào sợi phủ ngập toàn bộ bề mặt mì và súp kim chi, lớp phô mai trắng mịn như tuyết bắt đầu mềm ra dưới hơi nóng bốc lên.",
          camera_angle: "Góc 60 độ cận cảnh rắc phô mai (Macro Pour Shot)",
          lighting: "Ánh sáng tản đều làm nổi bật từng sợi phô mai trắng muốt và độ ẩm mượt",
          image_prompt_gpt: "A single standalone, individual commercial product photograph (NOT a collage, NOT a split screen, NOT a multi-panel grid). A single coherent shot showing an avalanche of pure white shredded mozzarella cheese generously cascading over the steaming noodles and spicy kimchi broth inside the stone pot. The cheese threads begin to melt and glisten softly from the steam. Macro food photography, clean high-key studio lighting.",
          image_prompt_gemini: "Hyper-realistic commercial macro photography of shredded mozzarella cheese raining down over steaming hot ramen noodles in stone pot, melting texture, crisp studio light.",
          image_prompt_muse: "Sensory food action shot, thick blanket of shredded mozzarella cheese falling onto bubbling ramen stew, appetizing steam, 8k Octane render.",
          image_prompt_midjourney: "Commercial food photography, shredded mozzarella cheese showering over steaming kimchi noodles, melting cheese threads, clean minimalist lighting --ar 9:16 --v 6.1 --style raw",
          negative_prompt: "collage, grid, multi-panel, split screen, rubbery cheese, unappetizing"
        },
        {
          scene_number: 4,
          badge: "BLOWTORCH LAVA ACTION",
          title_vi: "Cảnh 4: Đèn Khò Mini Thổi Lửa Nung Chảy Phô Mai Lava Xém Vàng",
          description_vi: "Ngọn lửa xanh biếc từ đèn khò mini (blowtorch) khò trực tiếp lên phô mai, phô mai sủi bọt xèo xèo sôi ùng ục, tan chảy thành dòng dung nham lava và xém vàng nâu thơm ngậy mê đắm.",
          camera_angle: "Cực cận cảnh (Extreme Macro 100mm)",
          lighting: "Ánh lửa xanh cam rực rỡ từ đèn khò phản chiếu trên bề mặt phô mai sôi bọt",
          image_prompt_gpt: "A single standalone, individual commercial product photograph (NOT a collage, NOT a split screen, NOT a multi-panel grid). A single coherent shot of a sleek culinary blowtorch shooting a precise blue-and-orange flame directly onto the thick layer of mozzarella cheese inside the stone pot. The cheese bubbles vigorously, caramelizing into golden-brown toasted blisters and a rich molten lava texture. Sizzling cheese micro-bubbles caught in crisp detail.",
          image_prompt_gemini: "Photorealistic macro photography of blowtorch flame melting mozzarella cheese into golden browned bubbling lava over noodles, intense culinary action, crisp clarity.",
          image_prompt_muse: "Sensory culinary blowtorch action shot, blue flame searing bubbling mozzarella cheese into molten gold crust, stone pot, 8k Octane render.",
          image_prompt_midjourney: "Macro commercial food photography, culinary blowtorch flame caramelizing bubbling mozzarella cheese over ramen, blistering golden crust, high shutter speed --ar 9:16 --v 6.1 --style raw",
          negative_prompt: "collage, grid, multi-panel, split screen, blackened burnt mess, blurry flame"
        },
        {
          scene_number: 5,
          badge: "CHEESE PULL HERO SHOT",
          title_vi: "Cảnh 5: Kéo Sợi Phô Mai Lava Dài Bất Tận (Hero Shot)",
          description_vi: "Đôi đũa gốm nhấc cụm mì kim chi lên cao kéo theo dải phô mai Mozzarella dai mịn óng ánh kéo dài bất tận, khói bốc nghi ngút, kích thích tột độ thị giác trên bục Terrazzo màu be.",
          camera_angle: "Góc quay tĩnh tuyệt đẹp (Hero Glamour Shot)",
          lighting: "Ánh sáng tự nhiên dịu êm làm nổi bật độ bóng mượt của sợi phô mai kéo dài",
          image_prompt_gpt: "A single standalone, individual commercial hero glamour photograph (NOT a collage, NOT a split screen, NOT a multi-panel grid). A single complete hero shot showing minimalist ceramic chopsticks lifting a steaming bundle of spicy red noodles high above the black stone pot, creating an epic, unbroken stretch of molten, gooey mozzarella cheese pulling gracefully through the air. Plumes of delicate steam rise into the soft, bright Korean aesthetic studio daylight. Minimalist terrazzo pedestal surface, serene art book and vase in soft background bokeh. 8k, ultra-appetizing viral food shot.",
          image_prompt_gemini: "Hyper-realistic commercial hero photography of an epic mozzarella cheese pull from steaming kimchi ramen noodles inside a black stone pot, clean terrazzo background, soft morning studio light, 8k resolution.",
          image_prompt_muse: "Viral food hero shot, aesthetic ceramic chopsticks lifting steaming noodles with endless stretchy melted mozzarella cheese pull, terrazzo pedestal, Octane render 8k.",
          image_prompt_midjourney: "Commercial hero food photography, epic stretchy melted cheese pull from steaming ramen noodles, minimalist terrazzo studio, soft natural daylight, 85mm f/1.4 lens --ar 9:16 --v 6.1 --style raw",
          negative_prompt: "collage, grid, multi-panel, split screen, broken rubber cheese, low resolution"
        }
      ],
      video_prompt: {
        duration_seconds: 15,
        aspect_ratio: "9:16",
        camera_direction: "Chuyển động mượt mà thanh lịch phong cách vlog Hàn Quốc, chuyển từ nhịp điệu thư giãn sang khoảnh khắc khò lửa bùng nổ",
        sound_design_asmr: "Tiếng mở nắp thùng carton trên bục đá, tiếng nồi đá sôi ùng ục, tiếng xé phô mai rào rào, tiếng khè lửa đèn khò rực rỡ và tiếng nhấc đũa kéo sợi phô mai dẻo quánh",
        video_prompt_veo3: "Cinematic commercial video 4K 60fps Korean aesthetic, [00:00 - 00:03] Smooth dolly push onto a closed, sealed kraft delivery carton on a matte terrazzo pedestal in soft morning studio daylight, clean hands smoothly unfold the flaps to reveal packed Indomie noodle packs. [00:03 - 00:07] Hands drop noodles into a bubbling black stone pot of spicy kimchi broth, followed by a shower of shredded mozzarella cheese. [00:07 - 00:11] Mini blowtorch sears the cheese into a bubbling, blistering golden-brown molten lava crust. [00:11 - 00:15] Epic static hero shot as chopsticks lift steaming noodles creating an endless stretchy molten cheese pull over the stone pot, soft pastel aesthetic.",
        video_prompt_grok: "Trendy viral TikTok commercial, vibrant high-key aesthetic. Dynamic snap-zoom onto a closed sealed kraft carton on terrazzo pedestal as hands open the flaps to reveal Indomie packs. Fast cuts of bubbling kimchi stew, cheese avalanche, roaring blowtorch flame melting cheese, ending on an ultra-satisfying epic cheese pull hero shot.",
        video_prompt_muse: "Ultra-smooth fluid 60fps transitions, soft minimalist Korean vlog grading. Elegant unboxing starting on a closed sealed kraft carton on cream terrazzo pedestal, hands revealing packed noodles, bubbling stone pot ASMR, sensory blowtorch melting, culminating in mouthwatering stretchy cheese pull hero shot.",
        video_prompt_sedan: "One coherent vertical commercial with a continuous, controlled dolly-and-orbit path across a chic matte cream-beige terrazzo pedestal. Start on a closed, sealed kraft delivery carton box, where clean hands smoothly pull open the top flaps to dramatically reveal identical packed Indomie noodle pouches; travel to one opened pouch, follow the ingredients into a bubbling black stone pot, follow the blowtorch flame melting the cheese, and finish in an orbit around the steaming pot as chopsticks perform an epic cheese pull. Keep ceramic vase softly blurred, daylight soft, cheese physics realistic.",
        master_ai_video_prompt: "A cinematic 15-second Korean aesthetic food commercial starting on a closed kraft delivery carton on a cream terrazzo pedestal where clean hands open the flaps to reveal packed Indomie noodle packs. Smooth transitions show dropping noodles into a bubbling kimchi stone pot, showering with mozzarella cheese, blowtorch caramelization, and ends on an epic viral stretchy melted cheese pull hero shot.",
        timeline: [
          { time_range: "00:00 - 00:03", shot_name: "Shot 1: Pastel Terrazzo Hook", action: "Thùng carton đóng kín dán băng keo trên bục Terrazzo màu be, đôi tay thanh lịch mở nắp thùng hé lộ đầy ắp các gói mì Indomie dưới ánh sáng ban ngày dịu êm.", camera_motion: "Dolly push-in mượt mà phong cách vlog Hàn Quốc", audio_cue: "Tiếng mở nắp thùng carton trên bục đá ASMR thư thái" },
          { time_range: "00:03 - 00:06", shot_name: "Shot 2: Stone Pot Simmer", action: "Nồi đá sôi ùng ục nước súp kim chi, đôi tay thả vắt mì cùng xúc xích và nấm kim châm.", camera_motion: "Cận cảnh bàn tay chuyển động duyên dáng", audio_cue: "Tiếng súp kim chi sôi ùng ục sùng sục" },
          { time_range: "00:06 - 00:09", shot_name: "Shot 3: Cheese Avalanche", action: "Rắc lớp phô mai Mozzarella sợi tuyết trắng phủ kín mặt mì đang sôi.", camera_motion: "Macro góc 60 độ dõi theo dòng phô mai", audio_cue: "Tiếng rắc phô mai rào rào và hơi nước bốc lên" },
          { time_range: "00:09 - 00:12", shot_name: "Shot 4: Blowtorch Lava Melting", action: "Đèn khò mini khò lửa trực tiếp làm phô mai sủi bọt, chảy tràn thành lava và xém vàng nâu thơm ngậy.", camera_motion: "Extreme macro cận cảnh ngọn lửa khò", audio_cue: "Tiếng khè lửa đèn khò và phô mai sôi xèo xèo" },
          { time_range: "00:12 - 00:15", shot_name: "Shot 5: Epic Cheese Pull Hero", action: "Đũa nhấc mì lên cao kéo theo dải phô mai lava dai mịn óng ánh kéo dài bất tận.", camera_motion: "Góc quay tĩnh nghệ thuật kéo chậm lên cao", audio_cue: "Âm thanh dẻo quánh kéo sợi thỏa mãn thị giác tối đa" }
        ]
      }
    }
  ]
};

const SAMPLE_SAUCE_DATA = {
  product_analysis: {
    product_name: "Sốt Gà Chiên Nước Mắm (Đặc Sản Gia Vị Nấu Ăn Đậm Đà)",
    category: "Gia Vị Chế Biến Món Ăn & Sốt Ướp Đậm Đà (Cooking Sauce & Marinade)",
    brand_and_packaging: "Hũ thủy tinh cao cấp nắp đen viền vàng, nhãn đỏ cờ viền vàng hoàng gia ghi 'SỐT GÀ CHIÊN NƯỚC MẮM', in hình đĩa cánh gà chiên óng ánh caramel",
    key_colors: ["#C62828 Đỏ đậm truyền thống", "#F9A825 Vàng hoàng kim", "#4E342E Nâu caramel hổ phách", "#FFFFFF Trắng nhãn"],
    materials_and_textures: "Sốt sánh đặc màu hổ phách nâu đỏ sóng sánh, hạt tỏi ớt li ti bám thành hũ, khi đun nóng sôi sủi bọt caramel bọc lấy cánh gà giòn rụm",
    target_vibe: "Đậm đà chuẩn vị truyền thống, đánh thức vị giác, sôi sục tiếng xèo xèo nấu nướng, kích thích cảm giác thèm ăn tột độ"
  },
  total_videos: 3,
  videos: [
    {
      video_id: 1,
      title_vi: "Kịch Bản 1: Cánh Gà Chiên Nước Mắm Hoàng Kim Óng Ả (Bếp Gia Đình Ấm Cúng Gỗ Gụ)",
      concept_vibe: "Homestyle Crispy Wings Pan-Glaze & Warm Sizzling Aroma",
      background_applied: {
        theme_name: "Mâm Cơm Sum Vầy Gia Đình Ấm Cúng (Warm Domestic Heritage)",
        surface_material: "Bàn bếp gỗ gụ nâu trầm ấm cúng (Warm Mahogany Dining Table)",
        environment_setting: "Phòng bếp gia đình ấm áp thân thuộc, bộ chén dĩa sứ hoa văn men lam, chảo chống dính sâu lòng, rổ tỏi ớt tươi",
        lighting_style: "Ánh đèn trần vàng ấm áp (Warm Tungsten Pendant Light 3000K), không gian đượm vẻ gia đình"
      },
      master_image_prompt_gpt: `[DIRECTIVE FOR CHATGPT / DALL-E 3: You are generating commercial hero photographs for an advertising campaign.
CRITICAL RULE: Each scene below MUST be generated as ONE SINGLE STANDALONE, INDIVIDUAL FULL-FRAME PHOTOGRAPH (9:16 vertical).
Strictly prohibited: Absolutely NO collages, NO multi-panel grids, NO comic strips, NO split screens, NO before/after split frames, NO storyboard panels. Every generation must be an independent single-frame photograph.
VIDEO THEME: Mâm Cơm Sum Vầy Gia Đình Ấm Cúng (Warm Mahogany Dining Table)
LIGHTING: Warm tungsten kitchen pendant lighting with appetizing amber glow]

=== CẢNH 1: TAY MỞ THÙNG CARTON HÉ LỘ HŨ SỐT GÀ CHIÊN (VIRAL HOOK BẮT BUỘC) ===
Mô tả tiếng Việt: Chiếc thùng carton kraft đóng kín dán băng keo trên bàn bếp gỗ gụ ấm cúng, đôi tay nhẹ nhàng mở nắp thùng hé lộ hàng chục hũ Sốt Gà Chiên Nước Mắm nắp đen viền vàng nhãn đỏ xếp ngay ngắn dưới ánh đèn vàng ấm áp.
Prompt cho ChatGPT / DALL-E 3: A single standalone, individual commercial product photograph (NOT a collage, NOT a split screen, NOT a multi-panel grid). A single coherent shot showing clean hands actively unfolding the top flaps of a closed tape-sealed brown kraft corrugated delivery carton box to reveal dozens of glass jars of Sốt Gà Chiên Nước Mắm (Vietnamese fried chicken fish sauce glaze) neatly packed inside, with crisp red and gold labels. The box rests on a warm dark mahogany wooden kitchen table. Warm cozy tungsten pendant lighting creates soft golden highlights on the glass jars. In the blurred home kitchen background, traditional ceramic bowls and fresh garlic bulbs in soft bokeh. Commercial product photography, 8k resolution, crisp textures.

=== CẢNH 2: CÁNH GÀ VÀNG GIÒN VỪA VỚT TỪ CHẢO DẦU SÔI ===
Mô tả tiếng Việt: Cánh gà chiên vàng ươm giòn rụm vừa được vớt ra khỏi chảo dầu sôi tí tách bằng muôi vớt inox, từng giọt dầu trong veo rơi xuống vỉ ráo dầu, vỏ gà phồng giòn nổi hạt li ti bốc khói nhẹ.
Prompt cho ChatGPT / DALL-E 3: A single standalone, individual commercial product photograph (NOT a collage, NOT a split screen, NOT a multi-panel grid). A single coherent shot showing crispy, golden-brown deep-fried chicken wings freshly lifted out of hot bubbling frying oil with a stainless steel wire skimmer spider ladle. Clear glistening oil droplets drip through the wire mesh onto a cooling rack. The chicken skin is perfectly blistered, crunchy, and steaming lightly. Macro commercial food photography, high shutter speed, warm kitchen lighting.

=== CẢNH 3: RÓT SỐT NƯỚC MẮM VÀO CHẢO SÔI SỦI BỌT CARAMEL ===
Mô tả tiếng Việt: Đôi tay mở nắp hũ, rót dòng sốt gà chiên nước mắm màu hổ phách sánh đặc vào chảo nóng, sốt lập tức sôi xèo xèo sủi bọt tăm li ti caramel hóa, tỏa làn khói thơm nức mùi nước mắm tỏi ớt.
Prompt cho ChatGPT / DALL-E 3: A single standalone, individual commercial product photograph (NOT a collage, NOT a split screen, NOT a multi-panel grid). A single coherent shot of thick, glossy amber-red fish sauce glaze pouring smoothly from the branded glass jar into a hot non-stick skillet. The rich sauce immediately hits the hot surface, bubbling and frothing into aromatic golden caramel micro-bubbles with fragrant backlit culinary steam rising. Appetizing glossy sheen, warm side lighting, ultra-sharp macro detail.

=== CẢNH 4: ĐẢO LẮC CHẢO ÁO SỐT ÓNG Ả & RẮC TỎI PHI ===
Mô tả tiếng Việt: Toàn bộ cánh gà giòn rụm được trút vào chảo, bàn tay lắc chảo điệu nghệ đảo đều cho lớp sốt kẹo bọc một màng bóng lộn màu cánh gián quanh từng khúc cánh gà, rắc ngập tỏi phi vàng giòn.
Prompt cho ChatGPT / DALL-E 3: A single standalone, individual commercial product photograph (NOT a collage, NOT a split screen, NOT a multi-panel grid). A single coherent shot capturing dynamic pan-tossing action: crispy golden chicken wings flying slightly above the skillet, completely coated in a thick, glistening amber caramelized fish sauce glaze. A generous shower of crispy golden fried garlic flakes and finely chopped red chilies sprinkles over the sizzling wings. Specular highlights shimmer on the sticky sauce coating, warm rim lighting.

=== CẢNH 5: ĐĨA CÁNH GÀ CHIÊN NƯỚC MẮM HOÀNG KIM (HERO SHOT) ===
Mô tả tiếng Việt: Đĩa cánh gà chiên nước mắm hoàn thiện tuyệt mỹ trên đĩa sứ viền men lam, cánh gà bóng lộn màu hổ phách phủ đầy tỏi phi giòn rụm, cọng ngò tươi và ớt tỉa hoa, khói bốc nghi ngút thơm lừng trên bàn gỗ gụ ấm cúng.
Prompt cho ChatGPT / DALL-E 3: A single standalone, individual commercial hero glamour photograph (NOT a collage, NOT a split screen, NOT a multi-panel grid). A single complete hero shot of authentic Vietnamese fish sauce glazed fried chicken wings (Cánh Gà Chiên Nước Mắm) piled high on a traditional porcelain serving platter. The chicken wings have a mirror-like glistening mahogany caramel glaze, showered with crispy golden garlic chips, fresh cilantro sprigs, and curly red chili ribbons. Gentle aromatic steam rises into the warm cozy dining room light. On the wooden table in soft background bokeh, the branded jar of sauce sits proudly. 8k, photorealistic mouthwatering perfection.`,
      scenes: [
        {
          scene_number: 1,
          badge: "MANDATORY HOOK",
          title_vi: "Cảnh 1: Unboxing Hũ Sốt Gà Chiên (Tay Mở Nắp Thùng Carton)",
          description_vi: "Chiếc thùng carton kraft đóng kín dán băng keo trên bàn bếp gỗ gụ ấm cúng, đôi tay nhẹ nhàng mở nắp thùng hé lộ hàng chục hũ Sốt Gà Chiên Nước Mắm nắp đen viền vàng nhãn đỏ xếp ngay ngắn dưới ánh đèn vàng ấm áp.",
          camera_angle: "Góc nghiêng 45 độ, cận trung (Medium Close-Up 35mm)",
          lighting: "Ánh đèn trần vàng ấm áp (Warm Tungsten Pendant Light 3000K), bóng đổ mềm mại",
          image_prompt_gpt: "A single standalone, individual commercial product photograph (NOT a collage, NOT a split screen, NOT a multi-panel grid). A single coherent shot showing clean hands actively unfolding the top flaps of a closed tape-sealed brown kraft corrugated delivery carton box to reveal dozens of glass jars of Sốt Gà Chiên Nước Mắm (Vietnamese fried chicken fish sauce glaze) neatly packed inside, with crisp red and gold labels. The box rests on a warm dark mahogany wooden kitchen table. Warm cozy tungsten pendant lighting creates soft golden highlights on the glass jars. Commercial product photography, 8k resolution, crisp textures.",
          image_prompt_gemini: "Hyper-realistic commercial product photography of clean hands actively opening the flaps of a closed kraft delivery box on a mahogany wood table to reveal jars of Vietnamese fried chicken fish sauce glaze inside, warm pendant light, cozy home kitchen.",
          image_prompt_muse: "Award-winning commercial product showcase, Octane render 8k of clean hands opening a closed sealed kraft carton on dark mahogany table, revealing packed jars of golden amber chicken sauce, warm domestic atmosphere.",
          image_prompt_midjourney: "Commercial product photography, hands unfolding flaps of a closed kraft carton on mahogany dining table to reveal jars of Sốt Gà Chiên Nước Mắm, warm cozy kitchen lighting, 85mm f/1.4 lens --ar 9:16 --v 6.1 --style raw",
          negative_prompt: "open box without hands, collage, grid, multi-panel, split screen, frame, storyboard, comic, distorted text, ugly hands, low resolution"
        },
        {
          scene_number: 2,
          badge: "CRISPY FRYING ACTION",
          title_vi: "Cảnh 2: Cánh Gà Vàng Giòn Vừa Vớt Từ Chảo Dầu Sôi",
          description_vi: "Cánh gà chiên vàng ươm giòn rụm vừa được vớt ra khỏi chảo dầu sôi tí tách bằng muôi vớt inox, từng giọt dầu trong veo rơi xuống vỉ ráo dầu, vỏ gà phồng giòn nổi hạt li ti bốc khói nhẹ.",
          camera_angle: "Cận cảnh bàn tay và muôi vớt (Macro 60mm)",
          lighting: "Ánh sáng bắt độ bóng giòn của lớp da gà vàng ruộm",
          image_prompt_gpt: "A single standalone, individual commercial product photograph (NOT a collage, NOT a split screen, NOT a multi-panel grid). A single coherent shot showing crispy, golden-brown deep-fried chicken wings freshly lifted out of hot bubbling frying oil with a stainless steel wire skimmer spider ladle. Clear glistening oil droplets drip through the wire mesh onto a cooling rack. The chicken skin is perfectly blistered, crunchy, and steaming lightly. Macro commercial food photography, high shutter speed, warm kitchen lighting.",
          image_prompt_gemini: "Photorealistic macro photography of golden crispy fried chicken wings lifted from hot oil with wire ladle, oil droplets dripping, crispy textured skin, warm kitchen ambiance.",
          image_prompt_muse: "Commercial culinary action shot, golden crunchy fried chicken wings on wire skimmer, dripping oil droplets, blistered skin texture, 8k resolution.",
          image_prompt_midjourney: "Commercial food photography, crispy deep fried chicken wings lifted with wire spider ladle over bubbling oil, glistening droplets, golden crust, warm lighting --ar 9:16 --v 6.1 --style raw",
          negative_prompt: "collage, grid, multi-panel, split screen, soggy chicken, burnt skin, blurry"
        },
        {
          scene_number: 3,
          badge: "SAUCE SIZZLE & CARAMELIZE",
          title_vi: "Cảnh 3: Rót Sốt Nước Mắm Vào Chảo Sôi Sủi Bọt Caramel",
          description_vi: "Đôi tay mở nắp hũ, rót dòng sốt gà chiên nước mắm màu hổ phách sánh đặc vào chảo nóng, sốt lập tức sôi xèo xèo sủi bọt tăm li ti caramel hóa, tỏa làn khói thơm nức mùi nước mắm tỏi ớt.",
          camera_angle: "Góc 45 độ cận cảnh dòng rót (Action Macro Shot)",
          lighting: "Ánh sáng rọi xiên làm nổi bật bong bóng caramel sôi sủi lấp lánh",
          image_prompt_gpt: "A single standalone, individual commercial product photograph (NOT a collage, NOT a split screen, NOT a multi-panel grid). A single coherent shot of thick, glossy amber-red fish sauce glaze pouring smoothly from the branded glass jar into a hot non-stick skillet. The rich sauce immediately hits the hot surface, bubbling and frothing into aromatic golden caramel micro-bubbles with fragrant backlit culinary steam rising. Appetizing glossy sheen, warm side lighting, ultra-sharp macro detail.",
          image_prompt_gemini: "Hyper-realistic commercial food photography of thick amber fish sauce pouring from glass jar into hot skillet, sizzling micro-bubbles of caramel sauce, aromatic steam rising.",
          image_prompt_muse: "Sensory culinary action shot, pouring thick glossy glaze into hot sizzling skillet, foaming caramel bubbles, warm amber glow, 8k resolution.",
          image_prompt_midjourney: "Commercial food photography, thick glossy amber fish sauce glaze pouring into hot pan, sizzling foaming bubbles, backlit steam, warm kitchen light --ar 9:16 --v 6.1 --style raw",
          negative_prompt: "collage, grid, multi-panel, split screen, watery sauce, dull flat color"
        },
        {
          scene_number: 4,
          badge: "PAN-GLAZE & GARLIC TOSS",
          title_vi: "Cảnh 4: Đảo Lắc Chảo Áo Sốt Óng Ả & Rắc Tỏi Phi",
          description_vi: "Toàn bộ cánh gà giòn rụm được trút vào chảo, bàn tay lắc chảo điệu nghệ đảo đều cho lớp sốt kẹo bọc một màng bóng lộn màu cánh gián quanh từng khúc cánh gà, rắc ngập tỏi phi vàng giòn.",
          camera_angle: "Góc nghiêng bắt chuyển động xóc chảo (Dynamic Toss Action)",
          lighting: "Ánh sáng phản chiếu rực rỡ trên lớp sốt kẹo bọc quanh cánh gà",
          image_prompt_gpt: "A single standalone, individual commercial product photograph (NOT a collage, NOT a split screen, NOT a multi-panel grid). A single coherent shot capturing dynamic pan-tossing action: crispy golden chicken wings flying slightly above the skillet, completely coated in a thick, glistening amber caramelized fish sauce glaze. A generous shower of crispy golden fried garlic flakes and finely chopped red chilies sprinkles over the sizzling wings. Specular highlights shimmer on the sticky sauce coating, warm rim lighting.",
          image_prompt_gemini: "Photorealistic action photography of crispy chicken wings tossed in skillet, coated in glossy sticky caramel fish sauce glaze, showered with crispy golden fried garlic flakes.",
          image_prompt_muse: "Gourmet culinary action, tossing glazed chicken wings in hot skillet, sticky mahogany sauce coating, crispy fried garlic chips, Octane 8k render.",
          image_prompt_midjourney: "Commercial food action shot, pan tossing fried chicken wings coated in glossy caramel fish sauce glaze, fried garlic raining down, warm rim light --ar 9:16 --v 6.1 --style raw",
          negative_prompt: "collage, grid, multi-panel, split screen, dry chicken, messy splatters"
        },
        {
          scene_number: 5,
          badge: "HERO SHOT",
          title_vi: "Cảnh 5: Đĩa Cánh Gà Chiên Nước Mắm Hoàng Kim (Hero Shot)",
          description_vi: "Đĩa cánh gà chiên nước mắm hoàn thiện tuyệt mỹ trên đĩa sứ viền men lam, cánh gà bóng lộn màu hổ phách phủ đầy tỏi phi giòn rụm, cọng ngò tươi và ớt tỉa hoa, khói bốc nghi ngút thơm lừng trên bàn gỗ gụ ấm cúng.",
          camera_angle: "Góc quay tĩnh tuyệt đẹp (Hero Glamour Shot)",
          lighting: "Ánh sáng đèn vàng ấm áp tôn vinh độ bóng mượt và màu cánh gián óng ả",
          image_prompt_gpt: "A single standalone, individual commercial hero glamour photograph (NOT a collage, NOT a split screen, NOT a multi-panel grid). A single complete hero shot of authentic Vietnamese fish sauce glazed fried chicken wings (Cánh Gà Chiên Nước Mắm) piled high on a traditional porcelain serving platter. The chicken wings have a mirror-like glistening mahogany caramel glaze, showered with crispy golden garlic chips, fresh cilantro sprigs, and curly red chili ribbons. Gentle aromatic steam rises into the warm cozy dining room light. On the wooden table in soft background bokeh, the branded jar of sauce sits proudly. 8k, photorealistic mouthwatering perfection.",
          image_prompt_gemini: "Hyper-realistic commercial hero food photography of glistening caramel glazed fried chicken wings on porcelain platter, crispy fried garlic chips, fresh herbs, warm domestic dining table, 8k resolution.",
          image_prompt_muse: "Magazine cover commercial food hero shot, glistening Vietnamese fish sauce chicken wings, crispy garlic, steaming aroma, mahogany table setting, Octane render 8k.",
          image_prompt_midjourney: "Commercial hero food photography, plate of mouthwatering Vietnamese fish sauce glazed fried chicken wings, crispy garlic, chili curls, steam rising, warm lighting, 85mm f/1.4 lens --ar 9:16 --v 6.1 --style raw",
          negative_prompt: "collage, grid, multi-panel, split screen, dull matte chicken, unappetizing"
        }
      ],
      video_prompt: {
        duration_seconds: 15,
        aspect_ratio: "9:16",
        camera_direction: "Nhịp điệu dồn dập kích thích vị giác, chuyển động mượt mà từ mở hộp sang tiếng xèo xèo sôi sục và Hero shot tĩnh quyến rũ",
        sound_design_asmr: "Tiếng mở nắp thùng carton cốp nhẹ, tiếng cánh gà chiên giòn rụm tí tách trong dầu, tiếng rót sốt xèo xèo sủi bọt caramel mãnh liệt và tiếng lắc chảo đảo gà lách cách",
        video_prompt_veo3: "Cinematic commercial video 4K 60fps warm culinary lighting, [00:00 - 00:03] Slow-motion dolly zoom onto a closed, sealed kraft delivery carton on a warm mahogany kitchen table, as clean hands open the top flaps to dramatically reveal glass jars of Sốt Gà Chiên Nước Mắm inside. [00:03 - 00:07] Crispy golden chicken wings lifted from hot oil, as thick amber glaze pours into a hot skillet, bubbling into fragrant caramel foam. [00:07 - 00:11] Dynamic pan toss coating the wings in sticky glistening sauce showered with golden garlic chips. [00:11 - 00:15] Mouthwatering static hero shot of caramelized chicken wings on porcelain platter, steam rising in warm dining light.",
        video_prompt_grok: "High-energy culinary commercial, appetizing sizzle and crunch. Snap zoom onto closed kraft carton as hands pull open flaps to reveal sauce jars. Fast-cut action of boiling oil sizzle, sauce caramel explosion in hot pan, tossing glossy wings with fried garlic, ending on irresistible hero shot of glistening wings.",
        video_prompt_muse: "Ultra-smooth commercial video, rich warm color grading. Macro unboxing starting on a closed sealed kraft carton on dark mahogany table revealing sauce jars, sensory ASMR frying, bubbling caramel sauce glaze, ending on glistening mahogany chicken wings hero platter.",
        video_prompt_sedan: "One coherent vertical commercial with a continuous, controlled dolly-and-orbit path across a warm dark mahogany wooden table. Start on a closed, sealed kraft delivery carton box, where clean hands smoothly pull open the top flaps to dramatically reveal identical glass jars of Sốt Gà Chiên Nước Mắm; travel to one opened jar, follow the sauce pouring into a sizzling skillet, follow the chef tossing crispy chicken wings into a glistening caramel coat, and finish in an orbit around the steaming platter and jar. Keep home kitchen softly blurred, tungsten light consistent, sizzling sauce physics realistic.",
        master_ai_video_prompt: "A mouthwatering 15-second commercial video starting on a closed kraft delivery carton on a mahogany wooden table where clean hands open the flaps to reveal jars of Vietnamese fried chicken sauce. Dynamic transitions show crispy chicken frying, thick amber sauce sizzling and foaming into caramel, pan-tossing wings in glossy glaze with garlic chips, and ends on a stunning hero platter of glistening wings in warm lighting.",
        timeline: [
          { time_range: "00:00 - 00:03", shot_name: "Shot 1: The Kitchen Unboxing Hook", action: "Thùng carton đóng kín trên bàn gỗ gụ, đôi tay mở nắp thùng hé lộ các hũ Sốt Gà Chiên Nước Mắm nhãn đỏ vàng rực rỡ.", camera_motion: "Dolly push-in mượt mà vào thùng carton khi bàn tay mở nắp", audio_cue: "Tiếng mở nắp thùng carton ASMR dứt khoát" },
          { time_range: "00:03 - 00:06", shot_name: "Shot 2: Crispy Frying Action", action: "Vớt cánh gà chiên vàng rụm từ chảo dầu sôi tí tách ra vỉ ráo dầu.", camera_motion: "Cận cảnh muôi inox nâng cánh gà", audio_cue: "Tiếng dầu sôi tí tách và lớp da giòn rụm" },
          { time_range: "00:06 - 00:09", shot_name: "Shot 3: Sauce Caramel Sizzle", action: "Rót sốt vào chảo nóng, sốt sủi bọt caramel sôi xèo xèo thơm nức mũi.", camera_motion: "Macro góc 45 độ dõi theo dòng rót sốt", audio_cue: "Tiếng xèo xèo sủi bọt caramel thơm ngậy" },
          { time_range: "00:09 - 00:12", shot_name: "Shot 4: Pan-Glaze Toss", action: "Lắc chảo đảo đều cánh gà bọc đều lớp sốt óng ả, rắc ngập tỏi phi giòn.", camera_motion: "Cận cảnh chuyển động lắc chảo điệu nghệ", audio_cue: "Tiếng đảo chảo lách cách và tỏi phi giòn rụm" },
          { time_range: "00:12 - 00:15", shot_name: "Shot 5: The Golden Hero Platter", action: "Đĩa cánh gà chiên nước mắm hoàng kim bốc khói nghi ngút, bóng loáng quyến rũ.", camera_motion: "Góc quay tĩnh nghệ thuật với ánh đèn vàng ấm", audio_cue: "Âm thanh kết thúc thỏa mãn tột độ giác quan" }
        ]
      }
    },
    {
      video_id: 2,
      title_vi: "Kịch Bản 2: Sườn Nướng BBQ & Xiên Gà Phết Sốt Than Hồng (Sân Vườn Hoàng Hôn Nắng Vàng)",
      concept_vibe: "Outdoor Charcoal BBQ Smoke & Honey Amber Glazed Ribs",
      background_applied: {
        theme_name: "Tiệc Nướng BBQ Sân Vườn Hoàng Hôn (Outdoor Sunset Garden)",
        surface_material: "Bàn gỗ tuyết tùng thô mộc mạc ngoài trời (Weathered Rustic Cedar Picnic Table)",
        environment_setting: "Sân vườn xanh mướt lúc chiều tà, thảm cỏ xanh tươi, làn khói nướng than hồng thoang thoảng từ lò nướng BBQ",
        lighting_style: "Ánh nắng chiều hoàng hôn rực rỡ rọi ngang (Warm Golden Hour Sunset Rays), vệt sáng lung linh xuyên qua tán lá cây"
      },
      master_image_prompt_gpt: `[DIRECTIVE FOR CHATGPT / DALL-E 3: You are generating commercial hero photographs for an advertising campaign.
CRITICAL RULE: Each scene below MUST be generated as ONE SINGLE STANDALONE, INDIVIDUAL FULL-FRAME PHOTOGRAPH (9:16 vertical).
Strictly prohibited: Absolutely NO collages, NO multi-panel grids, NO comic strips, NO split screens, NO before/after split frames, NO storyboard panels. Every generation must be an independent single-frame photograph.
VIDEO THEME: Tiệc Nướng BBQ Sân Vườn Hoàng Hôn (Weathered Rustic Cedar Picnic Table)
LIGHTING: Golden hour horizontal sunset beams with dappled sunlight through trees]

=== CẢNH 1: TAY MỞ THÙNG CARTON TRÊN BÀN TIỆC BBQ NGOÀI TRỜI (VIRAL HOOK BẮT BUỘC) ===
Mô tả tiếng Việt: Chiếc thùng carton kraft đóng kín dán băng dính trên bàn gỗ tuyết tùng mộc mạc ngoài sân vườn lúc hoàng hôn, đôi tay mở tung nắp thùng hé lộ các hũ Sốt Gà Chiên Nước Mắm bên cạnh đĩa sườn và xiên thịt tươi rói dưới vệt nắng chiều rọi ngang.
Prompt cho ChatGPT / DALL-E 3: A single standalone, individual commercial product photograph (NOT a collage, NOT a split screen, NOT a multi-panel grid). A single coherent shot showing clean energetic hands actively unfolding the top flaps of a closed tape-sealed brown kraft corrugated delivery carton box to reveal glass jars of Sốt Gà Chiên Nước Mắm inside. The box rests on a weathered rustic cedar picnic table in a lush backyard garden. Warm horizontal golden hour sunset sunbeams filter through tree branches, creating glowing lens flares and dappled light. In the background, faint atmospheric smoke curls from a charcoal BBQ grill. Commercial product photography, 8k resolution.

=== CẢNH 2: CHỔI SILICON QUÉT SỐT ÓNG Ả LÊN DẺ SƯỜN & XIÊN GÀ TƯƠI ===
Mô tả tiếng Việt: Đôi tay dùng chổi silicon nhúng đẫm hũ sốt gà chiên nước mắm, quét từng đường bóng mượt màu hổ phách nâu đỏ lên dẻ sườn heo và xiên gà tươi rói, lớp sốt bám đều óng ánh dưới nắng chiều.
Prompt cho ChatGPT / DALL-E 3: A single standalone, individual commercial product photograph (NOT a collage, NOT a split screen, NOT a multi-panel grid). A single coherent shot of a silicone culinary basting brush generously slathering a thick, glossy amber fish sauce marinade glaze across raw, fresh pork ribs and chicken skewers. Glistening sauce coats every groove of the meat, catching warm sunset backlighting. Rustic wooden prep board, fresh rosemary sprigs, macro food photography.

=== CẢNH 3: NƯỚNG TRÊN VỈ THAN HỒNG XÈO XÈO BỐC KHÓI THƠM NỨC ===
Mô tả tiếng Việt: Đặt dẻ sườn và xiên gà lên vỉ nướng trên than hồng đỏ rực, mỡ và sốt nhỏ xuống than bốc lên làn khói thơm nức mũi, ngọn lửa đỏ liếm nhẹ làm viền thịt xèo xèo xém cạnh vàng ruộm.
Prompt cho ChatGPT / DALL-E 3: A single standalone, individual commercial product photograph (NOT a collage, NOT a split screen, NOT a multi-panel grid). A single coherent shot showing glazed chicken skewers and pork ribs sizzling vigorously on a cast iron grill grate over glowing red-hot charcoal embers. Droplets of fat and sauce drip into the coals, creating aromatic wisps of white woodsmoke and small orange flame flare-ups. High shutter speed freezing smoke swirls and glowing embers.

=== CẢNH 4: PHẾT THÊM LỚP SỐT THỨ HAI BÓNG LỘN CARAMEL HÓA ===
Mô tả tiếng Việt: Trong khi thịt đang xèo xèo trên than hồng, chổi tiếp tục quét lớp sốt thứ hai bóng lộn lên bề mặt, sốt sôi li ti sủi bọt caramel hóa tạo lớp vỏ ngoài cánh gián giòn thơm đẫm vị.
Prompt cho ChatGPT / DALL-E 3: A single standalone, individual commercial product photograph (NOT a collage, NOT a split screen, NOT a multi-panel grid). A single coherent shot of a basting brush reapplying a second layer of thick glistening sauce directly over the sizzling meats on the hot grill. The glaze bubbles and caramelizes instantly upon contact with the hot meat, forming a sticky, glossy mahogany bark with delicious charred grill marks. Intense sunset side lighting, extreme macro detail.

=== CẢNH 5: THÀNH PHẨM DẺ SƯỜN NƯỚNG BBQ ÓNG Ả MỌNG NƯỚC (HERO SHOT) ===
Mô tả tiếng Việt: Dĩa sườn nướng BBQ và xiên gà nướng vàng nâu cánh gián bóng lộn trên thớt gỗ mộc mạc, dao sắc cắt đôi dẻ sườn để lộ thớ thịt mềm ngọt mọng nước (juicy) bốc khói ngập tràn dưới ánh hoàng hôn rực rỡ.
Prompt cho ChatGPT / DALL-E 3: A single standalone, individual commercial hero glamour photograph (NOT a collage, NOT a split screen, NOT a multi-panel grid). A single complete hero shot of glistening, caramelized BBQ ribs and glazed chicken skewers served on a rustic wooden carving board outdoors during sunset. A sharp carving knife has sliced open the ribs, revealing tender, juicy pink meat steaming gently under a sticky, shiny mahogany glaze. Horizontal golden sunbeams illuminate the food with a breathtaking warm glow. In the soft-focus garden background, the branded sauce jar stands in ambient light. 8k, ultra photorealistic.`,
      scenes: [
        {
          scene_number: 1,
          badge: "MANDATORY HOOK",
          title_vi: "Cảnh 1: Outdoor BBQ Hook (Tay Mở Thùng Carton Bên Lò Than Sân Vườn)",
          description_vi: "Chiếc thùng carton kraft đóng kín dán băng dính trên bàn gỗ tuyết tùng mộc mạc ngoài sân vườn lúc hoàng hôn, đôi tay mở tung nắp thùng hé lộ các hũ Sốt Gà Chiên Nước Mắm bên cạnh đĩa sườn và xiên thịt tươi rói dưới vệt nắng chiều rọi ngang.",
          camera_angle: "Góc nghiêng 35 độ cận trung (Medium Cinematic 50mm)",
          lighting: "Ánh nắng chiều hoàng hôn rực rỡ rọi ngang (Warm Golden Hour Sunset Rays)",
          image_prompt_gpt: "A single standalone, individual commercial product photograph (NOT a collage, NOT a split screen, NOT a multi-panel grid). A single coherent shot showing clean energetic hands actively unfolding the top flaps of a closed tape-sealed brown kraft corrugated delivery carton box to reveal glass jars of Sốt Gà Chiên Nước Mắm inside. The box rests on a weathered rustic cedar picnic table in a lush backyard garden. Warm horizontal golden hour sunset sunbeams filter through tree branches, creating glowing lens flares and dappled light. Commercial product photography, 8k resolution.",
          image_prompt_gemini: "Hyper-realistic commercial product photography of hands opening a closed kraft delivery carton on a rustic cedar picnic table in backyard garden, revealing jars of BBQ glaze sauce, warm sunset golden hour lighting.",
          image_prompt_muse: "Commercial product showcase, clean hands opening a closed sealed kraft delivery box on rustic wood table during golden hour sunset, jars of savory marinade glaze, 8k Octane render.",
          image_prompt_midjourney: "Commercial product photography, hands unfolding flaps of a closed kraft carton on rustic outdoor table to reveal jars of sauce, golden hour sunbeams, backyard garden bokeh --ar 9:16 --v 6.1 --style raw",
          negative_prompt: "open box without hands, collage, grid, multi-panel, split screen, low resolution, blurry"
        },
        {
          scene_number: 2,
          badge: "BASTING ACTION",
          title_vi: "Cảnh 2: Chổi Silicon Quét Sốt Óng Ả Lên Dẻ Sườn & Xiên Gà",
          description_vi: "Đôi tay dùng chổi silicon nhúng đẫm hũ sốt gà chiên nước mắm, quét từng đường bóng mượt màu hổ phách nâu đỏ lên dẻ sườn heo và xiên gà tươi rói, lớp sốt bám đều óng ánh dưới nắng chiều.",
          camera_angle: "Cận cảnh bàn tay và cọ quét (Macro Basting 60mm)",
          lighting: "Ánh nắng hoàng hôn xiên ngang làm nổi bật từng vệt sốt bóng mịn",
          image_prompt_gpt: "A single standalone, individual commercial product photograph (NOT a collage, NOT a split screen, NOT a multi-panel grid). A single coherent shot of a silicone culinary basting brush generously slathering a thick, glossy amber fish sauce marinade glaze across raw, fresh pork ribs and chicken skewers. Glistening sauce coats every groove of the meat, catching warm sunset backlighting. Rustic wooden prep board, fresh rosemary sprigs, macro food photography.",
          image_prompt_gemini: "Photorealistic macro photography of basting brush coating pork ribs and chicken skewers with thick glossy amber BBQ glaze, warm sunset backlighting, fresh herbs.",
          image_prompt_muse: "Sensory BBQ culinary action shot, basting brush glazing raw ribs with rich mahogany sauce, warm horizontal sunset rays, 8k resolution.",
          image_prompt_midjourney: "Commercial food photography, basting brush slathering thick glossy amber glaze on ribs and chicken skewers, rustic cutting board, warm sunset rays --ar 9:16 --v 6.1 --style raw",
          negative_prompt: "collage, grid, multi-panel, split screen, dry brush, sloppy meat"
        },
        {
          scene_number: 3,
          badge: "CHARCOAL GRILL SIZZLE",
          title_vi: "Cảnh 3: Nướng Trên Vỉ Than Hồng Xèo Xèo Bốc Khói Thơm Nức",
          description_vi: "Đặt dẻ sườn và xiên gà lên vỉ nướng trên than hồng đỏ rực, mỡ và sốt nhỏ xuống than bốc lên làn khói thơm nức mũi, ngọn lửa đỏ liếm nhẹ làm viền thịt xèo xèo xém cạnh vàng ruộm.",
          camera_angle: "Góc ngang tầm mắt (Eye-Level Grill Action)",
          lighting: "Ánh than hồng đỏ rực từ bên dưới và khói lam mờ ảo",
          image_prompt_gpt: "A single standalone, individual commercial product photograph (NOT a collage, NOT a split screen, NOT a multi-panel grid). A single coherent shot showing glazed chicken skewers and pork ribs sizzling vigorously on a cast iron grill grate over glowing red-hot charcoal embers. Droplets of fat and sauce drip into the coals, creating aromatic wisps of white woodsmoke and small orange flame flare-ups. High shutter speed freezing smoke swirls and glowing embers.",
          image_prompt_gemini: "Hyper-realistic commercial action shot of ribs and skewers sizzling on charcoal grill, glowing red embers, white smoke rising, flame flare-ups, outdoor BBQ.",
          image_prompt_muse: "Sensory barbecue action photography, sizzling glazed meats on charcoal grill, glowing red coals, dramatic woodsmoke, 8k resolution.",
          image_prompt_midjourney: "Commercial food photography, sizzling ribs and skewers on cast iron grill over red hot charcoal, aromatic smoke swirls, glowing embers, sunset ambiance --ar 9:16 --v 6.1 --style raw",
          negative_prompt: "collage, grid, multi-panel, split screen, ash all over food, charred black"
        },
        {
          scene_number: 4,
          badge: "CARAMELIZED BARK",
          title_vi: "Cảnh 4: Phết Thêm Lớp Sốt Thứ Hai Bóng Lộn Caramel Hóa",
          description_vi: "Trong khi thịt đang xèo xèo trên than hồng, chổi tiếp tục quét lớp sốt thứ hai bóng lộn lên bề mặt, sốt sôi li ti sủi bọt caramel hóa tạo lớp vỏ ngoài cánh gián giòn thơm đẫm vị.",
          camera_angle: "Cực cận cảnh (Extreme Macro 100mm)",
          lighting: "Ánh lửa than hồng phản chiếu trên lớp sốt sôi sủi bọt",
          image_prompt_gpt: "A single standalone, individual commercial product photograph (NOT a collage, NOT a split screen, NOT a multi-panel grid). A single coherent shot of a basting brush reapplying a second layer of thick glistening sauce directly over the sizzling meats on the hot grill. The glaze bubbles and caramelizes instantly upon contact with the hot meat, forming a sticky, glossy mahogany bark with delicious charred grill marks. Intense sunset side lighting, extreme macro detail.",
          image_prompt_gemini: "Macro commercial food photography of basting brush glazing sizzling ribs on hot grill, sauce bubbling and caramelizing into glossy mahogany bark, grill marks.",
          image_prompt_muse: "Gourmet BBQ photography, applying second glaze over sizzling ribs on charcoal grill, caramelized glossy bark, intense specular highlights, Octane 8k.",
          image_prompt_midjourney: "Extreme close-up macro food commercial, basting brush glazing sizzling ribs, bubbling caramelized sauce, charred grill marks, glowing embers --ar 9:16 --v 6.1 --style raw",
          negative_prompt: "collage, grid, multi-panel, split screen, burnt crust, dry surface"
        },
        {
          scene_number: 5,
          badge: "HERO SHOT",
          title_vi: "Cảnh 5: Thành Phẩm Dẻ Sườn Nướng BBQ Óng Ả Mọng Nước (Hero Shot)",
          description_vi: "Dĩa sườn nướng BBQ và xiên gà nướng vàng nâu cánh gián bóng lộn trên thớt gỗ mộc mạc, dao sắc cắt đôi dẻ sườn để lộ thớ thịt mềm ngọt mọng nước (juicy) bốc khói ngập tràn dưới ánh hoàng hôn rực rỡ.",
          camera_angle: "Góc quay tĩnh tuyệt đẹp (Hero Glamour Shot)",
          lighting: "Ánh nắng vàng hoàng hôn rực rỡ rọi xiên, hậu cảnh sân vườn mờ ảo",
          image_prompt_gpt: "A single standalone, individual commercial hero glamour photograph (NOT a collage, NOT a split screen, NOT a multi-panel grid). A single complete hero shot of glistening, caramelized BBQ ribs and glazed chicken skewers served on a rustic wooden carving board outdoors during sunset. A sharp carving knife has sliced open the ribs, revealing tender, juicy pink meat steaming gently under a sticky, shiny mahogany glaze. Horizontal golden sunbeams illuminate the food with a breathtaking warm glow. In the soft-focus garden background, the branded sauce jar stands in ambient light. 8k, ultra photorealistic.",
          image_prompt_gemini: "Hyper-realistic commercial hero food photography of caramelized BBQ ribs sliced open, juicy steaming tender meat, chicken skewers, rustic cutting board, golden sunset light, 8k resolution.",
          image_prompt_muse: "Magazine cover commercial BBQ hero shot, glistening glazed ribs with tender juicy interior, rustic wood platter, golden hour sunbeams, Octane render 8k.",
          image_prompt_midjourney: "Commercial hero food photography, mouthwatering caramelized BBQ ribs sliced open showing juicy meat, chicken skewers, rustic wood board, golden sunset rays, 85mm f/1.4 lens --ar 9:16 --v 6.1 --style raw",
          negative_prompt: "collage, grid, multi-panel, split screen, dry overcooked meat, low resolution"
        }
      ],
      video_prompt: {
        duration_seconds: 15,
        aspect_ratio: "9:16",
        camera_direction: "Nhịp điệu thư giãn ngoài trời, ánh sáng hoàng hôn ấm áp, macro cận cảnh ngọn lửa và làn khói thơm",
        sound_design_asmr: "Tiếng mở nắp thùng carton trên bàn gỗ thô, tiếng quét cọ sột soạt, tiếng mỡ nhỏ vào than bốc khói xèo xèo và tiếng dao cắt xuyên qua thớ sườn mọng nước giòn ngọt",
        video_prompt_veo3: "Cinematic commercial video 4K 60fps golden hour sunset, [00:00 - 00:03] Slow-motion dolly zoom onto a closed, sealed kraft delivery carton on a rustic cedar picnic table in a backyard garden, clean hands unfold flaps to reveal jars of sauce. [00:03 - 00:07] Basting brush slathers glossy amber glaze across fresh ribs, as they sizzle over red-hot charcoal embers with white smoke plumes. [00:07 - 00:11] Extreme macro of second glaze layer bubbling into a caramelized mahogany crust over glowing coals. [00:11 - 00:15] Breathtaking static hero shot of sliced juicy ribs on rustic carving board under warm sunset rays.",
        video_prompt_grok: "Dynamic outdoor BBQ commercial, warm sunset energy. Snap zoom onto closed kraft delivery box on wooden picnic table as hands open flaps to reveal sauce jars. Fast-cut action of basting glaze, charcoal smoke flare-up, sizzling caramelization, concluding with high-impact hero shot of succulent juicy ribs.",
        video_prompt_muse: "Ultra-smooth fluid transitions, golden hour sunset aesthetic. Unboxing sequence starting on a closed sealed kraft carton on cedar table, hands revealing sauce jars, sensory basting and charcoal sizzle ASMR, ending on irresistible hero platter of glistening BBQ ribs.",
        video_prompt_sedan: "One coherent vertical commercial with a continuous, controlled dolly-and-orbit path across a weathered rustic cedar picnic table. Start on a closed, sealed kraft delivery carton box, where clean hands smoothly pull open the top flaps to dramatically reveal glass jars of Sốt Gà Chiên Nước Mắm; travel to one opened jar, follow the basting brush over sizzling ribs on charcoal grill, follow the rising smoke swirls, and finish in an orbit around the sliced juicy ribs on a rustic board and jar. Keep garden foliage softly blurred, sunset physics realistic.",
        master_ai_video_prompt: "A cinematic 15-second outdoor BBQ commercial video starting on a closed kraft delivery carton on a rustic cedar table at sunset where hands open the flaps to reveal sauce jars. Transitions show basting thick glaze, sizzling on hot charcoal with aromatic smoke, caramelizing into mahogany bark, and ends on a stunning hero shot of juicy sliced ribs in golden sunbeams.",
        timeline: [
          { time_range: "00:00 - 00:03", shot_name: "Shot 1: Sunset Garden Hook", action: "Thùng carton đóng kín trên bàn gỗ tuyết tùng ngoài sân vườn, đôi tay mở nắp thùng hé lộ hũ sốt bên cạnh khay thịt nướng dưới nắng chiều rọi ngang.", camera_motion: "Dolly push-in mượt mà trong nắng hoàng hôn", audio_cue: "Tiếng mở nắp thùng carton ASMR ngoài trời thư thái" },
          { time_range: "00:03 - 00:06", shot_name: "Shot 2: Basting Glaze Action", action: "Chổi silicon quét đều lớp sốt màu hổ phách óng ánh lên dẻ sườn và xiên gà.", camera_motion: "Cận cảnh cọ quét từng đường mượt mà", audio_cue: "Tiếng quét cọ sột soạt ẩm ướt đầy cuốn hút" },
          { time_range: "00:06 - 00:09", shot_name: "Shot 3: Charcoal Grill Smoke", action: "Thịt nướng xèo xèo trên than hồng đỏ rực, mỡ nhỏ xuống than bốc làn khói thơm nức.", camera_motion: "Góc ngang bắt ngọn lửa than và làn khói", audio_cue: "Tiếng xèo xèo than hồng và khói bốc ngùn ngụt" },
          { time_range: "00:09 - 00:12", shot_name: "Shot 4: Caramelized Bark Sizzle", action: "Quét lớp sốt thứ hai trực tiếp trên than hồng, sốt sôi sủi bọt caramel hóa giòn thơm.", camera_motion: "Extreme macro cận cảnh bề mặt thịt", audio_cue: "Tiếng sốt sôi li ti sủi bọt caramel cực đã tai" },
          { time_range: "00:12 - 00:15", shot_name: "Shot 5: The Sunset BBQ Payoff", action: "Dẻ sườn nướng BBQ mọng nước cắt đôi để lộ thớ thịt ngọt mềm bốc khói dưới hoàng hôn.", camera_motion: "Góc quay tĩnh nghệ thuật với vệt nắng vàng", audio_cue: "Âm thanh dao cắt giòn ngọt kết thúc thỏa mãn" }
        ]
      }
    },
    {
      video_id: 3,
      title_vi: "Kịch Bản 3: Bò Lúc Lắc Xào Sốt Chảo Lửa Wok-Hei Bùng Cháy (Bếp Nhà Hàng Gourmet Đá Đen)",
      concept_vibe: "Fine-Dining Flambé & High-Heat Gourmet Wok-Glazed Beef",
      background_applied: {
        theme_name: "Bếp Gourmet Nhà Hàng Michelin (Luxury Black Slate Kitchen)",
        surface_material: "Mặt đảo bếp đá đen Granite bóng bẩy (Polished Black Slate Granite)",
        environment_setting: "Không gian bếp mở nhà hàng fine-dining sang trọng, chảo đồng mờ ảo ở hậu cảnh, ly rượu vang pha lê",
        lighting_style: "Ánh đèn rọi Spotlight từ trên cao rọi xiên kịch tính (Dramatic Overhead Spotlight 3200K), ánh sáng vàng hổ phách"
      },
      master_image_prompt_gpt: `[DIRECTIVE FOR CHATGPT / DALL-E 3: You are generating commercial hero photographs for an advertising campaign.
CRITICAL RULE: Each scene below MUST be generated as ONE SINGLE STANDALONE, INDIVIDUAL FULL-FRAME PHOTOGRAPH (9:16 vertical).
Strictly prohibited: Absolutely NO collages, NO multi-panel grids, NO comic strips, NO split screens, NO before/after split frames, NO storyboard panels. Every generation must be an independent single-frame photograph.
VIDEO THEME: Bếp Gourmet Nhà Hàng Michelin (Polished Black Slate Granite Chef's Counter)
LIGHTING: Dramatic overhead tungsten spotlight with warm amber specular reflections]

=== CẢNH 1: TAY ĐẦU BẾP MỞ THÙNG CARTON TRÊN ĐẢO ĐÁ GRANITE ĐEN (VIRAL HOOK BẮT BUỘC) ===
Mô tả tiếng Việt: Đôi tay đeo găng đen đầu bếp mở bung nắp chiếc thùng carton đóng kín trên mặt đảo bếp đá granite đen tuyền bóng bẩy, hé lộ bên trong các hũ Sốt Gà Chiên Nước Mắm cao cấp, ánh đèn rọi spotlight từ trên cao tạo vệt phản chiếu hổ phách sang trọng.
Prompt cho ChatGPT / DALL-E 3: A single standalone, individual commercial product photograph (NOT a collage, NOT a split screen, NOT a multi-panel grid). A single coherent shot showing a chef's hands in sleek black culinary gloves actively opening the top flaps of a closed tape-sealed brown kraft corrugated delivery carton box to reveal premium glass jars of Sốt Gà Chiên Nước Mắm neatly stacked inside. The box rests on a luxurious polished black slate granite chef's island counter. Dramatic overhead tungsten spotlight creates warm amber specular reflections on the dark stone. Blurred high-end Michelin restaurant open kitchen with hanging copper pans in dark atmospheric bokeh background. 85mm lens, f/2.0, 8k resolution.

=== CẢNH 2: ÁP CHẢO THỊT BÒ THĂN VUÔNG VẮN VỚI ỚT CHUÔNG BA MÀU ===
Mô tả tiếng Việt: Những khối thịt bò thăn thái vuông quân cờ áp chảo trên lửa cực lớn xèo xèo cùng ớt chuông đỏ vàng và hành tây, mặt thịt xém cạnh thơm lừng, bốc làn khói mờ ảo dưới ánh đèn rọi.
Prompt cho ChatGPT / DALL-E 3: A single standalone, individual commercial product photograph (NOT a collage, NOT a split screen, NOT a multi-panel grid). A single coherent shot of tender beef tenderloin cubes searing at extreme high heat inside a heavy black cast iron skillet. Plump cubes of meat sizzle alongside vibrant red and yellow bell peppers and onions, their edges caramelized and crusty. Swirling backlit cooking steam rises under intense overhead spotlight beams. Fine-dining commercial food photography.

=== CẢNH 3: RƯỚI SỐT VÀO CHẢO BÙNG LỬA FLAMBÉ WOK-HEI KỊCH TÍNH ===
Mô tả tiếng Việt: Đầu bếp rưới trực tiếp dòng sốt nâu đỏ sánh mịn vào lòng chảo, ngọn lửa cam vàng bùng lên (flambé wok-hei) cuồn cuộn bao trùm chảo, soi sáng khuôn mặt đầu bếp và không gian bếp tối sang trọng.
Prompt cho ChatGPT / DALL-E 3: A single standalone, individual commercial product photograph (NOT a collage, NOT a split screen, NOT a multi-panel grid). A single coherent shot capturing a dramatic high-flame flambé wok-hei burst: as rich savory fish sauce glaze hits the smoking skillet, a spectacular orange flame erupts upward around the pan, illuminating the chef in a black uniform and casting vivid amber firelight across the dark slate kitchen. Flying sparks and glowing glaze drops frozen in mid-air. High shutter speed commercial action photography.

=== CẢNH 4: XÓC CHẢO ĐIỆU NGHỆ ÁO LỚP SỐT NÂU ĐỎ BÓNG LOÁNG ===
Mô tả tiếng Việt: Đầu bếp xóc chảo điệu nghệ, từng viên bò bóng bẩy nhào lộn trên không trung bọc đều lớp sốt nâu caramel óng ả bắt ánh sáng spotlight lấp lánh như gương, rắc tiêu đen thơm lừng.
Prompt cho ChatGPT / DALL-E 3: A single standalone, individual commercial product photograph (NOT a collage, NOT a split screen, NOT a multi-panel grid). A single coherent shot of a professional chef tossing the skillet with precision: glistening caramelized beef cubes and colorful peppers airborne above the pan. Every cube of beef is cloaked in a thick, mirror-like glossy savory glaze speckled with cracked black pepper. Specular amber highlights sparkle on the sauce and the polished black granite island.

=== CẢNH 5: THÀNH PHẨM ĐĨA BÒ LÚC LẮC FINE-DINING THƯỢNG HẠNG (HERO SHOT) ===
Mô tả tiếng Việt: Đĩa bò lúc lắc thượng hạng hoàn mỹ trên đĩa gốm đen nhám cao cấp, từng viên thịt bóng mượt mọng nước điểm xuyết tiêu xanh và xà lách tươi giòn, ly rượu vang pha lê lấp lánh phía xa trên đảo đá granite đen.
Prompt cho ChatGPT / DALL-E 3: A single standalone, individual commercial hero glamour photograph (NOT a collage, NOT a split screen, NOT a multi-panel grid). A single complete hero shot of gourmet Vietnamese Shaking Beef (Bò Lúc Lắc) served on a luxury matte-black ceramic plate on the polished black slate granite island. The glazed beef cubes are glistening with a rich amber-brown mahogany sheen, surrounded by charred baby onions, watercress, and fresh green peppercorns. In the dark atmospheric background, a crystal red wine glass catches dramatic warm amber rim lighting. Michelin-star culinary magazine cover aesthetic, 8k resolution.`,
      scenes: [
        {
          scene_number: 1,
          badge: "MANDATORY HOOK",
          title_vi: "Cảnh 1: Michelin Unboxing (Tay Đeo Găng Mở Thùng Carton Trên Đảo Đá Đen)",
          description_vi: "Đôi tay đeo găng đen đầu bếp mở bung nắp chiếc thùng carton đóng kín trên mặt đảo bếp đá granite đen tuyền bóng bẩy, hé lộ bên trong các hũ Sốt Gà Chiên Nước Mắm cao cấp, ánh đèn rọi spotlight từ trên cao tạo vệt phản chiếu hổ phách sang trọng.",
          camera_angle: "Góc nghiêng 35 độ cận trung (Medium Cinematic 50mm)",
          lighting: "Đèn rọi spotlight vàng 3200K từ trên cao, tương phản cao, đổ bóng kịch tính",
          image_prompt_gpt: "A single standalone, individual commercial product photograph (NOT a collage, NOT a split screen, NOT a multi-panel grid). A single coherent shot showing a chef's hands in sleek black culinary gloves actively opening the top flaps of a closed tape-sealed brown kraft corrugated delivery carton box to reveal premium glass jars of Sốt Gà Chiên Nước Mắm neatly stacked inside. The box rests on a luxurious polished black slate granite chef's island counter. Dramatic overhead tungsten spotlight creates warm amber specular reflections on the dark stone. Blurred high-end Michelin restaurant open kitchen with hanging copper pans in dark atmospheric bokeh background. 85mm lens, f/2.0, 8k resolution.",
          image_prompt_gemini: "Hyper-realistic commercial food photography of chef hands in black gloves opening the top flaps of a closed brown kraft delivery carton on a black granite chef's island counter to reveal jars of sauce, dramatic overhead spotlight, blurred restaurant kitchen background, 8k resolution.",
          image_prompt_muse: "Award-winning commercial product showcase, Octane render 8k of chef hands in black gloves opening a closed sealed kraft box on polished black slate kitchen island, dramatically revealing packed sauce jars, moody dramatic lighting, amber specular highlights.",
          image_prompt_midjourney: "Commercial food photography, chef hands unfolding flaps of a closed brown kraft carton on black slate granite kitchen island to reveal sauce jars inside, dramatic spotlight chiaroscuro, dark luxury kitchen bokeh, 85mm f/1.4 --ar 9:16 --v 6.1 --style raw",
          negative_prompt: "open box without hands, collage, grid, multi-panel, split screen, low resolution, dirty surface, blurry"
        },
        {
          scene_number: 2,
          badge: "HIGH-HEAT SEARING",
          title_vi: "Cảnh 2: Áp Chảo Thịt Bò Thăn Vuông Vắn Với Ớt Chuông",
          description_vi: "Những khối thịt bò thăn thái vuông quân cờ áp chảo trên lửa cực lớn xèo xèo cùng ớt chuông đỏ vàng và hành tây, mặt thịt xém cạnh thơm lừng, bốc làn khói mờ ảo dưới ánh đèn rọi.",
          camera_angle: "Cận cảnh macro góc 45 độ (Macro 100mm)",
          lighting: "Ánh sáng rọi xiên kịch tính tôn vinh bề mặt xém cạnh của từng thớ thịt bò",
          image_prompt_gpt: "A single standalone, individual commercial product photograph (NOT a collage, NOT a split screen, NOT a multi-panel grid). A single coherent shot of tender beef tenderloin cubes searing at extreme high heat inside a heavy black cast iron skillet. Plump cubes of meat sizzle alongside vibrant red and yellow bell peppers and onions, their edges caramelized and crusty. Swirling backlit cooking steam rises under intense overhead spotlight beams. Fine-dining commercial food photography.",
          image_prompt_gemini: "Photorealistic macro photography of beef tenderloin cubes searing in hot cast iron skillet with bell peppers, charred edges, rising steam, dramatic restaurant lighting.",
          image_prompt_muse: "Commercial culinary food photography, searing beef cubes in hot skillet, sizzling sound and texture, black slate background, sharp macro focus, Octane 8k render.",
          image_prompt_midjourney: "Commercial food photography, beef cubes searing in hot cast iron skillet, bell peppers, rising steam, dark luxury kitchen, dramatic side lighting, Hasselblad 100mm macro --ar 9:16 --v 6.1 --style raw",
          negative_prompt: "collage, grid, multi-panel, split screen, ugly meat, blurry pan"
        },
        {
          scene_number: 3,
          badge: "FLAMBÉ WOK-HEI BURST",
          title_vi: "Cảnh 3: Rưới Sốt Vào Chảo Bùng Lửa Flambé Wok-Hei Kịch Tính",
          description_vi: "Đầu bếp rưới trực tiếp dòng sốt nâu đỏ sánh mịn vào lòng chảo, ngọn lửa cam vàng bùng lên (flambé wok-hei) cuồn cuộn bao trùm chảo, soi sáng khuôn mặt đầu bếp và không gian bếp tối sang trọng.",
          camera_angle: "Góc ngang 0 độ ngang tầm mắt (Eye-Level Action Shot)",
          lighting: "Ngọn lửa bùng cháy rực rỡ soi sáng nền bếp tối chiaroscuro",
          image_prompt_gpt: "A single standalone, individual commercial product photograph (NOT a collage, NOT a split screen, NOT a multi-panel grid). A single coherent shot capturing a dramatic high-flame flambé wok-hei burst: as rich savory fish sauce glaze hits the smoking skillet, a spectacular orange flame erupts upward around the pan, illuminating the chef in a black uniform and casting vivid amber firelight across the dark slate kitchen. Flying sparks and glowing glaze drops frozen in mid-air. High shutter speed commercial action photography.",
          image_prompt_gemini: "Hyper-realistic commercial action shot of dramatic flambé fire erupting from skillet as sauce is poured onto beef, high speed freeze of fire sparks, dark moody restaurant kitchen.",
          image_prompt_muse: "Dramatic commercial food action photography, erupting orange flame burst in skillet, flying sauce sparks, dark luxury restaurant setting, 8k resolution, raytracing.",
          image_prompt_midjourney: "Commercial food photography, dramatic flambé fire explosion in pan with beef and sauce, illuminated sparks against black background, high speed flame freeze --ar 9:16 --v 6.1 --style raw",
          negative_prompt: "collage, grid, multi-panel, split screen, low quality, burnt smoke"
        },
        {
          scene_number: 4,
          badge: "CHEF SKILLET TOSS",
          title_vi: "Cảnh 4: Xóc Chảo Điệu Nghệ Áo Lớp Sốt Nâu Đỏ Bóng Loáng",
          description_vi: "Đầu bếp xóc chảo điệu nghệ, từng viên bò bóng bẩy nhào lộn trên không trung bọc đều lớp sốt nâu caramel óng ả bắt ánh sáng spotlight lấp lánh như gương, rắc tiêu đen thơm lừng.",
          camera_angle: "Cực cận cảnh hành động (Dynamic Airborne Toss 85mm)",
          lighting: "Ánh sáng spotlight vàng hổ phách phản chiếu lấp lánh trên từng viên bò",
          image_prompt_gpt: "A single standalone, individual commercial product photograph (NOT a collage, NOT a split screen, NOT a multi-panel grid). A single coherent shot of a professional chef tossing the skillet with precision: glistening caramelized beef cubes and colorful peppers airborne above the pan. Every cube of beef is cloaked in a thick, mirror-like glossy savory glaze speckled with cracked black pepper. Specular amber highlights sparkle on the sauce and the polished black granite island.",
          image_prompt_gemini: "Macro commercial food photography of airborne glazed beef cubes tossed by chef, thick glossy savory coat, cracked black pepper, black slate granite background.",
          image_prompt_muse: "Gourmet culinary photography, glossy beef cubes coated in rich savory glaze tossed mid-air, dramatic reflections on dark granite, Octane 8k render.",
          image_prompt_midjourney: "Macro commercial photography, chef tossing glistening glazed beef cubes and bell peppers in air, black slate background, dramatic amber rim light --ar 9:16 --v 6.1 --style raw",
          negative_prompt: "collage, grid, multi-panel, split screen, messy blur, dropped food"
        },
        {
          scene_number: 5,
          badge: "HERO SHOT",
          title_vi: "Cảnh 5: Thành Phẩm Đĩa Bò Lúc Lắc Fine-Dining Thượng Hạng (Hero Shot)",
          description_vi: "Đĩa bò lúc lắc thượng hạng hoàn mỹ trên đĩa gốm đen nhám cao cấp, từng viên thịt bóng mượt mọng nước điểm xuyết tiêu xanh và xà lách tươi giòn, ly rượu vang pha lê lấp lánh phía xa trên đảo đá granite đen.",
          camera_angle: "Góc quay tĩnh tuyệt đẹp (Hero Glamour Shot)",
          lighting: "Ánh sáng spotlight vàng hổ phách, hậu cảnh bếp mờ ảo sang trọng",
          image_prompt_gpt: "A single standalone, individual commercial hero glamour photograph (NOT a collage, NOT a split screen, NOT a multi-panel grid). A single complete hero shot of gourmet Vietnamese Shaking Beef (Bò Lúc Lắc) served on a luxury matte-black ceramic plate on the polished black slate granite island. The glazed beef cubes are glistening with a rich amber-brown mahogany sheen, surrounded by charred baby onions, watercress, and fresh green peppercorns. In the dark atmospheric background, a crystal red wine glass catches dramatic warm amber rim lighting. Michelin-star culinary magazine cover aesthetic, 8k resolution.",
          image_prompt_gemini: "Hyper-realistic commercial hero food photography of gourmet Shaking Beef on matte black ceramic plate, glistening glazed tender beef cubes, green peppercorns, black granite counter, Michelin dining ambiance.",
          image_prompt_muse: "Michelin gourmet magazine cover, exquisite glazed shaking beef cubes on black slate island, luxury restaurant bokeh, Octane render 8k.",
          image_prompt_midjourney: "Award-winning commercial hero food photography, gourmet Shaking Beef plate on black slate granite counter, crystal wine glass in soft bokeh, dramatic amber lighting, 85mm f/1.4 --ar 9:16 --v 6.1 --style raw",
          negative_prompt: "collage, grid, multi-panel, split screen, low resolution, cheap look"
        }
      ],
      video_prompt: {
        duration_seconds: 15,
        aspect_ratio: "9:16",
        camera_direction: "Chuyển động máy quay mượt mà, kỹ thuật cao, ánh sáng tối tương phản cao (chiaroscuro) phong cách Michelin",
        sound_design_asmr: "Tiếng mở nắp thùng carton trên mặt đá cốp nhẹ, tiếng thịt bò áp chảo xèo xèo mãnh liệt, tiếng ngọn lửa bùng cháy phù phù và tiếng xóc chảo kim loại nhịp nhàng",
        video_prompt_veo3: "Cinematic commercial video 4K 60fps chiaroscuro, [00:00 - 00:03] Slow-motion dolly zoom starting on a closed, sealed kraft delivery carton on a polished black granite chef's island under dramatic overhead spotlight, as black-gloved chef hands smoothly unfold the flaps to reveal jars of Sốt Gà Chiên Nước Mắm. [00:03 - 00:07] Tender beef cubes sear in hot cast iron skillet, as sauce pours in creating a spectacular high-flame flambé burst. [00:07 - 00:11] Extreme macro of chef tossing the skillet, coating airborne beef cubes in a thick glossy mahogany glaze. [00:11 - 00:15] Luxurious hero static shot of plated Shaking Beef on matte black ceramic plate with crystal wine glass in dark bokeh.",
        video_prompt_grok: "High-contrast luxury commercial video, moody Michelin kitchen atmosphere. Dynamic snap-zoom onto a closed sealed kraft carton on polished black granite island as chef hands pull open flaps to reveal sauce jars under dramatic tungsten spotlight. Fast cuts of searing beef, roaring flambé flame burst, airborne skillet toss, ending on high-impact luxury hero shot with glazed beef cubes.",
        video_prompt_muse: "Ultra-smooth fluid transitions, dark luxury aesthetic. Macro unboxing starting on a closed sealed kraft carton on black slate counter, hands unfolding flaps to reveal sauce jars under amber spotlight reflections, chef flambé wok-hei action, concluding with gorgeous hero shot of gourmet glazed beef.",
        video_prompt_sedan: "One coherent vertical commercial with a continuous, controlled dolly-and-orbit path across a polished black slate granite chef's island. Start on a closed, sealed kraft delivery carton box, where clean black-gloved chef hands smoothly pull open the top flaps to dramatically reveal glass jars of Sốt Gà Chiên Nước Mắm; travel to one opened jar, follow the sauce into a smoking skillet creating a dramatic flambé flame burst, follow the chef tossing glazed beef cubes airborne, and finish in an orbit around the plated gourmet beef and jar. Keep copper cookware softly blurred, amber spotlight physics consistent, fire reflections stable.",
        master_ai_video_prompt: "A cinematic 15-second dark luxury commercial video starting on a closed kraft delivery carton on a polished black slate granite island under a dramatic overhead spotlight, where black-gloved chef hands smoothly open the flaps to reveal sauce jars. Smooth high-end transitions show searing tender beef, pouring sauce with a dramatic flambé wok-hei flame burst, tossing glazed beef in the pan, and concludes on a glamorous Michelin-style hero shot of Shaking Beef.",
        timeline: [
          { time_range: "00:00 - 00:03", shot_name: "Shot 1: The Dark Granite Hook", action: "Thùng carton đóng kín trên mặt đảo bếp đá granite đen, đôi tay đeo găng đầu bếp dứt khoát mở nắp thùng hé lộ các hũ sốt dưới ánh đèn spotlight.", camera_motion: "Dolly push-in chậm vào thùng carton khi đôi tay mở nắp", audio_cue: "Tiếng mở nắp thùng carton cốp nhẹ trên mặt đá ASMR dứt khoát" },
          { time_range: "00:03 - 00:06", shot_name: "Shot 2: High-Heat Beef Sear", action: "Những viên bò thăn thái vuông áp chảo xèo xèo cùng ớt chuông ba màu và hành tây.", camera_motion: "Cận cảnh bàn tay chuyển động chuẩn xác", audio_cue: "Tiếng thịt bò áp chảo xèo xèo thơm lừng" },
          { time_range: "00:06 - 00:09", shot_name: "Shot 3: Flambé Wok-Hei Burst", action: "Rưới sốt vào chảo bùng lên ngọn lửa flambé cam vàng cuộn xoáy kịch tính.", camera_motion: "Góc ngang 0 độ bắt ngọn lửa bùng cháy", audio_cue: "Tiếng lửa bùng phù phù và tiếng xèo xèo mãnh liệt" },
          { time_range: "00:09 - 00:12", shot_name: "Shot 4: Precision Pan Toss", action: "Đầu bếp xóc chảo điệu nghệ, từng viên bò bóng bẩy nhào lộn áo đều lớp sốt nâu caramel.", camera_motion: "Extreme macro cận cảnh đảo thịt", audio_cue: "Tiếng đảo chảo lách cách và tiêu đen giòn rụm" },
          { time_range: "00:12 - 00:15", shot_name: "Shot 5: The Michelin Payoff", action: "Đĩa bò lúc lắc hoàn thiện Michelin trên đĩa gốm đen nhám sang trọng, ly rượu vang mờ ảo phía xa.", camera_motion: "Góc quay tĩnh nghệ thuật, ánh sáng hổ phách", audio_cue: "Âm thanh hòa tấu sang trọng kết thúc thỏa mãn" }
        ]
      }
    }
  ]
};

module.exports = {
  SAMPLE_NOODLES_DATA,
  SAMPLE_SAUCE_DATA
};
