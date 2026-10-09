/** @type {import('tailwindcss').Config} */
// Lumé design tokens (Warm Peach recipe), extracted from the UI concept screens.
//
// FONT: Plus Jakarta Sans. On React Native each weight is its own font file,
// so pick the weight with a family class, NOT font-bold:
//   font-jakarta           -> 400 body text
//   font-jakarta-medium    -> 500 chips, captions
//   font-jakarta-semibold  -> 600 buttons, card titles
//   font-jakarta-bold      -> 700 headlines, prices
//
// Gradients are not Tailwind utilities on native. Use expo-linear-gradient
// with the `wash` colors below (see bottom of the file for the values).

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      /* ---------- COLORS ---------- */
      colors: {
        // The ONE accent: espresso. CTAs, active tab, selected states.
        brand: {
          DEFAULT: '#2B1304', // espresso (primary button, dock active)
          ink: '#1A0F08',     // headlines
          body: '#4A3B32',    // body copy on white / tints
          muted: '#6B5B51',   // captions (6.6:1 on white)
          soft: '#8A6A58',    // two-tone headline second half
        },
        // Warm peach wash + card tints (use as backgrounds, never for text)
        peach: {
          DEFAULT: '#FFD9BF', // hero wash start
          50: '#FFEFE4',      // hero wash middle
          100: '#FFE4D2',     // product / address card tint
        },
        blush: '#FFDCE3',
        cream: '#FFF1D6',
        sage: '#E3F1E6',

        // Surfaces and lines
        canvas: '#FFFFFF',
        backdrop: '#F7EEE7',  // presentation / page background
        chip: '#F6EFEA',      // inputs, chips, icon buttons
        line: '#E8DDD4',      // dividers, secondary button ring
        placeholder: '#7A6A60',
        disabled: '#D9CFC8',

        // Semantic states (always paired with an icon, never color alone)
        success: { DEFAULT: '#2F9E62', dark: '#0B6B3A', tint: '#DFF5E8' },
        danger: { DEFAULT: '#D92D20', dark: '#B42318', tint: '#FFF1EF' },
        warning: { DEFAULT: '#F5A524', dark: '#9A5B00', tint: '#FFF0D1' },
        badge: '#E5484D',     // notification dot, cart count
        star: '#F5A524',      // rating star

        // Skin-tone swatches for the quiz (light -> deep)
        tone: {
          1: '#F8DCC8', 2: '#F0C7A5', 3: '#E0AC82', 4: '#C98E63',
          5: '#A8704A', 6: '#8A5638', 7: '#6B3F28', 8: '#4A2A1B',
        },
      },

      /* ---------- TYPOGRAPHY ---------- */
      fontFamily: {
        // Names must match the keys exported by @expo-google-fonts/plus-jakarta-sans
        sans: ['PlusJakartaSans_400Regular'],
        jakarta: ['PlusJakartaSans_400Regular'],
        'jakarta-medium': ['PlusJakartaSans_500Medium'],
        'jakarta-semibold': ['PlusJakartaSans_600SemiBold'],
        'jakarta-bold': ['PlusJakartaSans_700Bold'],
      },
      // [size, { lineHeight, letterSpacing }]  (tracking = -0.02em on big text)
      fontSize: {
        display: ['32px', { lineHeight: '37px', letterSpacing: '-0.64px' }], // onboarding / auth headline
        headline: ['30px', { lineHeight: '35px', letterSpacing: '-0.6px' }], // quiz & state titles
        title: ['24px', { lineHeight: '28px', letterSpacing: '-0.48px' }], // screen / product title
        h3: ['18px', { lineHeight: '24px', letterSpacing: '-0.18px' }], // section headers
        body: ['15px', { lineHeight: '22px' }],
        small: ['13px', { lineHeight: '18px' }],
        micro: ['11px', { lineHeight: '14px' }],                            // badges, nav labels
        price: ['22px', { lineHeight: '26px', letterSpacing: '-0.44px' }],
      },

      /* ---------- SHAPE: "pill and squircle" ---------- */
      borderRadius: {
        pill: '9999px',  // buttons, chips, inputs, dock, search
        hero: '36px',    // large product hero card
        sheet: '32px',   // onboarding cards, summary cards
        card: '24px',    // standard cards, product tiles
        thumb: '16px',   // thumbnails, stepper box
        tile: '12px',    // smallest allowed radius
      },

      /* ---------- SIZES (8pt grid + component heights) ---------- */
      // Spacing keys also work for w-*, h-*, p-*, m-*, gap-*, min-h-*
      spacing: {
        gutter: '24px',    // screen side padding
        tap: '44px',       // minimum tap target
        btn: '54px',       // primary button / input height
        'input-sm': '50px',
        'icon-btn': '42px',
        chip: '36px',
        'chip-lg': '46px',
        dock: '68px',      // floating tab dock
        'cta-safe': '38px',// gap between CTA and home indicator
        halo: '212px',     // result-state halo
      },

      /* ---------- DEPTH ---------- */
      // On native these need React Native 0.76+ (New Architecture) for the
      // CSS-style boxShadow. On older RN, use the shadow helper in the notes.
      boxShadow: {
        soft: '0 10px 30px rgba(20,20,40,0.08), 0 2px 6px rgba(20,20,40,0.04)',
        lift: '0 18px 40px rgba(20,20,40,0.14), 0 4px 10px rgba(20,20,40,0.06)',
        cta: '0 10px 24px rgba(255,150,90,0.45)',      // espresso button glow
        'cta-sm': '0 8px 18px rgba(255,150,90,0.45)',  // active dock tab
        focus: '0 0 0 2px #2B1304, 0 8px 20px rgba(255,150,90,0.25)', // focused input
        selected: '0 0 0 3px #FFFFFF, 0 0 0 5px #2B1304',            // selected card / swatch
        error: '0 0 0 2px #D92D20',                                   // invalid input
      },
    },
  },
  plugins: [],
};

/* ---------- GRADIENT VALUES (for expo-linear-gradient) ----------
 * wash (home / auth / profile hero):
 *   colors={['#FFD9BF', '#FFEFE4', '#FFFFFF']} locations={[0, 0.36, 0.62]}
 * state backgrounds (top -> white):
 *   success ['#DDF3E6', '#F1FAF4', '#FFFFFF']
 *   failed  ['#FFE0DC', '#FFF1EF', '#FFFFFF']
 *   error   ['#FFEBC7', '#FFF6E6', '#FFFFFF']
 *   offline ['#EDE3DB', '#F7F2EE', '#FFFFFF']
 */