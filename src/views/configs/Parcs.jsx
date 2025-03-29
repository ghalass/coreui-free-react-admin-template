import React, { useState } from 'react'
import {
  CAlert,
  CBadge,
  CFormInput,
  CPagination,
  CPaginationItem,
  CSpinner,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import { cilCloudDownload, cilPenNib, cilPlus, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { exportExcel, getMultiplesOf } from '../../utils/func'
import { useCreateParc, useDeleteTypeparc, useParcs, useUpdateTypeparc } from '../../hooks/useParcs'

const Parcs = () => {
  const getAllQuery = useQuery(useParcs())

  const [visible, setVisible] = useState(false)
  const [operation, setOperation] = useState('')

  const initialVal = { id: '', name: '' }

  const [entity, setEntity] = useState(initialVal)
  const createMutation = useCreateParc()
  const deleteMutation = useDeleteTypeparc()
  const updateMutation = useUpdateTypeparc()

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      id: entity.id,
      name: entity.name,
    }

    switch (operation) {
      case 'create':
        createMutation.mutate(data, {
          onSuccess: () => {
            setVisible(!visible)
            handleResetAll()
            toast.success('Ajouté avec succès.')
          },
        })
        break
      case 'delete':
        deleteMutation.mutate(data, {
          onSuccess: () => {
            setVisible(!visible)
            handleResetAll()
          },
        })
        break
      case 'update':
        updateMutation.mutate(data, {
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
    setEntity(initialVal)
    createMutation.reset()
    deleteMutation.reset()
    updateMutation.reset()
    setOperation('create')
  }

  const [search, setSearch] = useState('')
  const handleSearch = (e) => {
    setCurrentPage(1)
    const newSearchValue = e.target.value
    if (newSearchValue !== search) {
      setSearch(newSearchValue)
    }
  }
  // Filter the entitys based on the search query
  const filteredEntitys = getAllQuery.data?.filter((parc) =>
    parc.name.toLowerCase().includes(search.toLowerCase()),
  )

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1)
  const [entitysPerPage, setEntitysPerPage] = useState(10)
  // Calculate current entitys to display
  const indexOfLastEntity = currentPage * entitysPerPage
  const indexOfFirstEntity = indexOfLastEntity - entitysPerPage
  const currentEntitys = filteredEntitys?.slice(indexOfFirstEntity, indexOfLastEntity)
  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }
  // Calculate total pages
  const totalPages = Math.ceil(filteredEntitys?.length / entitysPerPage)

  return (
    <div>
      <div className="my-1 d-flex justify-content-between ">
        <div className="d-flex align-items-center gap-1 text-uppercase">
          Liste des parcs
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
            value={search}
            onChange={handleSearch}
          />

          <CButton
            size="sm"
            color="primary"
            variant="outline"
            className="rounded-pill"
            onClick={() => {
              setEntity(initialVal)
              setVisible(!visible)
              setOperation('create')
            }}
          >
            <CIcon icon={cilPlus} />
          </CButton>
        </div>
      </div>

      <div className="d-flex gap-1 justify-content-between align-items-center mb-1">
        <div>
          <CButton
            size="sm"
            color="success"
            variant="outline"
            onClick={() => exportExcel('myTable', 'Liste des parcs')}
            className="rounded-pill"
          >
            Excel <CIcon icon={cilCloudDownload} />
          </CButton>
        </div>

        <div className="d-flex gap-1 justify-content-between align-items-center">
          <div style={{ width: '50px' }}>
            <select
              className="form-control form-control-sm"
              defaultValue={entitysPerPage}
              onChange={(e) => {
                setEntitysPerPage(e.target.value)
                setCurrentPage(1)
              }}
            >
              {getMultiplesOf(filteredEntitys?.length, 5)?.map((item, i) => (
                <option key={i} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <CPagination size="sm" aria-label="Page navigation example" className="mb-0">
              <CPaginationItem
                aria-label="Previous"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <span aria-hidden="true">&laquo;</span>
              </CPaginationItem>

              {Array.from({ length: totalPages }, (_, index) => (
                <CPaginationItem
                  key={index}
                  active={index + 1 === currentPage}
                  size="sm"
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </CPaginationItem>
              ))}

              <CPaginationItem
                aria-label="Next"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                <span aria-hidden="true">&raquo;</span>
              </CPaginationItem>
            </CPagination>
          </div>
        </div>
      </div>

      <CTable striped hover id="myTable">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">Nom du parc</CTableHeaderCell>
            <CTableHeaderCell scope="col">Type de parc</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {currentEntitys && currentEntitys?.length > 0 ? (
            currentEntitys?.map((item, index) => (
              <CTableRow key={index}>
                <CTableDataCell>
                  <CButton
                    size="sm"
                    color="danger"
                    variant="outline"
                    className="rounded-pill"
                    onClick={() => {
                      setEntity(item)
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
                      setEntity(item)
                      setOperation('update')
                      setVisible(!visible)
                    }}
                  >
                    <CIcon icon={cilPenNib} />
                  </CButton>{' '}
                  {item?.name}
                </CTableDataCell>

                <CTableDataCell> {item?.Typeparc?.name}</CTableDataCell>
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
          <CModalTitle id="StaticBackdropExampleLabel">Gestion d'un parc</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CFormInput
            type="text"
            id="floatingInput"
            floatingClassName="mb-3"
            floatingLabel="Nom du parc"
            placeholder="pg11"
            value={entity.name}
            onChange={(e) => setEntity({ ...entity, name: e.target.value })}
            disabled={
              createMutation.isPending ||
              updateMutation.isPending ||
              deleteMutation.isPending ||
              operation === 'delete'
            }
          />

          {createMutation.isError && (
            <CAlert color="danger" className="mb-0 mt-2 py-2">
              {createMutation.error.message}
            </CAlert>
          )}

          {updateMutation.isError && (
            <CAlert color="danger" className="mb-0 mt-2 py-2">
              {updateMutation.error.message}
            </CAlert>
          )}

          {deleteMutation.isError && (
            <CAlert color="danger" className="mb-0 mt-2 py-2">
              {deleteMutation.error.message}
            </CAlert>
          )}
        </CModalBody>
        <CModalFooter className="d-flex gap-1">
          {operation === 'delete' && (
            <CButton
              disabled={
                createMutation.isPending || updateMutation.isPending || deleteMutation.isPending
              }
              onClick={handleSubmit}
              size="sm"
              color="danger"
              variant="outline"
            >
              <div className="d-flex gap-1 align-items-center justify-content-end">
                {deleteMutation.isPending && <CSpinner size="sm" />} <span>Supprimer</span>
              </div>
            </CButton>
          )}

          {operation !== 'delete' && (
            <CButton
              disabled={
                deleteMutation.isPending || createMutation.isPending || updateMutation.isPending
              }
              onClick={handleSubmit}
              size="sm"
              color="success"
              variant="outline"
            >
              <div className="d-flex gap-1 align-items-center justify-content-end">
                {(createMutation.isPending || updateMutation.isPending) && <CSpinner size="sm" />}{' '}
                <span>Sauvegarder</span>
              </div>
            </CButton>
          )}
        </CModalFooter>
      </CModal>
    </div>
  )
}

export default Parcs
