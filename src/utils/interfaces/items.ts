export interface ReduxUser {
	name: string;
	email: string;
	id: string;
	picture?: string;
}

export interface UserCredentials {
	email: string;
	password: string;
	name?: string;
}
