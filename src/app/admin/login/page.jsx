"use client";

import { useState, useEffect } from "react";
import { Shield, Mail, Lock, AlertCircle, ArrowLeft } from "lucide-react";

export default function AdminLoginPage() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // Check if already logged in as admin
    const adminToken = localStorage.getItem('adminToken');
    if (adminToken) {
      window.location.href = '/admin/dashboard';
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!email || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();
      
      // Store admin token
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminUser', JSON.stringify(data.admin));
      
      // Redirect to admin dashboard
      window.location.href = '/admin/dashboard';
    } catch (err) {
      console.error('Admin login error:', err);
      setError(err.message || 'Login failed. Please check your credentials.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Back to Home Link */}
        <div className="mb-8">
          <a
            href="/"
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors duration-200"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Website
          </a>
        </div>

        {/* Admin Login Form */}
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-gray-700/50">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield size={24} className="text-white" />
            </div>
            <h1 
              className="text-3xl font-bold text-white mb-2"
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              Admin Access
            </h1>
            <p 
              className="text-gray-400"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Secure login for administrators only
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label 
                className="block text-gray-300 text-sm font-medium mb-2"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Admin Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={20} className="text-gray-500" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter admin email"
                  className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                  style={{ fontFamily: "Inter, sans-serif" }}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label 
                className="block text-gray-300 text-sm font-medium mb-2"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={20} className="text-gray-500" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                  style={{ fontFamily: "Inter, sans-serif" }}
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center p-3 bg-red-900/30 border border-red-500/30 rounded-xl text-red-300 text-sm">
                <AlertCircle size={16} className="mr-2 flex-shrink-0" />
                <span style={{ fontFamily: "Inter, sans-serif" }}>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold transition-all duration-200 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing In...
                </div>
              ) : (
                "Sign In to Dashboard"
              )}
            </button>

            {/* Security Notice */}
            <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-3">
              <div className="flex items-start">
                <Shield size={16} className="text-yellow-400 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p 
                    className="text-yellow-300 text-sm font-medium mb-1"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Security Notice
                  </p>
                  <p 
                    className="text-yellow-400/80 text-xs"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    This is a restricted area. All access attempts are logged and monitored.
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Default Credentials Notice */}
        {/* <div className="text-center mt-6 p-4 bg-gray-800/30 rounded-xl border border-gray-700/30">
          <p 
            className="text-gray-400 text-sm mb-2"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Default Admin Credentials
          </p>
          <p 
            className="text-gray-300 text-xs font-mono"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Email: admin@godawariitclub.com<br />
            Password: admin123
          </p>
          <p 
            className="text-red-400 text-xs mt-2"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Please change these credentials in production!
          </p>
        </div>*/}
      </div>
    </div>
  );
}