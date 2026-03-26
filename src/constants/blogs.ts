import { ImageSourcePropType } from 'react-native';

const FIGMA_BLOG_1 = require('../assets/figma/blog1.png');

export type BlogCategory = 'Preventive Care' | 'Chronic Conditions' | 'Lifestyle' | 'Wellness';

export type BlogItem = {
  id: string;
  title: string;
  description: string;
  category: BlogCategory;
  image: ImageSourcePropType;
  content: string[];
};

export const BLOG_CATEGORIES: Array<'All' | BlogCategory> = [
  'All',
  'Preventive Care',
  'Chronic Conditions',
  'Lifestyle',
  'Wellness',
];

export const BLOGS: BlogItem[] = [
  {
    id: 'blog-1',
    title: 'Medicine Research',
    description: 'Lorem ipsum dolor sit amet consectetur.',
    category: 'Preventive Care',
    image: FIGMA_BLOG_1,
    content: [
      'Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using lorem ipsum is that it has a more or less normal distribution of letters, as opposed to using content here and there, making it look like readable English.',
      'Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    ],
  },
  {
    id: 'blog-2',
    title: 'Managing Diabetes Better',
    description: 'Simple habits and tests that support long-term sugar control.',
    category: 'Chronic Conditions',
    image: FIGMA_BLOG_1,
    content: [
      'Regular monitoring, balanced meals, and timely lab tests help people manage diabetes with more confidence. Small daily decisions often make the biggest long-term difference.',
      'Keeping follow-up appointments and staying aware of changing symptoms can support better outcomes. Consistency matters more than perfection when building healthy routines.',
      'Your care plan works best when it fits your lifestyle, schedule, and real needs. Practical routines are easier to maintain over time.',
    ],
  },
  {
    id: 'blog-3',
    title: 'Daily Wellness Routine',
    description: 'Small daily routines that improve sleep, focus, and energy.',
    category: 'Lifestyle',
    image: FIGMA_BLOG_1,
    content: [
      'Wellness habits do not need to be dramatic to be effective. Better hydration, steady sleep, and mindful movement can improve how you feel every day.',
      'Simple routines are easier to repeat, and repetition is what creates lasting change. Start with a small step and let it compound.',
      'Healthier days are often built from simple patterns that support energy, recovery, and emotional balance.',
    ],
  },
  {
    id: 'blog-4',
    title: 'Nutrition For Strong Immunity',
    description: 'Food choices that help you feel stronger and recover faster.',
    category: 'Wellness',
    image: FIGMA_BLOG_1,
    content: [
      'A balanced plate with protein, fiber, and colorful vegetables gives your body a stronger foundation. Nutrition plays a steady supporting role in everyday health.',
      'Rather than chasing extremes, most people benefit from sustainable choices they can follow consistently. Gentle improvements often outperform strict short-term plans.',
      'Pairing nutritious meals with proper rest and hydration supports resilience during busy weeks and seasonal changes.',
    ],
  },
  {
    id: 'blog-5',
    title: 'Annual Health Checkups Matter',
    description: 'Why preventive screening catches issues before symptoms appear.',
    category: 'Preventive Care',
    image: FIGMA_BLOG_1,
    content: [
      'Annual health checkups create a useful baseline and help identify silent risks early. Preventive care is often most valuable before symptoms appear.',
      'Screening and timely diagnostics can help people act sooner, ask better questions, and make informed decisions with their doctors.',
      'A proactive health routine is not about fear. It is about staying informed and giving yourself more options over time.',
    ],
  },
];
