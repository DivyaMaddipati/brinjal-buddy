
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaLeaf, FaArrowLeft } from "react-icons/fa";

interface DiseaseInfo {
  id: string;
  name: string;
  description: string;
  symptoms: string[];
  prevention: string[];
  imageUrl: string;
}

const LeafDiseases = () => {
  const [selectedDisease, setSelectedDisease] = useState<string | null>(null);

  const diseases: DiseaseInfo[] = [
    {
      id: "whitemold",
      name: "White Mold",
      description: "White mold, caused by the fungus Sclerotinia sclerotiorum, is a serious disease affecting brinjal plants in humid conditions.",
      symptoms: [
        "White, cottony growth on leaves, stems, and fruits",
        "Soft, watery rot in affected areas",
        "Wilting and plant collapse in severe cases",
        "Black, irregular-shaped sclerotia (fungal resting bodies)"
      ],
      prevention: [
        "Ensure proper spacing between plants for good air circulation",
        "Avoid overhead irrigation; use drip irrigation instead",
        "Practice crop rotation with non-susceptible crops",
        "Apply fungicides preventively during flowering stage"
      ],
      imageUrl: "/diseases/whitemold.jpg"
    },
    {
      id: "smallleaf",
      name: "Small Leaf",
      description: "Small leaf syndrome in brinjal is often caused by nutrient deficiencies or viral infections leading to stunted growth.",
      symptoms: [
        "Abnormally small leaves compared to healthy plants",
        "Chlorosis (yellowing) of leaves",
        "Stunted overall plant growth",
        "Reduced fruit production"
      ],
      prevention: [
        "Ensure proper nutrition with balanced fertilizers",
        "Maintain optimal soil pH (6.0-6.8)",
        "Control insect vectors that may spread diseases",
        "Use disease-free seedlings from reliable sources"
      ],
      imageUrl: "/diseases/smallleaf.jpg"
    },
    {
      id: "mosaicvirus",
      name: "Mosaic Virus",
      description: "Mosaic viruses affecting brinjal include Tobacco Mosaic Virus (TMV) and Cucumber Mosaic Virus (CMV), causing distinctive mottled patterns on leaves.",
      symptoms: [
        "Mottled pattern of light and dark green or yellow areas on leaves",
        "Leaf distortion and curling",
        "Stunted growth and reduced yields",
        "Yellowing of leaf veins"
      ],
      prevention: [
        "Use virus-resistant varieties when available",
        "Control aphids and other insect vectors",
        "Remove and destroy infected plants immediately",
        "Disinfect tools between plants to prevent mechanical transmission"
      ],
      imageUrl: "/diseases/mosaicvirus.jpg"
    },
    {
      id: "leafspot",
      name: "Leaf Spot",
      description: "Leaf spot diseases in brinjal are primarily caused by fungi such as Alternaria solani or Cercospora melongenae, resulting in distinctive spots on leaves.",
      symptoms: [
        "Circular or irregular dark spots on leaves",
        "Yellow halos surrounding the spots",
        "Spots may merge to form larger lesions",
        "Infected leaves may fall prematurely"
      ],
      prevention: [
        "Avoid overhead irrigation and wet foliage",
        "Provide adequate spacing between plants",
        "Apply fungicides at early stages of infection",
        "Remove and destroy infected plant debris"
      ],
      imageUrl: "/diseases/leafspot.jpg"
    },
    {
      id: "insectpest",
      name: "Insect Pest Damage",
      description: "Brinjal plants are susceptible to various insect pests including aphids, whiteflies, and fruit borers which cause distinctive leaf damage.",
      symptoms: [
        "Holes or chewed areas on leaves",
        "Sticky honeydew secretions and sooty mold",
        "Curling or distortion of young leaves",
        "Presence of insects or their eggs on undersides of leaves"
      ],
      prevention: [
        "Regular monitoring for early pest detection",
        "Use of biological controls like ladybugs for aphid control",
        "Application of neem oil or appropriate insecticides",
        "Installation of yellow sticky traps for flying insects"
      ],
      imageUrl: "/diseases/insectpest.jpg"
    },
    {
      id: "healthyleaf",
      name: "Healthy Leaf",
      description: "Healthy brinjal leaves serve as a benchmark for comparison when diagnosing plant diseases.",
      symptoms: [
        "Uniform green color throughout the leaf",
        "No discoloration, spots, or irregular growth patterns",
        "Properly developed leaf size appropriate for plant age",
        "No curling, wilting, or deformation"
      ],
      prevention: [
        "Balanced fertilization with proper NPK ratios",
        "Regular watering without overwatering",
        "Good air circulation around plants",
        "Preventive pest monitoring and management"
      ],
      imageUrl: "/diseases/healthyleaf.jpg"
    }
  ];

  const handleDiseaseClick = (id: string) => {
    setSelectedDisease(id === selectedDisease ? null : id);
  };

  const selectedDiseaseInfo = selectedDisease 
    ? diseases.find(disease => disease.id === selectedDisease) 
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-purple-50 py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 flex items-center">
          <Link to="/" className="flex items-center text-primary hover:text-primary/80 transition-colors">
            <FaArrowLeft className="mr-2" />
            <span>Back to Home</span>
          </Link>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="gradient-text">Brinjal Leaf Diseases</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Learn about common brinjal leaf diseases, their symptoms, and prevention methods.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {diseases.map((disease) => (
            <motion.div
              key={disease.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`glass-card p-6 cursor-pointer transition-all ${
                selectedDisease === disease.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => handleDiseaseClick(disease.id)}
            >
              <div className="aspect-w-16 aspect-h-9 mb-4 overflow-hidden rounded-lg">
                <img 
                  src={disease.imageUrl} 
                  alt={disease.name} 
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    // Fallback to placeholder if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.src = "https://images.unsplash.com/photo-1518495973542-4542c06a5843?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400";
                  }}
                />
              </div>
              <div className="flex items-center mb-2">
                <FaLeaf className={`mr-2 ${
                  disease.id === "healthyleaf" ? "text-primary" : "text-secondary"
                }`} />
                <h3 className="text-xl font-semibold">{disease.name}</h3>
              </div>
              <p className="text-gray-600 line-clamp-2">{disease.description}</p>
            </motion.div>
          ))}
        </div>

        {selectedDiseaseInfo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass-card p-8 mb-12"
          >
            <div className="lg:flex gap-8">
              <div className="lg:w-1/3 mb-6 lg:mb-0">
                <div className="rounded-lg overflow-hidden">
                  <img 
                    src={selectedDiseaseInfo.imageUrl} 
                    alt={selectedDiseaseInfo.name} 
                    className="w-full h-auto object-cover"
                    onError={(e) => {
                      // Fallback to placeholder if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.src = "https://images.unsplash.com/photo-1518495973542-4542c06a5843?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400";
                    }}
                  />
                </div>
              </div>
              <div className="lg:w-2/3">
                <h2 className="text-3xl font-bold mb-4 gradient-text">{selectedDiseaseInfo.name}</h2>
                <p className="text-gray-700 mb-6">{selectedDiseaseInfo.description}</p>
                
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3 text-primary">Symptoms</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    {selectedDiseaseInfo.symptoms.map((symptom, index) => (
                      <li key={index} className="text-gray-700">{symptom}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">Prevention & Management</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    {selectedDiseaseInfo.prevention.map((tip, index) => (
                      <li key={index} className="text-gray-700">{tip}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default LeafDiseases;
