import React, { useState } from 'react';
import { X, RefreshCw, Server, ShieldCheck, CheckCircle2, AlertTriangle, XCircle, Info, ExternalLink } from 'lucide-react';
import type { SystemHealthReport } from '../types.ts';

interface McpHealthDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  health: SystemHealthReport | null;
  isLoading: boolean;
  onRefresh: () => Promise<void>;
}

export const McpHealthDrawer: React.FC<McpHealthDrawerProps> = ({
  isOpen,
  onClose,
  health,
  isLoading,
  onRefresh
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  if (!isOpen) return null;

  const handleRefreshClick = async () => {
    setIsRefreshing(true);
    await onRefresh();
    setIsRefreshing(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'healthy':
        return (
          <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded text-xs font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Healthy & Online
          </span>
        );
      case 'accessible':
      case 'unauthorized':
        return (
          <span className="inline-flex items-center gap-1 text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded text-xs font-medium">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            Reachable (Active Fallback)
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-rose-800 bg-rose-50 px-2.5 py-0.5 rounded text-xs font-medium">
            <XCircle className="w-3.5 h-3.5 text-rose-600" />
            Offline / Unreachable
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-sm flex justify-end transition-opacity animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l hairline-border animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="frosted-glass-nav border-b hairline-border px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-[#1c1c1e]" />
            <h3 className="text-sm font-semibold text-[#1c1c1e]">
              MCP Health & Connection Monitor
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-neutral-400 hover:text-black hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Status Overview Card */}
          <div className="p-4 rounded-xl bg-neutral-50 border hairline-border">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-neutral-500 font-medium">System Telemetry</span>
              <button
                onClick={handleRefreshClick}
                disabled={isLoading || isRefreshing}
                className="flex items-center gap-1 text-xs text-neutral-700 hover:text-black font-medium transition-colors cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoading || isRefreshing ? 'animate-spin' : ''}`} />
                <span>Probe Now</span>
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-neutral-500">Overall Pipeline Status:</span>
                <span className="font-semibold text-neutral-900 capitalize">
                  {health?.overallStatus.replace('_', ' ') || 'Unknown'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-500">Last Verified:</span>
                <span className="font-mono text-neutral-700">
                  {health?.timestamp ? new Date(health.timestamp).toLocaleTimeString() : 'Pending'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-500">Active Curated Journeys:</span>
                <span className="font-mono text-neutral-700 font-semibold">
                  {health?.activeCurationsCount ?? 6} Packages Loaded
                </span>
              </div>
            </div>
          </div>

          {/* Endpoints List */}
          <div>
            <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">
              Monitored MCP Endpoints (/api/health)
            </h4>

            <div className="space-y-3">
              {health?.endpoints.map((ep) => (
                <div key={ep.name} className="p-3.5 rounded-xl border hairline-border bg-white shadow-xs">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h5 className="text-xs font-semibold text-[#1c1c1e]">{ep.name}</h5>
                      <a
                        href={ep.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] text-neutral-400 hover:text-neutral-700 flex items-center gap-1 mt-0.5 truncate max-w-[220px]"
                      >
                        <span className="truncate">{ep.url}</span>
                        <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                      </a>
                    </div>
                    {getStatusBadge(ep.status)}
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] py-2 border-t hairline-border mb-2 text-neutral-600">
                    <div>
                      <span className="text-neutral-400 block">Response Latency:</span>
                      <span className="font-mono font-medium">{ep.latencyMs} ms</span>
                    </div>
                    <div>
                      <span className="text-neutral-400 block">HTTP Code:</span>
                      <span className="font-mono font-medium">{ep.httpStatus ?? 'ERR'}</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-neutral-500 leading-relaxed bg-neutral-50 p-2 rounded-md">
                    {ep.notes}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Architecture & Guardrails Assurance */}
          <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200/80 text-xs text-blue-950 space-y-2">
            <div className="flex items-center gap-2 font-semibold text-blue-900">
              <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0" />
              <span>Architectural Security Guarantee</span>
            </div>
            <p className="text-[11px] leading-relaxed text-blue-900/90">
              In accordance with strict environment guardrails:
            </p>
            <ul className="text-[11px] space-y-1 list-disc list-inside text-blue-800/90 pl-1">
              <li>All MCP protocol queries execute inside <code className="font-mono bg-blue-100/80 px-1 py-0.5 rounded">api/</code> server handlers.</li>
              <li>No browser client code ever talks to MCP endpoints directly.</li>
              <li>Health is proactively evaluated via <code className="font-mono bg-blue-100/80 px-1 py-0.5 rounded">api/health</code>.</li>
              <li>Authentication credentials are never printed, logged, or exposed.</li>
            </ul>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t hairline-border frosted-glass text-center">
          <button
            onClick={onClose}
            className="w-full py-2 text-xs font-semibold text-neutral-700 hover:text-black bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer"
          >
            Close Telemetry View
          </button>
        </div>
      </div>
    </div>
  );
};
