export type BlogCategory =
  | "setup-tips"
  | "technique"
  | "gear-review"
  | "guitar-type"
  | "news";

export interface BlogPost {
  slug: string;
  title_en: string;
  title_vi: string;
  excerpt_en: string;
  excerpt_vi: string;
  content_en: string;
  content_vi: string;
  category: BlogCategory;
  tags: string[];
  published_at: string;
  updated_at: string;
  read_time: number;
  is_featured: boolean;
  gradient: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "guitar-action-setup-guide",
    title_en: "The Complete Guide to Guitar Action Setup",
    title_vi: "Hướng dẫn toàn diện về Setup Action Guitar",
    excerpt_en:
      "Action — the distance between your strings and fretboard — is the single biggest factor in how your guitar feels to play. Here's everything you need to know.",
    excerpt_vi:
      "Action — khoảng cách giữa dây và phím đàn — là yếu tố lớn nhất ảnh hưởng đến cảm giác chơi đàn của bạn. Đây là tất cả những gì bạn cần biết.",
    content_en: `
<h2>What Is Guitar Action?</h2>
<p>Action refers to the height of the strings above the frets. It's measured at the 12th fret, typically in millimetres. A guitar with high action requires more finger pressure, causing fatigue and intonation problems. A guitar set too low will buzz against the frets.</p>

<h2>Why Action Matters</h2>
<p>The right action is a balance between playability and tone. Lower action makes the guitar easier to play — ideal for lead work and fast passages. Slightly higher action produces more volume and sustain on acoustic guitars, which suits fingerpicking and strumming.</p>

<h2>Standard Action Measurements</h2>
<p>Industry guidelines at the 12th fret:</p>
<ul>
  <li><strong>Electric guitar:</strong> Low E: 1.5–2.0mm / High E: 1.2–1.6mm</li>
  <li><strong>Acoustic guitar:</strong> Low E: 2.0–2.5mm / High E: 1.5–2.0mm</li>
  <li><strong>Classical guitar:</strong> Low E: 3.5–4.5mm / High E: 2.5–3.5mm</li>
  <li><strong>Bass guitar:</strong> Low E: 2.0–2.5mm / High E: 1.5–2.0mm</li>
</ul>
<p>These are starting points — the ideal action for you depends on your playing style, string gauge, and the specific instrument.</p>

<h2>What Affects Action?</h2>
<p>Three main components determine action:</p>
<ol>
  <li><strong>Truss rod</strong> — controls neck relief (the slight bow in the neck). A properly adjusted truss rod creates a gentle curve that allows the strings to vibrate without buzzing.</li>
  <li><strong>Nut</strong> — the slotted piece at the headstock end. Slots cut too deep cause buzzing on open strings. Slots too shallow make the guitar hard to play in first position.</li>
  <li><strong>Saddle / Bridge</strong> — the contact point at the body end. Lowering the saddle reduces action. On acoustic guitars, this is done by sanding the saddle down.</li>
</ol>

<h2>Signs Your Action Needs Attention</h2>
<ul>
  <li>Your fingers hurt after 15 minutes of playing</li>
  <li>Fret buzz on specific notes or positions</li>
  <li>The guitar feels harder to play above the 7th fret</li>
  <li>Intonation is off even after tuning open strings correctly</li>
  <li>Your guitar hasn't been set up since you bought it</li>
</ul>

<h2>When to See a Luthier</h2>
<p>While you can measure your guitar's action yourself with a ruler or feeler gauge, adjusting it — especially the truss rod — requires experience and the right tools. An incorrect truss rod adjustment can damage the neck. Our basic setup service covers all three components and typically takes 1–2 days.</p>
    `,
    content_vi: `
<h2>Action Guitar Là Gì?</h2>
<p>Action là chiều cao của dây đàn so với phím đàn. Thường được đo ở phím 12, tính bằng milimét. Đàn có action cao đòi hỏi lực nhấn tay lớn hơn, gây mỏi tay và làm mất intonation. Ngược lại, action quá thấp sẽ khiến dây chạm vào phím đàn và tạo ra tiếng buzz.</p>

<h2>Tại Sao Action Quan Trọng?</h2>
<p>Action phù hợp là sự cân bằng giữa khả năng chơi và âm sắc. Action thấp giúp chơi dễ dàng hơn — lý tưởng cho các đoạn solo và lick nhanh. Action cao hơn một chút tạo ra âm lượng và sustain tốt hơn trên đàn acoustic, phù hợp với fingerpicking và strumming.</p>

<h2>Số Đo Action Chuẩn</h2>
<p>Tiêu chuẩn ngành ở phím thứ 12:</p>
<ul>
  <li><strong>Guitar điện:</strong> Dây E thấp: 1.5–2.0mm / Dây E cao: 1.2–1.6mm</li>
  <li><strong>Guitar acoustic:</strong> Dây E thấp: 2.0–2.5mm / Dây E cao: 1.5–2.0mm</li>
  <li><strong>Guitar classic:</strong> Dây E thấp: 3.5–4.5mm / Dây E cao: 2.5–3.5mm</li>
  <li><strong>Guitar bass:</strong> Dây E thấp: 2.0–2.5mm / Dây E cao: 1.5–2.0mm</li>
</ul>

<h2>Những Yếu Tố Ảnh Hưởng Đến Action</h2>
<ol>
  <li><strong>Truss rod</strong> — điều khiển độ cong của cần đàn (neck relief). Truss rod được chỉnh đúng tạo ra độ cong nhẹ giúp dây rung tự do mà không bị buzz.</li>
  <li><strong>Nut</strong> — miếng nhựa/xương ở đầu cần đàn. Rãnh cắt quá sâu gây buzz ở dây buông. Rãnh quá nông khiến chơi ở vị trí đầu cần rất khó.</li>
  <li><strong>Saddle / Bridge</strong> — điểm tiếp xúc ở thân đàn. Hạ saddle xuống giúp giảm action. Trên đàn acoustic, điều này được thực hiện bằng cách mài nhỏ saddle.</li>
</ol>

<h2>Dấu Hiệu Action Cần Được Chỉnh</h2>
<ul>
  <li>Tay bạn đau sau 15 phút chơi đàn</li>
  <li>Tiếng buzz ở một số nốt hoặc vị trí cụ thể</li>
  <li>Đàn khó chơi hơn ở phía trên phím số 7</li>
  <li>Intonation bị lệch dù đã lên dây đúng ở dây buông</li>
  <li>Đàn chưa được setup kể từ khi mua</li>
</ul>

<h2>Khi Nào Nên Tìm Thợ Chỉnh?</h2>
<p>Mặc dù bạn có thể tự đo action bằng thước hoặc feeler gauge, nhưng việc chỉnh — đặc biệt là truss rod — đòi hỏi kinh nghiệm và dụng cụ phù hợp. Chỉnh sai truss rod có thể hỏng cần đàn. Dịch vụ setup cơ bản của chúng tôi bao gồm cả ba yếu tố trên và thường hoàn thành trong 1–2 ngày.</p>
    `,
    category: "setup-tips",
    tags: ["action", "setup", "truss-rod", "playability"],
    published_at: "2024-09-10",
    updated_at: "2025-01-15",
    read_time: 6,
    is_featured: true,
    gradient: "from-amber-900 via-stone-900 to-amber-950",
  },
  {
    slug: "when-guitar-needs-fret-level",
    title_en: "How to Know When Your Guitar Needs a Fret Level",
    title_vi: "Khi Nào Cây Đàn Của Bạn Cần Được Mài Fret?",
    excerpt_en:
      "Fret wear is inevitable. But many guitarists play for years on an instrument that would feel completely transformed after a fret levelling. Here are the telltale signs.",
    excerpt_vi:
      "Mòn fret là điều không thể tránh khỏi. Nhưng nhiều người chơi đàn suốt nhiều năm trên một cây đàn mà sẽ được cải thiện hoàn toàn sau khi mài fret. Đây là những dấu hiệu cần lưu ý.",
    content_en: `
<h2>What Is Fret Levelling?</h2>
<p>Fret levelling (also called a fret dress) is the process of filing down the highest frets so that all 24 (or however many your guitar has) sit at exactly the same height. After levelling, each fret is re-crowned — reshaped to a rounded profile — and polished to a mirror finish.</p>

<h2>Why Frets Wear Unevenly</h2>
<p>Most guitarists spend the majority of their time in the lower positions — first to fifth fret for chords, first to twelfth for most solos. The frets in these zones absorb the most string pressure and wear down fastest. Meanwhile, frets at the 15th fret and above remain nearly pristine. This uneven wear creates buzz and intonation problems in the most-used areas of the neck.</p>

<h2>Clear Signs You Need a Fret Level</h2>
<ul>
  <li><strong>Fret buzz in specific positions</strong> — If the 3rd fret buzzes when you play the 2nd, it's often because the 3rd fret is higher than the 2nd.</li>
  <li><strong>Dead spots or "choking" notes</strong> — A note that barely rings out or completely dies when bent indicates a fret that's worn too low, causing the string to strike the fret ahead of it.</li>
  <li><strong>Visible dents or grooves</strong> — Look at your frets from the side. Flat-topped, dented frets with visible string grooves are worn and need attention.</li>
  <li><strong>Intonation that won't settle</strong> — If the 12th-fret harmonic and fretted note don't match even after saddle adjustment, high frets can be the culprit.</li>
  <li><strong>Action raised to compensate</strong> — Raising action to stop buzz is a temporary fix that hides fret wear and makes the guitar harder to play.</li>
</ul>

<h2>Fret Dress vs. Full Fret Replacement</h2>
<p>A fret dress removes a small amount of material from the top of each fret. Each fret can typically be levelled 2–4 times before it becomes too thin and needs full replacement. If your frets are already very low or the grooves are deep, replacement may be the better investment. We assess this during the free initial inspection.</p>

<h2>How Long Does It Last?</h2>
<p>A fret dress on a regularly-played guitar typically lasts 2–5 years depending on string gauge, playing style, and how much bending you do. Players who use heavy strings (.011s and above) or do aggressive bending tend to see wear faster.</p>
    `,
    content_vi: `
<h2>Mài Fret Là Gì?</h2>
<p>Mài fret (fret dress) là quá trình giũa các fret cao nhất để tất cả các fret (thường là 24 hoặc nhiều hơn tùy cây đàn) nằm ở cùng một độ cao chính xác. Sau khi mài phẳng, mỗi fret được tạo lại hình vòm (crown) và đánh bóng đến độ sáng gương.</p>

<h2>Tại Sao Fret Mòn Không Đều?</h2>
<p>Hầu hết người chơi đàn dành phần lớn thời gian ở các vị trí thấp — phím 1 đến 5 cho hợp âm, phím 1 đến 12 cho hầu hết solo. Các fret ở vùng này chịu áp lực dây nhiều nhất và mòn nhanh nhất. Trong khi đó, các fret từ phím 15 trở lên hầu như vẫn còn mới. Sự mòn không đồng đều này tạo ra buzz và vấn đề intonation ở các vị trí được dùng nhiều nhất.</p>

<h2>Dấu Hiệu Rõ Ràng Cần Mài Fret</h2>
<ul>
  <li><strong>Tiếng buzz ở vị trí cụ thể</strong> — Nếu phím 3 bị buzz khi bấm phím 2, thường là do phím 3 cao hơn phím 2.</li>
  <li><strong>Điểm chết hoặc nốt "bị nghẹt"</strong> — Nốt hầu như không vang hoặc tắt ngay khi bend cho thấy fret bị mòn quá thấp, khiến dây chạm vào fret phía trước.</li>
  <li><strong>Vết lõm hoặc rãnh nhìn thấy được</strong> — Nhìn fret từ cạnh bên. Fret phẳng, có vết lõm và rãnh dây rõ ràng là đã mòn và cần xử lý.</li>
  <li><strong>Intonation không ổn định</strong> — Nếu harmonic phím 12 và nốt bấm không khớp dù đã chỉnh saddle, fret cao có thể là nguyên nhân.</li>
  <li><strong>Phải nâng action để tránh buzz</strong> — Nâng action chỉ là giải pháp tạm thời che giấu mòn fret và làm đàn khó chơi hơn.</li>
</ul>

<h2>Mài Fret vs. Thay Fret Hoàn Toàn</h2>
<p>Mài fret loại bỏ một lượng nhỏ vật liệu từ đỉnh mỗi fret. Thông thường có thể mài fret 2–4 lần trước khi nó quá mỏng và cần thay mới hoàn toàn. Nếu fret của bạn đã rất thấp hoặc rãnh quá sâu, thay fret có thể là khoản đầu tư tốt hơn. Chúng tôi đánh giá điều này trong lần kiểm tra miễn phí ban đầu.</p>

<h2>Được Bao Lâu?</h2>
<p>Mài fret trên một cây đàn được chơi thường xuyên thường kéo dài 2–5 năm tùy theo cỡ dây, phong cách chơi và mức độ bending bạn thực hiện. Người chơi dây nặng (.011s trở lên) hoặc bend nhiều thường thấy fret mòn nhanh hơn.</p>
    `,
    category: "technique",
    tags: ["fret", "levelling", "buzzing", "maintenance"],
    published_at: "2024-10-22",
    updated_at: "2025-01-20",
    read_time: 5,
    is_featured: false,
    gradient: "from-stone-900 via-amber-950 to-zinc-900",
  },
  {
    slug: "guitar-care-vietnam-humidity",
    title_en: "Caring for Your Guitar in Vietnam's Climate",
    title_vi: "Chăm Sóc Đàn Guitar Trong Khí Hậu Việt Nam",
    excerpt_en:
      "Vietnam's humidity swings — from Hanoi's dry winter to the wet season — are the number one cause of guitar problems we see. Here's how to protect your instrument year-round.",
    excerpt_vi:
      "Sự thay đổi độ ẩm ở Việt Nam — từ mùa đông khô hanh ở Hà Nội đến mùa mưa — là nguyên nhân hàng đầu gây ra vấn đề với đàn guitar. Đây là cách bảo vệ nhạc cụ của bạn quanh năm.",
    content_en: `
<h2>Why Humidity Affects Guitars So Dramatically</h2>
<p>Acoustic guitars are essentially hollow wooden boxes — and wood is hygroscopic, meaning it constantly absorbs and releases moisture from the surrounding air. When humidity rises, wood swells. When it drops, wood contracts. This movement is normal, but rapid or extreme changes stress the instrument: glue joints open, braces crack, necks shift, and tops warp.</p>

<h2>Vietnam's Humidity Challenges</h2>
<p>Hanoi experiences two distinct extremes. November to February brings cold, dry air with relative humidity (RH) sometimes dropping to 30–40% — dangerously low for acoustic guitars. The summer rainy season pushes RH above 80–90%. The ideal storage range for most guitars is 45–55% RH.</p>
<p>Ho Chi Minh City has more stable humidity year-round (60–75%), but air-conditioned rooms can drop RH sharply. Playing in an air-conditioned studio for hours while your guitar absorbs the dry air is a subtle but real risk.</p>

<h2>Signs of Humidity Damage</h2>
<p><strong>Too dry (below 40% RH):</strong></p>
<ul>
  <li>Sharp, poking fret ends that extend past the fretboard edge</li>
  <li>A sunken top — the wood between the braces collapses inward</li>
  <li>Cracks appearing along grain lines, especially on the top</li>
  <li>Action lowers as the neck straightens from drying</li>
</ul>
<p><strong>Too humid (above 65% RH):</strong></p>
<ul>
  <li>A high, humped top — the guitar belly lifts upward</li>
  <li>Action rises as the neck swells and the top pushes the bridge up</li>
  <li>Open seams or lifting braces from glue failure</li>
  <li>Musty smell inside the guitar body</li>
</ul>

<h2>Practical Protection</h2>
<ol>
  <li><strong>Get a hygrometer</strong> — a small, inexpensive device that measures RH. Place one near your guitars. Digital models with min/max memory are ideal.</li>
  <li><strong>Use a guitar humidifier in dry months</strong> — Soundhole humidifiers (Oasis, D'Addario) and case humidifiers work well. Refresh them every 1–2 weeks when RH drops below 45%.</li>
  <li><strong>Store in the case</strong> — A closed case buffers the guitar against sudden humidity swings. Cardboard cases provide better insulation than bare wall hangers.</li>
  <li><strong>Avoid air-conditioning vents</strong> — Don't store guitars directly in the path of air conditioning or near windows.</li>
  <li><strong>Seasonal check-up</strong> — Bring your guitar in at the start of Hanoi's dry season (November) and again before the rainy season (April–May). A light setup adjustment costs far less than repairing cracked braces.</li>
</ol>
    `,
    content_vi: `
<h2>Tại Sao Độ Ẩm Ảnh Hưởng Đến Đàn Guitar Nhiều Như Vậy?</h2>
<p>Đàn acoustic về cơ bản là những hộp gỗ rỗng — và gỗ có tính hút ẩm, nghĩa là nó liên tục hút và nhả hơi nước từ không khí xung quanh. Khi độ ẩm tăng, gỗ nở ra. Khi giảm, gỗ co lại. Sự chuyển động này là bình thường, nhưng thay đổi quá nhanh hoặc cực đoan sẽ gây hại: các mối dán hở ra, thanh brace nứt, cần đàn dịch chuyển và mặt đàn bị vênh.</p>

<h2>Thách Thức Khí Hậu Ở Việt Nam</h2>
<p>Hà Nội trải qua hai thái cực khác biệt. Từ tháng 11 đến tháng 2, không khí lạnh và khô với độ ẩm tương đối (RH) đôi khi xuống còn 30–40% — cực kỳ nguy hiểm cho đàn acoustic. Mùa mưa hè đẩy RH lên trên 80–90%. Khoảng bảo quản lý tưởng cho hầu hết đàn là 45–55% RH.</p>
<p>Thành phố Hồ Chí Minh có độ ẩm ổn định hơn quanh năm (60–75%), nhưng các phòng điều hòa có thể làm giảm RH đột ngột. Chơi đàn trong phòng thu điều hòa nhiều giờ trong khi đàn hút không khí khô là rủi ro thực tế dù tinh tế.</p>

<h2>Dấu Hiệu Hư Hại Do Độ Ẩm</h2>
<p><strong>Quá khô (dưới 40% RH):</strong></p>
<ul>
  <li>Các cạnh fret nhô ra ngoài mép fingerboard, gây cảm giác sắc nhọn</li>
  <li>Mặt đàn lõm xuống — gỗ giữa các brace bị sập vào trong</li>
  <li>Vết nứt xuất hiện theo thớ gỗ, đặc biệt trên mặt đàn</li>
  <li>Action hạ thấp khi cần đàn thẳng ra do khô</li>
</ul>
<p><strong>Quá ẩm (trên 65% RH):</strong></p>
<ul>
  <li>Mặt đàn phình lên trên</li>
  <li>Action tăng khi cần đàn nở và mặt đàn đẩy bridge lên</li>
  <li>Các mối dán hở hoặc brace bong ra do keo kém</li>
  <li>Mùi hôi ẩm bên trong thân đàn</li>
</ul>

<h2>Biện Pháp Bảo Vệ Thực Tế</h2>
<ol>
  <li><strong>Mua hygrometer</strong> — thiết bị nhỏ, giá rẻ đo độ ẩm tương đối. Đặt gần khu vực để đàn. Loại kỹ thuật số với bộ nhớ min/max là tốt nhất.</li>
  <li><strong>Dùng bình giữ ẩm vào mùa khô</strong> — Máy giữ ẩm lỗ soundhole (Oasis, D'Addario) và case humidifier hoạt động tốt. Thay nước mỗi 1–2 tuần khi RH xuống dưới 45%.</li>
  <li><strong>Bảo quản trong hộp đàn</strong> — Hộp đàn đóng kín giúp đàn ít bị ảnh hưởng bởi thay đổi độ ẩm đột ngột. Hộp có lót cách nhiệt bảo vệ tốt hơn treo tường trực tiếp.</li>
  <li><strong>Tránh luồng điều hòa</strong> — Không để đàn trực tiếp trước luồng gió điều hòa hoặc gần cửa sổ.</li>
  <li><strong>Kiểm tra theo mùa</strong> — Mang đàn đến vào đầu mùa khô (tháng 11) và trước mùa mưa (tháng 4–5). Điều chỉnh nhẹ chi phí thấp hơn nhiều so với sửa brace nứt.</li>
</ol>
    `,
    category: "guitar-type",
    tags: ["humidity", "acoustic", "care", "vietnam", "storage"],
    published_at: "2024-11-05",
    updated_at: "2025-02-10",
    read_time: 4,
    is_featured: false,
    gradient: "from-amber-800 via-stone-900 to-amber-950",
  },
  {
    slug: "understanding-guitar-intonation",
    title_en: "Guitar Intonation Explained: Why Your Guitar Sounds Out of Tune",
    title_vi: "Intonation Guitar: Tại Sao Đàn Bạn Lạc Điệu Dù Đã Lên Dây Đúng?",
    excerpt_en:
      "You tune your guitar perfectly, then play a chord up the neck — and it sounds off. This is intonation. Here's what causes it and how it's fixed.",
    excerpt_vi:
      "Bạn lên dây đàn hoàn hảo, rồi bấm một hợp âm trên cổ đàn — và nó nghe lạc điệu. Đây là vấn đề intonation. Đây là nguyên nhân và cách khắc phục.",
    content_en: `
<h2>What Is Intonation?</h2>
<p>Intonation describes how accurately your guitar plays in tune across the entire fretboard — not just at open strings, but at the 5th fret, 7th fret, and all the way up. A guitar with perfect intonation will sound in tune at every position. One with poor intonation will sound sharp or flat in certain positions even after open strings are tuned correctly.</p>

<h2>The Simple Test</h2>
<p>Tune your guitar to pitch. Then play the 12th-fret harmonic on any string (lightly touch the string directly above the 12th fret and pluck). Then fret the same string at the 12th fret normally. Both notes should be exactly the same pitch. If the fretted note is sharp, the string is too short — the saddle needs to move back. If it's flat, the string is too long — the saddle moves forward.</p>

<h2>What Causes Intonation Problems?</h2>
<ul>
  <li><strong>String gauge change</strong> — Switching from 9s to 11s changes string tension and length, requiring saddle adjustment.</li>
  <li><strong>Neck relief change</strong> — A truss rod that shifts (often seasonally) changes the effective string length.</li>
  <li><strong>Worn or incorrectly cut nut</strong> — An incorrect nut slot position changes where the string actually starts vibrating.</li>
  <li><strong>High frets</strong> — A fret that's too high stretches the string slightly when you press down, raising pitch.</li>
  <li><strong>Saddle wear</strong> — On acoustic guitars, a worn saddle can develop uneven contact points.</li>
</ul>

<h2>Can I Fix Intonation Myself?</h2>
<p>On electric guitars, adjusting the saddle is straightforward — most bridges have individual saddle screws. A chromatic tuner and a screwdriver are all you need. On acoustic guitars, the saddle must be repositioned or replaced, which requires removing material carefully. A mistake here is difficult to undo. Classical guitars rarely have adjustable saddles at all.</p>

<h2>When Intonation Can't Be Fixed</h2>
<p>If a guitar's scale length is significantly wrong from manufacture — rare but it happens on very cheap instruments — no amount of saddle adjustment will achieve perfect intonation across the whole neck. This is why buying a quality instrument matters. Most issues on guitars in the 3,000,000 VND and above range are solvable.</p>
    `,
    content_vi: `
<h2>Intonation Là Gì?</h2>
<p>Intonation mô tả mức độ chính xác của đàn khi chơi đúng tone trên toàn bộ cần đàn — không chỉ ở dây buông, mà ở phím 5, phím 7 và tất cả các vị trí trên. Một cây đàn có intonation hoàn hảo sẽ chơi đúng tone ở mọi vị trí. Cây đàn có intonation kém sẽ nghe lạc cao hoặc thấp ở một số vị trí dù dây buông đã lên đúng.</p>

<h2>Bài Test Đơn Giản</h2>
<p>Lên dây đàn đúng tone. Sau đó chơi harmonic phím 12 trên bất kỳ dây nào (chạm nhẹ ngón tay trực tiếp lên dây ngay trên phím 12 và gảy). Rồi bấm cùng dây đó ở phím 12 bình thường. Cả hai nốt phải có cùng cao độ chính xác. Nếu nốt bấm cao hơn, dây quá ngắn — saddle cần lùi ra sau. Nếu thấp hơn, dây quá dài — saddle tiến ra trước.</p>

<h2>Nguyên Nhân Gây Ra Vấn Đề Intonation</h2>
<ul>
  <li><strong>Thay đổi cỡ dây</strong> — Chuyển từ dây 9 sang 11 thay đổi sức căng và độ dài dây, cần điều chỉnh saddle.</li>
  <li><strong>Thay đổi neck relief</strong> — Truss rod thay đổi (thường theo mùa) làm thay đổi độ dài dây hiệu dụng.</li>
  <li><strong>Nut mòn hoặc cắt sai</strong> — Vị trí rãnh nut không đúng thay đổi điểm dây thực sự bắt đầu rung.</li>
  <li><strong>Fret cao</strong> — Fret quá cao kéo căng dây khi bạn nhấn xuống, làm tăng cao độ.</li>
  <li><strong>Mòn saddle</strong> — Trên đàn acoustic, saddle mòn có thể tạo ra các điểm tiếp xúc không đều.</li>
</ul>

<h2>Tôi Có Thể Tự Chỉnh Intonation Không?</h2>
<p>Trên guitar điện, chỉnh saddle khá đơn giản — hầu hết bridge có vít điều chỉnh saddle riêng lẻ. Bạn chỉ cần máy tuner chromatic và tuốc-nơ-vít. Trên guitar acoustic, saddle phải được đặt lại hoặc thay, đòi hỏi mài vật liệu cẩn thận. Sai ở đây khó sửa lại. Guitar classic hầu như không có saddle có thể điều chỉnh.</p>

<h2>Khi Intonation Không Thể Sửa Được</h2>
<p>Nếu scale length của đàn sai đáng kể từ khâu sản xuất — hiếm nhưng xảy ra trên nhạc cụ rẻ tiền — không có cách chỉnh saddle nào đạt được intonation hoàn hảo trên toàn cần. Đây là lý do tại sao chất lượng nhạc cụ quan trọng. Hầu hết vấn đề trên guitar từ 3.000.000 VND trở lên đều có thể giải quyết được.</p>
    `,
    category: "setup-tips",
    tags: ["intonation", "setup", "tuning", "saddle"],
    published_at: "2025-01-08",
    updated_at: "2025-02-20",
    read_time: 5,
    is_featured: false,
    gradient: "from-zinc-900 via-amber-950 to-stone-900",
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getPostsByCategory(category: BlogCategory): BlogPost[] {
  return blogPosts.filter((p) => p.category === category);
}

export function getFeaturedPost(): BlogPost | undefined {
  return blogPosts.find((p) => p.is_featured);
}
