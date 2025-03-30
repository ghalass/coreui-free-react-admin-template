import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { generateRjeQueryOptions } from '../../hooks/useRapports'
import {
  CButton,
  CFormInput,
  CSpinner,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { exportExcel } from '../../utils/func'

const RapportRje = () => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])

  const [_, setShouldFetch] = useState(false)

  const generateRjeQuery = useQuery(generateRjeQueryOptions(date))

  const handleClick = () => {
    setShouldFetch(true) // Activer la requête au clic
    generateRjeQuery.refetch() // 🔥 Déclenche la requête au clic
  }

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center gap-2 mb-3">
        <div>
          <CButton
            disabled={generateRjeQuery.isFetching}
            onClick={() => exportExcel('tbl_rje', 'Rapport RJE')}
            size="sm"
            color="success"
            variant="outline"
            className="rounded-pill"
          >
            Excel
          </CButton>
        </div>

        <CFormInput
          type="date"
          id="floatingInpuCTableHeaderCellate"
          floatingClassName="mb-3"
          floatingLabel="Date de saisie"
          placeholder="Date de saisie"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          disabled={generateRjeQuery.isFetching}
        />

        <CButton
          disabled={generateRjeQuery.isFetching}
          onClick={handleClick}
          size="sm"
          color="success"
          variant="outline"
          className="rounded-pill"
        >
          <div className="d-flex gap-1">
            {generateRjeQuery.isFetching && <CSpinner size="sm" />}
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
        id="tbl_rje"
      >
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell colSpan={22}>
              Rapport Journalier Engins RJE du {date.split('-').reverse().join('-')}
            </CTableHeaderCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell></CTableHeaderCell>

            <CTableHeaderCell className="text-center" colSpan={7}>
              JOURNALIER
            </CTableHeaderCell>

            <CTableHeaderCell className="text-center" colSpan={7}>
              MENSUEL
            </CTableHeaderCell>

            <CTableHeaderCell className="text-center" colSpan={7}>
              ANNUEL
            </CTableHeaderCell>
          </CTableRow>

          <CTableRow>
            <CTableHeaderCell>Engin</CTableHeaderCell>

            <CTableHeaderCell>NHO</CTableHeaderCell>
            <CTableHeaderCell>HRM</CTableHeaderCell>
            <CTableHeaderCell>HIM</CTableHeaderCell>
            <CTableHeaderCell>NI</CTableHeaderCell>
            <CTableHeaderCell>DISP</CTableHeaderCell>
            <CTableHeaderCell>MTBF</CTableHeaderCell>
            <CTableHeaderCell>TDM</CTableHeaderCell>

            <CTableHeaderCell>NHO</CTableHeaderCell>
            <CTableHeaderCell>HRM</CTableHeaderCell>
            <CTableHeaderCell>HIM</CTableHeaderCell>
            <CTableHeaderCell>NI</CTableHeaderCell>
            <CTableHeaderCell>DISP</CTableHeaderCell>
            <CTableHeaderCell>MTBF</CTableHeaderCell>
            <CTableHeaderCell>TDM</CTableHeaderCell>

            <CTableHeaderCell>NHO</CTableHeaderCell>
            <CTableHeaderCell>HRM</CTableHeaderCell>
            <CTableHeaderCell>HIM</CTableHeaderCell>
            <CTableHeaderCell>NI</CTableHeaderCell>
            <CTableHeaderCell>DISP</CTableHeaderCell>
            <CTableHeaderCell>MTBF</CTableHeaderCell>
            <CTableHeaderCell>TDM</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody className="text-end">
          {!generateRjeQuery.isFetching &&
            generateRjeQuery.data?.map((r, i) => (
              <CTableRow key={i}>
                <CTableDataCell>{r?.engin}</CTableDataCell>

                <CTableDataCell>{r?.nho_j}</CTableDataCell>
                <CTableDataCell>{r?.hrm_j}</CTableDataCell>
                <CTableDataCell>{r?.him_j}</CTableDataCell>
                <CTableDataCell>{r?.ni_j}</CTableDataCell>
                <CTableDataCell>{r?.dispo_j}</CTableDataCell>
                <CTableDataCell>{r?.mtbf_j}</CTableDataCell>
                <CTableDataCell>{r?.TDM_j}</CTableDataCell>

                <CTableDataCell>{r?.nho_m}</CTableDataCell>
                <CTableDataCell>{r?.hrm_m}</CTableDataCell>
                <CTableDataCell>{r?.him_m}</CTableDataCell>
                <CTableDataCell>{r?.ni_m}</CTableDataCell>
                <CTableDataCell>{r?.dispo_m}</CTableDataCell>
                <CTableDataCell>{r?.mtbf_m}</CTableDataCell>
                <CTableDataCell>{r?.TDM_m}</CTableDataCell>

                <CTableDataCell>{r?.nho_a}</CTableDataCell>
                <CTableDataCell>{r?.hrm_a}</CTableDataCell>
                <CTableDataCell>{r?.him_a}</CTableDataCell>
                <CTableDataCell>{r?.ni_a}</CTableDataCell>
                <CTableDataCell>{r?.dispo_a}</CTableDataCell>
                <CTableDataCell>{r?.mtbf_a}</CTableDataCell>
                <CTableDataCell>{r?.TDM_a}</CTableDataCell>
              </CTableRow>
            ))}

          {generateRjeQuery.isFetching && (
            <CTableRow>
              <CTableDataCell colSpan={23} className="text-center text-primary">
                {generateRjeQuery.isFetching && (
                  <div>
                    <CSpinner size="sm" /> Chargement...
                  </div>
                )}
              </CTableDataCell>
            </CTableRow>
          )}
        </CTableBody>
      </CTable>
    </div>
  )
}

export default RapportRje
