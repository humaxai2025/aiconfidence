import Head from 'next/head';
import AIConfidenceAssessment from '../components/AIConfidenceAssessment';

export default function Home() {
  const siteUrl = process.env.SITE_URL || 'https://ai-confidence-assessment.vercel.app';
  const siteName = process.env.SITE_NAME || 'AI Confidence Assessment';
  const siteDescription = process.env.SITE_DESCRIPTION || 'Navigate the AI revolution with confidence. Take our thoughtful assessment to understand your relationship with artificial intelligence and get a personalized roadmap for building AI skills.';
  
  const title = `${siteName} - Discover Your AI Journey`;
  const ogImage = `${siteUrl}/og-image.png`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": siteName,
    "description": siteDescription,
    "url": siteUrl,
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "author": {
      "@type": "Organization",
      "name": "HumanXAI",
      "url": siteUrl
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127"
    },
    "featureList": [
      "14 AI-focused questions",
      "Personalized confidence assessment",
      "Curated AI tool recommendations",
      "30-day learning roadmap",
      "Mobile-optimized experience"
    ]
  };

  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta name="description" content={siteDescription} />
        <meta name="keywords" content="AI assessment, artificial intelligence, AI confidence, AI skills, technology assessment, AI learning, machine learning, ChatGPT, AI tools, digital literacy" />
        <meta name="author" content="HumanXAI" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <link rel="canonical" href={siteUrl} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content={siteName} />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={siteUrl} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={siteDescription} />
        <meta property="twitter:image" content={ogImage} />
        <meta property="twitter:creator" content={process.env.NEXT_PUBLIC_TWITTER_HANDLE || "@humanxai"} />
        
        {/* Additional SEO */}
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        
        {/* Performance and UX */}
        <meta name="theme-color" content="#3b82f6" />
        <meta name="color-scheme" content="light" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
        
        {/* Preload critical resources */}
        <link rel="preload" as="style" href="/_next/static/css/app.css" />
        <link rel="preload" as="script" href="/_next/static/chunks/framework.js" />
      </Head>
      
      <main>
        <AIConfidenceAssessment />
      </main>
    </>
  );
}

// Static generation for better performance
export async function getStaticProps() {
  return {
    props: {},
    // Regenerate every 24 hours
    revalidate: 86400,
  };
}