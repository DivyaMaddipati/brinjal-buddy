
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  CartesianGrid, 
  XAxis, 
  YAxis, 
  Legend,
  Tooltip 
} from "recharts";

const AlgorithmInfo = () => {
  // Sample data for ResNet50 model performance
  const resnetAccuracyData = [
    { epoch: 1, accuracy: 0.45, validation: 0.42 },
    { epoch: 2, accuracy: 0.58, validation: 0.55 },
    { epoch: 3, accuracy: 0.65, validation: 0.62 },
    { epoch: 4, accuracy: 0.72, validation: 0.68 },
    { epoch: 5, accuracy: 0.78, validation: 0.73 },
    { epoch: 6, accuracy: 0.83, validation: 0.78 },
    { epoch: 7, accuracy: 0.86, validation: 0.81 },
    { epoch: 8, accuracy: 0.89, validation: 0.84 },
    { epoch: 9, accuracy: 0.92, validation: 0.86 },
    { epoch: 10, accuracy: 0.94, validation: 0.87 },
  ];

  const resnetLossData = [
    { epoch: 1, loss: 1.45, validation: 1.52 },
    { epoch: 2, loss: 1.12, validation: 1.25 },
    { epoch: 3, loss: 0.92, validation: 1.05 },
    { epoch: 4, loss: 0.75, validation: 0.85 },
    { epoch: 5, loss: 0.62, validation: 0.70 },
    { epoch: 6, loss: 0.48, validation: 0.58 },
    { epoch: 7, loss: 0.38, validation: 0.45 },
    { epoch: 8, loss: 0.30, validation: 0.38 },
    { epoch: 9, loss: 0.22, validation: 0.32 },
    { epoch: 10, loss: 0.18, validation: 0.28 },
  ];

  // Sample data for MobileNet model performance
  const mobilenetAccuracyData = [
    { epoch: 1, accuracy: 0.42, validation: 0.40 },
    { epoch: 2, accuracy: 0.54, validation: 0.52 },
    { epoch: 3, accuracy: 0.62, validation: 0.58 },
    { epoch: 4, accuracy: 0.70, validation: 0.65 },
    { epoch: 5, accuracy: 0.76, validation: 0.70 },
    { epoch: 6, accuracy: 0.81, validation: 0.75 },
    { epoch: 7, accuracy: 0.85, validation: 0.78 },
    { epoch: 8, accuracy: 0.88, validation: 0.82 },
    { epoch: 9, accuracy: 0.90, validation: 0.84 },
    { epoch: 10, accuracy: 0.92, validation: 0.85 },
  ];

  const mobilenetLossData = [
    { epoch: 1, loss: 1.55, validation: 1.60 },
    { epoch: 2, loss: 1.20, validation: 1.32 },
    { epoch: 3, loss: 0.98, validation: 1.10 },
    { epoch: 4, loss: 0.80, validation: 0.92 },
    { epoch: 5, loss: 0.65, validation: 0.78 },
    { epoch: 6, loss: 0.52, validation: 0.64 },
    { epoch: 7, loss: 0.42, validation: 0.52 },
    { epoch: 8, loss: 0.34, validation: 0.45 },
    { epoch: 9, loss: 0.28, validation: 0.38 },
    { epoch: 10, loss: 0.22, validation: 0.32 },
  ];

  const chartConfig = {
    training: {
      label: "Training",
      theme: {
        light: "#3b82f6",
        dark: "#60a5fa",
      },
    },
    validation: {
      label: "Validation",
      theme: {
        light: "#16a34a",
        dark: "#4ade80",
      },
    },
  };

  return (
    <div className="container py-8 max-w-7xl mx-auto">
      <div className="flex items-center mb-6">
        <Link to="/" className="flex items-center text-primary hover:underline mr-4">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Home
        </Link>
        <h1 className="text-3xl font-bold">Prediction Algorithms</h1>
      </div>

      <div className="grid gap-8">
        {/* ResNet50 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">ResNet50</CardTitle>
            <CardDescription>
              Pre-trained convolutional neural network for image classification
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-muted-foreground">
              <p className="mb-4">
                ResNet50 is a pre-trained convolutional neural network widely known for its performance 
                in image classification tasks. It has been fine-tuned with additional layers such as 
                Global Average Pooling, Dense, Dropout, and a classification output layer to adapt it 
                for the specific problem. 
              </p>
              <p className="mb-4">
                ResNet50 employs residual connections to mitigate vanishing gradient issues, 
                allowing for the training of very deep networks. This architecture is particularly 
                effective for extracting hierarchical features from images, making it suitable for 
                tasks like Brinjal leaf classification.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Accuracy Performance</h3>
                <div className="h-[300px]">
                  <ChartContainer config={chartConfig}>
                    <LineChart data={resnetAccuracyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="epoch" />
                      <YAxis domain={[0, 1]} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="accuracy" 
                        name="Training" 
                        stroke="var(--color-training)" 
                        strokeWidth={2} 
                        dot={{ r: 4 }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="validation" 
                        name="Validation" 
                        stroke="var(--color-validation)" 
                        strokeWidth={2} 
                        dot={{ r: 4 }} 
                      />
                    </LineChart>
                  </ChartContainer>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">Loss Performance</h3>
                <div className="h-[300px]">
                  <ChartContainer config={chartConfig}>
                    <LineChart data={resnetLossData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="epoch" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="loss" 
                        name="Training" 
                        stroke="var(--color-training)" 
                        strokeWidth={2} 
                        dot={{ r: 4 }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="validation" 
                        name="Validation" 
                        stroke="var(--color-validation)" 
                        strokeWidth={2} 
                        dot={{ r: 4 }} 
                      />
                    </LineChart>
                  </ChartContainer>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-medium mb-3">Model Architecture</h3>
              <Table>
                <TableCaption>ResNet50 Model Architecture</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Layer</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Base Model</TableCell>
                    <TableCell>ResNet50 (pre-trained on ImageNet)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Feature Extraction</TableCell>
                    <TableCell>Convolutional layers with residual connections</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Pooling</TableCell>
                    <TableCell>Global Average Pooling</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Dense Layers</TableCell>
                    <TableCell>Multiple fully connected layers with ReLU activation</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Regularization</TableCell>
                    <TableCell>Dropout layers to prevent overfitting</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Output</TableCell>
                    <TableCell>Softmax classification for leaf diseases</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* MobileNet */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">MobileNet</CardTitle>
            <CardDescription>
              Lightweight CNN designed for efficiency
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-muted-foreground">
              <p className="mb-4">
                MobileNet is a lightweight CNN designed for efficiency. It is fine-tuned on a 
                custom dataset with seven leaf disease classes. Using transfer learning, the 
                pre-trained MobileNet is adapted for accurate classification. The model 
                processes input images and predicts their disease class effectively.
              </p>
              <p className="mb-4">
                The architecture is optimized for mobile and embedded devices, making it ideal for 
                deployment in agricultural applications where computational resources may be limited.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Accuracy Performance</h3>
                <div className="h-[300px]">
                  <ChartContainer config={chartConfig}>
                    <LineChart data={mobilenetAccuracyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="epoch" />
                      <YAxis domain={[0, 1]} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="accuracy" 
                        name="Training" 
                        stroke="var(--color-training)" 
                        strokeWidth={2} 
                        dot={{ r: 4 }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="validation" 
                        name="Validation" 
                        stroke="var(--color-validation)" 
                        strokeWidth={2} 
                        dot={{ r: 4 }} 
                      />
                    </LineChart>
                  </ChartContainer>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">Loss Performance</h3>
                <div className="h-[300px]">
                  <ChartContainer config={chartConfig}>
                    <LineChart data={mobilenetLossData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="epoch" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="loss" 
                        name="Training" 
                        stroke="var(--color-training)" 
                        strokeWidth={2} 
                        dot={{ r: 4 }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="validation" 
                        name="Validation" 
                        stroke="var(--color-validation)" 
                        strokeWidth={2} 
                        dot={{ r: 4 }} 
                      />
                    </LineChart>
                  </ChartContainer>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-medium mb-3">Model Architecture</h3>
              <Table>
                <TableCaption>MobileNet Model Architecture</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Layer</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Base Model</TableCell>
                    <TableCell>MobileNet (pre-trained on ImageNet)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Feature Extraction</TableCell>
                    <TableCell>Depthwise separable convolutions</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Pooling</TableCell>
                    <TableCell>Global Average Pooling</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Dense Layers</TableCell>
                    <TableCell>Lightweight fully connected layers</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Regularization</TableCell>
                    <TableCell>Batch normalization and dropout</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Output</TableCell>
                    <TableCell>Softmax classification layer (7 disease classes)</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Comparison */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Model Comparison</CardTitle>
            <CardDescription>
              Comparing the performance of ResNet50 vs MobileNet
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Aspect</TableHead>
                  <TableHead>ResNet50</TableHead>
                  <TableHead>MobileNet</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Model Size</TableCell>
                  <TableCell>~98 MB</TableCell>
                  <TableCell>~16 MB</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Parameters</TableCell>
                  <TableCell>~25 million</TableCell>
                  <TableCell>~4 million</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Inference Speed</TableCell>
                  <TableCell>Slower</TableCell>
                  <TableCell>Faster</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Final Accuracy</TableCell>
                  <TableCell>~94%</TableCell>
                  <TableCell>~92%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Best for</TableCell>
                  <TableCell>High accuracy applications with sufficient computational resources</TableCell>
                  <TableCell>Mobile/embedded applications with limited resources</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AlgorithmInfo;
