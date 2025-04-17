import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

export default function MovieNotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 bg-gray-900/50">
      <div className="max-w-md mx-auto text-center">
        <AlertCircle className="h-20 w-20 text-red-600 mx-auto mb-6" />
        <h2 className="text-2xl font-bold mb-4">Moview not found</h2>
        <p className="text-gray-400 mb-8">
          We couldn't complete your request. Please try again later.
        </p>
        <Link href="/">
          <Button className="text-white bg-red-600 hover:bg-red-700">
            Return to Home
          </Button>
        </Link>
      </div>
    </div>

  );
}