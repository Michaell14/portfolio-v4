import { AppId, type Project, type Discussion, type Photo } from './types';

export const INITIAL_WINDOWS = [
  {
    id: AppId.BIO,
    title: 'Welcome.txt',
    isOpen: true,
    isMinimized: false,
    x: 50,
    y: 50,
    width: 400,
    height: 450,
    zIndex: 1,
  },
  {
    id: AppId.PORTFOLIO,
    title: 'My Portfolio',
    isOpen: true,
    isMinimized: false,
    x: 100,
    y: 100,
    width: 700,
    height: 500,
    zIndex: 2,
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'p4',
    title: 'Generative Bauhaus',
    description: 'Text input creates Bauhaus-inspired patterns.',
    imageUrl: '/design1020/s3a3.png',
    sourceUrl: 'https://www.itsmichael.dev/generativeText',
    tags: ['p5.js', 'Animation', 'Web Art'],
    date: 'Dec 2025',
  },
  {
    id: 'p4',
    title: 'Keep Up with Philly',
    description: 'An Applet on the latest news in Philadelphia.',
    imageUrl: '/design1020/s3a2.png',
    sourceUrl: 'https://keep-up-w-philly.vercel.app/',
    tags: ['IFTTT', 'Applet', 'Web Art'],
    date: 'Nov 2025',
  },
  {
    id: 'p4',
    title: 'Beat the ATS',
    description: 'A job application that beats the ATS.',
    imageUrl: '/design1020/s3a1.png',
    sourceUrl: 'https://job-application-kohl-eight.vercel.app/',
    tags: ['HTML', 'CSS', 'Web Art'],
    date: 'Nov 2025',
  },
  {
    id: 'p4',
    title: 'P5.js Cartoon Clock',
    description: 'Interactable cartoon clock using p5.js.',
    imageUrl: '/design1020/s2a3.png',
    sourceUrl: 'https://editor.p5js.org/limich19/sketches/IlpuZOOkP',
    tags: ['p5.js', 'Animation', 'Web Art'],
    date: 'Oct 2025',
  },
  {
    id: 'p4',
    title: 'IPhone Cafe',
    description: 'Steve Jobs.',
    imageUrl: '/design1020/s2a2.png',
    sourceUrl: 'https://www.itsmichael.dev/iphonecafe',
    tags: ['Glitch', 'Experiment'],
    date: 'Oct 2025',
  },
  {
    id: 'p3',
    title: 'Rock Climbing Zine',
    description: 'I made a rock climbing zine.',
    imageUrl: '/design1020/s1a3.png',
    sourceUrl: 'https://michaell14.github.io/index.html',
    tags: ['HTML', 'Storytelling', 'Web Art'],
    date: 'Sept 2025',
  },
  {
    id: 'p2',
    title: 'CSS Still Life',
    description: 'I built a digital still life inspired by our class sculpture.',
    imageUrl: '/design1020/s1a2.png',
    sourceUrl: 'https://codepen.io/Michael-Li-the-encoder/pen/pvjQqEx',
    tags: ['HTML', 'CSS', 'Art'],
    date: 'Sept 2025',
  },
  {
    id: 'p1',
    title: 'Blooming Tulip [64x80]',
    description: 'Value map: ["°", "𖥧", "*", "𖡼", "⚘", "❀", "✿", "☘︎"].',
    imageUrl: '/design1020/s1a1.png',
    sourceUrl: 'https://codepen.io/Michael-Li-the-encoder/pen/raOZJxG',
    tags: ['CSS', 'Design', 'ASCII Art'],
    date: 'Sept 2025',
  }
];

