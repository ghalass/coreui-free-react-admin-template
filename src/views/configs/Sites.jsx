import React, { useState } from 'react'
import {
  CAlert,
  CBadge,
  CFormInput,
  CSpinner,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import { cilPenNib, cilPlus, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { useQuery } from '@tanstack/react-query'
import { fecthSitesQuery, useCreateSite, useDeleteSite, useUpdateSite } from '../../hooks/useSites'
import { toast } from 'react-toastify'

const Sites = () => {
  const getAllQuery = useQuery(fecthSitesQuery())

  const [visible, setVisible] = useState(false)
  const [operation, setOperation] = useState('')

  const [site, setSite] = useState({ id: '', name: '' })
  const createSiteMutation = useCreateSite()
  const deleteSiteMutation = useDeleteSite()
  const updateSiteMutation = useUpdateSite()

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      id: site.id,
      name: site.name,
    }

    switch (operation) {
      case 'create':
        createSiteMutation.mutate(data, {
          onSuccess: () => {
            setVisible(!visible)
            handleResetAll()
            toast.success('Ajouté avec succès.')
          },
        })
        break
      case 'delete':
        deleteSiteMutation.mutate(data, {
          onSuccess: () => {
            setVisible(!visible)
            handleResetAll()
          },
        })
        break
      case 'update':
        updateSiteMutation.mutate(data, {
          onSuccess: () => {
            setVisible(!visible)
            handleResetAll()
          },
        })
        break
      default:
        break
    }
  }

  const handleResetAll = () => {
    setSite({ id: '', name: '' })
    createSiteMutation.reset()
    deleteSiteMutation.reset()
    updateSiteMutation.reset()
    setOperation('create')
  }

  return (
    <div>
      <div className="my-1 d-flex justify-content-between ">
        <div className="d-flex align-items-center gap-1 text-uppercase">
          Liste des sites
          <div>
            <CBadge textBgColor="primary"> {getAllQuery.data?.length || 0}</CBadge>
          </div>
          {(getAllQuery.isLoading || getAllQuery.isPending || getAllQuery.isRefetching) && (
            <CSpinner color="primary" size="sm" />
          )}
        </div>

        <div className="d-flex gap-1 justify-content-end">
          <input
            type="search"
            placeholder="Chercher..."
            className="form-control form-control-sm "
            // value={search}
            // onChange={handleSearch}
          />

          <CButton
            size="sm"
            color="primary"
            variant="outline"
            className="rounded-pill"
            onClick={() => {
              setSite({ id: '', name: '' })
              setVisible(!visible)
              setOperation('create')
            }}
          >
            <CIcon icon={cilPlus} />
          </CButton>
        </div>
      </div>

      <CTable striped hover>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">Nom du site</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {getAllQuery.data && getAllQuery.data.length > 0 ? (
            getAllQuery.data.map((item, index) => (
              <CTableRow key={index}>
                <CTableDataCell>
                  <CButton
                    size="sm"
                    color="danger"
                    variant="outline"
                    className="rounded-pill"
                    onClick={() => {
                      setSite(item)
                      setOperation('delete')
                      setVisible(!visible)
                    }}
                  >
                    <CIcon icon={cilTrash} />
                  </CButton>{' '}
                  <CButton
                    size="sm"
                    color="primary"
                    variant="outline"
                    className="rounded-pill"
                    onClick={() => {
                      setSite(item)
                      setOperation('update')
                      setVisible(!visible)
                    }}
                  >
                    <CIcon icon={cilPenNib} />
                  </CButton>{' '}
                  {item?.name}
                </CTableDataCell>
              </CTableRow>
            ))
          ) : (
            <CTableRow>
              <CTableDataCell colSpan={2}>Aucune donnée trouvée.</CTableDataCell>
            </CTableRow>
          )}
        </CTableBody>
      </CTable>

      {/* CREATE/UPDATE/DELETE  */}
      <CModal
        backdrop="static"
        visible={visible}
        onClose={() => {
          setVisible(false)
          handleResetAll()
        }}
        aria-labelledby="StaticBackdropExampleLabel"
      >
        <CModalHeader>
          <CModalTitle id="StaticBackdropExampleLabel">Ajouter un site {operation}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CFormInput
            type="text"
            id="floatingInput"
            floatingClassName="mb-3"
            floatingLabel="Nom du site"
            placeholder="pg11"
            value={site.name}
            onChange={(e) => setSite({ ...site, name: e.target.value })}
            disabled={
              createSiteMutation.isPending ||
              updateSiteMutation.isPending ||
              deleteSiteMutation.isPending
            }
          />

          {createSiteMutation.isError && (
            <CAlert color="danger" className="mb-0 mt-2 py-2">
              {createSiteMutation.error.message}
            </CAlert>
          )}

          {updateSiteMutation.isError && (
            <CAlert color="danger" className="mb-0 mt-2 py-2">
              {updateSiteMutation.error.message}
            </CAlert>
          )}

          {deleteSiteMutation.isError && (
            <CAlert color="danger" className="mb-0 mt-2 py-2">
              {deleteSiteMutation.error.message}
            </CAlert>
          )}
        </CModalBody>
        <CModalFooter className="d-flex gap-1">
          {operation === 'delete' && (
            <CButton
              disabled={
                createSiteMutation.isPending ||
                updateSiteMutation.isPending ||
                deleteSiteMutation.isPending
              }
              onClick={handleSubmit}
              size="sm"
              color="danger"
              variant="outline"
            >
              <div className="d-flex gap-1 align-items-center justify-content-end">
                {deleteSiteMutation.isPending && <CSpinner size="sm" />} <span>Supprimer</span>
              </div>
            </CButton>
          )}

          {operation !== 'delete' && (
            <CButton
              disabled={
                deleteSiteMutation.isPending ||
                createSiteMutation.isPending ||
                updateSiteMutation.isPending
              }
              onClick={handleSubmit}
              size="sm"
              color="success"
              variant="outline"
            >
              <div className="d-flex gap-1 align-items-center justify-content-end">
                {(createSiteMutation.isPending || updateSiteMutation.isPending) && (
                  <CSpinner size="sm" />
                )}{' '}
                <span>Sauvegarder</span>
              </div>
            </CButton>
          )}
        </CModalFooter>
      </CModal>
    </div>
  )
}

export default Sites
