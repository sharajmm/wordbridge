import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Vocabulary from "./components/Vocabulary";
import Grammar from "./components/Grammar";
import Quiz from "./components/Quiz";
import Tips from "./components/Tips";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/vocabulary"
            element={
              <>
                <Navigation />
                <Vocabulary />
              </>
            }
          />
          <Route
            path="/grammar"
            element={
              <>
                <Navigation />
                <Grammar />
              </>
            }
          />
          <Route
            path="/quiz"
            element={
              <>
                <Navigation />
                <Quiz />
              </>
            }
          />
          <Route
            path="/tips"
            element={
              <>
                <Navigation />
                <Tips />
              </>
            }
          />
          {/* Catch-all route for 404 */}
          <Route
            path="*"
            element={
              <>
                <Navigation />
                <div className="flex flex-col items-center justify-center h-[60vh] text-center">
                  <h1 className="text-4xl font-bold text-purple-400 mb-4">
                    404 - Page Not Found
                  </h1>
                  <p className="text-gray-300 mb-6">
                    Sorry, the page you are looking for does not exist.
                  </p>
                  <a
                    href="/"
                    className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
                  >
                    Go Home
                  </a>
                </div>
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
