import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Leaf } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const LeafDiseases = () => {
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
            <Link to="/model-info">Model Info</Link>
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Leaf Disease Information</CardTitle>
          <CardDescription>
            Explore detailed information about various leaf diseases.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Early Blight</CardTitle>
                <CardDescription>
                  Information about Early Blight disease.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Early blight is a common disease that affects many plants,
                  including tomatoes and potatoes.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Late Blight</CardTitle>
                <CardDescription>
                  Information about Late Blight disease.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Late blight is a devastating disease that can quickly destroy
                  crops, especially in wet conditions.
                </p>
              </CardContent>
            </Card>
          </div>

          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">INV001</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">INV002</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>PayPal</TableCell>
                <TableCell className="text-right">$150.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">INV003</TableCell>
                <TableCell>Unpaid</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell className="text-right">$350.00</TableCell>
              </TableRow>
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">$750.00</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeafDiseases;
