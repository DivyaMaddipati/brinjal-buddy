
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  LineChart, 
  Line,
  ResponsiveContainer
} from "recharts";
import { FaChartLine, FaChartBar, FaNetworkWired } from "react-icons/fa";

const AlgorithmInfo = () => {
  const resnetAccuracyData = [
    { name: "Epoch 5", Training: 85, Validation: 82 },
    { name: "Epoch 10", Training: 89, Validation: 86 },
    { name: "Epoch 15", Training: 92, Validation: 88 },
    { name: "Epoch 20", Training: 95, Validation: 91 },
    { name: "Epoch 25", Training: 97, Validation: 93 },
  ];

  const resnetLossData = [
    { name: "Epoch 5", Training: 0.42, Validation: 0.45 },
    { name: "Epoch 10", Training: 0.32, Validation: 0.37 },
    { name: "Epoch 15", Training: 0.21, Validation: 0.28 },
    { name: "Epoch 20", Training: 0.12, Validation: 0.19 },
    { name: "Epoch 25", Training: 0.08, Validation: 0.14 },
  ];

  const mobilenetAccuracyData = [
    { name: "Epoch 5", Training: 82, Validation: 79 },
    { name: "Epoch 10", Training: 87, Validation: 84 },
    { name: "Epoch 15", Training: 90, Validation: 87 },
    { name: "Epoch 20", Training: 93, Validation: 89 },
    { name: "Epoch 25", Training: 95, Validation: 91 },
  ];

  const mobilenetLossData = [
    { name: "Epoch 5", Training: 0.48, Validation: 0.52 },
    { name: "Epoch 10", Training: 0.35, Validation: 0.39 },
    { name: "Epoch 15", Training: 0.25, Validation: 0.30 },
    { name: "Epoch 20", Training: 0.16, Validation: 0.22 },
    { name: "Epoch 25", Training: 0.10, Validation: 0.16 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-purple-50">
      <nav className="fixed w-full z-50 glass-effect border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-bold gradient-text">
                BrinjalCare
              </Link>
            </div>
            
            <div className="hidden md:flex space-x-8">
              <Link to="/" className="nav-link">
                Home
              </Link>
              <Link to="/leaf-diseases" className="nav-link">
                Leaf Diseases
              </Link>
              <Link to="/algorithm-info" className="nav-link text-primary">
                Model Info
              </Link>
            </div>

            <div className="md:hidden">
              <Link to="/" className="p-2 rounded-md text-gray-700 hover:text-primary focus:outline-none">
                Home
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto text-center"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8">
            <span className="gradient-text">
              Our AI Models
            </span>
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            The technology behind BrinjalCare's advanced disease detection system
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-8"
          >
            <div className="flex items-center mb-6">
              <FaNetworkWired className="text-3xl text-primary mr-4" />
              <h2 className="text-3xl font-bold gradient-text">ResNet50</h2>
            </div>
            <p className="text-gray-700 mb-6 leading-relaxed">
              ResNet50 is a pre-trained convolutional neural network widely known for its performance in image classification tasks. 
              It has been fine-tuned with additional layers such as Global Average Pooling, Dense, Dropout, and a classification output 
              layer to adapt it for our specific problem. ResNet50 employs residual connections to mitigate vanishing gradient issues, 
              allowing for the training of very deep networks. This architecture is particularly effective for extracting hierarchical 
              features from images, making it suitable for tasks like Brinjal leaf classification.
            </p>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 gradient-text">Accuracy Performance</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={resnetAccuracyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Training" stroke="#8884d8" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="Validation" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4 gradient-text">Loss Performance</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={resnetLossData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Training" stroke="#ff7300" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="Validation" stroke="#387908" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card p-8"
          >
            <div className="flex items-center mb-6">
              <FaNetworkWired className="text-3xl text-secondary mr-4" />
              <h2 className="text-3xl font-bold gradient-text">MobileNet</h2>
            </div>
            <p className="text-gray-700 mb-6 leading-relaxed">
              MobileNet is a lightweight CNN designed for efficiency. It has been fine-tuned on our custom dataset 
              with seven leaf disease classes. Using transfer learning, the pre-trained MobileNet is adapted for 
              accurate classification. The model processes input images and predicts their disease class effectively,
              while maintaining a small footprint which makes it ideal for deployment in resource-constrained environments
              like mobile devices and edge computing platforms.
            </p>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 gradient-text">Accuracy Performance</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={mobilenetAccuracyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Training" stroke="#8884d8" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="Validation" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4 gradient-text">Loss Performance</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={mobilenetLossData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Training" stroke="#ff7300" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="Validation" stroke="#387908" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-card p-8 mb-16"
        >
          <h2 className="text-3xl font-bold gradient-text mb-6">Model Comparison</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feature</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ResNet50</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MobileNet</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Architecture Type</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Deep residual network</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Lightweight CNN</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Model Size</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">~98 MB</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">~16 MB</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Accuracy</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">93% (validation)</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">91% (validation)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Inference Speed</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Slower</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Faster</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Best Use Case</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">High accuracy requirements</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Mobile and edge devices</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="glass-card p-8"
        >
          <h2 className="text-3xl font-bold gradient-text mb-6">Technical Implementation</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-3 gradient-text">Data Preprocessing</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                All input images are resized to 224x224 pixels and normalized. Data augmentation techniques including
                rotation, zoom, and horizontal flipping are applied to improve model generalization and reduce overfitting.
              </p>
              
              <h3 className="text-xl font-semibold mb-3 gradient-text">Training Process</h3>
              <p className="text-gray-700 leading-relaxed">
                Models were trained using a categorical cross-entropy loss function with the Adam optimizer. 
                Learning rate was set to 0.0001 with a batch size of 32. Training was conducted for 25 epochs 
                with early stopping to prevent overfitting.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3 gradient-text">Model Deployment</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                The trained models are converted to TensorFlow.js format for web deployment, enabling
                client-side inference without sending sensitive image data to external servers.
              </p>
              
              <h3 className="text-xl font-semibold mb-3 gradient-text">Future Improvements</h3>
              <p className="text-gray-700 leading-relaxed">
                We are continuously working on improving model performance through collection of additional
                training data, experimenting with newer architectures like EfficientNet, and implementing
                explainable AI techniques to provide more insights into model predictions.
              </p>
            </div>
          </div>
        </motion.div>
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

export default AlgorithmInfo;
