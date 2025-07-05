import React, { useState, useEffect, useRef } from 'react';
// Removed specific GSAP imports as they were causing resolution errors in this environment.
// Assuming GSAP and ScrollTrigger are globally available via CDN in the surrounding HTML context.

function App() {
    // Register GSAP plugins (assuming gsap is globally available)
    // This line should remain as it registers the plugin with the global GSAP object.
    // Ensure GSAP and ScrollTrigger are loaded via CDN in the main HTML file (e.g., public/index.html)
    useEffect(() => {
        if (window.gsap && !window.gsap.ScrollTrigger) {
            window.gsap.registerPlugin(window.ScrollTrigger);
        }
    }, []);


    // State for Trust Indicators Section
    const [userCount, setUserCount] = useState(0);
    const [cardCount, setCardCount] = useState(0);
    const [approvalRate, setApprovalRate] = useState(0);

    // State for Rewards Calculator
    const [monthlySpend, setMonthlySpend] = useState(25000);
    const [spendingCategory, setSpendingCategory] = useState('shopping');
    const [potentialEarnings, setPotentialEarnings] = useState(0);

    // State for Smart Tips Section
    const [completedTips, setCompletedTips] = useState(0);
    const accordionRefs = useRef([]);

    // State for Testimonials Carousel
    const [currentSlide, setCurrentSlide] = useState(0);
    const testimonialsCarouselRef = useRef(null);

    // State for Feature Comparison Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({
        cardType: '',
        features: '',
        idealFor: '',
        annualFee: ''
    });

    // State for FAQ Section
    const [searchTerm, setSearchTerm] = useState('');
    const faqRefs = useRef([]);

    // Refs for various elements
    const monthlySpendInputRef = useRef(null);
    const spendingCategorySelectRef = useRef(null);
    const tipProgressBarRef = useRef(null);
    const applicationProgressBarRef = useRef(null);

    // Effect for Hero Section Animations
    useEffect(() => {
        if (window.gsap) {
            window.gsap.from(".animate-fade-in-up", {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                stagger: 0.2
            });
            window.gsap.from(".animate-scale-in", {
                scale: 0.8,
                opacity: 0,
                duration: 0.8,
                ease: "back.out(1.7)",
                stagger: 0.1,
                delay: 0.5
            });
            window.gsap.from(".animate-fade-in-right", {
                x: 100,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                stagger: 0.2,
                delay: 0.8
            });
        }
    }, []);

    // Effect for Credit Card Stack Rotation
    useEffect(() => {
        if (window.gsap) {
            window.gsap.to(".credit-card-item:nth-child(1)", {
                rotationY: 360,
                repeat: -1,
                duration: 20,
                ease: "none"
            });
            window.gsap.to(".credit-card-item:nth-child(2)", {
                rotationY: -360,
                repeat: -1,
                duration: 25,
                ease: "none"
            });
            window.gsap.to(".credit-card-item:nth-child(3)", {
                rotationY: 360,
                repeat: -1,
                duration: 18,
                ease: "none"
            });
        }
    }, []);

    // Effect for Trust Indicators - Counter Animation
    useEffect(() => {
        const animateCount = (setter, target, isPercentage = false) => {
            let current = 0;
            const increment = target / 100;

            const updateCount = () => {
                if (current < target) {
                    current += increment;
                    setter(Math.round(current));
                    requestAnimationFrame(updateCount);
                } else {
                    setter(target);
                }
            };
            updateCount();
        };

        if (window.ScrollTrigger) {
            window.ScrollTrigger.create({
                trigger: "#user-count",
                start: "top 80%",
                onEnter: () => {
                    animateCount(setUserCount, 500000);
                    animateCount(setCardCount, 60);
                    animateCount(setApprovalRate, 98);
                },
                once: true
            });
        }
    }, []);

    // Effect for Featured Credit Cards - Strikethrough Animation & Popularity Bar
    useEffect(() => {
        if (window.ScrollTrigger) {
            window.ScrollTrigger.create({
                trigger: ".strikethrough-text",
                start: "top 80%",
                onEnter: () => {
                    document.querySelector(".strikethrough-text")?.classList.add("strike");
                },
                once: true
            });

            window.ScrollTrigger.create({
                trigger: "#popularity-bar-1",
                start: "top 80%",
                onEnter: () => {
                    if (window.gsap) {
                        window.gsap.to("#popularity-bar-1", { width: "85%", duration: 1.5, ease: "power2.out" });
                        window.gsap.to("#popularity-bar-2", { width: "92%", duration: 1.5, ease: "power2.out", delay: 0.2 });
                        window.gsap.to("#popularity-bar-3", { width: "78%", duration: 1.5, ease: "power2.out", delay: 0.4 });
                    }
                },
                once: true
            });
        }
    }, []);

    // Effect for Rewards Calculator
    useEffect(() => {
        const calculateEarnings = () => {
            const spend = monthlySpend;
            const category = spendingCategory;
            let cashbackRate = 0;

            switch (category) {
                case 'shopping':
                    cashbackRate = 0.05; // 5%
                    break;
                case 'travel':
                    cashbackRate = 0.03; // 3%
                    break;
                case 'dining':
                    cashbackRate = 0.04; // 4%
                    break;
                case 'fuel':
                    cashbackRate = 0.02; // 2%
                    break;
                case 'groceries':
                    cashbackRate = 0.035; // 3.5%
                    break;
                default:
                    cashbackRate = 0;
            }
            setPotentialEarnings(spend * cashbackRate);
        };
        calculateEarnings();
    }, [monthlySpend, spendingCategory]);

    // Effect for Benefits Section - Expandable Content & Icon Animation on Scroll
    useEffect(() => {
        document.querySelectorAll('.benefit-card').forEach(card => {
            const content = card.querySelector('.expandable-content');
            const icon = card.querySelector('.benefit-icon');

            const handleClick = () => {
                content.classList.toggle('expanded');
            };
            card.addEventListener('click', handleClick);

            if (window.ScrollTrigger && window.gsap) {
                window.ScrollTrigger.create({
                    trigger: card,
                    start: "top 80%",
                    onEnter: () => {
                        const benefitType = card.dataset.benefit;
                        if (benefitType === 'security') {
                            window.gsap.fromTo(icon, { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" });
                        } else if (benefitType === 'rewards') {
                            window.gsap.fromTo(icon, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "bounce.out" });
                        } else if (benefitType === 'credit-score') {
                            window.gsap.fromTo(icon, { x: -20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" });
                        } else if (benefitType === 'interest-free') {
                            window.gsap.fromTo(icon, { rotationX: 90, opacity: 0 }, { rotationX: 0, opacity: 1, duration: 0.8, ease: "power2.out" });
                        } else if (benefitType === 'deals') {
                            window.gsap.fromTo(icon, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, ease: "elastic.out(1, 0.5)" });
                        }
                    },
                    once: true
                });
            }

            return () => {
                card.removeEventListener('click', handleClick);
            };
        });
    }, []);

    // Effect for How Credit Cards Work - Interactive Timeline
    useEffect(() => {
        document.querySelectorAll('.timeline-item').forEach((item, index) => {
            if (window.gsap && window.ScrollTrigger) {
                window.gsap.from(item, {
                    opacity: 0,
                    x: index % 2 === 0 ? -100 : 100,
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 80%",
                        toggleActions: "play none none none",
                        once: true
                    }
                });
            }
        });
    }, []);

    // Interactive Card Transaction Simulation
    const startSimulation = () => {
        const simCard = document.getElementById('sim-card');
        const simMerchant = document.getElementById('sim-merchant');
        const simBank = document.getElementById('sim-bank');
        const simApproved = document.getElementById('sim-approved');
        const simArrow1 = document.getElementById('sim-arrow-1');
        const simArrow2 = document.getElementById('sim-arrow-2');
        const simArrow3 = document.getElementById('sim-arrow-3');

        if (window.gsap) {
            window.gsap.set([simCard, simMerchant, simBank, simApproved], { clearProps: "all" });
            window.gsap.set([simArrow1, simArrow2, simArrow3], { clearProps: "all" });

            const tl = window.gsap.timeline({ defaults: { duration: 0.5, ease: "power2.out" } });

            tl.to(simCard, { scale: 1.1, yoyo: true, repeat: 1 })
              .to(simArrow1, { x: 10, opacity: 0.5, duration: 0.3 }, "<")
              .to(simMerchant, { scale: 1.1, yoyo: true, repeat: 1 })
              .to(simArrow1, { x: 0, opacity: 1, duration: 0.3 }, "<")
              .to(simArrow2, { x: 10, opacity: 0.5, duration: 0.3 })
              .to(simBank, { scale: 1.1, yoyo: true, repeat: 1 })
              .to(simArrow2, { x: 0, opacity: 1, duration: 0.3 }, "<")
              .to(simArrow3, { x: 10, opacity: 0.5, duration: 0.3 })
              .to(simApproved, { scale: 1.2, color: "#48bb78", duration: 0.6, ease: "elastic.out(1, 0.5)" })
              .to(simArrow3, { x: 0, opacity: 1, duration: 0.3 }, "<");
        }
    };

    // Smart Tips Section - Accordion & Progress Bar
    useEffect(() => {
        const updateTipProgressBar = () => {
            const totalTips = accordionRefs.current.length;
            const progress = (completedTips / totalTips) * 100;
            if (window.gsap && tipProgressBarRef.current) {
                window.gsap.to(tipProgressBarRef.current, { width: `${progress}%`, duration: 0.5, ease: "power2.out" });
            }
        };
        updateTipProgressBar();
    }, [completedTips]);

    const handleAccordionClick = (index) => {
        const content = accordionRefs.current[index].nextElementSibling;
        const chevron = accordionRefs.current[index].querySelector('.fa-chevron-down');

        // Close all other open accordions
        accordionRefs.current.forEach((header, i) => {
            if (i !== index && header) { // Add null check for header
                header.nextElementSibling.style.maxHeight = null;
                header.querySelector('.fa-chevron-down')?.classList.remove('rotate-180'); // Optional chaining
                if (header.dataset.completed === 'true') {
                    header.dataset.completed = 'false';
                    setCompletedTips(prev => prev - 1);
                }
            }
        });

        // Toggle current accordion
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
            chevron.classList.remove('rotate-180');
            if (accordionRefs.current[index].dataset.completed === 'true') {
                accordionRefs.current[index].dataset.completed = 'false';
                setCompletedTips(prev => prev - 1);
            }
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
            chevron.classList.add('rotate-180');
            if (accordionRefs.current[index].dataset.completed !== 'true') {
                accordionRefs.current[index].dataset.completed = 'true';
                setCompletedTips(prev => prev + 1);
            }
        }
    };

    // Effect for Application Process - Step Indicators & Progress Bar
    useEffect(() => {
        document.querySelectorAll('.step-item').forEach((item, index) => {
            if (window.gsap && window.ScrollTrigger) {
                window.gsap.from(item, {
                    opacity: 0,
                    x: 50,
                    duration: 0.8,
                    ease: "power2.out",
                    delay: index * 0.1,
                    scrollTrigger: {
                        trigger: item,
                        start: "top 80%",
                        toggleActions: "play none none none",
                        onEnter: () => {
                            if (applicationProgressBarRef.current) {
                                window.gsap.to(applicationProgressBarRef.current, { width: `${((index + 1) / 4) * 100}%`, duration: 0.5, ease: "power2.out" });
                            }
                        },
                        once: true
                    }
                });
            }
        });
    }, []);

    // Effect for Trust & Security Section - Testimonials Carousel
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % 3); // Assuming 3 testimonials
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (testimonialsCarouselRef.current) {
            const offset = -currentSlide * 100;
            testimonialsCarouselRef.current.style.transform = `translateX(${offset}%)`;
        }
    }, [currentSlide]);

    // Types of Credit Cards - Filter and Modal
    const handleFilterClick = (category) => {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('bg-blue-600', 'text-white');
            btn.classList.add('bg-gray-200', 'text-gray-800');
        });
        document.querySelector(`[data-category="${category}"]`)?.classList.add('bg-blue-600', 'text-white');
        document.querySelector(`[data-category="${category}"]`)?.classList.remove('bg-gray-200', 'text-gray-800');

        document.querySelectorAll('.card-type-item').forEach(card => {
            const cardCategories = card.dataset.categories.split(' ');
            if (window.gsap) {
                if (category === 'all' || cardCategories.includes(category)) {
                    window.gsap.to(card, { opacity: 1, scale: 1, display: 'block', duration: 0.3 });
                } else {
                    window.gsap.to(card, { opacity: 0, scale: 0.8, display: 'none', duration: 0.3 });
                }
            }
        });
    };

    const openComparisonModal = (cardType) => {
        let features = "";
        let idealFor = "";
        let annualFee = "";

        switch(cardType) {
            case "Travel Credit Card":
                features = "Unlimited Lounge Access, Air Miles, Travel Insurance";
                idealFor = "Frequent flyers, international travelers";
                annualFee = "₹2,500 - ₹10,000";
                break;
            case "Cashback Credit Card":
                features = "5% Cashback on All Spends, No Annual Fee";
                idealFor = "Everyday spenders, budget-conscious individuals";
                annualFee = "₹0 - ₹500";
                break;
            case "Rewards Credit Card":
                features = "Accelerated Reward Points, Vouchers, Merchandise";
                idealFor = "Shoppers, those who like redeeming points";
                annualFee = "₹500 - ₹2,000";
                break;
            case "Business Credit Card":
                features = "Higher Credit Limits, Expense Management, Corporate Benefits";
                idealFor = "Entrepreneurs, small business owners";
                annualFee = "₹1,000 - ₹5,000";
                break;
            case "Fuel Credit Card":
                features = "Cashback/Discounts on Fuel, Surcharge Waiver";
                idealFor = "Daily commuters, frequent drivers";
                annualFee = "₹0 - ₹750";
                break;
            case "Lifetime-Free Card":
                features = "No Annual Fee, No Joining Fee";
                idealFor = "Beginners, those who want a basic card without recurring costs";
                annualFee = "₹0";
                break;
            default:
                features = "N/A";
                idealFor = "N/A";
                annualFee = "N/A";
        }

        setModalContent({ cardType, features, idealFor, annualFee });
        setIsModalOpen(true);
        if (window.gsap) {
            window.gsap.fromTo("#feature-comparison-modal", { opacity: 0 }, { opacity: 1, duration: 0.3 });
            window.gsap.fromTo(document.querySelector("#feature-comparison-modal > div"), { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "back.out(1.7)" });
        }
    };

    const closeComparisonModal = () => {
        if (window.gsap) {
            window.gsap.to(document.querySelector("#feature-comparison-modal > div"), { y: -50, opacity: 0, duration: 0.3, onComplete: () => {
                setIsModalOpen(false);
            }});
            window.gsap.to("#feature-comparison-modal", { opacity: 0, duration: 0.3 });
        } else {
            setIsModalOpen(false);
        }
    };

    // FAQ Section - Accordion & Search
    const handleFaqSearch = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const handleFaqHeaderClick = (index) => {
        const content = faqRefs.current[index].nextElementSibling;
        const chevron = faqRefs.current[index].querySelector('.fa-chevron-down');

        // Close all other open FAQs
        faqRefs.current.forEach((header, i) => {
            if (i !== index && header) { // Add null check for header
                header.nextElementSibling.style.maxHeight = null;
                header.querySelector('.fa-chevron-down')?.classList.remove('rotate-180'); // Optional chaining
            }
        });

        // Toggle current FAQ
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
            chevron.classList.remove('rotate-180');
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
            chevron.classList.add('rotate-180');
        }
    };

    // Footer - Newsletter Signup
    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        const newsletterSuccess = document.getElementById('newsletter-success');
        if (window.gsap) {
            window.gsap.to(newsletterSuccess, { opacity: 1, display: 'block', duration: 0.5, onComplete: () => {
                window.gsap.to(newsletterSuccess, { opacity: 0, delay: 2, duration: 0.5, onComplete: () => {
                    newsletterSuccess.style.display = 'none';
                }});
            }});
        } else {
            newsletterSuccess.style.display = 'block';
            setTimeout(() => {
                newsletterSuccess.style.display = 'none';
            }, 2500);
        }
        e.target.reset(); // Reset the form
    };

    // Floating Action Button Animation
    useEffect(() => {
        if (window.gsap) {
            window.gsap.fromTo("#fab-apply-now",
                { y: 100, opacity: 0, scale: 0.5 },
                { y: 0, opacity: 1, scale: 1, duration: 1, ease: "elastic.out(1, 0.5)", delay: 2 }
            );
        }
    }, []);

    // General scroll-triggered fade-in for sections
    useEffect(() => {
        document.querySelectorAll('section').forEach(section => {
            if (!section.classList.contains('hero-section') && window.gsap && window.ScrollTrigger) {
                window.ScrollTrigger.create({
                    trigger: section,
                    start: "top 75%",
                    onEnter: () => window.gsap.from(section.querySelectorAll('.animate-fade-in, .animate-fade-in-up'), {
                        opacity: 0,
                        y: 50,
                        duration: 1,
                        ease: "power2.out",
                        stagger: 0.1
                    }),
                    once: true
                });
            }
        });
    }, []);

    return (
        <>
            {/* Custom CSS for animations and specific styles not easily done with Tailwind */}
            <style>
                {`
                body {
                    font-family: 'Inter', sans-serif;
                    overflow-x: hidden;
                    background-color: #f7fafc;
                }

                .btn-primary-gradient {
                    background-image: linear-gradient(to right, #1a365d, #63b3ed);
                    transition: all 0.3s ease-in-out;
                }
                .btn-primary-gradient:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
                }

                .btn-secondary-outline {
                    border: 2px solid #1a365d;
                    color: #1a365d;
                    transition: all 0.3s ease-in-out;
                }
                .btn-secondary-outline:hover {
                    background-color: #1a365d;
                    color: #ffffff;
                }

                .nav-link {
                    position: relative;
                    padding-bottom: 4px;
                }
                .nav-link::after {
                    content: '';
                    position: absolute;
                    width: 0;
                    height: 2px;
                    bottom: 0;
                    left: 0;
                    background-color: #63b3ed;
                    transition: width 0.3s ease-in-out;
                }
                .nav-link:hover::after {
                    width: 100%;
                }

                @keyframes logo-glow {
                    0% { text-shadow: 0 0 5px rgba(99, 179, 237, 0.5); }
                    50% { text-shadow: 0 0 20px rgba(99, 179, 237, 0.8), 0 0 30px rgba(99, 179, 237, 0.6); }
                    100% { text-shadow: 0 0 5px rgba(99, 179, 237, 0.5); }
                }
                .banks-cart-logo {
                    animation: logo-glow 3s infinite alternate;
                }

                .card-stack-container {
                    perspective: 1000px;
                }
                .credit-card-item {
                    transform-style: preserve-3d;
                    transition: transform 0.5s ease-in-out;
                    backface-visibility: hidden;
                }
                .credit-card-item:nth-child(1) { transform: rotateY(15deg) rotateX(5deg) translateX(10px) translateY(5px); }
                .credit-card-item:nth-child(2) { transform: rotateY(-10deg) rotateX(-3deg) translateX(-10px) translateY(-5px); }
                .credit-card-item:nth-child(3) { transform: rotateY(5deg) rotateX(8deg) translateX(0px) translateY(0px); }

                .carousel-container {
                    overflow: hidden;
                    position: relative;
                    width: 100%;
                }
                .carousel-track {
                    display: flex;
                    width: fit-content;
                    animation: scroll-left 30s linear infinite;
                }
                .carousel-track:hover {
                    animation-play-state: paused;
                }
                @keyframes scroll-left {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .carousel-item {
                    flex-shrink: 0;
                    width: 120px;
                    margin: 0 20px;
                }

                .card-tilt-effect:hover {
                    transform: perspective(1000px) rotateX(5deg) rotateY(5deg) scale(1.02);
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
                }

                .strikethrough-text {
                    position: relative;
                    display: inline-block;
                }
                .strikethrough-text::after {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 0;
                    width: 0;
                    height: 2px;
                    background-color: red;
                    transition: width 0.5s ease-out;
                    transform: translateY(-50%);
                }
                .strikethrough-text.strike::after {
                    width: 100%;
                }

                .expandable-content {
                    max-height: 0;
                    overflow: hidden;
                    transition: max-height 0.5s ease-out;
                }
                .expandable-content.expanded {
                    max-height: 500px;
                }

                .mobile-mockup {
                    width: 280px;
                    height: 580px;
                    background-color: #000;
                    border-radius: 40px;
                    padding: 10px;
                    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
                    position: relative;
                    overflow: hidden;
                }
                .mobile-screen {
                    background-color: #fff;
                    border-radius: 30px;
                    width: 100%;
                    height: 100%;
                    overflow-y: auto;
                    padding: 20px;
                }
                .mobile-notch {
                    position: absolute;
                    top: 10px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 100px;
                    height: 20px;
                    background-color: #000;
                    border-radius: 0 0 10px 10px;
                    z-index: 10;
                }

                .flip-card {
                    background-color: transparent;
                    width: 100%;
                    height: 200px;
                    perspective: 1000px;
                }

                .flip-card-inner {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    text-align: center;
                    transition: transform 0.6s;
                    transform-style: preserve-3d;
                    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
                    border-radius: 1rem;
                }

                .flip-card:hover .flip-card-inner {
                    transform: rotateY(180deg);
                }

                .flip-card-front, .flip-card-back {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    -webkit-backface-visibility: hidden;
                    backface-visibility: hidden;
                    border-radius: 1rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    padding: 1rem;
                }

                .flip-card-front {
                    background-color: #ffffff;
                    color: black;
                }

                .flip-card-back {
                    background-color: #1a365d;
                    color: white;
                    transform: rotateY(180deg);
                }

                .faq-search-input:focus {
                    outline: none;
                    border-color: #63b3ed;
                    box-shadow: 0 0 0 3px rgba(99, 179, 237, 0.5);
                }

                @keyframes bounce-right {
                    0%, 100% { transform: translateX(0); }
                    50% { transform: translateX(5px); }
                }
                .animate-bounce-right {
                    animation: bounce-right 1s infinite;
                }

                @keyframes underline-grow {
                    0% { width: 0; }
                    100% { width: 100%; }
                }
                .animate-underline-grow {
                    animation: underline-grow 1s ease-out forwards;
                }

                @keyframes sparkle {
                    0%, 100% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.2) rotate(10deg); opacity: 0.8; text-shadow: 0 0 10px yellow; }
                }
                .group-hover\\:animate-sparkle:hover {
                    animation: sparkle 0.6s ease-in-out;
                }

                @keyframes rotate {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                .group-hover\\:animate-rotate:hover {
                    animation: rotate 0.8s linear;
                }

                @keyframes count-money {
                    0%, 100% { transform: translateY(0); }
                    25% { transform: translateY(-5px) scale(1.1); }
                    50% { transform: translateY(0) scale(1); }
                    75% { transform: translateY(-5px) scale(1.1); }
                }
                .group-hover\\:animate-count-money:hover {
                    animation: count-money 0.8s ease-in-out;
                }

                @keyframes plane-flight {
                    0% { transform: translateX(0) translateY(0) rotate(0deg); }
                    50% { transform: translateX(10px) translateY(-10px) rotate(-10deg); }
                    100% { transform: translateX(0) translateY(0) rotate(0deg); }
                }
                .group-hover\\:animate-plane-flight:hover {
                    animation: plane-flight 1s ease-in-out;
                }

                @keyframes bounce {
                    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                    40% { transform: translateY(-10px); }
                    60% { transform: translateY(-5px); }
                }
                .group-hover\\:animate-bounce:hover {
                    animation: bounce 0.8s ease-in-out;
                }

                @keyframes glow {
                    0%, 100% { text-shadow: 0 0 5px rgba(255, 215, 0, 0.5); }
                    50% { text-shadow: 0 0 15px rgba(255, 215, 0, 0.8), 0 0 25px rgba(255, 215, 0, 0.6); }
                }
                .group-hover\\:animate-glow:hover {
                    animation: glow 1.5s infinite alternate;
                }

                @keyframes briefcase {
                    0%, 100% { transform: rotateY(0deg); }
                    50% { transform: rotateY(20deg); }
                }
                .group-hover\\:animate-briefcase:hover {
                    animation: briefcase 0.7s ease-in-out;
                }

                @keyframes fuel-fill {
                    0% { transform: scaleY(1); }
                    50% { transform: scaleY(1.1); }
                    100% { transform: scaleY(1); }
                }
                .group-hover\\:animate-fuel-fill:hover {
                    animation: fuel-fill 0.6s ease-in-out;
                }

                @keyframes ssl-pulse {
                    0% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.05); opacity: 0.8; }
                    100% { transform: scale(1); opacity: 1; }
                }
                .animate-ssl-pulse {
                    animation: ssl-pulse 2s infinite ease-in-out;
                }

                @keyframes quote-pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                }
                .animate-quote-pulse {
                    animation: quote-pulse 1.5s infinite alternate;
                }

                @keyframes bounce-fab {
                    0%, 20%, 50%, 80%, 100% { transform: translateY(0) scale(1); }
                    40% { transform: translateY(-10px) scale(1.05); }
                    60% { transform: translateY(-5px) scale(1.02); }
                }
                .animate-bounce-fab {
                    animation: bounce-fab 2s infinite;
                }
                `}
            </style>

            

            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-blue-900 to-blue-400 text-white py-24 md:py-32 overflow-hidden pt-32">
                <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between relative z-10">
                    <div className="md:w-1/2 text-center md:text-left mb-12 md:mb-0">
                        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 animate-fade-in-up">
                            Discover Your Perfect Credit Card with BanksCart
                        </h1>
                        <p className="text-lg md:text-xl mb-8 opacity-0 animate-fade-in-up delay-200">
                            Compare 60+ credit cards, get instant approval, and unlock exclusive benefits tailored to your lifestyle.
                        </p>
                        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
                            <button className="btn-primary-gradient text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 animate-scale-in">
                                Find My Card
                            </button>
                            <button className="btn-secondary-outline text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out animate-scale-in delay-100">
                                Compare Cards
                            </button>
                        </div>
                    </div>
                    <div className="md:w-1/2 flex justify-center items-center card-stack-container">
                        {/* Animated Credit Card Stack (simplified 3D with CSS) */}
                        <div className="relative w-72 h-48 md:w-96 md:h-64">
                            <img src="https://placehold.co/384x256/1a365d/ffffff?text=BankA" alt="Credit Card 1" className="absolute w-full h-full rounded-xl shadow-2xl credit-card-item opacity-0 animate-fade-in-right" />
                            <img src="https://placehold.co/384x256/63b3ed/ffffff?text=BankB" alt="Credit Card 2" className="absolute w-full h-full rounded-xl shadow-2xl credit-card-item opacity-0 animate-fade-in-right delay-200" />
                            <img src="https://placehold.co/384x256/48bb78/ffffff?text=BankC" alt="Credit Card 3" className="absolute w-full h-full rounded-xl shadow-2xl credit-card-item opacity-0 animate-fade-in-right delay-400" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust Indicators Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-6 md:px-12 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 animate-fade-in">
                        India's Most Trusted Credit Card Platform
                    </h2>
                    <div className="flex flex-wrap justify-center items-center gap-8 mb-12">
                        <div className="flex flex-col items-center">
                            <div className="text-5xl font-extrabold text-blue-600 mb-2" id="user-count">50k</div>
                            <p className="text-gray-600 text-lg">Happy Users</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="text-5xl font-extrabold text-blue-600 mb-2" id="card-count">50</div>
                            <p className="text-gray-600 text-lg">Cards Listed</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="text-5xl font-extrabold text-blue-600 mb-2" id="approval-rate">98%</div>
                            <p className="text-gray-600 text-lg">Approval Rate</p>
                        </div>
                    </div>

                    <div className="flex justify-center items-center space-x-6 mb-12">
                        <div className="flex items-center text-gray-700 text-lg">
                            <i className="fas fa-shield-alt text-green-500 text-2xl mr-2 animate-pulse"></i>
                            Secure Transactions
                        </div>
                        <div className="flex items-center text-gray-700 text-lg">
                            <i className="fas fa-lock text-green-500 text-2xl mr-2 animate-pulse delay-100"></i>
                            Data Encryption
                        </div>
                        <div className="flex items-center text-gray-700 text-lg">
                            <i className="fas fa-check-circle text-green-500 text-2xl mr-2 animate-pulse delay-200"></i>
                            Verified Partners
                        </div>
                    </div>

                    {/* Bank Partner Logos Carousel */}
                    <div className="carousel-container py-8">
                        <div className="carousel-track flex items-center">
                            {/* Duplicate items for seamless loop */}
                            <div className="carousel-item"><img src="https://placehold.co/120x60/f0f0f0/333333?text=Bank+A" alt="Bank Logo" className="h-12 object-contain mx-auto rounded-md" /></div>
                            <div className="carousel-item"><img src="https://placehold.co/120x60/f0f0f0/333333?text=Bank+B" alt="Bank Logo" className="h-12 object-contain mx-auto rounded-md" /></div>
                            <div className="carousel-item"><img src="https://placehold.co/120x60/f0f0f0/333333?text=Bank+C" alt="Bank Logo" className="h-12 object-contain mx-auto rounded-md" /></div>
                            <div className="carousel-item"><img src="https://placehold.co/120x60/f0f0f0/333333?text=Bank+D" alt="Bank Logo" className="h-12 object-contain mx-auto rounded-md" /></div>
                            <div className="carousel-item"><img src="https://placehold.co/120x60/f0f0f0/333333?text=Bank+E" alt="Bank Logo" className="h-12 object-contain mx-auto rounded-md" /></div>
                            <div className="carousel-item"><img src="https://placehold.co/120x60/f0f0f0/333333?text=Bank+F" alt="Bank Logo" className="h-12 object-contain mx-auto rounded-md" /></div>
                            {/* Duplicates for seamless loop */}
                            <div className="carousel-item"><img src="https://placehold.co/120x60/f0f0f0/333333?text=Bank+A" alt="Bank Logo" className="h-12 object-contain mx-auto rounded-md" /></div>
                            <div className="carousel-item"><img src="https://placehold.co/120x60/f0f0f0/333333?text=Bank+B" alt="Bank Logo" className="h-12 object-contain mx-auto rounded-md" /></div>
                            <div className="carousel-item"><img src="https://placehold.co/120x60/f0f0f0/333333?text=Bank+C" alt="Bank Logo" className="h-12 object-contain mx-auto rounded-md" /></div>
                            <div className="carousel-item"><img src="https://placehold.co/120x60/f0f0f0/333333?text=Bank+D" alt="Bank Logo" className="h-12 object-contain mx-auto rounded-md" /></div>
                            <div className="carousel-item"><img src="https://placehold.co/120x60/f0f0f0/333333?text=Bank+E" alt="Bank Logo" className="h-12 object-contain mx-auto rounded-md" /></div>
                            <div className="carousel-item"><img src="https://placehold.co/120x60/f0f0f0/333333?text=Bank+F" alt="Bank Logo" className="h-12 object-contain mx-auto rounded-md" /></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Credit Cards Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-6 md:px-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center relative inline-block animate-fade-in-up">
                        Best Credit Cards in India
                        <span className="absolute bottom-0 left-0 w-0 h-1 bg-blue-500 animate-underline-grow"></span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Card 1: Premium Travel Card */}
                        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-300 card-tilt-effect overflow-hidden">
                            <img src="https://placehold.co/300x180/1a365d/ffffff?text=Premium+Travel+Card" alt="Premium Travel Card" className="w-full h-auto rounded-lg mb-4 transform transition duration-300 hover:scale-105" />
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Premium Travel Card</h3>
                            <ul className="text-gray-600 text-sm mb-4 space-y-1">
                                <li><i className="fas fa-plane-departure text-blue-500 mr-2"></i> Unlimited Airport Lounge Access</li>
                                <li><i className="fas fa-star text-yellow-500 mr-2"></i> 5X Reward Points</li>
                                <li><i className="fas fa-dollar-sign text-green-500 mr-2"></i> Zero Forex Fees</li>
                            </ul>
                            <p className="text-gray-700 mb-4">
                                Joining Fee: <span className="font-bold strikethrough-text">₹10,000 + Taxes</span> <span className="text-green-600 font-bold"> (Waiver Available!)</span>
                            </p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Travel</span>
                                <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Lounge Access</span>
                                <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Rewards</span>
                            </div>
                            <div className="mb-4">
                                <p className="text-sm text-gray-600 mb-1">Popularity Score:</p>
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '85%' }} id="popularity-bar-1"></div>
                                </div>
                            </div>
                            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300">Learn More</button>
                        </div>

                        {/* Card 2: Cashback Card */}
                        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-300 card-tilt-effect group relative overflow-hidden">
                            <img src="https://placehold.co/300x180/48bb78/ffffff?text=Cashback+Card" alt="Cashback Card" className="w-full h-auto rounded-lg mb-4 transform transition duration-300 group-hover:scale-105" />
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Cashback Card</h3>
                            <ul className="text-gray-600 text-sm mb-4 space-y-1">
                                <li><i className="fas fa-money-bill-wave text-green-500 mr-2"></i> 5% Cashback on All Spends</li>
                                <li><i className="fas fa-calendar-times text-red-500 mr-2"></i> No Annual Fee</li>
                                <li><i className="fas fa-check-circle text-blue-500 mr-2"></i> Instant Approval</li>
                            </ul>
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Cashback</span>
                                <span className="bg-pink-100 text-pink-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Shopping</span>
                                <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Lifestyle</span>
                            </div>
                            <div className="mb-4">
                                <p className="text-sm text-gray-600 mb-1">Popularity Score:</p>
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '92%' }} id="popularity-bar-2"></div>
                                </div>
                            </div>
                            <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-300">Learn More</button>

                            {/* Hover effect revealing additional benefits */}
                            <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl">
                                <div className="text-white text-center">
                                    <p className="text-lg font-semibold mb-2">Additional Benefits:</p>
                                    <ul className="text-sm space-y-1">
                                        <li><i className="fas fa-gift mr-2"></i> Exclusive Partner Discounts</li>
                                        <li><i className="fas fa-credit-card mr-2"></i> Fraud Protection</li>
                                        <li><i className="fas fa-piggy-bank mr-2"></i> Automated Savings</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Card 3: Business Card */}
                        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-300 card-tilt-effect overflow-hidden">
                            <img src="https://placehold.co/300x180/ffd700/1a365d?text=Business+Card" alt="Business Card" className="w-full h-auto rounded-lg mb-4 transform transition duration-300 hover:scale-105" />
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Business Card</h3>
                            <ul className="text-gray-600 text-sm mb-4 space-y-1">
                                <li><i className="fas fa-briefcase text-yellow-600 mr-2"></i> Corporate Benefits</li>
                                <li><i className="fas fa-file-invoice-dollar text-blue-500 mr-2"></i> Expense Management</li>
                                <li><i className="fas fa-arrow-alt-circle-up text-purple-500 mr-2"></i> Higher Credit Limits</li>
                            </ul>
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Business</span>
                                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Corporate</span>
                                <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Premium</span>
                            </div>
                            <div className="mb-4">
                                <p className="text-sm text-gray-600 mb-1">Popularity Score:</p>
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div className="bg-yellow-600 h-2.5 rounded-full" style={{ width: '78%' }} id="popularity-bar-3"></div>
                                </div>
                            </div>
                            <button className="w-full bg-yellow-600 text-white py-2 rounded-lg hover:bg-yellow-700 transition duration-300">Learn More</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Interactive Card Comparison Tool */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-6 md:px-12 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 animate-fade-in">
                        Don't Know Which Card to Use?
                    </h2>
                    <p className="text-lg text-gray-600 mb-8 animate-fade-in delay-100">
                        Use our interactive Rewards Calculator to find out your potential earnings!
                    </p>

                    <div className="bg-gray-50 p-8 rounded-xl shadow-lg max-w-3xl mx-auto animate-scale-in delay-200">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Rewards Calculator</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div>
                                <label htmlFor="monthly-spend" className="block text-left text-gray-700 font-medium mb-2">Monthly Spending (₹)</label>
                                <input
                                    type="range"
                                    id="monthly-spend"
                                    min="5000"
                                    max="100000"
                                    value={monthlySpend}
                                    onChange={(e) => setMonthlySpend(parseInt(e.target.value))}
                                    className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                                    ref={monthlySpendInputRef}
                                />
                                <p className="text-left text-gray-600 mt-2">₹<span>{monthlySpend.toLocaleString('en-IN')}</span></p>
                            </div>
                            <div>
                                <label htmlFor="spending-category" className="block text-left text-gray-700 font-medium mb-2">Primary Spending Category</label>
                                <select
                                    id="spending-category"
                                    value={spendingCategory}
                                    onChange={(e) => setSpendingCategory(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                    ref={spendingCategorySelectRef}
                                >
                                    <option value="shopping">🛍️ Shopping</option>
                                    <option value="travel">✈️ Travel</option>
                                    <option value="dining">🍔 Dining</option>
                                    <option value="fuel">⛽ Fuel</option>
                                    <option value="groceries">🛒 Groceries</option>
                                </select>
                            </div>
                        </div>

                        <div className="text-2xl font-bold text-gray-800 mb-6">
                            Potential Monthly Earnings: <span className="text-green-600">₹{potentialEarnings.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                        </div>

                        <button className="btn-primary-gradient text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 flex items-center justify-center mx-auto">
                            Try Rewards Calculator <i className="fas fa-arrow-right ml-2 animate-bounce-right"></i>
                        </button>
                    </div>
                </div>
            </section>

            {/* Credit Card Categories Grid */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-6 md:px-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center animate-fade-in-up">
                        Explore Credit Card Categories
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                        {/* Lifetime-Free Cards */}
                        <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition duration-300 hover:scale-105 group animate-fade-in-up delay-100">
                            <div className="text-5xl mb-4 group-hover:animate-sparkle">🎁</div>
                            <h3 className="text-lg font-semibold text-gray-800">Lifetime-Free Cards</h3>
                        </div>
                        {/* Rewards Cards */}
                        <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition duration-300 hover:scale-105 group animate-fade-in-up delay-200">
                            <div className="text-5xl mb-4 group-hover:animate-rotate">🏆</div>
                            <h3 className="text-lg font-semibold text-gray-800">Rewards Cards</h3>
                        </div>
                        {/* Cashback Cards */}
                        <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition duration-300 hover:scale-105 group animate-fade-in-up delay-300">
                            <div className="text-5xl mb-4 group-hover:animate-count-money">💰</div>
                            <h3 className="text-lg font-semibold text-gray-800">Cashback Cards</h3>
                        </div>
                        {/* Travel Cards */}
                        <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition duration-300 hover:scale-105 group animate-fade-in-up delay-400">
                            <div className="text-5xl mb-4 group-hover:animate-plane-flight">✈️</div>
                            <h3 className="text-lg font-semibold text-gray-800">Travel Cards</h3>
                        </div>
                        {/* Shopping Cards */}
                        <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition duration-300 hover:scale-105 group animate-fade-in-up delay-500">
                            <div className="text-5xl mb-4 group-hover:animate-bounce">🛒</div>
                            <h3 className="text-lg font-semibold text-gray-800">Shopping Cards</h3>
                        </div>
                        {/* Premium Cards */}
                        <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition duration-300 hover:scale-105 group animate-fade-in-up delay-600">
                            <div className="text-5xl mb-4 group-hover:animate-glow">👑</div>
                            <h3 className="text-lg font-semibold text-gray-800">Premium Cards</h3>
                        </div>
                        {/* Business Cards */}
                        <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition duration-300 hover:scale-105 group animate-fade-in-up delay-700">
                            <div className="text-5xl mb-4 group-hover:animate-briefcase">💼</div>
                            <h3 className="text-lg font-semibold text-gray-800">Business Cards</h3>
                        </div>
                        {/* Fuel Cards */}
                        <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition duration-300 hover:scale-105 group animate-fade-in-up delay-800">
                            <div className="text-5xl mb-4 group-hover:animate-fuel-fill">⛽</div>
                            <h3 className="text-lg font-semibold text-gray-800">Fuel Cards</h3>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-6 md:px-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center animate-fade-in-up">
                        5 Smart Benefits of Credit Cards
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Benefit 1: Convenience & Security */}
                        <div className="bg-gray-50 rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300 hover:translate-y-[-5px] cursor-pointer benefit-card" data-benefit="security">
                            <div className="text-5xl text-blue-600 mb-4 text-center">
                                <i className="fas fa-shield-alt benefit-icon"></i>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">Convenience & Security</h3>
                            <div className="expandable-content">
                                <p className="text-gray-600 text-sm">Credit cards offer a convenient way to make payments globally, both online and offline. They provide robust security features like fraud protection, zero liability policies, and secure online transactions, safeguarding your money against unauthorized use.</p>
                            </div>
                        </div>
                        {/* Benefit 2: Rewards & Cashback */}
                        <div className="bg-gray-50 rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300 hover:translate-y-[-5px] cursor-pointer benefit-card" data-benefit="rewards">
                            <div className="text-5xl text-green-600 mb-4 text-center">
                                <i className="fas fa-coins benefit-icon"></i>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">Rewards & Cashback</h3>
                            <div className="expandable-content">
                                <p className="text-gray-600 text-sm">Earn valuable rewards points, cashback, air miles, or discounts on every purchase. These benefits can significantly offset your spending, making your purchases more rewarding. Many cards offer accelerated rewards on specific spending categories.</p>
                            </div>
                        </div>
                        {/* Benefit 3: Build Credit Score */}
                        <div className="bg-gray-50 rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300 hover:translate-y-[-5px] cursor-pointer benefit-card" data-benefit="credit-score">
                            <div className="text-5xl text-purple-600 mb-4 text-center">
                                <i className="fas fa-chart-line benefit-icon"></i>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">Build Credit Score</h3>
                            <div className="expandable-content">
                                <p className="text-gray-600 text-sm">Responsible credit card usage is crucial for building a strong credit score. A good credit score opens doors to better loan rates, easier approvals for mortgages, and other financial products, proving your creditworthiness to lenders.</p>
                            </div>
                        </div>
                        {/* Benefit 4: Interest-Free Period */}
                        <div className="bg-gray-50 rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300 hover:translate-y-[-5px] cursor-pointer benefit-card" data-benefit="interest-free">
                            <div className="text-5xl text-red-600 mb-4 text-center">
                                <i className="fas fa-calendar-alt benefit-icon"></i>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">Interest-Free Period</h3>
                            <div className="expandable-content">
                                <p className="text-gray-600 text-sm">Credit cards offer an interest-free period (typically 20-50 days) on purchases, allowing you to use the bank's money without incurring interest, provided you pay your bill in full by the due date. This offers great financial flexibility.</p>
                            </div>
                        </div>
                        {/* Benefit 5: Exclusive Deals */}
                        <div className="bg-gray-50 rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300 hover:translate-y-[-5px] cursor-pointer benefit-card" data-benefit="deals">
                            <div className="text-5xl text-yellow-600 mb-4 text-center">
                                <i className="fas fa-star benefit-icon"></i>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">Exclusive Deals</h3>
                            <div className="expandable-content">
                                <p className="text-gray-600 text-sm">Enjoy exclusive discounts, offers, and privileges on dining, shopping, travel, and entertainment. Many credit cards partner with merchants to provide cardholders with special access and savings that are not available otherwise.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How Credit Cards Work - Interactive Timeline */}
            <section className="py-16 bg-gray-100">
                <div className="container mx-auto px-6 md:px-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center animate-fade-in-up">
                        How Credit Cards Work - Interactive Timeline
                    </h2>
                    <div className="relative flex flex-col items-center">
                        {/* Timeline Line */}
                        <div className="absolute w-1 h-full bg-blue-300 left-1/2 transform -translate-x-1/2 hidden md:block"></div>

                        {/* Timeline Step 1 */}
                        <div className="timeline-item flex flex-col md:flex-row items-center w-full my-8 animate-slide-in-left">
                            <div className="md:w-1/2 text-right md:pr-12 mb-4 md:mb-0">
                                <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Step 1: Application & Approval</h3>
                                    <p className="text-gray-600 text-sm">Apply online or offline. Banks assess your eligibility based on income, credit history, and other factors. Once approved, your credit limit is assigned.</p>
                                </div>
                            </div>
                            <div className="md:w-1/2 text-left md:pl-12">
                                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg absolute md:left-1/2 md:transform md:-translate-x-1/2 top-1/2 -translate-y-1/2 md:static">1</div>
                            </div>
                        </div>

                        {/* Timeline Step 2 */}
                        <div className="timeline-item flex flex-col md:flex-row-reverse items-center w-full my-8 animate-slide-in-right">
                            <div className="md:w-1/2 text-left md:pl-12 mb-4 md:mb-0">
                                <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Step 2: Making Purchases</h3>
                                    <p className="text-gray-600 text-sm">Use your card for online or in-store purchases. The amount is deducted from your available credit limit. You're effectively borrowing money from the bank.</p>
                                </div>
                            </div>
                            <div className="md:w-1/2 text-right md:pr-12">
                                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg absolute md:left-1/2 md:transform md:-translate-x-1/2 top-1/2 -translate-y-1/2 md:static">2</div>
                            </div>
                        </div>

                        {/* Timeline Step 3 */}
                        <div className="timeline-item flex flex-col md:flex-row items-center w-full my-8 animate-slide-in-left">
                            <div className="md:w-1/2 text-right md:pr-12 mb-4 md:mb-0">
                                <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Step 3: Statement Generation</h3>
                                    <p className="text-gray-600 text-sm">At the end of your billing cycle, the bank generates a statement detailing all your transactions, total amount due, minimum amount due, and payment due date.</p>
                                </div>
                            </div>
                            <div className="md:w-1/2 text-left md:pl-12">
                                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg absolute md:left-1/2 md:transform md:-translate-x-1/2 top-1/2 -translate-y-1/2 md:static">3</div>
                            </div>
                        </div>

                        {/* Timeline Step 4 */}
                        <div className="timeline-item flex flex-col md:flex-row-reverse items-center w-full my-8 animate-slide-in-right">
                            <div className="md:w-1/2 text-left md:pl-12 mb-4 md:mb-0">
                                <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Step 4: Payment & Interest</h3>
                                    <p className="text-gray-600 text-sm">Pay your bill by the due date. If you pay the full amount, you avoid interest. If you pay only the minimum, interest is charged on the remaining balance, and your credit score can be impacted.</p>
                                </div>
                            </div>
                            <div className="md:w-1/2 text-right md:pr-12">
                                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg absolute md:left-1/2 md:transform md:-translate-x-1/2 top-1/2 -translate-y-1/2 md:static">4</div>
                            </div>
                        </div>

                        {/* Interactive Card Transaction Simulation Placeholder */}
                        <div className="mt-12 w-full max-w-xl bg-white rounded-xl shadow-lg p-8 text-center animate-scale-in delay-500">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Interactive Transaction Flow</h3>
                            <p className="text-gray-600 mb-4">Visualize how a transaction works from swipe to settlement:</p>
                            <div className="relative flex items-center justify-between py-4 px-2">
                                <div className="flex flex-col items-center">
                                    <i className="fas fa-credit-card text-4xl text-blue-500 mb-2" id="sim-card"></i>
                                    <p className="text-sm text-gray-700">You Swipe</p>
                                </div>
                                <i className="fas fa-arrow-right text-2xl text-gray-400 mx-4" id="sim-arrow-1"></i>
                                <div className="flex flex-col items-center">
                                    <i className="fas fa-store text-4xl text-green-500 mb-2" id="sim-merchant"></i>
                                    <p className="text-sm text-gray-700">Merchant</p>
                                </div>
                                <i className="fas fa-arrow-right text-2xl text-gray-400 mx-4" id="sim-arrow-2"></i>
                                <div className="flex flex-col items-center">
                                    <i className="fas fa-university text-4xl text-purple-500 mb-2" id="sim-bank"></i>
                                    <p className="text-sm text-gray-700">Bank</p>
                                </div>
                                <i className="fas fa-arrow-right text-2xl text-gray-400 mx-4" id="sim-arrow-3"></i>
                                <div className="flex flex-col items-center">
                                    <i className="fas fa-check-circle text-4xl text-blue-500 mb-2" id="sim-approved"></i>
                                    <p className="text-sm text-gray-700">Approved!</p>
                                </div>
                            </div>
                            <button id="start-simulation" className="mt-6 bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition duration-300" onClick={startSimulation}>Start Simulation</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Smart Tips Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-6 md:px-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center animate-fade-in-up">
                        5 Smart Tips to Manage Your Credit Card
                    </h2>
                    <div className="max-w-3xl mx-auto">
                        {/* Tip 1 */}
                        <div className="accordion-item bg-gray-50 rounded-xl shadow-md mb-4 overflow-hidden">
                            <button className="accordion-header w-full flex justify-between items-center p-6 text-left font-semibold text-lg text-gray-800 hover:bg-gray-100 transition duration-200" onClick={() => handleAccordionClick(0)} ref={el => accordionRefs.current[0] = el}>
                                <span className="flex items-center">
                                    <i className="fas fa-calendar-check text-blue-500 mr-3 tip-icon"></i>
                                    Pay Your Bills On Time
                                </span>
                                <i className="fas fa-chevron-down transform transition-transform duration-300"></i>
                            </button>
                            <div className="accordion-content px-6 pb-6 text-gray-600 text-sm">
                                <p>Always pay your credit card bills by the due date to avoid late fees and negative impacts on your credit score. Setting up auto-pay can help ensure timely payments.</p>
                            </div>
                        </div>
                        {/* Tip 2 */}
                        <div className="accordion-item bg-gray-50 rounded-xl shadow-md mb-4 overflow-hidden">
                            <button className="accordion-header w-full flex justify-between items-center p-6 text-left font-semibold text-lg text-gray-800 hover:bg-gray-100 transition duration-200" onClick={() => handleAccordionClick(1)} ref={el => accordionRefs.current[1] = el}>
                                <span className="flex items-center">
                                    <i className="fas fa-percentage text-green-500 mr-3 tip-icon"></i>
                                    Keep Credit Utilization Low
                                </span>
                                <i className="fas fa-chevron-down transform transition-transform duration-300"></i>
                            </button>
                            <div className="accordion-content px-6 pb-6 text-gray-600 text-sm">
                                <p>Aim to keep your credit utilization ratio (the amount of credit you use compared to your total available credit) below 30%. This shows responsible credit management and positively impacts your score.</p>
                            </div>
                        </div>
                        {/* Tip 3 */}
                        <div className="accordion-item bg-gray-50 rounded-xl shadow-md mb-4 overflow-hidden">
                            <button className="accordion-header w-full flex justify-between items-center p-6 text-left font-semibold text-lg text-gray-800 hover:bg-gray-100 transition duration-200" onClick={() => handleAccordionClick(2)} ref={el => accordionRefs.current[2] = el}>
                                <span className="flex items-center">
                                    <i className="fas fa-eye text-purple-500 mr-3 tip-icon"></i>
                                    Monitor Your Statements
                                </span>
                                <i className="fas fa-chevron-down transform transition-transform duration-300"></i>
                            </button>
                            <div className="accordion-content px-6 pb-6 text-gray-600 text-sm">
                                <p>Regularly review your credit card statements for any unauthorized transactions or errors. Report any discrepancies immediately to your bank.</p>
                            </div>
                        </div>
                        {/* Tip 4 */}
                        <div className="accordion-item bg-gray-50 rounded-xl shadow-md mb-4 overflow-hidden">
                            <button className="accordion-header w-full flex justify-between items-center p-6 text-left font-semibold text-lg text-gray-800 hover:bg-gray-100 transition duration-200" onClick={() => handleAccordionClick(3)} ref={el => accordionRefs.current[3] = el}>
                                <span className="flex items-center">
                                    <i className="fas fa-hand-holding-usd text-yellow-500 mr-3 tip-icon"></i>
                                    Avoid Cash Advances
                                </span>
                                <i className="fas fa-chevron-down transform transition-transform duration-300"></i>
                            </button>
                            <div className="accordion-content px-6 pb-6 text-gray-600 text-sm">
                                <p>Cash advances typically come with high fees and immediate interest charges. Avoid them unless absolutely necessary, as they can be very expensive.</p>
                            </div>
                        </div>
                        {/* Tip 5 */}
                        <div className="accordion-item bg-gray-50 rounded-xl shadow-md overflow-hidden">
                            <button className="accordion-header w-full flex justify-between items-center p-6 text-left font-semibold text-lg text-gray-800 hover:bg-gray-100 transition duration-200" onClick={() => handleAccordionClick(4)} ref={el => accordionRefs.current[4] = el}>
                                <span className="flex items-center">
                                    <i className="fas fa-chart-pie text-red-500 mr-3 tip-icon"></i>
                                    Budget and Track Spending
                                </span>
                                <i className="fas fa-chevron-down transform transition-transform duration-300"></i>
                            </button>
                            <div className="accordion-content px-6 pb-6 text-gray-600 text-sm">
                                <p>Create a budget and track your spending to ensure you don't overspend on your credit card. This helps you stay within your financial limits and avoid debt.</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 text-center">
                        <p className="text-gray-600 text-sm mb-2">Tips Completed:</p>
                        <div className="w-full max-w-xs mx-auto bg-gray-200 rounded-full h-2.5">
                            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${(completedTips / 5) * 100}%` }} ref={tipProgressBarRef}></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Application Process */}
            <section className="py-16 bg-gray-100">
                <div className="container mx-auto px-6 md:px-12 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 animate-fade-in-up">
                        Apply in 4 Easy Steps
                    </h2>
                    <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-around">
                        {/* Mobile Mockup */}
                        <div className="md:w-1/2 flex justify-center mb-12 md:mb-0">
                            <div className="mobile-mockup">
                                <div className="mobile-notch"></div>
                                <div className="mobile-screen">
                                    <h3 className="text-xl font-bold text-gray-800 mb-4">BanksCart Application</h3>
                                    <div className="space-y-4 text-left text-sm text-gray-700">
                                        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 flex items-center">
                                            <span className="w-6 h-6 flex items-center justify-center bg-blue-600 text-white rounded-full mr-3">1</span>
                                            <p>Fill Basic Details</p>
                                        </div>
                                        <div className="p-3 bg-gray-100 rounded-lg border border-gray-200 flex items-center">
                                            <span className="w-6 h-6 flex items-center justify-center bg-gray-400 text-white rounded-full mr-3">2</span>
                                            <p>Upload Documents</p>
                                        </div>
                                        <div className="p-3 bg-gray-100 rounded-lg border border-gray-200 flex items-center">
                                            <span className="w-6 h-6 flex items-center justify-center bg-gray-400 text-white rounded-full mr-3">3</span>
                                            <p>Verify Identity</p>
                                        </div>
                                        <div className="p-3 bg-gray-100 rounded-lg border border-gray-200 flex items-center">
                                            <span className="w-6 h-6 flex items-center justify-center bg-gray-400 text-white rounded-full mr-3">4</span>
                                            <p>Instant Approval</p>
                                        </div>
                                    </div>
                                    <button className="mt-8 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300">Start Application</button>
                                </div>
                            </div>
                        </div>
                        {/* Steps Indicators */}
                        <div className="md:w-1/2 grid grid-cols-1 gap-8 text-left">
                            <div className="flex items-start step-item opacity-0 animate-fade-in-right">
                                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mr-4 shadow-md">1</div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Fill Basic Details</h3>
                                    <p className="text-gray-600">Provide your personal and financial information securely.</p>
                                </div>
                            </div>
                            <div className="flex items-start step-item opacity-0 animate-fade-in-right delay-100">
                                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mr-4 shadow-md">2</div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Upload Documents</h3>
                                    <p className="text-gray-600">Upload necessary documents like ID proof, address proof, and income proof.</p>
                                </div>
                            </div>
                            <div className="flex items-start step-item opacity-0 animate-fade-in-right delay-200">
                                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mr-4 shadow-md">3</div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Verify Identity</h3>
                                    <p className="text-gray-600">Complete a quick digital verification process for your identity.</p>
                                </div>
                            </div>
                            <div className="flex items-start step-item opacity-0 animate-fade-in-right delay-300">
                                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mr-4 shadow-md">4</div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Instant Approval</h3>
                                    <p className="text-gray-600">Get instant decision and approval for your chosen credit card.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-12 w-full max-w-xl mx-auto bg-gray-200 rounded-full h-4">
                        <div className="bg-green-500 h-4 rounded-full" style={{ width: '0%' }} ref={applicationProgressBarRef}></div>
                    </div>
                </div>
            </section>

            {/* Trust & Security Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-6 md:px-12 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 animate-fade-in-up">
                        Your Security is Our Priority
                    </h2>
                    <div className="flex flex-wrap justify-center items-center gap-8 mb-12">
                        <div className="flex flex-col items-center text-gray-700">
                            <i className="fas fa-lock text-6xl text-green-500 mb-3 animate-ssl-pulse"></i>
                            <p className="text-lg font-semibold">SSL Secured</p>
                        </div>
                        <div className="flex flex-col items-center text-gray-700">
                            <i className="fas fa-shield-alt text-6xl text-blue-500 mb-3 animate-bounce-in"></i>
                            <p className="text-lg font-semibold">Bank-Grade Security</p>
                        </div>
                        <div className="flex flex-col items-center text-gray-700">
                            <i className="fas fa-fingerprint text-6xl text-purple-500 mb-3 animate-fade-in-up"></i>
                            <p className="text-lg font-semibold">Data Encryption</p>
                        </div>
                    </div>

                    {/* Customer Testimonials Carousel */}
                    <div className="relative max-w-3xl mx-auto overflow-hidden rounded-xl shadow-lg bg-gray-50 p-8 mb-12">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-6">What Our Customers Say</h3>
                        <div id="testimonials-carousel" className="flex transition-transform duration-500 ease-in-out" ref={testimonialsCarouselRef}>
                            <div className="w-full flex-shrink-0 text-center px-4">
                                <p className="text-gray-700 text-lg mb-4 italic leading-relaxed">
                                    "BanksCart made finding the right credit card so easy! The comparison tool is fantastic, and the application process was seamless. Highly recommended!"
                                </p>
                                <p className="font-bold text-blue-800">- Priya Sharma</p>
                                <p className="text-gray-500 text-sm">Mumbai, India</p>
                            </div>
                            <div className="w-full flex-shrink-0 text-center px-4">
                                <p className="text-gray-700 text-lg mb-4 italic leading-relaxed">
                                    "I was looking for a travel card, and BanksCart's detailed benefits section helped me choose the perfect one. Their security measures also gave me peace of mind."
                                </p>
                                <p className="font-bold text-blue-800">- Rahul Singh</p>
                                <p className="text-gray-500 text-sm">Delhi, India</p>
                            </div>
                            <div className="w-full flex-shrink-0 text-center px-4">
                                <p className="text-gray-700 text-lg mb-4 italic leading-relaxed">
                                    "Excellent platform for credit cards. The tips section is super helpful for managing my finances. A truly comprehensive solution."
                                </p>
                                <p className="font-bold text-blue-800">- Aisha Khan</p>
                                <p className="text-gray-500 text-sm">Bengaluru, India</p>
                            </div>
                        </div>
                        <div className="flex justify-center mt-4 space-x-2">
                            {[0, 1, 2].map((index) => (
                                <button
                                    key={index}
                                    className={`carousel-dot w-3 h-3 rounded-full hover:bg-gray-500 transition duration-300 ${currentSlide === index ? 'bg-blue-600' : 'bg-gray-300'}`}
                                    onClick={() => setCurrentSlide(index)}
                                ></button>
                            ))}
                        </div>
                    </div>

                    {/* Expert Reviews */}
                    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Expert Reviews</h3>
                        <div className="space-y-6">
                            <div className="flex items-start text-left">
                                <i className="fas fa-quote-left text-blue-400 text-3xl mr-4 animate-quote-pulse"></i>
                                <div>
                                    <p className="text-gray-700 italic">"BanksCart sets a new standard for credit card comparison platforms in India. Their user-centric design and transparent information are commendable."</p>
                                    <p className="font-bold text-gray-800 mt-2">- Financial Times India</p>
                                </div>
                            </div>
                            <div className="flex items-start text-left">
                                <i className="fas fa-quote-left text-blue-400 text-3xl mr-4 animate-quote-pulse delay-100"></i>
                                <div>
                                    <p className="text-gray-700 italic">"The interactive tools on BanksCart make complex financial decisions simple and accessible for everyone."</p>
                                    <p className="font-bold text-gray-800 mt-2">- Business Today</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Types of Credit Cards */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-6 md:px-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center animate-fade-in-up">
                        Explore Different Types of Credit Cards
                    </h2>

                    <div className="flex justify-center flex-wrap gap-4 mb-8">
                        <button className="filter-btn bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition duration-300" onClick={() => handleFilterClick('all')} data-category="all">All Cards</button>
                        <button className="filter-btn bg-gray-200 text-gray-800 px-5 py-2 rounded-full hover:bg-gray-300 transition duration-300" onClick={() => handleFilterClick('travel')} data-category="travel">Travel</button>
                        <button className="filter-btn bg-gray-200 text-gray-800 px-5 py-2 rounded-full hover:bg-gray-300 transition duration-300" onClick={() => handleFilterClick('cashback')} data-category="cashback">Cashback</button>
                        <button className="filter-btn bg-gray-200 text-gray-800 px-5 py-2 rounded-full hover:bg-gray-300 transition duration-300" onClick={() => handleFilterClick('rewards')} data-category="rewards">Rewards</button>
                        <button className="filter-btn bg-gray-200 text-gray-800 px-5 py-2 rounded-full hover:bg-gray-300 transition duration-300" onClick={() => handleFilterClick('business')} data-category="business">Business</button>
                    </div>

                    <div id="card-type-explorer" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Card Type 1 */}
                        <div className="flip-card card-type-item" data-categories="travel rewards">
                            <div className="flip-card-inner">
                                <div className="flip-card-front bg-gradient-to-br from-blue-500 to-blue-300 text-white">
                                    <i className="fas fa-plane-departure text-6xl mb-4"></i>
                                    <h3 className="text-xl font-bold">Travel Credit Card</h3>
                                </div>
                                <div className="flip-card-back">
                                    <p className="text-sm">Ideal for frequent flyers. Offers benefits like lounge access, air miles, travel insurance, and zero forex markup.</p>
                                    <button className="mt-4 bg-white text-blue-600 px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-100 transition duration-300 compare-card-btn" onClick={() => openComparisonModal("Travel Credit Card")}>Compare Features</button>
                                </div>
                            </div>
                        </div>
                        {/* Card Type 2 */}
                        <div className="flip-card card-type-item" data-categories="cashback shopping">
                            <div className="flip-card-inner">
                                <div className="flip-card-front bg-gradient-to-br from-green-500 to-green-300 text-white">
                                    <i className="fas fa-money-bill-wave text-6xl mb-4"></i>
                                    <h3 className="text-xl font-bold">Cashback Credit Card</h3>
                                </div>
                                <div className="flip-card-back">
                                    <p className="text-sm">Get a percentage of your spending back as cashback. Great for everyday expenses and maximizing savings.</p>
                                    <button className="mt-4 bg-white text-green-600 px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-100 transition duration-300 compare-card-btn" onClick={() => openComparisonModal("Cashback Credit Card")}>Compare Features</button>
                                </div>
                            </div>
                        </div>
                        {/* Card Type 3 */}
                        <div className="flip-card card-type-item" data-categories="rewards lifestyle">
                            <div className="flip-card-inner">
                                <div className="flip-card-front bg-gradient-to-br from-purple-500 to-purple-300 text-white">
                                    <i className="fas fa-gift text-6xl mb-4"></i>
                                    <h3 className="text-xl font-bold">Rewards Credit Card</h3>
                                </div>
                                <div className="flip-card-back">
                                    <p className="text-sm">Earn points on your purchases that can be redeemed for gifts, vouchers, merchandise, or even travel.</p>
                                    <button className="mt-4 bg-white text-purple-600 px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-100 transition duration-300 compare-card-btn" onClick={() => openComparisonModal("Rewards Credit Card")}>Compare Features</button>
                                </div>
                            </div>
                        </div>
                        {/* Card Type 4 */}
                        <div className="flip-card card-type-item" data-categories="business premium">
                            <div className="flip-card-inner">
                                <div className="flip-card-front bg-gradient-to-br from-yellow-500 to-yellow-300 text-blue-900">
                                    <i className="fas fa-briefcase text-6xl mb-4"></i>
                                    <h3 className="text-xl font-bold">Business Credit Card</h3>
                                </div>
                                <div className="flip-card-back">
                                    <p className="text-sm">Designed for entrepreneurs and businesses. Offers higher credit limits, expense management tools, and corporate benefits.</p>
                                    <button className="mt-4 bg-white text-yellow-600 px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-100 transition duration-300 compare-card-btn" onClick={() => openComparisonModal("Business Credit Card")}>Compare Features</button>
                                </div>
                            </div>
                        </div>
                        {/* Card Type 5 */}
                        <div className="flip-card card-type-item" data-categories="fuel lifestyle">
                            <div className="flip-card-inner">
                                <div className="flip-card-front bg-gradient-to-br from-red-500 to-red-300 text-white">
                                    <i className="fas fa-gas-pump text-6xl mb-4"></i>
                                    <h3 className="text-xl font-bold">Fuel Credit Card</h3>
                                </div>
                                <div className="flip-card-back">
                                    <p className="text-sm">Offers cashback or discounts on fuel purchases, making it economical for daily commuters and frequent drivers.</p>
                                    <button className="mt-4 bg-white text-red-600 px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-100 transition duration-300 compare-card-btn" onClick={() => openComparisonModal("Fuel Credit Card")}>Compare Features</button>
                                </div>
                            </div>
                        </div>
                        {/* Card Type 6 */}
                        <div className="flip-card card-type-item" data-categories="lifetime-free shopping">
                            <div className="flip-card-inner">
                                <div className="flip-card-front bg-gradient-to-br from-indigo-500 to-indigo-300 text-white">
                                    <i className="fas fa-money-check-alt text-6xl mb-4"></i>
                                    <h3 className="text-xl font-bold">Lifetime-Free Card</h3>
                                </div>
                                <div className="flip-card-back">
                                    <p className="text-sm">A credit card with no annual or joining fees for its lifetime. Great for beginners or those who prefer no recurring costs.</p>
                                    <button className="mt-4 bg-white text-indigo-600 px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-100 transition duration-300 compare-card-btn" onClick={() => openComparisonModal("Lifetime-Free Card")}>Compare Features</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Feature Comparison Popup (Modal) */}
            {isModalOpen && (
                <div id="feature-comparison-modal" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl relative">
                        <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl" onClick={closeComparisonModal}>
                            <i className="fas fa-times"></i>
                        </button>
                        <h3 className="text-2xl font-bold text-gray-800 mb-6">Feature Comparison</h3>
                        <div id="comparison-content" className="text-gray-700 space-y-4">
                            <p><strong>Card Type:</strong> <span>{modalContent.cardType}</span></p>
                            <p><strong>Key Features:</strong> <span>{modalContent.features}</span></p>
                            <p><strong>Ideal For:</strong> <span>{modalContent.idealFor}</span></p>
                            <p><strong>Annual Fee:</strong> <span>{modalContent.annualFee}</span></p>
                        </div>
                        <button className="mt-8 btn-primary-gradient text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1">
                            Apply Now
                        </button>
                    </div>
                </div>
            )}

            {/* FAQ Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-6 md:px-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center animate-fade-in-up">
                        Frequently Asked Questions
                    </h2>
                    <div className="max-w-3xl mx-auto">
                        <div className="mb-8">
                            <input
                                type="text"
                                id="faq-search"
                                placeholder="Search FAQs..."
                                className="faq-search-input w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                onChange={handleFaqSearch}
                            />
                        </div>

                        <div className="mb-8 flex flex-wrap justify-center gap-3">
                            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full flex items-center">
                                <i className="fas fa-fire text-orange-500 mr-2"></i> Popular
                            </span>
                            <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full flex items-center">
                                <i className="fas fa-check-circle text-green-500 mr-2"></i> Expert Answer
                            </span>
                            <span className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full flex items-center">
                                <i className="fas fa-question-circle text-purple-500 mr-2"></i> General
                            </span>
                        </div>

                        <div id="faq-list" className="space-y-4">
                            {/* FAQ Item 1 */}
                            <div className="faq-item bg-gray-50 rounded-xl shadow-md overflow-hidden" data-tags="popular general" style={{ display: (searchTerm === '' || "what is a credit card and how does it work? popular general".toLowerCase().includes(searchTerm)) ? 'block' : 'none' }}>
                                <button className="faq-header w-full flex justify-between items-center p-6 text-left font-semibold text-lg text-gray-800 hover:bg-gray-100 transition duration-200" onClick={() => handleFaqHeaderClick(0)} ref={el => faqRefs.current[0] = el}>
                                    <span className="flex items-center">
                                        What is a credit card and how does it work?
                                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full ml-3">Popular</span>
                                    </span>
                                    <i className="fas fa-chevron-down transform transition-transform duration-300"></i>
                                </button>
                                <div className="faq-content px-6 pb-6 text-gray-600 text-sm">
                                    <p>A credit card is a payment card issued to users to enable the cardholder to pay for goods and services based on the holder's promise to pay for them. The issuer grants a line of credit to the cardholder, from which the user can borrow funds for payment to a merchant or as a cash advance. It works by allowing you to borrow money up to a certain limit, which you then pay back, usually with interest if not paid in full by the due date.</p>
                                </div>
                            </div>
                            {/* FAQ Item 2 */}
                            <div className="faq-item bg-gray-50 rounded-xl shadow-md overflow-hidden" data-tags="general" style={{ display: (searchTerm === '' || "how can i improve my credit score? general expert answer".toLowerCase().includes(searchTerm)) ? 'block' : 'none' }}>
                                <button className="faq-header w-full flex justify-between items-center p-6 text-left font-semibold text-lg text-gray-800 hover:bg-gray-100 transition duration-200" onClick={() => handleFaqHeaderClick(1)} ref={el => faqRefs.current[1] = el}>
                                    <span className="flex items-center">
                                        How can I improve my credit score?
                                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded-full ml-3">Expert Answer</span>
                                    </span>
                                    <i className="fas fa-chevron-down transform transition-transform duration-300"></i>
                                </button>
                                <div className="faq-content px-6 pb-6 text-gray-600 text-sm">
                                    <p>To improve your credit score, consistently pay your bills on time, keep your credit utilization ratio (the amount of credit you use compared to your total available credit) low (ideally below 30%), avoid opening too many new credit accounts at once, and maintain a good mix of credit types.</p>
                                </div>
                            </div>
                            {/* FAQ Item 3 */}
                            <div className="faq-item bg-gray-50 rounded-xl shadow-md overflow-hidden" data-tags="popular" style={{ display: (searchTerm === '' || "what are the common fees associated with credit cards? popular".toLowerCase().includes(searchTerm)) ? 'block' : 'none' }}>
                                <button className="faq-header w-full flex justify-between items-center p-6 text-left font-semibold text-lg text-gray-800 hover:bg-gray-100 transition duration-200" onClick={() => handleFaqHeaderClick(2)} ref={el => faqRefs.current[2] = el}>
                                    <span className="flex items-center">
                                        What are the common fees associated with credit cards?
                                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full ml-3">Popular</span>
                                    </span>
                                    <i className="fas fa-chevron-down transform transition-transform duration-300"></i>
                                </button>
                                <div className="faq-content px-6 pb-6 text-gray-600 text-sm">
                                    <p>Common fees include annual fees (some cards are lifetime-free), late payment fees, over-limit fees, cash advance fees, foreign transaction fees, and interest charges if you don't pay your full balance by the due date.</p>
                                </div>
                            </div>
                            {/* FAQ Item 4 */}
                            <div className="faq-item bg-gray-50 rounded-xl shadow-md overflow-hidden" data-tags="general" style={{ display: (searchTerm === '' || "how do i choose the best credit card for my needs? general".toLowerCase().includes(searchTerm)) ? 'block' : 'none' }}>
                                <button className="faq-header w-full flex justify-between items-center p-6 text-left font-semibold text-lg text-gray-800 hover:bg-gray-100 transition duration-200" onClick={() => handleFaqHeaderClick(3)} ref={el => faqRefs.current[3] = el}>
                                    <span className="flex items-center">
                                        How do I choose the best credit card for my needs?
                                    </span>
                                    <i className="fas fa-chevron-down transform transition-transform duration-300"></i>
                                </button>
                                <div className="faq-content px-6 pb-6 text-gray-600 text-sm">
                                    <p>Consider your spending habits (e.g., travel, shopping, cashback), your credit score, and the benefits and fees associated with different cards. Use comparison tools like BanksCart's to match cards to your lifestyle and financial goals.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer Section */}
            <footer className="bg-blue-900 text-white py-12 px-6 md:px-12">
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {/* About BanksCart */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">BanksCart</h3>
                        <p className="text-gray-300 text-sm">Your trusted partner for finding the perfect credit card and managing your finances wisely.</p>
                        <div className="flex space-x-4 mt-6">
                            <a href="#" className="text-gray-300 hover:text-white transition duration-300 transform hover:scale-110 social-icon"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="text-gray-300 hover:text-white transition duration-300 transform hover:scale-110 social-icon"><i className="fab fa-twitter"></i></a>
                            <a href="#" className="text-gray-300 hover:text-white transition duration-300 transform hover:scale-110 social-icon"><i className="fab fa-instagram"></i></a>
                            <a href="#" className="text-gray-300 hover:text-white transition duration-300 transform hover:scale-110 social-icon"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-300 hover:text-white text-sm hover-underline">Credit Cards</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white text-sm hover-underline">Personal Loans</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white text-sm hover-underline">FAQs</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white text-sm hover-underline">Privacy Policy</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white text-sm hover-underline">Terms of Service</a></li>
                        </ul>
                    </div>

                    {/* Contact Information */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Contact Us</h3>
                        <p className="text-gray-300 text-sm mb-2">
                            <i className="fas fa-map-marker-alt mr-2"></i> 123 BanksCart Avenue, Bengaluru, India
                        </p>
                        <p className="text-gray-300 text-sm mb-2">
                            <a href="tel:+918012345678" className="hover:text-white transition duration-300 click-to-call">
                                <i className="fas fa-phone mr-2"></i> +91 80 1234 5678
                            </a>
                        </p>
                        <p className="text-gray-300 text-sm mb-2">
                            <a href="mailto:info@bankscart.com" className="hover:text-white transition duration-300">
                                <i className="fas fa-envelope mr-2"></i> info@bankscart.com
                            </a>
                        </p>
                    </div>

                    {/* Newsletter Signup */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Stay Updated</h3>
                        <p className="text-gray-300 text-sm mb-4">Subscribe to our newsletter for the latest offers and financial tips.</p>
                        <form id="newsletter-form" className="flex flex-col sm:flex-row" onSubmit={handleNewsletterSubmit}>
                            <input type="email" placeholder="Your email address" className="p-3 rounded-l-lg sm:rounded-l-md sm:rounded-r-none w-full sm:w-auto flex-grow text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <button type="submit" className="bg-green-500 text-white p-3 rounded-r-lg sm:rounded-r-md sm:rounded-l-none mt-2 sm:mt-0 hover:bg-green-600 transition duration-300">Subscribe</button>
                        </form>
                        <div id="newsletter-success" className="text-green-400 mt-3 text-sm hidden">
                            <i className="fas fa-check-circle mr-2"></i> Subscribed successfully!
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
                    &copy; 2024 BanksCart. All rights reserved.
                </div>
            </footer>

            {/* Floating Action Button for Quick Application */}
            <button id="fab-apply-now" className="fixed bottom-6 right-6 bg-green-500 text-white rounded-full p-4 shadow-lg hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-110 z-40 animate-bounce-fab">
                <i className="fas fa-credit-card text-2xl mr-2"></i> Apply Now
            </button>
        </>
    );
}

export default App;
