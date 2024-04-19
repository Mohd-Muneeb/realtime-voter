import React from "react";
import {
	GitHubLogoIcon,
	Link1Icon,
	LinkedInLogoIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
export default function Footer() {
	return (
		<footer className=" border-t-[0.5px] py-10 flex items-center justify-center flex-col gap-5">
			<div className="flex items-center gap-2">
				<Link href="https://github.com/Mohd-Muneeb" target="_blank">
					<GitHubLogoIcon className="w-5 h-5 " />
				</Link>
				<Link
					href="https://www.linkedin.com/in/mohdmuneeb"
					target="_blank"
				>
					<LinkedInLogoIcon className="w-5 h-5" />
				</Link>
				<Link href="https://mohdmuneeb.netlify.app" target="_blank">
					<Link1Icon className="w-5 h-5 " />
				</Link>
			</div>
		</footer>
	);
}
