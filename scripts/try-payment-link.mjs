/**
 * Try the payment link flow locally, without the Google Form.
 * Does what the sheet's Apps Script does: asks the local site for a payment
 * link, then prints it so you can open it.
 *
 *   pnpm try:payment-link            1 seat
 *   pnpm try:payment-link 7          7 seats
 *   pnpm try:payment-link 1 2026-10-01T09:00:00+08:00   registered at that time
 *
 * Needs `pnpm dev` running and PAYMENT_LINK_SECRET + PAYMONGO_SECRET_KEY in
 * .env.local. PORT and EVENT override the defaults (3000, salarystructure).
 */
const [seats = "1", registeredAt = new Date().toISOString()] = process.argv.slice(2);
const port = process.env.PORT ?? "3000";
const event = process.env.EVENT ?? "salarystructure";
const secret = process.env.PAYMENT_LINK_SECRET;
if (!secret) throw new Error("Add PAYMENT_LINK_SECRET to .env.local first.");

const res = await fetch(`http://localhost:${port}/api/events/${event}/payment-link`, {
  method: "POST",
  headers: { "Content-Type": "application/json", Authorization: `Bearer ${secret}` },
  body: JSON.stringify({ seats: Number(seats), registeredAt, ref: "local-test" }),
}).catch(() => {
  throw new Error(`Couldn't reach http://localhost:${port}. Is \`pnpm dev\` running? (Set PORT if it's not 3000.)`);
});
const data = await res.json();
if (!res.ok) throw new Error(data.error ?? `Request failed (${res.status})`);

const key = process.env.PAYMONGO_SECRET_KEY ?? "";
console.log(`\n  ${data.seats} ${data.seats === 1 ? "seat" : "seats"} · ${data.tier} · ${data.totalLabel}`);
console.log(`  ${key.startsWith("sk_live_") ? "LIVE key: this charges real money" : "Test mode: nothing is charged"}\n`);
console.log(`  Open this payment link:\n  ${data.url}\n`);
