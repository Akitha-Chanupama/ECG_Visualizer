/**
 * MeasurementPanel Component
 * Display patient info and ECG measurements
 */

import React from 'react';
import type { ECGData } from '../types';

interface MeasurementPanelProps {
  ecgData: ECGData | null;
  onExportPNG: () => void;
}

export const MeasurementPanel: React.FC<MeasurementPanelProps> = ({
  ecgData,
  onExportPNG,
}) => {
  if (!ecgData) {
    return (
      <div className="w-full p-6 bg-gray-50 rounded-lg">
        <p className="text-gray-500 text-center">
          No ECG data loaded. Upload a CSV file to view measurements.
        </p>
      </div>
    );
  }

  const { patientInfo, settings, leads } = ecgData;

  // Calculate basic statistics
  const totalSamples = leads[0]?.dataPoints.length || 0;
  const duration = totalSamples / settings.sampleRate;

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-md space-y-6">
      {/* Patient Information */}
      <div>
        <h2 className="text-xl font-bold mb-3 text-gray-900">
          Patient Information
        </h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-semibold text-gray-700">Name:</span>{' '}
            <span className="text-gray-900">
              {patientInfo?.name || 'N/A'}
            </span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">ID:</span>{' '}
            <span className="text-gray-900">{patientInfo?.id || 'N/A'}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Age:</span>{' '}
            <span className="text-gray-900">{patientInfo?.age || 'N/A'}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Gender:</span>{' '}
            <span className="text-gray-900">
              {patientInfo?.gender || 'N/A'}
            </span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">DOB:</span>{' '}
            <span className="text-gray-900">{patientInfo?.dob || 'N/A'}</span>
          </div>
        </div>
      </div>

      {/* Recording Information */}
      <div>
        <h2 className="text-xl font-bold mb-3 text-gray-900">
          Recording Information
        </h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-semibold text-gray-700">Sample Rate:</span>{' '}
            <span className="text-gray-900">{settings.sampleRate} Hz</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Duration:</span>{' '}
            <span className="text-gray-900">{duration.toFixed(2)}s</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Gain:</span>{' '}
            <span className="text-gray-900">×{settings.gain}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Filter:</span>{' '}
            <span className="text-gray-900">{settings.filterType}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Total Samples:</span>{' '}
            <span className="text-gray-900">{totalSamples}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Leads:</span>{' '}
            <span className="text-gray-900">12-Lead ECG</span>
          </div>
        </div>
      </div>

      {/* Export Controls */}
      <div>
        <h2 className="text-xl font-bold mb-3 text-gray-900">Export</h2>
        <button
          onClick={onExportPNG}
          className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          Export as PNG
        </button>
        <p className="text-xs text-gray-500 mt-2">
          Download current view as a PNG image
        </p>
      </div>

      {/* Data Quality Indicators */}
      <div>
        <h2 className="text-xl font-bold mb-3 text-gray-900">
          Data Quality
        </h2>
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Filtered Data:</span>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
              ✓ Applied
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700">DC Offset Removed:</span>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
              ✓ Applied
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700">IIR Filter:</span>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
              ✓ 0.992
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700">FIR Filter:</span>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
              ✓ 150Hz
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
