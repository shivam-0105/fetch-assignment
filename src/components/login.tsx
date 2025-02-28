import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import axios from "axios";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import LoginImage from "@/assets/login-image.jpg"

const formSchema = z.object({
	name: z.string().min(3, { message: "Name must be atleast 3 characters long" }),
	email: z.string().email({ message: "Invalid Email Address" }),
});

const Login = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			email: "",
		}
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			const response = await axios.post(
				"https://frontend-take-home-service.fetch.com/auth/login",
				{
					name: values.name,
					email: values.email,
				},
				{
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
			);
			if (response.status === 200) {
				console.log(response);
        toast.success("Login successful!");
        // navigate("/dashboard");
      } else {
        toast.error("Login failed. Please try again.");
      }
		} catch {
			toast("Failed to submit the form. Please try again.");
		}
	}

	return (
		<>
			<div className="flex w-full min-h-screen">
				<div className="hidden w-1/2 flex-col justify-between p-8 text-white md:flex relative overflow-hidden">
					<div className="absolute inset-0 z-0">
						<img src={LoginImage} alt="Background" className="h-full w-full object-cover" />
					</div>
					<div className="relative z-10 flex items-center gap-2">
						<span className="text-xl font-medium">Fetch Assessment</span>
					</div>

					<div className="space-y-2 relative z-10">
						<blockquote className="text-xl font-medium leading-relaxed">
							"Every wag tells a tale of loyalty and love. Discover the dog whose heart matches yours."
						</blockquote>
						<p className="text-sm text-white/80">Shivam Hasmukh Panchal</p>
					</div>
				</div>

				<div className="w-1/2 flex items-center justify-center">
					<Card className="w-[350px]">
						<CardHeader>
							<CardTitle>Login into your account</CardTitle>
							<CardDescription>Enter your name and email to login</CardDescription>
						</CardHeader>
						<CardContent>
							<Form {...form}>
								<form onSubmit={form.handleSubmit(onSubmit)}>
									<div className="grid gap-4">
										<FormField
											control={form.control}
											name="name"
											render={({ field }) => (
												<FormItem className="grid gap-2">
													<FormLabel htmlFor="name">Name</FormLabel>
													<FormControl>
														<Input
															id="name"
															placeholder="John Doe"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="email"
											render={({ field }) => (
												<FormItem className="grid gap-2">
													<FormLabel htmlFor="email">Email</FormLabel>
													<FormControl>
														<Input
															id="email"
															placeholder="johndoe@mail.com"
															type="email"
															autoComplete="email"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<Button type="submit" className="w-full bg-orange">
											Login
										</Button>
										<Button variant="outline" className="w-full">
											Login with Google
										</Button>
									</div>
								</form>
							</Form>
						</CardContent>
					</Card>
				</div>
			</div >
		</>
	)
};

export { Login };