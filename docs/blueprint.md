# **App Name**: VaultCast

## Core Features:

- Creator Dashboard: An authenticated portal where creators can upload video files, manage their metadata (title, description), and assign them to specific access tiers.
- Video & Tier Management: Store and manage video metadata (titles, descriptions, playback URLs) and link them to various subscription tiers within the multi-tenant Firestore structure.
- Public Video Library: A public-facing page where users can browse the video catalog, viewing titles and descriptions, but with playback locked behind a subscription paywall.
- AI-Powered Content Tagging Tool: An AI tool that suggests relevant tags for uploaded videos based on titles and descriptions, improving discoverability for subscribers.
- Subscription Gateway Integration: Allow users to subscribe to different content tiers via an integrated payment gateway (e.g., Stripe) directly on the public page.
- Subscriber & Access Tiering: Manage subscriber information, linking user UIDs to their active access tier within the creator's subcollection in Firestore.
- Secure Gated Playback: Backend validation (via Python Flask) to verify user subscription status and tier level before securely serving video content for playback on the Next.js frontend.

## Style Guidelines:

- Primary color: A deep indigo-violet (#6852E0) symbolizing premium access and digital sophistication, creating a vibrant focal point.
- Background color: A very dark, slightly purplish charcoal (#1B1A23), providing a high-contrast, immersive, and premium visual foundation.
- Accent color: A bright, clear sky-blue (#759FF0) to draw attention to interactive elements, calls to action, and indicate successful operations.
- Headline font: 'Space Grotesk' (sans-serif) for a modern, slightly tech-inspired, and strong visual presence. Body font: 'Inter' (sans-serif) for exceptional readability and a neutral, professional tone in longer text passages.
- Use sleek, minimalist, and clear vector icons for navigation, video controls, and status indicators (e.g., locked content, uploaded), maintaining a professional and high-end feel.
- Implement a clean, modular grid system for video display, ensuring optimal use of screen space and clear content hierarchy. Utilize generous spacing around elements to convey a premium and uncluttered aesthetic. Ensure responsiveness across all devices.
- Subtle and smooth transitions for video loading states, subscription modals, and interactive dashboard elements (like tier selection or drag-and-drop uploads). Implement elegant hover effects on video cards to provide visual feedback without distraction.