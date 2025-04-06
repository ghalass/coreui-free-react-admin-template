import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { useParcs } from '../../../hooks/useParcs'
import {
  CAlert,
  CButton,
  CFormInput,
  CFormSelect,
  CSpinner,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import {
  getIndispoEnginsPeriodeOptions,
  getPerformancesEnginsPeriodeOptions,
} from '../../../hooks/useRapports'
import { toast } from 'react-toastify'
import { exportExcel } from '../../../utils/func'

const PerformancePeriode = () => {
  const [dateDu, setDateDu] = useState(new Date().toISOString().split('T')[0])
  const [dateAu, setDateAu] = useState(new Date().toISOString().split('T')[0])
  const [selectedParc, setSelectedParc] = useState('')
  const [selectedParcName, setSelectedParcName] = useState('')

  const getAllParcsQuery = useQuery(useParcs())

  const getIndispoEnginsPeriode = useQuery(
    getPerformancesEnginsPeriodeOptions(selectedParc, dateDu, dateAu),
  )

  const [error, setError] = useState(null)

  const handleClick = () => {
    setError(null)
    if (dateDu > dateAu) {
      setError('Attention la date Du doit être >= dateAu')
      toast.warn('Attention la date Du doit être >= dateAu')
      return
    }
    getIndispoEnginsPeriode.refetch()
  }

  return (
    <div>
      <div className="row text-center">
        <div className="col-sm mb-2">
          <CButton
            disabled={
              getIndispoEnginsPeriode.isFetching || !!getIndispoEnginsPeriode?.data !== true
            }
            onClick={() =>
              exportExcel('tbl_performances_engin_periode', "Analyse D'indisponibilité par engin")
            }
            size="sm"
            color="success"
            variant="outline"
            className="rounded-pill"
          >
            Excel
          </CButton>
        </div>

        <div className="col-sm mb-2">
          <CFormSelect
            id="floatingSelect"
            floatingClassName="mb-3"
            floatingLabel="Choisir un parc"
            aria-label="Floating label select example"
            value={selectedParc}
            onChange={(e) => {
              setSelectedParc(e.target.value)
              setSelectedParcName(
                e.target.value !== '' ? e.target.options[e.target.selectedIndex].text : '',
              )
            }}
            // disabled={getParetoIndispParc.isFetching}
          >
            <option value="">Liste des parc</option>
            {getAllParcsQuery.data?.map((item, index) => (
              <option key={index} value={item.id}>
                {item.name}
              </option>
            ))}
          </CFormSelect>
        </div>

        <div className="col-sm mb-2">
          <CFormInput
            type="date"
            id="floatingInputDateDu"
            floatingClassName="mb-3"
            floatingLabel="Du"
            placeholder="Date"
            value={dateDu}
            onChange={(e) => setDateDu(e.target.value)}
            disabled={getIndispoEnginsPeriode.isFetching}
          />
        </div>

        <div className="col-sm mb-2">
          <CFormInput
            type="date"
            id="floatingInputDateAu"
            floatingClassName="mb-3"
            floatingLabel="Au"
            placeholder="Date"
            value={dateAu}
            onChange={(e) => setDateAu(e.target.value)}
            disabled={getIndispoEnginsPeriode.isFetching}
          />
        </div>

        <div className="col-sm mb-2">
          <CButton
            disabled={
              getIndispoEnginsPeriode.isFetching ||
              selectedParc === '' ||
              dateDu === '' ||
              dateAu === ''
            }
            onClick={handleClick}
            size="sm"
            color="secondary"
            variant="outline"
            className="rounded-pill"
          >
            <div className="d-flex gap-1 align-items-center">
              {getIndispoEnginsPeriode.isFetching && <CSpinner size="sm" />}
              <div> Générer le rapport</div>
            </div>
          </CButton>
        </div>
      </div>

      {error && (
        <div className="d-flex justify-content-center">
          <CAlert color="danger" className="text-center py-2">
            {error}
          </CAlert>
        </div>
      )}

      {!getIndispoEnginsPeriode.isFetching &&
        !error &&
        selectedParc !== '' &&
        getIndispoEnginsPeriode?.data &&
        getIndispoEnginsPeriode?.data?.length > 0 && (
          <div>
            <CTable
              responsive
              striped
              hover
              size="sm"
              className="text-center text-uppercase"
              id="tbl_performances_engin_periode"
            >
              <CTableHead>
                <CTableRow>
                  <CTableDataCell colSpan={6} className="text-start">
                    anlayse des performances par engin pour le parc {selectedParcName} du{' '}
                    {dateDu.split('-').reverse().join('-')} au{' '}
                    {dateAu.split('-').reverse().join('-')}
                  </CTableDataCell>
                </CTableRow>
              </CTableHead>
              <CTableBody className="text-start">
                <CTableRow>
                  <CTableHeaderCell>Engin</CTableHeaderCell>
                  <CTableHeaderCell>NHO</CTableHeaderCell>
                  <CTableHeaderCell>HRM</CTableHeaderCell>
                  <CTableHeaderCell>HIM</CTableHeaderCell>
                  <CTableHeaderCell>NI</CTableHeaderCell>
                  <CTableHeaderCell>DISPO</CTableHeaderCell>
                  <CTableHeaderCell>MTBF</CTableHeaderCell>
                  <CTableHeaderCell>UTIL</CTableHeaderCell>
                </CTableRow>

                {getIndispoEnginsPeriode?.data?.map((item, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell>{item?.engin}</CTableDataCell>
                    <CTableDataCell>{item?.nho}</CTableDataCell>
                    <CTableDataCell>{item?.hrm}</CTableDataCell>
                    <CTableDataCell>{item?.him}</CTableDataCell>
                    <CTableDataCell>{item?.ni}</CTableDataCell>
                    <CTableDataCell>{item?.dispo}</CTableDataCell>
                    <CTableDataCell>{item?.mtbf}</CTableDataCell>
                    <CTableDataCell>{item?.util}</CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </div>
        )}

      {!getIndispoEnginsPeriode.isFetching &&
        getIndispoEnginsPeriode?.data?.length === 0 &&
        !error && (
          <>
            <div className="text-center text-primary">
              Aucune données n'est enregistrée pour ce parc à cette période.
            </div>
          </>
        )}

      {getIndispoEnginsPeriode.isFetching && (
        <>
          <div className="text-center text-primary">
            {getIndispoEnginsPeriode.isFetching && (
              <div>
                <CSpinner size="sm" /> Chargement...
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default PerformancePeriode
