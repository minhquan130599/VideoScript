// creative_pools.js - Randomized creative pools (backgrounds, unboxing hooks, story structures, camera styles)
// with a persisted anti-repeat history so every run / every product gets fresh combinations.

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const HISTORY_FILE = path.join(__dirname, '.creative_history.json');
const GLOBAL_HISTORY_SIZE = 18; // remember the last N theme/hook ids across all runs
const PRODUCT_HISTORY_SIZE = 60; // remember the last N theme ids per product (> product background set size, so rotation covers all)
const PRODUCT_PROFILE_MAX_BACKGROUNDS = 54; // cap of AI-generated backgrounds kept per product
const MAX_PROFILES = 100;

// ---------------------------------------------------------------------------
// BACKGROUND POOL (tags: food, beverage, beauty, tech, home, fashion, generic)
// ---------------------------------------------------------------------------
const T = (id, tags, theme_name, surface_material, environment_setting, lighting_style, prompt_descriptor) =>
  ({ id, tags, theme_name, surface_material, environment_setting, lighting_style, prompt_descriptor });

const BACKGROUND_POOL = [
  T('gourmet_slate', ['food', 'beverage'], 'Bếp Gourmet Đá Đen (Luxury Black Slate Kitchen)',
    'Mặt đảo bếp đá đen granite bóng (Polished Black Slate Granite)',
    'Bếp mở nhà hàng cao cấp, nồi chảo đồng treo mờ phía sau',
    'Spotlight rọi xiên từ trên cao, vàng hổ phách',
    'a polished black slate granite chef island, dramatic overhead tungsten spotlight with warm amber reflections, blurred upscale open kitchen with hanging copper pans in bokeh'),
  T('sunset_garden', ['food', 'beverage', 'home', 'generic'], 'Sân Vườn Hoàng Hôn (Sunset Garden)',
    'Bàn gỗ tuyết tùng thô ngoài trời (Weathered Cedar Picnic Table)',
    'Sân vườn xanh mướt lúc chiều tà, khói lò nướng thoang thoảng',
    'Nắng hoàng hôn rọi ngang xuyên qua tán lá',
    'a weathered cedar picnic table in a lush backyard at golden hour, horizontal warm sunbeams through leaves with dappled light, faint grill smoke drifting'),
  T('night_market', ['food', 'beverage'], 'Phố Ẩm Thực Đêm (Night Street Market)',
    'Quầy inox sáng loáng (Stainless Steel Street Counter)',
    'Phố ẩm thực đêm náo nhiệt, rổ ớt và rau thơm, chảo wok bốc khói',
    'Đèn lồng và neon đỏ - vàng phản chiếu',
    'a gleaming stainless steel street food counter, red and amber neon lantern reflections, baskets of fresh herbs and chilis, lively night market with steam haze'),
  T('terrazzo_studio', ['food', 'beauty', 'tech', 'fashion', 'generic'], 'Studio Tối Giản Terrazzo (Minimal Terrazzo)',
    'Bục đá terrazzo màu kem (Cream Terrazzo Pedestal)',
    'Studio tối giản, gốm mộc, bình hoa khô',
    'Ánh sáng ban ngày tản đều high-key, bóng mềm',
    'a minimalist studio with a matte cream terrazzo pedestal, soft diffused high-key daylight, organic ceramics and dried flowers, serene modern aesthetic'),
  T('family_mahogany', ['food', 'home'], 'Phòng Ăn Gia Đình Ấm Cúng (Warm Family Dining)',
    'Bàn ăn gỗ gụ nâu trầm (Dark Mahogany Dining Table)',
    'Phòng ăn gia đình, chén dĩa sứ hoa văn, không khí sum vầy',
    'Đèn thả trần vàng ấm',
    'a cozy family dining room with a dark mahogany table, warm tungsten pendant light, patterned porcelain bowls, wholesome gathering atmosphere'),
  T('carrara_gold', ['beauty', 'fashion', 'beverage', 'generic'], 'Đá Carrara & Vàng Kim (Luxury Carrara)',
    'Mặt đá cẩm thạch Carrara vân vàng (Carrara Marble, Gold Veins)',
    'Showroom xa xỉ, viền kim loại champagne chải xước',
    'Ánh sáng beauty thương mại tản mềm',
    'a polished Italian Carrara marble countertop with gold veining, brushed champagne gold accents, soft diffused commercial beauty lighting'),
  T('scandi_oak', ['food', 'home', 'tech', 'generic'], 'Gỗ Sồi Bắc Âu Nắng Xiên (Scandinavian Oak)',
    'Bàn gỗ sồi sáng màu (Light Oak Table)',
    'Góc Scandinavian, rèm lá sách, cây trầu bà, sách nghệ thuật',
    'Nắng sớm xiên qua rèm tạo vệt sọc',
    'a light oak Scandinavian table, warm morning sun through venetian blinds casting striped shadows, pothos plant and art books, hygge mood'),
  T('rustic_farmhouse', ['food', 'home'], 'Bếp Nông Trại Mộc (Rustic Farmhouse)',
    'Thớt gỗ lớn trên bàn gỗ thông cũ (Reclaimed Pine & Butcher Block)',
    'Bếp nông trại, rổ mây, bó thảo mộc treo, lọ gia vị thủy tinh',
    'Nắng cửa sổ bên trái mềm, bóng tối sâu kiểu tranh sơn dầu',
    'a reclaimed pine farmhouse table with a butcher block, wicker baskets and hanging dried herbs, soft side window light with painterly deep shadows'),
  T('beach_picnic', ['food', 'beverage', 'beauty', 'fashion'], 'Picnic Bãi Biển (Beach Picnic)',
    'Khăn picnic kẻ caro trên cát trắng (Gingham Blanket on White Sand)',
    'Bãi biển nhiệt đới, sóng xanh, giỏ mây, ô dù',
    'Nắng trưa rực rỡ, phản chiếu nước lấp lánh',
    'a gingham picnic blanket on white sand, turquoise waves behind, wicker basket and sun umbrella, bright midday sun with sparkling water glints'),
  T('camping_forest', ['food', 'beverage', 'tech', 'generic'], 'Cắm Trại Rừng Thông (Forest Camping)',
    'Bàn gấp gỗ cắm trại, bếp gas mini (Folding Camp Table)',
    'Rừng thông sương sớm, lều vải, đèn bão',
    'Nắng sớm xuyên sương tạo tia sáng (god rays)',
    'a wooden folding camp table in a misty pine forest, canvas tent and lantern nearby, early morning god rays cutting through fog'),
  T('korean_cafe', ['food', 'beverage', 'beauty', 'fashion'], 'Cafe Hàn Quốc Pastel (Seoul Cafe)',
    'Bàn tròn trắng mặt đá (White Round Stone Cafe Table)',
    'Quán cafe Seoul tối giản, ghế gỗ uốn cong, kính lớn nhìn ra phố',
    'Ánh sáng cửa kính lớn, tông sáng pastel',
    'a white round stone cafe table in a minimalist Seoul cafe, bentwood chairs, large windows onto a street, airy pastel daylight'),
  T('japandi_zen', ['food', 'beverage', 'beauty', 'home'], 'Japandi Thiền (Japandi Zen)',
    'Bàn gỗ sồi tự nhiên, gốm thô (Natural Oak & Raw Ceramics)',
    'Không gian wabi-sabi, cành khô ikebana, đèn lồng giấy',
    'Ánh sáng ban mai tản qua giấy shoji',
    'a Japandi wabi-sabi setting, natural oak table with raw ceramics, dried ikebana branch, soft morning light diffused through shoji paper'),
  T('industrial_loft', ['food', 'tech', 'fashion', 'generic'], 'Loft Công Nghiệp (Industrial Loft)',
    'Mặt bê tông mài (Polished Concrete Counter)',
    'Loft tường gạch thô, chi tiết thép đen',
    'Spotlight tungsten ấm, rim light kịch tính',
    'an industrial loft with a polished concrete counter, raw brick wall, matte black steel details, warm tungsten spotlight with moody rim light'),
  T('cyber_neon', ['tech', 'beverage', 'fashion', 'food'], 'Studio Neon Cyberpunk (Neon Studio)',
    'Mặt carbon đen mờ (Matte Black Carbon Surface)',
    'Studio tối tương lai, sương nhẹ, phản chiếu hologram',
    'Rim light neon cyan và tím',
    'a dark futuristic studio, matte black carbon surface, cyan and violet neon rim lights, light atmospheric haze and holographic reflections'),
  T('spa_bathroom', ['beauty', 'home'], 'Phòng Tắm Spa (Spa Bathroom)',
    'Kệ đá travertine cạnh bồn tắm (Travertine Ledge by Bathtub)',
    'Phòng tắm spa, khăn bông, cành bạch đàn, hơi nước nhẹ',
    'Ánh sáng tự nhiên dịu, hơi nước lơ lửng',
    'a travertine ledge beside a freestanding bathtub, fluffy towels and eucalyptus, gentle steam, soft natural window light'),
  T('vanity_morning', ['beauty', 'fashion'], 'Bàn Trang Điểm Buổi Sáng (Morning Vanity)',
    'Bàn trang điểm kính mờ (Frosted Glass Vanity)',
    'Gương tròn đèn viền, hoa mẫu đơn, khay acrylic',
    'Ánh sáng gương tròn + nắng sớm',
    'a frosted glass vanity with a round lit mirror, peonies and acrylic trays, soft ring-light glow mixed with morning sun'),
  T('silk_ethereal', ['beauty', 'fashion', 'beverage', 'generic'], 'Lụa Bay Mơ Màng (Ethereal Silk)',
    'Nền lụa satin ngà gợn sóng (Ivory Silk Satin Drapes)',
    'Studio mơ màng, sương mỏng lơ lửng',
    'Ánh sáng lãng mạn phát sáng dịu',
    'flowing ivory silk satin drapery with luxurious folds, thin floating mist, soft romantic glow, premium commercial lighting'),
  T('tropical_pool', ['beverage', 'beauty', 'fashion', 'food'], 'Hồ Bơi Nhiệt Đới (Tropical Pool)',
    'Gờ đá vôi cạnh hồ bơi (Limestone Pool Ledge)',
    'Resort nhiệt đới, lá cọ, mặt nước gợn sóng',
    'Nắng chói, phản xạ caustic từ mặt nước',
    'a limestone pool ledge at a tropical resort, palm leaf shadows, shimmering water caustics, bright azure and warm sun'),
  T('desk_setup', ['tech', 'generic'], 'Góc Làm Việc Hiện Đại (Modern Desk Setup)',
    'Bàn gỗ óc chó + deskmat nỉ (Walnut Desk & Felt Mat)',
    'Góc làm việc, màn hình mờ phía sau, cây xanh nhỏ, đèn LED hắt tường',
    'Đèn bàn ấm + LED hắt tường xanh dịu',
    'a walnut desk with a felt deskmat, blurred monitor and small plant behind, warm desk lamp with soft blue LED wall wash'),
  T('vn_market', ['food', 'beverage'], 'Chợ Quê Việt Nam (Vietnamese Wet Market)',
    'Mẹt tre trên bàn gỗ cũ (Bamboo Tray on Old Wood)',
    'Góc chợ quê, rổ rau tươi, nón lá, nồi đất',
    'Nắng sớm xiên qua mái tôn, bụi nắng lơ lửng',
    'a woven bamboo tray on an old wooden stall in a Vietnamese wet market, baskets of fresh greens, conical hat and clay pots, early sun beams with floating dust'),
  T('apartment_kitchen', ['food', 'home', 'beverage'], 'Bếp Chung Cư Hiện Đại (Modern Apartment Kitchen)',
    'Mặt bếp đá thạch anh trắng (White Quartz Countertop)',
    'Bếp chung cư sáng sủa, tủ xanh sage, kệ gia vị gỗ',
    'Nắng trưa qua cửa sổ lớn, sáng và sạch',
    'a white quartz countertop in a bright modern apartment kitchen, sage green cabinets and wooden spice rack, clean midday window light'),
  T('rainy_window', ['food', 'beverage', 'home', 'tech'], 'Bên Cửa Sổ Ngày Mưa (Rainy Window Nook)',
    'Bậu cửa sổ gỗ với chăn len (Wooden Sill & Knit Blanket)',
    'Ngày mưa, giọt nước lăn trên kính, ánh đèn phố mờ',
    'Ánh sáng xanh xám ngoài trời + đèn vàng ấm trong nhà',
    'a wooden window nook with a knit blanket on a rainy day, raindrops streaking the glass, cool blue-gray daylight balanced with a warm interior lamp'),
  T('dorm_room', ['food', 'tech', 'fashion', 'generic'], 'Phòng Trọ Gen Z (Gen Z Dorm Room)',
    'Bàn học nhỏ có đèn LED dây (Small Desk with Fairy Lights)',
    'Phòng trọ trẻ trung, poster, đèn LED dây, gối ôm',
    'Đèn LED dây ấm + màn hình laptop hắt sáng',
    'a small study desk in a cozy Gen Z dorm room, posters and fairy lights, warm string light glow mixed with laptop screen light, casual UGC vibe'),
  T('rooftop_city', ['beverage', 'food', 'fashion', 'tech'], 'Sân Thượng Thành Phố (City Rooftop)',
    'Bàn bar gỗ teak sân thượng (Teak Rooftop Bar Table)',
    'Sân thượng nhìn skyline thành phố lúc chạng vạng, đèn dây',
    'Trời xanh tím chạng vạng (blue hour) + đèn dây ấm',
    'a teak rooftop bar table overlooking a city skyline at blue hour, string lights glowing warm against a violet-blue sky'),
  T('pastel_pop', ['beauty', 'food', 'beverage', 'fashion', 'generic'], 'Studio Màu Pop (Color Pop Studio)',
    'Nền giấy liền màu tương phản (Seamless Bold Color Backdrop)',
    'Phông nền màu đơn sắc rực (màu bổ trợ với bao bì), khối hình học',
    'Ánh sáng flash cứng, bóng đổ sắc nét kiểu tạp chí',
    'a seamless bold single-color paper backdrop in a hue complementary to the packaging, geometric blocks, hard flash lighting with crisp editorial shadows'),
  T('cozy_living', ['home', 'food', 'tech', 'generic'], 'Phòng Khách Ấm Cúng (Cozy Living Room)',
    'Bàn trà gỗ thấp, thảm len (Low Wood Coffee Table & Wool Rug)',
    'Phòng khách, sofa vải, đèn sàn, kệ sách',
    'Đèn sàn vàng ấm buổi tối',
    'a low wooden coffee table on a wool rug in a cozy living room, fabric sofa and bookshelf, warm evening floor lamp glow'),
  T('doorstep_delivery', ['generic', 'food', 'beauty', 'tech', 'home', 'fashion'], 'Thềm Cửa Nhận Hàng (Doorstep Delivery)',
    'Thềm gạch trước cửa nhà (Brick Doorstep)',
    'Cửa gỗ, thảm chùi chân, chậu cây hai bên — khoảnh khắc vừa nhận hàng',
    'Nắng chiều tự nhiên, bóng cây đổ',
    'a brick front doorstep with a wooden door, doormat and potted plants, natural afternoon sun with tree shadows, just-delivered moment'),
  T('office_pantry', ['food', 'beverage', 'tech'], 'Pantry Văn Phòng (Office Pantry)',
    'Quầy laminate trắng pantry (White Laminate Pantry Counter)',
    'Pantry văn phòng hiện đại, máy pha cafe, đồng nghiệp mờ phía sau',
    'Đèn huỳnh quang trắng trung tính + nắng cửa kính',
    'a white laminate office pantry counter, espresso machine and blurred coworkers behind, neutral daylight panels with window light'),
  T('mountain_cabin', ['food', 'beverage', 'home'], 'Nhà Gỗ Trên Núi (Mountain Cabin)',
    'Bàn gỗ thông dày cạnh lò sưởi (Thick Pine Table by Fireplace)',
    'Cabin gỗ, lò sưởi lửa bập bùng, cửa sổ nhìn núi tuyết',
    'Ánh lửa lò sưởi cam ấm, tuyết trắng ngoài cửa',
    'a thick pine table beside a crackling fireplace in a log cabin, snowy mountains through the window, flickering warm orange firelight'),
  T('boutique_shelf', ['fashion', 'beauty', 'generic'], 'Kệ Boutique (Boutique Display)',
    'Kệ gỗ sồi trắng trưng bày (White Oak Display Shelf)',
    'Boutique concept store, giá treo đồ, gương lớn',
    'Đèn ray rọi điểm ấm',
    'a white oak display shelf inside a concept boutique, clothing rails and a tall mirror, warm track spotlights'),
  T('french_bakery', ['food', 'beverage'], 'Tiệm Bánh Pháp (French Bakery)',
    'Quầy gỗ phủ bột mì (Flour-Dusted Wooden Counter)',
    'Tiệm bánh kiểu Pháp, giỏ bánh mì baguette, lò nướng đá phía sau',
    'Nắng sớm qua cửa kính, bụi bột lơ lửng',
    'a flour-dusted wooden bakery counter, baskets of baguettes and a stone oven glowing behind, early morning sun through shop windows with floating flour dust'),
  T('sushi_bar', ['food', 'beverage'], 'Quầy Sushi Gỗ Hinoki (Sushi Bar)',
    'Quầy gỗ hinoki sáng màu (Pale Hinoki Wood Counter)',
    'Quầy sushi omakase, đĩa gốm đen, rèm noren',
    'Đèn downlight ấm, tương phản tối sâu',
    'a pale hinoki wood omakase sushi counter, black ceramic plates and a noren curtain, warm narrow downlights with deep dark contrast'),
  T('vn_sidewalk', ['food', 'beverage'], 'Quán Nhậu Vỉa Hè Sài Gòn (Saigon Sidewalk)',
    'Bàn nhựa đỏ thấp, ghế đẩu (Low Red Plastic Table)',
    'Vỉa hè Sài Gòn buổi tối, xe máy lướt qua mờ, đèn đường vàng',
    'Đèn đường natri vàng + đèn quán trắng',
    'a low red plastic table with stools on a Saigon sidewalk at night, motorbikes streaking past in motion blur, sodium yellow streetlights mixed with white shop light'),
  T('hotpot_table', ['food'], 'Bàn Lẩu Sum Họp (Hotpot Gathering)',
    'Bàn gỗ tròn với nồi lẩu bốc khói (Round Table with Steaming Hotpot)',
    'Bàn lẩu đông người, đĩa thịt rau bày quanh, nhiều đôi đũa',
    'Đèn thả vàng ấm, hơi nước lan tỏa',
    'a round wooden table with a steaming hotpot in the center, plates of sliced meat and greens around it, many chopsticks reaching in, warm pendant light through rising steam'),
  T('tet_feast', ['food', 'beverage', 'home', 'generic'], 'Mâm Tết Truyền Thống (Lunar New Year)',
    'Bàn gỗ lim với khay mứt Tết (Ironwood Table & Tet Candy Tray)',
    'Không khí Tết: cành đào/mai, bao lì xì đỏ, câu đối',
    'Ánh sáng ấm đỏ - vàng lễ hội',
    'a dark ironwood table with a Lunar New Year candy tray, peach blossom and yellow apricot branches, red lucky envelopes and couplets, warm festive red-gold light'),
  T('christmas_cozy', ['food', 'beverage', 'home', 'beauty', 'generic'], 'Giáng Sinh Ấm Áp (Cozy Christmas)',
    'Bàn gỗ trải khăn len đỏ (Wood Table with Red Knit Runner)',
    'Cây thông lấp lánh đèn mờ phía sau, hộp quà, nến',
    'Đèn fairy light bokeh + ánh nến ấm',
    'a wooden table with a red knit runner, a twinkling Christmas tree in soft bokeh behind, wrapped gifts and candles, warm fairy-light and candle glow'),
  T('gym_locker', ['beverage', 'beauty', 'tech', 'fashion'], 'Phòng Gym Năng Động (Gym Locker)',
    'Băng ghế gỗ phòng thay đồ + tạ (Locker Bench & Dumbbells)',
    'Phòng gym hiện đại, tủ locker kim loại, khăn tập, bình nước',
    'Đèn LED trắng lạnh tương phản cao',
    'a wooden locker room bench beside dumbbells, metal lockers and a gym towel, cool high-contrast white LED lighting, energetic fitness mood'),
  T('car_interior', ['tech', 'beverage', 'food', 'generic'], 'Trong Xe Hơi (Car Interior)',
    'Bảng điều khiển & ghế da xe hơi (Car Dashboard & Leather Seat)',
    'Nội thất xe hơi, phố chạy mờ qua cửa kính',
    'Nắng chiếu qua kính lái, phản chiếu lướt qua',
    'a car interior with leather seats and dashboard, city streets sliding by blurred through the windows, sunlight flickering across the cabin through the windshield'),
  T('balcony_garden', ['home', 'beverage', 'food', 'beauty'], 'Ban Công Xanh (Green Balcony)',
    'Bàn mây nhỏ ngoài ban công (Rattan Side Table)',
    'Ban công chung cư đầy cây xanh, dây đèn, nhìn ra phố',
    'Nắng sáng nhẹ lọc qua lá cây',
    'a small rattan side table on an apartment balcony full of potted plants and string lights, city view beyond, soft morning sun filtered through leaves'),
  T('clean_lab', ['beauty', 'tech'], 'Phòng Lab Khoa Học (Clean Lab)',
    'Mặt bàn acrylic trắng phòng lab (White Lab Bench)',
    'Phòng thí nghiệm sạch, ống nghiệm, pipette, kính hiển vi mờ',
    'Ánh sáng trắng lạnh, sạch và chính xác',
    'a white lab bench in a pristine laboratory, glass test tubes, pipettes and a blurred microscope, cool clinical white light, precise scientific mood'),
  T('gaming_rgb', ['tech', 'food', 'beverage'], 'Góc Gaming RGB (Gaming Setup)',
    'Bàn gaming đen + bàn phím cơ RGB (Black Gaming Desk)',
    'Góc gaming, màn hình cong, tai nghe, đèn RGB chạy',
    'Đèn RGB đổi màu tím - xanh',
    'a black gaming desk with an RGB mechanical keyboard, curved monitor and headset, shifting purple and blue RGB glow in a dark room'),
  T('flower_shop', ['beauty', 'fashion', 'generic'], 'Tiệm Hoa (Flower Shop)',
    'Bàn gói hoa gỗ cũ (Florist Wrapping Table)',
    'Tiệm hoa ngập hoa tươi, giấy gói, xô hoa',
    'Ánh sáng tự nhiên trong trẻo, màu sắc tươi',
    'a rustic florist wrapping table surrounded by buckets of fresh flowers and kraft wrapping paper, clear natural daylight with vivid colors'),
  T('laundry_room', ['home', 'beauty'], 'Phòng Giặt Sáng Sủa (Laundry Room)',
    'Mặt máy giặt trắng + giỏ đồ (Washer Top & Linen Basket)',
    'Phòng giặt sạch sẽ, kệ gỗ, khăn gấp gọn',
    'Nắng sáng qua cửa sổ nhỏ, tươi mát',
    'the top of a white washing machine with a linen basket, wooden shelves with neatly folded towels, fresh bright morning window light'),
  T('kids_room', ['home', 'food', 'generic'], 'Phòng Trẻ Em Pastel (Kids Room)',
    'Bàn nhỏ gỗ pastel (Pastel Kids Table)',
    'Phòng trẻ em, đồ chơi gỗ, tranh vẽ treo tường',
    'Ánh sáng ban ngày mềm, tông kẹo ngọt',
    'a small pastel wooden kids table, wooden toys and crayon drawings on the wall, soft daylight with candy-colored tones'),
  T('hotel_breakfast', ['food', 'beverage', 'beauty', 'generic'], 'Bữa Sáng Khách Sạn 5 Sao (Hotel Breakfast)',
    'Khay bữa sáng trên giường trắng (Breakfast Tray on White Bed)',
    'Phòng khách sạn sang trọng, rèm voan, nhìn ra biển/thành phố',
    'Nắng sớm qua rèm voan trắng',
    'a breakfast tray on crisp white hotel bedding, sheer curtains billowing, sea or skyline view, soft early sun through white voile'),
  T('cocktail_bar', ['beverage'], 'Quầy Bar Cocktail (Speakeasy Bar)',
    'Quầy bar đá đen + đồng thau (Black Stone & Brass Bar)',
    'Speakeasy tối, kệ rượu phát sáng, ly pha lê',
    'Đèn hắt kệ rượu hổ phách, rim light',
    'a black stone and brass speakeasy bar top, glowing backlit liquor shelves and crystal glasses, amber shelf light with crisp rim light'),
  T('waterfall_rocks', ['beverage', 'beauty'], 'Đá Suối Thác Nước (Waterfall Rocks)',
    'Tảng đá rêu ướt bên suối (Wet Mossy Rocks)',
    'Thác nước nhỏ trong rừng, bọt nước bắn, rêu xanh',
    'Ánh sáng rừng tán xạ, giọt nước lấp lánh',
    'wet mossy rocks beside a small forest waterfall, water spray and lush green moss, diffused jungle light with sparkling droplets'),
  T('snow_outdoor', ['beverage', 'beauty', 'fashion', 'tech'], 'Ngoài Trời Tuyết Rơi (Snowy Outdoor)',
    'Gờ đá phủ tuyết (Snow-Covered Stone Ledge)',
    'Tuyết rơi nhẹ, rừng thông trắng xóa',
    'Ánh sáng trắng xanh mùa đông, bông tuyết bay',
    'a snow-covered stone ledge with gently falling snow, white pine forest behind, cool blue-white winter light with drifting snowflakes'),
  T('old_library', ['tech', 'beverage', 'generic', 'fashion'], 'Thư Viện Cổ Điển (Classic Library)',
    'Bàn gỗ sồi tối + đèn bàn xanh (Dark Oak Desk & Banker Lamp)',
    'Thư viện cổ, kệ sách cao, thang gỗ',
    'Đèn bàn banker xanh ấm, không khí tĩnh lặng',
    'a dark oak reading desk with a green banker lamp in a classic library, towering bookshelves and a wooden ladder, warm quiet lamplight'),
  T('rice_field', ['food', 'beverage', 'generic'], 'Cánh Đồng Lúa Việt (Rice Field)',
    'Chiếu cói trên bờ ruộng (Woven Mat on Paddy Dike)',
    'Cánh đồng lúa chín vàng, nón lá, trâu xa xa',
    'Nắng chiều vàng óng, gió lay lúa',
    'a woven sedge mat on a paddy dike beside golden ripening rice fields, a conical hat nearby and a water buffalo far away, glowing late-afternoon sun with rice swaying in the wind'),

  // --- Herbal & healthy tea ---
  T('tea_ceremony', ['tea', 'beverage'], 'Bàn Trà Đạo (Tea Ceremony)',
    'Khay trà gỗ tếch, ấm tử sa (Teak Tea Tray & Yixing Teapot)',
    'Không gian trà đạo tĩnh lặng, chén sứ nhỏ, khói trà bay, cành lan',
    'Ánh sáng cửa sổ bên mềm, hơi trà phát sáng ngược sáng',
    'a teak tea tray with a Yixing clay teapot and tiny porcelain cups, a quiet tea ceremony room with an orchid sprig, soft side window light backlighting curling tea steam'),
  T('herbal_apothecary', ['tea', 'dried', 'beauty'], 'Hiệu Thảo Dược Cổ (Herbal Apothecary)',
    'Quầy gỗ cũ với cân đồng (Old Wood Counter & Brass Scale)',
    'Tủ thuốc bắc nhiều ngăn kéo gỗ, thảo mộc khô, hoa cúc, gừng, cam thảo',
    'Ánh đèn vàng ấm, bụi nắng xiên',
    'an old wooden apothecary counter with a brass scale, a wall of small wooden herb drawers, bundles of dried chrysanthemum, ginger and licorice root, warm amber light with slanted dusty sunbeams'),
  T('tea_hill', ['tea', 'beverage', 'generic'], 'Đồi Chè Sương Sớm (Tea Hills at Dawn)',
    'Gờ đá giữa đồi chè xanh (Stone Ledge on Tea Plantation)',
    'Đồi chè xanh mướt trải dài, sương mỏng, giỏ hái chè',
    'Bình minh dịu, sương tán ánh sáng',
    'a stone ledge among rolling green tea plantation hills, thin morning mist and a woven tea-picking basket, soft dawn light diffused through fog'),
  T('engawa_garden', ['tea', 'beverage', 'home'], 'Hiên Gỗ Nhìn Vườn (Veranda Garden)',
    'Sàn hiên gỗ (Wooden Engawa Veranda)',
    'Hiên nhà gỗ nhìn ra vườn rêu, mưa phùn nhẹ, chuông gió',
    'Ánh sáng xám dịu ngày mưa, phản chiếu ướt',
    'a wooden engawa veranda overlooking a moss garden in light drizzle, a wind chime hanging, soft overcast light with wet reflections'),
  T('lotus_pond', ['tea', 'beverage', 'beauty'], 'Đầm Sen (Lotus Pond)',
    'Thuyền gỗ / bàn tre giữa đầm sen (Bamboo Table by Lotus Pond)',
    'Đầm sen hồng nở rộ, lá sen to, nước lặng',
    'Nắng sớm mờ sương, sắc hồng xanh dịu',
    'a bamboo table at the edge of a lotus pond with pink blossoms and large lotus leaves on still water, misty early morning light in soft pink and green'),

  // --- Sweets & snacks ---
  T('candy_shop', ['sweets', 'food'], 'Tiệm Kẹo Retro (Retro Candy Shop)',
    'Quầy gỗ sơn pastel (Pastel Painted Counter)',
    'Tiệm kẹo cổ điển, hũ thuỷ tinh đầy kẹo màu, kẹo mút xoắn',
    'Ánh sáng sáng rực, màu kẹo bão hoà',
    'a pastel painted wooden counter in a retro candy shop, rows of glass jars filled with colorful sweets and swirl lollipops, bright cheerful lighting with saturated candy colors'),
  T('birthday_party', ['sweets', 'food', 'beverage'], 'Tiệc Sinh Nhật Pastel (Birthday Party)',
    'Bàn tiệc trải khăn pastel (Pastel Party Table)',
    'Bóng bay, nến sinh nhật, confetti, đĩa giấy hoạ tiết',
    'Ánh sáng tươi sáng + nến lung linh',
    'a pastel party table with balloons, birthday candles, confetti and patterned paper plates, bright cheerful daylight with flickering candle glow'),
  T('chocolate_studio', ['sweets'], 'Xưởng Socola (Chocolate Atelier)',
    'Bàn đá cẩm thạch làm socola (Marble Tempering Slab)',
    'Xưởng socola thủ công, hạt ca cao, socola chảy',
    'Ánh sáng ấm điểm, độ bóng mượt',
    'a marble tempering slab in an artisan chocolate atelier, cocoa beans and ribbons of molten chocolate, warm focused light emphasizing glossy textures'),
  T('park_picnic', ['sweets', 'beverage', 'food'], 'Picnic Công Viên (Park Picnic)',
    'Thảm picnic trên cỏ xanh (Picnic Blanket on Grass)',
    'Công viên xanh, giỏ picnic, hoa dại, bạn bè ngồi quanh',
    'Nắng chiều xuyên tán cây, lốm đốm',
    'a picnic blanket on green park grass, a wicker basket and wildflowers, friends gathered around, late afternoon sun dappled through trees'),

  // --- Dried foods (cá khô, mực khô, hạt, nấm, trái cây sấy...) ---
  T('fishing_village', ['dried', 'food'], 'Làng Chài Phơi Cá (Fishing Village)',
    'Giàn phơi tre bên biển (Bamboo Drying Racks by the Sea)',
    'Làng chài, cá mực phơi trên giàn tre, thuyền thúng, biển xanh',
    'Nắng trưa gắt, gió biển, trời trong',
    'bamboo drying racks lined with fish and squid in a seaside fishing village, basket boats and blue sea behind, strong midday sun and sea breeze under a clear sky'),
  T('sun_drying_yard', ['dried', 'tea', 'food'], 'Sân Phơi Nong Nia (Sun-Drying Yard)',
    'Nong nia tre trên sân gạch đỏ (Bamboo Trays on Red Brick Yard)',
    'Sân nhà quê, nong nia phơi đồ khô, chum sành',
    'Nắng vàng gắt, bóng đổ rõ nét',
    'round woven bamboo drying trays on a red brick courtyard of a countryside house, clay jars nearby, bright golden sun with crisp shadows'),
  T('pantry_jars', ['dried', 'sweets', 'tea', 'home'], 'Kệ Hũ Thuỷ Tinh (Pantry Jars)',
    'Kệ gỗ với hũ thuỷ tinh nắp gỗ (Wood Shelf & Glass Jars)',
    'Góc bếp gọn gàng, hũ thuỷ tinh đựng hạt, đồ khô, nhãn giấy kraft',
    'Ánh sáng cửa sổ trong trẻo buổi sáng',
    'a wooden pantry shelf lined with glass jars with wooden lids holding nuts and dried goods, kraft paper labels, clean bright morning window light'),
  T('nuts_burlap', ['dried', 'sweets', 'food'], 'Bao Đay & Hạt Dinh Dưỡng (Burlap & Nuts)',
    'Bàn gỗ mộc với bao đay (Rustic Wood & Burlap Sacks)',
    'Bao đay tràn hạt điều, mắc ca, hạnh nhân, muỗng gỗ',
    'Ánh sáng bên ấm, kết cấu rõ nét',
    'a rustic wooden table with open burlap sacks spilling cashews, macadamias and almonds, wooden scoops, warm side light revealing rich textures'),

  // --- Cooking sauces & seasonings ---
  T('wok_fire', ['sauce', 'food'], 'Bếp Chảo Lửa Lớn (Wok Fire Station)',
    'Bếp gang với chảo wok (Cast Iron Wok Burner)',
    'Bếp nhà hàng Á, lửa bùng cao, khói wok hei',
    'Ánh lửa cam rực, nền tối',
    'a cast iron wok burner in an Asian restaurant kitchen, flames leaping up around the wok with wok hei smoke, intense orange firelight against a dark background'),
  T('charcoal_grill', ['sauce', 'food'], 'Vỉ Nướng Than Hồng (Charcoal Grill)',
    'Vỉ nướng gang trên than hồng (Cast Iron Grate over Embers)',
    'Than hồng đỏ rực, khói thơm bốc lên, chổi quét sốt',
    'Ánh than đỏ cam từ dưới lên, khói ngược sáng',
    'a cast iron grill grate over glowing red charcoal embers, fragrant smoke rising and a basting brush nearby, orange ember glow from below with backlit smoke'),
  T('chef_prep', ['sauce', 'food'], 'Bàn Sơ Chế Đầu Bếp (Chef Prep Station)',
    'Bàn inox với thớt gỗ (Steel Prep Table & Cutting Board)',
    'Bếp nhà hàng, nguyên liệu tươi thái sẵn trong bát nhỏ, dao bếp',
    'Đèn bếp trắng sáng, sạch sẽ chuyên nghiệp',
    'a stainless steel prep table with a wooden cutting board in a professional kitchen, fresh ingredients prepped in small bowls and a chef knife, bright clean white kitchen light'),
  T('mortar_spices', ['sauce', 'dried', 'food'], 'Cối Đá & Gia Vị (Mortar & Spices)',
    'Bàn đá với cối giã (Stone Table & Mortar)',
    'Cối đá giã tỏi ớt sả, gia vị tươi và khô rải quanh',
    'Ánh sáng tự nhiên ấm, kết cấu sần rõ',
    'a stone table with a granite mortar and pestle crushing garlic, chili and lemongrass, fresh and dried spices scattered around, warm natural light revealing coarse textures'),

  // --- Vietnam locations ---
  T('hoian_lantern', ['food', 'beverage', 'tea', 'sweets', 'generic'], 'Phố Cổ Hội An Đèn Lồng (Hoi An Lanterns)',
    'Bàn gỗ cũ trước nhà tường vàng (Old Wood Table by Yellow Wall)',
    'Phố cổ Hội An, tường vàng rêu phong, đèn lồng lụa nhiều màu, hoa giấy',
    'Ánh đèn lồng ấm lung linh lúc chạng vạng',
    'an old wooden table against a weathered mustard-yellow Hoi An wall, colorful silk lanterns and bougainvillea overhead, warm glowing lantern light at dusk'),
  T('dalat_pine', ['beverage', 'tea', 'sweets', 'home'], 'Đà Lạt Sương & Đồi Thông (Da Lat Pine Hills)',
    'Bàn gỗ thông ngoài hiên (Pine Porch Table)',
    'Hiên nhà gỗ nhìn ra đồi thông Đà Lạt phủ sương, chăn len, hoa cẩm tú cầu',
    'Ánh sáng lạnh mờ sương + đèn vàng ấm',
    'a pine wood porch table overlooking misty Da Lat pine hills, a wool blanket and blue hydrangeas, cool foggy light balanced with a warm lamp'),
  T('halong_boat', ['food', 'beverage', 'generic'], 'Du Thuyền Hạ Long (Ha Long Bay Cruise)',
    'Bàn gỗ teak trên boong du thuyền (Teak Cruise Deck Table)',
    'Boong du thuyền, núi đá vôi Hạ Long nhô lên mặt nước xanh ngọc',
    'Nắng sớm dịu, phản chiếu mặt vịnh',
    'a teak table on a cruise deck with Ha Long Bay limestone karsts rising from emerald water, soft morning sun reflecting off the bay'),
  T('hanoi_old_cafe', ['beverage', 'tea', 'sweets'], 'Cafe Phố Cổ Hà Nội (Hanoi Old Quarter Cafe)',
    'Bàn gỗ thấp, ghế nhựa xanh (Low Table & Plastic Stools)',
    'Quán cafe vỉa hè phố cổ, tường vôi vàng bong tróc, xe đạp, dây điện',
    'Nắng chiều xiên qua tán cây sấu',
    'a low wooden table with small plastic stools at a Hanoi Old Quarter sidewalk cafe, peeling yellow lime walls, an old bicycle and tangled wires, slanted afternoon sun through tree leaves'),
  T('mekong_floating', ['food', 'beverage', 'dried', 'sauce'], 'Chợ Nổi Miền Tây (Mekong Floating Market)',
    'Mạn thuyền gỗ chở nông sản (Wooden Boat Deck)',
    'Chợ nổi sông nước, ghe chở đầy trái cây, cây bẹo treo hàng',
    'Nắng sớm vàng trên mặt sông',
    'the deck of a wooden boat at a Mekong floating market, boats piled with tropical fruit and hanging produce poles, golden early sun shimmering on the river'),
  T('highland_coffee_farm', ['beverage', 'dried'], 'Nông Trại Cà Phê Tây Nguyên (Highland Coffee Farm)',
    'Bàn gỗ thô giữa vườn cà phê (Rough Wood Table in Coffee Farm)',
    'Vườn cà phê chín đỏ, nia phơi hạt, đồi đất đỏ bazan',
    'Nắng cao nguyên trong vắt',
    'a rough wooden table among coffee trees heavy with red cherries, bamboo trays of drying beans and red basalt hills, crisp clear highland sunlight'),
  T('fruit_stall', ['food', 'beverage', 'sweets', 'dried'], 'Sạp Trái Cây Nhiệt Đới (Tropical Fruit Stall)',
    'Kệ gỗ xếp trái cây (Wooden Fruit Crates)',
    'Sạp trái cây đầy xoài, thanh long, sầu riêng, dưa hấu bổ đôi',
    'Ánh sáng ban ngày rực rỡ, màu bão hoà',
    'stacked wooden crates at a tropical fruit stall overflowing with mangoes, dragon fruit, durian and halved watermelon, bright saturated daylight'),
  T('mid_autumn', ['sweets', 'tea', 'food'], 'Đêm Trung Thu (Mid-Autumn Festival)',
    'Mâm gỗ với bánh nướng và ấm trà (Wood Tray with Mooncakes)',
    'Đèn ông sao, đèn kéo quân, trăng tròn, trẻ em rước đèn mờ phía sau',
    'Ánh trăng xanh dịu + đèn lồng đỏ cam',
    'a wooden tray with mooncakes and a teapot, star lanterns and a carp lantern, a full moon and children with lanterns blurred behind, soft blue moonlight with red-orange lantern glow'),

  // --- Nature & seasons ---
  T('bamboo_forest', ['tea', 'beauty', 'beverage', 'generic'], 'Rừng Tre Xanh (Bamboo Forest)',
    'Phiến đá giữa rừng tre (Stone Slab in Bamboo Grove)',
    'Rừng tre cao vút, lá xào xạc, lối đi rêu',
    'Ánh sáng xanh lọc qua tán tre',
    'a flat stone slab in a towering bamboo grove, leaves rustling and a mossy path, soft green light filtering through the canopy'),
  T('sand_dunes', ['fashion', 'beauty', 'tech', 'beverage'], 'Đồi Cát Mũi Né (Sand Dunes)',
    'Khối đá sa thạch trên cát (Sandstone Block on Dunes)',
    'Đồi cát vàng gợn sóng gió, trời xanh không mây',
    'Nắng chiều gắt, bóng đổ dài',
    'a sandstone block on wind-rippled golden sand dunes under a cloudless sky, low harsh afternoon sun with long dramatic shadows'),
  T('autumn_maple', ['beverage', 'tea', 'sweets', 'fashion', 'home'], 'Mùa Thu Lá Phong (Autumn Maple)',
    'Ghế gỗ phủ lá phong đỏ (Wooden Bench with Red Leaves)',
    'Công viên mùa thu, lá phong đỏ cam rơi, áo len',
    'Nắng thu vàng cam ấm, lá rơi bay',
    'a wooden bench scattered with red maple leaves in an autumn park, orange foliage falling, warm amber autumn sun with drifting leaves'),
  T('cherry_blossom', ['beauty', 'tea', 'sweets', 'fashion', 'beverage'], 'Hoa Anh Đào (Cherry Blossom)',
    'Bàn đá dưới tán anh đào (Stone Table under Sakura)',
    'Cây anh đào nở rộ, cánh hoa hồng bay lả tả',
    'Ánh sáng hồng nhạt dịu, cánh hoa bay',
    'a stone table under full-bloom cherry trees, pink petals drifting through the air, soft pale pink daylight'),
  T('lavender_field', ['beauty', 'tea', 'home'], 'Cánh Đồng Oải Hương (Lavender Field)',
    'Giỏ mây giữa luống oải hương (Wicker Basket in Lavender Rows)',
    'Cánh đồng oải hương tím ngút tầm mắt, ong bay',
    'Nắng hoàng hôn tím vàng',
    'a wicker basket between endless rows of purple lavender, bees hovering, golden-violet sunset light'),
  T('sunflower_field', ['food', 'beverage', 'fashion', 'generic'], 'Cánh Đồng Hướng Dương (Sunflower Field)',
    'Thùng gỗ giữa cánh đồng hướng dương (Wooden Crate in Sunflowers)',
    'Hoa hướng dương cao quá đầu, trời xanh',
    'Nắng trưa vàng rực rỡ',
    'a wooden crate standing among tall sunflowers under a blue sky, bright cheerful midday sunshine'),
  T('greenhouse', ['tea', 'beauty', 'home', 'food'], 'Nhà Kính Trồng Cây (Glass Greenhouse)',
    'Bàn gỗ làm vườn trong nhà kính (Potting Bench)',
    'Nhà kính khung sắt trắng, cây dương xỉ, chậu đất nung, bình tưới',
    'Ánh sáng tản qua mái kính, hơi ẩm',
    'a wooden potting bench inside a white iron-framed glass greenhouse, ferns, terracotta pots and a watering can, soft diffused light through glass with humid air'),
  T('vineyard', ['beverage', 'food', 'sauce'], 'Vườn Nho (Vineyard)',
    'Thùng gỗ sồi giữa hàng nho (Oak Barrel in Vine Rows)',
    'Hàng nho trĩu quả trải dài, đồi thoai thoải',
    'Nắng chiều vàng xuyên lá nho',
    'an oak barrel between rows of grapevines heavy with fruit on gentle hills, golden late sun shining through vine leaves'),
  T('farm_barn', ['food', 'dried', 'sauce', 'generic'], 'Nông Trại Kho Gỗ (Farm Barn)',
    'Bàn gỗ cạnh kiện rơm (Wood Table by Hay Bales)',
    'Kho gỗ đỏ nông trại, kiện rơm, xô sữa, gà đi lại',
    'Ánh nắng xuyên khe ván gỗ, bụi bay',
    'a wooden table beside hay bales in a red farm barn, milk pails and wandering chickens, sunbeams through gaps in the planks with floating dust'),

  // --- Creative studios ---
  T('museum_plinth', ['beauty', 'fashion', 'tech', 'generic'], 'Bảo Tàng Nghệ Thuật (Art Museum Plinth)',
    'Bục trưng bày trắng trong bảo tàng (White Gallery Plinth)',
    'Gallery trắng tối giản, tác phẩm điêu khắc mờ phía sau',
    'Đèn rọi gallery chuẩn, bóng mềm',
    'a white display plinth in a minimalist art gallery, sculptures blurred behind, precise gallery spotlights with soft shadows'),
  T('infinity_mirror', ['beauty', 'tech', 'fashion'], 'Phòng Gương Vô Cực (Infinity Mirror Room)',
    'Bệ gương phản chiếu (Mirrored Pedestal)',
    'Phòng gương phản chiếu vô tận, đèn LED điểm',
    'Điểm sáng LED lặp vô cực, tương phản cao',
    'a mirrored pedestal inside an infinity mirror room, endless reflections of tiny LED points, high-contrast dreamy lighting'),
  T('splash_studio', ['beverage', 'beauty', 'food'], 'Studio Nước Bắn Tung (Splash Studio)',
    'Mặt kính đen phủ giọt nước (Wet Black Glass)',
    'Studio tối, nước bắn tung toé đóng băng khoảnh khắc, giọt nước lơ lửng',
    'Đèn flash tốc độ cao, rim light xanh trắng',
    'a wet black glass surface in a dark studio, frozen high-speed water splashes and suspended droplets, crisp strobe lighting with blue-white rim light'),
  T('cloud_fantasy', ['beauty', 'beverage', 'sweets', 'generic'], 'Mây Bồng Bềnh (Cloud Fantasy)',
    'Bục tròn nổi giữa mây (Floating Round Pedestal)',
    'Biển mây bồng bềnh, trời pastel hồng tím',
    'Ánh sáng mộng mơ pastel, phát sáng dịu',
    'a round pedestal floating above a sea of soft clouds, pastel pink and lilac sky, dreamy glowing light'),
  T('underwater', ['beauty', 'beverage'], 'Dưới Nước Lung Linh (Underwater)',
    'Đá cuội dưới đáy nước trong (Pebbles under Clear Water)',
    'Dưới mặt nước trong vắt, bọt khí nổi lên, rong biển',
    'Ánh sáng caustic gợn sóng từ trên rọi xuống',
    'smooth pebbles under crystal-clear water, rising air bubbles and swaying seaweed, rippling caustic light patterns from the surface above'),
  T('space_station', ['tech', 'beverage', 'generic'], 'Trạm Vũ Trụ (Space Station)',
    'Bảng điều khiển kim loại trắng (White Metal Console)',
    'Trạm không gian tương lai, cửa sổ nhìn ra Trái Đất',
    'Đèn LED trắng xanh, ánh Trái Đất xanh dương',
    'a white metal console inside a futuristic space station, a window showing Earth below, cool white LED panels with blue earthlight'),
  T('retro_90s', ['tech', 'sweets', 'beverage', 'fashion'], 'Retro Thập Niên 90 (Retro 90s Room)',
    'Bàn gỗ ép với TV CRT (Laminate Desk & CRT TV)',
    'Phòng retro, TV đời cũ, băng cassette, máy game 4 nút, poster',
    'Ánh sáng ấm hơi ngả màu film, nhiễu hạt',
    'a laminate desk with a CRT television in a retro 90s room, cassette tapes, an old game console and posters, warm film-tinted light with grain'),
  T('vintage_kitchen', ['food', 'sauce', 'home'], 'Bếp Vintage Gạch Bông (Vintage Tiled Kitchen)',
    'Mặt bếp gạch bông men (Encaustic Tile Countertop)',
    'Bếp cổ điển, tủ gỗ sơn xanh mint, nồi men hoa',
    'Nắng chiều ấm qua rèm ren',
    'an encaustic patterned tile countertop in a vintage kitchen, mint painted cabinets and floral enamel pots, warm afternoon sun through lace curtains'),

  // --- Everyday & lifestyle ---
  T('convenience_store', ['food', 'beverage', 'sweets', 'generic'], 'Cửa Hàng Tiện Lợi Đêm (Night Convenience Store)',
    'Quầy tính tiền cửa hàng tiện lợi (Checkout Counter)',
    'Cửa hàng tiện lợi 24h, kệ hàng đầy màu, tủ lạnh nước',
    'Đèn huỳnh quang trắng + phố đêm ngoài kính',
    'a convenience store checkout counter at night, colorful packed shelves and drink fridges, bright fluorescent light against the dark street outside'),
  T('supermarket_shelf', ['home', 'generic'], 'Kệ Siêu Thị (Supermarket Aisle)',
    'Kệ hàng siêu thị sạch sẽ (Supermarket Shelf)',
    'Lối đi siêu thị, xe đẩy, sản phẩm xếp thẳng hàng',
    'Đèn siêu thị sáng đều',
    'a clean supermarket shelf in a bright aisle, a shopping cart nearby and neatly faced products, even bright retail lighting'),
  T('meeting_room', ['tech', 'beverage', 'generic'], 'Phòng Họp Kính (Glass Meeting Room)',
    'Bàn họp gỗ dài (Long Wood Conference Table)',
    'Phòng họp vách kính, laptop, view thành phố tầng cao',
    'Ánh sáng ban ngày qua kính lớn, lạnh và sạch',
    'a long wooden conference table in a glass-walled meeting room, laptops and a high-rise city view, clean cool daylight through tall windows'),
  T('study_night', ['tech', 'sweets', 'beverage', 'tea'], 'Bàn Ôn Thi Đêm (Late-Night Study Desk)',
    'Bàn học chất sách vở (Desk Piled with Notebooks)',
    'Đêm ôn thi, sách vở, bút highlight, đồng hồ báo thức',
    'Đèn bàn vàng đơn lẻ trong phòng tối',
    'a study desk piled with notebooks and highlighters late at night, an alarm clock showing late hours, a single warm desk lamp in a dark room'),
  T('yoga_studio', ['beauty', 'tea', 'beverage', 'fashion'], 'Phòng Yoga (Yoga Studio)',
    'Thảm yoga trên sàn gỗ sáng (Yoga Mat on Light Wood Floor)',
    'Phòng yoga rộng, cây xanh, gạch đá thiền, khăn',
    'Nắng sớm tràn qua cửa kính lớn',
    'a yoga mat on a light wood floor in a spacious studio, plants, meditation stones and a towel, morning sun flooding through floor-to-ceiling windows'),
  T('bedroom_morning', ['beauty', 'home', 'fashion', 'tea'], 'Phòng Ngủ Buổi Sáng (Morning Bedroom)',
    'Khay gỗ trên chăn trắng (Wood Tray on White Duvet)',
    'Phòng ngủ sáng sủa, chăn ga trắng nhàu nhẹ, gối, rèm mỏng',
    'Nắng sớm mềm qua rèm voan',
    'a wooden tray on a softly rumpled white duvet in an airy bedroom, pillows and sheer curtains, gentle early morning sun through voile'),
  T('barbershop', ['beauty', 'fashion'], 'Tiệm Barber Cổ Điển (Classic Barbershop)',
    'Kệ gỗ tối với gương (Dark Wood Barber Station)',
    'Tiệm barber, ghế da cổ điển, dao cạo, cột sọc đỏ trắng',
    'Đèn tungsten ấm, tương phản nam tính',
    'a dark wood barber station with a mirror, a vintage leather chair, straight razors and a striped barber pole, warm tungsten light with masculine contrast'),
  T('garage_workshop', ['tech', 'home', 'generic'], 'Xưởng Gara Dụng Cụ (Garage Workshop)',
    'Bàn thợ gỗ dày (Heavy Workbench)',
    'Gara xưởng, bảng treo dụng cụ, mùn cưa, đèn công nghiệp',
    'Đèn công nghiệp treo + nắng cửa cuốn',
    'a heavy wooden workbench in a garage workshop, a pegboard of tools and sawdust, hanging industrial lamps mixed with sunlight from the roll-up door'),
  T('pet_corner', ['home', 'food', 'generic'], 'Góc Thú Cưng (Pet Corner)',
    'Thảm mềm cạnh ổ nệm thú cưng (Soft Rug by Pet Bed)',
    'Phòng khách có chó/mèo đang nằm, đồ chơi thú cưng',
    'Nắng chiều ấm, bầu không khí dễ thương',
    'a soft rug beside a cozy pet bed in a living room with a dog or cat lounging nearby, pet toys scattered, warm afternoon sun and a cute homey mood'),
  T('wedding_table', ['sweets', 'beverage', 'beauty', 'fashion'], 'Bàn Tiệc Cưới (Wedding Reception)',
    'Bàn trải khăn ren trắng (White Lace Table)',
    'Tiệc cưới, hoa hồng trắng, ly champagne, nến cao',
    'Ánh nến lãng mạn + đèn dây bokeh',
    'a white lace-covered reception table with white roses, champagne flutes and tall candles, romantic candlelight with string-light bokeh'),
];

