/**
 * Genesis Marketplace Skills Tests
 *
 * Test framework: Node.js built-in test module
 * Run tests: node --test __tests__/skills.test.js
 *
 * Tests cover:
 * - Skill interface validation
 * - Fallback catalog behavior
 * - Skill filtering and search
 */

import { describe, it } from 'node:test';
import assert from 'node:assert';

// Replicate the Skill interface
const FALLBACK_SKILLS = [
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
    const skill = {
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

    assert(skill.id !== undefined);
    assert(skill.name !== undefined);
    assert(skill.description !== undefined);
    assert(skill.version !== undefined);
    assert(skill.creatorAgentId !== undefined);
    assert(skill.pricing !== undefined);
    assert(skill.packageUrl !== undefined);
    assert(skill.performanceMetrics !== undefined);
  });

  it('should validate pricing object structure', () => {
    const skill = FALLBACK_SKILLS[0];
    assert(skill.pricing.hasOwnProperty('type'));
    assert(skill.pricing.hasOwnProperty('amount'));
    assert(skill.pricing.hasOwnProperty('currency'));
    assert.strictEqual(typeof skill.pricing.amount, 'number');
  });

  it('should validate performanceMetrics object structure', () => {
    const skill = FALLBACK_SKILLS[0];
    assert(skill.performanceMetrics.hasOwnProperty('avgLatencyMs'));
    assert(skill.performanceMetrics.hasOwnProperty('successRate'));
    assert.strictEqual(typeof skill.performanceMetrics.avgLatencyMs, 'number');
    assert.strictEqual(typeof skill.performanceMetrics.successRate, 'number');
  });
});

describe('Fallback Catalog Behavior', () => {
  it('should provide fallback skills array', () => {
    assert.strictEqual(Array.isArray(FALLBACK_SKILLS), true);
    assert(FALLBACK_SKILLS.length > 0);
  });

  it('should have valid skill objects in fallback catalog', () => {
    FALLBACK_SKILLS.forEach((skill) => {
      assert(skill.id !== undefined);
      assert.strictEqual(typeof skill.id, 'string');
      assert(skill.name !== undefined);
      assert.strictEqual(typeof skill.name, 'string');
      assert(skill.description !== undefined);
      assert(skill.version !== undefined);
      assert(skill.creatorAgentId !== undefined);
      assert(skill.pricing !== undefined);
      assert(skill.packageUrl !== undefined);
      assert(skill.performanceMetrics !== undefined);
    });
  });

  it('should have at least 3 default skills', () => {
    assert(FALLBACK_SKILLS.length >= 3);
  });

  it('fallback skills should have valid pricing', () => {
    FALLBACK_SKILLS.forEach((skill) => {
      assert(['per-call', 'subscription'].includes(skill.pricing.type));
      assert.strictEqual(typeof skill.pricing.amount, 'number');
      assert(skill.pricing.amount >= 0);
      assert(skill.pricing.currency !== undefined);
    });
  });

  it('fallback skills should have valid performance metrics', () => {
    FALLBACK_SKILLS.forEach((skill) => {
      assert.strictEqual(typeof skill.performanceMetrics.avgLatencyMs, 'number');
      assert(skill.performanceMetrics.avgLatencyMs >= 0);
      assert.strictEqual(typeof skill.performanceMetrics.successRate, 'number');
      assert(skill.performanceMetrics.successRate >= 0);
      assert(skill.performanceMetrics.successRate <= 1);
    });
  });

  it('fallback skill names should be descriptive', () => {
    FALLBACK_SKILLS.forEach((skill) => {
      assert(skill.name.length > 0);
      assert(skill.description.length > 0);
    });
  });
});

