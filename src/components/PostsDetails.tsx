import { PostsGalleryProps } from "../utilities/interface";
import { commentsSchema } from "../utilities/YUPvalidations";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CommentsForm } from "../utilities/interface";
import { Comments } from "../utilities/interface";
import { useState } from "react";
import PostsDetailsMoreOptions from "./PostsDetailsMoreOptions";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Slide } from "react-toastify";
import { useStytchSession } from "@stytch/react";
import ConfirmDeletePost from "./ConfirmDeletePost";

const PostsDetails: React.FC<PostsGalleryProps> = ({ matchingPost }) => {
	const postsDetails = () => {
		const navigate = useNavigate();
		const { session } = useStytchSession();
		const [isOpen, setOpen] = useState<boolean>(false);
		const [confirmDeleteOpen, setConfirmDeleteOpen] = useState<boolean>(false);

		if (matchingPost) {
			
			const { caption, creator, title, comments } = matchingPost?.post;
			const { firstName, artistName, lastName, email } = creator?.fields;
			const name = `${firstName} "${artistName}" ${lastName}`;


			const displayComments = comments?.map((comment: Comments) => {
				const theComment = comment.fields.comment;
				const commenterID = comment.fields.creator.sys.id
				const {
					firstName,
					artistName,
					lastName,
				} = comment.fields.creator.fields;
				const theCommenter = `${firstName} "${artistName}" ${lastName}`;

				const viewCommenterProfile = () => {
					navigate(`/profile/${commenterID}`)
				}
				return (
					<p className="my-3">
						<p className="my-2 font-semibold cursor-pointer" onClick={viewCommenterProfile}>{theCommenter}</p>
						{theComment}
					</p>
				);
			});

			const {
				register,
				handleSubmit,
				formState: { errors },
			} = useForm<CommentsForm>({
				resolver: yupResolver(commentsSchema),
			});

			const onSubmit = (data: CommentsForm) => {
				console.log(data);
			};

			const moreOptionsIcon = (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.8"
					stroke="currentColor"
					className="w-6 h-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
					/>
				</svg>
			);

			const viewProfile = () => {
				const creatorID = matchingPost.post.creator.sys.id;
				navigate(`/profile/${creatorID}`);
			};

			const linkCopiedToastify = () => {
				toast("Link copied to clipboard")
			}

			return (
				<div className="mx-12 flex flex-col justify-between">
					<div>
						<p
							className="cursor-pointer text-primary font-semibold"
							onClick={viewProfile}
						>
							{name}
						</p>
						<div className="flex justify-between items-center">
							<h2>{title}</h2>
							<button onClick={() => setOpen(true)}>{moreOptionsIcon}</button>
						</div>
						<p className="my-4 w-128">{caption}</p>
						<hr className="my-8 w-128 border-black" />
						{displayComments}
					</div>

					<PostsDetailsMoreOptions isOpen={isOpen} setOpen={setOpen} linkCopiedToastify={linkCopiedToastify} matchingPost={matchingPost} setConfirmDeleteOpen={setConfirmDeleteOpen} />
					<ConfirmDeletePost confirmDeleteOpen={confirmDeleteOpen} setConfirmDeleteOpen={setConfirmDeleteOpen} matchingPost={matchingPost}/>

					{session ? <div>
						<form
							className="border-b border-gray-300 flex justify-between"
							onSubmit={handleSubmit(onSubmit)}
						>
							<input
								className="text-sm p-2 w-11/12 outline-none"
								{...register("comment")}
								placeholder="Add a comment"
							/>
							<input
								className="cursor-pointer p-2 "
								type="submit"
								value="Post"
							/>
						</form>
						<p className="relative top-4">{errors.comment?.message}</p>
					</div> : <></>}
				</div>
			);
		}
	};

	return <>{postsDetails()}</>;
};

export default PostsDetails;
