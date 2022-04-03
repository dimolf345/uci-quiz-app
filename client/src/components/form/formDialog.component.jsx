import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import CustomTextField from "./customTextField.component";

function FormDialog({ fieldValue, setFieldValue }) {
  const [checked, setChecked] = useState(false);
  const [password, setPassword] = useState(fieldValue);
  const [showDialog, setShowDialog] = useState(false);

  const handleChange = () => {
    if (checked) setFieldValue("");
    setChecked(!checked);
    setShowDialog(!checked);
  };

  const handleClose = () => {
    setPassword("");
    setShowDialog(false);
  };

  return (
    <>
      <FormGroup>
        <FormControlLabel
          checked={checked}
          onChange={handleChange}
          control={<Checkbox />}
          label="Registrami come ADMIN"
        />
      </FormGroup>
      <Dialog open={showDialog} onClose={handleClose}>
        <DialogTitle>Modalità ADMIN</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Registrandoti come <strong>admin</strong> avrai la possibilità di
            visionare tutti i quiz degli utenti della tua nave, e di modificare
            il DB delle domande.
          </DialogContentText>
          <br />
          <DialogContentText sx={{ mb: 2 }}>
            Per continuare, <strong>inserisci la password ADMIN</strong>. Se non
            sai la password admin, richiedila a{" "}
            <a href="mailto:luca.dimolfetta@marina.difesa.it">
              Luca Di Molfetta
            </a>
            .
          </DialogContentText>
          <CustomTextField
            value={password}
            handleChange={(e) => setPassword(e.target.value)}
            fieldName="Admin Password"
            type="password"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Chiudi senza salvare</Button>
          <Button
            onClick={() => {
              setFieldValue(password);
              handleClose();
            }}
          >
            Salva
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default FormDialog;
