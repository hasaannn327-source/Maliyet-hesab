import React from 'react';
import { Switch as HeadlessSwitch } from '@headlessui/react';
import clsx from 'clsx';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
}

export const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  label,
  description,
  disabled = false
}) => {
  return (
    <HeadlessSwitch.Group>
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          {label && (
            <HeadlessSwitch.Label className="text-sm font-medium text-gray-900 dark:text-white cursor-pointer">
              {label}
            </HeadlessSwitch.Label>
          )}
          {description && (
            <HeadlessSwitch.Description className="text-sm text-gray-500 dark:text-gray-400">
              {description}
            </HeadlessSwitch.Description>
          )}
        </div>
        <HeadlessSwitch
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className={clsx(
            'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
            checked ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
        >
          <span
            className={clsx(
              'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
              checked ? 'translate-x-6' : 'translate-x-1'
            )}
          />
        </HeadlessSwitch>
      </div>
    </HeadlessSwitch.Group>
  );
};