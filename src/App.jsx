import React, { useState } from 'react';
import Button from './components/Button';
import SelectablePill from './components/SelectablePill';
import SymptomsCard from './components/SymptomsCard';
import './tokens.css';
import './App.css';

/* ─── Shared demo icons ─────────────────────────────────────── */

const PlusIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M3 8H13M9 4L13 8L9 12"
      stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round"
    />
  </svg>
);

const HeartIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M8 13.5C8 13.5 1.5 9.5 1.5 5.5C1.5 3.567 3.067 2 5 2C6.15 2 7.18 2.57 7.87 3.45L8 3.62L8.13 3.45C8.82 2.57 9.85 2 11 2C12.933 2 14.5 3.567 14.5 5.5C14.5 9.5 8 13.5 8 13.5Z"
      stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"
    />
  </svg>
);

/* ─── Data ──────────────────────────────────────────────────── */

const HIERARCHIES = [
  { key: 'primary',           label: 'Primary',             onBrand: false },
  { key: 'secondary',         label: 'Secondary',           onBrand: false },
  { key: 'secondary-on-brand',label: 'Secondary on Brand',  onBrand: true  },
  { key: 'tertiary',          label: 'Tertiary',            onBrand: false },
  { key: 'link-color',        label: 'Link color',          onBrand: false },
  { key: 'link-gray',         label: 'Link gray',           onBrand: false },
];

const SIZES = ['sm', 'md', 'lg', 'xl'];

const STATES = [
  { key: undefined,   label: 'Default'  },
  { key: 'hover',     label: 'Hover'    },
  { key: 'focused',   label: 'Focused'  },
];

const DEMO_SYMPTOMS = [
  'Hot flashes', 'Night sweats', 'Mood changes',
  'Fatigue', 'Brain fog', 'Joint pain',
];

const KEY_TOKENS = [
  { name: '--color-brand-400',   value: '#579fff', label: 'Brand primary'     },
  { name: '--color-brand-600',   value: '#006af9', label: 'Brand hover'       },
  { name: '--color-border-focus',value: '#b6e7a0', label: 'Focus ring'        },
  { name: '--color-text-secondary', value: '#6b7c88', label: 'Text secondary' },
  { name: '--color-base-15',     value: '#eef5f7', label: 'Base / 15'         },
  { name: '--color-base-200',    value: '#a9b5ba', label: 'Base / 200'        },
  { name: '--radius-sm',         value: '6px',     label: 'Button radius'     },
  { name: '--font-size-sm',      value: '14px',    label: 'Text SM'           },
];

/* ─── InteractivePills demo ─────────────────────────────────── */

