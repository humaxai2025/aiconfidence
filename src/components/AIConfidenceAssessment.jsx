import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  ChevronRight, 
  ChevronLeft, 
  RotateCcw, 
  Sparkles, 
  Target, 
  TrendingUp, 
  Heart, 
  BookOpen, 
  Users, 
  CheckCircle,
  Star,
  Zap,
  Shield,
  Brain,
  Lightbulb,
  Rocket,
  Loader2,
  Twitter,
  Linkedin,
  Facebook,
  Copy,
  ExternalLink,
  ChevronDown,
  ArrowRight
} from 'lucide-react';

const AIConfidenceAssessment = () => {
  // Core state management
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  
  // User data
  const [userName, setUserName] = useState('');
  
  // UI state
  const [scoreAnimation, setScoreAnimation] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Add CSS for background effects
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .bg-grid-pattern {
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(148 163 184 / 0.05)'%3e%3cpath d='m0 .5h32m0 31h-32m31.5 0v-32m-31 32v-31'/%3e%3c/svg%3e");
      }
      .glass-effect {
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
      }
    `;
    document.head.appendChild(style);
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  // Questions data - updated with Google Gemini
  const questions = useMemo(() => [
    {
      id: 1,
      text: "I feel comfortable experimenting with AI tools like ChatGPT or Google Gemini.",
      category: "ai-comfort",
      theme: "Comfort"
    },
    {
      id: 2,
      text: "When AI gives me an unexpected response, I can usually figure out how to get better results.",
      category: "ai-problem-solving",
      theme: "Skills"
    },
    {
      id: 3,
      text: "I understand that AI tools have limitations and don't always give accurate answers.",
      category: "ai-awareness",
      theme: "Awareness"
    },
    {
      id: 4,
      text: "I can write clear prompts to get useful responses from AI assistants.",
      category: "ai-prompting",
      theme: "Skills"
    },
    {
      id: 5,
      text: "I feel confident using AI tools to help with work or personal tasks.",
      category: "ai-application",
      theme: "Application"
    },
    {
      id: 6,
      text: "When choosing an AI tool, I can evaluate whether it's right for my needs.",
      category: "ai-selection",
      theme: "Skills"
    },
    {
      id: 7,
      text: "I'm comfortable with the privacy implications of using AI services.",
      category: "ai-privacy",
      theme: "Awareness"
    },
    {
      id: 8,
      text: "I can tell when AI-generated content might be biased or incorrect.",
      category: "ai-critical-thinking",
      theme: "Awareness"
    },
    {
      id: 9,
      text: "I enjoy learning about new AI capabilities and how they might be useful.",
      category: "ai-curiosity",
      theme: "Mindset"
    },
    {
      id: 10,
      text: "I can explain to someone else what AI can and cannot do reliably.",
      category: "ai-teaching",
      theme: "Skills"
    },
    {
      id: 11,
      text: "When AI tools are updated, I adapt to the changes without significant stress.",
      category: "ai-adaptability",
      theme: "Mindset"
    },
    {
      id: 12,
      text: "I believe I can develop the AI skills I need for my future goals.",
      category: "ai-confidence",
      theme: "Mindset"
    },
    {
      id: 13,
      text: "I'm interested in staying informed about AI developments that affect my industry.",
      category: "ai-awareness",
      theme: "Awareness"
    },
    {
      id: 14,
      text: "Overall, I see AI as a helpful tool rather than something to fear or avoid.",
      category: "ai-mindset",
      theme: "Mindset"
    }
  ], []);

  const scaleOptions = useMemo(() => [
    { value: 1, label: "Strongly Disagree", emoji: "😰", color: "rose" },
    { value: 2, label: "Disagree", emoji: "😐", color: "orange" },
    { value: 3, label: "Neutral", emoji: "🤔", color: "yellow" },
    { value: 4, label: "Agree", emoji: "😊", color: "green" },
    { value: 5, label: "Strongly Agree", emoji: "🚀", color: "purple" }
  ], []);

  // Performance tracking
  useEffect(() => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      window.performance.mark('assessment-loaded');
    }
  }, []);

  // Calculate confidence score
  const calculateScore = useCallback(() => {
    const totalAnswers = Object.values(answers).length;
    if (totalAnswers === 0) return 0;
    const totalScore = Object.values(answers).reduce((sum, answer) => sum + answer, 0);
    const maxPossibleScore = totalAnswers * 5;
    return Math.round((totalScore / maxPossibleScore) * 100);
  }, [answers]);

  // Get confidence tier with enhanced descriptions
  const getScoreTier = useCallback((score) => {
    if (score >= 80) return {
      level: "AI Pioneer",
      description: "You're leading the way in AI adoption and helping others navigate the AI revolution!",
      color: "from-purple-500 to-indigo-600",
      bgPattern: "from-purple-50/50 to-indigo-50/50",
      icon: <Rocket className="h-8 w-8" />,
      emoji: "🚀",
      objective: "Become an AI mentor and help others build confidence with artificial intelligence",
      actions: [
        "Explore cutting-edge AI tools and share your discoveries",
        "Mentor someone who's new to AI applications",
        "Join AI communities to exchange insights and experiences"
      ]
    };
    if (score >= 60) return {
      level: "AI Adopter",
      description: "You're comfortable with AI and ready to explore more advanced applications!",
      color: "from-blue-500 to-cyan-600",
      bgPattern: "from-blue-50/50 to-cyan-50/50",
      icon: <Brain className="h-8 w-8" />,
      emoji: "🧠",
      objective: "Strategically expand your AI skills and discover new possibilities with artificial intelligence",
      actions: [
        "Try 1-2 new AI tools each month for different use cases",
        "Learn advanced prompting techniques for better AI results",
        "Experiment with AI automation to streamline your workflows"
      ]
    };
    if (score >= 40) return {
      level: "AI Curious",
      description: "You're building AI confidence and ready to explore what's possible!",
      color: "from-emerald-500 to-teal-600",
      bgPattern: "from-emerald-50/50 to-teal-50/50",
      icon: <Lightbulb className="h-8 w-8" />,
      emoji: "💡",
      objective: "Build AI confidence through guided practice and small wins with AI tools",
      actions: [
        "Start with one user-friendly AI tool and master it completely",
        "Practice writing clear prompts for better AI responses",
        "Celebrate small victories as you learn to work with AI"
      ]
    };
    return {
      level: "AI Hesitant",
      description: "AI can feel overwhelming, but you can build confidence step by step in this exciting new world.",
      color: "from-rose-500 to-pink-600",
      bgPattern: "from-rose-50/50 to-pink-50/50",
      icon: <Heart className="h-8 w-8" />,
      emoji: "🌱",
      objective: "Start with AI basics and build a strong foundation at your own comfortable pace",
      actions: [
        "Begin with simple AI assistants like ChatGPT for basic questions",
        "Find an AI-savvy friend to guide you through your first experiences",
        "Remember: everyone was new to AI once - you're not behind, you're just beginning"
      ]
    };
  }, []);

  // Progress milestone messages
  const getMilestoneMessage = useCallback((progress) => {
    if (progress === 25) return { message: "Quarter way there!", emoji: "🌟" };
    if (progress === 50) return { message: "Halfway through!", emoji: "⚡" };
    if (progress === 75) return { message: "Almost there!", emoji: "🔥" };
    return null;
  }, []);

  // Enhanced answer handling with haptic feedback
  const handleAnswer = useCallback((questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    
    // Haptic feedback for mobile devices
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }

    // Track answer for analytics
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'question_answered', {
        question_id: questionId,
        answer_value: value,
        question_number: currentQuestion + 1
      });
    }
  }, [currentQuestion]);

  // Navigation with loading states
  const nextQuestion = useCallback(async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 200)); // Smooth transition
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
      
      // Track assessment completion
      if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        window.gtag('event', 'assessment_complete', {
          final_score: calculateScore(),
          total_questions: questions.length,
          completion_time: Date.now()
        });
      }
    }
    setIsLoading(false);
  }, [currentQuestion, questions.length, calculateScore]);

  const prevQuestion = useCallback(() => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  }, [currentQuestion]);

  // Reset functionality
  const restart = useCallback(() => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setIsStarted(false);
    setUserName('');
    setScoreAnimation(0);
    setShowConfetti(false);
    
    // Track restart
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'assessment_restart', {
        from_results: showResults
      });
    }
  }, [showResults]);

  // Enhanced social sharing with tracking
  const shareToSocial = useCallback((platform) => {
    const score = calculateScore();
    const tier = getScoreTier(score);
    const shareText = `🤖 I just discovered my AI Confidence Level: ${score}% (${tier.level})!\n\n${tier.description}\n\nDiscover yours at`;
    const url = typeof window !== 'undefined' ? window.location.href : '';
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&summary=${encodeURIComponent(shareText)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(shareText)}`
    };
    
    if (typeof window !== 'undefined') {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes');
      
      // Track social sharing
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'share', {
          method: platform,
          content_type: 'assessment_result',
          content_id: tier.level
        });
      }
    }
  }, [calculateScore, getScoreTier]);

  // Enhanced clipboard functionality
  const copyResults = useCallback(async () => {
    const score = calculateScore();
    const tier = getScoreTier(score);
    const text = `🤖 I just discovered my AI Confidence Level!\n\nMy Score: ${score}% (${tier.level})\n\n${tier.description}\n\n${tier.emoji} AI Journey: ${tier.objective}\n\nNext AI Steps:\n${tier.actions.map(action => `• ${action}`).join('\n')}\n\nDiscover your AI confidence level: ${typeof window !== 'undefined' ? window.location.href : ''}`;
    
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for older browsers or non-HTTPS
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      
      // Show success feedback
      const originalText = 'Copy Results';
      const button = document.querySelector('[data-copy-button]');
      if (button) {
        button.textContent = '✅ Copied!';
        setTimeout(() => {
          button.textContent = originalText;
        }, 2000);
      }
      
      // Track copy action
      if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        window.gtag('event', 'copy_results', {
          confidence_level: tier.level,
          score: score
        });
      }
      
    } catch (error) {
      console.error('Copy failed:', error);
      alert('Copy failed. Please select and copy the text manually.');
    }
  }, [calculateScore, getScoreTier]);

  // Score animation effect with 10-second confetti timeout
  useEffect(() => {
    if (showResults) {
      const finalScore = calculateScore();
      const duration = 2000;
      const steps = 60;
      const increment = finalScore / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= finalScore) {
          setScoreAnimation(finalScore);
          clearInterval(timer);
          setTimeout(() => {
            setShowConfetti(true);
            // Hide confetti after 10 seconds
            setTimeout(() => setShowConfetti(false), 10000);
          }, 500);
        } else {
          setScoreAnimation(Math.floor(current));
        }
      }, duration / steps);
      
      return () => clearInterval(timer);
    }
  }, [showResults, calculateScore]);

  // Derived values
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const score = calculateScore();
  const tier = getScoreTier(score);
  const milestone = getMilestoneMessage(Math.round(progress));
  const question = questions[currentQuestion];
  const hasAnswer = question ? answers[question.id] !== undefined : false;

  // Tool recommendations by score tier (updated with Google Gemini)
  const getToolRecommendations = useCallback((score) => {
    if (score >= 80) return [
      { name: "Claude 3.5 Sonnet", desc: "Advanced reasoning for complex projects", url: "https://claude.ai", badge: "Pro" },
      { name: "Cursor", desc: "AI-powered code editor for developers", url: "https://cursor.sh", badge: "Dev" },
      { name: "Perplexity Pro", desc: "Research assistant with real-time web access", url: "https://perplexity.ai", badge: "Research" },
      { name: "GitHub Copilot", desc: "AI pair programmer for coding workflows", url: "https://github.com/features/copilot", badge: "Code" }
    ];
    if (score >= 60) return [
      { name: "ChatGPT Plus", desc: "Enhanced GPT-4 for daily productivity", url: "https://chat.openai.com", badge: "Essential" },
      { name: "Notion AI", desc: "AI writing assistant in your workspace", url: "https://notion.so", badge: "Productivity" },
      { name: "Grammarly", desc: "AI writing enhancement and editing", url: "https://grammarly.com", badge: "Writing" },
      { name: "Canva AI", desc: "AI-powered design and content creation", url: "https://canva.com", badge: "Design" }
    ];
    if (score >= 40) return [
      { name: "ChatGPT (Free)", desc: "Start with OpenAI's friendly AI assistant", url: "https://chat.openai.com", badge: "Free" },
      { name: "Google Gemini", desc: "Google's conversational AI for exploration", url: "https://gemini.google.com", badge: "Free" },
      { name: "Bing Chat", desc: "Microsoft's AI with web search capabilities", url: "https://bing.com/chat", badge: "Search" },
      { name: "Character.AI", desc: "Practice conversations with AI characters", url: "https://character.ai", badge: "Practice" }
    ];
    return [
      { name: "ChatGPT (Simple)", desc: "Ask basic questions to get comfortable", url: "https://chat.openai.com", badge: "Beginner" },
      { name: "Google Assistant", desc: "Voice AI you might already know", url: "https://assistant.google.com", badge: "Familiar" },
      { name: "Claude (Friendly)", desc: "Helpful AI assistant for gentle introduction", url: "https://claude.ai", badge: "Gentle" },
      { name: "Replika", desc: "AI companion for casual conversation practice", url: "https://replika.ai", badge: "Practice" }
    ];
  }, []);

  // Learning path by score tier
  const getLearningPath = useCallback((score) => {
    if (score >= 80) return [
      { week: "Week 1", task: "Experiment with AI coding assistants (Cursor, GitHub Copilot)", icon: "💻" },
      { week: "Week 2", task: "Build a small AI-powered project or automation", icon: "🛠️" },
      { week: "Week 3", task: "Share your AI discoveries with colleagues or online", icon: "📢" },
      { week: "Week 4", task: "Mentor someone new to AI applications", icon: "🤝" }
    ];
    if (score >= 60) return [
      { week: "Week 1", task: "Master advanced prompting techniques and chain-of-thought", icon: "🧠" },
      { week: "Week 2", task: "Integrate AI into 2-3 different work workflows", icon: "⚙️" },
      { week: "Week 3", task: "Explore specialized AI tools for your industry", icon: "🎯" },
      { week: "Week 4", task: "Create templates and processes for repeated AI tasks", icon: "📋" }
    ];
    if (score >= 40) return [
      { week: "Week 1", task: "Use ChatGPT daily for 3 different types of tasks", icon: "📝" },
      { week: "Week 2", task: "Learn to write clear, specific prompts", icon: "🎯" },
      { week: "Week 3", task: "Try 2 new AI tools from your recommendations", icon: "🔍" },
      { week: "Week 4", task: "Practice fact-checking and verifying AI responses", icon: "✅" }
    ];
    return [
      { week: "Week 1", task: "Ask ChatGPT 5 simple questions about topics you know well", icon: "❓" },
      { week: "Week 2", task: "Use AI to explain a concept you're learning", icon: "📚" },
      { week: "Week 3", task: "Try voice AI (Google Assistant) for basic tasks", icon: "🎤" },
      { week: "Week 4", task: "Reflect on what felt helpful vs. concerning", icon: "🤔" }
    ];
  }, []);

  // Quick win suggestions by score tier
  const getQuickWin = useCallback((score) => {
    if (score >= 80) return {
      title: "🚀 AI Pioneer Challenge:",
      task: "Open Claude or ChatGPT and ask: \"Help me design a simple automation for [your biggest repetitive task]. Break it down into steps and suggest which parts AI could handle.\"",
      description: "This leverages your confidence to tackle real productivity gains."
    };
    if (score >= 60) return {
      title: "🧠 AI Adopter Challenge:",
      task: "Try this advanced prompt: \"Act as an expert in [your field]. I'm working on [specific project]. What are 3 approaches I might not have considered? For each, explain the pros and cons.\"",
      description: "This pushes your skills to get more strategic insights."
    };
    if (score >= 40) return {
      title: "💡 AI Curious Challenge:",
      task: "Ask ChatGPT: \"Explain [something you're learning about] like I'm 12 years old, then like I'm an expert. What's the key difference in these explanations?\"",
      description: "This builds confidence in AI's ability to adapt to your needs."
    };
    return {
      title: "🌱 AI Hesitant Challenge:",
      task: "Ask ChatGPT something you already know the answer to: \"What are the basic ingredients for making pancakes?\" See how it compares to your knowledge.",
      description: "This gentle start helps you see AI as a helpful tool, not a threat."
    };
  }, []);

  // Render welcome screen
  const renderWelcomeScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-40"></div>
      
      {/* Animated background elements */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
      <div className="absolute top-10 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
      <div className="absolute bottom-10 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-500"></div>
      
      {/* Mobile scroll indicator */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden no-print">
        <div className="bg-purple-600 text-white p-3 rounded-full shadow-lg animate-bounce-gentle">
          <ChevronDown className="h-5 w-5" />
        </div>
      </div>
      
      <div className="flex items-center justify-center min-h-screen p-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white/80 glass-effect rounded-3xl shadow-2xl overflow-hidden border border-white/20 animate-fade-in">
            <div className="p-6 md:p-16">
              {/* Hero section */}
              <div className="text-center mb-12 md:mb-16">
                <div className="relative mb-6 md:mb-8">
                  <div className="w-20 h-20 md:w-24 md:h-24 mx-auto bg-gradient-to-br from-purple-500 to-indigo-600 rounded-3xl flex items-center justify-center shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                    <Brain className="h-10 w-10 md:h-12 md:w-12 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                </div>
                
                <h1 className="text-4xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 via-purple-800 to-indigo-700 bg-clip-text text-transparent mb-4 md:mb-6 leading-tight">
                  Discover Your
                  <br />
                  <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">AI Confidence Level</span>
                </h1>
                
                <p className="text-lg md:text-2xl text-gray-600 leading-relaxed max-w-4xl mx-auto mb-6 md:mb-8 px-4">
                  Navigate the AI revolution with confidence. Our thoughtful assessment helps you understand your relationship with artificial intelligence and creates a <span className="font-semibold text-purple-600">personalized roadmap</span> for building AI skills that matter.
                </p>

                {/* Key features */}
                <div className="flex items-center justify-center space-x-4 md:space-x-8 mb-8 md:mb-12">
                  <div className="text-center group relative">
                    <div className="text-2xl md:text-3xl font-bold text-purple-600">14</div>
                    <div className="text-xs md:text-sm text-gray-600">AI-Focused Questions</div>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                      Evidence-based questions
                    </div>
                  </div>
                  <div className="w-px h-6 md:h-8 bg-gray-300"></div>
                  <div className="text-center group relative">
                    <div className="text-2xl md:text-3xl font-bold text-indigo-600">3-5</div>
                    <div className="text-xs md:text-sm text-gray-600">Minutes to Complete</div>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                      Quick & thoughtful
                    </div>
                  </div>
                  <div className="w-px h-6 md:h-8 bg-gray-300"></div>
                  <div className="text-center group relative">
                    <div className="text-2xl md:text-3xl font-bold text-blue-600">100%</div>
                    <div className="text-xs md:text-sm text-gray-600">Free & Private</div>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                      No data collection
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Feature cards */}
              <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
                <div className="text-center p-6 md:p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100 hover:shadow-lg transition-all duration-300 group">
                  <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 md:mb-6 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Rocket className="h-8 w-8 md:h-10 md:w-10 text-white" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">AI-Specific Insights</h3>
                  <p className="text-sm md:text-base text-gray-600">Get targeted analysis of your artificial intelligence comfort and capability levels</p>
                </div>
                
                <div className="text-center p-6 md:p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 hover:shadow-lg transition-all duration-300 group">
                  <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 md:mb-6 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Brain className="h-8 w-8 md:h-10 md:w-10 text-white" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">Human-Centered AI</h3>
                  <p className="text-sm md:text-base text-gray-600">Personalized recommendations that put you in control of your AI journey</p>
                </div>
                
                <div className="text-center p-6 md:p-8 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 hover:shadow-lg transition-all duration-300 group">
                  <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 md:mb-6 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Users className="h-8 w-8 md:h-10 md:w-10 text-white" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">Instant Results</h3>
                  <p className="text-sm md:text-base text-gray-600">Get immediate feedback and actionable next steps for your AI journey</p>
                </div>
              </div>

              {/* What you'll discover */}
              <div className="bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50 rounded-3xl p-6 md:p-10 mb-8 md:mb-12 border border-purple-100">
                <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-6 md:mb-8">What You'll Discover About Your AI Journey</h3>
                <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                  <div className="space-y-3 md:space-y-4">
                    {[
                      "Your current AI confidence and readiness level",
                      "Specific AI areas where you already excel", 
                      "AI opportunities perfectly matched to your interests"
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-3 md:space-x-4">
                        <div className="w-7 h-7 md:w-8 md:h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-white" />
                        </div>
                        <span className="text-sm md:text-base text-gray-700 font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-3 md:space-y-4">
                    {[
                      "Actionable AI steps you can take today",
                      "AI resources tailored to your confidence level",
                      "Easy ways to share and discuss your results"
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-3 md:space-x-4">
                        <div className="w-7 h-7 md:w-8 md:h-8 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Star className="h-4 w-4 md:h-5 md:w-5 text-white" />
                        </div>
                        <span className="text-sm md:text-base text-gray-700 font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Call to action */}
              <div className="text-center">
                <div className="mb-6">
                  <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">
                    Ready to Navigate Your AI Future?
                  </h2>
                  <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
                    Whether you're AI-curious or AI-hesitant, understanding where you stand is the first step toward building meaningful confidence with artificial intelligence.
                  </p>
                </div>

                {/* Name input */}
                <div className="max-w-md mx-auto mb-6 md:mb-8">
                  <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-gray-200">
                    <label className="block text-sm font-semibold text-gray-700 mb-3 text-center">
                      What should we call you?
                    </label>
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="Enter your first name"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors text-base md:text-lg text-center"
                      maxLength={30}
                      autoComplete="given-name"
                    />
                  </div>
                </div>
                
                {/* Start button */}
                <button
                  onClick={() => {
                    if (userName.trim()) {
                      setIsStarted(true);
                      // Track start event
                      if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
                        window.gtag('event', 'assessment_start', {
                          user_name: userName.trim()
                        });
                      }
                    }
                  }}
                  disabled={!userName.trim()}
                  className={`group relative font-bold py-4 md:py-6 px-8 md:px-12 rounded-2xl text-lg md:text-xl transition-all duration-300 transform shadow-2xl ${
                    userName.trim() 
                      ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white hover:from-purple-700 hover:via-indigo-700 hover:to-blue-700 hover:scale-105 active:scale-95' 
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <span className="relative z-10 flex items-center space-x-3">
                    <span>{userName.trim() ? `Start Your AI Assessment, ${userName}` : 'Enter Your Name to Begin'}</span>
                    {userName.trim() && <ArrowRight className="h-5 w-5 md:h-6 md:w-6 group-hover:translate-x-1 transition-transform" />}
                  </span>
                  {userName.trim() && (
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
                  )}
                </button>
                
                {/* Trust indicators */}
                <div className="mt-6 md:mt-8 flex items-center justify-center space-x-4 md:space-x-8 text-xs md:text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <Zap className="h-3 w-3 md:h-4 md:w-4" />
                    <span>Just 3-5 minutes</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="h-3 w-3 md:h-4 md:w-4" />
                    <span>Completely private</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Heart className="h-3 w-3 md:h-4 md:w-4" />
                    <span>Human-centered</span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="text-center pt-6 md:pt-8 mt-8 md:mt-12 border-t border-gray-200">
                <div className="flex items-center justify-center space-x-2 text-gray-500">
                  <span className="text-xs md:text-sm">Powered by</span>
                  <div className="flex items-center space-x-1">
                    <Brain className="h-3 w-3 md:h-4 md:w-4 text-purple-600" />
                    <span className="font-bold text-purple-600 text-sm md:text-base">HumanXAI</span>
                  </div>
                  <ExternalLink className="h-3 w-3" />
                </div>
                <p className="text-xs text-gray-400 mt-1">Human-centered AI for everyone</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Render question screen
  const renderQuestionScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-40"></div>
      <div className="absolute top-20 left-20 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
      
      <div className="flex items-center justify-center min-h-screen p-4 relative z-10">
        <div className="w-full max-w-4xl mx-auto">
          {/* Progress section */}
          <div className="mb-6 md:mb-8">
            {milestone && (
              <div className="text-center mb-4 animate-bounce-gentle">
                <div className="inline-flex items-center bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  <span className="mr-2">{milestone.emoji}</span>
                  {milestone.message}
                </div>
              </div>
            )}

            {/* Category indicators */}
            <div className="flex items-center justify-center mb-4">
              <div className="flex space-x-2">
                {['Comfort', 'Skills', 'Awareness', 'Application', 'Mindset'].map((cat, i) => (
                  <div
                    key={cat}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i <= Math.floor(currentQuestion / 3) ? 'bg-purple-500 scale-125' : 'bg-gray-300'
                    }`}
                    title={cat}
                  />
                ))}
              </div>
            </div>

            {/* Progress bar */}
            <div className="flex justify-between items-center mb-4">
              <div className="bg-white/80 glass-effect rounded-full px-3 md:px-4 py-2 shadow-lg">
                <span className="text-xs md:text-sm font-bold text-gray-700">
                  Question {currentQuestion + 1} of {questions.length}
                </span>
              </div>
              <div className="bg-white/80 glass-effect rounded-full px-3 md:px-4 py-2 shadow-lg">
                <span className="text-xs md:text-sm font-bold text-purple-600">
                  {Math.round(progress)}% Complete
                </span>
              </div>
            </div>
            <div className="w-full bg-white/50 rounded-full h-3 shadow-inner">
              <div 
                className="bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-600 h-3 rounded-full transition-all duration-700 ease-out shadow-lg relative overflow-hidden"
                style={{ width: `${progress}%` }}
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Question card */}
          <div className="bg-white/90 glass-effect rounded-3xl shadow-2xl p-6 md:p-12 border border-white/20 animate-scale-in">
            <div className="text-center mb-8 md:mb-10">
              <div className="text-xs md:text-sm font-semibold text-purple-600 mb-3 md:mb-4 uppercase tracking-wider">
                {question.theme} • {question.category.replace('ai-', '').replace('-', ' ')}
              </div>
              <h2 className="text-xl md:text-4xl font-bold text-gray-900 mb-6 md:mb-8 leading-relaxed px-4">
                {question.text}
              </h2>
            </div>

            {/* Answer options */}
            <div className="space-y-3 md:space-y-4 mb-8 md:mb-10">
              {scaleOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(question.id, option.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleAnswer(question.id, option.value);
                    }
                  }}
                  aria-pressed={answers[question.id] === option.value}
                  aria-label={`Rate as ${option.label}`}
                  className={`w-full p-4 md:p-6 rounded-xl md:rounded-2xl border-2 transition-all duration-300 text-left group transform ${
                    answers[question.id] === option.value
                      ? 'border-purple-500 bg-gradient-to-r from-purple-50 to-indigo-50 text-purple-900 shadow-xl scale-105'
                      : 'border-gray-200 bg-white/80 hover:border-purple-300 hover:bg-purple-50 hover:shadow-lg hover:scale-105 active:scale-95'
                  }`}
                >
                  <div className="flex items-center space-x-3 md:space-x-4">
                    <div className={`w-5 h-5 md:w-6 md:h-6 rounded-full border-2 flex-shrink-0 transition-all ${
                      answers[question.id] === option.value
                        ? 'border-purple-500 bg-purple-500 shadow-lg'
                        : 'border-gray-300 group-hover:border-purple-400'
                    }`}>
                      {answers[question.id] === option.value && (
                        <div className="w-full h-full rounded-full bg-white scale-50"></div>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 md:space-x-3">
                      <span className="text-xl md:text-2xl">{option.emoji}</span>
                      <span className="font-semibold text-base md:text-lg">{option.label}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <button
                onClick={prevQuestion}
                disabled={currentQuestion === 0}
                className={`flex items-center space-x-2 md:space-x-3 py-3 md:py-4 px-6 md:px-8 rounded-xl md:rounded-2xl font-semibold transition-all transform ${
                  currentQuestion === 0
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100 hover:shadow-lg hover:scale-105 active:scale-95'
                }`}
              >
                <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
                <span className="text-sm md:text-base">Previous</span>
              </button>

              <button
                onClick={nextQuestion}
                disabled={!hasAnswer || isLoading}
                className={`flex items-center space-x-2 md:space-x-3 py-3 md:py-4 px-6 md:px-8 rounded-xl md:rounded-2xl font-bold text-base md:text-lg transition-all transform ${
                  hasAnswer && !isLoading
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 md:h-5 md:w-5 animate-spin" />
                    <span>Loading...</span>
                  </>
                ) : (
                  <>
                    <span>{currentQuestion === questions.length - 1 ? 'See My AI Results' : 'Next Question'}</span>
                    <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Render results screen with LinkedIn connection
  const renderResultsScreen = () => (
    <div className={`min-h-screen bg-gradient-to-br ${tier.bgPattern} relative overflow-hidden`}>
      <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
      
      {/* Confetti animation that disappears after 10 seconds */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="text-6xl animate-bounce">🎉</div>
          </div>
          <div className="absolute top-1/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2 animate-ping">
            <div className="text-4xl">✨</div>
          </div>
          <div className="absolute top-2/3 right-1/3 transform translate-x-1/2 -translate-y-1/2 animate-pulse">
            <div className="text-4xl">🌟</div>
          </div>
        </div>
      )}
      
      <div className="flex items-center justify-center min-h-screen p-4 relative z-10">
        <div className="max-w-4xl w-full mx-auto">
          <div className="bg-white/90 glass-effect rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden border border-white/20 animate-fade-in">
            {/* Header with score */}
            <div className={`bg-gradient-to-r ${tier.color} p-6 md:p-12 text-white text-center relative overflow-hidden`}>
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10">
                <div className="mb-4 text-4xl md:text-6xl">{tier.emoji}</div>
                <div className="mb-3 md:mb-4">
                  {tier.icon}
                </div>
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
                  {userName ? `${userName}, you're an ${tier.level}!` : `You're an ${tier.level}!`}
                </h1>
                <p className="text-lg md:text-xl lg:text-2xl opacity-95 mb-6 md:mb-8 max-w-2xl mx-auto px-4">{tier.description}</p>
                
                <div className="relative inline-block">
                  <div className="bg-white/20 glass-effect rounded-2xl md:rounded-3xl p-4 md:p-8 border border-white/30">
                    <div className="text-4xl md:text-6xl lg:text-7xl font-bold mb-1 md:mb-2">
                      {scoreAnimation}%
                    </div>
                    <div className="text-sm md:text-lg opacity-90">AI Confidence Score</div>
                  </div>
                  <div className="absolute -top-2 -right-2 md:-top-4 md:-right-4 w-8 h-8 md:w-12 md:h-12 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
                    <Star className="h-4 w-4 md:h-6 md:w-6 text-yellow-800" />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-12 lg:p-16">
              {/* AI Journey and Next Steps */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl md:rounded-3xl p-6 md:p-8 border border-gray-200">
                  <div className="flex items-center space-x-3 mb-3 md:mb-4">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg md:rounded-xl flex items-center justify-center">
                      <Target className="h-4 w-4 md:h-6 md:w-6 text-white" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900">Your AI Journey</h3>
                  </div>
                  <p className="text-gray-700 text-base md:text-lg leading-relaxed">{tier.objective}</p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl md:rounded-3xl p-6 md:p-8 border border-purple-200">
                  <div className="flex items-center space-x-3 mb-3 md:mb-4">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg md:rounded-xl flex items-center justify-center">
                      <Rocket className="h-4 w-4 md:h-6 md:w-6 text-white" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900">Next AI Steps</h3>
                  </div>
                  <ul className="space-y-2 md:space-y-3">
                    {tier.actions.map((action, index) => (
                      <li key={index} className="flex items-start space-x-2 md:space-x-3">
                        <div className="w-5 h-5 md:w-6 md:h-6 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-md md:rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-white" />
                        </div>
                        <span className="text-gray-700 font-medium text-sm md:text-base">{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Comprehensive AI Toolkit */}
              <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 rounded-2xl md:rounded-3xl p-6 md:p-10 mb-8 md:mb-12 border-2 border-emerald-200">
                <div className="text-center mb-6 md:mb-8">
                  <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 md:mb-6 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl md:rounded-3xl flex items-center justify-center shadow-lg">
                    <BookOpen className="h-8 w-8 md:h-10 md:w-10 text-white" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-3">
                    {userName ? `${userName}, here's your personalized AI toolkit!` : 'Your Personalized AI Toolkit'}
                  </h3>
                  <p className="text-lg md:text-xl text-gray-600 mb-3 md:mb-4 px-4">
                    Curated resources and tools perfectly matched to your <span className="font-bold text-teal-600">{tier.level}</span> level
                  </p>
                  <p className="text-gray-500 text-sm md:text-base">
                    🎁 No signup required - everything you need is right here
                  </p>
                </div>

                {/* AI Tools Recommendations */}
                <div className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 shadow-lg mb-6">
                  <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                    <Rocket className="h-5 w-5 md:h-6 md:w-6 text-purple-600" />
                    <span>Recommended AI Tools</span>
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                    {getToolRecommendations(score).map((tool, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors group">
                        <div className="flex items-start justify-between mb-2">
                          <h5 className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors">{tool.name}</h5>
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                            tool.badge === 'Free' ? 'bg-green-100 text-green-800' :
                            tool.badge === 'Pro' ? 'bg-purple-100 text-purple-800' :
                            tool.badge === 'Beginner' ? 'bg-blue-100 text-blue-800' :
                            'bg-orange-100 text-orange-800'
                          }`}>
                            {tool.badge}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">{tool.desc}</p>
                        <button 
                          onClick={() => {
                            if (typeof window !== 'undefined') {
                              window.open(tool.url, '_blank');
                              // Track tool click
                              if (typeof window.gtag === 'function') {
                                window.gtag('event', 'tool_click', {
                                  tool_name: tool.name,
                                  confidence_level: tier.level
                                });
                              }
                            }
                          }}
                          className="text-purple-600 hover:text-purple-800 text-sm font-medium flex items-center space-x-1 group-hover:translate-x-1 transition-transform"
                        >
                          <span>Try it out</span>
                          <ExternalLink className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Learning Path */}
                <div className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 shadow-lg mb-6">
                  <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 md:h-6 md:w-6 text-emerald-600" />
                    <span>Your 30-Day AI Learning Path</span>
                  </h4>
                  <div className="space-y-4">
                    {getLearningPath(score).map((step, index) => (
                      <div key={index} className="flex items-start space-x-4 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg">
                        <div className="flex-shrink-0 w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-lg">{step.icon}</span>
                            <span className="font-semibold text-emerald-700">{step.week}</span>
                          </div>
                          <p className="text-gray-700">{step.task}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Wins */}
                <div className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 shadow-lg">
                  <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                    <Star className="h-5 w-5 md:h-6 md:w-6 text-yellow-500" />
                    <span>Try This Right Now (5-Minute Win)</span>
                  </h4>
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-6 border-l-4 border-yellow-400">
                    {(() => {
                      const quickWin = getQuickWin(score);
                      return (
                        <div>
                          <h5 className="font-bold text-gray-900 mb-2">{quickWin.title}</h5>
                          <p className="text-gray-700 mb-3">{quickWin.task}</p>
                          <p className="text-sm text-gray-600 mb-4">{quickWin.description}</p>
                          <button 
                            onClick={() => {
                              if (typeof window !== 'undefined') {
                                window.open('https://chat.openai.com', '_blank');
                                // Track quick win click
                                if (typeof window.gtag === 'function') {
                                  window.gtag('event', 'quick_win_click', {
                                    confidence_level: tier.level
                                  });
                                }
                              }
                            }}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center space-x-2"
                          >
                            <span>Try it now</span>
                            <ExternalLink className="h-4 w-4" />
                          </button>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </div>

              {/* LinkedIn Connection Section */}
              <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl md:rounded-3xl p-6 md:p-10 mb-8 md:mb-12 border-2 border-blue-200">
                <div className="text-center mb-6 md:mb-8">
                  <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 md:mb-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl md:rounded-3xl flex items-center justify-center shadow-lg">
                    <Linkedin className="h-8 w-8 md:h-10 md:w-10 text-white" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-3">
                    {userName ? `Connect with me on LinkedIn, ${userName}!` : 'Connect with me on LinkedIn!'}
                  </h3>
                  <p className="text-lg md:text-xl text-gray-600 mb-3 md:mb-4 px-4">
                    If this AI assessment was helpful, I'd love to <span className="font-bold text-indigo-600">connect and share more AI insights</span> with you
                  </p>
                  <p className="text-gray-500 text-sm md:text-base">
                    💼 Follow my journey building human-centered AI tools and resources
                  </p>
                </div>

                <div className="space-y-4 md:space-y-6">
                  <div className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 shadow-lg">
                    <div className="max-w-lg mx-auto text-center">
                      <div className="mb-4">
                        <div className="inline-flex items-center space-x-2 text-gray-700 mb-2">
                          <Users className="h-5 w-5" />
                          <span className="font-semibold">Let's connect professionally</span>
                        </div>
                        <p className="text-gray-600 text-sm">
                          Join my network of {tier.level}s and AI enthusiasts
                        </p>
                      </div>
                      
                      <button
                        onClick={() => {
                          if (typeof window !== 'undefined') {
                            window.open('https://www.linkedin.com/in/humanxai/', '_blank');
                            // Track LinkedIn connection
                            if (typeof window.gtag === 'function') {
                              window.gtag('event', 'linkedin_connect', {
                                confidence_level: tier.level,
                                score: score
                              });
                            }
                          }
                        }}
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-3 px-8 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-2 mx-auto"
                      >
                        <Linkedin className="h-5 w-5" />
                        <span>Connect on LinkedIn</span>
                        <ExternalLink className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl md:rounded-2xl p-4 md:p-6 border border-green-200">
                    <h4 className="font-bold text-green-900 mb-3 md:mb-4 text-center flex items-center justify-center space-x-2">
                      <Heart className="h-4 w-4 md:h-5 md:w-5" />
                      <span className="text-sm md:text-base">When you connect, you'll get access to:</span>
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 text-xs md:text-sm">
                      <div className="space-y-1 md:space-y-2">
                        <div className="text-green-800 font-medium">🚀 Latest AI tool discoveries and reviews</div>
                        <div className="text-green-800 font-medium">💡 {tier.level}-specific tips and strategies</div>
                        <div className="text-green-800 font-medium">🎯 Exclusive AI career and skill insights</div>
                      </div>
                      <div className="space-y-1 md:space-y-2">
                        <div className="text-green-800 font-medium">🤝 Professional AI community network</div>
                        <div className="text-green-800 font-medium">📈 Industry trends and analysis</div>
                        <div className="text-green-800 font-medium">🎁 Early access to new assessments</div>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 text-center">
                    🌟 Building the future of human-centered AI, one connection at a time
                  </p>
                </div>
              </div>

              {/* Community Section */}
              <div className="bg-gradient-to-r from-indigo-50 via-blue-50 to-cyan-50 rounded-2xl md:rounded-3xl p-6 md:p-10 mb-8 md:mb-12 border border-blue-200">
                <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-6 md:mb-8">
                  Building AI Confidence Together
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                  {[
                    {
                      icon: <Brain className="h-6 w-6 md:h-8 md:w-8 text-indigo-600" />,
                      title: "Learn AI Gradually",
                      desc: "Build AI skills step by step, at your own comfortable pace",
                      color: "from-indigo-500 to-purple-500"
                    },
                    {
                      icon: <Lightbulb className="h-6 w-6 md:h-8 md:w-8 text-blue-600" />,
                      title: "Practice AI Regularly", 
                      desc: "Small, consistent AI interactions build lasting confidence",
                      color: "from-blue-500 to-cyan-500"
                    },
                    {
                      icon: <Users className="h-6 w-6 md:h-8 md:w-8 text-purple-600" />,
                      title: "Share Your Journey",
                      desc: "Connect with others and inspire them to explore AI too",
                      color: "from-purple-500 to-pink-500"
                    }
                  ].map((item, index) => (
                    <div key={index} className="text-center group">
                      <div className={`w-16 h-16 md:w-20 md:h-20 mx-auto mb-3 md:mb-4 bg-gradient-to-br ${item.color} rounded-xl md:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        {item.icon}
                      </div>
                      <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-2">{item.title}</h4>
                      <p className="text-gray-600 text-sm md:text-base">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4 md:space-y-6">
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                  <button
                    onClick={restart}
                    className="flex items-center justify-center space-x-2 md:space-x-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 font-semibold py-3 md:py-4 px-6 md:px-8 rounded-xl md:rounded-2xl hover:from-gray-200 hover:to-gray-300 transition-all shadow-lg text-sm md:text-base transform hover:scale-105 active:scale-95"
                  >
                    <RotateCcw className="h-4 w-4 md:h-5 md:w-5" />
                    <span>Take Assessment Again</span>
                  </button>
                  
                  <button
                    onClick={copyResults}
                    data-copy-button
                    className="flex items-center justify-center space-x-2 md:space-x-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 md:py-4 px-6 md:px-8 rounded-xl md:rounded-2xl hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg text-sm md:text-base transform hover:scale-105 active:scale-95"
                  >
                    <Copy className="h-4 w-4 md:h-5 md:w-5" />
                    <span>Copy Results</span>
                  </button>
                </div>

                {/* Social Sharing */}
                <div className="text-center">
                  <p className="text-gray-600 text-sm md:text-base mb-4">
                    🤖 <strong>Share your AI confidence with others:</strong>
                  </p>
                  <div className="flex justify-center space-x-3">
                    <button
                      onClick={() => shareToSocial('twitter')}
                      className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium transform hover:scale-105 active:scale-95"
                    >
                      <Twitter className="h-4 w-4" />
                      <span>Twitter</span>
                    </button>
                    <button
                      onClick={() => shareToSocial('linkedin')}
                      className="flex items-center space-x-2 bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors text-sm font-medium transform hover:scale-105 active:scale-95"
                    >
                      <Linkedin className="h-4 w-4" />
                      <span>LinkedIn</span>
                    </button>
                    <button
                      onClick={() => shareToSocial('facebook')}
                      className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium transform hover:scale-105 active:scale-95"
                    >
                      <Facebook className="h-4 w-4" />
                      <span>Facebook</span>
                    </button>
                  </div>
                </div>
                
                <div className="text-center px-4">
                  <p className="text-gray-600 text-sm md:text-base">
                    💡 <strong>Know someone who's curious about AI?</strong> Help them discover their confidence level too!
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="text-center pt-8 border-t border-gray-200">
                <div className="flex items-center justify-center space-x-2 text-gray-500">
                  <span className="text-sm">Powered by</span>
                  <div className="flex items-center space-x-1">
                    <Brain className="h-4 w-4 text-purple-600" />
                    <span className="font-bold text-purple-600">HumanXAI</span>
                  </div>
                  <ExternalLink className="h-3 w-3" />
                </div>
                <p className="text-xs text-gray-400 mt-1">Human-centered AI for everyone</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Main render logic
  if (!isStarted) {
    return renderWelcomeScreen();
  }

  if (showResults) {
    return renderResultsScreen();
  }

  return renderQuestionScreen();
};

export default AIConfidenceAssessment;