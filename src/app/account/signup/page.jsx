import { useState } from "react";
import useAuth from "@/utils/useAuth";
import { ArrowLeft, Mail, Lock, User, AlertCircle, CheckCircle } from "lucide-react";

export default function SignUpPage() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { signUpWithCredentials } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      await signUpWithCredentials({
        email,
        password,
        callbackUrl: "/",
        redirect: true,
      });
    } catch (err) {
      const errorMessages = {
        OAuthSignin: "Couldn't start sign-up. Please try again or use a different method.",
        OAuthCallback: "Sign-up failed after redirecting. Please try again.",
        OAuthCreateAccount: "Couldn't create an account with this sign-up option. Try another one.",
        EmailCreateAccount: "This email can't be used. It may already be registered.",
        Callback: "Something went wrong during sign-up. Please try again.",
        OAuthAccountNotLinked: "This account is linked to a different sign-in method. Try another one.",
        CredentialsSignin: "Invalid email or password. If you already have an account, try signing in instead.",
        AccessDenied: "You don't have permission to sign up.",
        Configuration: "Sign-up isn't working right now. Please try again later.",
        Verification: "Your sign-up link has expired. Request a new one.",
      };

      setError(errorMessages[err.message] || "Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const passwordStrength = (password) => {
    if (!password) return 0;
    let score = 0;
    if (password.length >= 6) score += 1;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    return score;
  };

  const strength = passwordStrength(password);
  const strengthLabels = ["", "Weak", "Fair", "Good", "Strong", "Very Strong"];
  const strengthColors = ["", "bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-green-500", "bg-green-600"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e40af] via-[#1d4ed8] to-[#22d3ee] flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Back to Home Link */}
        <div className="mb-8">
          <a
            href="/"
            className="inline-flex items-center text-white/80 hover:text-white transition-colors duration-200"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Godawari IT Club
          </a>
        </div>

        {/* Sign Up Form */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
          <div className="text-center mb-8">
            <h1 
              className="text-3xl font-bold text-white mb-2"
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              Join Our Community
            </h1>
            <p 
              className="text-white/80"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Create your account to get started
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label 
                className="block text-white/90 text-sm font-medium mb-2"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={20} className="text-white/50" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent backdrop-blur-sm"
                  style={{ fontFamily: "Inter, sans-serif" }}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label 
                className="block text-white/90 text-sm font-medium mb-2"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={20} className="text-white/50" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent backdrop-blur-sm"
                  style={{ fontFamily: "Inter, sans-serif" }}
                />
              </div>
              
              {/* Password Strength Indicator */}
              {password && (
                <div className="mt-2">
                  <div className="flex space-x-1 mb-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={`h-1 flex-1 rounded-full transition-colors duration-200 ${
                          level <= strength ? strengthColors[strength] : 'bg-white/20'
                        }`}
                      />
                    ))}
                  </div>
                  <p 
                    className="text-xs text-white/70"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Password strength: {strengthLabels[strength]}
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label 
                className="block text-white/90 text-sm font-medium mb-2"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={20} className="text-white/50" />
                </div>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent backdrop-blur-sm"
                  style={{ fontFamily: "Inter, sans-serif" }}
                />
                {confirmPassword && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    {password === confirmPassword ? (
                      <CheckCircle size={20} className="text-green-400" />
                    ) : (
                      <AlertCircle size={20} className="text-red-400" />
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-100 text-sm">
                <AlertCircle size={16} className="mr-2 flex-shrink-0" />
                <span style={{ fontFamily: "Inter, sans-serif" }}>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-[#1e40af] py-3 rounded-xl font-semibold transition-all duration-200 hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/30 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#1e40af] mr-2"></div>
                  Creating Account...
                </div>
              ) : (
                "Create Account"
              )}
            </button>

            {/* Terms and Privacy */}
            <p 
              className="text-xs text-white/70 text-center"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              By creating an account, you agree to our Terms of Service and Privacy Policy
            </p>

            {/* Sign In Link */}
            <div className="text-center pt-4 border-t border-white/20">
              <p 
                className="text-white/80 text-sm"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Already have an account?{" "}
                <a
                  href={`/account/signin${typeof window !== "undefined" ? window.location.search : ""}`}
                  className="text-white font-semibold hover:text-white/90 transition-colors duration-200"
                >
                  Sign in here
                </a>
              </p>
            </div>
          </form>
        </div>

        {/* Admin Login Link */}
        <div className="text-center mt-6">
          <a
            href="/admin/login"
            className="text-white/60 hover:text-white/80 text-sm transition-colors duration-200"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Admin Login
          </a>
        </div>
      </div>
    </div>
  );
}