
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Separator } from "@/components/ui/separator";
import { Brain, Cpu, Leaf, LineChart } from "lucide-react";
import { Link } from "react-router-dom";
import { Area, AreaChart, Legend, ResponsiveContainer, XAxis, YAxis } from "recharts";

const trainingData = [
  { epoch: 0, trainingLoss: 0.69, validationLoss: 0.31, trainingAccuracy: 0.75, validationAccuracy: 0.89 },
  { epoch: 1, trainingLoss: 0.31, validationLoss: 0.17, trainingAccuracy: 0.88, validationAccuracy: 0.95 },
  { epoch: 2, trainingLoss: 0.25, validationLoss: 0.16, trainingAccuracy: 0.91, validationAccuracy: 0.96 },
  { epoch: 3, trainingLoss: 0.19, validationLoss: 0.11, trainingAccuracy: 0.93, validationAccuracy: 0.96 },
  { epoch: 4, trainingLoss: 0.17, validationLoss: 0.12, trainingAccuracy: 0.94, validationAccuracy: 0.96 },
  { epoch: 5, trainingLoss: 0.15, validationLoss: 0.09, trainingAccuracy: 0.94, validationAccuracy: 0.97 },
  { epoch: 6, trainingLoss: 0.13, validationLoss: 0.09, trainingAccuracy: 0.95, validationAccuracy: 0.97 },
  { epoch: 7, trainingLoss: 0.12, validationLoss: 0.09, trainingAccuracy: 0.96, validationAccuracy: 0.96 },
  { epoch: 8, trainingLoss: 0.12, validationLoss: 0.13, trainingAccuracy: 0.96, validationAccuracy: 0.95 },
];

const chartConfig = {
  trainingLoss: { label: "Training Loss", color: "#3b82f6" },
  validationLoss: { label: "Validation Loss", color: "#f97316" },
  trainingAccuracy: { label: "Training Accuracy", color: "#3b82f6" },
  validationAccuracy: { label: "Validation Accuracy", color: "#f97316" },
};

const ModelInfo = () => {
  return (
    <div className="container mx-auto py-8 max-w-7xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Leaf className="h-6 w-6 text-green-500" />
          <h1 className="text-3xl font-bold">Plant Health AI</h1>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" asChild>
            <Link to="/">Home</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/leaf-diseases">Leaf Diseases</Link>
          </Button>
        </div>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-purple-500" />
            <span>Our Model Architecture</span>
          </CardTitle>
          <CardDescription>
            Understanding the technology behind our plant disease detection
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <h3 className="text-xl font-semibold mb-3">MobileNet Architecture</h3>
              <p className="text-muted-foreground mb-4">
                The model uses MobileNet, a lightweight CNN designed for efficiency. It is fine-tuned on a custom dataset 
                with seven leaf disease classes. Using transfer learning, the pre-trained MobileNet is adapted for accurate 
                classification. The model processes input images and predicts their disease class effectively.
              </p>
              <h3 className="text-xl font-semibold mb-3">Transfer Learning</h3>
              <p className="text-muted-foreground mb-4">
                We leverage the power of transfer learning by using a pre-trained MobileNet model, which has been trained on 
                millions of images. This provides us with a strong foundation for feature extraction. We then fine-tune the 
                model on our specific leaf disease dataset to adapt it to our particular classification task.
              </p>
              <h3 className="text-xl font-semibold mb-3">Disease Classification</h3>
              <p className="text-muted-foreground">
                Our model can classify leaves into seven different categories: Healthy Leaf, Insect Pest Disease, Leaf Spot Disease, 
                Mosaic Virus Disease, Small Leaf Disease, White Mold Disease, and Wilt Disease. The model analyzes the visual patterns 
                in leaf images to make accurate predictions about plant health conditions.
              </p>
            </div>
            <div className="bg-muted p-6 rounded-lg flex flex-col justify-center">
              <Cpu className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-center mb-2">Technical Specifications</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Architecture:</span>
                  <span className="font-medium">MobileNet</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Classes:</span>
                  <span className="font-medium">7</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Input Size:</span>
                  <span className="font-medium">224×224 px</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Top-1 Accuracy:</span>
                  <span className="font-medium">~95%</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Training Epochs:</span>
                  <span className="font-medium">10</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <LineChart className="h-6 w-6 text-blue-500" />
        Model Evaluation Metrics
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <Card>
          <CardHeader>
            <CardTitle>Loss Curves</CardTitle>
            <CardDescription>
              Training and validation loss over epochs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ChartContainer
                config={chartConfig}
                className="h-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trainingData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <XAxis 
                      dataKey="epoch" 
                      label={{ value: 'Epochs', position: 'insideBottom', offset: -5 }} 
                    />
                    <YAxis 
                      label={{ value: 'Loss', angle: -90, position: 'insideLeft' }} 
                      domain={[0, 0.7]} 
                    />
                    <ChartTooltip 
                      content={<ChartTooltipContent />} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="trainingLoss" 
                      stroke="#3b82f6" 
                      fill="#3b82f680" 
                      strokeWidth={2} 
                      name="Training Loss" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="validationLoss" 
                      stroke="#f97316" 
                      fill="#f9731680" 
                      strokeWidth={2} 
                      name="Validation Loss" 
                    />
                    <Legend />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Accuracy Curves</CardTitle>
            <CardDescription>
              Training and validation accuracy over epochs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ChartContainer
                config={chartConfig}
                className="h-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trainingData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <XAxis 
                      dataKey="epoch" 
                      label={{ value: 'Epochs', position: 'insideBottom', offset: -5 }} 
                    />
                    <YAxis 
                      label={{ value: 'Accuracy', angle: -90, position: 'insideLeft' }} 
                      domain={[0.7, 1.0]} 
                    />
                    <ChartTooltip 
                      content={<ChartTooltipContent />} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="trainingAccuracy" 
                      stroke="#3b82f6" 
                      fill="#3b82f680" 
                      strokeWidth={2} 
                      name="Training Accuracy" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="validationAccuracy" 
                      stroke="#f97316" 
                      fill="#f9731680" 
                      strokeWidth={2} 
                      name="Validation Accuracy" 
                    />
                    <Legend />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Model Interpretation</CardTitle>
          <CardDescription>
            Understanding what the performance metrics tell us about our model
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Loss Curve Analysis</h3>
              <p className="text-muted-foreground">
                The loss curves show how well our model is learning over time. Both training and validation loss decrease 
                rapidly in the first few epochs, indicating effective learning. The closeness of training and validation 
                loss curves suggests the model is generalizing well without significant overfitting. The plateau around 
                epoch 6-8 indicates the model has reached optimal performance.
              </p>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Accuracy Interpretation</h3>
              <p className="text-muted-foreground">
                The accuracy curves demonstrate the classification performance of our model. Starting at around 75% for training 
                and 89% for validation, the model quickly improves to over 95% accuracy. The slight dip in validation accuracy 
                at later epochs suggests minor overfitting, but the final model maintains excellent performance with approximately 
                95% accuracy on unseen data.
              </p>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Overall Performance</h3>
              <p className="text-muted-foreground">
                Our MobileNet-based model achieves high accuracy while maintaining computational efficiency. This makes it 
                suitable for deployment in resource-constrained environments like mobile applications. The model demonstrates 
                robust performance across all seven disease classes, making it reliable for real-world plant disease detection.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 flex justify-center">
        <Button asChild size="lg">
          <Link to="/leaf-diseases">
            View Leaf Disease Information
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ModelInfo;
