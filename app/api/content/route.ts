import { NextResponse } from "next/server";

// dummy data
const posts = [
  {
    title: 'The Future of Web Development',
    slug: 'future-of-web-development',
    content:
      'Web development is evolving rapidly with frameworks like Next.js and tools powered by AI. Staying updated is key to building scalable, modern applications.',
  },
  {
    title: 'Getting Started with JavaScript',
    slug: 'getting-started-with-javascript',
    content:
      'JavaScript is one of the most popular programming languages today. Learn the basics, including variables, functions, and event handling, to start your journey.',
  },
  {
    title: 'Understanding Cloud Computing',
    slug: 'understanding-cloud-computing',
    content:
      'Cloud computing allows businesses to scale resources efficiently. Services like AWS and Azure provide flexibility, security, and cost-effectiveness.',
  },
  {
    title: 'Mastering SQL for Data Management',
    slug: 'mastering-sql-data-management',
    content:
      'SQL is essential for managing and querying relational databases. From SELECT statements to JOIN operations, understanding SQL can boost your backend skills.',
  },
  {
    title: 'Building Responsive UI with Tailwind CSS',
    slug: 'responsive-ui-tailwind-css',
    content:
      'Tailwind CSS makes it easy to create responsive designs quickly. Learn how utility classes help you maintain consistency and speed in front-end development.',
  },
];

export async function GET(){
    return NextResponse.json(posts);
}