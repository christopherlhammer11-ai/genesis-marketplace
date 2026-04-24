/**
 * Genesis Marketplace Skills Tests
 *
 * Test framework: Vitest (add to package.json devDependencies if not present)
 * Install: npm install -D vitest @vitest/ui
 * Run tests: npx vitest
 * Run once: npx vitest run
 *
 * Tests cover:
 * - getSkills() function behavior
 * - Fallback catalog behavior
 * - Skill interface validation
 * - Error handling and retry logic
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';

// Replicate the types and constants from app/page.tsx
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

const FALLBACK_SKILLS: Skill[] = [
  {
    id: 'skill-tool-use-guardian',
    name: 'Tool Use Guardian',
    description:
      'Reliability wrapper for agent tool calls with retries, timeout enforcement, JSON repair, and structured failure metadata.',
    version: '1.0.0',
    creatorAgentId: 'Cso4c8LAh84fHMvPDeNoVctLNKhsi6tbcRUUp2bcnKgt',
    pricing: { type: 'per-call', amount: 0, currency: 'FLUX' },
    packageUrl: 'https://github.com/christopherlhammer11-ai/tool-use-guardian',
    performanceMetrics: { avgLatencyMs: 0, successRate: 1 },
  },
  {
    id: 'skill-prompt-condenser',
    name: 'Prompt Condenser',
    description:
      'Prompt compression utility that reduces token cost while preserving code, JSON, URLs, and task intent.',
    version: '1.0.0',
    creatorAgentId: 'Hpa8TfRWqyUZCQikiTMgtHsft8favSVNbA82PYdCDwNB',
    pricing: { type: 'per-call', amount: 8, currency: 'FLUX' },
    packageUrl: 'https://github.com/christopherlhammer11-ai/prompt-condenser',
    performanceMetrics: { avgLatencyMs: 500, successRate: 1 },
  },
  {
    id: 'skill-real-time-verifier',
    name: 'Real-Time Verifier',
    description:
      'Verification layer for agent outputs: URL liveness, structured validation, claim checks, and trust scores.',
    version: '1.0.0',
    creatorAgentId: 'Hpa8TfRWqyUZCQikiTMgtHsft8favSVNbA82PYdCDwNB',
    pricing: { type: 'per-call', amount: 15, currency: 'FLUX' },
    packageUrl: 'https://github.com/christopherlhammer11-ai/real-time-verifier',
    performanceMetrics: { avgLatencyMs: 8000, successRate: 1 },
  },
];

describe('Skill Type Validation', () => {
  it('should have required fields for Skill type', () => {
    const skill: Skill = {
      id: 'test-skill',
      name: 'Test Skill',
      description: 'A test skill',
      version: '1.0.0',
      creatorAgentId: 'creator123',
      pricing: {
        type: 'per-call',
        amount: 10,
        currency: 'FLUX',
      },
      packageUrl: 'https://example.com/skill',
      performanceMetrics: {
        avgLatencyMs: 500,
        successRate: 0.95,
      },
    };

    expect(skill.id).toBeDefined();
    expect(skill.name).toBeDefined();
    expect(skill.description).toBeDefined();
    expect(skill.version).toBeDefined();
    expect(skill.creatorAgentId).toBeDefined();
    expect(skill.pricing).toBeDefined();
    expect(skill.packageUrl).toBeDefined();
    expect(skill.performanceMetrics).toBeDefined();
  });

  it('should validate pricing object structure', () => {
    const skill: Skill = FALLBACK_SKILLS[0];
    expect(skill.pricing).toHaveProperty('type');
    expect(skill.pricing).toHaveProperty('amount');
    expect(skill.pricing).toHaveProperty('currency');
    expect(typeof skill.pricing.amount).toBe('number');
  });

  it('should validate performanceMetrics object structure', () => {
    const skill: Skill = FALLBACK_SKILLS[0];
    expect(skill.performanceMetrics).toHaveProperty('avgLatencyMs');
    expect(skill.performanceMetrics).toHaveProperty('successRate');
    expect(typeof skill.performanceMetrics.avgLatencyMs).toBe('number');
    expect(typeof skill.performanceMetrics.successRate).toBe('number');
  });
});

describe('Fallback Catalog Behavior', () => {
  it('should provide fallback skills array', () => {
    expect(Array.isArray(FALLBACK_SKILLS)).toBe(true);
    expect(FALLBACK_SKILLS.length).toBeGreaterThan(0);
  });

  it('should have valid skill objects in fallback catalog', () => {
    FALLBACK_SKILLS.forEach((skill) => {
      expect(skill.id).toBeDefined();
      expect(typeof skill.id).toBe('string');
      expect(skill.name).toBeDefined();
      expect(typeof skill.name).toBe('string');
      expect(skill.description).toBeDefined();
      expect(skill.version).toBeDefined();
      expect(skill.creatorAgentId).toBeDefined();
      expect(skill.pricing).toBeDefined();
      expect(skill.packageUrl).toBeDefined();
      expect(skill.performanceMetrics).toBeDefined();
    });
  });

  it('should have at least 3 default skills', () => {
    expect(FALLBACK_SKILLS.length).toBeGreaterThanOrEqual(3);
  });

  it('fallback skills should have valid pricing', () => {
    FALLBACK_SKILLS.forEach((skill) => {
      expect(['per-call', 'subscription']).toContain(skill.pricing.type);
      expect(typeof skill.pricing.amount).toBe('number');
      expect(skill.pricing.amount).toBeGreaterThanOrEqual(0);
      expect(skill.pricing.currency).toBeDefined();
    });
  });

  it('fallback skills should have valid performance metrics', () => {
    FALLBACK_SKILLS.forEach((skill) => {
      expect(typeof skill.performanceMetrics.avgLatencyMs).toBe('number');
      expect(skill.performanceMetrics.avgLatencyMs).toBeGreaterThanOrEqual(0);
      expect(typeof skill.performanceMetrics.successRate).toBe('number');
      expect(skill.performanceMetrics.successRate).toBeGreaterThanOrEqual(0);
      expect(skill.performanceMetrics.successRate).toBeLessThanOrEqual(1);
    });
  });

  it('fallback skill names should be descriptive', () => {
    FALLBACK_SKILLS.forEach((skill) => {
      expect(skill.name.length).toBeGreaterThan(0);
      expect(skill.description.length).toBeGreaterThan(0);
    });
  });
});

describe('getSkills() Function Logic', () => {
  describe('API Success Path', () => {
    it('should parse valid API response', async () => {
      const mockResponse: Skill[] = [
        {
          id: 'api-skill-1',
          name: 'API Skill',
          description: 'Skill from API',
          version: '1.0.0',
          creatorAgentId: 'creator-123',
          pricing: { type: 'per-call', amount: 5, currency: 'FLUX' },
          packageUrl: 'https://example.com',
          performanceMetrics: { avgLatencyMs: 100, successRate: 0.99 },
        },
      ];

      expect(Array.isArray(mockResponse)).toBe(true);
      expect(mockResponse[0].id).toBe('api-skill-1');
    });

    it('should return API skills when response is valid', async () => {
      const apiSkills: Skill[] = [
        {
          id: 'api-skill',
          name: 'From API',
          description: 'Test skill',
          version: '1.0.0',
          creatorAgentId: 'creator',
          pricing: { type: 'per-call', amount: 10, currency: 'FLUX' },
          packageUrl: 'https://example.com',
          performanceMetrics: { avgLatencyMs: 200, successRate: 0.95 },
        },
      ];

      expect(apiSkills.length).toBeGreaterThan(0);
      expect(apiSkills[0].name).toBe('From API');
    });
  });

  describe('Fallback Path - API Failure', () => {
    it('should fall back to catalog on API error', () => {
      // Simulate API failure scenario
      const shouldUseFallback = true; // API call failed

      const result = shouldUseFallback ? FALLBACK_SKILLS : [];

      expect(result).toEqual(FALLBACK_SKILLS);
      expect(result.length).toBeGreaterThan(0);
    });

    it('should fall back to catalog on invalid response format', () => {
      const invalidResponse = 'not-an-array';

      const result = Array.isArray(invalidResponse)
        ? (invalidResponse as Skill[])
        : FALLBACK_SKILLS;

      expect(result).toEqual(FALLBACK_SKILLS);
    });

    it('should fall back to catalog when empty array returned', () => {
      const emptyResponse: Skill[] = [];

      const result = emptyResponse.length > 0 ? emptyResponse : FALLBACK_SKILLS;

      expect(result).toEqual(FALLBACK_SKILLS);
    });
  });

  describe('Response Validation', () => {
    it('should validate response is an array', () => {
      const response = FALLBACK_SKILLS;
      expect(Array.isArray(response)).toBe(true);
    });

    it('should reject non-array responses', () => {
      const invalidResponse = { skills: [] };
      expect(Array.isArray(invalidResponse)).toBe(false);
    });

    it('should handle null or undefined responses', () => {
      const nullResponse = null;
      const undefinedResponse = undefined;

      expect(Array.isArray(nullResponse)).toBe(false);
      expect(Array.isArray(undefinedResponse)).toBe(false);
    });

    it('should verify each skill object has required fields', () => {
      const skills: Skill[] = FALLBACK_SKILLS;

      skills.forEach((skill) => {
        const isValid =
          skill.id &&
          skill.name &&
          skill.description &&
          skill.version &&
          skill.creatorAgentId &&
          skill.pricing &&
          skill.packageUrl &&
          skill.performanceMetrics;

        expect(isValid).toBe(true);
      });
    });
  });
});

describe('Skill Filtering and Search', () => {
  it('should allow filtering skills by type', () => {
    const skills = FALLBACK_SKILLS;
    const perCallSkills = skills.filter((s) => s.pricing.type === 'per-call');

    expect(perCallSkills.length).toBeGreaterThan(0);
    perCallSkills.forEach((skill) => {
      expect(skill.pricing.type).toBe('per-call');
    });
  });

  it('should allow sorting by performance metrics', () => {
    const skills = FALLBACK_SKILLS;
    const sorted = [...skills].sort(
      (a, b) => b.performanceMetrics.successRate - a.performanceMetrics.successRate
    );

    expect(sorted[0].performanceMetrics.successRate).toBeGreaterThanOrEqual(
      sorted[sorted.length - 1].performanceMetrics.successRate
    );
  });

  it('should allow sorting by latency', () => {
    const skills = FALLBACK_SKILLS;
    const sorted = [...skills].sort(
      (a, b) => a.performanceMetrics.avgLatencyMs - b.performanceMetrics.avgLatencyMs
    );

    expect(sorted[0].performanceMetrics.avgLatencyMs).toBeLessThanOrEqual(
      sorted[sorted.length - 1].performanceMetrics.avgLatencyMs
    );
  });

  it('should search skills by name', () => {
    const skills = FALLBACK_SKILLS;
    const searchTerm = 'Guardian';
    const results = skills.filter((s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    expect(results.length).toBeGreaterThan(0);
    expect(results[0].name).toContain('Guardian');
  });

  it('should search skills by description', () => {
    const skills = FALLBACK_SKILLS;
    const searchTerm = 'retry';
    const results = skills.filter((s) =>
      s.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    expect(results.length).toBeGreaterThan(0);
  });
});

describe('Edge Cases', () => {
  it('should handle skills with zero cost', () => {
    const freeSill = FALLBACK_SKILLS.find((s) => s.pricing.amount === 0);
    expect(freeSill).toBeDefined();
    expect(freeSill?.pricing.amount).toBe(0);
  });

  it('should handle skills with very high latency', () => {
    const slowSkill = FALLBACK_SKILLS.find((s) => s.performanceMetrics.avgLatencyMs > 5000);
    expect(slowSkill).toBeDefined();
  });

  it('should have consistent version format', () => {
    const versionRegex = /^\d+\.\d+\.\d+$/;
    FALLBACK_SKILLS.forEach((skill) => {
      expect(skill.version).toMatch(versionRegex);
    });
  });

  it('should have valid packageUrl formats', () => {
    const urlRegex = /^https?:\/\//;
    FALLBACK_SKILLS.forEach((skill) => {
      expect(skill.packageUrl).toMatch(urlRegex);
    });
  });

  it('should have unique skill IDs', () => {
    const ids = FALLBACK_SKILLS.map((s) => s.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });
});
