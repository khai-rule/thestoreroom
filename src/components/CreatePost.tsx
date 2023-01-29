import { CreatePostModalProps } from "../utilities/interface";
import { useState } from "react";
import CreatePostForm from "./CreatePostForm";
import Carousel from "./Carousel";
import { ChangeEvent } from "react";
import { createClient } from "contentful-management";
import { File } from "../utilities/interface";
import { useRef } from "react";
import { FormSubmit } from "../utilities/interface";
import Loading from "./Loading";

const CreatePost: React.FC<CreatePostModalProps> = ({
	closeModal,
	setCreate,
}) => {
	const formRef: FormSubmit = useRef(null!);
	const [status, setStatus] = useState<string>("idle");


	const [imageFiles, setImageFiles] = useState<File[]>([]);
	const [imagePreview, setImagePreview] = useState<string[]>([]);

	const handleImageChange = (event: ChangeEvent<HTMLInputElement>): void => {
		const files = event.target.files;
		const previews = [];
		for (let i = 0; i < files!.length; i++) {
			previews.push(URL.createObjectURL(files![i]));
		}
		setImageFiles([...imageFiles, ...files!]);
		setImagePreview([...imagePreview, ...previews]);
	};

	const goBack = () => {
		//TODO confirm message
		setImageFiles([]);
		setImagePreview([]);
	};
	//TODO check if form is completed  otherwise, don't publish image

	const handleUpload = async () => {
		try {
			const MClient = createClient({
				accessToken: "CFPAT-A6jfpI6MkmfBymBooRWgT4L8Fa-6ng0BLo0hGUmdpuw",
			});
			const space = await MClient.getSpace("94snklam6irp");
			const environment = await space.getEnvironment("master");
			setStatus("loading");

			//! Create Image Asset in Contentful
			const uploadPromises = imageFiles.map(async (file: any | File) => {
				console.log("uploading process initiated")
				const contentType = file.type;
				const fileName = file.name;
				let asset = await environment.createAssetFromFiles({
					fields: {
						description: {
							"en-US": fileName,
						},
						title: {
							"en-US": fileName,
						},
						file: {
							"en-US": {
								contentType,
								fileName,
								file,
							},
						},
					},
				});
				asset = await asset.processForAllLocales();
				asset.publish();
				return asset;
			});

			const assets = await Promise.all(uploadPromises);
			const sanitisedSys = assets.map((asset) => {
				return {
					sys: {
						type: "Link",
						linkType: "Asset",
						id: asset.sys.id,
					},
				};
			});
			console.log("Images successfuly uploaded");
			formRef.current(sanitisedSys);
		} catch (error) {
			setStatus("idle");
			console.log(error);
		}
	};

	return (
		<div className="fixed h-screen w-screen inset-0 z-50 bg-black bg-opacity-50 md:overflow-auto text-white">
			<button
				className="absolute right-6 top-6 hover:underline"
				onClick={closeModal}
			>
				Close
			</button>

			{imageFiles.length !== 0 ? (
				<></>
			) : (
				<div className="z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 m-0 w-8/12 h-4/6 bg-primary grid grid-flow-col rounded-3xl">
					<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
						<input
							className="m-2"
							type="file"
							multiple
							onChange={handleImageChange}
							accept="image/*"
						/>
						<p
							className="mt-1 text-sm text-gray-500 dark:text-gray-300"
							id="file_input_help"
						>
							JPG or PNG (MAX. 15 images | 20MB).
						</p>
					</div>
				</div>
			)}

			{/* If there is image */}

			{imageFiles.length !== 0 ? (
				<div className="relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 m-0">
					<div className="relative grid-item bg-white w-8/12 left-1/2 -translate-x-1/2 rounded-t-3xl">
						<div className="flex justify-between">
							<h4
								className="py-2 mx-5 text-black cursor-pointer"
								onClick={goBack}
							>
								Back
							</h4>
							<h4 className="text-black py-2 mx-5 font-semibold">
								Create New Post
							</h4>
							{status === "loading" ? (
								<div
									className="spinner-border animate-spin inline-block w-6 h-6 border-3 rounded-full text-black mx-8 mt-2"
									role="status"
								>
									<span className="visually-hidden">Loading...</span>
								</div>
							) : (
								<h4
									onClick={handleUpload}
									className="py-2 mx-5 text-primary font-semibold cursor-pointer"
								>
									Share
								</h4>
							)}
						</div>
					</div>
					<div className="flex align-middle justify-center">
						<div className="relative grid-item bg-white w-5/12 aspect-square rounded-bl-3xl object-contain">
							<Carousel imagePreviews={imagePreview} />
						</div>

						<CreatePostForm
							imageFiles={imageFiles}
							formRef={formRef}
							setStatus={setStatus}
							setCreate={setCreate}
						/>
					</div>
				</div>
			) : (
				<></>
			)}
		</div>
	);
};

export default CreatePost;
