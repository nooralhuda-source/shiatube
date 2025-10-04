import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function VideoPage() {
  const { id } = useRouter().query
  const [video, setVideo] = useState(null)

  useEffect(() => {
    if (!id) return
    supabase
      .from('videos')
      .select('*')
      .eq('id', id)
      .single()
      .then(({ data }) => setVideo(data))
  }, [id])

  if (!video) return <p>Loading…</p>

  return (
    <>
      <iframe
        className="w-full aspect-video mb-6"
        src={`https://www.youtube.com/embed/${video.youtube_id}`}
        allowFullScreen
      />
      <h1 className="text-3xl font-bold">{video.title}</h1>
      <p className="text-gray-700 mt-2">{video.description}</p>
    </>
  )
}
