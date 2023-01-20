import { PostsGalleryProps } from "../utilities/interface";
import { commentsSchema } from "../utilities/YUPvalidations";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CommentsForm } from "../utilities/interface";

const PostsDetails: React.FC<PostsGalleryProps> = ({ matchingPost, code }) => {
	const postsDetails = () => {
		if (matchingPost) {
			const { caption, creator, title, comments } = matchingPost?.post;
			const { firstName, artistName, lastName, email } = creator?.fields;
			const name = `${firstName} "${artistName}" ${lastName}`;

			const displayComments = comments?.map((comment: string) => {
				const theComment = comment.fields.comment;
				const {
					firstName,
					artistName,
					lastName,
				} = comment.fields.creator.fields;
				const theCommenter = `${firstName} "${artistName}" ${lastName}`;
				return (
					<p className="my-3">
						<p className="my-2 font-semibold">{theCommenter} </p>
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

			return (
				<div className="mx-12 flex flex-col justify-between">
					<div>
						<p className="cursor-pointer text-primary font-semibold">{name}</p>
						<div className="flex justify-between items-center">
							<h2>{title}</h2>
							<p>options</p>
						</div>
						<p className="my-4">{caption}</p>
						<hr className="my-8 w-128 border-black" />
						{displayComments}
					</div>

					<div>
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
					</div>
				</div>
			);
		}
	};

	return <>{postsDetails()}</>;
};

export default PostsDetails;
