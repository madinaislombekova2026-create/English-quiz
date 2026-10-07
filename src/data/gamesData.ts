export interface WordMatchPair {
  id: string;
  word: string;
  meaning: string;
}

export interface SentenceBuilderItem {
  id: string;
  words: string[];
  correctSentence: string;
  hint: string;
}

export interface WordScrambleItem {
  id: string;
  scrambled: string;
  answer: string;
  hint: string;
}

export interface TrueFalseItem {
  id: string;
  statement: string;
  isTrue: boolean;
  explanation: string;
}

export interface FillGapItem {
  id: string;
  sentence: string; // e.g. "She _____ to the gym every Tuesday."
  options: string[];
  answer: string;
  explanation: string;
}

export const WORD_MATCH_SETS: WordMatchPair[][] = [
  [
    { id: 'wm1', word: 'Ancient', meaning: 'Extremely old, from historical times' },
    { id: 'wm2', word: 'Furious', meaning: 'Intensely and violently angry' },
    { id: 'wm3', word: 'Patience', meaning: 'Ability to endure waiting calmly' },
    { id: 'wm4', word: 'Hesitant', meaning: 'Unsure or slow in making a decision' },
    { id: 'wm5', word: 'Ubiquitous', meaning: 'Appearing or found everywhere' },
    { id: 'wm6', word: 'Ephemeral', meaning: 'Lasting for only a very brief time' }
  ],
  [
    { id: 'wm7', word: 'Generous', meaning: 'Willing to give freely to others' },
    { id: 'wm8', word: 'Reliable', meaning: 'Consistently dependable and trustworthy' },
    { id: 'wm9', word: 'Ambiguous', meaning: 'Having multiple possible interpretations' },
    { id: 'wm10', word: 'Profound', meaning: 'Very deep insight or understanding' },
    { id: 'wm11', word: 'Obfuscate', meaning: 'To deliberately make something unclear' },
    { id: 'wm12', word: 'Insouciant', meaning: 'Showing a casual lack of concern' }
  ]
];

export const SENTENCE_BUILDER_ITEMS: SentenceBuilderItem[] = [
  {
    id: 'sb-1',
    words: ['every', 'goes', 'school', 'she', 'day', 'to'],
    correctSentence: 'She goes to school every day.',
    hint: 'Subject + Verb + Place + Time'
  },
  {
    id: 'sb-2',
    words: ['never', 'been', 'have', 'London', 'to', 'I'],
    correctSentence: 'I have never been to London.',
    hint: 'Present perfect experience'
  },
  {
    id: 'sb-3',
    words: ['raining', 'heavily', 'it', 'was', 'yesterday'],
    correctSentence: 'It was raining heavily yesterday.',
    hint: 'Past continuous description'
  },
  {
    id: 'sb-4',
    words: ['is', 'ever', 'the', 'book', 'best', 'this', 'read', 'I', 'have'],
    correctSentence: 'This is the best book I have ever read.',
    hint: 'Superlative with present perfect'
  },
  {
    id: 'sb-5',
    words: ['had', 'arrived', 'the', 'we', 'station', 'train', 'left', 'before', 'the'],
    correctSentence: 'The train had left before we arrived at the station.',
    hint: 'Past perfect before past simple'
  },
  {
    id: 'sb-6',
    words: ['seen', 'such', 'have', 'performance', 'a', 'seldom', 'I', 'brilliant'],
    correctSentence: 'Seldom have I seen such a brilliant performance.',
    hint: 'Negative inversion starting with Seldom'
  }
];

export const WORD_SCRAMBLE_ITEMS: WordScrambleItem[] = [
  {
    id: 'ws-1',
    scrambled: 'M R A M R A G',
    answer: 'GRAMMAR',
    hint: 'The systematic rules of a language'
  },
  {
    id: 'ws-2',
    scrambled: 'B U L A R Y V O C A',
    answer: 'VOCABULARY',
    hint: 'The body of words used in a particular language'
  },
  {
    id: 'ws-3',
    scrambled: 'P H E R A E M L',
    answer: 'EPHEMERAL',
    hint: 'Lasting for only a very brief moment'
  },
  {
    id: 'ws-4',
    scrambled: 'N C E P R E T F E',
    answer: 'PERFECT',
    hint: 'Having all the required or desirable elements'
  },
  {
    id: 'ws-5',
    scrambled: 'Q U I O U S U B I T',
    answer: 'UBIQUITOUS',
    hint: 'Present, appearing, or found everywhere'
  },
  {
    id: 'ws-6',
    scrambled: 'V E R S I O N I N',
    answer: 'INVERSION',
    hint: 'Reversing normal subject and verb order for emphasis'
  }
];

