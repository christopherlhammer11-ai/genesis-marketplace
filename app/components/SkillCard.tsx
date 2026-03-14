"use client";

interface Skill {
  id: string;
  name: string;
  description: string;
  version: string;
  creatorAgentId: string;
  pricing: {
    type: string;
    amount: number;
    currency: string;
  };
  packageUrl: string;
  performanceMetrics: {
    avgLatencyMs: number;
    successRate: number;
  };
}

export function SkillCard({ skill }: { skill: Skill }) {
  const isFree = skill.pricing.amount === 0;
  const shortCreator = `${skill.creatorAgentId.slice(0, 4)}...${skill.creatorAgentId.slice(-4)}`;

  return (
    <div
      className={`group relative p-6 rounded-xl border transition-all duration-300 hover:-translate-y-1 ${
        isFree
          ? "bg-gradient-to-br from-purple-500/5 to-blue-500/5 border-purple-500/30 hover:border-purple-500/60 hover:shadow-[0_0_30px_rgba(147,51,234,0.15)]"
          : "bg-zinc-900/50 border-zinc-800 hover:border-zinc-600 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]"
      }`}
    >
      {isFree && (
        <div className="absolute -top-2.5 left-4 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-white">
          Free
        </div>
      )}

      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-lg group-hover:text-white transition-colors">
            {skill.name}
          </h3>
          <span className="text-xs text-zinc-500 font-mono">v{skill.version}</span>
        </div>
        <div className={`text-right ${isFree ? "text-green-400" : "text-white"}`}>
          <div className="text-lg font-bold">
            {isFree ? "FREE" : `${skill.pricing.amount}`}
          </div>
          {!isFree && (
            <div className="text-[10px] text-zinc-500 uppercase tracking-wider">
              {skill.pricing.currency}/{skill.pricing.type}
            </div>
          )}
        </div>
      </div>

      <p className="text-sm text-zinc-400 mb-4 line-clamp-2">
        {skill.description}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div
              className={`w-1.5 h-1.5 rounded-full ${
                skill.performanceMetrics.successRate >= 0.99
                  ? "bg-green-400"
                  : skill.performanceMetrics.successRate >= 0.95
                  ? "bg-yellow-400"
                  : "bg-red-400"
              }`}
            />
            <span className="text-xs text-zinc-500">
              {(skill.performanceMetrics.successRate * 100).toFixed(1)}% success
            </span>
          </div>
          <span className="text-xs text-zinc-600">
            {skill.performanceMetrics.avgLatencyMs}ms avg
          </span>
        </div>
        <span className="text-[10px] text-zinc-600 font-mono">
          by {shortCreator}
        </span>
      </div>

      <a
        href={skill.packageUrl}
        target="_blank"
        className={`mt-4 block w-full text-center py-2 text-sm font-medium rounded-lg transition-colors ${
          isFree
            ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white"
            : "bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
        }`}
      >
        {isFree ? "Install Free" : `Get for ${skill.pricing.amount} FLUX`}
      </a>
    </div>
  );
}
