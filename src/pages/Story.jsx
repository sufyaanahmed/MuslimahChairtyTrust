const Story = () => {
  return (
    <div className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4 text-gray-900">
          Our Story
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Learn about our journey, mission, and vision
        </p>

        <div className="space-y-12">
          {/* Mission */}
          <section className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold mb-4 text-primary">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              Muslimah Charity Trust is dedicated to empowering communities through
              compassionate service and sustainable support. We believe in creating lasting
              change by addressing the root causes of poverty, providing essential resources,
              and fostering hope in the lives of those we serve. Our mission is to ensure
              that every individual, regardless of their circumstances, has access to the
              support and opportunities they need to thrive.
            </p>
          </section>

          {/* Vision */}
          <section className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold mb-4 text-primary">Our Vision</h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              We envision a world where compassion and care are accessible to all, where
              communities are empowered to support themselves and each other, and where
              every person has the opportunity to lead a dignified and fulfilling life.
              Through our work, we strive to build a network of support that transcends
              boundaries and creates a ripple effect of positive change.
            </p>
          </section>

          {/* Founders */}
          <section className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold mb-4 text-primary">Our Founders</h2>
            <p className="text-gray-700 leading-relaxed text-lg mb-4">
              Muslimah Charity Trust was founded by a group of dedicated individuals who
              recognized the need for compassionate, transparent, and effective charitable
              work in our communities. Our founders bring together diverse backgrounds in
              social work, community organizing, and business, united by a shared commitment
              to making a meaningful difference.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg">
              With years of combined experience in serving communities, our leadership team
              ensures that every donation, every volunteer hour, and every initiative is
              directed toward creating maximum impact for those in need.
            </p>
          </section>

          {/* Values */}
          <section className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold mb-4 text-primary">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-primary mb-2 text-lg">Transparency</h3>
                <p className="text-gray-700">
                  We maintain complete transparency in all our operations, ensuring donors
                  know exactly how their contributions are being used.
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-primary mb-2 text-lg">Compassion</h3>
                <p className="text-gray-700">
                  Every action we take is guided by compassion and a genuine desire to help
                  those in need.
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-primary mb-2 text-lg">Accountability</h3>
                <p className="text-gray-700">
                  We hold ourselves accountable to our donors, beneficiaries, and the
                  communities we serve.
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-primary mb-2 text-lg">Impact</h3>
                <p className="text-gray-700">
                  We focus on creating measurable, sustainable impact in the lives of those
                  we serve.
                </p>
              </div>
            </div>
          </section>

          {/* Call to Action */}
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


