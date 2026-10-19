# Ariyobarzan Athletic Club

Persian RTL brand experience and interactive club presentation. Design and build: Kiarash.

## Experience

The landing page combines the original cinematic concept artwork with richer orange, amethyst, cyan and indigo gradients. The scroll experience is a real-time Three.js gym, with light flooring, gray internal columns, low ceiling, ceiling lights and AC panels, strength equipment, red lane and entrance lounge details inspired by public footage. It is an artistic reconstruction, not a measured survey. No video or image sequence drives the scroll animation. The gallery contains real stills from the club introduction clip; the hero is clearly labeled as a design interpretation.

## Club portal

Open `club.html`. The portal contains three general sample programs, seven animated movement demonstrations, a session checklist and local training log, three sample membership prices, two sample festival rules, six illustrated shop products with variants, a cart and downloadable sample invoices, and a local support-request demonstration.

**Presentation only:** All prices, product stock, festivals and commercial packages are explicitly labeled sample/proposed content. They are not confirmed club offers. Programs are general examples, not coach-issued personal plans. There is no payment gateway, server account, live stock system or delivery of orders/support requests to the club. Data stays in the same browser through localStorage, without cross-device sync. The UI states these limits at the relevant actions. No customer action routes to Instagram.

## Source facts and imagery

Club identity, address and public facility descriptions:
- https://www.instagram.com/ariyobarzan.gym/
- https://www.instagram.com/ariyobarzan.gym/reel/DChp_Atsjac/ (official introduction; gallery still source)
- https://www.instagram.com/p/Dd6j9F9C-Mh/ (entrance, lounge and facilities)
- https://www.instagram.com/fit.shoow1/reel/DFaL3TAIaW0/ (supplementary space reference; historical price not used)

Current phone, prices, stock and festival dates could not be reliably confirmed. Sample commercial data was authorized for presentation. Club identity and source footage remain the property of their respective owners. Original source watermark is preserved in gallery stills.

Movement cues link directly to Mayo Clinic or ACE official exercise demonstrations, alongside each animation. Animations are schematic illustrations; the club coach should determine individual load and range.

## Run and check

Serve this directory with a static HTTP server. No runtime account, key or external CDN is required.

`npm install` installs pinned build dependencies. `npm run build` bundles Three.js into `assets/gym.js`. `npm run check` checks all application modules; `npm test` verifies catalog pricing, discount minimums and caps, partner membership eligibility, invalid codes and bounded quantities.

Readable scene code: `source/gym-source.mjs`. Landing UI: `experience.js`, `design.css`, `redesign.css`. Portal: `portal.js`, `portal-data.js`, `portal.css`, `movement.js`.

## Licenses

Vazirmatn: SIL Open Font License. Three.js: MIT. Copies are in `assets/`. New campaign artwork is in `assets/posters/`; vector shop illustrations are in `assets/shop/`. Club identity belongs to its owner.
