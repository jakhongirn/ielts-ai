import { LoadingSpinner } from "@/components/LoadingSpinner";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="text-center text-white">
        <LoadingSpinner size={48} className="mb-4" />
        <p className="text-lg font-semibold">Please wait, we are taking feedback from AI...</p>
      </div>
    </div>
    )
  }