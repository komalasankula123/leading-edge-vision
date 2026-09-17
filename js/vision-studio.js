/**
 * Vision Studio: Interactive Edge AI Machine Vision Playground
 * Leading Edge Vision
 */

(function () {
  const imageElement = document.getElementById('vision-image');
  const videoElement = document.getElementById('webcam-video');
  const canvas = document.getElementById('hud-canvas');
  if (!canvas || !imageElement) return;

  const ctx = canvas.getContext('2d');

  // Controls Elements
  const presetBtns = document.querySelectorAll('.preset-btn');
  const confidenceSlider = document.getElementById('confidence-slider');
  const confidenceVal = document.getElementById('confidence-val');
  const modelSelect = document.getElementById('model-select');
  const toggleBbox = document.getElementById('toggle-bbox');
  const toggleHeatmap = document.getElementById('toggle-heatmap');
  const toggleAudio = document.getElementById('toggle-audio');

  // Telemetry Metric Elements
  const metricFps = document.getElementById('telemetry-fps');
  const metricLatency = document.getElementById('telemetry-latency');
  const metricDetections = document.getElementById('telemetry-detections');
  const metricTemp = document.getElementById('telemetry-temp');
  const detectionList = document.getElementById('detection-list');
  const telemetryLog = document.getElementById('telemetry-log');

  let activePreset = 'pcb';
  let isWebcam = false;
  let webcamStream = null;
  let hoveredDetectionIndex = -1;
  let audioContext = null;

  // Presets Data (Percentages relative to image size [x, y, width, height])
  const presetsData = {
    pcb: {
      image: 'assets/images/pcb-inspection.jpg',
      detections: [
        { label: 'IC Microcontroller U1', type: 'pass', conf: 99.4, x: 0.44, y: 0.44, w: 0.20, h: 0.22, meta: 'Aligned 0.02mm' },
        { label: 'Solder Bridge J4', type: 'defect', conf: 98.2, x: 0.62, y: 0.38, w: 0.12, h: 0.10, meta: 'SHORT DETECTED' },
        { label: 'SMD Cap C12', type: 'pass', conf: 96.1, x: 0.28, y: 0.48, w: 0.08, h: 0.08, meta: 'Tension OK' },
        { label: 'Micro Trace Micro-Crack', type: 'defect', conf: 92.5, x: 0.34, y: 0.60, w: 0.14, h: 0.09, meta: 'FRACTURE 14um' },
        { label: 'Test Pin Array P1', type: 'pass', conf: 99.1, x: 0.18, y: 0.58, w: 0.12, h: 0.26, meta: 'All 16 Valid' },
        { label: 'Crystal Oscillator X1', type: 'pass', conf: 94.8, x: 0.35, y: 0.32, w: 0.09, h: 0.09, meta: 'Frequency OK' }
      ]
    },
    robotics: {
      image: 'assets/images/robotics-spatial.jpg',
      detections: [
        { label: 'AMR Unit 04', type: 'pass', conf: 99.3, x: 0.38, y: 0.52, w: 0.26, h: 0.34, meta: 'Dist: 2.1m | 1.2m/s' },
        { label: 'Human Worker [Safety Zone]', type: 'warning', conf: 95.8, x: 0.77, y: 0.33, w: 0.09, h: 0.33, meta: 'Dist: 3.8m | Safe' },
        { label: 'Pallet Rack Zone B', type: 'pass', conf: 97.4, x: 0.51, y: 0.18, w: 0.18, h: 0.22, meta: 'Volumetric: 98%' },
        { label: 'Unregistered Obstacle', type: 'defect', conf: 91.6, x: 0.88, y: 0.40, w: 0.08, h: 0.20, meta: 'ALERT: Zone Clear' },
        { label: 'Navigation Waypoint 12', type: 'pass', conf: 98.7, x: 0.26, y: 0.68, w: 0.12, h: 0.08, meta: 'Trajectory Aligned' }
      ]
    },
    thermal: {
      image: 'assets/images/thermal-inspection.jpg',
      detections: [
        { label: 'Engine Cylinder Chamber', type: 'pass', conf: 99.0, x: 0.33, y: 0.24, w: 0.22, h: 0.25, meta: '168.4°C [Nominal]' },
        { label: 'Thermal Hotspot #3', type: 'defect', conf: 98.7, x: 0.42, y: 0.32, w: 0.08, h: 0.09, meta: '211.7°C [CRITICAL]' },
        { label: 'Coolant Jacket Seal', type: 'pass', conf: 96.5, x: 0.32, y: 0.58, w: 0.28, h: 0.26, meta: '44.2°C [OK]' },
        { label: 'Exhaust Runner Flange', type: 'pass', conf: 97.2, x: 0.75, y: 0.65, w: 0.22, h: 0.26, meta: '188.0°C [OK]' }
      ]
    }
  };

  // Synthetic webcam mock tracking targets
  let webcamSimDetections = [
    { label: 'Spatial Subject Alpha', type: 'pass', conf: 98.5, x: 0.32, y: 0.25, w: 0.36, h: 0.50, meta: 'Tracking Active' },
    { label: 'Visual Edge Optical Marker', type: 'pass', conf: 96.2, x: 0.15, y: 0.70, w: 0.20, h: 0.15, meta: 'Lock Verified' }
  ];

  // Sound Synthesizer via Web Audio API
  function playAlertBeep(type) {
    if (!toggleAudio || !toggleAudio.checked) return;
    try {
      if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.type = type === 'defect' ? 'sawtooth' : 'sine';
      osc.frequency.setValueAtTime(type === 'defect' ? 880 : 520, audioContext.currentTime);
      gain.gain.setValueAtTime(0.08, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(audioContext.destination);
      osc.start();
      osc.stop(audioContext.currentTime + 0.12);
    } catch (e) {
      console.warn('Audio Context error', e);
    }
  }

  function resizeCanvas() {
    const targetElement = isWebcam ? videoElement : imageElement;
    const rect = targetElement.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
      canvas.width = rect.width;
      canvas.height = rect.height;
    }
  }

  function getActiveDetections() {
    const minConf = parseFloat(confidenceSlider.value);
    const data = isWebcam ? webcamSimDetections : (presetsData[activePreset]?.detections || []);
    return data.filter(d => d.conf >= minConf);
  }

  function updateTelemetryUI() {
    const activeList = getActiveDetections();
    metricDetections.textContent = activeList.length;

    // Model benchmarks
    const model = modelSelect.value;
    let baseLatency = 0.42;
    let baseFps = 240;
    if (model === 'spatial3d') {
      baseLatency = 0.74;
      baseFps = 138;
    } else if (model === 'subpixel') {
      baseLatency = 0.96;
      baseFps = 104;
    }

    // Add tiny realistic jitter
    const latencyJitter = (baseLatency + (Math.random() * 0.06 - 0.03)).toFixed(2);
    const fpsJitter = Math.round(baseFps + (Math.random() * 8 - 4));
    const tempJitter = (41.5 + (Math.random() * 1.2 - 0.6)).toFixed(1);

    metricLatency.textContent = `${latencyJitter} ms`;
    metricFps.textContent = `${fpsJitter} FPS`;
    metricTemp.textContent = `${tempJitter}°C`;

    // Render Detection List
    detectionList.innerHTML = '';
    if (activeList.length === 0) {
      detectionList.innerHTML = `<div style="color: #64748b; font-size: 0.8rem; padding: 12px 0;">No detections above ${confidenceSlider.value}% threshold.</div>`;
      return;
    }

    activeList.forEach((item, idx) => {
      const el = document.createElement('div');
      el.className = `detection-item ${hoveredDetectionIndex === idx ? 'hovered' : ''}`;
      el.style.cursor = 'pointer';

      let badgeClass = 'badge-pass';
      if (item.type === 'defect') badgeClass = 'badge-defect';
      else if (item.type === 'warning') badgeClass = 'badge-warning';

      el.innerHTML = `
        <div class="detection-tag-pill">
          <span class="${badgeClass}">${item.type.toUpperCase()}</span>
          <span>${item.label}</span>
        </div>
        <div style="display: flex; gap: 8px; align-items: center;">
          <span style="color: var(--cyan-bright); font-weight: 600;">${item.conf}%</span>
        </div>
      `;

      el.addEventListener('mouseenter', () => {
        hoveredDetectionIndex = idx;
        drawHudOverlay();
      });

      el.addEventListener('mouseleave', () => {
        hoveredDetectionIndex = -1;
        drawHudOverlay();
      });

      detectionList.appendChild(el);
    });
  }

  function addLogMessage(msg, type = 'normal') {
    if (!telemetryLog) return;
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0] + '.' + String(now.getMilliseconds()).padStart(3, '0').slice(0, 2);
    
    const entry = document.createElement('div');
    entry.className = 'log-entry';
    entry.innerHTML = `
      <span class="log-time">[${timeStr}]</span>
      <span class="log-msg ${type === 'alert' ? 'alert' : type === 'highlight' ? 'highlight' : ''}">${msg}</span>
    `;

    telemetryLog.insertBefore(entry, telemetryLog.firstChild);
    while (telemetryLog.children.length > 5) {
      telemetryLog.removeChild(telemetryLog.lastChild);
    }
  }

  function drawHudOverlay() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const w = canvas.width;
    const h = canvas.height;
    if (w === 0 || h === 0) return;

    // 1. Draw Heatmap Simulation if enabled
    if (toggleHeatmap && toggleHeatmap.checked) {
      ctx.save();
      const grad = ctx.createRadialGradient(w * 0.5, h * 0.45, 20, w * 0.5, h * 0.45, w * 0.45);
      grad.addColorStop(0, 'rgba(255, 51, 102, 0.28)');
      grad.addColorStop(0.4, 'rgba(255, 183, 3, 0.18)');
      grad.addColorStop(0.7, 'rgba(0, 242, 254, 0.12)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
      ctx.restore();
    }

    // 2. Optical Center Reticle
    ctx.save();
    ctx.strokeStyle = 'rgba(0, 242, 254, 0.2)';
    ctx.lineWidth = 1;
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.moveTo(w / 2, 0); ctx.lineTo(w / 2, h);
    ctx.moveTo(0, h / 2); ctx.lineTo(w, h / 2);
    ctx.stroke();
    ctx.restore();

    // 3. Draw Bounding Boxes if enabled
    if (toggleBbox && toggleBbox.checked) {
      const detections = getActiveDetections();

      detections.forEach((item, idx) => {
        const bx = item.x * w;
        const by = item.y * h;
        const bw = item.w * w;
        const bh = item.h * h;

        let strokeColor = '#00f5a0'; // green pass
        let fillColor = 'rgba(0, 245, 160, 0.08)';

        if (item.type === 'defect') {
          strokeColor = '#ff3366'; // red defect
          fillColor = 'rgba(255, 51, 102, 0.15)';
        } else if (item.type === 'warning') {
          strokeColor = '#ffb703'; // amber warning
          fillColor = 'rgba(255, 183, 3, 0.12)';
        }

        const isHovered = (idx === hoveredDetectionIndex);
        if (isHovered) {
          fillColor = fillColor.replace(/0\.\d+\)/, '0.35)');
        }

        ctx.save();

        // Box fill
        ctx.fillStyle = fillColor;
        ctx.fillRect(bx, by, bw, bh);

        // Box border
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = isHovered ? 2.5 : 1.5;
        ctx.strokeRect(bx, by, bw, bh);

        // Corner accents
        const cornerLen = Math.min(12, bw / 3, bh / 3);
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        // Top-left
        ctx.moveTo(bx, by + cornerLen); ctx.lineTo(bx, by); ctx.lineTo(bx + cornerLen, by);
        // Top-right
        ctx.moveTo(bx + bw - cornerLen, by); ctx.lineTo(bx + bw, by); ctx.lineTo(bx + bw, by + cornerLen);
        // Bottom-left
        ctx.moveTo(bx, by + bh - cornerLen); ctx.lineTo(bx, by + bh); ctx.lineTo(bx + cornerLen, by + bh);
        // Bottom-right
        ctx.moveTo(bx + bw - cornerLen, by + bh); ctx.lineTo(bx + bw, by + bh); ctx.lineTo(bx + bw, by + bh - cornerLen);
        ctx.stroke();

        // Label Badge Tag
        ctx.font = '11px "JetBrains Mono", monospace';
        const labelText = `${item.label} [${item.conf}%]`;
        const textMetrics = ctx.measureText(labelText);
        const tagH = 20;
        const tagW = textMetrics.width + 12;

        ctx.fillStyle = strokeColor;
        ctx.fillRect(bx, by - tagH, tagW, tagH);

        ctx.fillStyle = '#05070d';
        ctx.fillText(labelText, bx + 6, by - 5);

        // Metadata chip underneath if available
        if (item.meta) {
          ctx.font = '9px "JetBrains Mono", monospace';
          const subText = item.meta;
          const subMetrics = ctx.measureText(subText);
          ctx.fillStyle = 'rgba(8, 12, 22, 0.85)';
          ctx.fillRect(bx, by + bh, subMetrics.width + 10, 16);
          ctx.fillStyle = strokeColor;
          ctx.fillText(subText, bx + 5, by + bh + 12);
        }

        ctx.restore();
      });
    }
  }

  // Switch Feed Presets
  function setPreset(presetKey) {
    if (presetKey === 'webcam') {
      startWebcam();
      return;
    }

    stopWebcam();
    activePreset = presetKey;
    isWebcam = false;

    presetBtns.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-preset') === presetKey);
    });

    imageElement.style.display = 'block';
    videoElement.style.display = 'none';

    imageElement.src = presetsData[presetKey].image;
    imageElement.onload = () => {
      resizeCanvas();
      drawHudOverlay();
      updateTelemetryUI();
      addLogMessage(`Switched feed stream: [${presetKey.toUpperCase()}]`, 'highlight');
    };
  }

  async function startWebcam() {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert('Webcam access not supported in this browser environment.');
        return;
      }
      const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 1280, height: 720 } });
      webcamStream = stream;
      videoElement.srcObject = stream;
      videoElement.play();

      isWebcam = true;
      imageElement.style.display = 'none';
      videoElement.style.display = 'block';

      presetBtns.forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-preset') === 'webcam');
      });

      videoElement.onloadedmetadata = () => {
        resizeCanvas();
        addLogMessage('Live Webcam Optical Stream Initialized [0.28ms latency]', 'highlight');
      };
    } catch (err) {
      console.warn('Webcam permission denied or error', err);
      showToast('⚠️ Camera permission denied or not available. Using synthetic demo feed.');
    }
  }

  function stopWebcam() {
    if (webcamStream) {
      webcamStream.getTracks().forEach(track => track.stop());
      webcamStream = null;
    }
    videoElement.pause();
    videoElement.srcObject = null;
    isWebcam = false;
  }

  // Event Listeners
  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const presetKey = btn.getAttribute('data-preset');
      setPreset(presetKey);
    });
  });

  if (confidenceSlider) {
    confidenceSlider.addEventListener('input', (e) => {
      confidenceVal.textContent = `${e.target.value}%`;
      updateTelemetryUI();
      drawHudOverlay();
    });
  }

  if (modelSelect) {
    modelSelect.addEventListener('change', () => {
      updateTelemetryUI();
      addLogMessage(`Active Model swapped: [${modelSelect.options[modelSelect.selectedIndex].text}]`, 'highlight');
      playAlertBeep('normal');
    });
  }

  if (toggleBbox) {
    toggleBbox.addEventListener('change', () => drawHudOverlay());
  }

  if (toggleHeatmap) {
    toggleHeatmap.addEventListener('change', () => drawHudOverlay());
  }

  // Window resize observer
  window.addEventListener('resize', () => {
    resizeCanvas();
    drawHudOverlay();
  });

  // Telemetry real-time ticking loop
  setInterval(() => {
    updateTelemetryUI();
    if (isWebcam) {
      // simulate slight moving tracking boxes on webcam
      webcamSimDetections.forEach(d => {
        d.x += (Math.random() - 0.5) * 0.01;
        d.y += (Math.random() - 0.5) * 0.01;
        d.x = Math.max(0.1, Math.min(0.7, d.x));
        d.y = Math.max(0.1, Math.min(0.6, d.y));
      });
      drawHudOverlay();
    }
  }, 900);

  // Initial setup
  imageElement.onload = () => {
    resizeCanvas();
    drawHudOverlay();
    updateTelemetryUI();
    addLogMessage('System initialized: Edge Vision Core v4.18 [ONLINE]', 'highlight');
    addLogMessage('Inspection target calibrated: PCB Wafer [OK]', 'normal');
  };

  // If already loaded from cache
  if (imageElement.complete && imageElement.naturalHeight !== 0) {
    resizeCanvas();
    drawHudOverlay();
    updateTelemetryUI();
  }

  window.setVisionPreset = setPreset;
})();
