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
    title: 'Angel Ibarra - Senior Software Engineer for hire',
    jobTitle: 'Senior Software Engineer & Technical Leader',
    summary:
      'Senior software engineer and technical leader with 20+ years building scalable backend systems, cloud infrastructure, and data-driven applications across fintech, ad-tech, e-commerce, insurance, hosting, and SaaS. Deep expertise in PHP, Java, Node.js, Python, AWS, microservices, and security architecture, with recent hands-on leadership as CTO of a growing field-service company. Passionate about process improvement, mentorship, and building reliable systems that serve real needs.',
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
      id: 'content5-p',
      sectionClass: 'content5 cid-sad0mgp31l',
      heading: 'Chief Technology Officer (Hands-On / IC) | Chute Pros | Jan 2026 - Aug 2026',
      body:
        'Served as hands-on CTO for a growing field-service company, owning technology end-to-end. Built and operated a server infrastructure automation platform on Ansible, covering multi-environment bootstrap, hardening, Vault-based secrets management, and CI-integrated lint remediation across the VPS fleet. Designed a layered security stack combining CrowdSec intrusion prevention, Wazuh monitoring, and hardened SSH/PAM/sysctl configuration with fail2ban and AIDE, backed by a full infrastructure security review. Deployed Traefik with Cloudflare integration and automated ACME certificates, and stood up Authelia and later Authentik as the company\'s SSO/identity provider. Automated a 3-2-1 backup strategy with Restic on systemd timers and S3-compatible off-site storage. Built AWS SES email infrastructure with DKIM and SPF for authenticated transactional email, and deployed Uptime Kuma and Komodo for monitoring and orchestration across the fleet. Designed and built a custom invoicing application from scratch with Nuxt.js and Vue, including JSON-driven rendering, cryptographic QR-code validation, and an automated email delivery pipeline, developed test-first. Set up SuiteCRM with a Dockerized local development environment, and built a custom MCP integration connecting AI tooling to the company\'s project-management board for AI-assisted tracking. Led business-systems design, analyzing PO-to-invoice and vendor-payment workflows and defining data requirements for the CRM rollout.',
    },
    {
      id: 'content5-q',
      sectionClass: 'content5 cid-sad19y0EkS',
      heading: 'Senior Software Engineer | Hostwinds | Nov 2024 - Oct 2025',
      body:
        'Designed and built RESTful APIs with PHP, Symfony, and Doctrine to replace legacy backend services, supporting billing, customer management, and infrastructure provisioning at scale. Integrated third-party APIs including OpenStack, NetBox, and multiple payment gateways spanning credit card processing, cryptocurrency, Braintree, and Alipay, handling fraud, disputes, and chargebacks across that surface. Built asynchronous provisioning workflows with real-time status monitoring for complex infrastructure operations. Introduced Scrum to the backend team, establishing sprint planning, retrospectives, story-point practices, and clear definitions of ready/done, improving delivery cadence and onboarding time. Implemented mandatory peer code review for all pull requests. Led optimization and execution of bulk migration scripts moving millions of legacy records across billing, infrastructure, and user data. Collaborated across time zones with an onsite lead and offsite senior engineer to align backend architecture with business needs, and modernized database usage with MariaDB and MongoDB for transactional and unstructured data.',
    },
    {
      id: 'content5-u',
      sectionClass: 'content5 cid-sad1aiy0CQ',
      heading: 'Senior Software Engineer | iSpot.tv | Feb 2022 - May 2024',
      body:
        'Engineered backend services in PHP (Symfony, Doctrine), Node.js, and Python, improving reliability and performance across core systems. Designed RESTful APIs and database integrations for single-page front-end applications, with optimized MySQL and Snowflake schemas, and integrated Snowflake as a primary data source to improve query execution and data retrieval efficiency. Implemented email delivery workflows with Amazon SES for client campaign analytics reporting. Established monitoring and alerting with Splunk and Datadog, reducing outages and accelerating incident resolution. Advanced process automation through CI/CD pipelines with Jenkins and CircleCI, and implemented Docker-based deployments on AWS ECS/ECR, laying groundwork for EKS adoption. Led Agile Scrum ceremonies across backend, frontend, infrastructure, and PM teams, and championed testing and code review standards, earning company-wide recognition for delivering a critical feature on time and defect-free.',
    },
    {
      id: 'content5-s',
      sectionClass: 'content5 cid-sad0mgp31l',
      heading: 'Principal Software Engineer | American Family Insurance | Jan 2021 - Feb 2022',
      body:
        'Directed backend service development in Java and Node.js, improving processing times and system efficiency. Led creation of a new event platform using AWS Kinesis Data Streams, Lambda, and Kinesis Analytics, transforming events into Parquet files in S3 to build a data lake queried through AWS Athena. Managed modernization projects transitioning legacy systems to updated architectures, including rewriting a vendor-maintained legacy application into a modern, homegrown application deployed to production in under three months. Designed and implemented an OAuth flow using AWS IAM and JWT to strengthen authentication. Proposed architectural solutions for existing and new applications and established development standards that improved code quality and consistency. Mentored junior developers and worked closely with technical program managers to clarify requirements and remove delivery blockers.',
    },
    {
      id: 'content5-t',
      sectionClass: 'content5 cid-sad19y0EkS',
      heading: 'Software Development Engineer | Carrentals.com Inc, Expedia Group Company | Sept 2016 - Dec 2020',
      body:
        'Created solutions for the heart of the car rental system and served as the go-to person for business and technical knowledge, setting the bar for code quality and best practices while mentoring less experienced developers. Leveraged and innovated with the AWS ecosystem using PHP, Java, and JavaScript across Postgres and MySQL. Transformed legacy applications into cloud-hosted microservices, scaling the platform to handle 10x the traffic. Owned credit card payment processing end-to-end and built the team\'s process for handling fraud, disputes, and chargebacks. Migrated millions of records from an external marketing database into ours, saving the company several thousand dollars on 3rd party contracts. Led development and quality assurance for a car availability and price-change feature at time of booking, increasing conversion rate and customer satisfaction. Refactored the legacy payment application onto modern language features, best practices, and test automation without breaking backwards compatibility, keeping European payment processing running throughout. Led the team through a transition period, coaching on team forming/norming and expectations, and led the team to genuine self-organization under Scrum, presenting that experience as a talk at an Expedia Group global event.',
    },
  ] satisfies ResumeExperience[],
  experienceLinkText: 'Rest of my professional experience listed in',
  skills: [
    {
      id: 'content5-13',
      sectionClass: 'content5 cid-sad7T7q35J',
      title: 'Technologies and frameworks',
      description:
        'PHP (Symfony, Doctrine), Java (Spring), Node.js, Python, JavaScript, GIT, AWS (EC2, S3, RDS, SES, SQS, SNS, Elastic Beanstalk, Kinesis, ElastiCache, API Gateway, Lambda, IAM, ECS, ECR, Athena, CloudWatch), Kubernetes, Docker, Ansible, Terraform, MySQL, PostgreSQL, MariaDB, MongoDB, Redis, Snowflake, Percona, RESTful APIs, SOAP, OAuth/JWT, JUnit, Mockito, PHPUnit, Jenkins, CircleCI, GitLab CI/CD, Spinnaker, Splunk, Datadog, New Relic, AppDynamics, Uptime Kuma, CrowdSec, Wazuh, Authelia, Authentik, Claude Code and other AI coding agents, custom MCP integrations',
    },
    {
      id: 'content5-14',
      sectionClass: 'content5 cid-sad82AQpac',
      title: 'Methodologies and best practices',
      description:
        'Agile (Scrum, Kanban), Test-Driven Development, SOLID, Design patterns, CI/CD, convergent design, peer review, pair programming, mentoring and technical team development, security architecture and hardening, PCI DSS and GDPR-aware development, technology roadmap ownership.',
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
      title: 'Hostwinds',
      description: 'Web hosting and cloud infrastructure provider — built billing, provisioning, and customer-management APIs at scale.',
      href: 'https://www.hostwinds.com/',
      image: '/legacy/images/hostwinds-logo.svg',
    },
    {
      title: 'iSpot.tv',
      description: 'TV ad measurement and analytics platform — built backend services and data pipelines for advertising analytics.',
      href: 'https://www.ispot.tv/',
      image: '/legacy/images/ispot-tv-logo.svg',
    },
    {
      title: 'American Family Insurance',
      description: 'Insurance and financial services — led the event platform and data lake powering real-time analytics.',
      href: 'https://www.amfam.com/',
      image: '/legacy/images/american-family-insurance-logo.svg',
    },
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
      title: 'Cryptography I course | 2012 | Stanford University',
      details:
        'Course given by Dan Boneh, teaching the theoretical principles behind cryptography and practical applications.',
    },
  ] satisfies Array<{
    title: string
    details: string
  }>,
}
