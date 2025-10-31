/**
 * Canvas Rendering Utilities
 * Direct port of native Android canvas drawing logic
 */

import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  GRID_COLORS,
  GRID_CONFIG,
  BORDER_RECT,
  Y_OFFSETS,
  X_OFFSET,
  Y_SCALE_FACTOR,
} from './constants';

export class CanvasRenderer {
  private ctx: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Failed to get 2D context');
    }
    this.ctx = ctx;
  }

  /**
   * Clear the canvas
   */
  clear(): void {
    this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }

  /**
   * Draw border rectangle (Create_report Part 2.java lines 309-314)
   */
  drawBorderRectangle(): void {
    this.ctx.strokeStyle = GRID_COLORS.BLUE;
    this.ctx.lineWidth = GRID_CONFIG.BLUE_LINE_WIDTH;
    this.ctx.strokeRect(
      BORDER_RECT.X,
      BORDER_RECT.Y,
      BORDER_RECT.WIDTH,
      BORDER_RECT.HEIGHT
    );
  }

  /**
   * Draw ECG grid with exact native implementation
   * (Create_report Part 2.java lines 161-300)
   */
  drawGrid(direction: 'vertical' | 'horizontal', endPoint: number): void {
    let x1 = 0,
      x2 = 0,
      y1 = 0,
      y2 = 0;

    if (direction === 'vertical') {
      y1 = 36;
      y2 = 3235;
    } else {
      x1 = 36;
      x2 = CANVAS_WIDTH - 63;
    }

    // Native loop: for (int i = 36, j = 0, k = 0; i <= end_pt - 5 * 4; i += 5 * 4, j++)
    for (let i = 36, j = 0, k = 0; i <= endPoint - 5 * 4; i += 5 * 4, j++) {
      if (direction === 'vertical') {
        // Vertical lines
        // Set color based on major/minor grid
        if (j % 5 === 0) {
          this.ctx.strokeStyle = GRID_COLORS.DARK_PINK; // Major line
        } else {
          this.ctx.strokeStyle = GRID_COLORS.LIGHT_PINK; // Minor line
        }

        this.ctx.lineWidth = GRID_CONFIG.MINOR_LINE_WIDTH;
        this.drawLine(i, y1, i, y2);

        // Draw blue lines at specific positions
        if (j % 5 === 0) {
          if (k === 0 || k === 1) {
            this.ctx.strokeStyle = GRID_COLORS.BLUE;
            this.drawLine(i, y1, i, y2);
          }
          k++;
        }
      } else {
        // Horizontal lines
        if (j % 5 === 0) {
          this.ctx.strokeStyle = GRID_COLORS.DARK_PINK; // Major line
          if (k === 0) {
            // First horizontal line is blue
            this.ctx.strokeStyle = GRID_COLORS.BLUE;
          }
          k++;
        } else {
          this.ctx.strokeStyle = GRID_COLORS.LIGHT_PINK; // Minor line
        }

        this.ctx.lineWidth = GRID_CONFIG.MINOR_LINE_WIDTH;
        this.drawLine(x1, i, x2, i);
      }
    }
  }

  /**
   * Draw a line (native pattern: moveTo, lineTo, stroke)
   */
  private drawLine(x1: number, y1: number, x2: number, y2: number): void {
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
  }

  /**
   * Draw ECG waveform line
   */
  drawECGLine(x1: number, y1: number, x2: number, y2: number): void {
    this.ctx.strokeStyle = GRID_COLORS.BLACK;
    this.ctx.lineWidth = GRID_CONFIG.ECG_LINE_WIDTH;
    this.drawLine(x1, y1, x2, y2);
  }

  /**
   * Draw small circle marker at start of waveform
   */
  drawCircleMarker(x: number, y: number): void {
    this.ctx.fillStyle = GRID_COLORS.BLACK;
    this.ctx.strokeStyle = GRID_COLORS.GRAY;
    this.ctx.beginPath();
    this.ctx.arc(x, y, 1, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.stroke();
  }

  /**
   * Draw calibration pulse (1mV square wave)
   * (Create_report Part 2.java lines 302-369)
   */
  drawCalibrationPulse(row: number, gain: number = 2): void {
    const baseY = Y_OFFSETS[row];
    const calibrationHeight = this.getCalibrationHeight(gain);

    // Starting position
    const startX = 60;
    const startY = CANVAS_HEIGHT - baseY;

    this.ctx.strokeStyle = GRID_COLORS.BLACK;
    this.ctx.lineWidth = GRID_CONFIG.ECG_LINE_WIDTH;

    // Draw calibration square wave
    this.ctx.beginPath();
    this.ctx.moveTo(startX, startY);
    this.ctx.lineTo(startX + 20, startY); // Flat baseline
    this.ctx.lineTo(startX + 20, startY - calibrationHeight); // Rise
    this.ctx.lineTo(startX + 60, startY - calibrationHeight); // Top
    this.ctx.lineTo(startX + 60, startY); // Fall
    this.ctx.lineTo(startX + 100, startY); // Flat baseline
    this.ctx.stroke();
  }

  /**
   * Get calibration height based on gain
   * (Create_report Part 2.java - get_Cal_height function)
   */
  private getCalibrationHeight(gain: number): number {
    switch (gain) {
      case 1:
        return 50.0; // iGAIN = 1
      case 2:
        return 100.0; // iGAIN = 2 (default)
      case 3:
        return 150.0; // iGAIN = 3
      case 4:
        return 200.0; // iGAIN = 4
      case 6:
        return 300.0; // iGAIN = 6
      case 8:
        return 400.0; // iGAIN = 8
      case 12:
        return 600.0; // iGAIN = 12
      default:
        return 100.0;
    }
  }

  /**
   * Draw lead label
   */
  drawLeadLabel(leadName: string, row: number): void {
    const x = 40;
    const y = CANVAS_HEIGHT - Y_OFFSETS[row] + 20;

    this.ctx.fillStyle = GRID_COLORS.BLACK;
    this.ctx.font = 'bold 36px Arial';
    this.ctx.textAlign = 'left';
    this.ctx.fillText(leadName, x, y);
  }

  /**
   * Adjust Y pixel value (scaling)
   * (Create_report Part 2.java - Adjust_y_pixel function)
   */
  static adjustYPixel(value: number): number {
    return Y_SCALE_FACTOR * value;
  }

  /**
   * Get canvas context
   */
  getContext(): CanvasRenderingContext2D {
    return this.ctx;
  }
}
