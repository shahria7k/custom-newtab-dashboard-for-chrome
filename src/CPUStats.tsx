import CpuUsageChart from "./CPUUsage";
import useSystemInfo from "./hooks/useSystemInfo";

function CPUStats() {
	const { cpuInfo, memoryInfo } = useSystemInfo();

	return (
		<div className="mt-8 text-left w-full">
			<h2 className="text-2xl font-semibold">System Information:</h2>
			{cpuInfo && (
				<div className="w-full">
					<h3 className="text-xl font-semibold mt-4">CPU Info:</h3>
					<p>
						<strong>Model Name:</strong> {cpuInfo.modelName}
					</p>
					<p>
						<strong>Number of Processors:</strong> {cpuInfo.numOfProcessors}
					</p>
					<p>
						<strong>Architecture Name:</strong> {cpuInfo.archName}
					</p>
					<p>
						<strong>Features:</strong> {cpuInfo?.features?.join(", ")}
					</p>
					<div className="w-full ">
						<h4 className="text-lg font-semibold mt-2">Processors:</h4>
						<div className="flex w-full">
							<CpuUsageChart cpuInfo={cpuInfo} />
							<div className="grid grid-cols-5 flex-1">
								{cpuInfo.processors.map((processor, index) => (
									<div className="border border-gray-300 p-2" key={index}>
										<p>
											<strong>Processor {index + 1}:</strong>
										</p>
										<p>
											<strong>Total:</strong> {processor.usage.total}
										</p>
										<p>
											<strong>User:</strong> {processor.usage.user}
										</p>
										<p>
											<strong>Kernel:</strong> {processor.usage.kernel}
										</p>
										<p>
											<strong>Idle:</strong> {processor.usage.idle}
										</p>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			)}
			{memoryInfo && (
				<div>
					<h3 className="text-xl font-semibold mt-4">Memory Info:</h3>
					<p>
						<strong>Available Capacity:</strong> {memoryInfo.availableCapacity} bytes
					</p>
					<p>
						<strong>Total Capacity:</strong> {memoryInfo.capacity} bytes
					</p>
				</div>
			)}
		</div>
	);
}

export default CPUStats;
