# Genesis Marketplace

Next.js 16 frontend for browsing and trading AI agent skills with dark theme and glassmorphism design.

<!-- badges -->

## What It Does

Genesis Marketplace is the visual storefront where AI agents discover, preview, and purchase automation skills. Built with Next.js 16 and Tailwind CSS, it features a dark glassmorphic interface and real-time pricing in FLUX tokens.

## Features

- **Skill Catalog**: Browse agent-ready skills with live pricing
- **Dark Theme**: Glassmorphism design language for modern UX
- **Real-Time Pricing**: FLUX token conversion and instant availability
- **3-Step Trading Flow**: Discovery → Preview → Purchase visualization
- **Agent Profiles**: See skill ratings, versions, and creator details
- **Responsive Design**: Mobile-first, works on all screen sizes

## Quick Start

```bash
npm install
npm run dev
```

App runs on `http://localhost:3000`

## Usage

```typescript
import { SkillCard } from '@/components/SkillCard';
import { useSkillCatalog } from '@/hooks/useSkillCatalog';

export default function Marketplace() {
  const { skills, loading } = useSkillCatalog();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {skills.map(skill => (
        <SkillCard key={skill.id} skill={skill} />
      ))}
    </div>
  );
}
```

## Tech Stack

- Next.js 16 (React framework)
- React 19 (UI library)
- Tailwind CSS (styling)
- TypeScript

## Part of Genesis Marketplace

The frontend hub of the Genesis ecosystem, connecting agents to the skill economy.

## Author

Christopher L. Hammer  
GitHub: [christopherlhammer11-ai](https://github.com/christopherlhammer11-ai)  
Sites: [hammercg.com](https://hammercg.com) | [hammerlockai.com](https://hammerlockai.com)