export const DISCUSSIONS: Discussion[] = [
  {
    id: 'd1',
    title: 'Ulises Carrión - Mail Art and the Big Monster from Second Thoughts',
    content: `In the article Mail Art and the Big Monster, Ulises Carrion argues that Mail art is simply the distribution of art which is "supported" by mail, similarly to how other forms of art use canvases, paper, etc. The way most people use the postage system to convey messages to others through text/images, mail art is another form of conveying some message within an art piece. He emphasizes that mail art is also oppressed by the "big monster", an unknown entity that separates the sender and the receiver. In the end, Carrion urges the reader to send mail art, and with an openness to new ideas of mail art.`,
    date: 'Aug 2025'
  },
  {
    id: 'd2',
    title: 'Laurel Schwulst & Édouard U - Selections from Creative Independent and Arena How Do You Use the Internet Mindfully',
    content: `In Essay 5, Laurel Schwulst explores all the possible things a website can be, such as a room, shelf, plant, etc... Essentially, websites are very flexible and the possibilities of what a website is, and can display to the user is up to the user's creativity. It is an instrument that progresses with human evolution. She advocates for all creative people to have a website, not to re-iterate existing projects, but as a way to complement and enhance what they do. In Essay 10, Édouard U encourages the reader to effectively do more. Prevent "conceptual isolation" by intently discovering new music, "surf" not search the web, and read two or more books at the same time.`,
    date: 'Sept 2025'
  },
  {
    id: 'd3',
    title: 'Olia Lialina - STILL THERE Ruins and Templates of Geocities from Lost and Living (in) Archives',
    content: `I have never heard of Geocities before this course, so it was very interesting to read into the history and importance that this website once had on the internet. It acts like an early social media site where people can express themselves on the internet and see other pages of people with the same interest, or to explore other interests.`,
    date: 'Nov 2025'
  },
  {
    id: 'd4',
    title: 'Alessandro Ludovico & Florian Cramer - Selections from Publishing from Post-Digital-Print',
    content: `I find it interesting how Ludovico argues that printed media and digital media are growing together in the post digital era, where both are influencing each other and building off of each other. This is because digital media has strengths in networking and outreach while print has strengths in being a physical object. Combining both creates a new interactive digital experience.`,
    date: 'Sept 2025'
  },
  {
    id: 'd5',
    title: 'Bojana Coklyat & Shannon Finnegan - Selections from Alt-Text as Poetry Workbook',
    content: `This workbook by Bojana Coklyat and Shannon Finnegan teaches you how to write alt text by treating it like a creative writing exercise instead of just a checklist. Describing images is always subjective since you have to make choices about what to include and how to say it, but emphasizes listening to the needs and wants of blind or low vision communities on what should take priority.`,
    date: 'Oct 2025'
  },
  {
    id: 'd6',
    title: 'Ramsey Nasser - "A Personal Computer for Children of All Cultures" from Decolonising the Digital',
    content: `Ramsey Nasser argues that modern computing is biased towards English because of visible issues in the rendered text, and many libraries are focused on using this language. This also forced non-English speakers to adopt to the dominant English language to become programmers, and that it is inevitable that familiarity with English is the gateway to the tech industry. 
    
    How can we make AI more inclusive for other languages from the start, and reduce potential biases in the future?
    
    If we can't get rid of English in programming, what are some simple things we can do to make it easier for non-English speakers to learn to code?`,
    date: 'Oct 2025'
  },
  {
    id: 'd7',
    title: 'David Reinfurt - Selections from A *New* Program for Graphic Design',
    content: `David Reinfurt explains multiple Gestalt principles, such as proximity, similarity, and closure, which is how people organize shapes and patterns differently instead of as separate parts. Reinfurt points out that the essay doesn’t just explain these ideas but actually shows them in action through shifting dots and letters. 

    Which Gestalt principle do you think people see the most on the internet today? Do these principles still apply to modern media or have new rules been added?`,
    date: 'Oct 2025'
  },
  {
    id: 'd8',
    title: 'Ben Duvall - Selections from New Modernism(s)',
    content: `Duvall evaluates how graphic design has changed from the ordered style of modernism to a newer chaotic, internet-driven society of hypermodernism where images and news spread very fast online. He relates design trends to society and how people share meaning behind images and new technology.

    How has the internet changed the way people create graphic images in everyday life?

    Does graphic design have the power to influence big media and global corporations on society?`,
    date: 'Oct 2025'
  },
  {
    id: 'd9',
    title: "Dot Tuer - Beyond the New Media Frame The Poetics of Absence in Vera Frenkel's String Games",
    content: `Dot Tuer examines how Vera Frenkel's String Games used early video technology to show how screens connect people but also create distance and loss between them. The work predicted how digital communication would make us feel present yet absent at the same time, revealing that something important gets lost when we interact through screens instead of in person.

    If so much of our lives now exist only on places like social media what happens to our history if those platforms disappear or shut down?

    Now that we use video calls and social media constantly, do we still feel like something is missing from screen-based communication, or have we just gotten used to it?`,
    date: 'Oct 2025'
  }
];

export const PHOTOS: Photo[] = [
  { id: 'ph1', url: '/design1020/IMG_3833.png', caption: 'Classroom sketch' },
  { id: 'ph2', url: '/design1020/IMG_3877.png', caption: 'Whiteboard madness' },
  { id: 'ph3', url: '/design1020/IMG_3903.png', caption: 'Late night coding' },
];
