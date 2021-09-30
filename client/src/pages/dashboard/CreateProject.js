import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Container,
  Typography,
} from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { withSnackbar } from 'notistack';
import moment from 'moment';
import SDGs from '../../assets/data/sdgs';

const CreateProject = (props) => {
  const [values, setValues] = useState({
    title: '',
    problem: '',
    solution: '',
  });
  const [sdgs, setSdgs] = useState([]);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSDGs = (event) => {
    const {
      target: { value },
    } = event;
    setSdgs(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const saveNewProject = async (event) => {
    event.preventDefault();

    if (values.title && values.problem && values.solution && sdgs.length > 0) {
      const newProject = {
        owner: props.user.user_id,
        title: values.title,
        problem: values.problem,
        solution: values.solution,
        img: '',
        date: `${moment().format('YYYY-MM-DD HH:mm')}`,
        collaborators: [],
        sdgs: sdgs,
        featured: false,
      };
      //alert(JSON.stringify(newProject));

      const res = await fetch(`/createproject/${newProject.owner}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProject),
      });
      const body = await res.json();
      if (res.status !== 200) {
        props.enqueueSnackbar(body.message, {
          variant: 'error',
        });
      } else {
        const newNotification = {
          user_id: props.user.user_id,
          project_id: body.entry_id,
          title: 'New project successfully created!',
          message: `Bravo! "${values.title}" ${successMessage}`,
          timestamp: moment().format('YYYY-MM-DD HH:mm'),
          read: false,
        };
        await fetch(`/createnotification`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newNotification),
        });
        handleClickOpen();
      }
    } else {
      props.enqueueSnackbar('Please provide all fields', { variant: 'error' });
    }
  };

  const handleOkay = () => {
    handleClose();
    props.history.push('/myprojects');
  };

  return (
    <Container
      sx={{
        backgroundImage: `url('/images/background/bg1.png')`,
        maxWidth: '100%',
        minHeight: '90vh',
        paddingBottom: '1rem',
        marginTop: '2.5rem',
      }}
    >
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {'Project Successfully Created!'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {`Bravo! "${values.title}" ${successMessage}`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOkay}>Ok</Button>
        </DialogActions>
      </Dialog>
      <form autoComplete='off' noValidate {...props}>
        <Card>
          <CardHeader
            subheader='You must fill in all the fields.'
            title='Create New Project'
          />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  multiline
                  label='Project Title'
                  name='title'
                  onChange={handleChange}
                  required
                  value={values.title}
                  variant='outlined'
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <FormControl required sx={{ width: '100%' }}>
                  <InputLabel id='demo-multiple-checkbox-label'>
                    SDGs
                  </InputLabel>
                  <Select
                    fullWidth
                    labelId='demo-multiple-checkbox-label'
                    id='demo-multiple-checkbox'
                    multiple
                    value={sdgs}
                    onChange={handleSDGs}
                    input={<OutlinedInput label='SDGs' />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                  >
                    {SDGs.map((name) => (
                      <MenuItem key={name} value={name}>
                        <Checkbox checked={sdgs.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  multiline
                  label='Problem Statement'
                  name='problem'
                  onChange={handleChange}
                  required
                  value={values.problem}
                  variant='outlined'
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  multiline
                  label='Your Solution'
                  name='solution'
                  onChange={handleChange}
                  required
                  value={values.solution}
                  variant='outlined'
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              p: 2,
            }}
          >
            <Button
              color='primary'
              variant='contained'
              sx={{ marginRight: '1rem' }}
              endIcon={<CancelIcon />}
              onClick={() => {
                props.enqueueSnackbar('Changes discarded!', {
                  variant: 'error',
                });
                props.history.push('/dashboard');
              }}
            >
              Cancel
            </Button>
            <Button
              color='primary'
              variant='contained'
              endIcon={<SendIcon />}
              onClick={saveNewProject}
            >
              Save
            </Button>
          </Box>
        </Card>
      </form>
    </Container>
  );
};

export default withSnackbar(CreateProject);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const successMessage = ` project has been created and it is now awaiting feedback from the
            mentors. Once it is approved you will receive a notification, and
            then you will be able to continue to fill in other project details.`;
