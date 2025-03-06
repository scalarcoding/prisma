import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Error404(): JSX.Element {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="max-w-md text-center">
        <CardHeader>
          <h1 className="text-4xl font-bold text-blue-600">404</h1>
          <p className="text-lg text-gray-700">Page Not Found</p>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            The page you’re looking for doesn’t exist or has been moved.
          </p>
          <Button variant="outline" onClick={() => window.location.href= '/'}>
            Go Back Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
