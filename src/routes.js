import React from 'react'

const Home = React.lazy(() => import('./pages/home/Home'))
const Sites = React.lazy(() => import('./pages/configs/Sites'))
const Typeparcs = React.lazy(() => import('./pages/configs/Typeparcs'))
const Parcs = React.lazy(() => import('./pages/configs/Parcs'))
const Engins = React.lazy(() => import('./pages/configs/Engins'))
const Typelubrifiants = React.lazy(() => import('./pages/configs/Typelubrifiants'))
const Lubrifiants = React.lazy(() => import('./pages/configs/Lubrifiants'))
const SaisieRje = React.lazy(() => import('./pages/saisies/SaisieRje'))
const SaisieRjeDonnees = React.lazy(() => import('./pages/saisies/SaisieRjeDonnees'))
const EtatMensuel = React.lazy(() => import('./pages/rapports_performances/EtatMensuel'))
const HeuresChassis = React.lazy(() => import('./pages/rapports_performances/HeuresChassis'))
const ParetosInDispo = React.lazy(() => import('./pages/rapports_performances/ParetosInDispo'))
const RapportIndispo = React.lazy(() => import('./pages/rapports_performances/RapportIndispo'))
const RapportRje = React.lazy(() => import('./pages/rapports_performances/RapportRje'))
const RapportSpecLub = React.lazy(() => import('./pages/rapports_performances/RapportSpecLub'))
const UnitePhysique = React.lazy(() => import('./pages/rapports_performances/UnitePhysique'))
const Profile = React.lazy(() => import('./pages/user/Profile'))
const Page404 = React.lazy(() => import('./pages/page404/Page404'))

const routes = [
  { path: '/', name: 'Home', element: Home },
  { path: '/*', name: 'Page404', element: Page404 },

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
