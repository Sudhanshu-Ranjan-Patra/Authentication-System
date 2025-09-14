import { useState, useEffect } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import Protected from "./components/Protected";

function App() {
  const [page, setPage] = useState("register");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      setPage("protected");
    }
  }, []);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setPage("protected");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setPage("register");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-primary-600">
                  AuthSystem
                </h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {!isAuthenticated ? (
                <>
                  <button
                    onClick={() => setPage("login")}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                      page === "login"
                        ? "bg-primary-100 text-primary-700"
                        : "text-gray-600 hover:text-primary-600 hover:bg-primary-50"
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => setPage("register")}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                      page === "register"
                        ? "bg-primary-100 text-primary-700"
                        : "text-gray-600 hover:text-primary-600 hover:bg-primary-50"
                    }`}
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">Welcome !!!</span>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors duration-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {!isAuthenticated ? (
          <>
            {page === "register" && (
              <Register onAuthSuccess={handleAuthSuccess} setPage={setPage} />
            )}
            {page === "login" && (
              <Login onAuthSuccess={handleAuthSuccess} setPage={setPage} />
            )}
          </>
        ) : (
          <Protected onLogout={handleLogout} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-gray-500">
            <p>
              &copy; 2024 AuthSystem. Built with React, Node.js, and MongoDB.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
