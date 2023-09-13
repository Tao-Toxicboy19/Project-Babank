import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import PinDropIcon from '@mui/icons-material/PinDrop';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L, { LatLngExpression } from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { floating } from './../../../store/slices/floating.slice';
import { Box, IconButton, Tooltip } from '@mui/material';
import { Floating } from '../../../types/FloatingCrane.type';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="right" ref={ref} {...props} />;
});

export default function MapPopup({ result }: Floating | any) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const showMaps = () => {
    return (
      <>
        <div>
          <MapContainer center={[result.latitude, result.longitude]} zoom={12} style={{ height: '35vh', borderRadius: 3 }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[result.latitude, result.longitude]}>
              <Popup>{result.floating_name}</Popup>
            </Marker>
          </MapContainer>
        </div>
      </>
    )
  }
  // latitude,longitude


  return (
    <div>
      <Tooltip title="ดูตำแหน่ง">
        <Button variant="outlined" onClick={handleClickOpen}>
          <PinDropIcon />
        </Button>
      </Tooltip>
      <Dialog
        maxWidth="sm"
        fullWidth
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{result.floating_name}</DialogTitle>
        <DialogContent>
          {showMaps()}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
