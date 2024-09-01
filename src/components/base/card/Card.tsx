import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import readingTime from 'reading-time';

import CardContainer from './CardContainer';
import CardHeader from './CardHeader';
import CardCategory from './CardCategory'; // Fixed import from CardHeader
import CardReadingTime from './CardReadingTime';
import CardTitle from './CardTitle';
import CardDescription from './CardDescription';

const Card = ({
	blog,
}: {
	blog: {
		title: string;
		number: number;
		labels: {
			nodes: {
				id: string;
				name: string;
			}[];
		};
		body: string;
		bodyText: string;
	};
}) => {
	const [labels, setLabels] = useState<
		{
			id: string;
			name: string;
		}[]
	>([]);
	const navigate = useNavigate(); // Updated to useNavigate

	useEffect(() => {
		// Filter out labels with the name 'blog'
		const filteredLabels: {
			id: string;
			name: string;
		}[] = blog.labels.nodes.filter((value) => value.name !== 'blog');
		setLabels(filteredLabels);
	}, [blog.labels.nodes]);

	const openBlog = () => {
		navigate(`/${blog.title}/${blog.number}`); // Updated to use navigate
	};

	return (
		<CardContainer>
			<CardHeader>
				{labels.map((label) => (
					<CardCategory
						key={label.id}
						color={label.name}
						name={label.name}
						id={label.id}
					/>
				))}
				<CardReadingTime time={readingTime(blog.body).minutes} />
			</CardHeader>
			<div onClick={openBlog}>
				<CardTitle>{blog.title}</CardTitle>
				<CardDescription>{blog.bodyText}</CardDescription>
			</div>
		</CardContainer>
	);
};

export default Card;
