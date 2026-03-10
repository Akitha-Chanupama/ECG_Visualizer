# ⚡ ECG Visualizer

A **medical-grade 12-lead ECG** visualization web application built with **React + TypeScript** and **pure HTML5 Canvas**.!

---

test

## ✨ Key Features

* 🎯 **High-Performance Canvas Rendering**
  Pure HTML5 Canvas — **no graphing libraries**, no lag.

* 🩺 **Medical-Grade ECG Grid**
  Exact colors, calibration, and spacing (mirrors native clinical systems).

* 🧭 **12-Lead Support**

  * Limb Leads: *I, II, III, aVR, aVL, aVF*
  * Chest Leads: *V1 – V6*

* 👆 **Interactive Controls**

  * Toggle leads on/off
  * Switch between pages (Limb vs Chest)
  * Zoom from **10% → 100%**

* 📥 **CSV Upload**
  Drag & drop or file picker (Compatible with Flutter ECG PDF export service).

* 📤 **Export to PNG**
  Download your current view as a high-resolution image.

---

## 🚀 Quick Start

### 🔧 Installation

```bash
cd ecg-visualizer
npm install
```

### 🧑‍💻 Development

```bash
npm run dev
```

---

## 🧪 Usage

1. Upload a CSV exported from the Flutter ECG service.
2. Choose viewing mode:

   * **Page 1** → Limb Leads
   * **Page 2** → Chest Leads
3. Toggle any lead on/off for focused analysis.
4. Adjust zoom level between 10% and 100%.
5. Export the current canvas view to PNG (optional).

---

## 📂 Project Structure (Simplified)

```
ECG-Visualizer/
├── src/
│   ├── components/
│   ├── canvas/
│   ├── utils/
│   └── styles/
├── public/
└── package.json
```

---

## 🛠️ Tech Stack

| Layer      | Technology               |
| ---------- | ------------------------ |
| Framework  | React + TypeScript       |
| Rendering  | HTML5 Canvas             |
| UI         | Custom minimal controls  |
| Data Input | CSV upload parsing       |
| Packaging  | Vite or CRA (your setup) |

---

## ✅ Future Enhancements

* 🧬 Real-time ECG streaming support
* 📊 Measurement overlays (HR, PR, QT, QRS)
* 📈 Filter toggles (Baseline, Noise, Smoothing)
* 🌙 Dark theme mode
* 🔍 Fine-grain zoom + panning

---

## 🤝 Contributing

Pull requests and feature suggestions are welcome! Create an issue to discuss your idea before implementing.

---

## 📜 License

This project is licensed under the **MIT License** — free to use & modify.

---

## 🔧 Want more?

I can also add any of the following:

* Badges (build, license, npm)
* A screenshot or GIF demo section
* A logo/banner for the repo
* Example CSV files and a sample dataset

If you'd like any of those, tell me which and I’ll add them to the canvas README.
