
import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Leaf, CircuitBoard } from "lucide-react";

const Index = () => {
  return (
    <div className="container py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">Brinjal Buddy</h1>
        <p className="text-xl text-muted-foreground">
          Your smart assistant for brinjal plant disease detection and treatment
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Leaf className="h-6 w-6 text-green-600" />
              <CardTitle>Leaf Diseases</CardTitle>
            </div>
            <CardDescription>
              Learn about common brinjal leaf diseases, their symptoms, and treatments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Explore comprehensive information about various diseases affecting brinjal plants,
              including white mold, leaf spot, mosaic virus, and more.
            </p>
          </CardContent>
          <CardFooter>
            <Link
              to="/leaf-diseases"
              className={buttonVariants({ variant: "default" })}
            >
              View Diseases
            </Link>
          </CardFooter>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-2">
              <CircuitBoard className="h-6 w-6 text-blue-600" />
              <CardTitle>AI Model Information</CardTitle>
            </div>
            <CardDescription>
              Learn about the machine learning algorithms used in our disease detection
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Explore the technical details of our machine learning models,
              including architecture, performance metrics, and comparison between different approaches.
            </p>
          </CardContent>
          <CardFooter>
            <Link
              to="/algorithm-info"
              className={buttonVariants({ variant: "default" })}
            >
              View Models
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Index;
