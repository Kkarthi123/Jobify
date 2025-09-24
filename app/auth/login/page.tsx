"use client"
import Authentication from "@/components/Authentication";
import { AuthData } from "@/types";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Auth } from "@/config/firebase";
import { useRouter } from "next/navigation";
import { useJobstore } from "@/store/jobStore";

export default function LoginPage() {
    const router = useRouter();
    const setUser = useJobstore((state) => state.setUser);
    const handleSubmit = async (formData: AuthData) => {
        try {
            const userCredential = await signInWithEmailAndPassword(Auth, formData.email, formData.password);
            setUser({userId: userCredential.user.uid, email: userCredential.user.email});
            router.push('/job/jobs');
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <Authentication mode="login" onSubmit={handleSubmit} />
    );
}