# Payment links from the Google Form

`payment-links.gs` runs inside an event's registrations sheet. Each time someone submits the Google Form, it:

1. asks the website for a payment link (`POST /api/events/<slug>/payment-link`). The site works out the price with the same rules as the event page, locked to the moment they registered,
2. writes **Amount due** and **Payment link** on their row,
3. emails them the link from the Google account that installed the script.

The link (`https://<slug>.newadam.co/pay/…`) opens a fresh PayMongo checkout each time, so it doesn't expire. It's signed, so the seats and price can't be edited, and it holds no personal data.

## One-time setup (per event sheet)

1. Open the registrations sheet → **Extensions → Apps Script**.
2. Replace the contents of `Code.gs` with `payment-links.gs`. Check `CONFIG` at the top (endpoint, event name, column headers) and save.
3. **Project Settings** (gear icon) → **Script properties** → **Add script property**:
   - Property: `PAYMENT_LINK_SECRET`
   - Value: the same value as `PAYMENT_LINK_SECRET` in Vercel (Production).
4. Back in the editor, pick **setup** in the function dropdown → **Run**. Approve the permissions Google asks for (the sheet, sending email, and connecting to the website).
5. Reload the sheet. A **New Adam** menu appears:
   - **Email payment link to selected row**: (re)send one person's link, e.g. after fixing their seat count.
   - **Fill in missing payment links (no emails)**: add links for earlier registrations without emailing them.

## The Google Form

- **Number of Participants in a Group** must be a number: edit the question → **⋮ → Response validation → Number → Greater than → 0**. Blank counts as 1 person. Anything else (e.g. "Technical") gets "Check seats" in Amount due and no email until it's fixed.
- The old pay-first questions (Mode of Payment, Date of Payment, Reference/Transaction Number, Proof of Payment) should be **optional**, since people now pay after registering.
- Cancelled rows: put "Cancelled" (or refunded/withdrawn) in **Remarks**; they're skipped.

## Notes

- Gmail accounts can send about 100 emails a day from Apps Script (Google Workspace: 1,500).
- Payments show in the PayMongo dashboard with the row in the metadata (`sheet_row: row12`). Marking rows "Paid" automatically is a later step (PayMongo webhook).

## Trying it locally

The Apps Script can't reach your computer, so locally a command plays the part of the form:

```bash
pnpm dev
pnpm try:payment-link 7        # 7 seats; prints a link to http://salarystructure.localhost:3000/pay/…
```

With the `sk_test_` key in `.env.local` nothing is charged, and PayMongo also offers **Card** so you can finish with the test card `4343 4343 4343 4345` (any future expiry, any CVC). For one small real payment, set the live key and `PAYMENT_TEST_PRICE=20` in `.env.local`, restart `pnpm dev`, pay with your own bank, then switch back.
