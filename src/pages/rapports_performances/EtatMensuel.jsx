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

  const generateEtatMensuelQuery = useQuery(generateEtatMensuelOptions(date))

  const handleClick = () => {
    generateEtatMensuelQuery.refetch() // 🔥 Déclenche la requête au clic
  }

  return (
    <div>
      <div className="row text-center">
        <div className="col-sm mb-2">
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

        <div className="col-sm mb-2">
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
        </div>

        <div className="col-sm mb-2">
          <CButton
            disabled={generateEtatMensuelQuery.isFetching}
            onClick={handleClick}
            size="sm"
            color="secondary"
            variant="outline"
            className="rounded-pill"
          >
            <div className="d-flex gap-1 align-items-center">
              {generateEtatMensuelQuery.isFetching && <CSpinner size="sm" />}
              <div> Générer le rapport</div>
            </div>
          </CButton>
        </div>
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

            <CTableDataCell colSpan={2} className={`bg-secondary-subtle`}>
              HRM
            </CTableDataCell>

            <CTableDataCell colSpan={2}>HIM </CTableDataCell>

            <CTableDataCell colSpan={2} className={`bg-secondary-subtle`}>
              NI{' '}
            </CTableDataCell>

            <CTableDataCell colSpan={2}>HRD </CTableDataCell>

            <CTableDataCell colSpan={2} className={`bg-secondary-subtle`}>
              MTTR{' '}
            </CTableDataCell>

            <CTableDataCell colSpan={2}>DISP </CTableDataCell>

            <CTableDataCell colSpan={2} className={`bg-secondary-subtle`}>
              TDM{' '}
            </CTableDataCell>

            <CTableDataCell colSpan={2}>MTBF </CTableDataCell>

            <CTableDataCell colSpan={2} className={`bg-secondary-subtle`}>
              UTIL{' '}
            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell>Type</CTableDataCell>
            <CTableDataCell>Parc</CTableDataCell>
            <CTableDataCell>Engins</CTableDataCell>

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

            <CTableDataCell className={`bg-secondary-subtle`}>M</CTableDataCell>
            <CTableDataCell className={`bg-secondary-subtle`}>A</CTableDataCell>

            <CTableDataCell>M</CTableDataCell>
            <CTableDataCell>A</CTableDataCell>

            <CTableDataCell className={`bg-secondary-subtle`}>M</CTableDataCell>
            <CTableDataCell className={`bg-secondary-subtle`}>A</CTableDataCell>

            <CTableDataCell>M</CTableDataCell>
            <CTableDataCell>A</CTableDataCell>

            <CTableDataCell className={`bg-secondary-subtle`}>M</CTableDataCell>
            <CTableDataCell className={`bg-secondary-subtle`}>A</CTableDataCell>
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

                <CTableDataCell className={`bg-secondary-subtle`}>{item?.hrm_m}</CTableDataCell>
                <CTableDataCell className={`bg-secondary-subtle`}>{item?.hrm_a}</CTableDataCell>

                <CTableDataCell>{item?.him_m}</CTableDataCell>
                <CTableDataCell>{item?.him_a}</CTableDataCell>

                <CTableDataCell className={`bg-secondary-subtle`}>{item?.ni_m}</CTableDataCell>
                <CTableDataCell className={`bg-secondary-subtle`}>{item?.ni_a}</CTableDataCell>

                <CTableDataCell>{item?.hrd_m}</CTableDataCell>
                <CTableDataCell>{item?.hrd_a}</CTableDataCell>

                <CTableDataCell className={`bg-secondary-subtle`}>{item?.mttr_m}</CTableDataCell>
                <CTableDataCell className={`bg-secondary-subtle`}>{item?.mttr_a}</CTableDataCell>

                <CTableDataCell>{item?.dispo_m}</CTableDataCell>
                <CTableDataCell>{item?.dispo_a}</CTableDataCell>

                <CTableDataCell className={`bg-secondary-subtle`}>{item?.tdm_m}</CTableDataCell>
                <CTableDataCell className={`bg-secondary-subtle`}>{item?.tdm_a}</CTableDataCell>

                <CTableDataCell>{item?.mtbf_m}</CTableDataCell>
                <CTableDataCell>{item?.mtbf_a}</CTableDataCell>

                <CTableDataCell className={`bg-secondary-subtle`}>{item?.util_m}</CTableDataCell>
                <CTableDataCell className={`bg-secondary-subtle`}>{item?.util_a}</CTableDataCell>
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
