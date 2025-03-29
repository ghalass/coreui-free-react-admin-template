import { CButton, CFormInput, CFormSelect } from '@coreui/react'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { useTypeparcs } from '../../hooks/useTypeparcs'
import { useParcsByTypeParc } from '../../hooks/useParcs'
import { fecthSitesQuery } from '../../hooks/useSites'
import fecthEnginsQueryByParcBySite from '../../hooks/useEngins'
import fecthSaisieRjeQueryOptions from '../../hooks/useSaisieRje'
import CIcon from '@coreui/icons-react'
import { cilHistory, cilTrash } from '@coreui/icons'

const SaisieRje = () => {
  const initialVal = {
    du: new Date().toISOString().split('T')[0],
    enginId: '',
    siteId: '',
    parcId: '',
    typeparcId: '',
  }
  const [selectedFields, setSelectedFields] = useState(initialVal)
  const [saisieRjeQueryStore, setSaisieRjeQueryStore] = useState([])

  const typeparcsQuery = useQuery(useTypeparcs())

  const parcsByTypeparcQuery = useQuery(useParcsByTypeParc(selectedFields?.typeparcId))

  const sitesQuery = useQuery(fecthSitesQuery())
  const enginsQuery = useQuery(
    fecthEnginsQueryByParcBySite(selectedFields?.parcId, selectedFields?.siteId),
  )

  const saisieRjeQuery = useQuery(
    fecthSaisieRjeQueryOptions(selectedFields?.du, selectedFields?.enginId),
  )

  useEffect(() => {
    setSaisieRjeQueryStore(saisieRjeQuery)
  }, [saisieRjeQuery.isSuccess, saisieRjeQuery.isRefetching])
  console.log(saisieRjeQueryStore.data?.[0])

  return (
    <div>
      <div className="d-flex gap-1 justify-content-center align-items-center">
        <CFormInput
          type="date"
          id="floatingInputDate"
          floatingClassName="mb-3"
          floatingLabel="Nom du site"
          placeholder="pg11"
          value={selectedFields?.du}
          onChange={(e) =>
            setSelectedFields({
              ...selectedFields,
              du: e.target.value,
            })
          }
          // disabled={
          //   createMutation.isPending ||
          //   updateMutation.isPending ||
          //   deleteMutation.isPending ||
          //   operation === 'delete'
          // }
        />

        <CFormSelect
          id="floatingSelectTypeparcId"
          floatingClassName="mb-3"
          floatingLabel="Choisir un type de parc"
          aria-label="Floating label select example"
          value={selectedFields?.typeparcId}
          onChange={(e) =>
            setSelectedFields({
              ...selectedFields,
              typeparcId: e.target.value,
            })
          }
          // disabled={
          //   createMutation.isPending ||
          //   updateMutation.isPending ||
          //   deleteMutation.isPending ||
          //   operation === 'delete'
          // }
        >
          <option></option>
          {typeparcsQuery.data &&
            typeparcsQuery.data?.length > 0 &&
            typeparcsQuery.data?.map((typeparc, indx) => (
              <option key={indx} value={typeparc?.id}>
                {typeparc?.name}
              </option>
            ))}
        </CFormSelect>

        <CFormSelect
          id="floatingSelectParcId"
          floatingClassName="mb-3"
          floatingLabel="Choisir un parc"
          aria-label="Floating label select example"
          value={selectedFields?.parcId}
          onChange={(e) =>
            setSelectedFields({
              ...selectedFields,
              parcId: e.target.value,
            })
          }
          // disabled={
          //   createMutation.isPending ||
          //   updateMutation.isPending ||
          //   deleteMutation.isPending ||
          //   operation === 'delete'
          // }
        >
          <option></option>
          {parcsByTypeparcQuery.data &&
            parcsByTypeparcQuery.data?.length > 0 &&
            parcsByTypeparcQuery.data?.map((parc, indx) => (
              <option key={indx} value={parc?.id}>
                {parc?.name}
              </option>
            ))}
        </CFormSelect>

        <CFormSelect
          id="floatingSelectSiteId"
          floatingClassName="mb-3"
          floatingLabel="Choisir un site"
          aria-label="Floating label select example"
          value={selectedFields?.siteId}
          onChange={(e) =>
            setSelectedFields({
              ...selectedFields,
              siteId: e.target.value,
            })
          }
          // disabled={
          //   createMutation.isPending ||
          //   updateMutation.isPending ||
          //   deleteMutation.isPending ||
          //   operation === 'delete'
          // }
        >
          <option></option>
          {sitesQuery.data &&
            sitesQuery.data?.length > 0 &&
            sitesQuery.data?.map((site, indx) => (
              <option key={indx} value={site?.id}>
                {site?.name}
              </option>
            ))}
        </CFormSelect>

        <CFormSelect
          id="floatingSelectEnginId"
          floatingClassName="mb-3"
          floatingLabel="Choisir un engin"
          aria-label="Floating label select example"
          value={selectedFields?.enginId}
          onChange={(e) =>
            setSelectedFields({
              ...selectedFields,
              enginId: e.target.value,
            })
          }
          // disabled={
          //   createMutation.isPending ||
          //   updateMutation.isPending ||
          //   deleteMutation.isPending ||
          //   operation === 'delete'
          // }
        >
          <option></option>
          {enginsQuery.data &&
            enginsQuery.data?.length > 0 &&
            enginsQuery.data?.map((engin, indx) => (
              <option key={indx} value={engin?.id}>
                {engin?.name}
              </option>
            ))}
        </CFormSelect>
      </div>

      <div className="d-flex justify-content-center gap-4">
        <div>
          {saisieRjeQueryStore?.data?.[0]?.Saisiehim?.length || 0}
          Pannes
        </div>

        <div className="d-flex align-items-center gap-1">
          <span className="text-primary">
            {!saisieRjeQueryStore?.data?.[0]?.hrm && 'Aucun HRM saisie'}
          </span>
          <i className="bi bi-clock"></i>{' '}
          <span>HRM : {saisieRjeQueryStore?.data?.[0]?.hrm || ' '}</span>
          <i className="bi bi-geo-alt"></i>{' '}
          <span>Site : {saisieRjeQueryStore?.data?.[0]?.Site?.name || ' '}</span>
        </div>
      </div>

      <div className="d-flex gap-4 justify-content-center ">
        {/* <Button
          onClick={handleShowPanneModal}
          variant="outline-danger"
          className="rounded-pill"
          size="sm"
          disabled={disableAddPanneButton}
        >
          <i className="bi bi-cone-striped"></i>
        </Button> */}

        <CButton size="sm" color="danger" variant="outline" className="rounded-pill">
          <CIcon icon={cilTrash} />
        </CButton>

        <CButton size="sm" color="primary" variant="outline" className="rounded-pill">
          <CIcon icon={cilHistory} />
        </CButton>

        {/* <Button
          onClick={handleShowHRMModal}
          variant="outline-primary"
          className="rounded-pill"
          size="sm"
          disabled={!selectedFields.enginId}
        >
          <i className="bi bi-clock-history"></i>
        </Button> */}
      </div>
    </div>
  )
}

export default SaisieRje
