 
import { useState, useEffect } from 'react';
import {
collection,
addDoc,
getDocs,
Timestamp,
deleteDoc,
doc,
setDoc
} from 'firebase/firestore';
import {
Button,
Card,
Container,
Dialog,
DialogActions,
DialogContent,
DialogTitle,
FormControl,
Grid,
InputLabel,
MenuItem,
Select,
Stack,
Table,
TableBody,
TableCell,
TableContainer,
TablePagination,
TableRow,
TextField,
Typography
} from '@mui/material';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import { emptyRows, applyFilter, getComparator } from '../utils';
import { db } from 'src/sections/auth/firebaseConfig';

export default function UserPage() {
const [page, setPage] = useState(0);
const [order, setOrder] = useState('asc');
const [selected, setSelected] = useState([]);
const [orderBy, setOrderBy] = useState('name');
const [filterName, setFilterName] = useState('');
const [rowsPerPage, setRowsPerPage] = useState(5);
const [showForm, setShowForm] = useState(false);
const [editPopupOpen, setEditPopupOpen] = useState(false);
const [deletePopupOpen, setDeletePopupOpen] = useState(false);
const [assetId, setAssetId] = useState('');
const [assetName, setAssetName] = useState('');
const [categories, setCategories] = useState('');
const [dateTime, setDateTime] = useState(null);
const [addedBy, setAddedBy] = useState('');
const [status, setStatus] = useState('');
const [selectedAsset, setSelectedAsset] = useState(null);
const [assets, setAssets] = useState([]);

useEffect(() => {
const fetchAssets = async () => {
const assetsSnapshot = await getDocs(collection(db, 'assets'));
const assetsList = assetsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
setAssets(assetsList);
};
fetchAssets();
}, []);

const handleSort = (event, id) => {
const isAsc = orderBy === id && order === 'asc';
if (id !== '') {
setOrder(isAsc ? 'desc' : 'asc');
setOrderBy(id);
}
};

const handleSelectAllClick = (event) => {
if (event.target.checked) {
const newSelecteds = assets.map((n) => n.assetName);
setSelected(newSelecteds);
return;
}
setSelected([]);
};

const handleClick = (event, name) => {
const selectedIndex = selected.indexOf(name);
let newSelected = [];
if (selectedIndex === -1) {
newSelected = newSelected.concat(selected, name);
} else if (selectedIndex === 0) {
newSelected = newSelected.concat(selected.slice(1));
} else if (selectedIndex === selected.length - 1) {
newSelected = newSelected.concat(selected.slice(0, -1));
} else if (selectedIndex > 0) {
newSelected = newSelected.concat(
selected.slice(0, selectedIndex),
selected.slice(selectedIndex + 1)
);
}
setSelected(newSelected);
};

const handleChangePage = (event, newPage) => {
setPage(newPage);
};

const handleChangeRowsPerPage = (event) => {
setPage(0);
setRowsPerPage(parseInt(event.target.value, 10));
};

const handleFilterByName = (event) => {
setPage(0);
setFilterName(event.target.value);
};

const dataFiltered = applyFilter({
inputData: assets,
comparator: getComparator(order, orderBy),
filterName,
});

const handleSubmit = async (event) => {
event.preventDefault();
try {
await addDoc(collection(db, 'assets'), {
assetId,
assetName,
categories,
dateTime: Timestamp.fromDate(dateTime),
addedBy,
status,
});
toast.success('Asset added successfully!');
setAssetId('');
setAssetName('');
setCategories('');
setDateTime(null);
setAddedBy('');
setStatus('');
setShowForm(false);
// Fetch assets again to update the list
const assetsSnapshot = await getDocs(collection(db, 'assets'));
const assetsList = assetsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
setAssets(assetsList);
} catch (error) {
toast.error('Failed to add asset!');
}
};

const handleMenuClick = (event, asset) => {
event.stopPropagation(); // Prevent row selection
setSelectedAsset(asset);
setEditPopupOpen(true);
};

const handleEditClose = () => {
setEditPopupOpen(false);
};

const handleEditSave = async () => {
try {
await setDoc(doc(db, 'assets', selectedAsset.id), {
assetId: selectedAsset.assetId,
assetName: selectedAsset.assetName,
categories: selectedAsset.categories,
dateTime: selectedAsset.dateTime,
addedBy: selectedAsset.addedBy,
status: selectedAsset.status,
});
toast.success('Asset updated successfully!');
setEditPopupOpen(false);
} catch (error) {
toast.error('Failed to update asset!');
}
};

const handleDeleteClick = () => {
setEditPopupOpen(false); // Close the edit popup
setDeletePopupOpen(true);
};

const handleDeleteClose = () => {
setDeletePopupOpen(false);
};

const handleDeleteConfirm = async () => {
try {
await deleteDoc(doc(db, 'assets', selectedAsset.id));
toast.success('Asset deleted successfully!');
setDeletePopupOpen(false);
// Fetch assets again to update the list
const assetsSnapshot = await getDocs(collection(db, 'assets'));
const assetsList = assetsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
setAssets(assetsList);
} catch (error) {
toast.error('Failed to delete asset!');
}
};

return (
<Container>
<ToastContainer />
<Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
<Typography variant="h4">Assets</Typography>

php
Copy code
    <Button
      variant="contained"
      color="inherit"
      startIcon={<Iconify icon="eva:plus-fill" />}
      onClick={() => setShowForm(true)}
    >
      Add New Assets
    </Button>
  </Stack>

  <Dialog open={showForm} onClose={() => setShowForm(false)} maxWidth="sm" fullWidth>
    <DialogTitle>Add New Asset</DialogTitle>
    <DialogContent>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="ID"
              variant="outlined"
              fullWidth
              value={assetId}
              onChange={(e) => setAssetId(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Asset Name"
              variant="outlined"
              fullWidth
              value={assetName}
              onChange={(e) => setAssetName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Categories</InputLabel>
              <Select
                value={categories}
                onChange={(e) => setCategories(e.target.value)}
                label="Categories"
              >
                <MenuItem value="Medical Equipment">Medical Equipment</MenuItem>
                <MenuItem value="Laboratory Equipment">Laboratory Equipment</MenuItem>
                <MenuItem value="Pharmaceuticals">Pharmaceuticals</MenuItem>
                <MenuItem value="Computing Devices">Computing Devices</MenuItem>
                <MenuItem value="Medical Supplies">Medical Supplies</MenuItem>
                <MenuItem value="Vehicles">Vehicles</MenuItem>
                <MenuItem value="Furniture">Furniture</MenuItem>
                <MenuItem value="Infrastructure">Infrastructure</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="Date & Time"
                value={dateTime}
                onChange={(newValue) => setDateTime(newValue)}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Added By"
              variant="outlined"
              fullWidth
              value={addedBy}
              onChange={(e) => setAddedBy(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Status</InputLabel>
              <Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                label="Status"
              >
                <MenuItem value="in use">In Use</MenuItem>
                <MenuItem value="under maintenance">Under Maintenance</MenuItem>
                <MenuItem value="retired">Retired</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </form>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => setShowForm(false)} color="secondary">Cancel</Button>
      <Button onClick={handleSubmit} color="primary">Submit</Button>
    </DialogActions>
  </Dialog>

  <Dialog open={editPopupOpen} onClose={handleEditClose}>
    <DialogTitle>Edit Asset</DialogTitle>
    <DialogContent>
      <form onSubmit={handleEditSave}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="ID"
              variant="outlined"
              fullWidth
              value={selectedAsset?.assetId || ''}
              onChange={(e) => setSelectedAsset(prevState => ({ ...prevState, assetId: e.target.value }))}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Asset Name"
              variant="outlined"
              fullWidth
              value={selectedAsset?.assetName || ''}
              onChange={(e) => setSelectedAsset(prevState => ({ ...prevState, assetName: e.target.value }))}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Categories</InputLabel>
              <Select
                value={selectedAsset?.categories || ''}
                onChange={(e) => setSelectedAsset(prevState => ({ ...prevState, categories: e.target.value }))}
                label="Categories"
              >
                <MenuItem value="Hr Manager">Hr Manager</MenuItem>
                <MenuItem value="Project Manager">Project Manager</MenuItem>
                <MenuItem value="UX Designer">UX Designer</MenuItem>
                <MenuItem value="Backend Developer">Backend Developer</MenuItem>
                <MenuItem value="Full Stack Developer">Full Stack Developer</MenuItem>
                <MenuItem value="Front End Developer">Front End Developer</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="Date & Time"
                value={selectedAsset?.dateTime || null}
                onChange={(newValue) => setSelectedAsset(prevState => ({ ...prevState, dateTime: newValue }))}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Added By"
              variant="outlined"
              fullWidth
              value={selectedAsset?.addedBy || ''}
              onChange={(e) => setSelectedAsset(prevState => ({ ...prevState, addedBy: e.target.value }))}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Status</InputLabel>
              <Select
                value={selectedAsset?.status || ''}
                onChange={(e) => setSelectedAsset(prevState => ({ ...prevState, status: e.target.value }))}
                label="Status"
              >
                <MenuItem value="in use">In Use</MenuItem>
                <MenuItem value="under maintenance">Under Maintenance</MenuItem>
                <MenuItem value="retired">Retired</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </form>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleEditClose} color="secondary">Cancel</Button>
      <Button onClick={handleDeleteClick} color="error">Delete</Button>
      <Button onClick={handleEditSave} color="primary">Save</Button>
    </DialogActions>
  </Dialog>

  <Dialog open={deletePopupOpen} onClose={handleDeleteClose}>
    <DialogTitle>Confirm Delete</DialogTitle>
    <DialogContent>
      <Typography variant="body1">Are you sure you want to delete this asset?</Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleDeleteClose} color="secondary">Cancel</Button>
      <Button onClick={handleDeleteConfirm} color="primary">Delete</Button>
    </DialogActions>
  </Dialog>

  <Card>
    <Stack direction="row" alignItems="center" justifyContent="space-between" p={2}>
      <TextField
        label="Filter by name"
        variant="outlined"
        value={filterName}
        onChange={handleFilterByName}
      />
    </Stack>

    <Scrollbar>
      <TableContainer sx={{ minWidth: 800 }}>
        <Table>
          <UserTableHead
            order={order}
            orderBy={orderBy}
            headLabel={[
              { id: 'addedBy', label: 'Added By', alignRight: false },
              { id: 'assetId', label: 'ID', alignRight: false },
              { id: 'assetName', label: 'Asset Name', alignRight: false },
              { id: 'categories', label: 'Categories', alignRight: false },
              { id: 'dateTime', label: 'Date & Time', alignRight: false },
              { id: 'status', label: 'Status', alignRight: false },
            ]}
            rowCount={assets.length}
            numSelected={selected.length}
            onRequestSort={handleSort}
            onSelectAllClick={handleSelectAllClick}
          />
          <TableBody>
            {dataFiltered
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  hover
                  onClick={(event) => handleClick(event, row.assetName)}
                  role="checkbox"
                  tabIndex={-1}
                  key={row.assetId}
                  selected={selected.includes(row.assetName)}
                >
                 <TableCell> </TableCell>
                  <TableCell>{row.addedBy}</TableCell>
                  <TableCell>{row.assetId}</TableCell>
                  <TableCell>{row.assetName}</TableCell>
                  <TableCell>{row.categories}</TableCell>
                  <TableCell>{row.dateTime.toDate().toLocaleString()}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>
                    <Button onClick={(event) => handleMenuClick(event, row)}><Iconify icon="eva:more-vertical-2-outline" />...</Button>
                  </TableCell>
                </TableRow>
              ))}
            <TableEmptyRows height={72} emptyRows={emptyRows(page, rowsPerPage, assets.length)} />
          </TableBody>
        </Table>
      </TableContainer>
    </Scrollbar>

    <TablePagination
      rowsPerPageOptions={[5, 10, 25]}
      component="div"
      count={assets.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  </Card>
</Container>
);
}