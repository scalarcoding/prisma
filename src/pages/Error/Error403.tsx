import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Error403(): JSX.Element {

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="max-w-md text-center">
        <CardHeader>
          <h1 className="text-4xl font-bold text-red-600">403</h1>
          <p className="text-lg text-gray-700">Access Denied</p>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            You don’t have permission to access this page.
          </p>
          <Button variant="outline" onClick={() => window.location.href= '/'}>
            Go Back Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
