import './Layout.css';

import PostList from '~/components/postList/PostList';
import Profile from '~/components/profile/Profile';
import RecentHeader from '~/components/recent/Header';
import RecentPost from '~/components/recent/Recent';

const Layout = (props: { label: string; title: string }) => {
	return (
		<div className="container">
			<section className="blog-posts">
				<div>
					<PostList label={props.label} />
				</div>
			</section>

			<section className="sidebar">
				<div className="items">
					<RecentHeader title={props.title} />
					<RecentPost />
					<RecentPost />
					<RecentPost />
					<br />
				</div>

				<div className="items">
					<Profile />
				</div>
			</section>
		</div>
	);
};

export default Layout;
