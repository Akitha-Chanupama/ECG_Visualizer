/**
 * ECGCanvas Component
 * Renders ECG waveforms using HTML5 Canvas
 * Matches native Android implementation exactly
 */

import React, { useEffect, useRef } from 'react';
import type { ECGData, ECGLead } from '../types';
import { CanvasRenderer } from '../utils/canvasRenderer';
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  Y_OFFSETS,
  X_OFFSET,
  LEAD_ARRANGE_PAGE1,
  LEAD_ARRANGE_PAGE2,
  LEAD_Y_CORRECTIONS,
} from '../utils/constants';

interface ECGCanvasProps {
  ecgData: ECGData;
  page: 1 | 2;
  visibleLeads: Set<number>;
  scale?: number;
}

export const ECGCanvas: React.FC<ECGCanvasProps> = ({
  ecgData,
  page,
  visibleLeads,
  scale = 0.5,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !ecgData) return;

    // Set canvas size
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    const renderer = new CanvasRenderer(canvas);

    // Clear canvas
    renderer.clear();

    // Draw border rectangle
    renderer.drawBorderRectangle();

    // Draw grid
    renderer.drawGrid('vertical', CANVAS_WIDTH - 63);
    renderer.drawGrid('horizontal', 3250);

    // Get lead arrangement for current page
    const leadArrangement = page === 1 ? LEAD_ARRANGE_PAGE1 : LEAD_ARRANGE_PAGE2;

    // Draw each lead
    for (let row = 0; row < 6; row++) {
      const leadIndex = leadArrangement[row];
      const lead = ecgData.leads.find((l) => l.leadIndex === leadIndex);

      if (!lead || !visibleLeads.has(leadIndex)) continue;

      // Draw calibration pulse
      renderer.drawCalibrationPulse(row, ecgData.settings.gain);

      // Draw lead label
      renderer.drawLeadLabel(lead.leadName, row);

      // Draw waveform
      drawWaveform(renderer, lead, row);
    }
  }, [ecgData, page, visibleLeads]);

  /**
   * Draw waveform for a lead
   * (Create_report Part 2.java lines 552-676)
   */
  const drawWaveform = (
    renderer: CanvasRenderer,
    lead: ECGLead,
    row: number
  ): void => {
    if (lead.dataPoints.length === 0) return;

    const ctx = renderer.getContext();
    let prevX = X_OFFSET;
    let prevY = 0;

    // Calculate the baseline (average) for THIS specific lead
    const leadBaseline = lead.dataPoints.reduce((sum, dp) => sum + dp.filtered_value, 0) / lead.dataPoints.length;

    // Plot data points
    for (let i = 0; i < lead.dataPoints.length; i++) {
      const dataPoint = lead.dataPoints[i];

      // Recalculate Y position for OUR row arrangement
      // Get the baseline Y for this row (in canvas coordinates, Y=0 at top)
      const baselineY = CANVAS_HEIGHT - Y_OFFSETS[row];

      // Calculate deviation from THIS lead's baseline
      // Positive deviation = waveform goes UP = smaller Y
      const deviation = (dataPoint.filtered_value - leadBaseline) * (50 / 27);

      // Get per-lead Y correction
      const yCorrection = LEAD_Y_CORRECTIONS[lead.leadIndex] ?? 3;

      // Final Y: baseline - deviation - correction (negative Y = upward)
      const currentY = baselineY - deviation - yCorrection;

      const currentX = dataPoint.x_coord;

      if (i === 0) {
        // Draw circle marker at start
        renderer.drawCircleMarker(currentX, currentY);
        prevX = currentX;
        prevY = currentY;
      } else {
        // Draw line from previous point to current point
        renderer.drawECGLine(prevX, prevY, currentX, currentY);
        prevX = currentX;
        prevY = currentY;
      }
    }
  };

  return (
    <div className="ecg-canvas-container overflow-auto border border-gray-300 rounded-lg">
      <canvas
        ref={canvasRef}
        className="ecg-canvas"
        style={{
          width: `${CANVAS_WIDTH * scale}px`,
          height: `${CANVAS_HEIGHT * scale}px`,
        }}
      />
    </div>
  );
};
