import React from 'react';
import './Button.css';

/* ─── SVG icon sub-components ──────────────────────────────── */

const Spinner = ({ className = '' }) => (
  <svg
    className={`btn__spinner ${className}`}
    viewBox="0 0 20 20"
    fill="none"
    aria-hidden="true"
  >
    <circle
      cx="10" cy="10" r="8"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeDasharray="39"
      strokeDashoffset="12"
    />
  </svg>
);

/* Default placeholder icon — matches Figma dashed-circle placeholder */
export const PlaceholderIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <rect
      x="2.5" y="2.5" width="15" height="15" rx="7.5"
      stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 2.5"
    />
  </svg>
);

/* ─── Button ────────────────────────────────────────────────── */

/**
 * @param {object}  props
 * @param {'primary'|'secondary'|'secondary-on-brand'|'tertiary'|'link-color'|'link-gray'} [props.hierarchy='primary']
 * @param {'sm'|'md'|'lg'|'xl'} [props.size='md']
 * @param {boolean}  [props.disabled]
 * @param {boolean}  [props.loading]   — replaces content with spinner
 * @param {boolean}  [props.iconOnly]  — square icon-only layout
 * @param {React.ComponentType|false} [props.leadingIcon]  — SVG component
 * @param {React.ComponentType|false} [props.trailingIcon] — SVG component
 * @param {'default'|'hover'|'focused'|'disabled'|'loading'} [props.forceState]
 *   Forces a static visual state for documentation / showcase use.
 */
const Button = React.forwardRef(function Button(
  {
    children = 'Button CTA',
    hierarchy = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    iconOnly = false,
    leadingIcon: LeadingIcon,
    trailingIcon: TrailingIcon,
    forceState,
    className = '',
    type = 'button',
    onClick,
    ...rest
  },
  ref
) {
  const isDisabled = disabled || forceState === 'disabled';
  const isLoading  = loading  || forceState === 'loading';

  const cls = [
    'btn',
    `btn--${hierarchy}`,
    `btn--${size}`,
    iconOnly  ? 'btn--icon-only'          : '',
    isLoading ? 'btn--loading'             : '',
    forceState === 'hover'   ? 'btn--state-hover'   : '',
    forceState === 'focused' ? 'btn--state-focused' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      ref={ref}
      type={type}
      className={cls}
      disabled={isDisabled || isLoading}
      onClick={onClick}
      aria-busy={isLoading || undefined}
      {...rest}
    >
      {isLoading ? (
        <Spinner />
      ) : iconOnly ? (
        <span className="btn__icon" aria-hidden="true">
          {LeadingIcon ? <LeadingIcon /> : <PlaceholderIcon />}
        </span>
      ) : (
        <>
          {LeadingIcon && (
            <span className="btn__icon btn__icon--leading" aria-hidden="true">
              <LeadingIcon />
            </span>
          )}
          <span className="btn__text">{children}</span>
          {TrailingIcon && (
            <span className="btn__icon btn__icon--trailing" aria-hidden="true">
              <TrailingIcon />
            </span>
          )}
        </>
      )}
    </button>
  );
});

export default Button;