// Extra specific tags for existing themes so niche categories have more matches
const EXTRA_TAGS = {
  tea: ['japandi_zen', 'korean_cafe', 'rainy_window', 'mountain_cabin', 'balcony_garden', 'vn_market', 'old_library', 'spa_bathroom', 'scandi_oak'],
  sweets: ['french_bakery', 'christmas_cozy', 'tet_feast', 'kids_room', 'pastel_pop', 'korean_cafe', 'dorm_room', 'cozy_living'],
  dried: ['vn_market', 'tet_feast', 'rustic_farmhouse', 'vn_sidewalk', 'camping_forest', 'rice_field'],
  sauce: ['gourmet_slate', 'apartment_kitchen', 'rustic_farmhouse', 'night_market', 'sunset_garden', 'hotpot_table', 'family_mahogany', 'vn_sidewalk', 'industrial_loft']
};
Object.entries(EXTRA_TAGS).forEach(([tag, ids]) => {
  ids.forEach(id => {
    const t = BACKGROUND_POOL.find(x => x.id === id);
    if (t && !t.tags.includes(tag)) t.tags.push(tag);
  });
});

// Icons shown on the background selector cards
const THEME_ICONS = {
  gourmet_slate: '🍷', sunset_garden: '🌅', night_market: '🏮', terrazzo_studio: '🤍', family_mahogany: '🍚',
  carrara_gold: '🏛️', scandi_oak: '🌿', rustic_farmhouse: '🧺', beach_picnic: '🏖️', camping_forest: '🏕️',
  korean_cafe: '☕', japandi_zen: '🪴', industrial_loft: '🧱', cyber_neon: '⚡', spa_bathroom: '🛁',
  vanity_morning: '💄', silk_ethereal: '🕊️', tropical_pool: '🌴', desk_setup: '💻', vn_market: '🧺',
  apartment_kitchen: '🍳', rainy_window: '🌧️', dorm_room: '🎧', rooftop_city: '🌃', pastel_pop: '🎨',
  cozy_living: '🛋️', doorstep_delivery: '🚪', office_pantry: '🏢', mountain_cabin: '🏔️', boutique_shelf: '👗',
  french_bakery: '🥖', sushi_bar: '🍣', vn_sidewalk: '🛵', hotpot_table: '🍲', tet_feast: '🧧',
  christmas_cozy: '🎄', gym_locker: '🏋️', car_interior: '🚗', balcony_garden: '🌱', clean_lab: '🧪',
  gaming_rgb: '🎮', flower_shop: '💐', laundry_room: '🧼', kids_room: '🧸', hotel_breakfast: '🛎️',
  cocktail_bar: '🍸', waterfall_rocks: '💧', snow_outdoor: '❄️', old_library: '📚', rice_field: '🌾',
  tea_ceremony: '🍵', herbal_apothecary: '🌼', tea_hill: '⛰️', engawa_garden: '🎐', lotus_pond: '🪷',
  candy_shop: '🍭', birthday_party: '🎂', chocolate_studio: '🍫', park_picnic: '🧃',
  fishing_village: '🐟', sun_drying_yard: '☀️', pantry_jars: '🫙', nuts_burlap: '🥜',
  wok_fire: '🔥', charcoal_grill: '🍖', chef_prep: '🔪', mortar_spices: '🌶️',
  hoian_lantern: '🏮', dalat_pine: '🌲', halong_boat: '⛵', hanoi_old_cafe: '🪑', mekong_floating: '🛶',
  highland_coffee_farm: '🫘', fruit_stall: '🥭', mid_autumn: '🥮', bamboo_forest: '🎋', sand_dunes: '🏜️',
  autumn_maple: '🍁', cherry_blossom: '🌸', lavender_field: '💜', sunflower_field: '🌻', greenhouse: '🪴',
  vineyard: '🍇', farm_barn: '🐓', museum_plinth: '🗿', infinity_mirror: '🪞', splash_studio: '💦',
  cloud_fantasy: '☁️', underwater: '🫧', space_station: '🚀', retro_90s: '📼', vintage_kitchen: '🫖',
  convenience_store: '🏪', supermarket_shelf: '🛒', meeting_room: '💼', study_night: '📝', yoga_studio: '🧘',
  bedroom_morning: '🛏️', barbershop: '💈', garage_workshop: '🔧', pet_corner: '🐶', wedding_table: '💍'
};
BACKGROUND_POOL.forEach(t => { t.icon = THEME_ICONS[t.id] || '🖼️'; });

