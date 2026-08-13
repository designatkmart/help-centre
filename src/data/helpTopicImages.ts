import ordersImage from "../assets/topics/topic-orders.svg";
import returnsImage from "../assets/topics/topic-returns.svg";
import marketplaceImage from "../assets/topics/topic-marketplace.svg";
import clickCollectImage from "../assets/topics/topic-click-collect.svg";
import onepassImage from "../assets/topics/topic-onepass.svg";
import paymentImage from "../assets/topics/topic-payment.svg";
import websiteAppImage from "../assets/topics/topic-website-app.svg";
import storeImage from "../assets/topics/topic-store.svg";
import safetyImage from "../assets/topics/topic-safety.svg";
import feedbackImage from "../assets/topics/topic-feedback.svg";

/**
 * Square (1:1) artwork for the Grid Tile topic tiles, keyed by HELP_TOPICS id.
 * Kept separate from the topic data so the two can be edited independently.
 */
export const TOPIC_IMAGES: Record<string, string> = {
  orders: ordersImage,
  returns: returnsImage,
  marketplace: marketplaceImage,
  "click-collect": clickCollectImage,
  onepass: onepassImage,
  payment: paymentImage,
  "website-app": websiteAppImage,
  store: storeImage,
  safety: safetyImage,
  feedback: feedbackImage,
};
