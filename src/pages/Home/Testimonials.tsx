import { Zap } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel.tsx';
import Autoplay from 'embla-carousel-autoplay';
import { Card, CardContent } from '@/components/ui/card.tsx';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx';

const testimonials = [
  {
    name: "Alice Johnson",
    role: "CEO & Founder",
    content:
      "This platform has revolutionized the way we manage projects. It is incredibly user-friendly and efficient. The features have made our daily operations smooth and effective.",
    avatar: "",
  },
  {
    name: "David Lee",
    role: "CTO",
    content:
      "I have been impressed with the seamless integration and functionality. It has made our tech operations much smoother. The platform's capabilities have exceeded our expectations in every way.",
    avatar: "",
  },
  {
    name: "Mark Thompson",
    role: "COO",
    content:
      "Managing our day-to-day operations has never been easier. The interface is intuitive and saves us a lot of time. We've seen significant improvements in our team's productivity.",
    avatar: "",
  },
  {
    name: "Sarah Wilson",
    role: "Product Manager",
    content:
      "The platform's capabilities have exceeded our expectations. It's been transformative for our team's productivity and collaboration. The support team has been exceptional throughout our journey.",
    avatar: "",
  },
]

const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div>
        <div className="">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Zap className="w-5 h-5" />
              <p className="text-sm font-medium">Rated 4.5 stars by 1000+ clients</p>
            </div>
            <h2 className="text-4xl font-bold mb-4">Meet our happy clients</h2>
            <p className="text-xl text-muted-foreground mb-6">
              Join a global network of thought leaders, product developers,
            </p>
            <Button variant="link" className="text-primary-foreground font-medium">
              View all testimonials →
            </Button>
          </div>

          <Carousel
            opts={{
              align: 'start',
              loop: true,
              active: true
            }}
            plugins={[
              Autoplay({
                delay: 2000
              })
            ]}
            className="w-full max-w-5xl mx-auto"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="border-0 h-[280px]">
                    <CardContent className="p-6 h-full flex flex-col">
                      <div className="flex items-center gap-4 mb-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                          <AvatarFallback>
                            {testimonial.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{testimonial.name}</h3>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {[...Array(4)].map((_, i) => (
                          <svg key={i} className="w-5 h-5 fill-primary" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="mt-4 text-muted-foreground line-clamp-4">&ldquo;{testimonial.content}&rdquo;</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12" />
            <CarouselNext className="hidden md:flex -right-12" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;