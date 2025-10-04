import { useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../lib/supabase'

export default function Upload() {
  const [title, setTitle] = useState('')
  const [ytId, setYtId] = useState('')
  const [category, setCategory] = useState('Shorts')
  const [description, setDescription] = useState('')
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const user = supabase.auth.user()
    if (!user) {
      return alert('You must sign in first.')
    }
    await supabase.from('videos').insert([
      { title, youtube_id: ytId, category, description }
    ])
    router.push('/')
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Upload Video</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <input
          className="w-full p-2 border rounded"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          className="w-full p-2 border rounded"
          placeholder="YouTube ID (e.g. dQw4w9WgXcQ)"
          value={ytId}
          onChange={(e) => setYtId(e.target.value)}
          required
        />
        <select
          className="w-full p-2 border rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Shorts</option>
          <option>Latmiyas</option>
          <option>Long-Form</option>
        </select>
        <textarea
          className="w-full p-2 border rounded"
          placeholder="Description"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="px-4 py-2 bg-accent text-white rounded">
          Upload
        </button>
      </form>
    </>
  )
}
