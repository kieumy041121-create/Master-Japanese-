import React from 'react';

interface Props {
  scene: string;
  className?: string;
}

export const HandDrawnIdiomArt: React.FC<Props> = ({ scene, className = 'w-full h-full' }) => {
  switch (scene) {
    case 'frog_well':
      // Ếch ngồi đáy giếng: Giếng đá cổ, chú ếch xanh ngước nhìn lên vòm trời xanh có vầng mây
      return (
        <svg viewBox="0 0 400 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Background Wash */}
          <rect width="400" height="300" rx="16" fill="#0b1712" />
          <circle cx="200" cy="80" r="65" fill="#143828" stroke="#22c55e" strokeWidth="2" strokeDasharray="4 3" opacity="0.4" />
          
          {/* Sun / Sky opening */}
          <ellipse cx="200" cy="75" rx="55" ry="40" fill="#1e3a2f" stroke="#4ade80" strokeWidth="3" />
          <circle cx="215" cy="65" r="16" fill="#fef08a" opacity="0.8" />
          <path d="M165 85 C 180 75, 210 70, 235 80" stroke="#86efac" strokeWidth="2" strokeLinecap="round" />

          {/* Well stone wall contours */}
          <path d="M0 0 L 145 75 L 120 300 L 0 300 Z" fill="#0d2419" stroke="#166534" strokeWidth="2" />
          <path d="M400 0 L 255 75 L 280 300 L 400 300 Z" fill="#0d2419" stroke="#166534" strokeWidth="2" />
          <path d="M60 120 L 140 100" stroke="#15803d" strokeWidth="2" strokeLinecap="round" />
          <path d="M70 180 L 130 165" stroke="#15803d" strokeWidth="2" strokeLinecap="round" />
          <path d="M260 110 L 340 130" stroke="#15803d" strokeWidth="2" strokeLinecap="round" />
          <path d="M270 170 L 330 190" stroke="#15803d" strokeWidth="2" strokeLinecap="round" />

          {/* Water pool at bottom */}
          <ellipse cx="200" cy="270" rx="90" ry="25" fill="#042f2e" stroke="#14b8a6" strokeWidth="2" />
          <path d="M150 268 C 170 265, 230 265, 250 268" stroke="#5eead4" strokeWidth="1.5" strokeLinecap="round" />

          {/* Hand-drawn Green Frog (Kawazu) sitting on mossy stone */}
          <ellipse cx="200" cy="245" rx="26" ry="16" fill="#15803d" stroke="#86efac" strokeWidth="2" />
          {/* Frog belly */}
          <ellipse cx="200" cy="248" rx="16" ry="10" fill="#bbf7d0" opacity="0.9" />
          {/* Eyes */}
          <circle cx="188" cy="232" r="7" fill="#22c55e" stroke="#86efac" strokeWidth="1.5" />
          <circle cx="212" cy="232" r="7" fill="#22c55e" stroke="#86efac" strokeWidth="1.5" />
          <circle cx="189" cy="231" r="3" fill="#052e16" />
          <circle cx="211" cy="231" r="3" fill="#052e16" />
          {/* Legs */}
          <path d="M176 250 C 165 245, 162 258, 175 258" stroke="#86efac" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M224 250 C 235 245, 238 258, 225 258" stroke="#86efac" strokeWidth="3" strokeLinecap="round" fill="none" />
          {/* Frog smile looking up */}
          <path d="M194 240 Q 200 244 206 240" stroke="#052e16" strokeWidth="1.5" strokeLinecap="round" fill="none" />

          {/* Water ripples & bubbles */}
          <circle cx="185" cy="265" r="1.5" fill="#a7f3d0" />
          <circle cx="215" cy="263" r="2" fill="#a7f3d0" />
          <circle cx="200" cy="272" r="1" fill="#a7f3d0" />

          {/* Red traditional Japanese seal stamp */}
          <rect x="345" y="245" width="38" height="38" rx="6" fill="#dc2626" opacity="0.85" />
          <text x="364" y="268" textAnchor="middle" fill="#fee2e2" fontSize="12" fontWeight="bold" fontFamily="sans-serif">
            井蛙
          </text>
        </svg>
      );

    case 'monkey_tree':
      // Khỉ ngã cây: Cành thông cổ thụ lá kim, chú khỉ trượt tay chới với giữa mùa thu lá đỏ
      return (
        <svg viewBox="0 0 400 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="300" rx="16" fill="#1c1306" />
          {/* Rising moon */}
          <circle cx="310" cy="80" r="50" fill="#78350f" opacity="0.3" />
          <circle cx="310" cy="80" r="35" fill="#fde68a" opacity="0.6" />

          {/* Ancient Pine Tree trunk & branch */}
          <path d="M0 60 C 80 80, 140 120, 240 110 C 290 105, 360 80, 400 70" stroke="#78350f" strokeWidth="18" strokeLinecap="round" />
          <path d="M150 115 C 190 170, 210 200, 230 260" stroke="#54280b" strokeWidth="10" strokeLinecap="round" />

          {/* Pine needles green clusters */}
          <ellipse cx="90" cy="65" rx="35" ry="18" fill="#14532d" opacity="0.8" />
          <ellipse cx="180" cy="95" rx="40" ry="20" fill="#166534" opacity="0.85" />
          <ellipse cx="270" cy="90" rx="30" ry="16" fill="#14532d" opacity="0.8" />
          {/* Falling red maple leaves */}
          <path d="M140 180 Q 150 170 155 185 Q 145 190 140 180 Z" fill="#ef4444" opacity="0.9" />
          <path d="M280 150 Q 290 140 295 155 Q 285 160 280 150 Z" fill="#f97316" opacity="0.85" />
          <path d="M330 210 Q 340 200 345 215 Q 335 220 330 210 Z" fill="#dc2626" opacity="0.75" />

          {/* Hand-drawn slipping Japanese Macaque */}
          {/* Body */}
          <ellipse cx="220" cy="175" rx="22" ry="26" fill="#78350f" stroke="#f59e0b" strokeWidth="1.5" />
          {/* Red face */}
          <circle cx="215" cy="155" r="14" fill="#ef4444" stroke="#fca5a5" strokeWidth="1.5" />
          <ellipse cx="215" cy="156" rx="9" ry="8" fill="#fee2e2" />
          {/* Eyes (surprised dots) */}
          <circle cx="211" cy="154" r="2" fill="#1e293b" />
          <circle cx="219" cy="154" r="2" fill="#1e293b" />
          {/* Open mouth */}
          <ellipse cx="215" cy="161" rx="2.5" ry="3" fill="#991b1b" />
          {/* Extended arms reaching back towards branch */}
          <path d="M205 165 C 190 140, 205 118, 225 116" stroke="#b45309" strokeWidth="6" strokeLinecap="round" fill="none" />
          <path d="M230 165 C 255 155, 275 140, 260 120" stroke="#b45309" strokeWidth="6" strokeLinecap="round" fill="none" />
          {/* Flailing legs */}
          <path d="M210 195 C 195 210, 190 230, 185 240" stroke="#78350f" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M230 195 C 240 215, 255 225, 265 235" stroke="#78350f" strokeWidth="5" strokeLinecap="round" fill="none" />
          {/* Curled tail */}
          <path d="M235 185 Q 260 190 250 175" stroke="#78350f" strokeWidth="4" strokeLinecap="round" fill="none" />

          {/* Traditional Stamp */}
          <rect x="345" y="245" width="38" height="38" rx="6" fill="#dc2626" opacity="0.85" />
          <text x="364" y="268" textAnchor="middle" fill="#fee2e2" fontSize="12" fontWeight="bold" fontFamily="sans-serif">
            猿落
          </text>
        </svg>
      );

    case 'daruma_fall':
      // Búp bê Daruma ngã rồi bật dậy: Daruma đỏ rực, vầng hào quang vàng, hoa mận mùa xuân
      return (
        <svg viewBox="0 0 400 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="300" rx="16" fill="#1f090d" />
          {/* Rising Sun Disk */}
          <circle cx="200" cy="140" r="95" fill="#7f1d1d" opacity="0.4" />
          <circle cx="200" cy="140" r="75" fill="#991b1b" opacity="0.3" />

          {/* Motion trail arc indicating spring back up */}
          <path d="M120 220 C 140 150, 260 150, 280 220" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5 5" fill="none" opacity="0.6" />
          <path d="M275 205 L 285 220 L 265 222" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />

          {/* Shadow Daruma (faded tilt) */}
          <g opacity="0.25" transform="rotate(-20 160 210)">
            <ellipse cx="160" cy="210" rx="42" ry="46" fill="#dc2626" />
            <circle cx="160" cy="190" r="26" fill="#fef2f2" />
          </g>

          {/* Main Upright Resilient Daruma */}
          <g transform="translate(200, 205)">
            {/* Red Bodhidharma Body */}
            <ellipse cx="0" cy="0" rx="50" ry="54" fill="#dc2626" stroke="#fca5a5" strokeWidth="2.5" />
            <ellipse cx="0" cy="2" rx="44" ry="48" fill="#b91c1c" />
            {/* White face panel */}
            <ellipse cx="0" cy="-16" rx="30" ry="24" fill="#fef2f2" stroke="#e2e8f0" strokeWidth="1.5" />
            {/* Heavy Crane eyebrows (matsuge) */}
            <path d="M-22 -22 Q -12 -30 -4 -20" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <path d="M22 -22 Q 12 -30 4 -20" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            {/* Determined Big Black Eyes */}
            <circle cx="-12" cy="-14" r="6" fill="#0f172a" />
            <circle cx="12" cy="-14" r="6" fill="#0f172a" />
            <circle cx="-14" cy="-16" r="2" fill="#ffffff" />
            <circle cx="10" cy="-16" r="2" fill="#ffffff" />
            {/* Turtle-tail mustache */}
            <path d="M-20 -4 Q 0 0 20 -4" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" fill="none" />
            {/* Resolute mouth */}
            <path d="M-8 0 Q 0 -3 8 0" stroke="#7f1d1d" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            {/* Gold character on chest: 必勝 (Hisshou) or 福 (Fuku) */}
            <circle cx="0" cy="24" r="14" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
            <text x="0" y="29" textAnchor="middle" fill="#78350f" fontSize="13" fontWeight="900" fontFamily="serif">
              勝
            </text>
          </g>

          {/* Plum blossoms floating */}
          <circle cx="80" cy="70" r="6" fill="#f43f5e" />
          <circle cx="95" cy="110" r="5" fill="#fb7185" />
          <circle cx="320" cy="90" r="7" fill="#f43f5e" />

          {/* Traditional Stamp */}
          <rect x="345" y="245" width="38" height="38" rx="6" fill="#dc2626" opacity="0.85" />
          <text x="364" y="268" textAnchor="middle" fill="#fee2e2" fontSize="12" fontWeight="bold" fontFamily="sans-serif">
            七起
          </text>
        </svg>
      );

    case 'cat_coin':
      // Mèo và đồng tiền vàng Koban
      return (
        <svg viewBox="0 0 400 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="300" rx="16" fill="#1c1917" />
          {/* Tatami straw lines backdrop */}
          <path d="M0 240 L 400 240" stroke="#44403c" strokeWidth="1.5" />
          <path d="M0 260 L 400 260" stroke="#292524" strokeWidth="1.5" />
          <path d="M0 280 L 400 280" stroke="#292524" strokeWidth="1.5" />

          {/* Golden Koban Coin (oval with ribs and characters) */}
          <g transform="translate(280, 220) rotate(-15)">
            <ellipse cx="0" cy="0" rx="38" ry="58" fill="#fbbf24" stroke="#d97706" strokeWidth="3" />
            <ellipse cx="0" cy="0" rx="34" ry="54" fill="#f59e0b" />
            {/* Horizontal coin ribs */}
            <line x1="-24" y1="-30" x2="24" y2="-30" stroke="#b45309" strokeWidth="2" strokeLinecap="round" />
            <line x1="-28" y1="-10" x2="28" y2="-10" stroke="#b45309" strokeWidth="2" strokeLinecap="round" />
            <line x1="-28" y1="10" x2="28" y2="10" stroke="#b45309" strokeWidth="2" strokeLinecap="round" />
            <line x1="-24" y1="30" x2="24" y2="30" stroke="#b45309" strokeWidth="2" strokeLinecap="round" />
            {/* Engraved Koban mark */}
            <rect x="-10" y="-8" width="20" height="16" rx="2" fill="#d97706" />
            <text x="0" y="4" textAnchor="middle" fill="#fef3c7" fontSize="10" fontWeight="bold">壱両</text>
          </g>

          {/* Calico Cat (Mike-neko) turning head away */}
          <g transform="translate(140, 190)">
            {/* Body */}
            <ellipse cx="0" cy="30" rx="42" ry="32" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
            {/* Brown/Orange calico patches */}
            <path d="M-20 15 Q -10 5 5 20 Q -5 40 -20 15 Z" fill="#d97706" />
            <path d="M15 30 Q 30 20 35 35 Q 25 50 15 30 Z" fill="#1e293b" />
            {/* Cat head */}
            <circle cx="-25" cy="-5" r="26" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
            <path d="M-40 -15 Q -25 -25 -15 -10 Z" fill="#d97706" />
            {/* Ears */}
            <polygon points="-42,-22 -32,-40 -20,-24" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
            <polygon points="-38,-22 -32,-34 -24,-24" fill="#fda4af" />
            <polygon points="-12,-24 0,-40 8,-20" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
            <polygon points="-8,-24 0,-34 4,-20" fill="#fda4af" />
            {/* Sleeping/Indifferent eyes (slits) */}
            <path d="M-38 -5 Q -32 -2 -28 -6" stroke="#475569" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M-20 -6 Q -15 -2 -10 -5" stroke="#475569" strokeWidth="2" strokeLinecap="round" fill="none" />
            {/* Pink nose & whiskers */}
            <circle cx="-24" cy="2" r="2" fill="#fb7185" />
            <line x1="-38" y1="2" x2="-52" y2="-2" stroke="#94a3b8" strokeWidth="1" />
            <line x1="-38" y1="5" x2="-50" y2="7" stroke="#94a3b8" strokeWidth="1" />
            <line x1="-12" y1="2" x2="2" y2="-2" stroke="#94a3b8" strokeWidth="1" />
            <line x1="-12" y1="5" x2="0" y2="7" stroke="#94a3b8" strokeWidth="1" />
            {/* Curled cat tail */}
            <path d="M38 35 C 60 40, 65 15, 55 5" stroke="#f8fafc" strokeWidth="9" strokeLinecap="round" fill="none" />
          </g>

          {/* Traditional Stamp */}
          <rect x="345" y="245" width="38" height="38" rx="6" fill="#dc2626" opacity="0.85" />
          <text x="364" y="268" textAnchor="middle" fill="#fee2e2" fontSize="12" fontWeight="bold" fontFamily="sans-serif">
            猫判
          </text>
        </svg>
      );

    case 'one_life_one_meeting':
      // Nhất kỳ nhất hội: Chén trà Matcha xanh, hoa cúc, làn khói tĩnh lặng
      return (
        <svg viewBox="0 0 400 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="300" rx="16" fill="#150e1f" />
          {/* Zen circle Enso */}
          <path
            d="M 200 45 A 95 95 0 1 1 140 68"
            stroke="#a855f7"
            strokeWidth="12"
            strokeLinecap="round"
            fill="none"
            opacity="0.3"
          />

          {/* Wooden Chashitsu table */}
          <path d="M40 230 L 360 230 L 380 280 L 20 280 Z" fill="#2e1065" stroke="#4c1d95" strokeWidth="1.5" />

          {/* Black Raku-yaki Tea Bowl (Chawan) */}
          <g transform="translate(200, 210)">
            <ellipse cx="0" cy="0" rx="46" ry="18" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
            <path d="M-46 0 C -46 28, -25 45, 0 46 C 25 45, 46 28, 46 0 Z" fill="#0f172a" stroke="#6366f1" strokeWidth="2" />
            {/* Rich Frothy Matcha Green Tea surface */}
            <ellipse cx="0" cy="2" rx="38" ry="13" fill="#15803d" />
            <ellipse cx="2" cy="3" rx="28" ry="9" fill="#22c55e" opacity="0.8" />
            {/* Whisk froth pattern */}
            <circle cx="-8" cy="2" r="3" fill="#86efac" opacity="0.7" />
            <circle cx="10" cy="3" r="2.5" fill="#86efac" opacity="0.7" />
          </g>

          {/* Gentle rising tea steam curl */}
          <path d="M195 190 Q 185 150 205 120 Q 215 90 195 60" stroke="#c084fc" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.6" />
          <path d="M210 185 Q 225 155 205 130 Q 195 105 215 80" stroke="#e9d5ff" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.4" />

          {/* Bamboo Chasen (tea whisk) lying beside */}
          <g transform="translate(100, 235) rotate(-30)">
            <rect x="0" y="0" width="10" height="28" rx="2" fill="#d97706" />
            <path d="M-6 28 L 16 28 L 20 48 L -10 48 Z" fill="#fde68a" stroke="#d97706" strokeWidth="1" />
          </g>

          {/* Single Chrysanthemum flower */}
          <circle cx="300" cy="225" r="9" fill="#fbbf24" />
          <circle cx="300" cy="225" r="4" fill="#b45309" />
          <path d="M300 234 L 320 250" stroke="#16a34a" strokeWidth="2" />

          {/* Traditional Stamp */}
          <rect x="345" y="245" width="38" height="38" rx="6" fill="#dc2626" opacity="0.85" />
          <text x="364" y="268" textAnchor="middle" fill="#fee2e2" fontSize="12" fontWeight="bold" fontFamily="sans-serif">
            一会
          </text>
        </svg>
      );

    case 'tiger_cave':
      // Hang cọp và ánh mắt chúa sơn lâm
      return (
        <svg viewBox="0 0 400 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="300" rx="16" fill="#140a04" />
          {/* Rocky cliff cave silhouette */}
          <path d="M0 0 L 160 0 L 110 80 L 140 180 L 70 300 L 0 300 Z" fill="#291406" stroke="#451a03" strokeWidth="2" />
          <path d="M400 0 L 240 0 L 290 80 L 260 180 L 330 300 L 400 300 Z" fill="#291406" stroke="#451a03" strokeWidth="2" />
          {/* Cave arch overhead */}
          <path d="M110 80 Q 200 40 290 80" stroke="#78350f" strokeWidth="8" strokeLinecap="round" fill="none" />

          {/* Glowing Tiger eyes and majestic face emerging from dark cavern */}
          <g transform="translate(200, 160)">
            {/* Tiger forehead stripes */}
            <path d="M-25 -50 Q 0 -40 25 -50" stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" fill="none" />
            <path d="M-15 -35 Q 0 -28 15 -35" stroke="#000000" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M0 -45 L 0 -25" stroke="#000000" strokeWidth="4" strokeLinecap="round" />
            {/* Wang character mark on tiger forehead 王 */}
            <line x1="-12" y1="-55" x2="12" y2="-55" stroke="#fbbf24" strokeWidth="3" />
            <line x1="-8" y1="-47" x2="8" y2="-47" stroke="#fbbf24" strokeWidth="2.5" />
            <line x1="-14" y1="-39" x2="14" y2="-39" stroke="#fbbf24" strokeWidth="3" />
            <line x1="0" y1="-55" x2="0" y2="-39" stroke="#fbbf24" strokeWidth="2.5" />
            {/* Fierce glowing yellow tiger eyes */}
            <ellipse cx="-28" cy="-15" rx="11" ry="7" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2" />
            <ellipse cx="28" cy="-15" rx="11" ry="7" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2" />
            <ellipse cx="-28" cy="-15" rx="3" ry="6" fill="#0f172a" />
            <ellipse cx="28" cy="-15" rx="3" ry="6" fill="#0f172a" />
            {/* Snout & Whiskers */}
            <polygon points="-8,4 8,4 0,14" fill="#fb7185" />
            <line x1="-15" y1="12" x2="-55" y2="8" stroke="#fef08a" strokeWidth="2" />
            <line x1="-15" y1="16" x2="-50" y2="20" stroke="#fef08a" strokeWidth="2" />
            <line x1="15" y1="12" x2="55" y2="8" stroke="#fef08a" strokeWidth="2" />
            <line x1="15" y1="16" x2="50" y2="20" stroke="#fef08a" strokeWidth="2" />
          </g>

          {/* Torch flame in adventurer hand */}
          <g transform="translate(80, 240)">
            <ellipse cx="0" cy="-25" rx="10" ry="18" fill="#f59e0b" opacity="0.9" />
            <ellipse cx="0" cy="-25" rx="5" ry="10" fill="#fef08a" />
            <line x1="0" y1="-10" x2="0" y2="25" stroke="#78350f" strokeWidth="4" />
          </g>

          {/* Traditional Stamp */}
          <rect x="345" y="245" width="38" height="38" rx="6" fill="#dc2626" opacity="0.85" />
          <text x="364" y="268" textAnchor="middle" fill="#fee2e2" fontSize="12" fontWeight="bold" fontFamily="sans-serif">
            虎穴
          </text>
        </svg>
      );

    case 'rain_earth':
      // Cơn mưa qua đất đầm lại: Cầu vồng rực rỡ, hạt mưa tạnh, mầm xanh vươn lên
      return (
        <svg viewBox="0 0 400 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="300" rx="16" fill="#081426" />
          {/* Clearing Rain Clouds with Golden Sunbeams */}
          <circle cx="280" cy="70" r="50" fill="#f59e0b" opacity="0.3" />
          <circle cx="280" cy="70" r="35" fill="#fef08a" opacity="0.75" />
          <path d="M40 70 Q 100 40 180 65 Q 240 50 300 75" stroke="#334155" strokeWidth="18" strokeLinecap="round" opacity="0.6" />
          {/* Luminous Rainbow Arcs */}
          <path d="M50 250 A 200 160 0 0 1 350 250" stroke="#f43f5e" strokeWidth="4" opacity="0.8" fill="none" />
          <path d="M56 250 A 194 154 0 0 1 344 250" stroke="#fbbf24" strokeWidth="4" opacity="0.8" fill="none" />
          <path d="M62 250 A 188 148 0 0 1 338 250" stroke="#10b981" strokeWidth="4" opacity="0.8" fill="none" />
          <path d="M68 250 A 182 142 0 0 1 332 250" stroke="#0ea5e9" strokeWidth="4" opacity="0.8" fill="none" />
          <path d="M74 250 A 176 136 0 0 1 326 250" stroke="#8b5cf6" strokeWidth="4" opacity="0.8" fill="none" />
          {/* Solidified Rich Dark Earth Mound */}
          <ellipse cx="200" cy="275" rx="190" ry="45" fill="#1c1917" stroke="#44403c" strokeWidth="3" />
          <ellipse cx="200" cy="265" rx="120" ry="20" fill="#292524" />
          {/* Fresh Resilient Green Sprout (Mầm xanh vươn mình) */}
          <path d="M200 255 Q 198 215 200 185" stroke="#15803d" strokeWidth="6" strokeLinecap="round" />
          {/* Left leaf */}
          <path d="M198 210 Q 165 195 160 215 Q 185 225 198 210 Z" fill="#22c55e" stroke="#16a34a" strokeWidth="1.5" />
          {/* Right leaf */}
          <path d="M202 195 Q 235 180 240 200 Q 215 210 202 195 Z" fill="#4ade80" stroke="#22c55e" strokeWidth="1.5" />
          {/* Raindrop sparkles glistening */}
          <circle cx="165" cy="205" r="3" fill="#ffffff" opacity="0.9" />
          <circle cx="230" cy="190" r="3" fill="#ffffff" opacity="0.9" />
          {/* Traditional Stamp */}
          <rect x="345" y="245" width="38" height="38" rx="6" fill="#dc2626" opacity="0.85" />
          <text x="364" y="268" textAnchor="middle" fill="#fee2e2" fontSize="12" fontWeight="bold" fontFamily="sans-serif">地固</text>
        </svg>
      );

    case 'kobo_brush':
      // Hoằng Pháp bất trạch bút: Cây bút lông vung nét chữ Tâm vàng rực trên giấy cuộn
      return (
        <svg viewBox="0 0 400 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="300" rx="16" fill="#180e08" />
          {/* Golden washi scroll backdrop */}
          <rect x="40" y="30" width="320" height="235" rx="10" fill="#26160c" stroke="#b45309" strokeWidth="3" />
          <rect x="55" y="45" width="290" height="205" rx="6" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
          {/* Dynamic Brush stroke in center: 字 "心" or "道" */}
          <path d="M120 135 C 130 90, 160 180, 200 170 C 235 160, 260 100, 275 140" stroke="#0f172a" strokeWidth="16" strokeLinecap="round" fill="none" />
          <path d="M160 85 C 170 70, 195 70, 190 95" stroke="#0f172a" strokeWidth="12" strokeLinecap="round" fill="none" />
          <circle cx="250" cy="90" r="9" fill="#0f172a" />
          <circle cx="215" cy="115" r="8" fill="#0f172a" />
          {/* Master Calligraphy Brush floating across paper */}
          <g transform="translate(265, 80) rotate(35)">
            {/* Bamboo Handle */}
            <rect x="-8" y="-120" width="16" height="130" rx="4" fill="#d97706" stroke="#78350f" strokeWidth="2" />
            <line x1="-8" y1="-80" x2="8" y2="-80" stroke="#78350f" strokeWidth="2" />
            <line x1="-8" y1="-40" x2="8" y2="-40" stroke="#78350f" strokeWidth="2" />
            {/* Ferrule (gold metal band) */}
            <rect x="-9" y="10" width="18" height="15" fill="#f59e0b" stroke="#b45309" strokeWidth="1" />
            {/* Black horsehair brush tip with wet ink */}
            <path d="M-9 25 C -9 55, 0 75, 0 75 C 0 75, 9 55, 9 25 Z" fill="#0f172a" />
            <circle cx="0" cy="78" r="3" fill="#0f172a" />
          </g>
          {/* Ink stone (Suzuri) in bottom corner */}
          <rect x="70" y="195" width="55" height="40" rx="6" fill="#1e293b" stroke="#475569" strokeWidth="2" />
          <ellipse cx="97" cy="215" rx="18" ry="12" fill="#090d16" />
          {/* Traditional Stamp */}
          <rect x="345" y="245" width="38" height="38" rx="6" fill="#dc2626" opacity="0.85" />
          <text x="364" y="268" textAnchor="middle" fill="#fee2e2" fontSize="12" fontWeight="bold" fontFamily="sans-serif">弘法</text>
        </svg>
      );

    case 'tanuki_skin':
      // Bắt chồn tính tiền da: Chú chồn Tanuki đội lá sen nháy mắt sau bụi tre, tiền vàng bay lượn
      return (
        <svg viewBox="0 0 400 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="300" rx="16" fill="#131c12" />
          {/* Bamboo stalks in backdrop */}
          {[-40, 40, 120, 200, 280, 360].map((x, i) => (
            <g key={i}>
              <line x1={x + 30} y1="0" x2={x + 30} y2="300" stroke="#166534" strokeWidth="12" />
              <line x1={x + 24} y1="80" x2={x + 36} y2="80" stroke="#22c55e" strokeWidth="2" />
              <line x1={x + 24} y1="180" x2={x + 36} y2="180" stroke="#22c55e" strokeWidth="2" />
            </g>
          ))}
          {/* Chubby Japanese Tanuki (Bake-danuki) */}
          <g transform="translate(180, 195)">
            {/* Round Tanuki Body */}
            <ellipse cx="0" cy="20" rx="55" ry="50" fill="#78350f" stroke="#b45309" strokeWidth="2" />
            {/* White belly */}
            <ellipse cx="0" cy="25" rx="35" ry="32" fill="#fef3c7" />
            {/* Head */}
            <circle cx="0" cy="-25" r="35" fill="#78350f" stroke="#b45309" strokeWidth="2" />
            {/* Black eye mask patches */}
            <ellipse cx="-15" cy="-25" rx="14" ry="10" fill="#1e293b" />
            <ellipse cx="15" cy="-25" rx="14" ry="10" fill="#1e293b" />
            {/* Winking eyes */}
            <path d="M-20 -25 Q -15 -30 -10 -25" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" fill="none" />
            <circle cx="15" cy="-25" r="4" fill="#ffffff" />
            <circle cx="16" cy="-26" r="2" fill="#000000" />
            {/* Nose & Smile */}
            <polygon points="-4,-15 4,-15 0,-10" fill="#1e293b" />
            <path d="M-6 -8 Q 0 -3 6 -8" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            {/* Green Lotus Leaf on Tanuki head (Henshin leaf) */}
            <ellipse cx="0" cy="-60" rx="22" ry="10" fill="#22c55e" stroke="#16a34a" strokeWidth="2" />
            <path d="M0 -60 L 5 -72" stroke="#15803d" strokeWidth="2" strokeLinecap="round" />
            {/* Big bushy striped tail */}
            <path d="M45 40 Q 85 20 80 55 Q 60 75 35 60 Z" fill="#92400e" stroke="#78350f" strokeWidth="2" />
          </g>
          {/* Floating Daydream Koban coins */}
          <g transform="translate(300, 110) rotate(-15)">
            <ellipse cx="0" cy="0" rx="22" ry="34" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
            <rect x="-6" y="-5" width="12" height="10" rx="1" fill="#b45309" />
          </g>
          <g transform="translate(325, 170) rotate(20)">
            <ellipse cx="0" cy="0" rx="18" ry="28" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
          </g>
          {/* Traditional Stamp */}
          <rect x="345" y="245" width="38" height="38" rx="6" fill="#dc2626" opacity="0.85" />
          <text x="364" y="268" textAnchor="middle" fill="#fee2e2" fontSize="12" fontWeight="bold" fontFamily="sans-serif">狸算</text>
        </svg>
      );

    case 'demon_iron':
      // Quỷ đỏ Oni cầm chùy sắt Kanabo: Dũng mãnh, sừng vàng, chùy gai vàng uy phong
      return (
        <svg viewBox="0 0 400 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="300" rx="16" fill="#200609" />
          {/* Flaming aura behind Oni */}
          <circle cx="200" cy="150" r="95" fill="#dc2626" opacity="0.3" />
          <circle cx="200" cy="150" r="70" fill="#ea580c" opacity="0.4" />
          {/* Red Oni Head & Shoulders */}
          <g transform="translate(160, 160)">
            {/* Crimson Oni Face */}
            <circle cx="0" cy="0" r="42" fill="#dc2626" stroke="#b91c1c" strokeWidth="2.5" />
            {/* Golden Horn */}
            <polygon points="-8,-42 8,-42 0,-75" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
            <line x1="-5" y1="-55" x2="5" y2="-55" stroke="#b45309" strokeWidth="1.5" />
            {/* Curly Wild Hair */}
            <ellipse cx="-30" cy="-30" rx="12" ry="12" fill="#1e293b" />
            <ellipse cx="30" cy="-30" rx="12" ry="12" fill="#1e293b" />
            <ellipse cx="0" cy="-45" rx="15" ry="10" fill="#1e293b" />
            {/* Fierce Yellow Eyes & Fangs */}
            <circle cx="-16" cy="-8" r="9" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
            <circle cx="16" cy="-8" r="9" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
            <circle cx="-16" cy="-8" r="4" fill="#0f172a" />
            <circle cx="16" cy="-8" r="4" fill="#0f172a" />
            {/* Broad nose */}
            <ellipse cx="0" cy="6" rx="8" ry="5" fill="#991b1b" />
            {/* Wide mouth with two sharp upturned white fangs */}
            <path d="M-22 18 Q 0 28 22 18" stroke="#450a0a" strokeWidth="3" fill="#7f1d1d" />
            <polygon points="-16,22 -12,22 -14,10" fill="#ffffff" />
            <polygon points="12,22 16,22 14,10" fill="#ffffff" />
          </g>
          {/* Massive Spiked Iron Club (Kanabo) held high */}
          <g transform="translate(270, 150) rotate(-15)">
            {/* Iron club shaft */}
            <polygon points="-14,-110 14,-110 8,80 -8,80" fill="#334155" stroke="#0f172a" strokeWidth="3" />
            {/* Golden Grip handle */}
            <rect x="-7" y="80" width="14" height="40" fill="#d97706" stroke="#b45309" strokeWidth="2" />
            <circle cx="0" cy="125" r="7" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
            {/* Spikes / Studs (Gai nhọn mạ vàng) */}
            {[-90, -60, -30, 0, 30, 60].map((y, i) => (
              <g key={i}>
                <polygon points={`-14,${y} -22,${y + 4} -14,${y + 8}`} fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
                <polygon points={`14,${y} 22,${y + 4} 14,${y + 8}`} fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
                <circle cx="0" cy={y + 4} r="3.5" fill="#fbbf24" />
              </g>
            ))}
          </g>
          {/* Traditional Stamp */}
          <rect x="345" y="245" width="38" height="38" rx="6" fill="#dc2626" opacity="0.85" />
          <text x="364" y="268" textAnchor="middle" fill="#fee2e2" fontSize="12" fontWeight="bold" fontFamily="sans-serif">金棒</text>
        </svg>
      );

    case 'stone_three_years':
      // Ngồi trên đá 3 năm: Thiền sư tọa thiền trên phiến đá rêu phong, hoa anh đào & tuyết trắng
      return (
        <svg viewBox="0 0 400 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="300" rx="16" fill="#0d1b1e" />
          {/* Full serene moon in night sky */}
          <circle cx="200" cy="90" r="55" fill="#e0f2fe" opacity="0.25" />
          <circle cx="200" cy="90" r="40" fill="#f8fafc" opacity="0.85" />
          {/* Spring cherry blossoms drifting on left */}
          <circle cx="80" cy="70" r="6" fill="#f43f5e" />
          <circle cx="110" cy="110" r="5" fill="#fb7185" />
          <circle cx="60" cy="140" r="7" fill="#fda4af" />
          {/* Winter snowflakes falling on right */}
          <circle cx="310" cy="65" r="4" fill="#ffffff" />
          <circle cx="340" cy="115" r="5" fill="#e2e8f0" />
          <circle cx="290" cy="150" r="4.5" fill="#ffffff" />
          {/* Massive Ancient Mossy Boulder (Tảng đá kiên cố) */}
          <ellipse cx="200" cy="245" rx="130" ry="40" fill="#334155" stroke="#475569" strokeWidth="3" />
          {/* Green moss patches on stone */}
          <path d="M120 240 Q 150 225 180 238 Q 150 250 120 240 Z" fill="#15803d" />
          <path d="M220 245 Q 260 230 290 242 Q 255 255 220 245 Z" fill="#16a34a" />
          {/* Zen Monk meditating in lotus posture (Zazen) */}
          <g transform="translate(200, 190)">
            {/* Robe body */}
            <path d="M-35 25 Q 0 -10 35 25 L 45 40 L -45 40 Z" fill="#ca8a04" stroke="#a16207" strokeWidth="2" />
            {/* Hands in Dhyana Mudra */}
            <ellipse cx="0" cy="28" rx="14" ry="7" fill="#fde047" />
            {/* Peaceful Head */}
            <circle cx="0" cy="-12" r="16" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
            {/* Serene eyes in meditation */}
            <path d="M-7 -12 Q -4 -9 -1 -12" stroke="#78350f" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <path d="M1 -12 Q 4 -9 7 -12" stroke="#78350f" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            {/* Calm smile */}
            <path d="M-4 -4 Q 0 -1 4 -4" stroke="#78350f" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          </g>
          {/* Traditional Stamp */}
          <rect x="345" y="245" width="38" height="38" rx="6" fill="#dc2626" opacity="0.85" />
          <text x="364" y="268" textAnchor="middle" fill="#fee2e2" fontSize="12" fontWeight="bold" fontFamily="sans-serif">三年</text>
        </svg>
      );

    case 'under_floor_hero':
      // Dưới gầm sàn nhà truyền thống: Cột xà Enoshita kiên định nâng đỡ mái ấm gia đình
      return (
        <svg viewBox="0 0 400 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="300" rx="16" fill="#120c18" />
          {/* Upper house room floor (Engawa) glowing warmly */}
          <rect x="0" y="40" width="400" height="75" fill="#451a03" stroke="#78350f" strokeWidth="3" />
          {/* Tatami edge & warm family silhouette above */}
          <line x1="0" y1="115" x2="400" y2="115" stroke="#f59e0b" strokeWidth="4" />
          <circle cx="160" cy="80" r="12" fill="#fbbf24" opacity="0.85" />
          <circle cx="240" cy="80" r="10" fill="#fbbf24" opacity="0.85" />
          <circle cx="200" cy="90" r="8" fill="#fde047" opacity="0.9" />
          {/* Under-floor Foundation Pillars (Cột xà gỗ vững chãi) */}
          {[-70, 70].map((offset, i) => (
            <g key={i} transform={`translate(${200 + offset}, 180)`}>
              {/* Foundation stone */}
              <ellipse cx="0" cy="70" rx="28" ry="12" fill="#475569" stroke="#64748b" strokeWidth="2" />
              {/* Heavy wooden pillar */}
              <rect x="-14" y="-65" width="28" height="135" fill="#78350f" stroke="#92400e" strokeWidth="2.5" />
            </g>
          ))}
          {/* Silent Hero Silhouette lifting the center crossbeam */}
          <g transform="translate(200, 185)">
            {/* Center Pillar */}
            <rect x="-12" y="-70" width="24" height="140" fill="#92400e" stroke="#b45309" strokeWidth="2.5" />
            {/* Golden radiant aura of silent contribution */}
            <circle cx="0" cy="0" r="40" fill="#f59e0b" opacity="0.25" />
            {/* Muscular arms holding beam */}
            <path d="M-30 -30 L -12 -55 M 30 -30 L 12 -55" stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" />
          </g>
          {/* Traditional Stamp */}
          <rect x="345" y="245" width="38" height="38" rx="6" fill="#dc2626" opacity="0.85" />
          <text x="364" y="268" textAnchor="middle" fill="#fee2e2" fontSize="12" fontWeight="bold" fontFamily="sans-serif">縁下</text>
        </svg>
      );

    case 'sleeping_on_brushwood':
      // Ngọa tân nếm mật: Câu Tiễn nằm trên củi gai, nếm mật đắng dưới trăng đêm
      return (
        <svg viewBox="0 0 400 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="300" rx="16" fill="#0f0d1a" />
          {/* Cold Blue Night Moon */}
          <circle cx="310" cy="75" r="45" fill="#38bdf8" opacity="0.2" />
          <circle cx="310" cy="75" r="32" fill="#bae6fd" opacity="0.85" />
          {/* Burning Campfire Embers illuminating resolve */}
          <circle cx="90" cy="220" r="45" fill="#ea580c" opacity="0.3" />
          <path d="M70 240 L 110 215 M 80 210 L 105 245" stroke="#78350f" strokeWidth="6" strokeLinecap="round" />
          <ellipse cx="90" cy="210" rx="12" ry="20" fill="#f59e0b" />
          <ellipse cx="90" cy="212" rx="6" ry="10" fill="#fef08a" />
          {/* Bed of Thorny Brushwood sticks (Đống củi gai nhọn) */}
          <g transform="translate(220, 230)">
            {[-60, -35, -10, 15, 40, 65].map((x, idx) => (
              <line key={idx} x1={x - 20} y1={10 - (idx % 2) * 8} x2={x + 20} y2={-10 + (idx % 2) * 8} stroke="#78350f" strokeWidth="5" strokeLinecap="round" />
            ))}
            {/* Thorns */}
            <polygon points="-25,-2 -22,-14 -19,-2" fill="#d97706" />
            <polygon points="15,-4 18,-16 21,-4" fill="#d97706" />
          </g>
          {/* Hanging Bitter Gall Bladder over bed */}
          <g transform="translate(220, 115)">
            <line x1="0" y1="-50" x2="0" y2="0" stroke="#94a3b8" strokeWidth="2" strokeDasharray="3 3" />
            {/* Dark green-gold gall */}
            <path d="M0 0 C -12 10, -14 30, 0 42 C 14 30, 12 10, 0 0 Z" fill="#15803d" stroke="#86efac" strokeWidth="2" />
            <circle cx="0" cy="48" r="3" fill="#86efac" />
          </g>
          {/* Traditional Stamp */}
          <rect x="345" y="245" width="38" height="38" rx="6" fill="#dc2626" opacity="0.85" />
          <text x="364" y="268" textAnchor="middle" fill="#fee2e2" fontSize="12" fontWeight="bold" fontFamily="sans-serif">臥薪</text>
        </svg>
      );

    case 'horse_ear_prayer':
      // Ngựa nghe kinh Phật: Chú ngựa trắng thản nhiên nhai cỏ bên mõ tụng kinh & chuỗi tràng hạt
      return (
        <svg viewBox="0 0 400 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="300" rx="16" fill="#141416" />
          {/* Golden Halo of Buddhist Sutra chant */}
          <circle cx="110" cy="180" r="75" fill="#ca8a04" opacity="0.25" />
          {/* Wooden Fish Bell (Mokugyo) */}
          <g transform="translate(110, 205)">
            <ellipse cx="0" cy="0" rx="38" ry="32" fill="#78350f" stroke="#b45309" strokeWidth="3" />
            <ellipse cx="0" cy="-6" rx="24" ry="16" fill="#a16207" />
            {/* Mokugyo slit opening */}
            <path d="M-22 10 Q 0 0 22 10" stroke="#1c1917" strokeWidth="5" strokeLinecap="round" fill="none" />
            {/* Wooden striker mallets */}
            <line x1="-35" y1="-30" x2="-15" y2="-5" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" />
            {/* Rosary prayer beads (Juzu) around mokugyo */}
            {[-25, -15, -5, 5, 15, 25].map((x, i) => (
              <circle key={i} cx={x} cy={26} r="4" fill="#fbbf24" />
            ))}
          </g>
          {/* Noble White Horse facing away, chewing fresh green grass */}
          <g transform="translate(260, 160)">
            {/* Horse Mane & Neck */}
            <path d="M-30 80 Q -10 20 20 -20 Q 55 -30 65 30 L 40 80 Z" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
            {/* Horse Head */}
            <ellipse cx="45" cy="15" rx="30" ry="42" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2" />
            {/* Erect Horse Ear pointing forward (nhưng không thèm nghe) */}
            <polygon points="40,-35 55,-60 65,-30" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
            <polygon points="45,-33 55,-50 60,-30" fill="#fda4af" />
            {/* Content, sleepy eye */}
            <path d="M30 5 Q 38 12 45 6" stroke="#475569" strokeWidth="3" strokeLinecap="round" fill="none" />
            {/* Green grass bunch hanging from horse mouth */}
            <path d="M60 40 Q 85 55 95 75" stroke="#22c55e" strokeWidth="4" strokeLinecap="round" />
            <path d="M58 45 Q 75 70 80 85" stroke="#16a34a" strokeWidth="3.5" strokeLinecap="round" />
          </g>
          {/* Traditional Stamp */}
          <rect x="345" y="245" width="38" height="38" rx="6" fill="#dc2626" opacity="0.85" />
          <text x="364" y="268" textAnchor="middle" fill="#fee2e2" fontSize="12" fontWeight="bold" fontFamily="sans-serif">念仏</text>
        </svg>
      );

    case 'lake_biwa_round':
      // Dục tốc bất đạt (Isogaba maware): Đường bộ ven hồ Biwa an bình, thuyền gặp sóng dữ
      return (
        <svg viewBox="0 0 400 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="300" rx="16" fill="#0c1926" />
          {/* Blue Lake Biwa with stormy waves in middle */}
          <ellipse cx="200" cy="170" rx="190" ry="85" fill="#0369a1" opacity="0.4" />
          <path d="M60 160 Q 110 140 160 165 Q 210 145 260 165 Q 310 145 360 160" stroke="#38bdf8" strokeWidth="2" fill="none" />
          {/* Fragile boat rocking in stormy center waves */}
          <g transform="translate(180, 155) rotate(-20)">
            <path d="M-25 0 Q 0 -5 25 0 L 20 12 L -20 12 Z" fill="#78350f" stroke="#b45309" strokeWidth="2" />
            <line x1="0" y1="-25" x2="0" y2="0" stroke="#f8fafc" strokeWidth="2" />
            <polygon points="0,-25 18,-15 0,-5" fill="#f1f5f9" opacity="0.8" />
          </g>
          {/* Safe winding coastal road under Mount Hiei pine trees */}
          <path d="M0 250 Q 150 210 280 235 Q 340 245 400 230 L 400 300 L 0 300 Z" fill="#1e293b" stroke="#334155" strokeWidth="2" />
          <path d="M0 260 Q 150 220 280 245 Q 340 255 400 240" stroke="#f59e0b" strokeWidth="4" strokeDasharray="6 4" fill="none" />
          {/* Traveler in straw hat (sugegasa) walking leisurely on road */}
          <g transform="translate(130, 230)">
            <ellipse cx="0" cy="-25" rx="14" ry="4" fill="#fbbf24" stroke="#d97706" strokeWidth="1.5" />
            <path d="M-6 -22 L -8 0 L -4 18 M 6 -22 L 8 0 L 4 18" stroke="#f8fafc" strokeWidth="3" />
            <line x1="8" y1="-15" x2="16" y2="20" stroke="#b45309" strokeWidth="2" />
          </g>
          {/* Traditional Stamp */}
          <rect x="345" y="245" width="38" height="38" rx="6" fill="#dc2626" opacity="0.85" />
          <text x="364" y="268" textAnchor="middle" fill="#fee2e2" fontSize="12" fontWeight="bold" fontFamily="sans-serif">回道</text>
        </svg>
      );

    case 'laughing_gate':
      // Cười rạng rỡ đón phúc (Warau kado ni wa fuku kitaru): Cổng nhà hoa đào ngập tràn may mắn
      return (
        <svg viewBox="0 0 400 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="300" rx="16" fill="#240e15" />
          {/* Golden Sunrise beaming through gate */}
          <circle cx="200" cy="130" r="85" fill="#f59e0b" opacity="0.3" />
          <circle cx="200" cy="130" r="55" fill="#fef08a" opacity="0.65" />
          {/* Traditional Japanese Gate (Torii / Kado) */}
          <g transform="translate(200, 160)">
            {/* Top lintel beam */}
            <rect x="-140" y="-110" width="280" height="18" rx="4" fill="#dc2626" stroke="#b91c1c" strokeWidth="2.5" />
            <rect x="-120" y="-90" width="240" height="12" rx="3" fill="#dc2626" />
            {/* Left & Right Gate Pillars */}
            <rect x="-95" y="-90" width="18" height="150" fill="#dc2626" stroke="#991b1b" strokeWidth="2" />
            <rect x="77" y="-90" width="18" height="150" fill="#dc2626" stroke="#991b1b" strokeWidth="2" />
          </g>
          {/* Smiling Mask of Happiness (Otafuku / Okame) */}
          <g transform="translate(200, 165)">
            {/* Round face */}
            <circle cx="0" cy="0" r="32" fill="#fff1f2" stroke="#fecdd3" strokeWidth="2" />
            {/* Chubby pink cheeks */}
            <circle cx="-16" cy="6" r="8" fill="#fda4af" opacity="0.8" />
            <circle cx="16" cy="6" r="8" fill="#fda4af" opacity="0.8" />
            {/* Beaming crescent smiling eyes */}
            <path d="M-18 -6 Q -12 2 -6 -6" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M6 -6 Q 12 2 18 -6" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" fill="none" />
            {/* Happy small laughing mouth */}
            <path d="M-6 12 Q 0 20 6 12 Z" fill="#e11d48" />
          </g>
          {/* Falling golden coins and cherry blossoms */}
          <circle cx="90" cy="90" r="10" fill="#fbbf24" stroke="#d97706" strokeWidth="1.5" />
          <circle cx="310" cy="100" r="12" fill="#fbbf24" stroke="#d97706" strokeWidth="1.5" />
          <circle cx="120" cy="60" r="6" fill="#f43f5e" />
          <circle cx="280" cy="55" r="7" fill="#fb7185" />
          {/* Traditional Stamp */}
          <rect x="345" y="245" width="38" height="38" rx="6" fill="#dc2626" opacity="0.85" />
          <text x="364" y="268" textAnchor="middle" fill="#fee2e2" fontSize="12" fontWeight="bold" fontFamily="sans-serif">笑門</text>
        </svg>
      );

    case 'yielding_win':
      // Lấy nhu thắng cương (Makeru ga kachi): Cành liễu uốn mình theo tuyết rơi không gãy
      return (
        <svg viewBox="0 0 400 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="300" rx="16" fill="#0d1b18" />
          {/* Cold Winter Moon */}
          <circle cx="310" cy="75" r="40" fill="#e2e8f0" opacity="0.3" />
          <circle cx="310" cy="75" r="28" fill="#f8fafc" opacity="0.85" />
          {/* Weeping Willow (Yanagi) trunk and gracefully drooping branches */}
          <path d="M0 60 Q 120 70 170 110" stroke="#78350f" strokeWidth="12" strokeLinecap="round" />
          {/* Drooping supple branches bearing snow gracefully */}
          <path d="M140 100 Q 120 180 90 240" stroke="#15803d" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M165 110 Q 160 190 145 250" stroke="#16a34a" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          <path d="M175 110 Q 200 180 190 245" stroke="#22c55e" strokeWidth="4" strokeLinecap="round" fill="none" />
          {/* Heavy snow pillows resting on branches without snapping them */}
          <ellipse cx="115" cy="165" rx="12" ry="5" fill="#f8fafc" />
          <ellipse cx="155" cy="180" rx="14" ry="6" fill="#f8fafc" />
          <ellipse cx="195" cy="185" rx="11" ry="5" fill="#f8fafc" />
          {/* Resilient smiling Okiagari-koboshi tumbler doll in foreground */}
          <g transform="translate(260, 220)">
            <ellipse cx="0" cy="10" rx="28" ry="24" fill="#dc2626" stroke="#b91c1c" strokeWidth="2" />
            <circle cx="0" cy="-14" r="16" fill="#fff1f2" stroke="#fecdd3" strokeWidth="1.5" />
            {/* Determined smiling face */}
            <circle cx="-5" cy="-16" r="2" fill="#0f172a" />
            <circle cx="5" cy="-16" r="2" fill="#0f172a" />
            <path d="M-5 -9 Q 0 -6 5 -9" stroke="#991b1b" strokeWidth="2" strokeLinecap="round" fill="none" />
          </g>
          {/* Traditional Stamp */}
          <rect x="345" y="245" width="38" height="38" rx="6" fill="#dc2626" opacity="0.85" />
          <text x="364" y="268" textAnchor="middle" fill="#fee2e2" fontSize="12" fontWeight="bold" fontFamily="sans-serif">負勝</text>
        </svg>
      );

    case 'dust_mountain':
      // Tích tiểu thành đại: Núi Phú Sĩ tuyết phủ soi bóng mặt hồ tĩnh lặng
      return (
        <svg viewBox="0 0 400 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="300" rx="16" fill="#0a192f" />
          {/* Crimson Red Sun rising behind Mount Fuji */}
          <circle cx="200" cy="115" r="55" fill="#dc2626" opacity="0.85" />

          {/* Majestic Mount Fuji silhouette */}
          <polygon points="40,240 200,80 360,240" fill="#1e293b" stroke="#334155" strokeWidth="2" />
          {/* Snow cap zigzag */}
          <polygon points="170,113 200,80 230,113 218,125 210,118 200,130 190,118 182,126" fill="#f8fafc" />

          {/* Golden floating dust particles accumulating */}
          {[
            [120, 100], [140, 70], [160, 95], [230, 85], [260, 75],
            [250, 110], [90, 150], [310, 140], [180, 50], [215, 45]
          ].map(([x, y], idx) => (
            <circle key={idx} cx={x} cy={y} r="2.5" fill="#fde047" opacity="0.8" />
          ))}

          {/* Pine trees in foreground */}
          <path d="M0 240 Q 200 235 400 240 L 400 300 L 0 300 Z" fill="#0f172a" />
          <polygon points="60,240 70,210 80,240" fill="#166534" />
          <polygon points="55,225 70,195 85,225" fill="#15803d" />
          <polygon points="320,245 330,215 340,245" fill="#166534" />
          <polygon points="315,230 330,200 345,230" fill="#15803d" />

          {/* Lake water ripples */}
          <ellipse cx="200" cy="275" rx="120" ry="12" fill="#0284c7" opacity="0.2" />
          <line x1="120" y1="270" x2="280" y2="270" stroke="#38bdf8" strokeWidth="1" strokeLinecap="round" opacity="0.6" />

          {/* Traditional Stamp */}
          <rect x="345" y="245" width="38" height="38" rx="6" fill="#dc2626" opacity="0.85" />
          <text x="364" y="268" textAnchor="middle" fill="#fee2e2" fontSize="12" fontWeight="bold" fontFamily="sans-serif">
            塵山
          </text>
        </svg>
      );

    case 'dango_flower':
      // Bánh Dango và hoa đào
      return (
        <svg viewBox="0 0 400 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="300" rx="16" fill="#200d17" />
          {/* Sakura branch */}
          <path d="M0 70 Q 120 40 220 90 Q 320 140 400 80" stroke="#78350f" strokeWidth="7" strokeLinecap="round" />
          {/* Pink blossoms */}
          {[[70, 50], [130, 45], [170, 75], [240, 100], [290, 115], [340, 85], [370, 75]].map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="10" fill="#f43f5e" opacity="0.9" />
              <circle cx={x} cy={y} r="4" fill="#fef08a" />
            </g>
          ))}

          {/* Three-Color Dango skewer (Hanami Dango) in foreground */}
          <g transform="translate(200, 210) rotate(-25)">
            {/* Bamboo skewer */}
            <line x1="-100" y1="0" x2="90" y2="0" stroke="#b45309" strokeWidth="4" strokeLinecap="round" />
            {/* 1. Pink Dango (Sakura) */}
            <circle cx="50" cy="0" r="22" fill="#fb7185" stroke="#f43f5e" strokeWidth="1.5" />
            <circle cx="45" cy="-6" r="4" fill="#ffffff" opacity="0.5" />
            {/* 2. White Dango (Snow melt) */}
            <circle cx="0" cy="0" r="22" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
            <circle cx="-5" cy="-6" r="4" fill="#ffffff" opacity="0.6" />
            {/* 3. Green Dango (Mugwort/Grass) */}
            <circle cx="-50" cy="0" r="22" fill="#22c55e" stroke="#16a34a" strokeWidth="1.5" />
            <circle cx="-55" cy="-6" r="4" fill="#ffffff" opacity="0.5" />
          </g>

          {/* Traditional Stamp */}
          <rect x="345" y="245" width="38" height="38" rx="6" fill="#dc2626" opacity="0.85" />
          <text x="364" y="268" textAnchor="middle" fill="#fee2e2" fontSize="12" fontWeight="bold" fontFamily="sans-serif">
            花団
          </text>
        </svg>
      );

    case 'crane_voice':
      // Tiếng hạc cất lên: Bạch hạc vươn cánh giữa rặng mây đỏ
      return (
        <svg viewBox="0 0 400 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="300" rx="16" fill="#111827" />
          <circle cx="200" cy="150" r="85" fill="#991b1b" opacity="0.3" />
          <circle cx="200" cy="150" r="60" fill="#dc2626" opacity="0.8" />
          {/* Cloud waves */}
          <path d="M40 240 Q 120 200 200 240 Q 280 280 360 230" stroke="#f8fafc" strokeWidth="2" strokeDasharray="3 3" opacity="0.4" />
          {/* White Crane Body & Wings */}
          <path d="M160 160 Q 200 120 240 160 Q 200 200 160 160 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="2" />
          <path d="M140 150 Q 80 100 130 80 Q 170 120 180 150 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
          <path d="M220 150 Q 300 90 290 80 Q 230 110 210 150 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
          {/* Crane neck and head */}
          <path d="M220 145 Q 245 105 240 85" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />
          <circle cx="240" cy="85" r="4.5" fill="#dc2626" />
          <path d="M242 85 L 265 83" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
          {/* Sound waves radiating */}
          <path d="M260 70 Q 275 80 265 95" stroke="#fef08a" strokeWidth="2" fill="none" />
          <path d="M272 63 Q 295 78 280 105" stroke="#fef08a" strokeWidth="1.5" strokeDasharray="2 2" fill="none" />
          {/* Traditional Stamp */}
          <rect x="345" y="245" width="38" height="38" rx="6" fill="#dc2626" opacity="0.85" />
          <text x="364" y="268" textAnchor="middle" fill="#fee2e2" fontSize="12" fontWeight="bold" fontFamily="sans-serif">鶴声</text>
        </svg>
      );

    case 'chestnut_fire':
      // Hạt dẻ trong đống than hồng
      return (
        <svg viewBox="0 0 400 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="300" rx="16" fill="#1c100b" />
          {/* Fiery campfire glow */}
          <circle cx="200" cy="210" r="90" fill="#ea580c" opacity="0.25" />
          <circle cx="200" cy="220" r="50" fill="#dc2626" opacity="0.5" />
          {/* Burning charcoal logs */}
          <path d="M120 250 L 280 230" stroke="#451a03" strokeWidth="18" strokeLinecap="round" />
          <path d="M140 220 L 260 255" stroke="#292524" strokeWidth="16" strokeLinecap="round" />
          {/* Glowing embers */}
          <circle cx="160" cy="235" r="4" fill="#fbbf24" />
          <circle cx="230" cy="225" r="5" fill="#f97316" />
          <circle cx="205" cy="245" r="3.5" fill="#fde047" />
          {/* Chestnuts (Kuri) popping out with smoke */}
          <g transform="translate(195, 170) rotate(-15)">
            <ellipse cx="0" cy="0" rx="20" ry="16" fill="#78350f" stroke="#b45309" strokeWidth="2" />
            <path d="M-15 4 Q 0 16 15 4 Z" fill="#d97706" />
            <circle cx="0" cy="-6" r="3" fill="#fef3c7" opacity="0.4" />
          </g>
          <g transform="translate(235, 185) rotate(25)">
            <ellipse cx="0" cy="0" rx="16" ry="13" fill="#78350f" stroke="#d97706" strokeWidth="1.5" />
            <path d="M-12 3 Q 0 13 12 3 Z" fill="#b45309" />
          </g>
          {/* Smoke trails */}
          <path d="M195 145 Q 180 110 205 80 Q 220 50 200 30" stroke="#fed7aa" strokeWidth="2" strokeDasharray="3 3" opacity="0.6" />
          {/* Traditional Stamp */}
          <rect x="345" y="245" width="38" height="38" rx="6" fill="#dc2626" opacity="0.85" />
          <text x="364" y="268" textAnchor="middle" fill="#fee2e2" fontSize="12" fontWeight="bold" fontFamily="sans-serif">火栗</text>
        </svg>
      );

    case 'moon_suppon':
      // Vầng trăng tròn và chú ba ba bên hồ
      return (
        <svg viewBox="0 0 400 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="300" rx="16" fill="#030712" />
          {/* Radiant Full Moon */}
          <circle cx="270" cy="90" r="50" fill="#fef08a" stroke="#fde047" strokeWidth="3" opacity="0.95" />
          <circle cx="270" cy="90" r="75" fill="#fde047" opacity="0.12" />
          {/* Moon craters shadow */}
          <circle cx="255" cy="80" r="10" fill="#facc15" opacity="0.4" />
          <circle cx="280" cy="100" r="14" fill="#facc15" opacity="0.3" />
          {/* Pond water below */}
          <path d="M0 200 Q 150 180 400 205 L 400 300 L 0 300 Z" fill="#082f49" />
          <ellipse cx="200" cy="265" rx="160" ry="25" fill="#0c4a6e" opacity="0.6" />
          <path d="M80 250 Q 200 240 320 250" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.5" />
          {/* Suppon (Softshell Turtle) on mossy stone */}
          <ellipse cx="120" cy="235" rx="42" ry="24" fill="#14532d" stroke="#4ade80" strokeWidth="2" />
          <ellipse cx="120" cy="235" rx="32" ry="18" fill="#166534" stroke="#22c55e" strokeWidth="1.5" />
          {/* Turtle head looking up at moon */}
          <ellipse cx="165" cy="225" rx="14" ry="9" fill="#15803d" stroke="#4ade80" strokeWidth="1.5" />
          <circle cx="170" cy="222" r="2.5" fill="#000000" />
          {/* Traditional Stamp */}
          <rect x="345" y="245" width="38" height="38" rx="6" fill="#dc2626" opacity="0.85" />
          <text x="364" y="268" textAnchor="middle" fill="#fee2e2" fontSize="12" fontWeight="bold" fontFamily="sans-serif">月鼈</text>
        </svg>
      );

    case 'early_bird':
      // Dậy sớm được 3 đồng xu & bình minh mặt trời đỏ
      return (
        <svg viewBox="0 0 400 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="300" rx="16" fill="#180e06" />
          {/* Rising Red Morning Sun */}
          <circle cx="200" cy="110" r="65" fill="#ea580c" stroke="#f97316" strokeWidth="3" opacity="0.9" />
          {/* Morning mist */}
          <path d="M0 160 Q 150 140 400 160" stroke="#fdba74" strokeWidth="2" opacity="0.5" />
          <path d="M20 180 Q 220 165 380 180" stroke="#fed7aa" strokeWidth="2" strokeDasharray="4 3" opacity="0.4" />
          {/* 3 Ancient Copper Coins (Sanmon) in foreground */}
          {[-55, 0, 55].map((offset, i) => (
            <g key={i} transform={`translate(${200 + offset}, 235)`}>
              <circle cx="0" cy="0" r="24" fill="#b45309" stroke="#fbbf24" strokeWidth="2.5" />
              <rect x="-7" y="-7" width="14" height="14" fill="#180e06" stroke="#fbbf24" strokeWidth="1.5" />
              <circle cx="0" cy="0" r="16" fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2 2" />
            </g>
          ))}
          {/* Little morning bird silhouette */}
          <path d="M120 85 Q 135 75 145 88 Q 135 95 120 85 Z" fill="#fef08a" />
          <path d="M130 82 L 125 70" stroke="#fef08a" strokeWidth="1.5" />
          {/* Traditional Stamp */}
          <rect x="345" y="245" width="38" height="38" rx="6" fill="#dc2626" opacity="0.85" />
          <text x="364" y="268" textAnchor="middle" fill="#fee2e2" fontSize="12" fontWeight="bold" fontFamily="sans-serif">早徳</text>
        </svg>
      );

    case 'three_arrows':
      // Ba mũi tên bó chặt (Mōri Motonari)
      return (
        <svg viewBox="0 0 400 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="300" rx="16" fill="#0b1329" />
          <circle cx="200" cy="150" r="80" fill="#1e3a8a" opacity="0.3" />
          {/* Bundle of 3 Arrows tied together with red ribbon */}
          <g transform="translate(200, 150) rotate(-45)">
            {/* Arrow 1 */}
            <line x1="-120" y1="-12" x2="120" y2="-12" stroke="#d97706" strokeWidth="6" strokeLinecap="round" />
            {/* Arrow 2 (Center) */}
            <line x1="-130" y1="0" x2="130" y2="0" stroke="#b45309" strokeWidth="7" strokeLinecap="round" />
            {/* Arrow 3 */}
            <line x1="-120" y1="12" x2="120" y2="12" stroke="#d97706" strokeWidth="6" strokeLinecap="round" />
            {/* Arrowheads */}
            <polygon points="130,-12 110,-18 110,-6" fill="#94a3b8" />
            <polygon points="140,0 120,-8 120,8" fill="#cbd5e1" />
            <polygon points="130,12 110,6 110,18" fill="#94a3b8" />
            {/* Feathers at tail */}
            <path d="M-130 -12 L -115 -20 M -125 -12 L -110 -20" stroke="#f8fafc" strokeWidth="2.5" />
            <path d="M-140 0 L -125 -10 M -135 0 L -120 -10" stroke="#f8fafc" strokeWidth="3" />
            <path d="M-130 12 L -115 4 M -125 12 L -110 4" stroke="#f8fafc" strokeWidth="2.5" />
            {/* Red cord binding all three tightly */}
            <rect x="-20" y="-18" width="40" height="36" rx="4" fill="#dc2626" stroke="#f87171" strokeWidth="2" />
            <line x1="-15" y1="-18" x2="15" y2="18" stroke="#fef08a" strokeWidth="1.5" />
            <line x1="15" y1="-18" x2="-15" y2="18" stroke="#fef08a" strokeWidth="1.5" />
          </g>
          {/* Traditional Stamp */}
          <rect x="345" y="245" width="38" height="38" rx="6" fill="#dc2626" opacity="0.85" />
          <text x="364" y="268" textAnchor="middle" fill="#fee2e2" fontSize="12" fontWeight="bold" fontFamily="sans-serif">三矢</text>
        </svg>
      );

    case 'botamochi_shelf':
      // Bánh Botamochi rơi trúng từ trên kệ
      return (
        <svg viewBox="0 0 400 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="300" rx="16" fill="#1a1118" />
          {/* Wooden Shelf (Tana) at top */}
          <rect x="60" y="50" width="280" height="18" rx="4" fill="#78350f" stroke="#92400e" strokeWidth="2" />
          <rect x="90" y="68" width="12" height="60" fill="#451a03" />
          <rect x="298" y="68" width="12" height="60" fill="#451a03" />
          {/* Lucky golden aura */}
          <circle cx="200" cy="180" r="70" fill="#f59e0b" opacity="0.2" />
          {/* Sweet Red Bean Botamochi rice cake tumbling down */}
          <g transform="translate(200, 160)">
            <ellipse cx="0" cy="0" rx="38" ry="28" fill="#450a0a" stroke="#7f1d1d" strokeWidth="2.5" />
            {/* Sweet azuki bean texture */}
            <circle cx="-12" cy="-6" r="5" fill="#7f1d1d" />
            <circle cx="8" cy="-8" r="6" fill="#7f1d1d" />
            <circle cx="-2" cy="6" r="6.5" fill="#7f1d1d" />
            <circle cx="15" cy="5" r="4.5" fill="#7f1d1d" />
            {/* White sugar/rice sparkle */}
            <circle cx="-5" cy="-2" r="2.5" fill="#ffffff" opacity="0.8" />
            <circle cx="10" cy="2" r="2" fill="#ffffff" opacity="0.7" />
          </g>
          {/* Motion trails */}
          <path d="M190 85 L 195 125" stroke="#fef08a" strokeWidth="2" strokeDasharray="3 3" />
          <path d="M210 85 L 205 125" stroke="#fef08a" strokeWidth="2" strokeDasharray="3 3" />
          {/* Traditional Stamp */}
          <rect x="345" y="245" width="38" height="38" rx="6" fill="#dc2626" opacity="0.85" />
          <text x="364" y="268" textAnchor="middle" fill="#fee2e2" fontSize="12" fontWeight="bold" fontFamily="sans-serif">棚餅</text>
        </svg>
      );

    default:
      // General elegant Japanese brush & scroll motif
      return (
        <svg viewBox="0 0 400 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="300" rx="16" fill="#0f172a" />
          <circle cx="200" cy="140" r="70" fill="#dc2626" opacity="0.25" />
          <circle cx="200" cy="140" r="50" fill="#dc2626" opacity="0.5" />
          {/* Scroll ribbon */}
          <path d="M80 220 Q 200 180 320 220" stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" />
          <path d="M120 140 Q 200 80 280 140" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
          {/* Calligraphy ink character */}
          <text x="200" y="160" textAnchor="middle" fill="#f8fafc" fontSize="42" fontWeight="bold" fontFamily="serif">
            道
          </text>
          {/* Traditional Stamp */}
          <rect x="345" y="245" width="38" height="38" rx="6" fill="#dc2626" opacity="0.85" />
          <text x="364" y="268" textAnchor="middle" fill="#fee2e2" fontSize="12" fontWeight="bold" fontFamily="sans-serif">
            諺巻
          </text>
        </svg>
      );
  }
};