// ---------------------------------------------------------------------------
// UNBOXING HOOK VARIANTS (always: closed carton -> opened -> product taken out)
// The hook only gets ~5-6s and is rendered by image-to-video models from a still of the
// closed box, so every variant keeps ONE box resting still at the same spot (no drops,
// throws, slides, stacks, extra people) and uses at most three slow beats: a tiny intro
// (<=1s), the two flaps folded open in one continuous motion, one unit lifted and held.
// Variety comes from the tool, the hand gesture and the camera — not from moving the box.
// ---------------------------------------------------------------------------
const HOOK_VARIANTS = [
  { id: 'cutter_slice', name_vi: 'Rạch băng keo bằng dao rọc giấy',
    description_vi: 'Thùng carton đóng kín nằm yên trên bàn; lưỡi dao rọc giấy đặt vào khe giữa hai nắp và kéo chậm dọc theo đường băng keo từ đầu này sang đầu kia thùng (không cắt ngang), hai tay mở hai nắp sang hai bên, nhấc một sản phẩm lên giữ trước camera.',
    prompt_en: 'a single closed kraft carton rests still on the surface; the blade of a box cutter is set into the seam between the two flaps and drawn slowly along the tape line from one end of the box to the other (never across it), both hands fold the two flaps out to the sides in one continuous motion, and one hand lifts one product up to the lens and holds it' },
  { id: 'scissors_snip', name_vi: 'Cắt băng keo bằng kéo',
    description_vi: 'Cận cảnh mũi kéo luồn vào khe giữa hai nắp, lướt chậm dọc theo đường băng keo từ đầu này sang đầu kia thùng đóng kín (không cắt ngang); hai tay mở hai nắp ra, nhấc một sản phẩm lên giữ trước camera.',
    prompt_en: 'close-up of scissor tips set into the seam between the two flaps and gliding slowly along the tape line from one end to the other of a single closed kraft carton that stays still (never across it); both hands fold the two flaps back in one continuous motion and lift one product up to the lens, holding it' },
  { id: 'key_slice', name_vi: 'Rạch băng keo bằng chìa khoá (đời thường)',
    description_vi: 'Tay cầm chìa khoá rạch nhẹ dọc theo đường băng keo ở khe giữa hai nắp, từ đầu này sang đầu kia thùng carton đóng kín nằm yên trên bàn, mở hai nắp và nhấc một sản phẩm lên — cảm giác UGC chân thật.',
    prompt_en: 'a hand runs a house key along the tape line in the seam between the two flaps, from one end to the other of a single closed kraft carton resting still on the surface, folds the two flaps open in one continuous motion and lifts one product up toward the lens, authentic UGC feel' },
  { id: 'tape_peel_topdown', name_vi: 'Góc top-down bóc băng keo chậm',
    description_vi: 'Góc nhìn thẳng từ trên xuống thùng đóng kín; đầu ngón tay nhấc mép băng keo ở một đầu thùng và bóc chậm dọc theo khe nắp sang đầu kia trong một lượt, hai nắp được mở ra lộ các hàng sản phẩm xếp khít, một tay nhấc một sản phẩm lên về phía ống kính.',
    prompt_en: 'locked top-down view of a single closed kraft carton; a fingertip lifts the tape at one end of the box and peels it back along the seam to the other end in one slow steady pull, the two flaps are folded open by hand revealing neat rows of product, and one hand raises one unit toward the lens' },
  { id: 'knock_open', name_vi: 'Gõ nhẹ thùng (ASMR) rồi mở',
    description_vi: 'Cận cảnh ngón tay gõ nhẹ hai cái lên nắp thùng đóng kín (băng keo đã rạch sẵn), rồi hai tay mở hai nắp chậm rãi và nhấc một sản phẩm lên.',
    prompt_en: 'close-up of fingers tapping twice on the lid of a single closed kraft carton whose tape is already slit, then both hands slowly fold the two flaps open in one motion and lift one product up to the lens' },
  { id: 'peek_corner', name_vi: 'Hé một góc nắp rồi mở hẳn',
    description_vi: 'Tay hé nhẹ một góc nắp thùng nhìn vào (tò mò), dừng nửa nhịp, rồi mở chậm cả hai nắp lộ sản phẩm xếp đầy và nhấc một sản phẩm lên.',
    prompt_en: 'a hand gently lifts one corner of a flap of a single closed kraft carton to peek inside, pauses for half a beat, then slowly folds both flaps fully open revealing the box full of product and lifts one unit up' },
  { id: 'palms_press', name_vi: 'Hai lòng bàn tay đặt lên nắp rồi mở',
    description_vi: 'Hai lòng bàn tay đặt trên nắp thùng đóng kín, ấn nhẹ một nhịp như háo hức; sau đó hai tay mở hai nắp sang hai bên và nhấc một sản phẩm lên giữ trước camera.',
    prompt_en: 'both palms rest flat on the lid of a single closed kraft carton and press down gently once in anticipation; then both hands fold the two flaps out to the sides in one continuous motion and lift one product up to the lens, holding it' },
  { id: 'low_push_in', name_vi: 'Góc thấp, máy tiến chậm vào thùng',
    description_vi: 'Góc máy thấp ngang mặt bàn, máy tiến rất chậm về phía thùng đóng kín trong khi hai tay mở hai nắp; sản phẩm được nhấc lên ngay trước ống kính.',
    prompt_en: 'low angle at table height, the camera pushes in very slowly toward a single closed kraft carton while both hands fold its two flaps open; one product is lifted up right in front of the lens and held' },
  { id: 'overhead_rows', name_vi: 'Top-down lộ các hàng sản phẩm',
    description_vi: 'Máy top-down đứng yên; hai tay mở hai nắp thùng, lộ các hàng sản phẩm xếp ngay ngắn như lưới; một tay nhấc một sản phẩm ở giữa lên thẳng về phía ống kính.',
    prompt_en: 'static top-down camera over a single closed kraft carton; both hands fold the two flaps open revealing the products in a neat grid, and one hand lifts the middle unit straight up toward the lens' },
  { id: 'side_orbit', name_vi: 'Góc nghiêng, máy lượn nhẹ',
    description_vi: 'Góc nghiêng 45 độ, máy lượn rất chậm khoảng 15 độ quanh thùng đóng kín; hai tay mở hai nắp, nhấc một sản phẩm lên giữa khung hình.',
    prompt_en: '45-degree angle, the camera orbits very slowly about 15 degrees around a single closed kraft carton; both hands fold the two flaps open and lift one product up into the center of the frame' },
  { id: 'gift_lift', name_vi: 'Hai tay nâng sản phẩm như quà',
    description_vi: 'Thùng đóng kín nằm yên; hai tay mở hai nắp, rồi cả hai tay cùng nâng một sản phẩm lên nâng niu như món quà, đưa về phía camera.',
    prompt_en: 'a single closed kraft carton rests still; both hands fold the two flaps open, then both hands together lift one product out carefully like a gift and present it toward the camera' },
  { id: 'nudge_center', name_vi: 'Đẩy nhẹ thùng vào giữa rồi mở',
    description_vi: 'Thùng đóng kín đã ở trong khung hình; một tay đẩy nhẹ thùng vài cm vào giữa (rất nhẹ), rồi hai tay mở hai nắp và nhấc một sản phẩm lên.',
    prompt_en: 'a single closed kraft carton is already in frame; one hand nudges it just a few centimeters to the center, then both hands fold the two flaps open and lift one product up to the lens' },
  { id: 'light_sweep', name_vi: 'Vệt nắng lướt qua thùng rồi mở',
    description_vi: 'Một vệt nắng/ánh sáng mềm lướt chậm qua nắp thùng đóng kín; hai tay mở hai nắp, sản phẩm bên trong bắt sáng, một tay nhấc một sản phẩm lên.',
    prompt_en: 'a soft band of window light slowly sweeps across the lid of a single closed kraft carton; both hands fold the two flaps open, the products inside catch the light, and one hand lifts one unit up' },
  { id: 'tilt_down_abundance', name_vi: 'Máy nghiêng xuống khoe thùng đầy',
    description_vi: 'Hai tay mở hai nắp thùng đóng kín; máy nghiêng chậm xuống khoe thùng đầy sản phẩm xếp ngay ngắn (dư dả), rồi một tay nhấc một sản phẩm lên trước camera.',
    prompt_en: 'both hands fold open the two flaps of a single closed kraft carton; the camera tilts down slowly to show the box full of neatly packed product (abundance), then one hand lifts one unit up in front of the lens' },
  { id: 'fingertip_trace', name_vi: 'Ngón tay vuốt dọc đường băng keo',
    description_vi: 'Cận cảnh đầu ngón tay vuốt chậm dọc đường băng keo ở khe giữa hai nắp, từ đầu này sang đầu kia thùng đóng kín (băng keo đã rạch sẵn theo khe), rồi hai tay mở hai nắp và nhấc một sản phẩm lên.',
    prompt_en: 'close-up of a fingertip slowly tracing the already-slit tape line along the seam between the two flaps, end to end, of a single closed kraft carton, then both hands fold the two flaps open in one motion and lift one product up to the lens' },
  { id: 'one_flap_then_other', name_vi: 'Mở từng nắp một, nhịp đều',
    description_vi: 'Thùng đóng kín nằm yên; tay trái mở nắp trái, tay phải mở nắp phải theo nhịp đều, lộ sản phẩm xếp ngay ngắn, rồi nhấc một sản phẩm lên giữ trước camera.',
    prompt_en: 'a single closed kraft carton rests still; the left hand folds the left flap open, then the right hand folds the right flap open in an even rhythm, revealing neat rows, then one hand lifts one product up and holds it to the lens' },
  { id: 'rack_reveal', name_vi: 'Lấy nét từ nắp thùng sang sản phẩm',
    description_vi: 'Máy đứng yên, lấy nét vào nắp thùng đóng kín; hai tay mở hai nắp, nét chuyển êm sang các hàng sản phẩm bên trong, một tay nhấc một sản phẩm lên rõ nét trước camera.',
    prompt_en: 'static camera focused on the lid of a single closed kraft carton; both hands fold the two flaps open, focus shifts smoothly to the rows of product inside, and one hand lifts one unit up sharp in front of the lens' },
  { id: 'eye_level_center', name_vi: 'Ngang tầm mắt, đối xứng giữa khung',
    description_vi: 'Góc ngang tầm mắt, thùng đóng kín đặt chính giữa khung hình đối xứng; hai tay mở hai nắp cân đối hai bên, nhấc một sản phẩm lên chính giữa và giữ yên.',
    prompt_en: 'eye-level symmetrical framing with a single closed kraft carton dead center; both hands fold the two flaps open evenly to each side and lift one product up to the exact center of the frame, holding it still' },
  { id: 'over_shoulder', name_vi: 'Góc qua vai nhìn xuống thùng',
    description_vi: 'Góc máy qua vai (chỉ thấy vai và tay, không thấy mặt) nhìn xuống thùng đóng kín; hai tay mở hai nắp và nhấc một sản phẩm lên ngang tầm máy.',
    prompt_en: 'over-the-shoulder angle (only shoulder and arms visible, no face) looking down at a single closed kraft carton; both hands fold the two flaps open and lift one product up to camera height' },
  { id: 'tape_lift_corner', name_vi: 'Nhấc mép băng keo ở góc thùng',
    description_vi: 'Cận góc thùng đóng kín; móng tay nhấc nhẹ mép băng keo ở đầu thùng rồi kéo chậm dọc theo khe nắp, rồi hai tay mở hai nắp và nhấc một sản phẩm lên.',
    prompt_en: 'close-up on the corner of a single closed kraft carton; a fingernail gently lifts the end of the tape at one end of the box and pulls it back slowly along the seam, then both hands fold the two flaps open and lift one product up' },
  { id: 'hands_frame_box', name_vi: 'Hai tay ôm hai bên thùng rồi mở',
    description_vi: 'Hai bàn tay đặt hai bên hông thùng đóng kín như ôm lấy, giữ một nhịp; sau đó mở hai nắp và nhấc một sản phẩm lên trước camera.',
    prompt_en: 'both hands rest on the two sides of a single closed kraft carton as if framing it, holding for a beat; then they fold the two flaps open and lift one product up to the lens' },
  { id: 'slow_dolly_side', name_vi: 'Máy trượt ngang chậm theo thùng',
    description_vi: 'Máy trượt ngang rất chậm từ trái sang phải dọc thùng đóng kín; hai tay mở hai nắp, nhấc một sản phẩm lên khi máy dừng ở giữa.',
    prompt_en: 'the camera slides very slowly sideways from left to right along a single closed kraft carton; both hands fold the two flaps open and lift one product up as the camera settles at the center' },
  { id: 'morning_window', name_vi: 'Nắng sớm cạnh cửa sổ',
    description_vi: 'Thùng đóng kín đặt cạnh cửa sổ nắng sớm, bóng rèm in nhẹ trên nắp; hai tay mở hai nắp, sản phẩm bắt nắng, nhấc một sản phẩm lên trước camera.',
    prompt_en: 'a single closed kraft carton by a sunny morning window, soft curtain shadows on its lid; both hands fold the two flaps open, the products catch the sunlight, and one hand lifts one unit up to the lens' },
  { id: 'paper_fill_reveal', name_vi: 'Gạt giấy chèn lộ sản phẩm',
    description_vi: 'Hai tay mở hai nắp thùng đóng kín, bên trên có một lớp giấy kraft chèn; tay gạt nhẹ lớp giấy sang một bên lộ các hàng sản phẩm, rồi nhấc một sản phẩm lên.',
    prompt_en: 'both hands fold open the two flaps of a single closed kraft carton topped with a sheet of crumpled kraft packing paper; a hand gently sweeps the paper aside to reveal the rows of product, then lifts one unit up' },
  { id: 'count_rows', name_vi: 'Ngón tay lướt qua các hàng sản phẩm',
    description_vi: 'Hai tay mở hai nắp thùng đóng kín; một ngón tay lướt chậm qua các hàng sản phẩm như đang đếm (dư dả), rồi nhấc một sản phẩm lên giữ trước camera.',
    prompt_en: 'both hands fold open the two flaps of a single closed kraft carton; one finger glides slowly across the rows of product as if counting them (abundance), then lifts one unit up and holds it to the lens' },
  { id: 'label_turn', name_vi: 'Nhấc lên rồi xoay nhãn về camera',
    description_vi: 'Hai tay mở hai nắp thùng đóng kín; một tay nhấc một sản phẩm lên, xoay chậm nửa vòng cho nhãn hướng thẳng về camera rồi giữ yên.',
    prompt_en: 'both hands fold open the two flaps of a single closed kraft carton; one hand lifts one product up and slowly turns it a half turn so its label faces the camera squarely, then holds it still' },
  { id: 'close_to_wide', name_vi: 'Cận nắp rồi máy lùi ra toàn cảnh',
    description_vi: 'Bắt đầu cận nắp thùng đóng kín; máy lùi chậm ra khi hai tay mở hai nắp, thấy trọn thùng đầy sản phẩm, rồi một tay nhấc một sản phẩm lên.',
    prompt_en: 'start on a close-up of the lid of a single closed kraft carton; the camera pulls back slowly as both hands fold the two flaps open, revealing the whole box full of product, then one hand lifts one unit up' },
  { id: 'hold_to_lens', name_vi: 'Đưa sản phẩm sát ống kính',
    description_vi: 'Hai tay mở hai nắp thùng đóng kín; một tay nhấc một sản phẩm lên và đưa chậm lại gần ống kính đến khi nhãn chiếm phần lớn khung hình, giữ yên.',
    prompt_en: 'both hands fold open the two flaps of a single closed kraft carton; one hand lifts one product and brings it slowly toward the lens until the label fills most of the frame, holding it still' },
];

