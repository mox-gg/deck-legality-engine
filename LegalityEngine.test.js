import test from 'ava';
import { deckLegal } from "./LegalityEngine";

test('A simple legal deck', t => {
  const simpleDeck = {
    main_deck: [{
      name: "Island",
      type_line: "Basic Land - Island",
      quantity: 60,
      legal_formats: ["standard", "modern", "legacy", "vintage", "commander"]
    }]
  };

  const legality = deckLegal("standard", simpleDeck);
  t.assert(legality.legal);
});

test('An illegal vintage deck', t => {
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
  t.assert(legality.legal === false);
});

test('A simple legal deck with sideboard', t => {
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
  t.assert(legality.legal);
});

test('An illegal sideboard', t => {
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
  t.assert(legality.legal === false);
});

test('An illegal standard deck', t => {
  const simpleDeck = {
    main_deck: [{
        name: "Island",
        type_line: "Basic Land - Island",
        quantity: 50,
        legal_formats: ["standard", "modern", "legacy", "vintage", "commander"]
      },
      {
        name: "Thoughtseize",
        type_line: "Sorcery",
        quantity: 10,
        legal_formats: ["modern", "legacy", "vintage", "commander"]
      }
    ]
  };

  const legality = deckLegal("standard", simpleDeck);
  t.assert(legality.legal === false);
});

test('A legal commander deck', t => {
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
  t.assert(legality.legal);
});

test('An illegal commander deck', t => {
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
  t.assert(legality.legal === false);
});

test('An illegal commander sideboard', t => {
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
  t.assert(legality.legal === false);
});
