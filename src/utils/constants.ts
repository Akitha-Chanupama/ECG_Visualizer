/**
 * ECG Constants
 * Exact values from native Android Create_report.java and Flutter implementation
 */

// Native Android canvas dimensions (Create_report.java lines 84-85)
export const CANVAS_WIDTH = 5 * 1080; // 5400
export const CANVAS_HEIGHT = 5 * 770; // 3850

// Native lead arrangements (Create_report.java lines 93-94)
// Native array: [1, 2, 8, 9, 10, 11, 7, 3, 5, 4, 6, 0]
// Page 1 (6x1 format): Limb leads I, II, III, aVR, aVL, aVF
// Page 2 (6x1 format): Chest leads V1, V2, V3, V4, V5, V6
export const LEAD_ARRANGE_PAGE1 = [0, 1, 2, 3, 4, 5]; // I, II, III, aVR, aVL, aVF
export const LEAD_ARRANGE_PAGE2 = [6, 7, 8, 9, 10, 11]; // V1, V2, V3, V4, V5, V6

export const LEAD_NAMES = [
  'I',    // 0
  'II',   // 1
  'III',  // 2
  'aVR',  // 3
  'aVL',  // 4
  'aVF',  // 5
  'V1',   // 6
  'V2',   // 7
  'V3',   // 8
  'V4',   // 9
  'V5',   // 10
  'V6',   // 11
];

// ECG Grid Colors (exact from Create_report Part 2.java lines 180-194)
export const GRID_COLORS = {
  LIGHT_PINK: 'rgb(255, 185, 220)',  // Minor grid lines (1mm)
  DARK_PINK: 'rgb(255, 51, 153)',    // Major grid lines (5mm)
  BLUE: 'rgb(21, 64, 234)',          // Border and emphasis lines
  BLACK: 'rgb(0, 0, 0)',             // ECG waveform
  GRAY: 'rgb(51, 51, 51)',           // Circle markers
};

// Grid dimensions and spacing
export const GRID_CONFIG = {
  GRID_SPACING: 20,        // 5mm boxes (4 pixels per mm in native)
  MINOR_LINE_WIDTH: 0.5,   // Thin lines for minor grid
  MAJOR_LINE_WIDTH: 0.5,   // Same width for major grid (color differentiates)
  BLUE_LINE_WIDTH: 2.0,    // Thicker blue border
  ECG_LINE_WIDTH: 1.5,     // ECG waveform thickness
};

// Y-offset array for lead positioning (Create_report Part 2.java line 556)
export const Y_OFFSETS = [
  CANVAS_HEIGHT - 2937, // Row 0
  CANVAS_HEIGHT - 2437, // Row 1
  CANVAS_HEIGHT - 1937, // Row 2
  CANVAS_HEIGHT - 1437, // Row 3
  CANVAS_HEIGHT - 937,  // Row 4
  3420,                 // Row 5 (hardcoded in native)
];

// X-offset for waveform start position
export const X_OFFSET = 135;

// ECG Settings
export const ECG_SETTINGS = {
  SAMPLE_RATE: 250,        // Hz
  TOTAL_SAMPLES: 6500,     // Total samples per lead
  XAXIS_WIDTH: 1300,       // Width for display (total_samples / 5)
  PLOT_SAMPLES_OFFSET: 1300, // Skip first 1300 samples for PDF
};

// Y-axis scaling (Create_report Part 2.java - Adjust_y_pixel function)
export const Y_SCALE_FACTOR = 50 / 27; // ~1.852

// Rectangle border dimensions (Create_report Part 2.java lines 309-313)
export const BORDER_RECT = {
  X: 36,
  Y: 36,
  WIDTH: CANVAS_WIDTH - 63,
  HEIGHT: 3235,
};

// Calibration pulse settings
export const CALIBRATION = {
  HEIGHT: 200,  // 1mV = 10mm = 200 pixels
  WIDTH: 100,   // 5mm = 100 pixels
};

// Medical ECG paper standard
export const ECG_PAPER = {
  MM_PER_MV: 10,           // Standard: 10mm = 1mV
  MM_PER_SEC: 25,          // Standard: 25mm = 1 second
  PIXEL_PER_MM: 4,         // Native uses 4 pixels per mm
  SMALL_BOX_MM: 1,         // Small box = 1mm
  LARGE_BOX_MM: 5,         // Large box = 5mm
};

// Per-lead Y-offset corrections (in pixels)
// Fine-tuning to align waveforms with lead labels
export const LEAD_Y_CORRECTIONS: Record<number, number> = {
  0: 1,   // Lead I - was 1-2px above, need less upward offset
  1: 7,   // Lead II - was 4px below, need 4px more upward
  2: 7,   // Lead III - was 1 tiny box (4px) below, need 4px more upward
  3: 7,   // aVR - was 1 tiny box (4px) below, need 4px more upward
  4: 7,   // aVL - was 1 tiny box (4px) below, need 4px more upward
  5: 7,   // aVF - was 1 tiny box (4px) below, need 4px more upward
  6: 4,   // V1 - needs 1px more upward (was 1px below)
  7: 3,   // V2 - perfect with 3px offset
  8: 4,   // V3 - needs 1px more upward (was 1px below)
  9: 3,   // V4 - perfect with 3px offset
  10: -5, // V5 - needs 8px downward (was 2 tiny boxes = 8px above)
  11: 3,  // V6 - perfect with 3px offset
};
