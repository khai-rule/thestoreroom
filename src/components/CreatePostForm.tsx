import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreatePostFormSchema } from "./CreatePostFormSchema";
import { CreatorsContext } from "../App";
import { useContext } from "react";

interface IFormInputs {
	title: string;
	caption: string;
	tags: string[];
}

const CreatePostForm: React.FC = () => {
	const { loggedInCreator } = useContext(CreatorsContext);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormInputs>({
		resolver: yupResolver(CreatePostFormSchema),
	});
	const onSubmit = (data: IFormInputs) => {
		console.log(data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<label htmlFor="title">Title</label>
			<input className="text-black" {...register("title")} />
			<p>{errors.title?.message}</p>

			<label htmlFor="caption">Caption</label>
			<input className="text-black" {...register("caption")} />
			<p>{errors.caption?.message}</p>

			<label htmlFor="tags">Tags</label>
			<div>
				<input value="outdoor" type="checkbox" {...register("tags")} />
				Outdoor
				<input value="indoor" type="checkbox" {...register("tags")} />
				Indoor
				<input value="still life" type="checkbox" {...register("tags")} />
				Still Life
			</div>
			<p>{errors.tags?.message}</p>

			<input type="submit" />
		</form>
	);
};

export default CreatePostForm;
