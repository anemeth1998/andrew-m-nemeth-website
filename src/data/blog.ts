export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  /** Short label for display */
  dateLabel: string;
  excerpt: string;
  tags: string[];
  /** Essay body as paragraphs */
  body: string[];
  /** Original 𝕏 thread or syndication link */
  sourceUrl?: string;
  sourceLabel?: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "modern-luddites-on-threads",
    title: "Modern Luddites on Threads",
    date: "2026-08-11",
    dateLabel: "Aug 11, 2026",
    excerpt:
      "Threads has become a safe space for performative anti-AI panic—on a Meta product. A short essay on Luddites, tools, and not making dislike into an identity.",
    tags: ["AI", "Culture", "Technology"],
    sourceUrl: "https://x.com/AndrewMNemeth/status/2087202908014006727",
    sourceLabel: "Original thread on 𝕏",
    body: [
      "Every time I visit Threads, I see how it has become the official safe space for the modern Luddite movement. They post long, earnest threads about how AI is stealing data and using your personal information—on a Meta product.",
      "For those who do not know: the Luddites were members of a 19th-century movement of English workers who protested certain kinds of automated machinery (in their case, looms), worried about employment and other aspects of their place of work.",
      "Two centuries later, spiritual successors to that movement are doing the same thing—with tunnel vision, stronger opinions, and weaker proverbial hammers. In the eyes of the anti-AI crowd, “AI” is almost always described exclusively as the generative AI use of most large language models.",
      "Every previous technology that was supposed to “destroy” jobs and creativity eventually created more of both. Photography was going to kill painting. Recorded music was going to kill live performance. Word processors were going to kill writers. The people who adapted used the new tools.",
      "I’m not saying there are zero legitimate questions about how AI is deployed. I have concerns about who owns the models and what happens to certain forms of labor. I worry about sandboxing and the intent of users—individual and government alike. I worry about those that treat the technology as either a moral absolute or a cartoon villain instead of a tool with tradeoffs.",
      "What I am saying is that turning “I don’t like this particular technology” into a full identity—and performing it on a social network with a notoriously awful history when it comes to data—is both ironic and performative. It reflects the opposite of what most of these people claim to value: seriousness about privacy, power, and consequences.",
      "I recognize that the profitability for companies like OpenAI, Anthropic, and xAI (now SpaceXAI) comes not only from enterprise subscriptions and API usage, but also—like insurance and gym memberships—from public adoption subscriptions that are not used to their full potential.",
      "Still, for the vast majority of individuals, whether they use AI or not is not indicative of their cognitive ability. There are vast swaths of people who use AI for what others would call “smart” work, and the same is true for what people would consider ordinary or even lazy use. The tool does not assign the virtue.",
      "Whether you like it or not, artificial intelligence is here to stay. You don’t have to like it. Avoiding it entirely—or refusing useful tools out of principle—is the wrong move. Nor should you restrict yourself to tasks that can be expedited when those tools can leave you more time for creativity.",
      "Bill Maher once said you can’t fight the future—something I think this movement is failing to realize. He has also criticized how AI can hollow out the academic loop between students and professors. The point lands either way: the future arrives; the question is how you meet it.",
      "There’s no hiding it: I am a big fan of artificial intelligence for a multitude of reasons. But just as you should not completely write off AI, you should not use it as a crutch for absolutely everything in your life. Use it to craft better drafts, faster experiments, and clearer thinking—not to outsource the parts of life that make you human.",
      "The mysteries of mathematics and science can, at times, be captured in an LLM. The beauty of the human soul cannot. And for that reason—much like we were taught as children not to speak to strangers—I think it is important that everyone today learn the risks of AI.",
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getAllPosts(): BlogPost[] {
  return [...BLOG_POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));
}
