import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

// components
import Button from 'react/components/Button';



const JoinStudentsButton = () => {
    const history = useHistory();

    return (
        <div className="purchase_box_bottom_buttons">
            <Button onClick={() => history.push("/JoinStudents")} text="Volver" />
            <Button
                onClick={() => history.push('/incomePayment')}
                text="Continuar"
            />
        </div>
    );
};

export default JoinStudentsButton;
