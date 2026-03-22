# TODOs

## BeepOff sub-page (/beepoff.html)
A standalone portfolio page for BeepOff with the full story: the voicemail frustration origin, Maxine's salon gloved-hands problem, the Phorest API integration, and the tech stack (Vapi, n8n, app.beepoff.io).

**Why:** BeepOff is the strongest freelance signal in the portfolio. A linkable, shareable URL lets you point a potential client directly at the full story rather than "go to my portfolio and find the BeepOff card."

**Context:** The full story is drafted in `~/.gstack/projects/cheerlessDreamer-dannytaylor_io_staging/danny-main-design-20260320-124551.md` under "BeepOff — Portfolio Entry Draft". The `.case-study-*` CSS classes already exist in `style.scss` and are ready to use. The carousel card should link here once built.

**Effort:** human ~2 hrs / CC ~10 min
**Depends on:** Carousel implementation (so the card links to this page rather than beepoff.io)

---

## Day-job case studies (Kaisa, Husqvarna)
Brief process writeups for one or two client projects, showing design decisions and outcomes — within NDA limits.

**Why:** Employers asking "show me your process" currently get project images and a one-line description. A light case study (problem → approach → outcome, with whatever visuals can be shown) improves conversion at the interview stage.

**Context:** Husqvarna (Apple Watch app, G4 HMI) and Cytiva (isometric illustrations) have the most visually demonstrable work. Kaisa is current employer — check what can be shown publicly before writing. Side projects tell the better story for freelance positioning, but case studies still matter for employment.

**Effort:** human ~1 week (writing) / CC ~30 min (scaffolding + implementation)
**Depends on:** Nothing blocking. Can be built any time after the carousel ships.
