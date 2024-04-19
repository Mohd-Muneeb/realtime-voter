import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import createSupabaseServer from "@/lib/supabase/server";
import { Session, User } from "@supabase/supabase-js";

const makeUserInDB = async (user: User | null) => {
	if (!user) return;

	const supabase = await createSupabaseServer();

	await supabase
		.from("users")
		.insert({
			id: user.id,
			user_name: user?.user_metadata?.full_name ?? "",
			avatar_url: user?.user_metadata?.avatar_url ?? "",
		})
		.then(({ error, data }) => console.log("New user made", data, error));
};

export async function GET(request: Request) {
	const requestUrl = new URL(request.url);
	const isAuth = cookies().get("supabase-auth-token");

	if (isAuth) {
		return NextResponse.redirect(requestUrl.origin);
	}

	const { searchParams } = new URL(request.url);
	const code = searchParams.get("code");
	const next = searchParams.get("next") ?? "/";

	if (code) {
		const cookieStore = cookies();
		const supabase = createServerClient(
			process.env.NEXT_PUBLIC_SUPABASE_URL!,
			process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
			{
				cookies: {
					get(name: string) {
						return cookieStore.get(name)?.value;
					},
					set(name: string, value: string, options: CookieOptions) {
						cookieStore.set({ name, value, ...options });
					},
					remove(name: string, options: CookieOptions) {
						cookieStore.set({ name, value: "", ...options });
					},
				},
			}
		);

		const { error, data } = await supabase.auth.exchangeCodeForSession(
			code
		);

		await makeUserInDB(data.user);

		if (!error) {
			return NextResponse.redirect(requestUrl.origin + next);
		}
	} else {
		console.log("no code?");
	}

	// return the user to an error page with instructions
	return NextResponse.redirect(requestUrl.origin + "/auth/error");
}
