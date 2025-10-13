//caching 
// export const dynamic = 'force-dynamic' // always fetches latest data 

export const revalidate = 420; // data updated occassionally, update every 420 secs (rebuild on demand)

// we can also control caching at fetch level 
// fetch(, {cache: 'no-store' or  'force-cache'}). // no-store = never cache, force-cache= always
//shape of data fetching from server
interface Post{
    title: string;
    content: string;
    slug: string;
}


// find dynamic data and render in advance, ideal for dynamic data does not change often 
// recommend regular server side rendering and generatestaticparams as additional optimization for certain types of data 
// and use revalidate to rebuild on demand, this incremental static generation - best of both world 
export async function generateStaticParams(){
    // Use static data for build time to avoid connection issues
    const staticPosts = [
        { slug: 'future-of-web-development' },
        { slug: 'getting-started-with-javascript' },
        { slug: 'understanding-cloud-computing' },
        { slug: 'mastering-sql-data-management' },
        { slug: 'responsive-ui-tailwind-css' },
    ];
    return staticPosts;
}
// local to this file 
interface Props{
    params: Promise<{slug: string}>; // slug as url param
}

export default async function BlogPostsPage(props: Props){
    const params = await props.params
    
    // Use static data that matches the API content
    const staticPosts: Post[] = [
        {
            title: 'The Future of Web Development',
            slug: 'future-of-web-development',
            content: 'Web development is evolving rapidly with frameworks like Next.js and tools powered by AI. Staying updated is key to building scalable, modern applications.',
        },
        {
            title: 'Getting Started with JavaScript',
            slug: 'getting-started-with-javascript',
            content: 'JavaScript is one of the most popular programming languages today. Learn the basics, including variables, functions, and event handling, to start your journey.',
        },
        {
            title: 'Understanding Cloud Computing',
            slug: 'understanding-cloud-computing',
            content: 'Cloud computing allows businesses to scale resources efficiently. Services like AWS and Azure provide flexibility, security, and cost-effectiveness.',
        },
        {
            title: 'Mastering SQL for Data Management',
            slug: 'mastering-sql-data-management',
            content: 'SQL is essential for managing and querying relational databases. From SELECT statements to JOIN operations, understanding SQL can boost your backend skills.',
        },
        {
            title: 'Building Responsive UI with Tailwind CSS',
            slug: 'responsive-ui-tailwind-css',
            content: 'Tailwind CSS makes it easy to create responsive designs quickly. Learn how utility classes help you maintain consistency and speed in front-end development.',
        },
    ];
    
    const post = staticPosts.find((post) => post.slug === params.slug);
    
    // Better null handling instead of non-null assertion
    if (!post) {
        return (
            <div>
                <h1>Post Not Found</h1>
                <p>The blog post you&apos;re looking for doesn&apos;t exist.</p>
            </div>
        );
    }

    return(
        <div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
        </div>
    )
}
