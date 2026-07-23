'use client';

import { useState } from 'react';
import TopToolbar from './components/TopToolbar';
import ToolboxSidebar from './components/ToolboxSidebar';
import WorkflowCanvas from './components/WorkflowCanvas';
import PropertiesPanel from './components/PropertiesPanel';
import ConsolePanel from './components/ConsolePanel';
import AIInsightsPanel from './components/AIInsightsPanel';
import ProcessingQueueModal from './components/ProcessingQueueModal';
import { WorkflowTemplate, WorkflowNode, ToolItem, ConsoleLog } from './types';
import { WORKFLOW_TEMPLATES, MOCK_CONSOLE_LOGS } from './mockData';

export default function AnalysisStudioPage() {
  const initialTemplate = WORKFLOW_TEMPLATES[0];

  const [workflowName, setWorkflowName] = useState(initialTemplate.name);
  const [activeTemplateId, setActiveTemplateId] = useState(initialTemplate.id);
  const [status, setStatus] = useState<'ready' | 'running' | 'failed'>('ready');
  const [nodes, setNodes] = useState<WorkflowNode[]>(initialTemplate.nodes);
  const [connections, setConnections] = useState(initialTemplate.connections);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(initialTemplate.nodes[0]?.id || null);
  const [logs, setLogs] = useState<ConsoleLog[]>(MOCK_CONSOLE_LOGS);
  const [showAiInsights, setShowAiInsights] = useState(false);
  const [showQueueModal, setShowQueueModal] = useState(false);

  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || null;

  // Handle template selection
  const handleSelectTemplate = (template: WorkflowTemplate) => {
    setActiveTemplateId(template.id);
    setWorkflowName(template.name);
    setNodes(template.nodes);
    setConnections(template.connections);
    setSelectedNodeId(template.nodes[0]?.id || null);
    setStatus('ready');
    
    // Add log entry
    const newLog: ConsoleLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
      type: 'info',
      message: `[ORCHESTRATOR] Loaded workflow template: "${template.name}" with ${template.nodes.length} nodes.`
    };
    setLogs((prev) => [newLog, ...prev]);
  };

  // Add tool from toolbox onto canvas
  const handleAddToolToCanvas = (tool: ToolItem) => {
    const lastNode = nodes[nodes.length - 1];
    const newX = lastNode ? lastNode.position.x + 290 : 50;
    const newY = 80;

    const newNodeId = `node-${Date.now()}`;
    const newNode: WorkflowNode = {
      id: newNodeId,
      toolId: tool.id,
      title: tool.name,
      category: tool.category,
      type: tool.category === 'raster' || tool.category === 'ai' || tool.category === 'vector' ? 'process' : 'process',
      icon: tool.icon,
      description: tool.description,
      status: 'idle',
      inputDataset: lastNode ? lastNode.outputDataset || 'Input_Layer.tif' : 'Sentinel2_L2A_Scene.tif',
      outputDataset: `${tool.name.replace(/\s+/g, '_')}_Output.tif`,
      params: { ...tool.defaultParams },
      estimatedRuntime: '~15s',
      computeCost: '0.4 Credits',
      validationStatus: 'valid',
      position: { x: newX, y: newY }
    };

    setNodes((prev) => [...prev, newNode]);
    setSelectedNodeId(newNodeId);

    // Auto-connect to last node if present
    if (lastNode) {
      setConnections((prev) => [
        ...prev,
        { id: `c-${Date.now()}`, fromNodeId: lastNode.id, toNodeId: newNodeId, active: true }
      ]);
    }

    const newLog: ConsoleLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
      type: 'info',
      message: `[CANVAS] Added tool node: "${tool.name}" to workspace.`
    };
    setLogs((prev) => [newLog, ...prev]);
  };

  // Node parameter updates
  const handleUpdateNode = (updatedNode: WorkflowNode) => {
    setNodes((prev) => prev.map((n) => (n.id === updatedNode.id ? updatedNode : n)));
    const newLog: ConsoleLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
      type: 'info',
      message: `[PARAMETERS] Updated configuration for node: "${updatedNode.title}".`
    };
    setLogs((prev) => [newLog, ...prev]);
  };

  // Node deletion
  const handleDeleteNode = (nodeId: string) => {
    setNodes((prev) => prev.filter((n) => n.id !== nodeId));
    setConnections((prev) => prev.filter((c) => c.fromNodeId !== nodeId && c.toNodeId !== nodeId));
    if (selectedNodeId === nodeId) {
      setSelectedNodeId(null);
    }
  };

  // Clear canvas
  const handleClearCanvas = () => {
    setNodes([]);
    setConnections([]);
    setSelectedNodeId(null);
    setStatus('ready');
  };

  // Execution triggers
  const handleRunAnalysis = () => {
    setStatus('running');

    // Add execution logs sequence
    const startLog: ConsoleLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
      type: 'info',
      message: `[ORCHESTRATOR] Starting spatial workflow execution: "${workflowName}" (${nodes.length} nodes)`
    };
    setLogs((prev) => [startLog, ...prev]);

    // Mark nodes running step by step
    setNodes((prev) => prev.map((n) => ({ ...n, status: 'running' })));

    setTimeout(() => {
      setNodes((prev) => prev.map((n) => ({ ...n, status: 'completed' })));
      setStatus('ready');

      const finishLog: ConsoleLog = {
        id: `log-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
        type: 'success',
        message: `[ORCHESTRATOR] Pipeline execution finished successfully in 24.8s. All output rasters generated.`
      };
      setLogs((prev) => [finishLog, ...prev]);
    }, 4000);
  };

  const handleStopAnalysis = () => {
    setStatus('ready');
    setNodes((prev) => prev.map((n) => ({ ...n, status: 'idle' })));
    const stopLog: ConsoleLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
      type: 'warning',
      message: `[ORCHESTRATOR] Workflow execution canceled by user.`
    };
    setLogs((prev) => [stopLog, ...prev]);
  };

  const handleExportWorkflow = () => {
    const jsonStr = JSON.stringify({ workflowName, nodes, connections }, null, 2);
    navigator.clipboard.writeText(jsonStr);
    alert('Workflow JSON copied to clipboard!');
  };

  const handleImportWorkflow = () => {
    alert('Import dialog ready: Workflow structure validated.');
  };

  const handleSaveWorkflow = () => {
    alert(`Workflow "${workflowName}" saved to GeoVision Node workspace!`);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] w-full bg-[var(--bg-app)] text-[var(--text-main)] overflow-hidden transition-colors duration-200">
      
      {/* Top Toolbar */}
      <TopToolbar
        workflowName={workflowName}
        setWorkflowName={setWorkflowName}
        status={status}
        activeTemplateId={activeTemplateId}
        onSelectTemplate={handleSelectTemplate}
        onRunAnalysis={handleRunAnalysis}
        onStopAnalysis={handleStopAnalysis}
        onNewWorkflow={handleClearCanvas}
        onExportWorkflow={handleExportWorkflow}
        onImportWorkflow={handleImportWorkflow}
        onSaveWorkflow={handleSaveWorkflow}
        showAiInsights={showAiInsights}
        setShowAiInsights={setShowAiInsights}
        onOpenQueue={() => setShowQueueModal(true)}
      />

      {/* Main Workspace Panels Area */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Left Sidebar Toolbox */}
        <ToolboxSidebar onAddToolToCanvas={handleAddToolToCanvas} />

        {/* Visual Workflow Canvas */}
        <WorkflowCanvas
          nodes={nodes}
          connections={connections}
          selectedNodeId={selectedNodeId}
          onSelectNode={setSelectedNodeId}
          onDeleteNode={handleDeleteNode}
          onClearCanvas={handleClearCanvas}
          isExecuting={status === 'running'}
        />

        {/* Right Properties Panel */}
        <PropertiesPanel
          selectedNode={selectedNode}
          onUpdateNode={handleUpdateNode}
        />

        {/* Collapsible AI Insights Panel Overlay/Side-drawer */}
        {showAiInsights && (
          <AIInsightsPanel onClose={() => setShowAiInsights(false)} />
        )}
      </div>

      {/* Bottom Console Panel */}
      <ConsolePanel
        logs={logs}
        isExecuting={status === 'running'}
        onClearLogs={() => setLogs([])}
      />

      {/* Processing Queue Modal */}
      {showQueueModal && (
        <ProcessingQueueModal onClose={() => setShowQueueModal(false)} />
      )}
    </div>
  );
}
