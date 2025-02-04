import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Briefcase, Users, Target, Mail } from "lucide-react"

const teamMembers = [
    {
        name: "Jane Doe",
        role: "CEO & Founder",
        image: "",
        bio: "Jane has over 15 years of experience in tech and is passionate about creating innovative solutions.",
        skills: ["Leadership", "Strategy", "Innovation"],
    },
    {
        name: "John Smith",
        role: "CTO",
        image: "",
        bio: "John is an expert in cloud architecture and leads our technical strategy.",
        skills: ["Cloud Architecture", "DevOps", "AI"],
    },
    {
        name: "Emily Brown",
        role: "Head of Design",
        image: "",
        bio: "Emily brings creativity and user-centric design to all our products.",
        skills: ["UI/UX", "Product Design", "Brand Strategy"],
    },
    {
        name: "Michael Lee",
        role: "Lead Developer",
        image: "",
        bio: "Michael is a full-stack developer with a knack for solving complex problems.",
        skills: ["Full-stack Development", "System Architecture", "Performance Optimization"],
    },
]

const companyValues = [
    {
        icon: Briefcase,
        title: "Quality",
        description: "We are committed to offering unmatched quality in all our stationery products.",
    },
    {
        icon: Users,
        title: "Creativity",
        description: "We believe in encouraging creativity through beautifully designed products.",
    },
    {
        icon: Target,
        title: "Sustainability",
        description: "We strive to reduce our environmental impact with eco-friendly practices.",
    },
]

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <motion.section
                className="mb-16 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="mb-4 text-4xl font-bold bg-clip-text text-primary-foreground">About Us</h1>
                <p className="mb-8 text-xl text-muted-foreground">
                    Welcome to Pappier, your destination for high-quality stationery that sparks creativity and organization.
                </p>
                <div className="relative h-[400px] flex rounded-lg overflow-hidden justify-center items-center">
                    <img
                        src="/logo.png"
                        alt="Logo"
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                        <h2 className="text-2xl font-bold mb-2">Crafting Creativity</h2>
                        <p>Join us as we redefine the world of stationery for the modern age.</p>
                    </div>
                </div>
            </motion.section>

            {/* Mission Section */}
            <motion.section
                className="mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Our Mission</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-lg leading-relaxed">
                            At Pappier, our mission is to bring joy, creativity, and organization into people's lives by offering
                            high-quality and beautifully designed stationery products. We aim to inspire productivity and creativity,
                            while ensuring a seamless e-commerce experience for our customers.
                        </p>
                        <div className="mt-8 grid gap-4 md:grid-cols-3">
                            {companyValues.map((value, index) => (
                                <Card key={index} className="bg-muted">
                                    <CardHeader>
                                        <value.icon className="h-8 w-8 text-primary" />
                                        <CardTitle className="mt-2">{value.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p>{value.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </motion.section>

            {/* Vision Section */}
            <motion.section
                className="mt-16 mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
            >
                <Card className="overflow-hidden">
                    <CardHeader className="bg-primary text-primary-foreground p-6">
                        <CardTitle className="text-3xl font-bold">Our Vision</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="grid md:grid-cols-2">
                            <div className="p-6 flex items-center">
                                <p className="text-lg leading-relaxed">
                                    We envision Pappier becoming the go-to platform for stationery enthusiasts worldwide, fostering a
                                    global community built on creativity and organization. By combining exceptional craftsmanship,
                                    sustainability, and innovative design, we aim to redefine how people interact with stationery in the
                                    modern age.
                                </p>
                            </div>
                            <div className="bg-muted p-6">
                                <h3 className="text-xl font-semibold mb-4">Our Key Objectives</h3>
                                <ul className="space-y-4">
                                    {[
                                        { icon: Target, text: "Become the leading global stationery platform" },
                                        { icon: Users, text: "Build a vibrant community of stationery enthusiasts" },
                                        { icon: Briefcase, text: "Innovate in sustainable and creative product design" },
                                    ].map((item, index) => (
                                        <motion.li
                                            key={index}
                                            className="flex items-center space-x-3"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                                        >
                                            <div className="bg-primary rounded-full p-2">
                                                <item.icon className="h-5 w-5 text-primary-foreground" />
                                            </div>
                                            <span>{item.text}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.section>

            {/* Team Section */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                <h2 className="mb-8 text-3xl font-bold text-center">Meet Our Team</h2>
                <Tabs defaultValue="grid" className="mb-8">
                    <TabsList className="grid w-full grid-cols-2 mb-4">
                        <TabsTrigger value="grid">Grid View</TabsTrigger>
                        <TabsTrigger value="list">List View</TabsTrigger>
                    </TabsList>
                    <TabsContent value="grid">
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                            {teamMembers.map((member, index) => (
                                <motion.div
                                    key={member.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <Card className="overflow-hidden">
                                        <CardHeader className="p-0">
                                            <div className="relative h-48">
                                                <img src={member.image || "/no-image.svg"} alt={member.name} className={"fill-cover"} />
                                            </div>
                                        </CardHeader>
                                        <CardContent className="p-4 text-center">
                                            <CardTitle>{member.name}</CardTitle>
                                            <CardDescription>{member.role}</CardDescription>
                                            <p className="mt-2 text-sm">{member.bio}</p>
                                            <div className="mt-4 flex flex-wrap justify-center gap-2">
                                                {member.skills.map((skill) => (
                                                    <Badge key={skill} variant="secondary">
                                                        {skill}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </TabsContent>
                    <TabsContent value="list">
                        <div className="space-y-4">
                            {teamMembers.map((member, index) => (
                                <motion.div
                                    key={member.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <Card>
                                        <CardHeader className="flex flex-row items-center gap-4">
                                            <Avatar className="h-16 w-16">
                                                <AvatarImage src={member.image} alt={member.name} />
                                                <AvatarFallback>
                                                    {member.name
                                                        .split(" ")
                                                        .map((n) => n[0])
                                                        .join("")}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <CardTitle>{member.name}</CardTitle>
                                                <CardDescription>{member.role}</CardDescription>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <p>{member.bio}</p>
                                            <div className="mt-4 flex flex-wrap gap-2">
                                                {member.skills.map((skill) => (
                                                    <Badge key={skill} variant="secondary">
                                                        {skill}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </motion.section>

            {/* Story Section */}
            <motion.section
                className="mt-16 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
            >
                <h2 className="mb-4 text-3xl font-bold">Join Our Team</h2>
                <p className="mb-8 text-xl text-muted-foreground">
                    We're always looking for talented individuals to join our mission.
                </p>
                <div className="flex justify-center 6 ">
                    <Button size="lg">View Open Positions</Button>
                    <Button size="lg" variant="outline">
                        <Mail className="mr-2 h-4 w-4" /> Contact Us
                    </Button>
                </div>
            </motion.section>
        </div>
    )
}

