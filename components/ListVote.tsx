import { emojis, rings } from "@/lib/constant";
import { IVotes } from "@/lib/types";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Badge } from "./ui/badge";

export default function ListVote({
	votes,
	isExpire,
}: {
	votes: IVotes;
	isExpire?: boolean;
}) {
	return (
		<div className="flex w-full">
			{votes?.map(
				({ title, end_date, users, id, description }, index) => {
					return (
						<Link
							href={"/vote/" + id}
							key={index}
							className="w-full md:w-96"
						>
							<div className="relative group">
								<div className="border border-zinc-600 rounded-md p-5 space-y-3 relative">
									<div className="flex items-center gap-2">
										<Image
											src={users?.avatar_url!}
											alt={users?.user_name!}
											width={40}
											height={40}
											className={`rounded-full`}
										/>
										<div>
											<h1 className=" text-base">
												{users?.user_name}
											</h1>
										</div>
									</div>

									<h1 className="text-2xl font-medium line-clamp-2">
										{title}
									</h1>
									<p>{description}</p>
									{isExpire ? (
										<Badge>Expired</Badge>
									) : (
										<p className="text-sm">
											Until{" "}
											{new Date(end_date).toDateString()}
										</p>
									)}
								</div>
								{/* <div
								className={` -z-10 absolute top-0 right-0 translate-x-3 translate-y-3 w-full h-full ring-1  rounded-md ${ring} ${bg} bg-opacity-10`}
							></div> */}
							</div>
						</Link>
					);
				}
			)}
		</div>
	);
}
