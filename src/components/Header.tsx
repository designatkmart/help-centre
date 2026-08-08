import { useCallback, useRef } from "react";
import kmartLogo from "../assets/logo/kmart-logo.svg";
import dehazeIcon from "../assets/icons/menu-dehaze.svg";
import searchGlyph from "../assets/icons/search.svg";
import sparkleA from "../assets/icons/sparkle-a.svg";
import sparkleB from "../assets/icons/sparkle-b.svg";
import desktopSearchIcon from "../assets/icons/search-header.svg";
import joySparkleIcon from "../assets/icons/joy-sparkle.svg";
import arrowForwardIcon from "../assets/icons/arrow-forward.svg";
import shoppingBagIcon from "../assets/icons/shopping-bag.svg";
import favoriteIcon from "../assets/icons/favorite.svg";
import accountCircleIcon from "../assets/icons/account-circle.svg";
import localShippingIcon from "../assets/icons/local-shipping-white.svg";
import storefrontIcon from "../assets/icons/storefront-white.svg";
import styles from "./Header.module.css";

const STORE_NAME = "Yarrawonga K Hub";
const POSTCODE = "3730";

const NAV_ITEMS: { label: string; tone?: "target" | "officeworks" }[] = [
  { label: "Home & Living" },
  { label: "Womens" },
  { label: "Mens" },
  { label: "Kids & Baby" },
  { label: "Beauty" },
  { label: "Toys" },
  { label: "Tech & Gaming" },
  { label: "Entertainment" },
  { label: "Target", tone: "target" },
  { label: "Officeworks", tone: "officeworks" },
  { label: "Brands" },
  { label: "Online Exclusives" },
];

const BOX_CLASS = {
  10: styles.box10,
  16: styles.box16,
  24: styles.box24,
} as const;

type IconProps = {
  src: string;
  /** Intrinsic size of the exported Figma vector, not the DS frame. */
  w: number;
  h: number;
  box?: keyof typeof BOX_CLASS;
};

function Icon({ src, w, h, box = 24 }: IconProps) {
  return (
    <span className={BOX_CLASS[box]} aria-hidden>
      <img src={src} alt="" width={w} height={h} />
    </span>
  );
}

function KmartLogo({ className }: { className: string }) {
  return (
    <a href="/" className={styles.logoLink} aria-label="Kmart home">
      <img src={kmartLogo} alt="Kmart" className={className} />
    </a>
  );
}

/** Account / Wishlist / Bag — shared by the mobile and desktop headers. */
function UtilityIcons() {
  return (
    <div className={styles.utilityIcons}>
      <button type="button" className={styles.iconButton} aria-label="Account">
        <Icon src={accountCircleIcon} w={20} h={20} />
      </button>
      <button type="button" className={styles.iconButton} aria-label="Wishlist">
        <Icon src={favoriteIcon} w={20} h={18} />
      </button>
      <button type="button" className={styles.iconButton} aria-label="Bag">
        <Icon src={shoppingBagIcon} w={16} h={20} />
      </button>
    </div>
  );
}

function AskJoyButton({ className }: { className?: string }) {
  return (
    <button type="button" className={[styles.askJoy, className].filter(Boolean).join(" ")}>
      <Icon src={joySparkleIcon} w={10} h={10} box={10} />
      Ask Joy
    </button>
  );
}

function Localisation({ className }: { className?: string }) {
  return (
    <div className={[styles.localisation, className].filter(Boolean).join(" ")}>
      <button
        type="button"
        className={styles.localisationItem}
        aria-label={`Deliver to ${POSTCODE}. Change postcode`}
      >
        <Icon src={localShippingIcon} w={15} h={11} box={16} />
        <span className={styles.localisationValue}>{POSTCODE}</span>
      </button>
      <button
        type="button"
        className={styles.localisationItem}
        aria-label={`Shop at ${STORE_NAME}. Change store`}
      >
        <Icon src={storefrontIcon} w={13} h={12} box={16} />
        <span className={styles.localisationValue}>{STORE_NAME}</span>
      </button>
    </div>
  );
}

/** DS "search" frame: magnifier with the two Joy sparkles layered on top. */
function AiSearchIcon() {
  return (
    <span className={styles.searchIcon} aria-hidden>
      <img src={searchGlyph} alt="" className={styles.searchGlyph} width={18} height={18} />
      <img src={sparkleA} alt="" className={styles.searchSparkleA} width={9} height={9} />
      <img src={sparkleB} alt="" className={styles.searchSparkleB} width={3} height={3} />
    </span>
  );
}

export function Header() {
  const navRef = useRef<HTMLDivElement>(null);

  const scrollNav = useCallback(() => {
    const nav = navRef.current;
    if (!nav) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    nav.scrollBy({ left: 240, behavior: reduceMotion ? "auto" : "smooth" });
  }, []);

  return (
    <header className={styles.header}>
      {/* Mobile / tablet — Header (Mobile) - Vertex (434:7226) */}
      <div className={styles.compact}>
        {/* 434:7227 navigation-and-utility */}
        <div className={styles.compactNavRow}>
          <button type="button" className={styles.iconButton} aria-label="Menu">
            <Icon src={dehazeIcon} w={18} h={14} />
          </button>
          <KmartLogo className={styles.logoCompact} />
          <span className={styles.compactSpacer} />
          <UtilityIcons />
        </div>

        {/* 434:7233 search */}
        <div className={styles.compactSearchRow}>
          <form
            className={`${styles.searchField} ${styles.searchFieldCompact}`}
            role="search"
            onSubmit={(event) => event.preventDefault()}
          >
            <AiSearchIcon />
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Tell us what you’re looking for"
              aria-label="Tell us what you’re looking for"
            />
          </form>
          <AskJoyButton className={styles.askJoyCompact} />
        </div>

        {/* 434:7245 localisation */}
        <div className={styles.compactLocalisationRow}>
          <Localisation className={styles.localisationCompact} />
        </div>
      </div>

      {/* Desktop — Header (Desktop) - Default (405:18613) */}
      <div className={styles.desktop}>
        <div className={styles.desktopInner}>
          <div className={styles.searchRow}>
            <KmartLogo className={styles.logoDesktop} />

            <form
              className={styles.searchField}
              role="search"
              onSubmit={(event) => event.preventDefault()}
            >
              <Icon src={desktopSearchIcon} w={18} h={18} />
              <input
                type="text"
                className={styles.searchInput}
                placeholder="Find products, categories & more"
                aria-label="Find products, categories and more"
              />
            </form>

            <AskJoyButton />
            <UtilityIcons />
          </div>

          <div className={styles.navRow}>
            <div className={styles.navScrollArea}>
              <nav className={styles.navList} aria-label="Shop categories" ref={navRef}>
                {NAV_ITEMS.map(({ label, tone }) => (
                  <a
                    key={label}
                    href="#categories"
                    className={[styles.navItem, tone ? styles[tone] : ""]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {label}
                  </a>
                ))}
              </nav>
              <button
                type="button"
                className={styles.navScrollButton}
                onClick={scrollNav}
                aria-label="Show more categories"
              >
                <Icon src={arrowForwardIcon} w={11} h={11} box={16} />
              </button>
            </div>

            <Localisation />
          </div>
        </div>
      </div>
    </header>
  );
}