function InteractivePillsDemo() {
  const [selected, setSelected] = useState(['fatigue']);
  const toggle = (label) =>
    setSelected((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  return (
    <div className="showcase__row">
      {DEMO_SYMPTOMS.map((label) => (
        <SelectablePill
          key={label}
          selected={selected.includes(label)}
          onChange={() => toggle(label)}
        >
          {label}
        </SelectablePill>
      ))}
    </div>
  );
}

/* ─── App ───────────────────────────────────────────────────── */

export default function App() {
  return (
    <div>
      {/* ── HEADER ───────────────────────────────────────────── */}
      <header className="showcase__header">
        <span className="showcase__logo">midi</span>
        <span className="showcase__tag">Design Engineer Take-Home</span>
      </header>

      <main className="showcase__main">

        {/* ════════════════════════════════════════════════════
            SECTION 1 — BUTTON
        ════════════════════════════════════════════════════ */}
        <section className="showcase__section">
          <h2 className="showcase__section-title">Button</h2>

          {/* ── 1a. Variants × Sizes table ── */}
          <div className="showcase__subsection">
            <h3 className="showcase__subsection-title">Variants × Sizes</h3>
            <div className="variant-table-wrap">
              <table className="variant-table">
                <thead>
                  <tr>
                    <th>Variant</th>
                    {SIZES.map((s) => (
                      <th key={s}>{s.toUpperCase()}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {HIERARCHIES.map(({ key, label, onBrand }) => (
                    <tr key={key} className={onBrand ? 'row--on-brand' : ''}>
                      <td className="variant-table__label">{label}</td>
                      {SIZES.map((size) => (
                        <td key={size}>
                          <Button hierarchy={key} size={size}>
                            Button CTA
                          </Button>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── 1b. States — Primary ── */}
          <div className="showcase__subsection">
            <h3 className="showcase__subsection-title">States — Primary (md)</h3>
            <div className="showcase__row">
              {STATES.map(({ key, label }) => (
                <div key={label} className="showcase__state-item">
                  <Button hierarchy="primary" size="md" forceState={key}>
                    {label}
                  </Button>
                  <span className="showcase__state-label">{label}</span>
                </div>
              ))}
              <div className="showcase__state-item">
                <Button hierarchy="primary" size="md" disabled>Disabled</Button>
                <span className="showcase__state-label">Disabled</span>
              </div>
              <div className="showcase__state-item">
                <Button hierarchy="primary" size="md" loading>Loading</Button>
                <span className="showcase__state-label">Loading</span>
              </div>
            </div>
          </div>

          {/* ── 1c. States — Secondary ── */}
          <div className="showcase__subsection">
            <h3 className="showcase__subsection-title">States — Secondary (md)</h3>
            <div className="showcase__row">
              {STATES.map(({ key, label }) => (
                <div key={label} className="showcase__state-item">
                  <Button hierarchy="secondary" size="md" forceState={key}>
                    {label}
                  </Button>
                  <span className="showcase__state-label">{label}</span>
                </div>
              ))}
              <div className="showcase__state-item">
                <Button hierarchy="secondary" size="md" disabled>Disabled</Button>
                <span className="showcase__state-label">Disabled</span>
              </div>
              <div className="showcase__state-item">
                <Button hierarchy="secondary" size="md" loading>Loading</Button>
                <span className="showcase__state-label">Loading</span>
              </div>
            </div>
          </div>

          {/* ── 1d. States — Tertiary ── */}
          <div className="showcase__subsection">
            <h3 className="showcase__subsection-title">States — Tertiary (md)</h3>
            <div className="showcase__row">
              {STATES.map(({ key, label }) => (
                <div key={label} className="showcase__state-item">
                  <Button hierarchy="tertiary" size="md" forceState={key}>
                    {label}
                  </Button>
                  <span className="showcase__state-label">{label}</span>
                </div>
              ))}
              <div className="showcase__state-item">
                <Button hierarchy="tertiary" size="md" disabled>Disabled</Button>
                <span className="showcase__state-label">Disabled</span>
              </div>
            </div>
          </div>

          {/* ── 1e. With icons ── */}
          <div className="showcase__subsection">
            <h3 className="showcase__subsection-title">With Icons</h3>
            <div className="showcase__row">
              <Button hierarchy="primary"   size="md" leadingIcon={PlusIcon}>
                Add symptom
              </Button>
              <Button hierarchy="secondary" size="md" trailingIcon={ArrowRightIcon}>
                Continue
              </Button>
              <Button hierarchy="tertiary"  size="md" leadingIcon={HeartIcon}>
                Save for later
              </Button>
              <Button hierarchy="primary"   size="md" iconOnly leadingIcon={PlusIcon}
                aria-label="Add" />
              <Button hierarchy="secondary" size="md" iconOnly leadingIcon={ArrowRightIcon}
                aria-label="Next" />
              <Button hierarchy="tertiary"  size="lg" iconOnly leadingIcon={HeartIcon}
                aria-label="Save" />
            </div>
          </div>

          {/* ── 1f. Link variants ── */}
          <div className="showcase__subsection">
            <h3 className="showcase__subsection-title">Link Variants</h3>
            <div className="showcase__row">
              <Button hierarchy="link-color" size="md">Link color</Button>
              <Button hierarchy="link-gray"  size="md">Link gray</Button>
              <Button hierarchy="link-color" size="md" trailingIcon={ArrowRightIcon}>
                Learn more
              </Button>
              <Button hierarchy="link-color" size="md" disabled>Disabled</Button>
              <Button hierarchy="link-color" size="md" loading>Loading</Button>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════
            SECTION 2 — SELECTABLE PILL
        ════════════════════════════════════════════════════ */}
        <section className="showcase__section">
          <h2 className="showcase__section-title">Selectable Pill</h2>

          {/* ── 2a. States ── */}
          <div className="showcase__subsection">
            <h3 className="showcase__subsection-title">States</h3>
            <div className="showcase__row">
              <div className="showcase__state-item">
                <SelectablePill>Unselected</SelectablePill>
                <span className="showcase__state-label">Default</span>
              </div>
              <div className="showcase__state-item">
                <SelectablePill selected>Selected</SelectablePill>
                <span className="showcase__state-label">Selected</span>
              </div>
              <div className="showcase__state-item">
                <SelectablePill disabled>Disabled</SelectablePill>
                <span className="showcase__state-label">Disabled</span>
              </div>
              <div className="showcase__state-item">
                <SelectablePill selected disabled>Sel + Disabled</SelectablePill>
                <span className="showcase__state-label">Sel + Disabled</span>
              </div>
            </div>
          </div>

          {/* ── 2b. Sizes ── */}
          <div className="showcase__subsection">
            <h3 className="showcase__subsection-title">Sizes</h3>
            <div className="showcase__row">
              {['sm', 'md', 'lg'].map((size) => (
                <div key={size} className="showcase__state-item">
                  <SelectablePill size={size} selected>
                    {size.toUpperCase()}
                  </SelectablePill>
                  <span className="showcase__state-label">{size.toUpperCase()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── 2c. Interactive ── */}
          <div className="showcase__subsection">
            <h3 className="showcase__subsection-title">Interactive — click to toggle</h3>
            <InteractivePillsDemo />
          </div>
        </section>

        {/* ════════════════════════════════════════════════════
            SECTION 3 — SYMPTOMS CARD
        ════════════════════════════════════════════════════ */}
        <section className="showcase__section">
          <h2 className="showcase__section-title">Symptoms Card</h2>
          <div className="showcase__card-center">
            <SymptomsCard />
          </div>
        </section>

        {/* ════════════════════════════════════════════════════
            SECTION 4 — DESIGN TOKENS (reference)
        ════════════════════════════════════════════════════ */}
        <section className="showcase__section">
          <h2 className="showcase__section-title">Design Tokens</h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)', margin: 0 }}>
            Extracted from Figma file <code>EmOPCikbt1yXloQWzvaVAb</code> via Figma MCP.
            Full token list in <code>src/tokens.css</code>.
          </p>
          <div className="token-table-wrap">
            <table className="token-table">
              <thead>
                <tr>
                  <th>Token</th>
                  <th>Value</th>
                  <th>Usage</th>
                </tr>
              </thead>
              <tbody>
                {KEY_TOKENS.map(({ name, value, label }) => (
                  <tr key={name}>
                    <td><span className="token-name">{name}</span></td>
                    <td>
                      <span className="token-swatch">
                        {value.startsWith('#') || value.startsWith('rgb') ? (
                          <span
                            className="token-swatch__dot"
                            style={{ background: value }}
                          />
                        ) : null}
                        <span className="token-swatch__value">{value}</span>
                      </span>
                    </td>
                    <td style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-xs)' }}>
                      {label}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </main>
    </div>
  );
}
