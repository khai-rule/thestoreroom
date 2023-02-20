import React from "react";
import { MoreOptionsProps } from "../utilities/interface";
import { CreatorsContext } from "../utilities/context";
import { useContext } from "react";
import _ from "lodash";
import { useStytchUser } from "@stytch/react";
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { Action } from "../utilities/interface";
import { fetchContentfulData } from "../actions/fetchContentfulData";
import Loading from "./Loading";

const PostsDetailsMoreOptions: React.FC<MoreOptionsProps> = ({
	linkCopiedToastify,
	matchingPost,
}) => {
	const dispatch = useDispatch();
	const { user } = useStytchUser();

	const contentfulAPI = useSelector((state: any) => state.contentfulData);
	
	if (contentfulAPI.loading === true) return <Loading />;

	const loggedInEmailFromStytch = user?.emails?.[0].email;

	const loggedInCreatorContentful = contentfulAPI?.data?.creator?.find(
					(creator: any) =>
						_.lowerCase(creator.fields.email) ===
						_.lowerCase(loggedInEmailFromStytch)
				);

	const copyURL = () => {
		navigator.clipboard.writeText(window.location.href);
		dispatch({ type: "HIDE_MODAL" })
		linkCopiedToastify();
	};

	// To check if this post belongs to the logged in user. If yes, show more options
	const postCreatorID = matchingPost?.fields.creator.sys.id;
	const loggedInCreatorID = loggedInCreatorContentful?.sys.id;

	return (
		<div
			data-aos="fade-in"
			data-aos-duration="600"
			data-aos-easing="ease-in-out"
			data-aos-once="true"
		>
			<div className="fixed inset-0 z-1 bg-black bg-opacity-50 flex justify-center items-center z-50">
				<div className="absolute bg-white rounded-lg py-2 px-12 flex flex-col">
					{postCreatorID === loggedInCreatorID ? (
						<>
							<button
								className="block px-4 py-3 text-red font-semibold"
								onClick={() => dispatch({ type: "SHOW_MODAL", payload: "CONFIRM_DELETE_MODAL" })}
							>
								Delete
							</button>
							<button className="block px-4 py-3" onClick={() => dispatch({ type: "SHOW_MODAL", payload: "EDIT_POST_MODAL" })}>
								Edit
							</button>
						</>
					) : (
						<></>
					)}
					<button
						className="block px-4 py-3 text-black"
						onClick={() => console.log("Share clicked")}
					>
						Share to...
					</button>
					<button className="block px-4 py-3 text-black" onClick={copyURL}>
						Copy Link
					</button>
					<button
						className="block px-4 py-3 text-black"
						onClick={() => dispatch({ type: "HIDE_MODAL" })}
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
};

export default PostsDetailsMoreOptions;
