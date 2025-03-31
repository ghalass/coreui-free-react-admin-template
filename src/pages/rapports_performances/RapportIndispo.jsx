import React, { useState } from 'react'
import { getRapportIndispoOptions } from '../../hooks/useRapports'
import { useQuery } from '@tanstack/react-query'
import {
  CButton,
  CFormInput,
  CSpinner,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableRow,
} from '@coreui/react'

const RapportIndispo = () => {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 7))

  const [_, setShouldFetch] = useState(false)

  const getRapportIndis = useQuery(getRapportIndispoOptions(date))

  const handleClick = () => {
    setShouldFetch(true) // Activer la requête au clic
    getRapportIndis.refetch() // 🔥 Déclenche la requête au clic
  }
  return (
    <div>
      <div className="d-flex justify-content-center align-items-center gap-2 mb-3">
        <div>
          <CButton
            disabled={getRapportIndis.isFetching || !!getRapportIndis?.data !== true}
            onClick={() => exportExcel('tbl_rapportindispo', "Rapport D'indisponibilité")}
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
          id="floatingInputDate"
          floatingClassName="mb-3"
          floatingLabel="Date de saisie"
          placeholder="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          disabled={getRapportIndis.isFetching}
        />

        <CButton
          disabled={getRapportIndis.isFetching}
          onClick={handleClick}
          size="sm"
          color="secondary"
          variant="outline"
          className="rounded-pill"
        >
          <div className="d-flex gap-1">
            {getRapportIndis.isFetching && <CSpinner size="sm" />}
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
        id="tbl_rapportindispo"
      >
        <CTableHead>
          <CTableRow>
            <CTableDataCell colSpan={14}>
              rapport indisponibilité du {date.split('-').reverse().join('-')}
            </CTableDataCell>
          </CTableRow>

          <CTableRow>
            <CTableDataCell colSpan={4}></CTableDataCell>

            <CTableDataCell colSpan={2}>NHO</CTableDataCell>

            <CTableDataCell colSpan={2} className={`bg-secondary-subtle`}>
              NI
            </CTableDataCell>

            <CTableDataCell colSpan={2}>HIM</CTableDataCell>

            <CTableDataCell colSpan={2} className={`bg-secondary-subtle`}>
              INDISP
            </CTableDataCell>

            <CTableDataCell colSpan={2}>COEF</CTableDataCell>
          </CTableRow>

          <CTableRow>
            <CTableDataCell>Type</CTableDataCell>
            <CTableDataCell>Parc</CTableDataCell>
            <CTableDataCell>Nbr</CTableDataCell>
            <CTableDataCell>Panne</CTableDataCell>

            <CTableDataCell>M</CTableDataCell>
            <CTableDataCell>A</CTableDataCell>

            <CTableDataCell className={`bg-secondary-subtle`}>M</CTableDataCell>
            <CTableDataCell className={`bg-secondary-subtle`}>A</CTableDataCell>

            <CTableDataCell>M</CTableDataCell>
            <CTableDataCell>A</CTableDataCell>

            <CTableDataCell className={`bg-secondary-subtle`}>M</CTableDataCell>
            <CTableDataCell className={`bg-secondary-subtle`}>A</CTableDataCell>

            <CTableDataCell>M</CTableDataCell>
            <CTableDataCell>A</CTableDataCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {!getRapportIndis.isFetching &&
            getRapportIndis.data?.map((rapp, i) => (
              <CTableRow key={i}>
                <CTableDataCell>{rapp?.typeparc}</CTableDataCell>
                <CTableDataCell>{rapp?.parc}</CTableDataCell>
                <CTableDataCell>{rapp?.nombre_d_engin}</CTableDataCell>
                <CTableDataCell>{rapp?.panne}</CTableDataCell>

                <CTableDataCell>{rapp?.nho_m}</CTableDataCell>
                <CTableDataCell>{rapp?.nho_a}</CTableDataCell>

                <CTableDataCell>{rapp?.ni_m}</CTableDataCell>
                <CTableDataCell>{rapp?.ni_a}</CTableDataCell>

                <CTableDataCell>{rapp?.him_m}</CTableDataCell>
                <CTableDataCell>{rapp?.him_a}</CTableDataCell>

                <CTableDataCell>{rapp?.indisp_m}</CTableDataCell>
                <CTableDataCell>{rapp?.indisp_a}</CTableDataCell>

                <CTableDataCell>{rapp?.coef_indispo_m}</CTableDataCell>
                <CTableDataCell>{rapp?.coef_indispo_a}</CTableDataCell>
              </CTableRow>
            ))}

          {getRapportIndis.isFetching && (
            <CTableRow>
              <CTableDataCell colSpan={14} className="text-center text-primary">
                {getRapportIndis.isFetching && (
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

export default RapportIndispo
