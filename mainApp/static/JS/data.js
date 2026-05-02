const jobs = [ //ARRAY OF OBJECTS, EACH OBJECT HAS KEYS
    {
        id: 1,
        title: "Frontend Developer",
        applications: 8,
        company: "TechCorp",
        salary: "$2,500/month",
        experience: "2-4",
        schedule: "Full-time",
        location: "onsite",
        status: "Open",
        link: "job-details.html",

        // ===== Extra Fields for job details =====
        category: "Web Development",
        description: "Develop and maintain responsive web interfaces using modern frameworks.",
        education: "Bachelor's Degree in Computer Science",
        gender: "Any",
        techSkills: "HTML, CSS, JavaScript, React",
        softSkills: "Teamwork, Communication, Problem-solving",
        benefits: "Health insurance, Paid leave",
        industry: "Technology",
        companySize: "50-100",
        creator: "admin",
        companyLocation: "Cairo, Egypt"
    },

    {
        id: 2,
        title: "Data Analyst",
        applications: 12,
        company: "Insight Co",
        salary: "$1,800/month",
        experience: "0-1",
        schedule: "Part-time",
        location: "remote",
        status: "Open",
        link: "job-details.html",

        // ===== Extra Fields for job details =====
        category: "Data Analysis",
        description: "Analyze datasets and generate reports to support business decisions.",
        education: "Bachelor's Degree in Statistics or related field",
        gender: "Any",
        techSkills: "Excel, SQL, Python",
        softSkills: "Attention to detail, Analytical thinking",
        benefits: "Remote work, Flexible hours",
        industry: "Analytics",
        companySize: "20-50",
        creator: "admin",
        companyLocation: "Cairo, Egypt"
    },

    {
        id: 3,
        title: "UI/UX Designer",
        applications: 4,
        company: "Creative Studio",
        salary: "$2,000/month",
        experience: "2-4",
        schedule: "Full-time",
        location: "onsite",
        status: "Closed",
        link: "job-details.html",
        
        // ===== Extra Fields for job details =====
        category: "Design",
        description: "Design user-friendly interfaces and improve user experience.",
        education: "Bachelor's Degree in Design",
        gender: "Any",
        techSkills: "Figma, Adobe XD, Photoshop",
        softSkills: "Creativity, Communication",
        benefits: "Flexible hours, Bonuses",
        industry: "Design",
        companySize: "10-30",
        creator: "admin",
        companyLocation: "Alexandria, Egypt"
    

    },

    {
        id: 4,
        title: "Backend Developer",
        applications: 5,
        company: "NexaSoft ",
        salary: "$3,000/month",
        experience: "+4",
        schedule: "Full-time",
        location: "onsite",
        status: "Open",
        link: "job-details.html",


        // ===== Extra Fields for job details =====
        category: "Software Development",
        description: "Build and maintain server-side logic and databases.",
        education: "Bachelor's Degree in Computer Science",
        gender: "Any",
        techSkills: "Node.js, Express, MongoDB",
        softSkills: "Problem-solving, Time management",
        benefits: "Health insurance, Annual bonus",
        industry: "Technology",
        companySize: "100+",
        creator: "admin",
        companyLocation: "Cairo, Egypt"

    },

    {
        id: 5,
        title: "Mobile App Developer",
        applications: 3,
        company: "AppWorks ",
        salary: "$2,200/month",
        experience: "2-4",
        schedule: "Internship",
        location: "onsite",
        status: "Closed",
        link: "job-details.html",

        // ===== Extra Fields for job details =====
        category: "Mobile Development",
        description: "Develop mobile applications for Android and iOS platforms.",
        education: "Bachelor's Degree in Computer Science",
        gender: "Any",
        techSkills: "Flutter, Dart, Kotlin",
        softSkills: "Adaptability, Teamwork",
        benefits: "Paid leave, Training programs",
        industry: "Technology",
        companySize: "30-70",
        creator: "admin",
        companyLocation: "Alexandria, Egypt"

    },

    {
        id: 6,
        title: "DevOps Engineer",
        applications: 10,
        company: "CloudBase",
        salary: "$3,500/month",
        experience: "+4",
        schedule: "Internship",
        location: "remote",
        status: "Open",
        link: "job-details.html",

        // ===== Extra Fields for job details =====
        category: "DevOps",
        description: "Manage CI/CD pipelines and cloud infrastructure.",
        education: "Bachelor's Degree in IT or related field",
        gender: "Any",
        techSkills: "AWS, Docker, Kubernetes",
        softSkills: "Problem-solving, Collaboration",
        benefits: "Remote work, High salary",
        industry: "Cloud Computing",
        companySize: "50-150",
        creator: "admin",
        companyLocation: "Cairo, Egypt"

    }
];

if(!localStorage.getItem("jobs")){
    localStorage.setItem("jobs", JSON.stringify(jobs));
}