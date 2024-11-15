import LoginForm from "@/components/LoginForm/LoginForm";
import Link from "next/link";
import Image from "next/image";

const Login = () => {
    return (
        <div className="min-h-[90vh] flex flex-col">
            <div className="flex-grow flex">
                <div className="w-1/2 flex flex-col mt-12 mb-12 items-start px-12">
                    <h1 className="text-3xl font-bold mb-6">Login</h1>
                    <LoginForm />
                    <p className="mt-6">
                        Do not have an account yet?
                        <br />
                        <Link href="/register" className="text-tertiary font-bold inline-block ml-0 mt-2">
                            Register now
                        </Link>
                        <span className="ml-2">and enjoy the FullTechno experience</span>
                    </p>
                </div>

                <div className="w-1/2 relative flex justify-center items-center bg-secondary mb-8 rounded-full overflow-hidden">
                    <Image
                        src="/background-slice.jpg"
                        alt="Subscription Offer"
                        layout="fill"
                        className="object-cover rounded-full"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center p-8">
                        <h2 className="text-2xl font-bold mb-4">Subscribe to our newsletter</h2>
                        <p className="mb-6">Sign up now and get a 5% discount on your next purchase!</p>
                        <form className="w-full max-w-sm">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full p-2 mb-4 text-primary rounded-lg"
                                required
                            />
                            <button
                                type="submit"
                                className="w-full py-2 rounded-lg"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;




