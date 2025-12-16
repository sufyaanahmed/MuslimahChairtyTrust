import { Timeline } from '../components/ui/Timeline'

const Story = () => {
  const timelineData = [
    {
      title: '2024',
      content: (
        <div>
          <p className="text-gray-800 text-xs md:text-sm font-normal mb-4">
            <strong>Muslimah Charity Trust</strong> was established in 2024 by <strong>Umme Romana</strong>, 
            with our head office located in <strong>RT Nagar, Bangalore</strong>.
          </p>
          <p className="text-gray-800 text-xs md:text-sm font-normal mb-8">
            From day one, our mission has been clear: to serve those in need with compassion, 
            dignity, and unwavering commitment. We started with a simple belief that every 
            act of kindness, no matter how small, creates a ripple of positive change.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="/Our_story_1.jpg"
              alt="Muslimah Charity Trust community work"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
              loading="lazy"
            />
            <img
              src="/Our_story_2.jpg"
              alt="Volunteers at Muslimah Charity Trust"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
              loading="lazy"
            />
            <img
              src="/Our_story_3.jpg"
              alt="Food and essential supplies prepared for distribution"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
              loading="lazy"
            />
            <img
              src="/Our_story_4.jpg"
              alt="Community members receiving support"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
              loading="lazy"
            />
          </div>
        </div>
      ),
    },
    {
      title: 'Our Impact',
      content: (
        <div>
          <p className="text-gray-800 text-xs md:text-sm font-normal mb-4">
            Through dedicated efforts, we have been able to make a significant impact in our community:
          </p>
          <div className="mb-8 space-y-4">
            <div className="flex gap-3 items-start text-gray-700 text-xs md:text-sm">
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                {/* Food Kit Icon */}
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <rect x="20" y="30" width="30" height="50" rx="5" fill="#4A90E2" />
                  <rect x="25" y="35" width="20" height="8" rx="2" fill="#2E5C8A" />
                  <circle cx="35" cy="45" r="3" fill="#FF6B6B" />
                  <circle cx="35" cy="55" r="2" fill="#FFD93D" />
                  <circle cx="35" cy="65" r="2.5" fill="#6BCF7F" />
                  <rect x="50" y="25" width="30" height="40" rx="5" fill="#FFFFFF" />
                  <path d="M55 30 L65 30 L70 35 L70 50 L55 50 Z" fill="#6BCF7F" />
                  <circle cx="62" cy="40" r="2" fill="#FF6B6B" />
                  <circle cx="62" cy="45" r="1.5" fill="#FFD93D" />
                  <rect x="15" y="75" width="20" height="15" rx="3" fill="#FF6B6B" />
                  <path d="M20 75 L25 70 L25 75 Z" fill="#6BCF7F" />
                  <rect x="65" y="70" width="15" height="20" rx="2" fill="#FF8C42" />
                  <path d="M70 70 L75 65 L75 70 Z" fill="#6BCF7F" />
                </svg>
              </div>
              <div>
                <strong>Food Kits Distribution:</strong> Approximately 200 food kits distributed daily to families in need
              </div>
            </div>
            <div className="flex gap-3 items-start text-gray-700 text-xs md:text-sm">
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                {/* Blanket Icon */}
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <rect x="30" y="50" width="40" height="25" rx="3" fill="#87CEEB" />
                  <path d="M30 50 Q30 45 35 45 L65 45 Q70 45 70 50" stroke="#2E5C8A" strokeWidth="2" fill="none" />
                  <rect x="25" y="60" width="50" height="25" rx="3" fill="#FF8C42" />
                  <path d="M25 60 Q25 55 30 55 L70 55 Q75 55 75 60" stroke="#CC6B2E" strokeWidth="2" fill="none" />
                </svg>
              </div>
              <div>
                <strong>Blanket Drives:</strong> Regular blanket distribution drives for those on the streets and in hospitals
              </div>
            </div>
            <div className="flex gap-3 items-start text-gray-700 text-xs md:text-sm">
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                {/* Crescent Moon and Star Icon */}
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path d="M30 20 Q20 30 20 50 Q20 70 30 80 Q40 70 40 50 Q40 30 30 20" fill="#FFD700" />
                  <path d="M30 20 Q35 25 35 30 Q35 35 30 40 Q25 35 25 30 Q25 25 30 20" fill="#FFA500" />
                  <path d="M60 15 L65 25 L75 25 L67 32 L70 42 L60 35 L50 42 L53 32 L45 25 L55 25 Z" fill="#FFD700" />
                </svg>
              </div>
              <div>
                <strong>Friday Distribution:</strong> Weekly distribution of food, fresh fruits, and ration kits every Friday
              </div>
            </div>
            <div className="flex gap-3 items-start text-gray-700 text-xs md:text-sm">
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                {/* First Aid Kit Icon */}
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <rect x="20" y="25" width="60" height="50" rx="5" fill="#2D8659" />
                  <rect x="25" y="30" width="50" height="40" rx="3" fill="#1E5A3F" />
                  <line x1="50" y1="35" x2="50" y2="65" stroke="white" strokeWidth="4" strokeLinecap="round" />
                  <line x1="35" y1="50" x2="65" y2="50" stroke="white" strokeWidth="4" strokeLinecap="round" />
                  <path d="M35 20 Q50 15 65 20" stroke="#4A9E6F" strokeWidth="3" fill="none" />
                </svg>
              </div>
              <div>
                <strong>Community Support:</strong> Continuous support to vulnerable families and individuals
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="/Our_story_1.jpg"
              alt="Food distribution at Muslimah Charity Trust"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
              loading="lazy"
            />
            <img
              src="/Our_story_2.jpg"
              alt="Support for families and children"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
              loading="lazy"
            />
            <img
              src="/Our_story_3.jpg"
              alt="Packing donation boxes"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
              loading="lazy"
            />
            <img
              src="/Our_story_4.jpg"
              alt="Community outreach and support"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
              loading="lazy"
            />
          </div>
        </div>
      ),
    },
    {
      title: 'Ramadan 2025',
      content: (
        <div>
          <p className="text-gray-800 text-xs md:text-sm font-normal mb-4">
            As we look ahead to <strong>Ramadan 2025</strong>, we are committed to accelerating 
            our efforts to help even more people in need.
          </p>
          <p className="text-gray-800 text-xs md:text-sm font-normal mb-8">
            This blessed month presents an opportunity to expand our reach and deepen our impact. 
            We plan to increase our daily food kit distribution, organize more blanket drives, 
            and ensure that no one goes hungry during this holy month. With your support, we can 
            make a difference in the lives of thousands.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="/Our_story_1.jpg"
              alt="Ramadan food distribution at Muslimah Charity Trust"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
              loading="lazy"
            />
            <img
              src="/Our_story_2.jpg"
              alt="Ramadan care packages being prepared"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
              loading="lazy"
            />
            <img
              src="/Our_story_4.jpg"
              alt="Serving meals during Ramadan"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
              loading="lazy"
            />
            <img
              src="/Our_story_3.jpg"
              alt="Community gathering during Ramadan outreach"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
              loading="lazy"
            />
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className="min-h-screen w-full bg-background">
      {/* Hero Section with Banner */}
      <section 
        className="relative text-white py-20 px-4 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/our_story_banner.jpg)',
          minHeight: '400px',
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
            Our Story
          </h1>
          <p className="text-xl text-white mb-8 drop-shadow-md">
            Learn about our journey, mission, and vision
          </p>
        </div>
      </section>

      {/* Founder Section */}
      <div className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <section className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold mb-4 text-primary">Our Founder</h2>
            <p className="text-gray-700 leading-relaxed text-lg mb-4">
              <strong>Muslimah Charity Trust</strong> was founded by <strong>Umme Romana</strong> in 2024, 
              with our head office located in <strong>RT Nagar, Bangalore</strong>.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg">
              With a vision to serve the community and make a meaningful difference, 
              our founder has dedicated herself to ensuring that every donation, every 
              volunteer hour, and every initiative creates maximum impact for those in need.
            </p>
          </section>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="relative">
        <Timeline data={timelineData} />
      </div>

      {/* Call to Action */}
      <div className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <section className="bg-gradient-to-r from-primary to-accent text-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Join Us in Making a Difference</h2>
            <p className="text-lg mb-6 text-accent">
              Whether through donations, volunteering, or spreading awareness, your support
              helps us continue our mission of empowering communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/cases"
                className="bg-white text-primary px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
              >
                Donate Now
              </a>
              <a
                href="/volunteers"
                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-md font-semibold hover:bg-white hover:text-primary transition-colors"
              >
                Volunteer
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Story


