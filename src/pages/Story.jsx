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
              src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=500&h=500&fit=crop"
              alt="Charity work"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=500&h=500&fit=crop"
              alt="Community service"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=500&h=500&fit=crop"
              alt="Helping hands"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=500&h=500&fit=crop"
              alt="Food distribution"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
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
          <div className="mb-8 space-y-2">
            <div className="flex gap-2 items-center text-gray-700 text-xs md:text-sm">
              ✅ <strong>Food Kits Distribution:</strong> Approximately 200 food kits distributed daily to families in need
            </div>
            <div className="flex gap-2 items-center text-gray-700 text-xs md:text-sm">
              ✅ <strong>Blanket Drives:</strong> Regular blanket distribution drives for those on the streets and in hospitals
            </div>
            <div className="flex gap-2 items-center text-gray-700 text-xs md:text-sm">
              ✅ <strong>Friday Distribution:</strong> Weekly distribution of food, fresh fruits, and ration kits every Friday
            </div>
            <div className="flex gap-2 items-center text-gray-700 text-xs md:text-sm">
              ✅ <strong>Community Support:</strong> Continuous support to vulnerable families and individuals
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=500&h=500&fit=crop"
              alt="Food distribution"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=500&h=500&fit=crop"
              alt="Blanket drive"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1556911220-bff31c812dba?w=500&h=500&fit=crop"
              alt="Ration kits"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=500&h=500&fit=crop"
              alt="Community help"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
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
              src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=500&h=500&fit=crop"
              alt="Ramadan preparation"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop"
              alt="Community iftar"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1556911220-bff31c812dba?w=500&h=500&fit=crop"
              alt="Food packages"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=500&h=500&fit=crop"
              alt="Charity work"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
            />
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className="min-h-screen w-full bg-background">
      {/* Hero Section */}
      <div className="py-12 px-4 bg-gradient-to-r from-primary to-green-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Our Story
          </h1>
          <p className="text-xl text-green-50 mb-8">
            Learn about our journey, mission, and vision
          </p>
        </div>
      </div>

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
          <section className="bg-gradient-to-r from-primary to-green-600 text-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Join Us in Making a Difference</h2>
            <p className="text-lg mb-6 text-green-50">
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


