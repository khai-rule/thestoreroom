export interface Creator {
	creator: {
		email: string;
	};
}

export interface CreatePostModalProps {
	closeModal: () => void;
	setCreate: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface CreatePostForms {
	title: string;
	caption: string;
	tags: string[];
}

export interface ImageFilesProps {
	imageFiles: File[];
	formRef: {
		current: () => void;
	};
	setStatus: React.Dispatch<React.SetStateAction<string>>;
	setCreate: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ImageFields {
	fields: {
		title: string;
		file: {
			url: string;
		};
	};
}

export interface ImagePreviewsProps {
	imagePreviews: string[];
}

export interface HomeFeedProps {
	posts: Record<string, any>[];
	display: string;
	setDisplay: React.Dispatch<React.SetStateAction<string>>;
}

export interface HomeDisplayProps {
	display: string;
	setDisplay: React.Dispatch<React.SetStateAction<string>>;
}

export interface PostsGalleryProps {
	matchingPost: string | any;
	code: string | undefined;
}

export interface Image {
	sys: {
		id: string;
	};
}

export interface allImage {
	sys: {
		id: string;
	};
	fields: {
		file: {
			url: string;
		};
	};
}

export interface CommentsForm {
	comment: string;
}

export interface Comments {
	fields: {
		comment: string;
		creator: {
			sys: {
				id: string;
			};
			fields: {
				firstName: string;
				artistName: string;
				lastName: string;
			};
		};
	};
}

export interface File {
	//TODO
}

export interface Post {
	fields: {
		title: string;
		caption: string;
		images: [];
	};
}

export interface ProfilePostsProps {
	matchingCreator: {
		creator: {
			posts: [];
		};
		sys: object;
	};
}

export interface ProfileHeadProps {
	matchingCreator: {
		creator: {
			email: string;
			firstName: string;
			artistName: string;
			lastName: string;
			title: string;
			bio: string;
			website: string;
			instagram: string;
		};
	};
}

export interface UseRef {
	current: HTMLElement | null;
}

export interface MoreOptionsProps {
	isOpen: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	linkCopiedToastify: () => void;
	setConfirmDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>;
	matchingPost: {
		post: {
			creator: {
				sys: {
					id: string;
				};
			};
		};
	};
}

export interface FormSubmit {
	current: (arg?: any) => void;
}

export interface ConfirmDeleteProps {
	confirmDeleteOpen: boolean;
	setConfirmDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>;
	matchingPost: {
		post: {
			creator: {
				sys: {
					id: string;
				};
			};
		};
		sys: {
			id: string;
		};
	};
}

export interface ProfileForm {
	input: string;
	firstName: string;
	lastName: string;
	artistName: string;
	email: string;
	bio: string;
	title: string;
	website: string;
	instagram: string;
}
