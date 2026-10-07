import { ReadingPassage } from '../types/quiz';

export const READING_PASSAGES: ReadingPassage[] = [
  // ===================== A1 (BEGINNER) =====================
  {
    id: 'read-a1-1',
    level: 'A1',
    title: 'A Day in the Life of Anna',
    topic: 'Daily Routine',
    wordCount: 88,
    text: `Anna is twenty-four years old. She lives in a small apartment in London with her cat, Milo. Every morning, Anna wakes up at seven o'clock. She drinks a warm cup of black tea and eats toast with strawberry jam. 

At eight o'clock, she walks to the city library where she works as an assistant. She loves helping people find good books. In the evening, Anna cooks dinner, listens to acoustic music, and goes to bed at ten o'clock.`,
    questions: [
      {
        id: 'rq-a1-1-1',
        type: 'detail',
        question: 'What time does Anna wake up in the morning?',
        options: ['At six o\'clock', 'At seven o\'clock', 'At eight o\'clock', 'At ten o\'clock'],
        correctAnswer: 'At seven o\'clock',
        explanation: 'The passage explicitly states: "Every morning, Anna wakes up at seven o\'clock."'
      },
      {
        id: 'rq-a1-1-2',
        type: 'true-false',
        question: 'True or False: Anna takes the bus to work.',
        options: ['True', 'False'],
        correctAnswer: 'False',
        explanation: 'The text states: "At eight o\'clock, she walks to the city library", so she walks rather than taking a bus.'
      },
      {
        id: 'rq-a1-1-3',
        type: 'vocabulary',
        question: 'What is Milo in the story?',
        options: ['Anna\'s brother', 'Anna\'s pet cat', 'Her work colleague', 'Her landlord'],
        correctAnswer: 'Anna\'s pet cat',
        explanation: 'The text notes: "She lives in a small apartment in London with her cat, Milo."'
      },
      {
        id: 'rq-a1-1-4',
        type: 'main-idea',
        question: 'What is the main topic of this text?',
        options: ['How to feed cats in London', 'Anna\'s daily habits and work routine', 'The history of London libraries', 'How to prepare strawberry jam'],
        correctAnswer: 'Anna\'s daily habits and work routine',
        explanation: 'The passage describes Anna\'s typical morning, workday at the library, and evening routine.'
      }
    ]
  },

  // ===================== A2 (ELEMENTARY) =====================
  {
    id: 'read-a2-1',
    level: 'A2',
    title: 'Traveling by Green Train',
    topic: 'Travel & Environment',
    wordCount: 135,
    text: `More travelers across Europe are choosing trains instead of airplanes for weekend city breaks. Modern high-speed trains are fast, comfortable, and significantly kinder to the environment. 

Marcus, a university student from Germany, recently traveled from Berlin to Vienna by night train. "I booked a sleeping compartment with two friends," he explains. "We boarded at ten in the evening, read books, slept comfortably, and arrived refreshed in the center of Vienna at eight the following morning."

While train tickets can sometimes be slightly more expensive than budget flights, passengers save money by not paying for an extra hotel night. Furthermore, train stations are conveniently located in city centers, eliminating long bus journeys to distant airports. As climate awareness grows, eco-friendly rail travel continues to expand.`,
    questions: [
      {
        id: 'rq-a2-1-1',
        type: 'main-idea',
        question: 'What is the primary message of this article?',
        options: ['Air travel is becoming obsolete', 'Night trains offer an eco-friendly and convenient travel alternative', 'Vienna is cheaper than Berlin', 'Students should not travel during weekends'],
        correctAnswer: 'Night trains offer an eco-friendly and convenient travel alternative',
        explanation: 'The article highlights how night and high-speed trains provide comfortable, central, and sustainable journeys.'
      },
      {
        id: 'rq-a2-1-2',
        type: 'detail',
        question: 'How did Marcus and his friends save money despite ticket prices?',
        options: ['They received free student meals', 'They avoided paying for a hotel room for that night', 'They booked three years in advance', 'They washed the train windows'],
        correctAnswer: 'They avoided paying for a hotel room for that night',
        explanation: 'The passage says passengers save money because they do not have to pay for an additional hotel night.'
      },
      {
        id: 'rq-a2-1-3',
        type: 'true-false',
        question: 'True or False: Train stations are usually situated far outside city centers.',
        options: ['True', 'False'],
        correctAnswer: 'False',
        explanation: 'The passage states: "train stations are conveniently located in city centers."'
      },
      {
        id: 'rq-a2-1-4',
        type: 'inference',
        question: 'Why are night trains growing in popularity today?',
        options: ['Because people dislike reading books', 'Because passengers care more about reducing carbon emissions', 'Because airplanes are no longer allowed to fly', 'Because there are no cars left in Europe'],
        correctAnswer: 'Because passengers care more about reducing carbon emissions',
        explanation: 'The text connects the shift to trains with increasing environmental and climate awareness.'
      }
    ]
  },

  // ===================== B1 (INTERMEDIATE) =====================
  {
    id: 'read-b1-1',
    level: 'B1',
    title: 'The Art of Mindful Working',
    topic: 'Productivity & Wellbeing',
    wordCount: 185,
    text: `In today's hyper-connected corporate world, the urge to multitask has become almost universal. Workers frequently juggle electronic mail, video calls, social media alerts, and project deadlines all at once. However, cognitive psychologists warn that human brains are not wired for simultaneous complex cognitive tasks; instead, what we describe as multitasking is simply rapid task-switching.

Each switch exacts what researchers term a "cognitive switching penalty." Over time, this fragmented attention causes mental exhaustion, increases the frequency of avoidable mistakes, and diminishes overall creative output. 

To combat this phenomenon, many organizations are adopting "deep work blocks" and digital detox hours. During these scheduled intervals, employees close unnecessary browser tabs, put their smartphones on silent mode, and dedicate sixty to ninety minutes of uninterrupted focus to a single challenging objective. Studies demonstrate that single-tasking not only improves task completion speed by up to forty percent, but also substantially reduces workplace anxiety and fosters genuine job satisfaction.`,
    questions: [
      {
        id: 'rq-b1-1-1',
        type: 'main-idea',
        question: 'What is the main finding regarding multitasking mentioned in the text?',
        options: ['Multitasking makes humans twice as intelligent', 'True multitasking is a myth; task-switching causes mental fatigue and errors', 'Computers should perform all human tasks', 'Email alerts improve employee focus'],
        correctAnswer: 'True multitasking is a myth; task-switching causes mental fatigue and errors',
        explanation: 'The author explains that humans perform rapid task-switching, which creates a cognitive penalty.'
      },
      {
        id: 'rq-b1-1-2',
        type: 'vocabulary',
        question: 'What does the phrase "cognitive switching penalty" refer to?',
        options: ['A monetary fine issued by employers', 'The mental loss of focus and energy when shifting between tasks', 'A software bug in communication apps', 'The time needed to buy a coffee'],
        correctAnswer: 'The mental loss of focus and energy when shifting between tasks',
        explanation: 'It denotes the mental exhaustion and inefficiency resulting from constantly interrupting one task for another.'
      },
      {
        id: 'rq-b1-1-3',
        type: 'detail',
        question: 'How much faster can single-tasking help employees complete tasks?',
        options: ['Up to 10 percent', 'Up to 25 percent', 'Up to 40 percent', 'Up to 90 percent'],
        correctAnswer: 'Up to 40 percent',
        explanation: 'The article mentions: "single-tasking not only improves task completion speed by up to forty percent".'
      },
      {
        id: 'rq-b1-1-4',
        type: 'inference',
        question: 'What can be inferred about future workplace practices?',
        options: ['Companies will mandate 24/7 video calls', 'Structured periods of quiet, focused time will become more common', 'Employees will be forbidden from using computers', 'Companies will eliminate all deadlines'],
        correctAnswer: 'Structured periods of quiet, focused time will become more common',
        explanation: 'Organizations are actively embracing scheduled "deep work blocks" to safeguard attention and productivity.'
      }
    ]
  },

  // ===================== B2 (UPPER-INTERMEDIATE) =====================
  {
    id: 'read-b2-1',
    level: 'B2',
    title: 'Rewilding the Scottish Highlands',
    topic: 'Conservation & Ecology',
    wordCount: 225,
    text: `For centuries, the rugged glens of the Scottish Highlands have been celebrated in romantic poetry as pristine wilderness. In reality, modern ecological science tells a vastly different story: the barren landscape is largely an ecological desert, shaped by excessive sheep grazing, commercial timber monoculture, and the historical eradication of apex predators.

In response, conservationists have embarked on ambitious "rewilding" initiatives across several Highland estates. Rather than traditional preservation—which merely maintains existing ecosystems in static conservation zones—rewilding focuses on restoring self-sustaining ecological processes. Native Caledonian pine, birch, and rowan are being replanted, while artificial drainage ditches from Victorian times are filled in to restore peat bogs capable of sequestering vast quantities of atmospheric carbon.

The most contentious aspect of rewilding, however, surrounds species reintroduction. While the Eurasian beaver has returned successfully, stabilizing river catchments and reducing downstream flooding, proposed reintroductions of the Eurasian lynx and grey wolf have provoked fierce resistance from local pastoral farmers. Farmers fear livestock predation and dispute claims that eco-tourism revenue will adequately offset their economic vulnerabilities. Reconciling rural livelihoods with ecological regeneration remains the pivotal debate of twenty-first-century conservation.`,
    questions: [
      {
        id: 'rq-b2-1-1',
        type: 'main-idea',
        question: 'How does rewilding differ fundamentally from traditional conservation in this context?',
        options: ['Rewilding aims to build urban tourist hotels in glens', 'Rewilding restores dynamic, self-regulating natural processes rather than preserving a static landscape', 'Rewilding promotes timber farming across the UK', 'Traditional conservation requires reintroducing large carnivores'],
        correctAnswer: 'Rewilding restores dynamic, self-regulating natural processes rather than preserving a static landscape',
        explanation: 'The text highlights that rewilding focuses on dynamic restoration of self-sustaining ecological processes.'
      },
      {
        id: 'rq-b2-1-2',
        type: 'vocabulary',
        question: 'In the passage, what does the word "contentious" mean?',
        options: ['Widely accepted without question', 'Causing intense argument or disagreement', 'Inexpensive to implement', 'Botanically diverse'],
        correctAnswer: 'Causing intense argument or disagreement',
        explanation: 'Contentious implies controversial and provoking disputes (as evidenced by farmer resistance).'
      },
      {
        id: 'rq-b2-1-3',
        type: 'detail',
        question: 'Which positive outcome has already been associated with the Eurasian beaver?',
        options: ['Complete elimination of agricultural pests', 'Stabilizing river catchments and mitigating flood risks', 'Increase in commercial sheep herds', 'Immediate extermination of predatory wolves'],
        correctAnswer: 'Stabilizing river catchments and mitigating flood risks',
        explanation: 'The beaver has successfully stabilized river catchments and reduced downstream flooding.'
      },
      {
        id: 'rq-b2-1-4',
        type: 'inference',
        question: 'Why do local farmers view lynx and wolf reintroduction with skepticism?',
        options: ['They believe wild animals will cause drought', 'They fear loss of livestock and doubt tourism profits will compensate them', 'They prefer breeding wolves themselves', 'They believe wolves will displace native beavers'],
        correctAnswer: 'They fear loss of livestock and doubt tourism profits will compensate them',
        explanation: 'Farmers worry about livestock predation and question whether eco-tourism benefits will offset their losses.'
      }
    ]
  },

  // ===================== C1 (ADVANCED) =====================
  {
    id: 'read-c1-1',
    level: 'C1',
    title: 'Algorithmic Epistemology and the Filter Bubble',
    topic: 'Information Theory & Society',
    wordCount: 260,
    text: `The contemporary digital public sphere is governed by algorithmic curation engines calibrated for engagement maximization rather than epistemic fidelity. By systematically prioritizing content that elicits visceral affective responses—predominantly moral outrage and confirmation bias—social media platforms construct insular ideological echo chambers. Users operate within personalized epistemic bubbles, wherein discordant empirical evidence is systematically filtered out or discredited as partisan fabrication.

This algorithmic balkanization fundamentally undermines democratic deliberation. Habermasian communicative rationality presupposes a shared baseline of verifiable facts and a mutual willingness among interlocutors to submit claims to discursive scrutiny. When information ecosystems atomize into disparate realities, the possibility of consensus dissolves. Instead, polarization transforms political competition into an existential struggle, where nuance is penalized and dogmatism is rewarded through amplified social validation.

Remedying this malaise requires rethinking platform governance beyond simplistic content moderation. Structural reforms must address the architectural incentives of algorithmic feeds. Interventions such as friction-inducing design patterns, exposure diversity mandates, and user-configurable recommendation algorithms could reintroduce cognitive deliberation into online discourse. However, such systemic remedies inevitably collide with surveillance capitalism's imperative to maximize user attention time at all costs.`,
    questions: [
      {
        id: 'rq-c1-1-1',
        type: 'main-idea',
        question: 'What is the primary thesis advanced by the author?',
        options: ['Content moderation has solved democratic disinformation', 'Commercial algorithms optimize for engagement over truth, fracturing democratic consensus', 'Social media platforms foster genuine Habermasian communicative rationality', 'Users actively reject all emotional and affective content online'],
        correctAnswer: 'Commercial algorithms optimize for engagement over truth, fracturing democratic consensus',
        explanation: 'The author argues algorithmic architectures prioritize visceral engagement over accuracy, atomizing society into rival epistemic bubbles.'
      },
      {
        id: 'rq-c1-1-2',
        type: 'vocabulary',
        question: 'What is meant by "epistemic fidelity" in the opening sentence?',
        options: ['Fidelity to corporate advertising contracts', 'Adherence to truth, accuracy, and sound knowledge', 'Fast download speeds across cellular networks', 'Loyalty to partisan political institutions'],
        correctAnswer: 'Adherence to truth, accuracy, and sound knowledge',
        explanation: 'Epistemic refers to knowledge and validity; epistemic fidelity means truthfulness and accuracy of facts.'
      },
      {
        id: 'rq-c1-1-3',
        type: 'inference',
        question: 'Why does the author consider mere content moderation insufficient?',
        options: ['Because moderators are too well paid', 'Because moderation targets isolated symptoms rather than underlying algorithmic engagement incentives', 'Because online users already agree on every factual question', 'Because legislation has completely outlawed machine learning'],
        correctAnswer: 'Because moderation targets isolated symptoms rather than underlying algorithmic engagement incentives',
        explanation: 'The text notes that structural reforms must tackle platform architecture and profit models, not just surface content.'
      },
      {
        id: 'rq-c1-1-4',
        type: 'detail',
        question: 'Which of the following is proposed as a structural intervention?',
        options: ['Banning all written language from digital platforms', 'Introducing friction-inducing design patterns and exposure diversity mandates', 'Replacing the internet with print broadsheets', 'Subsidizing advertising click-through bonuses'],
        correctAnswer: 'Introducing friction-inducing design patterns and exposure diversity mandates',
        explanation: 'The author recommends friction-inducing patterns, exposure diversity mandates, and customizable recommendation feeds.'
      }
    ]
  },

  // ===================== C2 (PROFICIENCY) =====================
  {
    id: 'read-c2-1',
    level: 'C2',
    title: 'The Paradox of Historical Determinism',
    topic: 'Philosophy & Historiography',
    wordCount: 290,
    text: `Historiographical discourse has long oscillated between teleological determinism and radical contingency. The nineteenth-century positivist tradition posited that human societies evolve along inexorable developmental trajectories governed by sociological laws analogous to Newtonian mechanics. From this vantage, historical events—no matter how cataclysmic—are merely epiphenomenal manifestations of subterranean material, demographic, or economic undercurrents. Individual volition is relegated to an incidental ripple upon a predetermined tidal surge.

Conversely, the twentieth-century disillusionment with grand metanarratives provoked a sharp epistemological recalibration toward contingency. Micro-historians demonstrated that minute, serendipitous occurrences—a delayed diplomatic dispatch, an unseasonable downpour on a battlefield, or an assassin's erratic detour—can shatter presumptive trajectories and reorient geopolitical landscapes. This chaotic sensitivity to initial conditions resonates with non-linear dynamical systems theory, suggesting that human history resists deterministic extrapolation.

Yet an uncritical surrender to pure stochasticity proves equally intellectually bankrupt. To reduce the human chronicle to an arbitrary sequence of accidents ignores the undeniable coercive momentum of institutional inertia, ecological thresholds, and deeply sedimented cultural paradigms. The historian's task is thus dialectical: to discern the structural scaffolding that delimits the realm of the possible, while simultaneously honoring the genuine, if circumscribed, potency of human agency within those structural frontiers.`,
    questions: [
      {
        id: 'rq-c2-1-1',
        type: 'main-idea',
        question: 'Which synthesis does the author advocate regarding historical methodology?',
        options: ['Absolute adherence to nineteenth-century Newtonian positivism', 'A dialectical integration that acknowledges structural constraints while preserving room for contingency and human agency', 'Total dismissal of all institutional and cultural structures as meaningless', 'Abandoning historiography entirely in favor of chaos mathematics'],
        correctAnswer: 'A dialectical integration that acknowledges structural constraints while preserving room for contingency and human agency',
        explanation: 'The conclusion explicitly advocates a dialectic balancing structural scaffolding against circumscribed human agency.'
      },
      {
        id: 'rq-c2-1-2',
        type: 'vocabulary',
        question: 'In the passage, what does "epiphenomenal" signify?',
        options: ['Primary, essential, and causally fundamental', 'Secondary, derivative, or a byproduct of an underlying process', 'Unprecedented in military history', 'Scientifically fabricated by biased observers'],
        correctAnswer: 'Secondary, derivative, or a byproduct of an underlying process',
        explanation: 'An epiphenomenon is a secondary phenomenon that occurs alongside or as a consequence of a primary causal force.'
      },
      {
        id: 'rq-c2-1-3',
        type: 'inference',
        question: 'Why does the author critique "pure stochasticity"?',
        options: ['Because it fails to account for institutional inertia and entrenched cultural frameworks', 'Because random chance never plays any role in human conflicts', 'Because it relies too heavily on meteorological data', 'Because nineteenth-century philosophers disproved probability'],
        correctAnswer: 'Because it fails to account for institutional inertia and entrenched cultural frameworks',
        explanation: 'The author notes pure randomness overlooks the coercive momentum of institutional, ecological, and cultural paradigms.'
      },
      {
        id: 'rq-c2-1-4',
        type: 'detail',
        question: 'How did nineteenth-century positivists view the role of individual volition?',
        options: ['As the sole catalyst for civilization\'s advancement', 'As an incidental ripple upon a predetermined tidal surge', 'As superior to economic and demographic undercurrents', 'As mathematically identical to non-linear chaos'],
        correctAnswer: 'As an incidental ripple upon a predetermined tidal surge',
        explanation: 'The text notes: "Individual volition is relegated to an incidental ripple upon a predetermined tidal surge."'
      }
    ]
  }
];
