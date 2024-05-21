import React, { useState } from 'react';
import EventForm from './eventForm/EventForm';
import { Calendar, dayjsLocalizer } from 'react-big-calendar'
import { createEvent } from '../../services/apiCalls';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import dayjs from 'dayjs'
import "dayjs/locale/es"
// Mostramos la información en español
dayjs.locale("es")
const localizer = dayjsLocalizer(dayjs)

// Personalizar los botones para que aparezcan en español
const messagesES = {
    allDay: "Todo el día",
    previous: "Anterior",
    next: "Siguiente",
    today: "Hoy",
    month: "Mes",
    week: "Semana",
    day: "Día",
    agenda: "Agenda",
    date: "Fecha",
    time: "Hora",
    event: "Evento",
    noEventsInRange: "Sin eventos"
};

// const eventos = [
//     {
//         start: new Date('2024-05-16T15:00:00'),
//         end: new Date('2024-05-26T17:00:00'),
//         title: "Evento 1",
//         data: {
//             type: "Reg"
//         }
//     }
// ];

// const components = {
//     event: (props) => {
//         console.log(props.title)
//         const { data } = props.event
//         if (data) {
//             <div style={{ width: 50, height: 50 }}>
//                 <p>{props.title}</p>
//             </div>
//         }

//     }
// }

export const CalendarPage = (props) => {
    const [showEventForm, setShowEventForm] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [events, setEvents] = useState([]);
    const playerId = "playerID";

    const handleSelectSlot = (slotInfo) => {
        setSelectedSlot(slotInfo);
        setShowEventForm(true);
    };

    // Manejar el cierre del formulario de eventos
    const handleEventFormClose = () => {
        setShowEventForm(false);
    };

        // Manejar el envío del formulario de eventos
    const handleEventFormSubmit = async (formData) => {
        const newEvent = {
            ...formData,
            start: selectedSlot.start,
            end: selectedSlot.end
        };

        try {
            //Crear un nuevo evento en el servidor
            const updatedPlayer = await createEvent(playerId, newEvent);
             // Actualizar el estado con el nuevo evento
            setEvents([...events, newEvent]);
        } catch (error) {
            console.error('Error creando el evento:', error);
        } finally {
            setShowEventForm(false); // Cierra el formulario de eventos
        }
    };

    
    return (
        <div className='container' >
            {/* Indicamos el localizador */}
            <Calendar
                localizer={localizer}
                messages={messagesES}
                events={events} //Pasar los eventos al componente de calendario
                views={["month", "week", "day"]}
                defaultView='week'
                selectable
                onSelectSlot={handleSelectSlot}  // Manejar la selección de un rango de tiempo
            />
            <EventForm
                show={showEventForm} // Mostrar u ocultar el formulario de eventos
                handleClose={handleEventFormClose}  // Manejar el cierre del formulario
                handleFormSubmit={handleEventFormSubmit} // Manejar el envío del formulario
            />
        </div >
    )
}