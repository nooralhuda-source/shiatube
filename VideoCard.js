import Link from 'next/link'

export default function VideoCard({ video }) {
  return (
    <div className="bg-white shadow rounded overflow-hidden hover:shadow-lg transition">
      <Link href={`/video/${video.id}`}>
        <a>
          <iframe
            className="w-full aspect-video"
            src={`https://www.youtube.com/embed/${video.youtube_id}`}
            allowFullScreen
          />
          <div className="p-3 font-semibold">{video.title}</div>
        </a>
      </Link>
    </div>
  )
}
