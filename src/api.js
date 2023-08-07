import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

export async function login(email, password) {
    try {
        const oUC = await signInWithEmailAndPassword(getAuth(), email, password)
        return oUC.user;
    }
    catch (err) {
        return err.code;
    }
}

export async function logout() {
    await signOut(getAuth());
}