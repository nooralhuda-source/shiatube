import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import VideoList from '../components/VideoList'

export default function Shorts() {
  const [videos, setVideos] = useState([])

  useEffect(() => {
    supabase
      .from('videos')
      .select('*')
      .eq('category', 'Shorts')
      .order('inserted_at', { ascending: false })
      .then(({ data }) => setVideos(data))
  }, [])

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Shorts</h1>
      <VideoList videos={videos} />
    </>
  )
}
