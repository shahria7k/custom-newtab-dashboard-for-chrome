import { useEffect, useState } from "react";
import "./App.css";
import CPUStats from "./CPUStats";
import Tabs from "./Tabs";

function App() {
	return (
		<div className="flex items-center justify-center h-screen bg-gray-100">
			<Aside />
			<Main />
		</div>
	);
}

export default App;

const Aside = () => {
	return (
		<aside className="w-64 bg-gray-800 h-screen">
			<div className="flex items-center justify-center h-16 text-white">
				<h1 className="text-lg">
					<span className="font-bold">Mind</span>
					<span>Quest</span>
				</h1>
			</div>
			<nav className="text-white">
				<ul>
					<li className="p-4 hover:bg-gray-700">Home</li>
					<li className="p-4 hover:bg-gray-700">About</li>
					<li className="p-4 hover:bg-gray-700">Contact</li>
				</ul>
			</nav>
		</aside>
	);
};
const Main = () => {
	return (
		<main className="flex-1 h-screen bg-gray-100 overflow-scroll">
			<div className="p-4">
				<div className="text-center">
					<h1 className="text-4xl font-bold text-gray-800">Welcome Mr. Shahriar</h1>
					<p className="mt-4 text-gray-600">This is a dashboard for you to monitor your system</p>
					<div className="mt-8">
						<CPUStats />
					</div>
					<div className="mt-8">
						<Tabs />
					</div>
					<div className="mt-8">
						<NewsFeed />
					</div>
				</div>
			</div>
		</main>
	);
};

const NewsFeed = () => {
	// get a public feed from an API
	const [feed, setFeed] = useState<any>([]);
	useEffect(() => {
		fetch("https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@codebucks")
			.then((res) => res.json())
			.then((data) => setFeed(data));
	}, []);

	return (
		<div className="grid grid-cols-3 gap-5 grid-rows-subgrid ">
			{feed.items &&
				feed.items.map((item: any, index: number) => (
					<div key={index}>
						<h1 className="text-2xl font-bold text-gray-800">{item.title}</h1>
						<div>
							{/* <p>{item.content}</p> */}
							{
								// this is html content, so we need to use dangerouslySetInnerHTML
								// to render it as html
								<div className="text-left" dangerouslySetInnerHTML={{ __html: item.content }}></div>
							}
						</div>
					</div>
				))}
		</div>
	);
};
