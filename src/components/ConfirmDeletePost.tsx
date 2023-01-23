import { ConfirmDeleteProps } from "../utilities/interface";
import { createClient } from "contentful-management";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ConfirmDeletePost: React.FC<ConfirmDeleteProps> = ({
	confirmDeleteOpen,
	setConfirmDeleteOpen,
	matchingPost,
}) => {
	if (!confirmDeleteOpen) return null;

	const navigate = useNavigate();

	const client = createClient({
		space: "94snklam6irp",
		accessToken: "CFPAT-A6jfpI6MkmfBymBooRWgT4L8Fa-6ng0BLo0hGUmdpuw",
	});

	const postID = matchingPost?.sys.id;
	const creatorID = matchingPost?.post.creator.sys.id;

	const deletePost = () => {
		console.log("delete initiated");

        // Remove post from creator
		client
			.getSpace("94snklam6irp")
			.then((space) => space.getEnvironment("master"))
			.then((environment) => environment.getEntry(creatorID))
			.then((entry) => {
				const posts = entry.fields.posts["en-US"];
				const firstPostIndex = posts.findIndex(
					(post: any) => post.sys.id === postID
				);
				posts.splice(firstPostIndex, 1);
				return entry.update();
			})
			.then((entry) => {
				console.log(
					`Successfully removed post with ID ${postID} from creator ${creatorID}`
				);
				return entry.publish();
			})
			.catch((error) => {
				console.log("Error removing post: ", error);
			});

		// Unpublished entry
		client
			.getSpace("94snklam6irp")
			.then((space) => space.getEnvironment("master"))
			.then((environment) => environment.getEntry(postID))
			.then((entry) => entry.unpublish())
			.then((entry) => console.log(`Entry ${entry.sys.id} unpublished.`))
			.catch(console.error);

		// Delete entry
		client
			.getSpace("94snklam6irp")
			.then((space) => space.getEnvironment("master"))
			.then((environment) => environment.getEntry(postID))
			.then((entry) => entry.delete())
			.then(() => console.log("Entry deleted."))
			.catch(console.error);

		navigate(-1);
		toast("Post successfully deleted.");
	};

	return (
		<div
			data-aos="fade-in"
			data-aos-duration="600"
			data-aos-easing="ease-in-out"
			data-aos-once="true"
		>
			<div className="fixed inset-0 z-1 bg-black bg-opacity-50 flex justify-center items-center z-50">
				<div className="absolute bg-white rounded-lg py-2 px-12 flex flex-col text-center">
					<h3 className=" px-4 py-3">Delete Post?</h3>
					<p className=" px-4 pb-3">
						Are you sure you want to delete this post?
					</p>
					<button
						className=" px-4 py-3 text-red font-semibold"
						onClick={deletePost}
					>
						Delete
					</button>
					<button
						className=" px-4 py-3 text-black"
						onClick={() => setConfirmDeleteOpen(false)}
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
};

export default ConfirmDeletePost;
