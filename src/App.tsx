/**
 * Main App Component
 * ECG Visualizer - Medical-grade 12-lead ECG visualization
 */

import React, { useState, useRef } from 'react';
import type { ECGData } from './types';
import { FileUpload } from './components/FileUpload';
import { ECGCanvas } from './components/ECGCanvas';
import { LeadSelector } from './components/LeadSelector';
import { MeasurementPanel } from './components/MeasurementPanel';

function App() {
  const [ecgData, setECGData] = useState<ECGData | null>(null);
  const [currentPage, setCurrentPage] = useState<1 | 2>(1);
  const [visibleLeads, setVisibleLeads] = useState<Set<number>>(
    new Set([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]) // All leads visible by default
  );
  const [canvasScale, setCanvasScale] = useState(0.3);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  const handleDataLoaded = (data: ECGData) => {
    setECGData(data);
    console.log('ECG Data Loaded:', data);
  };

  const toggleLead = (leadIndex: number) => {
    setVisibleLeads((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(leadIndex)) {
        newSet.delete(leadIndex);
      } else {
        newSet.add(leadIndex);
      }
      return newSet;
    });
  };

  const handleExportPNG = () => {
    const canvas = canvasContainerRef.current?.querySelector('canvas');
    if (!canvas) return;

    // Create a link element and trigger download
    const link = document.createElement('a');
    link.download = `ecg_${ecgData?.patientInfo?.name || 'export'}_${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            ECG Visualizer
          </h1>
          <p className="text-gray-600">
            Medical-grade 12-lead ECG visualization following native Android standards
          </p>
        </div>

        {/* File Upload */}
        {!ecgData && <FileUpload onDataLoaded={handleDataLoaded} />}

        {/* Main Content */}
        {ecgData && (
          <div className="space-y-6">
            {/* Controls Row */}
            <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md">
              <div className="flex items-center space-x-4">
                {/* Page Selector */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => setCurrentPage(1)}
                    className={`
                      px-6 py-2 rounded-md font-medium transition-colors
                      ${
                        currentPage === 1
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }
                    `}
                  >
                    Page 1 (Limb Leads)
                  </button>
                  <button
                    onClick={() => setCurrentPage(2)}
                    className={`
                      px-6 py-2 rounded-md font-medium transition-colors
                      ${
                        currentPage === 2
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }
                    `}
                  >
                    Page 2 (Chest Leads)
                  </button>
                </div>

                {/* Zoom Controls */}
                <div className="flex items-center space-x-2 border-l border-gray-300 pl-4">
                  <span className="text-sm font-medium text-gray-700">Zoom:</span>
                  <button
                    onClick={() => setCanvasScale((s) => Math.max(0.1, s - 0.1))}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    −
                  </button>
                  <span className="text-sm font-mono text-gray-900 w-12 text-center">
                    {(canvasScale * 100).toFixed(0)}%
                  </span>
                  <button
                    onClick={() => setCanvasScale((s) => Math.min(1.0, s + 0.1))}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                  <button
                    onClick={() => setCanvasScale(0.3)}
                    className="ml-2 px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-sm"
                  >
                    Reset
                  </button>
                </div>
              </div>

              {/* Upload New File */}
              <button
                onClick={() => setECGData(null)}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 font-medium"
              >
                Upload New File
              </button>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Canvas - Takes 2 columns */}
              <div className="xl:col-span-2" ref={canvasContainerRef}>
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <h2 className="text-xl font-bold mb-4 text-gray-900">
                    ECG Waveforms - Page {currentPage}
                  </h2>
                  <ECGCanvas
                    ecgData={ecgData}
                    page={currentPage}
                    visibleLeads={visibleLeads}
                    scale={canvasScale}
                  />
                </div>
              </div>

              {/* Sidebar - Takes 1 column */}
              <div className="space-y-6">
                {/* Lead Selector */}
                <LeadSelector
                  visibleLeads={visibleLeads}
                  onToggleLead={toggleLead}
                />

                {/* Measurement Panel */}
                <MeasurementPanel
                  ecgData={ecgData}
                  onExportPNG={handleExportPNG}
                />
              </div>
            </div>

            {/* Grid Legend */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4 text-gray-900">
                ECG Grid Standards
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-0.5 bg-[rgb(255,185,220)]"></div>
                  <span className="text-gray-700">Minor Grid (1mm)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-0.5 bg-[rgb(255,51,153)]"></div>
                  <span className="text-gray-700">Major Grid (5mm)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-0.5 bg-[rgb(21,64,234)]"></div>
                  <span className="text-gray-700">Blue Border</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-1 bg-black"></div>
                  <span className="text-gray-700">ECG Waveform</span>
                </div>
              </div>
              <div className="mt-4 text-xs text-gray-600">
                <p>• Standard medical ECG paper: 10mm = 1mV (vertical), 25mm/sec (horizontal)</p>
                <p>• Sample rate: 250Hz | Filter: IIR (0.992) + FIR (150Hz)</p>
                <p>• Data processing: DC offset removed → IIR filtered → FIR filtered → Display</p>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>
            ECG Visualizer - Following native Android implementation standards
          </p>
          <p className="mt-1">
            Matches Create_report.java canvas drawing and paintView.java filtering
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
