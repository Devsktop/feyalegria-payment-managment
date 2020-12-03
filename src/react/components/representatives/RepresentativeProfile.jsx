import React from 'react';
import { useHistory } from 'react-router-dom';

// Components
import Button from 'react/components/Button';
import { DataTable } from 'react-pulpo';

// Import imgs
import ProfilePic from './ProfilePic.svg';

const RepresentativeProfile = () => {
  const history = useHistory();

  return (
    <div className="box representative_profile_box">
      <img src={ProfilePic} alt="" />
      <h1 className="box_title">Perfil del Representante</h1>
      <Button
        type="button"
        onClick={() => history.push('')}
        text="estatus de pago"
      />
      <p>Alejandro Jose Gonzalez Duarte</p>
      <p>27.849.217</p>
      <p>0424-638-964</p>
      <p>alejandrogonzalezduarte@hotmail.com</p>
      <p>-10$ / -35.000.000</p>

      <DataTable />

      <div className="button_container">
        <Button type="button" onClick={() => history.goBack()} text="volver" />
        <Button type="submit" text="editar" />
      </div>
    </div>
  );
};

export default RepresentativeProfile;
