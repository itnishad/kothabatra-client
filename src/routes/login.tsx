import { createFileRoute, Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { LogIn } from 'lucide-react';
import { toast } from 'sonner';

export const Route = createFileRoute('/login')({
  component: RouteComponent,
});

function RouteComponent() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Login successful! Redirecting...');
    // In a real app, you would authenticate with a backend here
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex justify-center items-center gap-2">
          <LogIn className="h-10 w-10 text-chat-purple" />
          <span className="text-2xl font-bold text-gray-900">Chatter</span>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link
            to="/signup"
            className="font-medium text-chat-purple hover:text-chat-indigo"
          >
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-center">Login</CardTitle>
            <CardDescription className="text-center">
              Enter your email and password to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to="/#forgot-password"
                    className="text-sm font-medium text-chat-purple hover:text-chat-indigo"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="flex items-center">
                <input
                  id="remember_me"
                  name="remember_me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-chat-purple focus:ring-chat-purple"
                />
                <label
                  htmlFor="remember_me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <Button
                type="submit"
                className="w-full bg-chat-purple hover:bg-chat-indigo"
              >
                Sign in
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center border-t pt-6">
            <p className="text-xs text-gray-600 text-center">
              By signing in, you agree to our{' '}
              <Link
                to="/#terms"
                className="font-medium text-chat-purple hover:text-chat-indigo"
              >
                Terms
              </Link>{' '}
              and{' '}
              <Link
                to="/#privacy"
                className="font-medium text-chat-purple hover:text-chat-indigo"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
