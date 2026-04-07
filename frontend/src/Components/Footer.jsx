import React from "react";
import {
  RiFacebookFill,
  RiLinkedinBoxFill,
  RiMailLine,
  RiPhoneLine,
  RiMapPin2Line,
  RiShieldCheckLine,
  RiFlashlightLine,
  RiCustomerService2Line,
} from "react-icons/ri";

const Footer = () => {
  return (
    <footer className="relative mt-16 bg-slate-950 text-white overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-emerald-500/15 blur-3xl" />
        <div className="absolute -bottom-28 -right-28 h-96 w-96 rounded-full bg-sky-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10 py-12">
        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-2 text-sm font-semibold text-white/80">
              <RiShieldCheckLine className="text-emerald-200 text-lg" />
              Hostel Management
            </div>

            <p className="text-white/70 leading-relaxed">
              Simplify hostel operations with a smart management system. Manage
              rooms, students, payments, and maintenance efficiently.
            </p>

            <div className="flex items-center gap-3 pt-1">
              <SocialIcon href="#" label="Facebook">
                <RiFacebookFill className="text-xl" />
              </SocialIcon>
              <SocialIcon href="#" label="LinkedIn">
                <RiLinkedinBoxFill className="text-xl" />
              </SocialIcon>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <Pill icon={<RiFlashlightLine />} text="Fast workflow" />
              <Pill icon={<RiCustomerService2Line />} text="Student support" />
              <Pill icon={<RiShieldCheckLine />} text="Secure access" />
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-base font-extrabold text-white">Contact</h4>

            <div className="space-y-3 text-white/70">
              <ContactRow icon={<RiMailLine className="text-lg text-emerald-200" />}>
                info@hostelms.com
              </ContactRow>

              <ContactRow icon={<RiPhoneLine className="text-lg text-emerald-200" />}>
                +94 71 123 4567
              </ContactRow>

              <ContactRow icon={<RiMapPin2Line className="text-lg text-emerald-200" />}>
                Matara, Sri Lanka
              </ContactRow>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-white/70">
                For emergencies, keep your <span className="text-white font-bold">staff contact</span>{" "}
                and <span className="text-white font-bold">student profile</span> updated.
              </p>
            </div>
          </div>

          {/* Quick tips */}
          <div className="space-y-4">
            <h4 className="text-base font-extrabold text-white">Quick Tips</h4>

            <ul className="space-y-3 text-white/70 text-sm">
              <li className="flex gap-2">
                <span className="text-emerald-200 font-black">•</span>
                Use “Available Rooms” to quickly allocate students.
              </li>
              <li className="flex gap-2">
                <span className="text-emerald-200 font-black">•</span>
                Keep staff contacts updated for emergencies.
              </li>
              <li className="flex gap-2">
                <span className="text-emerald-200 font-black">•</span>
                Review occupancy and payments every week.
              </li>
            </ul>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-white/70">
                Tip: Add a “Maintenance request” for any room issue and track progress.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/55">
          <p>
            © {new Date().getFullYear()} Hostel Management System. All rights reserved.
          </p>
          <p className="text-white/45">
            Built with React + Tailwind (modern UI)
          </p>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ href, label, children }) => (
  <a
    href={href}
    aria-label={label}
    className="h-11 w-11 rounded-2xl bg-white/5 border border-white/10 grid place-items-center text-white/80
               hover:bg-emerald-500 hover:text-slate-950 hover:border-emerald-400 transition"
  >
    {children}
  </a>
);

const ContactRow = ({ icon, children }) => (
  <p className="flex items-center gap-3">
    <span className="h-9 w-9 rounded-2xl bg-white/5 border border-white/10 grid place-items-center">
      {icon}
    </span>
    <span className="font-semibold">{children}</span>
  </p>
);

const Pill = ({ icon, text }) => (
  <span className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs font-semibold text-white/75">
    <span className="text-emerald-200">{icon}</span>
    {text}
  </span>
);

export default Footer;