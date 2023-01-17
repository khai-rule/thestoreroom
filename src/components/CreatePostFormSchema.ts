import * as yup from "yup";

export const CreatePostFormSchema = yup
	.object({
		title: yup
			.string()
			.max(30, "Title cannot be more than 30 characters")
			.required("Title is required"),
		caption: yup
			.string()
			.max(500, "Caption cannot be more than 500 characters"),
		tags: yup
			.array()
			.of(
				yup
					.string()
					.oneOf(["outdoor", "indoor", "still life"])
					.required("Select at least one tag")
			),
	})
	.required();
