import { Gauge, LayoutDashboard, Palette, Plug, SearchCheck, Smartphone, Wrench } from "lucide-react";

export const servicesData = [
    {
        service: "Web Application Development",
        serviceIcon: LayoutDashboard,
        description: "Building responsive and scalable web applications tailored to your business needs.",
        overview: [
            "Custom web application development using React/Next.js",
            "Dashboards, admin panels, SaaS products",
            "API integration & state management (Redux, RTK)"
        ], 
    },
    {
        service: "Mobile Application Development",
        serviceIcon: Smartphone,
        description: "Creating user-friendly mobile applications for both iOS and Android platforms.",
        overview: [
            "Cross-platform apps (React Native / Expo)",
            "Web-to-mobile conversions",
            "Fintech & utility apps"
        ],
    },
    {
        service: "UI / UX & Design Systems",
        serviceIcon: Palette,
        description: "Designing intuitive user interfaces and comprehensive design systems for consistent branding.",
        overview: [
            "User research & persona development",
            "Wireframing & prototyping",
            "Design system creation & documentation",
            "Component libraries (Tailwind, reusable components)"
        ]
    },
    {
        service: "API Integration & Frontend Architecture",
        serviceIcon: Plug,
        description: "Integrating third-party APIs and designing robust frontend architectures for optimal performance.",
        overview: [
            "RESTful & GraphQL API integration",
            "Frontend architecture planning",
            "Performance optimization & best practices",
            "Auth flows, role-based access control",
            "Payment gateway integration (Fintech experience)"
        ]
    },
    {
        service: "Performance Optimization & SEO",
        serviceIcon: Gauge,
        description: "Enhancing application performance and implementing SEO strategies to improve visibility and user experience.",
        overview: [
            "Code splitting & lazy loading",
            "Image optimization & caching strategies",
            "SEO best practices & implementation",
            "Accessibility improvements (WCAG compliance)",
            "Next.js performance tuning",
            "Lighthouse optimization",
        ],
    },
    {
        service: "Product Maintenance & Support",
        serviceIcon: Wrench,
        description: "Providing ongoing maintenance and support to ensure your applications run smoothly and efficiently.",
        overview: [
            "Bug fixing & troubleshooting",
            "Feature enhancements & updates",
            "Technical support & consultation"
        ],
    },
    {
        service: "Code Reviews & Audits",
        serviceIcon: SearchCheck,
        description: "Conducting thorough code reviews and audits to ensure code quality, security, and adherence to best practices.",
        overview: [
            "Comprehensive code reviews",
            "Security audits & vulnerability assessments",
            "Best practices & performance recommendations"
        ],
    }
];