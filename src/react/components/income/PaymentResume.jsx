import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Components
import DetailsBox from '../DetailsBox';
import Calendar from '../Calendar';
import Button from '../Button';

// Actions
import { fetchIncome } from 'react/redux/actions/incomeActions';

// Import imgs
import Success from './Success.svg';


const monthFunc = (id) => console.log(id);

const months = {
    1: {
        month: "SEPT",
        status: 1,
        onClick: monthFunc,
        id: 1
    },
    2: {
        month: "OCT",
        status: 1,
        onClick: monthFunc,
        id: 2
    },
    3: {
        month: "NOV",
        status: 3,
        onClick: monthFunc,
        id: 3
    },
    4: {
        month: "DIC",
        id: 4
    },
    5: {
        month: "ENE",
        id: 5
    },
    6: {
        month: "FEB",
        id: 6
    },
    7: {
        month: "MAR",
        id: 7
    },
    8: {
        month: "ABR",
        id: 8
    },
    9: {
        month: "MAY",
        id: 9
    },
    10: {
        month: "JUN",
        id: 10
    },
    11: {
        month: "JUL",
        id: 11
    },
    12: {
        month: "AGO",
        id: 12
    },
}

const total = 500000000;
const cancelado = 200;

const details = [
    {
        title: "Total a cancelar",
        data: [`Total a pagar: ${total}`, `Total cancelado: ${cancelado}`, `Restante: ${total - cancelado}`]
    },
    {
        title: "Total a cancelar",
        data: [`Total a pagar: ${total}`, `Total cancelado: ${cancelado}`, `Restante: ${total - cancelado}`]
    },
    {
        title: "Total a cancelar",
        data: [`Total a pagar: ${total}`, `Total cancelado: ${cancelado}`, `Restante: ${total - cancelado}`]
    }
]

const PaymentResume = () => {
    const dispatch = useDispatch();
    const incomeFetched = useSelector(state => state.income.incomeFetched);

    useEffect(() => {
        if (!incomeFetched) {
            dispatch(fetchIncome());
        }
    }, [incomeFetched]);

    if (!incomeFetched)
        return (
            <div className="loader-container">
                <div className="loader">Loading...</div>
                <p>Concluyendo operación</p>
            </div>
        );
    return (
        <div className="box resume_box">
            <div className="resume_box_title_success">
                <img src={Success} alt="Ilustración" className="resume_box_title_success_img" />
                <p className="resume_box_title_success_title">
                    Inscripción realizada con exito
                </p>
            </div>
            <div className="resume_box_content">
                <DetailsBox details={details} />
                <Calendar months={months} balance={8} dolar={50} title="Estatus de pago 2021" />
            </div>
            <div className="resume_box_button">
                <Button text="Aceptar" />
            </div>
        </div>
    );
}

export default PaymentResume;