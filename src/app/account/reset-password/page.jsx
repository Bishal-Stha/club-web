import { useState } from "react";
import { ArrowLeft, Mail, AlertCircle, CheckCircle } from "lucide-react";
import useAuth from "@/utils/useAuth";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const { sendPasswordResetEmail } = useAuth(); // Your auth method

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!email) {
      setError("Please enter your email address");
      setLoading(false);
      return;
    }

    try {
      await sendPasswordResetEmail(email.trim());
      setSuccess("Check your email for the password reset link");
    } catch (err) {
      setError("Failed to send reset link. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e40af] via-[#1d4ed8] to-[#22d3ee] flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Back to Home */}
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

        {/* Forgot Password Form */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
          <div className="text-center mb-8">
            <h1
              className="text-3xl font-bold text-white mb-2"
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              Forgot Password
            </h1>
            <p
              className="text-white/80"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Enter your email to receive a reset link
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
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 backdrop-blur-sm"
                  style={{ fontFamily: "Inter, sans-serif" }}
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-100 text-sm">
                <AlertCircle size={16} className="mr-2 flex-shrink-0" />
                <span style={{ fontFamily: "Inter, sans-serif" }}>{error}</span>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="flex items-center p-3 bg-green-500/20 border border-green-500/30 rounded-xl text-green-100 text-sm">
                <CheckCircle size={16} className="mr-2 flex-shrink-0" />
                <span style={{ fontFamily: "Inter, sans-serif" }}>{success}</span>
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
                  Sending Reset Link...
                </div>
              ) : (
                "Send Reset Link"
              )}
            </button>

            {/* Back to Sign In */}
            <div className="text-center pt-4 border-t border-white/20">
              <p
                className="text-white/80 text-sm"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Remembered your password?{" "}
                <a
                  href="/account/signin"
                  className="text-white font-semibold hover:text-white/90 transition-colors duration-200"
                >
                  Sign in here
                </a>
              </p>
            </div>
          </form>
        </div>
              
        {/* Admin Login */}
      { /* <div className="text-center mt-6">
          <a
            href="/admin/login"
            className="text-white/60 hover:text-white/80 text-sm transition-colors duration-200"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Admin Login
          </a>
        </div> 
        */}
      </div>
    </div>
  );
}