// ---------------------------------------------------------------------------
// STORY STRUCTURES for scenes after the hook
// ---------------------------------------------------------------------------
const STORY_STRUCTURES = [
  { id: 'recipe_transform', name_vi: 'Biến hoá công thức (Nguyên liệu → Thành phẩm)',
    guide_en: 'show a real usage/cooking transformation step by step, each shot a new step, ending on the finished result' },
  { id: 'problem_solution', name_vi: 'Vấn đề → Giải pháp',
    guide_en: 'open with a relatable everyday problem right after the unboxing, then show the product solving it fast, end on the satisfied payoff' },
  { id: 'speed_montage', name_vi: 'Montage tốc độ nhiều cách dùng',
    guide_en: 'fast montage of 3-4 DIFFERENT ways/situations to use the product, one per shot, hard cuts on the beat' },
  { id: 'asmr_macro', name_vi: 'ASMR cận cảnh kết cấu',
    guide_en: 'extreme macro sensory shots of texture, pouring, crunching, sizzling or squeezing, each shot a different texture moment' },
  { id: 'day_in_life', name_vi: 'Một ngày cùng sản phẩm',
    guide_en: 'the product fits different moments of everyday life (breakfast, a work break, relaxing with friends), shown through activities and props; keep ONE consistent lighting setup so it feels like one shoot' },
  { id: 'share_reaction', name_vi: 'Chia sẻ & phản ứng',
    guide_en: 'prepare/use the product then share it with friends or family; show hands reaching in, a bite/sip/try and a genuine reaction (no face close-ups required)' },
  { id: 'before_after', name_vi: 'Trước / Sau',
    guide_en: 'clear before state, the product in action, then a striking after state; contrast must be obvious' },
  { id: 'hero_glamour', name_vi: 'Quảng cáo hero điện ảnh',
    guide_en: 'cinematic commercial with dramatic product hero moments: splash, levitation, light sweep, then the product in real use' },
];

