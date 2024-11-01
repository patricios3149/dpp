import React, { useState } from 'react';
import { Button, Box, TextField, Select, MenuItem, InputLabel, FormControl, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { XCircleIcon, SaveIcon } from 'lucide-react';
import ConfirmDialog from '../../../../components/ConfirmDialog';
import AlertDialog from '../../../../components/AlertDialog';
import { red } from '@mui/material/colors';

const Container = styled(Box)({
  padding: '10px',
  backgroundColor: '#f9f9f9',
  borderRadius: '8px',
  width: '100%',
});

const Asterisk = styled('span')({
  color: red[500],
});

const Derivar = () => {
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedUsuario, setSelectedUsuario] = useState('');
  const [fundamento, setFundamento] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertContent, setAlertContent] = useState('');

  const usuariosPorRegion = {
    'Valparaíso': ['Usuario 1A', 'Usuario 1B'],
    'Metropolitana': ['Usuario 2A', 'Usuario 2B'],
    'Biobío': ['Usuario 3A', 'Usuario 3B'],
    'Coquimbo': ['Usuario 4A', 'Usuario 4B'],
  };

  // Maneja la acción de cancelar con confirmación
  const handleCancelClick = () => {
    setConfirmAction(() => handleCancel);
    setConfirmOpen(true);
  };

  // Maneja la acción de derivar solicitud con validación y confirmación
  const handleDerivarClick = () => {
    if (!selectedRegion || !selectedUsuario || !fundamento) {
      setAlertContent('Por favor, complete todos los campos antes de derivar.');
      setAlertOpen(true);
      return;
    }
    setConfirmAction(() => handleDerivar);
    setConfirmOpen(true);
  };

  // Maneja la confirmación del diálogo
  const handleConfirm = () => {
    if (confirmAction) confirmAction();
    setConfirmOpen(false);
  };

  // Acción de cancelar
  const handleCancel = () => {
    // Lógica adicional si es necesario
    setConfirmOpen(false);
  };

  // Acción de derivar solicitud
  const handleDerivar = () => {
    // Lógica para derivar la solicitud
    console.log('Solicitud derivada a:', selectedUsuario, 'con fundamento:', fundamento);
    setConfirmOpen(false);
  };

  // Maneja el cambio de región y reinicia el usuario seleccionado
  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value);
    setSelectedUsuario(''); // Reiniciar el usuario seleccionado al cambiar la región
  };

  return (
    <Container>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        Recuerde que la primera gestión es la entrevista al usuario, y solo una vez efectuada aquella, puede solicitar el informe al defensor reclamado, diligencia conque empieza a finalizar el plazo de investigación.
      </Typography>
      <Box display="flex" gap={2} mb={2}>
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="region-select">
            Región <Asterisk>*</Asterisk>
          </InputLabel>
          <Select
            label="Región"
            value={selectedRegion}
            onChange={handleRegionChange}
            inputProps={{ id: 'region-select' }}
          >
            <MenuItem value="">Seleccionar...</MenuItem>
            <MenuItem value="Valparaíso">Valparaíso</MenuItem>
            <MenuItem value="Metropolitana">Metropolitana</MenuItem>
            <MenuItem value="Biobío">Biobío</MenuItem>
            <MenuItem value="Coquimbo">Coquimbo</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth variant="outlined" disabled={!selectedRegion}>
          <InputLabel htmlFor="usuario-select">
            Usuario <Asterisk>*</Asterisk>
          </InputLabel>
          <Select
            label="Usuario"
            value={selectedUsuario}
            onChange={(e) => setSelectedUsuario(e.target.value)}
            inputProps={{ id: 'usuario-select' }}
          >
            <MenuItem value="">Seleccionar...</MenuItem>
            {usuariosPorRegion[selectedRegion]?.map((usuario, index) => (
              <MenuItem key={index} value={usuario}>{usuario}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <TextField
        label={
          <>
            Fundamento <Asterisk>*</Asterisk>
          </>
        }
        fullWidth
        multiline
        rows={4}
        variant="outlined"
        margin="dense"
        value={fundamento}
        onChange={(e) => setFundamento(e.target.value)}
      />
      <Box display="flex" justifyContent="space-between" mt={2}>
        <Button variant="contained" color="primary" startIcon={<XCircleIcon />} onClick={handleCancelClick}>
          Cancelar
        </Button>
        <Button variant="contained" color="primary" startIcon={<SaveIcon />} onClick={handleDerivarClick}>
          Derivar
        </Button>
      </Box>

      <ConfirmDialog
        open={confirmOpen}
        content="¿Está seguro de que desea realizar esta acción?"
        onConfirm={handleConfirm}
        onCancel={() => setConfirmOpen(false)}
      />

      <AlertDialog
        open={alertOpen}
        content={alertContent}
        onClose={() => setAlertOpen(false)}
      />
    </Container>
  );
};

export default Derivar;
