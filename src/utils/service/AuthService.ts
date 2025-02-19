import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	updateProfile,
	onAuthStateChanged,
	User,
} from "firebase/auth";
import { auth } from "../../firebase/Firebase";
import { saveUser, setToken } from "../../redux/slices/authSlice";
import { AppDispatch } from "../../redux/store/store";

class AuthService {
	private auth;
	private dispatch;

	constructor(dispatch: AppDispatch) {
		this.auth = auth;
		this.dispatch = dispatch;
	}

	getUser() {
		return this.auth.currentUser;
	}

	async signUp({ email, password, name }: { email: string; password: string; name: string }): Promise<User | undefined> {
		try {
			const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
			const user = userCredential.user;
			await updateProfile(user, { displayName: name });

			this.dispatch(saveUser({ email, name, id: user.uid, picture: user.photoURL || "" }));
			return user;
		} catch (error) {
			console.error("Error signing up:", error);
		}
	}

	async signIn({ email, password }: { email: string; password: string }): Promise<User | undefined> {
		try {
			const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
			const user = userCredential.user;
			this.dispatch(saveUser({ email: user.email || "", name: user.displayName || "", id: user.uid, picture: user.photoURL || "" }));
			return user;
		} catch (error) {
			console.error("Error signing in:", error);
		}
	}

	async logOut() {
		try {
			await signOut(this.auth);
			this.dispatch(saveUser(null));
		} catch (error) {
			console.error("Sign out error:", error);
		}
	}

	async handleAuthStateChange(callback?: () => void): Promise<void> {
		onAuthStateChanged(this.auth, async (user) => {
			if (user) {
				try {
					const { email, displayName, photoURL, uid } = user;
					this.dispatch(
						saveUser({
							email: email || "",
							name: displayName || "",
							picture: photoURL || "",
							id: uid,
						})
					);
					const token = await user.getIdToken();
					this.dispatch(setToken(token));
				} catch (error) {
					console.error("Error during user token retrieval", error);
				}
			} else {
				this.dispatch(saveUser(null));
			}

			if (callback) callback(); // to use loading state to set user when open or refresh app
		});
	}
}

export default AuthService;
