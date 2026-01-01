import { useEffect } from "react";
import useAuth from "@/utils/useAuth";
import { ArrowLeft, LogOut } from "lucide-react";

export default function LogoutPage() {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut({
      callbackUrl: "/",
      redirect: true,
    });
  };

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

        {/* Sign Out Form */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 text-center">
          <div className="mb-8">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <LogOut size={24} className="text-white" />
            </div>
            <h1 
              className="text-3xl font-bold text-white mb-2"
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              Sign Out
            </h1>
            <p 
              className="text-white/80"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Are you sure you want to sign out of your account?
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={handleSignOut}
              className="w-full bg-white text-[#1e40af] py-3 rounded-xl font-semibold transition-all duration-200 hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/30"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Yes, Sign Out
            </button>

            <a
              href="/"
              className="block w-full bg-white/10 text-white py-3 rounded-xl font-semibold transition-all duration-200 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 border border-white/20"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Cancel
            </a>
          </div>

          <div className="mt-8 pt-6 border-t border-white/20">
            <p 
              className="text-white/60 text-sm"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              You'll need to sign in again to access your account and personalized content.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}