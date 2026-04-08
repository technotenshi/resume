export interface ResumeContact {
  label: string
  detail: string
  href: string
  iconClass: string
  actionLabel: string
  titleClass?: string
  linkClass?: string
}

export interface ResumeExperience {
  id: string
  sectionClass: string
  heading: string
  body: string
}

export interface ResumeCollectionItem {
  title: string
  description: string
  href: string
  image?: string
  meta?: string
}

export interface ResumeTestimonial {
  quote: string[]
  name: string
  role: string
  image: string
}

export interface ResumeTalk {
  title: string
  event: string
}

export const resumeData = {
  profile: {
    name: 'Angel Ibarra',
    location: 'Seattle Greater Area, USA',
    title: 'Angel Ibarra - Web Developer for hire',
    jobTitle: 'Web Application Developer',
    summary:
      'Web application developer for 20 years. Amazed and involved in distributed systems development. Software development processes and best practices evangelist. Cryptography and information security fan.',
    heroBackground: '/legacy/images/mbr-1920x1246.jpg',
    linkedinUrl: 'https://www.linkedin.com/in/miguelibarra1/?locale=en_US',
    email: 'ibarra.dev@v25.mozmail.com',
    phone: '+14259545621',
  },
  objective:
    'Keep learning and be excited about technology, while delivering results with the quality that is expected.',
  contacts: [
    {
      label: 'Email',
      detail: 'I will reply as soon as possible',
      href: 'mailto:ibarra.dev@v25.mozmail.com',
      iconClass: 'mobi-mbri-letter',
      actionLabel: 'Send me an email',
    },
    {
      label: 'Phone',
      detail: 'Mon - Fri 09:00 - 18:00 Pacific Time',
      href: 'tel:+14259545621',
      iconClass: 'mobi-mbri-mobile-2',
      actionLabel: 'Call (425) 954 56 21',
      linkClass: 'mbr-black',
      titleClass: 'align-center',
    },
  ] satisfies ResumeContact[],
  experience: [
    {
      id: 'content5-l',
      sectionClass: 'content5 cid-sad0mgp31l',
      heading: 'Software Development Engineer | Carrentals.com Inc, Expedia Group Company | Sept 2016 - present',
      body:
        'Create solutions for the heart of our car rental system. Be the go-to person for business and technical knowledge. Set the bar for code quality and best practices. Mentor and coach less experienced developers. Leverage and innovate with AWS ecosystem. PHP, Java, JavaScript. Postgres, MySQL. Contributed to transform legacy application, laying the groundwork for scaling to 10x the traffic. Migrated millions of records from external marketing database into ours, saving company several thousand dollars on 3rd party contracts. Led development efforts and quality assurance for new feature involving car availability and price changes at time of booking, giving the customer the appropriate alternatives, increasing conversion rate and customer satisfaction. Refactored legacy payment application to use latest language features, best practices, and test automation without breaking backwards compatibility and making development of critical features for continuation of business faster without sacrificing quality, enabling the company to continue to process payments in Europe. Lead the team through a transition period, coaching and advising on team forming/norming, processes, and expectations, not only technically but soft skills as well, looking ways to enable meaningful deliveries.',
    },
    {
      id: 'content5-n',
      sectionClass: 'content5 cid-sad19y0EkS',
      heading: 'Senior Software Engineer | Summit Group Solutions | Apr 2016 – Sep 2016',
      body:
        'Software developer for an important car rentals company, using a mix of technologies like PHP and Postgres, running and making extensive use of Amazon web services. Was the first to introduce unit testing in legacy application, SCRUM best practices.',
    },
    {
      id: 'content5-o',
      sectionClass: 'content5 cid-sad1aiy0CQ',
      heading: 'Software engineering associate manager | Accenture | Aug 2015 – Apr 2016',
      body:
        'Development lead for a front-end project with AngularJS for an important telecommunications company. Gathering and understanding requirements from business analysts, transmit that knowledge to offshore teams, find gaps in what the business is requiring and what is technically possible, writing high level technical documentation about the solutions provided. The only front-end developer that was able to take part in the development of back-end services with the integration team, for the successful communication between the user interface and the core ERP services.',
    },
  ] satisfies ResumeExperience[],
  experienceLinkText: 'Rest of my professional experience listed in',
  skills: [
    {
      id: 'content5-13',
      sectionClass: 'content5 cid-sad7T7q35J',
      title: 'Technologies and frameworks',
      description:
        'PHP, Java, Javascript, NodeJS, Apache, Nginx, Postgres, Mysql, GIT, AWS (EC2, S3, RDS, SES, SQS, SNS, Elastic Beanstalk, Kinesis Streams, Elasticache, API Gateway, Lambda functions, IAM, cloud formation), PHPUnit, Junit, Mockito, Laravel, Springboot, Doctrine, Docker, RESTful, SOAP, AngularJS, LESS, Jasmine, Mocha, Chai, Jenkins, Bower, Yeoman, Karma, Protractor, Grunt, Gulp, ZF1, ZF2, Percona, MongoDB, Elasticsearch, jQuery, ExpressJS, PHP Slim, Terraform, serverless, emberJs, handlebars, spinnaker',
    },
    {
      id: 'content5-14',
      sectionClass: 'content5 cid-sad82AQpac',
      title: 'Methodologies and best practices',
      description:
        'Agile (SCRUM, Kanban), SOLID, Design patterns, CI/CD, convergent design, PSP, peer review, pair programming, code dojos. team forming and norming.',
    },
    {
      id: 'content5-15',
      sectionClass: 'content5 cid-sad83cIUuS',
      title: 'Hobbies',
      description:
        'Video games, board games, digital circuits/Arduino projects, anime, fantasy movies.',
    },
  ] satisfies Array<{ id: string; sectionClass: string; title: string; description: string }>,
  publications: [
    {
      title: 'Using Halite for Privacy and Two-Way Encryption of Emails',
      description: '',
      href: 'https://www.sitepoint.com/using-halite-for-privacy-and-two-way-encryption-of-emails/',
      image: '/legacy/images/1416760482fotolia-49902706-subscription-monthly-m.webp',
      meta: 'June 22, 2016',
    },
    {
      title: 'PHP Authorization with JWT',
      description: '',
      href: 'https://www.sitepoint.com/php-authorization-jwt-json-web-tokens/',
      image: '/legacy/images/1432541300fotolia-74183229-subscription-monthly-m-1024x1024.webp',
      meta: 'June 3, 2015',
    },
    {
      title: 'Using Guzzle with Twitter via OAuth',
      description: '',
      href: 'https://www.sitepoint.com/using-guzzle-twitter-via-oauth/',
      image: '/legacy/images/1404970017687474703a2f2f73312e706f7374696d672e6f72672f6c6d343630686963662f61727469636c655f6c6f676f2e706e67.webp',
      meta: 'July 25, 2014',
    },
    {
      title: 'Risks and Challenges of Password Hashing',
      description: '',
      href: 'https://www.sitepoint.com/risks-challenges-password-hashing/',
      image: '/legacy/images/gettyimages-519915062-story-582x437.jpg',
      meta: 'March 10, 2014',
    },
  ] satisfies ResumeCollectionItem[],
  publicationArchiveUrl: 'https://www.sitepoint.com/author/mibarra/',
  talks: [
    {
      title: 'Information security in databases - from SQL Injection to cryptography',
      event: 'Hack & Beers, Mexico, 2013',
    },
    {
      title: 'Design Patterns',
      event: 'Tiempo Development, Mexico, 2013',
    },
    {
      title: 'Kanban! (+ agile)',
      event: 'Carrentals.com 2020',
    },
    {
      title: 'How I went from zero to a self-organizing team',
      event: 'Expedia Group Agile Summit 2020',
    },
  ] satisfies ResumeTalk[],
  featuredClients: [
    {
      title: 'Carrentals.com',
      description: 'All the cars in the world! Rent a car anywhere in the world, at the cheapest price.',
      href: 'https://carrentals.com',
      image: '/legacy/images/cr-en-svg.svg',
    },
    {
      title: 'T-mobile',
      description: 'A revamp of the old site, now with the latest technologies to serve our customers.',
      href: 'https://t-mobile.com',
      image: '/legacy/images/t-mobile-new-logo-primary-rgb-w-on-m-280x125.jpg',
    },
    {
      title: 'Tiempo Development',
      description: 'Nearshore services targeted to clients in the USA',
      href: 'https://www.tiempodev.com/',
      image: '/legacy/images/logo.png.webp',
    },
    {
      title: 'Softtek',
      description: 'IT services and solutions from the largest mexican software consultancy company',
      href: 'https://www.softtek.com/',
      image: '/legacy/images/download-280x144.png',
    },
  ] satisfies ResumeCollectionItem[],
  logoWall: [
    {
      title: 'WebPT',
      description: '',
      href: 'https://www.webpt.com/',
      image: '/legacy/images/2e144d098ba4be5f8ef60d461a73a78e-200x45.png',
    },
    {
      title: 'Gobierno del Estado de Morelos',
      description: '',
      href: 'https://morelos.gob.mx/',
      image: '/legacy/images/web-escudo-gobierno-2006-2013-159x126.png',
    },
    {
      title: 'Universidad de las Americas Puebla',
      description: '',
      href: 'https://www.udlap.mx/web/en/',
      image: '/legacy/images/download-2-1-200x68.png',
    },
    {
      title: 'Accenture',
      description: '',
      href: 'https://www.accenture.com/',
      image: '/legacy/images/download-1-200x55.png',
    },
    {
      title: 'Morelosweb dot com',
      description: '',
      href: 'http://morelosweb.com/',
      image: '/legacy/images/logotrsp-1-134x51.png',
    },
  ] satisfies ResumeCollectionItem[],
  testimonials: {
    featured: [
      {
        quote: [
          'Talented, open mind, data and quality driven are the words that come to my mind when I think about Angel.',
          'I was lucky to manage Angel during 3 years at CarRentals.com. We worked together to make CarRentals.com booking and payment systems better, moving from a monolithic application to micro services using event driven design. We had great achievements during this time. One I remember is how Angel changed our payment service code architecture to make new payment service providers on-boarding quick, easy and safe. I was particularly impressed how Angel was mentoring junior engineers within the team, she never gave up when trying to make them better engineers, always willing to share and help. She helped me to build a technically strong and quality focused team for sure.',
          'Angel is a fervent supporter of agile methodologies and shared her experience in a nice talk at during Expedia Group Agile Summit, another way for her to share and help others! Angel would be a great asset to any team.',
        ],
        name: 'Valérie Béreaud',
        role: 'Engineering Manager, Expedia Group',
        image: '/legacy/images/0-70x70.jpg',
      },
      {
        quote: [
          'I worked with Angel as part of CarRentals core engineering team. Angel is a focused person and the way she solves problem with integrity is really appreciable. I have had opportunity of working closely with Angel on different projects and I noticed that she adheres to the processes and makes sure to deliver the code/results with good quality. It’s been a pleasure working with her.',
        ],
        name: 'Suraj Anuraag',
        role: 'Software Engineer, Expedia Group',
        image: '/legacy/images/0-1-100x100.jpg',
      },
    ] satisfies ResumeTestimonial[],
    carousel: [
      {
        quote: [
          'Worked with Angel for couple of years. She is very good at designing solutions and getting things done the right way. She is very helpful and helped me with PHP and learning the tech stack.',
        ],
        name: 'Santosh K',
        role: 'Software Engineer, Amazon',
        image: '/legacy/images/0-2-100x100.jpg',
      },
      {
        quote: [
          'Angel is great developer and teammate to work with. I have worked with her to stream the data from backend to the data platform, in which she came up with different metrics & scalable solution as well. Thinks about the system end to end and performance aspect as well.',
        ],
        name: 'Arjun Mantri',
        role: 'Software Engineer, Expedia Group',
        image: '/legacy/images/0-3-100x100.jpg',
      },
    ] satisfies ResumeTestimonial[],
  },
  education: [
    {
      title: 'Bachelor of Computer Engineering | 2004 | Universidad del Sol',
      details:
        'Final average grade of 9.5/10. Honored with the highest average grade of the generation. Participated with the IEEE student branch, help organize 2 conferences, 4 websites, one of them won the 2nd place of website design contest of the 9th region of IEEE (latam)',
    },
    {
      title: 'Usable Security certification | 2014 | University of Maryland',
      details:
        'Course focusing on keeping usable products for customers while keeping measures for information security',
    },
    {
      title: 'Criptography I course | 2012 | Standford University',
      details:
        'Course given by Dan Boneh, teaching the theoretical principles behind cryptography and practical applications.',
    },
  ] satisfies Array<{
    title: string
    details: string
  }>,
}
