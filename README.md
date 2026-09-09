# Universe Timeline Simulator

A self-running, seed-driven galactic civilization simulator built as a static web app for GitHub Pages.

**Live site:** https://mrhakan.github.io/universe-timeline/

## What it simulates

- procedurally generated spiral galaxy with 100–260 star systems
- 6–14 starting civilizations
- colonization and territorial expansion
- population and economic growth
- diplomacy and relationship drift
- alliances and trade routes
- border friction and wars
- system conquest and capital relocation
- rebellions and breakaway states
- technological progress
- market crashes, epidemics and stellar disasters
- faction collapse and extinction
- changing historical eras

## Observer tools

The user mainly watches history unfold, but can make limited interventions:

- Prosperity
- Technology gift
- Forced peace
- Diplomatic tension
- Rebellion
- Disaster

The UI includes political, economic, population and diplomacy map overlays, a live historical timeline, faction/wars/alliance ledgers, simulation speed controls, local saves and JSON import/export.

## Determinism

Universe generation and the simulation balance layer use deterministic seeded pseudo-random state. A save contains the complete simulation state so a timeline can continue exactly where it stopped.

## Tech

- Vanilla HTML/CSS/JavaScript
- Canvas 2D galaxy renderer
- No backend
- No external runtime dependencies
- GitHub Pages deployment through GitHub Actions

## Validation

CI checks JavaScript syntax and runs a headless 100-year simulation. The smoke test asserts that the universe remains valid and produces diplomacy, alliances, trade and wars before Pages deployment.
