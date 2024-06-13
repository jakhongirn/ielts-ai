import { LoadingSpinner } from "@/components/LoadingSpinner";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center  bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="text-center  text-white">
        <div className="flex justify-center w-full">
          <LoadingSpinner size={72} className="mb-4 " />
        </div>
        <p className="text-lg font-semibold">Please wait, we are generating awesome feedback for you...</p>
      </div>
    </div>
    )
}