// sample:

import { useEffect, useState } from "react";

// {
//     active: false;
//     audible: false;
//     autoDiscardable: true;
//     discarded: false;
//     favIconUrl: "chrome-extension://jlmpjdjjbgclbocgajdjefcidcncaied/icons/action_32.png";
//     groupId: -1;
//     height: 993;
//     highlighted: false;
//     id: 1424550029;
//     incognito: false;
//     index: 0;
//     lastAccessed: 1721771203620.864;
//     mutedInfo: {
//         muted: false;
//     }
//     pinned: false;
//     selected: false;
//     status: "complete";
//     title: "New Tab";
//     url: "chrome://newtab/";
//     width: 1728;
//     windowId: 1424550028;
// }

const Tabs = () => {
	const [allTabs, setAllTabs] = useState<any[]>([]);
	useEffect(() => {
		chrome.tabs.query({}, (tabs: any) => {
			console.log(tabs, "tabs");
			setAllTabs(tabs);
		});
	}, []);
	console.log(allTabs, "allTabs");

	return (
		<div>
			<h2 className="text-2xl font-semibold text-left">Tabs</h2>

			<div className="grid grid-cols-4 gap-5 w-full py-2 text-left">
				{allTabs.map((tab: any) => (
					<div key={tab.id} className="p-4 m-2 bg-gray-200 rounded-md">
						<img src={tab?.favIconUrl} alt="" />
						<h2 className="text-xl font-semibold">{tab.title}</h2>
						<p className="text-gray-600">{tab.url}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default Tabs;
