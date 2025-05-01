import React from 'react';
import { Clock, Users, CheckCircle, TrendingUp, Award } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const AboutPage: React.FC = () => {
  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary-500 to-primary-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About PreQ</h1>
            <p className="text-xl text-white/90 mb-8">
              Revolutionizing hospital queue management with advanced technology and AI-powered solutions.
            </p>
          </div>
        </div>
      </section>
      
      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-neutral-700 mb-6">
                At PreQ, our mission is to transform the patient experience in hospitals by streamlining the check-in process, 
                reducing wait times, and optimizing doctor-patient interactions.
              </p>
              <p className="text-lg text-neutral-700 mb-6">
                We believe that efficient healthcare delivery starts with effective queue management and information gathering. 
                By leveraging the power of technology and artificial intelligence, we're creating solutions that benefit both 
                patients and healthcare providers.
              </p>
              <div className="flex items-center text-primary-500">
                <CheckCircle className="h-6 w-6 mr-2" />
                <span className="font-medium">Putting patients first since 2023</span>
              </div>
            </div>
            
            <div className="bg-neutral-50 p-8 rounded-lg shadow-md">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full text-primary-600 mb-4">
                    <Clock className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-bold mb-1">40%</h3>
                  <p className="text-neutral-600">Reduced wait times</p>
                </div>
                
                <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full text-primary-600 mb-4">
                    <Users className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-bold mb-1">25+</h3>
                  <p className="text-neutral-600">Partner hospitals</p>
                </div>
                
                <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full text-primary-600 mb-4">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-bold mb-1">20%</h3>
                  <p className="text-neutral-600">Increased efficiency</p>
                </div>
                
                <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full text-primary-600 mb-4">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-bold mb-1">10K+</h3>
                  <p className="text-neutral-600">Patients served</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-lg text-neutral-700">
              PreQ was born from a simple observation: too much time in hospitals is spent waiting rather than healing.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary-200"></div>
              
              {/* Timeline Items */}
              <div className="relative z-10">
                {/* Item 1 */}
                <div className="mb-8 flex justify-end">
                  <div className="w-5/12"></div>
                  <div className="flex items-center justify-center">
                    <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white">
                      <span>1</span>
                    </div>
                  </div>
                  <div className="w-5/12 pl-6">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-xl font-bold mb-2">The Idea</h3>
                      <p className="text-neutral-700">
                        In 2022, our founders experienced firsthand the frustration of long hospital wait times. They envisioned a system that could streamline the entire process.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Item 2 */}
                <div className="mb-8 flex justify-start">
                  <div className="w-5/12 pr-6">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-xl font-bold mb-2">Development</h3>
                      <p className="text-neutral-700">
                        By early 2023, a team of healthcare professionals and software engineers came together to develop the first version of PreQ, focusing on both patient and doctor needs.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white">
                      <span>2</span>
                    </div>
                  </div>
                  <div className="w-5/12"></div>
                </div>
                
                {/* Item 3 */}
                <div className="mb-8 flex justify-end">
                  <div className="w-5/12"></div>
                  <div className="flex items-center justify-center">
                    <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white">
                      <span>3</span>
                    </div>
                  </div>
                  <div className="w-5/12 pl-6">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-xl font-bold mb-2">First Pilot</h3>
                      <p className="text-neutral-700">
                        In mid-2023, we launched our first pilot program with three local hospitals, refining our system based on real-world feedback.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Item 4 */}
                <div className="flex justify-start">
                  <div className="w-5/12 pr-6">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-xl font-bold mb-2">Today</h3>
                      <p className="text-neutral-700">
                        Now, PreQ is revolutionizing patient flow in hospitals across the country, with plans for international expansion in the coming year.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white">
                      <span>4</span>
                    </div>
                  </div>
                  <div className="w-5/12"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">Our Leadership Team</h2>
            <p className="text-lg text-neutral-700 max-w-3xl mx-auto">
              Meet the passionate individuals behind PreQ who are dedicated to transforming the healthcare experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Team Member 1 */}
            <div className="bg-white rounded-lg overflow-hidden transition-transform hover:shadow-lg">
              <div className="bg-neutral-200 h-64 flex items-center justify-center">
                <svg className="w-32 h-32 text-neutral-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                </svg>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">Dr. Emily Chen</h3>
                <p className="text-primary-500 mb-3">CEO & Co-Founder</p>
                <p className="text-neutral-600">
                  Former hospital administrator with 15+ years of experience in healthcare management.
                </p>
              </div>
            </div>
            
            {/* Team Member 2 */}
            <div className="bg-white rounded-lg overflow-hidden transition-transform hover:shadow-lg">
              <div className="bg-neutral-200 h-64 flex items-center justify-center">
                <svg className="w-32 h-32 text-neutral-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                </svg>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">Michael Rodriguez</h3>
                <p className="text-primary-500 mb-3">CTO & Co-Founder</p>
                <p className="text-neutral-600">
                  Software engineer specializing in AI and healthcare technology integration.
                </p>
              </div>
            </div>
            
            {/* Team Member 3 */}
            <div className="bg-white rounded-lg overflow-hidden transition-transform hover:shadow-lg">
              <div className="bg-neutral-200 h-64 flex items-center justify-center">
                <svg className="w-32 h-32 text-neutral-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                </svg>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">Dr. Sarah Johnson</h3>
                <p className="text-primary-500 mb-3">Chief Medical Officer</p>
                <p className="text-neutral-600">
                  Practicing physician with a focus on improving doctor-patient interactions.
                </p>
              </div>
            </div>
            
            {/* Team Member 4 */}
            <div className="bg-white rounded-lg overflow-hidden transition-transform hover:shadow-lg">
              <div className="bg-neutral-200 h-64 flex items-center justify-center">
                <svg className="w-32 h-32 text-neutral-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                </svg>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">Alex Thompson</h3>
                <p className="text-primary-500 mb-3">Head of Operations</p>
                <p className="text-neutral-600">
                  Expert in implementing healthcare systems in various hospital environments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Values Section */}
      <section className="py-16 bg-primary-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">Our Core Values</h2>
            <p className="text-lg text-neutral-700 max-w-3xl mx-auto">
              These principles guide everything we do at PreQ, from product development to customer support.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Patient-Centered</h3>
              <p className="text-neutral-700">
                We design all our solutions with patients' needs and experience at the forefront, ensuring that every interaction is comfortable and efficient.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Award className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Excellence</h3>
              <p className="text-neutral-700">
                We strive for excellence in everything we do, from the performance of our technology to the quality of our customer support.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <TrendingUp className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Innovation</h3>
              <p className="text-neutral-700">
                We continuously innovate to improve our solutions, embracing new technologies and methodologies to stay at the forefront of healthcare management.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Join the Healthcare Revolution</h2>
            <p className="text-xl text-white/90 mb-8">
              Ready to transform your hospital's patient experience? Partner with PreQ today and see the difference.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="/contact" className="btn btn-secondary">
                Contact Us
              </a>
              <a href="/signup" className="btn btn-outline bg-white/10 text-white border-white/30 hover:bg-white/20">
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default AboutPage;