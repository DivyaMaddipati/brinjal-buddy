import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Leaf } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [isPredicting, setIsPredicting] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setSelectedFile(file || null);
    setPrediction(null); // Clear previous prediction when a new file is selected
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select an image first.");
      return;
    }

    setIsPredicting(true); // Set predicting state to true

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setPrediction(data.prediction);
    } catch (error) {
      console.error("Error during prediction:", error);
      setPrediction("Error occurred during prediction.");
    } finally {
      setIsPredicting(false); // Set predicting state back to false
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <Leaf className="h-6 w-6 text-green-500" />
            <h1 className="text-3xl font-bold">Plant Health AI</h1>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" asChild>
              <Link to="/leaf-diseases">Leaf Diseases</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/model-info">Model Info</Link>
            </Button>
          </div>
        </div>

        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Identify Plant Diseases</CardTitle>
            <CardDescription>Upload an image to detect potential diseases</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="picture">Upload image</Label>
              <Input id="picture" type="file" onChange={handleFileChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="select">Select your plant</Label>
              <Select>
                <SelectTrigger id="select">
                  <SelectValue placeholder="Plant" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="citrus">Citrus</SelectItem>
                  <SelectItem value="corn">Corn</SelectItem>
                  <SelectItem value="grape">Grape</SelectItem>
                  <SelectItem value="potato">Potato</SelectItem>
                  <SelectItem value="raspberry">Raspberry</SelectItem>
                  <SelectItem value="soybean">Soybean</SelectItem>
                  <SelectItem value="squash">Squash</SelectItem>
                  <SelectItem value="strawberry">Strawberry</SelectItem>
                  <SelectItem value="tomato">Tomato</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleUpload} disabled={isPredicting}>
              {isPredicting ? "Predicting..." : "Predict"}
            </Button>
          </CardFooter>
        </Card>

        {prediction && (
          <div className="mt-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">Prediction Result:</h2>
            <p className="text-green-600 font-bold">{prediction}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Index;
