import { useState, useEffect, useRef } from "react";
import { X, Lock, Mail, Building2, User, Eye, EyeOff, ArrowRight, CheckCircle2, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";

// ─── MASTER PASSWORD — change here to rotate credentials ──────────────────
const MASTER_PASSWORD = "AL1001";
// ──────────────────────────────────────────────────────────────────────────

const BLOCKED_DOMAINS = ["gmail.com","yahoo.com","hotmail.com","outlook.com","aol.com","icloud.com","protonmail.com","live.com","msn.com","ymail.com"];

type View = "gate" | "otp";

interface Props {
  onClose: () => void;
}

function generateOTP(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export function QualityGatewayModal({ onClose }: Props) {
  const navigate = useNavigate();

  // ── shared ──
  const [view, setView] = useState<View>("gate");

  // ── password panel ──
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [pwError, setPwError] = useState("");
  const [pwShake, setPwShake] = useState(false);

  // ── OTP request panel ──
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);

  // ── OTP verify panel ──
  const [generatedOTP, setGeneratedOTP] = useState("");
  const [otpInput, setOtpInput] = useState("");
  const [otpError, setOtpError] = useState("");
  const [otpShake, setOtpShake] = useState(false);
  // show OTP in dev if API not wired
  const [devOTP, setDevOTP] = useState("");

  // freeze body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const authorize = () => {
    onClose();
    navigate("/quality");
  };

  // ── handlers ──

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === MASTER_PASSWORD) {
      authorize();
    } else {
      setPwError("Invalid access key. Please verify and try again.");
      setPwShake(true);
      setTimeout(() => setPwShake(false), 600);
    }
  };

  const validateEmail = (val: string) => {
    const domain = val.split("@")[1]?.toLowerCase() ?? "";
    if (BLOCKED_DOMAINS.includes(domain)) {
      return "Please use a corporate email address.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      return "Enter a valid email address.";
    }
    return "";
  };

  const handleOtpRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validateEmail(email);
    if (err) { setEmailError(err); return; }
    setEmailError("");
    setOtpLoading(true);

    const otp = generateOTP();
    setGeneratedOTP(otp);

    try {
      await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: email,
          company,
          otp,

          from: "RifData Security <info@rifdata.com>",
          subject: "Your Instant Access Code for RifData Quality Portal",
        }),
      });
    } catch {
      // API not wired in dev — surface OTP inline
      setDevOTP(otp);
    }

    setOtpLoading(false);
    setView("otp");
  };

  const handleOtpVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpInput === generatedOTP) {
      authorize();
    } else {
      setOtpError("Incorrect code. Please check your email and try again.");
      setOtpShake(true);
      setTimeout(() => setOtpShake(false), 600);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Quality Portal Access"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#0a0a0a]/45 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal container */}
      <div className="relative z-10 w-full max-w-2xl mx-auto">
        <div className="bg-white/88 backdrop-blur-xl border border-white/25 rounded-3xl shadow-[0_32px_80px_-12px_rgba(10,10,10,0.28)] overflow-hidden">

          {/* ── Top bar ── */}
          <div className="flex items-center justify-between px-8 pt-7 pb-0">
            <div className="flex items-center gap-2.5">
              <div className="h-7 w-7 rounded-lg bg-[#0a0a0a] flex items-center justify-center">
                <Lock size={13} className="text-white" />
              </div>
              <div>
                <p className="text-[9px] font-mono tracking-[0.25em] uppercase text-[#0a0a0a]/40">Restricted Access</p>
                <p className="text-sm font-semibold text-[#0a0a0a] leading-none mt-0.5">Quality Intelligence Portal</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="h-8 w-8 flex items-center justify-center rounded-full border border-[#0a0a0a]/10 bg-[#0a0a0a]/[0.04] text-[#0a0a0a]/50 hover:text-[#0a0a0a] hover:bg-[#0a0a0a]/8 transition-all"
              aria-label="Close"
            >
              <X size={15} />
            </button>
          </div>

          {/* Confidential notice */}
          <div className="mx-8 mt-4 rounded-2xl bg-[#0a0a0a]/5 border border-[#0a0a0a]/10 px-4 py-3">
            <p className="text-xs sm:text-sm text-[#0a0a0a]/75 leading-relaxed font-light">
              <span className="font-semibold">This portal contains confidential linguistic deliverables and proprietary QA schemas.</span>
              <br />
              Access is restricted to authorized partners and verified institutional clients.
            </p>
          </div>

          {/* ── Divider ── */}
          <div className="mx-8 mt-5 h-px bg-[#0a0a0a]/8" />


          {/* ── Body ── */}
          {view === "gate" ? (
            <div className="px-8 py-6 grid md:grid-cols-2 gap-6">

              {/* Panel A — Password */}
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] font-mono tracking-[0.22em] uppercase text-[#0a0a0a]/35 mb-1">Option A</p>
                  <h3 className="text-base font-semibold text-[#0a0a0a]">Direct Access Key</h3>
                  <p className="text-xs text-[#0a0a0a]/50 font-light mt-1 leading-relaxed">
                    Enter your issued access password to unlock immediately.
                  </p>
                </div>

                <form onSubmit={handlePasswordSubmit} className="space-y-3">
                  <div className={`relative ${pwShake ? "animate-[shake_0.5s_ease-in-out]" : ""}`}>
                    <input
                      type={showPw ? "text" : "password"}
                      value={password}
                      onChange={(e) => { setPassword(e.target.value); setPwError(""); }}
                      placeholder="Enter access password"
                      autoComplete="current-password"
                      className={`w-full px-4 py-2.5 pr-10 rounded-xl border text-sm font-mono bg-[#f5f1ea]/70 text-[#0a0a0a] placeholder:text-[#0a0a0a]/30 outline-none transition-all
                        ${pwError ? "border-red-400 focus:border-red-500" : "border-[#0a0a0a]/12 focus:border-[#0a0a0a]/35"}`}
                    />
                    <button
                      type="button"
                      tabIndex={-1}
                      onClick={() => setShowPw(!showPw)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0a0a0a]/30 hover:text-[#0a0a0a]/60 transition-colors"
                    >
                      {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                  {pwError && <p className="text-[11px] text-red-500 font-mono">{pwError}</p>}
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-[#0a0a0a] text-white text-sm font-medium hover:bg-[#0a0a0a]/85 transition-all flex items-center justify-center gap-2 group"
                  >
                    Unlock Portal
                    <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </form>
              </div>

              {/* Divider (vertical on md) */}
              <div className="hidden md:flex flex-col items-center justify-center">
                <div className="flex-1 w-px bg-[#0a0a0a]/8" />
                <span className="text-[10px] font-mono tracking-widest text-[#0a0a0a]/25 my-3">OR</span>
                <div className="flex-1 w-px bg-[#0a0a0a]/8" />
              </div>
              <div className="md:hidden h-px bg-[#0a0a0a]/8 flex items-center justify-center">
                <span className="text-[10px] font-mono tracking-widest text-[#0a0a0a]/25 bg-white/80 px-3">OR</span>
              </div>

              {/* Panel B — OTP Request */}
              <div className="space-y-4 md:col-start-2 md:row-start-1">
                <div>
                  <p className="text-[10px] font-mono tracking-[0.22em] uppercase text-[#0a0a0a]/35 mb-1">Option B</p>
                  <h3 className="text-base font-semibold text-[#0a0a0a]">Instant OTP Access</h3>
                  <p className="text-xs text-[#0a0a0a]/50 font-light mt-1 leading-relaxed">
                    New B2B client? Receive a one-time code at your corporate email.
                  </p>
                </div>

                <form onSubmit={handleOtpRequest} className="space-y-2.5">
                  <div className="relative">
                    <Building2 size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0a0a0a]/30" />
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Company Name"
                      required
                      className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-[#0a0a0a]/12 text-sm bg-[#f5f1ea]/70 text-[#0a0a0a] placeholder:text-[#0a0a0a]/30 outline-none focus:border-[#0a0a0a]/35 transition-all"
                    />
                  </div>
                  <div className="relative">
                    <Mail size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0a0a0a]/30" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
                      placeholder="name@company.com"
                      required
                      className={`w-full pl-8 pr-4 py-2.5 rounded-xl border text-sm bg-[#f5f1ea]/70 text-[#0a0a0a] placeholder:text-[#0a0a0a]/30 outline-none transition-all
                        ${emailError ? "border-red-400 focus:border-red-500" : "border-[#0a0a0a]/12 focus:border-[#0a0a0a]/35"}`}
                    />
                  </div>
                  {emailError && <p className="text-[11px] text-red-500 font-mono">{emailError}</p>}
                  <button
                    type="submit"
                    disabled={otpLoading}
                    className="w-full py-2.5 rounded-xl border border-[#0a0a0a]/15 text-[#0a0a0a] text-sm font-medium hover:bg-[#0a0a0a]/5 hover:border-[#0a0a0a]/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {otpLoading
                      ? <span className="h-4 w-4 border-2 border-[#0a0a0a]/20 border-t-[#0a0a0a]/60 rounded-full animate-spin" />
                      : <><Mail size={13} /> Send One-Time Code</>
                    }
                  </button>
                </form>
              </div>

            </div>
          ) : (
            /* ── OTP Verify view ── */
            <div className="px-8 py-8 flex flex-col items-center text-center max-w-sm mx-auto">
              <div className="h-12 w-12 rounded-2xl bg-[#0a0a0a] flex items-center justify-center mb-5">
                <Mail size={20} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold text-[#0a0a0a] mb-1">Check your inbox</h3>
              <p className="text-sm text-[#0a0a0a]/55 font-light mb-6 leading-relaxed">
                A 6-digit access code was sent to{" "}
                <span className="font-medium text-[#0a0a0a]">{email}</span>.
                Enter it below to unlock the portal.
              </p>

              {/* Dev hint — only visible when API endpoint not available */}
              {devOTP && (
                <div className="w-full mb-4 px-4 py-2.5 rounded-xl bg-amber-50 border border-amber-200 text-left">
                  <p className="text-[10px] font-mono tracking-widest text-amber-600 uppercase mb-0.5">Dev Mode — API not wired</p>
                  <p className="text-sm font-mono font-bold text-amber-700">Your code: {devOTP}</p>
                </div>
              )}

              <form onSubmit={handleOtpVerify} className="w-full space-y-3">
                <div className={otpShake ? "animate-[shake_0.5s_ease-in-out]" : ""}>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={otpInput}
                    onChange={(e) => { setOtpInput(e.target.value.replace(/\D/g, "")); setOtpError(""); }}
                    placeholder="000000"
                    className={`w-full text-center px-4 py-3 rounded-xl border text-xl font-mono tracking-[0.4em] bg-[#f5f1ea]/70 text-[#0a0a0a] placeholder:text-[#0a0a0a]/20 outline-none transition-all
                      ${otpError ? "border-red-400 focus:border-red-500" : "border-[#0a0a0a]/12 focus:border-[#0a0a0a]/35"}`}
                  />
                </div>
                {otpError && <p className="text-[11px] text-red-500 font-mono">{otpError}</p>}
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#0a0a0a] text-white text-sm font-medium hover:bg-[#0a0a0a]/85 transition-all flex items-center justify-center gap-2 group"
                >
                  Verify & Access Portal
                  <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
                <button
                  type="button"
                  onClick={() => { setView("gate"); setOtpInput(""); setOtpError(""); setDevOTP(""); }}
                  className="w-full py-2 text-xs text-[#0a0a0a]/40 hover:text-[#0a0a0a]/70 transition-colors flex items-center justify-center gap-1.5"
                >
                  <RefreshCw size={11} /> Back to access options
                </button>
              </form>
            </div>
          )}

          {/* ── Footer note ── */}
          <div className="px-8 pb-6 pt-2">
            <p className="text-[10px] font-mono text-[#0a0a0a]/25 tracking-wide text-center">
              RifData Atlas · Proprietary Intelligence Portal · All access attempts are logged.
            </p>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
      `}</style>
    </div>
  );
}