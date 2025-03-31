import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilSettings,
  cilSpeedometer,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  // SAISIES
  {
    component: CNavTitle,
    name: 'saisies',
  },


  {
    component: CNavGroup,
    name: 'Journalier',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Saisie RJE',
        to: '/saisie/rje',
      }, {
        component: CNavItem,
        name: 'Données RJE saisie',
        to: '/saisie/donnees-rje',
      },
    ],
  },

  // SAISIES
  {
    component: CNavTitle,
    name: 'rapports',
  },
  {
    component: CNavGroup,
    name: 'Performances',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Rapport RJE',
        to: '/rapport/rapport-rje',
      },
      {
        component: CNavItem,
        name: 'Unité Physique',
        to: '/rapport/unite-physique',
      }, {
        component: CNavItem,
        name: 'Etat Mensuel',
        to: '/rapport/etat-mensuel',
      }, {
        component: CNavItem,
        name: 'Indispo',
        to: '/rapport/rapport-indispo',
      }, {
        component: CNavItem,
        name: 'Heures Chassis',
        to: '/rapport/heure-schassis',
      }, {
        component: CNavItem,
        name: 'Spéc Lub',
        to: '/rapport/rapport-speclub',
      }, {
        component: CNavItem,
        name: 'Paretos indispo',
        to: '/rapport/pareto-indispo',
      },
    ],
  },


  // Configurations
  {
    component: CNavTitle,
    name: 'Configurations',
  },
  // 
  // 
  {
    component: CNavGroup,
    name: 'Données de base',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Sites',
        to: '/configs/sites',
      }, {
        component: CNavItem,
        name: 'Typeparcs',
        to: '/configs/typeparcs',
      }, {
        component: CNavItem,
        name: 'Parcs',
        to: '/configs/parcs',
      }, , {
        component: CNavItem,
        name: 'Engins',
        to: '/configs/engins',
      }, {
        component: CNavItem,
        name: 'Typepannes',
        to: '/configs/typepannes',
      }, {
        component: CNavItem,
        name: 'Pannes',
        to: '/configs/pannes',
      }, {
        component: CNavItem,
        name: 'Types des lubrifiants',
        to: '/configs/typelubrifiants',
      }, {
        component: CNavItem,
        name: 'Lubrifiants',
        to: '/configs/lubrifiants',
      }, {
        component: CNavItem,
        name: 'Utilisateurs',
        to: '/configs/users',
      },
    ],
  },
]

export default _nav
