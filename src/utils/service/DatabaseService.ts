import { doc, setDoc, collection, addDoc, getDoc, getDocs, query, where } from "firebase/firestore";
import { User } from "firebase/auth";
import { db } from "../../firebase/Firebase";

class DatabaseService {
	private db;

	constructor() {
		this.db = db;
	}

	/** Save user details in Firestore after authentication */
	async saveUserToDB(user: User, name: string): Promise<void> {
		try {
			const userRef = doc(this.db, "users", user.uid);
			await setDoc(userRef, {
				id: user.uid,
				name: name,
				email: user.email,
				photoURL: user.photoURL || "",
				groups: [], // Initially, no groups
			});
		} catch (error) {
			console.error("Error saving user to database:", error);
		}
	}

	/** Create a new group and add the user to it */
	async createGroup(groupName: string, userId: string): Promise<string | undefined> {
		try {
			const groupRef = await addDoc(collection(this.db, "groups"), {
				name: groupName,
				members: [userId],
			});

			// Update user document to include this group
			const userRef = doc(this.db, "users", userId);
			const userDoc = await getDoc(userRef);
			if (userDoc.exists()) {
				const userData = userDoc.data();
				await setDoc(userRef, {
					...userData,
					groups: [...userData.groups, groupRef.id],
				});
			}

			return groupRef.id;
		} catch (error) {
			console.error("Error creating group:", error);
		}
	}

	/** Add a user to an existing group */
	async joinGroup(groupId: string, userId: string): Promise<void> {
		try {
			const groupRef = doc(this.db, "groups", groupId);
			const groupDoc = await getDoc(groupRef);

			if (groupDoc.exists()) {
				const groupData = groupDoc.data();
				await setDoc(groupRef, {
					...groupData,
					members: [...groupData.members, userId],
				});

				// Update user document to include this group
				const userRef = doc(this.db, "users", userId);
				const userDoc = await getDoc(userRef);
				if (userDoc.exists()) {
					const userData = userDoc.data();
					await setDoc(userRef, {
						...userData,
						groups: [...userData.groups, groupId],
					});
				}
			} else {
				console.error("Group not found");
			}
		} catch (error) {
			console.error("Error joining group:", error);
		}
	}

	/** Add an expense to a group */
	async addExpense(groupId: string, userId: string, amount: number, category: string, description: string): Promise<void> {
		try {
			await addDoc(collection(this.db, "expenses"), {
				groupId,
				userId,
				amount,
				category,
				description,
				date: new Date().toISOString(),
			});
		} catch (error) {
			console.error("Error adding expense:", error);
		}
	}

	/** Get expenses for a specific group */
	async getExpenses(groupId: string) {
		try {
			const q = query(collection(this.db, "expenses"), where("groupId", "==", groupId));
			const querySnapshot = await getDocs(q);
			return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
		} catch (error) {
			console.error("Error fetching expenses:", error);
		}
	}
}

export const databaseService = new DatabaseService();
