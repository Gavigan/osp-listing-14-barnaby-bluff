# Bull Point buyer intake — 14 Barnaby Bluff

## Integration

This listing uses the existing **Bull Point — Buyer Inquiry** native HighLevel
form `Ex2VsTEBognqEcHUP05y` in HG Group / Beaufort `q6z3rhmuIrmDQoArRjvc`.
It does not create a separate Barnaby lead database, webhook, or pipeline.
HighLevel receives the submission on its server. No credential is placed in
this GitHub Pages site. The current concierge, SMS and email options remain.

The embedded and direct forms share the same editable message context:
14 Barnaby Bluff, MLS 197994 and the listing source URL. The page supplies only
fixed property context and allowlisted campaign tokens. It never passes names,
telephone numbers, email addresses or consent values from URL parameters.
The direct link works without JavaScript or when an iframe is blocked.

## Current native configuration and limits

Live form inspected October 15, 2026: first name and email required; last name,
phone, question and Bull Point interest optional. Email reply permission is
unchecked. Billy’s updated requirement is exactly **name, email and phone**, plus the
necessary contact consent; no separate last-name, question or interest field.
The current native field layout still needs simplification.
Fields must be changed in the shared native form; an iframe parent cannot
securely override them. Such a change affects every Bull Point page using it.

`Gavigan/bull-point-website/CRM-OPERATIONS.md` records the existing workflow
`2b9aba81-6636-4bfe-ba30-010138241b07`: tag `bull-point-inquiry`, follow-up
task assigned to Stacey, internal email to Billy with Stacey copied, and a
buyer email only with affirmative email permission and no Email DND.
These are documented prior settings, not newly verified executions.
`BUYER-JOURNEYS.md` subsequently records an outbound sending hold.
Do not lift that hold or claim delivery based on this website change.
No separate opportunity/pipeline stage creation was verified in this session.

## Activation / release requirements

Authenticated access to the existing HighLevel location is needed to:

1. Simplify the shared buyer form to three required contact fields: name, email
   and phone, plus appropriate contact permission. Remove the separate last-name,
   question and interest controls. Retain property/source attribution as hidden
   native fields; update the website mapping if the existing message field is
   removed rather than hidden. Keep marketing permission separate and unchecked;
   preserve existing opt-outs. Update the native privacy link from its legacy
   preview URL to the current Bull Point privacy page.
2. Verify native contact duplicate settings, phone normalization/validation,
   bot/spam protection, submit locking and success confirmation. Do not add an
   unaudited second HTTP submission handler around the native form.
3. Verify that this form enters the authorized Bull Point sales pipeline and
   correct stage/owner. The prior documentation proves a follow-up task, not
   necessarily an opportunity. Confirm the current sending hold's scope before
   changing any workflow notification actions. Keep buyer campaigns off.
4. Use an owned Billy/Stacey test contact, mark the message `TEST BARNABY`,
   and inspect the saved submission, property/source context, contact record,
   opportunity/task and workflow execution. Verify internal delivery to BOTH
   Billy and Stacey in message details; webhook/form acceptance is insufficient.
5. Repeat with the same contact, permission unchecked, and a contact with DND.
   Verify contact upsert, no duplicate opportunity/task/notice for accidental
   retries, and no unsolicited buyer messages. Test invalid phone, empty fields,
   spam protection, provider failure and mobile iframe/direct fallback.

No test inquiry was submitted during this change: there is no authenticated
CRM readback session to verify delivery or the sending hold. Integration is
prepared for review; **the three-field contact form, deduplication, pipeline placement and
notification delivery are not certified operational**. Do not treat a native
form confirmation or historical September tests as current end-to-end proof.

## Code checks

Run `node --test tests/buyer-inquiry.test.mjs` and `node --check buyer-inquiry.js`.
These check attribution, consent isolation, no-JS fallback and preservation of
existing contact routes. They do not submit leads or prove CRM delivery.
