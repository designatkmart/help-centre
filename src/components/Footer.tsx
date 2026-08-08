import styles from "./Footer.module.css";
import iconOrderTracking from "../assets/footer/icon-order-tracking.svg";
import iconContact from "../assets/footer/icon-contact.svg";
import iconCatalogue from "../assets/footer/icon-catalogue.svg";
import socialInstagram from "../assets/footer/social-instagram.svg";
import socialYoutube from "../assets/footer/social-youtube.svg";
import socialFacebook from "../assets/footer/social-facebook.svg";
import badgeAppStore from "../assets/footer/badge-app-store.svg";
import badgeGooglePlay from "../assets/footer/badge-google-play.svg";
import badgeFullySecured from "../assets/footer/badge-fully-secured.svg";
import payVisa from "../assets/footer/pay-visa.svg";
import payMastercard from "../assets/footer/pay-mastercard.svg";
import payAmex from "../assets/footer/pay-amex.svg";
import payPaypalPayIn4 from "../assets/footer/pay-paypal-pay-in-4.svg";
import payApplePay from "../assets/footer/pay-apple-pay.svg";
import payAfterpay from "../assets/footer/pay-afterpay.svg";
import payZip from "../assets/footer/pay-zip.svg";
import payFlypay from "../assets/footer/pay-flypay.svg";
import kmartLogo from "../assets/footer/kmart-logo.svg";

const slug = (label: string) =>
  `#${label
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}`;

const UTILITY_TILES = [
  { label: "Track My Order", icon: iconOrderTracking, size: 22.228 },
  { label: "Contact Us", icon: iconContact, size: 24 },
  { label: "Catalogue", icon: iconCatalogue, size: 24 },
];

const SOCIAL_LINKS = [
  { label: "Instagram", icon: socialInstagram },
  { label: "YouTube", icon: socialYoutube },
  { label: "Facebook", icon: socialFacebook },
];

const APP_BADGES = [
  { label: "Download on the App Store", icon: badgeAppStore, width: 143.592 },
  { label: "Get it on Google Play", icon: badgeGooglePlay, width: 162 },
];

const LINK_COLUMNS = [
  {
    title: "Get Help",
    links: [
      "Help & FAQ",
      "Exchanges & Returns",
      "Delivery",
      "Layby",
      "Site Map",
      "Details of Registered Office of Kmart",
    ],
  },
  {
    title: "Services & Payment",
    links: [
      "Click & Collect",
      "Photo Centre",
      "Gift Cards",
      "Apple Pay",
      "Afterpay",
      "Zip",
      "Flypay",
    ],
  },
  {
    title: "About Kmart",
    links: [
      "About Us",
      "Price Promise",
      "Jobs",
      "Layby",
      "Community & Sustainability",
      "K hubs",
    ],
  },
  {
    title: "Legal",
    links: [
      "Product Recalls",
      "Product Instruction",
      "Secure Online Shopping",
      "Terms & Conditions",
      "Privacy Policy",
      "Whistleblower Protection",
    ],
  },
];

// Figma lists PayPal Pay in 4 twice in the payment strip; both entries are kept so the
// row matches the design.
const PAYMENT_LOGOS = [
  { label: "Visa", icon: payVisa, width: 74.4 },
  { label: "Mastercard", icon: payMastercard, width: 38.222 },
  { label: "American Express", icon: payAmex, width: 24 },
  { label: "PayPal Pay in 4", icon: payPaypalPayIn4, width: 94.773 },
  { label: "Apple Pay", icon: payApplePay, width: 37.489 },
  { label: "Afterpay", icon: payAfterpay, width: 69 },
  { label: "Zip", icon: payZip, width: 66 },
  { label: "PayPal Pay in 4", icon: payPaypalPayIn4, width: 94.773 },
  { label: "Flypay", icon: payFlypay, width: 50.25 },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.utility}>
        <div className={styles.scrim} aria-hidden="true" />
        <ul className={styles.utilityRow}>
          {UTILITY_TILES.map((tile) => (
            <li key={tile.label} className={styles.utilityItem}>
              <a className={styles.utilityLink} href={slug(tile.label)}>
                <img
                  className={styles.utilityIcon}
                  src={tile.icon}
                  alt=""
                  width={tile.size}
                  height={tile.size}
                />
                <span>{tile.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.lists}>
        <div className={styles.listsInner}>
          <div className={styles.brandColumn}>
            <section className={styles.brandBlock} aria-labelledby="footer-social">
              <h2 id="footer-social" className={styles.columnTitle}>
                Get Social with Kmart
              </h2>
              <ul className={styles.socialRow}>
                {SOCIAL_LINKS.map((social) => (
                  <li key={social.label}>
                    <a
                      className={styles.socialLink}
                      href={slug(social.label)}
                      aria-label={`Kmart on ${social.label}`}
                    >
                      <img src={social.icon} alt="" width={24} height={24} />
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            <section className={styles.brandBlock} aria-label="Download the Kmart app">
              <p className={styles.columnTitle}>Get Social with Kmart</p>
              <ul className={styles.appRow}>
                {APP_BADGES.map((badge) => (
                  <li key={badge.label}>
                    <a className={styles.appLink} href={slug(badge.label)}>
                      <img
                        src={badge.icon}
                        alt={badge.label}
                        width={badge.width}
                        height={48}
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {LINK_COLUMNS.map((column) => {
            const headingId = `footer-${slug(column.title).slice(1)}`;
            return (
              <nav
                key={column.title}
                className={styles.linkColumn}
                aria-labelledby={headingId}
              >
                <h2 id={headingId} className={styles.columnTitle}>
                  {column.title}
                </h2>
                <ul>
                  {column.links.map((link) => (
                    <li key={link}>
                      <a className={styles.link} href={slug(link)}>
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            );
          })}
        </div>
      </div>

      <div className={styles.checkout}>
        <hr className={styles.divider} />
        <div className={styles.checkoutInner}>
          <img
            className={styles.securedBadge}
            src={badgeFullySecured}
            alt="Fully secured checkout"
            width={143}
            height={32}
          />
          <span className={styles.verticalDivider} aria-hidden="true" />
          <ul className={styles.paymentRow}>
            {PAYMENT_LOGOS.map((logo, index) => (
              <li key={`${logo.label}-${index}`}>
                <img src={logo.icon} alt={logo.label} width={logo.width} height={24} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.legal}>
        <div className={styles.legalInner}>
          <img src={kmartLogo} alt="Kmart" width={125.271} height={40} />
          <p className={styles.copyright}>© Kmart 2022</p>
        </div>
        <div className={styles.ribbon} aria-hidden="true" />
      </div>
    </footer>
  );
}
