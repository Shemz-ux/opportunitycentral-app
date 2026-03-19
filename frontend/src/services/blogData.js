// TODO: consider adding a views key to each data point for tracking
const blogPosts = [
  {
    id: 1,
    slug: "future-of-leadership-development",
    title: "The Future of Leadership Development in a Post-Pandemic World",
    excerpt:
      "How organizations are rethinking leadership training to meet the demands of hybrid work, digital transformation, and a new generation of talent.",
    category: "Leadership",
    date: "March 4, 2026",
    readTime: "8 min read",
    image:
      "https://images.unsplash.com/photo-1762968269894-1d7e1ce8894e?w=900&h=600&fit=crop",
    author: "Sarah Bergmann",
    authorRole: "Founder & CEO",
    content: [
      "The landscape of leadership development has shifted dramatically. What once centered on in-person retreats and classroom-style training has evolved into something far more dynamic, flexible, and human-centered.",
      "Organizations that thrived through recent upheavals share a common trait: they invested in developing leaders who can navigate ambiguity, foster psychological safety, and lead with empathy — not just authority.",
      "At Opportunity Central, we've observed three key trends reshaping leadership development across our client base. First, the rise of micro-learning and just-in-time coaching. Leaders no longer have the luxury of stepping away for week-long programs. Instead, they need bite-sized, contextual support woven into their daily workflow.",
      "Second, peer-based learning has overtaken traditional top-down instruction. Our most effective programs create cohorts of leaders who learn from each other's experiences, challenges, and perspectives. This horizontal knowledge transfer is more authentic and stickier than any lecture.",
      "Third, measurement has become paramount. Organizations want to see the ROI of their leadership investments. We've developed proprietary assessment tools that track not just satisfaction scores, but behavioural change, team performance metrics, and cultural indicators over 12-month cycles.",
      "The future belongs to organizations that view leadership development not as a cost centre, but as a strategic advantage. Those who invest now in building adaptive, empathetic, and data-literate leaders will be best positioned to navigate whatever comes next.",
    ],
  },
  {
    id: 2,
    slug: "bridging-education-employment-gap",
    title: "Bridging the Gap Between Education and Employment",
    excerpt:
      "Universities are rethinking career services. Here's what the most innovative institutions are doing differently.",
    category: "Education",
    date: "February 18, 2026",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=900&h=600&fit=crop",
    author: "David Okonkwo",
    authorRole: "Director of Programs",
    content: [
      "The traditional model of career services — a small office tucked in the corner of campus, offering resume reviews and job board access — is rapidly becoming obsolete. Today's students need far more.",
      "We've partnered with over 80 universities to reimagine career services from the ground up. The most successful transformations share several key elements: early intervention, employer integration, and skills-based pathways.",
      "Early intervention means engaging students from their first year, not waiting until graduation. By embedding career awareness into the curriculum, institutions help students make more informed choices about their academic journey and co-curricular activities.",
      "Employer integration goes beyond career fairs. The most innovative universities are co-designing programs with industry partners, offering project-based learning, mentoring circles, and reverse internships where professionals spend time on campus.",
      "Skills-based pathways acknowledge that degrees alone are no longer sufficient. Students need verifiable skill portfolios that demonstrate competencies employers actually value: critical thinking, collaboration, digital literacy, and adaptability.",
      "The institutions that get this right see measurable improvements in graduate employability, student satisfaction, and alumni engagement. It's a virtuous cycle that benefits everyone.",
    ],
  },
  {
    id: 3,
    slug: "building-culture-of-continuous-learning",
    title: "Building a Culture of Continuous Learning in Your Organization",
    excerpt:
      "Why the most successful companies are shifting from annual training budgets to learning ecosystems.",
    category: "Corporate",
    date: "February 3, 2026",
    readTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1758691736067-b309ee3ef7b9?w=900&h=600&fit=crop",
    author: "Sarah Bergmann",
    authorRole: "Founder & CEO",
    content: [
      "Annual training programmes are dead. Or at least, they should be. The pace of change in every industry demands something far more fluid: a culture where learning is woven into the fabric of daily work.",
      "Building such a culture doesn't happen by accident. It requires intentional design, sustained investment, and — most importantly — leadership buy-in at every level.",
      "We start by auditing the existing learning landscape: what formal and informal learning already happens, where the gaps are, and what barriers prevent people from developing. Often, the biggest obstacle isn't budget — it's permission. People need to feel that taking time to learn is valued, not seen as time away from 'real work'.",
      "Next, we help organisations design learning ecosystems that blend formal programmes with peer learning, self-directed resources, coaching, and on-the-job stretch assignments. The goal is to create multiple pathways to growth that accommodate different learning styles and schedules.",
      "Technology plays a supporting role, not a leading one. We've seen organisations invest heavily in learning platforms that gather dust because the content isn't relevant or the culture doesn't support their use. The platform should follow the strategy, not the other way around.",
      "The results speak for themselves: organisations with strong learning cultures see higher retention, faster innovation cycles, and stronger internal mobility. Learning isn't a nice-to-have — it's a competitive necessity.",
    ],
  },
  {
    id: 4,
    slug: "dei-beyond-checkbox",
    title: "DEI Beyond the Checkbox: Making Inclusion Stick",
    excerpt:
      "Moving past performative diversity initiatives toward systemic, sustainable inclusion strategies.",
    category: "Culture",
    date: "January 20, 2026",
    readTime: "9 min read",
    image:
      "https://images.unsplash.com/photo-1758873269317-51888e824b28?w=900&h=600&fit=crop",
    author: "Elena Vasquez",
    authorRole: "Head of Research",
    content: [
      "Too many DEI initiatives fail because they treat diversity as a destination rather than a journey. A one-off workshop or an annual awareness month won't shift deeply ingrained patterns and systems.",
      "Sustainable inclusion requires structural change: reviewing hiring practices, promotion criteria, meeting cultures, decision-making processes, and leadership behaviours. It requires data, accountability, and long-term commitment.",
      "We work with organisations to move beyond surface-level interventions. That starts with honest diagnostics — understanding where inequities exist, who is affected, and what systemic factors perpetuate them. This often involves uncomfortable conversations, but discomfort is the price of progress.",
      "From there, we co-design interventions that target root causes rather than symptoms. This might mean redesigning performance review processes to mitigate bias, creating sponsorship programmes for underrepresented talent, or embedding inclusive leadership competencies into management development.",
      "Measurement is critical. We help organisations track not just representation numbers, but inclusion indicators: belonging, psychological safety, equitable access to opportunities, and fair outcomes across demographic groups.",
      "The organisations that get DEI right don't treat it as a separate initiative — they integrate it into everything they do. Inclusion becomes a lens through which all decisions are made, not a box to tick.",
    ],
  },
  {
    id: 5,
    slug: "measuring-roi-talent-development",
    title: "How to Measure the ROI of Talent Development Programs",
    excerpt:
      "A practical framework for demonstrating the business value of your learning and development investments.",
    category: "Strategy",
    date: "January 8, 2026",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1762427354251-f008b64dbc32?w=900&h=600&fit=crop",
    author: "David Okonkwo",
    authorRole: "Director of Programs",
    content: [
      "One of the most common questions we hear from executives: 'How do I know this training is actually working?' It's a fair question — and one that the learning industry hasn't always answered well.",
      "Traditional evaluation relies heavily on satisfaction surveys (did participants enjoy it?) and knowledge tests (did they learn the content?). But these measures tell us very little about whether behaviour actually changed, and whether that change impacted business outcomes.",
      "We use a four-level evaluation framework that goes beyond satisfaction. Level one captures participant experience. Level two assesses knowledge acquisition. Level three — the most important — measures behavioural change through 90-day follow-up assessments, manager feedback, and observation data.",
      "Level four connects programme outcomes to business metrics: retention rates, promotion velocity, team performance scores, customer satisfaction, and revenue impact where applicable. This requires baseline data and controlled comparison, which we build into our programme design from day one.",
      "The key insight: measurement isn't something you bolt on at the end. It needs to be designed into the programme from the outset, with clear success criteria agreed upon by all stakeholders.",
      "When done well, ROI measurement doesn't just justify the investment — it improves it. Data reveals what's working, what's not, and where to focus next.",
    ],
  },
  {
    id: 6,
    slug: "school-leadership-programmes",
    title: "Designing Effective Leadership Programmes for School Principals",
    excerpt:
      "School leaders face unique challenges. Here's how to support them with tailored development programmes.",
    category: "Education",
    date: "December 15, 2025",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1758691737584-a8f17fb34475?w=900&h=600&fit=crop",
    author: "Sarah Bergmann",
    authorRole: "Founder & CEO",
    content: [
      "School principals are among the most consequential leaders in any community. Research consistently shows that effective school leadership is the second most important factor in student outcomes, after classroom teaching.",
      "Yet principals often receive remarkably little formal leadership development. Many are promoted from teaching roles with minimal management training, then expected to navigate complex stakeholder environments, tight budgets, and ever-changing policy landscapes.",
      "Our school leadership programmes address this gap by focusing on four domains: instructional leadership, operational management, stakeholder engagement, and personal resilience. Each domain is critical, and most principals need support across all four.",
      "Instructional leadership is about creating conditions for excellent teaching and learning. We help principals develop the skills to observe classrooms effectively, provide developmental feedback, and foster collaborative professional learning among staff.",
      "Operational management covers the practical realities: budgeting, staffing, compliance, and facilities. Personal resilience addresses the emotional demands of the role, including strategies for managing stress, setting boundaries, and sustaining motivation over the long term.",
      "The most effective programmes create peer networks where principals can share challenges and solutions with colleagues who truly understand the unique pressures of the role.",
    ],
  },
];

// create a function to get all blogs (sorted by date, most recent first)
export const getAllBlogs = () => {
  return blogPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
};

// create a function to get a single blog by slug or id
// TODO: Spike whether lsug or id is better
export const getBlogBySlug = (slug) => {
  return blogPosts.find((blog) => blog.slug === slug);
};

// create a function to get blogs by category
export const getBlogsByCategory = (category) => {
  return blogPosts.filter((blog) => blog.category === category);
};

// TODO: create a function to get featured blog as the one with most clicks or most recent

const categories = [
  "All",
  "Leadership",
  "Education",
  "Corporate",
  "Culture",
  "Strategy",
];

// create a function to get all categories
export const getCategories = () => {
  return categories;
};

