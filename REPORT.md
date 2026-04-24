# genesis-marketplace — Analysis Report

**Date:** 2026-04-22  
**Project:** Decentralized AI agent skill marketplace frontend  
**Stack:** Next.js 16, React 19, Tailwind CSS, TypeScript

---

## What This Project Is

A Next.js frontend for browsing and trading AI agent skills. Dark theme with glassmorphism design. Connects to the Genesis Node API backend. Skills are priced in FLUX tokens on Solana. Includes a fallback catalog of skills when the API is unreachable.

---

## TODOs / FIXMEs Found

None — no explicit TODO or FIXME markers in the codebase.

---

## Issues Identified

| # | Issue | File | Severity |
|---|-------|------|----------|
| 1 | Missing `rel="noopener noreferrer"` on external links | `app/page.tsx` | Medium (security) |
| 2 | Silent API failures in `getSkills()` with empty catch | `app/page.tsx` | Medium |
| 3 | No input validation in legacy SkillCard checkout flow | `components/SkillCard.js` | High |
| 4 | Legacy `components/SkillCard.js` duplicates `app/components/SkillCard.tsx` | root vs app | Low (dead code) |

---

## What Was Fixed

### Fix 1: Added `rel="noopener noreferrer"` to all external links
- **File:** `app/page.tsx` (10 instances)
- **Change:** Added `rel="noopener noreferrer"` to every `<a>` tag with `target="_blank"`
- **Impact:** Prevents potential window hijacking (reverse tabnabbing) attacks

### Fix 2: Enhanced error logging in `getSkills()`
- **File:** `app/page.tsx`
- **Change:** Added `console.error` in catch block and response format validation before returning data
- **Impact:** API failures are now logged for debugging instead of silently swallowed

### Fix 3: Added validation to legacy SkillCard checkout flow
- **File:** `components/SkillCard.js`
- **Change:** Added validation for `skill.priceId` before API call, HTTP status checking on response, and `checkoutUrl` validation before redirect. Added optional chaining for defensive property access.
- **Impact:** Prevents runtime crashes from malformed skill data or failed checkout API calls

---

## What Was NOT Fixed (and Why)

- **Dead code in `components/SkillCard.js`:** Appears to be a legacy version of `app/components/SkillCard.tsx`. Removing requires manual verification that nothing imports it — risk of breaking if something depends on it.
- **No automated tests:** Would require adding a test framework — out of scope.

---

## Suggested Next Steps

1. Remove `components/SkillCard.js` if confirmed unused (check all imports first)
2. Add error boundary components for graceful failure handling
3. Add loading skeleton states for better UX during API calls
4. Consider adding a `.env.example` documenting the API URL configuration
5. Add integration tests for the checkout flow
