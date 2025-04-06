import { CButton, CFormInput, CFormSelect, CSpinner } from '@coreui/react'
import React, { useState } from 'react'
import { useParcs } from '../../../hooks/useParcs'
import { useQuery } from '@tanstack/react-query'

const IndispoEnginPeriode = () => {
  const [dateDu, setDateDu] = useState(new Date().toISOString().split('T')[0])
  const [dateAu, setDateAu] = useState(new Date().toISOString().split('T')[0])
  const [selectedParc, setSelectedParc] = useState('')
  const [selectedTypelubrifiant, setSelectedTypelubrifiant] = useState('')
  const getAllParcsQuery = useQuery(useParcs())

  const handleClick = () => {
    //   setError(null)
    //   const data = {
    //     dateDu,
    //     dateAu,
    //     selectedParc,
    //     selectedTypelubrifiant,
    //   }
    //   if (dateDu > dateAu) {
    //     setError('Attention la date Du doit être >= dateAu')
    //     toast.warn('Attention la date Du doit être >= dateAu')
    //     getAnalyse.reset()
    //     return
    //   }
    //   // console.log(data)
    //   getAnalyse.refetch()
  }

  return (
    <div>
      <div className="row text-center">
        <div className="col-sm mb-2">
          <CButton
            // disabled={getAnalyse.isFetching || !!getAnalyse?.data !== true}
            // onClick={() => exportExcel('tbl_rapportindispo', "Rapport D'indisponibilité")}
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
              // setSelectedParcName(
              //   e.target.value !== '' ? e.target.options[e.target.selectedIndex].text : '',
              // )
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
            // disabled={getAnalyse.isFetching}
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
            // disabled={getAnalyse.isFetching}
          />
        </div>

        <div className="col-sm mb-2">
          <CButton
            disabled={
              //   getAnalyse.isFetching ||
              selectedParc === '' || dateDu === '' || dateAu === ''
            }
            onClick={handleClick}
            size="sm"
            color="secondary"
            variant="outline"
            className="rounded-pill"
          >
            <div className="d-flex gap-1 align-items-center">
              {/* {getAnalyse.isFetching && <CSpinner size="sm" />} */}
              <div> Générer le rapport</div>
            </div>
          </CButton>
        </div>
      </div>
    </div>
  )
}

export default IndispoEnginPeriode
