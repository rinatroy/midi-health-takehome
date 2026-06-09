import React from 'react';
import './SelectablePill.css';

/* ─── Check icon ────────────────────────────────────────────── */

const CheckIcon = ({ size = 14 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 14 14"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M2.5 7.5 L5.5 10.5 L11.5 4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CHECK_SIZES = { sm: 12, md: 13, lg: 15 };

/* ─── SelectablePill ────────────────────────────────────────── */

/**
 * Toggle chip that switches between selected / unselected.
 *
 * @param {object}   props
 * @param {boolean}  [props.selected=false]
 * @param {boolean}  [props.disabled=false]
 * @param {'sm'|'md'|'lg'} [props.size='md']
 * @param {boolean}  [props.showCheck=true]   show ✓ icon when selected
 * @param {function} [props.onChange]          called with next boolean value
 */
const SelectablePill = React.forwardRef(function SelectablePill(
  {
    children,
    selected = false,
    disabled = false,
    size = 'md',
    showCheck = true,
    onChange,
    className = '',
    ...rest
  },
  ref
) {
  const handleClick = () => {
    if (!disabled) onChange?.(!selected);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  const cls = [
    'pill',
    `pill--${size}`,
    selected ? 'pill--selected'  : '',
    disabled ? 'pill--disabled'  : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      ref={ref}
      type="button"
      role="checkbox"
      aria-checked={selected}
      disabled={disabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={cls}
      {...rest}
    >
      {selected && showCheck && (
        <span className="pill__check">
          <CheckIcon size={CHECK_SIZES[size] ?? 13} />
        </span>
      )}
      <span className="pill__label">{children}</span>
    </button>
  );
});

/* ─── SelectablePillGroup ───────────────────────────────────── */

/**
 * Controlled multi-select group of pills.
 *
 * @param {Array<{value:string, label:string, disabled?:boolean}>} options
 * @param {string[]} value   — array of selected values
 * @param {function} onChange — called with next string[] value
 * @param {'sm'|'md'|'lg'} [size='md']
 * @param {number} [max]     — maximum number of selections allowed
 */
export const SelectablePillGroup = ({
  options = [],
  value = [],
  onChange,
  size = 'md',
  max,
}) => {
  const toggle = (v) => {
    let next;
    if (value.includes(v)) {
      next = value.filter((x) => x !== v);
    } else {
      if (max && value.length >= max) return;
      next = [...value, v];
    }
    onChange?.(next);
  };

  const atMax = max && value.length >= max;

  return (
    <div className="pill-group" role="group">
      {options.map((opt) => {
        const isSelected = value.includes(opt.value);
        const isDisabled = opt.disabled || (atMax && !isSelected);
        return (
          <SelectablePill
            key={opt.value}
            size={size}
            selected={isSelected}
            disabled={isDisabled}
            onChange={() => toggle(opt.value)}
          >
            {opt.label}
          </SelectablePill>
        );
      })}
    </div>
  );
};

export default SelectablePill;