// ---------------------------------------------------------------------------
// CAMERA / EDIT STYLES
// ---------------------------------------------------------------------------
const CAMERA_STYLES = [
  { id: 'handheld_ugc', name_vi: 'Cầm tay UGC chân thực', guide_en: 'handheld phone-shot UGC look, slight natural shake, quick jump cuts' },
  { id: 'gimbal_cinematic', name_vi: 'Gimbal điện ảnh mượt', guide_en: 'smooth gimbal moves: push-ins, arcs and slow pull-backs, shallow depth of field' },
  { id: 'topdown_flatlay', name_vi: 'Top-down flatlay', guide_en: 'mostly overhead top-down framing with hands entering frame, crisp graphic composition' },
  { id: 'macro_slowmo', name_vi: 'Macro slow-motion', guide_en: 'macro lens and 120fps slow motion on key moments, speed ramps between shots' },
  { id: 'whip_energy', name_vi: 'Whip-pan năng lượng', guide_en: 'energetic whip pans and snap zooms as transitions, punchy beat-synced cuts' },
  { id: 'locked_tripod', name_vi: 'Tripod cố định + match cut', guide_en: 'locked-off tripod framings with match cuts between shots, clean and satisfying' },
];

// ---------------------------------------------------------------------------
// History persistence
// ---------------------------------------------------------------------------
function loadHistory() {
  try {
    const h = JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf8'));
    return { global: h.global || [], hooks: h.hooks || [], products: h.products || {}, profiles: h.profiles || {} };
  } catch {
    return { global: [], hooks: [], products: {}, profiles: {} };
  }
}

