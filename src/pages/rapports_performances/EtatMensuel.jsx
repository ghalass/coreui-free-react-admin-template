import React, { useState } from 'react'
import { generateEtatMensuelOptions } from '../../hooks/useRapports'
import { useQuery } from '@tanstack/react-query'
import { exportExcel } from '../../utils/func'
import {
  CButton,
  CFormInput,
  CSpinner,
  CTable,
  CTableDataCell,
  CTableHead,
  CTableRow,
} from '@coreui/react'

const EtatMensuel = () => {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 7))

  const [_, setShouldFetch] = useState(false)

  const generateEtatMensuelQuery = useQuery(generateEtatMensuelOptions(date))

  const handleClick = () => {
    setShouldFetch(true) // Activer la requête au clic
    generateEtatMensuelQuery.refetch() // 🔥 Déclenche la requête au clic
  }

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center gap-2 mb-3">
        <div>
          <CButton
            disabled={
              generateEtatMensuelQuery.isFetching || !!generateEtatMensuelQuery?.data !== true
            }
            onClick={() => exportExcel('tbl_etat_mensuel', 'Rapport Etat Mensuel')}
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
          disabled={generateEtatMensuelQuery.isFetching}
        />

        <CButton
          disabled={generateEtatMensuelQuery.isFetching}
          onClick={handleClick}
          size="sm"
          color="secondary"
          variant="outline"
          className="rounded-pill"
        >
          <div className="d-flex gap-1">
            {generateEtatMensuelQuery.isFetching && <CSpinner size="sm" />}
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
        id="tbl_etat_mensuel"
      >
        <CTableHead>
          <CTableRow>
            <CTableDataCell colSpan={23}>
              état mensuel du {date.split('-').reverse().join('-')}
            </CTableDataCell>
          </CTableRow>

          <CTableRow>
            <CTableDataCell colSpan={3}></CTableDataCell>

            <CTableDataCell colSpan={2}>NHO </CTableDataCell>

            <CTableDataCell colSpan={2}>HRM </CTableDataCell>

            <CTableDataCell colSpan={2}>HIM </CTableDataCell>

            <CTableDataCell colSpan={2}>NI </CTableDataCell>

            <CTableDataCell colSpan={2}>HRD </CTableDataCell>

            <CTableDataCell colSpan={2}>MTTR </CTableDataCell>

            <CTableDataCell colSpan={2}>DISP </CTableDataCell>

            <CTableDataCell colSpan={2}>TDM </CTableDataCell>

            <CTableDataCell colSpan={2}>MTBF </CTableDataCell>

            <CTableDataCell colSpan={2}>UTIL </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell>Type</CTableDataCell>
            <CTableDataCell>Parc</CTableDataCell>
            <CTableDataCell>Engins</CTableDataCell>

            <CTableDataCell>M</CTableDataCell>
            <CTableDataCell>A</CTableDataCell>

            <CTableDataCell>M</CTableDataCell>
            <CTableDataCell>A</CTableDataCell>

            <CTableDataCell>M</CTableDataCell>
            <CTableDataCell>A</CTableDataCell>

            <CTableDataCell>M</CTableDataCell>
            <CTableDataCell>A</CTableDataCell>

            <CTableDataCell>M</CTableDataCell>
            <CTableDataCell>A</CTableDataCell>

            <CTableDataCell>M</CTableDataCell>
            <CTableDataCell>A</CTableDataCell>

            <CTableDataCell>M</CTableDataCell>
            <CTableDataCell>A</CTableDataCell>

            <CTableDataCell>M</CTableDataCell>
            <CTableDataCell>A</CTableDataCell>

            <CTableDataCell>M</CTableDataCell>
            <CTableDataCell>A</CTableDataCell>

            <CTableDataCell>M</CTableDataCell>
            <CTableDataCell>A</CTableDataCell>
          </CTableRow>
        </CTableHead>
        <tbody>
          {!generateEtatMensuelQuery.isFetching &&
            generateEtatMensuelQuery.data?.map((item, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{item?.typeparc}</CTableDataCell>
                <CTableDataCell>{item?.parc}</CTableDataCell>
                <CTableDataCell>{item?.nombre_d_engin}</CTableDataCell>

                <CTableDataCell>{item?.nho_m}</CTableDataCell>
                <CTableDataCell>{item?.nho_a}</CTableDataCell>

                <CTableDataCell>{item?.hrm_m}</CTableDataCell>
                <CTableDataCell>{item?.hrm_a}</CTableDataCell>

                <CTableDataCell>{item?.him_m}</CTableDataCell>
                <CTableDataCell>{item?.him_a}</CTableDataCell>

                <CTableDataCell>{item?.ni_m}</CTableDataCell>
                <CTableDataCell>{item?.ni_a}</CTableDataCell>

                <CTableDataCell>{item?.hrd_m}</CTableDataCell>
                <CTableDataCell>{item?.hrd_a}</CTableDataCell>

                <CTableDataCell>{item?.mttr_m}</CTableDataCell>
                <CTableDataCell>{item?.mttr_a}</CTableDataCell>

                <CTableDataCell>{item?.dispo_m}</CTableDataCell>
                <CTableDataCell>{item?.dispo_a}</CTableDataCell>

                <CTableDataCell>{item?.tdm_m}</CTableDataCell>
                <CTableDataCell>{item?.tdm_a}</CTableDataCell>

                <CTableDataCell>{item?.mtbf_m}</CTableDataCell>
                <CTableDataCell>{item?.mtbf_a}</CTableDataCell>

                <CTableDataCell>{item?.util_m}</CTableDataCell>
                <CTableDataCell>{item?.util_a}</CTableDataCell>
              </CTableRow>
            ))}

          {generateEtatMensuelQuery.isFetching && (
            <CTableRow>
              <CTableDataCell colSpan={23} className="text-center text-primary">
                {generateEtatMensuelQuery.isFetching && (
                  <div>
                    <CSpinner size="sm" /> Chargement...
                  </div>
                )}
              </CTableDataCell>
            </CTableRow>
          )}
        </tbody>
      </CTable>
    </div>
  )
}

export default EtatMensuel
