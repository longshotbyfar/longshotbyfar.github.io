import { lexicon } from './lexicon.js';
import { verbForms } from './verbforms.js';

const dreamlikeTemplates = [
    "The {adj} {noun} {verb_past} the {adj_2} {noun_2}.",
    "If the {noun} {verb_s}, then the {noun_2} will {verb_p_2}.",
    "After the {noun}, {noun_2} {verb_past} under {adj} {noun_3}.",
    "{noun} is {adj}, but {noun_2} is {adj_2}.",
    "While the {adj} {noun} {verb_past}, the {noun_2} {verb_past_2}.",
    "No {noun}, no {noun_2}.",
    "{adj} {noun} of {noun_2} {verb_s} through {noun_3}.",
    "As if {adj} {noun} of {noun_2} {verb_p} through {noun_3}.",
    "Beneath the {adj} {noun}, the {adj_2} {noun_2} {verb_past}.",
    "The {noun} that {verb_past} is not the {noun} that remained.",
    "Sometimes the {adj} {noun} must {verb_p} the {noun} it once loved.",
    "Between {noun} and {noun_2}, only the {adj} {noun} knows.",
    "Each time the {noun} {verb_past}, the {noun} {verb_past_2} again.",
    "What the {noun} {verb_past}, the {adj} {noun} now forgets.",
    "If {noun} is {adj}, then what is {noun_2} to the sky?",
    "The {noun} {verb_s} because the {noun} must {verb_p}.",
    "{adj} {noun}, {adj} {noun_2}, and silence between them.",
    "Once the {noun} {verb_past}, the {adj} {noun} began to {verb_p}.",
    "In the absence of {noun}, the {adj} {noun_2} {verb_past}.",
    "A {noun} {verb_s}, then the {noun} {verb_s} again.",
    "Only the {adj} {noun} remembers what the {noun_2} never {verb_past}.",
    "Where the {noun} ends, the {adj} {noun} begins.",
    "All {noun}s {verb_s}, but this {noun} {verb_past} in reverse.",
    "Had the {adj} {noun} not {verb_past}, the {noun} would still {verb_p}.",
    "No {adj} {noun} survives the second {noun} it meets.",
    "To {verb_p} the {noun} is to forget the {adj} {noun_2}.",
    "Whether the {noun} {verb_s} or sleeps, the {adj} {noun} watches.",
    "What the {noun} {verb_past} is still trapped in the {adj} {noun_2}.",
    "Even as the {noun} {verb_s}, the {noun} {verb_past_2} beneath it."
];

const philosophicalTemplates = [
    "The {noun} is structured like a {noun_2}.", // Lacan
    "When you {verb_p} into the {noun}, the {noun} {verb_s} into you.", // Nietzsche
    "{noun}s are the {adj} road to the {noun_2}.", // Freud
    "You do not {verb_p} the {adj} by {verb_ing} the {noun}, but by {verb_ing_2} the {adj_2} {noun_2}.", // Jung
    "There is no {noun} beyond the {noun_2}.", // Derrida
    "Where there is {noun}, there is {noun_2}.", // Foucault
    "The {noun} has the structure of a {noun_2}.", // Lacan
    "He who has a {noun} can {verb_p} any {noun_2}.", // Nietzsche
    "{noun} is the {verb_ing} of {noun_2} unto the {noun_3}.", // Bataille
    "The {noun} toward the {noun_2} is enough to {verb_p} the {noun_3}.", // Camus
    "The {noun} of {noun_2} only {verb_s} at the fall of {noun_3}.", // Hegel
    "{noun} is the house of {noun_2}.", // Heidegger
    "{noun} is the {noun_2} of {noun_3}.", // Kierkegaard
    "{noun} is the {noun} of the {noun_2}.", // Lacan
    "The {adj} {noun} becomes {adj_2} the day after the {noun_2}.", // Arendt
    "To {verb_p} your {noun} is the only {noun_2}.", // Žižek
    "A {noun} is a {noun_2}: to {verb_p} or to {verb_p_2}.", // Deleuze & Guattari
    "{noun} is condemned to {verb_p}.", // Sartre
    "The {noun} is the {adj} medium for {verb_ing} the {noun_2}.", // Merleau-Ponty
    "The {noun} is more {adj} than the {noun_2}.", // Baudrillard
];

