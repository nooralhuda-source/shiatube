import VideoCard from './VideoCard'

export default function VideoList({ videos }) {
  if (!videos || videos.length === 0) {
    return <p className="text-center text-gray-500">No videos found.</p>
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((v) => (
        <VideoCard key={v.id} video={v} />
      ))}
    </div>
  )
}
