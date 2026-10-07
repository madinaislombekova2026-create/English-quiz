import { WritingExercise } from '../types/quiz';

export const WRITING_EXERCISES: WritingExercise[] = [
  // ===================== A1 (BEGINNER) =====================
  {
    id: 'w-a1-1',
    level: 'A1',
    type: 'word-order',
    topic: 'Sentence Structure',
    prompt: 'Arrange the scrambled words to form a correct English sentence:',
    sentenceToModify: 'every / goes / school / she / day / to',
    acceptableAnswers: [
      'She goes to school every day.',
      'She goes to school every day',
      'Every day she goes to school.',
      'Every day she goes to school'
    ],
    explanation: 'In English, normal word order is Subject (She) + Verb (goes) + Prepositional phrase (to school) + Time expression (every day).',
    hint: 'Start with the subject "She".'
  },
  {
    id: 'w-a1-2',
    level: 'A1',
    type: 'correct-mistake',
    topic: 'Subject-Verb Agreement',
    prompt: 'Correct the grammatical mistake in this sentence:',
    sentenceToModify: 'He do not like drinking cold milk in the morning.',
    acceptableAnswers: [
      'He does not like drinking cold milk in the morning.',
      "He doesn't like drinking cold milk in the morning.",
      'He does not like drinking cold milk in the morning',
      "He doesn't like drinking cold milk in the morning"
    ],
    explanation: 'With singular third-person subjects (he/she/it), the auxiliary verb in the present negative is "does not" (or "doesn\'t"), not "do not".',
    hint: 'Look at the auxiliary verb used with "He".'
  },
  {
    id: 'w-a1-3',
    level: 'A1',
    type: 'complete-sentence',
    topic: 'Prepositions of Place',
    prompt: 'Complete the sentence with the correct preposition:',
    sentenceToModify: 'There is a picture hanging _____ the wall in the living room.',
    acceptableAnswers: [
      'on',
      'on the wall'
    ],
    explanation: 'We use the preposition "on" for flat surfaces such as walls, ceilings, and tables.',
    hint: 'Which preposition is used for surfaces?'
  },

  // ===================== A2 (ELEMENTARY) =====================
  {
    id: 'w-a2-1',
    level: 'A2',
    type: 'rewrite',
    topic: 'Comparatives',
    prompt: 'Rewrite the sentence using "cheaper than" so it means the exact same thing:',
    sentenceToModify: 'The blue jacket is more expensive than the green one.',
    acceptableAnswers: [
      'The green jacket is cheaper than the blue jacket.',
      'The green jacket is cheaper than the blue one.',
      'The green one is cheaper than the blue jacket.',
      'The green one is cheaper than the blue one.',
      'The green jacket is cheaper than the blue jacket',
      'The green jacket is cheaper than the blue one'
    ],
    explanation: 'When inverting an inequality comparative (A is more expensive than B), reverse the subject and object: B is cheaper than A.',
    hint: 'Start with "The green jacket..."'
  },
  {
    id: 'w-a2-2',
    level: 'A2',
    type: 'correct-mistake',
    topic: 'Past Simple Irregular',
    prompt: 'Correct the grammatical error in this past tense sentence:',
    sentenceToModify: 'We buyed a new car last weekend.',
    acceptableAnswers: [
      'We bought a new car last weekend.',
      'We bought a new car last weekend'
    ],
    explanation: '"Buy" has an irregular past simple form: "bought", not "buyed".',
    hint: 'What is the past simple form of "buy"?'
  },

  // ===================== B1 (INTERMEDIATE) =====================
  {
    id: 'w-b1-1',
    level: 'B1',
    type: 'rewrite',
    topic: 'Concessive Clauses (Although)',
    prompt: 'Rewrite these two sentences into one sentence using "although":',
    sentenceToModify: 'It rained heavily all afternoon. We enjoyed our picnic in the park.',
    acceptableAnswers: [
      'Although it rained heavily all afternoon, we enjoyed our picnic in the park.',
      'Although it rained heavily all afternoon, we enjoyed our picnic in the park',
      'We enjoyed our picnic in the park although it rained heavily all afternoon.',
      'We enjoyed our picnic in the park although it rained heavily all afternoon'
    ],
    explanation: '"Although" introduces a subordinate clause of contrast. When the although-clause comes first, it is separated by a comma.',
    hint: 'Start with "Although it rained..." or place "although" between the two clauses.'
  },
  {
    id: 'w-b1-2',
    level: 'B1',
    type: 'rewrite',
    topic: 'Passive Voice',
    prompt: 'Transform this active sentence into the passive voice:',
    sentenceToModify: 'Alexander Fleming discovered penicillin in 1928.',
    acceptableAnswers: [
      'Penicillin was discovered by Alexander Fleming in 1928.',
      'Penicillin was discovered by Alexander Fleming in 1928',
      'Penicillin was discovered in 1928 by Alexander Fleming.',
      'Penicillin was discovered in 1928 by Alexander Fleming'
    ],
    explanation: 'To form the passive in the Past Simple: Object (Penicillin) + was/were + past participle (discovered) + by agent (by Alexander Fleming).',
    hint: 'Start with "Penicillin..."'
  },
  {
    id: 'w-b1-3',
    level: 'B1',
    type: 'correct-mistake',
    topic: 'Conditional Mistake',
    prompt: 'Correct the error in this conditional sentence:',
    sentenceToModify: 'If I will see Sarah tonight, I will give her your message.',
    acceptableAnswers: [
      'If I see Sarah tonight, I will give her your message.',
      'If I see Sarah tonight, I will give her your message',
      'I will give Sarah your message if I see her tonight.',
      'I will give Sarah your message if I see her tonight'
    ],
    explanation: 'In the first conditional, the if-clause uses the Present Simple ("If I see"), never "will".',
    hint: 'Do not use "will" in the if-clause.'
  },

  // ===================== B2 (UPPER-INTERMEDIATE) =====================
  {
    id: 'w-b2-1',
    level: 'B2',
    type: 'rewrite',
    topic: 'Third Conditional',
    prompt: 'Rewrite the situation using a third conditional sentence (If + had + past participle):',
    sentenceToModify: 'I woke up late, so I missed the express train.',
    acceptableAnswers: [
      "If I hadn't woken up late, I wouldn't have missed the express train.",
      "If I had not woken up late, I would not have missed the express train.",
      "I wouldn't have missed the express train if I hadn't woken up late.",
      "I would not have missed the express train if I had not woken up late.",
      "If I hadn't woken up late, I wouldn't have missed the express train",
      "If I had not woken up late, I would not have missed the express train"
    ],
    explanation: 'Third conditional reflects an unreal past condition: If + past perfect (hadn\'t woken up), would have + past participle (wouldn\'t have missed).',
    hint: 'Start with "If I hadn\'t woken up late..."'
  },
  {
    id: 'w-b2-2',
    level: 'B2',
    type: 'rewrite',
    topic: 'Inversion',
    prompt: 'Rewrite this sentence starting with the negative adverb "Rarely":',
    sentenceToModify: 'We have rarely experienced such extreme heatwaves in this region.',
    acceptableAnswers: [
      'Rarely have we experienced such extreme heatwaves in this region.',
      'Rarely have we experienced such extreme heatwaves in this region'
    ],
    explanation: 'Fronting negative adverbs like "Rarely" triggers subject-auxiliary inversion: Rarely + have + we + experienced...',
    hint: 'Place the auxiliary verb "have" immediately after "Rarely".'
  },

  // ===================== C1 (ADVANCED) =====================
  {
    id: 'w-c1-1',
    level: 'C1',
    type: 'rewrite',
    topic: 'Cleft Sentence',
    prompt: 'Rewrite the sentence as a cleft sentence beginning with "What I found most impressive":',
    sentenceToModify: 'Her unwavering dedication to environmental preservation impressed me the most.',
    acceptableAnswers: [
      'What I found most impressive was her unwavering dedication to environmental preservation.',
      'What I found most impressive was her unwavering dedication to environmental preservation'
    ],
    explanation: 'Pseudo-cleft formula: What + clause + was/is + focal noun phrase.',
    hint: 'Use "was" followed by her dedication...'
  },
  {
    id: 'w-c1-2',
    level: 'C1',
    type: 'rewrite',
    topic: 'Concessive Inversion',
    prompt: 'Rewrite using concessive inversion beginning with "Difficult though":',
    sentenceToModify: 'Although the transition to clean energy is difficult, it remains imperative.',
    acceptableAnswers: [
      'Difficult though the transition to clean energy is, it remains imperative.',
      'Difficult though the transition to clean energy is, it remains imperative'
    ],
    explanation: 'Adjective + though + subject + verb: "Difficult though the transition to clean energy is, ..."',
    hint: 'Follow the pattern: Difficult though [subject] is, ...'
  },

  // ===================== C2 (PROFICIENCY) =====================
  {
    id: 'w-c2-1',
    level: 'C2',
    type: 'rewrite',
    topic: 'Inverted Conditional (Were it not for)',
    prompt: 'Rewrite this conditional beginning with "Were it not for":',
    sentenceToModify: 'If Dr. Vance had not intervened, the clinical trial would have collapsed.',
    acceptableAnswers: [
      "Were it not for Dr. Vance's intervention, the clinical trial would have collapsed.",
      "Were it not for the intervention of Dr. Vance, the clinical trial would have collapsed.",
      "Were it not for Dr. Vance, the clinical trial would have collapsed.",
      "Were it not for Dr. Vance's intervention, the clinical trial would have collapsed",
      "Were it not for Dr Vance's intervention, the clinical trial would have collapsed."
    ],
    explanation: '"Were it not for [noun phrase]" is the inverted subjunctive equivalent of "If it were not for" or "Without".',
    hint: 'Begin: "Were it not for Dr. Vance\'s intervention..."'
  },
  {
    id: 'w-c2-2',
    level: 'C2',
    type: 'correct-mistake',
    topic: 'Subjunctive Mandative',
    prompt: 'Correct the subtle register and mood error in this formal legal stipulation:',
    sentenceToModify: 'The treaty stipulates that every signatory state abides by the non-proliferation protocol.',
    acceptableAnswers: [
      'The treaty stipulates that every signatory state abide by the non-proliferation protocol.',
      'The treaty stipulates that every signatory state abide by the non-proliferation protocol'
    ],
    explanation: 'The verb "stipulate" triggers the mandative subjunctive in the that-clause, demanding the base verb form "abide" rather than the indicative "abides".',
    hint: 'Look closely at the verb form of "abide" in subjunctive clauses.'
  }
];
