import test from 'ava';
import { deckLegal } from "./LegalityEngine";

test('Legal - Standard - Simple deck', t => {
  const simpleDeck = {
    main_deck: [{
      name: "Island",
      type_line: "Basic Land - Island",
      quantity: 60,
      legal_formats: ["standard", "modern", "legacy", "vintage", "commander"]
    }]
  };

  const legality = deckLegal("standard", simpleDeck);
  t.true(legality.legal);
});

test('Illegal - Modern - More than four with sideboard', t => {
  const simpleDeck = {
    main_deck: [{
      name: "Island",
      type_line: "Basic Land - Island",
      quantity: 57,
      legal_formats: ["standard", "modern", "legacy", "vintage", "commander"]
    }, {
      name: "Thoughtseize",
      type_line: "Sorcery",
      quantity: 3,
      legal_formats: ["modern", "legacy", "vintage", "commander"]
    }],
    sideboard: [{
      name: "Thoughtseize",
      type_line: "Sorcery",
      quantity: 2,
      legal_formats: ["modern", "legacy", "vintage", "commander"]
    }]
  };

  const legality = deckLegal("modern", simpleDeck);
  t.false(legality.legal);
});

test('Illegal - Modern - Card not in format', t => {
  const simpleDeck = {
    main_deck: [{
      name: "Island",
      type_line: "Basic Land - Island",
      quantity: 57,
      legal_formats: ["standard", "modern", "legacy", "vintage", "commander"]
    }, {
      name: "Counterspell",
      type_line: "Instant",
      quantity: 3,
      legal_formats: ["legacy", "pauper", "vintage", "commander"]
    }],
    sideboard: []
  };

  const legality = deckLegal("modern", simpleDeck);
  t.false(legality.legal);
});

test('Illegal - Vintage - Two of a restricted card', t => {
  const simpleDeck = {
    main_deck: [{
      name: "Island",
      type_line: "Basic Land - Island",
      quantity: 58,
      legal_formats: ["standard", "modern", "legacy", "vintage", "commander"]
    }, {
      name: "Black Lotus",
      type_line: "Artifact",
      quantity: 2,
      legal_formats: ["vintage"]
    }],
    sideboard: []
  };

  const legality = deckLegal("vintage", simpleDeck);
  t.false(legality.legal);
});

test('Illegal - Vintage - Two of a restricted card with sideboard', t => {
  const simpleDeck = {
    main_deck: [{
      name: "Island",
      type_line: "Basic Land - Island",
      quantity: 59,
      legal_formats: ["standard", "modern", "legacy", "vintage", "commander"]
    }, {
      name: "Black Lotus",
      type_line: "Artifact",
      quantity: 1,
      legal_formats: ["vintage"]
    }],
    sideboard: [{
      name: "Black Lotus",
      type_line: "Artifact",
      quantity: 1,
      legal_formats: ["vintage"]
    }]
  };

  const legality = deckLegal("vintage", simpleDeck);
  t.false(legality.legal);
});

test('Legal - Standard - Simple deck with sideboard', t => {
  const simpleDeck = {
    main_deck: [{
      name: "Island",
      type_line: "Basic Land - Island",
      quantity: 60,
      legal_formats: ["standard", "modern", "legacy", "vintage", "commander"]
    }],
    sideboard: [{
      name: "Island",
      type_line: "Basic Land - Island",
      quantity: 15,
      legal_formats: ["standard", "modern", "legacy", "vintage", "commander"]
    }]
  };

  const legality = deckLegal("standard", simpleDeck);
  t.true(legality.legal);
});

test('Illegal - Standard - Too many cards in sideboard', t => {
  const simpleDeck = {
    main_deck: [{
      name: "Island",
      type_line: "Basic Land - Island",
      quantity: 60,
      legal_formats: ["standard", "modern", "legacy", "vintage", "commander"]
    },
    ],
    sideboard: [{
      name: "Island",
      type_line: "Basic Land - Island",
      quantity: 100,
      legal_formats: ["standard", "modern", "legacy", "vintage", "commander"]
    }]
  };

  const legality = deckLegal("standard", simpleDeck);
  t.false(legality.legal);
});

test('Illegal - Standard - Not enough cards in main deck', t => {
  const simpleDeck = {
    main_deck: [{
        name: "Island",
        type_line: "Basic Land - Island",
        quantity: 50,
        legal_formats: ["standard", "modern", "legacy", "vintage", "commander"]
      }, {
        name: "Thoughtseize",
        type_line: "Sorcery",
        quantity: 10,
        legal_formats: ["modern", "legacy", "vintage", "commander"]
      }
    ]
  };

  const legality = deckLegal("standard", simpleDeck);
  t.false(legality.legal);
});

test('Legal - Commander - Simple deck', t => {
  const simpleDeck = {
    main_deck: [{
      name: "Island",
      type_line: "Basic Land - Island",
      quantity: 99,
      legal_formats: ["standard", "modern", "legacy", "vintage", "commander"]
    }, {
      name: "Thoughtseize",
      type_line: "Sorcery",
      quantity: 1,
      legal_formats: ["modern", "legacy", "vintage", "commander"]
    }]
  };

  const legality = deckLegal("commander", simpleDeck);
  t.true(legality.legal);
});

