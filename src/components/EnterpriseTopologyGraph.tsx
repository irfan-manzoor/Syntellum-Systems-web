import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Play,
  Pause,
  Layers,
  Sparkles,
  Shield,
  Database,
  Cpu,
  Workflow,
  Activity,
  Maximize2
} from 'lucide-react';

export interface TopologyNode extends d3.SimulationNodeDatum {
  id: string;
  name: string;
  layer: 'governance' | 'intelligence' | 'data' | 'integration' | 'assurance';
  layerTitle: string;
  category: string;
  description: string;
  metrics: {
    latency: string;
    throughput: string;
    sla: string;
  };
  connectedTo: string[];
  radius?: number;
}

export interface TopologyLink extends d3.SimulationLinkDatum<TopologyNode> {
  source: string | TopologyNode;
  target: string | TopologyNode;
  type: 'data' | 'control' | 'inference' | 'audit';
  bandwidth?: string;
}

const NODES_DATA: TopologyNode[] = [
  // 1. Governance & Strategy
  {
    id: 'strat-core',
    name: 'Strategic Value Engine',
    layer: 'governance',
    layerTitle: 'Advisory & Governance',
    category: 'Commercial Alignment',
    description: 'Calculates business impact, ROI models, and continuous capability maturity benchmarks for AI investments.',
    metrics: { latency: 'Real-time', throughput: '100% Policy Sync', sla: '99.99%' },
    connectedTo: ['risk-perimeter', 'llm-mesh', 'schema-pipeline'],
    radius: 24,
  },
  {
    id: 'risk-perimeter',
    name: 'Regulatory & Risk Perimeter',
    layer: 'governance',
    layerTitle: 'Advisory & Governance',
    category: 'Security & Compliance',
    description: 'Enforces EU AI Act constraints, PII redaction perimeters, model lineage audits, and data sovereignty policies.',
    metrics: { latency: '< 5ms', throughput: '12k checks/sec', sla: '99.999%' },
    connectedTo: ['strat-core', 'llm-mesh', 'agent-coord', 'zero-trust'],
    radius: 19,
  },

  // 2. Intelligence & Models
  {
    id: 'llm-mesh',
    name: 'Reasoning & LLM Runtime',
    layer: 'intelligence',
    layerTitle: 'Core Intelligence',
    category: 'Generative Models',
    description: 'Multi-provider model gateway executing semantic routing, speculative decoding, dynamic token budgets, and fallback orchestration.',
    metrics: { latency: '22ms ttft', throughput: '48k tokens/sec', sla: '99.95%' },
    connectedTo: ['strat-core', 'agent-coord', 'rag-graph', 'deterministic-val', 'eval-harness'],
    radius: 26,
  },
  {
    id: 'agent-coord',
    name: 'Multi-Agent Coordinator',
    layer: 'intelligence',
    layerTitle: 'Core Intelligence',
    category: 'Autonomous Workflows',
    description: 'Dispatches task trees to specialized sub-agents, handling state transitions, goal decomposition, and memory rollbacks.',
    metrics: { latency: '12ms dispatch', throughput: '1.4k steps/sec', sla: '99.9%' },
    connectedTo: ['llm-mesh', 'rag-graph', 'action-dispatch', 'human-loop'],
    radius: 22,
  },
  {
    id: 'rag-graph',
    name: 'Hybrid RAG & Vector Lattice',
    layer: 'intelligence',
    layerTitle: 'Core Intelligence',
    category: 'Knowledge Graph',
    description: 'Dual-dense/sparse vector retrieval augmented with knowledge graph traversal for zero-hallucination fact grounding.',
    metrics: { latency: '< 18ms p95', throughput: '8.2k qps', sla: '99.99%' },
    connectedTo: ['llm-mesh', 'agent-coord', 'feature-store', 'eval-harness'],
    radius: 21,
  },
  {
    id: 'deterministic-val',
    name: 'Deterministic Validator',
    layer: 'intelligence',
    layerTitle: 'Core Intelligence',
    category: 'Reliability Engineering',
    description: 'Rigid schema validation and mathematical check against business invariants before any model output is executed.',
    metrics: { latency: '< 2ms', throughput: '25k events/sec', sla: '99.999%' },
    connectedTo: ['llm-mesh', 'action-dispatch', 'audit-ledger'],
    radius: 18,
  },

  // 3. Data Fabric
  {
    id: 'kafka-stream',
    name: 'High-Throughput Event Bus',
    layer: 'data',
    layerTitle: 'Data Engineering',
    category: 'Event Streaming',
    description: 'Distributed log ingesting enterprise operational events, database changes (CDC), and sensory signals at scale.',
    metrics: { latency: '< 4ms', throughput: '450k msgs/sec', sla: '99.999%' },
    connectedTo: ['schema-pipeline', 'feature-store', 'lakehouse'],
    radius: 22,
  },
  {
    id: 'schema-pipeline',
    name: 'ETL & Schema Pipeline',
    layer: 'data',
    layerTitle: 'Data Engineering',
    category: 'Data Pipeline',
    description: 'Automated data normalization, deduplication, schema evolution, and vector embedding generation.',
    metrics: { latency: 'Near real-time', throughput: '1.2 GB/sec', sla: '99.95%' },
    connectedTo: ['strat-core', 'kafka-stream', 'feature-store', 'rag-graph'],
    radius: 19,
  },
  {
    id: 'feature-store',
    name: 'Real-Time Feature Store',
    layer: 'data',
    layerTitle: 'Data Engineering',
    category: 'Machine Learning Data',
    description: 'Ultra-low latency key-value memory providing grounded operational context to live inference models.',
    metrics: { latency: '< 1.5ms', throughput: '120k reads/sec', sla: '99.99%' },
    connectedTo: ['schema-pipeline', 'rag-graph', 'llm-mesh'],
    radius: 20,
  },
  {
    id: 'lakehouse',
    name: 'Historical Data Lakehouse',
    layer: 'data',
    layerTitle: 'Data Engineering',
    category: 'Analytical Storage',
    description: 'Immutable Parquet/Iceberg repository housing long-term analytical history, audit dumps, and model evaluation corpuses.',
    metrics: { latency: 'Batch', throughput: '14 PB Indexed', sla: '99.99%' },
    connectedTo: ['kafka-stream', 'eval-harness', 'audit-ledger'],
    radius: 18,
  },

  // 4. Enterprise Integration
  {
    id: 'action-dispatch',
    name: 'Automated Action Dispatcher',
    layer: 'integration',
    layerTitle: 'Enterprise Integration',
    category: 'Operational Execution',
    description: 'Safe execution boundary executing transactions against ERPs, SAP, Salesforce, and core proprietary databases.',
    metrics: { latency: '< 35ms', throughput: '3.5k tx/sec', sla: '99.99%' },
    connectedTo: ['agent-coord', 'deterministic-val', 'human-loop', 'erp-bus'],
    radius: 22,
  },
  {
    id: 'human-loop',
    name: 'Human-in-the-Loop Console',
    layer: 'integration',
    layerTitle: 'Enterprise Integration',
    category: 'Operational Control',
    description: 'Real-time triage interface where operational staff review high-impact edge cases and ambiguous confidence thresholds.',
    metrics: { latency: 'Interactive', throughput: '100% Audit Coverage', sla: '99.95%' },
    connectedTo: ['agent-coord', 'action-dispatch', 'audit-ledger'],
    radius: 20,
  },
  {
    id: 'erp-bus',
    name: 'Enterprise Core Bus (ERP/CRM)',
    layer: 'integration',
    layerTitle: 'Enterprise Integration',
    category: 'Legacy Connectors',
    description: 'Resilient bi-directional connectors translating intelligent requests into legacy SOAP/REST/gRPC protocols.',
    metrics: { latency: '< 60ms', throughput: '8k calls/sec', sla: '99.9%' },
    connectedTo: ['action-dispatch', 'zero-trust', 'audit-ledger'],
    radius: 21,
  },

  // 5. System Assurance
  {
    id: 'zero-trust',
    name: 'Zero-Trust Perimeter & KMS',
    layer: 'assurance',
    layerTitle: 'System Assurance',
    category: 'Security Architecture',
    description: 'Hardware Security Module (HSM) backed key management, mTLS mutual authentication, and token vault encryption.',
    metrics: { latency: '< 1ms', throughput: '100k auths/sec', sla: '99.999%' },
    connectedTo: ['risk-perimeter', 'erp-bus', 'drift-monitor'],
    radius: 20,
  },
  {
    id: 'drift-monitor',
    name: 'Model Drift & Health Guard',
    layer: 'assurance',
    layerTitle: 'System Assurance',
    category: 'Observability & SLA',
    description: 'Real-time Kolmogorov-Smirnov statistical testing detecting data distribution shifts, concept drift, and SLA degradations.',
    metrics: { latency: 'Continuous', throughput: '100% Telemetry Stream', sla: '99.99%' },
    connectedTo: ['zero-trust', 'eval-harness', 'audit-ledger', 'llm-mesh'],
    radius: 19,
  },
  {
    id: 'eval-harness',
    name: 'Ground-Truth Eval Harness',
    layer: 'assurance',
    layerTitle: 'System Assurance',
    category: 'Continuous Evaluation',
    description: 'Automated synthetic and human ground-truth test suite continually rating model hallucination, accuracy, and latency.',
    metrics: { latency: 'Real-time Eval', throughput: '500 suites/hr', sla: '99.95%' },
    connectedTo: ['llm-mesh', 'rag-graph', 'lakehouse', 'drift-monitor'],
    radius: 19,
  },
  {
    id: 'audit-ledger',
    name: 'Immutable Audit Ledger',
    layer: 'assurance',
    layerTitle: 'System Assurance',
    category: 'Governance Log',
    description: 'Cryptographically signed trace records of every AI inference decision, confidence score, and executed human action.',
    metrics: { latency: '< 8ms write', throughput: '60k records/sec', sla: '99.999%' },
    connectedTo: ['deterministic-val', 'human-loop', 'erp-bus', 'drift-monitor', 'lakehouse'],
    radius: 18,
  },
];

