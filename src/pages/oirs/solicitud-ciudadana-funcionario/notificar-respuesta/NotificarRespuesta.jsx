import React, { useState } from 'react';
import { TextField, MenuItem, Grid, Typography, Box, DialogActions } from '@mui/material';
import UploadButton from '../../../../components/UploadButton';
import ConfirmDialog from '../../../../components/ConfirmDialog';
import AlertDialog from '../../../../components/AlertDialog';
import { CancelButton, SaveButton } from '../../../../components/CustomButtons';

const NotificarRespuesta = () => {
  const [fechaDocumento, setFechaDocumento] = useState('');
  const [adjunto, setAdjunto] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertContent, setAlertContent] = useState('');

  const [errors, setErrors] = useState({});

  const handleSave = () => {
    let newErrors = {};
    if (!fechaDocumento) newErrors.fechaDocumento = true;
    if (!adjunto) newErrors.adjunto = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setAlertContent('Por favor, complete todos los campos obligatorios antes de guardar.');
      setAlertOpen(true);
      return;
    }

    setErrors({});
    setConfirmAction(() => handleConfirm);
    setConfirmOpen(true);
  };

  const handleConfirm = () => {
    // Lógica para guardar la respuesta
    console.log('Respuesta guardada con éxito');
    setConfirmOpen(false);
    setAlertContent('La respuesta ha sido guardada exitosamente.');
    setAlertOpen(true);
  };

  const handleCancel = () => {
    setConfirmAction(() => () => setConfirmOpen(false));
    setConfirmOpen(true);
  };

  return (
    <Box component="form" noValidate autoComplete="off" sx={{ p: 3, backgroundColor: 'white', borderRadius: 2, boxShadow: 3 }}>
      <Grid container spacing={2}>
    
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Fecha Documento"
            type="date"
            value={fechaDocumento}
            onChange={(e) => setFechaDocumento(e.target.value)}
            InputLabelProps={{ shrink: true }}
            required
            error={!!errors.fechaDocumento}
            helperText={errors.fechaDocumento ? 'Este campo es obligatorio' : ''}
          />
        </Grid>
        <Grid item xs={12}>
        <Typography variant="body1">
            Archivo de Notificacion<Typography component="span" color="error">*</Typography>
          </Typography>            
          <UploadButton label="Adjunto" file={adjunto} setFile={setAdjunto} required error={!!errors.adjunto} helperText={errors.adjunto ? 'Este campo es obligatorio' : ''} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Carga Archivo de Notificacion de Respuesta</Typography>
        </Grid>
      </Grid>
      <DialogActions sx={{ mt: 3 }}>
        <CancelButton onClick={handleCancel} />
        <SaveButton onClick={handleSave} />
      </DialogActions>
      <AlertDialog
        open={alertOpen}
        content={alertContent}
        onClose={() => setAlertOpen(false)}
      />
      <ConfirmDialog
        open={confirmOpen}
        content="¿Está seguro de que desea realizar esta acción?"
        onConfirm={handleConfirm}
        onCancel={() => setConfirmOpen(false)}
      />
    </Box>
  );
};

export default NotificarRespuesta;
