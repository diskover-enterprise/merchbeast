'use client'

export function GorillaIllustration({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 380"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-[200px] sm:w-[260px] lg:w-[310px] h-auto ${className}`}
      aria-label="Merch Beast gorilla mascot"
    >
      <defs>
        <style>{`
          @keyframes g-breathe {
            0%, 100% { transform: translateY(0px); }
            50%       { transform: translateY(-7px); }
          }
          @keyframes g-sway {
            0%, 100% { transform: rotate(0deg); }
            30%      { transform: rotate(-1.3deg); }
            70%      { transform: rotate(0.9deg); }
          }
          @keyframes g-blink {
            0%, 90%, 100% { transform: scaleY(0.04); }
            95%           { transform: scaleY(1); }
          }
          .g-body { animation: g-breathe 4.5s ease-in-out infinite; }
          .g-outer { animation: g-sway 8s ease-in-out infinite; transform-origin: 160px 370px; }
          .g-lid-l {
            transform-origin: 130px 114px;
            transform: scaleY(0.04);
            animation: g-blink 7s ease-in-out infinite;
          }
          .g-lid-r {
            transform-origin: 190px 114px;
            transform: scaleY(0.04);
            animation: g-blink 7s ease-in-out infinite 0.07s;
          }
        `}</style>
      </defs>

      <g className="g-outer">
        <g className="g-body">

          {/* ── LEFT ARM ── */}
          <path
            d="M 62 194 C 24 240 10 298 18 354 C 24 368 42 372 52 362 C 42 312 46 258 68 210 Z"
            fill="#D4CFC2"
          />

          {/* ── RIGHT ARM ── */}
          <path
            d="M 258 194 C 296 240 310 298 302 354 C 296 368 278 372 268 362 C 278 312 274 258 252 210 Z"
            fill="#D4CFC2"
          />

          {/* ── LEFT KNUCKLES ── */}
          <ellipse cx="24" cy="360" rx="23" ry="12" fill="#C4BFAE" transform="rotate(-20 24 360)" />

          {/* ── RIGHT KNUCKLES ── */}
          <ellipse cx="296" cy="360" rx="23" ry="12" fill="#C4BFAE" transform="rotate(20 296 360)" />

          {/* ── TORSO ── */}
          <path
            d="M 56 198 C 36 244 38 308 50 368 L 270 368 C 282 308 284 244 264 198 C 226 180 94 180 56 198 Z"
            fill="#EDE8DC"
          />

          {/* ── CHEST SHADING ── */}
          <ellipse cx="160" cy="276" rx="64" ry="74" fill="#E2DDD0" opacity="0.65" />
          <ellipse cx="160" cy="256" rx="38" ry="46" fill="#F0EBE0" opacity="0.45" />

          {/* ── NECK ── */}
          <path
            d="M 124 164 C 120 180 122 192 124 202 L 196 202 C 198 192 200 180 196 164 C 180 157 140 157 124 164 Z"
            fill="#E2DDD0"
          />

          {/* ── HEAD ── */}
          <ellipse cx="160" cy="103" rx="82" ry="76" fill="#EDE8DC" />

          {/* ── SAGITTAL CREST ── */}
          <path
            d="M 122 62 C 126 34 140 18 160 16 C 180 18 194 34 198 62 C 184 44 160 38 136 44 Z"
            fill="#E2DDD0"
          />

          {/* ── EARS ── */}
          <ellipse cx="80" cy="109" rx="17" ry="20" fill="#EDE8DC" />
          <ellipse cx="80" cy="109" rx="10" ry="13" fill="#C8C3B2" />
          <ellipse cx="240" cy="109" rx="17" ry="20" fill="#EDE8DC" />
          <ellipse cx="240" cy="109" rx="10" ry="13" fill="#C8C3B2" />

          {/* ── BROW RIDGE (supraorbital torus) ── */}
          <path
            d="M 90 110 C 114 89 138 85 160 85 C 182 85 206 89 230 110 C 208 93 160 83 112 93 Z"
            fill="#C8C3B2"
          />

          {/* ── EYE SOCKETS ── */}
          <ellipse cx="130" cy="114" rx="20" ry="16" fill="#B0AB9A" />
          <ellipse cx="190" cy="114" rx="20" ry="16" fill="#B0AB9A" />

          {/* ── FACE MUZZLE ── */}
          <ellipse cx="160" cy="134" rx="54" ry="48" fill="#F2EDE2" />

          {/* ── NOSE ── */}
          <rect x="152" y="122" width="16" height="22" rx="5" fill="#302822" />
          <ellipse cx="160" cy="142" rx="25" ry="17" fill="#28201A" />
          <ellipse cx="147" cy="144" rx="11" ry="9" fill="#18100C" />
          <ellipse cx="173" cy="144" rx="11" ry="9" fill="#18100C" />

          {/* ── MOUTH ── */}
          <path
            d="M 138 162 Q 160 172 182 162"
            stroke="#28201A"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />

          {/* ── EYES ── */}
          <ellipse cx="130" cy="114" rx="11" ry="10" fill="#1C1812" />
          <ellipse cx="130" cy="114" rx="6"  ry="5.5" fill="#0C0A08" />
          <ellipse cx="127" cy="111" rx="2"  ry="2"   fill="rgba(255,252,235,0.8)" />

          <ellipse cx="190" cy="114" rx="11" ry="10" fill="#1C1812" />
          <ellipse cx="190" cy="114" rx="6"  ry="5.5" fill="#0C0A08" />
          <ellipse cx="187" cy="111" rx="2"  ry="2"   fill="rgba(255,252,235,0.8)" />

          {/* ── EYELIDS (blink animation) ── */}
          <rect className="g-lid-l" x="112" y="102" width="36" height="24" rx="12" fill="#EDE8DC" />
          <rect className="g-lid-r" x="172" y="102" width="36" height="24" rx="12" fill="#EDE8DC" />

        </g>
      </g>
    </svg>
  )
}