// ---------------------------------------------------------------------------
// Product profiles: AI-generated backgrounds tailored to one product, rotated across runs
// ---------------------------------------------------------------------------
function getProductProfile(productKey) {
  return loadHistory().profiles[productKey] || null;
}

function getProductUsedThemes(productKey) {
  return loadHistory().products[productKey] || [];
}

// Appends new backgrounds to the product's profile (ids assigned here) and returns the saved profile
function saveProductProfile(productKey, info, newBackgrounds) {
  const history = loadHistory();
  const existing = history.profiles[productKey] || { backgrounds: [] };
  const known = new Set(existing.backgrounds.map(b => String(b.theme_name || '').toLowerCase()));
  let n = existing.backgrounds.length;
  const added = (newBackgrounds || [])
    .filter(b => b && b.theme_name && b.prompt_descriptor && !known.has(String(b.theme_name).toLowerCase()))
    .map(b => ({
      id: `p_${productKey.slice(0, 6)}_${++n}`,
      theme_name: String(b.theme_name),
      surface_material: String(b.surface_material || ''),
      environment_setting: String(b.environment_setting || ''),
      lighting_style: String(b.lighting_style || ''),
      prompt_descriptor: String(b.prompt_descriptor),
      family: String(b.family || '')
    }));

  const profile = {
    product_name: info.product_name || existing.product_name || '',
    category: info.category || existing.category || '',
    intended_use: info.intended_use || existing.intended_use || '',
    main_ingredient_or_dish: info.main_ingredient_or_dish || existing.main_ingredient_or_dish || '',
    backgrounds: [...existing.backgrounds, ...added].slice(-PRODUCT_PROFILE_MAX_BACKGROUNDS),
    updatedAt: Date.now()
  };
  history.profiles[productKey] = profile;

  // Keep the file small: drop the oldest profiles
  const keys = Object.keys(history.profiles).sort((a, b) => (history.profiles[a].updatedAt || 0) - (history.profiles[b].updatedAt || 0));
  if (keys.length > MAX_PROFILES) keys.slice(0, keys.length - MAX_PROFILES).forEach(k => delete history.profiles[k]);
  saveHistory(history);
  return profile;
}

