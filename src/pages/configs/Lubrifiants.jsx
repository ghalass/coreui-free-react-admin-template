import React, { useState } from 'react'
import {
  CAlert,
  CBadge,
  CFormInput,
  CFormSelect,
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
import {
  fecthLubrifiantsQuery,
  useCreateLubrifiant,
  useDeleteLubrifiant,
  useUpdateLubrifiant,
} from '../../hooks/useLubrifiants'
import { useTypelubrifiants } from '../../hooks/useTypelubrifiants'
import TableHead from './TableHead'

const Lubrifiants = () => {
  const getAllTypelubrifiantsQuery = useQuery(useTypelubrifiants())

  const getAllQuery = useQuery(fecthLubrifiantsQuery())

  const [visible, setVisible] = useState(false)
  const [operation, setOperation] = useState('')

  const initialVal = { id: '', name: '', typelubrifiantId: '' }

  const [entity, setEntity] = useState(initialVal)
  const createMutation = useCreateLubrifiant()
  const deleteMutation = useDeleteLubrifiant()
  const updateMutation = useUpdateLubrifiant()

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      id: entity.id,
      name: entity.name,
      typelubrifiantId: entity.typelubrifiantId,
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
            toast.success('Supprimé avec succès.')
          },
        })
        break
      case 'update':
        updateMutation.mutate(data, {
          onSuccess: () => {
            setVisible(!visible)
            handleResetAll()
            toast.success('Modifié avec succès.')
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
  const filteredEntitys = getAllQuery.data?.filter(
    (ele) =>
      ele?.name.toLowerCase().includes(search.toLowerCase()) ||
      ele?.Typelubrifiant?.name.toLowerCase().includes(search.toLowerCase()),
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
      <TableHead
        title="Liste des lubrifiants"
        getAllQuery={getAllQuery}
        search={search}
        handleSearch={handleSearch}
        setEntity={setEntity}
        initialVal={initialVal}
        setVisible={setVisible}
        visible={visible}
        setOperation={setOperation}
        tableId={'myTable'}
        excelFileName={'Liste des lubrifiants'}
        currentEntitys={currentEntitys}
        entitysPerPage={entitysPerPage}
        setEntitysPerPage={setEntitysPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        totalPages={totalPages}
        filteredEntitys={filteredEntitys}
      />

      <CTable responsive striped hover id="myTable">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">Nom du lubrifiant</CTableHeaderCell>
            <CTableHeaderCell scope="col">Type de lubrifiant</CTableHeaderCell>
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

                <CTableDataCell> {item?.Typelubrifiant?.name}</CTableDataCell>
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
          <CModalTitle id="StaticBackdropExampleLabel">Gestion d'un lubrifiant</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CFormSelect
            id="floatingSelect"
            floatingClassName="mb-3"
            floatingLabel="Choisir un type de lubrifiant"
            aria-label="Floating label select example"
            value={entity.typelubrifiantId}
            onChange={(e) => setEntity({ ...entity, typelubrifiantId: e.target.value })}
            disabled={
              createMutation.isPending ||
              updateMutation.isPending ||
              deleteMutation.isPending ||
              operation === 'delete'
            }
          >
            <option></option>
            {getAllTypelubrifiantsQuery.data &&
              getAllTypelubrifiantsQuery.data?.length > 0 &&
              getAllTypelubrifiantsQuery.data?.map((typelubrifiant, indx) => (
                <option key={indx} value={typelubrifiant?.id}>
                  {typelubrifiant?.name}
                </option>
              ))}
          </CFormSelect>

          <CFormInput
            type="text"
            id="floatingInput"
            floatingClassName="mb-3"
            floatingLabel="Nom du lubrifiant"
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

export default Lubrifiants
