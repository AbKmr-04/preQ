import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, Stethoscope, CheckCircle, ChevronRight } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Button from '../components/common/Button';

const HomePage: React.FC = () => {
  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-gradient-to-r from-primary-700 to-primary-500 text-white">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-primary-900 opacity-20"></div>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-primary-900/30 to-transparent"></div>
        </div>
        
        <div className="container relative mx-auto px-4 pt-16 md:pt-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Optimize Patient Flow, Maximize Doctor Time
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-xl">
                PreQ streamlines hospital visits with digital check-ins, AI-powered questionnaires, and optimized patient information for doctors.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup">
                  <Button variant="secondary" size="lg">
                    Get Started
                  </Button>
                </Link>
                <Link to="/features">
                  <Button variant="outline" size="lg" className="bg-white/10 text-white border-white/30 hover:bg-white/20">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative hidden lg:block">
              <div className="relative bg-white p-6 rounded-lg shadow-xl overflow-hidden animate-fade-in">
                <div className="absolute top-0 left-0 right-0 h-1 bg-primary-400"></div>
                <h3 className="text-primary-800 text-xl font-semibold mb-4">Patient Check-in</h3>
                <div className="space-y-4">
                  <div className="flex items-center bg-neutral-50 p-3 rounded">
                    <div className="bg-primary-100 p-2 rounded mr-3">
                      <CheckCircle size={20} className="text-primary-500" />
                    </div>
                    <div>
                      <p className="text-neutral-800 font-medium">Digital check-in complete</p>
                      <p className="text-neutral-500 text-sm">2 minutes ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center bg-secondary-50 p-3 rounded">
                    <div className="bg-secondary-100 p-2 rounded mr-3">
                      <Clock size={20} className="text-secondary-600" />
                    </div>
                    <div>
                      <p className="text-neutral-800 font-medium">Estimated wait time</p>
                      <p className="text-neutral-500 text-sm">15 minutes</p>
                    </div>
                  </div>
                  
                  <div className="bg-neutral-50 p-4 rounded">
                    <p className="text-neutral-700 font-medium mb-2">AI Questionnaire Progress</p>
                    <div className="w-full bg-neutral-200 rounded-full h-2.5">
                      <div className="bg-primary-400 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                    <p className="text-neutral-500 text-sm mt-2">7/10 questions completed</p>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-secondary-300 rounded-full opacity-30"></div>
              <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-primary-300 rounded-full opacity-20"></div>
            </div>
          </div>
        </div>
        
        {/* Wave SVG */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,288L48,272C96,256,192,224,288,213.3C384,203,480,213,576,224C672,235,768,245,864,234.7C960,224,1056,192,1152,176C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>
      
      {/* Users Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Enhanced Experience for All Users</h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              PreQ provides tailored solutions for hospitals, doctors, and patients, improving the healthcare experience for everyone involved.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* For Receptionists */}
            <div className="bg-white rounded-lg shadow-lg p-8 transition-transform hover:scale-105 border-t-4 border-primary-400">
              <div className="bg-primary-50 p-4 inline-flex rounded-full mb-6">
                <Users size={32} className="text-primary-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4">For Receptionists</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-primary-400 mt-1 mr-2 flex-shrink-0" />
                  <span>Streamlined patient check-in process</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-primary-400 mt-1 mr-2 flex-shrink-0" />
                  <span>Digital queue management dashboard</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-primary-400 mt-1 mr-2 flex-shrink-0" />
                  <span>Automated patient questionnaires</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-primary-400 mt-1 mr-2 flex-shrink-0" />
                  <span>Real-time waiting time updates</span>
                </li>
              </ul>
              <Link to="/features#receptionists" className="inline-flex items-center text-primary-500 font-medium hover:text-primary-600">
                Learn more <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
            
            {/* For Doctors */}
            <div className="bg-white rounded-lg shadow-lg p-8 transition-transform hover:scale-105 border-t-4 border-secondary-400">
              <div className="bg-secondary-50 p-4 inline-flex rounded-full mb-6">
                <Stethoscope size={32} className="text-secondary-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4">For Doctors</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-secondary-600 mt-1 mr-2 flex-shrink-0" />
                  <span>Pre-appointment patient summaries</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-secondary-600 mt-1 mr-2 flex-shrink-0" />
                  <span>Optimized consultation time</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-secondary-600 mt-1 mr-2 flex-shrink-0" />
                  <span>Improved patient throughput</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-secondary-600 mt-1 mr-2 flex-shrink-0" />
                  <span>Minimalist, informative interface</span>
                </li>
              </ul>
              <Link to="/features#doctors" className="inline-flex items-center text-secondary-600 font-medium hover:text-secondary-700">
                Learn more <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
            
            {/* For Patients */}
            <div className="bg-white rounded-lg shadow-lg p-8 transition-transform hover:scale-105 border-t-4 border-primary-300">
              <div className="bg-primary-50 p-4 inline-flex rounded-full mb-6">
                <Users size={32} className="text-primary-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4">For Patients</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-primary-400 mt-1 mr-2 flex-shrink-0" />
                  <span>Reduced wait times</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-primary-400 mt-1 mr-2 flex-shrink-0" />
                  <span>Convenient digital check-in</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-primary-400 mt-1 mr-2 flex-shrink-0" />
                  <span>Intelligent pre-appointment questions</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-primary-400 mt-1 mr-2 flex-shrink-0" />
                  <span>More effective doctor consultations</span>
                </li>
              </ul>
              <Link to="/features#patients" className="inline-flex items-center text-primary-500 font-medium hover:text-primary-600">
                Learn more <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How PreQ Works</h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Our streamlined process connects patients, receptionists, and doctors in a seamless workflow.
            </p>
          </div>
          
          <div className="relative">
            {/* Connection line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-primary-200 -translate-y-1/2 z-0"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              {/* Step 1 */}
              <div className="bg-white rounded-lg shadow-md p-6 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-400 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">1</div>
                <h3 className="text-xl font-bold mb-4 text-center pt-4">Patient Check-in</h3>
                <p className="text-neutral-600 mb-4">
                  Patients scan the doctor's QR code and complete a brief, AI-guided questionnaire about their visit reason.
                </p>
                <div className="bg-neutral-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2 text-neutral-800">Key Features:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle size={16} className="text-primary-400 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-sm">Digital QR code scanning</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={16} className="text-primary-400 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-sm">Smart AI questionnaire</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={16} className="text-primary-400 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-sm">Queue position confirmation</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="bg-white rounded-lg shadow-md p-6 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">2</div>
                <h3 className="text-xl font-bold mb-4 text-center pt-4">Data Processing</h3>
                <p className="text-neutral-600 mb-4">
                  Our AI analyzes patient responses to prepare a concise summary for the doctor, highlighting key information.
                </p>
                <div className="bg-neutral-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2 text-neutral-800">Key Features:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle size={16} className="text-primary-400 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-sm">AI-powered data analysis</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={16} className="text-primary-400 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-sm">Intelligent summary creation</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={16} className="text-primary-400 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-sm">Queue optimization</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Step 3 */}
              <div className="bg-white rounded-lg shadow-md p-6 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">3</div>
                <h3 className="text-xl font-bold mb-4 text-center pt-4">Doctor Consultation</h3>
                <p className="text-neutral-600 mb-4">
                  Doctors receive patient information before the consultation, enabling more efficient and focused appointments.
                </p>
                <div className="bg-neutral-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2 text-neutral-800">Key Features:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle size={16} className="text-primary-400 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-sm">Pre-consultation summary</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={16} className="text-primary-400 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-sm">Minimalist interface</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={16} className="text-primary-400 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-sm">Enhanced patient interaction</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-400 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0 md:mr-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to transform your hospital's patient flow?</h2>
              <p className="text-lg text-white/90">
                Join hospitals nationwide that are saving time, reducing wait times, and improving patient satisfaction.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/signup">
                <Button variant="secondary" size="lg">
                  Get Started Today
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="bg-white/10 text-white border-white/30 hover:bg-white/20">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default HomePage;