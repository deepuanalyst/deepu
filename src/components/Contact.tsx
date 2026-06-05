import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Github, Linkedin, Send, MessageSquarePlus, CheckCircle, Smartphone } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSent, setIsSent] = useState(false);
  const [lastSubmisson, setLastSubmission] = useState<typeof formData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const gradientStyle = {
    backgroundImage: 'linear-gradient(to right, #7B2FF7, #F107A3)',
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) {
      errors.name = 'Full name is required.';
    }
    if (!formData.email.trim()) {
      errors.email = 'Email address is required.';
    } else if (!formData.email.includes('@')) {
      errors.email = 'Please provide a valid email format (e.g. name@example.com).';
    }
    if (!formData.subject.trim()) {
      errors.subject = 'Subject is required.';
    }
    if (!formData.message.trim() || formData.message.length < 10) {
      errors.message = 'Message must be at least 10 characters long.';
    }
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const form = new FormData();
      form.append('name', formData.name);
      form.append('email', formData.email);
      form.append('subject', formData.subject);
      form.append('message', formData.message);
      form.append('_subject', 'New Website Contact Form Submission');
      form.append('_captcha', 'false');
      form.append('_template', 'table');

      const response = await fetch('https://formsubmit.co/analystjourney1@gmail.com', {
        method: 'POST',
        body: form,
      });

      if (response.ok) {
        setLastSubmission({ ...formData });
        setIsSent(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitError('Unable to send message. Please try again later.');
      }
    } catch (error) {
      setSubmitError('Unable to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 text-left" id="contact-page-container">
      {/* 1. Header Information */}
      <section className="space-y-4 mt-4 text-left">
        <h1 className="text-4xl font-extrabold text-[#1F2937] dark:text-[#F3F4F6] tracking-tight">
          Get in <span className="text-transparent bg-clip-text" style={gradientStyle}>Touch</span>
        </h1>
        <p className="text-[#6B7280] dark:text-[#9CA3AF] max-w-2xl font-sans text-base leading-relaxed">
          Have an opportunity? Need data dash development consultations? Or want to talk about SQL joins? Send a message below.
        </p>
      </section>

      {/* 2. Split Columns: Left Form, Right Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="contact-content-grid">
        {/* Left Side: Contact Form Card */}
        <div className="lg:col-span-7 bg-white dark:bg-[#1A1A1A] p-6 sm:p-8 rounded-2xl border border-[#E5E7EB] dark:border-[#2D2D2D] shadow-sm hover:shadow-md transition-shadow duration-300">
          {isSent && lastSubmisson ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6 text-center py-6"
              id="contact-success-panel"
            >
              <div className="flex justify-center flex-col items-center gap-3 animate-fade-in">
                <CheckCircle className="w-16 h-16 text-emerald-500 animate-bounce" />
                <h3 className="text-2xl font-extrabold text-[#1F2937] dark:text-[#F3F4F6]">
                  Message Sent Successfully!
                </h3>
                <p className="text-sm font-sans text-[#6B7280] dark:text-[#9CA3AF] max-w-md">
                  Thank you, <strong className="text-gray-900 dark:text-gray-100">{lastSubmisson.name}</strong>. Your inquiry regarding <strong>"{lastSubmisson.subject}"</strong> has been successfully sent to analystjourney1@gmail.com. Deepu will review this and respond within 24 hours.
                </p>
              </div>

              {/* Message Summary verification block */}
              <div className="p-5 rounded-2xl bg-gray-50 dark:bg-[#212121] text-left text-xs font-mono space-y-2 border border-gray-200 dark:border-gray-800">
                <div className="text-[#D6536D] font-bold uppercase tracking-wider text-[10px] pb-1 border-b border-gray-200 dark:border-[#2D2D2D]">
                  SYSTEM SUBMISSION DETAILS
                </div>
                <div><span className="text-gray-400 font-bold">Sender:</span> {lastSubmisson.name} ({lastSubmisson.email})</div>
                <div><span className="text-gray-400 font-bold">Subject:</span> {lastSubmisson.subject}</div>
                <div className="pt-2 border-t border-gray-200 dark:border-[#2D2D2D] italic text-gray-500">"{lastSubmisson.message}"</div>
              </div>

              <button
                onClick={() => setIsSent(false)}
                className="px-5 py-2.5 bg-gray-100 hover:bg-gray-205 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-sans font-bold rounded-xl text-xs tracking-wide transition-all focus:outline-none cursor-pointer"
                id="contact-send-another-btn"
              >
                Send Another Message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6" id="contact-form">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-1.5 text-left">
                  <label htmlFor="contact-name" className="block text-xs font-sans font-extrabold text-[#1F2937] dark:text-[#F3F4F6] uppercase tracking-wider">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Deepu Sharma"
                    className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-[#111111] text-[#1F2937] dark:text-[#F3F4F6] focus:outline-none text-sm transition-all focus:border-[#D6536D] ${
                      formErrors.name
                        ? 'border-red-500 focus:ring-2 focus:ring-red-400'
                        : 'border-[#E5E7EB] dark:border-[#2D2D2D] focus:ring-2 focus:ring-[#D6536D]/20'
                    }`}
                  />
                  {formErrors.name && (
                    <p className="text-red-500 text-xs font-sans mt-1">{formErrors.name}</p>
                  )}
                </div>

                {/* Email Address */}
                <div className="space-y-1.5 text-left">
                  <label htmlFor="contact-email" className="block text-xs font-sans font-extrabold text-[#1F2937] dark:text-[#F3F4F6] uppercase tracking-wider">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="name@example.com"
                    className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-[#111111] text-[#1F2937] dark:text-[#F3F4F6] focus:outline-none text-sm transition-all focus:border-[#D6536D] ${
                      formErrors.email
                        ? 'border-red-500 focus:ring-2 focus:ring-red-400'
                        : 'border-[#E5E7EB] dark:border-[#2D2D2D] focus:ring-2 focus:ring-[#D6536D]/20'
                    }`}
                  />
                  {formErrors.email && (
                    <p className="text-red-500 text-xs font-sans mt-1">{formErrors.email}</p>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-1.5 text-left">
                <label htmlFor="contact-subject" className="block text-xs font-sans font-extrabold text-[#1F2937] dark:text-[#F3F4F6] uppercase tracking-wider">
                  Subject
                </label>
                <input
                  type="text"
                  id="contact-subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Data Reporting / Power BI Consultation Proposal"
                  className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-[#111111] text-[#1F2937] dark:text-[#F3F4F6] focus:outline-none text-sm transition-all focus:border-[#D6536D] ${
                    formErrors.subject
                      ? 'border-red-500 focus:ring-2 focus:ring-red-400'
                      : 'border-[#E5E7EB] dark:border-[#2D2D2D] focus:ring-2 focus:ring-[#D6536D]/20'
                  }`}
                />
                {formErrors.subject && (
                  <p className="text-red-500 text-xs font-sans mt-1">{formErrors.subject}</p>
                )}
              </div>

              {/* Message */}
              <div className="space-y-1.5 text-left">
                <label htmlFor="contact-message" className="block text-xs font-sans font-extrabold text-[#1F2937] dark:text-[#F3F4F6] uppercase tracking-wider">
                  Message Body
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  placeholder="Describe your analytics project or data dashboard objectives here..."
                  className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-[#111111] text-[#1F2937] dark:text-[#F3F4F6] focus:outline-none text-sm transition-all focus:border-[#D6536D] ${
                    formErrors.message
                      ? 'border-red-500 focus:ring-2 focus:ring-red-400'
                      : 'border-[#E5E7EB] dark:border-[#2D2D2D] focus:ring-2 focus:ring-[#D6536D]/20'
                  }`}
                />
                {formErrors.message && (
                  <p className="text-red-500 text-xs font-sans mt-1">{formErrors.message}</p>
                )}
              </div>

              {submitError && (
                <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-xl text-red-600 dark:text-red-400 text-sm font-sans text-left" id="contact-form-error-display">
                  {submitError}
                </div>
              )}

              {/* Submit triggers custom action */}
              <div className="pt-2 text-left">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#EFB11D] hover:bg-[#EFB11D]/90 text-gray-905 font-sans font-bold rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 focus:outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  id="contact-form-submit-btn"
                >
                  <Send className="w-4 h-4" />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Right Side: Contact Information Cards info */}
        <div className="lg:col-span-5 space-y-6" id="contact-info-panel">
          {/* Contact coordinates list */}
          <div className="bg-white dark:bg-[#1A1A1A] p-6 rounded-2xl border border-[#E5E7EB] dark:border-[#2D2D2D] space-y-6 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-lg font-extrabold text-[#1F2937] dark:text-[#F3F4F6] pb-3 border-b border-gray-200 dark:border-gray-800">
              Contact Information
            </h2>
            
            <div className="space-y-5 font-sans text-sm">
              {/* Name */}
              <div className="flex gap-4 items-start group">
                <span className="p-2 w-10 h-10 rounded-xl bg-[#FFA2B6]/20 text-[#D6536D] flex items-center justify-center shrink-0 ring-2 ring-[#FFA2B6]/10">
                  <UserIcon />
                </span>
                <div className="space-y-0.5">
                  <div className="text-[10px] font-mono font-bold uppercase text-gray-400">Analyst Name</div>
                  <div className="font-extrabold text-[#1F2937] dark:text-[#F3F4F6]">Deepu</div>
                </div>
              </div>

              {/* Location */}
              <div className="flex gap-4 items-start group">
                <span className="p-2 w-10 h-10 rounded-xl bg-[#FFA2B6]/20 text-[#D6536D] flex items-center justify-center shrink-0 ring-2 ring-[#FFA2B6]/10">
                  <MapPin className="w-5 h-5" />
                </span>
                <div className="space-y-0.5">
                  <div className="text-[10px] font-mono font-bold uppercase text-gray-400">HQ Location</div>
                  <div className="font-extrabold text-[#1F2937] dark:text-[#F3F4F6]">Delhi, India</div>
                </div>
              </div>

              {/* Primary Email */}
              <div className="flex gap-4 items-start group">
                <span className="p-2 w-10 h-10 rounded-xl bg-[#FFA2B6]/20 text-[#D6536D] flex items-center justify-center shrink-0 ring-2 ring-[#FFA2B6]/10">
                  <Mail className="w-5 h-5" />
                </span>
                <div className="space-y-0.5">
                  <div className="text-[10px] font-mono font-bold uppercase text-gray-400">Primary Email</div>
                  <a href="mailto:dda.deepusharma@gmail.com" className="font-extrabold text-[#D6536D] hover:underline font-mono">
                    dda.deepusharma@gmail.com
                  </a>
                </div>
              </div>

              {/* Alternative Email */}
              <div className="flex gap-4 items-start group">
                <span className="p-2 w-10 h-10 rounded-xl bg-[#FFA2B6]/20 text-[#D6536D] flex items-center justify-center shrink-0 ring-2 ring-[#FFA2B6]/10">
                  <Mail className="w-5 h-5" />
                </span>
                <div className="space-y-0.5">
                  <div className="text-[10px] font-mono font-bold uppercase text-gray-400">Alternative Inbox</div>
                  <a href="mailto:analystjourney1@gmail.com" className="font-bold text-gray-600 dark:text-gray-300 hover:underline font-mono">
                    analystjourney1@gmail.com
                  </a>
                </div>
              </div>

              {/* Telephone */}
              <div className="flex gap-4 items-start group">
                <span className="p-2 w-10 h-10 rounded-xl bg-[#FFA2B6]/20 text-[#D6536D] flex items-center justify-center shrink-0 ring-2 ring-[#FFA2B6]/10">
                  <Smartphone className="w-5 h-5" />
                </span>
                <div className="space-y-0.5">
                  <div className="text-[10px] font-mono font-bold uppercase text-gray-400">Mobile Phone</div>
                  <a href="tel:+918285793084" className="font-bold text-gray-700 dark:text-gray-300 font-mono">
                    +91 8285793084
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Social connections handles cards */}
          <div className="bg-white dark:bg-[#1A1A1A] p-6 rounded-2xl border border-[#E5E7EB] dark:border-[#2D2D2D] space-y-4 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-base font-extrabold text-[#1F2937] dark:text-[#F3F4F6]">
              Professional Channels
            </h3>
            <div className="flex flex-col gap-3">
              <a
                href="https://www.linkedin.com/in/deepu-sharma-1062282a3/"
                target="_blank"
                rel="noreferrer"
                className="p-4 bg-gray-50 dark:bg-[#1A1A1A] hover:bg-[#D6536D] hover:text-white rounded-2xl border border-gray-200 dark:border-gray-800 transition-all flex items-center gap-3.5 group text-gray-600 dark:text-gray-300"
              >
                <Linkedin className="w-5 h-5 text-[#D6536D] group-hover:text-white transition-colors" />
                <div className="text-left">
                  <div className="text-[9px] font-mono font-bold uppercase group-hover:text-white/80">LinkedIn Network</div>
                  <div className="text-sm font-sans font-extrabold group-hover:text-white text-gray-900 dark:text-white">Deepu Sharma</div>
                </div>
              </a>

              <a
                href="https://github.com/deepuanalyst"
                target="_blank"
                rel="noreferrer"
                className="p-4 bg-gray-50 dark:bg-[#1A1A1A] hover:bg-[#D6536D] hover:text-white rounded-2xl border border-gray-200 dark:border-gray-800 transition-all flex items-center gap-3.5 group text-gray-600 dark:text-gray-300"
              >
                <Github className="w-5 h-5 text-gray-800 dark:text-white group-hover:text-white transition-colors" />
                <div className="text-left">
                  <div className="text-[9px] font-mono font-bold uppercase group-hover:text-white/80">GitHub Repository</div>
                  <div className="text-sm font-sans font-extrabold group-hover:text-white text-gray-900 dark:text-white">deepuanalyst</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Minimal user icon helper to avoid extra imports
function UserIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
