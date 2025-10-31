/**
 * ECG Data Types
 * Matches the native Android implementation and Flutter CSV output
 */

export interface ECGDataPoint {
  sample_index: number;
  x_coord: number;
  lead: number;
  lead_name: string;
  filtered_value: number;
  adjusted_y: number;
  plot_y: number;
}

export interface ECGLead {
  leadIndex: number;
  leadName: string;
  dataPoints: ECGDataPoint[];
}

export interface PatientInfo {
  name: string;
  id: string;
  age: string;
  gender: string;
  dob: string;
  height: string;
  weight: string;
  bp: string;
  medication: string;
}

export interface ECGSettings {
  gain: number;
  filterType: string;
  sampleRate: number; // 250Hz
  totalSamples: number; // 6500
}

export interface ECGData {
  leads: ECGLead[];
  patientInfo?: PatientInfo;
  settings: ECGSettings;
  timestamp: Date;
}

export type LeadName = 'I' | 'II' | 'III' | 'aVR' | 'aVL' | 'aVF' | 'V1' | 'V2' | 'V3' | 'V4' | 'V5' | 'V6';

export interface CanvasConfig {
  width: number;
  height: number;
  scale: number;
}

export interface GridConfig {
  minorGridColor: string; // Light pink
  majorGridColor: string; // Dark pink
  blueLineColor: string; // Blue emphasis
  gridSpacing: number; // 5mm boxes
}

// Explicit re-exports for better compatibility
export type { ECGDataPoint, ECGLead, PatientInfo, ECGSettings, ECGData, LeadName, CanvasConfig, GridConfig };
