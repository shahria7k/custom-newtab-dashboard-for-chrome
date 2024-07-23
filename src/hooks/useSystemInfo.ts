import { useState, useEffect } from "react";

interface ProcessorInfo {
	usage: {
		total: number;
		user: number;
		kernel: number;
		idle: number;
	};
}

interface CpuInfo {
	modelName: string;
	numOfProcessors: number;
	archName: string;
	features: string[];
	processors: ProcessorInfo[];
}

interface MemoryInfo {
	availableCapacity: number;
	capacity: number;
}

const useSystemInfo = () => {
	const [cpuInfo, setCpuInfo] = useState<CpuInfo | null>(null);
	const [memoryInfo, setMemoryInfo] = useState<MemoryInfo | null>(null);
	const fetchSystemInfo = async () => {
		chrome.runtime.sendMessage("getSystemInfo", (response: any) => {
			setCpuInfo(response.cpuInfo);
			setMemoryInfo(response.memoryInfo);
		});
	};

	useEffect(() => {
		const interval = setInterval(() => {
			fetchSystemInfo();
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	return { cpuInfo, memoryInfo };
};

export default useSystemInfo;
