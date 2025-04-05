import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/test/abc')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/test/abc"!</div>;
}