const LINKS_DATA: TopologyLink[] = [
  { source: 'strat-core', target: 'risk-perimeter', type: 'control' },
  { source: 'strat-core', target: 'llm-mesh', type: 'inference' },
  { source: 'strat-core', target: 'schema-pipeline', type: 'data' },
  
  { source: 'risk-perimeter', target: 'llm-mesh', type: 'control' },
  { source: 'risk-perimeter', target: 'agent-coord', type: 'control' },
  { source: 'risk-perimeter', target: 'zero-trust', type: 'control' },
  
  { source: 'llm-mesh', target: 'agent-coord', type: 'inference' },
  { source: 'llm-mesh', target: 'rag-graph', type: 'data' },
  { source: 'llm-mesh', target: 'deterministic-val', type: 'inference' },
  { source: 'llm-mesh', target: 'eval-harness', type: 'audit' },
  
  { source: 'agent-coord', target: 'rag-graph', type: 'data' },
  { source: 'agent-coord', target: 'action-dispatch', type: 'control' },
  { source: 'agent-coord', target: 'human-loop', type: 'control' },
  
  { source: 'rag-graph', target: 'feature-store', type: 'data' },
  { source: 'rag-graph', target: 'eval-harness', type: 'audit' },
  
  { source: 'kafka-stream', target: 'schema-pipeline', type: 'data' },
  { source: 'kafka-stream', target: 'feature-store', type: 'data' },
  { source: 'kafka-stream', target: 'lakehouse', type: 'data' },
  
  { source: 'schema-pipeline', target: 'feature-store', type: 'data' },
  { source: 'schema-pipeline', target: 'rag-graph', type: 'data' },
  
  { source: 'deterministic-val', target: 'action-dispatch', type: 'control' },
  { source: 'deterministic-val', target: 'audit-ledger', type: 'audit' },
  
  { source: 'action-dispatch', target: 'erp-bus', type: 'control' },
  { source: 'action-dispatch', target: 'human-loop', type: 'control' },
  
  { source: 'human-loop', target: 'audit-ledger', type: 'audit' },
  
  { source: 'erp-bus', target: 'zero-trust', type: 'control' },
  { source: 'erp-bus', target: 'audit-ledger', type: 'audit' },
  
  { source: 'zero-trust', target: 'drift-monitor', type: 'control' },
  { source: 'drift-monitor', target: 'eval-harness', type: 'audit' },
  { source: 'drift-monitor', target: 'llm-mesh', type: 'control' },
  
  { source: 'eval-harness', target: 'lakehouse', type: 'data' },
  { source: 'lakehouse', target: 'audit-ledger', type: 'data' },
];

