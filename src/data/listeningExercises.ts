import { ListeningExercise } from '../types/quiz';

export const LISTENING_EXERCISES: ListeningExercise[] = [
  // ===================== A1 (BEGINNER) =====================
  {
    id: 'list-a1-1',
    level: 'A1',
    title: 'Ordering at a Café',
    topic: 'Food & Drinks',
    speakerRole: 'Customer & Barista',
    audioScript: "Hello! Could I please have a cup of black coffee and a warm croissant? How much is that?",
    question: "What did the customer order?",
    options: [
      'A black coffee and a warm croissant',
      'A glass of milk and a chocolate cake',
      'Green tea and a sandwich',
      'An iced latte and an apple'
    ],
    correctAnswer: 'A black coffee and a warm croissant',
    explanation: 'The speaker said: "Could I please have a cup of black coffee and a warm croissant?"'
  },
  {
    id: 'list-a1-2',
    level: 'A1',
    title: 'Asking for Directions',
    topic: 'Around Town',
    speakerRole: 'Tourist',
    audioScript: "Excuse me, where is the nearest supermarket? Is it past the train station on the left?",
    question: "Where does the speaker want to go?",
    options: [
      'To the nearest supermarket',
      'To the bus terminal',
      'To a hotel',
      'To a police station'
    ],
    correctAnswer: 'To the nearest supermarket',
    explanation: 'The speaker explicitly asked: "where is the nearest supermarket?"'
  },
  {
    id: 'list-a1-3',
    level: 'A1',
    title: 'Weekend Plans',
    topic: 'Social Life',
    speakerRole: 'Friend',
    audioScript: "This Saturday, my family and I are going to visit our grandparents in the countryside.",
    question: "What is the speaker doing this Saturday?",
    options: [
      'Visiting grandparents in the countryside',
      'Going shopping in the city center',
      'Staying at home to study English',
      'Traveling by airplane to Spain'
    ],
    correctAnswer: 'Visiting grandparents in the countryside',
    explanation: 'The speaker stated: "my family and I are going to visit our grandparents in the countryside."'
  },

  // ===================== A2 (ELEMENTARY) =====================
  {
    id: 'list-a2-1',
    level: 'A2',
    title: 'Flight Delay Announcement',
    topic: 'Airport Announcement',
    speakerRole: 'Airport Announcer',
    audioScript: "Attention passengers on flight BA 402 to Rome. Due to adverse weather conditions, your departure has been postponed by forty-five minutes. Please wait at Gate 14.",
    question: "Why has the flight to Rome been delayed?",
    options: [
      'Due to adverse weather conditions',
      'Because of mechanical engine maintenance',
      'The pilot arrived late',
      'Due to airport strike action'
    ],
    correctAnswer: 'Due to adverse weather conditions',
    explanation: 'The announcer clearly declared: "Due to adverse weather conditions, your departure has been postponed by forty-five minutes."'
  },
  {
    id: 'list-a2-2',
    level: 'A2',
    title: 'Doctor Appointment',
    topic: 'Health & Care',
    speakerRole: 'Clinic Receptionist',
    audioScript: "Dr. Miller is fully booked this Thursday morning, but she has an open slot at three-thirty on Friday afternoon. Would you like to confirm that appointment?",
    question: "When is the doctor available for an appointment?",
    options: [
      'Friday afternoon at 3:30',
      'Thursday morning at 9:00',
      'Saturday morning at 11:00',
      'Monday afternoon at 2:00'
    ],
    correctAnswer: 'Friday afternoon at 3:30',
    explanation: 'The receptionist confirmed: "she has an open slot at three-thirty on Friday afternoon."'
  },

  // ===================== B1 (INTERMEDIATE) =====================
  {
    id: 'list-b1-1',
    level: 'B1',
    title: 'Remote Work Policy Discussion',
    topic: 'Workplace & Career',
    speakerRole: 'Team Manager',
    audioScript: "While productivity figures remained steady during our trial period of remote work, several department leads expressed concerns regarding team cohesion and onboarding newly hired junior engineers. Consequently, management is recommending a hybrid model requiring two days on-site.",
    question: "What is management proposing as a resolution?",
    options: [
      'A hybrid model requiring two days on-site',
      'A complete return to the office full-time',
      'Allowing staff to work entirely from abroad',
      'Dismissing newly hired junior engineers'
    ],
    correctAnswer: 'A hybrid model requiring two days on-site',
    explanation: 'The manager concluded: "management is recommending a hybrid model requiring two days on-site."'
  },
  {
    id: 'list-b1-2',
    level: 'B1',
    title: 'Podcast on Urban Gardening',
    topic: 'Environment & Lifestyle',
    speakerRole: 'Podcast Host',
    audioScript: "Urban rooftop gardens don't merely generate fresh herbs and organic vegetables; they also mitigate the urban heat island effect by absorbing thermal radiation and providing vital habitats for pollinating insects.",
    question: "According to the speaker, what additional benefit do rooftop gardens offer?",
    options: [
      'They mitigate urban heat and support pollinating insects',
      'They eliminate the need for municipal tap water',
      'They replace city parks entirely',
      'They generate solar electricity for apartment tenants'
    ],
    correctAnswer: 'They mitigate urban heat and support pollinating insects',
    explanation: 'The speaker noted they "mitigate the urban heat island effect" and provide "vital habitats for pollinating insects."'
  },

  // ===================== B2 (UPPER-INTERMEDIATE) =====================
  {
    id: 'list-b2-1',
    level: 'B2',
    title: 'Financial Market Analysis',
    topic: 'Economy & Finance',
    speakerRole: 'Market Analyst',
    audioScript: "Despite aggressive interest rate hikes engineered to tame persistent consumer inflation, equities showed remarkable resilience today, buoyed by robust semiconductor earnings and unexpected consumer spending data.",
    question: "What factor buoyed stock performance today?",
    options: [
      'Robust semiconductor earnings and consumer spending data',
      'A dramatic decrease in corporate taxation',
      'The sudden devaluation of foreign currencies',
      'A halt in interest rate increases by the central bank'
    ],
    correctAnswer: 'Robust semiconductor earnings and consumer spending data',
    explanation: 'The analyst attributed market resilience to "robust semiconductor earnings and unexpected consumer spending data."'
  },
  {
    id: 'list-b2-2',
    level: 'B2',
    title: 'Museum Tour on Impressionism',
    topic: 'Art & History',
    speakerRole: 'Curator',
    audioScript: "Rather than adhering to the rigid academic formalism prevalent in the Salon of Paris, the Impressionists ventured outdoors to capture the fleeting transience of natural light using rapid, visible brushstrokes and unblended pigments.",
    question: "What technique did the Impressionists prioritize?",
    options: [
      'Capturing transient natural light using visible brushstrokes',
      'Strict adherence to the Salon\'s historical painting rules',
      'Working exclusively inside dark, controlled studios',
      'Using black-and-white tonal drawings before painting'
    ],
    correctAnswer: 'Capturing transient natural light using visible brushstrokes',
    explanation: 'The curator stated they ventured outdoors to capture the "fleeting transience of natural light using rapid, visible brushstrokes."'
  },

  // ===================== C1 (ADVANCED) =====================
  {
    id: 'list-c1-1',
    level: 'C1',
    title: 'Academic Keynote on Cognitive Bias',
    topic: 'Psychology & Decision Science',
    speakerRole: 'Professor of Cognitive Science',
    audioScript: "The illusion of explanatory depth refers to our psychological propensity to overestimate the fidelity of our causal understanding regarding complex mechanical or sociopolitical systems, until we are compelled to articulate them in rigorous sequential detail.",
    question: "What constitutes the 'illusion of explanatory depth'?",
    options: [
      'Overestimating how well one understands complex systems until forced to explain them in detail',
      'The inability to remember facts studied during early childhood',
      'A visual defect where depth perception is systematically distorted',
      'Believing that simple systems are impossibly convoluted'
    ],
    correctAnswer: 'Overestimating how well one understands complex systems until forced to explain them in detail',
    explanation: 'The speaker defines it as our tendency to "overestimate the fidelity of our causal understanding... until we are compelled to articulate them in rigorous sequential detail."'
  },

  // ===================== C2 (PROFICIENCY) =====================
  {
    id: 'list-c2-1',
    level: 'C2',
    title: 'Philosophical Discourse on Aesthetics',
    topic: 'Aesthetic Philosophy',
    speakerRole: 'Philosopher',
    audioScript: "To conflate aesthetic appreciation with mere hedonistic gratification is to overlook the sublime: that precarious intersection where human cognition encounters the unfathomable magnitude of the natural cosmos and yields a mixture of awe and profound existential vertigo.",
    question: "According to the speaker, what distinguishes the sublime from mere sensory pleasure?",
    options: [
      'An encounter with unfathomable magnitude eliciting awe and existential vertigo',
      'Its reliance on strict mathematical proportions and symmetrical harmony',
      'The immediate financial valuation attached to high-art auction pieces',
      'Its total detachment from any emotional or cognitive response'
    ],
    correctAnswer: 'An encounter with unfathomable magnitude eliciting awe and existential vertigo',
    explanation: 'The speaker describes the sublime as the "precarious intersection where human cognition encounters the unfathomable magnitude of the natural cosmos and yields a mixture of awe and profound existential vertigo."'
  }
];