test('Legal - Modern - Relentless Rats', t => {
  const simpleDeck = {
    main_deck: [{
      name: "Swamp",
      type_line: "Basic Land - Swamp",
      quantity: 10,
      legal_formats: ["standard", "modern", "legacy", "vintage", "commander"]
    }, {
      name: "Relentless Rats",
      type_line: "Creature - Rat",
      quantity: 50,
      legal_formats: ["modern", "legacy", "vintage", "commander"]
    }]
  };

  const legality = deckLegal("modern", simpleDeck);
  t.true(legality.legal);
});

test('Legal - Modern - Seven Dwarves', t => {
  const simpleDeck = {
    main_deck: [{
      name: "Mountain",
      type_line: "Basic Land - Mountain",
      quantity: 56,
      legal_formats: ["standard", "modern", "legacy", "vintage", "commander"]
    }, {
      name: "Seven Dwarves",
      type_line: "Creature - Dwarf",
      quantity: 4,
      legal_formats: ["modern", "legacy", "vintage", "commander"]
    }],
    sideboard: [{
      name: "Seven Dwarves",
      type_line: "Creature - Dwarf",
      quantity: 3,
      legal_formats: ["modern", "legacy", "vintage", "commander"]
    }]
  };

  const legality = deckLegal("modern", simpleDeck);
  t.true(legality.legal);
});

test('Illegal - Modern - Seven Dwarves', t => {
  const simpleDeck = {
    main_deck: [{
      name: "Mountain",
      type_line: "Basic Land - Mountain",
      quantity: 55,
      legal_formats: ["standard", "modern", "legacy", "vintage", "commander"]
    }, {
      name: "Seven Dwarves",
      type_line: "Creature - Dwarf",
      quantity: 5,
      legal_formats: ["modern", "legacy", "vintage", "commander"]
    }],
    sideboard: [{
      name: "Seven Dwarves",
      type_line: "Creature - Dwarf",
      quantity: 5,
      legal_formats: ["modern", "legacy", "vintage", "commander"]
    }]
  };

  const legality = deckLegal("modern", simpleDeck);
  t.false(legality.legal);
});

test('Illegal - Commander - Too many cards', t => {
  const simpleDeck = {
    main_deck: [{
      name: "Island",
      type_line: "Basic Land - Island",
      quantity: 99,
      legal_formats: ["standard", "modern", "legacy", "vintage", "commander"]
    }, {
      name: "Thoughtseize",
      type_line: "Sorcery",
      quantity: 2,
      legal_formats: ["modern", "legacy", "vintage", "commander"]
    }]
  };

  const legality = deckLegal("commander", simpleDeck);
  t.false(legality.legal);
});

test('Illegal - Commander - Has sideboard', t => {
  const simpleDeck = {
    main_deck: [{
      name: "Island",
      type_line: "Basic Land - Island",
      quantity: 100,
      legal_formats: ["standard", "modern", "legacy", "vintage", "commander"]
    }],
    sideboard: [{
      name: "Island",
      type_line: "Basic Land - Island",
      quantity: 15,
      legal_formats: ["standard", "modern", "legacy", "vintage", "commander"]
    }]
  };

  const legality = deckLegal("commander", simpleDeck);
  t.false(legality.legal);
});

test('Illegal - Vintage - Banned cards', t => {
  const simpleDeck = {
    main_deck: [{
      name: "Contract from Below",
      type_line: "Sorcery",
      quantity: 1,
      legal_formats: []
    }, {
      name: "Hymn of the Wilds",
      type_line: "Conspiracy",
      quantity: 4,
      legal_formats: []
    }, {
      name: "Black Lotus",
      type_line: "Artifact",
      quantity: 1,
      legal_formats: ["vintage"]
    }, {
      name: "Island",
      type_line: "Basic Land - Island",
      quantity: 54,
      legal_formats: ["standard", "modern", "legacy", "vintage", "commander"]
    }],
    sideboard: [{
      name: "Island",
      type_line: "Basic Land - Island",
      quantity: 15,
      legal_formats: ["standard", "modern", "legacy", "vintage", "commander"]
    }]
  };

  const legality = deckLegal("vintage", simpleDeck);
  t.false(legality.legal);
});

test('Legal - N/A - Banned cards in other formats', t => {
  const simpleDeck = {
    main_deck: [{
      name: "Contract from Below",
      type_line: "Sorcery",
      quantity: 1,
      legal_formats: []
    }, {
      name: "Hymn of the Wilds",
      type_line: "Conspiracy",
      quantity: 4,
      legal_formats: []
    }, {
      name: "Black Lotus",
      type_line: "Artifact",
      quantity: 1,
      legal_formats: ["vintage"]
    }, {
      name: "Island",
      type_line: "Basic Land - Island",
      quantity: 54,
      legal_formats: ["standard", "modern", "legacy", "vintage", "commander"]
    }],
    sideboard: [{
      name: "Island",
      type_line: "Basic Land - Island",
      quantity: 15,
      legal_formats: ["standard", "modern", "legacy", "vintage", "commander"]
    }]
  };

  const legality = deckLegal(null, simpleDeck);
  t.true(legality.legal);
});
