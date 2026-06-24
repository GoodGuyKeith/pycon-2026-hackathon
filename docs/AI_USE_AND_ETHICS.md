# AI Use And Ethics

## How AI Was Used

AI assistance was used for product ideation, frontend implementation, copy tightening, verification planning, and submission-document cleanup. The app itself does not send attendee data to an AI model.

## Product AI Readiness

Event Buddy is designed so a later AI extractor could improve website, PDF, or image schedule import. The current version keeps extraction mostly deterministic and labels OCR as a next upgrade instead of pretending it is already available.

## Data And Privacy

- Imported schedules stay in the browser unless a website URL is sent to the local backend importer.
- Plans, XP, and buddy progress are stored in browser localStorage.
- No authentication, production database, or third-party tracking is included.

## Fairness And Limitations

- Recommendations are assistive, not authoritative.
- Introvert-friendly and social modes are user-controlled.
- Website import may miss sessions on dynamic or inaccessible event sites.
- Session codes and buddy codes are demo verification mechanisms, not security controls.
