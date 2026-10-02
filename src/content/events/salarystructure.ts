import type { EventDetails } from "./types";

const FORM = "https://forms.gle/ResqDRWSgGc7rUQTA";

export const salaryStructure: EventDetails = {
  slug: "salarystructure",
  name: "The Salary Structure Workshop",
  seo: {
    title: "The Salary Structure Workshop · Oct 22–23, 2026 · Cagayan de Oro",
    description:
      "A 2-day, hands-on workshop where you build your company's own job evaluation, salary grades and pay bands with Rossana Calingin. Oct 22–23, 2026 at Mallberry Suites, CDO. 30 seats only.",
    shareTitle: "“How did you decide my salary?” The Salary Structure Workshop",
    shareDescription:
      "2 days, hands-on. Build your own salary grades and pay bands with Rossana Calingin. Oct 22–23, 2026 · Mallberry Suites, CDO · 30 seats.",
  },
  navLinks: [
    { label: "What you build", href: "#build" },
    { label: "Coach", href: "#speaker" },
    { label: "Rates", href: "#seat" },
    { label: "FAQ", href: "#faq" },
  ],

  schedule: {
    startsAt: "2026-10-22T00:00:00+08:00",
    endsAt: "2026-10-23T23:59:00+08:00",
    earlyBirdEndsAt: "2026-10-09T18:00:00+08:00",
    dateLabel: "October 22–23",
    dayLabel: "Thursday and Friday",
    earlyBirdLabel: "Friday, October 9, 6:00 PM",
    earlyBirdShort: "Oct 9, 6 PM",
  },
  venue: {
    name: "Mallberry Suites Business Hotel",
    detail: "Business Hotel, CDO",
    city: "Cagayan de Oro City",
    shortLabel: "Mallberry Suites",
  },
  durationLabel: "16 hours",
  seats: 30,
  // Registrations sheet (Google Form responses). Its CSV link lives in the
  // server-only env var below, never in this file.
  seatsSheet: {
    env: "SEATS_CSV_SALARYSTRUCTURE",
    seatsColumn: "Number of Participants in a Group",
    requiredColumn: "Name",
    statusColumn: "Remarks",
    ignoreStatuses: ["cancelled", "canceled", "refunded", "withdrawn"],
  },
  prices: {
    earlyBird: 6500,
    regular: 7000,
    groups: [
      { minSeats: 5, price: 6300 },
      { minSeats: 10, price: 6000 },
    ],
  },

  registration: {
    mode: "form",
    formUrl: FORM,
    note: "Our secretariat confirms your seat and sends the payment details, including options for company POs, bank transfer or check.",
  },

  payment: {
    // Payment links emailed after registering (see scripts/google-apps-script).
    // Shows once PAYMONGO_SECRET_KEY is set. Fees: online banking ~0.71%, QR Ph ~1.5%.
    online: {
      methods: ["dob", "dob_ubp", "qrph"],
      title: "Pay online",
      body: "Right after you register, we'll email you a link to pay {total} by online banking (BPI, UnionBank) or QR Ph from GCash, Maya and 30+ banks.",
    },
    // TODO: fill in New Adam's account to show the free bank transfer option.
    // bank: {
    //   title: "Bank transfer · no fees",
    //   bankName: "",
    //   accountName: "",
    //   accountNumber: "",
    //   qr: { src: "/events/salarystructure/instapay-qr.png", width: 600, height: 600 },
    //   body: "Send a photo of your deposit slip to Mary Joy on Viber or text so we can confirm your seat.",
    // },
    other: "Paying by company PO or check? Register, and our secretariat will send the details Accounting needs.",
  },

  hero: {
    title: "“How did you decide my salary?”",
    kicker: "Next time they ask, show them the math.",
    highlight: "show them the math.",
    lead: "In two days you build your company's own job evaluation, salary grades and pay bands, with Rossana Calingin coaching you the whole way. You go home with a working pay structure, not just notes.",
    secondaryCta: { label: "See what you'll build", href: "#build" },
    facts: [
      { value: "Oct 22–23, 2026", label: "Thursday and Friday" },
      { value: "Mallberry Suites", label: "Business Hotel, CDO" },
      { value: "16 hours", label: "Hands-on, learn by doing" },
      { value: "30 seats", label: "So coaching stays personal", seats: true },
    ],
    chart: {
      title: "Your payroll, plotted",
      tag: "Illustration",
      badge: "LEARN BY DOING · WORKSHOP · ",
      before: {
        label: "Pay today",
        title: "Pay by history.",
        body: "Whoever negotiated hardest, or was hired last, earns more. Here a new hire out-earns a 5-year supervisor two levels up.",
        hire: "New hire · ₱49k",
        veteran: "5 yrs, supervisor · ₱36k",
      },
      after: {
        label: "After day 2",
        title: "Pay by structure.",
        body: "Every position is graded, and every salary sits inside its band. When someone asks why, you show them the points.",
        hire: "Grade 3 · ₱27.5k",
        veteran: "Grade 5 · ₱52.5k",
      },
    },
  },

  problem: {
    eyebrow: "Sound familiar?",
    title: "Every HR team hears this. Few can answer it with a number.",
    quotes: [
      {
        quote: "“Ma'am, bakit mas mataas pa ang starting ng bagong hire kaysa sa sahod ko ngayon?”",
        context:
          "Staff member, 5 years with you. New hires come in at today's market rate. Loyal people stay on yesterday's scale, and they notice.",
      },
      {
        quote: "“I-match na lang natin ang offer niya, or aalis siya.”",
        context:
          "Department head. Whoever pushes hardest gets the raise. Everyone else sees it, and the next request is already on its way.",
      },
    ],
    turn: "None of this means your people are the problem.",
    turnEmphasis: "It's a missing structure. And a structure can be built.",
  },

  outcomes: {
    id: "build",
    eyebrow: "What you walk out with",
    title: "You won't just take notes. You'll leave ready to change your company.",
    lead: "You work on your own positions, so by the end of Day 2 you take home a working pay structure, ready to put in place.",
    chartTitle: "Your pay structure",
    chartTag: "What you build",
    chartCaption: {
      lead: "What you build looks like this.",
      body: "Every job is scored and placed in a grade. Every grade gets a minimum, a midpoint and a maximum monthly pay. A salary is fair when it sits inside its band, and you can point to the score that put it there.",
    },
    items: [
      {
        title: "Your salary grades and pay bands",
        body: "Built from your own positions, not a sample company's. Every role gets a grade, and every grade gets a minimum, midpoint and maximum.",
      },
      { title: "A job evaluation framework", body: "A fair, written reason why one position pays more than another." },
      {
        title: "A working Excel evaluation tool",
        body: "The formulas are already built. Enter your jobs and the tool computes the scores.",
      },
      {
        title: "Compensation policy templates",
        body: "Ready to adapt, so the next raise request is decided by a written rule, not by mood.",
      },
      { title: "Guidelines on salary issues", body: "What to say when someone complains or compares payslips." },
    ],
    included: "meals on both days, materials and toolkit, a 16-hour certificate, and hands-on coaching throughout.",
  },

  modules: {
    id: "path",
    eyebrow: "The 10 modules",
    title: "From a list of job titles to a pay structure you can defend.",
    lead: "Two parts. First you measure what each job is worth. Then you turn that into pay.",
    parts: [
      {
        label: "Part 1",
        title: "Measure the jobs",
        items: [
          { title: "Understanding Job Evaluation & Measuring Job Worth" },
          { title: "Fundamentals of Compensation Management" },
          { title: "Job Analysis & Job Documentation" },
          { title: "Introduction to Job Evaluation" },
          { title: "Building a Point-Factor Job Evaluation System", core: true },
        ],
      },
      {
        label: "Part 2",
        title: "Build the pay",
        items: [
          { title: "Developing the Pay Structure" },
          { title: "Salary Benchmarking" },
          { title: "Building Salary Structures" },
          { title: "Salary Administration Guidelines" },
          { title: "Implementation Planning" },
        ],
      },
    ],
  },

  speaker: {
    id: "speaker",
    eyebrow: "Your coach for both days",
    name: "Rossana Calingin",
    role: "Seasoned HR Professional · General Manager, NexEra Management Consultancy Services",
    photo: { src: "/events/salarystructure/rossana-calingin.jpg", width: 1333, height: 2000 },
    body: [
      "Rossana doesn't spend two days lecturing from the front. You work on your own company's positions, and she coaches you throughout.",
      "That's why the room is capped at 30. At that size she can check your work, answer your specific questions and help you get your grades right before you leave.",
    ],
  },

  audience: {
    eyebrow: "Who should attend",
    title: "Built for the people who get asked about pay.",
    roles:
      "HR managers and officers, compensation and benefits practitioners, department heads, and business owners who decide salaries.",
    yes: [
      "You have no formal salary grades, or they haven't been updated since the last wage order.",
      "Someone recently resigned over pay, or you suspect someone will.",
      "You set salaries case by case and can't always explain the difference.",
      "You want a structure you can present to management and defend.",
    ],
    no: [
      "You only want to sit and listen. You will be working on your laptop.",
      "You want to join online. It's face-to-face only, because the coaching happens at your table.",
      "You're looking for generic theory with no output to show for it.",
    ],
  },

  pricing: {
    id: "seat",
    eyebrow: "Register now",
    title: "30 seats. Once they're taken, registration closes.",
    included: [
      "16 hours, hands-on",
      "Your grades and pay bands",
      "Excel evaluation tool",
      "Policy templates and salary-issue guidelines",
      "Meals, materials and toolkit",
      "16-hour certificate",
    ],
    footnote: "Group rates replace early bird. They don't stack.",
  },

  approval: {
    summary: "Need approval first? We wrote the message to your boss for you.",
    subject: "Request: Salary Structure Workshop, Oct 22–23",
    rateEarly: "₱6,500 early bird until Oct 9, 6 PM (₱7,000 after)",
    rateRegular: "₱7,000 per seat",
    message: `Hi Boss,

I'd like to attend The Salary Structure Workshop on Oct 22–23 at Mallberry Suites, CDO.

It's a 16-hour, hands-on workshop. We'd build our own job evaluation, salary grades and pay bands, and take home:
• a working Excel Evaluation Tool
• compensation policy templates
• guidelines for handling salary issues

It would help us explain pay decisions, handle wage-order adjustments, and keep good people.

Rate: {rate}. Groups of 5+ are ₱6,300 each. Meals and materials are included. Only 30 seats.
{url}
Can we go ahead?`,
  },

  faq: {
    id: "faq",
    eyebrow: "Straight answers",
    title: "Questions HR leaders ask us",
    items: [
      {
        q: "How is this different from HR seminars we've already attended?",
        a: [
          "At most seminars, you listen and take notes. Here, you bring a laptop and work on your own company's positions. You leave with your job evaluation, salary grades and pay bands already started, plus the Excel tool and templates to finish and maintain them.",
        ],
      },
      {
        q: "We already have a salary structure. Is this still for us?",
        a: [
          "Probably, if you have to think about these questions. When was it last updated? After the latest wage order, are the gaps between levels still right? Can your department heads explain to their teams why pay is what it is?",
          "You'll learn to check and rebuild an existing structure on a defensible basis.",
        ],
      },
      {
        q: "Is it online? Is there a recording?",
        a: [
          "No. It's face-to-face only, at Mallberry Suites Business Hotel in Cagayan de Oro. The value is the hands-on coaching while you build your structure, and that doesn't work over a recording.",
        ],
      },
      {
        q: "We're not based in CDO. Is it worth the trip?",
        a: [
          "Many companies send their HR lead, or someone from a Northern Mindanao branch. Two days, and they come back with a working structure. Message our secretariat if you'd like help planning the trip.",
        ],
      },
      {
        q: "Two days away from the office is hard for us.",
        a: [
          "This isn't time away from work. It's the work itself, done with a coach and a ready-made tool. Building salary grades is something you'd spend the hours on eventually, probably alone and from scratch.",
        ],
      },
      {
        q: "Is there a discount?",
        a: [
          "The lowest rates are the group rates: ₱6,300 each for 5 or more, and ₱6,000 each for 10 or more. Early bird is ₱6,500 until Friday, Oct 9, 6:00 PM. Those are the only discounts.",
        ],
      },
      {
        q: "What should I bring?",
        a: [
          "A laptop with Excel, and your current list of positions or job titles if you have one. Meals, materials and the toolkit are provided.",
        ],
      },
      {
        q: "How do we pay? Can our company use a PO?",
        a: [
          `Reserve your seat with the [registration form](${FORM}). Right after, we email you a link to pay online by online banking or QR Ph.`,
          "Paying by company PO, bank transfer or check? Our secretariat sends the details, plus any documents Accounting needs.",
        ],
      },
      {
        q: "Who is organizing this?",
        a: [
          "The ABBA Initiative, OPC. For anything else, call or text our event secretariat, Mary Joy Dulangon, at [+63 976 437 2504](tel:+639764372504).",
        ],
      },
    ],
  },

  final: {
    title: "Walk in with a list of job titles.",
    emphasis: "Walk out with a pay structure you can explain.",
  },

  organizer: { presentedBy: "New Adam", organizedBy: "The ABBA Initiative, OPC" },
  secretariat: { name: "Mary Joy Dulangon", phone: "+639764372504", phoneLabel: "+63 976 437 2504" },
};
