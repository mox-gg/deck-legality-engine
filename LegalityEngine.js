import { keyBy, forOwn, has, mergeWith } from "lodash";

const vintageRestricted = [
  "Ancestral Recall",
  "Balance",
  "Black Lotus",
  "Brainstorm",
  "Chalice of the Void",
  "Channel",
  "Demonic Consultation",
  "Demonic Tutor",
  "Dig Through Time",
  "Flash",
  "Gitaxian Probe",
  "Golgari Grave-Troll",
  "Gush",
  "Imperial Seal",
  "Karn, the Great Creator",
  "Library of Alexandria",
  "Lion's Eye Diamond",
  "Lodestone Golem",
  "Lotus Petal",
  "Mana Crypt",
  "Mana Vault",
  "Memory Jar",
  "Mental Misstep",
  "Merchant Scroll",
  "Mind's Desire",
  "Monastery Mentor",
  "Mox Emerald",
  "Mox Jet",
  "Mox Pearl",
  "Mox Ruby",
  "Mox Sapphire",
  "Mystical Tutor",
  "Mystic Forge",
  "Necropotence",
  "Ponder",
  "Sol Ring",
  "Strip Mine",
  "Thorn of Amethyst",
  "Timetwister",
  "Time Vault",
  "Time Walk",
  "Tinker",
  "Tolarian Academy",
  "Treasure Cruise",
  "Trinisphere",
  "Vampiric Tutor",
  "Wheel of Fortune",
  "Windfall",
  "Yawgmoth's Will"
];

const noMaximumCards = [
  "Persistent Petitioners",
  "Rat Colony",
  "Relentless Rats",
  "Shadowborn Apostle"
];

export const formatOptions = [
  { text: "N/A", value: null, minCards: 0, maxSideboard: 0 },
  { text: "Standard", value: "standard", minCards: 60, maxSideboard: 15, maxSingleCard: 4 },
  { text: "Modern", value: "modern", minCards: 60, maxSideboard: 15, maxSingleCard: 4 },
  { text: "Legacy", value: "legacy", minCards: 60, maxSideboard: 15, maxSingleCard: 4 },
  { text: "Vintage", value: "vintage", minCards: 60, maxSideboard: 15, maxSingleCard: 4, restrictedList: vintageRestricted },
  { text: "Commander", value: "commander", minCards: 100, maxCards: 100, maxSideboard: 0, maxSingleCard: 1 },
  { text: "Pauper", value: "pauper", minCards: 60, maxSideboard: 15, maxSingleCard: 4 }
];

export const dropdownOptions = [
  { text: "N/A", value: null },
  { text: "Standard", value: "standard" },
  { text: "Modern", value: "modern" },
  { text: "Legacy", value: "legacy" },
  { text: "Vintage", value: "vintage" },
  { text: "Commander", value: "commander" },
  { text: "Pauper", value: "pauper" }
];

const formatInfo = keyBy(formatOptions, "value");

const processSection = (deck_section, deckFormat) => {
  const formatRules = formatInfo[deckFormat];
  let errors = [];
  let cards = {};
  let section_count = 0;

  if (deck_section) {
    for (let i = 0; i < deck_section.length; i++) {
      const card = deck_section[i];
      section_count += card.quantity;
      if (cardTypes(card.type_line).includes("Basic", "Land")) {
        continue;
      }

      if(has(cards, card.name)) {
        cards[card.name] += card.quantity;
      }
      else {
        cards[card.name] = card.quantity;
      }

      if (!card.legal_formats.includes(deckFormat)) {
        errors.push(`${card.name} is not legal in ${formatRules.text}.`);
      }
    }
  }

  return {
    errors,
    cards,
    section_count
  }
};

export const deckLegal = (deckFormat, {main_deck, sideboard}) => {
  const formatRules = formatInfo[deckFormat];

  const processed_main_deck = processSection(main_deck, deckFormat);
  const processed_sideboard = processSection(sideboard, deckFormat);
  let errors = processed_main_deck.errors.concat(processed_sideboard.errors);

  const cards = mergeWith(processed_main_deck.cards, processed_sideboard.cards, (src, dest) => {
    return src + dest;
  });

  if (processed_main_deck.section_count < formatRules.minCards) {
    errors.push(`${formatRules.text} requires a minimum of ${formatRules.minCards} cards`);
  }

  if (processed_main_deck.section_count > formatRules.maxCards) {
    errors.push(`${formatRules.text} has a maximum of ${formatRules.maxCards} cards`);
  }

  if (processed_sideboard.section_count > formatRules.maxSideboard) {
    errors.push(`${formatRules.text} has a maximum of ${formatRules.maxSideboard} sideboard cards`);
  }

  forOwn(cards, (value, key) => {
    if (value > formatRules.maxSingleCard && !noMaximumCards.includes(key)) {
      errors.push(`You may not have more than ${formatRules.maxSingleCard} copies of ${key}`);
    }

    if (value > 1 && formatRules.restrictedList && formatRules.restrictedList.includes(key)) {
      errors.push(`You may not have more than 1 copy of ${key}`);
    }
  });

  return {
    errors,
    legal: errors.length === 0
  }
};

export const cardTypes = (typeLine) => {
  return typeLine.split("—")
    .shift()
    .trim()
    .split(" ");
};
