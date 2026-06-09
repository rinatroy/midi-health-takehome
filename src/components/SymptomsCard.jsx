import React, { useState } from 'react';
import Button from './Button';
import SelectablePill, { SelectablePillGroup } from './SelectablePill';
import './SymptomsCard.css';

/* ─── Icons ─────────────────────────────────────────────────── */

const ArrowRightIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M3 8H13M9 4L13 8L9 12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
    <circle cx="14" cy="14" r="13" stroke="currentColor" strokeWidth="2" />
    <path
      d="M8.5 14.5L12 18L19.5 10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ─── Data ──────────────────────────────────────────────────── */

const SYMPTOMS = [
  { value: 'hot-flashes',      label: 'Hot flashes'      },
  { value: 'night-sweats',     label: 'Night sweats'     },
  { value: 'mood-changes',     label: 'Mood changes'     },
  { value: 'fatigue',          label: 'Fatigue'          },
  { value: 'brain-fog',        label: 'Brain fog'        },
  { value: 'joint-pain',       label: 'Joint pain'       },
  { value: 'sleep-issues',     label: 'Sleep issues'     },
  { value: 'low-libido',       label: 'Low libido'       },
  { value: 'weight-changes',   label: 'Weight changes'   },
  { value: 'vaginal-dryness',  label: 'Vaginal dryness'  },
  { value: 'headaches',        label: 'Headaches'        },
  { value: 'anxiety',          label: 'Anxiety'          },
];

const TOTAL_STEPS = 3;
const CURRENT_STEP = 1;

/* ─── SymptomsCard ──────────────────────────────────────────── */

/**
 * Mini UI card — symptom selection step in a multi-step intake flow.
 * Uses SelectablePillGroup + Button from the Midi Health component library.
 *
 * @param {function} [props.onContinue] — called with string[] of selected values
 */
const SymptomsCard = ({ onContinue }) => {
  const [selected, setSelected]   = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const handleContinue = () => {
    setSubmitted(true);
    onContinue?.(selected);
  };

  const handleReset = () => {
    setSelected([]);
    setSubmitted(false);
  };

  const progressPct = (CURRENT_STEP / TOTAL_STEPS) * 100;

  if (submitted) {
    return (
      <div className="symptoms-card">
        <div className="symptoms-card__success">
          <div className="symptoms-card__success-icon">
            <CheckCircleIcon />
          </div>
          <h2 className="symptoms-card__success-title">Got it, thanks!</h2>
          <p className="symptoms-card__success-body">
            You selected {selected.length} symptom{selected.length !== 1 ? 's' : ''}:
          </p>
          <div className="symptoms-card__selected-list">
            {selected.map((v) => {
              const opt = SYMPTOMS.find((s) => s.value === v);
              return (
                <SelectablePill key={v} selected size="sm" onChange={() => {}}>
                  {opt?.label ?? v}
                </SelectablePill>
              );
            })}
          </div>
          <Button
            hierarchy="tertiary"
            size="md"
            onClick={handleReset}
          >
            ← Start over
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="symptoms-card">
      {/* Header */}
      <div className="symptoms-card__header">
        {/* Progress */}
        <div className="symptoms-card__progress">
          <div className="symptoms-card__progress-track">
            <div
              className="symptoms-card__progress-fill"
              style={{ width: `${progressPct}%` }}
              role="progressbar"
              aria-valuenow={CURRENT_STEP}
              aria-valuemin={1}
              aria-valuemax={TOTAL_STEPS}
            />
          </div>
          <span className="symptoms-card__progress-label">
            Step {CURRENT_STEP} of {TOTAL_STEPS}
          </span>
        </div>

        <p className="symptoms-card__eyebrow">Your symptoms</p>
        <h2 className="symptoms-card__title">How are you feeling?</h2>
        <p className="symptoms-card__subtitle">
          Select all the symptoms that apply to you. We'll use these to
          personalize your care plan.
        </p>
      </div>

      {/* Symptom pills */}
      <div className="symptoms-card__body">
        <SelectablePillGroup
          options={SYMPTOMS}
          value={selected}
          onChange={setSelected}
          size="md"
        />
      </div>

      {/* Footer */}
      <div className="symptoms-card__footer">
        <p className="symptoms-card__count">
          {selected.length > 0 ? (
            <>
              <strong>{selected.length}</strong>{' '}
              symptom{selected.length !== 1 ? 's' : ''} selected
            </>
          ) : (
            'Select at least one'
          )}
        </p>
        <Button
          hierarchy="primary"
          size="md"
          disabled={selected.length === 0}
          trailingIcon={ArrowRightIcon}
          onClick={handleContinue}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default SymptomsCard;
