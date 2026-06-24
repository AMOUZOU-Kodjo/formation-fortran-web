import { Helmet } from 'react-helmet-async'
import { MODULES, PARTS } from '../../data/modules'
import { Link } from 'react-router-dom'

export default function AdminCourses() {
  return (<>
    <Helmet><title>Modules | Admin Fortran</title></Helmet>
    <div className="max-w-4xl mx-auto">
      <Link to="/admin" className="link link-primary text-sm no-underline">← Administration</Link>
      <h1 className="text-2xl font-bold mt-2 mb-6">📚 Modules</h1>
      {PARTS.map(part => (
        <div key={part.id} className="mb-6">
          <h2 className="font-bold mb-2" style={{ color: part.color }}>Partie {part.id} : {part.title}</h2>
          <div className="overflow-x-auto">
            <table className="table table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Titre</th>
                  <th>Durée</th>
                </tr>
              </thead>
              <tbody>
                {MODULES.filter(m => m.part === part.id).map(m => (
                  <tr key={m.id}>
                    <td className="font-mono text-xs">{m.id}</td>
                    <td>{m.title}</td>
                    <td>{m.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  </>)
}
