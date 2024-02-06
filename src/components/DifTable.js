import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import SaveIcon from '@mui/icons-material/Save'
import CancelIcon from '@mui/icons-material/Close'
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid'
import { randomCreatedDate, randomArrayItem } from '@mui/x-data-grid-generator'

const roles = ['Julianne', 'Carlos', 'Jason', 'Chris']
const randomRole = () => {
  return randomArrayItem(roles)
}

const ids = ['AB-123456', 'BC-123456', 'AA-123456', 'XX-123456']
const randomId = () => {
  return randomArrayItem(ids)
}

const initialRows = [
  {
    id: randomId(),
    title: 'Problem Solution Set Name',
    name: randomRole(),
    joinDate: randomCreatedDate(),
    modifiedDate: randomCreatedDate(),
    problemSolvers: randomRole(),
    decisionMakers: randomRole(),
  },
  {
    id: randomId(),
    title: 'Problem Solution Set Name',
    name: randomRole(),
    joinDate: randomCreatedDate(),
    modifiedDate: randomCreatedDate(),
    problemSolvers: randomRole(),
    decisionMakers: randomRole(),
  },
  {
    id: randomId(),
    title: 'Problem Solution Set Name',
    name: randomRole(),
    joinDate: randomCreatedDate(),
    modifiedDate: randomCreatedDate(),
    problemSolvers: randomRole(),
    decisionMakers: randomRole(),
  },
  {
    id: randomId(),
    title: 'Problem Solution Set Name',
    name: randomRole(),
    joinDate: randomCreatedDate(),
    modifiedDate: randomCreatedDate(),
    problemSolvers: randomRole(),
    decisionMakers: randomRole(),
  },
  {
    id: randomId(),
    title: 'Problem Solution Set Name',
    name: randomRole(),
    joinDate: randomCreatedDate(),
    modifiedDate: randomCreatedDate(),
    problemSolvers: randomRole(),
    decisionMakers: randomRole(),
  },
]

const DifTable = ({ setSubMenuItem, setShowSubItems, setRenderA3Canvas }) => {
  const [rows, setRows] = React.useState(initialRows)
  const [rowModesModel, setRowModesModel] = React.useState({})

  const handleDoubleClick = (id) => () => {
    setRenderA3Canvas(true)
  }

  function EditToolbar(props) {
    const { setRows, setRowModesModel } = props

    const handleClick = () => {
      const id = randomId()
      setRows((oldRows) => [...oldRows, { id, name: '', isNew: true }])
      setRowModesModel((oldModel) => ({
        ...oldModel,
        [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
      }))
      setSubMenuItem('Title')
      setShowSubItems(true)
    }

    return (
      <GridToolbarContainer>
        <Button color='primary' startIcon={<AddIcon />} onClick={handleClick}>
          Add record
        </Button>
      </GridToolbarContainer>
    )
  }

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true
    }
  }

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } })
    handleDoubleClick(id)()
  }

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } })
  }

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id))
  }

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    })

    const editedRow = rows.find((row) => row.id === id)
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id))
    }
  }

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false }
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)))
    return updatedRow
  }

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel)
  }

  const columns = [
    {
      field: 'id',
      headerName: 'ID Number',
      width: 130,
      editable: true,
    },
    {
      field: 'title',
      headerName: 'Title',
      width: 220,
      editable: true,
    },
    { field: 'name', headerName: 'Created By', width: 130, editable: true },
    {
      field: 'joinDate',
      headerName: 'Created Date',
      type: 'date',
      width: 130,
      editable: true,
    },
    {
      field: 'modifiedDate',
      headerName: 'Modified Date',
      type: 'date',
      width: 130,
      editable: true,
    },
    {
      field: 'problemSolvers',
      headerName: 'Problem-Solvers',
      width: 130,
      editable: true,
      type: 'singleSelect',
      valueOptions: randomRole(),
    },
    {
      field: 'decisionMakers',
      headerName: 'Decision-Makers',
      width: 130,
      editable: true,
      type: 'singleSelect',
      valueOptions: randomRole(),
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label='Save'
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label='Cancel'
              className='textPrimary'
              onClick={handleCancelClick(id)}
              color='inherit'
            />,
          ]
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label='Edit'
            className='textPrimary'
            onClick={handleEditClick(id)}
            color='inherit'
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label='Delete'
            onClick={handleDeleteClick(id)}
            color='inherit'
          />,
        ]
      },
    },
  ]

  return (
    <Box
      sx={{
        height: 340,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '100%',
      }}
    >
      <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          editMode='row'
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          onRowDoubleClick={(params) => handleDoubleClick(params.id)()}
          processRowUpdate={processRowUpdate}
          slots={{
            toolbar: EditToolbar,
          }}
          slotProps={{
            toolbar: { setRows, setRowModesModel },
          }}
        />
      </Box>
    </Box>
  )
}

export default DifTable
