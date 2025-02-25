import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaLeaf, FaFlask, FaUpload } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";
import { toast } from "sonner";

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const features = [
    {
      icon: <FaLeaf className="text-4xl text-primary" />,
      title: "Disease Detection",
      description: "Advanced AI-powered detection of brinjal diseases with high accuracy"
    },
    {
      icon: <FaFlask className="text-4xl text-secondary" />,
      title: "Fertilizer Analysis",
      description: "Smart recommendations for optimal fertilizer usage based on soil conditions"
    }
  ];

  const PredictionComponent = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [prediction, setPrediction] = useState<string | null>(null);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        setSelectedImage(URL.createObjectURL(file));
        analyzeDiseaseImage(file);
      }
    };

    const analyzeDiseaseImage = async (file: File) => {
      setIsAnalyzing(true);
      setPrediction(null);
      
      try {
        const formData = new FormData();
        formData.append('image', file);

        const response = await fetch('http://localhost:5000/predict', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();
        
        if (data.success) {
          setPrediction(data.prediction);
          toast.success("Disease analysis completed!");
        } else {
          throw new Error(data.error || 'Failed to analyze image');
        }
      } catch (error) {
        console.error('Error analyzing image:', error);
        toast.error("Failed to analyze image. Please try again.");
      } finally {
        setIsAnalyzing(false);
      }
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card p-8 max-w-2xl mx-auto"
      >
        <h2 className="text-2xl font-bold mb-6 gradient-text">Disease Detection</h2>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="image-upload"
          />
          <label htmlFor="image-upload" className="cursor-pointer block">
            <FaUpload className="mx-auto text-3xl text-gray-400 mb-3" />
            <p className="text-gray-600">Upload Brinjal Leaf Image</p>
          </label>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-6"
            >
              <img
                src={selectedImage}
                alt="Selected leaf"
                className="max-w-full h-auto rounded-lg shadow-md mx-auto"
              />
              {isAnalyzing ? (
                <p className="mt-4 text-primary animate-pulse">Analyzing image...</p>
              ) : prediction && (
                <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                  <h3 className="text-lg font-semibold text-primary mb-2">Detection Result</h3>
                  <p className="text-gray-700">{prediction}</p>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </motion.div>
    );
  };

  const RecommendationComponent = () => {
    const [formData, setFormData] = useState({
      disease: "",
      temperature: "",
      humidity: "",
      moisture: "",
      soil_type: "",
      nitrogen: "",
      phosphorus: "",
      potassium: ""
    });
    const [recommendations, setRecommendations] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const soilTypes = [
      "Sandy",
      "Clayey",
      "Loamy",
      "Black",
      "Red"
    ];

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      
      try {
        const response = await fetch('http://localhost:5000/recommend-fertilizer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            temperature: Number(formData.temperature),
            humidity: Number(formData.humidity),
            moisture: Number(formData.moisture),
            nitrogen: Number(formData.nitrogen),
            phosphorus: Number(formData.phosphorus),
            potassium: Number(formData.potassium),
          }),
        });

        const data = await response.json();
        
        if (data.success) {
          setRecommendations(data.recommendations);
          toast.success("Fertilizer recommendations generated!");
        } else {
          throw new Error(data.error || 'Failed to generate recommendations');
        }
      } catch (error) {
        console.error('Error generating recommendations:', error);
        toast.error("Failed to generate recommendations. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card p-8 max-w-3xl mx-auto"
      >
        <h2 className="text-2xl font-bold mb-6 gradient-text">Fertilizer Recommendation</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Disease Identified
            </label>
            <input
              type="text"
              className="input-field"
              value={formData.disease}
              onChange={(e) => setFormData({...formData, disease: e.target.value})}
              placeholder="Enter identified disease"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Temperature (°C)
              </label>
              <input
                type="number"
                className="input-field"
                value={formData.temperature}
                onChange={(e) => setFormData({...formData, temperature: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Humidity (%)
              </label>
              <input
                type="number"
                className="input-field"
                value={formData.humidity}
                onChange={(e) => setFormData({...formData, humidity: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Moisture (%)
              </label>
              <input
                type="number"
                className="input-field"
                value={formData.moisture}
                onChange={(e) => setFormData({...formData, moisture: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Soil Type
              </label>
              <select
                className="input-field"
                value={formData.soil_type}
                onChange={(e) => setFormData({...formData, soil_type: e.target.value})}
              >
                <option value="">Select soil type</option>
                {soilTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nitrogen
              </label>
              <input
                type="number"
                className="input-field"
                value={formData.nitrogen}
                onChange={(e) => setFormData({...formData, nitrogen: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phosphorus
              </label>
              <input
                type="number"
                className="input-field"
                value={formData.phosphorus}
                onChange={(e) => setFormData({...formData, phosphorus: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Potassium
              </label>
              <input
                type="number"
                className="input-field"
                value={formData.potassium}
                onChange={(e) => setFormData({...formData, potassium: e.target.value})}
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="primary-button w-full"
            disabled={isLoading}
          >
            {isLoading ? "Generating..." : "Generate Recommendation"}
          </motion.button>
        </form>

        {recommendations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-6 bg-white/50 rounded-lg"
          >
            <h3 className="text-xl font-semibold mb-4 gradient-text">
              Top 5 Fertilizer Recommendations
            </h3>
            <div className="space-y-3">
              {recommendations.map((rec, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-3 bg-white/70 rounded-lg shadow-sm"
                >
                  {rec}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    );
  };

  const AboutComponent = () => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card p-8"
      >
        <h2 className="text-2xl font-bold mb-6 gradient-text">About BrinjalCare</h2>
        <p className="text-gray-700 mb-8 leading-relaxed">
          BrinjalCare is an innovative AI-powered solution designed to help farmers optimize their brinjal cultivation through advanced disease detection and intelligent fertilizer recommendations.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="glass-card p-6"
          >
            <h3 className="text-xl font-semibold mb-3 gradient-text">Our Mission</h3>
            <p className="text-gray-600">
              To empower farmers with cutting-edge technology for better crop management and increased yields.
            </p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="glass-card p-6"
          >
            <h3 className="text-xl font-semibold mb-3 gradient-text">Technology</h3>
            <p className="text-gray-600">
              Utilizing advanced machine learning algorithms and agricultural science to provide accurate disease detection and recommendations.
            </p>
          </motion.div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-purple-50">
      <nav className="fixed w-full z-50 glass-effect border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold gradient-text">
                BrinjalCare
              </span>
            </div>
            
            <div className="hidden md:flex space-x-8">
              {['home', 'predict', 'recommend', 'about'].map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveSection(item)}
                  className={`nav-link ${activeSection === item ? 'text-primary' : ''}`}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
              ))}
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-gray-700 hover:text-primary focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden glass-effect border-t border-gray-200/50"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['home', 'predict', 'recommend', 'about'].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setActiveSection(item);
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium
                    ${activeSection === item ? 'text-primary' : 'text-gray-700 hover:text-primary'}`}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </nav>

      <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto text-center"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8">
            <span className="gradient-text">
              Smart Brinjal Disease
            </span>
          </h1>
          <TypeAnimation
            sequence={[
              "Detection System",
              2000,
              "Fertilizer Recommendation",
              2000
            ]}
            wrapper="h2"
            repeat={Infinity}
            className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-700 mb-8"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="primary-button"
          >
            Get Started
          </motion.button>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {activeSection === 'predict' && <PredictionComponent />}
        {activeSection === 'recommend' && <RecommendationComponent />}
        {activeSection === 'about' && <AboutComponent />}
        {activeSection === 'home' && (
          <>
            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="glass-card p-8"
                >
                  <div className="flex flex-col items-center text-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="animate-float"
                    >
                      {feature.icon}
                    </motion.div>
                    <h3 className="mt-4 text-xl font-semibold gradient-text">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>

      <footer className="bg-gradient-to-r from-primary to-secondary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h4 className="text-2xl font-bold mb-4">BrinjalCare</h4>
            <p className="text-gray-100">Empowering farmers with AI-driven solutions for better crop management.</p>
            <div className="mt-8 pt-8 border-t border-white/20">
              <p className="text-gray-200">© 2024 BrinjalCare. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