const dialecticTemplates = [
    "The {noun} is only what it {verb_s} in the negation of the {noun_2}.",
    "What appears as {adj} is in truth the {adj_2} of {noun} becoming {noun_2}.",
    "To {verb_p} the {noun} is to reveal its contradiction in the {noun_2}.",
    "The {noun} exists only insofar as it {verb_s} itself as {noun_2}.",
    "In {adj} {noun}, the {noun_2} is already presupposed.",
    "Each {noun} contains within it the {noun_2} it denies.",
    "The truth of the {noun} lies in its failure to {verb_p}.",
    "Nothing is {adj} until it is no longer {adj_2}.",
    "The {noun} must first {verb_p} its own {noun_2} to become itself.",
    "History is the unfolding of the {noun} through the {adj} {noun_2}."
];

const gnosticTemplates = [
    "The {noun} that descends is not the {noun} that returns.",
    "Before the {noun} can rise, it must {verb_p} through the {adj} {noun_2}.",
    "The {adj} {noun} hides the {noun_2} in its heart of silence.",
    "Only the {adj} {noun} remembers the wound of the {noun_2}.",
    "Where the {noun} {verb_s}, the {noun_2} weeps in shadow.",
    "To {verb_p} the {noun} is to forget the origin of the {adj} {noun_2}.",
    "The {noun} beyond the veil is never the {noun} beneath the flesh.",
    "Each {noun} bears the mark of the {adj} {noun_2} it devoured.",
    "In the mirror of {noun}, the {noun_2} becomes its own reflection.",
    "When the {noun} splits, the {noun_2} bleeds into the {adj} sky."
];

// 🪤 Absurd / Dada / Surreal Humor
const absurdTemplates = [
    "If the {noun} {verb_s}, then all {noun_2}s must wear {noun_3}s on Thursdays.",
    "Never trust a {adj} {noun}—it probably ate the {adj_2} {noun_2}.",
    "The {noun} {verb_past} itself so hard it became a {noun_2}.",
    "What the {noun} {verb_past}, the {noun} undid with mayonnaise.",
    "To {verb_p} a {noun} is to {verb_p_2} two {noun_2}s and a hat.",
    "The {adj} {noun} refuses to acknowledge the {noun_2} it married in a fever dream.",
    "All {noun}s are {adj} until you stare at them long enough.",
    "Beneath the {noun}, another {noun} waits with a clipboard and bad intentions.",
    "The {noun} {verb_s} unless observed by a {adj} {noun_2}.",
    "When the {noun} {verb_past}, the {noun_2} applauded and fell over dead.",
    "No {noun} can {verb_p} if it is already late for the {noun_2}.",
    "Only the {adj} {noun} knows where the other sock went.",
    "The {noun} was invented by the {adj} {noun_2} during a lunch break in 1784.",
    "If you {verb_p} the {noun} long enough, it files taxes on your behalf.",
    "The {noun} must be fed or the {noun_2} gets your dreams.",
    "All roads lead to the {noun}, except on {adj} days.",
    "The {noun} that screams the loudest is usually just the {noun_2} in disguise.",
    "Do not {verb_p} the {noun} unless the {adj} {noun_2} says otherwise.",
    "Every {noun} is born with one regret and three spoons.",
    "What crawls in through the {noun} must leave through the {adj} {noun_2} or suffer consequences."
];

function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function inflectVerb(base, formKey) {
    const forms = verbForms?.[base.toLowerCase()];
    return forms?.[formKey] || base;
}

function getVerbFormKey(baseSlot) {
    const map = {
        verb_s:   'present_3s',
        verb_p:   'present_non_3s',
        verb_past:'past',
        verb_ing: 'gerund',
        verb_part:'participle'
    };
    return map[baseSlot] || 'present_non_3s';
}

function fillTemplate(template) {
    const used = {};
    return template.replace(/\{(.*?)\}/g, (_, slot) => {
        if (used[slot]) return used[slot];

        const baseSlot = slot.replace(/_\d+$/, ''); // strip _2, _3 …
        let word;

        if (baseSlot.startsWith('adj')) {
            word = getRandom(lexicon.adj);
        } else if (baseSlot.startsWith('noun')) {
            word = getRandom(lexicon.noun);
        } else if (baseSlot.startsWith('verb')) {
            const formKey = getVerbFormKey(baseSlot);
            const baseVerb = getRandom(lexicon.verb);
            word = inflectVerb(baseVerb, formKey);
        } else {
            word = slot; // unknown slot: echo back
        }

        used[slot] = word;
        return word;
    });
}

export function whisper(templates) {
    if (!templates) {
        const banks = [dreamlikeTemplates, dialecticTemplates, gnosticTemplates, absurdTemplates];
        templates = banks[Math.floor(Math.random() * banks.length)];
    }
    const filled = fillTemplate(getRandom(templates));
    return String(filled[0]).toUpperCase() + String(filled).slice(1);
}