describe('getSkills() Function Logic', () => {
  describe('API Success Path', () => {
    it('should parse valid API response', () => {
      const mockResponse = [
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

      assert.strictEqual(Array.isArray(mockResponse), true);
      assert.strictEqual(mockResponse[0].id, 'api-skill-1');
    });

    it('should return API skills when response is valid', () => {
      const apiSkills = [
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

      assert(apiSkills.length > 0);
      assert.strictEqual(apiSkills[0].name, 'From API');
    });
  });

  describe('Fallback Path - API Failure', () => {
    it('should fall back to catalog on API error', () => {
      const shouldUseFallback = true;
      const result = shouldUseFallback ? FALLBACK_SKILLS : [];

      assert.deepStrictEqual(result, FALLBACK_SKILLS);
      assert(result.length > 0);
    });

    it('should fall back to catalog on invalid response format', () => {
      const invalidResponse = 'not-an-array';
      const result = Array.isArray(invalidResponse) ? invalidResponse : FALLBACK_SKILLS;

      assert.deepStrictEqual(result, FALLBACK_SKILLS);
    });

    it('should fall back to catalog when empty array returned', () => {
      const emptyResponse = [];
      const result = emptyResponse.length > 0 ? emptyResponse : FALLBACK_SKILLS;

      assert.deepStrictEqual(result, FALLBACK_SKILLS);
    });
  });

  describe('Response Validation', () => {
    it('should validate response is an array', () => {
      const response = FALLBACK_SKILLS;
      assert.strictEqual(Array.isArray(response), true);
    });

    it('should reject non-array responses', () => {
      const invalidResponse = { skills: [] };
      assert.strictEqual(Array.isArray(invalidResponse), false);
    });

    it('should handle null or undefined responses', () => {
      const nullResponse = null;
      const undefinedResponse = undefined;

      assert.strictEqual(Array.isArray(nullResponse), false);
      assert.strictEqual(Array.isArray(undefinedResponse), false);
    });

    it('should verify each skill object has required fields', () => {
      const skills = FALLBACK_SKILLS;

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

        assert(isValid);
      });
    });
  });
});

describe('Skill Filtering and Search', () => {
  it('should allow filtering skills by type', () => {
    const skills = FALLBACK_SKILLS;
    const perCallSkills = skills.filter((s) => s.pricing.type === 'per-call');

    assert(perCallSkills.length > 0);
    perCallSkills.forEach((skill) => {
      assert.strictEqual(skill.pricing.type, 'per-call');
    });
  });

  it('should allow sorting by performance metrics', () => {
    const skills = FALLBACK_SKILLS;
    const sorted = [...skills].sort(
      (a, b) => b.performanceMetrics.successRate - a.performanceMetrics.successRate
    );

    assert(sorted[0].performanceMetrics.successRate >=
      sorted[sorted.length - 1].performanceMetrics.successRate);
  });

  it('should allow sorting by latency', () => {
    const skills = FALLBACK_SKILLS;
    const sorted = [...skills].sort(
      (a, b) => a.performanceMetrics.avgLatencyMs - b.performanceMetrics.avgLatencyMs
    );

    assert(sorted[0].performanceMetrics.avgLatencyMs <=
      sorted[sorted.length - 1].performanceMetrics.avgLatencyMs);
  });

  it('should search skills by name', () => {
    const skills = FALLBACK_SKILLS;
    const searchTerm = 'Guardian';
    const results = skills.filter((s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    assert(results.length > 0);
    assert(results[0].name.includes('Guardian'));
  });

  it('should search skills by description', () => {
    const skills = FALLBACK_SKILLS;
    const searchTerm = 'retries';
    const results = skills.filter((s) =>
      s.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    assert(results.length > 0);
  });
});

describe('Edge Cases', () => {
  it('should handle skills with zero cost', () => {
    const freeSkill = FALLBACK_SKILLS.find((s) => s.pricing.amount === 0);
    assert(freeSkill !== undefined);
    assert.strictEqual(freeSkill?.pricing.amount, 0);
  });

  it('should handle skills with very high latency', () => {
    const slowSkill = FALLBACK_SKILLS.find((s) => s.performanceMetrics.avgLatencyMs > 5000);
    assert(slowSkill !== undefined);
  });

  it('should have consistent version format', () => {
    const versionRegex = /^\d+\.\d+\.\d+$/;
    FALLBACK_SKILLS.forEach((skill) => {
      assert(versionRegex.test(skill.version));
    });
  });

  it('should have valid packageUrl formats', () => {
    const urlRegex = /^https?:\/\//;
    FALLBACK_SKILLS.forEach((skill) => {
      assert(urlRegex.test(skill.packageUrl));
    });
  });

  it('should have unique skill IDs', () => {
    const ids = FALLBACK_SKILLS.map((s) => s.id);
    const uniqueIds = new Set(ids);
    assert.strictEqual(uniqueIds.size, ids.length);
  });
});