export const TRUE_FALSE_ITEMS: TrueFalseItem[] = [
  {
    id: 'tf-1',
    statement: '"I have visited Paris yesterday" is a grammatically correct sentence.',
    isTrue: false,
    explanation: 'False. With specific past time adverbs like "yesterday", use the Past Simple ("I visited"), never the Present Perfect.'
  },
  {
    id: 'tf-2',
    statement: 'The word "information" is an uncountable noun in standard English.',
    isTrue: true,
    explanation: 'True. "Information" is uncountable and cannot be pluralized as "informations".'
  },
  {
    id: 'tf-3',
    statement: '"She don\'t know the answer" is grammatically standard.',
    isTrue: false,
    explanation: 'False. Third-person singular requires "doesn\'t" ("She doesn\'t know").'
  },
  {
    id: 'tf-4',
    statement: 'In the First Conditional, we never use "will" inside the "if" clause.',
    isTrue: true,
    explanation: 'True. We use the Present Simple in the if-clause (e.g. "If it rains, we will stay home").'
  },
  {
    id: 'tf-5',
    statement: '"Although" and "In spite of" follow the exact same grammatical structure.',
    isTrue: false,
    explanation: 'False. "Although" is followed by a full subject + verb clause, whereas "In spite of" is followed by a noun or gerund (-ing).'
  },
  {
    id: 'tf-6',
    statement: '"Hardly had I arrived when the phone rang" is an example of grammatical inversion.',
    isTrue: true,
    explanation: 'True. Negative restrictive fronting triggers subject-auxiliary inversion (Hardly had I...).'
  },
  {
    id: 'tf-7',
    statement: '"He suggested me to read the book" is standard British and American English.',
    isTrue: false,
    explanation: 'False. "Suggest" is not followed by an object pronoun + infinitive. Say "He suggested that I read the book" or "He suggested reading the book".'
  },
  {
    id: 'tf-8',
    statement: 'The adjective "unique" is an absolute adjective and technically does not take "more".',
    isTrue: true,
    explanation: 'True. In strict usage, unique means one of a kind, so something cannot be "more unique".'
  }
];

export const FILL_GAP_ITEMS: FillGapItem[] = [
  {
    id: 'fg-1',
    sentence: 'He _____ tennis every Saturday morning with his colleague.',
    options: ['plays', 'play', 'is playing', 'has played'],
    answer: 'plays',
    explanation: 'Routine or habitual actions use the Present Simple with -s for third-person singular.'
  },
  {
    id: 'fg-2',
    sentence: 'I haven\'t seen Julia _____ last December.',
    options: ['since', 'for', 'during', 'from'],
    answer: 'since',
    explanation: 'Use "since" with a specific point in time (last December).'
  },
  {
    id: 'fg-3',
    sentence: 'If she had studied harder, she _____ passed the entrance examination.',
    options: ['would have', 'will have', 'would had', 'has'],
    answer: 'would have',
    explanation: 'Third conditional result clause takes "would have + past participle".'
  },
  {
    id: 'fg-4',
    sentence: 'The research was _____ by an international team of marine biologists.',
    options: ['conducted', 'concluded', 'contained', 'contracted'],
    answer: 'conducted',
    explanation: 'Research is "conducted" or "carried out".'
  },
  {
    id: 'fg-5',
    sentence: 'Scarcely had the keynote begun _____ the fire alarm sounded.',
    options: ['when', 'than', 'while', 'as'],
    answer: 'when',
    explanation: '"Scarcely had ... when" is the correlative grammatical structure.'
  }
];
