export const SUGGESTED_QUERIES = [
  "How do I track my order?",
  "There's a problem with my order",
  "Can I cancel or change my order?",
  "How do I return an item?",
  "Where is my refund?",
] as const;

export type HelpTopic = {
  id: string;
  label: string;
  icon: string;
  highlight?: boolean;
};

export const HELP_TOPICS: HelpTopic[] = [
  { id: "orders", label: "Manage your order", icon: "package" },
  { id: "returns", label: "Return & refunds", icon: "redo" },
  { id: "marketplace", label: "Marketplace", icon: "marketplace" },
  { id: "click-collect", label: "Click & Collect", icon: "ads-click" },
  { id: "onepass", label: "OnePass & Flybuys", icon: "onepass" },
  { id: "payment", label: "Payment", icon: "credit-card" },
  { id: "website-app", label: "Website & app", icon: "mobile-hand" },
  { id: "store", label: "Store support", icon: "storefront" },
  {
    id: "safety",
    label: "Safety & important information",
    icon: "description",
  },
  {
    id: "feedback",
    label: "Share your feedback",
    icon: "forum",
    highlight: true,
  },
];

export type FaqSummary = {
  title: string;
  paragraphs: string[];
};

const RETURN_SUMMARY: FaqSummary = {
  title: "AI summary",
  paragraphs: [
    "You can return a product if you change your mind, as long as it's within 60 days of purchase (or 30 days for Marketplace seller products). Here's what you'll need for a change of mind return:",
    "Proof of purchase. The product must be in a resaleable condition, unused, unworn, and in its original packaging. It shouldn't be a product excluded from change of mind returns.",
    "Good news for OnePass members! You get 365-day change of mind returns on eligible products.",
    "If you bought a product from a Marketplace seller or Target on kmart.com.au and want to return it, you'll need to chat with us, and we'll direct your enquiry to the seller.",
    "We recently identified an issue with the labelling of some bedding ranges regarding material composition and cotton origin. If you're not happy with your purchase of these affected bedding products, you can return them to your nearest store for a refund with proof of purchase. If you bought it online and can't get to a store, please contact our Customer Care Team. Even if you don't have a receipt for these specific bedding products, we may still be able to identify the affected product and process a refund.",
  ],
};

const SUMMARIES: Record<string, FaqSummary> = {
  "how do i track my order?": {
    title: "AI summary",
    paragraphs: [
      "You can track your order by signing in to your Kmart account and opening Orders, or by using the tracking link in your dispatch email.",
      "Click & Collect orders show as Ready for collection when available at your chosen store. Home delivery updates appear as your parcel moves through the carrier network.",
      "If tracking hasn't updated for more than 48 hours after dispatch, chat with Joy and we can look into it with you.",
    ],
  },
  "there's a problem with my order": {
    title: "AI summary",
    paragraphs: [
      "Sorry you're having trouble. Common issues include missing items, damaged products, or a delivery that didn't arrive as expected.",
      "Have your order number ready. You can find it in your confirmation email or under Orders in your account.",
      "For Marketplace seller orders, we may need to connect you with the seller. For complex cases, Chat with Joy is the fastest next step.",
    ],
  },
  "can i cancel or change my order?": {
    title: "AI summary",
    paragraphs: [
      "You can cancel or change an order only while it's still being prepared — usually before it moves to Dispatched.",
      "Sign in, open the order, and look for Cancel or Change options. If those aren't available, the order is already in progress.",
      "Need help with a change that isn't available online? Chat with Joy and we'll guide you.",
    ],
  },
  "how do i return an item?": RETURN_SUMMARY,
  "where is my refund?": {
    title: "AI summary",
    paragraphs: [
      "Once we accept your return, refunds usually appear in 3–10 business days depending on your bank or card provider.",
      "Store returns are often processed at the counter. Online returns are confirmed by email when the refund is issued.",
      "If it's been longer than expected, check your original payment method and then Chat with Joy so we can investigate.",
    ],
  },
};

const GENERIC_SUMMARY: FaqSummary = {
  title: "AI summary",
  paragraphs: [
    "Here's what we found from our help articles. For the most accurate answer, try one of the suggested questions or browse a help topic below.",
    "If your issue is account-specific or more complex, Chat with Joy can walk you through the next steps.",
  ],
};

/**
 * Canned answers for the kinds of things people ask *after* a first answer.
 * Keyed by an intent we can spot with a keyword, not by an exact question.
 */
