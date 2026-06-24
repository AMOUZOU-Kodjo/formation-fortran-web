import { Helmet } from 'react-helmet-async'
import { useState, useEffect } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

export default function Profile() {
  const { user } = useAuth()
  const [displayName, setDisplayName] = useState(user?.user_metadata?.display_name || '')
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (!user || !isSupabaseConfigured()) return
    supabase.from('profiles').select('display_name, avatar_url').eq('id', user.id).single()
      .then(({ data }) => {
        if (data?.display_name) setDisplayName(data.display_name)
      })
  }, [user])

  const updateProfile = async () => {
    if (!user || !isSupabaseConfigured()) return
    await supabase.from('profiles').upsert({ id: user.id, display_name: displayName, email: user.email })
  }

  const uploadAvatar = async (e) => {
    const file = e.target.files?.[0]
    if (!file || !user) return
    setUploading(true)
    const { error: uploadErr } = await supabase.storage.from('avatars').upload(`${user.id}/${file.name}`, file, { upsert: true })
    if (!uploadErr) {
      const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(`${user.id}/${file.name}`)
      await supabase.from('profiles').update({ avatar_url: publicUrl }).eq('id', user.id)
    }
    setUploading(false)
  }

  return (<>
    <Helmet><title>Profil | Formation Fortran 95</title></Helmet>
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">👤 Mon profil</h1>
      <div className="card bg-base-200 border border-base-300">
        <div className="card-body p-6 space-y-4">
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-purple-600 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-2">
              {displayName?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase()}
            </div>
            <label className="btn btn-ghost btn-xs cursor-pointer">
              {uploading ? 'Upload...' : 'Changer la photo'}
              <input type="file" className="hidden" accept="image/*" onChange={uploadAvatar} />
            </label>
          </div>
          <label className="floating-label"><span>Nom d'affichage</span><input type="text" className="input input-bordered w-full" value={displayName} onChange={e => setDisplayName(e.target.value)} /></label>
          <div className="text-sm text-base-content/40">Email : {user?.email}</div>
          <button onClick={updateProfile} className="btn btn-primary w-full">Enregistrer</button>
        </div>
      </div>
    </div>
  </>)
}
