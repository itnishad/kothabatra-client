import React from 'react';

const testimonials = [
  {
    id: 1,
    content:
      "Chatter has transformed how our team communicates. It's intuitive, reliable, and has all the features we need without being overwhelming.",
    author: 'Sarah Johnson',
    role: 'Product Manager at TechCorp',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 2,
    content:
      "We've tried several chat platforms before settling on Chatter. The interface is clean, the notifications are reliable, and it helps us stay connected.",
    author: 'Michael Chen',
    role: 'Software Developer at InnoTech',
    avatar:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 3,
    content:
      'As a remote team, clear communication is vital. Chatter provides us with a reliable platform that keeps everyone on the same page.',
    author: 'Lisa Rodriguez',
    role: 'Marketing Director at CreativeHub',
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
];

const Testimonials = () => {
  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Trusted by teams worldwide
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            See what our users are saying about their experience with Chatter.
          </p>
        </div>
        <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="glass-card p-8 transition duration-300 hover:shadow-xl"
              >
                <blockquote className="text-gray-700">
                  <p className="text-lg">"{testimonial.content}"</p>
                </blockquote>
                <div className="mt-6 flex items-center">
                  <div className="h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <div className="font-medium text-gray-900">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
