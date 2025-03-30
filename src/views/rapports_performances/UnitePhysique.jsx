import React, { useState } from 'react'
import { fecthSitesQuery } from '../../hooks/useSites'
import { useQuery } from '@tanstack/react-query'
import { generateUnitePhysiqueQueryOptions } from '../../hooks/useRapports'
import {
  CButton,
  CFormInput,
  CSpinner,
  CTable,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'

const UnitePhysique = () => {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 7))

  const getAllSitesQuery = useQuery(fecthSitesQuery())

  const [_, setShouldFetch] = useState(false)

  const generateUnitePhysiqueQuery = useQuery(generateUnitePhysiqueQueryOptions(date))

  const handleClick = () => {
    setShouldFetch(true) // Activer la requête au clic
    generateUnitePhysiqueQuery.refetch() // 🔥 Déclenche la requête au clic
  }
  return (
    <>
      <div className="d-flex justify-content-center align-items-center gap-2 mb-3">
        <div>
          <CButton
            disabled={generateUnitePhysiqueQuery.isFetching}
            onClick={() => exportExcel('tbl_unite_physique', 'Rapport Unité Physique')}
            size="sm"
            color="success"
            variant="outline"
            className="rounded-pill"
          >
            Excel
          </CButton>
        </div>

        <CFormInput
          type="month"
          id="floatingInpuCTableHeaderCellate"
          floatingClassName="mb-3"
          floatingLabel="Date de saisie"
          placeholder="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          disabled={generateUnitePhysiqueQuery.isFetching}
        />

        <CButton
          disabled={generateUnitePhysiqueQuery.isFetching}
          onClick={handleClick}
          size="sm"
          color="secondary"
          variant="outline"
          className="rounded-pill"
        >
          <div className="d-flex gap-1">
            {generateUnitePhysiqueQuery.isFetching && <CSpinner size="sm" />}
            <div> Générer le rapport</div>
          </div>
        </CButton>
      </div>
      <CTable
        responsive
        striped
        hover
        size="sm"
        className="text-center text-uppercase"
        id="tbl_unite_physique"
      >
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell colSpan={Number(4 * getAllSitesQuery?.data?.length + 6)}>
              Unité Physique du {date.split('-').reverse().join('-')}
            </CTableHeaderCell>
          </CTableRow>

          <CTableRow>
            <CTableHeaderCell colSpan={2}></CTableHeaderCell>

            {getAllSitesQuery?.data?.map((site, i) => (
              <CTableHeaderCell key={i} colSpan={4}>
                {site?.name}
              </CTableHeaderCell>
            ))}

            <CTableHeaderCell colSpan={4}>TOTAL</CTableHeaderCell>
          </CTableRow>

          <CTableRow>
            <CTableDataCell colSpan={2}></CTableDataCell>

            {getAllSitesQuery?.data?.map((site, i) => (
              <React.Fragment key={i}>
                <td colSpan={2}>HRM</td>
                <td colSpan={2}>HIM</td>
              </React.Fragment>
            ))}

            <CTableDataCell colSpan={2}>HRM</CTableDataCell>
            <CTableDataCell colSpan={2}>HIM</CTableDataCell>
          </CTableRow>

          <CTableRow>
            <CTableDataCell>Parc</CTableDataCell>
            <CTableDataCell>Nbre</CTableDataCell>

            {getAllSitesQuery.data?.map((site, i) => (
              <React.Fragment key={i}>
                <CTableDataCell>M</CTableDataCell>
                <CTableDataCell>A</CTableDataCell>
                <CTableDataCell>M</CTableDataCell>
                <CTableDataCell>A</CTableDataCell>
              </React.Fragment>
            ))}

            <CTableDataCell>M</CTableDataCell>
            <CTableDataCell>A</CTableDataCell>

            <CTableDataCell>M</CTableDataCell>
            <CTableDataCell>A</CTableDataCell>
          </CTableRow>
        </CTableHead>
        <tbody>
          {!generateUnitePhysiqueQuery.isFetching &&
            generateUnitePhysiqueQuery.data?.map((unitePhysique, i) => (
              <CTableRow key={i}>
                <CTableDataCell>{unitePhysique?.parc}</CTableDataCell>
                <CTableDataCell>{unitePhysique?.nombre_d_engin}</CTableDataCell>

                {getAllSitesQuery.data?.map((site, i) => (
                  <React.Fragment key={i}>
                    <CTableDataCell>
                      {unitePhysique.par_site?.map((s, i) => s?.site === site?.name && s?.hrm_m)}
                    </CTableDataCell>
                    <CTableDataCell>
                      {unitePhysique.par_site?.map((s, i) => s?.site === site?.name && s?.hrm_a)}
                    </CTableDataCell>
                    <CTableDataCell>
                      {unitePhysique.par_site?.map((s, i) => s?.site === site?.name && s?.him_m)}
                    </CTableDataCell>
                    <CTableDataCell>
                      {unitePhysique.par_site?.map((s, i) => s?.site === site?.name && s?.him_a)}
                    </CTableDataCell>
                  </React.Fragment>
                ))}

                <CTableDataCell>{unitePhysique?.hrm_m_total}</CTableDataCell>
                <CTableDataCell>{unitePhysique?.hrm_a_total}</CTableDataCell>

                <CTableDataCell>{unitePhysique?.him_m_total}</CTableDataCell>
                <CTableDataCell>{unitePhysique?.him_a_total}</CTableDataCell>
              </CTableRow>
            ))}

          {generateUnitePhysiqueQuery.isFetching && (
            <CTableRow>
              <CTableDataCell
                colSpan={Number(4 * getAllSitesQuery?.data?.length + 6)}
                className="text-center text-primary"
              >
                {generateUnitePhysiqueQuery.isFetching && (
                  <div>
                    <CSpinner size="sm" /> Chargement...
                  </div>
                )}
              </CTableDataCell>
            </CTableRow>
          )}
        </tbody>
      </CTable>
    </>
  )
}

export default UnitePhysique