function saveHistory(h) {
  try {
    fs.writeFileSync(HISTORY_FILE, JSON.stringify(h));
  } catch (e) {
    console.warn('[CreativeHistory] Cannot save history:', e.message);
  }
}

// Stable product key from the uploaded images (same photos => same product)
function productKeyFromImages(imagesList) {
  const hash = crypto.createHash('sha1');
  imagesList.slice(0, 3).forEach(img => {
    const raw = String(img.imageBase64 || '');
    hash.update(raw.slice(0, 20000));
    hash.update(String(raw.length));
  });
  return hash.digest('hex').slice(0, 16);
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = crypto.randomInt(i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Fresh items first (not in avoid set), then the rest — both shuffled
function pickFresh(pool, avoidIds, count) {
  const avoid = new Set(avoidIds);
  const fresh = shuffle(pool.filter(p => !avoid.has(p.id)));
  const stale = shuffle(pool.filter(p => avoid.has(p.id)));
  return [...fresh, ...stale].slice(0, count);
}

/**
 * Build the creative plan for one run.
 * Returns { productKey, backgroundCandidates, fixedThemes, hooks, stories, cameras }
 * - backgroundCandidates: a randomized shortlist the LLM picks from (category fit), used for auto mode
 * - fixedThemes: per-video themes when user forced a preset/custom background for video 1
 */
function buildCreativePlan({ imagesList, numVideos, backgroundOption, customBackground, presetDescriptor, productBackgrounds }) {
  const history = loadHistory();
  const productKey = productKeyFromImages(imagesList);
  const productUsed = history.products[productKey] || [];
  const avoidThemes = [...productUsed, ...history.global];

  // Randomized shortlist that still covers every category tag with at least `numVideos + 1` themes,
  // so the LLM always has enough fitting backgrounds whatever the product is (tea, sweets, sauce...).
  // A user-picked pool theme is used for video 1, so keep it out of the candidates for the other videos
  const ordered = pickFresh(BACKGROUND_POOL.filter(t => t.id !== backgroundOption), avoidThemes, BACKGROUND_POOL.length);
  const perTag = {};
  const backgroundCandidates = [];
  for (const t of ordered) {
    if (t.tags.some(tag => (perTag[tag] || 0) < numVideos + 1)) {
      backgroundCandidates.push(t);
      t.tags.forEach(tag => { perTag[tag] = (perTag[tag] || 0) + 1; });
    }
  }

  let forcedFirst = null;
  const poolTheme = BACKGROUND_POOL.find(t => t.id === backgroundOption);
  if (poolTheme) {
    forcedFirst = poolTheme;
  } else if (backgroundOption === 'custom' && customBackground) {
    forcedFirst = {
      id: 'custom', theme_name: 'Bối cảnh Tùy chỉnh (Custom)', surface_material: 'Bề mặt tùy chỉnh',
      environment_setting: customBackground, lighting_style: 'Ánh sáng phù hợp bối cảnh', prompt_descriptor: customBackground
    };
  } else if (backgroundOption && backgroundOption !== 'auto' && presetDescriptor) {
    forcedFirst = {
      id: `preset_${backgroundOption}`, theme_name: `Bối cảnh chỉ định: ${backgroundOption}`,
      surface_material: 'Bề mặt theo phong cách chỉ định', environment_setting: 'Không gian theo phong cách chỉ định',
      lighting_style: 'Ánh sáng theo phong cách chỉ định', prompt_descriptor: presetDescriptor
    };
  }

  const hooks = pickFresh(HOOK_VARIANTS, history.hooks, numVideos);
  // Wrap around if user asks for more videos than variants
  while (hooks.length < numVideos) hooks.push(HOOK_VARIANTS[hooks.length % HOOK_VARIANTS.length]);

  const stories = shuffle(STORY_STRUCTURES);
  const cameras = shuffle(CAMERA_STYLES);

  // Product-specific backgrounds: assign one unused background to each video (rotation across runs)
  let assignedThemes = null;
  if (Array.isArray(productBackgrounds) && productBackgrounds.length >= numVideos) {
    const needed = numVideos - (forcedFirst ? 1 : 0);
    // Prefer backgrounds from different setting families within one run
    const ordered = pickFresh(productBackgrounds, productUsed, productBackgrounds.length);
    const picked = [];
    const families = new Set();
    for (const b of ordered) {
      if (picked.length >= needed) break;
      if (b.family && families.has(b.family)) continue;
      picked.push(b);
      if (b.family) families.add(b.family);
    }
    for (const b of ordered) {
      if (picked.length >= needed) break;
      if (!picked.includes(b)) picked.push(b);
    }
    assignedThemes = forcedFirst ? [forcedFirst, ...picked] : picked;
  }

  return {
    productKey,
    forcedFirst,
    assignedThemes,
    backgroundCandidates,
    hooks,
    stories: Array.from({ length: numVideos }, (_, i) => stories[i % stories.length]),
    cameras: Array.from({ length: numVideos }, (_, i) => cameras[i % cameras.length]),
    runSeed: crypto.randomBytes(4).toString('hex')
  };
}

function findThemeById(id) {
  return BACKGROUND_POOL.find(t => t.id === id) || null;
}

// Persist what was actually used so the next run avoids it
function recordUsage(productKey, themeIds, hookIds) {
  const history = loadHistory();
  const ids = themeIds.filter(Boolean);
  history.global = [...ids, ...history.global.filter(id => !ids.includes(id))].slice(0, GLOBAL_HISTORY_SIZE);
  const prev = history.products[productKey] || [];
  history.products[productKey] = [...ids, ...prev.filter(id => !ids.includes(id))].slice(0, PRODUCT_HISTORY_SIZE);
  history.hooks = [...hookIds, ...history.hooks.filter(id => !hookIds.includes(id))].slice(0, Math.floor(HOOK_VARIANTS.length / 2));

  // Keep the file small: at most 200 products
  const keys = Object.keys(history.products);
  if (keys.length > 200) keys.slice(0, keys.length - 200).forEach(k => delete history.products[k]);
  saveHistory(history);
}

module.exports = {
  BACKGROUND_POOL,
  HOOK_VARIANTS,
  STORY_STRUCTURES,
  CAMERA_STYLES,
  buildCreativePlan,
  findThemeById,
  recordUsage,
  productKeyFromImages,
  getProductProfile,
  getProductUsedThemes,
  saveProductProfile
};
