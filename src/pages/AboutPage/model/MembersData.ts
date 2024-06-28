import zhansaule from '@/shared/assets/img/Zhansaule.png';
import balgan from '@/shared/assets/img/Balgan.jpg';
import kolesnikov from '@/shared/assets/img/Kolesnikov.png';
import zea from '@/shared/assets/img/z-e-a.jpg';

import bageTeamlead from '@/shared/assets/img/bage-teamlead.svg';
import bageMentor from '@/shared/assets/img/bage-mentor.svg';
import bageFlower from '@/shared/assets/img/bage-flower.svg';
import bageCat from '@/shared/assets/img/bage-cat.svg';

export const MembersData = [
  {
    name: 'Ilya Kolesnikov',
    role: 'Team leader',
    bio: [
      'Ilya cares about the experience, architecture and code quality of the things he builds. His attention to details ensures that the code is readable, maintainable, and extensible.'
    ],
    github: 'https://github.com/K0LESAN',
    photo: kolesnikov,
    bage: bageTeamlead,
    contributions: [
      'Ilya contributed significantly to the frontend project for a plant sales e-commerce site. Here are some of his key accomplishments and effective collaboration techniques that contributed to a successful product:',
      '1. Performance Optimization: Ilya conducted thorough performance testing of the application to ensure that it ran fast and smoothly. This improved the user experience and increased conversion rates.',
      '2. Payment system integration: Ilya successfully integrated various payment systems into the app, which simplified the payment process for customers.',
      'All these factors combined to create a successful frontend e-commerce application for plant sales.'
    ]
  },
  {
    name: 'Baglan Muratbek',
    role: 'Mentor',
    bio: [
      'Many years works as web application developer in large technology companies. Most competent in frontend development with React.js. His successful professional career and experience helped us acheive a great result.'
    ],
    github: 'https://github.com/baglan01',
    photo: balgan,
    bage: bageMentor,
    contributions: [
      'He told us about business processes in the commercial companies and about his recent successful projects.',
      'Gave advice on the implementation of certain architectural aspects.',
      'Helped with the choosing of tools and technological approaches.',
      'He suggested how to better organize work in an agile team and helped to overcome difficulties in the development process.'
    ]
  },
  {
    name: 'Zhansaule Telisheva',
    role: 'Flower',
    bio: [
      "Zhansaule is aspiring to become a dedicated front-end developer with a passion for creating visually appealing and user-friendly interfaces. With a strong foundation in HTML, CSS, and JavaScript, she brings our designs to life and ensures a seamless user experience. Currently, she's enhancing her skills in React and Tailwind CSS, making her a versatile and valuable member of our team."
    ],
    github: 'https://github.com/zhansaulet',
    photo: zhansaule,
    bage: bageFlower,
    contributions: [
      'Zhansaule is aspiring to become a dedicated front-end developer with a passion for creating visually appealing and user-friendly interfaces.',
      'Her primary contributions include developing a secure and user-friendly interface that ensures smooth authentication on the login page, a comprehensive product page featuring image sliders and detailed product information and shopping cart functionality on the catalog page to ensure smooth management of purchases.',
      'She demonstrated collaboration skills, regularly participated in the meetings, and actively improved her performance using feedback on her own work.'
    ]
  },
  {
    name: 'Evgeny Zubkov',
    role: 'Cat',
    bio: [
      'Aspired by web development for some past years. Has a considerable communication skills, but also capable of working alone. Hard-working and has extensive technical knowledge, meanwhile always being open to learning new tools and technologies.'
    ],
    github: 'https://github.com/z-e-a',
    photo: zea,
    bage: bageCat,
    contributions: [
      'Created a user registration form in the e-commerce application.',
      'He developed the base interaction mechanism of the web-application with the backend through the API-queries.',
      'Made a quite enought contribution to the design of the main page of the application, which displays a list of products.',
      'He implemented the ability to search and filter of products.',
      'Created a page with the team members presentation.'
    ]
  }
];
