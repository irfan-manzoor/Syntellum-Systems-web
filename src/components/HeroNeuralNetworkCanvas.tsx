import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface NeuronData {
  pos: THREE.Vector3;
  basePos: THREE.Vector3;
  activation: number;
  pulsePhase: number;
  connections: number[];
}

interface ActionPacket {
  fromIdx: number;
  toIdx: number;
  progress: number;
  speed: number;
}

export function HeroNeuralNetworkCanvas() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. SCENE & CAMERA (Static, Tranquil Viewport)
    const scene = new THREE.Scene();

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 16);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.95; // Deep, atmospheric baseline
    renderer.setClearColor(0x000000, 0); // 100% transparent canvas
    container.appendChild(renderer.domElement);

    // 2. PROCEDURAL HIGH-DEFINITION NODE SPRITE
    const createGlowTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d')!;
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
      grad.addColorStop(0.25, 'rgba(93, 217, 232, 0.85)');
      grad.addColorStop(0.55, 'rgba(67, 140, 255, 0.3)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(32, 32, 32, 0, Math.PI * 2);
      ctx.fill();
      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      return texture;
    };
    const nodeTexture = createGlowTexture();

    // 3. FULLY DISTRIBUTED, STATIONARY 3D NEURAL TOPOLOGY
    // Evenly distributed across the entire section breadth and height (no voids, no clumps)
    const neurons: NeuronData[] = [];
    const cols = 16;
    const rows = 11;
    const minX = -17;
    const maxX = 17;
    const minY = -7.5;
    const maxY = 7.5;
    const stepX = (maxX - minX) / cols;
    const stepY = (maxY - minY) / rows;

    // Structured, stratified lattice covering the entire hero background
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        const jx = minX + (c + 0.5 + (Math.random() - 0.5) * 0.72) * stepX;
        const jy = minY + (r + 0.5 + (Math.random() - 0.5) * 0.72) * stepY;
        const jz = (Math.random() - 0.5) * 4.5;
        const pos = new THREE.Vector3(jx, jy, jz);
        neurons.push({
          pos: pos.clone(),
          basePos: pos.clone(),
          activation: 0.05, // Quiet, non-intrusive baseline
          pulsePhase: Math.random() * Math.PI * 2,
          connections: [],
        });
      }
    }

    // Additional volumetric depth nodes across the full perimeter
    const extraNodes = 44;
    for (let i = 0; i < extraNodes; i++) {
      const pos = new THREE.Vector3(
        (Math.random() - 0.5) * 36,
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 6
      );
      neurons.push({
        pos: pos.clone(),
        basePos: pos.clone(),
        activation: 0.05,
        pulsePhase: Math.random() * Math.PI * 2,
        connections: [],
      });
    }

    const neuronCount = neurons.length;

    // Build Interconnected Synaptic Axon Connections (Geodesic Network)
    for (let i = 0; i < neurons.length; i++) {
      const nA = neurons[i];
      // Find nearest neighboring nodes within spatial radius
      const neighbors: { idx: number; dist: number }[] = [];
      for (let j = 0; j < neurons.length; j++) {
        if (i === j) continue;
        const d = nA.basePos.distanceTo(neurons[j].basePos);
        if (d > 1.2 && d < 3.8) {
          neighbors.push({ idx: j, dist: d });
        }
      }
      neighbors.sort((a, b) => a.dist - b.dist);

      // Connect to the closest 2 to 3 neighbors
      const maxConnect = 2 + (i % 2);
      for (let k = 0; k < Math.min(neighbors.length, maxConnect); k++) {
        const targetIdx = neighbors[k].idx;
        if (!nA.connections.includes(targetIdx)) {
          nA.connections.push(targetIdx);
        }
      }
    }

    // 4. THREE.JS GEOMETRIES & MATERIALS
    // A) Nodes Geometry & Points
    const nodePositions = new Float32Array(neuronCount * 3);
    const nodeColors = new Float32Array(neuronCount * 3);
    const nodeSizes = new Float32Array(neuronCount);

    for (let i = 0; i < neuronCount; i++) {
      nodePositions[i * 3] = neurons[i].pos.x;
      nodePositions[i * 3 + 1] = neurons[i].pos.y;
      nodePositions[i * 3 + 2] = neurons[i].pos.z;
    }

    const nodesGeo = new THREE.BufferGeometry();
    nodesGeo.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));
    nodesGeo.setAttribute('color', new THREE.BufferAttribute(nodeColors, 3));
    nodesGeo.setAttribute('size', new THREE.BufferAttribute(nodeSizes, 1));

    const nodesMat = new THREE.PointsMaterial({
      size: 0.35,
      map: nodeTexture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const nodesMesh = new THREE.Points(nodesGeo, nodesMat);
    scene.add(nodesMesh);

    // B) Synaptic Axon Lines (Subtle Hairlines, Completely Stationary)
    const maxLines = 650;
    const linePositions = new Float32Array(maxLines * 6);
    const lineColors = new Float32Array(maxLines * 6);

    const linesGeo = new THREE.BufferGeometry();
    linesGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    linesGeo.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

    const linesMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      linewidth: 1,
    });
    const linesMesh = new THREE.LineSegments(linesGeo, linesMat);
    scene.add(linesMesh);

    // Pre-populate fixed line coordinates (network does not move)
    let fixedLineCount = 0;
    const connectionPairs: [number, number][] = [];

    for (let i = 0; i < neurons.length && fixedLineCount < maxLines; i++) {
      const nA = neurons[i];
      for (let c = 0; c < nA.connections.length && fixedLineCount < maxLines; c++) {
        const j = nA.connections[c];
        if (i < j) {
          connectionPairs.push([i, j]);
          const pIdx = fixedLineCount * 6;
          linePositions[pIdx] = nA.pos.x;
          linePositions[pIdx + 1] = nA.pos.y;
          linePositions[pIdx + 2] = nA.pos.z;
          linePositions[pIdx + 3] = neurons[j].pos.x;
          linePositions[pIdx + 4] = neurons[j].pos.y;
          linePositions[pIdx + 5] = neurons[j].pos.z;
          fixedLineCount++;
        }
      }
    }
    (linesGeo.attributes.position as THREE.BufferAttribute).needsUpdate = true;

    // C) Action Potential Flowing Signal Packets
    const maxPackets = 40;
    const packets: ActionPacket[] = [];
    const packetPositions = new Float32Array(maxPackets * 3);
    const packetGeo = new THREE.BufferGeometry();
    packetGeo.setAttribute('position', new THREE.BufferAttribute(packetPositions, 3));

    const packetMat = new THREE.PointsMaterial({
      size: 0.22,
      map: nodeTexture,
      color: 0x5dd9e8,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const packetMesh = new THREE.Points(packetGeo, packetMat);
    scene.add(packetMesh);

    // 5. POINTER TRACKING & SELECTIVE NODE HOVER
    const mouse2D = { x: 0, y: 0, targetX: 0, targetY: 0, active: false };
    const mouse3D = new THREE.Vector3(0, 0, 0);

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      mouse2D.targetX = normX;
      mouse2D.targetY = normY;
      mouse2D.active = true;
    };

    const handlePointerLeave = () => {
      mouse2D.active = false;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    container.addEventListener('pointerleave', handlePointerLeave);

    // 6. RESIZE OBSERVER
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const cr = entry.contentRect;
        width = cr.width || window.innerWidth;
        height = cr.height || window.innerHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      }
    });
    resizeObserver.observe(container);

    // 7. ANIMATION LOOP (Calm, Stationary, Selective Hover Reaction)
    let animId: number;
    let clock = new THREE.Clock();
    let frame = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      frame++;
      const delta = clock.getDelta();

      // Smooth mouse coordinate tracking
      mouse2D.x += (mouse2D.targetX - mouse2D.x) * 0.12;
      mouse2D.y += (mouse2D.targetY - mouse2D.y) * 0.12;

      // Project 3D mouse coordinate onto the z=0 plane
      if (mouse2D.active) {
        const vector = new THREE.Vector3(mouse2D.x, mouse2D.y, 0.5);
        vector.unproject(camera);
        const dir = vector.sub(camera.position).normalize();
        const dist = -camera.position.z / dir.z;
        mouse3D.copy(camera.position).add(dir.multiplyScalar(dist));
      }

      // Selective Node Activation: ONLY the node directly under/near the cursor brightens
      const colAttr = nodesGeo.attributes.color as THREE.BufferAttribute;
      const sizeAttr = nodesGeo.attributes.size as THREE.BufferAttribute;

      for (let i = 0; i < neuronCount; i++) {
        const n = neurons[i];

        // Hover proximity test (strict, localized radius: 1.7 units)
        if (mouse2D.active) {
          const dx = n.pos.x - mouse3D.x;
          const dy = n.pos.y - mouse3D.y;
          const dist2D = Math.sqrt(dx * dx + dy * dy);

          if (dist2D < 1.7) {
            // Sharply brighten ONLY this specific node
            const proximityFactor = Math.pow(1 - dist2D / 1.7, 1.8);
            n.activation = Math.min(1.0, n.activation + proximityFactor * 0.28);

            // Periodically propagate subtle synapsing packet from hovered node
            if (n.activation > 0.65 && Math.random() < 0.05 && n.connections.length > 0 && packets.length < maxPackets) {
              const targetIdx = n.connections[Math.floor(Math.random() * n.connections.length)];
              packets.push({
                fromIdx: i,
                toIdx: targetIdx,
                progress: 0,
                speed: 0.02 + Math.random() * 0.02,
              });
            }
          }
        }

        // Smooth decay back to calm resting state
        n.activation = Math.max(0.05, n.activation * 0.94);

        const act = n.activation;
        // Resting: dim, deep sapphire blue (RGB ~0.08, 0.18, 0.38)
        // Activated (Hovered): vivid electric cyan & crisp white core (RGB ~0.7, 0.95, 1.0)
        const r = 0.06 + act * 0.75;
        const g = 0.16 + act * 0.82;
        const b = 0.35 + act * 0.65;
        colAttr.setXYZ(i, r, g, b);

        // Subtle scale expansion exclusively for active node
        const size = (0.24 + act * 0.36) * 1.0;
        sizeAttr.setX(i, size);
      }

      colAttr.needsUpdate = true;
      sizeAttr.needsUpdate = true;

      // Update Axon Lines: ONLY axons touching brightened nodes illuminate
      const lineColAttr = linesGeo.attributes.color as THREE.BufferAttribute;

      for (let k = 0; k < connectionPairs.length; k++) {
        const [i, j] = connectionPairs[k];
        const nA = neurons[i];
        const nB = neurons[j];
        const maxAct = Math.max(nA.activation, nB.activation);

        const pIdx = k * 6;
        if (maxAct > 0.08) {
          // Connected to a brightened node: illuminate local filament
          const alpha = 0.04 + (maxAct - 0.08) * 0.38;
          lineColors[pIdx] = 0.3 * alpha;
          lineColors[pIdx + 1] = 0.8 * alpha;
          lineColors[pIdx + 2] = 1.0 * alpha;
          lineColors[pIdx + 3] = 0.2 * alpha;
          lineColors[pIdx + 4] = 0.7 * alpha;
          lineColors[pIdx + 5] = 0.95 * alpha;
        } else {
          // Resting baseline: barely perceptible ambient filament
          const alpha = 0.035;
          lineColors[pIdx] = 0.08 * alpha;
          lineColors[pIdx + 1] = 0.25 * alpha;
          lineColors[pIdx + 2] = 0.6 * alpha;
          lineColors[pIdx + 3] = 0.06 * alpha;
          lineColors[pIdx + 4] = 0.2 * alpha;
          lineColors[pIdx + 5] = 0.55 * alpha;
        }
      }
      lineColAttr.needsUpdate = true;

      // Update Action Potential Signal Packets
      const packetPosAttr = packetGeo.attributes.position as THREE.BufferAttribute;
      let activePacketCount = 0;

      for (let p = packets.length - 1; p >= 0; p--) {
        const pkt = packets[p];
        pkt.progress += pkt.speed;

        const fromNode = neurons[pkt.fromIdx];
        const toNode = neurons[pkt.toIdx];

        if (fromNode && toNode) {
          const curPos = new THREE.Vector3().lerpVectors(fromNode.pos, toNode.pos, pkt.progress);
          const idx3 = activePacketCount * 3;
          packetPositions[idx3] = curPos.x;
          packetPositions[idx3 + 1] = curPos.y;
          packetPositions[idx3 + 2] = curPos.z;
          activePacketCount++;
        }

        if (pkt.progress >= 1.0) {
          if (toNode) toNode.activation = Math.min(0.7, toNode.activation + 0.18);
          packets.splice(p, 1);
        }
      }

      for (let k = activePacketCount * 3; k < maxPackets * 3; k++) {
        packetPositions[k] = 0;
      }
      packetPosAttr.needsUpdate = true;

      // Render calm, stable scene (Zero camera sway, zero network drift)
      renderer.render(scene, camera);
    };

    animate();

    // 8. CLEANUP
    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      window.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerleave', handlePointerLeave);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      scene.clear();
      renderer.dispose();
      nodesGeo.dispose();
      nodesMat.dispose();
      linesGeo.dispose();
      linesMat.dispose();
      packetGeo.dispose();
      packetMat.dispose();
      nodeTexture.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-auto select-none z-10 overflow-hidden"
      style={{ touchAction: 'none' }}
    />
  );
}
