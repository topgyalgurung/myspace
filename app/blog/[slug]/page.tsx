//caching 
// export const dynamic = 'force-dynamic' // always fetches latest data 
export const revalidate = 420; // data updated occassionally, update every 420 secs
// we can also control caching at fetch level 
    // fetch(, {cache: 'no-store' or  'force-cache'}). // no-store = never cache, force-cache= always


//shape of data fetching from server
interface Post{
    title: string;
    content: string;
    slug: string;
}

// local to this file 
interface Props{
    params: {slug: string}; // slug as url param
}

export default async function BlogPostsPage({params}: Props){
    // dedupled 
    const posts:Post[] = await fetch('http://localhost:3000/api/content').then(
        (res) => res.json()
    );
    const post = posts.find((post) => post.slug === params.slug)!;
    // "!"" = non-null assertion in TS, we sure we wont have null value, use sparringly
// better is check null value at runtime and throw error if data not found
    // if we go to /blog/not-existing-slug -> will get runtime error calling title on object undefined -> danger of null assertion operator

    return(
        <div>
            <h1> {post.title}</h1>
            <p> {post.content}</p>

        </div>
    )
}
