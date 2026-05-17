# Scoping Call Intake Checklist

> Internal template. Use this on every 30-minute scoping call booked via cal.com/dgpugliese.dev/build-scoping. Goal: walk out of the call with enough to write a fixed-scope proposal within 48 hours.

---

## Before the call (5 minutes)

- [ ] Read the "what are you thinking of building?" answer from Cal.com
- [ ] Glance at their website / LinkedIn / org so you don't ask basics they expect you to know
- [ ] Have this checklist open in a side window — take notes in real time

---

## The call (30 minutes)

### 1. Opening (2 min)
Brief intro. "I'm David. The goal of this call is to understand what you want to build and whether I'm the right person to build it. No pressure either way."

### 2. The product (8 min)
- [ ] **What is it?** Have them describe the product in their own words. Don't interrupt.
- [ ] **Who is it for?** End user — be specific. Not "small businesses" — "office managers at 5–25 person dental practices."
- [ ] **What problem does it solve?** What do they do today instead?
- [ ] **What does success look like?** How will they know in 6 months it was worth building?

### 3. Scope (10 min)
- [ ] **Must-haves** — what features have to ship for it to be useful at all?
- [ ] **Nice-to-haves** — what's wanted but cuttable?
- [ ] **Out of scope** — what should *not* be in v1? (Force them to name something. If nothing, push.)
- [ ] **Users** — how many? Single-tenant or multi-tenant? Self-serve signup or invite-only?
- [ ] **Authentication** — email/password, Google, SSO, magic link?
- [ ] **Payments** — does this charge money? Subscription, one-time, both?
- [ ] **Data** — what data lives in this? PII, financial, health, regulated?
- [ ] **Integrations** — does it talk to other systems? Which? Existing APIs or do they need building too?
- [ ] **Admin/internal view** — do *they* need a back-office to manage it?

### 4. Constraints (5 min)
- [ ] **Timeline** — when do they need it? Is there a real deadline (event, fundraising round, fiscal year, grant) or is "soon" the answer?
- [ ] **Budget** — explicitly: "Our builds start at $12k and go up from there. Standard builds are $25k+. Is that in the right ballpark for what you have in mind?" Don't dance around this.
- [ ] **Existing system** — are they replacing something? Migrating data? Running parallel for a while?
- [ ] **Stack preferences** — any technical opinions or existing infrastructure to work with?
- [ ] **Design** — do they have brand assets / a designer / a Figma file? Or starting fresh?
- [ ] **Decision maker** — who else needs to approve this before they can sign?

### 5. Mutual fit (3 min)
- [ ] **My fit** — does this match what I build well? (Privacy-minded, compliance, internal tools, B2B web apps.) If it's clearly outside (mobile-first social app, AI-heavy ML product, blockchain), say so.
- [ ] **Their fit** — do they seem reasonable to work with? Are they decisive or do they keep saying "the team will need to think about it"?
- [ ] **Red flags** — vague scope, unrealistic timeline, "we can pay you in equity," "we just need someone to start and we'll figure it out as we go."

### 6. Close (2 min)
- [ ] **Set expectations** — "I'll send a proposal within 48 hours. It'll be a fixed scope, fixed price, fixed timeline. If you accept, we sign the contract, you pay the 50% deposit, and we start."
- [ ] **What if not a fit** — "If after this call I don't think I'm the right builder, I'll tell you and I'll usually know someone who is."
- [ ] **Next-action check** — "Anything else I should know before I write this up?"

---

## After the call (15 minutes)

- [ ] Write proposal draft within 4 hours while it's fresh
- [ ] Score the lead: fit (1–5), urgency (1–5), budget clarity (1–5). Anything below 3 across the board, decline politely.
- [ ] Send proposal within 48 hours regardless — even a "this isn't a fit and here's why" reply within 48h is the bar.

---

## Red-flag phrases to listen for

- "We just need an MVP — should be simple." (Translation: scope will balloon.)
- "We're talking to a few other developers." (Fine, but probe — are they price-shopping or fit-shopping?)
- "We're pre-revenue but the upside is huge." (Equity-only pitch incoming.)
- "We're flexible on scope." (No they aren't. They have an idea in their head and they'll feel betrayed when it ships without it.)
- "Can you start before the contract?" (Hard no. Never.)
- "We don't really have a budget yet." (Translation: under $10k or hoping you'll quote first so they can negotiate down.)

---

## Green-flag phrases

- "We have a board-approved budget of $X for this project."
- "Here's the spreadsheet/process we're trying to replace."
- "We tried hiring an agency and they quoted $80k."
- "We have a date we need this done by — here's why."
- "Our last vendor was a disaster — what makes you different?" (Honest, scarred, ready to commit if convinced.)
