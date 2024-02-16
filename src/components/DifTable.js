import React, { useEffect } from 'react'
import { Box, Paper, Button } from '@mui/material'
import {
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowModes,
  GridRowEditStopReasons,
} from '@mui/x-data-grid'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import SaveIcon from '@mui/icons-material/Save'
import CancelIcon from '@mui/icons-material/Close'
import { supabase } from '../components/supabase.js'

const DifTable = ({
  setSubMenuItem,
  setShowSubItems,
  setRenderA3Canvas,
  setSelectedEntryId,
}) => {
  const [rows, setRows] = React.useState([])
  const [rowModesModel, setRowModesModel] = React.useState({})

  useEffect(() => {
    async function fetchData() {
      try {
        const { data, error } = await supabase
          .from('Titlecontent_duplicate')
          .select(
            'ID, Description, Created_By, Created_Date, ProblemSolvers, DecisionMakers',
          )
          .order('Created_Date', { ascending: false })
        if (error) {
          throw error
        }
        // Map fetched data to rows
        const formattedRows = data.map((row) => ({
          id: row.ID,
          title: row.Description,
          name: row.Created_By,
          joinDate: row.Created_Date,
          // modifiedDate: new Date(),
          problemSolvers: row.ProblemSolvers,
          decisionMakers: row.DecisionMakers,
        }))
        setRows(formattedRows)
      } catch (error) {
        console.error('Error fetching data:', error.message)
      }
    }

    fetchData()
  }, [])

  const handleDoubleClick = (id) => () => {
    setRenderA3Canvas(true)
    setSelectedEntryId(id)
  }

  function EditToolbar(props) {
    const handleClick = () => {
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
    },
    {
      field: 'title',
      headerName: 'Title',
      width: 220,
    },
    { field: 'name', headerName: 'Created By', width: 180 },
    {
      field: 'joinDate',
      headerName: 'Created Date',
      type: 'date',
      width: 180,
      valueFormatter: (params) => {
        const date = new Date(params.value)
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
      },
    },
    {
      field: 'problemSolvers',
      headerName: 'Problem-Solvers',
      width: 180,
      type: 'singleSelect',
    },
    {
      field: 'decisionMakers',
      headerName: 'Decision-Makers',
      width: 180,
      type: 'singleSelect',
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 80,
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
        ]
      },
    },
  ]

  return (
    <Box sx={{ width: '100%', overflowX: 'auto' }}>
      <Paper elevation={3}>
        <Box sx={{ minWidth: 600 }}>
          {' '}
          {/* Set minimum width to prevent content from shrinking too much */}
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
      </Paper>
    </Box>
  )
}

export default DifTable