const FOLLOW_UP_SUMMARIES: { match: (key: string) => boolean; summary: FaqSummary }[] = [
  {
    match: (key) => key.includes("how long") || key.includes("how many days"),
    summary: {
      title: "AI summary",
      paragraphs: [
        "Timeframes depend on the step you're up to. Returns lodged in store are usually assessed on the spot, while posted returns take 3–5 business days to reach our returns centre.",
        "Once a return is accepted, refunds take a further 3–10 business days to appear, depending on your bank or card provider.",
        "Home delivery is typically 2–7 business days, and Click & Collect orders are usually ready within 24 hours of the ready-for-collection email.",
      ],
    },
  },
  {
    match: (key) => key.includes("receipt") || key.includes("proof of purchase"),
    summary: {
      title: "AI summary",
      paragraphs: [
        "Proof of purchase doesn't have to be a paper receipt. A tax invoice, order confirmation email, bank or card statement, or your Kmart account order history all work.",
        "If you paid with OnePass or Flybuys, we can often find the transaction against your membership.",
        "Without any proof of purchase we can't process a change of mind return, but faulty products are assessed separately under the Australian Consumer Law — Joy can help you start that.",
      ],
    },
  },
  {
    match: (key) => key.includes("in store") || key.includes("in-store") || key.includes("store instead"),
    summary: {
      title: "AI summary",
      paragraphs: [
        "Yes — most online orders can be handled at any Kmart store. Bring the product, its packaging, and your proof of purchase to the service desk.",
        "Marketplace seller products and Target items bought on kmart.com.au are the exception: those need to go back to the seller, so start a chat with us and we'll route it.",
        "Store team members can also reprint receipts and check stock at nearby stores while you're there.",
      ],
    },
  },
  {
    match: (key) => key.includes("onepass") || key.includes("flybuys") || key.includes("member"),
    summary: {
      title: "AI summary",
      paragraphs: [
        "OnePass members get 365-day change of mind returns on eligible products, free delivery on eligible orders, and faster Click & Collect.",
        "Link Flybuys in your Kmart account to collect points automatically at checkout — points can take up to 48 hours to appear.",
        "Membership questions tied to your specific account are best handled by Joy, who can look at your membership with you.",
      ],
    },
  },
  {
    match: (key) => key.includes("marketplace") || key.includes("seller"),
    summary: {
      title: "AI summary",
      paragraphs: [
        "Marketplace products are sold and shipped by third-party sellers, so returns, refunds, and delivery updates are managed by the seller rather than Kmart directly.",
        "You'll find the seller name on your order confirmation and on the product page. Marketplace change of mind returns are 30 days.",
        "We can pass your enquiry straight to the seller — Chat with Joy and we'll open it for you.",
      ],
    },
  },
];

type LookupOptions = {
  /** Marks the query as a follow-up turn so the answer references the thread. */
  followUp?: boolean;
  previousQuestion?: string;
};

function baseLookup(key: string, original: string): FaqSummary {
  if (!key) return GENERIC_SUMMARY;
  if (SUMMARIES[key]) return SUMMARIES[key];

  if (key.includes("return") || key.includes("refund") || key.includes("change of mind")) {
    return key.includes("refund") && !key.includes("return")
      ? SUMMARIES["where is my refund?"]
      : RETURN_SUMMARY;
  }
  if (key.includes("track")) return SUMMARIES["how do i track my order?"];
  if (key.includes("cancel") || key.includes("change my order")) {
    return SUMMARIES["can i cancel or change my order?"];
  }
  if (key.includes("problem") || key.includes("damaged") || key.includes("missing")) {
    return SUMMARIES["there's a problem with my order"];
  }

  return {
    ...GENERIC_SUMMARY,
    paragraphs: [`We looked across our FAQ content for “${original}”.`, ...GENERIC_SUMMARY.paragraphs],
  };
}

export function lookupSummary(query: string, options: LookupOptions = {}): FaqSummary {
  const original = query.trim();
  const key = original.toLowerCase();
  const base = baseLookup(key, original);

  if (!options.followUp) return base;

  const matched = FOLLOW_UP_SUMMARIES.find((entry) => entry.match(key));
  if (matched) return matched.summary;

  // Nothing intent-specific matched, so reshape the base answer with a lead-in
  // that references the thread — a follow-up should never read as a repeat.
  const lead = options.previousQuestion
    ? `Following on from “${options.previousQuestion}”, here's what our help articles say about “${original}”.`
    : `Here's what our help articles say about “${original}”.`;

  return {
    title: base.title,
    paragraphs: [lead, ...base.paragraphs.slice(0, 3)],
  };
}

/** Total mock Vertex AI search latency — stage timings are fractions of this. */
export const MOCK_SEARCH_LATENCY_MS = 3000;

export type SearchLoadingStage = {
  /** Fraction of MOCK_SEARCH_LATENCY_MS when this stage becomes active (0–1). */
  at: number;
  label: string;
};

/**
 * Progressive status copy while a summary is generating.
 * Keep short; timings stay in sync with MOCK_SEARCH_LATENCY_MS via `at`.
 */
export const SEARCH_LOADING_STAGES: readonly SearchLoadingStage[] = [
  { at: 0, label: "Thinking…" },
  { at: 0.35, label: "Searching help articles…" },
  { at: 0.7, label: "Almost there…" },
];

export function mockSearchDelay(ms = MOCK_SEARCH_LATENCY_MS): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}
