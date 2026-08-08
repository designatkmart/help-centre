import ordersImage from "../assets/topics/topic-orders.jpg";
import returnsImage from "../assets/topics/topic-returns.jpg";
import marketplaceImage from "../assets/topics/topic-marketplace.jpg";
import clickCollectImage from "../assets/topics/topic-click-collect.jpg";
import onepassImage from "../assets/topics/topic-onepass.jpg";
import paymentImage from "../assets/topics/topic-payment.jpg";
import websiteAppImage from "../assets/topics/topic-website-app.jpg";
import storeImage from "../assets/topics/topic-store.jpg";
import safetyImage from "../assets/topics/topic-safety.jpg";
import feedbackImage from "../assets/topics/topic-feedback.jpg";

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
