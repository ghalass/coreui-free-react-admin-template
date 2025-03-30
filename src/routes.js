import React from 'react'
const Home = React.lazy(() => import('./views/home/Home'))
const Sites = React.lazy(() => import('./views/configs/Sites'))
const Typeparcs = React.lazy(() => import('./views/configs/Typeparcs'))
const Parcs = React.lazy(() => import('./views/configs/Parcs'))
const Engins = React.lazy(() => import('./views/configs/Engins'))
const Typelubrifiants = React.lazy(() => import('./views/configs/Typelubrifiants'))
const Lubrifiants = React.lazy(() => import('./views/configs/Lubrifiants'))
// 
const SaisieRje = React.lazy(() => import('./views/saisies/SaisieRje'))
const SaisieRjeDonnees = React.lazy(() => import('./views/saisies/SaisieRjeDonnees'))
const EtatMensuel = React.lazy(() => import('./views/rapports_performances/EtatMensuel'))
const HeuresChassis = React.lazy(() => import('./views/rapports_performances/HeuresChassis'))
const ParetosInDispo = React.lazy(() => import('./views/rapports_performances/ParetosInDispo'))
const RapportIndispo = React.lazy(() => import('./views/rapports_performances/RapportIndispo'))
const RapportRje = React.lazy(() => import('./views/rapports_performances/RapportRje'))
const RapportSpecLub = React.lazy(() => import('./views/rapports_performances/RapportSpecLub'))
const UnitePhysique = React.lazy(() => import('./views/rapports_performances/UnitePhysique'))
const Profile = React.lazy(() => import('./views/pages/user/Profile'))

const routes = [
  { path: '/', name: 'Home', element: Home },

  { path: '/user/profile', name: 'Profile', element: Profile },

  { path: '/configs/sites', name: 'Sites', element: Sites },
  { path: '/configs/typeparcs', name: 'Typeparcs', element: Typeparcs },
  { path: '/configs/parcs', name: 'Parcs', element: Parcs },
  { path: '/configs/engins', name: 'Engins', element: Engins },
  { path: '/configs/typelubrifiants', name: 'Typelubrifiants', element: Typelubrifiants },
  { path: '/configs/lubrifiants', name: 'lubrifiants', element: Lubrifiants },

  { path: '/saisie/rje', name: 'SaisieRje', element: SaisieRje },
  { path: '/saisie/donnees-rje', name: 'Données RJE saisie', element: SaisieRjeDonnees },

  { path: '/rapport/rapport-rje', name: 'Rapport RJE', element: RapportRje },
  { path: '/rapport/unite-physique', name: 'Unité Physique', element: UnitePhysique },
  { path: '/rapport/etat-mensuel', name: 'Etat Mensuel', element: EtatMensuel },
  { path: '/rapport/rapport-indispo', name: 'Indispo', element: RapportIndispo },
  { path: '/rapport/heure-schassis', name: 'Heures Chassis', element: HeuresChassis },
  { path: '/rapport/rapport-speclub', name: 'Spéc Lub', element: RapportSpecLub },
  { path: '/rapport/pareto-indispo', name: 'Paretos indispo', element: ParetosInDispo },

]

export default routes
