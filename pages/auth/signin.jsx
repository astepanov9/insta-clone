import { getProviders, signIn } from "next-auth/react"
import Image from "next/image"
import React from "react"

import authImg from '../../assets/auth.png'
import logo from '../../assets/logo.png'
import google from '../../assets/google.png'
import Footer from '../../components/Footer'
import Preloader from "../../components/Preloader"

export default function SignIn({ providers }) {
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        setLoading(false);
    }, []);

    if (loading) {
        return <Preloader />;
    }

    return (
        <div className="flex max-w-[790px] mt-[110px] mx-auto lg:max-w-[854px] justify-center">
            <div className="max-w-[440px] mx-auto w-[100vw] hidden lg:block">
                <Image src={authImg} />
            </div>
            <div className="max-w-[350px] w-full mx-8 sticky top-0">
                <div className="border p-3 bg-white">
                    <div className="my-5 text-center">
                        <Image src={logo} width={175} height={50} className="mx-auto" />
                    </div>
                    <div className="mb-4">
                        <form action="">
                            <div className="flex flex-col">
                                <input type="text" placeholder="Phone number, username or email" className="border p-3 outline-none w-full max-w-[250px] text-xs bg-[#fafafa] rounded-sm mb-2 mx-auto" />
                                <input type="text" placeholder="Password" className="border p-3 outline-none w-full max-w-[250px] text-xs bg-[#fafafa] rounded-sm mb-4 mx-auto" />
                                <label className="ml-9 mb-4 text-xs">
                                    <input type="checkbox" className="mr-2" />
                                    Save login info
                                </label>
                                <input type="submit" value="Log in" className="text-white text-sm font-bold bg-[#4DB5F9] p-1 rounded-md max-w-[250px] mx-auto w-full cursor-pointer" />
                            </div>
                        </form>
                    </div>
                    <div className="flex items-center justify-center max-w-[250px] mx-auto mb-4 w-full">
                        <span className="w-[100px] h-[1px] bg-[#dbdbdb]"></span>
                        <p className="text-[#8e8e9d] font-bold mx-4 uppercase text-xs">or</p>
                        <span className="w-[100px] h-[1px] bg-[#dbdbdb]"></span>
                    </div>
                    <div className="">
                        {Object.values(providers).map((provider) => (
                            <div key={provider.name} className="flex items-center justify-center">
                                <Image src={google} width={16} height={16} alt="google" className="mr-2" />
                                <button className="text-[#385189] font-semibold text-sm" onClick={() => signIn(provider.id, { callbackUrl: '/' })}>
                                    Log in with {provider.name}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="text-center">
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    const providers = await getProviders()
    return {
        props: { providers },
    }
}