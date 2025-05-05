import { Course, Comment, Material, LeaderboardEntry, Question } from '../types';

export const currentUser = {
  id: 'user-001',
  name: 'John Doe',
  avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
};

export const mockCourse: Course = {
  id: 'course-001',
  title: 'Starting SEO on your Home Based Business',
  description: 'Learn how to optimize your website for search engines and improve your visibility online.',
  progress: 35,
  modulesCompleted: 1,
  modules: [
    {
      id: 'module-001',
      title: 'Course Introduction',
      lessons: [
        {
          id: 'lesson-001',
          title: 'Welcome to the Course',
          duration: '3:45',
          isCompleted: true,
          type: 'video',
          videoUrl: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
          posterUrl: 'https://images.pexels.com/photos/4145153/pexels-photo-4145153.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        {
          id: 'lesson-002',
          title: 'What You Will Learn',
          duration: '5:20',
          isCompleted: true,
          type: 'video',
          videoUrl: 'https://samplelib.com/lib/preview/mp4/sample-10s.mp4',
          posterUrl: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        }
      ]
    },
    {
      id: 'module-002',
      title: 'SEO Fundamentals',
      lessons: [
        {
          id: 'lesson-003',
          title: 'What is SEO?',
          duration: '8:30',
          isCompleted: true,
          type: 'video',
          videoUrl: 'https://samplelib.com/lib/preview/mp4/sample-15s.mp4',
          posterUrl: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        {
          id: 'lesson-004',
          title: 'On-page vs Off-page SEO',
          duration: '12:15',
          isCompleted: false,
          type: 'video',
          videoUrl: 'https://samplelib.com/lib/preview/mp4/sample-20s.mp4',
          posterUrl: 'https://images.pexels.com/photos/106344/pexels-photo-106344.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        {
          id: 'lesson-005',
          title: 'SEO Quiz',
          duration: '10 min',
          isCompleted: false,
          type: 'quiz'
        }
      ]
    },
    {
      id: 'module-003',
      title: 'Keyword Research',
      lessons: [
        {
          id: 'lesson-006',
          title: 'Finding the Right Keywords',
          duration: '15:45',
          isCompleted: false,
          type: 'video',
          videoUrl: 'https://samplelib.com/lib/preview/mp4/sample-30s.mp4',
          posterUrl: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        {
          id: 'lesson-007',
          title: 'Keyword Research Tools',
          duration: '10:20',
          isCompleted: false,
          type: 'video',
          videoUrl: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
          posterUrl: 'https://images.pexels.com/photos/6177645/pexels-photo-6177645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        {
          id: 'lesson-008',
          title: 'Long-tail Keywords',
          duration: '8:55',
          isCompleted: false,
          type: 'video',
          videoUrl: 'https://samplelib.com/lib/preview/mp4/sample-10s.mp4',
          posterUrl: 'https://images.pexels.com/photos/6177505/pexels-photo-6177505.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        }
      ]
    },
    {
      id: 'module-004',
      title: 'On-page Optimization',
      lessons: [
        {
          id: 'lesson-009',
          title: 'Title Tags and Meta Descriptions',
          duration: '11:30',
          isCompleted: false,
          type: 'video',
          videoUrl: 'https://samplelib.com/lib/preview/mp4/sample-15s.mp4',
          posterUrl: 'https://images.pexels.com/photos/270360/pexels-photo-270360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        {
          id: 'lesson-010',
          title: 'Header Tags and Content Structure',
          duration: '9:45',
          isCompleted: false,
          type: 'video',
          videoUrl: 'https://samplelib.com/lib/preview/mp4/sample-20s.mp4',
          posterUrl: 'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        {
          id: 'lesson-011',
          title: 'Final Assessment',
          duration: '30 min',
          isCompleted: false,
          type: 'quiz'
        }
      ]
    }
  ]
};

export const mockMaterials: Material[] = [
  {
    id: 'material-001',
    title: 'SEO Fundamentals Guide.pdf',
    type: 'pdf',
    url: 'https://www.africau.edu/images/default/sample.pdf',
    size: '2.4 MB'
  },
  {
    id: 'material-002',
    title: 'Keyword Research Template',
    type: 'file',
    url: '#',
    size: '546 KB'
  },
  {
    id: 'material-003',
    title: 'Google Search Console Tutorial',
    type: 'link',
    url: 'https://developers.google.com/search/docs/fundamentals/search-console-overview'
  },
  {
    id: 'material-004',
    title: 'SEO Best Practices 2025.pdf',
    type: 'pdf',
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    size: '3.8 MB'
  }
];

export const mockComments: Comment[] = [
  {
    id: 'comment-001',
    userId: 'user-002',
    user: {
      id: 'user-002',
      name: 'Emily Johnson',
      avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    text: 'Thanks for explaining the difference between on-page and off-page SEO so clearly. I finally understand it!',
    timestamp: '2025-04-15T09:24:00Z',
    replies: [
      {
        id: 'comment-002',
        userId: 'instructor-001',
        user: {
          id: 'instructor-001',
          name: 'David Wilson',
          avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        text: 'You\'re welcome, Emily! I\'m glad you found it helpful. Let me know if you have any more questions.',
        timestamp: '2025-04-15T10:30:00Z'
      }
    ]
  },
  {
    id: 'comment-003',
    userId: 'user-003',
    user: {
      id: 'user-003',
      name: 'Michael Chen',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    text: 'Do you have any recommendations for keyword research tools that are free or affordable for small businesses?',
    timestamp: '2025-04-16T13:15:00Z'
  }
];

export const mockLeaderboard: LeaderboardEntry[] = [
  {
    id: 'user-004',
    rank: 1,
    user: {
      name: 'Sarah Parker',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    score: 98,
    completionTime: '4h 12m'
  },
  {
    id: 'user-005',
    rank: 2,
    user: {
      name: 'Robert Green',
      avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    score: 95,
    completionTime: '4h 45m'
  },
  {
    id: 'user-006',
    rank: 3,
    user: {
      name: 'Linda Wang',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    score: 92,
    completionTime: '5h 03m'
  },
  {
    id: 'user-001',
    rank: 4,
    user: {
      name: 'John Doe',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    score: 85,
    completionTime: '5h 27m'
  },
  {
    id: 'user-007',
    rank: 5,
    user: {
      name: 'Jessica Miller',
      avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    score: 82,
    completionTime: '5h 30m'
  }
];

export const mockQuestions: Question[] = [
  {
    id: 'question-001',
    text: 'What does SEO stand for?',
    options: [
      { id: 'option-001', text: 'Search Engine Optimization' },
      { id: 'option-002', text: 'Social Engine Organization' },
      { id: 'option-003', text: 'Search Engagement Opportunities' },
      { id: 'option-004', text: 'Site Enhancement Operations' }
    ],
    correctOptionId: 'option-001'
  },
  {
    id: 'question-002',
    text: 'Which of the following is NOT an on-page SEO factor?',
    options: [
      { id: 'option-005', text: 'Meta descriptions' },
      { id: 'option-006', text: 'Backlinks from other websites' },
      { id: 'option-007', text: 'Header tags (H1, H2, etc.)' },
      { id: 'option-008', text: 'Image alt text' }
    ],
    correctOptionId: 'option-006'
  },
  {
    id: 'question-003',
    text: 'What is a long-tail keyword?',
    options: [
      { id: 'option-009', text: 'A keyword with more than 10 characters' },
      { id: 'option-010', text: 'A highly competitive keyword' },
      { id: 'option-011', text: 'A specific, detailed search phrase with lower search volume' },
      { id: 'option-012', text: 'A keyword that takes longer to rank for' }
    ],
    correctOptionId: 'option-011'
  },
  {
    id: 'question-004',
    text: 'Which of the following is a valid title tag format?',
    options: [
      { id: 'option-013', text: '<title>Page Title</title>' },
      { id: 'option-014', text: '<heading>Page Title</heading>' },
      { id: 'option-015', text: '<meta title="Page Title">' },
      { id: 'option-016', text: '<head-title>Page Title</head-title>' }
    ],
    correctOptionId: 'option-013'
  },
  {
    id: 'question-005',
    text: 'What is the ideal length for a meta description?',
    options: [
      { id: 'option-017', text: '50-100 characters' },
      { id: 'option-018', text: '150-160 characters' },
      { id: 'option-019', text: '200-250 characters' },
      { id: 'option-020', text: '300-350 characters' }
    ],
    correctOptionId: 'option-018'
  }
];