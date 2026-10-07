import { Question } from '../types/quiz';

export const VOCABULARY_QUESTIONS: Question[] = [
  // ===================== A1 (BEGINNER) =====================
  {
    id: 'v-a1-1',
    category: 'vocabulary',
    level: 'A1',
    topic: 'Correct Meaning',
    question: "What does 'ancient' mean?",
    options: ['Very old', 'Very expensive', 'Very small', 'Very modern'],
    correctAnswer: 'Very old',
    explanation: "'Ancient' refers to something from a very long time ago in history, or extremely old."
  },
  {
    id: 'v-a1-2',
    category: 'vocabulary',
    level: 'A1',
    topic: 'Antonyms',
    question: "What is the opposite of 'huge'?",
    options: ['Tiny', 'Heavy', 'Tall', 'Fast'],
    correctAnswer: 'Tiny',
    explanation: "'Huge' means very large, so the opposite is 'tiny' (extremely small)."
  },
  {
    id: 'v-a1-3',
    category: 'vocabulary',
    level: 'A1',
    topic: 'Choose the Correct Word',
    question: 'Please turn on the _____ because it is dark in here.',
    options: ['lamp', 'clock', 'sofa', 'shelf'],
    correctAnswer: 'lamp',
    explanation: "A lamp is an electrical light source used to illuminate a dark room."
  },
  {
    id: 'v-a1-4',
    category: 'vocabulary',
    level: 'A1',
    topic: 'Synonyms',
    question: "Which word means the same as 'glad'?",
    options: ['Happy', 'Angry', 'Tired', 'Hungry'],
    correctAnswer: 'Happy',
    explanation: "'Glad' and 'happy' are synonyms expressing joy or pleasure."
  },
  {
    id: 'v-a1-5',
    category: 'vocabulary',
    level: 'A1',
    topic: 'Fill in the Blank',
    question: 'I usually eat bread and eggs for _____ at 8:00 AM.',
    options: ['breakfast', 'dinner', 'midnight', 'dessert'],
    correctAnswer: 'breakfast',
    explanation: "Breakfast is the first meal eaten in the morning."
  },
  {
    id: 'v-a1-6',
    category: 'vocabulary',
    level: 'A1',
    topic: 'Choose the Correct Word',
    question: 'A person who cuts and styles your hair is a _____.',
    options: ['hairdresser', 'carpenter', 'mechanic', 'dentist'],
    correctAnswer: 'hairdresser',
    explanation: "A hairdresser is a professional who cuts, trims, and styles hair."
  },

  // ===================== A2 (ELEMENTARY) =====================
  {
    id: 'v-a2-1',
    category: 'vocabulary',
    level: 'A2',
    topic: 'Synonyms',
    question: "What is a synonym for 'furious'?",
    options: ['Very angry', 'Very surprised', 'Very quiet', 'Very polite'],
    correctAnswer: 'Very angry',
    explanation: "'Furious' denotes extreme, intense anger."
  },
  {
    id: 'v-a2-2',
    category: 'vocabulary',
    level: 'A2',
    topic: 'Antonyms',
    question: "What is the opposite of 'generous'?",
    options: ['Stingy', 'Brave', 'Gentle', 'Honest'],
    correctAnswer: 'Stingy',
    explanation: "A generous person gives freely; a stingy (or mean) person is unwilling to spend or give."
  },
  {
    id: 'v-a2-3',
    category: 'vocabulary',
    level: 'A2',
    topic: 'Word Formation',
    question: "What is the noun form of the adjective 'patient'?",
    options: ['Patience', 'Patiently', 'Patienthood', 'Patientness'],
    correctAnswer: 'Patience',
    explanation: "The suffix -ence transforms the adjective 'patient' into the abstract noun 'patience'."
  },
  {
    id: 'v-a2-4',
    category: 'vocabulary',
    level: 'A2',
    topic: 'Choose the Correct Word',
    question: 'Before boarding the airplane, you must show your _____ at the gate.',
    options: ['boarding pass', 'receipt', 'driving licence', 'library card'],
    correctAnswer: 'boarding pass',
    explanation: "A boarding pass is the official document that grants permission to board an aircraft."
  },
  {
    id: 'v-a2-5',
    category: 'vocabulary',
    level: 'A2',
    topic: 'Fill in the Blank',
    question: 'I had to borrow money because I was completely _____.',
    options: ['broke', 'broken', 'breaking', 'break'],
    correctAnswer: 'broke',
    explanation: "Informally, being 'broke' means having no money at all."
  },

  // ===================== B1 (INTERMEDIATE) =====================
  {
    id: 'v-b1-1',
    category: 'vocabulary',
    level: 'B1',
    topic: 'Correct Meaning',
    question: "What does 'reliable' mean?",
    options: ['Consistently good in quality or trustworthy', 'Easily frightened', 'Extremely complicated', 'Able to be seen from a distance'],
    correctAnswer: 'Consistently good in quality or trustworthy',
    explanation: "'Reliable' means dependable, trustworthy, and able to be relied on."
  },
  {
    id: 'v-b1-2',
    category: 'vocabulary',
    level: 'B1',
    topic: 'Collocations',
    question: 'Scientists are trying to _____ research into renewable tidal energy.',
    options: ['carry out', 'make out', 'run out', 'set out'],
    correctAnswer: 'carry out',
    explanation: "'Carry out' collocated with 'research' means to conduct or perform an investigation."
  },
  {
    id: 'v-b1-3',
    category: 'vocabulary',
    level: 'B1',
    topic: 'Word Formation',
    question: "Add the correct prefix to make the opposite of 'predictable':",
    options: ['Unpredictable', 'Inpredictable', 'Dispredictable', 'Impredictable'],
    correctAnswer: 'Unpredictable',
    explanation: "The negative prefix 'un-' pairs with predictable to form 'unpredictable'."
  },
  {
    id: 'v-b1-4',
    category: 'vocabulary',
    level: 'B1',
    topic: 'Synonyms',
    question: "Which of the following is closest in meaning to 'hesitant'?",
    options: ['Reluctant', 'Courageous', 'Punctual', 'Obstinate'],
    correctAnswer: 'Reluctant',
    explanation: "'Hesitant' and 'reluctant' both imply holding back due to uncertainty or doubt."
  },
  {
    id: 'v-b1-5',
    category: 'vocabulary',
    level: 'B1',
    topic: 'Fill in the Blank',
    question: 'The traffic was so dense that we were _____ in a jam for over an hour.',
    options: ['stuck', 'held up', 'caught', 'bound'],
    correctAnswer: 'stuck',
    explanation: "'Stuck in a traffic jam' is the natural, frequent English idiom."
  },

  // ===================== B2 (UPPER-INTERMEDIATE) =====================
  {
    id: 'v-b2-1',
    category: 'vocabulary',
    level: 'B2',
    topic: 'Correct Meaning',
    question: "What does 'ambiguous' mean?",
    options: ['Open to more than one interpretation', 'Full of energy and enthusiasm', 'Very clear and evident', 'Showing intense ambition'],
    correctAnswer: 'Open to more than one interpretation',
    explanation: "'Ambiguous' language or statements lack clarity because they can have multiple interpretations."
  },
  {
    id: 'v-b2-2',
    category: 'vocabulary',
    level: 'B2',
    topic: 'Antonyms',
    question: "What is the antonym of 'superficial'?",
    options: ['Profound', 'Trivial', 'Flawed', 'Hasty'],
    correctAnswer: 'Profound',
    explanation: "'Superficial' means shallow or surface-level, whereas 'profound' indicates great depth or insight."
  },
  {
    id: 'v-b2-3',
    category: 'vocabulary',
    level: 'B2',
    topic: 'Collocations',
    question: 'The government pledged to _____ substantial measures to curb inflation.',
    options: ['take', 'make', 'do', 'hold'],
    correctAnswer: 'take',
    explanation: "In English we collocate 'take measures' or 'take steps' to address a problem."
  },
  {
    id: 'v-b2-4',
    category: 'vocabulary',
    level: 'B2',
    topic: 'Word Formation',
    question: "What is the adjective derived from 'neglect' meaning 'careless or paying insufficient attention'?",
    options: ['Negligent', 'Neglectful', 'Negligible', 'Neglecting'],
    correctAnswer: 'Negligent',
    explanation: "'Negligent' denotes failure to take proper care in doing something (frequently in legal and formal registers)."
  },
  {
    id: 'v-b2-5',
    category: 'vocabulary',
    level: 'B2',
    topic: 'Fill in the Blank',
    question: 'His argument was completely _____ and lacked empirical evidence.',
    options: ['flawed', 'fleeting', 'plausible', 'rigorous'],
    correctAnswer: 'flawed',
    explanation: "'Flawed' means having defects, weaknesses, or fundamental errors."
  },

  // ===================== C1 (ADVANCED) =====================
  {
    id: 'v-c1-1',
    category: 'vocabulary',
    level: 'C1',
    topic: 'Correct Meaning',
    question: "What is the definition of 'ephemeral'?",
    options: ['Lasting for a very short time', 'Belonging to the upper atmosphere', 'Eternally constant', 'Incurably melancholy'],
    correctAnswer: 'Lasting for a very short time',
    explanation: "'Ephemeral' comes from Greek and describes transient phenomena that endure for only a fleeting moment."
  },
  {
    id: 'v-c1-2',
    category: 'vocabulary',
    level: 'C1',
    topic: 'Synonyms',
    question: "Which term is synonymous with 'ubiquitous'?",
    options: ['Omnipresent', 'Occasional', 'Conspicuous', 'Unprecedented'],
    correctAnswer: 'Omnipresent',
    explanation: "Both 'ubiquitous' and 'omnipresent' characterize something found or present everywhere."
  },
  {
    id: 'v-c1-3',
    category: 'vocabulary',
    level: 'C1',
    topic: 'Nuanced Choice',
    question: 'The minister made a _____ remark that subtly undermined her rival without overt hostility.',
    options: ['trenchant', 'surreptitious', 'banal', 'boisterous'],
    correctAnswer: 'trenchant',
    explanation: "'Trenchant' describes incisive, vigorous, and keenly perceptive expressions."
  },
  {
    id: 'v-c1-4',
    category: 'vocabulary',
    level: 'C1',
    topic: 'Antonyms',
    question: "What is the precise antonym of 'ostentatious'?",
    options: ['Unassuming', 'Pretentious', 'Gaudy', 'Flamboyant'],
    correctAnswer: 'Unassuming',
    explanation: "'Ostentatious' means boastfully showy or vulgar; 'unassuming' means modest and restrained."
  },
  {
    id: 'v-c1-5',
    category: 'vocabulary',
    level: 'C1',
    topic: 'Word Formation',
    question: "What does the noun 'perniciousness' denote?",
    options: ['The quality of being subtly and progressively harmful', 'The state of absolute perfection', 'The willingness to persevere', 'The propensity toward rapid speech'],
    correctAnswer: 'The quality of being subtly and progressively harmful',
    explanation: "'Pernicious' means having a harmful effect, especially in a gradual or insidious manner."
  },

  // ===================== C2 (PROFICIENCY) =====================
  {
    id: 'v-c2-1',
    category: 'vocabulary',
    level: 'C2',
    topic: 'Academic Lexicon',
    question: "What is the meaning of 'obfuscate'?",
    options: ['To render obscure, unclear, or unintelligible', 'To illuminate with philosophical insight', 'To systematically dismantle an apparatus', 'To appease public dissent through concessions'],
    correctAnswer: 'To render obscure, unclear, or unintelligible',
    explanation: "To obfuscate is to deliberately confuse, cloud, or make something opaque to scrutiny."
  },
  {
    id: 'v-c2-2',
    category: 'vocabulary',
    level: 'C2',
    topic: 'Nuanced Synonyms',
    question: "Which word best matches 'recondite'?",
    options: ['Abstruse', 'Elementary', 'Tenable', 'Laconic'],
    correctAnswer: 'Abstruse',
    explanation: "'Recondite' and 'abstruse' denote subject matter that is profound, obscure, or understood by very few."
  },
  {
    id: 'v-c2-3',
    category: 'vocabulary',
    level: 'C2',
    topic: 'Antonyms',
    question: "What is the antonym of 'sycophantic'?",
    options: ['Imperious', 'Fawning', 'Obsequious', 'Subservient'],
    correctAnswer: 'Imperious',
    explanation: "'Sycophantic' means behaving in an excessively subservient way; 'imperious' means domineering and dictatorial."
  },
  {
    id: 'v-c2-4',
    category: 'vocabulary',
    level: 'C2',
    topic: 'Collocations & Idiom',
    question: 'The treaty was considered a mere _____ designed to placate critics without curbing emissions.',
    options: ['sop', 'gambit', 'panacea', 'canard'],
    correctAnswer: 'sop',
    explanation: "A 'sop' (e.g. 'a sop to public opinion') is a concession given to pacify or bribe someone of minor importance."
  },
  {
    id: 'v-c2-5',
    category: 'vocabulary',
    level: 'C2',
    topic: 'Literary Lexicon',
    question: "What does an 'insouciant' attitude convey?",
    options: ['Casual lack of concern or indifference', 'Severe moral indignation', 'Deep existential angst', 'Meticulous diligence'],
    correctAnswer: 'Casual lack of concern or indifference',
    explanation: "'Insouciance' is carefree nonchalance or nonchalant unconcern."
  }
];
