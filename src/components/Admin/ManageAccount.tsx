import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { User } from '../../firebase';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Loading from '../Utils/Loading';
import Avatar from '@mui/material/Avatar';
import { ADMIN } from '../../App';

const ManageAccount: React.FC = () => {
  const [listUsers, setListUsers] = useState<Array<any>>();
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const users: Array<any> = [];
      const snapshot = await User.get();
      snapshot.docs.forEach((doc) => users.push({ id: doc.id, ...doc.data() }));
      setListUsers(users);
      setLoading(false);
    })();
  }, [open]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <TableContainer component={Paper}>
      {loading && <Loading />}
      <Table sx={{ width: 900, minWidth: '100%' }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell align='center' style={{ paddingLeft: 10, width: 100 }}>
              ID
            </TableCell>
            <TableCell
              align='center'
              style={{ borderLeft: '1px solid #ccc', width: 100 }}
            >
              Tên
            </TableCell>
            <TableCell
              align='center'
              style={{
                paddingLeft: 10,
                borderLeft: '1px solid #ccc',
                width: 100,
              }}
            >
              Email
            </TableCell>
            <TableCell
              align='center'
              style={{ borderLeft: '1px solid #ccc', width: 100 }}
            >
              Số điện thoại
            </TableCell>
            <TableCell
              align='center'
              style={{ borderLeft: '1px solid #ccc', width: 40 }}
            >
              Xóa
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listUsers &&
            listUsers
              .filter((user) => user.email !== ADMIN)
              .map((user) => (
                <TableRow
                  key={user.id}
                  sx={{ '&:last-child td, &:last-child th': { border: '0' } }}
                >
                  <TableCell
                    align='center'
                    style={{ width: 100, paddingLeft: 10 }}
                  >
                    {user.id}
                  </TableCell>
                  <TableCell
                    component='th'
                    scope='row'
                    style={{
                      padding: 20,
                      width: 200,
                      borderLeft: '1px solid #ccc',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        height: 50,
                      }}
                    >
                      <Avatar
                        alt={user.firstName}
                        src={user.avatar}
                        style={{ margin: '16px' }}
                      />
                      {user.lastName + ' ' + user.firstName}
                    </div>
                  </TableCell>
                  <TableCell
                    align='center'
                    style={{ width: 150, borderLeft: '1px solid #ccc' }}
                  >
                    {user.email}
                  </TableCell>

                  <TableCell
                    align='center'
                    style={{ width: 100, borderLeft: '1px solid #ccc' }}
                  >
                    {user.phoneNumber}
                  </TableCell>
                  <TableCell
                    align='center'
                    style={{ cursor: 'pointer', borderLeft: '1px solid #ccc' }}
                    onClick={() => setOpen(true)}
                  >
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      style={{ color: 'var(--primary-color)' }}
                    />
                  </TableCell>
                  <Dialog
                    open={open}
                    onClose={() => setOpen(false)}
                    aria-labelledby='alert-dialog-title'
                    aria-describedby='alert-dialog-description'
                  >
                    <DialogTitle id='alert-dialog-title'>
                      {'Xóa tài khoản?'}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id='alert-dialog-description'>
                        Bạn chắc chắn muốn xóa tài khoản này?
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={() => setOpen(false)}>Hủy bỏ</Button>
                      <Button
                        onClick={async () => {
                          await User.doc(user.id).delete();
                          // fetch(
                          //   `https://identitytoolkit.googleapis.com/v1/accounts:delete?key=AIzaSyDb7qRj2WgeaJsJIn7JyAzyDbPI3hzyKoY`,
                          //   {
                          //     method: "POST",
                          //     body: JSON.stringify({
                          //       email,
                          //       password,
                          //       returnSecureToken: true,
                          //     }),
                          //   }
                          // )
                          // auth.signInWithEmailAndPassword()
                          setOpen(false);
                          toast.success('Xóa thành công tài khoản!');
                        }}
                        autoFocus
                      >
                        Xóa
                      </Button>
                    </DialogActions>
                  </Dialog>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ManageAccount;
