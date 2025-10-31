/**
 * LeadSelector Component
 * Toggle visibility for 12 ECG leads
 */

import React from 'react';
import { LEAD_NAMES } from '../utils/constants';

interface LeadSelectorProps {
  visibleLeads: Set<number>;
  onToggleLead: (leadIndex: number) => void;
}

export const LeadSelector: React.FC<LeadSelectorProps> = ({
  visibleLeads,
  onToggleLead,
}) => {
  const limbLeads = [0, 1, 2, 3, 4, 5]; // I, II, III, aVR, aVL, aVF
  const chestLeads = [6, 7, 8, 9, 10, 11]; // V1-V6

  const renderLeadButton = (leadIndex: number) => {
    const isVisible = visibleLeads.has(leadIndex);
    const leadName = LEAD_NAMES[leadIndex];

    return (
      <button
        key={leadIndex}
        onClick={() => onToggleLead(leadIndex)}
        className={`
          px-4 py-2 rounded-md font-medium transition-colors
          ${
            isVisible
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }
        `}
      >
        {leadName}
      </button>
    );
  };

  const toggleAll = (leads: number[], visible: boolean) => {
    leads.forEach((leadIndex) => {
      if (visible && !visibleLeads.has(leadIndex)) {
        onToggleLead(leadIndex);
      } else if (!visible && visibleLeads.has(leadIndex)) {
        onToggleLead(leadIndex);
      }
    });
  };

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Lead Selection</h2>

      {/* Limb Leads */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold text-gray-700">
            Limb Leads (Page 1)
          </h3>
          <div className="space-x-2">
            <button
              onClick={() => toggleAll(limbLeads, true)}
              className="text-sm px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200"
            >
              Show All
            </button>
            <button
              onClick={() => toggleAll(limbLeads, false)}
              className="text-sm px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
            >
              Hide All
            </button>
          </div>
        </div>
        <div className="grid grid-cols-6 gap-2">
          {limbLeads.map(renderLeadButton)}
        </div>
      </div>

      {/* Chest Leads */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold text-gray-700">
            Chest Leads (Page 2)
          </h3>
          <div className="space-x-2">
            <button
              onClick={() => toggleAll(chestLeads, true)}
              className="text-sm px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200"
            >
              Show All
            </button>
            <button
              onClick={() => toggleAll(chestLeads, false)}
              className="text-sm px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
            >
              Hide All
            </button>
          </div>
        </div>
        <div className="grid grid-cols-6 gap-2">
          {chestLeads.map(renderLeadButton)}
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <p>
          Selected: {visibleLeads.size} / 12 leads
        </p>
      </div>
    </div>
  );
};
