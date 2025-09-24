"use client"

import Authentication from "@/components/Authentication";
import { AuthData } from "@/types";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Auth, Database } from "@/config/firebase"; // Ensure db is exported from your firebase config
import { doc, setDoc } from "firebase/firestore";
import { useJobstore } from "@/store/jobStore";

export default function RegisterPage() {
    const router = useRouter();
    const setUser = useJobstore((state) => state.setUser);

    const handleSubmit = async (formData: AuthData) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(
                Auth,
                formData.email,
                formData.password
            );
            await setDoc(doc(Database, "users", userCredential.user.uid), {
                email: formData.email,
                role: formData.role 
            });
            setUser({ userId: userCredential.user.uid, email: userCredential.user.email, role: formData.role });
            router.push("/jobs");
        } catch (error) {
            console.error(error);
        }
    };

    return <Authentication mode="register" onSubmit={handleSubmit} />;
}