const LAYER_COLORS: Record<string, { stroke: string; fill: string; glow: string; text: string }> = {
  governance: {
    stroke: '#438CFF',
    fill: 'rgba(67, 140, 255, 0.18)',
    glow: '#438CFF',
    text: '#93C5FD',
  },
  intelligence: {
    stroke: '#5DD9E8',
    fill: 'rgba(93, 217, 232, 0.22)',
    glow: '#5DD9E8',
    text: '#5DD9E8',
  },
  data: {
    stroke: '#A78BFA',
    fill: 'rgba(167, 139, 250, 0.18)',
    glow: '#A78BFA',
    text: '#C4B5FD',
  },
  integration: {
    stroke: '#34D399',
    fill: 'rgba(52, 211, 153, 0.18)',
    glow: '#34D399',
    text: '#6EE7B7',
  },
  assurance: {
    stroke: '#F59E0B',
    fill: 'rgba(245, 158, 11, 0.18)',
    glow: '#F59E0B',
    text: '#FCD34D',
  },
};

export function EnterpriseTopologyGraph() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const [selectedNode, setSelectedNode] = useState<TopologyNode | null>(NODES_DATA[2]); // default to LLM Runtime
  const [activeLayerFilter, setActiveLayerFilter] = useState<string>('all');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [showDataPackets, setShowDataPackets] = useState<boolean>(true);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  const simulationRef = useRef<d3.Simulation<TopologyNode, TopologyLink> | null>(null);
  const zoomBehaviorRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);

  // Compute connected node ids for highlighting on hover
  const activeHighlightMap = useMemo(() => {
    const focusId = hoveredNodeId || selectedNode?.id;
    if (!focusId) return new Set<string>();

    const connected = new Set<string>([focusId]);
    LINKS_DATA.forEach((link) => {
      const s = typeof link.source === 'string' ? link.source : (link.source as TopologyNode).id;
      const t = typeof link.target === 'string' ? link.target : (link.target as TopologyNode).id;
      if (s === focusId) connected.add(t);
      if (t === focusId) connected.add(s);
    });
    return connected;
  }, [hoveredNodeId, selectedNode]);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth || 900;
    const height = Math.max(540, Math.min(680, window.innerHeight * 0.7));

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [0, 0, width, height]);

    svg.selectAll('*').remove();

    // Defs: Filters and Gradients
    const defs = svg.append('defs');

    // Glow Filter
    const filter = defs.append('filter')
      .attr('id', 'hud-node-glow')
      .attr('x', '-50%')
      .attr('y', '-50%')
      .attr('width', '200%')
      .attr('height', '200%');

    filter.append('feGaussianBlur')
      .attr('stdDeviation', 4)
      .attr('result', 'coloredBlur');

    const feMerge = filter.append('feMerge');
    feMerge.append('feMergeNode').attr('in', 'coloredBlur');
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

    // Deep Canvas Grid pattern
    const pattern = defs.append('pattern')
      .attr('id', 'hud-grid-pattern')
      .attr('width', 40)
      .attr('height', 40)
      .attr('patternUnits', 'userSpaceOnUse');

    pattern.append('path')
      .attr('d', 'M 40 0 L 0 0 0 40')
      .attr('fill', 'none')
      .attr('stroke', 'rgba(93, 217, 232, 0.05)')
      .attr('stroke-width', 0.8);

    pattern.append('circle')
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', 1)
      .attr('fill', 'rgba(93, 217, 232, 0.2)');

    // Root Group for Zoom
    const rootG = svg.append('g').attr('class', 'root-g');

    // Background Grid Rectangle inside rootG
    rootG.append('rect')
      .attr('x', -width * 2)
      .attr('y', -height * 2)
      .attr('width', width * 5)
      .attr('height', height * 5)
      .attr('fill', 'url(#hud-grid-pattern)');

    // Concentric Radar Rings in center
    const radarG = rootG.append('g').attr('class', 'radar-g').attr('opacity', 0.25);
    [120, 240, 360, 480].forEach((r) => {
      radarG.append('circle')
        .attr('cx', width / 2)
        .attr('cy', height / 2)
        .attr('r', r)
        .attr('fill', 'none')
        .attr('stroke', '#5DD9E8')
        .attr('stroke-width', 0.6)
        .attr('stroke-dasharray', '4 8');
    });

    // Crosshair axes
    radarG.append('line')
      .attr('x1', width / 2 - 500)
      .attr('y1', height / 2)
      .attr('x2', width / 2 + 500)
      .attr('y2', height / 2)
      .attr('stroke', '#5DD9E8')
      .attr('stroke-width', 0.5)
      .attr('stroke-dasharray', '2 12');

    radarG.append('line')
      .attr('x1', width / 2)
      .attr('y1', height / 2 - 500)
      .attr('x2', width / 2)
      .attr('y2', height / 2 + 500)
      .attr('stroke', '#5DD9E8')
      .attr('stroke-width', 0.5)
      .attr('stroke-dasharray', '2 12');

    // Deep clones of nodes & links to avoid mutation issues
    const nodes: TopologyNode[] = NODES_DATA.map((d) => ({ ...d }));
    const links: TopologyLink[] = LINKS_DATA.map((d) => ({ ...d }));

    // Force Simulation Setup
    const simulation = d3.forceSimulation<TopologyNode>(nodes)
      .force('link', d3.forceLink<TopologyNode, TopologyLink>(links).id((d) => d.id).distance(110))
      .force('charge', d3.forceManyBody().strength(-340))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collide', d3.forceCollide<TopologyNode>().radius((d) => (d.radius || 20) + 24).iterations(2))
      .alphaDecay(0.025);

    simulationRef.current = simulation;

    // Links Render Group
    const linksG = rootG.append('g').attr('class', 'links-g');

    const linkLines = linksG.selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke', (d) => {
        switch (d.type) {
          case 'inference': return 'rgba(93, 217, 232, 0.45)';
          case 'control': return 'rgba(67, 140, 255, 0.4)';
          case 'data': return 'rgba(167, 139, 250, 0.4)';
          case 'audit': return 'rgba(245, 158, 11, 0.35)';
          default: return 'rgba(255, 255, 255, 0.2)';
        }
      })
      .attr('stroke-width', (d) => (d.type === 'inference' ? 1.8 : 1.2))
      .attr('stroke-dasharray', (d) => (d.type === 'audit' ? '3 3' : 'none'));

    // Animated Data Packets (flowing particles along paths)
    const packetsG = rootG.append('g').attr('class', 'packets-g');
    const packetCircles = packetsG.selectAll('circle')
      .data(links.filter((_, i) => i % 2 === 0)) // alternate links for elegance
      .enter()
      .append('circle')
      .attr('r', 2)
      .attr('fill', '#5DD9E8')
      .attr('filter', 'url(#hud-node-glow)')
      .attr('opacity', 0.85);

    // Nodes Render Group
    const nodesG = rootG.append('g').attr('class', 'nodes-g');

    const nodeG = nodesG.selectAll('g')
      .data(nodes)
      .enter()
      .append('g')
      .attr('class', 'node-item')
      .style('cursor', 'grab')
      .on('click', (event, d) => {
        event.stopPropagation();
        setSelectedNode(d);
      })
      .on('mouseenter', (_, d) => {
        setHoveredNodeId(d.id);
      })
      .on('mouseleave', () => {
        setHoveredNodeId(null);
      });

    // 1. Outer Concentric Pulse Halo for primary nodes
    nodeG.filter((d) => (d.radius || 20) >= 22)
      .append('circle')
      .attr('r', (d) => (d.radius || 20) + 8)
      .attr('fill', 'none')
      .attr('stroke', (d) => LAYER_COLORS[d.layer]?.stroke || '#5DD9E8')
      .attr('stroke-width', 0.8)
      .attr('stroke-dasharray', '2 4')
      .attr('opacity', 0.45);

    // 2. Node Main Solid/Translucent Shell
    nodeG.append('circle')
      .attr('r', (d) => d.radius || 20)
      .attr('fill', (d) => LAYER_COLORS[d.layer]?.fill || 'rgba(93, 217, 232, 0.2)')
      .attr('stroke', (d) => LAYER_COLORS[d.layer]?.stroke || '#5DD9E8')
      .attr('stroke-width', 1.8)
      .attr('filter', 'url(#hud-node-glow)');

    // 3. Inner Tactical Crosshair / Core Pip
    nodeG.append('circle')
      .attr('r', 3)
      .attr('fill', '#FFFFFF')
      .attr('opacity', 0.9);

    // 4. Node Monospace Label
    nodeG.append('text')
      .text((d) => d.name)
      .attr('text-anchor', 'middle')
      .attr('dy', (d) => (d.radius || 20) + 16)
      .attr('fill', '#F2F7FB')
      .attr('font-size', '10px')
      .attr('font-family', 'JetBrains Mono, monospace')
      .attr('letter-spacing', '0.04em')
      .style('pointer-events', 'none')
      .style('text-shadow', '0 2px 4px rgba(0,0,0,0.9)');

    // Drag behavior
    const drag = d3.drag<SVGGElement, TopologyNode>()
      .on('start', (event, d) => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on('drag', (event, d) => {
        d.fx = event.x;
        d.fy = event.y;
      })
      .on('end', (event, d) => {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      });

    nodeG.call(drag);

    // Zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 2.5])
      .on('zoom', (event) => {
        rootG.attr('transform', event.transform);
      });

    zoomBehaviorRef.current = zoom;
    svg.call(zoom);

    // Reset zoom on double-click empty space
    svg.on('dblclick.zoom', () => {
      svg.transition().duration(600).call(zoom.transform, d3.zoomIdentity);
    });

    // Tick Animation Loop
    let packetT = 0;
    simulation.on('tick', () => {
      linkLines
        .attr('x1', (d) => (d.source as TopologyNode).x || 0)
        .attr('y1', (d) => (d.source as TopologyNode).y || 0)
        .attr('x2', (d) => (d.target as TopologyNode).x || 0)
        .attr('y2', (d) => (d.target as TopologyNode).y || 0);

      nodeG.attr('transform', (d) => `translate(${d.x || 0},${d.y || 0})`);

      // Animate Packet Pulses along paths
      packetT = (packetT + 0.006) % 1;
      packetCircles.each(function (d, i) {
        const source = d.source as TopologyNode;
        const target = d.target as TopologyNode;
        if (!source || !target || source.x == null || target.x == null) return;

        // Offset phase per packet
        const phase = (packetT + i * 0.18) % 1;
        const curX = source.x + (target.x - source.x) * phase;
        const curY = (source.y || 0) + ((target.y || 0) - (source.y || 0)) * phase;

        d3.select(this)
          .attr('cx', curX)
          .attr('cy', curY)
          .attr('opacity', Math.sin(phase * Math.PI) * 0.9);
      });
    });

    // Cleanup
    return () => {
      simulation.stop();
    };
  }, []);

  // Update Visual Dimming / Highlighting when hover or selection changes
  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);

    const hasFilter = activeLayerFilter !== 'all';

    svg.selectAll<SVGGElement, TopologyNode>('.node-item')
      .transition()
      .duration(200)
      .attr('opacity', (d) => {
        if (hasFilter && d.layer !== activeLayerFilter) return 0.2;
        if (activeHighlightMap.size > 0 && !activeHighlightMap.has(d.id)) return 0.25;
        return 1.0;
      });

    svg.selectAll<SVGLineElement, TopologyLink>('.links-g line')
      .transition()
      .duration(200)
      .attr('opacity', (d) => {
        const s = typeof d.source === 'string' ? d.source : (d.source as TopologyNode).id;
        const t = typeof d.target === 'string' ? d.target : (d.target as TopologyNode).id;
        if (activeHighlightMap.has(s) && activeHighlightMap.has(t)) return 1.0;
        return 0.15;
      });
  }, [activeHighlightMap, activeLayerFilter]);

  // Simulation Controls
  const togglePlay = () => {
    if (!simulationRef.current) return;
    if (isPlaying) {
      simulationRef.current.stop();
      setIsPlaying(false);
    } else {
      simulationRef.current.restart();
      setIsPlaying(true);
    }
  };

  const handleResetZoom = () => {
    if (!svgRef.current || !zoomBehaviorRef.current) return;
    d3.select(svgRef.current)
      .transition()
      .duration(750)
      .call(zoomBehaviorRef.current.transform, d3.zoomIdentity);
  };

  const handleReheat = () => {
    if (!simulationRef.current) return;
    simulationRef.current.alpha(0.8).restart();
    setIsPlaying(true);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-2xl bg-[#050A12] border border-[#5DD9E8]/30 shadow-[0_0_30px_rgba(93,217,232,0.12)] overflow-hidden"
    >
      {/* Top HUD Controls Strip */}
      <div className="px-6 py-4 border-b border-white/10 bg-[#091321]/80 backdrop-blur-md flex flex-wrap items-center justify-between gap-4 z-10 relative">
        {/* Layer Filters */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
          <span className="text-[#6F879B] mr-2 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#5DD9E8]" />
            LATTICE LAYER:
          </span>
          {[
            { id: 'all', label: 'All Subsystems' },
            { id: 'governance', label: 'Governance' },
            { id: 'intelligence', label: 'Intelligence' },
            { id: 'data', label: 'Data Fabric' },
            { id: 'integration', label: 'Integration' },
            { id: 'assurance', label: 'Assurance' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveLayerFilter(tab.id)}
              className={`px-3 py-1 rounded-[4px] border transition-colors ${
                activeLayerFilter === tab.id
                  ? 'border-[#5DD9E8] bg-[#5DD9E8]/15 text-[#5DD9E8] font-semibold'
                  : 'border-white/10 text-[#A6B6C6] hover:text-white hover:border-white/20'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Viewport Physics Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={togglePlay}
            title={isPlaying ? 'Pause simulation physics' : 'Resume simulation'}
            className="p-1.5 rounded-[4px] border border-white/10 bg-[#101D2C] text-[#A6B6C6] hover:text-[#5DD9E8] hover:border-cyan-500/40 transition-colors"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={handleReheat}
            title="Re-heat / re-balance lattice nodes"
            className="p-1.5 rounded-[4px] border border-white/10 bg-[#101D2C] text-[#A6B6C6] hover:text-[#5DD9E8] hover:border-cyan-500/40 transition-colors"
          >
            <Activity className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleResetZoom}
            title="Reset Zoom & Pan"
            className="p-1.5 rounded-[4px] border border-white/10 bg-[#101D2C] text-[#A6B6C6] hover:text-[#5DD9E8] hover:border-cyan-500/40 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main SVG Visualization Canvas */}
      <div className="relative w-full h-[580px] bg-[#050A12] select-none">
        <svg
          ref={svgRef}
          className="w-full h-full cursor-grab active:cursor-grabbing"
        />

        {/* Floating Telemetry Drawer for Selected Node */}
        {selectedNode && (
          <div className="absolute bottom-6 left-6 max-w-sm sm:max-w-md w-full bg-[#091321]/95 border border-[#5DD9E8]/40 rounded-xl p-5 shadow-[0_0_25px_rgba(93,217,232,0.2)] backdrop-blur-xl z-20 transition-all pointer-events-auto">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{
                    backgroundColor: LAYER_COLORS[selectedNode.layer]?.stroke || '#5DD9E8',
                    boxShadow: `0 0 8px ${LAYER_COLORS[selectedNode.layer]?.stroke || '#5DD9E8'}`,
                  }}
                />
                <span className="text-xs font-mono uppercase tracking-wider text-[#5DD9E8] font-semibold">
                  {selectedNode.layerTitle}
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#6F879B]">
                ID: {selectedNode.id}
              </span>
            </div>

            <div className="mt-3 space-y-3">
              <h4 className="text-lg font-bold text-white tracking-tight">
                {selectedNode.name}
              </h4>
              <p className="text-xs text-[#A6B6C6] leading-relaxed">
                {selectedNode.description}
              </p>

              {/* Real Operational Metrics */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10">
                <div className="p-2 bg-[#101D2C] rounded-[4px] border border-white/5">
                  <div className="text-[9px] font-mono text-[#6F879B] uppercase">SLA Target</div>
                  <div className="text-xs font-mono font-semibold text-white mt-0.5">
                    {selectedNode.metrics.sla}
                  </div>
                </div>
                <div className="p-2 bg-[#101D2C] rounded-[4px] border border-white/5">
                  <div className="text-[9px] font-mono text-[#6F879B] uppercase">Latency Budget</div>
                  <div className="text-xs font-mono font-semibold text-[#5DD9E8] mt-0.5">
                    {selectedNode.metrics.latency}
                  </div>
                </div>
                <div className="p-2 bg-[#101D2C] rounded-[4px] border border-white/5">
                  <div className="text-[9px] font-mono text-[#6F879B] uppercase">Throughput</div>
                  <div className="text-xs font-mono font-semibold text-[#F2F7FB] mt-0.5">
                    {selectedNode.metrics.throughput}
                  </div>
                </div>
              </div>

              {/* Connected Dependencies */}
              <div className="text-[11px] font-mono text-[#6F879B] pt-1 flex items-center gap-1.5">
                <span>Direct Topology Links:</span>
                <span className="text-white font-medium">
                  {selectedNode.connectedTo.length} interconnected nodes
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Right Legend */}
        <div className="hidden md:flex absolute bottom-6 right-6 p-3.5 rounded-lg bg-[#091321]/90 border border-white/10 text-xs font-mono text-[#A6B6C6] backdrop-blur-md flex-col gap-2 z-10">
          <div className="text-[10px] text-[#6F879B] uppercase tracking-wider pb-1 border-b border-white/10 font-bold">
            Architecture Tiers
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#438CFF]" />
            <span>Advisory & Governance</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#5DD9E8]" />
            <span>Core Intelligence Models</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#A78BFA]" />
            <span>Data Ingestion & Fabric</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#34D399]" />
            <span>Enterprise Integration</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
            <span>System Telemetry & Security</span>
          </div>
        </div>
      </div>
    </div>
  );
}
