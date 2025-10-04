import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import VideoList from '../components/VideoList'

export default function LongForm() {
  const [videos, setVideos] = useState([])

  useEffect(() => {
    supabase
      .from('videos')
      .select('*')
      .eq('category', 'Long-Form')
      .order('inserted_at', { ascending: false })
      .then(({ data }) => setVideos(data))
  }, [])

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Long-Form</h1>
      <VideoList videos={videos} />
    </>
  )
}
