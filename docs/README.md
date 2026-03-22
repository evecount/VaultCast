# VaultCast | Agent Orchestration Guide

Welcome to the **VaultCast** technical documentation. This project is designed as a premium, gated video subscription platform for high-end creators. 

## Project Architecture
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS + ShadCN UI (Dark Theme)
- **Icons**: Lucide React
- **Backend (Plan)**: Firebase (Firestore for metadata/users, Firebase Auth for gated access)
- **AI Engine**: Genkit 1.x (Google AI)
- **Charts**: Recharts (wrapped in ShadCN components)

## Core Capabilities for Agents
- **AI-Assisted Metadata**: Uses Genkit flows located in `src/ai/flows/` to generate SEO-friendly tags and captivating video descriptions.
- **Subscription Guarding**: A tiered system (Free, Basic, Premium) designed to be enforced via Firebase Security Rules and Client-side UI gates.
- **Creator Workflow**: A robust dashboard for managing analytics, uploads, and subscriber payouts.

## Directory Structure
- `src/app`: Next.js routes and layouts.
- `src/components/ui`: Reusable ShadCN components.
- `src/ai`: Genkit configuration and LLM flows.
- `src/firebase`: Firebase client initialization and custom hooks (to be fully implemented).
- `docs/`: Historical context and orchestration guides.

## Instructions for Agentic Sub-Agents
1. **Consistency**: Maintain the "Space Grotesk" headline font and "Inter" body font.
2. **AI-Hints**: When adding new images, always use `src/app/lib/placeholder-images.json` and include `data-ai-hint`.
3. **Genkit**: Use the global `ai` object from `@/ai/genkit`.
4. **Firebase**: Follow the "Client SDK only" rule. Use the established error-handling architecture for permission errors.
