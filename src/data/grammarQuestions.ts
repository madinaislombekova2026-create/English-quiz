import { Question } from '../types/quiz';

export const GRAMMAR_QUESTIONS: Question[] = [
  // ===================== A1 (BEGINNER) =====================
  {
    id: 'g-a1-1',
    category: 'grammar',
    level: 'A1',
    topic: 'Verb to be',
    question: 'She _____ a doctor at the local clinic.',
    options: ['am', 'is', 'are', 'be'],
    correctAnswer: 'is',
    explanation: "We use 'is' with the singular third-person pronouns he, she, and it."
  },
  {
    id: 'g-a1-2',
    category: 'grammar',
    level: 'A1',
    topic: 'Verb to be',
    question: 'They _____ from Canada.',
    options: ['is', 'are', 'am', 'was be'],
    correctAnswer: 'are',
    explanation: "The plural pronoun 'they' takes 'are' in the present tense."
  },
  {
    id: 'g-a1-3',
    category: 'grammar',
    level: 'A1',
    topic: 'Have / Has',
    question: 'Tom _____ two sisters and a pet rabbit.',
    options: ['have', 'has', 'having', 'is have'],
    correctAnswer: 'has',
    explanation: "Third-person singular subjects (Tom / he) take 'has', while I/you/we/they take 'have'."
  },
  {
    id: 'g-a1-4',
    category: 'grammar',
    level: 'A1',
    topic: 'Have / Has',
    question: 'We _____ a large garden behind our house.',
    options: ['has', 'have', 'haves', 'are have'],
    correctAnswer: 'have',
    explanation: "The subject 'we' takes 'have' in the present simple."
  },
  {
    id: 'g-a1-5',
    category: 'grammar',
    level: 'A1',
    topic: 'Present Simple',
    question: 'She _____ to school every day by bicycle.',
    options: ['go', 'goes', 'going', 'gone'],
    correctAnswer: 'goes',
    explanation: "In the Present Simple with he/she/it, regular verbs ending in -o add -es (go -> goes)."
  },
  {
    id: 'g-a1-6',
    category: 'grammar',
    level: 'A1',
    topic: 'Present Simple',
    question: 'My parents _____ coffee in the morning.',
    options: ['drinks', 'drink', 'drinking', 'is drink'],
    correctAnswer: 'drink',
    explanation: "Plural subjects (my parents = they) use the base form of the verb without -s."
  },
  {
    id: 'g-a1-7',
    category: 'grammar',
    level: 'A1',
    topic: 'Present Continuous',
    question: 'Look! The baby _____ right now.',
    options: ['sleeps', 'is sleeping', 'are sleeping', 'slept'],
    correctAnswer: 'is sleeping',
    explanation: "For actions happening at the moment of speech ('right now'), we use the Present Continuous: be + verb-ing."
  },
  {
    id: 'g-a1-8',
    category: 'grammar',
    level: 'A1',
    topic: 'Present Continuous',
    question: 'What _____ you doing this afternoon?',
    options: ['is', 'are', 'do', 'does'],
    correctAnswer: 'are',
    explanation: "In the Present Continuous question with 'you', the auxiliary verb is 'are'."
  },
  {
    id: 'g-a1-9',
    category: 'grammar',
    level: 'A1',
    topic: 'Past Simple',
    question: 'Yesterday, I _____ a delicious pizza for dinner.',
    options: ['eat', 'ate', 'eaten', 'eating'],
    correctAnswer: 'ate',
    explanation: "'Ate' is the irregular past simple form of 'eat'."
  },
  {
    id: 'g-a1-10',
    category: 'grammar',
    level: 'A1',
    topic: 'Past Simple',
    question: 'They _____ watch the football match last night.',
    options: ["didn't", "don't", "weren't", "no"],
    correctAnswer: "didn't",
    explanation: "To form negative sentences in the Past Simple, use 'did not' (didn't) + base form."
  },
  {
    id: 'g-a1-11',
    category: 'grammar',
    level: 'A1',
    topic: 'Articles',
    question: 'I saw _____ owl sitting on the roof.',
    options: ['a', 'an', 'the', 'no article'],
    correctAnswer: 'an',
    explanation: "We use 'an' before singular countable nouns beginning with a vowel sound (owl = /aʊl/)."
  },
  {
    id: 'g-a1-12',
    category: 'grammar',
    level: 'A1',
    topic: 'Articles',
    question: 'Paris is _____ capital of France.',
    options: ['a', 'an', 'the', 'some'],
    correctAnswer: 'the',
    explanation: "Use 'the' when referring to something unique or specifically defined (the capital of France)."
  },
  {
    id: 'g-a1-13',
    category: 'grammar',
    level: 'A1',
    topic: 'Pronouns',
    question: 'Can you give _____ that book, please? It belongs to me.',
    options: ['I', 'me', 'my', 'mine'],
    correctAnswer: 'me',
    explanation: "We use the object pronoun 'me' after the transitive verb 'give'."
  },
  {
    id: 'g-a1-14',
    category: 'grammar',
    level: 'A1',
    topic: 'Prepositions',
    question: 'The meeting starts _____ 9:00 AM.',
    options: ['on', 'in', 'at', 'by'],
    correctAnswer: 'at',
    explanation: "We use 'at' for specific times of the day (at 9:00 AM, at noon, at midnight)."
  },
  {
    id: 'g-a1-15',
    category: 'grammar',
    level: 'A1',
    topic: 'Can / Can\'t',
    question: 'Mark is an expert swimmer; he _____ swim across the lake.',
    options: ['can', "can't", 'must to', 'is able'],
    correctAnswer: 'can',
    explanation: "'Can' expresses ability and is followed directly by the base verb without 'to'."
  },
  {
    id: 'g-a1-16',
    category: 'grammar',
    level: 'A1',
    topic: 'There is / There are',
    question: '_____ three apples on the kitchen table.',
    options: ['There is', 'There are', 'It is', 'They is'],
    correctAnswer: 'There are',
    explanation: "We use 'There are' with plural countable nouns (three apples)."
  },

  // ===================== A2 (ELEMENTARY) =====================
  {
    id: 'g-a2-1',
    category: 'grammar',
    level: 'A2',
    topic: 'Past Continuous',
    question: 'While I _____ dinner, the telephone rang.',
    options: ['cooked', 'was cooking', 'am cooking', 'were cooking'],
    correctAnswer: 'was cooking',
    explanation: "Use the Past Continuous (was/were + verb-ing) for an ongoing background action interrupted by a shorter action in the Past Simple."
  },
  {
    id: 'g-a2-2',
    category: 'grammar',
    level: 'A2',
    topic: 'Present Perfect',
    question: 'I _____ never _____ to Japan before.',
    options: ['have / been', 'has / been', 'did / go', 'had / went'],
    correctAnswer: 'have / been',
    explanation: "Present Perfect (have/has + past participle) is used to talk about life experiences with 'never'."
  },
  {
    id: 'g-a2-3',
    category: 'grammar',
    level: 'A2',
    topic: 'Future forms',
    question: 'Look at those dark clouds! It _____ rain.',
    options: ['will', 'is going to', 'shall', 'goes to'],
    correctAnswer: 'is going to',
    explanation: "'Be going to' is used for predictions based on clear present physical evidence."
  },
  {
    id: 'g-a2-4',
    category: 'grammar',
    level: 'A2',
    topic: 'Comparatives',
    question: 'A train is usually _____ than a bicycle.',
    options: ['fast', 'faster', 'more fast', 'fastest'],
    correctAnswer: 'faster',
    explanation: "One-syllable adjectives add -er to form the comparative degree (fast -> faster + than)."
  },
  {
    id: 'g-a2-5',
    category: 'grammar',
    level: 'A2',
    topic: 'Superlatives',
    question: 'Mount Everest is the _____ mountain in the world.',
    options: ['higher', 'highest', 'most high', 'more high'],
    correctAnswer: 'highest',
    explanation: "One-syllable adjectives form the superlative with 'the' + -est (high -> highest)."
  },
  {
    id: 'g-a2-6',
    category: 'grammar',
    level: 'A2',
    topic: 'Modal verbs',
    question: 'You _____ wear a seatbelt while driving; it is the law.',
    options: ['should', 'might', 'must', 'can'],
    correctAnswer: 'must',
    explanation: "'Must' expresses a strong obligation or legal rule."
  },
  {
    id: 'g-a2-7',
    category: 'grammar',
    level: 'A2',
    topic: 'First Conditional',
    question: 'If it _____ tomorrow, we will stay at home.',
    options: ['rain', 'rains', 'will rain', 'rained'],
    correctAnswer: 'rains',
    explanation: "In First Conditional sentences, the if-clause uses the Present Simple, while the main clause uses 'will' + base verb."
  },
  {
    id: 'g-a2-8',
    category: 'grammar',
    level: 'A2',
    topic: 'Gerunds and infinitives',
    question: 'I enjoy _____ to classical music while studying.',
    options: ['listen', 'to listen', 'listening', 'listened'],
    correctAnswer: 'listening',
    explanation: "The verb 'enjoy' is always followed by a gerund (-ing form)."
  },
  {
    id: 'g-a2-9',
    category: 'grammar',
    level: 'A2',
    topic: 'Present Perfect',
    question: 'She has lived in Madrid _____ five years.',
    options: ['since', 'for', 'during', 'from'],
    correctAnswer: 'for',
    explanation: "'For' is used with a duration of time (five years), whereas 'since' refers to a specific starting point."
  },
  {
    id: 'g-a2-10',
    category: 'grammar',
    level: 'A2',
    topic: 'Comparatives',
    question: 'This exercise is _____ than the previous one.',
    options: ['more difficult', 'difficulter', 'most difficult', 'as difficult'],
    correctAnswer: 'more difficult',
    explanation: "Adjectives with three or more syllables use 'more' + adjective in comparative structures."
  },

  // ===================== B1 (INTERMEDIATE) =====================
  {
    id: 'g-b1-1',
    category: 'grammar',
    level: 'B1',
    topic: 'Past Perfect',
    question: 'By the time the fire brigade arrived, the fire _____ already destroyed the warehouse.',
    options: ['has', 'had', 'was', 'would'],
    correctAnswer: 'had',
    explanation: "The Past Perfect (had + past participle) indicates an action completed before another past event."
  },
  {
    id: 'g-b1-2',
    category: 'grammar',
    level: 'B1',
    topic: 'Conditionals',
    question: 'If I _____ a million dollars, I would travel around the world.',
    options: ['have', 'had', 'would have', 'had had'],
    correctAnswer: 'had',
    explanation: "In Second Conditional (hypothetical present/future), the if-clause takes the Past Simple, and the result clause takes 'would' + base verb."
  },
  {
    id: 'g-b1-3',
    category: 'grammar',
    level: 'B1',
    topic: 'Passive Voice',
    question: 'The Mona Lisa _____ by Leonardo da Vinci in the early 16th century.',
    options: ['painted', 'was painted', 'has painted', 'is painting'],
    correctAnswer: 'was painted',
    explanation: "Past Simple Passive requires: was/were + past participle (was painted)."
  },
  {
    id: 'g-b1-4',
    category: 'grammar',
    level: 'B1',
    topic: 'Reported Speech',
    question: '"I am leaving tomorrow," he said. He said that he _____ leaving the next day.',
    options: ['is', 'was', 'has been', 'had been'],
    correctAnswer: 'was',
    explanation: "Present Continuous ('am leaving') shifts back into Past Continuous ('was leaving') in reported speech."
  },
  {
    id: 'g-b1-5',
    category: 'grammar',
    level: 'B1',
    topic: 'Relative Clauses',
    question: 'The woman _____ car was stolen called the police immediately.',
    options: ['who', 'whom', 'whose', 'which'],
    correctAnswer: 'whose',
    explanation: "'Whose' is the relative pronoun indicating possession (the woman's car)."
  },
  {
    id: 'g-b1-6',
    category: 'grammar',
    level: 'B1',
    topic: 'Modal verbs',
    question: 'You _____ have eaten so much cake; now you feel sick.',
    options: ["shouldn't", "couldn't", "mustn't", "wouldn't"],
    correctAnswer: "shouldn't",
    explanation: "'Shouldn't have + past participle' expresses criticism or regret about past behavior."
  },
  {
    id: 'g-b1-7',
    category: 'grammar',
    level: 'B1',
    topic: 'Phrasal verbs',
    question: 'We decided to _____ the meeting until next Monday because of the snowstorm.',
    options: ['call off', 'put off', 'give up', 'look after'],
    correctAnswer: 'put off',
    explanation: "'Put off' means to postpone or delay an event."
  },
  {
    id: 'g-b1-8',
    category: 'grammar',
    level: 'B1',
    topic: 'Present Perfect',
    question: 'Have you finished your homework _____? Dinner is almost ready.',
    options: ['already', 'yet', 'still', 'just'],
    correctAnswer: 'yet',
    explanation: "'Yet' is commonly placed at the end of questions and negative statements in the Present Perfect."
  },

  // ===================== B2 (UPPER-INTERMEDIATE) =====================
  {
    id: 'g-b2-1',
    category: 'grammar',
    level: 'B2',
    topic: 'Mixed conditionals',
    question: 'If I had taken your advice yesterday, I _____ in this terrible mess today.',
    options: ["wouldn't be", "wouldn't have been", "hadn't been", "am not"],
    correctAnswer: "wouldn't be",
    explanation: "This mixed conditional pairs a hypothetical past action (had taken) with a present consequence (wouldn't be today)."
  },
  {
    id: 'g-b2-2',
    category: 'grammar',
    level: 'B2',
    topic: 'Inversion',
    question: 'Seldom _____ such an inspiring theatrical performance.',
    options: ['I have seen', 'have I seen', 'I saw', 'did I saw'],
    correctAnswer: 'have I seen',
    explanation: "Negative and restrictive adverbs (seldom, rarely, scarcely) placed at the beginning trigger subject-auxiliary inversion."
  },
  {
    id: 'g-b2-3',
    category: 'grammar',
    level: 'B2',
    topic: 'Advanced passive',
    question: 'The suspect is believed _____ the country two days ago.',
    options: ['to leave', 'to have left', 'leaving', 'having left'],
    correctAnswer: 'to have left',
    explanation: "With reporting verbs in the passive, we use 'to have + past participle' to refer to a prior action."
  },
  {
    id: 'g-b2-4',
    category: 'grammar',
    level: 'B2',
    topic: 'Advanced modal verbs',
    question: 'The streets are soaking wet; it _____ heavily last night.',
    options: ['must rain', 'must have rained', 'should have rained', 'can rain'],
    correctAnswer: 'must have rained',
    explanation: "'Must have + past participle' expresses logical deduction or certainty about a past situation."
  },
  {
    id: 'g-b2-5',
    category: 'grammar',
    level: 'B2',
    topic: 'Advanced conditionals',
    question: 'Had I known about the schedule change, I _____ you right away.',
    options: ['would inform', 'would have informed', 'had informed', 'will inform'],
    correctAnswer: 'would have informed',
    explanation: "Inverted third conditional ('Had I known' = 'If I had known') takes 'would have + past participle' in the result clause."
  },
  {
    id: 'g-b2-6',
    category: 'grammar',
    level: 'B2',
    topic: 'Complex sentences',
    question: 'No sooner had she stepped outside _____ the skies opened and torrential rain fell.',
    options: ['than', 'when', 'that', 'then'],
    correctAnswer: 'than',
    explanation: "'No sooner had ... than' is the correlative conjunction used for immediate sequential actions."
  },

  // ===================== C1 (ADVANCED) =====================
  {
    id: 'g-c1-1',
    category: 'grammar',
    level: 'C1',
    topic: 'Cleft sentences',
    question: 'It was only after examining the ledger _____ the forensic accountant noticed the discrepancies.',
    options: ['when', 'that', 'which', 'than'],
    correctAnswer: 'that',
    explanation: "In 'it-cleft' sentences emphasizing an adverbial or time clause, 'that' is the grammatically standard relative connective."
  },
  {
    id: 'g-c1-2',
    category: 'grammar',
    level: 'C1',
    topic: 'Inversion',
    question: 'Under no circumstances _____ confidential patient records be disclosed without written consent.',
    options: ['may', 'should not', 'are to', 'could they'],
    correctAnswer: 'may',
    explanation: "'Under no circumstances' fronting triggers subject-auxiliary inversion with affirmative modal syntax: 'may [subject] be disclosed'."
  },
  {
    id: 'g-c1-3',
    category: 'grammar',
    level: 'C1',
    topic: 'Emphasis',
    question: 'What intrigued the researchers most _____ the sudden divergence in behavioural patterns.',
    options: ['was', 'were', 'had been being', 'are'],
    correctAnswer: 'was',
    explanation: "Pseudo-cleft 'what-clauses' take a singular linking verb when followed by a singular conceptual noun phrase."
  },
  {
    id: 'g-c1-4',
    category: 'grammar',
    level: 'C1',
    topic: 'Complex clauses',
    question: 'Disturbed though she _____ by the verdict, she maintained complete composure before the press.',
    options: ['was', 'were', 'had', 'did'],
    correctAnswer: 'was',
    explanation: "Concessive inversion follows the pattern: [Adjective] + though / as + [Subject] + verb ('Disturbed though she was')."
  },
  {
    id: 'g-c1-5',
    category: 'grammar',
    level: 'C1',
    topic: 'Formal English',
    question: 'The committee insisted that the Director of Operations _____ in person to clarify the fiscal audit.',
    options: ['testifies', 'testify', 'should testified', 'must testify'],
    correctAnswer: 'testify',
    explanation: "The mandative subjunctive requires the base form of the verb ('testify') after verbs of demand, insistence, or proposal."
  },
  {
    id: 'g-c1-6',
    category: 'grammar',
    level: 'C1',
    topic: 'Advanced grammar',
    question: 'Hardly had the treaty been ratified _____ fresh border disputes erupted.',
    options: ['than', 'when', 'sooner', 'until'],
    correctAnswer: 'when',
    explanation: "'Hardly had ... when' (and 'scarcely had ... when') is the correlative structure indicating immediate succession."
  },

  // ===================== C2 (PROFICIENCY) =====================
  {
    id: 'g-c2-1',
    category: 'grammar',
    level: 'C2',
    topic: 'Academic English',
    question: 'Were it not _____ the decisive intervention of the central bank, catastrophic liquidity default would have ensued.',
    options: ['for', 'with', 'by', 'from'],
    correctAnswer: 'for',
    explanation: "'Were it not for + noun phrase' is the elevated inverted conditional idiom signifying 'if it were not for'."
  },
  {
    id: 'g-c2-2',
    category: 'grammar',
    level: 'C2',
    topic: 'Nuanced grammar structures',
    question: 'So intricate _____ the logistical network that even minor delays triggered system-wide reverberations.',
    options: ['was', 'became it', 'did be', 'had been'],
    correctAnswer: 'was',
    explanation: "'So + adjective' fronted for dramatic emphasis requires inversion: 'So intricate was the logistical network that...'."
  },
  {
    id: 'g-c2-3',
    category: 'grammar',
    level: 'C2',
    topic: 'Complex transformations',
    question: 'Much as she _____ his intellectual rigor, she found his interpersonal conduct imperious.',
    options: ['admired', 'had admiring', 'admires to', 'would admire'],
    correctAnswer: 'admired',
    explanation: "'Much as [subject] [verb]' acts as an advanced concessive conjunction synonymous with 'although / even though'."
  },
  {
    id: 'g-c2-4',
    category: 'grammar',
    level: 'C2',
    topic: 'Very advanced grammar',
    question: 'Little _____ the delegation suspect that clandestine negotiations were simultaneously underway.',
    options: ['did', 'was', 'could', 'had'],
    correctAnswer: 'did',
    explanation: "Fronted negative adverb 'Little' followed by base lexical verb 'suspect' requires dummy auxiliary 'did' ('Little did the delegation suspect')."
  },
  {
    id: 'g-c2-5',
    category: 'grammar',
    level: 'C2',
    topic: 'Nuanced grammar structures',
    question: 'Come what _____, the legal counsel reaffirmed their unwavering commitment to due process.',
    options: ['will', 'may', 'can', 'should'],
    correctAnswer: 'may',
    explanation: "'Come what may' is a fixed subjunctive idiom meaning 'no matter what happens'."
  },
  {
    id: 'g-c2-6',
    category: 'grammar',
    level: 'C2',
    topic: 'Academic English',
    question: 'Lest any ambiguity _____, the statute explicitly delineates jurisdictional boundaries.',
    options: ['remains', 'remain', 'will remain', 'must remain'],
    correctAnswer: 'remain',
    explanation: "'Lest' introduces a negative purpose clause requiring the present subjunctive (base form: 'remain') or 'should + base'."
  }
];
