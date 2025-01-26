import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Star } from "lucide-react";

const TestimonialsSection = () => {
    const testimonials = [
        {
            id: 1,
            name: "Jane Doe",
            review: "The stationary I purchased has completely transformed my workspace! Great quality and design.",
            rating: 5,
            image: "/path-to-person-1.jpg", // Replace with your avatar/profile image
        },
        {
            id: 2,
            name: "John Smith",
            review: "I love how creative and functional these products are. Will definitely order again soon!",
            rating: 4,
            image: "/path-to-person-2.jpg",
        },
        {
            id: 3,
            name: "Lisa Johnson",
            review: "Perfect for students and professionals alike. My notebooks and pens are the envy of my class!",
            rating: 5,
            image: "/path-to-person-3.jpg",
        },
    ];

    return (
        <section className="bg-neutral py-16">
            {/* Section Header */}
            <div className="container mx-auto text-center px-4">
                <h2 className="text-3xl font-bold text-primary-foreground">
                    What Our Customers Say
                </h2>
                <Separator className="mx-auto mt-4 w-24 bg-highlight h-1 rounded-full" />
                <p className="mt-4 text-muted-foreground">
                    Hear from the people who love our products and trust us to keep them creative and productive.
                </p>
            </div>

            {/* Testimonials Grid */}
            <div className="container mx-auto mt-8 grid grid-cols-1 px-4 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {testimonials.map((testimonial) => (
                    <Card key={testimonial.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader className="flex items-center space-x-4">
                            {/* Reviewer Image */}
                            <img
                                src={testimonial.image}
                                alt={testimonial.name}
                                className="w-12 h-12 rounded-full object-cover border-2 border-highlight"
                            />
                            {/* Reviewer Name */}
                            <div>
                                <CardTitle className="text-lg text-highlight font-bold font-heading">
                                    {testimonial.name}
                                </CardTitle>
                                {/* Rating */}
                                <div className="flex items-center gap-1 text-highlight">
                                    {Array.from({ length: testimonial.rating }).map((_, index) => (
                                        <Star key={index} className="w-4 h-4 fill-current" />
                                    ))}
                                </div>
                            </div>
                        </CardHeader>
                        {/* Review Text */}
                        <CardContent>
                            <CardDescription className="text-muted-foreground">
                                "{testimonial.review}"
                            </CardDescription>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
};

export default TestimonialsSection;