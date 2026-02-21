"use client";

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, Phone, MapPin, Clock, ChevronRight, X, Send, CheckCircle, Mic, MicOff, Volume2, MessageSquare } from 'lucide-react';

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: "Hi! I'm Taylor, your AI assistant. How can I help you today?" }
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [bookingForm, setBookingForm] = useState({ name: '', phone: '', service: '', message: '' });
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'whatsapp'>('chat');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const services = [
    { icon: "🔧", title: "Emergency Plumbing", description: "24/7 rapid response for burst pipes, leaks, and urgent repairs", price: "From £85" },
    { icon: "🔥", title: "Boiler Installation", description: "Gas Safe certified boiler fitting and replacement", price: "From £1,500" },
    { icon: "🚿", title: "Bathroom Installation", description: "Full bathroom redesign and installation services", price: "From £2,000" },
    { icon: "💧", title: "Leak Detection", description: "Advanced leak detection and repair services", price: "From £120" },
    { icon: "🔄", title: "Pipe Work", description: "Complete pipe fitting, repair, and replacement", price: "From £150" },
    { icon: "🛁", title: "Kitchen Plumbing", description: "Sink, dishwasher, and appliance installation", price: "From £200" },
  ];

  const whyChooseUs = [
    "Gas Safe Registered Engineers",
    "30-Minute Response Time",
    "Upfront Fixed Pricing",
    "12-Month Guarantee on All Work",
    "Fully Insured & Certified",
    "Free Written Quotes"
  ];

  // AI Voice Functions
  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Voice input not supported in this browser. Try Chrome!");
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-GB';

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-GB';
    utterance.rate = 0.9;
    utterance.pitch = 1;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    window.speechSynthesis.speak(utterance);
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    
    const userMessage = { id: Date.now(), type: 'user', text: inputText };
    setMessages(prev => [...prev, userMessage]);
    
    // Simulate AI response
    setTimeout(() => {
      const responses: Record<string, string> = {
        'emergency': "For emergencies, call us NOW on 020 7946 0123. We operate 24/7 and aim to be with you within 30 minutes.",
        'price': "Our prices start from £85 for emergency calls. We offer upfront fixed pricing with no hidden fees. Would you like a free quote?",
        'booking': "Great choice! You can book online by clicking 'Book Now' or call us on 020 7946 0123. We offer flexible appointment times.",
        'hours': "We're open 24 hours a day, 7 days a week for your convenience.",
        'location': "We cover all of Central London and the surrounding areas. Where are you located?",
        'default': "Thanks for your message! For immediate assistance, call 020 7946 0123 or use our booking form. Would you like me to help you book an appointment?"
      };
      
      const lowerInput = inputText.toLowerCase();
      let response = responses.default;
      
      if (lowerInput.includes('emergency') || lowerInput.includes('urgent')) response = responses.emergency;
      else if (lowerInput.includes('price') || lowerInput.includes('cost') || lowerInput.includes('quote')) response = responses.price;
      else if (lowerInput.includes('book') || lowerInput.includes('appointment')) response = responses.booking;
      else if (lowerInput.includes('hour') || lowerInput.includes('open')) response = responses.hours;
      else if (lowerInput.includes('location') || lowerInput.includes('area') || lowerInput.includes('where')) response = responses.location;
      
      const botMessage = { id: Date.now() + 1, type: 'bot', text: response };
      setMessages(prev => [...prev, botMessage]);
      
      // Auto-speak the response
      speakText(response);
    }, 500);
    
    setInputText('');
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSubmitted(true);
  };

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">🔧</span>
              </div>
              <div>
                <h1 className="text-xl font-bold">Taylor Plumbing</h1>
                <p className="text-xs text-blue-200">Central London Experts</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <a 
                href="https://wa.me/442079460123" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg transition"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="hidden sm:inline">WhatsApp</span>
              </a>
              <a href="tel:02079460123" className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition">
                <Phone className="w-4 h-4" />
                <span className="hidden sm:inline">020 7946 0123</span>
              </a>
              <button 
                onClick={() => setShowBooking(true)}
                className="bg-orange-500 hover:bg-orange-600 px-5 py-2 rounded-lg font-semibold transition"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-20 lg:py-28">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/30 px-4 py-1 rounded-full text-orange-300 text-sm mb-6">
              <Clock className="w-4 h-4" />
              <span>24/7 Emergency Service Available</span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              London's Trusted<br />
              <span className="text-orange-400">Plumbing Experts</span>
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-xl">
              Fast, reliable plumbing services across Central London. From emergency repairs to complete bathroom installations — we're here to help.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => setShowBooking(true)}
                className="bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-xl font-bold text-lg transition shadow-lg hover:shadow-xl"
              >
                Get Free Quote
              </button>
              <a href="tel:02079460123" className="flex items-center gap-3 bg-white/20 hover:bg-white/30 px-8 py-4 rounded-xl font-semibold transition">
                <Phone className="w-5 h-5" />
                Call Now
              </a>
              <a 
                href="https://wa.me/442079460123?text=Hi%20Taylor%20Plumbing,%20I%20need%20help%20with..." 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-green-500 hover:bg-green-600 px-8 py-4 rounded-xl font-semibold transition"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </a>
            </div>
            <div className="flex items-center gap-6 mt-8 text-sm text-blue-200">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Gas Safe Registered</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>30-Min Response</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>12-Month Guarantee</span>
              </div>
            </div>
          </div>
        </div>
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* AI Voice Agent Banner */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                <Volume2 className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold">🤖 New: AI Voice Assistant</h3>
                <p className="text-purple-100">Talk to our AI! Click the microphone in the chat to speak naturally</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                <MessageCircle className="w-5 h-5" />
                <span className="font-semibold">WhatsApp Available</span>
              </div>
              <a 
                href="https://wa.me/442079460123"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded-lg font-semibold transition flex items-center gap-2"
              >
                <MessageSquare className="w-5 h-5" />
                Chat Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-orange-500 font-semibold tracking-wide uppercase text-sm">Our Services</span>
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-2">Complete Plumbing Solutions</h3>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              From minor repairs to major installations, our Gas Safe registered engineers deliver quality workmanship on every job.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition border border-gray-100 group">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-500 transition">{service.title}</h4>
                <p className="text-gray-600 mb-4 text-sm">{service.description}</p>
                <p className="text-orange-500 font-semibold">{service.price}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button 
              onClick={() => setShowBooking(true)}
              className="inline-flex items-center gap-2 bg-blue-900 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-800 transition"
            >
              View All Services
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-orange-400 font-semibold tracking-wide uppercase text-sm">Why Choose Us</span>
              <h3 className="text-3xl lg:text-4xl font-bold mt-2 mb-6">Your Trusted Local Plumbers</h3>
              <p className="text-blue-100 mb-8">
                With over 15 years of experience serving Central London, we've built our reputation on reliability, transparency, and quality workmanship. Every job comes with our 12-month guarantee.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {whyChooseUs.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-orange-400 flex-shrink-0" />
                    <span className="text-blue-100">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-2xl p-8">
              <div className="text-center mb-6">
                <p className="text-orange-400 font-semibold">Need a Plumber?</p>
                <h4 className="text-2xl font-bold mt-2">Get a Free Quote Today</h4>
              </div>
              <form onSubmit={(e) => { e.preventDefault(); setShowBooking(true); }} className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:border-orange-400"
                />
                <input 
                  type="tel" 
                  placeholder="Phone Number" 
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:border-orange-400"
                />
                <button 
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 py-3 rounded-lg font-bold transition"
                >
                  Get Free Quote
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Area */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-50 to-orange-50 rounded-2xl p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-orange-500 font-semibold tracking-wide uppercase text-sm">Coverage Area</span>
                <h3 className="text-3xl font-bold text-gray-900 mt-2 mb-4">Serving All of Central London</h3>
                <p className="text-gray-600 mb-6">
                  We provide plumbing services across Central London and surrounding areas. Our central location ensures rapid response times wherever you are.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Islington', 'Camden', 'Westminster', 'Kensington', 'Chelsea', 'Hackney', 'Southwark', 'Tower Hamlets'].map((area) => (
                    <span key={area} className="bg-white px-3 py-1 rounded-full text-sm text-gray-700 border">{area}</span>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="flex items-center gap-4">
                  <MapPin className="w-8 h-8 text-orange-500" />
                  <div>
                    <p className="text-sm text-gray-500">Our Office</p>
                    <p className="font-semibold text-gray-900">12 Upper Street, Islington<br />London N1 0PQ</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-xl">🔧</span>
                </div>
                <h4 className="text-xl font-bold">Taylor Plumbing</h4>
              </div>
              <p className="text-gray-400 text-sm">
                Central London's trusted plumbing experts. Gas Safe registered, fully insured, with 12-month guarantee on all work.
              </p>
            </div>
            <div>
              <h5 className="font-bold mb-4">Contact Us</h5>
              <div className="space-y-2 text-gray-400 text-sm">
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  020 7946 0123
                </p>
                <p className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp: 020 7946 0123
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  12 Upper Street, Islington, N1 0PQ
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  24/7 Emergency Service
                </p>
              </div>
            </div>
            <div>
              <h5 className="font-bold mb-4">Quick Links</h5>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-orange-400 transition">Our Services</a></li>
                <li><a href="#" className="hover:text-orange-400 transition">Get a Quote</a></li>
                <li><a href="#" className="hover:text-orange-400 transition">Contact Us</a></li>
                <li><a href="#" className="hover:text-orange-400 transition">Emergency Repairs</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
            <p>© 2024 Taylor Plumbing. All rights reserved. Gas Safe Registered.</p>
          </div>
        </div>
      </footer>

      {/* AI Chat Widget with Voice & WhatsApp */}
      <div className="fixed bottom-6 right-6 z-50">
        {isChatOpen && (
          <div className="bg-white rounded-2xl shadow-2xl w-80 h-[500px] mb-4 flex flex-col border overflow-hidden">
            {/* Tab Selector */}
            <div className="flex border-b">
              <button 
                onClick={() => setActiveTab('chat')}
                className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 ${activeTab === 'chat' ? 'bg-blue-50 text-blue-900' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                <MessageCircle className="w-4 h-4" />
                AI Chat
              </button>
              <button 
                onClick={() => setActiveTab('whatsapp')}
                className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 ${activeTab === 'whatsapp' ? 'bg-green-50 text-green-700' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                <MessageSquare className="w-4 h-4" />
                WhatsApp
              </button>
            </div>

            {/* Chat Header */}
            <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                {activeTab === 'chat' ? (
                  <>
                    <MessageCircle className="w-5 h-5" />
                    <span className="font-semibold">Taylor AI Assistant</span>
                  </>
                ) : (
                  <>
                    <MessageSquare className="w-5 h-5" />
                    <span className="font-semibold">WhatsApp Chat</span>
                  </>
                )}
              </div>
              <button onClick={() => setIsChatOpen(false)} className="hover:bg-white/20 p-1 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Content */}
            {activeTab === 'chat' ? (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.type === 'user' ? 'bg-blue-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
                <div className="p-3 border-t flex gap-2">
                  <button
                    onClick={isListening ? stopListening : startListening}
                    className={`p-2 rounded-lg transition ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    title="Voice input"
                  >
                    {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </button>
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type or speak..."
                    className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-blue-900"
                  />
                  <button 
                    onClick={handleSendMessage}
                    className="bg-blue-900 text-white p-2 rounded-lg hover:bg-blue-800 transition"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </>
            ) : (
              /* WhatsApp Tab */
              <div className="flex-1 p-4 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <MessageSquare className="w-10 h-10 text-green-500" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Chat on WhatsApp</h4>
                <p className="text-sm text-gray-500 mb-4">Get instant responses on WhatsApp!</p>
                <a 
                  href="https://wa.me/442079460123?text=Hi%20Taylor%20Plumbing,%20I%20need%20help%20with%20a%20plumbing%20issue"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Open WhatsApp
                </a>
                <p className="text-xs text-gray-400 mt-4">Mon-Fri: 8am-6pm<br/>Sat: 9am-4pm</p>
              </div>
            )}
          </div>
        )}
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition flex items-center gap-2"
        >
          {isChatOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
          {!isChatOpen && <span className="font-semibold">Chat with AI</span>}
        </button>
      </div>

      {/* Booking Modal */}
      {showBooking && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Book a Service</h3>
                <button onClick={() => { setShowBooking(false); setBookingSubmitted(false); }} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {bookingSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Booking Received!</h4>
                  <p className="text-gray-600 mb-4">We'll contact you within 30 minutes to confirm your appointment.</p>
                  <div className="flex flex-col gap-2">
                    <a 
                      href="https://wa.me/442079460123"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-5 h-5" />
                      Also message us on WhatsApp
                    </a>
                  </div>
                  <button 
                    onClick={() => { setShowBooking(false); setBookingSubmitted(false); }}
                    className="mt-4 text-gray-500 hover:text-gray-700"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBooking} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                    <input 
                      type="text" 
                      required
                      value={bookingForm.name}
                      onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input 
                      type="tel" 
                      required
                      value={bookingForm.phone}
                      onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Service Required</label>
                    <select 
                      required
                      value={bookingForm.service}
                      onChange={(e) => setBookingForm({...bookingForm, service: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-900"
                    >
                      <option value="">Select a service...</option>
                      <option value="emergency">Emergency Plumbing</option>
                      <option value="boiler">Boiler Installation</option>
                      <option value="bathroom">Bathroom Installation</option>
                      <option value="leak">Leak Detection</option>
                      <option value="pipe">Pipe Work</option>
                      <option value="kitchen">Kitchen Plumbing</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message (Optional)</label>
                    <textarea 
                      rows={3}
                      value={bookingForm.message}
                      onChange={(e) => setBookingForm({...bookingForm, message: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-900"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-bold transition"
                  >
                    Submit Booking Request
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
