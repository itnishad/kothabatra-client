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
import { UserPlus } from 'lucide-react';
import { toast } from 'sonner';

export const Route = createFileRoute('/signup')({
  component: RouteComponent,
});

function RouteComponent() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Account created successfully! Redirecting...');
    // In a real app, you would register with a backend here
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex justify-center items-center gap-2">
          <UserPlus className="h-10 w-10 text-chat-purple" />
          <span className="text-2xl font-bold text-gray-900">Chatter</span>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-medium text-chat-purple hover:text-chat-indigo"
          >
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-center">Sign up</CardTitle>
            <CardDescription className="text-center">
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first_name">First Name</Label>
                  <Input
                    id="first_name"
                    type="text"
                    placeholder="John"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last_name">Last Name</Label>
                  <Input
                    id="last_name"
                    type="text"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>

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
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required
                />
                <p className="text-xs text-gray-500">
                  Must be at least 8 characters with a number and special
                  character.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm_password">Confirm Password</Label>
                <Input
                  id="confirm_password"
                  type="password"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="flex items-center">
                <input
                  id="agree_terms"
                  name="agree_terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 rounded border-gray-300 text-chat-purple focus:ring-chat-purple"
                />
                <label
                  htmlFor="agree_terms"
                  className="ml-2 block text-sm text-gray-900"
                >
                  I agree to the{' '}
                  <Link
                    to="/#terms"
                    className="font-medium text-chat-purple hover:text-chat-indigo"
                  >
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link
                    to="/#privacy"
                    className="font-medium text-chat-purple hover:text-chat-indigo"
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <Button
                type="submit"
                className="w-full bg-chat-purple hover:bg-chat-indigo"
              >
                Create Account
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center border-t pt-6">
            <p className="text-xs text-gray-600 text-center">
              By signing up, you'll receive occasional updates about our
              products and services. You can unsubscribe at any time.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
