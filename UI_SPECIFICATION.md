# UI Specification: User Information Intake System

## 1. Executive Summary & Objective
This specification defines a modern, simple, accessible, and high-fidelity User Interface designed specifically to collect structured information from users (participants, investigators, students, or team members). The interface eliminates friction, provides instant validation feedback, and allows users to submit their data smoothly with clear guidance.

---

## 2. Information Architecture & Field Taxonomy

The information gathering flow is divided into 4 logical tiers with progressive disclosure:

### Tier 1: Personal Identification & Contact
| Field Name | Type | Validation Rules | Purpose |
| :--- | :--- | :--- | :--- |
| **Full Name** | `text` | Required, 2–80 chars, alphabetic & spaces | Legal/display identity |
| **Email Address** | `email` | Required, RFC 5322 regex match | Primary communication & verification |
| **Phone Number** | `tel` | Optional, standard international format | Urgent SMS or direct callback |
| **Preferred Pronouns / Honorific** | `select` | Optional, standard list | Respectful correspondence |

### Tier 2: Role & Institutional Affiliation
| Field Name | Type | Options / Rules | Purpose |
| :--- | :--- | :--- | :--- |
| **Primary Role** | `segmented-choice` | Student · Forensic Analyst · Cyber Researcher · Software Engineer · Mentor · Other | Role-based routing & permissions |
| **Organization / Institution** | `text` | Required, 2–120 chars | Affiliated university, agency, or firm |
| **Department / Major** | `text` | Optional, 2–80 chars | Domain specialization context |
| **Experience Level** | `radio` | Novice (<1 yr) · Intermediate (1–3 yrs) · Advanced (3+ yrs) | Skill grouping & tailored task allocation |

### Tier 3: Request, Track & Problem Scope
| Field Name | Type | Options / Rules | Purpose |
| :--- | :--- | :--- | :--- |
| **Inquiry / Track Category** | `select` | Digital Forensics · Network Defense · AI Crime Detection · Financial Fraud · OSINT · General Submission | Thematic categorization |
| **Submission Title** | `text` | Required, 5–100 chars | Scannable reference headline |
| **Detailed Description** | `textarea` | Required, 20–1000 chars, character counter | Core context, hypothesis, or question |
| **Urgency / Priority** | `button-group` | Low · Standard · High · Critical | Triage priority |
| **Preferred Collaboration Mode**| `checkbox-group` | Async Email · Discord/Slack · Live Video Session · In-Person Review | Contact preference |

### Tier 4: Supporting Artifacts & Consent
| Field Name | Type | Rules | Purpose |
| :--- | :--- | :--- | :--- |
| **Supporting Files / Logs** | `file-drop` | Optional, accepted: `.pdf, .json, .txt, .pcap, .png, .jpg`, max 10MB | Attach logs, resumes, or case files |
| **External Repository / URL** | `url` | Optional, valid HTTP(S) URL | Link to GitHub, Google Drive, or portfolio |
| **Data Privacy & Terms** | `checkbox` | Mandatory `true` | GDPR/compliance acknowledgement |

---

## 3. Interaction Design & Layout Modes

### 3.1 Dual-View Experience
To serve different user preferences, the UI provides a seamless toggle:
1. **Guided Wizard Mode (Step-by-Step)**:
   - Displays 1 tier at a time with a linear progress bar (Step 1 of 4).
   - Minimizes cognitive load; ideal for first-time or mobile users.
   - Next / Back navigation with step completion checks.
2. **Compact All-in-One Mode (Single-Page Form)**:
   - Renders all fields on a single, clean scrollable card.
   - Ideal for power users, desktop screens, or rapid entry.

### 3.2 Live Preview & Payload Inspector
- A dedicated right-hand side panel displays a live, formatted card of the user's data as they type.
- Instant toggle to inspect the raw JSON payload ready for API submission.

### 3.3 Dynamic Custom Field Extension
- Users or administrators can add custom key-value metadata fields on the fly (e.g., Team Name, Discord Handle, Hardware Specs).

---

## 4. Visual Design & Aesthetic Tokens

- **Theme**: Dark Cybernetic Slate with clean high-contrast typography.
- **Surface**: `#07090e` (Canvas), `#0f172a` (Card Surface), `#1e293b` (Field Borders).
- **Accents**: Emerald (`#10b981`), Electric Cyan (`#06b6d4`), Muted Slate (`#94a3b8`).
- **Typography**: 
  - Primary UI: `Plus Jakarta Sans`, sans-serif.
  - Code / Monospace / Identifiers: `JetBrains Mono`, monospace.
- **Form Controls**:
  - Minimum touch target: `44px` height.
  - Active focus ring: `2px solid #06b6d4` with subtle `0 0 12px rgba(6, 182, 212, 0.25)` glow.
  - Required indicators: Subtle red asterisk (`*`) with descriptive helper text.

---

## 5. Submission Pipeline & Data Persistence

1. **Client-Side Validation**:
   - Immediate feedback upon field blur.
   - Clear error messages placed directly beneath invalid fields.
2. **Submission Handling**:
   - Generates a unique **Case / Submission Reference ID** (e.g., `CRIME-2026-9481`).
   - Generates an immutable ISO-8601 timestamp.
   - Stores locally in `localStorage` for offline survivability.
   - Provides instant export: "Download Receipt as JSON", "Copy Summary to Clipboard", and "Submit Another Response".

---

## 6. Edge Cases & Accessibility

- **Keyboard Navigation**: Complete tab-index support with `Enter` / `Space` triggers.
- **Contrast**: Compliant with WCAG 2.1 AA standards (minimum 4.5:1 text contrast).
- **Screen Reader Support**: ARIA attributes on all inputs (`aria-required`, `aria-invalid`, `aria-describedby`).
- **Data Preservation**: Form inputs are auto-saved in real-time to prevent data loss on accidental page reload.
