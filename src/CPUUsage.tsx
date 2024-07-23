import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

interface CpuUsageData {
	name: string;
	value: number;
}

interface CpuInfo {
	processors: {
		usage: {
			user: number;
			kernel: number;
			idle: number;
			total: number;
		};
	}[];
}

const CpuUsageChart: React.FC<{ cpuInfo: CpuInfo | null }> = ({ cpuInfo }) => {
	if (!cpuInfo) {
		return <div>Loading...</div>;
	}

	// Aggregate CPU usage data from all processors
	const totalUsage = cpuInfo.processors.reduce(
		(acc, processor) => {
			acc.user += processor.usage.user;
			acc.kernel += processor.usage.kernel;
			acc.idle += processor.usage.idle;
			// acc.total += processor.usage.total;
			return acc;
		},
		{ user: 0, kernel: 0, idle: 0, total: 0 }
	);

	const data: CpuUsageData[] = [
		{ name: "User", value: totalUsage.user },
		{ name: "Kernel", value: totalUsage.kernel },
		{ name: "Idle", value: totalUsage.idle },
		// { name: "Total", value: totalUsage.total },
	];

	return (
		<div className="text-center">
			<h2 className="text-xl font-semibold">CPU Usage</h2>
			<PieChart width={400} height={400}>
				<Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={150} fill="#8884d8" label>
					{data.map((_, index) => (
						<Cell key={`cell-${index}`} fill={["#ff7300", "#387908", "#0033ff"][index]} />
					))}
				</Pie>
				<Tooltip
					formatter={(value: number) => `${Math.round((value / data.reduce((acc, d) => acc + d.value, 0)) * 100)}%`}
				/>
			</PieChart>
		</div>
	);
};

export default CpuUsageChart;
