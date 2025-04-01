import React, { useState } from 'react'
import { getRapportHeuresChassisOptions } from '../../hooks/useRapports'
import { useQuery } from '@tanstack/react-query'
import { exportExcel } from '../../utils/func'
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

const HeuresChassis = () => {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 7))

  const getRapportHeuresChassis = useQuery(getRapportHeuresChassisOptions(date))

  const handleClick = () => {
    getRapportHeuresChassis.refetch() // 🔥 Déclenche la requête au clic
  }
  return (
    <div>
      <div className="row text-center">
        <div className="col-sm mb-2">
          <CButton
            disabled={
              getRapportHeuresChassis.isFetching || !!getRapportHeuresChassis?.data !== true
            }
            onClick={() => exportExcel('tbl_heures_chassis', 'Rapport Heures Chassis')}
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
            id="floatingInpuCTableHeaderCellate"
            floatingClassName="mb-3"
            floatingLabel="Date de saisie"
            placeholder="Date de saisie"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            disabled={getRapportHeuresChassis.isFetching}
          />
        </div>

        <div className="col-sm mb-2">
          <CButton
            disabled={getRapportHeuresChassis.isFetching}
            onClick={handleClick}
            size="sm"
            color="secondary"
            variant="outline"
            className="rounded-pill"
          >
            <div className="d-flex gap-1 align-items-center">
              {getRapportHeuresChassis.isFetching && <CSpinner size="sm" />}
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
        id="tbl_heures_chassis"
      >
        <CTableHead>
          <CTableRow>
            <CTableDataCell colSpan={6}>
              rapport heures châssis du {date.split('-').reverse().join('-')}
            </CTableDataCell>
          </CTableRow>

          <CTableRow>
            <CTableHeaderCell>Type</CTableHeaderCell>
            <CTableHeaderCell>Parc</CTableHeaderCell>
            <CTableHeaderCell>Engin</CTableHeaderCell>
            <CTableHeaderCell>HRM_M</CTableHeaderCell>
            <CTableHeaderCell>H_CHASSI</CTableHeaderCell>
            <CTableHeaderCell>Site</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {!getRapportHeuresChassis.isFetching &&
            getRapportHeuresChassis.data?.map((item, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{item?.typeparc}</CTableDataCell>
                <CTableDataCell>{item?.parc}</CTableDataCell>
                <CTableDataCell>{item?.engin}</CTableDataCell>
                <CTableDataCell>{item?.hrm_m}</CTableDataCell>
                <CTableDataCell>{item?.heuresChassis}</CTableDataCell>
                <CTableDataCell>{item?.site}</CTableDataCell>
              </CTableRow>
            ))}

          {getRapportHeuresChassis.isFetching && (
            <CTableRow>
              <CTableDataCell colSpan={6} className="text-center text-primary">
                {getRapportHeuresChassis.isFetching && (
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

export default HeuresChassis
